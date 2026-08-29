"""Tests for duration histograms and percentiles."""

from datetime import UTC, datetime, timedelta

import pytest

from custom_components.inverter_analytics.analytics.resample import (
    Interval,
    duration_curve,
    duration_histogram,
    percentile,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def interval(start_min: float, end_min: float, value: float) -> Interval:
    return Interval(BASE + timedelta(minutes=start_min), BASE + timedelta(minutes=end_min), value)


def two_bucket_histogram():
    """An hour at 50 W, an hour at 150 W; buckets 100 W wide."""
    intervals = [interval(0, 60, 50.0), interval(60, 120, 150.0)]
    return duration_histogram(intervals, bucket_width=100.0)


def test_histogram_accumulates_duration_not_sample_count():
    intervals = [interval(0, 50, 50.0), interval(50, 60, 150.0)]
    hist = duration_histogram(intervals, bucket_width=100.0)
    assert hist.seconds == (3000.0, 600.0)
    assert hist.total_seconds == 3600.0


def test_buckets_expose_edges_and_fractions():
    buckets = two_bucket_histogram().buckets()
    assert [(b.start, b.end) for b in buckets] == [(0.0, 100.0), (100.0, 200.0)]
    assert [b.fraction for b in buckets] == [0.5, 0.5]


def test_offset_shifts_bucket_edges():
    hist = duration_histogram([interval(0, 60, 25.0)], bucket_width=10.0, offset=20.0)
    assert hist.seconds == (3600.0,)
    assert hist.buckets()[0].start == 20.0


def test_values_below_offset_land_in_the_first_bucket():
    hist = duration_histogram([interval(0, 60, -5.0)], bucket_width=100.0)
    assert hist.seconds == (3600.0,)


def test_values_above_max_buckets_are_clamped_into_the_last_bucket():
    hist = duration_histogram([interval(0, 60, 10_000.0)], bucket_width=100.0, max_buckets=10)
    assert len(hist.seconds) == 10
    assert hist.seconds[-1] == 3600.0


def test_percentiles_interpolate_inside_buckets():
    hist = two_bucket_histogram()
    assert percentile(hist, 0.0) == 0.0
    assert percentile(hist, 0.25) == 50.0
    assert percentile(hist, 0.5) == 100.0
    assert percentile(hist, 1.0) == 200.0


def test_percentile_of_empty_histogram_is_none():
    assert percentile(duration_histogram([], bucket_width=100.0), 0.5) is None


def test_percentile_rejects_out_of_range_quantile():
    with pytest.raises(ValueError):
        percentile(two_bucket_histogram(), 1.5)


def test_duration_curve_descends_from_peak_to_floor():
    curve = duration_curve(two_bucket_histogram(), points=5)
    fractions = [point[0] for point in curve]
    values = [point[1] for point in curve]
    assert fractions == [0.0, 0.25, 0.5, 0.75, 1.0]
    assert values[0] == 200.0
    assert values[-1] == 0.0
    assert values == sorted(values, reverse=True)


def test_duration_curve_of_empty_histogram_is_empty():
    assert duration_curve(duration_histogram([], bucket_width=100.0)) == []


def test_zero_bucket_width_is_rejected():
    with pytest.raises(ValueError):
        duration_histogram([interval(0, 60, 50.0)], bucket_width=0.0)


def test_clipped_time_is_reported_separately():
    """Out-of-range values must leave a trace, not vanish into the edge buckets."""
    intervals = [interval(0, 30, -50.0), interval(30, 60, 10_000.0)]
    hist = duration_histogram(intervals, bucket_width=100.0, max_buckets=10)
    assert hist.clipped_low_seconds == 1800.0
    assert hist.clipped_high_seconds == 1800.0


def test_values_in_range_report_no_clipping():
    hist = duration_histogram([interval(0, 60, 50.0)], bucket_width=100.0)
    assert hist.clipped_low_seconds == 0.0
    assert hist.clipped_high_seconds == 0.0


def test_clipped_time_still_counts_toward_bucket_totals():
    """Time is never lost: the bucket fractions still sum to 1.0."""
    intervals = [interval(0, 30, 10_000.0), interval(30, 60, 50.0)]
    hist = duration_histogram(intervals, bucket_width=100.0, max_buckets=10)
    assert hist.total_seconds == 3600.0
    assert sum(bucket.fraction for bucket in hist.buckets()) == pytest.approx(1.0)
