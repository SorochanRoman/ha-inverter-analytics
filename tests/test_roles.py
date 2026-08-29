"""Tests for the canonical roles and the configuration model."""

import pytest

from custom_components.inverter_analytics.roles import (
    ROLES_BY_KEY,
    EntryConfig,
    RoleKind,
    entity_roles,
    number_roles,
    required_role_keys,
)


def test_load_power_is_a_required_entity_role():
    role = ROLES_BY_KEY["load_power"]
    assert role.kind is RoleKind.POWER
    assert role.required is True
    assert role in entity_roles()


def test_rated_power_is_a_number_not_an_entity():
    role = ROLES_BY_KEY["rated_power"]
    assert role.kind is RoleKind.NUMBER
    assert role in number_roles()
    assert role not in entity_roles()


def test_only_load_power_and_rated_power_are_required():
    assert required_role_keys() == frozenset({"load_power", "rated_power"})


def test_battery_and_grid_power_are_invertible_pv_is_not():
    assert ROLES_BY_KEY["battery_power"].invertible is True
    assert ROLES_BY_KEY["grid_power"].invertible is True
    assert ROLES_BY_KEY["pv_power"].invertible is False


def test_role_keys_are_unique():
    keys = [role.key for role in ROLES_BY_KEY.values()]
    assert len(keys) == len(set(keys))


def test_entry_config_reads_entities_numbers_and_inversion():
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": "sensor.load", "battery_power": "sensor.batt"},
            "numbers": {"rated_power": 8000.0},
            "inverted": ["battery_power"],
        }
    )
    assert config.entity_id("load_power") == "sensor.load"
    assert config.entity_id("pv_power") is None
    assert config.number("rated_power") == 8000.0
    assert config.number("battery_capacity") is None
    assert config.sign("battery_power") == -1.0
    assert config.sign("load_power") == 1.0


def test_entry_config_has_checks_every_key():
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": "sensor.load"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        }
    )
    assert config.has("load_power") is True
    assert config.has("load_power", "battery_soc") is False


def test_entry_config_rejects_unknown_role_key():
    with pytest.raises(KeyError):
        EntryConfig.from_dict({"entities": {"nonsense": "sensor.x"}, "numbers": {}, "inverted": []})


def test_entry_config_ignores_empty_entity_values():
    config = EntryConfig.from_dict(
        {"entities": {"load_power": "sensor.load", "pv_power": ""}, "numbers": {}, "inverted": []}
    )
    assert config.entity_id("pv_power") is None


def test_phase_and_string_roles_are_multiple():
    assert ROLES_BY_KEY["load_power_phase"].multiple is True
    assert ROLES_BY_KEY["pv_power_string"].multiple is True
    assert ROLES_BY_KEY["grid_power_phase"].multiple is True
    assert ROLES_BY_KEY["load_power"].multiple is False


def test_entity_ids_returns_every_configured_entity():
    config = EntryConfig.from_dict(
        {
            "entities": {
                "load_power": ["sensor.total"],
                "load_power_phase": ["sensor.l1", "sensor.l2", "sensor.l3"],
            },
            "numbers": {},
            "inverted": [],
        }
    )
    assert config.entity_ids("load_power_phase") == ("sensor.l1", "sensor.l2", "sensor.l3")
    assert config.entity_ids("pv_power_string") == ()


def test_entity_id_still_returns_a_single_entity():
    config = EntryConfig.from_dict(
        {"entities": {"load_power": ["sensor.total"]}, "numbers": {}, "inverted": []}
    )
    assert config.entity_id("load_power") == "sensor.total"
    assert config.entity_id("battery_soc") is None


def test_a_plain_string_from_an_older_entry_is_still_readable():
    """Entries created before this change store a bare string, not a list.

    There is no migration that can reach an entry the user never reopens, so
    the parser has to accept both shapes for as long as the integration exists.
    """
    config = EntryConfig.from_dict(
        {"entities": {"load_power": "sensor.legacy"}, "numbers": {}, "inverted": []}
    )
    assert config.entity_ids("load_power") == ("sensor.legacy",)
    assert config.entity_id("load_power") == "sensor.legacy"


def test_empty_and_blank_entities_are_dropped():
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": ["sensor.a", "", None], "pv_power_string": []},
            "numbers": {},
            "inverted": [],
        }
    )
    assert config.entity_ids("load_power") == ("sensor.a",)
    assert config.entity_ids("pv_power_string") == ()
    assert config.has("pv_power_string") is False


def test_has_is_true_only_when_a_role_holds_something():
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": ["sensor.a"]},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        }
    )
    assert config.has("load_power", "rated_power") is True
    assert config.has("load_power", "load_power_phase") is False
