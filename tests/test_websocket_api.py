"""Тести WebSocket API."""

from datetime import timedelta
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.inverter_analytics.analytics.load import async_load_analytics
from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.websocket_api import MAX_WINDOW_DAYS, clamp_window


def _entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {"load_power": "sensor.load_power"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )


def test_clamp_window_leaves_short_windows_untouched():
    end = dt_util.utcnow()
    start = end - timedelta(days=30)
    window, clamped = clamp_window(start, end)
    assert window.start == start
    assert clamped is False


def test_clamp_window_shortens_windows_beyond_the_limit():
    end = dt_util.utcnow()
    start = end - timedelta(days=MAX_WINDOW_DAYS + 100)
    window, clamped = clamp_window(start, end)
    assert clamped is True
    assert window.end - window.start == timedelta(days=MAX_WINDOW_DAYS)


async def test_config_command_lists_entries(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "inverter_analytics/config"})
    response = await client.receive_json()

    assert response["success"] is True
    entries = response["result"]["entries"]
    assert len(entries) == 1
    assert entries[0]["title"] == "Deye 8kW"
    assert entries[0]["entities"] == {"load_power": "sensor.load_power"}
    assert entries[0]["numbers"] == {"rated_power": 8000.0}
    assert "raw_available_from" in response["result"]


async def test_load_command_returns_analytics(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("sensor.load_power", "1000")
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": entry.entry_id,
            "start": (now - timedelta(hours=1)).isoformat(),
            "end": (now + timedelta(seconds=1)).isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is True
    result = response["result"]
    assert result["rated_power"] == 8000.0
    assert result["precision"] == "raw"
    assert next(band["key"] for band in result["bands"]) == "0-10"
    assert "mean" in result["kpi"]


async def test_load_command_rejects_unknown_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": "does-not-exist",
            "start": (now - timedelta(hours=1)).isoformat(),
            "end": now.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "not_found"


async def test_load_command_reports_not_found_for_an_unloaded_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """Вимкнений в UI інвертор існує як запис, але обслуговувати його нічим."""
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": entry.entry_id,
            "start": (now - timedelta(hours=1)).isoformat(),
            "end": now.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "not_found"


async def test_load_command_rejects_inverted_window(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": entry.entry_id,
            "start": now.isoformat(),
            "end": (now - timedelta(hours=1)).isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "invalid_window"


async def test_second_identical_request_is_served_from_cache(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("sensor.load_power", "1000")
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    payload = {
        "type": "inverter_analytics/load",
        "entry_id": entry.entry_id,
        "start": (now - timedelta(hours=1)).isoformat(),
        "end": now.isoformat(),
    }
    with patch(
        "custom_components.inverter_analytics.websocket_api.async_load_analytics",
        wraps=async_load_analytics,
    ) as computed:
        client = await hass_ws_client(hass)
        await client.send_json({"id": 1, **payload})
        first = await client.receive_json()
        await client.send_json({"id": 2, **payload})
        second = await client.receive_json()

    assert first["result"] == second["result"]
    # Головне: друга відповідь не коштувала жодного перерахунку.
    assert computed.call_count == 1
    cache = hass.data[DOMAIN][entry.entry_id]["cache"]
    assert cache.size == 1
