"""Tests for the WebSocket API."""

from datetime import timedelta
from unittest.mock import MagicMock, patch

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.inverter_analytics.analytics.load import async_load_analytics
from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.websocket_api import (
    MAX_WINDOW_DAYS,
    async_register,
    clamp_window,
)


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
    # entities is now tuple-valued (roles.py Task 1); JSON encodes the tuple as a list.
    assert entries[0]["entities"] == {"load_power": ["sensor.load_power"]}
    assert entries[0]["numbers"] == {"rated_power": 8000.0}
    assert "raw_available_from" in response["result"]


async def test_config_command_hands_lists_to_send_result(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The wire cannot show this: JSON renders a tuple and a list identically.

    The explicit conversion only matters on the Python side, so that is where it
    has to be checked.
    """
    from custom_components.inverter_analytics.websocket_api import ws_config

    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 3-phase",
        data={
            "entities": {
                "load_power": ["sensor.total"],
                "load_power_phase": ["sensor.l1", "sensor.l2", "sensor.l3"],
            },
            "numbers": {"rated_power": 12000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    connection = MagicMock()
    ws_config(hass, connection, {"id": 1})

    payload = connection.send_result.call_args[0][1]
    entities = payload["entries"][0]["entities"]
    assert isinstance(entities["load_power_phase"], list)
    assert entities["load_power_phase"] == ["sensor.l1", "sensor.l2", "sensor.l3"]


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
    """An inverter disabled in the UI still exists as an entry, but nothing serves it."""
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
    # The key point: the second response cost no recomputation at all.
    assert computed.call_count == 1
    cache = hass.data[DOMAIN][entry.entry_id]["cache"]
    assert cache.size == 1


def test_a_window_of_exactly_the_limit_is_not_shortened():
    """The comparison is strictly greater, and the boundary is where that shows."""
    end = dt_util.utcnow()
    window, clamped = clamp_window(end - timedelta(days=MAX_WINDOW_DAYS), end)
    assert clamped is False
    assert window.end - window.start == timedelta(days=MAX_WINDOW_DAYS)


async def test_the_commands_are_registered_once_for_the_whole_instance(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Registration is per Home Assistant, not per entry.

    Every entry's setup calls async_register, and Home Assistant treats
    registering the same command name twice as a programming error. This is
    the call each additional inverter makes, without the HTTP stack that
    setting one up would otherwise start.
    """
    with patch(
        "custom_components.inverter_analytics.websocket_api.websocket_api.async_register_command"
    ) as register:
        async_register(hass)
        async_register(hass)

    registered = [call.args[1].__name__ for call in register.call_args_list]
    assert registered == [
        "ws_config",
        "ws_load",
        "ws_battery",
        "ws_seasonality",
        "ws_balance",
    ]


async def test_battery_command_returns_analytics(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {"battery_soc": ["sensor.battery_soc"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("sensor.battery_soc", "80")
    await async_wait_recording_done(hass)

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/battery",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(hours=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["low_pct"] == 20.0
    assert len(result["bands"]) == 5
    assert result["power"] is None
    assert "battery_soc" in result["series"]


async def test_battery_command_says_what_is_missing_without_a_charge_sensor(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """The Load tab can be configured without ever mapping a battery."""
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/battery",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(hours=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "invalid_config"
    assert "battery_soc" in response["error"]["message"]


async def test_load_and_battery_do_not_share_a_cache_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """Same entry, same window, two commands — the kind has to key the cache."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {"load_power": ["sensor.load_power"], "battery_soc": ["sensor.soc"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.states.async_set("sensor.load_power", "1000")
    hass.states.async_set("sensor.soc", "55")
    await async_wait_recording_done(hass)

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    window = {
        "entry_id": entry.entry_id,
        "start": (end - timedelta(hours=1)).isoformat(),
        "end": end.isoformat(),
    }
    await client.send_json_auto_id({"type": "inverter_analytics/load", **window})
    load = (await client.receive_json())["result"]
    await client.send_json_auto_id({"type": "inverter_analytics/battery", **window})
    battery = (await client.receive_json())["result"]

    assert "rated_power" in load and "rated_power" not in battery
    assert "low_pct" in battery and "low_pct" not in load


async def test_seasonality_command_returns_months_in_the_installation_zone(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """A month boundary is a wall-clock idea, so it belongs to the home's zone."""
    await hass.config.async_update(time_zone="Europe/Kyiv")
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("sensor.load_power", "1500")
    await async_wait_recording_done(hass)

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/seasonality",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=40)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["timezone"] == "Europe/Kyiv"
    assert len(result["hours"]) == 24
    assert result["months"], "a 40-day window touches at least one month"
    assert all("coverage" in month for month in result["months"])
    assert result["has_pv"] is False


async def test_balance_command_returns_flows_and_the_covered_span(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    await hass.config.async_update(time_zone="Europe/Kyiv")
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {
                "load_power": ["sensor.load_power"],
                "pv_energy_total": ["sensor.pv_energy"],
                "load_energy_total": ["sensor.load_energy"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    end = dt_util.utcnow().replace(minute=0, second=0, microsecond=0)
    rows = {
        "sensor.pv_energy": [{"start": end - timedelta(hours=2), "change": 4.0}],
        "sensor.load_energy": [{"start": end - timedelta(hours=2), "change": 3.0}],
    }

    client = await hass_ws_client(hass)
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value=rows,
    ):
        await client.send_json_auto_id(
            {
                "type": "inverter_analytics/balance",
                "entry_id": entry.entry_id,
                "start": (end - timedelta(days=1)).isoformat(),
                "end": end.isoformat(),
            }
        )
        response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["totals"] == {"pv_energy_total": 4.0, "load_energy_total": 3.0}
    assert result["unaccounted"] is None, "four counters are missing"
    assert result["missing"] == [
        "grid_import_total",
        "battery_discharge_total",
        "grid_export_total",
        "battery_charge_total",
    ]
    assert result["timezone"] == "Europe/Kyiv"
    assert result["covers_whole_window"] is False


async def test_balance_command_says_what_to_map_when_nothing_is(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """A Load tab can be fully configured without a single energy counter."""
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/balance",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "invalid_config"
    assert "energy counters" in response["error"]["message"]
