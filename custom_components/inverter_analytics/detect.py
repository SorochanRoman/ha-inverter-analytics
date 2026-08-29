"""Discovering which of an installation's sensors belong to one inverter.

Splitting discovery from the config flow keeps it testable against a captured
entity list, with no Home Assistant instance and no role vocabulary involved.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Mapping, Sequence
from dataclasses import dataclass
import re

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from . import presets

# A registered device is authoritative: Home Assistant itself says these
# entities belong together, so a small group is still trustworthy.
MIN_DEVICE_CLUSTER_SIZE = 3

# A shared name prefix is only a guess, and "power + today's energy + this
# month's energy" is one of the most common shapes in a Home Assistant
# installation — a printer, a boiler and a fridge all match it. The floor
# here has to be high enough that a monitored appliance cannot pass for an
# inverter.
MIN_PREFIX_CLUSTER_SIZE = 5

_RELEVANT_DEVICE_CLASSES = frozenset({"power", "energy", "battery"})


@dataclass(frozen=True, slots=True)
class SensorInfo:
    """The parts of a sensor's state that detection reasons about."""

    entity_id: str
    device_class: str | None
    unit: str | None
    state_class: str | None
    device_id: str | None


@dataclass(frozen=True, slots=True)
class Cluster:
    """A group of sensors that look like one installation."""

    key: str
    label: str
    sensors: tuple[SensorInfo, ...]


def _object_id(entity_id: str) -> str:
    return entity_id.split(".", 1)[-1]


def _prefix(entity_id: str) -> str:
    """The leading name segment shared by one integration's sensors.

    An inverter's entities are named after the integration instance, so the
    first underscore-separated word usually identifies the installation:
    both solarman_pv1_power and solarman_total_load_power reduce to
    "solarman". That single word is ambiguous when it already carries a
    numeric suffix (deye12, as opposed to just deye) — plausibly a second
    instance of the same integration — so in that case the second word is
    kept too: deye12_sun12k_daily_production reduces to "deye12_sun12k".
    Checking the digit on the *first* word matters: solarman_pv1_power's
    second word "pv1" also contains a digit, and using that word instead
    would wrongly split the PV channels into their own one-sensor groups.
    """
    parts = _object_id(entity_id).split("_")
    if len(parts) >= 3 and any(character.isdigit() for character in parts[0]):
        return "_".join(parts[:2])
    return parts[0]


def cluster_sensors(sensors: Sequence[SensorInfo]) -> list[Cluster]:
    """Group sensors into candidate installations, largest first.

    A registered device wins over the name, because it is authoritative. The
    prefix fallback exists for YAML-configured integrations that register no
    device at all — which is the case for the most widely used Solarman
    module. The two sources of evidence carry different weight, so each
    group is checked against the floor that matches how it was formed:
    device-backed groups against MIN_DEVICE_CLUSTER_SIZE, name-guessed ones
    against the higher MIN_PREFIX_CLUSTER_SIZE. Collapsing both onto one
    constant once let a three-sensor printer (power, today's energy, this
    month's energy) pass for an inverter — that appliance shape is common
    enough that no single threshold can both admit a small device-backed
    cluster and reject it.
    """
    groups: dict[str, list[SensorInfo]] = defaultdict(list)
    grouped_by_device: set[str] = set()
    for sensor in sensors:
        if sensor.device_class not in _RELEVANT_DEVICE_CLASSES:
            continue
        if sensor.device_id:
            key = sensor.device_id
            grouped_by_device.add(key)
        else:
            key = _prefix(sensor.entity_id)
        groups[key].append(sensor)

    clusters = []
    for key, members in groups.items():
        floor = MIN_DEVICE_CLUSTER_SIZE if key in grouped_by_device else MIN_PREFIX_CLUSTER_SIZE
        if len(members) >= floor:
            clusters.append(
                Cluster(key=key, label=key.replace("_", " ").title(), sensors=tuple(members))
            )
    clusters.sort(key=lambda cluster: (-len(cluster.sensors), cluster.key))
    return clusters


def collect_sensors(hass: HomeAssistant) -> list[SensorInfo]:
    """Read every sensor's detection-relevant attributes from the state machine."""
    registry = er.async_get(hass)
    sensors: list[SensorInfo] = []
    for state in hass.states.async_all("sensor"):
        entry = registry.async_get(state.entity_id)
        sensors.append(
            SensorInfo(
                entity_id=state.entity_id,
                device_class=state.attributes.get("device_class"),
                unit=state.attributes.get("unit_of_measurement"),
                state_class=state.attributes.get("state_class"),
                device_id=entry.device_id if entry else None,
            )
        )
    return sensors


@dataclass(frozen=True, slots=True)
class Ambiguity:
    """A mapping the data cannot settle, to be put to the user."""

    role: str
    question: str
    options: Mapping[str, tuple[str, ...]]


@dataclass(frozen=True, slots=True)
class Detection:
    """What a cluster looks like once its sensors have been read."""

    mapping: Mapping[str, tuple[str, ...]]
    ambiguities: tuple[Ambiguity, ...]
    without_statistics: tuple[str, ...]


def classify(cluster: Cluster) -> Detection:
    """Turn a cluster's sensors into a role mapping, an ambiguity list and a warning list."""
    indexed: dict[str, list[tuple[int, str]]] = defaultdict(list)
    ct_sets: dict[str, list[tuple[int, str]]] = defaultdict(list)
    without_statistics: list[str] = []

    for sensor in cluster.sensors:
        object_id = _object_id(sensor.entity_id)

        if sensor.state_class is None and sensor.device_class in {"power", "energy"}:
            without_statistics.append(sensor.entity_id)

        ct_match = re.match(presets.CT_PATTERN, object_id)
        if ct_match:
            ct_sets[ct_match.group(1)].append((int(ct_match.group(2)), sensor.entity_id))
            continue

        for pattern, role_key in presets.PATTERNS:
            match = re.match(pattern, object_id)
            if match:
                index = int(match.group(1)) if match.groups() else 0
                indexed[role_key].append((index, sensor.entity_id))
                break

    mapping = {
        role_key: tuple(entity for _, entity in sorted(found))
        for role_key, found in indexed.items()
    }

    ambiguities: list[Ambiguity] = []
    if len(ct_sets) > 1:
        ambiguities.append(
            Ambiguity(
                role="grid_power_phase",
                question="Which current transformers measure the grid connection?",
                options={
                    name: tuple(entity for _, entity in sorted(found))
                    for name, found in ct_sets.items()
                },
            )
        )
    elif ct_sets:
        [(_name, found)] = ct_sets.items()
        mapping["grid_power_phase"] = tuple(entity for _, entity in sorted(found))

    return Detection(
        mapping=mapping,
        ambiguities=tuple(ambiguities),
        without_statistics=tuple(sorted(without_statistics)),
    )
