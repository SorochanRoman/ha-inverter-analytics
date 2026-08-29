"""Tests for grouping an installation's sensors into candidate inverters."""

from custom_components.inverter_analytics.detect import SensorInfo, cluster_sensors
from tests.fixtures.solarman_entities import SOLARMAN_SENSORS


def _keys(clusters):
    return sorted(cluster.key for cluster in clusters)


def test_finds_both_inverters_in_a_real_installation():
    clusters = cluster_sensors(SOLARMAN_SENSORS)
    assert _keys(clusters) == ["deye12_sun12k", "solarman"]


def test_household_sensors_never_join_a_cluster():
    """Phones, a printer and a boiler share device classes with an inverter."""
    clustered = {
        sensor.entity_id
        for cluster in cluster_sensors(SOLARMAN_SENSORS)
        for sensor in cluster.sensors
    }
    for stray in (
        "sensor.romans_iphone_battery_level",
        "sensor.aqara_motion_sensor_batareia",
        "sensor.printeri_current_consumption",
        "sensor.boiler_current_consumption",
        "sensor.kholodilnik_total_energy",
        "sensor.pv_power_total",
    ):
        assert stray not in clustered


def test_a_cluster_keeps_all_of_its_sensors():
    clusters = {cluster.key: cluster for cluster in cluster_sensors(SOLARMAN_SENSORS)}
    solarman = clusters["solarman"]
    assert len(solarman.sensors) == 27
    assert any(s.entity_id == "sensor.solarman_load_l3_power" for s in solarman.sensors)


def test_clusters_are_ordered_by_size_so_the_main_inverter_comes_first():
    clusters = cluster_sensors(SOLARMAN_SENSORS)
    assert [c.key for c in clusters] == ["solarman", "deye12_sun12k"]


def test_a_device_id_groups_sensors_that_share_no_prefix():
    """Integrations that register a device are grouped by it, not by name."""
    sensors = (
        SensorInfo("sensor.alpha_output", "power", "W", "measurement", device_id="dev1"),
        SensorInfo("sensor.beta_output", "power", "W", "measurement", device_id="dev1"),
        SensorInfo("sensor.gamma_output", "power", "W", "measurement", device_id="dev1"),
    )
    clusters = cluster_sensors(sensors)
    assert len(clusters) == 1
    assert len(clusters[0].sensors) == 3


def test_a_group_too_small_to_be_an_inverter_is_dropped():
    sensors = (
        SensorInfo("sensor.lonely_power", "power", "W", "measurement", device_id=None),
        SensorInfo("sensor.lonely_energy", "energy", "kWh", "total_increasing", device_id=None),
    )
    assert cluster_sensors(sensors) == []
