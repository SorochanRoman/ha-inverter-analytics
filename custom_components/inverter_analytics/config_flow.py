"""Майстер налаштування Inverter Analytics.

Заглушка: повна реалізація з маппінгом сенсорів — Task 3. Файл існує вже тут,
бо Home Assistant імпортує платформу config_flow під час налаштування будь-якого
config entry, ще до виклику async_setup_entry, і без неї запис отримує
SETUP_ERROR.
"""

from __future__ import annotations

from homeassistant.config_entries import ConfigFlow

from .const import DOMAIN


class InverterAnalyticsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Майстер додавання інвертора."""

    VERSION = 1
