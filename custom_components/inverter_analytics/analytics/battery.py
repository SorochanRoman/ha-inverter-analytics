"""Battery analytics: how the charge is used, and how far it falls.

build_battery_payload and everything below it work from series that have already
been read and touch no Home Assistant API; async_battery_analytics is the thin
layer that reads them, mirroring how load.py is arranged.
"""

from __future__ import annotations

from datetime import datetime
from itertools import pairwise
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import DEFAULT_BATTERY_IDLE_W, DEFAULT_BATTERY_LOW_PCT
from ..roles import EntryConfig
from .resample import (
    Interval,
    Series,
    align,
    coverage,
    duration_histogram,
    episodes_below,
    time_weighted_mean,
    to_intervals,
)
from .source import Precision, Window, async_series_many, describe_series, plan_precision

SOC_BUCKET_WIDTH = 5.0
SOC_MAX_BUCKETS = 20

SOC_BANDS: tuple[tuple[str, float, float | None], ...] = (
    ("0-20", 0.0, 20.0),
    ("20-40", 20.0, 40.0),
    ("40-60", 40.0, 60.0),
    ("60-80", 60.0, 80.0),
    ("80-100", 80.0, None),
)

# A dip has to last to be a dip; the same rule the imbalance episodes use.
DIP_MIN_SECONDS = 60.0

# Below this much evidence the sign check says nothing rather than guessing
# from a battery that barely moved.
SIGN_MIN_SECONDS = 300.0

# The share of the evidence that has to contradict the configured direction
# before the tab is willing to call it inverted.
SIGN_INVERTED_SHARE = 0.7

SECONDS_PER_DAY = 86400.0
JOULES_PER_KWH = 3_600_000.0


def restrict(series: Series, start: datetime) -> Series:
    """The part of a series from `start` onwards.

    The last sample before `start` is kept: it is the value in force at that
    moment, and dropping it would leave the beginning of the restricted window
    looking like missing data. to_intervals clips it to the window itself.
    """
    if start <= series.start:
        return series
    earlier = [sample for sample in series.samples if sample.ts < start]
    later = [sample for sample in series.samples if sample.ts >= start]
    kept = (earlier[-1:] if earlier else []) + later
    return Series(start, series.end, tuple(kept))


def _band_seconds(intervals: list[Interval]) -> list[float]:
    """Seconds in each state-of-charge band, in one pass.

    The lowest band also catches anything below zero and the highest anything
    above a hundred, so the fractions still sum to one for a sensor that
    over-reports slightly.
    """
    seconds = [0.0] * len(SOC_BANDS)
    for interval in intervals:
        for index, (_, low, high) in enumerate(SOC_BANDS):
            first, last = index == 0, index == len(SOC_BANDS) - 1
            above = first or interval.value >= low
            below = last or (high is not None and interval.value < high)
            if above and below:
                seconds[index] += interval.seconds
                break
    return seconds


def _recovered_to(intervals: list[Interval], end: datetime) -> float | None:
    """The charge once the dip was over, or None if the window ended first."""
    return next((item.value for item in intervals if item.start >= end), None)


def _dips(intervals: list[Interval], low_pct: float) -> list[dict[str, Any]]:
    episodes = episodes_below(intervals, threshold=low_pct, min_seconds=DIP_MIN_SECONDS)
    return [
        {
            "start": episode.start.isoformat(),
            "end": episode.end.isoformat(),
            "seconds": episode.seconds,
            "lowest": episode.extreme,
            "recovered_to": _recovered_to(intervals, episode.end),
        }
        for episode in episodes
    ]


def _sign_verdict(soc: Series, power: Series, idle_w: float) -> bool | None:
    """Whether the configured battery-power direction contradicts the charge.

    The charge must rise while the configured-positive direction flows. A user
    who answered the invert question the wrong way round inverts the whole tab
    silently — charging reported as discharging, the dip analysis mirrored — so
    the two readings we hold are checked against each other instead of trusted.

    None when the battery barely moved: a verdict from no evidence is a coin
    toss wearing a warning's clothes.
    """
    aligned = align([soc, power])
    agree = 0.0
    disagree = 0.0
    for current, following in pairwise(aligned):
        charge_change = following.values[0] - current.values[0]
        watts = current.values[1]
        if charge_change == 0.0 or abs(watts) <= idle_w:
            continue
        if (charge_change > 0) == (watts > 0):
            agree += current.seconds
        else:
            disagree += current.seconds

    total = agree + disagree
    if total < SIGN_MIN_SECONDS:
        return None
    return disagree / total > SIGN_INVERTED_SHARE


def _power_payload(
    soc: Series, power: Series, idle_w: float, capacity_kwh: float | None, window_seconds: float
) -> dict[str, Any]:
    """Charging and discharging over the whole window."""
    intervals = to_intervals(power)
    charging = [item for item in intervals if item.value > idle_w]
    discharging = [item for item in intervals if item.value < -idle_w]
    measured = sum(item.seconds for item in intervals)

    joules_in = sum(item.value * item.seconds for item in charging)
    joules_out = -sum(item.value * item.seconds for item in discharging)
    energy_out = joules_out / JOULES_PER_KWH

    days = window_seconds / SECONDS_PER_DAY
    cycles = None
    if capacity_kwh and capacity_kwh > 0 and days > 0:
        cycles = energy_out / capacity_kwh / days

    def share(items: list[Interval]) -> float | None:
        return (sum(item.seconds for item in items) / measured) if measured > 0 else None

    return {
        "idle_w": idle_w,
        "mean_charge_w": time_weighted_mean(charging),
        "mean_discharge_w": (
            None if not discharging else -(time_weighted_mean(discharging) or 0.0)
        ),
        "share_charging": share(charging),
        "share_discharging": share(discharging),
        "share_idle": share([item for item in intervals if abs(item.value) <= idle_w]),
        # Integrated from power readings rather than read off a meter, so a
        # window with gaps understates it. The coverage figure sits beside it.
        "energy_in_kwh": joules_in / JOULES_PER_KWH,
        "energy_out_kwh": energy_out,
        "cycles_per_day": cycles,
        "sign_looks_inverted": _sign_verdict(soc, power, idle_w),
    }


def build_battery_payload(
    soc: Series,
    power: Series | None,
    *,
    capacity_kwh: float | None,
    low_pct: float,
    idle_w: float,
    raw_from: datetime | None,
) -> dict[str, Any]:
    """Distribution, dips and throughput for one battery.

    raw_from is the moment raw states become available. Long-term statistics
    hold an hourly *mean* state of charge, so a battery that fell to 8% for
    twenty minutes and recovered appears as perhaps 34% for that hour. Anything
    that asks "how low did it go" is therefore computed from raw_from onwards
    only, and the caller is told where that starts; a minimum taken over hourly
    means is not a minimum of anything the battery did.
    """
    intervals = to_intervals(soc)
    histogram = duration_histogram(
        intervals, bucket_width=SOC_BUCKET_WIDTH, max_buckets=SOC_MAX_BUCKETS
    )
    band_seconds = _band_seconds(intervals)
    total_seconds = sum(band_seconds)

    raw = soc if raw_from is None else restrict(soc, raw_from)
    raw_intervals = to_intervals(raw) if raw.end > raw.start else []
    # Whether the restriction actually held anything back. A window may reach
    # past the recorder's retention and still have no data there, and saying
    # "dips counted from the 19th" when nothing exists before the 19th reads as
    # a contradiction of the badge beside it.
    restricted = raw_from is not None and any(item.start < raw_from for item in to_intervals(soc))
    raw_seconds = sum(item.seconds for item in raw_intervals)
    dips = _dips(raw_intervals, low_pct) if raw_intervals else []
    lows = [dip["lowest"] for dip in dips]

    return {
        "coverage": coverage(soc),
        "low_pct": low_pct,
        # Absent rather than empty: a window sourced entirely from hourly means
        # can say nothing about dips, and an empty table would read as "none".
        "raw_from": raw_from.isoformat() if raw_from else None,
        "raw_seconds": raw_seconds,
        "dips_measurable": bool(raw_intervals),
        "dips_restricted": restricted,
        "kpi": {
            "mean_soc": time_weighted_mean(intervals),
            "min_soc": min((item.value for item in raw_intervals), default=None),
            "seconds_below_low": sum(
                item.seconds for item in raw_intervals if item.value < low_pct
            ),
            "dip_count": len(dips),
            "mean_low_point": (sum(lows) / len(lows)) if lows else None,
        },
        "histogram": {
            "bucket_width": SOC_BUCKET_WIDTH,
            "clipped_low_seconds": histogram.clipped_low_seconds,
            "clipped_high_seconds": histogram.clipped_high_seconds,
            "buckets": [
                {
                    "start": bucket.start,
                    "end": bucket.end,
                    "seconds": bucket.seconds,
                    "fraction": bucket.fraction,
                }
                for bucket in histogram.buckets()
            ],
        },
        "bands": [
            {
                "key": key,
                "from": low,
                "to": high,
                "seconds": seconds,
                "fraction": (seconds / total_seconds) if total_seconds > 0 else 0.0,
            }
            for (key, low, high), seconds in zip(SOC_BANDS, band_seconds, strict=True)
        ],
        "episodes": dips,
        "power": (
            None
            if power is None
            else _power_payload(soc, power, idle_w, capacity_kwh, soc.duration)
        ),
    }


def _raw_from(hass: HomeAssistant, window: Window) -> datetime | None:
    """The moment raw states begin inside this window.

    None when the whole window is raw. For a window that lies entirely in
    long-term statistics the answer is its own end: there is no raw part, and
    saying so is what stops the tab from presenting hourly means as dips.
    """
    plan = plan_precision(hass, window)
    if plan.precision is Precision.RAW:
        return None
    if plan.precision is Precision.LTS:
        return window.end
    return plan.boundary


async def async_battery_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the data and compute the battery analytics."""
    soc_id = config.entity_id("battery_soc")
    if soc_id is None:
        raise ValueError("battery_soc is not configured")

    power_id = config.entity_id("battery_power")
    signs = {soc_id: 1.0}
    if power_id:
        signs[power_id] = config.sign("battery_power")

    results = await async_series_many(
        hass, [soc_id, *([power_id] if power_id else [])], window, signs
    )
    soc = results[soc_id]
    power = results[power_id] if power_id else None

    payload = build_battery_payload(
        soc.series,
        power.series if power else None,
        capacity_kwh=config.number("battery_capacity"),
        low_pct=config.number("battery_low_pct") or DEFAULT_BATTERY_LOW_PCT,
        idle_w=config.number("battery_idle_w") or DEFAULT_BATTERY_IDLE_W,
        raw_from=_raw_from(hass, window),
    )

    series_block = {"battery_soc": describe_series(soc_id, soc)}
    if power_id and power:
        series_block["battery_power"] = describe_series(power_id, power)
    payload["series"] = series_block
    payload["precision"] = soc.precision.value
    payload["boundary"] = soc.boundary.isoformat() if soc.boundary else None
    payload["has_capacity"] = config.number("battery_capacity") is not None
    return payload
