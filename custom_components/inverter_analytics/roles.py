"""Canonical sensor roles and the entry configuration model."""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from enum import StrEnum
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
    return tuple(item for item in raw if item)


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
            if value is not None:
                numbers[key] = float(value)

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
        """Whether all listed roles are configured."""
        return all(
            (key in self.numbers)
            if ROLES_BY_KEY[key].kind is RoleKind.NUMBER
            else bool(self.entity_ids(key))
            for key in role_keys
        )
