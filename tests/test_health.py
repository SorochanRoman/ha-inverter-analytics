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
    async_health_analytics,
    best_hour_by_month,
    build_health_payload,
    capacity_by_month,
    clean_discharge_hours,
    comparison,
    efficiency_by_month,
    inverter_by_month,
    solar_energy_by_month,
    withhold_partial_months,
)
from custom_components.inverter_analytics.analytics.seasonality import INCOMPLETE_COVERAGE
from custom_components.inverter_analytics.analytics.sizing import Ceiling
from custom_components.inverter_analytics.analytics.source import (
    EnergyRow,
    EnergySeries,
    HourlyRow,
    HourlySeries,
)
from custom_components.inverter_analytics.roles import EntryConfig

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


def test_a_charge_change_a_hair_over_the_limit_from_float_noise_is_admitted():
    assert len(one_hour(charge=0.020000000000095)) == 1


def test_a_drop_a_hair_under_three_points_from_float_noise_is_admitted():
    assert len(one_hour(low=47.000000000000095, high=50.0)) == 1


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


def test_efficiency_with_a_single_soc_row_is_soc_partial():
    charge, discharge = month_of_counters()
    assert efficiency_by_month(charge, discharge, [soc_hour(0)], KYIV)["2026-01"] == {
        "value": None,
        "reason": "soc_partial",
    }


def test_efficiency_with_soc_only_at_the_end_of_the_month_is_soc_partial():
    # Counters cover the whole of January; the charge only its last two days,
    # and those two days drift by nothing.
    start = datetime(2026, 1, 1, 0, tzinfo=KYIV).astimezone(UTC)
    count = 31 * 24
    rows = tuple(EnergyRow(start + timedelta(hours=index), 0.1) for index in range(count))
    soc = [
        HourlyRow(start + timedelta(hours=index), 50.0, 50.0, 50.0)
        for index in range(count - 48, count)
    ]
    months = efficiency_by_month(EnergySeries(rows), EnergySeries(rows), soc, KYIV)
    assert months["2026-01"]["reason"] == "soc_partial"


def test_soc_bracketing_the_counters_within_an_hour_passes_on_to_drift():
    charge = energy({1: 5.0, 5: 5.0})
    discharge = energy({1: 4.5, 5: 4.5})
    # First SoC an hour after the first counter, last an hour before the last.
    soc = [soc_hour(2, mean=50.0), soc_hour(4, mean=60.0)]
    assert efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]["reason"] == "drift"
    soc = [soc_hour(2, mean=50.0), soc_hour(4, mean=50.0)]
    month = efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]
    assert month == {"value": pytest.approx(0.9), "reason": None}


def test_soc_starting_more_than_an_hour_late_is_soc_partial():
    charge = energy({1: 5.0, 5: 5.0})
    discharge = energy({1: 4.5, 5: 4.5})
    soc = [soc_hour(3), soc_hour(5)]
    assert efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]["reason"] == "soc_partial"


def january_hours(from_day: int = 1) -> list[datetime]:
    start = datetime(2026, 1, from_day, tzinfo=KYIV).astimezone(UTC)
    end = datetime(2026, 2, 1, tzinfo=KYIV).astimezone(UTC)
    return [start + timedelta(hours=index) for index in range(int((end - start) / HOUR))]


def test_a_discharge_counter_starting_mid_month_is_counters_partial():
    whole, late = january_hours(), january_hours(15)
    charge = EnergySeries(tuple(EnergyRow(start, 0.1) for start in whole))
    discharge = EnergySeries(tuple(EnergyRow(start, 0.09) for start in late))
    soc = [HourlyRow(start, 50.0, 50.0, 50.0) for start in whole]
    months = efficiency_by_month(charge, discharge, soc, KYIV)
    assert months["2026-01"] == {"value": None, "reason": "counters_partial"}
    # Without a charge, no_soc still comes first.
    assert efficiency_by_month(charge, discharge, None, KYIV)["2026-01"]["reason"] == "no_soc"


def test_a_month_with_only_the_charge_counter_is_counters_partial():
    whole = january_hours()
    charge = EnergySeries(tuple(EnergyRow(start, 0.1) for start in whole))
    soc = [HourlyRow(start, 50.0, 50.0, 50.0) for start in whole]
    months = efficiency_by_month(charge, EnergySeries(()), soc, KYIV)
    assert months["2026-01"] == {"value": None, "reason": "counters_partial"}


def test_counters_within_an_hour_of_each_other_pass_on():
    charge = energy({1: 5.0, 5: 5.0})
    discharge = energy({2: 4.5, 4: 4.5})
    soc = [soc_hour(1), soc_hour(5)]
    month = efficiency_by_month(charge, discharge, soc, KYIV)["2026-01"]
    assert month == {"value": pytest.approx(0.9), "reason": None}


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
    february = datetime(2026, 2, 10, tzinfo=UTC)
    soc = [
        soc_hour(0),
        soc_hour(1),
        HourlyRow(february, 60.0, 60.0, 60.0),
        HourlyRow(february + timedelta(hours=1), 60.0, 60.0, 60.0),
    ]
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


# --- solar energy ----------------------------------------------------------


def test_solar_energy_sums_each_month_that_has_rows():
    late = datetime(2026, 1, 31, 22, 30, tzinfo=UTC)
    pv = EnergySeries((EnergyRow(at(0), 1.5), EnergyRow(at(1), 2.0), EnergyRow(late, 0.25)))
    assert solar_energy_by_month(pv, KYIV) == {
        "2026-01": {"value": pytest.approx(3.5), "reason": None},
        "2026-02": {"value": pytest.approx(0.25), "reason": None},
    }
    assert solar_energy_by_month(EnergySeries(()), KYIV) == {}


# --- best hour -------------------------------------------------------------


def pv_hour(index: int, *, mean: float = 1500.0, peak: float = 3000.0) -> HourlyRow:
    return HourlyRow(at(index), mean, 0.0, peak)


def sunny_month(unconstrained: int) -> tuple[list[HourlyRow], Ceiling]:
    """`unconstrained` free hours peaking at 3000 + index, and two ceiling hours at 9000."""
    rows = [pv_hour(index, peak=3000.0 + index) for index in range(unconstrained)]
    capped = [pv_hour(100 + index, peak=9000.0) for index in range(2)]
    every = rows + capped
    ceiling = Ceiling(frozenset(row.start for row in capped), frozenset(row.start for row in every))
    return every, ceiling


def test_the_best_hour_skips_ceiling_hours():
    rows, ceiling = sunny_month(BEST_HOUR_MIN_HOURS)
    month = best_hour_by_month(rows, KYIV, ceiling=ceiling)["2026-01"]
    assert month == {
        "value": 3000.0 + BEST_HOUR_MIN_HOURS - 1,
        "reason": None,
        "unconstrained_hours": BEST_HOUR_MIN_HOURS,
    }


def test_nine_unconstrained_hours_are_curtailed():
    rows, ceiling = sunny_month(BEST_HOUR_MIN_HOURS - 1)
    month = best_hour_by_month(rows, KYIV, ceiling=ceiling)["2026-01"]
    assert month == {"value": None, "reason": "curtailed", "unconstrained_hours": 9}


def test_hours_below_the_sun_floor_do_not_count_as_unconstrained():
    rows, ceiling = sunny_month(BEST_HOUR_MIN_HOURS - 1)
    rows.append(pv_hour(50, mean=99.0, peak=400.0))
    month = best_hour_by_month(rows, KYIV, ceiling=ceiling)["2026-01"]
    assert month["reason"] == "curtailed"
    assert month["unconstrained_hours"] == 9


def test_hours_the_three_sensors_never_saw_are_not_candidates():
    rows, ceiling = sunny_month(BEST_HOUR_MIN_HOURS)
    # A brighter hour the charge never saw: the system may have been at its limit.
    unseen = pv_hour(60, peak=8000.0)
    rows.append(unseen)
    month = best_hour_by_month(rows, KYIV, ceiling=ceiling)["2026-01"]
    assert month["value"] == 3000.0 + BEST_HOUR_MIN_HOURS - 1
    assert month["unconstrained_hours"] == BEST_HOUR_MIN_HOURS
    blind = Ceiling(ceiling.hours, ceiling.observed - {rows[0].start})
    month = best_hour_by_month(rows, KYIV, ceiling=blind)["2026-01"]
    assert month == {"value": None, "reason": "curtailed", "unconstrained_hours": 9}


def test_a_month_the_three_sensors_never_saw_reads_every_hour():
    # The ceiling saw January only; February's hours were never measured, so
    # nothing says they were constrained, and nothing says they were not.
    rows, ceiling = sunny_month(BEST_HOUR_MIN_HOURS)
    february = datetime(2026, 2, 10, 10, tzinfo=UTC)
    unseen = [
        HourlyRow(february + timedelta(hours=index), 50.0, 0.0, 2000.0 + index)
        for index in range(3)
    ]
    months = best_hour_by_month(rows + unseen, KYIV, ceiling=ceiling)
    assert months["2026-02"] == {"value": 2002.0, "reason": None, "unconstrained_hours": None}
    assert months["2026-01"]["unconstrained_hours"] == BEST_HOUR_MIN_HOURS


def test_without_a_ceiling_the_best_hour_reads_every_hour():
    rows, _ = sunny_month(3)
    month = best_hour_by_month(rows, KYIV, ceiling=None)["2026-01"]
    assert month == {"value": 9000.0, "reason": None, "unconstrained_hours": None}
    assert best_hour_by_month([], KYIV, ceiling=None) == {}


# --- inverter --------------------------------------------------------------


def load_hour(when: datetime, peak: float) -> HourlyRow:
    return HourlyRow(when, peak / 2, 0.0, peak)


def test_the_inverter_counts_hours_near_and_at_rated_per_month():
    late = datetime(2026, 1, 31, 22, 30, tzinfo=UTC)
    rows = [
        load_hour(at(0), 8000.0),
        load_hour(at(1), 6400.0),
        load_hour(at(2), 6399.0),
        load_hour(late, 7000.0),
    ]
    assert inverter_by_month(rows, 8000.0, KYIV) == {
        "2026-01": {"value": 2, "reason": None, "hours_at_rated": 1, "measured_hours": 3},
        "2026-02": {"value": 1, "reason": None, "hours_at_rated": 0, "measured_hours": 1},
    }
    assert inverter_by_month([], 8000.0, KYIV) == {}


# --- partial months --------------------------------------------------------


def test_a_month_below_the_coverage_share_is_partial_and_keeps_its_counts():
    # January in Kyiv is 744 hours; INCOMPLETE_COVERAGE of it is 446.4.
    start = datetime(2026, 1, 1, tzinfo=KYIV).astimezone(UTC)
    enough = [start + timedelta(hours=index) for index in range(447)]
    months = {"2026-01": {"value": 5.0, "reason": None, "unconstrained_hours": 12}}
    assert INCOMPLETE_COVERAGE == 0.6
    kept = withhold_partial_months(months, enough, {"2026-01": 744.0}, KYIV)
    assert kept == months
    withheld = withhold_partial_months(months, enough[:-1], {"2026-01": 744.0}, KYIV)
    assert withheld == {
        "2026-01": {"value": None, "reason": "partial_month", "unconstrained_hours": 12}
    }


def test_coverage_counts_distinct_hours():
    start = datetime(2026, 1, 1, tzinfo=KYIV).astimezone(UTC)
    twice = [start + timedelta(hours=index % 300) for index in range(600)]
    months = {"2026-01": {"value": 5.0, "reason": None}}
    result = withhold_partial_months(months, twice, {"2026-01": 744.0}, KYIV)
    assert result["2026-01"]["reason"] == "partial_month"


# --- payload ---------------------------------------------------------------

NOW = datetime(2026, 3, 15, 12, tzinfo=UTC)
NO_MISSING = {
    "capacity": [],
    "efficiency": [],
    "solar_energy": [],
    "best_hour": [],
    "inverter": [],
}


def payload(**overrides):
    arguments = {
        "now": NOW,
        "tz": KYIV,
        "soc": None,
        "battery_power": None,
        "pv_power": None,
        "load": None,
        "charge": None,
        "discharge": None,
        "pv": None,
        "export": None,
        "grid": None,
        "rated_power": 8000.0,
        "low_pct": 20.0,
        "idle_w": 50.0,
        "zero_w": 10.0,
        "nameplate_kwh": None,
        "missing": NO_MISSING,
    }
    return build_health_payload(**(arguments | overrides))


def test_the_payload_has_exactly_the_contract_keys():
    result = payload(
        missing=NO_MISSING | {"capacity": ["battery_soc"], "best_hour": ["pv_power"]},
        nameplate_kwh=10.0,
    )
    assert set(result) == {
        "timezone",
        "months",
        "first_month",
        "covered_end",
        "covers_now",
        "export_limited",
        "best_hour_mode",
        "nameplate_kwh",
        "signals",
    }
    assert result["timezone"] == "Europe/Kyiv"
    assert result["nameplate_kwh"] == 10.0
    assert set(result["signals"]) == {
        "capacity",
        "efficiency",
        "solar_energy",
        "best_hour",
        "inverter",
    }
    for signal in result["signals"].values():
        assert set(signal) == {"missing", "months", "comparison"}
        assert set(signal["comparison"]) == {
            "recent_mean",
            "previous_mean",
            "change",
            "recent_months",
            "previous_months",
        }


def test_the_months_run_from_five_years_back_to_now():
    months = payload()["months"]
    assert months[0] == "2021-03"
    assert months[-1] == "2026-03"
    assert months == sorted(months)
    assert len(months) == 61


def test_a_signal_with_missing_roles_has_no_months():
    pv = EnergySeries((EnergyRow(NOW - timedelta(days=40), 3.0),))
    result = payload(pv=pv, missing=NO_MISSING | {"solar_energy": ["pv_energy_total"]})
    signal = result["signals"]["solar_energy"]
    assert signal["missing"] == ["pv_energy_total"]
    assert signal["months"] == {}
    assert signal["comparison"]["recent_months"] == 0


def local_hours(year: int, month: int, *, from_day: int = 1) -> list[datetime]:
    """Every hour of a local month from a day on, in UTC."""
    start = datetime(year, month, from_day, tzinfo=KYIV).astimezone(UTC)
    following = datetime(year + (month == 12), month % 12 + 1, 1, tzinfo=KYIV).astimezone(UTC)
    return [start + timedelta(hours=index) for index in range(int((following - start) / HOUR))]


HOUR = timedelta(hours=1)


def test_first_month_is_the_first_with_any_figure():
    # A withheld best hour in an earlier month is not a figure: April's hours
    # are all seen, sunny and at the ceiling, so it is curtailed.
    april = local_hours(2024, 4)
    pv_power = HourlySeries(tuple(HourlyRow(start, 1500.0, 0.0, 3000.0) for start in april))
    soc = HourlySeries(tuple(HourlyRow(start, 85.0, 85.0, 85.0) for start in april))
    battery = HourlySeries(tuple(HourlyRow(start, 0.0, 0.0, 0.0) for start in april))
    load = HourlySeries(tuple(load_hour(start, 7000.0) for start in local_hours(2025, 2)))
    pv = EnergySeries(tuple(EnergyRow(start, 2.0) for start in local_hours(2024, 6)))
    result = payload(load=load, pv=pv, pv_power=pv_power, soc=soc, battery_power=battery)
    assert result["signals"]["best_hour"]["months"]["2024-04"]["reason"] == "curtailed"
    assert result["first_month"] == "2024-06"
    assert result["best_hour_mode"] == "unconstrained"
    assert result["signals"]["inverter"]["months"]["2025-02"]["value"] == 28 * 24


def test_the_current_month_is_partial_for_sums_and_peaks_but_not_for_capacity():
    # NOW is the 15th: half of March has statistics, set against the whole of March.
    hours = [start for start in local_hours(2026, 2) + local_hours(2026, 3) if start < NOW]
    pv = EnergySeries(tuple(EnergyRow(start, 1.0) for start in hours))
    pv_power = HourlySeries(tuple(HourlyRow(start, 1500.0, 0.0, 3000.0) for start in hours))
    load = HourlySeries(tuple(load_hour(start, 7000.0) for start in hours))
    soc = HourlySeries(tuple(HourlyRow(start, 50.0, 45.0, 50.0) for start in hours))
    charge = EnergySeries(tuple(EnergyRow(start, 0.0) for start in hours))
    discharge = EnergySeries(tuple(EnergyRow(start, 0.5) for start in hours))
    result = payload(
        pv=pv, pv_power=pv_power, load=load, soc=soc, charge=charge, discharge=discharge
    )
    signals = result["signals"]
    for name in ("solar_energy", "best_hour", "inverter"):
        assert signals[name]["months"]["2026-03"]["value"] is None, name
        assert signals[name]["months"]["2026-03"]["reason"] == "partial_month", name
        assert signals[name]["months"]["2026-02"]["reason"] is None, name
        assert signals[name]["comparison"]["recent_months"] == 1, name
    assert signals["capacity"]["months"]["2026-03"]["reason"] is None
    assert signals["capacity"]["months"]["2026-03"]["value"] == pytest.approx(10.0)


def test_a_history_that_starts_mid_month_has_a_partial_first_month():
    hours = local_hours(2026, 1, from_day=20) + local_hours(2026, 2)
    pv = EnergySeries(tuple(EnergyRow(start, 1.0) for start in hours))
    months = payload(pv=pv)["signals"]["solar_energy"]["months"]
    assert months["2026-01"] == {"value": None, "reason": "partial_month"}
    assert months["2026-02"] == {"value": pytest.approx(28 * 24), "reason": None}


def test_an_empty_history_has_no_first_month_and_does_not_cover_now():
    result = payload()
    assert result["first_month"] is None
    assert result["covered_end"] is None
    assert result["covers_now"] is False
    assert result["export_limited"] is None
    assert result["best_hour_mode"] == "all"


def test_covered_end_is_the_last_hour_any_sensor_has():
    hour = NOW.replace(minute=0) - timedelta(hours=2)
    result = payload(load=HourlySeries((load_hour(hour, 1000.0),)))
    assert result["covered_end"] == (hour + timedelta(hours=1)).isoformat()
    assert result["covers_now"] is True
    stale = payload(load=HourlySeries((load_hour(hour - timedelta(hours=2), 1000.0),)))
    assert stale["covers_now"] is False


def test_export_limited_is_passed_through():
    pv = EnergySeries((EnergyRow(NOW - timedelta(days=3), 10.0),))
    kept = payload(pv=pv, export=EnergySeries((EnergyRow(NOW - timedelta(days=3), 0.05),)))
    fed = payload(pv=pv, export=EnergySeries((EnergyRow(NOW - timedelta(days=3), 4.0),)))
    assert kept["export_limited"] is True
    assert fed["export_limited"] is False
    grid = HourlySeries((HourlyRow(NOW - timedelta(days=3), -800.0, -900.0, -500.0),))
    assert payload(pv=pv, grid=grid)["export_limited"] is False


def test_the_battery_signals_come_from_the_counters_and_the_charge():
    hours = [NOW - timedelta(days=20, hours=index) for index in range(25)]
    soc = HourlySeries(tuple(HourlyRow(start, 50.0, 45.0, 50.0) for start in sorted(hours)))
    charge = EnergySeries(tuple(EnergyRow(start, 0.0) for start in sorted(hours)))
    discharge = EnergySeries(tuple(EnergyRow(start, 0.5) for start in sorted(hours)))
    result = payload(soc=soc, charge=charge, discharge=discharge)
    capacity = result["signals"]["capacity"]["months"]["2026-02"]
    assert capacity["value"] == pytest.approx(10.0)
    assert capacity["clean_hours"] == 25
    efficiency = result["signals"]["efficiency"]["months"]["2026-02"]
    assert efficiency["reason"] == "too_little_throughput"


def test_efficiency_without_a_mapped_charge_has_no_months():
    hours = [NOW - timedelta(days=20, hours=index) for index in range(3)]
    charge = EnergySeries(tuple(EnergyRow(start, 1.0) for start in sorted(hours)))
    discharge = EnergySeries(tuple(EnergyRow(start, 0.9) for start in sorted(hours)))
    result = payload(
        charge=charge,
        discharge=discharge,
        missing=NO_MISSING | {"efficiency": ["battery_soc"]},
    )
    assert result["signals"]["efficiency"]["missing"] == ["battery_soc"]
    assert result["signals"]["efficiency"]["months"] == {}


def ceiling_february(export_kwh: float):
    """A February of hours at the charge ceiling, a PV counter, and an export counter."""
    hours = local_hours(2026, 2)
    return payload(
        pv_power=HourlySeries(tuple(HourlyRow(start, 1500.0, 0.0, 3000.0) for start in hours)),
        soc=HourlySeries(tuple(HourlyRow(start, 85.0, 85.0, 85.0) for start in hours)),
        battery_power=HourlySeries(tuple(HourlyRow(start, 0.0, 0.0, 0.0) for start in hours)),
        pv=EnergySeries(tuple(EnergyRow(start, 1.0) for start in hours)),
        export=EnergySeries(tuple(EnergyRow(start, export_kwh) for start in hours)),
    )


def test_an_exporting_system_reads_the_best_hour_from_every_hour():
    # A full battery does not cut back an array that can export.
    result = ceiling_february(export_kwh=0.5)
    assert result["export_limited"] is False
    assert result["best_hour_mode"] == "all"
    month = result["signals"]["best_hour"]["months"]["2026-02"]
    assert month == {"value": 3000.0, "reason": None, "unconstrained_hours": None}


def test_a_system_that_keeps_its_production_in_leaves_ceiling_hours_out():
    result = ceiling_february(export_kwh=0.0)
    assert result["export_limited"] is True
    assert result["best_hour_mode"] == "unconstrained"
    assert result["signals"]["best_hour"]["months"]["2026-02"]["reason"] == "curtailed"


async def test_the_error_names_the_sets_that_open_the_tab():
    # The two battery counters alone open nothing: the battery set needs the charge too.
    config = EntryConfig.from_dict(
        {
            "entities": {
                "battery_charge_total": ["sensor.charged"],
                "battery_discharge_total": ["sensor.discharged"],
            },
            "numbers": {},
            "inverted": [],
        }
    )
    with pytest.raises(ValueError) as raised:
        await async_health_analytics(None, config)
    assert str(raised.value) == (
        "health needs battery_soc with battery_charge_total and battery_discharge_total, "
        "pv_energy_total, or load_power with rated_power"
    )
