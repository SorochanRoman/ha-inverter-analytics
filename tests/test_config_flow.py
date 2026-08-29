"""Tests for the setup wizard."""

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.config_flow import pack, unpack
from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.roles import EntryConfig


def test_pack_splits_flat_form_into_entities_numbers_and_inverted():
    packed = pack(
        {
            "name": "Deye 8kW",
            "load_power": "sensor.load",
            "battery_power": "sensor.batt",
            "rated_power": 8000,
            "invert_battery_power": True,
            "invert_grid_power": False,
        }
    )
    assert packed["entities"] == {"load_power": "sensor.load", "battery_power": "sensor.batt"}
    assert packed["numbers"] == {"rated_power": 8000.0}
    assert packed["inverted"] == ["battery_power"]
    assert "name" not in packed["entities"]


def test_pack_drops_empty_fields():
    packed = pack({"load_power": "sensor.load", "pv_power": "", "rated_power": 5000})
    assert "pv_power" not in packed["entities"]


def test_unpack_restores_entities_numbers_and_set_inversions():
    flat = {
        "load_power": "sensor.load",
        "battery_power": "sensor.batt",
        "rated_power": 8000.0,
        "invert_battery_power": True,
    }
    assert unpack(pack(flat)) == flat


def test_pack_drops_unset_inversion_flags():
    """False is equivalent to absence: build_schema supplies False anyway."""
    packed = pack({"load_power": "sensor.load", "invert_battery_power": False})
    assert packed["inverted"] == []
    assert "invert_battery_power" not in unpack(packed)


async def test_user_flow_creates_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {"name": "Deye 8kW", "load_power": "sensor.load", "rated_power": 8000},
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Deye 8kW"
    assert result["data"]["entities"] == {"load_power": "sensor.load"}
    assert result["data"]["numbers"] == {"rated_power": 8000.0}


async def test_options_flow_overrides_data(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            # "legacy_role" simulates a role removed from ROLES in a later version:
            # build_schema() only builds fields for the currently known roles, so
            # the options flow could never organically resubmit this value — it
            # exists neither as a form default nor in the submitted user_input.
            "entities": {"load_power": "sensor.old", "legacy_role": "sensor.retired"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {"name": "Deye 8kW", "load_power": "sensor.new", "rated_power": 12000},
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options["entities"] == {"load_power": "sensor.new"}
    assert entry.options["numbers"] == {"rated_power": 12000.0}

    # The form pre-fills the name with the current title and invites editing
    # it — the edited name must end up in the entry's title, not get lost
    # (pack() deliberately drops CONF_NAME from the data).
    assert entry.title == "Deye 8kW"

    # EntryConfig's contract: non-empty options fully override data, they
    # are not merged with it. "legacy_role" was in data, but the form schema
    # has no such role, so options could never receive that key.
    # EntryConfig.from_entry() reads only entry.options (because they're
    # non-empty) and never touches entry.data — otherwise
    # EntryConfig.from_dict() would raise KeyError on the unknown
    # "legacy_role" role before the test got a chance to assert anything.
    # The very absence of that exception here is the proof that data is not
    # merged into options — not even at the level of the nested entities dict.
    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.new"
    assert config.number("rated_power") == 12000.0
    assert "legacy_role" not in config.entities
