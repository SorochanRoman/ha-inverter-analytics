"""Inverter Analytics setup wizard."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from typing import Any

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers import selector
import voluptuous as vol

from .const import (
    CONF_ENTITIES,
    CONF_INVERTED,
    CONF_NUMBERS,
    DEFAULT_BATTERY_IDLE_W,
    DEFAULT_BATTERY_LOW_PCT,
    DEFAULT_IMBALANCE_FLOOR_PCT,
    DEFAULT_IMBALANCE_THRESHOLD_PCT,
    DOMAIN,
)
from .detect import (
    Ambiguity,
    Cluster,
    Detection,
    classify,
    cluster_sensors,
    collect_sensors,
)
from .presets import CT_CHOICES
from .roles import ROLES_BY_KEY, RoleKind, entity_roles, normalise_entity_ids, number_roles

CONF_NAME = "name"
INVERT_PREFIX = "invert_"
CONF_SOURCE = "source"
MANUAL = "manual"

# Shown pre-filled so the options form states the value actually in force,
# rather than an empty box the user has to guess the meaning of.
_TUNING_DEFAULTS = {
    "imbalance_floor_pct": DEFAULT_IMBALANCE_FLOOR_PCT,
    "imbalance_threshold_pct": DEFAULT_IMBALANCE_THRESHOLD_PCT,
    "battery_low_pct": DEFAULT_BATTERY_LOW_PCT,
    "battery_idle_w": DEFAULT_BATTERY_IDLE_W,
}

_DEVICE_CLASS_BY_KIND = {
    RoleKind.POWER: "power",
    RoleKind.PERCENT: "battery",
    RoleKind.ENERGY: "energy",
}


def _describe_missing_statistics(entity_ids: Sequence[str]) -> str:
    """Warn about sensors Home Assistant keeps no long-term statistics for.

    Without a state_class there is no hourly history, so any window longer than
    the recorder's retention comes back empty. Saying so during setup is much
    cheaper than the user discovering it a month later.
    """
    if not entity_ids:
        return ""
    listed = ", ".join(entity_ids)
    return (
        "These sensors have no state_class, so Home Assistant keeps no long-term "
        f"statistics for them and long periods will show no data: {listed}."
    )


def _cluster_label(cluster: Cluster) -> str:
    """Describe a candidate honestly enough that a bad one is recognisable.

    A shared name prefix can group a fraction of an installation — five battery
    sensors of a Deye whose other entities are named differently clear the
    floor on their own and read as "Deye2 Battery, 5 sensors". Setup cannot be
    completed from that group, because the load sensor is required and is not
    in it, so the label says as much rather than letting the option look like a
    recognised inverter.
    """
    suffix = "" if classify(cluster).is_complete else " — no load sensor found"
    return f"{cluster.label} — {len(cluster.sensors)} sensors{suffix}"


def _ambiguity_selector(ambiguity: Ambiguity) -> selector.SelectSelector:
    """The picker for one question the data could not settle.

    The number of sensors is part of the label: an incomplete clamp set still
    raises the question, and the option that carries two phases where the other
    carries three is otherwise indistinguishable from it.
    """
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=[
                selector.SelectOptionDict(
                    value=key,
                    label=f"{CT_CHOICES.get(key, key)} ({len(entities)} sensors)",
                )
                for key, entities in ambiguity.options.items()
            ]
        )
    )


def _entity_selector(kind: RoleKind, multiple: bool = False) -> selector.EntitySelector:
    """Entity picker, narrowed by device_class where that makes sense."""
    if kind is RoleKind.BINARY:
        return selector.EntitySelector(
            selector.EntitySelectorConfig(domain="binary_sensor", multiple=multiple)
        )
    return selector.EntitySelector(
        selector.EntitySelectorConfig(
            domain="sensor", device_class=_DEVICE_CLASS_BY_KIND[kind], multiple=multiple
        )
    )


def build_schema(defaults: Mapping[str, Any] | None = None, advanced: bool = False) -> vol.Schema:
    """Build the flat mapping-form schema.

    Advanced fields are the tuning thresholds: they have defensible defaults
    and nobody should have to answer them before seeing a single chart, so
    they appear only when reconfiguring an inverter that already works.
    """
    defaults = defaults or {}
    fields: dict[Any, Any] = {
        vol.Required(
            CONF_NAME, default=defaults.get(CONF_NAME, "Inverter")
        ): selector.TextSelector()
    }

    for role in number_roles():
        if role.advanced and not advanced:
            continue
        marker = vol.Required if role.required else vol.Optional
        # `suggested_value`, not `default=`, matters here: the frontend omits
        # an optional field from the submission precisely when the user
        # clears it, and `default=` would then silently restore the old
        # value instead of accepting the clear (see commit 08fb537). A real
        # frontend always resubmits an untouched, pre-filled field's current
        # contents, so `suggested_value` alone is enough for that case.
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
        fields[key] = _entity_selector(role.kind, role.multiple)

    for role in entity_roles():
        if not role.invertible:
            continue
        flag = f"{INVERT_PREFIX}{role.key}"
        fields[vol.Optional(flag, default=bool(defaults.get(flag, False)))] = (
            selector.BooleanSelector()
        )

    return vol.Schema(fields)


def pack(user_input: Mapping[str, Any]) -> dict[str, Any]:
    """Convert the flat form into the nested ConfigEntry.data format."""
    entities: dict[str, list[str]] = {}
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
        if role is None:
            continue
        if role.kind is RoleKind.NUMBER:
            if value in (None, ""):
                continue
            numbers[key] = float(value)
        else:
            # A bare-string picker can submit "" for "nothing chosen"; the brief's
            # `[value] if isinstance(value, str) else ...` treats that as a
            # one-item list holding an empty string, which is truthy and would
            # leak an empty entity id into the packed config. Falling through to
            # the list branch for a falsy string reuses its `if item` filter and
            # naturally produces [] instead, since iterating "" yields nothing.
            ids = [value] if isinstance(value, str) and value else [item for item in value if item]
            if ids:
                entities[key] = ids

    return {CONF_ENTITIES: entities, CONF_NUMBERS: numbers, CONF_INVERTED: sorted(inverted)}


def unpack(config: Mapping[str, Any]) -> dict[str, Any]:
    """Convert the nested format back into the flat form."""
    flat: dict[str, Any] = {}
    for key, ids in (config.get(CONF_ENTITIES) or {}).items():
        role = ROLES_BY_KEY.get(key)
        if role is None:
            continue
        ids = normalise_entity_ids(ids)
        flat[key] = list(ids) if role.multiple else (ids[0] if ids else None)
    flat.update(config.get(CONF_NUMBERS) or {})
    for key in config.get(CONF_INVERTED) or ():
        flat[f"{INVERT_PREFIX}{key}"] = True
    return flat


class InverterAnalyticsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Wizard for adding an inverter."""

    VERSION = 1

    def __init__(self) -> None:
        """Hold what discovery found between steps."""
        self._detection: Detection | None = None

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Offer the inverters found in this installation."""
        clusters = cluster_sensors(collect_sensors(self.hass))
        if not clusters:
            return await self.async_step_manual()

        if user_input is not None:
            if user_input[CONF_SOURCE] == MANUAL:
                return await self.async_step_manual()
            cluster = next((c for c in clusters if c.key == user_input[CONF_SOURCE]), None)
            if cluster is None:
                # The installation changed between rendering the form and
                # submitting it; ask again rather than raising at the user.
                return await self.async_step_user()
            self._detection = classify(cluster)
            return await self.async_step_confirm()

        options = [
            selector.SelectOptionDict(value=cluster.key, label=_cluster_label(cluster))
            for cluster in clusters
        ]
        options.append(selector.SelectOptionDict(value=MANUAL, label="Map sensors manually"))
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SOURCE): selector.SelectSelector(
                        selector.SelectSelectorConfig(options=options)
                    )
                }
            ),
        )

    async def async_step_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show what was detected, ask for what could not be."""
        # Reaching confirm without a detection would mean the flow was driven
        # out of order; send the user back to discovery rather than raising.
        if self._detection is None:
            return await self.async_step_user()
        detection = self._detection

        if user_input is not None:
            packed = pack(user_input)
            for ambiguity in detection.ambiguities:
                choice = user_input.get(ambiguity.key)
                if choice:
                    packed[CONF_ENTITIES][ambiguity.role] = list(ambiguity.options[choice])
            return self.async_create_entry(title=user_input[CONF_NAME], data=packed)

        defaults: dict[str, Any] = {}
        for role_key, ids in detection.mapping.items():
            defaults[role_key] = list(ids) if ROLES_BY_KEY[role_key].multiple else ids[0]

        by_role = {ambiguity.role: ambiguity for ambiguity in detection.ambiguities}
        fields: dict[Any, Any] = {}
        for key, value in build_schema(defaults).schema.items():
            role_key = str(getattr(key, "schema", key))
            ambiguity = by_role.get(role_key)
            if ambiguity is None:
                fields[key] = value
                continue
            # A role settled by a question must not also get a picker: whatever
            # the user typed there would be overwritten by the answer. The
            # question takes the picker's place rather than being appended, so
            # the role's invert checkbox still sits next to a visible field.
            fields[vol.Required(ambiguity.key)] = _ambiguity_selector(ambiguity)

        return self.async_show_form(
            step_id="confirm",
            data_schema=vol.Schema(fields),
            description_placeholders={
                "no_statistics": _describe_missing_statistics(detection.without_statistics)
            },
        )

    async def async_step_manual(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Map every role by hand."""
        if user_input is not None:
            return self.async_create_entry(title=user_input[CONF_NAME], data=pack(user_input))
        return self.async_show_form(step_id="manual", data_schema=build_schema())

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return InverterAnalyticsOptionsFlow()


class InverterAnalyticsOptionsFlow(OptionsFlow):
    """Reconfigure the mapping without reinstalling."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show the form pre-filled with current values."""
        if user_input is not None:
            # Title and options are written together on purpose. Updating the
            # title separately fires the update listener, and Home Assistant
            # fires it again for the options write that follows — reloading the
            # integration twice for one rename. Writing both here means Home
            # Assistant's own write finds nothing changed and stays quiet.
            packed = pack(user_input)
            self.hass.config_entries.async_update_entry(
                self.config_entry, title=user_input[CONF_NAME], options=packed
            )
            return self.async_create_entry(title="", data=packed)

        current = self.config_entry.options or self.config_entry.data
        defaults = _TUNING_DEFAULTS | unpack(current) | {CONF_NAME: self.config_entry.title}
        return self.async_show_form(
            step_id="init", data_schema=build_schema(defaults, advanced=True)
        )
