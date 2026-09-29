"""Tests for the sizing verdicts."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.sizing import (
    BORDERLINE,
    ENOUGH,
    SHORT,
    inverter_evidence,
    inverter_verdict,
    local_day,
    rows_by_month,
)
from custom_components.inverter_analytics.analytics.source import HourlyRow

KYIV = ZoneInfo("Europe/Kyiv")
BASE = datetime(2026, 3, 1, tzinfo=UTC)
RATED = 8000.0


def hour(
    index: int, *, mean: float = 1000.0, low: float = 500.0, high: float = 2000.0
) -> HourlyRow:
    return HourlyRow(BASE + timedelta(hours=index), mean, low, high)


def hours(count: int, **kwargs) -> list[HourlyRow]:
    return [hour(index, **kwargs) for index in range(count)]


def test_inverter_evidence_counts_hours_by_their_peak():
    rows = [
        *hours(10),
        hour(10, high=RATED),
        hour(11, high=RATED * 0.85),
        hour(12, high=RATED * 0.8),
    ]
    evidence = inverter_evidence(rows, RATED)
    assert evidence["measured_hours"] == 13
    assert evidence["hours_at_rated"] == 1
    assert evidence["hours_above_high"] == 3, (
        "at rated counts as above 80% too, and 80% exactly counts"
    )
    assert evidence["peak_w"] == RATED


def test_inverter_is_short_when_more_than_one_percent_of_hours_reach_rated():
    rows = [*hours(99), hour(99, high=RATED), hour(100, high=RATED)]
    assert inverter_verdict(inverter_evidence(rows, RATED))["verdict"] == SHORT


def test_exactly_one_percent_at_rated_is_borderline_not_short():
    rows = [*hours(99), hour(99, high=RATED)]
    assert inverter_verdict(inverter_evidence(rows, RATED))["verdict"] == BORDERLINE


def test_one_hour_at_rated_in_an_idle_month_is_borderline():
    rows = [*hours(700), hour(700, high=RATED)]
    assert inverter_verdict(inverter_evidence(rows, RATED))["verdict"] == BORDERLINE


def test_high_load_hours_just_over_five_percent_are_borderline_and_just_under_are_enough():
    over = hours(94) + hours(6, high=RATED * 0.9)
    under = hours(95) + hours(5, high=RATED * 0.9)
    assert inverter_verdict(inverter_evidence(over, RATED))["verdict"] == BORDERLINE
    assert inverter_verdict(inverter_evidence(under, RATED))["verdict"] == ENOUGH


def test_no_hours_means_no_verdict_with_a_reason():
    result = inverter_verdict(inverter_evidence([], RATED))
    assert result["verdict"] is None
    assert result["reason"] == "no_data"
    assert result["evidence"]["peak_w"] is None


def test_rows_are_grouped_by_the_local_month():
    # 2026-03-31 22:30 UTC is already April in Kyiv (UTC+3 after the clock change).
    rows = [HourlyRow(datetime(2026, 3, 31, 22, tzinfo=UTC), 1.0, 1.0, 1.0)]
    assert list(rows_by_month(rows, KYIV)) == ["2026-04"]
    assert local_day(datetime(2026, 3, 31, 22, tzinfo=UTC), KYIV) == "2026-04-01"
