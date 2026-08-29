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


def at_ms(milliseconds: float) -> datetime:
    return BASE + timedelta(milliseconds=milliseconds)


def test_phases_written_microseconds_apart_produce_no_mixed_reading():
    """The seam that made an episode report a state the hardware never had.

    Home Assistant writes one entity at a time, so a reading of 4000/2500/2500
    arriving after 10/5/5 passes through 4000/5/5 for a few milliseconds. Its
    imbalance dwarfs anything real, and a peak taken over instants reports it.
    """
    a = Series.of(BASE, at(60), [Sample(BASE, 10.0), Sample(at_ms(30_000), 4000.0)])
    b = Series.of(BASE, at(60), [Sample(BASE, 5.0), Sample(at_ms(30_002), 2500.0)])
    c = Series.of(BASE, at(60), [Sample(BASE, 5.0), Sample(at_ms(30_004), 2500.0)])

    values = [interval.values for interval in align([a, b, c])]
    assert values == [(10.0, 5.0, 5.0), (4000.0, 2500.0, 2500.0)]


def test_the_old_reading_holds_until_the_last_series_has_been_written():
    """Collapsing onto the first moment of the burst would keep the mixed state
    for the whole interval instead of for milliseconds — worse, not better."""
    a = Series.of(BASE, at(60), [Sample(BASE, 1.0), Sample(at_ms(10_000), 2.0)])
    b = Series.of(BASE, at(60), [Sample(BASE, 10.0), Sample(at_ms(10_400), 20.0)])

    aligned = align([a, b])
    assert [interval.values for interval in aligned] == [(1.0, 10.0), (2.0, 20.0)]
    # The cut lands where the burst ended, not where it began.
    assert aligned[1].start == at_ms(10_400)


def test_changes_further_apart_than_the_settling_window_stay_separate():
    a = Series.of(BASE, at(60), [Sample(BASE, 1.0), Sample(at_ms(10_000), 2.0)])
    b = Series.of(BASE, at(60), [Sample(BASE, 10.0), Sample(at_ms(11_000), 20.0)])

    assert [interval.values for interval in align([a, b])] == [
        (1.0, 10.0),
        (2.0, 10.0),
        (2.0, 20.0),
    ]


def test_a_source_polling_once_a_second_keeps_every_change_of_its_own():
    """The settling window must not swallow a genuinely fast series."""
    samples = [Sample(at_ms(second * 1000), float(second)) for second in range(6)]
    a = Series.of(BASE, at_ms(6000), samples)
    assert len(align([a])) == len(samples)


def test_settling_can_be_turned_off():
    a = Series.of(BASE, at(60), [Sample(BASE, 1.0), Sample(at_ms(10_000), 2.0)])
    b = Series.of(BASE, at(60), [Sample(BASE, 10.0), Sample(at_ms(10_002), 20.0)])
    assert len(align([a, b], settling_seconds=0.0)) == 3
