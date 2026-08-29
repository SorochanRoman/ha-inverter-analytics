# Multi-series roles and sensor detection — Implementation Plan (plan 1 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A user with a three-phase Solarman inverter sets it up in one click, every field explains itself, and a role can hold several entities.

**Architecture:** `EntryConfig.entities` becomes role → tuple of entity ids, with backward compatibility for entries already stored as plain strings. A new `detect.py` clusters an installation's sensors and classifies them into roles from `device_class`, unit and an `object_id` regex. The config flow becomes discover → confirm → manual, where manual is the fallback rather than the default path.

**Tech Stack:** Python 3.12, Home Assistant 2024.11+, voluptuous, pytest + pytest-homeassistant-custom-component, ruff; TypeScript for one type change.

**Spec:** `docs/superpowers/specs/2026-08-29-multi-series-and-presets-design.md`

**Out of scope for this plan** (plan 2): `align()`, imbalance maths, the payload `series` map, the Phases UI section. Analytics is untouched here — `load_power` stays single and required, so `analytics/load.py` needs no change.

## Global Constraints

- Integration domain: `inverter_analytics`. Minimum Home Assistant 2024.11.0, Python 3.12.
- No external Python dependencies.
- All recorder access goes through `get_instance(hass).async_add_executor_job(...)`. This plan does not read the recorder at all.
- Everything written into the repository is English: code comments, docstrings, UI strings, documentation, commit messages.
- Existing config entries must keep working. Entries in the wild store `entities` as `{role: "sensor.x"}`; the new format is `{role: ["sensor.x"]}`. Reading must accept both, forever — there is no migration step that can reach an entry the user never reopens.
- A total published by the vendor always wins over a sum of parts. This plan only stores the distinction; plan 2 acts on it.
- Quality gates, all four, after every task: `.venv/bin/pytest -q`, `.venv/bin/pytest -v 2>&1 | grep -cE '^(INFO|DEBUG|WARNING)'` must be 0, `.venv/bin/ruff check .`, `.venv/bin/ruff format --check .`. Frontend: `npm run typecheck`, `npm run test`, `npm run build` from `frontend/`.

## File Structure

| File | Responsibility |
|---|---|
| `custom_components/inverter_analytics/roles.py` | Role catalogue and `EntryConfig`. Gains `multiple`, tuple-valued entities, and tolerant parsing. |
| `custom_components/inverter_analytics/detect.py` | **New.** Clusters an installation's entities and classifies them into roles. No Home Assistant flow logic, no config writing — pure discovery, so it can be tested against a captured entity list. |
| `custom_components/inverter_analytics/presets.py` | **New.** The pattern table per vendor. Data, not logic. |
| `custom_components/inverter_analytics/config_flow.py` | The three-step wizard. Consumes `detect` and `presets`. |
| `custom_components/inverter_analytics/translations/en.json` | Labels and the new `data_description` helper text. |
| `custom_components/inverter_analytics/websocket_api.py` | One line: entities now serialise as lists. |
| `frontend/src/types.ts` | `EntryInfo.entities` becomes `Record<string, string[]>`. |
| `tests/fixtures/solarman_entities.py` | **New.** The real entity list from a live instance, including entities that must NOT match. |

---

### Task 1: Roles hold several entities

**Files:**
- Modify: `custom_components/inverter_analytics/roles.py`
- Test: `tests/test_roles.py`

**Interfaces:**
- Consumes: `const.CONF_ENTITIES`, `const.CONF_NUMBERS`, `const.CONF_INVERTED`.
- Produces:
  - `Role` gains `multiple: bool = False`
  - New roles: `load_power_phase`, `pv_power_string`, `grid_power_phase` (all `RoleKind.POWER`, `multiple=True`), and `rated_power_per_phase` (`RoleKind.NUMBER`)
  - `EntryConfig.entities: Mapping[str, tuple[str, ...]]`
  - `EntryConfig.entity_ids(role_key) -> tuple[str, ...]`
  - `EntryConfig.entity_id(role_key) -> str | None` — unchanged signature, returns the first entity
  - `multiple_roles() -> tuple[Role, ...]`

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_roles.py`:

```python
def test_phase_and_string_roles_are_multiple():
    assert ROLES_BY_KEY["load_power_phase"].multiple is True
    assert ROLES_BY_KEY["pv_power_string"].multiple is True
    assert ROLES_BY_KEY["grid_power_phase"].multiple is True
    assert ROLES_BY_KEY["load_power"].multiple is False


def test_entity_ids_returns_every_configured_entity():
    config = EntryConfig.from_dict(
        {
            "entities": {
                "load_power": ["sensor.total"],
                "load_power_phase": ["sensor.l1", "sensor.l2", "sensor.l3"],
            },
            "numbers": {},
            "inverted": [],
        }
    )
    assert config.entity_ids("load_power_phase") == ("sensor.l1", "sensor.l2", "sensor.l3")
    assert config.entity_ids("pv_power_string") == ()


def test_entity_id_still_returns_a_single_entity():
    config = EntryConfig.from_dict(
        {"entities": {"load_power": ["sensor.total"]}, "numbers": {}, "inverted": []}
    )
    assert config.entity_id("load_power") == "sensor.total"
    assert config.entity_id("battery_soc") is None


def test_a_plain_string_from_an_older_entry_is_still_readable():
    """Entries created before this change store a bare string, not a list.

    There is no migration that can reach an entry the user never reopens, so
    the parser has to accept both shapes for as long as the integration exists.
    """
    config = EntryConfig.from_dict(
        {"entities": {"load_power": "sensor.legacy"}, "numbers": {}, "inverted": []}
    )
    assert config.entity_ids("load_power") == ("sensor.legacy",)
    assert config.entity_id("load_power") == "sensor.legacy"


def test_empty_and_blank_entities_are_dropped():
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": ["sensor.a", "", None], "pv_power_string": []},
            "numbers": {},
            "inverted": [],
        }
    )
    assert config.entity_ids("load_power") == ("sensor.a",)
    assert config.entity_ids("pv_power_string") == ()
    assert config.has("pv_power_string") is False


def test_has_is_true_only_when_a_role_holds_something():
    config = EntryConfig.from_dict(
        {"entities": {"load_power": ["sensor.a"]}, "numbers": {"rated_power": 8000.0}, "inverted": []}
    )
    assert config.has("load_power", "rated_power") is True
    assert config.has("load_power", "load_power_phase") is False
```

- [ ] **Step 2: Run the tests and watch them fail**

Run: `.venv/bin/pytest tests/test_roles.py -v`
Expected: FAIL — `KeyError: 'load_power_phase'` and `AttributeError: 'EntryConfig' object has no attribute 'entity_ids'`

- [ ] **Step 3: Add the flag and the new roles**

In `roles.py`, add the field to `Role`:

```python
@dataclass(frozen=True, slots=True)
class Role:
    """Description of a single role."""

    key: str
    kind: RoleKind
    unit: str
    required: bool = False
    invertible: bool = False
    multiple: bool = False
```

Extend `ROLES`, keeping each part next to the total it belongs to:

```python
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


def multiple_roles() -> tuple[Role, ...]:
    """Roles that can hold more than one entity."""
    return tuple(role for role in ROLES if role.multiple)
```

- [ ] **Step 4: Make entities tuple-valued and tolerant**

Replace the `entities` field and its parsing in `EntryConfig`:

```python
    entities: Mapping[str, tuple[str, ...]]
```

and in `from_dict`, replace the entities loop:

```python
        entities: dict[str, tuple[str, ...]] = {}
        for key, value in (data.get(CONF_ENTITIES) or {}).items():
            if key not in ROLES_BY_KEY:
                raise KeyError(f"Unknown role: {key}")
            # Entries created before roles could hold several entities store a
            # bare string. Nothing migrates an entry the user never reopens, so
            # both shapes stay readable for as long as the integration exists.
            raw = [value] if isinstance(value, str) else list(value or ())
            cleaned = tuple(item for item in raw if item)
            if cleaned:
                entities[key] = cleaned
```

Add the accessor and rewrite the two that depend on the shape:

```python
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
```

and in `has`, the entity branch becomes `bool(self.entity_ids(key))`.

- [ ] **Step 5: Run the tests**

Run: `.venv/bin/pytest tests/test_roles.py -v`
Expected: PASS

- [ ] **Step 6: Run everything, since EntryConfig has other consumers**

Run: `.venv/bin/pytest -q`
Expected: all pass. `analytics/load.py` calls `entity_id("load_power")`, whose signature and behaviour are unchanged; `websocket_api.py` sends `dict(config.entities)`, which now carries tuples — Task 2 handles that.

- [ ] **Step 7: Commit**

```bash
git add custom_components/inverter_analytics/roles.py tests/test_roles.py
git commit -m "feat: roles can hold several entities, with legacy entries still readable"
```

---

### Task 2: Entities cross the wire as lists

**Files:**
- Modify: `custom_components/inverter_analytics/websocket_api.py`
- Modify: `frontend/src/types.ts`
- Test: `tests/test_websocket_api.py`

**Interfaces:**
- Consumes: `EntryConfig.entities` from Task 1.
- Produces: `inverter_analytics/config` now reports `entities` as `{role: [entity_id, ...]}`; `EntryInfo.entities` in TypeScript becomes `Record<string, string[]>`.

Small task, but it is the seam where a silent type change would reach the browser as an array rendered where a string was expected.

- [ ] **Step 1: Write the failing test**

In `tests/test_websocket_api.py`, change the assertion in `test_config_command_lists_entries`:

```python
    assert entries[0]["entities"] == {"load_power": ["sensor.load_power"]}
```

and add:

```python
async def test_config_command_reports_every_entity_of_a_multiple_role(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 3-phase",
        data={
            "entities": {
                "load_power": ["sensor.total"],
                "load_power_phase": ["sensor.l1", "sensor.l2", "sensor.l3"],
            },
            "numbers": {"rated_power": 12000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "inverter_analytics/config"})
    response = await client.receive_json()

    entities = response["result"]["entries"][0]["entities"]
    assert entities["load_power_phase"] == ["sensor.l1", "sensor.l2", "sensor.l3"]
```

- [ ] **Step 2: Run it and watch it fail**

Run: `.venv/bin/pytest tests/test_websocket_api.py -v`
Expected: FAIL — the payload still carries tuples, which compare unequal to lists after the JSON round trip, and the legacy assertion expects a bare string.

- [ ] **Step 3: Serialise tuples as lists**

In `ws_config`, replace the entities line:

```python
                "entities": {role: list(ids) for role, ids in config.entities.items()},
```

- [ ] **Step 4: Update the frontend type**

In `frontend/src/types.ts`:

```ts
export interface EntryInfo {
  entry_id: string;
  title: string;
  entities: Record<string, string[]>;
  numbers: Record<string, number>;
  inverted: string[];
}
```

Nothing in `frontend/src/` reads `entities` today — `panel.ts` only uses `entry_id` and `title` — so this is a type correction, not a behaviour change. Verify that with `grep -rn 'entities' frontend/src` and say what you found in your report.

- [ ] **Step 5: Run both suites**

Run: `.venv/bin/pytest -q` and, from `frontend/`, `npm run typecheck && npm run test`
Expected: all green.

- [ ] **Step 6: Commit**

```bash
git add custom_components/inverter_analytics/websocket_api.py frontend/src/types.ts tests/test_websocket_api.py
git commit -m "feat: report role entities as lists over the WebSocket API"
```

---

### Task 3: Cluster an installation's sensors

**Files:**
- Create: `custom_components/inverter_analytics/detect.py`
- Create: `tests/fixtures/__init__.py` (empty)
- Create: `tests/fixtures/solarman_entities.py`
- Test: `tests/test_detect_clusters.py`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `SensorInfo` — frozen dataclass: `entity_id: str`, `device_class: str | None`, `unit: str | None`, `state_class: str | None`, `device_id: str | None`
  - `Cluster` — frozen dataclass: `key: str`, `label: str`, `sensors: tuple[SensorInfo, ...]`
  - `cluster_sensors(sensors: Sequence[SensorInfo]) -> list[Cluster]`
  - `collect_sensors(hass) -> list[SensorInfo]`

Detection is split from classification deliberately: clustering answers "which sensors belong to one inverter", classification answers "what is each one". A reviewer can reject one and accept the other, and clustering is the half that can be tested without any role vocabulary.

- [ ] **Step 1: Capture the reference instance as a fixture**

`tests/fixtures/solarman_entities.py`. This is a real list from a live Home Assistant with two inverters and a house full of unrelated sensors. The entries that must **not** be matched matter as much as the ones that must.

```python
"""Entities captured from a live instance, for detection tests.

Two inverters (a Solarman-integrated one and a Deye SUN-12K), plus phone
batteries, a printer and a boiler that share device classes with inverter
sensors and must never be swept into a cluster.
"""

from custom_components.inverter_analytics.detect import SensorInfo

# (entity_id, device_class, unit, state_class)
_RAW: tuple[tuple[str, str | None, str | None, str | None], ...] = (
    ("sensor.solarman_power_production_now", "power", "W", "measurement"),
    ("sensor.solarman_pv1_power", "power", "W", "measurement"),
    ("sensor.solarman_pv2_power", "power", "W", "measurement"),
    ("sensor.solarman_battery_power", "power", "W", "measurement"),
    ("sensor.solarman_battery_soc", "battery", "%", "measurement"),
    ("sensor.solarman_total_load_power", "power", "W", "measurement"),
    ("sensor.solarman_load_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_load_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_load_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_inverter_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_inverter_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_inverter_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_internal_ct_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_internal_ct_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_internal_ct_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_external_ct_l1_power", "power", "W", "measurement"),
    ("sensor.solarman_external_ct_l2_power", "power", "W", "measurement"),
    ("sensor.solarman_external_ct_l3_power", "power", "W", "measurement"),
    ("sensor.solarman_total_production", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_load_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_battery_charge", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_battery_discharge", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_energy_bought", "energy", "kWh", "total_increasing"),
    ("sensor.solarman_total_energy_sold", "energy", "kWh", "total_increasing"),
    # No state_class: no long-term statistics exists for these.
    ("sensor.solarman_total_power", "power", "W", None),
    ("sensor.solarman_gen_power", "power", "W", None),
    ("sensor.solarman_micro_inverter_power", "power", "W", None),
    # A second inverter.
    ("sensor.deye12_sun12k_total_pv_production", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_energy_bought", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_energy_sold", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_charge_of_the_battery", "energy", "kWh", "total_increasing"),
    ("sensor.deye12_sun12k_total_discharge_of_the_battery", "energy", "kWh", "total_increasing"),
    # Must never join a cluster: same device classes, unrelated hardware.
    ("sensor.romans_iphone_battery_level", "battery", "%", None),
    ("sensor.ipad_3_battery_level", "battery", "%", None),
    ("sensor.aqara_motion_sensor_batareia", "battery", "%", "measurement"),
    ("sensor.printeri_current_consumption", "power", "W", "measurement"),
    ("sensor.printeri_today_s_consumption", "energy", "kWh", "total_increasing"),
    ("sensor.boiler_current_consumption", "power", "W", "measurement"),
    ("sensor.kholodilnik_total_energy", "energy", "kWh", "total_increasing"),
    ("sensor.pv_power_total", "power", "W", "measurement"),
)

SOLARMAN_SENSORS: tuple[SensorInfo, ...] = tuple(
    SensorInfo(entity_id=e, device_class=d, unit=u, state_class=s, device_id=None)
    for e, d, u, s in _RAW
)
```

- [ ] **Step 2: Write the failing tests**

`tests/test_detect_clusters.py`:

```python
"""Tests for grouping an installation's sensors into candidate inverters."""

from custom_components.inverter_analytics.detect import SensorInfo, cluster_sensors
from tests.fixtures.solarman_entities import SOLARMAN_SENSORS


def _keys(clusters):
    return sorted(cluster.key for cluster in clusters)


def test_finds_both_inverters_in_a_real_installation():
    clusters = cluster_sensors(SOLARMAN_SENSORS)
    assert _keys(clusters) == ["deye12_sun12k", "solarman"]


def test_household_sensors_never_join_a_cluster():
    """Phones, a printer and a boiler share device classes with an inverter."""
    clustered = {
        sensor.entity_id for cluster in cluster_sensors(SOLARMAN_SENSORS) for sensor in cluster.sensors
    }
    for stray in (
        "sensor.romans_iphone_battery_level",
        "sensor.aqara_motion_sensor_batareia",
        "sensor.printeri_current_consumption",
        "sensor.boiler_current_consumption",
        "sensor.kholodilnik_total_energy",
        "sensor.pv_power_total",
    ):
        assert stray not in clustered


def test_a_cluster_keeps_all_of_its_sensors():
    clusters = {cluster.key: cluster for cluster in cluster_sensors(SOLARMAN_SENSORS)}
    solarman = clusters["solarman"]
    assert len(solarman.sensors) == 27
    assert any(s.entity_id == "sensor.solarman_load_l3_power" for s in solarman.sensors)


def test_clusters_are_ordered_by_size_so_the_main_inverter_comes_first():
    clusters = cluster_sensors(SOLARMAN_SENSORS)
    assert [c.key for c in clusters] == ["solarman", "deye12_sun12k"]


def test_a_device_id_groups_sensors_that_share_no_prefix():
    """Integrations that register a device are grouped by it, not by name."""
    sensors = (
        SensorInfo("sensor.alpha_output", "power", "W", "measurement", device_id="dev1"),
        SensorInfo("sensor.beta_output", "power", "W", "measurement", device_id="dev1"),
        SensorInfo("sensor.gamma_output", "power", "W", "measurement", device_id="dev1"),
    )
    clusters = cluster_sensors(sensors)
    assert len(clusters) == 1
    assert len(clusters[0].sensors) == 3


def test_a_group_too_small_to_be_an_inverter_is_dropped():
    sensors = (
        SensorInfo("sensor.lonely_power", "power", "W", "measurement", device_id=None),
        SensorInfo("sensor.lonely_energy", "energy", "kWh", "total_increasing", device_id=None),
    )
    assert cluster_sensors(sensors) == []
```

- [ ] **Step 3: Run them and watch them fail**

Run: `.venv/bin/pytest tests/test_detect_clusters.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.detect'`

- [ ] **Step 4: Implement clustering**

`custom_components/inverter_analytics/detect.py`:

```python
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

# An inverter publishes many sensors. A group smaller than this is far more
# likely to be a smart plug or a phone than an inverter, and offering it as a
# candidate would make the discovery step useless noise.
MIN_CLUSTER_SIZE = 5

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
    first two underscore-separated words identify the installation: both
    solarman_pv1_power and solarman_total_load_power reduce to "solarman",
    while deye12_sun12k_daily_production reduces to "deye12_sun12k".
    """
    parts = _object_id(entity_id).split("_")
    if len(parts) >= 3 and any(character.isdigit() for character in parts[1]):
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
```

- [ ] **Step 5: Run the tests**

Run: `.venv/bin/pytest tests/test_detect_clusters.py -v`
Expected: PASS, 6 tests.

If `test_a_cluster_keeps_all_of_its_sensors` fails on the count, do not adjust the expected number to match the code — count the `sensor.solarman_*` lines in the fixture by hand and work out which side is wrong.

- [ ] **Step 6: Full gates and commit**

Run: `.venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check .`

```bash
git add custom_components/inverter_analytics/detect.py tests/fixtures tests/test_detect_clusters.py
git commit -m "feat: group an installation's sensors into candidate inverters"
```

---

### Task 4: Classify a cluster into roles

**Files:**
- Create: `custom_components/inverter_analytics/presets.py`
- Modify: `custom_components/inverter_analytics/detect.py`
- Test: `tests/test_detect_classify.py`

**Interfaces:**
- Consumes: `Cluster`, `SensorInfo` from Task 3; `ROLES_BY_KEY` from Task 1.
- Produces:
  - `presets.PATTERNS: tuple[tuple[str, str], ...]` — `(regex, role_key)`, matched against the `object_id`
  - `presets.CT_CHOICES: Mapping[str, str]` — CT prefix to human explanation
  - `detect.Ambiguity` — frozen dataclass: `role: str`, `question: str`, `options: Mapping[str, tuple[str, ...]]`
  - `detect.Detection` — frozen dataclass: `mapping: Mapping[str, tuple[str, ...]]`, `ambiguities: tuple[Ambiguity, ...]`, `without_statistics: tuple[str, ...]`
  - `detect.classify(cluster: Cluster) -> Detection`

- [ ] **Step 1: Write the failing tests**

`tests/test_detect_classify.py`:

```python
"""Tests for turning a cluster of sensors into a role mapping."""

from custom_components.inverter_analytics.detect import classify, cluster_sensors
from tests.fixtures.solarman_entities import SOLARMAN_SENSORS


def _solarman():
    return next(c for c in cluster_sensors(SOLARMAN_SENSORS) if c.key == "solarman")


def test_maps_the_total_load_and_its_phases_separately():
    detection = classify(_solarman())
    assert detection.mapping["load_power"] == ("sensor.solarman_total_load_power",)
    assert detection.mapping["load_power_phase"] == (
        "sensor.solarman_load_l1_power",
        "sensor.solarman_load_l2_power",
        "sensor.solarman_load_l3_power",
    )


def test_phases_and_strings_are_ordered_by_their_index_not_alphabetically():
    """L10 must not sort before L2 once a bigger inverter shows up."""
    detection = classify(_solarman())
    assert detection.mapping["pv_power_string"] == (
        "sensor.solarman_pv1_power",
        "sensor.solarman_pv2_power",
    )


def test_maps_battery_and_energy_counters():
    detection = classify(_solarman())
    assert detection.mapping["battery_power"] == ("sensor.solarman_battery_power",)
    assert detection.mapping["battery_soc"] == ("sensor.solarman_battery_soc",)
    assert detection.mapping["grid_import_total"] == ("sensor.solarman_total_energy_bought",)
    assert detection.mapping["grid_export_total"] == ("sensor.solarman_total_energy_sold",)


def test_the_two_ct_sets_become_a_question_not_a_guess():
    """Which clamp measures the grid depends on how it was installed."""
    detection = classify(_solarman())
    assert "grid_power_phase" not in detection.mapping
    ct = next(a for a in detection.ambiguities if a.role == "grid_power_phase")
    assert set(ct.options) == {"external_ct", "internal_ct"}
    assert ct.options["external_ct"] == (
        "sensor.solarman_external_ct_l1_power",
        "sensor.solarman_external_ct_l2_power",
        "sensor.solarman_external_ct_l3_power",
    )


def test_sensors_without_a_state_class_are_reported():
    """No state_class means no long-term statistics, so long windows come back empty."""
    detection = classify(_solarman())
    assert set(detection.without_statistics) == {
        "sensor.solarman_total_power",
        "sensor.solarman_gen_power",
        "sensor.solarman_micro_inverter_power",
    }


def test_unrecognised_sensors_are_simply_left_out():
    detection = classify(_solarman())
    mapped = {entity for ids in detection.mapping.values() for entity in ids}
    assert "sensor.solarman_inverter_l1_power" not in mapped


def test_an_unknown_naming_scheme_yields_an_empty_mapping_rather_than_a_wrong_one():
    """The second inverter uses a different profile's names."""
    deye = next(c for c in cluster_sensors(SOLARMAN_SENSORS) if c.key == "deye12_sun12k")
    detection = classify(deye)
    assert detection.mapping.get("load_power") is None
```

- [ ] **Step 2: Run them and watch them fail**

Run: `.venv/bin/pytest tests/test_detect_classify.py -v`
Expected: FAIL — `ImportError: cannot import name 'classify'`

- [ ] **Step 3: Write the pattern table**

`custom_components/inverter_analytics/presets.py`:

```python
"""Naming patterns used to recognise an inverter's sensors.

Data, not logic. The patterns below were read off a live instance running the
StephanJoubert Solarman integration with a Deye hybrid profile, rather than
guessed — a pattern that merely looks plausible produces a mapping that is
confidently wrong, which is worse than no mapping at all.

Patterns match the object_id, so they are prefix-agnostic: the same table works
whether the integration named things solarman_* or deye_*.
"""

from __future__ import annotations

from collections.abc import Mapping
from typing import Final

# (regex over the object_id, role key). A capture group, where present, is the
# index of a phase or a string and decides the order within a multiple role.
PATTERNS: Final[tuple[tuple[str, str], ...]] = (
    (r"^(?:.*_)?total_load_power$", "load_power"),
    (r"^(?:.*_)?load_l(\d+)_power$", "load_power_phase"),
    (r"^(?:.*_)?pv(\d+)_power$", "pv_power_string"),
    (r"^(?:.*_)?power_production_now$", "pv_power"),
    (r"^(?:.*_)?battery_power$", "battery_power"),
    (r"^(?:.*_)?battery_soc$", "battery_soc"),
    (r"^(?:.*_)?total_production$", "pv_energy_total"),
    (r"^(?:.*_)?total_load_consumption$", "load_energy_total"),
    (r"^(?:.*_)?total_battery_charge$", "battery_charge_total"),
    (r"^(?:.*_)?total_battery_discharge$", "battery_discharge_total"),
    (r"^(?:.*_)?total_energy_bought$", "grid_import_total"),
    (r"^(?:.*_)?total_energy_sold$", "grid_export_total"),
)

# Both clamp sets are wired per phase and look identical to a pattern. Which one
# faces the grid depends on the installation, so this is asked, never assumed.
CT_PATTERN: Final = r"^(?:.*_)?(external_ct|internal_ct)_l(\d+)_power$"

CT_CHOICES: Final[Mapping[str, str]] = {
    "external_ct": (
        "External CT — usually clamped on the service entrance and measuring "
        "import and export against the grid"
    ),
    "internal_ct": (
        "Internal CT — the inverter's own measurement of what passes through it"
    ),
}
```

- [ ] **Step 4: Implement classification**

Append to `detect.py`:

```python
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
        [(name, found)] = ct_sets.items()
        mapping["grid_power_phase"] = tuple(entity for _, entity in sorted(found))

    return Detection(
        mapping=mapping,
        ambiguities=tuple(ambiguities),
        without_statistics=tuple(sorted(without_statistics)),
    )
```

Add `import re` and `from . import presets` to the module's imports.

- [ ] **Step 5: Run the tests**

Run: `.venv/bin/pytest tests/test_detect_classify.py -v`
Expected: PASS, 7 tests.

- [ ] **Step 6: Full gates and commit**

```bash
git add custom_components/inverter_analytics/presets.py custom_components/inverter_analytics/detect.py tests/test_detect_classify.py
git commit -m "feat: classify a cluster's sensors into roles, asking about ambiguous CTs"
```

---

### Task 5: The wizard becomes discover → confirm → manual

**Files:**
- Modify: `custom_components/inverter_analytics/config_flow.py`
- Test: `tests/test_config_flow.py`

**Interfaces:**
- Consumes: `detect.collect_sensors`, `detect.cluster_sensors`, `detect.classify`, `detect.Detection`; `roles.multiple_roles`, `roles.entity_roles`, `roles.number_roles`.
- Produces: `build_schema(defaults)` now emits a multi-select for roles with `multiple=True`; `pack()` accepts lists and produces lists; steps `user`, `confirm`, `manual`.

`pack()` is the contract that `EntryConfig` reads, so its output shape must be lists for every role, matching Task 1.

- [ ] **Step 1: Write the failing tests**

Add to `tests/test_config_flow.py`:

```python
def test_pack_keeps_several_entities_for_a_multiple_role():
    packed = pack(
        {
            "name": "Deye",
            "load_power": "sensor.total",
            "load_power_phase": ["sensor.l1", "sensor.l2", "sensor.l3"],
            "rated_power": 12000,
        }
    )
    assert packed["entities"]["load_power"] == ["sensor.total"]
    assert packed["entities"]["load_power_phase"] == ["sensor.l1", "sensor.l2", "sensor.l3"]


def test_pack_drops_an_empty_multiple_role():
    packed = pack({"load_power": "sensor.total", "pv_power_string": [], "rated_power": 8000})
    assert "pv_power_string" not in packed["entities"]


def test_unpack_round_trips_a_multiple_role():
    flat = {
        "load_power": "sensor.total",
        "load_power_phase": ["sensor.l1", "sensor.l2"],
        "rated_power": 12000.0,
    }
    assert unpack(pack(flat)) == flat


async def test_discovery_offers_the_detected_inverter(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    for entity_id in (
        "sensor.solarman_total_load_power",
        "sensor.solarman_load_l1_power",
        "sensor.solarman_load_l2_power",
        "sensor.solarman_load_l3_power",
        "sensor.solarman_battery_power",
        "sensor.solarman_battery_soc",
    ):
        hass.states.async_set(
            entity_id,
            "100",
            {"device_class": "battery" if entity_id.endswith("soc") else "power",
             "unit_of_measurement": "%" if entity_id.endswith("soc") else "W",
             "state_class": "measurement"},
        )
    await hass.async_block_till_done()

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"source": "solarman"}
    )
    assert result["step_id"] == "confirm"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"name": "Deye", "rated_power": 12000}
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    entities = result["result"].data["entities"]
    assert entities["load_power"] == ["sensor.solarman_total_load_power"]
    assert entities["load_power_phase"] == [
        "sensor.solarman_load_l1_power",
        "sensor.solarman_load_l2_power",
        "sensor.solarman_load_l3_power",
    ]


async def test_manual_is_reachable_when_nothing_is_detected(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["step_id"] == "manual"
```

- [ ] **Step 2: Run them and watch them fail**

Run: `.venv/bin/pytest tests/test_config_flow.py -v`
Expected: FAIL — the flow has only a `user` step and `pack` returns strings.

- [ ] **Step 3: Teach the schema and pack/unpack about multiple roles**

In `_entity_selector`, add the parameter and pass it through:

```python
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
```

and in `build_schema`, pass `role.multiple` at the call site.

In `pack`, normalise every entity value to a list:

```python
        if role.kind is RoleKind.NUMBER:
            numbers[key] = float(value)
        else:
            ids = [value] if isinstance(value, str) else [item for item in value if item]
            if ids:
                entities[key] = ids
```

and remove the earlier `value in (None, "")` guard for entity roles, since an empty list must also be dropped — keep the guard for numbers.

In `unpack`, collapse single-entity roles back to a bare string so the form pre-fills correctly:

```python
    for key, ids in (config.get(CONF_ENTITIES) or {}).items():
        role = ROLES_BY_KEY.get(key)
        if role is None:
            continue
        flat[key] = list(ids) if role.multiple else (ids[0] if ids else None)
```

- [ ] **Step 4: Add the three steps**

Replace `async_step_user` in `InverterAnalyticsConfigFlow` and add the two new steps:

```python
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
            cluster = next(c for c in clusters if c.key == user_input[CONF_SOURCE])
            self._detection = classify(cluster)
            return await self.async_step_confirm()

        options = [
            selector.SelectOptionDict(
                value=cluster.key, label=f"{cluster.label} — {len(cluster.sensors)} sensors"
            )
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

    async def async_step_confirm(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show what was detected, ask for what could not be."""
        assert self._detection is not None
        detection = self._detection

        if user_input is not None:
            packed = pack(user_input)
            choice = user_input.get(CT_CHOICE)
            if choice:
                for ambiguity in detection.ambiguities:
                    packed[CONF_ENTITIES][ambiguity.role] = list(ambiguity.options[choice])
            return self.async_create_entry(title=user_input[CONF_NAME], data=packed)

        defaults: dict[str, Any] = {}
        for role_key, ids in detection.mapping.items():
            defaults[role_key] = list(ids) if ROLES_BY_KEY[role_key].multiple else ids[0]

        fields = dict(build_schema(defaults).schema)
        for ambiguity in detection.ambiguities:
            fields[vol.Required(CT_CHOICE)] = selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=[
                        selector.SelectOptionDict(value=key, label=CT_CHOICES[key])
                        for key in ambiguity.options
                    ]
                )
            )

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
```

Add the module-level helpers and constants:

```python
CONF_SOURCE = "source"
CT_CHOICE = "ct_choice"
MANUAL = "manual"


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
```

Imports to add: `from collections.abc import Sequence`, `from .detect import Detection, classify, cluster_sensors, collect_sensors`, `from .presets import CT_CHOICES`.

- [ ] **Step 5: Run the tests**

Run: `.venv/bin/pytest tests/test_config_flow.py -v`
Expected: PASS.

If `test_discovery_offers_the_detected_inverter` fails because the flow lands on `manual`, the six seeded sensors did not reach `MIN_CLUSTER_SIZE` — check the constant rather than seeding more sensors until it passes.

- [ ] **Step 6: Full gates and commit**

```bash
git add custom_components/inverter_analytics/config_flow.py tests/test_config_flow.py
git commit -m "feat: discover inverters instead of asking for seventeen fields"
```

---

### Task 6: Every field explains itself

**Files:**
- Modify: `custom_components/inverter_analytics/translations/en.json`
- Test: `tests/test_translations.py`

**Interfaces:**
- Consumes: `roles.ROLES`, and the step ids from Task 5.
- Produces: no Python interface — a data file the wizard renders.

A translation file drifts from the schema silently: a field added without a label shows as a raw key, and nothing fails. The test closes that gap.

- [ ] **Step 1: Write the failing test**

`tests/test_translations.py`:

```python
"""The translation file must keep up with the schema.

A missing label renders as a raw key in the wizard and nothing fails, so this
is checked rather than remembered.
"""

import json
import pathlib

from custom_components.inverter_analytics.config_flow import CT_CHOICE, build_schema

TRANSLATIONS = pathlib.Path("custom_components/inverter_analytics/translations/en.json")


def _step(name: str) -> dict:
    data = json.loads(TRANSLATIONS.read_text())
    section = "options" if name == "init" else "config"
    return data[section]["step"][name]


def _schema_keys() -> set[str]:
    return {str(key.schema) for key in build_schema().schema}


def test_every_schema_field_has_a_label_in_the_manual_step():
    assert _schema_keys() <= set(_step("manual")["data"])


def test_every_schema_field_has_a_description():
    """The description is the helper text under the input, and the point of this task."""
    assert _schema_keys() <= set(_step("manual")["data_description"])


def test_the_confirm_step_covers_its_extra_field():
    confirm = _step("confirm")
    assert CT_CHOICE in confirm["data"]
    assert "{no_statistics}" in confirm["description"]


def test_rated_power_description_says_where_to_find_the_number():
    description = _step("manual")["data_description"]["rated_power"]
    assert "nameplate" in description.lower()
```

- [ ] **Step 2: Run it and watch it fail**

Run: `.venv/bin/pytest tests/test_translations.py -v`
Expected: FAIL — there is no `manual` step and no `data_description` anywhere in the file.

- [ ] **Step 3: Rewrite the translation file**

Replace `custom_components/inverter_analytics/translations/en.json`. Every role gets a label and a description; descriptions say what the label cannot.

```json
{
  "config": {
    "step": {
      "user": {
        "title": "Inverter Analytics",
        "description": "Pick the inverter to analyse. Sensors are grouped by the integration that created them.",
        "data": { "source": "Inverter" }
      },
      "confirm": {
        "title": "Confirm the detected sensors",
        "description": "Check the mapping and fill in what could not be detected. {no_statistics}",
        "data": {
          "name": "Name",
          "ct_choice": "Grid measurement",
          "rated_power": "Rated power",
          "rated_power_per_phase": "Rated power per phase",
          "battery_capacity": "Battery capacity",
          "load_power": "Load power",
          "load_power_phase": "Load power per phase",
          "pv_power": "PV power",
          "pv_power_string": "PV power per string",
          "battery_power": "Battery power",
          "grid_power": "Grid power",
          "grid_power_phase": "Grid power per phase",
          "battery_soc": "Battery state of charge",
          "grid_connected": "Grid connected",
          "pv_energy_total": "PV energy total",
          "load_energy_total": "Load energy total",
          "battery_charge_total": "Battery charge energy total",
          "battery_discharge_total": "Battery discharge energy total",
          "grid_import_total": "Grid import total",
          "grid_export_total": "Grid export total",
          "invert_battery_power": "Invert battery power sign",
          "invert_grid_power": "Invert grid power sign",
          "invert_grid_power_phase": "Invert per-phase grid power sign"
        },
        "data_description": {
          "ct_choice": "Which current transformers face the grid. This depends on how they were installed."
        }
      },
      "manual": {
        "title": "Map sensors manually",
        "description": "Only load power and rated power are required. Everything else is optional and feeds analytics that may not be built yet.",
        "data": {
          "name": "Name",
          "rated_power": "Rated power",
          "rated_power_per_phase": "Rated power per phase",
          "battery_capacity": "Battery capacity",
          "load_power": "Load power",
          "load_power_phase": "Load power per phase",
          "pv_power": "PV power",
          "pv_power_string": "PV power per string",
          "battery_power": "Battery power",
          "grid_power": "Grid power",
          "grid_power_phase": "Grid power per phase",
          "battery_soc": "Battery state of charge",
          "grid_connected": "Grid connected",
          "pv_energy_total": "PV energy total",
          "load_energy_total": "Load energy total",
          "battery_charge_total": "Battery charge energy total",
          "battery_discharge_total": "Battery discharge energy total",
          "grid_import_total": "Grid import total",
          "grid_export_total": "Grid export total",
          "invert_battery_power": "Invert battery power sign",
          "invert_grid_power": "Invert grid power sign",
          "invert_grid_power_phase": "Invert per-phase grid power sign"
        },
        "data_description": {
          "name": "Shown in the sidebar page when you have more than one inverter.",
          "rated_power": "The inverter's continuous rated power in watts, from its nameplate. Load bands and overload episodes are measured against it. For a SUN-12K this is 12000.",
          "rated_power_per_phase": "Optional. The per-phase limit in watts. Leave empty to assume a third of the rated power — the analytics will say when it has assumed.",
          "battery_capacity": "Usable capacity in kWh. Used to count equivalent full cycles.",
          "load_power": "Total consumption on the inverter's output. If you also have per-phase sensors, map them below to get imbalance analysis.",
          "load_power_phase": "One sensor per phase, in order L1, L2, L3. Only used for the per-phase section; the totals above stay the source for headline figures.",
          "pv_power": "Total solar production as the inverter reports it.",
          "pv_power_string": "One sensor per string. Stored now; per-string charts arrive with the solar tab.",
          "battery_power": "Charge and discharge power on one sensor. Use the inversion switch below if the sign runs the other way.",
          "grid_power": "Exchange with the grid. Positive usually means import.",
          "grid_power_phase": "One sensor per phase for the grid connection.",
          "battery_soc": "State of charge in percent.",
          "grid_connected": "A binary sensor that is on while grid power is present. Used to measure outages.",
          "pv_energy_total": "A lifetime kWh counter, not a daily one. Daily counters reset and would be read as a drop to zero.",
          "load_energy_total": "A lifetime kWh counter for consumption.",
          "battery_charge_total": "A lifetime kWh counter for energy into the battery.",
          "battery_discharge_total": "A lifetime kWh counter for energy out of the battery.",
          "grid_import_total": "A lifetime kWh counter for energy bought.",
          "grid_export_total": "A lifetime kWh counter for energy sold.",
          "invert_battery_power": "Enable if your sensor reports discharge as a positive number. Easy to check: look at the sign while the battery is charging.",
          "invert_grid_power": "Enable if your sensor reports import as a negative number.",
          "invert_grid_power_phase": "Same, for the per-phase grid sensors."
        }
      }
    }
  },
  "options": {
    "step": {
      "init": {
        "title": "Inverter Analytics",
        "description": "Change the sensor mapping and the inverter's parameters.",
        "data": { "name": "Name" },
        "data_description": { "name": "Shown in the sidebar page when you have more than one inverter." }
      }
    }
  }
}
```

The `options.init` step reuses the manual form, so copy the `data` and `data_description` blocks from `manual` into it as well — the test only checks `manual`, but a missing label there is just as visible to a user.

- [ ] **Step 4: Run the tests**

Run: `.venv/bin/pytest tests/test_translations.py -v`
Expected: PASS, 4 tests.

- [ ] **Step 5: Full gates and commit**

Run all four Python gates and the three frontend ones.

```bash
git add custom_components/inverter_analytics/translations/en.json tests/test_translations.py
git commit -m "feat: explain every field in the setup wizard"
```

---

## Task order and dependencies

```
Task 1 (roles hold several entities)
  ├── Task 2 (WS payload + frontend type)
  └── Task 3 (clustering) ── Task 4 (classification + presets)
                                  └── Task 5 (three-step wizard) ── Task 6 (field descriptions)
```

Tasks 2 and 3 are independent of each other once Task 1 lands.

## Done when

1. All four Python gates and all three frontend gates pass, locally and in CI.
2. An existing config entry created before this plan still loads and its Load tab still renders — check with an entry whose `entities` hold bare strings.
3. On an installation with a Solarman inverter, the wizard's first step lists it by name with a sensor count, and choosing it pre-fills load, phases, battery and the energy counters.
4. The confirm step asks which CT set faces the grid, and names any sensors that have no long-term statistics.
5. Every field in the manual form shows helper text underneath.
6. A single-phase user's experience is unchanged apart from the new descriptions.
