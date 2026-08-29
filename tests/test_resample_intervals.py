"""Тести перетворення станів на інтервали та зважених середніх."""

from datetime import UTC, datetime, timedelta

from custom_components.inverter_analytics.analytics.resample import (
    Sample,
    Series,
    coverage,
    time_weighted_mean,
    to_intervals,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def hour_series(*samples: Sample) -> Series:
    return Series.of(BASE, at(60), samples)


def test_two_states_split_the_window_by_duration():
    series = hour_series(Sample(at(0), 100.0), Sample(at(30), 200.0))
    intervals = to_intervals(series)
    assert [(iv.value, iv.seconds) for iv in intervals] == [(100.0, 1800.0), (200.0, 1800.0)]
    assert time_weighted_mean(intervals) == 150.0
    assert coverage(series) == 1.0


def test_uneven_durations_are_weighted_not_averaged():
    """Наївне середнє дало б 150, правильне — 175."""
    series = hour_series(Sample(at(0), 100.0), Sample(at(15), 200.0))
    intervals = to_intervals(series)
    assert time_weighted_mean(intervals) == 175.0


def test_sample_before_window_is_clipped_to_window_start():
    series = Series.of(BASE, at(60), [Sample(at(-10), 100.0), Sample(at(30), 200.0)])
    intervals = to_intervals(series)
    assert intervals[0].start == BASE
    assert intervals[0].seconds == 1800.0
    assert coverage(series) == 1.0


def test_samples_after_window_end_are_dropped():
    series = Series.of(BASE, at(60), [Sample(at(0), 100.0), Sample(at(90), 999.0)])
    intervals = to_intervals(series)
    assert len(intervals) == 1
    assert intervals[0].end == at(60)


def test_unavailable_states_are_excluded_and_reduce_coverage():
    series = hour_series(Sample(at(0), 100.0), Sample(at(15), None), Sample(at(45), 100.0))
    intervals = to_intervals(series)
    assert [iv.seconds for iv in intervals] == [900.0, 900.0]
    assert time_weighted_mean(intervals) == 100.0
    assert coverage(series) == 0.5


def test_single_sample_covers_the_whole_window():
    series = hour_series(Sample(at(0), 42.0))
    intervals = to_intervals(series)
    assert len(intervals) == 1
    assert intervals[0].value == 42.0
    assert intervals[0].seconds == 3600.0
    assert coverage(series) == 1.0


def test_empty_series_has_no_intervals_no_mean_and_zero_coverage():
    series = hour_series()
    assert to_intervals(series) == []
    assert time_weighted_mean([]) is None
    assert coverage(series) == 0.0


def test_series_of_sorts_unordered_samples():
    series = Series.of(BASE, at(60), [Sample(at(30), 200.0), Sample(at(0), 100.0)])
    assert [s.value for s in series.samples] == [100.0, 200.0]


def test_zero_length_window_has_zero_coverage():
    series = Series.of(BASE, BASE, [Sample(at(-10), 100.0)])
    assert coverage(series) == 0.0
    assert to_intervals(series) == []
