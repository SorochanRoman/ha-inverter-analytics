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
