"""Registration of the Inverter Analytics custom panel."""

from __future__ import annotations

import hashlib
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    CARD_BUNDLE,
    DOMAIN,
    PANEL_BUNDLE,
    PANEL_ELEMENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
)

_DATA_STATIC_REGISTERED = "static_registered"
# The card URL that was added, kept so that removal passes the same string:
# the fingerprint would differ if the bundle changed on disk in between.
_DATA_CARD_URL = "card_url"


def _bundle_fingerprint(dist: Path, name: str) -> str | None:
    """A short digest of a bundle's contents.

    The URL has to change when the file does, or a browser holding the old copy
    keeps running the previous panel after an upgrade — silently, with no error
    and no hint that a reload would help.

    Content rather than the manifest version: the version only moves between
    releases, so it does nothing for anyone tracking a branch, and nothing
    during development. This was found by twice failing to see a fix take
    effect, once after a hard reload.
    """
    bundle = dist / name
    try:
        return hashlib.sha256(bundle.read_bytes()).hexdigest()[:12]
    except OSError:
        # A missing or unreadable bundle is the static handler's problem to
        # report; serving the panel unversioned beats not serving it.
        return None


def _bundle_url(dist: Path, name: str) -> str:
    """A bundle's URL, carrying a fingerprint of what it contains."""
    fingerprint = _bundle_fingerprint(dist, name)
    return f"{STATIC_URL_BASE}/{name}" + (f"?v={fingerprint}" if fingerprint else "")


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the static files, the dashboard card and the sidebar entry. Idempotent."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    dist = Path(__file__).parent / "frontend" / "dist"

    if not domain_data.get(_DATA_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, str(dist), False)]
        )
        domain_data[_DATA_STATIC_REGISTERED] = True

    # Lovelace only knows a custom card whose script it has loaded, and it loads
    # these on every dashboard. Once per Home Assistant: each add tells every
    # open frontend to load the script again.
    if not domain_data.get(_DATA_CARD_URL):
        card_url = _bundle_url(dist, CARD_BUNDLE)
        frontend.add_extra_js_url(hass, card_url)
        domain_data[_DATA_CARD_URL] = card_url

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
                "module_url": _bundle_url(dist, PANEL_BUNDLE),
                "embed_iframe": False,
                "trust_external": False,
            }
        },
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    """Remove the sidebar entry and the dashboard card.

    The static path stays registered — aiohttp can't unregister it.
    """
    card_url = hass.data.get(DOMAIN, {}).pop(_DATA_CARD_URL, None)
    if card_url:
        frontend.remove_extra_js_url(hass, card_url)
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
