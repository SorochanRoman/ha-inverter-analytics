"""Inverter load analytics."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import DEFAULT_IMBALANCE_FLOOR_PCT, DEFAULT_IMBALANCE_THRESHOLD_PCT
from ..roles import EntryConfig, PartIdentity, part_identities
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
from .source import SeriesResult, Window, async_series_many

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


def _seconds_between(intervals: Sequence[Interval], low: float, high: float | None) -> float:
    """Total duration for which the value was within [low, high)."""
    return sum(
        interval.seconds
        for interval in intervals
        if interval.value >= low and (high is None or interval.value < high)
    )


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

    bands = []
    for index, (key, low_share, high_share) in enumerate(BANDS):
        # The lowest band also catches negative values — the same way the histogram
        # clamps them into bucket zero. Otherwise they'd vanish from the numerators
        # while staying in the denominator, and the fractions would stop summing to
        # one. histogram.clipped_low_seconds shows exactly how much time was below zero.
        low = float("-inf") if index == 0 else low_share * rated_power
        high = None if high_share is None else high_share * rated_power
        seconds = _seconds_between(intervals, low, high)
        bands.append(
            {
                "key": key,
                "from": low_share,
                "to": high_share,
                "seconds": seconds,
                "fraction": (seconds / total_seconds) if total_seconds > 0 else 0.0,
            }
        )

    high_seconds = _seconds_between(intervals, HIGH_LOAD_SHARE * rated_power, None)
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


def _describe(entity_id: str, result: SeriesResult) -> dict[str, Any]:
    """One entry of the payload's per-series provenance block."""
    return {
        "entity_id": entity_id,
        "precision": result.precision.value,
        "boundary": result.boundary.isoformat() if result.boundary else None,
        "coverage": result.coverage,
    }


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

    phase_ids = config.entity_ids("load_power_phase")
    string_ids = config.entity_ids("pv_power_string")

    # One entity may legitimately fill two roles — a single-phase inverter
    # whose only phase sensor is also its total. async_series_many reads each
    # entity once, and the sign is a property of the role, so the later role
    # wins here; the roles that can overlap all share sign 1.0.
    signs = {total_id: config.sign("load_power")}
    signs |= {entity_id: config.sign("load_power_phase") for entity_id in phase_ids}
    signs |= {entity_id: config.sign("pv_power_string") for entity_id in string_ids}

    results = await async_series_many(hass, [total_id, *phase_ids, *string_ids], window, signs)
    payload = build_load_payload(results[total_id].series, rated_power=rated_power)

    series_block = {"load_total": _describe(total_id, results[total_id])}

    if len(phase_ids) >= MIN_PARTS:
        aligned, identities = _aligned_parts("load_power_phase", phase_ids, results)
        for identity, entity_id in zip(identities, phase_ids, strict=True):
            series_block[identity.key] = _describe(entity_id, results[entity_id])
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

    if len(string_ids) >= MIN_PARTS:
        aligned, identities = _aligned_parts("pv_power_string", string_ids, results)
        for identity, entity_id in zip(identities, string_ids, strict=True):
            series_block[identity.key] = _describe(entity_id, results[entity_id])
        payload["strings"] = {
            "parts": build_parts_summary(aligned, identities),
            "aligned_coverage": aligned_coverage(aligned, window.seconds),
        }

    payload["series"] = series_block

    # The top-level fields describe the primary series, the total load: that is
    # what the badge shows. Anything reading a different series takes its own
    # numbers from the series block, where they can genuinely differ.
    primary = results[total_id]
    payload["precision"] = primary.precision.value
    payload["boundary"] = primary.boundary.isoformat() if primary.boundary else None
    return payload
