"""Discovering which of an installation's sensors belong to one inverter.

Splitting discovery from the config flow keeps it testable against a captured
entity list, with no Home Assistant instance and no role vocabulary involved.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Sequence
from dataclasses import dataclass

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

# An inverter publishes several sensors even in a minimal setup (at least
# power, one energy total and one more channel). A group smaller than this is
# far more likely to be a smart plug or a phone than an inverter, and
# offering it as a candidate would make the discovery step useless noise.
MIN_CLUSTER_SIZE = 3

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
    device at all — which is the case for the most widely used Solarman module.
    """
    groups: dict[str, list[SensorInfo]] = defaultdict(list)
    for sensor in sensors:
        if sensor.device_class not in _RELEVANT_DEVICE_CLASSES:
            continue
        groups[sensor.device_id or _prefix(sensor.entity_id)].append(sensor)

    clusters = [
        Cluster(key=key, label=key.replace("_", " ").title(), sensors=tuple(members))
        for key, members in groups.items()
        if len(members) >= MIN_CLUSTER_SIZE
    ]
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
