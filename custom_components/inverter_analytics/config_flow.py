"""Майстер налаштування Inverter Analytics."""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers import selector
import voluptuous as vol

from .const import CONF_ENTITIES, CONF_INVERTED, CONF_NUMBERS, DOMAIN
from .roles import ROLES_BY_KEY, RoleKind, entity_roles, number_roles

CONF_NAME = "name"
INVERT_PREFIX = "invert_"

_DEVICE_CLASS_BY_KIND = {
    RoleKind.POWER: "power",
    RoleKind.PERCENT: "battery",
    RoleKind.ENERGY: "energy",
}


def _entity_selector(kind: RoleKind) -> selector.EntitySelector:
    """Пікер entity, звужений за device_class там, де це доречно."""
    if kind is RoleKind.BINARY:
        return selector.EntitySelector(selector.EntitySelectorConfig(domain="binary_sensor"))
    return selector.EntitySelector(
        selector.EntitySelectorConfig(domain="sensor", device_class=_DEVICE_CLASS_BY_KIND[kind])
    )


def build_schema(defaults: Mapping[str, Any] | None = None) -> vol.Schema:
    """Побудувати плоску схему форми маппінгу."""
    defaults = defaults or {}
    fields: dict[Any, Any] = {
        vol.Required(
            CONF_NAME, default=defaults.get(CONF_NAME, "Інвертор")
        ): selector.TextSelector()
    }

    for role in number_roles():
        marker = vol.Required if role.required else vol.Optional
        key = (
            marker(role.key, description={"suggested_value": defaults[role.key]})
            if role.key in defaults
            else marker(role.key)
        )
        fields[key] = selector.NumberSelector(
            selector.NumberSelectorConfig(
                min=0,
                step="any",
                mode=selector.NumberSelectorMode.BOX,
                unit_of_measurement=role.unit,
            )
        )

    for role in entity_roles():
        marker = vol.Required if role.required else vol.Optional
        key = (
            marker(role.key, description={"suggested_value": defaults[role.key]})
            if role.key in defaults
            else marker(role.key)
        )
        fields[key] = _entity_selector(role.kind)

    for role in entity_roles():
        if not role.invertible:
            continue
        flag = f"{INVERT_PREFIX}{role.key}"
        fields[vol.Optional(flag, default=bool(defaults.get(flag, False)))] = (
            selector.BooleanSelector()
        )

    return vol.Schema(fields)


def pack(user_input: Mapping[str, Any]) -> dict[str, Any]:
    """Перетворити плоску форму у вкладений формат ConfigEntry.data."""
    entities: dict[str, str] = {}
    numbers: dict[str, float] = {}
    inverted: list[str] = []

    for key, value in user_input.items():
        if key == CONF_NAME:
            continue
        if key.startswith(INVERT_PREFIX):
            if value:
                inverted.append(key.removeprefix(INVERT_PREFIX))
            continue
        role = ROLES_BY_KEY.get(key)
        if role is None or value in (None, ""):
            continue
        if role.kind is RoleKind.NUMBER:
            numbers[key] = float(value)
        else:
            entities[key] = str(value)

    return {CONF_ENTITIES: entities, CONF_NUMBERS: numbers, CONF_INVERTED: sorted(inverted)}


def unpack(config: Mapping[str, Any]) -> dict[str, Any]:
    """Перетворити вкладений формат назад у плоску форму."""
    flat: dict[str, Any] = {}
    flat.update(config.get(CONF_ENTITIES) or {})
    flat.update(config.get(CONF_NUMBERS) or {})
    for key in config.get(CONF_INVERTED) or ():
        flat[f"{INVERT_PREFIX}{key}"] = True
    return flat


class InverterAnalyticsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Майстер додавання інвертора."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Крок ручного маппінгу."""
        if user_input is not None:
            return self.async_create_entry(title=user_input[CONF_NAME], data=pack(user_input))
        return self.async_show_form(step_id="user", data_schema=build_schema())

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Повернути options flow."""
        return InverterAnalyticsOptionsFlow()


class InverterAnalyticsOptionsFlow(OptionsFlow):
    """Переналаштування маппінгу без перевстановлення."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Показати форму з поточними значеннями."""
        if user_input is not None:
            name = user_input[CONF_NAME]
            if name != self.config_entry.title:
                self.hass.config_entries.async_update_entry(self.config_entry, title=name)
            return self.async_create_entry(title="", data=pack(user_input))

        current = self.config_entry.options or self.config_entry.data
        defaults = unpack(current) | {CONF_NAME: self.config_entry.title}
        return self.async_show_form(step_id="init", data_schema=build_schema(defaults))
