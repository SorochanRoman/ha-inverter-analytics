"""Tests for merging several series onto one timeline."""

from datetime import UTC, datetime, timedelta

from custom_components.inverter_analytics.analytics.resample import (
    Sample,
    Series,
    align,
    aligned_coverage,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def hour_series(*samples: Sample) -> Series:
    return Series.of(BASE, at(60), samples)


def spans(aligned):
    return [
        ((interval.start - BASE).total_seconds() / 60, interval.seconds / 60, interval.values)
        for interval in aligned
    ]


def test_a_change_in_either_series_cuts_the_timeline():
    a = hour_series(Sample(at(0), 10.0), Sample(at(20), 20.0))
    b = hour_series(Sample(at(0), 1.0), Sample(at(45), 2.0))
    assert spans(align([a, b])) == [
        (0.0, 20.0, (10.0, 1.0)),
        (20.0, 25.0, (20.0, 1.0)),
        (45.0, 15.0, (20.0, 2.0)),
    ]


def test_series_updating_at_different_rates_stay_aligned():
    fast = hour_series(*[Sample(at(minute), float(minute)) for minute in range(0, 60, 10)])
    slow = hour_series(Sample(at(0), 100.0), Sample(at(30), 200.0))
    aligned = align([fast, slow])
    assert [interval.values for interval in aligned] == [
        (0.0, 100.0),
        (10.0, 100.0),
        (20.0, 100.0),
        (30.0, 200.0),
        (40.0, 200.0),
        (50.0, 200.0),
    ]
    assert sum(interval.seconds for interval in aligned) == 3600.0


def test_a_gap_in_one_of_three_invalidates_only_that_span():
    a = hour_series(Sample(at(0), 1.0))
    b = hour_series(Sample(at(0), 2.0), Sample(at(20), None), Sample(at(40), 3.0))
    c = hour_series(Sample(at(0), 5.0))
    assert spans(align([a, b, c])) == [
        (0.0, 20.0, (1.0, 2.0, 5.0)),
        (40.0, 20.0, (1.0, 3.0, 5.0)),
    ]


def test_two_series_changing_at_the_same_instant_produce_one_cut():
    a = hour_series(Sample(at(0), 1.0), Sample(at(30), 2.0))
    b = hour_series(Sample(at(0), 10.0), Sample(at(30), 20.0))
    assert spans(align([a, b])) == [(0.0, 30.0, (1.0, 10.0)), (30.0, 30.0, (2.0, 20.0))]


def test_a_series_starting_late_leaves_the_head_of_the_window_uncovered():
    a = hour_series(Sample(at(0), 1.0))
    b = hour_series(Sample(at(15), 2.0))
    assert spans(align([a, b])) == [(15.0, 45.0, (1.0, 2.0))]


def test_a_shorter_window_clips_the_aligned_result_to_the_overlap():
    a = hour_series(Sample(at(0), 1.0))
    b = Series.of(at(10), at(40), [Sample(at(10), 2.0)])
    assert spans(align([a, b])) == [(10.0, 30.0, (1.0, 2.0))]


def test_windows_that_do_not_overlap_align_to_nothing():
    a = Series.of(BASE, at(10), [Sample(at(0), 1.0)])
    b = Series.of(at(20), at(30), [Sample(at(20), 2.0)])
    assert align([a, b]) == []


def test_aligning_nothing_is_not_an_error():
    assert align([]) == []


def test_a_single_series_aligns_to_its_own_intervals():
    a = hour_series(Sample(at(0), 1.0), Sample(at(30), 2.0))
    assert spans(align([a])) == [(0.0, 30.0, (1.0,)), (30.0, 30.0, (2.0,))]


def test_aligned_coverage_reports_the_span_where_every_series_had_data():
    a = hour_series(Sample(at(0), 1.0))
    b = hour_series(Sample(at(0), 2.0), Sample(at(30), None))
    aligned = align([a, b])
    assert aligned_coverage(aligned, 3600.0) == 0.5


def test_aligned_coverage_of_an_empty_window_is_zero_not_a_division_error():
    assert aligned_coverage([], 0.0) == 0.0
