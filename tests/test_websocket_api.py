"""Tests for the WebSocket API."""

from datetime import timedelta
from unittest.mock import patch

from homeassistant.core import HomeAssistant, State
from homeassistant.util import dt as dt_util
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.inverter_analytics.analytics.health import async_health_analytics
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
    assert entries[0]["entry_id"] == entry.entry_id
    assert entries[0]["title"] == "Deye 8kW"
    assert "raw_available_from" in response["result"]


async def test_config_command_reports_what_each_tab_is_short_of(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """The panel cannot decide this for itself without duplicating the rule.

    This entry has a load sensor and nothing else, which is exactly the shape
    the wizard's two required fields produce — so the Battery and Balance tabs
    have nothing to draw and used to say so as a raised error.
    """
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "inverter_analytics/config"})
    response = await client.receive_json()

    features = {item["key"]: item for item in response["result"]["entries"][0]["features"]}
    assert features["load"]["available"] is True
    assert features["seasonal"]["available"] is True
    assert features["battery"]["available"] is False
    assert features["battery"]["missing"] == ["battery_soc"]
    # One counter is enough to draw a bar, so the tab opens as soon as there
    # is one — and keeps reporting the five it has not got.
    assert features["balance"]["available"] is False
    assert len(features["balance"]["missing"]) == 6
    # The label is what the reader is told they are missing out on.
    assert features["battery"]["label"] == "Battery analytics"


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
        "ws_grid",
        "ws_sizing",
        "ws_health",
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


async def test_grid_command_counts_outages_from_the_presence_sensor(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {
                "load_power": ["sensor.load_power"],
                "grid_connected": ["binary_sensor.grid"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("binary_sensor.grid", "on")
    await async_wait_recording_done(hass)

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/grid",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(hours=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["source"] == "sensor"
    assert result["precision"] == "raw"
    assert result["kpi"]["count"] == 0
    assert result["measured_seconds"] > 0
    assert result["has_load"] is True and result["has_soc"] is False
    assert result["series"]["grid_connected"]["entity_id"] == "binary_sensor.grid"


async def test_grid_command_says_what_to_map_when_nothing_is(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/grid",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "invalid_config"
    assert "grid_connected" in response["error"]["message"]


@pytest.mark.parametrize(
    ("flows", "expected_series"),
    [
        (
            {"grid_power_phase": ["sensor.grid_l1", "sensor.grid_l2"]},
            ["battery_power", "grid_l1", "grid_l2"],
        ),
        ({"grid_power": ["sensor.grid_power"]}, ["battery_power", "grid_total"]),
    ],
    ids=["phases", "total"],
)
async def test_grid_command_infers_from_the_flows_without_a_presence_sensor(
    recorder_mock,
    enable_custom_integrations,
    hass: HomeAssistant,
    hass_ws_client,
    flows: dict[str, list[str]],
    expected_series: list[str],
) -> None:
    """The fallback mode: no grid_connected, but the flows can be read.

    Either shape of grid power: a total, or the phases most presets offer
    instead, which have to be summed before presence can be guessed at. The
    phases are named from their entity ids, so an entry mapping L1 and L3
    would report grid_l3 rather than a second phase it has not got.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {"battery_power": ["sensor.battery_power"], **flows},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    end = dt_util.utcnow()

    def states(hass, entity_ids, window):
        """Half an hour of discharging with nothing crossing the connection."""
        return {
            entity_id: [
                State(
                    entity_id,
                    "-2000" if entity_id == "sensor.battery_power" else "0",
                    last_changed=end - timedelta(minutes=30),
                )
            ]
            for entity_id in entity_ids
        }

    client = await hass_ws_client(hass)
    with patch(
        "custom_components.inverter_analytics.analytics.source._read_raw_states",
        side_effect=states,
    ):
        await client.send_json_auto_id(
            {
                "type": "inverter_analytics/grid",
                "entry_id": entry.entry_id,
                "start": (end - timedelta(hours=1)).isoformat(),
                "end": end.isoformat(),
            }
        )
        response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["source"] == "inferred"
    assert result["precision"] == "raw"
    assert result["kpi"]["count"] == 1
    assert result["kpi"]["off_seconds"] == 1800.0
    # A flicker cannot be inferred, so there is no count of brief ones either.
    assert result["kpi"]["brief_interruptions"] is None
    assert result["episodes"][0]["ongoing"] is True
    assert result["has_soc"] is False and result["has_load"] is False
    assert sorted(result["series"]) == expected_series


async def test_sizing_command_returns_the_period_and_months(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    await hass.config.async_update(time_zone="Europe/Kyiv")
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
    hass.states.async_set("sensor.load_power", "1500", {"state_class": "measurement"})
    # A charge sensor with no state_class keeps no statistics at all.
    hass.states.async_set("sensor.soc", "80")

    end = dt_util.utcnow().replace(minute=0, second=0, microsecond=0)
    rows = {
        "sensor.load_power": [
            {"start": end - timedelta(hours=2), "mean": 1500.0, "min": 900.0, "max": 7000.0}
        ]
    }
    client = await hass_ws_client(hass)
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value=rows,
    ):
        await client.send_json_auto_id(
            {
                "type": "inverter_analytics/sizing",
                "entry_id": entry.entry_id,
                "start": (end - timedelta(days=1)).isoformat(),
                "end": end.isoformat(),
            }
        )
        response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["timezone"] == "Europe/Kyiv"
    assert result["period"]["inverter"]["verdict"] == "borderline"
    assert result["period"]["battery"]["reason"] == "no_data"
    assert result["period"]["solar"] is None
    assert result["cards"]["inverter"]["missing"] == []
    assert result["cards"]["battery"]["no_statistics"] == ["sensor.soc"]
    assert result["cards"]["battery"]["thresholds_inverted"] is False
    assert result["cards"]["solar"]["missing"] == ["pv_energy_total", "load_energy_total"]
    assert result["months"], "a one-day window touches at least one month"


async def test_sizing_ignores_the_import_counter_when_judging_the_solar_card(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """The import counter feeds self-sufficiency alone, never the verdict."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Import without statistics",
        data={
            "entities": {
                "pv_energy_total": ["sensor.pv_energy"],
                "load_energy_total": ["sensor.load_energy"],
                "grid_import_total": ["sensor.grid_import"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.states.async_set("sensor.pv_energy", "120", {"state_class": "total_increasing"})
    hass.states.async_set("sensor.load_energy", "100", {"state_class": "total_increasing"})
    # Mapped, and keeping no statistics of its own.
    hass.states.async_set("sensor.grid_import", "40")

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
                "type": "inverter_analytics/sizing",
                "entry_id": entry.entry_id,
                "start": (end - timedelta(days=1)).isoformat(),
                "end": end.isoformat(),
            }
        )
        response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["cards"]["solar"]["no_statistics"] == []
    assert result["cards"]["solar"]["missing"] == []
    assert result["period"]["solar"]["verdict"] == "enough"


async def test_sizing_answers_a_pv_counter_alone_with_a_card_that_names_the_missing_role(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """The tab opens on any one of its four roles, so no such entry may get an error."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Production counter only",
        data={
            "entities": {"pv_energy_total": ["sensor.pv_energy"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.states.async_set("sensor.pv_energy", "120", {"state_class": "total_increasing"})

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/sizing",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["period"]["solar"] is None, "the share needs both counters"
    assert result["cards"]["solar"]["missing"] == ["load_energy_total"]
    assert result["cards"]["inverter"]["missing"] == ["load_power"]


async def test_sizing_command_says_what_to_map_when_nothing_is(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Bare",
        data={"entities": {}, "numbers": {"rated_power": 8000.0}, "inverted": []},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/sizing",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "invalid_config"
    assert "load_power" in response["error"]["message"]


async def test_sizing_without_a_usable_rated_power_cannot_judge_the_inverter(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """Rated zero would read every hour as "at rated"; the card names the number instead."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="No rating",
        data={
            "entities": {"load_power": ["sensor.load_power"], "battery_soc": ["sensor.soc"]},
            "numbers": {"rated_power": 0.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/sizing",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["period"]["inverter"] is None
    assert result["cards"]["inverter"]["missing"] == ["rated_power"]


async def test_sizing_withholds_the_battery_card_when_full_is_below_low(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """An inverted pair of thresholds makes every day both full and low."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Crossed thresholds",
        data={
            "entities": {"battery_soc": ["sensor.soc"]},
            "numbers": {
                "rated_power": 8000.0,
                "battery_low_pct": 90.0,
                "battery_full_pct": 50.0,
            },
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/sizing",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["period"]["battery"] is None
    assert result["cards"]["battery"] == {
        "missing": [],
        "no_statistics": [],
        "thresholds_inverted": True,
    }


async def _sizing_with_rows(
    hass, hass_ws_client, *, entities, inverted, rows, states, numbers=None
):
    """Ask for sizing over the last day with these statistics rows behind every sensor."""
    await hass.config.async_update(time_zone="Europe/Kyiv")
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Capped battery",
        data={
            "entities": {role: [entity_id] for role, entity_id in entities.items()},
            "numbers": {"rated_power": 8000.0, **(numbers or {})},
            "inverted": inverted,
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    for entity_id, state_class in states.items():
        hass.states.async_set(entity_id, "1", {"state_class": state_class} if state_class else {})

    end = dt_util.utcnow().replace(minute=0, second=0, microsecond=0)
    at = end - timedelta(hours=2)
    client = await hass_ws_client(hass)
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value={
            entity_id: [{"start": at, **values}] for entity_id, values in rows.items() if values
        },
    ):
        await client.send_json_auto_id(
            {
                "type": "inverter_analytics/sizing",
                "entry_id": entry.entry_id,
                "start": (end - timedelta(days=1)).isoformat(),
                "end": end.isoformat(),
            }
        )
        response = await client.receive_json()
    assert response["success"]
    return response["result"]


_CEILING_ENTITIES = {
    "battery_soc": "sensor.soc",
    "battery_power": "sensor.battery_power",
    "pv_power": "sensor.pv_power",
    "pv_energy_total": "sensor.pv_energy",
    "load_energy_total": "sensor.load_energy",
}
_CEILING_ROWS = {
    # Standing at 85% with the sun up: full by its own limit, short of the 95% mark.
    "sensor.soc": {"mean": 85.0, "min": 85.0, "max": 85.0},
    "sensor.battery_power": {"mean": 0.0, "min": -20.0, "max": 30.0},
    "sensor.pv_power": {"mean": 2500.0, "min": 1800.0, "max": 3200.0},
    "sensor.pv_energy": {"change": 4.0},
    "sensor.load_energy": {"change": 3.0},
}


async def test_sizing_reads_full_by_the_charge_ceiling_and_export_by_signed_grid_power(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """An inverted grid sensor reading +800 W at its peak was exporting 800 W."""
    result = await _sizing_with_rows(
        hass,
        hass_ws_client,
        entities={**_CEILING_ENTITIES, "grid_power": "sensor.grid_power"},
        inverted=["grid_power"],
        rows={**_CEILING_ROWS, "sensor.grid_power": {"mean": 300.0, "min": 5.0, "max": 800.0}},
        states={},
    )
    assert result["rules"]["full_mode"] == "ceiling"
    assert result["rules"]["export_limited"] is False
    assert result["rules"]["ceiling_missing"] == result["rules"]["ceiling_no_rows"] == []
    assert result["period"]["battery"]["evidence"]["days_full"] == 1
    assert result["period"]["solar"]["evidence"]["fill_share"] == 1.0


async def test_sizing_falls_back_to_the_fixed_mark_without_battery_power_rows(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    result = await _sizing_with_rows(
        hass,
        hass_ws_client,
        entities={**_CEILING_ENTITIES, "grid_power": "sensor.grid_power"},
        inverted=[],
        rows={
            **_CEILING_ROWS,
            "sensor.battery_power": None,
            "sensor.grid_power": {"mean": 300.0, "min": -5.0, "max": 900.0},
        },
        states={},
    )
    assert result["rules"]["full_mode"] == "fixed"
    assert result["rules"]["export_limited"] is True
    assert result["period"]["battery"]["reason"] == "never_full"
    assert result["rules"]["ceiling_missing"] == []
    assert result["rules"]["ceiling_no_rows"] == ["battery_power"]
    # Production covers the load, but without export that is not enough: the
    # battery never reached the mark, so the share alone makes it borderline.
    assert result["period"]["solar"]["verdict"] == "borderline"


async def test_sizing_reads_export_from_the_counter_without_naming_it_on_the_solar_card(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """The export counter is optional: keeping no statistics must not mark the card unread."""
    result = await _sizing_with_rows(
        hass,
        hass_ws_client,
        entities={
            "pv_energy_total": "sensor.pv_energy",
            "load_energy_total": "sensor.load_energy",
            "grid_export_total": "sensor.grid_export",
        },
        inverted=[],
        rows={
            "sensor.pv_energy": {"change": 4.0},
            "sensor.load_energy": {"change": 3.0},
            "sensor.grid_export": {"change": 0.02},
        },
        states={
            "sensor.pv_energy": "total_increasing",
            "sensor.load_energy": "total_increasing",
            "sensor.grid_export": None,
        },
    )
    assert result["rules"]["full_mode"] == "fixed"
    assert result["rules"]["export_limited"] is True
    assert result["cards"]["solar"] == {"missing": [], "no_statistics": []}
    assert result["rules"]["ceiling_missing"] == ["battery_power", "pv_power"]
    assert result["rules"]["ceiling_no_rows"] == []
    # No charge sensor, so no fill share: the no-export rule cannot be read.
    assert result["period"]["solar"]["reason"] == "no_fill"


async def test_sizing_ignores_crossed_marks_in_ceiling_mode(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    """The full mark is unused at the ceiling, so a crossed pair is no error there."""
    crossed = {"battery_low_pct": 30.0, "battery_full_pct": 20.0}
    result = await _sizing_with_rows(
        hass,
        hass_ws_client,
        entities=_CEILING_ENTITIES,
        inverted=[],
        rows=_CEILING_ROWS,
        states={},
        numbers=crossed,
    )
    assert result["cards"]["battery"]["thresholds_inverted"] is False
    assert result["period"]["battery"]["evidence"]["days_full"] == 1


async def test_sizing_withholds_crossed_marks_when_ceiling_mode_falls_back(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    result = await _sizing_with_rows(
        hass,
        hass_ws_client,
        entities=_CEILING_ENTITIES,
        inverted=[],
        rows={**_CEILING_ROWS, "sensor.pv_power": None},
        states={},
        numbers={"battery_low_pct": 30.0, "battery_full_pct": 20.0},
    )
    assert result["rules"]["full_mode"] == "fixed"
    assert result["cards"]["battery"]["thresholds_inverted"] is True
    assert result["period"]["battery"] is None


async def test_sizing_falls_back_to_grid_power_when_the_export_counter_is_empty(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    result = await _sizing_with_rows(
        hass,
        hass_ws_client,
        entities={
            "pv_energy_total": "sensor.pv_energy",
            "load_energy_total": "sensor.load_energy",
            "grid_export_total": "sensor.grid_export",
            "grid_power": "sensor.grid_power",
        },
        inverted=[],
        rows={
            "sensor.pv_energy": {"change": 4.0},
            "sensor.load_energy": {"change": 3.0},
            "sensor.grid_export": None,
            "sensor.grid_power": {"mean": 300.0, "min": -5.0, "max": 900.0},
        },
        states={},
    )
    assert result["rules"]["export_limited"] is True


async def _health_entry(hass: HomeAssistant) -> MockConfigEntry:
    await hass.config.async_update(time_zone="Europe/Kyiv")
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {
                "load_power": ["sensor.load_power"],
                "pv_energy_total": ["sensor.pv_energy"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_health_command_takes_no_window_and_reads_five_years_back(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client, freezer
) -> None:
    entry = await _health_entry(hass)
    # Connected first: a token issued before a jump in time is still accepted.
    client = await hass_ws_client(hass)
    freezer.move_to("2026-06-15 09:20:00+00:00")
    now = dt_util.utcnow()
    hour = now.replace(minute=0, second=0, microsecond=0) - timedelta(hours=1)
    rows = {
        "sensor.load_power": [{"start": hour, "mean": 3000.0, "min": 500.0, "max": 7000.0}],
        "sensor.pv_energy": [{"start": hour, "change": 2.5}],
    }
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value=rows,
    ) as statistics:
        await client.send_json_auto_id(
            {"type": "inverter_analytics/health", "entry_id": entry.entry_id}
        )
        response = await client.receive_json()

    assert response["success"], response
    starts = {call.args[1] for call in statistics.call_args_list}
    assert starts == {now - timedelta(days=5 * 365)}
    result = response["result"]
    assert "window" not in result
    assert result["timezone"] == "Europe/Kyiv"
    assert result["months"][0] == "2021-06"
    assert result["months"][-1] == "2026-06"
    assert result["first_month"] == "2026-06"
    assert result["covers_now"] is True
    assert result["signals"]["inverter"]["months"]["2026-06"]["value"] == 1
    assert result["signals"]["solar_energy"]["months"]["2026-06"]["value"] == 2.5
    assert result["signals"]["capacity"]["missing"] == [
        "battery_soc",
        "battery_discharge_total",
        "battery_charge_total",
    ]
    assert result["signals"]["best_hour"]["missing"] == ["pv_power"]
    assert result["signals"]["efficiency"]["missing"] == [
        "battery_soc",
        "battery_charge_total",
        "battery_discharge_total",
    ]
    assert result["signals"]["efficiency"]["months"] == {}


async def test_health_command_caches_for_the_local_day(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client, freezer
) -> None:
    entry = await _health_entry(hass)
    client = await hass_ws_client(hass)
    # 23:30 in Kyiv: an hour later is another local day, well inside the TTL.
    freezer.move_to("2026-06-15 20:30:00+00:00")
    message = {"type": "inverter_analytics/health", "entry_id": entry.entry_id}
    with (
        patch(
            "custom_components.inverter_analytics.analytics.source.statistics_during_period",
            return_value={},
        ),
        patch(
            "custom_components.inverter_analytics.websocket_api.async_health_analytics",
            wraps=async_health_analytics,
        ) as computed,
    ):
        await client.send_json_auto_id(message)
        assert (await client.receive_json())["success"]
        freezer.tick(timedelta(minutes=10))
        await client.send_json_auto_id(message)
        assert (await client.receive_json())["success"]
        assert computed.call_count == 1
        freezer.tick(timedelta(hours=1))
        await client.send_json_auto_id(message)
        assert (await client.receive_json())["success"]

    assert computed.call_count == 2
    assert hass.data[DOMAIN][entry.entry_id]["cache"].size == 2


async def test_health_command_rejects_unknown_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    await _health_entry(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": "inverter_analytics/health", "entry_id": "does-not-exist"}
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "not_found"
