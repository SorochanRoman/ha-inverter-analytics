"""Спільні фікстури тестів."""

import logging

pytest_plugins = "pytest_homeassistant_custom_component"


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
