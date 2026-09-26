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
    DEFAULT_GRID_ZERO_W,
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
    grid_candidates,
)
from .presets import CT_CHOICES
from .remap import fill, matching_cluster, offered_ids, open_ambiguities, unlocked_by
from .roles import (
    ROLES_BY_KEY,
    EntryConfig,
    Role,
    RoleKind,
    entity_roles,
    normalise_entity_ids,
    number_roles,
)

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
    "grid_zero_w": DEFAULT_GRID_ZERO_W,
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


def _option_label(key: str, entities: tuple[str, ...]) -> str:
    """One option's text, carrying the sensor count where that distinguishes it.

    The count tells the clamp sets apart: an incomplete set raises the question
    too, and two phases against three is the only thing between them. A
    grid-presence option is one entity id, which already names itself, and
    "(1 sensors)" beside it would be noise.
    """
    if key in CT_CHOICES:
        return f"{CT_CHOICES[key]} ({len(entities)} sensors)"
    return key


def _ambiguity_selector(ambiguity: Ambiguity) -> selector.SelectSelector:
    """The picker for one question the data could not settle."""
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=[
                selector.SelectOptionDict(value=key, label=_option_label(key, entities))
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


def _marked(role: Role, defaults: Mapping[str, Any]) -> Any:
    """The voluptuous key for one role, pre-filled where there is a value.

    `suggested_value`, not `default=`, matters here: the frontend omits an
    optional field from the submission precisely when the user clears it, and
    `default=` would then silently restore the old value instead of accepting
    the clear (see commit 08fb537). A real frontend always resubmits an
    untouched, pre-filled field's current contents, so `suggested_value` alone
    is enough for that case.
    """
    marker = vol.Required if role.required else vol.Optional
    if role.key not in defaults:
        return marker(role.key)
    return marker(role.key, description={"suggested_value": defaults[role.key]})


def build_schema(
    defaults: Mapping[str, Any] | None = None,
    *,
    name: bool = True,
    mapping: bool = True,
    tuning: bool = False,
) -> vol.Schema:
    """Build the flat form schema in one of the shapes it is asked for.

    The wizard and the reconfigure form ask for the mapping — which sensor is
    which, and the numbers off the nameplate. The options form asks for the
    tuning thresholds instead: they have defensible defaults and nobody should
    have to answer them before seeing a single chart.

    Reconfigure leaves the name out. Renaming is a preference rather than a
    fact about the hardware, and it stays in options next to the other
    preferences; a field in both places would let two forms disagree.
    """
    defaults = defaults or {}
    fields: dict[Any, Any] = {}

    if name:
        fields[vol.Required(CONF_NAME, default=defaults.get(CONF_NAME, "Inverter"))] = (
            selector.TextSelector()
        )

    for role in number_roles():
        if not (tuning if role.advanced else mapping):
            continue
        fields[_marked(role, defaults)] = selector.NumberSelector(
            selector.NumberSelectorConfig(
                min=0,
                step="any",
                mode=selector.NumberSelectorMode.BOX,
                unit_of_measurement=role.unit,
            )
        )

    if mapping:
        for role in entity_roles():
            fields[_marked(role, defaults)] = _entity_selector(role.kind, role.multiple)

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


def _tuning_numbers(user_input: Mapping[str, Any]) -> dict[str, float]:
    """Read the tuning form back into the numbers dict options holds.

    A cleared field arrives as absent or empty and is dropped rather than
    stored as zero: absent means "use the default", and a zero imbalance floor
    would silently mean something quite different.
    """
    return {
        key: float(value)
        for key, value in user_input.items()
        if key != CONF_NAME and key in ROLES_BY_KEY and value not in (None, "")
    }


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


def _describe_fill(config: EntryConfig, filled: Mapping[str, Any]) -> str:
    """What running detection against an existing entry actually turned up.

    Naming the tab is the part that answers the user's real question. Six
    entity ids appearing in a form say nothing about why they are worth
    having; "this enables Energy balance" does.
    """
    if not filled:
        return (
            "Detection found nothing this inverter is not already mapped to. "
            "Choose manual mapping to change what is there."
        )
    count = len(filled)
    noun = "sensor" if count == 1 else "sensors"
    sentence = f"Detection found {count} {noun} this inverter is not mapped to yet."
    unlocked = unlocked_by(config, filled)
    if unlocked:
        sentence += f" Mapping {'it' if count == 1 else 'them'} enables: {', '.join(unlocked)}."
    return sentence


class InverterAnalyticsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Wizard for adding an inverter."""

    VERSION = 1
    # 1.2 moved the mapping into entry.data and left options holding only the
    # tuning thresholds; see async_migrate_entry.
    MINOR_VERSION = 2

    def __init__(self) -> None:
        """Hold what discovery found between steps."""
        self._detection: Detection | None = None

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Offer the inverters found in this installation."""
        sensors = collect_sensors(self.hass)
        clusters = cluster_sensors(sensors)
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
            self._detection = classify(cluster, grid_candidates(sensors))
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

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Offer to run detection again, or to edit the mapping by hand.

        This is the step the options form could never be. An entry mapped
        before a role existed cannot learn about it on its own: detection
        already knows how to find that sensor, it was simply unreachable
        after setup. Running it here against the entry's own cluster fills
        what is empty and leaves what is not alone.
        """
        entry = self._get_reconfigure_entry()
        config = EntryConfig.from_entry(entry)
        sensors = collect_sensors(self.hass)
        cluster = matching_cluster(cluster_sensors(sensors), config)
        self._detection = (
            classify(cluster, grid_candidates(sensors)) if cluster is not None else None
        )

        # With nothing to add, the menu would offer a choice between doing
        # nothing and mapping by hand. Go straight to the form.
        filled = fill(self._detection, config)
        if not filled:
            return await self.async_step_reconfigure_manual()

        return self.async_show_menu(
            step_id="reconfigure",
            menu_options=["reconfigure_detected", "reconfigure_manual"],
            description_placeholders={"found": _describe_fill(config, filled)},
        )

    async def async_step_reconfigure_detected(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show the current mapping with the empty roles detection could fill."""
        entry = self._get_reconfigure_entry()
        config = EntryConfig.from_entry(entry)
        if self._detection is None:
            return await self.async_step_reconfigure_manual()
        detection = self._detection
        ambiguities = open_ambiguities(detection, config)

        if user_input is not None:
            return self._finish_reconfigure(entry, user_input, ambiguities)

        filled = fill(detection, config)
        fields: dict[Any, Any] = {}
        by_role = {ambiguity.role: ambiguity for ambiguity in ambiguities}
        for key, value in build_schema(unpack(entry.data) | filled, name=False).schema.items():
            role_key = str(getattr(key, "schema", key))
            ambiguity = by_role.get(role_key)
            if ambiguity is None:
                fields[key] = value
                continue
            fields[vol.Required(ambiguity.key)] = _ambiguity_selector(ambiguity)

        return self.async_show_form(
            step_id="reconfigure_detected",
            data_schema=vol.Schema(fields),
            description_placeholders={
                "found": _describe_fill(config, filled),
                # Only about the sensors this step is proposing. The warning
                # is a reason to think twice before accepting them; repeating
                # it for entities the user mapped long ago turns it into
                # noise attached to a decision already made.
                "no_statistics": _describe_missing_statistics(
                    tuple(
                        item for item in detection.without_statistics if item in offered_ids(filled)
                    )
                ),
            },
        )

    async def async_step_reconfigure_manual(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit the whole mapping by hand, pre-filled with what is in force."""
        entry = self._get_reconfigure_entry()
        if user_input is not None:
            return self._finish_reconfigure(entry, user_input, ())
        return self.async_show_form(
            step_id="reconfigure_manual",
            data_schema=build_schema(unpack(entry.data), name=False),
        )

    def _finish_reconfigure(
        self,
        entry: ConfigEntry,
        user_input: Mapping[str, Any],
        ambiguities: Sequence[Ambiguity],
    ) -> ConfigFlowResult:
        """Write the new mapping and reload.

        Only `data` is replaced. The tuning thresholds live in `options` and
        are not on this form, so passing them through would mean carrying a
        copy of every value the user set elsewhere just to avoid erasing it.
        """
        packed = pack(user_input)
        for ambiguity in ambiguities:
            choice = user_input.get(ambiguity.key)
            if choice:
                packed[CONF_ENTITIES][ambiguity.role] = list(ambiguity.options[choice])
        return self.async_update_reload_and_abort(entry, data=packed)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return InverterAnalyticsOptionsFlow()


class InverterAnalyticsOptionsFlow(OptionsFlow):
    """What the inverter is called and where its thresholds sit.

    The sensor mapping used to be here too, in the same form — twenty-two
    fields, of which four were the ones an installation that already worked
    ever came back to change. It now lives in the reconfigure flow, one item
    away in the same menu, where detection can help fill it in.
    """

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show the form pre-filled with the values actually in force."""
        if user_input is not None:
            # Title and options are written together on purpose. Updating the
            # title separately fires the update listener, and Home Assistant
            # fires it again for the options write that follows — reloading the
            # integration twice for one rename. Writing both here means Home
            # Assistant's own write finds nothing changed and stays quiet.
            options = {CONF_NUMBERS: _tuning_numbers(user_input)}
            self.hass.config_entries.async_update_entry(
                self.config_entry, title=user_input[CONF_NAME], options=options
            )
            return self.async_create_entry(title="", data=options)

        current = (self.config_entry.options or {}).get(CONF_NUMBERS) or {}
        defaults = _TUNING_DEFAULTS | dict(current) | {CONF_NAME: self.config_entry.title}
        return self.async_show_form(
            step_id="init", data_schema=build_schema(defaults, mapping=False, tuning=True)
        )
