"""Tests for the sizing verdicts."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest

from custom_components.inverter_analytics.analytics.sizing import (
    BORDERLINE,
    ENOUGH,
    SHORT,
    SOLAR_CURTAILED_BORDERLINE_SHARE,
    battery_evidence,
    battery_verdict,
    build_sizing_payload,
    ceiling_hours,
    export_limited,
    inverter_evidence,
    inverter_verdict,
    local_day,
    rows_by_month,
    solar_evidence,
    solar_verdict,
)
from custom_components.inverter_analytics.analytics.source import (
    EnergyRow,
    EnergySeries,
    HourlyRow,
    HourlySeries,
    Window,
)

KYIV = ZoneInfo("Europe/Kyiv")
BASE = datetime(2026, 3, 1, tzinfo=UTC)
RATED = 8000.0
# Kyiv puts its clocks forward on 2026-03-29, so the local month is an hour short.
MARCH_HOURS = 743


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


def test_a_ceiling_hour_is_sun_up_battery_still_charge_flat_and_high():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    power = [hour(12, mean=0.0, low=-20.0, high=30.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    assert ceiling_hours(soc, power, pv, low_pct=20.0, idle_w=50.0) == {BASE + timedelta(hours=12)}


def test_each_condition_alone_breaks_a_ceiling_hour():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    power = [hour(12, mean=0.0, low=-20.0, high=30.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    args = {"low_pct": 20.0, "idle_w": 50.0}
    assert not ceiling_hours(soc, power, [hour(12, mean=99.0, low=0.0, high=200.0)], **args)
    assert not ceiling_hours(soc, [hour(12, mean=0.0, low=-20.0, high=51.0)], pv, **args)
    assert not ceiling_hours([hour(12, mean=85.0, low=83.5, high=85.0)], power, pv, **args)
    assert not ceiling_hours([hour(12, mean=39.0, low=39.0, high=39.5)], power, pv, **args)


def test_charge_and_discharge_in_one_hour_is_not_standing_still():
    # Half an hour each way averages to zero; the extremes give it away.
    soc = [hour(12, mean=85.0, low=84.5, high=85.0)]
    power = [hour(12, mean=0.0, low=-1500.0, high=1500.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    assert not ceiling_hours(soc, power, pv, low_pct=20.0, idle_w=50.0)


def test_an_hour_missing_from_one_sensor_is_not_a_ceiling_hour():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    power = [hour(12, mean=0.0, low=-20.0, high=30.0)]
    assert not ceiling_hours(soc, power, [], low_pct=20.0, idle_w=50.0)


def test_a_ceiling_hour_exactly_on_every_limit_counts():
    soc = [hour(12, mean=40.5, low=40.0, high=41.0)]
    power = [hour(12, mean=0.0, low=-50.0, high=50.0)]
    pv = [hour(12, mean=100.0, low=50.0, high=150.0)]
    assert ceiling_hours(soc, power, pv, low_pct=20.0, idle_w=50.0) == {BASE + timedelta(hours=12)}


def test_an_hour_missing_from_the_battery_power_is_not_a_ceiling_hour():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    assert not ceiling_hours(soc, [], pv, low_pct=20.0, idle_w=50.0)


def test_a_battery_capped_at_85_counts_as_full_by_its_ceiling():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0), hour(30, mean=30.0, low=15.0, high=50.0)]
    ceiling = {BASE + timedelta(hours=12)}
    evidence = battery_evidence(soc, UTC, low_pct=20.0, full_pct=95.0, ceiling=ceiling)
    assert evidence["days_full"] == 1
    assert evidence["days_with_data"] == 2


def test_without_a_ceiling_the_fixed_mark_still_applies():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    assert battery_evidence(soc, UTC, low_pct=20.0, full_pct=95.0)["days_full"] == 0


def solar(share: float, fill: float | None = None, load_kwh: float = 100.0):
    battery = None if fill is None else {"days_with_data": 100, "days_full": round(fill * 100)}
    return solar_verdict(solar_evidence(load_kwh * share, load_kwh, None, battery))


def test_solar_is_enough_at_full_cover_with_the_battery_filling_most_days():
    assert solar(1.0, fill=0.8)["verdict"] == ENOUGH
    assert solar(1.0, fill=0.79)["verdict"] == BORDERLINE
    assert solar(1.0, fill=0.79)["note"] == "covers_but_battery_not_filling"
    assert solar(1.0)["verdict"] == ENOUGH, "with no battery mapped, cover alone decides"


def test_solar_borderline_and_short_boundaries():
    assert solar(0.7)["verdict"] == BORDERLINE
    assert solar(0.69)["verdict"] == SHORT


def test_solar_evidence_carries_self_sufficiency_when_import_is_known():
    evidence = solar_evidence(80.0, 100.0, 30.0, None)
    assert evidence["self_sufficiency"] == 0.7
    assert evidence["production_share"] == 0.8
    assert evidence["fill_share"] is None


def test_too_little_consumption_to_take_a_share_of():
    result = solar_verdict(solar_evidence(1.0, 0.05, None, None))
    assert result["verdict"] is None and result["reason"] == "no_data"


def _energy(kwh_per_hour: float, start: datetime, hours: int) -> EnergySeries:
    return EnergySeries(
        tuple(EnergyRow(start + timedelta(hours=h), kwh_per_hour) for h in range(hours))
    )


def _window(days: int) -> Window:
    start = datetime(2026, 3, 1, tzinfo=KYIV).astimezone(UTC)
    return Window(start, start + timedelta(days=days))


def test_the_payload_judges_every_month_the_window_touches():
    window = Window(
        datetime(2026, 2, 20, tzinfo=KYIV).astimezone(UTC),
        datetime(2026, 4, 5, tzinfo=KYIV).astimezone(UTC),
    )
    march = datetime(2026, 3, 1, tzinfo=KYIV).astimezone(UTC)
    load = HourlySeries(
        tuple(HourlyRow(march + timedelta(hours=h), 1000.0, 500.0, 2000.0) for h in range(31 * 24))
    )
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=load,
        soc=None,
        energy={},
        low_pct=20.0,
        full_pct=95.0,
    )
    months = {month["key"]: month for month in payload["months"]}
    assert list(months) == ["2026-02", "2026-03", "2026-04"]
    assert months["2026-03"]["complete"] is True
    assert months["2026-03"]["inverter"]["verdict"] == ENOUGH
    assert months["2026-02"]["coverage"] == 0.0
    assert months["2026-02"]["inverter"]["reason"] == "no_data"
    assert months["2026-03"]["battery"] is None, "no charge sensor mapped"
    assert months["2026-03"]["solar"] is None, "no counters mapped"
    assert payload["period"]["inverter"]["verdict"] == ENOUGH
    assert payload["rules"]["full_pct"] == 95.0


def test_a_partly_seen_month_keeps_its_verdict_and_is_marked_incomplete():
    window = _window(31)
    load = HourlySeries(
        tuple(
            HourlyRow(window.start + timedelta(hours=h), 1000.0, 500.0, 2000.0)
            for h in range(10 * 24)
        )
    )
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=load,
        soc=None,
        energy={},
        low_pct=20.0,
        full_pct=95.0,
    )
    march = payload["months"][0]
    assert march["complete"] is False
    assert round(march["coverage"], 2) == 0.32
    assert march["inverter"]["verdict"] == ENOUGH


def test_the_period_verdict_is_read_from_summed_evidence_not_averaged_verdicts():
    """A year of enough months with one short month is a borderline year."""
    window = Window(
        datetime(2026, 1, 1, tzinfo=KYIV).astimezone(UTC),
        datetime(2026, 4, 1, tzinfo=KYIV).astimezone(UTC),
    )
    rows = []
    for h in range(90 * 24):
        moment = window.start + timedelta(hours=h)
        # Nine hours at rated power, all inside February: 9/672 > 1% for the month,
        # 9/2160 < 1% for the period.
        at_rated = moment.astimezone(KYIV).month == 2 and h % 24 == 12 and (h // 24) % 3 == 0
        rows.append(HourlyRow(moment, 1000.0, 500.0, RATED if at_rated else 2000.0))
    load = HourlySeries(tuple(rows))
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=load,
        soc=None,
        energy={},
        low_pct=20.0,
        full_pct=95.0,
    )
    months = {month["key"]: month["inverter"]["verdict"] for month in payload["months"]}
    assert months["2026-02"] == SHORT
    assert months["2026-01"] == ENOUGH and months["2026-03"] == ENOUGH
    assert payload["period"]["inverter"]["verdict"] == BORDERLINE


def test_solar_months_sum_the_counters_and_borrow_the_battery_days():
    window = _window(2)
    soc = HourlySeries(tuple(soc_day(0, low=40.0, high=100.0) + soc_day(1, low=40.0, high=80.0)))
    energy = {
        "pv_energy_total": _energy(1.0, window.start, 48),
        "load_energy_total": _energy(0.5, window.start, 48),
        "grid_import_total": _energy(0.1, window.start, 48),
    }
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=None,
        soc=soc,
        energy=energy,
        low_pct=20.0,
        full_pct=95.0,
    )
    march = payload["months"][0]
    assert march["solar"]["evidence"]["production_share"] == 2.0
    # Forty-eight accumulated additions of 0.1 kWh come to 4.799999999999999, so
    # the ratio misses 0.8 by one unit in the last place. The rule is the value,
    # not the representation.
    assert march["solar"]["evidence"]["self_sufficiency"] == pytest.approx(0.8)
    assert march["solar"]["evidence"]["fill_share"] == 0.5
    assert march["solar"]["verdict"] == BORDERLINE
    assert march["solar"]["note"] == "covers_but_battery_not_filling"
    assert march["inverter"] is None
    assert payload["covered_start"] == window.start.isoformat()
    assert payload["covers_whole_window"] is True


def _full_march_load(window: Window) -> HourlySeries:
    return HourlySeries(
        tuple(
            HourlyRow(window.start + timedelta(hours=h), 1000.0, 500.0, 2000.0)
            for h in range(MARCH_HOURS)
        )
    )


def test_each_card_carries_the_coverage_of_its_own_sensor():
    window = _window(31)
    soc = HourlySeries(tuple(row for day in range(5) for row in soc_day(day, low=40.0, high=100.0)))
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=_full_march_load(window),
        soc=soc,
        energy={},
        low_pct=20.0,
        full_pct=95.0,
    )
    march = payload["months"][0]
    assert march["coverage"] == 1.0, "the best-covered sensor saw the whole month"
    assert march["complete"] is True
    assert march["inverter"]["coverage"] == 1.0
    # Five days of charge under a full-month banner is exactly the reading a
    # single month-wide coverage figure would hide.
    assert march["battery"]["coverage"] == pytest.approx(120 / MARCH_HOURS)


def test_a_month_seen_only_through_the_counters_is_covered_by_them():
    window = _window(31)
    energy = {
        "pv_energy_total": _energy(1.0, window.start, MARCH_HOURS),
        "load_energy_total": _energy(0.5, window.start, MARCH_HOURS),
    }
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=None,
        soc=None,
        energy=energy,
        low_pct=20.0,
        full_pct=95.0,
    )
    march = payload["months"][0]
    assert march["coverage"] == 1.0
    assert march["complete"] is True, "counters alone cover a month as well as any sensor"
    assert march["solar"]["coverage"] == 1.0
    assert march["solar"]["verdict"] == ENOUGH


def test_a_withheld_card_still_says_how_little_it_saw():
    window = _window(31)
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=HourlySeries(()),
        soc=None,
        energy={},
        low_pct=20.0,
        full_pct=95.0,
    )
    inverter = payload["months"][0]["inverter"]
    assert inverter["reason"] == "no_data"
    assert inverter["coverage"] == 0.0


def test_a_mapped_import_counter_with_no_rows_is_not_full_self_sufficiency():
    window = _window(2)
    energy = {
        "pv_energy_total": _energy(1.0, window.start, 48),
        "load_energy_total": _energy(0.5, window.start, 48),
        "grid_import_total": EnergySeries(()),
    }
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=None,
        soc=None,
        energy=energy,
        low_pct=20.0,
        full_pct=95.0,
    )
    assert payload["period"]["solar"]["evidence"]["self_sufficiency"] is None
    assert payload["months"][0]["solar"]["evidence"]["self_sufficiency"] is None


def _self_sufficiency(import_series: EnergySeries) -> float | None:
    """The period's self-sufficiency with this import counter beside a full window."""
    window = _window(2)
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=None,
        soc=None,
        energy={
            "pv_energy_total": _energy(1.0, window.start, 48),
            "load_energy_total": _energy(0.5, window.start, 48),
            "grid_import_total": import_series,
        },
        low_pct=20.0,
        full_pct=95.0,
    )
    return payload["period"]["solar"]["evidence"]["self_sufficiency"]


def test_an_import_counter_that_saw_half_the_window_gives_no_self_sufficiency():
    """(load - import) / load over mismatched spans would overstate it."""
    window = _window(2)
    half = _energy(0.1, window.start + timedelta(hours=24), 24)
    assert _self_sufficiency(half) is None
    assert _self_sufficiency(_energy(0.1, window.start, 48)) == pytest.approx(0.8)


def test_one_uncompiled_import_hour_does_not_drop_self_sufficiency():
    """A single missing hour is the recorder, not a gap worth withholding for."""
    window = _window(2)
    almost = EnergySeries(
        tuple(EnergyRow(window.start + timedelta(hours=h), 0.1) for h in range(48) if h != 7)
    )
    assert _self_sufficiency(almost) is not None


def test_a_mapped_pv_counter_with_no_rows_withholds_the_solar_verdict():
    window = _window(2)
    energy = {
        "pv_energy_total": EnergySeries(()),
        "load_energy_total": _energy(0.5, window.start, 48),
    }
    payload = build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=None,
        soc=None,
        energy=energy,
        low_pct=20.0,
        full_pct=95.0,
    )
    for block in (payload["period"]["solar"], payload["months"][0]["solar"]):
        assert block["verdict"] is None, "no production statistics is not zero production"
        assert block["reason"] == "no_data"


def energy_series(total: float) -> EnergySeries:
    return EnergySeries((EnergyRow(BASE, total),))


def test_export_is_limited_by_the_counter():
    args = {"pv_kwh": 1000.0, "grid": None, "zero_w": 10.0}
    assert export_limited(export=energy_series(5.0), **args) is True
    assert export_limited(export=energy_series(10.0), **args) is True, "1% exactly is limited"
    assert export_limited(export=energy_series(50.0), **args) is False


def test_export_is_limited_by_grid_power_when_no_counter():
    never_out = [hour(12, mean=300.0, low=-5.0, high=900.0)]
    out = [hour(12, mean=300.0, low=-800.0, high=900.0)]
    assert export_limited(pv_kwh=1000.0, export=None, grid=never_out, zero_w=10.0) is True
    assert export_limited(pv_kwh=1000.0, export=None, grid=out, zero_w=10.0) is False


def test_an_export_counter_with_no_rows_falls_back_to_grid_power():
    never_out = [hour(12, mean=300.0, low=-5.0, high=900.0)]
    empty = EnergySeries(())
    assert export_limited(pv_kwh=1000.0, export=empty, grid=never_out, zero_w=10.0) is True
    assert export_limited(pv_kwh=1000.0, export=empty, grid=[], zero_w=10.0) is None


def test_export_is_unknown_without_either():
    assert export_limited(pv_kwh=1000.0, export=None, grid=None, zero_w=10.0) is None


def no_export(share: float, fill: float | None):
    return {
        "production_share": share,
        "fill_share": fill,
        "pv_kwh": 1.0,
        "load_kwh": 1.0,
        "self_sufficiency": None,
    }


def test_the_no_export_sun_rule():
    assert solar_verdict(no_export(0.95, 0.85), export_limited=True)["verdict"] == ENOUGH
    assert solar_verdict(no_export(0.5, 0.45), export_limited=True)["verdict"] == BORDERLINE
    assert solar_verdict(no_export(0.75, 0.1), export_limited=True)["verdict"] == BORDERLINE
    assert solar_verdict(no_export(0.5, 0.1), export_limited=True)["verdict"] == SHORT


def test_the_no_export_rule_needs_a_fill_share():
    block = solar_verdict(no_export(0.95, None), export_limited=True)
    assert block["verdict"] is None and block["reason"] == "no_fill"


def test_the_no_export_rule_sets_no_note():
    assert "note" not in solar_verdict(no_export(1.1, 0.5), export_limited=True)


def test_with_export_the_sun_rule_is_unchanged():
    assert solar_verdict(no_export(0.95, 0.85))["verdict"] == BORDERLINE
    assert solar_verdict(no_export(1.1, 0.85), export_limited=False)["verdict"] == ENOUGH


def _capped_battery_payload(**kwargs):
    """Two days of a battery capped at 80%, with the sun covering half the load."""
    window = _window(2)
    days = [soc_day(0, low=40.0, high=80.0), soc_day(1, low=40.0, high=80.0)]
    return build_sizing_payload(
        window=window,
        tz=KYIV,
        rated_power=RATED,
        load=None,
        soc=HourlySeries(tuple(days[0] + days[1])),
        energy={
            "pv_energy_total": _energy(0.5, window.start, 48),
            "load_energy_total": _energy(1.0, window.start, 48),
        },
        low_pct=20.0,
        full_pct=95.0,
        **kwargs,
    ), {day[14].start for day in days}


def test_the_payload_reads_full_by_the_ceiling_and_the_sun_by_the_no_export_rule():
    _, ceiling = _capped_battery_payload()
    payload, _ = _capped_battery_payload(ceiling=ceiling, export_limited=True)
    rules = payload["rules"]
    assert rules["full_mode"] == "ceiling"
    assert rules["export_limited"] is True
    assert rules["solar_curtailed_borderline_share"] == SOLAR_CURTAILED_BORDERLINE_SHARE == 0.4
    for block in (payload["period"], payload["months"][0]):
        assert block["battery"]["verdict"] == ENOUGH, "capped at 80% is full by its limit"
        assert block["solar"]["evidence"]["fill_share"] == 1.0
        assert block["solar"]["verdict"] == ENOUGH, "half the load, and the battery at its limit"


def test_an_empty_ceiling_is_a_battery_that_never_reached_its_limit():
    payload, _ = _capped_battery_payload(ceiling=set())
    assert payload["rules"]["full_mode"] == "ceiling"
    assert payload["period"]["battery"]["reason"] == "never_full"


def test_without_a_ceiling_or_export_decision_the_payload_reads_as_before():
    payload, _ = _capped_battery_payload()
    rules = payload["rules"]
    assert rules["full_mode"] == "fixed"
    assert rules["export_limited"] is None
    assert payload["period"]["battery"]["reason"] == "never_full"
    assert payload["period"]["solar"]["verdict"] == SHORT
