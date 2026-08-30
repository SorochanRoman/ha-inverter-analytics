"""How load and production change with the month of the year.

Unlike the other tabs this one cannot be answered from a few days of raw
states: a question about months needs months, which means almost all of it
comes from hourly long-term statistics.
"""

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import UTC, datetime, tzinfo
from typing import Any

from .resample import Interval, Series, coverage, split_local_hours, to_intervals
from .source import Window

# Below this share of a month, its figure is marked incomplete. It is still
# shown: a hole in a row of bars invites the reader to invent a reason for it,
# which is worse than a bar that says how much of the month it stands for.
INCOMPLETE_COVERAGE = 0.6

HOURS_IN_DAY = 24


@dataclass(slots=True)
class _Bucket:
    """A duration-weighted accumulator."""

    weighted: float = 0.0
    seconds: float = 0.0

    def add(self, value: float, seconds: float) -> None:
        self.weighted += value * seconds
        self.seconds += seconds

    @property
    def mean(self) -> float | None:
        return (self.weighted / self.seconds) if self.seconds > 0 else None


@dataclass(slots=True)
class _Hourly:
    """Every clock hour of the window, keyed by its local start."""

    buckets: dict[datetime, _Bucket] = field(default_factory=lambda: defaultdict(_Bucket))

    def add_all(self, intervals: list[Interval], tz: tzinfo) -> None:
        for piece in split_local_hours(intervals, tz):
            key = piece.local.replace(minute=0, second=0, microsecond=0)
            self.buckets[key].add(piece.value, piece.seconds)


def month_key(moment: datetime) -> str:
    """The month a local moment falls in, as YYYY-MM."""
    return f"{moment.year:04d}-{moment.month:02d}"


def _month_span_seconds(year: int, month: int, tz: tzinfo) -> float:
    """How long a calendar month is, in the local zone.

    Converting both local boundaries to UTC is what makes March and October the
    right length in a zone that changes its clocks inside them.
    """
    start = datetime(year, month, 1, tzinfo=tz)
    following = datetime(year + (month == 12), (month % 12) + 1, 1, tzinfo=tz)
    return (following.astimezone(UTC) - start.astimezone(UTC)).total_seconds()


def _months_touched(window: Window, tz: tzinfo) -> dict[str, float]:
    """Every month the window reaches into, with the length of the whole month.

    The whole month, deliberately, not the part the window asked about. The
    point of the figure is comparability: a window ending on the 4th has all of
    the April it requested, and calling that complete would put a three-day bar
    beside a thirty-day one as an equal — the exact reading this is here to
    prevent.
    """
    spans: dict[str, float] = {}
    whole = [Interval(window.start, window.end, 1.0)]
    for piece in split_local_hours(whole, tz):
        key = month_key(piece.local)
        if key not in spans:
            spans[key] = _month_span_seconds(piece.local.year, piece.local.month, tz)
    return spans


def _by_month(hourly: _Hourly) -> dict[str, _Bucket]:
    totals: dict[str, _Bucket] = defaultdict(_Bucket)
    for moment, bucket in hourly.buckets.items():
        totals[month_key(moment)].add(bucket.mean or 0.0, bucket.seconds)
    return totals


def _peak_hourly_by_month(hourly: _Hourly) -> dict[str, float]:
    """The highest hourly average in each month.

    Not the peak load: long-term statistics keep an hourly mean, so the highest
    value anywhere in this data is the busiest *hour*, and a real peak inside it
    has already been averaged away. The interface has to say so where the number
    is shown — the name is the whole of the honesty here.
    """
    peaks: dict[str, float] = {}
    for moment, bucket in hourly.buckets.items():
        mean = bucket.mean
        if mean is None:
            continue
        key = month_key(moment)
        peaks[key] = max(peaks.get(key, mean), mean)
    return peaks


def _by_hour_of_day(hourly: _Hourly) -> list[_Bucket]:
    totals = [_Bucket() for _ in range(HOURS_IN_DAY)]
    for moment, bucket in hourly.buckets.items():
        totals[moment.hour].add(bucket.mean or 0.0, bucket.seconds)
    return totals


def _by_month_and_hour(hourly: _Hourly) -> dict[tuple[str, int], _Bucket]:
    totals: dict[tuple[str, int], _Bucket] = defaultdict(_Bucket)
    for moment, bucket in hourly.buckets.items():
        totals[(month_key(moment), moment.hour)].add(bucket.mean or 0.0, bucket.seconds)
    return totals


def build_seasonality_payload(
    load: Series, pv: Series | None, *, tz: tzinfo, window: Window
) -> dict[str, Any]:
    """Monthly and hour-of-day means, and the two crossed.

    Every month carries its own coverage. A month with three days of data
    plotted beside one with thirty reads as a collapse rather than a gap, and
    the first and last months of any window are almost always partial — the
    most likely to mislead and the least likely to be noticed.
    """
    load_hourly = _Hourly()
    load_hourly.add_all(to_intervals(load), tz)

    pv_hourly = None
    if pv is not None:
        pv_hourly = _Hourly()
        pv_hourly.add_all(to_intervals(pv), tz)

    spans = _months_touched(window, tz)
    load_months = _by_month(load_hourly)
    load_peaks = _peak_hourly_by_month(load_hourly)
    pv_months = _by_month(pv_hourly) if pv_hourly else {}

    months = []
    for key in sorted(spans):
        bucket = load_months.get(key, _Bucket())
        month_seconds = spans[key]
        share = (bucket.seconds / month_seconds) if month_seconds > 0 else 0.0
        months.append(
            {
                "key": key,
                "load_mean": bucket.mean,
                "load_peak_hourly": load_peaks.get(key),
                "pv_mean": pv_months.get(key, _Bucket()).mean if pv_hourly else None,
                "seconds": bucket.seconds,
                "month_seconds": month_seconds,
                "coverage": min(share, 1.0),
                "complete": share >= INCOMPLETE_COVERAGE,
            }
        )

    load_hours = _by_hour_of_day(load_hourly)
    pv_hours = _by_hour_of_day(pv_hourly) if pv_hourly else None
    hours = [
        {
            "hour": hour,
            "load_mean": load_hours[hour].mean,
            "pv_mean": pv_hours[hour].mean if pv_hours else None,
            "seconds": load_hours[hour].seconds,
        }
        for hour in range(HOURS_IN_DAY)
    ]

    cells = _by_month_and_hour(load_hourly)
    return {
        "coverage": coverage(load),
        "incomplete_below": INCOMPLETE_COVERAGE,
        "has_pv": pv is not None,
        "months": months,
        "hours": hours,
        # An hour nobody recorded is not an hour of no load, and none is sent:
        # a cell exists only where a bucket was created, and a bucket is only
        # created by a piece with a duration. There is nothing to filter, which
        # is why no filter stands here pretending to do it.
        "cells": [
            {"month": key, "hour": hour, "load_mean": bucket.mean, "seconds": bucket.seconds}
            for (key, hour), bucket in sorted(cells.items())
        ],
    }
