"""Inverter load analytics."""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Mapping, Sequence
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import DEFAULT_IMBALANCE_FLOOR_PCT, DEFAULT_IMBALANCE_THRESHOLD_PCT
from ..roles import EntryConfig, PartIdentity, part_identities
from .consistency import compare_total_with_parts
from .phases import MIN_PHASES as MIN_PARTS
from .phases import build_parts_summary, build_phase_payload
from .resample import (
    AlignedInterval,
    Interval,
    Series,
    align,
    aligned_coverage,
    clamp,
    coverage,
    duration_curve,
    duration_histogram,
    episodes_above,
    max_sustained_mean,
    percentile_in_range,
    time_weighted_mean,
    to_intervals,
)
from .source import SeriesResult, Window, async_series_many, describe_series

BANDS: tuple[tuple[str, float, float | None], ...] = (
    ("0-10", 0.0, 0.10),
    ("10-25", 0.10, 0.25),
    ("25-50", 0.25, 0.50),
    ("50-75", 0.50, 0.75),
    ("75-100", 0.75, 1.00),
    ("100+", 1.00, None),
)

SUSTAINED_WINDOW_SECONDS = 15 * 60
OVERLOAD_MIN_SECONDS = 60.0
HIGH_LOAD_SHARE = 0.8
DURATION_CURVE_POINTS = 60


# The lower edge of each band, as a share of rated power. Kept next to BANDS
# rather than derived at each call so the two cannot drift.
_BAND_EDGES: tuple[float, ...] = tuple(low for _, low, _ in BANDS)


def _band_seconds(intervals: Sequence[Interval], rated_power: float) -> tuple[list[float], float]:
    """Seconds in each band, and seconds above the high-load share.

    One pass rather than one scan per band. The lowest band also catches
    negative values — the same way the histogram clamps them into bucket zero.
    Otherwise they would vanish from the numerators while staying in the
    denominator, and the fractions would stop summing to one.
    histogram.clipped_low_seconds shows exactly how much time was below zero.
    """
    seconds = [0.0] * len(BANDS)
    high_seconds = 0.0
    for interval in intervals:
        share = interval.value / rated_power
        index = max(bisect_right(_BAND_EDGES, share) - 1, 0)
        seconds[index] += interval.seconds
        if share >= HIGH_LOAD_SHARE:
            high_seconds += interval.seconds
    return seconds, high_seconds


def build_load_payload(
    series: Series, rated_power: float, bucket_count: int = 40
) -> dict[str, Any]:
    """Compute the full load analytics from a ready-made series."""
    if rated_power <= 0:
        raise ValueError("rated_power must be positive")

    intervals = to_intervals(series)
    total_seconds = sum(interval.seconds for interval in intervals)
    bucket_width = rated_power / bucket_count
    histogram = duration_histogram(intervals, bucket_width=bucket_width)
    observed_min = min((interval.value for interval in intervals), default=None)
    observed_max = max((interval.value for interval in intervals), default=None)

    band_seconds, high_seconds = _band_seconds(intervals, rated_power)
    bands = [
        {
            "key": key,
            "from": low_share,
            "to": high_share,
            "seconds": seconds,
            "fraction": (seconds / total_seconds) if total_seconds > 0 else 0.0,
        }
        for (key, low_share, high_share), seconds in zip(BANDS, band_seconds, strict=True)
    ]

    overloads = episodes_above(intervals, threshold=rated_power, min_seconds=OVERLOAD_MIN_SECONDS)

    return {
        "coverage": coverage(series),
        "rated_power": rated_power,
        "kpi": {
            "mean": time_weighted_mean(intervals),
            "median": percentile_in_range(histogram, 0.5, observed_min, observed_max),
            "p95": percentile_in_range(histogram, 0.95, observed_min, observed_max),
            "max": observed_max,
            "fraction_above_80pct": (high_seconds / total_seconds) if total_seconds > 0 else None,
            "max_sustained_15m": max_sustained_mean(intervals, SUSTAINED_WINDOW_SECONDS),
        },
        "histogram": {
            "bucket_width": bucket_width,
            # Time outside the histogram's range gets clamped into the edge buckets
            # and labeled with their bounds. These counters say exactly how much
            # time is mislabeled — the UI must surface this, not stay silent about it.
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
        # The curve is built from the same percentiles as the KPIs, so we clamp
        # it the same way: otherwise its leftmost point would draw a peak higher
        # than the "Peak" card on the same screen.
        "duration_curve": [
            {"fraction": fraction, "value": clamp(value, observed_min, observed_max)}
            for fraction, value in duration_curve(histogram, points=DURATION_CURVE_POINTS)
        ],
        "bands": bands,
        "overloads": [
            {
                "start": episode.start.isoformat(),
                "end": episode.end.isoformat(),
                "seconds": episode.seconds,
                "peak": episode.extreme,
            }
            for episode in overloads
        ],
    }


def _parts_worth_reading(config: EntryConfig, role_key: str) -> tuple[str, ...]:
    """A multiple role's entities, or nothing when there are too few to compare."""
    entity_ids = config.entity_ids(role_key)
    return entity_ids if len(entity_ids) >= MIN_PARTS else ()


def _aligned_parts(
    role_key: str,
    entity_ids: Sequence[str],
    results: Mapping[str, SeriesResult],
) -> tuple[list[AlignedInterval], tuple[PartIdentity, ...]]:
    """Put one multiple role's entities on a common timeline."""
    identities = part_identities(role_key, entity_ids)
    aligned = align([results[entity_id].series for entity_id in entity_ids])
    return aligned, identities


async def async_load_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the data and compute the load analytics."""
    total_id = config.entity_id("load_power")
    rated_power = config.number("rated_power")
    if total_id is None or rated_power is None:
        raise ValueError("load_power or rated_power is not configured")

    # Fetched only when there are enough of them to compare. A lone phase
    # sensor produces no section, and reading it would be a recorder query
    # whose result is discarded.
    phase_ids = _parts_worth_reading(config, "load_power_phase")
    string_ids = _parts_worth_reading(config, "pv_power_string")
    # Read only to be checked against its strings; the PV analytics themselves
    # are not on this tab.
    pv_total_id = config.entity_id("pv_power") if string_ids else None

    # One entity may legitimately fill two roles — a single-phase inverter
    # whose only phase sensor is also its total. async_series_many reads each
    # entity once, and the sign is a property of the role, so the later role
    # wins here; the roles that can overlap all share sign 1.0.
    signs = {total_id: config.sign("load_power")}
    signs |= {entity_id: config.sign("load_power_phase") for entity_id in phase_ids}
    signs |= {entity_id: config.sign("pv_power_string") for entity_id in string_ids}

    if pv_total_id:
        signs[pv_total_id] = config.sign("pv_power")

    results = await async_series_many(
        hass,
        [total_id, *phase_ids, *string_ids, *([pv_total_id] if pv_total_id else [])],
        window,
        signs,
    )
    payload = build_load_payload(results[total_id].series, rated_power=rated_power)

    series_block = {"load_total": describe_series(total_id, results[total_id])}

    if phase_ids:
        aligned, identities = _aligned_parts("load_power_phase", phase_ids, results)
        for identity, entity_id in zip(identities, phase_ids, strict=True):
            series_block[identity.key] = describe_series(entity_id, results[entity_id])
        payload["phases"] = build_phase_payload(
            aligned,
            identities,
            rated_power=rated_power,
            window_seconds=window.seconds,
            per_phase_rating=config.number("rated_power_per_phase"),
            floor_pct=config.number("imbalance_floor_pct") or DEFAULT_IMBALANCE_FLOOR_PCT,
            threshold_pct=(
                config.number("imbalance_threshold_pct") or DEFAULT_IMBALANCE_THRESHOLD_PCT
            ),
        )

    if string_ids:
        aligned, identities = _aligned_parts("pv_power_string", string_ids, results)
        for identity, entity_id in zip(identities, string_ids, strict=True):
            series_block[identity.key] = describe_series(entity_id, results[entity_id])
        payload["strings"] = {
            "parts": build_parts_summary(aligned, identities),
            "aligned_coverage": aligned_coverage(aligned, window.seconds),
        }

    checks = {
        "load": (
            compare_total_with_parts(
                results[total_id].series, [results[eid].series for eid in phase_ids]
            )
            if phase_ids
            else None
        ),
        "pv": (
            compare_total_with_parts(
                results[pv_total_id].series, [results[eid].series for eid in string_ids]
            )
            if pv_total_id
            else None
        ),
    }
    payload["consistency"] = {key: value for key, value in checks.items() if value}
    payload["series"] = series_block

    # The top-level fields describe the primary series, the total load: that is
    # what the badge shows. Anything reading a different series takes its own
    # numbers from the series block, where they can genuinely differ.
    primary = results[total_id]
    payload["precision"] = primary.precision.value
    payload["boundary"] = primary.boundary.isoformat() if primary.boundary else None
    return payload
