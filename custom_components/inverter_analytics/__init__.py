"""The Inverter Analytics integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.start import async_at_started

from .analytics.cache import ResultCache
from .const import CONF_ENTITIES, CONF_INVERTED, CONF_NUMBERS, DATA_CACHE, DOMAIN
from .issues import async_check_entry, async_clear_issues
from .panel import async_register_panel, async_remove_panel
from .roles import normalise_entity_ids, tuning_role_keys
from .websocket_api import async_register


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Bring an entry written by an older version up to the current shape."""
    if entry.version > 1:
        # Written by a newer version of the integration than the one running:
        # its shape is unknown here, and guessing at it would corrupt a
        # working configuration. Failing leaves the entry untouched.
        return False

    if entry.minor_version < 2:
        _migrate_to_1_2(hass, entry)

    return True


def _migrate_to_1_2(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Split the mapping from the tuning thresholds.

    Until now the options flow rewrote the entire configuration, and options
    replaced data wholesale — so the mapping lived in whichever of the two was
    written last. Options is now the four thresholds and nothing else, which
    means a stale copy of the mapping left in options would have overridden
    every later change made through reconfigure.

    The source is options where the user ever opened the options form and data
    otherwise, which is exactly what the old read did.
    """
    current = dict(entry.options) if entry.options else dict(entry.data)
    numbers = dict(current.get(CONF_NUMBERS) or {})
    tuning_keys = tuning_role_keys()

    # Entries created before a role could hold several entities store a bare
    # string where the rest store a list. normalise_entity_ids has absorbed
    # that at every read since, and goes on doing so — a config dict reaches
    # it from tests and from flows as well as from storage. What it could not
    # do was fix the stored entry, because nothing rewrote one the user never
    # reopened. This does, so the shape on disk is uniform from here on and
    # the compatibility is a safety net rather than the mechanism.
    entities = {
        role: list(normalise_entity_ids(value))
        for role, value in (current.get(CONF_ENTITIES) or {}).items()
    }

    hass.config_entries.async_update_entry(
        entry,
        data={
            CONF_ENTITIES: {role: ids for role, ids in entities.items() if ids},
            CONF_NUMBERS: {key: value for key, value in numbers.items() if key not in tuning_keys},
            CONF_INVERTED: current.get(CONF_INVERTED) or [],
        },
        options={
            CONF_NUMBERS: {key: value for key, value in numbers.items() if key in tuning_keys}
        },
        minor_version=2,
    )


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {DATA_CACHE: ResultCache()}
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    async_register(hass)
    await async_register_panel(hass)

    # Deferred until the rest of Home Assistant is up. At this point the
    # entity registry is still filling, and a check for sensors that no longer
    # exist would report every one belonging to an integration that loads
    # after this one. On a reload — which is what follows a reconfigure — this
    # runs immediately, so a fix is reflected as soon as it is made.
    #
    # Decorated rather than passed as a lambda: an undecorated callable is
    # taken for blocking work and run in an executor, and the issue registry
    # refuses to be touched from off the event loop.
    @callback
    def _check_issues(_: HomeAssistant) -> None:
        async_check_entry(hass, entry)

    entry.async_on_unload(async_at_started(hass, _check_issues))
    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Drop anything raised about an inverter that has been deleted."""
    async_clear_issues(hass, entry)


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
