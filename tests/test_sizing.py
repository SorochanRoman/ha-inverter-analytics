"""Tests for the sizing verdicts."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.sizing import (
    BORDERLINE,
    ENOUGH,
    SHORT,
    battery_evidence,
    battery_verdict,
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
    # 2026-03-31 22:00 UTC is already April in Kyiv (UTC+3 after the clock change).
    rows = [HourlyRow(datetime(2026, 3, 31, 22, tzinfo=UTC), 1.0, 1.0, 1.0)]
    assert list(rows_by_month(rows, KYIV)) == ["2026-04"]
    assert local_day(datetime(2026, 3, 31, 22, tzinfo=UTC), KYIV) == "2026-04-01"


def soc_day(day: int, *, low: float, high: float) -> list[HourlyRow]:
    """A local Kyiv day of 24 hourly rows, with one hour at each extreme."""
    start = datetime(2026, 3, 1 + day, tzinfo=KYIV).astimezone(UTC)
    rows = [HourlyRow(start + timedelta(hours=h), 60.0, 55.0, 65.0) for h in range(24)]
    rows[3] = HourlyRow(rows[3].start, 40.0, low, 60.0)
    rows[14] = HourlyRow(rows[14].start, 80.0, 70.0, high)
    return rows


def battery(rows):
    return battery_verdict(battery_evidence(rows, KYIV, low_pct=20.0, full_pct=95.0))


def test_days_are_split_by_whether_the_battery_had_filled():
    rows = (
        soc_day(0, low=15.0, high=100.0)  # full, and still at the low mark
        + soc_day(1, low=15.0, high=80.0)  # low without filling: the sun's fault
        + soc_day(2, low=30.0, high=96.0)  # full, and fine
        + soc_day(3, low=30.0, high=80.0)  # neither
    )
    evidence = battery_evidence(rows, KYIV, low_pct=20.0, full_pct=95.0)
    assert evidence["days_with_data"] == 4
    assert evidence["days_full"] == 2
    assert evidence["days_full_and_low"] == 1
    assert evidence["days_low_without_full"] == 1
    assert evidence["lowest_pct"] == 15.0


def test_full_and_low_on_a_quarter_of_days_is_short():
    rows = soc_day(0, low=15.0, high=100.0) + [
        row for day in range(1, 4) for row in soc_day(day, low=40.0, high=100.0)
    ]
    assert battery(rows)["verdict"] == SHORT


def test_full_and_low_once_in_five_days_is_borderline():
    rows = soc_day(0, low=15.0, high=100.0) + [
        row for day in range(1, 5) for row in soc_day(day, low=40.0, high=100.0)
    ]
    assert battery(rows)["verdict"] == BORDERLINE


def test_a_battery_that_fills_and_never_hits_the_low_mark_is_enough():
    rows = [row for day in range(3) for row in soc_day(day, low=40.0, high=100.0)]
    assert battery(rows)["verdict"] == ENOUGH


def test_low_days_without_filling_do_not_count_against_the_battery():
    rows = soc_day(0, low=15.0, high=80.0) + soc_day(1, low=40.0, high=100.0)
    assert battery(rows)["verdict"] == ENOUGH


def test_a_month_that_never_filled_has_no_battery_verdict():
    rows = soc_day(0, low=15.0, high=80.0) + soc_day(1, low=15.0, high=80.0)
    result = battery(rows)
    assert result["verdict"] is None
    assert result["reason"] == "never_full"
    assert result["evidence"]["days_low_without_full"] == 2


def test_no_rows_means_no_data():
    assert battery([])["reason"] == "no_data"


def test_days_follow_the_local_clock_across_the_spring_change():
    # 2026-03-29 in Kyiv has 23 hours; a row at 22:00 UTC on the 28th is already the 29th.
    rows = [
        HourlyRow(datetime(2026, 3, 28, 22, tzinfo=UTC), 50.0, 15.0, 100.0),  # 00:00 Kyiv, 29th
        HourlyRow(datetime(2026, 3, 29, 20, tzinfo=UTC), 50.0, 40.0, 60.0),  # 23:00 Kyiv, 29th
        HourlyRow(datetime(2026, 3, 29, 21, tzinfo=UTC), 50.0, 40.0, 60.0),  # 00:00 Kyiv, 30th
    ]
    evidence = battery_evidence(rows, KYIV, low_pct=20.0, full_pct=95.0)
    assert evidence["days_with_data"] == 2
    assert evidence["days_full_and_low"] == 1
