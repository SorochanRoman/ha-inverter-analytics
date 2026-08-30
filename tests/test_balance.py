"""Tests for the energy balance analytics."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.balance import build_balance_payload
from custom_components.inverter_analytics.analytics.source import (
    EnergyRow,
    EnergySeries,
    Window,
)

KYIV = ZoneInfo("Europe/Kyiv")
BASE = datetime(2026, 6, 1, tzinfo=UTC)


def hours(*changes: float, start: datetime = BASE) -> EnergySeries:
    return EnergySeries(
        tuple(
            EnergyRow(start + timedelta(hours=index), value) for index, value in enumerate(changes)
        )
    )


def build(flows, window=None):
    window = window or Window(BASE, BASE + timedelta(hours=24))
    return build_balance_payload(flows, tz=KYIV, window=window)


def balanced_flows():
    """Sources 12 kWh, sinks 11 kWh: a kilowatt-hour of conversion loss."""
    return {
        "pv_energy_total": hours(6.0, 4.0),
        "grid_import_total": hours(1.0, 0.0),
        "battery_discharge_total": hours(0.5, 0.5),
        "load_energy_total": hours(5.0, 3.0),
        "grid_export_total": hours(1.0, 0.0),
        "battery_charge_total": hours(1.0, 1.0),
    }


def test_totals_are_the_sum_of_every_hour():
    payload = build({"pv_energy_total": hours(2.5, 3.5, 1.0)})
    assert payload["totals"]["pv_energy_total"] == 7.0


def test_a_counter_reset_does_not_produce_negative_energy():
    """The recorder accounts for the reset before we ever see the rows.

    A total_increasing sensor that drops to zero at midnight arrives as ordinary
    positive changes, because the reset was handled inside the accumulated sum.
    Diffing raw states instead would have produced a day of negative production.
    """
    payload = build({"pv_energy_total": hours(3.0, 4.0, 0.2, 2.0)})
    assert payload["totals"]["pv_energy_total"] == 9.2
    assert all(day["flows"]["pv_energy_total"] >= 0 for day in payload["days"])


def test_the_books_are_balanced_only_when_all_six_are_mapped():
    payload = build(balanced_flows())
    assert payload["sources_total"] == 12.0
    assert payload["sinks_total"] == 11.0
    assert payload["unaccounted"] == 1.0
    assert round(payload["unaccounted_share"], 4) == round(1 / 12, 4)
    assert payload["missing"] == []


def test_five_of_six_gives_the_flows_and_no_balance_line():
    """With a counter missing the difference measures the omission."""
    flows = balanced_flows()
    del flows["battery_charge_total"]
    payload = build(flows)

    assert payload["unaccounted"] is None
    assert payload["unaccounted_share"] is None
    assert payload["missing"] == ["battery_charge_total"]
    # The flows that are mapped still stand.
    assert payload["totals"]["pv_energy_total"] == 10.0
    assert payload["sources_total"] == 12.0


def test_unaccounted_is_energy_that_went_in_and_did_not_come_out():
    flows = balanced_flows()
    flows["load_energy_total"] = hours(9.0, 3.0)  # sinks now exceed sources
    payload = build(flows)
    assert payload["unaccounted"] < 0


def test_self_sufficiency_is_the_share_of_load_not_bought():
    payload = build(balanced_flows())
    # 8 kWh of load, 1 of it imported.
    assert round(payload["self_sufficiency"], 4) == 0.875


def test_self_consumption_is_the_share_of_production_kept():
    payload = build(balanced_flows())
    # 10 kWh produced, 1 exported.
    assert round(payload["self_consumption"], 4) == 0.9


def test_each_ratio_needs_only_its_own_pair():
    payload = build({"load_energy_total": hours(8.0), "grid_import_total": hours(2.0)})
    assert round(payload["self_sufficiency"], 4) == 0.75
    assert payload["self_consumption"] is None
    assert payload["unaccounted"] is None


def test_a_night_with_no_production_has_no_self_consumption_figure():
    """0% would be a claim; there is nothing to take a share of."""
    payload = build({"pv_energy_total": hours(0.0, 0.02), "grid_export_total": hours(0.0)})
    assert payload["self_consumption"] is None


def test_a_ratio_is_clamped_when_two_sensors_disagree():
    """Exporting more than the production meter saw is rounding, not 103%."""
    payload = build({"pv_energy_total": hours(10.0), "grid_export_total": hours(-0.4)})
    assert payload["self_consumption"] == 1.0


def test_days_are_bucketed_in_the_local_zone():
    """Kyiv is three hours ahead in June, so 21:00 UTC is already tomorrow."""
    start = datetime(2026, 6, 1, 20, tzinfo=UTC)
    payload = build(
        {"pv_energy_total": hours(1.0, 2.0, 4.0, start=start)},
        window=Window(start, start + timedelta(hours=3)),
    )
    days = {day["day"]: day["flows"]["pv_energy_total"] for day in payload["days"]}
    assert days == {"2026-06-01": 1.0, "2026-06-02": 6.0}


def test_the_covered_span_is_reported_and_compared_with_the_window():
    window = Window(BASE, BASE + timedelta(hours=24))
    payload = build({"pv_energy_total": hours(1.0, 1.0)}, window=window)

    assert payload["covered_start"] == BASE.isoformat()
    assert payload["covered_end"] == (BASE + timedelta(hours=2)).isoformat()
    # Two hours of statistics inside a day-long window.
    assert payload["covers_whole_window"] is False


def test_a_window_fully_covered_says_so():
    window = Window(BASE, BASE + timedelta(hours=2))
    payload = build({"pv_energy_total": hours(1.0, 1.0)}, window=window)
    assert payload["covers_whole_window"] is True


def test_no_statistics_at_all_reports_no_span_rather_than_a_false_one():
    payload = build({"pv_energy_total": EnergySeries(())})
    assert payload["covered_start"] is None
    assert payload["covers_whole_window"] is False
    assert payload["totals"]["pv_energy_total"] == 0.0
