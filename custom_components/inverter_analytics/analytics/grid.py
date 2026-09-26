"""Grid outages: how often the grid goes away, for how long, and when.

Everything here works from a binary series — one while the grid is present,
zero while it is absent, a gap where nobody knows — that has already been
read. build_grid_payload touches no Home Assistant API; async_grid_analytics
is the thin layer that reads the sensors.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Callable, Sequence
from dataclasses import dataclass
from datetime import datetime, tzinfo
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from ..const import DEFAULT_BATTERY_IDLE_W, DEFAULT_BATTERY_LOW_PCT, DEFAULT_GRID_ZERO_W
from ..roles import EntryConfig
from .battery import restrict
from .resample import (
    AlignedInterval,
    Interval,
    Sample,
    Series,
    align,
    coverage,
    hour_of_day_durations,
    split_local_hours,
    time_weighted_mean,
    to_intervals,
)
from .source import (
    Precision,
    SeriesResult,
    Window,
    async_binary_series,
    async_series_many,
    countable_window,
    describe_series,
)

# The same floor every other episode on the page uses. Shorter interruptions
# are real and are counted, but as a figure of their own rather than as rows.
OUTAGE_MIN_SECONDS = 60.0

# A gap in the data this short, with no `on` inside it, does not end an
# outage: Home Assistant restarting mid-outage leaves the sensor unavailable
# for half a minute, and read naively that is two outages with a wrong
# "longest".
OUTAGE_BRIDGE_SECONDS = 600.0

# Outages inferred from power flows have their own floor. A flicker cannot be
# inferred, and pretending to count them would be noise.
INFERRED_MIN_SECONDS = 300.0

# Below this much outage the discharge rate is one afternoon's weather.
AUTONOMY_MIN_HOURS = 1.0

SECONDS_PER_HOUR = 3600.0

SOURCE_SENSOR = "sensor"
SOURCE_INFERRED = "inferred"

# A binary interval holds 1.0 or 0.0; the midpoint keeps float comparisons
# out of the code that reads it.
_PRESENT = 0.5


@dataclass(frozen=True, slots=True)
class Outage:
    """A contiguous span during which the grid was absent."""

    start: datetime
    end: datetime
    bridged_seconds: float
    started_before_window: bool
    ongoing: bool

    @property
    def seconds(self) -> float:
        """Duration in seconds, including anything bridged."""
        return (self.end - self.start).total_seconds()


def _off_runs(
    intervals: Sequence[Interval], bridge_seconds: float
) -> list[tuple[datetime, datetime, float]]:
    """Runs of grid absence, bridging short data gaps that hold no `on`.

    An `on` interval always closes the run; a gap closes it only when it is
    longer than the bridge. A gap longer than that ends the outage at the last
    moment the grid was known to be absent — nothing guesses at what happened
    while nobody was recording.
    """
    runs: list[tuple[datetime, datetime, float]] = []
    current: list[Any] | None = None
    for interval in intervals:
        if interval.value >= _PRESENT:
            if current is not None:
                runs.append((current[0], current[1], current[2]))
                current = None
            continue
        if current is not None:
            gap = (interval.start - current[1]).total_seconds()
            if gap <= bridge_seconds:
                current[1] = interval.end
                current[2] += gap
                continue
            runs.append((current[0], current[1], current[2]))
        current = [interval.start, interval.end, 0.0]
    if current is not None:
        runs.append((current[0], current[1], current[2]))
    return runs


def outage_episodes(
    intervals: Sequence[Interval], *, window: Window, min_seconds: float, bridge_seconds: float
) -> list[Outage]:
    """Runs of absence long enough to count, flagged where the window cut them.

    A run starting at the window's start was in force when the window opened;
    one ending at its end is still in progress. Both show as "at least" on
    screen, because that is what is known.
    """
    return [
        Outage(start, end, bridged, start <= window.start, end >= window.end)
        for start, end, bridged in _off_runs(intervals, bridge_seconds)
        if (end - start).total_seconds() >= min_seconds
    ]


def brief_interruptions(
    intervals: Sequence[Interval], *, min_seconds: float, bridge_seconds: float
) -> int:
    """Runs of absence too short to be outages.

    A floor on flickers, not a count of them: a template sensor updates when
    the inverter is polled, so nothing shorter than the poll interval can be
    seen at all.
    """
    return sum(
        1
        for start, end, _ in _off_runs(intervals, bridge_seconds)
        if (end - start).total_seconds() < min_seconds
    )


def _by_hour(intervals: Sequence[Interval], tz: tzinfo) -> list[dict[str, Any]]:
    """Seconds without grid and seconds measured, for each local hour of day.

    Both, so the interface can draw a share: under uneven coverage raw hours
    compare an hour the recorder saw ten times with one it saw twice.
    """
    off = hour_of_day_durations([item for item in intervals if item.value < _PRESENT], tz)
    measured = hour_of_day_durations(intervals, tz)
    return [
        {"hour": hour, "off_seconds": off[hour], "measured_seconds": measured[hour]}
        for hour in range(24)
    ]


def _by_day(
    intervals: Sequence[Interval], outages: Sequence[Outage], tz: tzinfo
) -> list[dict[str, Any]]:
    """Per local day: time without grid, time measured, outages that began.

    A day the sensor had no data for is not in the list at all. A bar at zero
    would read as a calm day, and the interface says how many days are absent
    instead. An outage in force when the window opened counts on the window's
    first day, which is the only day it can be said to have begun on here.
    """
    days: dict[str, dict[str, float]] = defaultdict(
        lambda: {"off_seconds": 0.0, "measured_seconds": 0.0, "count": 0}
    )
    for piece in split_local_hours(intervals, tz):
        day = days[piece.local.date().isoformat()]
        day["measured_seconds"] += piece.seconds
        if piece.value < _PRESENT:
            day["off_seconds"] += piece.seconds
    for outage in outages:
        key = outage.start.astimezone(tz).date().isoformat()
        if key in days:
            days[key]["count"] += 1
    return [{"day": key, **values} for key, values in sorted(days.items())]


def _describe(outage: Outage) -> dict[str, Any]:
    return {
        "start": outage.start.isoformat(),
        "end": outage.end.isoformat(),
        "seconds": outage.seconds,
        "bridged_seconds": outage.bridged_seconds,
        "started_before_window": outage.started_before_window,
        "ongoing": outage.ongoing,
    }


def _between(series: Series, start: datetime, end: datetime) -> Series:
    """The part of a series inside [start, end), keeping the value in force at start."""
    clipped = restrict(series, start)
    return Series(
        clipped.start,
        min(clipped.end, end),
        tuple(sample for sample in clipped.samples if sample.ts < end),
    )


def _in_force(series: Series, moment: datetime) -> float | None:
    """The value holding at a moment: the last sample at or before it.

    A state persists until the next one replaces it, so the reading written
    at the very instant the grid returned is the charge the outage ended on.
    A gap there — the last sample being unavailable — is None, not the value
    before the gap.
    """
    latest: Sample | None = None
    for sample in series.samples:
        if sample.ts > moment:
            break
        latest = sample
    return latest.value if latest else None


def _battery_columns(
    outage: Outage, soc: Series | None, load: Series | None, low_pct: float
) -> dict[str, Any]:
    """What the battery did through one outage, from raw states.

    The values at the start and the end are whatever was in force at those
    moments, which is what the recorder means by a state; nothing is
    interpolated across an outage. The minimum is real: this works from raw
    states, so a fall to 8% for twenty minutes is an 8%, not the 34% an hourly
    mean would make of it.
    """
    columns: dict[str, Any] = {}
    if soc is not None:
        part = to_intervals(_between(soc, outage.start, outage.end))
        lowest = min((item.value for item in part), default=None)
        columns |= {
            "soc_start": _in_force(soc, outage.start),
            "soc_end": _in_force(soc, outage.end),
            "soc_min": lowest,
            "below_low": None if lowest is None else lowest < low_pct,
        }
    if load is not None:
        part = to_intervals(_between(load, outage.start, outage.end))
        columns["load_mean_w"] = time_weighted_mean(part)
    return columns


def _last_known(series: Series | None) -> float | None:
    if series is None:
        return None
    intervals = to_intervals(series)
    return intervals[-1].value if intervals else None


def _autonomy(
    episodes: Sequence[dict[str, Any]], soc: Series | None, low_pct: float
) -> dict[str, Any]:
    """How long the battery would last, at the rate seen during this period's outages.

    Read off the battery itself rather than multiplied out of a nameplate
    capacity: the state of charge lost per hour of outage. Withheld, with the
    reason, when there is nothing to read it from — and when the outages were
    covered by the sun and the charge did not fall, because there is no
    discharge rate in that and inventing one would be worse than saying so.
    """
    evidence = [
        (item["soc_start"] - item["soc_end"], item["seconds"])
        for item in episodes
        if item.get("soc_start") is not None and item.get("soc_end") is not None
    ]
    hours = sum(seconds for _, seconds in evidence) / SECONDS_PER_HOUR
    drop = sum(points for points, _ in evidence)
    loads = [
        (item["load_mean_w"], item["seconds"])
        for item in episodes
        if item.get("load_mean_w") is not None
    ]
    load_seconds = sum(seconds for _, seconds in loads)
    result: dict[str, Any] = {
        "rate_pct_per_hour": None,
        "evidence_hours": hours,
        "hours_from_full": None,
        "hours_from_now": None,
        "soc_now": _last_known(soc),
        "load_mean_w": (
            sum(watts * seconds for watts, seconds in loads) / load_seconds
            if load_seconds
            else None
        ),
        "reason": None,
    }
    if soc is None:
        return result | {"reason": "no_soc"}
    if not episodes:
        return result | {"reason": "no_outages"}
    if hours < AUTONOMY_MIN_HOURS:
        return result | {"reason": "too_little_evidence"}
    if drop <= 0:
        return result | {"reason": "no_net_discharge"}

    rate = drop / hours
    soc_now = result["soc_now"]
    return result | {
        "rate_pct_per_hour": rate,
        "hours_from_full": (100.0 - low_pct) / rate,
        "hours_from_now": (
            (soc_now - low_pct) / rate if soc_now is not None and soc_now > low_pct else None
        ),
    }


def _aligned_to_series(
    aligned: Sequence[AlignedInterval],
    start: datetime,
    end: datetime,
    value_of: Callable[[tuple[float, ...]], float],
) -> Series:
    """Turn aligned intervals back into a series, with a gap wherever they break."""
    samples: list[Sample] = []
    previous_end: datetime | None = None
    for item in aligned:
        if previous_end is not None and item.start > previous_end:
            samples.append(Sample(previous_end, None))
        samples.append(Sample(item.start, value_of(item.values)))
        previous_end = item.end
    if previous_end is not None and previous_end < end:
        samples.append(Sample(previous_end, None))
    return Series.of(start, end, samples)


def sum_series(parts: Sequence[Series]) -> Series:
    """Per-phase readings added on a common timeline.

    No preset produces a grid-power total, only phases; this is where the
    "total wins" rule has nothing to apply to and the sum has to stand in.
    A gap in any phase is a gap in the sum, as it is everywhere else here.
    """
    if not parts:
        raise ValueError("nothing to sum")
    return _aligned_to_series(align(list(parts)), parts[0].start, parts[0].end, sum)


def infer_grid_series(
    grid_power: Series, battery_power: Series, *, zero_w: float, idle_w: float
) -> Series:
    """Guess at grid presence from what the flows look like.

    Off-grid when nothing crosses the grid connection while the battery is
    discharging. This is the weakest thing on the page and the tab says so:
    a night the battery carries the house with nothing crossing the grid
    connection looks exactly like an outage, and a daytime outage the sun
    covers is not seen at all. It exists for an installation that has no
    presence sensor to map, and the banner asks for one.

    battery_power arrives with the configured sign applied, so discharging
    is negative here whatever the vendor's convention.
    """

    def presence(values: tuple[float, ...]) -> float:
        grid, battery = values
        return 0.0 if abs(grid) <= zero_w and battery < -idle_w else 1.0

    return _aligned_to_series(
        align([grid_power, battery_power]), grid_power.start, grid_power.end, presence
    )


def build_grid_payload(
    grid: Series,
    *,
    window: Window,
    tz: tzinfo,
    source: str,
    low_pct: float,
    soc: Series | None = None,
    load: Series | None = None,
    counted_from: datetime | None = None,
) -> dict[str, Any]:
    """Outages, their distribution over the day and the period, and the KPIs.

    Every share here divides by measured seconds — the time the sensor had a
    state — and never by the window. Dividing by the window would let a
    sensor that was unavailable for half the period report half the outages
    it had.
    """
    intervals = to_intervals(grid)
    measured = sum(item.seconds for item in intervals)
    off = sum(item.seconds for item in intervals if item.value < _PRESENT)
    min_seconds = OUTAGE_MIN_SECONDS if source == SOURCE_SENSOR else INFERRED_MIN_SECONDS
    outages = outage_episodes(
        intervals, window=window, min_seconds=min_seconds, bridge_seconds=OUTAGE_BRIDGE_SECONDS
    )
    longest = max(outages, key=lambda item: item.seconds, default=None)
    episodes = [
        _describe(outage) | _battery_columns(outage, soc, load, low_pct) for outage in outages
    ]

    return {
        "source": source,
        "counted_from": counted_from.isoformat() if counted_from else None,
        "coverage": coverage(grid),
        "measured_seconds": measured,
        "low_pct": low_pct,
        "has_soc": soc is not None,
        "has_load": load is not None,
        "kpi": {
            "count": len(outages),
            "off_seconds": off,
            "off_share": (off / measured) if measured > 0 else None,
            "longest_seconds": longest.seconds if longest else None,
            "longest_start": longest.start.isoformat() if longest else None,
            "mean_seconds": (
                sum(item.seconds for item in outages) / len(outages) if outages else None
            ),
            # Only from a real sensor: a flicker cannot be inferred from flows.
            "brief_interruptions": (
                brief_interruptions(
                    intervals, min_seconds=min_seconds, bridge_seconds=OUTAGE_BRIDGE_SECONDS
                )
                if source == SOURCE_SENSOR
                else None
            ),
        },
        "hours": _by_hour(intervals, tz),
        "days": _by_day(intervals, outages, tz),
        "episodes": episodes,
        "autonomy": _autonomy(episodes, soc, low_pct),
    }


async def async_grid_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the sensors and compute the outage analytics.

    Raw states only, whichever mode: a binary sensor has no statistics, and
    an hourly mean of grid power cannot say when inside the hour it was zero.
    """
    countable = countable_window(hass, window)
    presence_id = config.entity_id("grid_connected")
    battery_id = config.entity_id("battery_power")
    grid_id = config.entity_id("grid_power")
    phase_ids = config.entity_ids("grid_power_phase")

    if presence_id:
        source = SOURCE_SENSOR
    elif battery_id and (grid_id or phase_ids):
        source = SOURCE_INFERRED
    else:
        raise ValueError(
            "grid_connected is not configured, and outages cannot be inferred "
            "without grid power and battery power"
        )

    soc_id = config.entity_id("battery_soc")
    load_id = config.entity_id("load_power")
    numeric = [entity_id for entity_id in (soc_id, load_id) if entity_id]
    signs: dict[str, float] = {}
    if source == SOURCE_INFERRED:
        flow_ids = [grid_id] if grid_id else list(phase_ids)
        numeric += [battery_id, *flow_ids]
        signs[battery_id] = config.sign("battery_power")
        signs |= {
            entity_id: config.sign("grid_power" if grid_id else "grid_power_phase")
            for entity_id in flow_ids
        }

    results = await async_series_many(hass, numeric, countable.window, signs) if numeric else {}

    if source == SOURCE_SENSOR:
        grid = await async_binary_series(hass, presence_id, countable.window)
        series_block = {
            "grid_connected": describe_series(presence_id, SeriesResult(grid, Precision.RAW, None))
        }
    else:
        flows = [results[entity_id].series for entity_id in flow_ids]
        grid = infer_grid_series(
            flows[0] if grid_id else sum_series(flows),
            results[battery_id].series,
            zero_w=config.number("grid_zero_w") or DEFAULT_GRID_ZERO_W,
            idle_w=config.number("battery_idle_w") or DEFAULT_BATTERY_IDLE_W,
        )
        series_block = {
            "battery_power": describe_series(battery_id, results[battery_id]),
            **{
                f"grid_{index + 1}": describe_series(eid, results[eid])
                for index, eid in enumerate(flow_ids)
            },
        }

    zone = dt_util.get_time_zone(hass.config.time_zone) or dt_util.UTC
    payload = build_grid_payload(
        grid,
        window=countable.window,
        tz=zone,
        source=source,
        low_pct=config.number("battery_low_pct") or DEFAULT_BATTERY_LOW_PCT,
        soc=results[soc_id].series if soc_id else None,
        load=results[load_id].series if load_id else None,
        counted_from=countable.counted_from,
    )
    if soc_id:
        series_block["battery_soc"] = describe_series(soc_id, results[soc_id])
    if load_id:
        series_block["load_total"] = describe_series(load_id, results[load_id])
    payload["series"] = series_block
    payload["precision"] = Precision.RAW.value
    payload["boundary"] = None
    payload["timezone"] = str(zone)
    return payload
