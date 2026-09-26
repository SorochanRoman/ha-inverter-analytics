"""Tests for data-source selection and conversion into samples."""

from datetime import UTC, datetime, timedelta
from types import SimpleNamespace
from unittest.mock import patch

from freezegun import freeze_time
from homeassistant.core import HomeAssistant, State
import pytest

from custom_components.inverter_analytics.analytics.resample import (
    Series,
    coverage,
    to_intervals,
)
from custom_components.inverter_analytics.analytics.source import (
    Precision,
    Window,
    async_binary_series,
    binary_states_to_samples,
    countable_window,
    plan_precision,
    raw_available_from,
    states_to_samples,
    statistic_rows_to_samples,
)

NOW = datetime(2026, 1, 31, 12, 0, tzinfo=UTC)


@pytest.fixture
def recorder_keep_days():
    """Replace the recorder with an object that has keep_days=10."""
    with patch(
        "custom_components.inverter_analytics.analytics.source.get_instance",
        return_value=SimpleNamespace(keep_days=10),
    ):
        yield


@freeze_time(NOW)
def test_raw_available_from_follows_recorder_keep_days(hass: HomeAssistant, recorder_keep_days):
    assert raw_available_from(hass) == NOW - timedelta(days=10)


@freeze_time(NOW)
def test_recent_window_uses_raw_states(hass: HomeAssistant, recorder_keep_days):
    plan = plan_precision(hass, Window(NOW - timedelta(days=3), NOW))
    assert plan.precision is Precision.RAW
    assert plan.boundary is None


@freeze_time(NOW)
def test_old_window_uses_long_term_statistics(hass: HomeAssistant, recorder_keep_days):
    plan = plan_precision(hass, Window(NOW - timedelta(days=90), NOW - timedelta(days=30)))
    assert plan.precision is Precision.LTS
    assert plan.boundary is None


@freeze_time(NOW)
def test_straddling_window_is_mixed_and_reports_the_boundary(
    hass: HomeAssistant, recorder_keep_days
):
    plan = plan_precision(hass, Window(NOW - timedelta(days=30), NOW))
    assert plan.precision is Precision.MIXED
    assert plan.boundary == NOW - timedelta(days=10)


def test_states_convert_to_samples_and_unavailable_becomes_none():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    states = [
        State("sensor.x", "1000", last_changed=ts),
        State("sensor.x", "unavailable", last_changed=ts + timedelta(minutes=5)),
        State("sensor.x", "unknown", last_changed=ts + timedelta(minutes=10)),
        State("sensor.x", "2000", last_changed=ts + timedelta(minutes=15)),
    ]
    samples = states_to_samples(states, sign=1.0)
    assert [sample.value for sample in samples] == [1000.0, None, None, 2000.0]


def test_states_that_are_not_numbers_become_none():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    samples = states_to_samples([State("sensor.x", "off", last_changed=ts)], sign=1.0)
    assert samples[0].value is None


def test_sign_inverts_numeric_states_but_not_gaps():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    states = [
        State("sensor.x", "1000", last_changed=ts),
        State("sensor.x", "unavailable", last_changed=ts + timedelta(minutes=5)),
    ]
    samples = states_to_samples(states, sign=-1.0)
    assert samples[0].value == -1000.0
    assert samples[1].value is None


def test_statistic_rows_accept_float_timestamps():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    rows = [
        {"start": ts.timestamp(), "mean": 500.0},
        {"start": (ts + timedelta(hours=1)).timestamp(), "mean": 700.0},
    ]
    samples = statistic_rows_to_samples(rows, sign=1.0)
    # Two adjacent hours need no closer between them, only one after the last.
    assert [sample.ts for sample in samples] == [
        ts,
        ts + timedelta(hours=1),
        ts + timedelta(hours=2),
    ]
    assert [sample.value for sample in samples] == [500.0, 700.0, None]


def test_statistic_rows_accept_datetime_starts():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    samples = statistic_rows_to_samples([{"start": ts, "mean": 500.0}], sign=1.0)
    assert samples[0].ts == ts


def test_statistic_rows_without_mean_become_gaps():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    samples = statistic_rows_to_samples([{"start": ts, "mean": None}], sign=1.0)
    assert samples[0].value is None


def test_a_missing_hour_of_statistics_is_a_gap_not_a_continuation():
    """A statistics row describes one hour; a state persists, a row does not.

    Without the closer, a fortnight the recorder spent switched off is filled
    in with whatever value preceded it, and every figure measuring how much of
    a period has data reports all of it.
    """
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    rows = [
        {"start": ts, "mean": 500.0},
        {"start": ts + timedelta(hours=5), "mean": 700.0},
    ]
    samples = statistic_rows_to_samples(rows, sign=1.0)

    assert [(sample.ts - ts).total_seconds() / 3600 for sample in samples] == [0, 1, 5, 6]
    assert [sample.value for sample in samples] == [500.0, None, 700.0, None]


def test_statistics_do_not_run_past_the_hour_they_describe():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    series = Series.of(
        ts,
        ts + timedelta(hours=10),
        statistic_rows_to_samples([{"start": ts, "mean": 500.0}], sign=1.0),
    )
    intervals = to_intervals(series)

    assert len(intervals) == 1
    assert intervals[0].seconds == 3600.0
    assert coverage(series) == 0.1


def test_binary_states_become_one_and_zero_and_anything_else_a_gap():
    states = [
        State("binary_sensor.grid", "on"),
        State("binary_sensor.grid", "off"),
        State("binary_sensor.grid", "unavailable"),
        State("binary_sensor.grid", "unknown"),
    ]
    assert [sample.value for sample in binary_states_to_samples(states)] == [1.0, 0.0, None, None]


@freeze_time(NOW)
def test_countable_window_starts_where_the_recorder_does(hass: HomeAssistant, recorder_keep_days):
    boundary = NOW - timedelta(days=10)

    whole = countable_window(hass, Window(NOW - timedelta(days=30), NOW))
    assert whole.window == Window(boundary, NOW)
    assert whole.counted_from == boundary

    recent = countable_window(hass, Window(NOW - timedelta(days=2), NOW))
    assert recent.window == Window(NOW - timedelta(days=2), NOW)
    assert recent.counted_from is None


@freeze_time(NOW)
def test_a_window_the_recorder_no_longer_holds_is_countable_for_nothing(
    hass: HomeAssistant, recorder_keep_days
):
    gone = countable_window(hass, Window(NOW - timedelta(days=30), NOW - timedelta(days=20)))
    assert gone.window.seconds == 0.0
    assert gone.counted_from == NOW - timedelta(days=10)


async def test_binary_series_reads_raw_states_only(hass: HomeAssistant):
    window = Window(NOW - timedelta(hours=1), NOW)
    states = [State("binary_sensor.grid", "off", last_changed=NOW - timedelta(minutes=30))]
    with (
        patch(
            "custom_components.inverter_analytics.analytics.source._async_raw_states",
            return_value={"binary_sensor.grid": states},
        ) as raw,
        patch("custom_components.inverter_analytics.analytics.source._async_lts_rows") as lts,
    ):
        series = await async_binary_series(hass, "binary_sensor.grid", window)
    assert raw.called
    assert not lts.called
    assert series.start == window.start and series.end == window.end
    assert [sample.value for sample in series.samples] == [0.0]
