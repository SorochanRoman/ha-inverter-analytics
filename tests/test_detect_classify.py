"""Tests for turning a cluster of sensors into a role mapping."""

from custom_components.inverter_analytics.detect import (
    Cluster,
    SensorInfo,
    classify,
    cluster_sensors,
)
from tests.fixtures.solarman_entities import SOLARMAN_SENSORS


def _solarman():
    return next(c for c in cluster_sensors(SOLARMAN_SENSORS) if c.key == "solarman")


def test_maps_the_total_load_and_its_phases_separately():
    detection = classify(_solarman())
    assert detection.mapping["load_power"] == ("sensor.solarman_total_load_power",)
    assert detection.mapping["load_power_phase"] == (
        "sensor.solarman_load_l1_power",
        "sensor.solarman_load_l2_power",
        "sensor.solarman_load_l3_power",
    )


def test_phases_and_strings_are_ordered_by_their_index_not_alphabetically():
    """L10 must not sort before L2 once a bigger inverter shows up."""
    detection = classify(_solarman())
    assert detection.mapping["pv_power_string"] == (
        "sensor.solarman_pv1_power",
        "sensor.solarman_pv2_power",
    )


def test_maps_battery_and_energy_counters():
    detection = classify(_solarman())
    assert detection.mapping["battery_power"] == ("sensor.solarman_battery_power",)
    assert detection.mapping["battery_soc"] == ("sensor.solarman_battery_soc",)
    assert detection.mapping["grid_import_total"] == ("sensor.solarman_total_energy_bought",)
    assert detection.mapping["grid_export_total"] == ("sensor.solarman_total_energy_sold",)


def test_the_two_ct_sets_become_a_question_not_a_guess():
    """Which clamp measures the grid depends on how it was installed."""
    detection = classify(_solarman())
    assert "grid_power_phase" not in detection.mapping
    ct = next(a for a in detection.ambiguities if a.role == "grid_power_phase")
    assert set(ct.options) == {"external_ct", "internal_ct"}
    assert ct.options["external_ct"] == (
        "sensor.solarman_external_ct_l1_power",
        "sensor.solarman_external_ct_l2_power",
        "sensor.solarman_external_ct_l3_power",
    )


def test_a_lone_external_ct_set_is_mapped_to_the_grid():
    """The external clamp set is described as the grid connection, so it is safe to assume."""
    sensors = tuple(
        SensorInfo(f"sensor.inv_external_ct_l{phase}_power", "power", "W", "measurement", None)
        for phase in (1, 2, 3)
    )
    detection = classify(Cluster(key="inv", label="Inv", sensors=sensors))
    assert detection.mapping["grid_power_phase"] == (
        "sensor.inv_external_ct_l1_power",
        "sensor.inv_external_ct_l2_power",
        "sensor.inv_external_ct_l3_power",
    )
    assert detection.ambiguities == ()


def test_a_lone_internal_ct_set_is_left_unmapped():
    """CT_CHOICES describes the internal set as the inverter's own measurement, not the grid."""
    sensors = tuple(
        SensorInfo(f"sensor.inv_internal_ct_l{phase}_power", "power", "W", "measurement", None)
        for phase in (1, 2, 3)
    )
    detection = classify(Cluster(key="inv", label="Inv", sensors=sensors))
    assert "grid_power_phase" not in detection.mapping
    assert detection.ambiguities == ()


def test_sensors_without_a_state_class_are_reported():
    """No state_class means no long-term statistics, so long windows come back empty."""
    detection = classify(_solarman())
    assert set(detection.without_statistics) == {
        "sensor.solarman_total_power",
        "sensor.solarman_gen_power",
        "sensor.solarman_micro_inverter_power",
    }


def test_unrecognised_sensors_are_simply_left_out():
    detection = classify(_solarman())
    mapped = {entity for ids in detection.mapping.values() for entity in ids}
    assert "sensor.solarman_inverter_l1_power" not in mapped


def test_an_unfamiliar_profile_yields_only_the_roles_that_genuinely_match():
    """The second inverter uses a different naming profile.

    total_energy_bought/sold legitimately match grid_import_total /
    grid_export_total — those are generic grid-exchange terms, not a
    vendor-specific abbreviation — so they are expected to map. Nothing
    else in this profile's vocabulary should be recognised or guessed.
    """
    deye = next(c for c in cluster_sensors(SOLARMAN_SENSORS) if c.key == "deye12_sun12k")
    detection = classify(deye)
    assert set(detection.mapping) == {"grid_import_total", "grid_export_total"}
