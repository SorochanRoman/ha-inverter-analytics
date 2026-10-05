"""Tests for the health signals."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest

from custom_components.inverter_analytics.analytics.health import (
    BEST_HOUR_MIN_HOURS,
    CLEAN_CHARGE_MAX_KWH,
    CLEAN_DROP_MIN_POINTS,
    CLEAN_HOURS_MIN,
    COMPARISON_MIN_MONTHS,
    HEALTH_MAX_YEARS,
    capacity_by_month,
    clean_discharge_hours,
    comparison,
    efficiency_by_month,
)
from custom_components.inverter_analytics.analytics.source import (
    EnergyRow,
    EnergySeries,
    HourlyRow,
)

KYIV = ZoneInfo("Europe/Kyiv")
# Midday on the 10th, so no hour built from here strays across a local month edge.
BASE = datetime(2026, 1, 10, 10, tzinfo=UTC)


def at(index: int) -> datetime:
    return BASE + timedelta(hours=index)


def soc_hour(index: int, *, mean: float = 50.0, low: float = 45.0, high: float = 50.0) -> HourlyRow:
    return HourlyRow(at(index), mean, low, high)


def energy(changes: dict[int, float]) -> EnergySeries:
    return EnergySeries(tuple(EnergyRow(at(index), change) for index, change in changes.items()))


def one_hour(*, charge: float = 0.0, discharge: float = 0.5, low: float = 45.0, high: float = 50.0):
    return clean_discharge_hours(
        [soc_hour(0, low=low, high=high)], energy({0: charge}), energy({0: discharge})
    )


def test_constants_are_the_specs():
    assert HEALTH_MAX_YEARS == 5
    assert CLEAN_CHARGE_MAX_KWH == 0.02
    assert CLEAN_DROP_MIN_POINTS == 3.0
    assert CLEAN_HOURS_MIN == 20
    assert COMPARISON_MIN_MONTHS == 6
    assert BEST_HOUR_MIN_HOURS == 10


# --- clean discharge hours -------------------------------------------------


def test_a_clean_hour_carries_its_discharge_and_drop():
    assert one_hour() == [(at(0), 0.5, 5.0)]


def test_a_charge_change_of_exactly_the_limit_is_admitted():
    assert len(one_hour(charge=0.02)) == 1


def test_a_charge_change_above_the_limit_is_rejected():
    assert one_hour(charge=0.021) == []


def test_a_drop_of_exactly_three_points_is_admitted():
    assert len(one_hour(low=47.0, high=50.0)) == 1


def test_a_drop_below_three_points_is_rejected():
    assert one_hour(low=47.1, high=50.0) == []


def test_a_zero_discharge_change_is_rejected():
    assert one_hour(discharge=0.0) == []


@pytest.mark.parametrize("missing", ["soc", "charge", "discharge"])
def test_an_hour_missing_from_one_input_is_rejected(missing):
    soc = [soc_hour(0), soc_hour(1)]
    charge = {0: 0.0, 1: 0.0}
    discharge = {0: 0.5, 1: 0.5}
    if missing == "soc":
        soc = soc[:1]
    elif missing == "charge":
        del charge[1]
    else:
        del discharge[1]
    hours = clean_discharge_hours(soc, energy(charge), energy(discharge))
    assert [start for start, _, _ in hours] == [at(0)]


# --- capacity --------------------------------------------------------------


def clean(count: int, *, discharged: float = 0.5, drop: float = 5.0):
    return [(at(index), discharged, drop) for index in range(count)]


def test_nineteen_clean_hours_withhold_the_month_with_the_count():
    assert capacity_by_month(clean(19), KYIV) == {
        "2026-01": {"value": None, "reason": "too_few_clean_hours", "clean_hours": 19}
    }


def test_twenty_clean_hours_give_the_implied_capacity():
    month = capacity_by_month(clean(20), KYIV)["2026-01"]
    assert month["reason"] is None
    assert month["clean_hours"] == 20
    assert month["value"] == pytest.approx(10.0), "0.5 kWh per 5 points is 10 kWh per 100"


def test_a_recalibration_hour_pulls_the_figure_down():
    hours = [*clean(20), (at(20), 0.1, 20.0)]
    month = capacity_by_month(hours, KYIV)["2026-01"]
    # (20 * 0.5 + 0.1) / (20 * 5 + 20) * 100
    assert month["value"] == pytest.approx(10.1 / 120 * 100)
    assert month["value"] < 10.0


def test_months_are_local_and_empty_months_are_absent():
    # 22:30 UTC on the last day of January is already February in Kyiv.
    late = datetime(2026, 1, 31, 22, 30, tzinfo=UTC)
    months = capacity_by_month([(late, 0.5, 5.0)], KYIV)
    assert list(months) == ["2026-02"]
    assert capacity_by_month([], KYIV) == {}


# --- efficiency ------------------------------------------------------------


def month_of_counters(charged: float = 10.0, discharged: float = 9.0):
    return energy({0: charged / 2, 1: charged / 2}), energy({0: discharged / 2, 1: discharged / 2})


def test_efficiency_without_soc_is_no_soc():
    charge, discharge = month_of_counters()
    assert efficiency_by_month(charge, discharge, None, KYIV) == {
        "2026-01": {"value": None, "reason": "no_soc"}
    }
    assert efficiency_by_month(charge, discharge, [], KYIV)["2026-01"]["reason"] == "no_soc"


def test_efficiency_with_soc_only_in_another_month_is_no_soc():
    charge, discharge = month_of_counters()
    elsewhere = [HourlyRow(datetime(2026, 3, 10, tzinfo=UTC), 50.0, 50.0, 50.0)]
    assert efficiency_by_month(charge, discharge, elsewhere, KYIV)["2026-01"]["reason"] == "no_soc"


def test_efficiency_drift_above_five_points_is_withheld():
    charge, discharge = month_of_counters()
    soc = [soc_hour(0, mean=50.0), soc_hour(5, mean=55.1)]
    assert efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"] == {
        "value": None,
        "reason": "drift",
    }


def test_efficiency_drift_of_exactly_five_points_gives_a_figure():
    charge, discharge = month_of_counters()
    # Out of order on purpose: first and last are by time, not by position.
    soc = [soc_hour(5, mean=45.0), soc_hour(2, mean=99.0), soc_hour(0, mean=50.0)]
    month = efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]
    assert month["reason"] is None
    assert month["value"] == pytest.approx(0.9)


def test_drift_is_checked_before_throughput():
    charge, discharge = month_of_counters(charged=0.5)
    soc = [soc_hour(0, mean=50.0), soc_hour(5, mean=60.0)]
    assert efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]["reason"] == "drift"


def test_efficiency_with_too_little_charged_is_withheld():
    charge, discharge = month_of_counters(charged=0.9, discharged=0.8)
    soc = [soc_hour(0), soc_hour(5)]
    assert efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"] == {
        "value": None,
        "reason": "too_little_throughput",
    }


def test_efficiency_with_nothing_discharged_is_withheld():
    charge, discharge = month_of_counters(charged=5.0, discharged=0.0)
    soc = [soc_hour(0), soc_hour(5)]
    month = efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]
    assert month["reason"] == "too_little_throughput"


def test_efficiency_plain_figure_per_month():
    charge = EnergySeries(
        (
            EnergyRow(at(0), 10.0),
            EnergyRow(datetime(2026, 2, 10, tzinfo=UTC), 20.0),
        )
    )
    discharge = EnergySeries(
        (
            EnergyRow(at(0), 9.0),
            EnergyRow(datetime(2026, 2, 10, tzinfo=UTC), 17.0),
        )
    )
    soc = [soc_hour(0), HourlyRow(datetime(2026, 2, 10, tzinfo=UTC), 60.0, 60.0, 60.0)]
    months = efficiency_by_month(charge, discharge, soc, KYIV)
    assert months == {
        "2026-01": {"value": pytest.approx(0.9), "reason": None},
        "2026-02": {"value": pytest.approx(0.85), "reason": None},
    }


def test_efficiency_months_without_counter_rows_are_absent():
    assert efficiency_by_month(EnergySeries(()), EnergySeries(()), [soc_hour(0)], KYIV) == {}


# --- comparison ------------------------------------------------------------


def keys_for(years: range) -> list[str]:
    return [f"{year:04d}-{month:02d}" for year in years for month in range(1, 13)]


KEYS = keys_for(range(2024, 2026))
PREVIOUS, RECENT = KEYS[:12], KEYS[12:]


def figures(keys, value):
    return {key: {"value": value, "reason": None} for key in keys}


def test_five_months_a_side_gives_no_means_but_counts():
    months = {**figures(PREVIOUS[:5], 10.0), **figures(RECENT[:5], 9.0)}
    assert comparison(months, KEYS) == {
        "recent_mean": None,
        "previous_mean": None,
        "change": None,
        "recent_months": 5,
        "previous_months": 5,
    }


def test_six_months_a_side_gives_means_and_a_change():
    months = {**figures(PREVIOUS[:6], 10.0), **figures(RECENT[:6], 9.0)}
    result = comparison(months, KEYS)
    assert result["recent_mean"] == pytest.approx(9.0)
    assert result["previous_mean"] == pytest.approx(10.0)
    assert result["change"] == pytest.approx(-1.0)
    assert (result["recent_months"], result["previous_months"]) == (6, 6)


def test_withheld_months_do_not_count():
    months = {
        **figures(PREVIOUS[:6], 10.0),
        **figures(RECENT[:6], 9.0),
        RECENT[6]: {"value": None, "reason": "drift"},
    }
    assert comparison(months, KEYS)["recent_months"] == 6


def test_a_february_in_one_year_only_changes_only_the_counts():
    base = {**figures(PREVIOUS, 10.0), **figures(RECENT, 9.0)}
    without = dict(base)
    del without[RECENT[1]]  # 2025-02
    full, short = comparison(base, KEYS), comparison(without, KEYS)
    assert (full["recent_months"], short["recent_months"]) == (12, 11)
    assert full["previous_months"] == short["previous_months"] == 12
    assert short["recent_mean"] == full["recent_mean"] == pytest.approx(9.0)
    assert short["change"] == full["change"] == pytest.approx(-1.0)


def test_only_the_last_twenty_four_keys_are_compared():
    keys = keys_for(range(2023, 2026))
    months = {**figures(keys[:12], 100.0), **figures(keys[12:], 5.0)}
    result = comparison(months, keys)
    assert result["previous_mean"] == pytest.approx(5.0)
    assert (result["recent_months"], result["previous_months"]) == (12, 12)


def test_a_short_history_has_an_empty_previous_side():
    keys = KEYS[:8]
    result = comparison(figures(keys, 1.0), keys)
    assert (result["recent_months"], result["previous_months"]) == (8, 0)
    assert result["change"] is None
