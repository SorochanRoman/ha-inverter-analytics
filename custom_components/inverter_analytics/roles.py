"""Canonical sensor roles and the entry configuration model."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import dataclass
from enum import StrEnum
import logging
import re
from typing import Any

from homeassistant.config_entries import ConfigEntry

from .const import CONF_ENTITIES, CONF_INVERTED, CONF_NUMBERS

_LOGGER = logging.getLogger(__name__)


class RoleKind(StrEnum):
    """The kind of value a role carries."""

    POWER = "power"
    PERCENT = "percent"
    ENERGY = "energy"
    BINARY = "binary"
    NUMBER = "number"


@dataclass(frozen=True, slots=True)
class Role:
    """Description of a single role."""

    key: str
    kind: RoleKind
    unit: str
    required: bool = False
    invertible: bool = False
    multiple: bool = False
    # Kept out of the setup wizard and offered only when reconfiguring. The
    # wizard is already long enough that users balk at it, and a threshold with
    # a defensible default is exactly the kind of field nobody should have to
    # answer before seeing a single chart.
    advanced: bool = False


ROLES: tuple[Role, ...] = (
    Role("load_power", RoleKind.POWER, "W", required=True),
    Role("load_power_phase", RoleKind.POWER, "W", multiple=True),
    Role("rated_power", RoleKind.NUMBER, "W", required=True),
    Role("rated_power_per_phase", RoleKind.NUMBER, "W"),
    Role("pv_power", RoleKind.POWER, "W"),
    Role("pv_power_string", RoleKind.POWER, "W", multiple=True),
    Role("battery_power", RoleKind.POWER, "W", invertible=True),
    Role("grid_power", RoleKind.POWER, "W", invertible=True),
    Role("grid_power_phase", RoleKind.POWER, "W", multiple=True, invertible=True),
    Role("battery_soc", RoleKind.PERCENT, "%"),
    Role("battery_capacity", RoleKind.NUMBER, "kWh"),
    Role("grid_connected", RoleKind.BINARY, ""),
    Role("pv_energy_total", RoleKind.ENERGY, "kWh"),
    Role("load_energy_total", RoleKind.ENERGY, "kWh"),
    Role("battery_charge_total", RoleKind.ENERGY, "kWh"),
    Role("battery_discharge_total", RoleKind.ENERGY, "kWh"),
    Role("grid_import_total", RoleKind.ENERGY, "kWh"),
    Role("grid_export_total", RoleKind.ENERGY, "kWh"),
    Role("imbalance_floor_pct", RoleKind.NUMBER, "%", advanced=True),
    Role("imbalance_threshold_pct", RoleKind.NUMBER, "%", advanced=True),
    Role("battery_low_pct", RoleKind.NUMBER, "%", advanced=True),
    Role("battery_idle_w", RoleKind.NUMBER, "W", advanced=True),
    Role("battery_full_pct", RoleKind.NUMBER, "%", advanced=True),
    Role("grid_zero_w", RoleKind.NUMBER, "W", advanced=True),
)

ROLES_BY_KEY: dict[str, Role] = {role.key: role for role in ROLES}


def tuning_role_keys() -> frozenset[str]:
    """Keys of the roles the options flow owns, as opposed to the mapping."""
    return frozenset(role.key for role in ROLES if role.advanced)


@dataclass(frozen=True, slots=True)
class Feature:
    """Something the page can show, and the roles it cannot be shown without.

    The requirement lived in three places before this: the analytics module
    raised when a role it needed was absent, the tab rendered whatever came
    back, and the panel showed the tab either way. Nothing in that chain could
    answer "what would mapping this sensor give me", which is the question an
    installation configured before the feature existed needs answered.

    key matches the panel's tab id, because every feature here is a whole tab;
    a section inside a tab is answered by the payload it is drawn from, which
    already knows what it was given.
    """

    key: str
    label: str
    requires: tuple[str, ...]
    # Whether every listed role is needed, or any one of them is enough. The
    # Balance tab is the second kind: one counter draws one bar, and the books
    # only close with all six — so it is worth showing long before it is
    # complete, and its own payload reports what the six are missing.
    needs_all: bool = True
    # Other role sets that open the feature on their own. `requires` stays
    # what `missing` is reported against: the Grid tab opens on grid power
    # and battery power, but inferring outages from flows is a fallback, and
    # the presence sensor is still the thing worth asking for — so it stays
    # listed as missing, and the repair card keeps saying so.
    alternatives: tuple[tuple[str, ...], ...] = ()


# The six energy counters are named here rather than imported from
# analytics.balance, which imports this module; test_roles asserts the two
# lists stay identical.
_BALANCE_COUNTERS = (
    "pv_energy_total",
    "grid_import_total",
    "battery_discharge_total",
    "load_energy_total",
    "grid_export_total",
    "battery_charge_total",
)

FEATURES: tuple[Feature, ...] = (
    Feature("load", "Load analytics", ("load_power", "rated_power")),
    Feature("battery", "Battery analytics", ("battery_soc",)),
    Feature("seasonal", "Seasonality", ("load_power",)),
    Feature("balance", "Energy balance", _BALANCE_COUNTERS, needs_all=False),
    Feature(
        "grid",
        "Grid outages",
        ("grid_connected",),
        alternatives=(("grid_power", "battery_power"), ("grid_power_phase", "battery_power")),
    ),
    # Opens with any one of its three sensor sets; each card on the tab says
    # what it is short of. rated_power is required of every entry, so the
    # inverter card needs only load_power beyond it.
    Feature(
        "sizing",
        "Sizing",
        ("load_power", "rated_power", "battery_soc", "pv_energy_total", "load_energy_total"),
        needs_all=False,
    ),
)

FEATURES_BY_KEY: dict[str, Feature] = {feature.key: feature for feature in FEATURES}


def normalise_entity_ids(value: object) -> tuple[str, ...]:
    """Read a stored entity mapping in either shape.

    Entries created before roles could hold several entities store a bare
    string. Nothing migrates an entry the user never reopens, so both shapes
    stay readable for as long as the integration exists — and every reader of
    the stored shape must go through here, or the guarantee holds in one place
    and silently fails in another.
    """
    raw = [value] if isinstance(value, str) else list(value or ())
    # Duplicates are dropped rather than preserved: the same entity listed
    # twice in a multiple role would be counted twice by every sum over the
    # parts, and there is no reading of "the same sensor, twice" that a user
    # could have meant. dict.fromkeys keeps the configured order.
    return tuple(dict.fromkeys(item for item in raw if item))


@dataclass(frozen=True, slots=True)
class PartIdentity:
    """How one entity of a multiple role is named in a payload.

    index is the number read out of the entity id, or None when the name
    revealed nothing and the position in the configured list is all we have.
    """

    key: str
    label: str
    index: int | None


@dataclass(frozen=True, slots=True)
class _PartFamily:
    """Naming convention for one multiple role."""

    prefix: str
    letter: str
    label_prefix: str
    positional_label: str
    pattern: re.Pattern[str]


# A phase number is written l1 / L1 / phase_1 / ph1 depending on the vendor, and
# a string as pv1 / string1 / mppt2. Both are anchored on a word boundary so
# that a digit inside the installation's own name cannot be read as an index:
# deye12_sun12k_load_l1_power has three numbers in it and only one is the phase.
_PHASE_PATTERN = re.compile(r"(?:^|_)(?:l|ph|phase)_?(\d+)(?:_|$)", re.IGNORECASE)
_STRING_PATTERN = re.compile(r"(?:^|_)(?:pv|str|string|mppt)_?(\d+)(?:_|$)", re.IGNORECASE)

_PART_FAMILIES: dict[str, _PartFamily] = {
    "load_power_phase": _PartFamily("load", "l", "L", "Phase", _PHASE_PATTERN),
    "grid_power_phase": _PartFamily("grid", "l", "L", "Phase", _PHASE_PATTERN),
    "pv_power_string": _PartFamily("pv", "s", "PV", "String", _STRING_PATTERN),
}


def _read_index(family: _PartFamily, entity_id: str) -> int | None:
    match = family.pattern.search(entity_id.split(".", 1)[-1])
    return int(match.group(1)) if match else None


def part_identities(role_key: str, entity_ids: Sequence[str]) -> tuple[PartIdentity, ...]:
    """Name each entity of a multiple role.

    The index is read from the entity id rather than taken from the position
    in the list. Detection sorts by the index it parsed and then discards it,
    so position and index agree only when the mapped phases happen to be
    contiguous from one: a user who maps L1 and L3 would otherwise get L3's
    data under a card labelled L2. Where the name reveals nothing, position is
    genuinely all the information there is, and the label says "Phase 2"
    without claiming which phase the hardware calls it.

    An index that repeats cannot identify anything, so a single collision
    drops the whole role back to positional naming rather than leaving some
    parts named and others not.
    """
    family = _PART_FAMILIES.get(role_key)
    indices = [_read_index(family, entity_id) for entity_id in entity_ids] if family else []
    usable = family is not None and None not in indices and len(set(indices)) == len(indices)

    identities = []
    for position in range(len(entity_ids)):
        if family is None:
            identities.append(PartIdentity(f"{role_key}_{position + 1}", f"#{position + 1}", None))
        elif usable:
            index = indices[position]
            identities.append(
                PartIdentity(
                    f"{family.prefix}_{family.letter}{index}",
                    f"{family.label_prefix}{index}",
                    index,
                )
            )
        else:
            identities.append(
                PartIdentity(
                    f"{family.prefix}_p{position + 1}",
                    f"{family.positional_label} {position + 1}",
                    None,
                )
            )
    return tuple(identities)


def entity_roles() -> tuple[Role, ...]:
    """Roles that map to an entity."""
    return tuple(role for role in ROLES if role.kind is not RoleKind.NUMBER)


def number_roles() -> tuple[Role, ...]:
    """Roles that are set as a number in the configuration."""
    return tuple(role for role in ROLES if role.kind is RoleKind.NUMBER)


def required_role_keys() -> frozenset[str]:
    """Keys of the required roles."""
    return frozenset(role.key for role in ROLES if role.required)


@dataclass(frozen=True, slots=True)
class EntryConfig:
    """Parsed configuration for a single inverter."""

    entities: Mapping[str, tuple[str, ...]]
    numbers: Mapping[str, float]
    inverted: frozenset[str]

    @classmethod
    def from_dict(cls, data: Mapping[str, Any]) -> EntryConfig:
        """Build a config from a dict in the ConfigEntry.data format.

        A role the running version does not recognise is dropped rather than
        raised on. A stored entry can have been written by a version that had
        a role this one has since removed, or by a newer one that has a role
        this one does not have yet — and refusing to load the integration at
        all, so that every tab goes dark over one unread key, is a far worse
        answer to that than ignoring the key. It is logged because a role
        silently vanishing from a working setup would otherwise look like the
        mapping had been lost.

        A value that is present but unreadable still raises: that is a
        corrupted entry rather than an unfamiliar one, and continuing would
        mean computing against a number nobody wrote.
        """
        entities: dict[str, tuple[str, ...]] = {}
        for key, value in (data.get(CONF_ENTITIES) or {}).items():
            if key not in ROLES_BY_KEY:
                _LOGGER.warning("Ignoring sensor mapped to unknown role %s", key)
                continue
            cleaned = normalise_entity_ids(value)
            if cleaned:
                entities[key] = cleaned

        numbers: dict[str, float] = {}
        for key, value in (data.get(CONF_NUMBERS) or {}).items():
            if key not in ROLES_BY_KEY:
                _LOGGER.warning("Ignoring value stored for unknown role %s", key)
                continue
            if value is None:
                continue
            try:
                numbers[key] = float(value)
            except (TypeError, ValueError) as err:
                # A stored entry can hold anything a past version wrote. Saying
                # which role is unreadable beats a bare "could not convert
                # string to float" from four frames down.
                raise ValueError(f"Role {key} holds a non-numeric value: {value!r}") from err

        inverted = frozenset(data.get(CONF_INVERTED) or ())
        unknown = inverted - set(ROLES_BY_KEY)
        if unknown:
            _LOGGER.warning("Ignoring inversion flags for unknown roles %s", sorted(unknown))
            inverted -= unknown

        return cls(entities=entities, numbers=numbers, inverted=inverted)

    @classmethod
    def from_entry(cls, entry: ConfigEntry) -> EntryConfig:
        """Build a config from a config entry.

        The sensor mapping lives in `data`, written by the setup and
        reconfigure flows; the tuning thresholds live in `options`, written by
        the options flow. Entries created before that split hold a whole copy
        of the mapping in `options` and are moved to the new shape by
        `async_migrate_entry`, so only the thresholds are ever overlaid here.

        The overlay is per key rather than wholesale: `options` carries the
        four thresholds and nothing else, and replacing the numbers dict with
        it would take `rated_power` — a required role — out of the config the
        moment anyone opened the options form.
        """
        merged = dict(entry.data)
        option_numbers = (entry.options or {}).get(CONF_NUMBERS) or {}
        if option_numbers:
            merged[CONF_NUMBERS] = dict(merged.get(CONF_NUMBERS) or {}) | dict(option_numbers)
        return cls.from_dict(merged)

    def entity_ids(self, role_key: str) -> tuple[str, ...]:
        """Every entity mapped to the role, in the order they were configured."""
        return self.entities.get(role_key, ())

    def entity_id(self, role_key: str) -> str | None:
        """The first entity mapped to the role, or None.

        Kept for roles that are single by nature; a caller that may face a
        multiple role should use entity_ids.
        """
        ids = self.entity_ids(role_key)
        return ids[0] if ids else None

    def number(self, role_key: str) -> float | None:
        """Numeric value for the role, or None."""
        return self.numbers.get(role_key)

    def sign(self, role_key: str) -> float:
        """Sign multiplier for the role: -1.0 if inversion is enabled."""
        return -1.0 if role_key in self.inverted else 1.0

    def has(self, *role_keys: str) -> bool:
        """Whether all listed roles are configured.

        An unknown key is a programming error rather than an unconfigured
        role, so it raises — but with the name of the role, not the bare
        KeyError that a dict lookup would produce.
        """
        for key in role_keys:
            if key not in ROLES_BY_KEY:
                raise KeyError(f"Unknown role: {key}")
        return all(
            (key in self.numbers)
            if ROLES_BY_KEY[key].kind is RoleKind.NUMBER
            else bool(self.entity_ids(key))
            for key in role_keys
        )


def missing_roles(config: EntryConfig, feature: Feature) -> tuple[str, ...]:
    """The roles the feature needs that are not configured.

    Reported for a feature that is already available too: the Balance tab
    draws whatever counters it has, and "you have four of six" is the whole
    point of asking.
    """
    return tuple(key for key in feature.requires if not config.has(key))


def feature_availability(config: EntryConfig) -> list[dict[str, Any]]:
    """Every feature, whether it can be shown, and what it is short of."""
    availability = []
    for feature in FEATURES:
        missing = missing_roles(config, feature)
        available = not missing if feature.needs_all else len(missing) < len(feature.requires)
        available = available or any(config.has(*roles) for roles in feature.alternatives)
        availability.append(
            {
                "key": feature.key,
                "label": feature.label,
                "available": available,
                "missing": list(missing),
            }
        )
    return availability
