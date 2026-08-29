"""Entities captured from a live instance, for detection tests.

Two inverters (a Solarman-integrated one and a Deye SUN-12K), plus phone
batteries, a printer and a boiler that share device classes with inverter
sensors and must never be swept into a cluster.
"""

from custom_components.inverter_analytics.detect import SensorInfo

# (entity_id, device_class, unit, state_class)
_RAW: tuple[tuple[str, str | None, str | None, str | None], ...] = (
    ("sensor.solarman_power_production_now", "power", "W", "measurement"),
    ("sensor.solarman_pv1_power", "power", "W", "measurement"),
    ("sensor.solarman_pv2_power", "power", "W", "measurement"),
    ("sensor.solarman_battery_power", "power", "W", "measurement"),
    ("sensor.solarman_battery_soc", "battery", "%", "measurement"),
    ("sensor.solarman_total_load_power", "power", "W", "measurement"),
    ("sensor.solarman_load_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_load_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_load_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_inverter_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_inverter_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_inverter_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_internal_ct_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_internal_ct_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_internal_ct_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_external_ct_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_external_ct_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_external_ct_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_total_production", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_load_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_battery_charge", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_battery_discharge", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_energy_bought", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_energy_sold", "energy", "kWh", "total_increasing"),
    # No state_class: no long-term statistics exists for these.
    ("sensor.solarman_total_power", "power", "W", None),
    ("sensor.solarman_gen_power", "power", "W", None),
    ("sensor.solarman_micro_inverter_power", "power", "W", None),
    # A second inverter.
    ("sensor.deye12_sun12k_total_pv_production", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_energy_bought", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_energy_sold", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_charge_of_the_battery", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_discharge_of_the_battery", "energy", "kWh", "total_increasing"),
    # Must never join a cluster: same device classes, unrelated hardware.
    ("sensor.romans_iphone_battery_level", "battery", "%", None),
    ("sensor.ipad_3_battery_level", "battery", "%", None),
    ("sensor.aqara_motion_sensor_batareia", "battery", "%", "measurement"),
    ("sensor.printeri_current_consumption", "power", "W", "measurement"),
    ("sensor.printeri_today_s_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.printeri_this_month_s_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.boiler_current_consumption", "power", "W", "measurement"),
    ("sensor.boiler_today_s_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.boiler_this_month_s_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.kholodilnik_total_energy", "energy", "kWh", "total_increasing"),
    ("sensor.pv_power_total", "power", "W", "measurement"),
)

SOLARMAN_SENSORS: tuple[SensorInfo, ...] = tuple(
    SensorInfo(entity_id=e, device_class=d, unit=u, state_class=s, device_id=None)
    for e, d, u, s in _RAW
)
