"""WebSocket API for the Inverter Analytics integration."""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from datetime import datetime, timedelta
from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util
import voluptuous as vol

from .analytics.balance import async_balance_analytics
from .analytics.battery import async_battery_analytics
from .analytics.load import async_load_analytics
from .analytics.seasonality import async_seasonality_analytics
from .analytics.source import Window, raw_available_from
from .const import DATA_CACHE, DOMAIN
from .roles import EntryConfig

MAX_WINDOW_DAYS = 400
FRESH_TTL = 60.0
HISTORICAL_TTL = 86400.0
FRESH_MARGIN = timedelta(minutes=5)

_DATA_WS_REGISTERED = "ws_registered"


def clamp_window(start: datetime, end: datetime) -> tuple[Window, bool]:
    """Clamp an overly long window. Returns the window and whether it was clamped."""
    limit = timedelta(days=MAX_WINDOW_DAYS)
    if end - start > limit:
        return Window(end - limit, end), True
    return Window(start, end), False


def _ttl_for(window: Window) -> float:
    """Fresh windows are cached briefly; closed historical ones for a full day."""
    if window.end >= dt_util.utcnow() - FRESH_MARGIN:
        return FRESH_TTL
    return HISTORICAL_TTL


@callback
def async_register(hass: HomeAssistant) -> None:
    """Register the commands once for the whole Home Assistant instance."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if domain_data.get(_DATA_WS_REGISTERED):
        return
    websocket_api.async_register_command(hass, ws_config)
    websocket_api.async_register_command(hass, ws_load)
    websocket_api.async_register_command(hass, ws_battery)
    websocket_api.async_register_command(hass, ws_seasonality)
    websocket_api.async_register_command(hass, ws_balance)
    domain_data[_DATA_WS_REGISTERED] = True


@websocket_api.websocket_command({vol.Required("type"): "inverter_analytics/config"})
@callback
def ws_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the mapping for all configured inverters."""
    entries = []
    for entry in hass.config_entries.async_entries(DOMAIN):
        config = EntryConfig.from_entry(entry)
        entries.append(
            {
                "entry_id": entry.entry_id,
                "title": entry.title,
                "entities": {role: list(ids) for role, ids in config.entities.items()},
                "numbers": dict(config.numbers),
                "inverted": sorted(config.inverted),
            }
        )

    connection.send_result(
        msg["id"],
        {"entries": entries, "raw_available_from": raw_available_from(hass).isoformat()},
    )


_WINDOW_SCHEMA = {
    vol.Required("entry_id"): str,
    vol.Required("start"): cv.datetime,
    vol.Required("end"): cv.datetime,
}

Compute = Callable[[HomeAssistant, EntryConfig, Window], Awaitable[dict[str, Any]]]


async def _async_windowed_response(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    kind: str,
    compute: Compute,
) -> None:
    """The shape every analytics command shares.

    Entry lookup, window validation, clamping, the cache and the merge back
    into the reply were thirty lines duplicated the moment a second command
    appeared. `kind` keys the cache, so two commands over the same window do
    not collide.
    """
    domain_data = hass.data.get(DOMAIN, {})
    entry = hass.config_entries.async_get_entry(msg["entry_id"])
    # async_get_entry returns the entry in any state, including one disabled
    # manually in the UI — only a fully removed entry disappears. Membership in
    # domain_data is exactly the condition under which the cache this handler
    # reads actually exists.
    if entry is None or entry.domain != DOMAIN or entry.entry_id not in domain_data:
        connection.send_error(msg["id"], "not_found", "Inverter not found or disabled")
        return

    start = dt_util.as_utc(msg["start"])
    end = dt_util.as_utc(msg["end"])
    if end <= start:
        connection.send_error(
            msg["id"], "invalid_window", "Window end must be later than its start"
        )
        return

    window, clamped = clamp_window(start, end)
    cache = domain_data[entry.entry_id][DATA_CACHE]
    key = (kind, entry.entry_id, window.start.isoformat(), window.end.isoformat())

    payload = cache.get(key)
    if payload is None:
        try:
            payload = await compute(hass, EntryConfig.from_entry(entry), window)
        except ValueError as err:
            connection.send_error(msg["id"], "invalid_config", str(err))
            return
        cache.set(key, payload, ttl=_ttl_for(window))

    connection.send_result(
        msg["id"],
        payload
        | {
            "window": {"start": window.start.isoformat(), "end": window.end.isoformat()},
            "clamped": clamped,
        },
    )


@websocket_api.websocket_command(
    {vol.Required("type"): "inverter_analytics/load", **_WINDOW_SCHEMA}
)
@websocket_api.async_response
async def ws_load(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the load analytics for a window."""
    await _async_windowed_response(hass, connection, msg, "load", async_load_analytics)


@websocket_api.websocket_command(
    {vol.Required("type"): "inverter_analytics/battery", **_WINDOW_SCHEMA}
)
@websocket_api.async_response
async def ws_battery(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the battery analytics for a window."""
    await _async_windowed_response(hass, connection, msg, "battery", async_battery_analytics)


@websocket_api.websocket_command(
    {vol.Required("type"): "inverter_analytics/seasonality", **_WINDOW_SCHEMA}
)
@websocket_api.async_response
async def ws_seasonality(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the seasonality analytics for a window."""
    await _async_windowed_response(
        hass, connection, msg, "seasonality", async_seasonality_analytics
    )


@websocket_api.websocket_command(
    {vol.Required("type"): "inverter_analytics/balance", **_WINDOW_SCHEMA}
)
@websocket_api.async_response
async def ws_balance(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the energy balance for a window."""
    await _async_windowed_response(hass, connection, msg, "balance", async_balance_analytics)
