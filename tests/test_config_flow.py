"""Tests for the setup wizard."""

from unittest.mock import patch

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
import voluptuous as vol

from custom_components.inverter_analytics.config_flow import pack, unpack
from custom_components.inverter_analytics.const import (
    DEFAULT_IMBALANCE_FLOOR_PCT,
    DEFAULT_NIGHT_END_HOUR,
    DEFAULT_NIGHT_START_HOUR,
    DOMAIN,
)
from custom_components.inverter_analytics.detect import CT_CHOICE, Ambiguity, Detection
from custom_components.inverter_analytics.roles import EntryConfig, feature_availability

MODULE = "custom_components.inverter_analytics.config_flow"


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
    assert packed["entities"] == {"load_power": ["sensor.load"], "battery_power": ["sensor.batt"]}
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


async def test_manual_flow_creates_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    # No sensors are registered, so nothing can be clustered and the flow
    # lands straight on manual mapping.
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "manual"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {"name": "Deye 8kW", "load_power": "sensor.load", "rated_power": 8000},
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Deye 8kW"
    assert result["data"]["entities"] == {"load_power": ["sensor.load"]}
    assert result["data"]["numbers"] == {"rated_power": 8000.0}


async def test_reconfigure_replaces_the_mapping(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Reconfigure writes the mapping; options no longer carries one."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {"load_power": ["sensor.old"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    # Nothing is registered as a sensor, so no cluster overlaps the mapping
    # and the flow goes straight to the manual form rather than offering a
    # detection it cannot perform.
    result = await entry.start_reconfigure_flow(hass)
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "reconfigure_manual"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"load_power": "sensor.new", "rated_power": 12000}
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "reconfigure_successful"
    assert entry.data["entities"] == {"load_power": ["sensor.new"]}
    assert entry.data["numbers"] == {"rated_power": 12000.0}

    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.new"
    assert config.number("rated_power") == 12000.0


async def test_reconfigure_leaves_the_tuning_thresholds_alone(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The two forms own different halves of the entry and must not erase each other.

    Reconfigure replaces data wholesale, and the thresholds are not on its
    form. Writing options as well — even as an empty dict — would silently
    reset every threshold the user had set every time they remapped a sensor.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {"load_power": ["sensor.load"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
        options={"numbers": {"battery_low_pct": 35.0}},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    await hass.config_entries.flow.async_configure(
        result["flow_id"], {"load_power": "sensor.other", "rated_power": 8000}
    )
    await hass.async_block_till_done()

    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.other"
    assert config.number("battery_low_pct") == 35.0


async def test_an_optional_sensor_can_be_cleared_through_reconfigure(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A field the user empties must stay empty.

    Home Assistant omits a cleared optional field from the submission, so a
    schema built with default= would silently put the old value back. This is
    why build_schema uses suggested_value.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {"load_power": ["sensor.load"], "pv_power": ["sensor.pv"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    await hass.config_entries.flow.async_configure(
        result["flow_id"], {"load_power": "sensor.load", "rated_power": 8000}
    )
    await hass.async_block_till_done()

    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.load"
    assert config.entity_ids("pv_power") == ()


def test_pack_keeps_several_entities_for_a_multiple_role():
    packed = pack(
        {
            "name": "Deye",
            "load_power": "sensor.total",
            "load_power_phase": ["sensor.l1", "sensor.l2", "sensor.l3"],
            "rated_power": 12000,
        }
    )
    assert packed["entities"]["load_power"] == ["sensor.total"]
    assert packed["entities"]["load_power_phase"] == ["sensor.l1", "sensor.l2", "sensor.l3"]


def test_pack_drops_an_empty_multiple_role():
    packed = pack({"load_power": "sensor.total", "pv_power_string": [], "rated_power": 8000})
    assert "pv_power_string" not in packed["entities"]


def test_unpack_round_trips_a_multiple_role():
    flat = {
        "load_power": "sensor.total",
        "load_power_phase": ["sensor.l1", "sensor.l2"],
        "rated_power": 12000.0,
    }
    assert unpack(pack(flat)) == flat


def test_unpack_reads_a_legacy_entry_that_stores_a_bare_string():
    """Entries created before roles held lists store {"role": "sensor.x"}.

    unpack used to index into that string with ids[0], yielding "s" instead
    of the entity id.
    """
    flat = unpack({"entities": {"load_power": "sensor.load"}, "numbers": {}, "inverted": []})
    assert flat["load_power"] == "sensor.load"


async def test_the_reconfigure_form_pre_fills_from_a_legacy_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An entry written before roles held lists stores a bare string.

    unpack used to index into it, offering "s" as the suggested entity and
    making the form unsubmittable.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Legacy",
        data={
            "entities": {"load_power": "sensor.load", "pv_power": "sensor.pv"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    assert result["type"] is FlowResultType.FORM

    # The bug lived in the suggested_value the form pre-fills, not in
    # whether a hand-typed submission succeeds — a real user relies on the
    # pre-filled value being correct, since it is what they see and resubmit
    # unchanged.
    suggested = {
        str(getattr(key, "schema", key)): getattr(key, "description", None) or {}
        for key in result["data_schema"].schema
    }
    assert suggested["load_power"].get("suggested_value") == "sensor.load"
    assert suggested["pv_power"].get("suggested_value") == "sensor.pv"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"load_power": "sensor.load", "rated_power": 8000}
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.ABORT
    assert EntryConfig.from_entry(entry).entity_id("load_power") == "sensor.load"


async def test_discovery_offers_the_detected_inverter(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    for entity_id in (
        "sensor.solarman_total_load_power",
        "sensor.solarman_load_l1_power",
        "sensor.solarman_load_l2_power",
        "sensor.solarman_load_l3_power",
        "sensor.solarman_battery_power",
        "sensor.solarman_battery_soc",
    ):
        hass.states.async_set(
            entity_id,
            "100",
            {
                "device_class": "battery" if entity_id.endswith("soc") else "power",
                "unit_of_measurement": "%" if entity_id.endswith("soc") else "W",
                "state_class": "measurement",
            },
        )
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"source": "solarman"}
    )
    assert result["step_id"] == "confirm"

    # A real browser resubmits every displayed field's current contents,
    # including the ones the confirm step pre-filled from detection and the
    # user never touched — it does not omit them.
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "name": "Deye",
            "rated_power": 12000,
            "load_power": "sensor.solarman_total_load_power",
            "load_power_phase": [
                "sensor.solarman_load_l1_power",
                "sensor.solarman_load_l2_power",
                "sensor.solarman_load_l3_power",
            ],
        },
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    entities = result["result"].data["entities"]
    assert entities["load_power"] == ["sensor.solarman_total_load_power"]
    assert entities["load_power_phase"] == [
        "sensor.solarman_load_l1_power",
        "sensor.solarman_load_l2_power",
        "sensor.solarman_load_l3_power",
    ]


async def test_manual_is_reachable_when_nothing_is_detected(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["step_id"] == "manual"


@pytest.mark.parametrize("choice", ["external_ct", "internal_ct"])
async def test_confirm_resolves_the_ct_ambiguity_to_the_chosen_set(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, choice: str
) -> None:
    """Two CT sets look identical to pattern matching, so the user decides.

    An installation with both an external and an internal clamp set is
    exactly the case classify() cannot settle on its own — this is the
    wizard's only interactive decision, so it needs an end-to-end check, not
    just tracing the merge logic on paper.
    """
    entity_ids = ["sensor.solarman_total_load_power"]
    for kind in ("external_ct", "internal_ct"):
        for phase in (1, 2, 3):
            entity_ids.append(f"sensor.solarman_{kind}_l{phase}_power")
    for entity_id in entity_ids:
        hass.states.async_set(
            entity_id,
            "100",
            {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
        )
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"source": "solarman"}
    )
    assert result["step_id"] == "confirm"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "name": "Deye",
            "rated_power": 12000,
            "load_power": "sensor.solarman_total_load_power",
            CT_CHOICE: choice,
        },
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    entities = result["result"].data["entities"]
    assert entities["grid_power_phase"] == [
        f"sensor.solarman_{choice}_l{phase}_power" for phase in (1, 2, 3)
    ]


async def test_the_grid_power_phase_picker_is_absent_when_a_ct_question_covers_it(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A role settled by a question must not also offer a picker.

    Otherwise a value the user hand-picks there is silently replaced by the
    CT answer with no indication that it happened.
    """
    entity_ids = ["sensor.solarman_total_load_power"]
    for kind in ("external_ct", "internal_ct"):
        for phase in (1, 2, 3):
            entity_ids.append(f"sensor.solarman_{kind}_l{phase}_power")
    for entity_id in entity_ids:
        hass.states.async_set(
            entity_id,
            "100",
            {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
        )
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"source": "solarman"}
    )
    assert result["step_id"] == "confirm"

    field_names = {str(getattr(key, "schema", key)) for key in result["data_schema"].schema}
    assert "grid_power_phase" not in field_names
    assert CT_CHOICE in field_names


def _power_states(hass, entity_ids):
    for entity_id in entity_ids:
        hass.states.async_set(
            entity_id,
            "100",
            {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
        )


async def test_two_questions_do_not_overwrite_each_other(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """One field per question, one answer per role.

    A single shared field would bind the second question over the first and
    then apply one answer to both roles. Only one ambiguity exists today, so
    both faults are latent until a second question is ever added — which is
    exactly when nobody would think to check.
    """
    # Five sensors: a name prefix is only a guess, so a smaller group does not
    # clear the floor and the wizard would skip straight to manual mapping.
    _power_states(
        hass,
        ["sensor.solarman_total_load_power"]
        + [f"sensor.solarman_load_l{phase}_power" for phase in (1, 2, 3)]
        + ["sensor.solarman_pv1_power"],
    )
    await hass.async_block_till_done()

    detection = Detection(
        mapping={"load_power": ("sensor.solarman_total_load_power",)},
        ambiguities=(
            Ambiguity(
                key="ct_choice",
                role="grid_power_phase",
                question="Which CTs?",
                options={"external_ct": ("sensor.ext_l1",), "internal_ct": ("sensor.int_l1",)},
            ),
            Ambiguity(
                key="string_choice",
                role="pv_power_string",
                question="Which strings?",
                options={"roof": ("sensor.roof_1",), "garage": ("sensor.garage_1",)},
            ),
        ),
        without_statistics=(),
        cluster_key="solarman",
        cluster_label="Solarman",
    )

    with patch(f"{MODULE}.classify", return_value=detection):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {"source": "solarman"}
        )
        field_names = {str(getattr(key, "schema", key)) for key in result["data_schema"].schema}
        assert {"ct_choice", "string_choice"} <= field_names
        assert "grid_power_phase" not in field_names
        assert "pv_power_string" not in field_names

        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {
                "name": "Deye",
                "rated_power": 12000,
                "load_power": "sensor.solarman_total_load_power",
                "ct_choice": "internal_ct",
                "string_choice": "roof",
            },
        )
    await hass.async_block_till_done()

    entities = result["result"].data["entities"]
    assert entities["grid_power_phase"] == ["sensor.int_l1"]
    assert entities["pv_power_string"] == ["sensor.roof_1"]


async def test_a_question_sits_where_its_picker_was(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Appending it instead would strand the role's invert checkbox.

    The checkbox still applies to whatever the answer assigns, so it is correct
    to render it — but a checkbox reading "invert grid power per phase" with no
    such field anywhere above it reads as a bug.
    """
    entity_ids = ["sensor.solarman_total_load_power"]
    entity_ids += [
        f"sensor.solarman_{kind}_l{phase}_power"
        for kind in ("external_ct", "internal_ct")
        for phase in (1, 2, 3)
    ]
    _power_states(hass, entity_ids)
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"source": "solarman"}
    )

    names = [str(getattr(key, "schema", key)) for key in result["data_schema"].schema]
    assert names.index(CT_CHOICE) < names.index("invert_grid_power_phase")


async def test_the_ct_options_say_how_many_sensors_each_set_has(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An incomplete clamp set still raises the question.

    Picking it silently carries only the phases that exist, so the count is the
    one thing that tells the two options apart.
    """
    entity_ids = ["sensor.solarman_total_load_power"]
    entity_ids += [f"sensor.solarman_external_ct_l{phase}_power" for phase in (1, 2, 3)]
    entity_ids += ["sensor.solarman_internal_ct_l1_power"]
    _power_states(hass, entity_ids)
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"source": "solarman"}
    )

    field = next(
        value
        for key, value in result["data_schema"].schema.items()
        if str(getattr(key, "schema", key)) == CT_CHOICE
    )
    labels = [option["label"] for option in field.config["options"]]
    assert any("(3 sensors)" in label for label in labels)
    assert any("(1 sensors)" in label for label in labels)


async def test_a_cluster_with_no_load_sensor_says_so_in_its_label(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Five battery sensors clear the prefix floor on their own.

    Setup cannot be completed from that group, because the load sensor is
    required and is not in it, so the option must not read like a recognised
    inverter.
    """
    for name in ("soc", "voltage", "current", "temperature", "power"):
        hass.states.async_set(
            f"sensor.deye2_battery_{name}",
            "50",
            {"device_class": "battery", "state_class": "measurement"},
        )
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    field = next(iter(result["data_schema"].schema.values()))
    labels = [option["label"] for option in field.config["options"]]
    assert any("no load sensor found" in label for label in labels)


async def test_renaming_an_inverter_reloads_it_once(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Two writes fire the update listener twice for one rename.

    Serialised by the setup lock, so nothing corrupts — but the integration
    tears down and rebuilds twice, and its cache is dropped twice, for a change
    of name.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Old name",
        data={
            "entities": {"load_power": ["sensor.load"]},
            "numbers": {"rated_power": 9000},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    with patch.object(
        hass.config_entries, "async_reload", wraps=hass.config_entries.async_reload
    ) as reload:
        await hass.config_entries.options.async_configure(
            result["flow_id"], {"name": "New name", "battery_low_pct": 20.0}
        )
        await hass.async_block_till_done()

    assert entry.title == "New name"
    assert reload.call_count == 1


async def test_an_inverted_role_survives_the_wizard_end_to_end(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The checkbox is packed, stored and read back as a sign of -1.

    Every part of that chain was tested on its own; nothing checked that a box
    ticked in the form actually flips the sign the analytics uses.
    """
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["step_id"] == "manual"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "name": "Deye",
            "rated_power": 8000,
            "load_power": "sensor.load",
            "battery_power": "sensor.battery",
            "invert_battery_power": True,
        },
    )
    await hass.async_block_till_done()

    config = EntryConfig.from_entry(result["result"])
    assert config.sign("battery_power") == -1.0
    assert config.sign("load_power") == 1.0


def _suggested(result) -> dict:
    return {
        str(getattr(key, "schema", key)): (key.description or {}).get("suggested_value")
        for key in result["data_schema"].schema
        if getattr(key, "description", None)
    }


def _defaults(result) -> dict:
    # A marker with no default carries the UNDEFINED sentinel, not None, and
    # calling it raises rather than returning nothing.
    return {
        str(getattr(key, "schema", key)): key.default()
        for key in result["data_schema"].schema
        if getattr(key, "default", vol.UNDEFINED) is not vol.UNDEFINED
    }


async def test_the_reconfigure_form_arrives_filled_in_with_what_is_stored(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An empty form would read as "nothing configured" and invite retyping."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {
                "load_power": ["sensor.load"],
                "load_power_phase": ["sensor.l1", "sensor.l2"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": ["battery_power"],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    suggested, defaults = _suggested(result), _defaults(result)

    assert suggested["load_power"] == "sensor.load"
    assert suggested["load_power_phase"] == ["sensor.l1", "sensor.l2"]
    assert suggested["rated_power"] == 8000.0
    assert defaults["invert_battery_power"] is True
    # Renaming belongs to the options form; two forms offering it would let
    # them disagree about the inverter's name.
    assert "name" not in defaults


async def test_the_options_form_offers_the_name_and_the_thresholds(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """What is left in options after the mapping moved out of it."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {"load_power": ["sensor.load"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
        options={"numbers": {"battery_low_pct": 35.0}},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    suggested, defaults = _suggested(result), _defaults(result)

    assert defaults["name"] == "Deye"
    # Pre-filled with the value actually in force, whether the user set it or
    # it is the default; an empty box invites a guess at what it meant.
    assert suggested["battery_low_pct"] == 35.0
    assert suggested["imbalance_floor_pct"] == DEFAULT_IMBALANCE_FLOOR_PCT
    # The night zone has a default; a price does not, so its box stays empty.
    assert suggested["night_start_hour"] == DEFAULT_NIGHT_START_HOUR
    assert suggested["night_end_hour"] == DEFAULT_NIGHT_END_HOUR
    assert "price_day" not in suggested
    assert "price_night" not in suggested
    # The mapping is not here any more, and neither is the nameplate.
    assert "load_power" not in suggested
    assert "rated_power" not in suggested


ENERGY_COUNTERS = {
    "sensor.solarman_total_production": "pv_energy_total",
    "sensor.solarman_total_load_consumption": "load_energy_total",
    "sensor.solarman_total_battery_charge": "battery_charge_total",
    "sensor.solarman_total_battery_discharge": "battery_discharge_total",
    "sensor.solarman_total_energy_bought": "grid_import_total",
    "sensor.solarman_total_energy_sold": "grid_export_total",
}


def _register_solarman(hass: HomeAssistant) -> None:
    """The shape of an installation the Balance tab could be built from."""
    hass.states.async_set(
        "sensor.solarman_total_load_power",
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    for entity_id in ENERGY_COUNTERS:
        hass.states.async_set(
            entity_id,
            "1000",
            {
                "device_class": "energy",
                "unit_of_measurement": "kWh",
                "state_class": "total_increasing",
            },
        )


async def test_reconfigure_fills_in_the_roles_a_past_version_never_asked_for(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """The case this flow exists for.

    An entry mapped when the integration had no Balance tab holds none of the
    six energy counters, and no amount of reopening the options form would
    have found them — detection ran once, at setup, and was never reachable
    again. Here it runs against the cluster the entry already belongs to.
    """
    _register_solarman(hass)
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {"load_power": ["sensor.solarman_total_load_power"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert not EntryConfig.from_entry(entry).has("grid_import_total")

    result = await entry.start_reconfigure_flow(hass)
    assert result["type"] is FlowResultType.MENU
    assert result["step_id"] == "reconfigure"
    # The description is the whole point: six entity ids in a form say nothing
    # about why they are worth having.
    found = result["description_placeholders"]["found"]
    assert "6 sensors" in found
    assert "Energy balance" in found

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"next_step_id": "reconfigure_detected"}
    )
    assert result["step_id"] == "reconfigure_detected"

    suggested = _suggested(result)
    for entity_id, role in ENERGY_COUNTERS.items():
        assert suggested[role] == entity_id

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "load_power": "sensor.solarman_total_load_power",
            "rated_power": 8000,
            **{role: entity_id for entity_id, role in ENERGY_COUNTERS.items()},
        },
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.ABORT
    config = EntryConfig.from_entry(entry)
    assert config.entity_id("grid_import_total") == "sensor.solarman_total_energy_bought"
    balance = next(item for item in feature_availability(config) if item["key"] == "balance")
    assert balance["available"] is True
    assert balance["missing"] == []


async def test_detection_does_not_overwrite_a_mapping_made_by_hand(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A correction survives running detection again.

    Detection got the load sensor wrong once and the user fixed it. If
    reconfigure re-applied the whole detected mapping, that fix would be
    undone by the very step meant to improve the configuration — and silently,
    since the form would arrive pre-filled with the wrong value looking right.
    """
    _register_solarman(hass)
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {
                # Not what detection would pick for load_power.
                "load_power": ["sensor.corrected_by_hand"],
                "pv_energy_total": ["sensor.solarman_total_production"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"next_step_id": "reconfigure_detected"}
    )

    suggested = _suggested(result)
    assert suggested["load_power"] == "sensor.corrected_by_hand"
    # The five counters it has not got are offered; the one it has is left be.
    assert suggested["pv_energy_total"] == "sensor.solarman_total_production"
    assert suggested["grid_import_total"] == "sensor.solarman_total_energy_bought"


async def test_reconfigure_skips_the_menu_when_detection_has_nothing_to_add(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Offering a choice between doing nothing and mapping by hand is not a choice."""
    _register_solarman(hass)
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {
                "load_power": ["sensor.solarman_total_load_power"],
                **{role: [entity_id] for entity_id, role in ENERGY_COUNTERS.items()},
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "reconfigure_manual"


async def test_the_no_statistics_warning_covers_a_detected_phase_set(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A multiple role holds a list, and the warning has to look inside it.

    A phase sensor with no state_class keeps no long-term statistics, so any
    window past the recorder's retention comes back empty for it. Saying that
    while the user is deciding whether to accept the mapping is the only cheap
    moment to say it.
    """
    hass.states.async_set(
        "sensor.solarman_total_load_power",
        "800",
        {"device_class": "power", "unit_of_measurement": "W", "state_class": "measurement"},
    )
    for index in (1, 2, 3):
        hass.states.async_set(
            f"sensor.solarman_load_l{index}_power",
            "260",
            # No state_class: this is the sensor the warning exists for.
            {"device_class": "power", "unit_of_measurement": "W"},
        )
    hass.states.async_set(
        "sensor.solarman_battery_soc",
        "80",
        {"device_class": "battery", "unit_of_measurement": "%", "state_class": "measurement"},
    )

    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            "entities": {"load_power": ["sensor.solarman_total_load_power"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reconfigure_flow(hass)
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"next_step_id": "reconfigure_detected"}
    )

    warning = result["description_placeholders"]["no_statistics"]
    for index in (1, 2, 3):
        assert f"sensor.solarman_load_l{index}_power" in warning
