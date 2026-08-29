"""Registration of the Inverter Analytics custom panel."""

from __future__ import annotations

import hashlib
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

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


def _bundle_fingerprint(dist: Path) -> str | None:
    """A short digest of the bundle's contents.

    The URL has to change when the file does, or a browser holding the old copy
    keeps running the previous panel after an upgrade — silently, with no error
    and no hint that a reload would help.

    Content rather than the manifest version: the version only moves between
    releases, so it does nothing for anyone tracking a branch, and nothing
    during development. This was found by twice failing to see a fix take
    effect, once after a hard reload.
    """
    bundle = dist / PANEL_BUNDLE
    try:
        return hashlib.sha256(bundle.read_bytes()).hexdigest()[:12]
    except OSError:
        # A missing or unreadable bundle is the static handler's problem to
        # report; serving the panel unversioned beats not serving it.
        return None


def _bundle_url(dist: Path) -> str:
    """The panel bundle's URL, carrying a fingerprint of what it contains."""
    fingerprint = _bundle_fingerprint(dist)
    return f"{STATIC_URL_BASE}/{PANEL_BUNDLE}" + (f"?v={fingerprint}" if fingerprint else "")


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the static files and the sidebar entry. Idempotent."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    dist = Path(__file__).parent / "frontend" / "dist"

    if not domain_data.get(_DATA_STATIC_REGISTERED):
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
                "module_url": _bundle_url(dist),
                "embed_iframe": False,
                "trust_external": False,
            }
        },
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    """Remove the sidebar entry. The static path stays registered — aiohttp can't unregister it."""
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
