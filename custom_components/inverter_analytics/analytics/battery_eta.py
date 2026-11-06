"""The battery time card's basis: the measured usable capacity and the settings it reads.

The card divides the energy between the state of charge and a target by the
battery's power. The energy comes from the battery's own measurement — the
Health tab's clean discharge hours, pooled over the last BATTERY_ETA_WINDOW_DAYS
rather than per month — and never from the nameplate times a percentage. With
too few clean hours, or a role unmapped, there is no figure and the reason
stands in its place.

Statistics only, and only for the roles the capacity needs.
"""

from __future__ import annotations

from collections.abc import Sequence
from datetime import timedelta
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from ..const import DEFAULT_BATTERY_IDLE_W, DEFAULT_BATTERY_LOW_PCT
from ..roles import EntryConfig
from .health import CLEAN_HOURS_MIN, TOO_FEW_CLEAN_HOURS, clean_discharge_hours, pooled_capacity
from .source import (
    EnergySeries,
    HourlyRow,
    Window,
    async_energy_many,
    async_hourly_extremes_many,
)

# Recent enough to be current, long enough to hold a few weeks of nights.
BATTERY_ETA_WINDOW_DAYS = 60
MISSING_ROLES = "missing_roles"
# What the capacity needs mapped, in the order the response lists them.
CAPACITY_ROLES = ("battery_soc", "battery_charge_total", "battery_discharge_total")


def _number_or(config: EntryConfig, role: str, default: float) -> float:
    """The set value, or the default when none is set. Zero is a set value."""
    value = config.number(role)
    return default if value is None else value


def build_battery_eta(
    soc: Sequence[HourlyRow] | None,
    charge: EnergySeries | None,
    discharge: EnergySeries | None,
    *,
    config: EntryConfig,
    computed_at: str,
) -> dict[str, Any]:
    """The card's basis from rows already read, or None for a role not read.

    An unmapped capacity role wins over any rows passed: the figure needs all
    three, and missing_roles names the ones that are not mapped.
    """
    missing = [role for role in CAPACITY_ROLES if not config.entity_id(role)]
    capacity: float | None = None
    count = 0
    if missing:
        reason: str | None = MISSING_ROLES
    else:
        hours = clean_discharge_hours(
            soc or (),
            charge if charge is not None else EnergySeries(()),
            discharge if discharge is not None else EnergySeries(()),
        )
        capacity, count = pooled_capacity(hours)
        reason = TOO_FEW_CLEAN_HOURS if capacity is None else None
    return {
        "capacity_kwh": capacity,
        "capacity_reason": reason,
        "missing_roles": missing,
        "clean_hours": count,
        "clean_hours_min": CLEAN_HOURS_MIN,
        "window_days": BATTERY_ETA_WINDOW_DAYS,
        "computed_at": computed_at,
        "soc_entity": config.entity_id("battery_soc"),
        "battery_power_entity": config.entity_id("battery_power"),
        "battery_power_inverted": config.sign("battery_power") < 0,
        "idle_w": _number_or(config, "battery_idle_w", DEFAULT_BATTERY_IDLE_W),
        "low_pct": _number_or(config, "battery_low_pct", DEFAULT_BATTERY_LOW_PCT),
    }


async def async_battery_eta(hass: HomeAssistant, config: EntryConfig) -> dict[str, Any]:
    """Read BATTERY_ETA_WINDOW_DAYS of statistics and build the card's basis.

    Nothing is read when a capacity role is unmapped: there would be no
    figure to read it for.
    """
    now = dt_util.utcnow()
    soc_id, charge_id, discharge_id = (config.entity_id(role) for role in CAPACITY_ROLES)
    soc: Sequence[HourlyRow] | None = None
    charge: EnergySeries | None = None
    discharge: EnergySeries | None = None
    if soc_id and charge_id and discharge_id:
        window = Window(now - timedelta(days=BATTERY_ETA_WINDOW_DAYS), now)
        extremes = await async_hourly_extremes_many(hass, [soc_id], window)
        energy = await async_energy_many(hass, [charge_id, discharge_id], window)
        series = extremes.get(soc_id)
        soc = series.rows if series is not None else ()
        charge = energy.get(charge_id)
        discharge = energy.get(discharge_id)
    return build_battery_eta(soc, charge, discharge, config=config, computed_at=now.isoformat())
