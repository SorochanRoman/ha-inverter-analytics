"""Check async_series against a live recorder."""

from datetime import timedelta
from unittest.mock import patch

from homeassistant.components.recorder import get_instance
from homeassistant.core import HomeAssistant, State
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.inverter_analytics.analytics.resample import to_intervals
from custom_components.inverter_analytics.analytics.source import (
    Precision,
    PrecisionPlan,
    Window,
    async_energy_many,
    async_series,
    async_series_many,
)

MODULE = "custom_components.inverter_analytics.analytics.source"


async def test_async_series_reads_recorded_states(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    hass.states.async_set("sensor.load_power", "1000")
    await async_wait_recording_done(hass)
    hass.states.async_set("sensor.load_power", "2000")
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    window = Window(now - timedelta(hours=1), now + timedelta(seconds=1))
    series = await async_series(hass, "sensor.load_power", window)

    values = [interval.value for interval in to_intervals(series)]
    assert 1000.0 in values
    assert 2000.0 in values


async def test_several_entities_cost_one_round_trip_to_the_executor(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The Balance tab needs six sensors over one window.

    The recorder call itself stays per-entity for raw states; what must not
    scale with the entity count is the hand-off to the executor thread.
    """
    for index in range(4):
        hass.states.async_set(f"sensor.phase_{index}", str(1000 * index))
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    window = Window(now - timedelta(hours=1), now + timedelta(seconds=1))
    entity_ids = [f"sensor.phase_{index}" for index in range(4)]

    recorder = get_instance(hass)
    original = recorder.async_add_executor_job
    calls = 0

    def counting(*args, **kwargs):
        nonlocal calls
        calls += 1
        return original(*args, **kwargs)

    with patch.object(recorder, "async_add_executor_job", counting):
        results = await async_series_many(hass, entity_ids, window)

    assert set(results) == set(entity_ids)
    assert calls == 1


async def test_a_sensor_without_statistics_reports_its_own_precision(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A flat precision would state something untrue of one of the two series.

    The window straddles the recorder's retention, so its plan is mixed. Only
    one of the entities has long-term statistics behind it, and the other is
    raw-only — which is exactly the case the header's single number lied about.
    """
    now = dt_util.utcnow()
    window = Window(now - timedelta(hours=2), now)
    plan = PrecisionPlan(Precision.MIXED, now - timedelta(hours=1))

    rows = {"sensor.with_lts": [{"start": now - timedelta(hours=2), "mean": 500.0}]}
    states = {
        "sensor.with_lts": [
            State("sensor.with_lts", "600", last_changed=now - timedelta(minutes=5))
        ],
        "sensor.no_lts": [State("sensor.no_lts", "700", last_changed=now - timedelta(minutes=5))],
    }

    with (
        patch(f"{MODULE}.plan_precision", return_value=plan),
        patch(f"{MODULE}._async_lts_rows", return_value=rows),
        patch(f"{MODULE}._async_raw_states", return_value=states),
    ):
        results = await async_series_many(hass, ["sensor.with_lts", "sensor.no_lts"], window)

    assert results["sensor.with_lts"].precision is Precision.MIXED
    assert results["sensor.with_lts"].boundary == plan.boundary
    assert results["sensor.no_lts"].precision is Precision.RAW
    assert results["sensor.no_lts"].boundary is None


async def test_energy_for_several_counters_costs_one_round_trip(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Six energy sensors is the whole point of the Balance tab."""
    now = dt_util.utcnow().replace(minute=0, second=0, microsecond=0)
    window = Window(now - timedelta(hours=3), now)
    ids = [f"sensor.energy_{index}" for index in range(6)]
    rows = {entity_id: [{"start": now - timedelta(hours=2), "change": 1.5}] for entity_id in ids}

    recorder = get_instance(hass)
    original = recorder.async_add_executor_job
    calls = 0

    def counting(*args, **kwargs):
        nonlocal calls
        calls += 1
        return original(*args, **kwargs)

    with (
        patch(f"{MODULE}.statistics_during_period", return_value=rows),
        patch.object(recorder, "async_add_executor_job", counting),
    ):
        result = await async_energy_many(hass, ids, window)

    assert calls == 1
    assert set(result) == set(ids)
    assert result[ids[0]].total == 1.5


async def test_an_hour_without_accounting_is_dropped_not_read_as_zero(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A null change is an hour the recorder cannot account for.

    Reading it as zero would put it in the covered span and claim the period
    had no energy then, rather than no answer.
    """
    now = dt_util.utcnow().replace(minute=0, second=0, microsecond=0)
    window = Window(now - timedelta(hours=4), now)
    rows = {
        "sensor.pv": [
            {"start": now - timedelta(hours=4), "change": None},
            {"start": now - timedelta(hours=3), "change": 2.0},
            {"start": now - timedelta(hours=2), "change": 3.0},
        ]
    }

    with patch(f"{MODULE}.statistics_during_period", return_value=rows):
        result = await async_energy_many(hass, ["sensor.pv"], window)

    series = result["sensor.pv"]
    assert series.total == 5.0
    assert len(series.rows) == 2
    assert series.covered_start == now - timedelta(hours=3)
    assert series.covered_end == now - timedelta(hours=1)


async def test_a_counter_with_no_statistics_reports_no_covered_span(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    now = dt_util.utcnow()
    with patch(f"{MODULE}.statistics_during_period", return_value={}):
        result = await async_energy_many(hass, ["sensor.pv"], Window(now - timedelta(days=1), now))

    series = result["sensor.pv"]
    assert series.total == 0.0
    assert series.covered_start is None
    assert series.covered_end is None


async def test_asking_for_no_counters_is_not_a_query(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    now = dt_util.utcnow()
    with patch(f"{MODULE}.statistics_during_period") as query:
        assert await async_energy_many(hass, [], Window(now - timedelta(days=1), now)) == {}
    query.assert_not_called()


async def test_energy_asks_the_recorder_for_change_at_hourly_resolution(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The type asked for is the whole correctness of this read.

    `change` is the recorder's own accounting across counter resets. Asking for
    `mean` would return the counter's average reading — a number that looks
    plausible, is not energy, and no assertion on the result would catch.
    """
    now = dt_util.utcnow()
    window = Window(now - timedelta(days=2), now)

    with patch(f"{MODULE}.statistics_during_period", return_value={}) as query:
        await async_energy_many(hass, ["sensor.pv", "sensor.load"], window)

    args = query.call_args.args
    assert args[3] == {"sensor.pv", "sensor.load"}
    assert args[4] == "hour"
    assert args[6] == {"change"}
