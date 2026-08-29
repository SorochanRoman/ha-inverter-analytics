"""WebSocket API інтеграції Inverter Analytics."""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util
import voluptuous as vol

from .analytics.load import async_load_analytics
from .analytics.source import Window, raw_available_from
from .const import DATA_CACHE, DOMAIN
from .roles import EntryConfig

MAX_WINDOW_DAYS = 400
FRESH_TTL = 60.0
HISTORICAL_TTL = 86400.0
FRESH_MARGIN = timedelta(minutes=5)

_DATA_WS_REGISTERED = "ws_registered"


def clamp_window(start: datetime, end: datetime) -> tuple[Window, bool]:
    """Обрізати надто довге вікно. Повертає вікно й ознаку обрізання."""
    limit = timedelta(days=MAX_WINDOW_DAYS)
    if end - start > limit:
        return Window(end - limit, end), True
    return Window(start, end), False


def _ttl_for(window: Window) -> float:
    """Свіжі вікна кешуються ненадовго, закриті історичні — на добу."""
    if window.end >= dt_util.utcnow() - FRESH_MARGIN:
        return FRESH_TTL
    return HISTORICAL_TTL


@callback
def async_register(hass: HomeAssistant) -> None:
    """Зареєструвати команди один раз на весь Home Assistant."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if domain_data.get(_DATA_WS_REGISTERED):
        return
    websocket_api.async_register_command(hass, ws_config)
    websocket_api.async_register_command(hass, ws_load)
    domain_data[_DATA_WS_REGISTERED] = True


@websocket_api.websocket_command({vol.Required("type"): "inverter_analytics/config"})
@callback
def ws_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Повернути маппінг усіх налаштованих інверторів."""
    entries = []
    for entry in hass.config_entries.async_entries(DOMAIN):
        config = EntryConfig.from_entry(entry)
        entries.append(
            {
                "entry_id": entry.entry_id,
                "title": entry.title,
                "entities": dict(config.entities),
                "numbers": dict(config.numbers),
                "inverted": sorted(config.inverted),
            }
        )

    connection.send_result(
        msg["id"],
        {"entries": entries, "raw_available_from": raw_available_from(hass).isoformat()},
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "inverter_analytics/load",
        vol.Required("entry_id"): str,
        vol.Required("start"): cv.datetime,
        vol.Required("end"): cv.datetime,
    }
)
@websocket_api.async_response
async def ws_load(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Повернути аналітику навантаження за вікно."""
    domain_data = hass.data.get(DOMAIN, {})
    entry = hass.config_entries.async_get_entry(msg["entry_id"])
    # async_get_entry повертає запис у будь-якому стані, включно з вимкненим
    # вручну в UI — зникає лише запис, який повністю видалили. Належність до
    # domain_data — це саме умова, за якої існує кеш, який читає цей обробник.
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
    cache = hass.data[DOMAIN][entry.entry_id][DATA_CACHE]
    key = ("load", entry.entry_id, window.start.isoformat(), window.end.isoformat())

    payload = cache.get(key)
    if payload is None:
        try:
            payload = await async_load_analytics(hass, EntryConfig.from_entry(entry), window)
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
