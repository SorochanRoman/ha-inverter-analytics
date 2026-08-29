"""Константи інтеграції Inverter Analytics."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "inverter_analytics"

PANEL_URL_PATH: Final = "inverter-analytics"
PANEL_TITLE: Final = "Аналітика інвертора"
PANEL_ICON: Final = "mdi:chart-box-outline"

STATIC_URL_BASE: Final = "/inverter_analytics_static"
PANEL_BUNDLE: Final = "inverter-analytics-panel.js"
PANEL_ELEMENT: Final = "inverter-analytics-panel"

DATA_CACHE: Final = "cache"

CONF_ENTITIES: Final = "entities"
CONF_NUMBERS: Final = "numbers"
CONF_INVERTED: Final = "inverted"
