"""Canonical sensor roles and the entry configuration model."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import dataclass
from enum import StrEnum
import re
from typing import Any

from homeassistant.config_entries import ConfigEntry

from .const import CONF_ENTITIES, CONF_INVERTED, CONF_NUMBERS


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
)

ROLES_BY_KEY: dict[str, Role] = {role.key: role for role in ROLES}


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
        """Build a config from a dict in the ConfigEntry.data format."""
        entities: dict[str, tuple[str, ...]] = {}
        for key, value in (data.get(CONF_ENTITIES) or {}).items():
            if key not in ROLES_BY_KEY:
                raise KeyError(f"Unknown role: {key}")
            cleaned = normalise_entity_ids(value)
            if cleaned:
                entities[key] = cleaned

        numbers: dict[str, float] = {}
        for key, value in (data.get(CONF_NUMBERS) or {}).items():
            if key not in ROLES_BY_KEY:
                raise KeyError(f"Unknown role: {key}")
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
            raise KeyError(f"Unknown roles in inverted: {sorted(unknown)}")

        return cls(entities=entities, numbers=numbers, inverted=inverted)

    @classmethod
    def from_entry(cls, entry: ConfigEntry) -> EntryConfig:
        """Build a config from a config entry; options override data."""
        return cls.from_dict(entry.options or entry.data)

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
