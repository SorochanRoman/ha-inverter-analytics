"""Constants for the Inverter Analytics integration."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "inverter_analytics"

PANEL_URL_PATH: Final = "inverter-analytics"
PANEL_TITLE: Final = "Inverter Analytics"
PANEL_ICON: Final = "mdi:chart-box-outline"

STATIC_URL_BASE: Final = "/inverter_analytics_static"
PANEL_BUNDLE: Final = "inverter-analytics-panel.js"
PANEL_ELEMENT: Final = "inverter-analytics-panel"

DATA_CACHE: Final = "cache"

CONF_ENTITIES: Final = "entities"
CONF_NUMBERS: Final = "numbers"
CONF_INVERTED: Final = "inverted"

# Starting points, not claims about a particular installation: both are
# editable in the integration's options. The floor exists because a 5 W spread
# across phases at 20 W of night-time load is a 25% imbalance — true, and
# meaningless. Without it the histogram would scream every night.
DEFAULT_IMBALANCE_FLOOR_PCT: Final = 5.0
DEFAULT_IMBALANCE_THRESHOLD_PCT: Final = 30.0
