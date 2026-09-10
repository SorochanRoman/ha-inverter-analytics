"""Tests for the config entry lifecycle."""

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.roles import EntryConfig


def _entry(**kwargs) -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Inverter",
        **kwargs,
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


async def test_migration_moves_an_old_entry_to_the_new_split(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Before 1.2 the options flow rewrote everything and options replaced data.

    An entry whose owner ever opened that form therefore holds the whole
    mapping in options, and a stale copy of it there would have overridden
    every change made through reconfigure afterwards. Migration moves the
    mapping into data and leaves options holding the thresholds alone.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        minor_version=1,
        data={
            "entities": {"load_power": "sensor.stale"},
            "numbers": {"rated_power": 5000.0},
            "inverted": [],
        },
        options={
            "entities": {"load_power": ["sensor.current"], "pv_power": ["sensor.pv"]},
            "numbers": {"rated_power": 8000.0, "battery_low_pct": 35.0},
            "inverted": ["battery_power"],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.minor_version == 2
    # Options was in force before, so options is what the mapping becomes.
    assert entry.data["entities"] == {"load_power": ["sensor.current"], "pv_power": ["sensor.pv"]}
    assert entry.data["numbers"] == {"rated_power": 8000.0}
    assert entry.data["inverted"] == ["battery_power"]
    assert entry.options == {"numbers": {"battery_low_pct": 35.0}}

    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.current"
    assert config.number("rated_power") == 8000.0
    assert config.number("battery_low_pct") == 35.0
    assert config.sign("battery_power") == -1.0


async def test_migration_keeps_an_entry_that_never_saw_the_options_form(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """With options empty, data was in force and stays in force."""
    entry = _entry(minor_version=1)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.minor_version == 2
    assert entry.options == {"numbers": {}}
    assert EntryConfig.from_entry(entry).entity_id("load_power") == "sensor.load_power"


async def test_migration_normalises_the_stored_entity_shape(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Entries older than multiple-entity roles store a bare string.

    Every read has gone through normalise_entity_ids since, and still does —
    a config dict reaches it from tests and flows as well as from storage. But
    nothing rewrote an entry the user never reopened, so the old shape was on
    disk indefinitely. Migration settles it, and an empty role is dropped
    rather than stored as an empty list.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Legacy",
        minor_version=1,
        data={
            "entities": {
                "load_power": "sensor.load",
                "load_power_phase": ["sensor.l1", "sensor.l2"],
                "pv_power": "",
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.data["entities"] == {
        "load_power": ["sensor.load"],
        "load_power_phase": ["sensor.l1", "sensor.l2"],
    }


async def test_an_entry_from_a_newer_major_version_is_refused_rather_than_guessed_at(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Its shape is unknown here; rewriting it would corrupt a working setup."""
    entry = _entry(version=2)
    entry.add_to_hass(hass)

    assert not await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.MIGRATION_ERROR
