"""Тести епізодів, стійкого навантаження та бакетизації по годинах доби."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest

from custom_components.inverter_analytics.analytics.resample import (
    Interval,
    episodes_above,
    episodes_below,
    hour_of_day_durations,
    max_sustained_mean,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)
KYIV = ZoneInfo("Europe/Kyiv")


def interval(start_min: float, end_min: float, value: float) -> Interval:
    return Interval(BASE + timedelta(minutes=start_min), BASE + timedelta(minutes=end_min), value)


def test_adjacent_intervals_merge_into_one_episode():
    intervals = [interval(0, 10, 10.0), interval(10, 20, 5.0), interval(20, 30, 50.0)]
    episodes = episodes_below(intervals, threshold=20.0)
    assert len(episodes) == 1
    assert episodes[0].start == BASE
    assert episodes[0].end == BASE + timedelta(minutes=20)
    assert episodes[0].seconds == 1200.0
    assert episodes[0].extreme == 5.0
    assert episodes[0].mean == 7.5


def test_intervals_split_by_a_gap_do_not_merge():
    """Розрив у даних розриває епізод — інакше ми вигадаємо просадку, якої не було."""
    intervals = [interval(0, 10, 5.0), interval(20, 30, 5.0)]
    episodes = episodes_below(intervals, threshold=20.0)
    assert len(episodes) == 2


def test_short_episodes_are_filtered_by_min_seconds():
    intervals = [interval(0, 1, 5.0), interval(1, 10, 50.0), interval(10, 30, 5.0)]
    episodes = episodes_below(intervals, threshold=20.0, min_seconds=300.0)
    assert len(episodes) == 1
    assert episodes[0].seconds == 1200.0


def test_episodes_above_report_the_peak():
    intervals = [interval(0, 10, 9000.0), interval(10, 20, 9500.0), interval(20, 30, 1000.0)]
    episodes = episodes_above(intervals, threshold=8000.0)
    assert len(episodes) == 1
    assert episodes[0].extreme == 9500.0
    assert episodes[0].seconds == 1200.0


def test_no_episodes_when_threshold_is_never_crossed():
    assert episodes_above([interval(0, 60, 100.0)], threshold=1000.0) == []


def test_max_sustained_mean_finds_the_worst_window_across_boundaries():
    """Пік 6000 Вт триває 5 хв — 15-хвилинне стійке навантаження нижче за пік."""
    intervals = [interval(0, 10, 1000.0), interval(10, 15, 6000.0), interval(15, 60, 1000.0)]
    result = max_sustained_mean(intervals, window_seconds=900.0)
    assert result == pytest.approx((1000 * 600 + 6000 * 300) / 900)


def test_max_sustained_mean_needs_a_full_window():
    assert max_sustained_mean([interval(0, 10, 1000.0)], window_seconds=900.0) is None


def test_max_sustained_mean_ignores_windows_spanning_a_gap():
    intervals = [interval(0, 10, 9000.0), interval(30, 40, 9000.0)]
    assert max_sustained_mean(intervals, window_seconds=900.0) is None


def test_max_sustained_mean_of_constant_series_equals_that_value():
    assert max_sustained_mean([interval(0, 60, 1234.0)], window_seconds=900.0) == pytest.approx(
        1234.0
    )


def test_hour_buckets_split_an_interval_across_local_hours():
    intervals = [Interval(BASE, BASE + timedelta(hours=3), 100.0)]
    totals = hour_of_day_durations(intervals, KYIV)
    assert sum(totals) == 3 * 3600
    # BASE — це 2026-01-01T00:00Z, тобто 02:00 за київським часом узимку.
    assert totals[2] == 3600.0
    assert totals[3] == 3600.0
    assert totals[4] == 3600.0
    assert [value for index, value in enumerate(totals) if index not in (2, 3, 4)] == [0.0] * 21


def test_hour_buckets_skip_the_hour_lost_to_spring_dst():
    """У Києві 2025-03-30 година 03:00 не існує — доба має 23 години."""
    start = datetime(2025, 3, 30, tzinfo=KYIV).astimezone(UTC)
    end = datetime(2025, 3, 31, tzinfo=KYIV).astimezone(UTC)
    totals = hour_of_day_durations([Interval(start, end, 100.0)], KYIV)
    assert totals[3] == 0.0
    assert totals[2] == 3600.0
    assert totals[4] == 3600.0
    assert sum(totals) == 23 * 3600


def test_hour_buckets_double_the_hour_repeated_by_autumn_dst():
    """У Києві 2025-10-26 година 03:00 повторюється — доба має 25 годин."""
    start = datetime(2025, 10, 26, tzinfo=KYIV).astimezone(UTC)
    end = datetime(2025, 10, 27, tzinfo=KYIV).astimezone(UTC)
    totals = hour_of_day_durations([Interval(start, end, 100.0)], KYIV)
    assert totals[3] == 7200.0
    assert sum(totals) == 25 * 3600
