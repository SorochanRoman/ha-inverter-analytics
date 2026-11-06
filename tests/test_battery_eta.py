"""Tests for the battery time card's basis: the measured capacity and the settings it reads."""

from datetime import UTC, datetime, timedelta
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
import pytest

from custom_components.inverter_analytics.analytics.battery_eta import (
    BATTERY_ETA_WINDOW_DAYS,
    async_battery_eta,
    build_battery_eta,
)
from custom_components.inverter_analytics.analytics.source import (
    EnergyRow,
    EnergySeries,
    HourlyRow,
)
from custom_components.inverter_analytics.const import (
    DEFAULT_BATTERY_IDLE_W,
    DEFAULT_BATTERY_LOW_PCT,
)
from custom_components.inverter_analytics.roles import EntryConfig

BASE = datetime(2026, 9, 1, 10, tzinfo=UTC)
COMPUTED_AT = "2026-11-06T12:00:00+00:00"

FULL_ENTITIES = {
    "battery_soc": ["sensor.battery_soc"],
    "battery_power": ["sensor.battery_power"],
    "battery_charge_total": ["sensor.battery_charged"],
    "battery_discharge_total": ["sensor.battery_discharged"],
}
RESPONSE_KEYS = {
    "capacity_kwh",
    "capacity_reason",
    "missing_roles",
    "clean_hours",
    "clean_hours_min",
    "window_days",
    "computed_at",
    "soc_entity",
    "battery_power_entity",
    "battery_power_inverted",
    "idle_w",
    "low_pct",
}


def at(index: int) -> datetime:
    return BASE + timedelta(hours=index)


def soc_hour(index: int, *, low: float = 47.0, high: float = 50.0) -> HourlyRow:
    return HourlyRow(at(index), (low + high) / 2, low, high)


def energy(changes: dict[int, float]) -> EnergySeries:
    return EnergySeries(tuple(EnergyRow(at(index), change) for index, change in changes.items()))


def clean_inputs(count: int):
    """`count` clean hours, each 0.93 kWh out over a 3-point drop: 31 kWh per 100 points."""
    soc = [soc_hour(index) for index in range(count)]
    charge = energy({index: 0.0 for index in range(count)})
    discharge = energy({index: 0.93 for index in range(count)})
    return soc, charge, discharge


def config(entities=None, numbers=None, inverted=()) -> EntryConfig:
    data = {
        "entities": FULL_ENTITIES if entities is None else entities,
        "numbers": {"rated_power": 8000.0} | (numbers or {}),
        "inverted": list(inverted),
    }
    return EntryConfig.from_dict(data)


def build(count: int = 30, **config_kwargs):
    soc, charge, discharge = clean_inputs(count)
    return build_battery_eta(
        soc, charge, discharge, config=config(**config_kwargs), computed_at=COMPUTED_AT
    )


def test_the_response_has_exactly_the_contract_keys():
    result = build()
    assert set(result) == RESPONSE_KEYS
    assert result["window_days"] == 60
    assert result["clean_hours_min"] == 20
    assert result["computed_at"] == COMPUTED_AT
    assert BATTERY_ETA_WINDOW_DAYS == 60


def test_enough_clean_hours_give_the_measured_capacity():
    result = build(30)
    assert result["capacity_kwh"] == pytest.approx(31.0)
    assert result["capacity_reason"] is None
    assert result["missing_roles"] == []
    assert result["clean_hours"] == 30


def test_twelve_clean_hours_give_no_capacity_and_the_count():
    result = build(12)
    assert result["capacity_kwh"] is None
    assert result["capacity_reason"] == "too_few_clean_hours"
    assert result["clean_hours"] == 12
    assert result["missing_roles"] == []


def test_the_nameplate_is_never_the_fallback():
    result = build(12, numbers={"battery_capacity": 30.0})
    assert result["capacity_kwh"] is None


@pytest.mark.parametrize(
    ("unmapped", "expected"),
    [
        (("battery_soc",), ["battery_soc"]),
        (("battery_charge_total",), ["battery_charge_total"]),
        (("battery_discharge_total",), ["battery_discharge_total"]),
        (
            ("battery_discharge_total", "battery_soc"),
            ["battery_soc", "battery_discharge_total"],
        ),
        (
            ("battery_soc", "battery_charge_total", "battery_discharge_total"),
            ["battery_soc", "battery_charge_total", "battery_discharge_total"],
        ),
    ],
)
def test_unmapped_capacity_roles_are_listed_in_order(unmapped, expected):
    entities = {key: value for key, value in FULL_ENTITIES.items() if key not in unmapped}
    result = build_battery_eta(
        None, None, None, config=config(entities=entities), computed_at=COMPUTED_AT
    )
    assert result["capacity_kwh"] is None
    assert result["capacity_reason"] == "missing_roles"
    assert result["missing_roles"] == expected
    assert result["clean_hours"] == 0


def test_missing_roles_win_over_rows_that_were_passed_anyway():
    soc, charge, discharge = clean_inputs(30)
    entities = {key: value for key, value in FULL_ENTITIES.items() if key != "battery_soc"}
    result = build_battery_eta(
        soc, charge, discharge, config=config(entities=entities), computed_at=COMPUTED_AT
    )
    assert result["capacity_reason"] == "missing_roles"
    assert result["capacity_kwh"] is None


@pytest.mark.parametrize(("inverted", "expected"), [((), False), (("battery_power",), True)])
def test_the_power_inversion_follows_the_role_sign(inverted, expected):
    assert build(inverted=inverted)["battery_power_inverted"] is expected


def test_idle_and_low_take_the_defaults_when_unset():
    result = build()
    assert result["idle_w"] == DEFAULT_BATTERY_IDLE_W
    assert result["low_pct"] == DEFAULT_BATTERY_LOW_PCT


def test_idle_and_low_take_the_options_when_set():
    result = build(numbers={"battery_idle_w": 120.0, "battery_low_pct": 15.0})
    assert result["idle_w"] == 120.0
    assert result["low_pct"] == 15.0


def test_zero_is_a_legal_idle_and_low():
    result = build(numbers={"battery_idle_w": 0.0, "battery_low_pct": 0.0})
    assert result["idle_w"] == 0.0
    assert result["low_pct"] == 0.0


def test_the_entities_are_the_mapped_ids():
    result = build()
    assert result["soc_entity"] == "sensor.battery_soc"
    assert result["battery_power_entity"] == "sensor.battery_power"


def test_unmapped_entities_are_none():
    result = build_battery_eta(
        None, None, None, config=config(entities={}), computed_at=COMPUTED_AT
    )
    assert result["soc_entity"] is None
    assert result["battery_power_entity"] is None


# --- reading the statistics ------------------------------------------------


async def test_the_analytics_read_sixty_days_of_statistics(
    recorder_mock, hass: HomeAssistant, freezer
) -> None:
    freezer.move_to("2026-11-06 12:00:00+00:00")
    now = dt_util.utcnow()
    starts = [now - timedelta(days=10) + timedelta(hours=index) for index in range(25)]
    rows = {
        "sensor.battery_soc": [
            {"start": start, "mean": 48.5, "min": 47.0, "max": 50.0} for start in starts
        ],
        "sensor.battery_charged": [{"start": start, "change": 0.0} for start in starts],
        "sensor.battery_discharged": [{"start": start, "change": 0.93} for start in starts],
    }
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value=rows,
    ) as statistics:
        result = await async_battery_eta(hass, config(inverted=("battery_power",)))

    calls = statistics.call_args_list
    assert {call.args[1] for call in calls} == {now - timedelta(days=60)}
    assert {call.args[2] for call in calls} == {now}
    read = set().union(*(call.args[3] for call in calls))
    assert read == {"sensor.battery_soc", "sensor.battery_charged", "sensor.battery_discharged"}
    assert result["capacity_kwh"] == pytest.approx(31.0)
    assert result["clean_hours"] == 25
    assert result["battery_power_inverted"] is True
    assert result["computed_at"] == now.isoformat()


async def test_the_analytics_skip_the_reads_when_a_role_is_missing(
    recorder_mock, hass: HomeAssistant
) -> None:
    entities = {key: value for key, value in FULL_ENTITIES.items() if key != "battery_charge_total"}
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value={},
    ) as statistics:
        result = await async_battery_eta(hass, config(entities=entities))

    assert statistics.call_count == 0
    assert result["capacity_reason"] == "missing_roles"
    assert result["missing_roles"] == ["battery_charge_total"]
    assert result["soc_entity"] == "sensor.battery_soc"


async def test_the_analytics_without_statistics_count_no_clean_hours(
    recorder_mock, hass: HomeAssistant
) -> None:
    with patch(
        "custom_components.inverter_analytics.analytics.source.statistics_during_period",
        return_value={},
    ):
        result = await async_battery_eta(hass, config())

    assert result["capacity_kwh"] is None
    assert result["capacity_reason"] == "too_few_clean_hours"
    assert result["clean_hours"] == 0
