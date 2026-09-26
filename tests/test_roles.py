"""Tests for the canonical roles and the configuration model."""

import pytest

from custom_components.inverter_analytics.roles import (
    FEATURES,
    FEATURES_BY_KEY,
    ROLES,
    ROLES_BY_KEY,
    EntryConfig,
    RoleKind,
    entity_roles,
    feature_availability,
    number_roles,
    part_identities,
    required_role_keys,
    tuning_role_keys,
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


def test_entry_config_ignores_a_role_it_does_not_recognise(caplog):
    """A stored entry can name a role this version has never heard of.

    It was written by a version that had a role since removed, or by a newer
    one that has a role this build does not. Raising would take the whole
    integration down — every tab dark — over one key nothing was going to
    read anyway. It is logged, because a mapping quietly shrinking looks
    exactly like a mapping that was lost.
    """
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": "sensor.load", "nonsense": "sensor.x"},
            "numbers": {"rated_power": 8000.0, "nonsense_pct": 3},
            "inverted": ["nonsense"],
        }
    )
    assert config.entity_id("load_power") == "sensor.load"
    assert config.number("rated_power") == 8000.0
    assert "nonsense" not in config.entities
    assert "nonsense_pct" not in config.numbers
    assert config.inverted == frozenset()
    assert "nonsense" in caplog.text


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


def test_a_repeated_entity_is_dropped_not_counted_twice():
    config = EntryConfig.from_dict(
        {"entities": {"load_power_phase": ["sensor.a", "sensor.b", "sensor.a"]}}
    )
    assert config.entity_ids("load_power_phase") == ("sensor.a", "sensor.b")


def test_the_tuning_numbers_stay_out_of_the_first_run():
    advanced = {role.key for role in ROLES if role.advanced}
    assert advanced == {
        "imbalance_floor_pct",
        "imbalance_threshold_pct",
        "battery_low_pct",
        "battery_idle_w",
        "grid_zero_w",
    }
    assert not any(role.advanced for role in ROLES if role.required)


def test_a_phase_keeps_the_number_written_in_its_entity_id():
    identities = part_identities(
        "load_power_phase", ["sensor.solarman_load_l1_power", "sensor.solarman_load_l3_power"]
    )
    # The gap matters: positional naming would label L3's data "L2".
    assert [item.key for item in identities] == ["load_l1", "load_l3"]
    assert [item.label for item in identities] == ["L1", "L3"]
    assert [item.index for item in identities] == [1, 3]


def test_an_unreadable_name_falls_back_to_position_without_claiming_a_phase():
    identities = part_identities("load_power_phase", ["sensor.left_power", "sensor.right_power"])
    assert [item.key for item in identities] == ["load_p1", "load_p2"]
    assert [item.label for item in identities] == ["Phase 1", "Phase 2"]
    assert [item.index for item in identities] == [None, None]


def test_one_colliding_index_drops_the_whole_role_to_positions():
    identities = part_identities(
        "load_power_phase", ["sensor.a_l1_power", "sensor.b_l1_power", "sensor.c_l2_power"]
    )
    assert [item.key for item in identities] == ["load_p1", "load_p2", "load_p3"]


def test_the_installation_name_is_not_mistaken_for_a_phase_number():
    identities = part_identities(
        "load_power_phase",
        ["sensor.deye12_sun12k_load_l1_power", "sensor.deye12_sun12k_load_l2_power"],
    )
    assert [item.index for item in identities] == [1, 2]


def test_pv_strings_are_named_from_their_own_convention():
    identities = part_identities("pv_power_string", ["sensor.x_pv1_power", "sensor.x_pv2_power"])
    assert [item.key for item in identities] == ["pv_s1", "pv_s2"]
    assert [item.label for item in identities] == ["PV1", "PV2"]


def test_an_unknown_role_names_itself_in_the_error():
    config = EntryConfig.from_dict({})
    with pytest.raises(KeyError, match="load_powr"):
        config.has("load_powr")


def test_a_stored_number_that_is_not_a_number_names_its_role():
    """A stored entry can hold whatever a past version wrote."""
    with pytest.raises(ValueError, match="rated_power"):
        EntryConfig.from_dict({"numbers": {"rated_power": "twelve"}})


def test_the_balance_feature_lists_exactly_the_counters_balance_reads():
    """roles.py cannot import the analytics module that imports it.

    So the six counters are written out twice, and the copy here is the one
    the panel gates the tab on. If they drift, the tab either opens on an
    entry that cannot fill it or stays shut on one that can.
    """
    from custom_components.inverter_analytics.analytics.balance import FLOW_ROLES

    assert set(FEATURES_BY_KEY["balance"].requires) == set(FLOW_ROLES)


def test_a_feature_needing_every_role_is_unavailable_until_it_has_them_all():
    config = EntryConfig.from_dict({"entities": {"load_power": "sensor.load"}, "numbers": {}})
    load = next(item for item in feature_availability(config) if item["key"] == "load")
    assert load["available"] is False
    assert load["missing"] == ["rated_power"]


def test_a_feature_needing_any_role_opens_on_the_first_one():
    """The Balance tab draws whatever counters it has.

    Withholding it until all six are mapped would hide the only screen that
    tells the user which six they are.
    """
    config = EntryConfig.from_dict({"entities": {"pv_energy_total": "sensor.pv"}, "numbers": {}})
    balance = next(item for item in feature_availability(config) if item["key"] == "balance")
    assert balance["available"] is True
    assert "pv_energy_total" not in balance["missing"]
    assert len(balance["missing"]) == 5


def test_every_feature_names_roles_that_exist():
    """A typo would make a feature permanently unavailable and never say why."""
    for feature in FEATURES:
        assert set(feature.requires) <= set(ROLES_BY_KEY), feature.key
        for alternative in feature.alternatives:
            assert set(alternative) <= set(ROLES_BY_KEY), feature.key


def _grid(config: EntryConfig) -> dict:
    return next(item for item in feature_availability(config) if item["key"] == "grid")


def test_the_grid_feature_opens_on_a_presence_sensor():
    config = EntryConfig.from_dict(
        {"entities": {"grid_connected": "binary_sensor.grid"}, "numbers": {}}
    )
    assert _grid(config)["available"] is True
    assert _grid(config)["missing"] == []


def test_the_grid_feature_opens_on_power_flows_and_keeps_asking_for_the_sensor():
    """Inferred outages are the fallback; the sensor stays worth mapping."""
    total = EntryConfig.from_dict(
        {
            "entities": {"grid_power": "sensor.grid", "battery_power": "sensor.bat"},
            "numbers": {},
        }
    )
    phases = EntryConfig.from_dict(
        {
            "entities": {
                "grid_power_phase": ["sensor.l1", "sensor.l2"],
                "battery_power": "sensor.bat",
            },
            "numbers": {},
        }
    )
    for config in (total, phases):
        assert _grid(config)["available"] is True
        assert _grid(config)["missing"] == ["grid_connected"]


def test_grid_power_alone_does_not_open_the_grid_feature():
    config = EntryConfig.from_dict({"entities": {"grid_power": "sensor.grid"}, "numbers": {}})
    assert _grid(config)["available"] is False
    assert _grid(config)["missing"] == ["grid_connected"]


def test_grid_zero_is_a_tuning_number():
    role = ROLES_BY_KEY["grid_zero_w"]
    assert role.kind is RoleKind.NUMBER
    assert role.advanced is True
    assert "grid_zero_w" in tuning_role_keys()
