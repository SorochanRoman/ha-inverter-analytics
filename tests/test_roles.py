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
