"""The Inverter Analytics integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .analytics.cache import ResultCache
from .const import DATA_CACHE, DOMAIN
from .panel import async_register_panel, async_remove_panel
from .websocket_api import async_register


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {DATA_CACHE: ResultCache()}
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    async_register(hass)
    await async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    domain_data = hass.data.get(DOMAIN, {})
    domain_data.pop(entry.entry_id, None)
    if not _has_remaining_entries(hass):
        async_remove_panel(hass)
    return True


def _has_remaining_entries(hass: HomeAssistant) -> bool:
    """Whether any loaded entries of this integration remain."""
    domain_data = hass.data.get(DOMAIN, {})
    return any(entry.entry_id in domain_data for entry in hass.config_entries.async_entries(DOMAIN))


async def _async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry after its options change."""
    await hass.config_entries.async_reload(entry.entry_id)
