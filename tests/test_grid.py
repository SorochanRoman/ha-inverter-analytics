"""Tests for the grid outage analytics."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.grid import (
    OUTAGE_BRIDGE_SECONDS,
    OUTAGE_MIN_SECONDS,
    SOURCE_INFERRED,
    SOURCE_SENSOR,
    build_grid_payload,
    infer_grid_series,
    outage_episodes,
    reserve_columns,
    reserve_summary,
    sum_series,
)
from custom_components.inverter_analytics.analytics.resample import Sample, Series, to_intervals
from custom_components.inverter_analytics.analytics.source import Window

BASE = datetime(2026, 1, 1, tzinfo=UTC)
KYIV = ZoneInfo("Europe/Kyiv")


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def grid_series(*points: tuple[float, float | None], end: float = 240.0) -> Series:
    """A binary series: (minute, 1.0 for on / 0.0 for off / None for a gap)."""
    return Series.of(BASE, at(end), [Sample(at(m), v) for m, v in points])


def episodes(series: Series):
    return outage_episodes(
        to_intervals(series),
        window=Window(series.start, series.end),
        min_seconds=OUTAGE_MIN_SECONDS,
        bridge_seconds=OUTAGE_BRIDGE_SECONDS,
    )


def build(series: Series, **kwargs):
    options = {
        "window": Window(series.start, series.end),
        "tz": UTC,
        "source": SOURCE_SENSOR,
        "low_pct": 20.0,
    } | kwargs
    return build_grid_payload(series, **options)


def test_a_run_of_off_is_an_outage_with_its_duration():
    found = episodes(grid_series((0, 1.0), (60, 0.0), (90, 1.0)))
    assert len(found) == 1
    assert found[0].start == at(60)
    assert found[0].end == at(90)
    assert found[0].seconds == 1800.0
    assert found[0].bridged_seconds == 0.0
    assert found[0].started_before_window is False
    assert found[0].ongoing is False


def test_a_flicker_under_a_minute_is_not_an_outage_but_is_counted():
    series = grid_series((0, 1.0), (60, 0.0), (60.5, 1.0), (100, 0.0), (130, 1.0))
    assert len(episodes(series)) == 1
    assert build(series)["kpi"]["brief_interruptions"] == 1
    assert build(series)["kpi"]["count"] == 1


def test_a_short_gap_inside_an_outage_is_bridged_and_reported():
    """Home Assistant restarting mid-outage must not make two outages of one."""
    series = grid_series((0, 1.0), (60, 0.0), (120, None), (120.5, 0.0), (180, 1.0))
    found = episodes(series)
    assert len(found) == 1
    assert found[0].start == at(60) and found[0].end == at(180)
    assert found[0].bridged_seconds == 30.0


def test_the_kpi_reports_the_bridged_time_it_left_out_of_the_off_total():
    """The longest outage includes bridged time, so the off total has to own up to it."""
    series = grid_series((0, 1.0), (60, 0.0), (120, None), (120.5, 0.0), (180, 1.0))
    payload = build(series)
    kpi = payload["kpi"]
    assert kpi["bridged_seconds"] == 30.0
    assert kpi["off_seconds"] == 7170.0, "measured absence only"
    assert kpi["longest_seconds"] == kpi["off_seconds"] + kpi["bridged_seconds"]


def test_nothing_bridged_is_a_zero_not_a_dash():
    assert build(grid_series((0, 1.0)))["kpi"]["bridged_seconds"] == 0.0


def test_a_long_gap_ends_the_outage_where_the_grid_was_last_known_absent():
    series = grid_series((0, 1.0), (60, 0.0), (120, None), (150, 0.0), (180, 1.0))
    found = episodes(series)
    assert [(item.start, item.end) for item in found] == [(at(60), at(120)), (at(150), at(180))]
    assert all(item.bridged_seconds == 0.0 for item in found)


def test_the_grid_returning_inside_a_gap_is_not_bridged_over():
    series = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (121, None), (122, 0.0), (180, 1.0))
    found = episodes(series)
    assert [(item.start, item.end) for item in found] == [(at(60), at(120)), (at(122), at(180))]


def test_outages_at_the_edges_of_the_window_say_so():
    series = grid_series((0, 0.0), (30, 1.0), (200, 0.0))
    found = episodes(series)
    assert found[0].started_before_window is True and found[0].ongoing is False
    assert found[1].started_before_window is False and found[1].ongoing is True
    assert found[1].end == at(240)


def test_the_share_is_of_measured_time_not_of_the_window():
    # 120 minutes measured, of which 30 off; the other 120 minutes are a gap.
    series = grid_series((0, 1.0), (60, 0.0), (90, 1.0), (120, None))
    payload = build(series)
    assert payload["measured_seconds"] == 7200.0
    assert payload["kpi"]["off_seconds"] == 1800.0
    assert payload["kpi"]["off_share"] == 0.25
    assert payload["coverage"] == 0.5


def test_no_measured_time_means_dashes_not_zeroes():
    payload = build(grid_series((0, None)))
    assert payload["measured_seconds"] == 0.0
    assert payload["kpi"]["count"] == 0
    assert payload["kpi"]["off_share"] is None
    assert payload["kpi"]["longest_seconds"] is None
    assert payload["kpi"]["mean_seconds"] is None


def test_the_longest_outage_is_named_with_when_it_began():
    series = grid_series((0, 1.0), (10, 0.0), (20, 1.0), (100, 0.0), (160, 1.0))
    kpi = build(series)["kpi"]
    assert kpi["count"] == 2
    assert kpi["longest_seconds"] == 3600.0
    assert kpi["longest_start"] == at(100).isoformat()
    assert kpi["mean_seconds"] == 2100.0


def test_hours_of_day_carry_off_and_measured_seconds_in_the_local_zone():
    # BASE is 02:00 in Kyiv. Off from 02:30 to 03:30 local.
    series = grid_series((0, 1.0), (30, 0.0), (90, 1.0), end=180)
    hours = build(series, tz=KYIV)["hours"]
    by_hour = {item["hour"]: item for item in hours}
    assert by_hour[2] == {"hour": 2, "off_seconds": 1800.0, "measured_seconds": 3600.0}
    assert by_hour[3] == {"hour": 3, "off_seconds": 1800.0, "measured_seconds": 3600.0}
    assert by_hour[4] == {"hour": 4, "off_seconds": 0.0, "measured_seconds": 3600.0}
    assert by_hour[5]["measured_seconds"] == 0.0


def test_days_carry_off_time_and_the_outages_that_began_on_them():
    # BASE is 2026-01-01 02:00 Kyiv; 22 hours later is the next local day.
    series = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (23 * 60 + 30, 0.0), end=24 * 60)
    days = build(series, tz=KYIV)["days"]
    assert [item["day"] for item in days] == ["2026-01-01", "2026-01-02"]
    assert days[0]["off_seconds"] == 3600.0 and days[0]["count"] == 1
    assert days[1]["off_seconds"] == 1800.0 and days[1]["count"] == 1
    assert days[0]["measured_seconds"] == 22 * 3600.0


def test_a_day_with_no_data_is_absent_not_zero():
    series = grid_series((0, None), (25 * 60, 1.0), end=48 * 60)
    days = build(series)["days"]
    assert [item["day"] for item in days] == ["2026-01-02"]


def test_days_and_hours_add_up_across_a_clock_change():
    # Kyiv moves its clocks forward on 2026-03-29 at 03:00, so that day is 23 hours.
    start = datetime(2026, 3, 28, 22, 0, tzinfo=UTC)  # 2026-03-29 00:00 in Kyiv
    series = Series.of(start, start + timedelta(hours=23), [Sample(start, 1.0)])
    payload = build_grid_payload(
        series,
        window=Window(series.start, series.end),
        tz=KYIV,
        source=SOURCE_SENSOR,
        low_pct=20.0,
    )
    assert payload["days"] == [
        {"day": "2026-03-29", "off_seconds": 0.0, "measured_seconds": 23 * 3600.0, "count": 0}
    ]
    assert sum(item["measured_seconds"] for item in payload["hours"]) == 23 * 3600.0
    assert payload["hours"][3]["measured_seconds"] == 0.0, "the hour that never happened"


def test_the_payload_names_its_source_and_the_cutoff():
    payload = build(grid_series((0, 1.0)), counted_from=at(-60))
    assert payload["source"] == "sensor"
    assert payload["counted_from"] == at(-60).isoformat()
    assert build(grid_series((0, 1.0)))["counted_from"] is None


def soc_series(*points: tuple[float, float | None], end: float = 240.0) -> Series:
    return Series.of(BASE, at(end), [Sample(at(m), v) for m, v in points])


def test_each_outage_carries_the_charge_in_force_at_its_start_and_end_and_its_minimum():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 90.0), (30, 80.0), (100, 40.0), (150, 15.0), (170, 25.0), (200, 60.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_start"] == 80.0, "the sample before the outage is the value in force"
    assert episode["soc_end"] == 25.0
    assert episode["soc_min"] == 15.0
    assert episode["below_low"] is True


def test_a_minimum_before_the_outage_does_not_count():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0))
    soc = soc_series((0, 10.0), (30, 80.0), (90, 70.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_min"] == 70.0
    assert episode["below_low"] is False


def test_no_charge_data_inside_an_outage_is_a_dash():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0))
    soc = soc_series((0, None), (150, 50.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_start"] is None
    assert episode["soc_end"] is None
    assert episode["soc_min"] is None
    assert episode["below_low"] is None


def test_the_columns_are_absent_when_the_sensors_are():
    episode = build(grid_series((0, 1.0), (60, 0.0), (120, 1.0)))["episodes"][0]
    assert "soc_start" not in episode
    assert "load_mean_w" not in episode
    payload = build(grid_series((0, 1.0)))
    assert payload["has_soc"] is False and payload["has_load"] is False


def test_the_mean_load_during_an_outage_is_time_weighted():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0))
    load = soc_series((0, 100.0), (90, 1000.0))
    episode = build(grid, load=load)["episodes"][0]
    assert episode["load_mean_w"] == 550.0


def test_the_reserve_is_on_the_episodes_only_with_a_charge_sensor():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    payload = build(grid)
    # without a SoC sensor: no reserve keys on episodes, an empty summary
    assert "hours_left" not in payload["episodes"][0]
    assert payload["reserve"] == {
        "worst_needed_pct": None,
        "worst_start": None,
        "covered": 0,
        "judged": 0,
    }
    payload_with_soc = build(grid, soc=soc_series((0, 80.0), (120, 65.0), (170, 50.0)))
    # with a SoC sensor: the three keys on every episode
    assert {"hours_left", "needed_pct", "reserve_reason"} <= set(payload_with_soc["episodes"][0])
    assert payload_with_soc["episodes"][0]["needed_pct"] == 50.0
    assert payload_with_soc["reserve"] == {
        "worst_needed_pct": 50.0,
        "worst_start": at(60).isoformat(),
        "covered": 1,
        "judged": 1,
    }


def test_the_lowest_charge_carries_the_moment_it_was_first_reached():
    grid = grid_series((0, 1.0), (60, 0.0), (220, 1.0))
    soc = soc_series((0, 80.0), (90, 60.0), (120, 30.0), (150, 45.0), (200, 30.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_min"] == 30.0
    assert episode["soc_min_at"] == at(120).isoformat()


def test_a_lowest_charge_in_force_at_the_start_is_clipped_to_the_start():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 40.0), (30, 30.0), (100, 50.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_min_at"] == at(60).isoformat()


def test_no_lowest_charge_has_no_moment():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, None))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_min"] is None and episode["soc_min_at"] is None


def test_autonomy_reads_the_discharge_rate_off_the_outages():
    # Two outages; the charge falls 20 points in the first hour of one and 10 in
    # the first hour of the other, then holds. The readings sit inside the
    # outages: one written at the instant the grid returns is not part of it.
    grid = grid_series((0, 1.0), (60, 0.0), (130, 1.0), (150, 0.0), (220, 1.0))
    soc = soc_series((0, 100.0), (120, 80.0), (210, 70.0), (230, 65.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] is None
    assert autonomy["rate_pct_per_hour"] == 15.0
    assert autonomy["evidence_hours"] == 2.0
    # From full to the 20% mark at 15 points an hour.
    assert autonomy["hours_from_full"] == 80.0 / 15.0
    # From where it is now: the last known charge, 65%.
    assert autonomy["soc_now"] == 65.0
    assert autonomy["hours_from_now"] == 45.0 / 15.0


def test_autonomy_is_withheld_without_a_charge_sensor():
    assert build(grid_series((0, 1.0), (60, 0.0), (120, 1.0)))["autonomy"]["reason"] == "no_soc"


def test_autonomy_is_withheld_without_outages():
    autonomy = build(grid_series((0, 1.0)), soc=soc_series((0, 50.0)))["autonomy"]
    assert autonomy["reason"] == "no_outages"
    assert autonomy["hours_from_full"] is None


def test_autonomy_is_withheld_when_no_charge_was_recorded_inside_the_outages():
    """A charge sensor that goes unavailable for exactly the outage reads nothing."""
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, None), (200, 50.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] == "no_soc_in_outages"
    assert autonomy["evidence_hours"] == 0.0
    assert autonomy["rate_pct_per_hour"] is None


def test_autonomy_needs_an_hour_of_evidence():
    # The charge reaches its lowest twenty minutes into the outage.
    grid = grid_series((0, 1.0), (60, 0.0), (90, 1.0))
    soc = soc_series((0, 100.0), (80, 80.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] == "too_little_evidence"
    assert autonomy["evidence_hours"] == 20 / 60


def test_autonomy_is_withheld_when_the_sun_covered_the_outages():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 50.0), (180, 70.0))
    assert build(grid, soc=soc)["autonomy"]["reason"] == "no_net_discharge"


def test_autonomy_from_brief_outages_alone_is_too_little_evidence():
    """Two minutes without the grid cannot move the charge; that is not the sun."""
    grid = grid_series((0, 1.0), (60, 0.0), (62, 1.0))
    soc = soc_series((0, 82.0))
    assert build(grid, soc=soc)["autonomy"]["reason"] == "too_little_evidence"


def test_hours_from_now_is_absent_below_the_low_mark():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 60.0), (170, 15.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] is None
    assert autonomy["hours_from_now"] is None


def dip_and_recover():
    """A night outage running into the morning: 60% at the start, 15% three
    hours in, refilled by the sun to 40% before the grid returns at five hours."""
    grid = grid_series((0, 1.0), (60, 0.0), (360, 1.0), end=420)
    soc = soc_series((0, 60.0), (240, 15.0), (300, 40.0), end=420)
    return build(grid, soc=soc)["autonomy"]


def test_autonomy_reads_the_fall_to_the_lowest_charge_not_to_the_end():
    autonomy = dip_and_recover()
    assert autonomy["reason"] is None
    # 45 points in 3 hours, not the end-based (60 - 40) / 5 = 4.
    assert autonomy["rate_pct_per_hour"] == 15.0


def test_autonomy_evidence_is_the_time_to_the_lowest_charge_not_the_outage_length():
    assert dip_and_recover()["evidence_hours"] == 3.0


def test_autonomy_is_withheld_when_every_lowest_charge_was_at_the_start():
    # The charge only rose through the outage, so its minimum is its start.
    # The 40% written at the instant the grid returned is not inside the
    # outage; read off the end, it would have made a 10-point fall of it.
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 50.0), (100, 60.0), (180, 40.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] == "no_net_discharge"
    assert autonomy["rate_pct_per_hour"] is None


def test_autonomy_reports_the_mean_load_during_the_outages():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (150, 0.0), (180, 1.0))
    soc = soc_series((0, 100.0), (180, 70.0))
    load = soc_series((0, 1000.0), (150, 400.0))
    autonomy = build(grid, soc=soc, load=load)["autonomy"]
    # 60 minutes at 1000 W, 30 at 400 W.
    assert autonomy["load_mean_w"] == 800.0


def test_inferred_outage_needs_zero_grid_and_a_discharging_battery():
    grid_power = soc_series((0, 500.0), (60, 0.0), (120, 3.0), (180, 400.0))
    battery = soc_series((0, 200.0), (60, -800.0), (120, -10.0), (150, -800.0))
    inferred = infer_grid_series(grid_power, battery, zero_w=10.0, idle_w=50.0)
    values = [(int((i.start - BASE).total_seconds() / 60), i.value) for i in to_intervals(inferred)]
    # 60-120: grid at zero, battery discharging -> off.
    # 120-150: grid at zero, battery resting -> not an outage.
    # 150-180: grid near zero, battery discharging -> off.
    assert values == [(0, 1.0), (60, 0.0), (120, 1.0), (150, 0.0), (180, 1.0)]


def test_a_gap_in_either_input_is_a_gap_in_the_inference():
    grid_power = soc_series((0, 0.0), (60, None), (120, 0.0))
    battery = soc_series((0, -800.0))
    inferred = infer_grid_series(grid_power, battery, zero_w=10.0, idle_w=50.0)
    starts = [int((i.start - BASE).total_seconds() / 60) for i in to_intervals(inferred)]
    assert starts == [0, 120]


def test_phases_are_summed_before_the_inference():
    parts = [soc_series((0, 5.0), (60, 200.0)), soc_series((0, 3.0)), soc_series((0, -6.0))]
    total = sum_series(parts)
    assert [i.value for i in to_intervals(total)] == [2.0, 197.0]


def test_inferred_mode_uses_the_longer_floor_and_reports_no_flickers():
    grid = grid_series((0, 1.0), (60, 0.0), (63, 1.0), (100, 0.0), (110, 1.0))
    payload = build(grid, source=SOURCE_INFERRED)
    assert payload["source"] == "inferred"
    assert payload["kpi"]["count"] == 1, "three minutes is under the inferred floor"
    assert payload["kpi"]["brief_interruptions"] is None


def outage(**overrides):
    base = {
        "start": at(0).isoformat(),
        "seconds": 3 * 3600.0,
        "started_before_window": False,
        "ongoing": False,
        "soc_start": 80.0,
        "soc_end": 50.0,
        "soc_min": 50.0,
        "soc_min_at": at(180).isoformat(),
    }
    return base | overrides


def test_reserve_reads_hours_left_and_the_charge_needed():
    # 30 points in 3 hours is 10 points an hour; 30 points above a 20% mark
    # is three more hours, and the outage needed 20 + 30 = 50% at its start.
    assert reserve_columns(outage(), 20.0) == {
        "hours_left": 3.0,
        "needed_pct": 50.0,
        "reserve_reason": None,
    }


def test_a_battery_that_went_below_the_mark_had_no_hours_left():
    columns = reserve_columns(outage(soc_end=15.0, soc_min=15.0), 20.0)
    assert columns["hours_left"] == 0.0
    assert columns["needed_pct"] == 85.0


def test_a_dip_that_recovered_still_counts_from_the_lowest_charge():
    # A night outage into the morning sun: 60 -> 15 by 4 h in, back to 40 at
    # the end. It went below the 20% mark, so it needed 20 + 45 = 65%.
    dip = outage(
        seconds=6 * 3600.0,
        soc_start=60.0,
        soc_min=15.0,
        soc_min_at=at(240).isoformat(),
        soc_end=40.0,
    )
    columns = reserve_columns(dip, 20.0)
    assert columns["hours_left"] == 0.0
    assert columns["needed_pct"] == 65.0
    assert columns["reserve_reason"] is None


def test_hours_left_are_read_at_the_rate_down_to_the_lowest_charge():
    # 80 -> 50 in the first 2 h is 15 points an hour; 30 points above the
    # mark is 2 more hours, whatever the sun did after.
    recovered = outage(
        seconds=5 * 3600.0,
        soc_min=50.0,
        soc_min_at=at(120).isoformat(),
        soc_end=70.0,
    )
    assert reserve_columns(recovered, 20.0) == {
        "hours_left": 2.0,
        "needed_pct": 50.0,
        "reserve_reason": None,
    }


def test_no_net_discharge_is_judged_on_the_lowest_charge_not_the_end():
    flat = outage(soc_min=80.0, soc_min_at=at(0).isoformat(), soc_end=50.0)
    assert reserve_columns(flat, 20.0)["reserve_reason"] == "no_net_discharge"
    ended_higher = outage(soc_min=60.0, soc_min_at=at(60).isoformat(), soc_end=90.0)
    assert reserve_columns(ended_higher, 20.0)["reserve_reason"] is None


def test_a_short_outage_is_too_short_even_when_the_charge_held():
    """Two minutes at 300 W moves a charge read in whole points by nothing.

    That is not the sun covering the outage: there was no time for the charge
    to fall, so the outage is too short to say anything.
    """
    brief = outage(seconds=120.0, soc_min=82.0, soc_start=82.0, soc_min_at=at(0).isoformat())
    assert reserve_columns(brief, 20.0)["reserve_reason"] == "too_short"


def test_the_charge_needed_may_exceed_a_full_battery():
    columns = reserve_columns(outage(soc_start=90.0, soc_end=5.0, soc_min=5.0), 20.0)
    assert columns["needed_pct"] == 105.0


def test_reserve_reasons_in_order():
    just_under = (BASE + timedelta(seconds=1799)).isoformat()
    assert reserve_columns(outage(soc_min=None), 20.0)["reserve_reason"] == "no_soc"
    assert reserve_columns(outage(soc_min_at=None), 20.0)["reserve_reason"] == "no_soc"
    assert reserve_columns(outage(soc_start=None, ongoing=True), 20.0)["reserve_reason"] == "no_soc"
    assert reserve_columns(outage(ongoing=True), 20.0)["reserve_reason"] == "cut"
    assert reserve_columns(outage(started_before_window=True), 20.0)["reserve_reason"] == "cut"
    assert reserve_columns(outage(soc_min=80.0), 20.0)["reserve_reason"] == "no_net_discharge"
    assert reserve_columns(outage(soc_min=85.0), 20.0)["reserve_reason"] == "no_net_discharge"
    assert reserve_columns(outage(soc_min_at=just_under), 20.0)["reserve_reason"] == "too_short"
    assert reserve_columns(outage(soc_min=78.5), 20.0)["reserve_reason"] == "too_short"


def test_reserve_thresholds_are_inclusive():
    assert reserve_columns(outage(soc_min_at=at(30).isoformat()), 20.0)["reserve_reason"] is None
    assert reserve_columns(outage(soc_min=78.0), 20.0)["reserve_reason"] is None


def test_the_end_charge_no_longer_matters():
    assert reserve_columns(outage(soc_end=None), 20.0)["reserve_reason"] is None


def test_a_withheld_reserve_has_no_figures():
    columns = reserve_columns(outage(ongoing=True), 20.0)
    assert columns["hours_left"] is None and columns["needed_pct"] is None


def test_the_summary_names_the_hardest_outage_and_counts_the_covered():
    first = outage() | reserve_columns(outage(), 20.0)
    hard_raw = outage(
        start=at(600).isoformat(),
        soc_start=90.0,
        soc_end=10.0,
        soc_min=10.0,
        soc_min_at=at(780).isoformat(),
    )
    hard = hard_raw | reserve_columns(hard_raw, 20.0)
    withheld = {"hours_left": None, "needed_pct": None, "reserve_reason": "cut"}
    unknown = outage(soc_min=None) | withheld
    assert reserve_summary([first, hard, unknown], 20.0) == {
        "worst_needed_pct": 100.0,
        "worst_start": at(600).isoformat(),
        "covered": 1,
        "judged": 2,
    }


def test_the_summary_without_figures():
    assert reserve_summary([], 20.0) == {
        "worst_needed_pct": None,
        "worst_start": None,
        "covered": 0,
        "judged": 0,
    }
