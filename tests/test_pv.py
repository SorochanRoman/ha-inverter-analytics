"""PV power read from the strings when no total is mapped."""

from datetime import UTC, datetime, timedelta

from custom_components.inverter_analytics.analytics.pv import (
    pv_hourly,
    pv_power_derived,
    pv_power_ids,
    pv_total_hourly,
)
from custom_components.inverter_analytics.analytics.source import HourlyRow, HourlySeries
from custom_components.inverter_analytics.roles import EntryConfig

T0 = datetime(2026, 6, 1, 9, tzinfo=UTC)
HOUR = timedelta(hours=1)


def _config(entities: dict) -> EntryConfig:
    return EntryConfig.from_dict(
        {"entities": entities, "numbers": {"rated_power": 8000.0}, "inverted": []}
    )


def test_strings_are_summed_hour_by_hour() -> None:
    one = [HourlyRow(T0, 1000.0, 400.0, 1500.0), HourlyRow(T0 + HOUR, 1200.0, 900.0, 1600.0)]
    two = [HourlyRow(T0, 800.0, 300.0, 1100.0), HourlyRow(T0 + HOUR, 700.0, 500.0, 900.0)]

    assert pv_total_hourly([one, two]) == [
        HourlyRow(T0, 1800.0, 700.0, 2600.0),
        HourlyRow(T0 + HOUR, 1900.0, 1400.0, 2500.0),
    ]


def test_an_hour_missing_from_one_string_is_dropped() -> None:
    """Half an array is not the array's hour."""
    one = [HourlyRow(T0, 1000.0, 400.0, 1500.0), HourlyRow(T0 + HOUR, 1200.0, 900.0, 1600.0)]
    two = [HourlyRow(T0 + HOUR, 700.0, 500.0, 900.0)]

    assert pv_total_hourly([one, two]) == [HourlyRow(T0 + HOUR, 1900.0, 1400.0, 2500.0)]


def test_no_strings_give_no_hours() -> None:
    assert pv_total_hourly([]) == []


def test_the_total_wins_over_the_strings() -> None:
    config = _config(
        {
            "load_power": ["sensor.load"],
            "pv_power": ["sensor.pv"],
            "pv_power_string": ["sensor.pv1", "sensor.pv2"],
        }
    )
    assert pv_power_ids(config) == ("sensor.pv",)
    assert pv_power_derived(config) is False


def test_the_strings_stand_in_for_a_missing_total() -> None:
    config = _config(
        {"load_power": ["sensor.load"], "pv_power_string": ["sensor.pv1", "sensor.pv2"]}
    )
    assert pv_power_ids(config) == ("sensor.pv1", "sensor.pv2")
    assert pv_power_derived(config) is True


def test_nothing_mapped_reads_nothing() -> None:
    config = _config({"load_power": ["sensor.load"]})
    assert pv_power_ids(config) == ()
    assert pv_power_derived(config) is False
    assert pv_hourly(config, {}) is None


def test_pv_hourly_derives_the_total_from_the_strings() -> None:
    config = _config(
        {"load_power": ["sensor.load"], "pv_power_string": ["sensor.pv1", "sensor.pv2"]}
    )
    extremes = {
        "sensor.pv1": HourlySeries((HourlyRow(T0, 1000.0, 400.0, 1500.0),)),
        "sensor.pv2": HourlySeries((HourlyRow(T0, 800.0, 300.0, 1100.0),)),
    }
    assert pv_hourly(config, extremes) == HourlySeries((HourlyRow(T0, 1800.0, 700.0, 2600.0),))


def test_pv_hourly_reads_the_total_as_it_is() -> None:
    config = _config({"load_power": ["sensor.load"], "pv_power": ["sensor.pv"]})
    series = HourlySeries((HourlyRow(T0, 1000.0, 400.0, 1500.0),))
    assert pv_hourly(config, {"sensor.pv": series}) is series
