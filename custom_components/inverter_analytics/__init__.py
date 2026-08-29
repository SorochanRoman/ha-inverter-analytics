"""Інтеграція Inverter Analytics."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .panel import async_register_panel, async_remove_panel


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Налаштувати config entry."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {}
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    await async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Вивантажити config entry."""
    domain_data = hass.data.get(DOMAIN, {})
    domain_data.pop(entry.entry_id, None)
    if not _has_remaining_entries(hass):
        async_remove_panel(hass)
    return True


def _has_remaining_entries(hass: HomeAssistant) -> bool:
    """Чи лишилися завантажені записи цієї інтеграції."""
    domain_data = hass.data.get(DOMAIN, {})
    return any(entry.entry_id in domain_data for entry in hass.config_entries.async_entries(DOMAIN))


async def _async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Перезавантажити запис після зміни опцій."""
    await hass.config_entries.async_reload(entry.entry_id)
