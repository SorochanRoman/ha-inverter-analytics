"""Tests for panel registration."""

import hashlib
import pathlib
import re
from unittest.mock import patch

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import (
    CARD_BUNDLE,
    DOMAIN,
    PANEL_BUNDLE,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
)


def _entry(title: str) -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title=title,
        data={
            "entities": {"load_power": "sensor.load"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )


async def test_panel_registered_on_setup(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Deye")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]


async def test_panel_removed_when_last_entry_unloaded(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Deye")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH not in hass.data[frontend.DATA_PANELS]


async def test_panel_survives_while_another_entry_remains(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    first, second = _entry("Deye"), _entry("Victron")
    for entry in (first, second):
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(first.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]


async def test_the_bundle_url_changes_when_the_bundle_does(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """An unchanging URL leaves an upgraded browser running the old panel.

    The file is served from one fixed path, so nothing tells the browser its
    contents changed. The user sees the previous release's panel, with no error
    and no hint that a reload would help. Keyed on content rather than the
    manifest version, which does not move for anyone tracking a branch.
    """
    entry = _entry("Inverter")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    panel = hass.data[frontend.DATA_PANELS][PANEL_URL_PATH]
    module_url = panel.config["_panel_custom"]["module_url"]

    bundle = (
        pathlib.Path("custom_components/inverter_analytics/frontend/dist") / PANEL_BUNDLE
    ).read_bytes()
    digest = hashlib.sha256(bundle).hexdigest()[:12]

    assert module_url == f"{STATIC_URL_BASE}/{PANEL_BUNDLE}?v={digest}"


def _card_urls(hass: HomeAssistant) -> set[str]:
    """The extra module URLs of ours that every dashboard loads."""
    return {
        url
        for url in hass.data[frontend.DATA_EXTRA_MODULE_URL].urls
        if url.startswith(f"{STATIC_URL_BASE}/")
    }


async def test_the_card_bundle_loads_on_every_dashboard(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """A dashboard card is no use if its element is never defined.

    Lovelace only knows custom cards whose script it has loaded; without the
    extra module URL the card shows "Custom element doesn't exist". The URL
    carries a fingerprint for the same reason the panel's does.
    """
    entry = _entry("Inverter")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    (url,) = _card_urls(hass)
    assert re.fullmatch(rf"{STATIC_URL_BASE}/{re.escape(CARD_BUNDLE)}\?v=[0-9a-f]{{12}}", url)

    bundle = (
        pathlib.Path("custom_components/inverter_analytics/frontend/dist") / CARD_BUNDLE
    ).read_bytes()
    assert url.endswith(f"?v={hashlib.sha256(bundle).hexdigest()[:12]}")


async def test_two_entries_add_the_card_url_once(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    """Each add tells every open frontend to load the script again."""
    with patch.object(
        frontend, "add_extra_js_url", wraps=frontend.add_extra_js_url
    ) as add_extra_js_url:
        for entry in (_entry("Deye"), _entry("Victron")):
            entry.add_to_hass(hass)
            assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

    assert add_extra_js_url.call_count == 1
    assert len(_card_urls(hass)) == 1


async def test_the_card_url_goes_with_the_last_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    first, second = _entry("Deye"), _entry("Victron")
    for entry in (first, second):
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(first.entry_id)
    await hass.async_block_till_done()
    assert len(_card_urls(hass)) == 1

    assert await hass.config_entries.async_unload(second.entry_id)
    await hass.async_block_till_done()
    assert _card_urls(hass) == set()


async def test_the_card_url_returns_when_an_entry_is_set_up_again(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Inverter")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert len(_card_urls(hass)) == 1
