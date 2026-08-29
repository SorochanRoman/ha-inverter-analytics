"""Аналітика навантаження інвертора."""

from __future__ import annotations

from collections.abc import Sequence
from typing import Any

from homeassistant.core import HomeAssistant

from ..roles import EntryConfig
from .resample import (
    Interval,
    Series,
    coverage,
    duration_curve,
    duration_histogram,
    episodes_above,
    max_sustained_mean,
    percentile,
    time_weighted_mean,
    to_intervals,
)
from .source import Window, async_series, plan_precision

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
    """Сумарна тривалість, коли значення було в межах [low, high)."""
    return sum(
        interval.seconds
        for interval in intervals
        if interval.value >= low and (high is None or interval.value < high)
    )


def build_load_payload(
    series: Series, rated_power: float, bucket_count: int = 40
) -> dict[str, Any]:
    """Порахувати всю аналітику навантаження з готової серії."""
    if rated_power <= 0:
        raise ValueError("rated_power має бути додатним")

    intervals = to_intervals(series)
    total_seconds = sum(interval.seconds for interval in intervals)
    bucket_width = rated_power / bucket_count
    histogram = duration_histogram(intervals, bucket_width=bucket_width)

    bands = []
    for key, low_share, high_share in BANDS:
        low = low_share * rated_power
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
            "median": percentile(histogram, 0.5),
            "p95": percentile(histogram, 0.95),
            "max": max((interval.value for interval in intervals), default=None),
            "fraction_above_80pct": (high_seconds / total_seconds) if total_seconds > 0 else 0.0,
            "max_sustained_15m": max_sustained_mean(intervals, SUSTAINED_WINDOW_SECONDS),
        },
        "histogram": {
            "bucket_width": bucket_width,
            # Час поза діапазоном гістограми втискається в крайні корзини й
            # підписується їхніми межами. Ці лічильники кажуть, скільки саме
            # часу підписано неправдиво — UI має це показати, а не мовчати.
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
        "duration_curve": [
            {"fraction": fraction, "value": value}
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


async def async_load_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Прочитати дані й порахувати аналітику навантаження."""
    entity_id = config.entity_id("load_power")
    rated_power = config.number("rated_power")
    if entity_id is None or rated_power is None:
        raise ValueError("Не задано load_power або rated_power")

    series = await async_series(hass, entity_id, window, sign=config.sign("load_power"))
    payload = build_load_payload(series, rated_power=rated_power)

    plan = plan_precision(hass, window)
    payload["precision"] = plan.precision.value
    payload["boundary"] = plan.boundary.isoformat() if plan.boundary else None
    return payload
