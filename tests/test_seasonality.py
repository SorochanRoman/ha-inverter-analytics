"""Tests for the seasonality analytics."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.resample import Sample, Series
from custom_components.inverter_analytics.analytics.seasonality import (
    build_seasonality_payload,
    month_key,
)
from custom_components.inverter_analytics.analytics.source import Window

KYIV = ZoneInfo("Europe/Kyiv")


def local(year: int, month: int, day: int, hour: int = 0) -> datetime:
    return datetime(year, month, day, hour, tzinfo=KYIV).astimezone(UTC)


def constant(start: datetime, end: datetime, value: float) -> Series:
    return Series.of(start, end, [Sample(start, value)])


def build(load: Series, pv: Series | None = None, window: Window | None = None):
    window = window or Window(load.start, load.end)
    return build_seasonality_payload(load, pv, tz=KYIV, window=window)


def months_of(payload) -> dict[str, dict]:
    return {month["key"]: month for month in payload["months"]}


def test_a_month_is_keyed_by_its_local_year_and_month():
    assert month_key(datetime(2026, 3, 9, tzinfo=KYIV)) == "2026-03"
    assert month_key(datetime(2026, 12, 31, tzinfo=KYIV)) == "2026-12"


def test_every_month_the_window_touches_appears_even_with_no_data():
    """A missing bar invites the reader to invent a reason for it."""
    window = Window(local(2026, 1, 1), local(2026, 4, 1))
    load = constant(local(2026, 3, 1), local(2026, 4, 1), 1000.0)
    payload = build(load, window=window)

    assert [month["key"] for month in payload["months"]] == ["2026-01", "2026-02", "2026-03"]
    january = months_of(payload)["2026-01"]
    assert january["load_mean"] is None
    assert january["coverage"] == 0.0
    assert january["complete"] is False


def test_a_partial_month_is_marked_rather_than_compared_as_an_equal():
    """The case the coverage rule exists for.

    March has the whole month, April has three days at a much lower load. Read
    as equals the pair says "April collapsed"; the coverage says the recorder
    only saw three days of it.
    """
    window = Window(local(2026, 3, 1), local(2026, 4, 4))
    samples = [Sample(local(2026, 3, 1), 3000.0), Sample(local(2026, 4, 1), 500.0)]
    payload = build(Series.of(window.start, window.end, samples), window=window)

    march, april = months_of(payload)["2026-03"], months_of(payload)["2026-04"]
    assert march["complete"] is True
    assert march["coverage"] == 1.0
    assert april["complete"] is False
    assert round(april["coverage"], 2) == 0.1
    # Both figures stay visible; only the claim to comparability is withdrawn.
    assert march["load_mean"] == 3000.0
    assert april["load_mean"] == 500.0


def test_the_monthly_peak_is_the_busiest_hour_not_the_busiest_moment():
    """Long-term statistics have already averaged each hour.

    Two minutes at 9 kW inside an hour that otherwise sits at 1 kW is a 1.27 kW
    hour, and calling the result a peak load would claim a number the data
    cannot carry.
    """
    start, end = local(2026, 5, 1), local(2026, 5, 1, 3)
    samples = [
        Sample(start, 1000.0),
        Sample(start + timedelta(minutes=59), 9000.0),
        Sample(start + timedelta(minutes=61), 1000.0),
    ]
    payload = build(Series.of(start, end, samples), window=Window(start, end))
    peak = months_of(payload)["2026-05"]["load_peak_hourly"]

    assert peak is not None
    assert peak < 2000.0
    assert round(peak) == 1133


def test_hours_of_the_day_are_averaged_across_the_whole_window():
    start, end = local(2026, 6, 1), local(2026, 6, 3)
    samples = []
    for day in (1, 2):
        samples.append(Sample(local(2026, 6, day, 0), 400.0))
        samples.append(Sample(local(2026, 6, day, 18), 4000.0))
        samples.append(Sample(local(2026, 6, day, 20), 400.0))
    payload = build(Series.of(start, end, samples), window=Window(start, end))

    hours = {entry["hour"]: entry["load_mean"] for entry in payload["hours"]}
    assert hours[18] == 4000.0
    assert hours[19] == 4000.0
    assert hours[3] == 400.0
    assert len(payload["hours"]) == 24


def test_cells_cross_month_with_hour_and_skip_the_ones_nobody_recorded():
    """An hour nobody recorded is not an hour of no load."""
    start, end = local(2026, 7, 1), local(2026, 7, 1, 4)
    payload = build(constant(start, end, 2500.0), window=Window(start, end))

    cells = {(cell["month"], cell["hour"]): cell["load_mean"] for cell in payload["cells"]}
    assert cells == {
        ("2026-07", 0): 2500.0,
        ("2026-07", 1): 2500.0,
        ("2026-07", 2): 2500.0,
        ("2026-07", 3): 2500.0,
    }


def test_pv_is_reported_beside_load_when_it_is_mapped():
    start, end = local(2026, 8, 1), local(2026, 8, 2)
    payload = build(
        constant(start, end, 2000.0), constant(start, end, 5000.0), window=Window(start, end)
    )

    assert payload["has_pv"] is True
    assert months_of(payload)["2026-08"]["pv_mean"] == 5000.0
    assert payload["hours"][12]["pv_mean"] == 5000.0


def test_without_a_pv_sensor_the_pv_figures_are_absent_not_zero():
    start, end = local(2026, 8, 1), local(2026, 8, 2)
    payload = build(constant(start, end, 2000.0), window=Window(start, end))

    assert payload["has_pv"] is False
    assert months_of(payload)["2026-08"]["pv_mean"] is None
    assert payload["hours"][12]["pv_mean"] is None


def test_a_window_shorter_than_a_month_still_reports_that_month():
    start, end = local(2026, 9, 10), local(2026, 9, 12)
    payload = build(constant(start, end, 1500.0), window=Window(start, end))

    september = months_of(payload)["2026-09"]
    assert september["load_mean"] == 1500.0
    # Two days of a thirty-day month: the figure stands, its comparability does not.
    assert round(september["coverage"], 3) == round(2 / 30, 3)
    assert september["complete"] is False
    assert september["month_seconds"] == 30 * 86400.0


def test_a_month_containing_a_daylight_saving_change_is_still_fully_covered():
    """The autumn transition adds an hour; coverage must not exceed one."""
    start, end = local(2025, 10, 1), local(2025, 11, 1)
    payload = build(constant(start, end, 1000.0), window=Window(start, end))

    october = months_of(payload)["2025-10"]
    assert october["coverage"] == 1.0
    assert october["month_seconds"] == (31 * 24 + 1) * 3600.0


def test_an_hour_with_no_data_produces_no_cell_at_all():
    """A gap must not reach the heat map as a zero, which would draw as cold."""
    start, end = local(2026, 7, 1), local(2026, 7, 1, 6)
    samples = [
        Sample(local(2026, 7, 1, 0), 2000.0),
        Sample(local(2026, 7, 1, 2), None),
        Sample(local(2026, 7, 1, 4), 2000.0),
    ]
    payload = build(Series.of(start, end, samples), window=Window(start, end))

    hours = sorted(cell["hour"] for cell in payload["cells"])
    assert hours == [0, 1, 4, 5]
    assert all(cell["seconds"] > 0 for cell in payload["cells"])
