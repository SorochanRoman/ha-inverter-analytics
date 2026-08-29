"""Спільні фікстури тестів."""

import logging

import aiohttp.connector
import aiohttp.resolver

pytest_plugins = "pytest_homeassistant_custom_component"

# homeassistant жорстко залежить від aiodns на macOS/Linux, тому aiohttp
# обирає AsyncResolver типовим резолвером. pycares 5.x створює для нього
# фоновий потік ("_run_safe_shutdown_loop") уже в момент побудови
# TCPConnector — до будь-якого реального DNS-запиту (hass_ws_client і
# aiohttp_client з'єднуються з 127.0.0.1, де резолвер узагалі не потрібен).
# Перевірка "не лишилось фонових потоків" у pytest_homeassistant_custom_component
# бачить цей потік як витік і валить тест на teardown, хоча сам тест
# пройшов. ThreadedResolver використовує лише loop.getaddrinfo і жодних
# фонових потоків не заводить. Продакшн-код інтеграції з aiohttp напряму
# не працює, тож підміна безпечна й стосується лише тестового процесу.
aiohttp.connector.DefaultResolver = aiohttp.resolver.ThreadedResolver


def pytest_configure(config):
    """Настройка логування: приховати INFO/DEBUG від залежностей.

    pytest_homeassistant_custom_component явно встановлює sqlalchemy.engine
    на INFO рівень, що призводить до витоку логів у тестовому виводі CI.
    Також потрібно придушити DEBUG логи від Home Assistant recorder pool.
    Цей хук запускається після завантаження плагінів, тому він може
    перевизначити рівні логування для цих конкретних логерів.
    """
    sqlalchemy_logger = logging.getLogger("sqlalchemy.engine")
    sqlalchemy_logger.setLevel(logging.WARNING)
    recorder_logger = logging.getLogger("homeassistant.components.recorder.pool")
    recorder_logger.setLevel(logging.WARNING)
