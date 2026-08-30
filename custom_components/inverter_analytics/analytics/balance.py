"""Where the energy came from and where it went.

Works from hourly counter changes that have already been read; the arithmetic
here has no dependency on Home Assistant.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import datetime, tzinfo
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from ..roles import EntryConfig
from .source import EnergySeries, Window, async_energy_many

# The flows, split by which side of the books they belong to. Order is the order
# they appear on screen.
SOURCE_ROLES: tuple[str, ...] = (
    "pv_energy_total",
    "grid_import_total",
    "battery_discharge_total",
)
SINK_ROLES: tuple[str, ...] = (
    "load_energy_total",
    "grid_export_total",
    "battery_charge_total",
)
FLOW_ROLES: tuple[str, ...] = SOURCE_ROLES + SINK_ROLES

# Below this a ratio is arithmetic noise: a night with 0.02 kWh of production
# has no meaningful self-consumption, and a number there would be a claim.
MIN_DENOMINATOR_KWH = 0.1


def _ratio(numerator: float, denominator: float) -> float | None:
    """A share of a total, clamped to 0-1, or None if there is no total.

    Clamped because the two counters are independent sensors: exporting
    fractionally more than the production meter recorded is a rounding
    disagreement, not 103% self-consumption.
    """
    if denominator < MIN_DENOMINATOR_KWH:
        return None
    return max(0.0, min(1.0, numerator / denominator))


def _local_day(moment: datetime, tz: tzinfo) -> str:
    """The local calendar day an hour belongs to.

    An hourly row is never split, so the day that gains an hour simply has
    twenty-five rows and no daylight-saving arithmetic is needed here.
    """
    return moment.astimezone(tz).date().isoformat()


def _covered_span(flows: dict[str, EnergySeries]) -> tuple[datetime | None, datetime | None]:
    """The span the statistics actually cover, across every mapped counter."""
    starts = [series.covered_start for series in flows.values() if series.covered_start]
    ends = [series.covered_end for series in flows.values() if series.covered_end]
    return (min(starts) if starts else None, max(ends) if ends else None)


def build_balance_payload(
    flows: dict[str, EnergySeries], *, tz: tzinfo, window: Window
) -> dict[str, Any]:
    """Totals, the balance, the two ratios and a day-by-day breakdown."""
    totals = {role: series.total for role, series in flows.items()}

    sources = sum(totals.get(role, 0.0) for role in SOURCE_ROLES)
    sinks = sum(totals.get(role, 0.0) for role in SINK_ROLES)
    complete = all(role in flows for role in FLOW_ROLES)

    daily: dict[str, dict[str, float]] = defaultdict(dict)
    for role, series in flows.items():
        for row in series.rows:
            day = _local_day(row.start, tz)
            daily[day][role] = daily[day].get(role, 0.0) + row.change

    covered_start, covered_end = _covered_span(flows)
    load = totals.get("load_energy_total", 0.0)
    pv = totals.get("pv_energy_total", 0.0)

    return {
        "totals": totals,
        "mapped": [role for role in FLOW_ROLES if role in flows],
        "missing": [role for role in FLOW_ROLES if role not in flows],
        "sources_total": sources,
        "sinks_total": sinks,
        # Only with all six. With one missing the difference measures the
        # omission rather than the losses, and would read as an efficiency
        # figure while describing a gap in the mapping.
        "unaccounted": (sources - sinks) if complete else None,
        "unaccounted_share": _ratio(abs(sources - sinks), sources) if complete else None,
        "self_sufficiency": (
            _ratio(load - totals["grid_import_total"], load)
            if {"load_energy_total", "grid_import_total"} <= flows.keys()
            else None
        ),
        "self_consumption": (
            _ratio(pv - totals["grid_export_total"], pv)
            if {"pv_energy_total", "grid_export_total"} <= flows.keys()
            else None
        ),
        "days": [
            {"day": day, "flows": {role: round(value, 4) for role, value in sorted(values.items())}}
            for day, values in sorted(daily.items())
        ],
        "covered_start": covered_start.isoformat() if covered_start else None,
        "covered_end": covered_end.isoformat() if covered_end else None,
        "window_start": window.start.isoformat(),
        "window_end": window.end.isoformat(),
        # Hourly statistics are compiled at the end of each hour, so a window
        # ending now is short by up to one of them. Saying so beats quietly
        # returning "today's energy" that stops fifty minutes ago.
        "covers_whole_window": bool(
            covered_start
            and covered_end
            and covered_start <= window.start
            and covered_end >= window.end
        ),
    }


async def async_balance_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the counters and compute the energy balance."""
    mapped = {
        role: entity_id for role in FLOW_ROLES if (entity_id := config.entity_id(role)) is not None
    }
    if not mapped:
        raise ValueError("no energy counters are configured")

    # One entity may fill two roles on an installation that meters import and
    # export with a single counter, so the read is deduplicated by id while the
    # payload stays keyed by role.
    series = await async_energy_many(hass, list(mapped.values()), window)
    flows = {role: series[entity_id] for role, entity_id in mapped.items()}

    zone = dt_util.get_time_zone(hass.config.time_zone) or dt_util.UTC
    payload = build_balance_payload(flows, tz=zone, window=window)
    payload["entities"] = mapped
    payload["timezone"] = str(zone)
    # Counters are read from statistics whatever the window, so there is no
    # precision choice to report — but the badge exists on every other tab and
    # its absence here would look like an omission rather than a decision.
    payload["precision"] = "lts"
    payload["boundary"] = None
    return payload
