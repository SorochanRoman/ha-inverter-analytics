"""Check async_series against a live recorder."""

from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.inverter_analytics.analytics.resample import to_intervals
from custom_components.inverter_analytics.analytics.source import Window, async_series


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
