"""Tests for what the integration raises into Settings → Repairs.

An installation configured once has no reason to revisit the integration, so
anything it needs to be told has to arrive somewhere it is already looking.
"""

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.issues import MISSING_ENTITIES, UNMAPPED_SENSORS
from custom_components.inverter_analytics.repairs import async_create_fix_flow
from custom_components.inverter_analytics.roles import EntryConfig

LOAD = "sensor.solarman_total_load_power"
COUNTERS = {
    "sensor.solarman_total_production": "pv_energy_total",
    "sensor.solarman_total_load_consumption": "load_energy_total",
    "sensor.solarman_total_battery_charge": "battery_charge_total",
    "sensor.solarman_total_battery_discharge": "battery_discharge_total",
    "sensor.solarman_total_energy_bought": "grid_import_total",
    "sensor.solarman_total_energy_sold": "grid_export_total",
}


def _register_solarman(hass: HomeAssistant) -> None:
    hass.states.async_set(
        LOAD,
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    for entity_id in COUNTERS:
        hass.states.async_set(
            entity_id,
            "1000",
            {
                "device_class": "energy",
                "unit_of_measurement": "kWh",
                "state_class": "total_increasing",
            },
        )


def _entry(entities: dict, title: str = "Deye", **kwargs) -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title=title,
        data={"entities": entities, "numbers": {"rated_power": 8000.0}, "inverted": []},
        **kwargs,
    )


def _issue(hass: HomeAssistant, kind: str, entry: MockConfigEntry):
    return ir.async_get(hass).async_get_issue(DOMAIN, f"{kind}_{entry.entry_id}")


async def _setup(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


async def test_an_entry_mapped_before_a_tab_existed_is_told_about_it(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The case the whole thing exists for.

    Six energy counters are sitting in the state machine and this inverter
    reads none of them, because it was set up when the integration had no
    Balance tab to read them for. Nothing the user visits would mention it.
    """
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)

    issue = _issue(hass, UNMAPPED_SENSORS, entry)
    assert issue is not None
    assert issue.is_fixable is True
    assert issue.translation_placeholders["count"] == "6"
    assert issue.translation_placeholders["name"] == "Deye"
    # A fixable issue shows a title and a Fix button and nothing else, so
    # naming the tab there is what makes the card worth pressing.
    assert issue.translation_placeholders["features"] == "Energy balance, Sizing, Health"
    assert issue.data == {"entry_id": entry.entry_id}


async def test_nothing_is_raised_when_there_is_nothing_to_add(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD], **{role: [eid] for eid, role in COUNTERS.items()}})
    await _setup(hass, entry)

    assert _issue(hass, UNMAPPED_SENSORS, entry) is None


async def test_a_detected_sensor_no_feature_needs_raises_nothing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Grid power is detected, stored, and read by nothing yet.

    A card about it would be a notification with no action behind it, and
    teaching the user to dismiss these unread is expensive to undo later.
    """
    hass.states.async_set(
        LOAD,
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    for name in ("battery_power", "pv1_power", "pv2_power", "power_production_now"):
        hass.states.async_set(
            f"sensor.solarman_{name}",
            "100",
            {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
        )

    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)

    # The cluster is recognised and detection has plenty to offer — none of it
    # is a role any feature is waiting on.
    assert _issue(hass, UNMAPPED_SENSORS, entry) is None


async def test_the_issue_is_withdrawn_once_the_mapping_catches_up(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A card that outlives its reason is worse than no card."""
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)
    assert _issue(hass, UNMAPPED_SENSORS, entry) is not None

    hass.config_entries.async_update_entry(
        entry,
        data={
            "entities": {"load_power": [LOAD], **{r: [e] for e, r in COUNTERS.items()}},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    await hass.async_block_till_done()

    assert _issue(hass, UNMAPPED_SENSORS, entry) is None


async def test_a_mapped_sensor_that_no_longer_exists_is_reported(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Renaming an entity takes a chart down and says nothing."""
    hass.states.async_set(
        LOAD,
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    entry = _entry({"load_power": [LOAD], "battery_soc": ["sensor.renamed_away"]})
    await _setup(hass, entry)

    issue = _issue(hass, MISSING_ENTITIES, entry)
    assert issue is not None
    # Which sensor replaced it is a question only the user can answer.
    assert issue.is_fixable is False
    assert issue.translation_placeholders["entities"] == "sensor.renamed_away"
    assert issue.translation_placeholders["count"] == "1"


async def test_an_unavailable_sensor_is_not_a_missing_one(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An inverter that is off overnight must not raise a card every night."""
    hass.states.async_set(LOAD, "unavailable", {"device_class": "power"})
    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)

    assert _issue(hass, MISSING_ENTITIES, entry) is None


async def test_an_orphaned_entity_is_reported_as_missing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Still in the registry, but no integration set it up.

    Home Assistant restores such an entity as unavailable with `restored: true`.
    A registry-only check would call that a working mapping and say nothing.
    """
    hass.states.async_set(
        LOAD,
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    registry = er.async_get(hass)
    registry.async_get_or_create(
        "binary_sensor", "gone", "unique", suggested_object_id="grid_status"
    )
    hass.states.async_set(
        "binary_sensor.grid_status",
        "unavailable",
        {"restored": True, "friendly_name": "Grid status"},
    )
    entry = _entry({"load_power": [LOAD], "grid_connected": ["binary_sensor.grid_status"]})
    await _setup(hass, entry)

    issue = _issue(hass, MISSING_ENTITIES, entry)
    assert issue is not None
    assert issue.translation_placeholders["entities"] == "binary_sensor.grid_status"


async def _restored_grid_status(hass: HomeAssistant, owner_state: ConfigEntryState):
    """A grid sensor restored as unavailable, owned by a Solarman entry in owner_state."""
    hass.states.async_set(
        LOAD,
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    owner = MockConfigEntry(domain="solarman", title="Solarman")
    owner.add_to_hass(hass)
    owner.mock_state(hass, owner_state)
    er.async_get(hass).async_get_or_create(
        "binary_sensor",
        "solarman",
        "grid",
        suggested_object_id="grid_status",
        config_entry=owner,
    )
    hass.states.async_set("binary_sensor.grid_status", "unavailable", {"restored": True})
    entry = _entry({"load_power": [LOAD], "grid_connected": ["binary_sensor.grid_status"]})
    await _setup(hass, entry)
    return entry


async def test_a_restored_entity_whose_owner_is_retrying_is_not_missing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """At start every entity without a state yet is restored, including a retrying entry's."""
    entry = await _restored_grid_status(hass, ConfigEntryState.SETUP_RETRY)
    assert _issue(hass, MISSING_ENTITIES, entry) is None


async def test_a_restored_entity_whose_owner_loaded_without_it_is_missing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The owner is up and still did not set it up: nothing answers to that name."""
    entry = await _restored_grid_status(hass, ConfigEntryState.LOADED)
    issue = _issue(hass, MISSING_ENTITIES, entry)
    assert issue is not None
    assert issue.translation_placeholders["entities"] == "binary_sensor.grid_status"


async def test_a_restored_yaml_entity_whose_platform_is_loaded_is_missing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A template sensor taken out of YAML while other templates remain.

    It has no config entry, and its platform is loaded for the others. YAML
    platforms are set up before Home Assistant has started, so one still
    restored by then was not set up at all.
    """
    hass.states.async_set(
        LOAD,
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    hass.config.components.add("template")
    er.async_get(hass).async_get_or_create(
        "binary_sensor", "template", "unique", suggested_object_id="grid_status"
    )
    hass.states.async_set("binary_sensor.grid_status", "unavailable", {"restored": True})
    entry = _entry({"load_power": [LOAD], "grid_connected": ["binary_sensor.grid_status"]})
    await _setup(hass, entry)

    issue = _issue(hass, MISSING_ENTITIES, entry)
    assert issue is not None
    assert issue.translation_placeholders["entities"] == "binary_sensor.grid_status"


async def test_an_unavailable_registered_entity_that_is_not_restored_is_not_missing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A registered device that is offline for a while is not orphaned."""
    registry = er.async_get(hass)
    registry.async_get_or_create("sensor", "demo", "unique", suggested_object_id="offline_load")
    hass.states.async_set("sensor.offline_load", "unavailable", {"device_class": "power"})
    entry = _entry({"load_power": ["sensor.offline_load"]})
    await _setup(hass, entry)

    assert _issue(hass, MISSING_ENTITIES, entry) is None


async def test_a_registered_entity_with_no_state_yet_is_not_missing(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An integration that has registered its entities but not yet written a state.

    Checking the state machine alone would report every one of them the first
    time this runs after a restart.
    """
    registry = er.async_get(hass)
    registry.async_get_or_create("sensor", "demo", "unique", suggested_object_id="slow_starter")
    entry = _entry({"load_power": ["sensor.slow_starter"]})
    await _setup(hass, entry)

    assert _issue(hass, MISSING_ENTITIES, entry) is None


async def test_removing_an_inverter_takes_its_cards_with_it(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)
    assert _issue(hass, UNMAPPED_SENSORS, entry) is not None

    await hass.config_entries.async_remove(entry.entry_id)
    await hass.async_block_till_done()

    assert _issue(hass, UNMAPPED_SENSORS, entry) is None


async def test_two_inverters_get_a_card_each(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A single shared issue would describe one and stand in for the other."""
    _register_solarman(hass)
    first = _entry({"load_power": [LOAD]})
    second = _entry({"load_power": [LOAD]}, title="Deye 2")
    await _setup(hass, first)
    await _setup(hass, second)

    assert _issue(hass, UNMAPPED_SENSORS, first) is not None
    assert _issue(hass, UNMAPPED_SENSORS, second) is not None


async def test_the_fix_flow_maps_what_it_showed_and_clears_the_card(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The fix does the work rather than sending the user off to do it.

    Walking them into the reconfigure form would show them exactly what this
    shows them, with one more chance to lose track of what they came for.
    """
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)

    flow = await async_create_fix_flow(
        hass, f"{UNMAPPED_SENSORS}_{entry.entry_id}", {"entry_id": entry.entry_id}
    )
    flow.hass = hass

    result = await flow.async_step_init()
    assert result["step_id"] == "confirm"
    # The entity ids themselves: agreeing to "six sensors" is not agreeing to
    # anything in particular.
    for entity_id in COUNTERS:
        assert entity_id in result["description_placeholders"]["entities"]
    assert result["description_placeholders"]["features"] == "Energy balance, Sizing, Health"

    result = await flow.async_step_confirm({})
    await hass.async_block_till_done()

    assert result["type"] == "create_entry"
    config = EntryConfig.from_entry(entry)
    assert config.entity_id("grid_import_total") == "sensor.solarman_total_energy_bought"
    # The load sensor it already had is untouched.
    assert config.entity_id("load_power") == LOAD
    assert _issue(hass, UNMAPPED_SENSORS, entry) is None


async def test_the_fix_flow_gives_up_gracefully_on_a_stale_card(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Mapped by hand between the card being drawn and being acted on."""
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD], **{role: [eid] for eid, role in COUNTERS.items()}})
    await _setup(hass, entry)

    flow = await async_create_fix_flow(
        hass, f"{UNMAPPED_SENSORS}_{entry.entry_id}", {"entry_id": entry.entry_id}
    )
    flow.hass = hass

    result = await flow.async_step_init()
    assert result["type"] == "abort"
    assert result["reason"] == "already_mapped"


def _issue_strings() -> dict:
    import json
    import pathlib

    path = pathlib.Path("custom_components/inverter_analytics/translations/en.json")
    return json.loads(path.read_text())["issues"]


async def test_every_placeholder_in_a_card_is_supplied(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An unsupplied placeholder renders as a literal {name} and nothing fails.

    Both directions matter: a placeholder the text uses and the code does not
    pass shows as braces, and one the code passes and the text does not use is
    a fact that was meant to be on screen and is not.
    """
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD], "battery_soc": ["sensor.renamed_away"]})
    await _setup(hass, entry)

    strings = _issue_strings()
    unmapped = _issue(hass, UNMAPPED_SENSORS, entry)
    missing = _issue(hass, MISSING_ENTITIES, entry)

    for issue, texts in (
        (
            unmapped,
            [
                strings[UNMAPPED_SENSORS]["title"],
                strings[UNMAPPED_SENSORS]["fix_flow"]["step"]["confirm"]["title"],
            ],
        ),
        (
            missing,
            [strings[MISSING_ENTITIES]["title"], strings[MISSING_ENTITIES]["description"]],
        ),
    ):
        assert issue is not None
        placeholders = issue.translation_placeholders
        used: set[str] = set()
        for text in texts:
            # str.format raises KeyError on a placeholder nothing supplies.
            text.format(**placeholders)
            used |= {name for name in placeholders if "{" + name + "}" in text}
        assert used == set(placeholders), f"never shown: {set(placeholders) - used}"


async def test_the_fix_flow_uses_every_placeholder_it_is_given(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    _register_solarman(hass)
    entry = _entry({"load_power": [LOAD]})
    await _setup(hass, entry)

    flow = await async_create_fix_flow(
        hass, f"{UNMAPPED_SENSORS}_{entry.entry_id}", {"entry_id": entry.entry_id}
    )
    flow.hass = hass
    result = await flow.async_step_init()

    step = _issue_strings()[UNMAPPED_SENSORS]["fix_flow"]["step"]["confirm"]
    placeholders = result["description_placeholders"]
    rendered = step["description"].format(**placeholders)
    for name in placeholders:
        assert "{" + name + "}" in step["description"], f"{name} is never shown"
    assert "{" not in rendered


async def test_the_fix_flow_refuses_an_issue_it_does_not_own(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Repairs asks this module for a flow by issue id; only one kind is fixable."""
    import pytest

    with pytest.raises(ValueError, match="something_else"):
        await async_create_fix_flow(hass, "something_else", {"entry_id": "x"})
    with pytest.raises(ValueError):
        await async_create_fix_flow(hass, f"{UNMAPPED_SENSORS}_x", None)


async def test_a_presence_sensor_nobody_mapped_is_offered_for_the_grid_tab(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    _register_solarman(hass)
    hass.states.async_set("binary_sensor.grid_connected", "on")
    entry = _entry({"load_power": [LOAD], **{role: [eid] for eid, role in COUNTERS.items()}})
    await _setup(hass, entry)

    issue = _issue(hass, UNMAPPED_SENSORS, entry)
    assert issue is not None
    assert issue.translation_placeholders["count"] == "1"
    assert issue.translation_placeholders["features"] == "Grid outages"
