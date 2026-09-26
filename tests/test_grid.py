"""Tests for the grid outage analytics."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.grid import (
    OUTAGE_BRIDGE_SECONDS,
    OUTAGE_MIN_SECONDS,
    SOURCE_SENSOR,
    build_grid_payload,
    outage_episodes,
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
