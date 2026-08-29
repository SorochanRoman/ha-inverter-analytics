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
        "sensor.boiler_today_s_consumption",
        "sensor.boiler_this_month_s_consumption",
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


def test_a_device_backed_cluster_is_labelled_with_the_device_name():
    """The plan's done-criterion asks for the inverter by name, not by device_id."""
    sensors = (
        SensorInfo(
            "sensor.alpha_output", "power", "W", "measurement", "dev1", device_name="Deye SUN-12K"
        ),
        SensorInfo(
            "sensor.beta_output", "power", "W", "measurement", "dev1", device_name="Deye SUN-12K"
        ),
        SensorInfo(
            "sensor.gamma_output", "power", "W", "measurement", "dev1", device_name="Deye SUN-12K"
        ),
    )
    clusters = cluster_sensors(sensors)
    assert len(clusters) == 1
    assert clusters[0].label == "Deye SUN-12K"


def test_a_device_backed_cluster_falls_back_to_the_key_without_a_device_name():
    sensors = (
        SensorInfo("sensor.alpha_output", "power", "W", "measurement", device_id="dev1"),
        SensorInfo("sensor.beta_output", "power", "W", "measurement", device_id="dev1"),
        SensorInfo("sensor.gamma_output", "power", "W", "measurement", device_id="dev1"),
    )
    clusters = cluster_sensors(sensors)
    assert clusters[0].label == "Dev1"


def test_a_group_too_small_to_be_an_inverter_is_dropped():
    sensors = (
        SensorInfo("sensor.lonely_power", "power", "W", "measurement", device_id=None),
        SensorInfo("sensor.lonely_energy", "energy", "kWh", "total_increasing", device_id=None),
    )
    assert cluster_sensors(sensors) == []


def test_a_three_sensor_appliance_is_not_offered_as_an_inverter():
    """Power plus daily and monthly energy is the shape of any monitored appliance."""
    appliance = tuple(
        SensorInfo(f"sensor.dishwasher_{name}", device_class, unit, state_class, device_id=None)
        for name, device_class, unit, state_class in (
            ("current_consumption", "power", "W", "measurement"),
            ("today_s_consumption", "energy", "kWh", "total_increasing"),
            ("this_month_s_consumption", "energy", "kWh", "total_increasing"),
        )
    )
    assert cluster_sensors(appliance) == []


def test_the_same_three_sensors_are_trusted_when_a_device_vouches_for_them():
    """A registered device is evidence; a shared prefix is only a guess."""
    vouched = tuple(
        SensorInfo(f"sensor.dishwasher_{name}", device_class, unit, state_class, device_id="dev9")
        for name, device_class, unit, state_class in (
            ("current_consumption", "power", "W", "measurement"),
            ("today_s_consumption", "energy", "kWh", "total_increasing"),
            ("this_month_s_consumption", "energy", "kWh", "total_increasing"),
        )
    )
    assert len(cluster_sensors(vouched)) == 1
