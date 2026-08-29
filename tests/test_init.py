"""Tests for the config entry lifecycle."""

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import DOMAIN


def _entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Inverter",
        data={
            "entities": {"load_power": "sensor.load_power"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )


async def test_setup_and_unload_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED
    assert entry.entry_id in hass.data[DOMAIN]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.NOT_LOADED
    assert entry.entry_id not in hass.data[DOMAIN]
