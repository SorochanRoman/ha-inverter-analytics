"""Registration of the Inverter Analytics custom panel."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.loader import IntegrationNotLoaded, async_get_loaded_integration

from .const import (
    DOMAIN,
    PANEL_BUNDLE,
    PANEL_ELEMENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
)

_DATA_STATIC_REGISTERED = "static_registered"


def _bundle_url(hass: HomeAssistant) -> str:
    """The panel bundle's URL, carrying the version that produced it.

    Without it the URL never changes, so a browser that has the file cached
    keeps running the previous release's panel after an upgrade — silently,
    with no error and no hint that a reload is needed. Home Assistant's own
    frontend versions its assets for the same reason.

    The version is read from the manifest, which is what an upgrade bumps.
    Falling back to the plain URL keeps the panel working if it cannot be
    read; a stale bundle is better than no panel.
    """
    try:
        version = async_get_loaded_integration(hass, DOMAIN).version
    except (IntegrationNotLoaded, KeyError):
        version = None
    return f"{STATIC_URL_BASE}/{PANEL_BUNDLE}" + (f"?v={version}" if version else "")


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the static files and the sidebar entry. Idempotent."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    if not domain_data.get(_DATA_STATIC_REGISTERED):
        dist = Path(__file__).parent / "frontend" / "dist"
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, str(dist), False)]
        )
        domain_data[_DATA_STATIC_REGISTERED] = True

    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        return

    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        frontend_url_path=PANEL_URL_PATH,
        require_admin=False,
        config={
            "_panel_custom": {
                "name": PANEL_ELEMENT,
                "module_url": _bundle_url(hass),
                "embed_iframe": False,
                "trust_external": False,
            }
        },
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    """Remove the sidebar entry. The static path stays registered — aiohttp can't unregister it."""
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
