"""Tests for the battery analytics."""

from datetime import UTC, datetime, timedelta

from custom_components.inverter_analytics.analytics.battery import (
    build_battery_payload,
    restrict,
)
from custom_components.inverter_analytics.analytics.resample import Sample, Series

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def soc_series(*points: tuple[float, float], end: float = 120.0) -> Series:
    return Series.of(BASE, at(end), [Sample(at(m), v) for m, v in points])


def build(soc, power=None, **kwargs):
    options = {
        "capacity_kwh": None,
        "low_pct": 20.0,
        "idle_w": 50.0,
        "raw_from": None,
    } | kwargs
    return build_battery_payload(soc, power, **options)


def test_mean_charge_is_weighted_by_how_long_it_held():
    payload = build(soc_series((0, 100.0), (90, 40.0)))
    # 90 minutes at 100%, 30 at 40% -> 85, not the 70 an average of samples gives.
    assert payload["kpi"]["mean_soc"] == 85.0


def test_bands_split_the_time_and_sum_to_one():
    payload = build(soc_series((0, 10.0), (30, 30.0), (60, 50.0), (90, 90.0)))
    fractions = {band["key"]: band["fraction"] for band in payload["bands"]}
    assert fractions == {"0-20": 0.25, "20-40": 0.25, "40-60": 0.25, "60-80": 0.0, "80-100": 0.25}
    assert sum(fractions.values()) == 1.0


def test_a_dip_is_reported_with_its_lowest_point_and_recovery():
    payload = build(soc_series((0, 60.0), (30, 12.0), (50, 55.0)))
    assert payload["kpi"]["dip_count"] == 1
    dip = payload["episodes"][0]
    assert dip["seconds"] == 1200.0
    assert dip["lowest"] == 12.0
    assert dip["recovered_to"] == 55.0
    assert payload["kpi"]["min_soc"] == 12.0
    assert payload["kpi"]["seconds_below_low"] == 1200.0


def test_a_dip_shorter_than_a_minute_is_not_a_dip():
    payload = build(soc_series((0, 60.0), (30, 12.0), (30.5, 60.0)))
    assert payload["episodes"] == []
    assert payload["kpi"]["dip_count"] == 0
    # It still happened, so the minimum and the time below still count it.
    assert payload["kpi"]["min_soc"] == 12.0


def test_the_mean_low_point_averages_the_dips_not_the_whole_window():
    payload = build(
        soc_series((0, 60.0), (10, 10.0), (30, 60.0), (60, 20.0), (61, 18.0), (90, 60.0))
    )
    assert payload["kpi"]["dip_count"] == 2
    assert payload["kpi"]["mean_low_point"] == 14.0


def test_dips_are_measured_only_where_raw_states_exist():
    """An hourly mean cannot show a twenty-minute fall to 8%.

    The early dip lies in the part of the window that only long-term statistics
    cover, so counting it would mean reporting a number the data cannot carry.
    """
    soc = soc_series((0, 60.0), (10, 8.0), (30, 60.0), (70, 15.0), (100, 60.0))
    payload = build(soc, raw_from=at(60))

    assert payload["kpi"]["dip_count"] == 1
    assert payload["episodes"][0]["lowest"] == 15.0
    assert payload["kpi"]["min_soc"] == 15.0
    assert payload["raw_from"] == at(60).isoformat()
    assert payload["dips_measurable"] is True
    # The distribution still spans the whole window.
    assert payload["coverage"] == 1.0


def test_a_window_entirely_inside_statistics_says_it_cannot_measure_dips():
    soc = soc_series((0, 60.0), (30, 8.0), (60, 60.0))
    payload = build(soc, raw_from=at(200))

    assert payload["dips_measurable"] is False
    assert payload["episodes"] == []
    assert payload["kpi"]["min_soc"] is None
    assert payload["kpi"]["mean_soc"] is not None


def test_restrict_keeps_the_value_in_force_at_the_boundary():
    soc = soc_series((0, 90.0), (100, 40.0))
    trimmed = restrict(soc, at(50))
    assert trimmed.start == at(50)
    assert [sample.value for sample in trimmed.samples] == [90.0, 40.0]


def test_charging_and_discharging_are_separated_by_the_idle_floor():
    soc = soc_series((0, 50.0))
    power = Series.of(
        BASE, at(120), [Sample(at(0), 1000.0), Sample(at(60), 10.0), Sample(at(90), -2000.0)]
    )
    payload = build(soc, power)["power"]

    assert payload["mean_charge_w"] == 1000.0
    assert payload["mean_discharge_w"] == 2000.0
    assert payload["share_charging"] == 0.5
    assert payload["share_idle"] == 0.25
    assert payload["share_discharging"] == 0.25
    assert payload["energy_in_kwh"] == 1.0
    assert payload["energy_out_kwh"] == 1.0


def test_cycles_need_a_capacity_and_say_nothing_without_one():
    soc = soc_series((0, 50.0), end=1440.0)
    power = Series.of(BASE, at(1440), [Sample(at(0), -1000.0)])
    assert build(soc, power)["power"]["cycles_per_day"] is None
    # 24 kWh out of a 12 kWh battery in one day is two full cycles.
    assert build(soc, power, capacity_kwh=12.0)["power"]["cycles_per_day"] == 2.0


def test_a_battery_whose_charge_falls_while_it_charges_is_flagged():
    """The invert question answered the wrong way round mirrors the whole tab."""
    soc = soc_series((0, 90.0), (30, 70.0), (60, 50.0), (90, 30.0))
    power = Series.of(BASE, at(120), [Sample(at(0), 3000.0)])
    assert build(soc, power)["power"]["sign_looks_inverted"] is True


def test_a_correctly_wired_battery_is_not_flagged():
    soc = soc_series((0, 30.0), (30, 50.0), (60, 70.0), (90, 90.0))
    power = Series.of(BASE, at(120), [Sample(at(0), 3000.0)])
    assert build(soc, power)["power"]["sign_looks_inverted"] is False


def test_a_battery_that_barely_moved_gets_no_verdict():
    """A warning drawn from no evidence is a coin toss in a warning's clothes."""
    soc = soc_series((0, 50.0), (1, 51.0), (2, 50.0))
    power = Series.of(BASE, at(120), [Sample(at(0), 10.0)])
    assert build(soc, power)["power"]["sign_looks_inverted"] is None


def test_no_power_sensor_means_no_charging_section_rather_than_zeroes():
    assert build(soc_series((0, 50.0)))["power"] is None


def test_the_cutoff_is_only_announced_when_it_held_something_back():
    """A window can reach past the recorder's retention and find nothing there.

    Saying "dips counted from the 19th" beside a badge reading "exact data",
    when no data exists before the 19th, reads as a contradiction.
    """
    soc = Series.of(BASE, at(120), [Sample(at(70), 50.0), Sample(at(90), 10.0)])
    assert build(soc, raw_from=at(60))["dips_restricted"] is False

    with_earlier = soc_series((0, 50.0), (70, 50.0), (90, 10.0))
    assert build(with_earlier, raw_from=at(60))["dips_restricted"] is True


def test_nothing_is_restricted_when_the_whole_window_is_raw():
    assert build(soc_series((0, 50.0)))["dips_restricted"] is False
