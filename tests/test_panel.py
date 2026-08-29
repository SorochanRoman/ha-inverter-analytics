"""Tests for panel registration."""

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import DOMAIN, PANEL_URL_PATH


def _entry(title: str) -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title=title,
        data={
            "entities": {"load_power": "sensor.load"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )


async def test_panel_registered_on_setup(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Deye")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]


async def test_panel_removed_when_last_entry_unloaded(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Deye")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH not in hass.data[frontend.DATA_PANELS]


async def test_panel_survives_while_another_entry_remains(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    first, second = _entry("Deye"), _entry("Victron")
    for entry in (first, second):
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(first.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]
