"""Per-phase load analytics and imbalance.

Everything here works from intervals that have already been aligned onto one
timeline, so a value at an instant is comparable across phases. The module has
no dependency on Home Assistant beyond the role naming it is handed.
"""

from __future__ import annotations

from collections.abc import Sequence
from typing import Any

from ..roles import PartIdentity
from .resample import (
    AlignedInterval,
    Interval,
    aligned_coverage,
    duration_histogram,
    episodes_above,
    percentile_in_range,
    time_weighted_mean,
)

MIN_PHASES = 2
IMBALANCE_BUCKET_WIDTH = 0.02
IMBALANCE_MAX_BUCKETS = 100
EPISODE_MIN_SECONDS = 60.0


def imbalance_of(values: Sequence[float]) -> float | None:
    """Spread between phases as a share of their average.

    None when the average is not positive: at zero or reverse flow there is no
    meaningful denominator, and dividing by it would produce a spike exactly
    where the reading matters least.
    """
    if len(values) < MIN_PHASES:
        return None
    average = sum(values) / len(values)
    if average <= 0:
        return None
    return (max(values) - min(values)) / average


def _phase_intervals(aligned: Sequence[AlignedInterval], index: int) -> list[Interval]:
    return [Interval(item.start, item.end, item.values[index]) for item in aligned]


def _phase_stats(intervals: Sequence[Interval]) -> dict[str, float | None]:
    values = [interval.value for interval in intervals]
    observed_min = min(values, default=None)
    observed_max = max(values, default=None)
    histogram = duration_histogram(
        intervals, bucket_width=max((observed_max or 1.0) / 40.0, 1e-9), max_buckets=200
    )
    return {
        "mean": time_weighted_mean(intervals),
        "p95": percentile_in_range(histogram, 0.95, observed_min, observed_max),
        "peak": observed_max,
    }


def _rating_per_phase(
    identities: Sequence[PartIdentity], rated_power: float, configured: float | None
) -> tuple[float, bool, int]:
    """The per-phase power limit, and whether it had to be derived.

    Deriving it means splitting the total rating evenly, which is only true of
    the phases the hardware actually has — not of the ones that happen to be
    mapped. A user who mapped L1 and L3 has at least three, and the index read
    back from the entity id is what says so; without it the divisor would be
    two and every headroom figure would be optimistic by half.
    """
    indices = [item.index for item in identities if item.index is not None]
    divisor = max(len(identities), max(indices, default=0))
    if configured is not None and configured > 0:
        return configured, False, divisor
    return rated_power / divisor, True, divisor


def build_phase_payload(
    aligned: Sequence[AlignedInterval],
    identities: Sequence[PartIdentity],
    *,
    rated_power: float,
    window_seconds: float,
    per_phase_rating: float | None,
    floor_pct: float,
    threshold_pct: float,
) -> dict[str, Any] | None:
    """Per-phase figures and the imbalance distribution, or None if inapplicable.

    None rather than an empty section: with fewer than two phases there is no
    spread to measure, and the UI is meant to render nothing at all instead of
    a section full of dashes.
    """
    if len(identities) < MIN_PHASES:
        return None

    floor_w = rated_power * floor_pct / 100.0
    threshold = threshold_pct / 100.0
    rating, rating_derived, divisor = _rating_per_phase(identities, rated_power, per_phase_rating)

    per_phase = []
    means: list[float] = []
    for index, identity in enumerate(identities):
        stats = _phase_stats(_phase_intervals(aligned, index))
        means.append(stats["mean"] or 0.0)
        per_phase.append(
            {
                "key": identity.key,
                "label": identity.label,
                "index": identity.index,
                **stats,
                "headroom": None if stats["peak"] is None else stats["peak"] / rating,
            }
        )

    total_mean = sum(means)
    for entry, mean in zip(per_phase, means, strict=True):
        entry["share"] = (mean / total_mean) if total_mean > 0 else None

    gated: list[tuple[Interval, tuple[float, ...]]] = []
    below_floor_seconds = 0.0
    for item in aligned:
        total = sum(item.values)
        value = imbalance_of(item.values) if total >= floor_w else None
        if value is None:
            below_floor_seconds += item.seconds
            continue
        gated.append((Interval(item.start, item.end, value), item.values))

    imbalance = _imbalance_summary(gated, threshold, window_seconds)
    imbalance |= {
        "threshold": threshold,
        "floor_w": floor_w,
        "below_floor_seconds": below_floor_seconds,
        "aligned_coverage": aligned_coverage(aligned, window_seconds),
    }

    return {
        "per_phase": per_phase,
        "rating_per_phase": rating,
        "rating_per_phase_derived": rating_derived,
        "rating_per_phase_divisor": divisor,
        "imbalance": imbalance,
        "episodes": _imbalance_episodes(gated, threshold),
    }


def _imbalance_summary(
    gated: Sequence[tuple[Interval, tuple[float, ...]]], threshold: float, window_seconds: float
) -> dict[str, Any]:
    """Distribution of the imbalance over the time it could be measured at all."""
    intervals = [interval for interval, _ in gated]
    analysed = sum(interval.seconds for interval in intervals)
    if not intervals or analysed <= 0:
        return {
            "mean": None,
            "p95": None,
            "fraction_above": None,
            "analysed_seconds": 0.0,
            "coverage": 0.0,
            "histogram": [],
        }

    values = [interval.value for interval in intervals]
    histogram = duration_histogram(
        intervals, bucket_width=IMBALANCE_BUCKET_WIDTH, max_buckets=IMBALANCE_MAX_BUCKETS
    )
    above = sum(interval.seconds for interval in intervals if interval.value > threshold)
    return {
        "mean": time_weighted_mean(intervals),
        "p95": percentile_in_range(histogram, 0.95, min(values), max(values)),
        "fraction_above": above / analysed,
        "analysed_seconds": analysed,
        "coverage": (analysed / window_seconds) if window_seconds > 0 else 0.0,
        "histogram": [
            {"start": bucket.start, "end": bucket.end, "fraction": bucket.fraction}
            for bucket in histogram.buckets()
        ],
    }


def _imbalance_episodes(
    gated: Sequence[tuple[Interval, tuple[float, ...]]], threshold: float
) -> list[dict[str, Any]]:
    """Runs above the threshold, each carrying the phase values at its worst moment."""
    intervals = [interval for interval, _ in gated]
    episodes = episodes_above(intervals, threshold=threshold, min_seconds=EPISODE_MIN_SECONDS)

    result = []
    for episode in episodes:
        inside = [
            (interval.value, values)
            for interval, values in gated
            if interval.start >= episode.start and interval.end <= episode.end
        ]
        peak_value, peak_phases = max(inside, key=lambda item: item[0])
        result.append(
            {
                "start": episode.start.isoformat(),
                "end": episode.end.isoformat(),
                "seconds": episode.seconds,
                "peak_imbalance": peak_value,
                "mean_imbalance": episode.mean,
                "phases": list(peak_phases),
            }
        )
    return result
