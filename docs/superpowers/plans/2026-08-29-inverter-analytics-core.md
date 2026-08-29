# Inverter Analytics — Implementation Plan (Stages 1–3: scaffold, data core, load)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working HACS integration `inverter_analytics` that installs into Home Assistant, provides a manual sensor-mapping wizard, adds a sidebar page, and shows full inverter-load analytics on it.

**Architecture:** A Python integration computes all analytics server-side on the recorder's executor thread and exposes only aggregates (histograms, KPIs, curves), sized in kilobytes, over the WebSocket API. The frontend is a separate Lit component, built by Vite into a single JS file registered as a custom panel. All distribution math is time-weighted by state duration, because HA states arrive at irregular intervals.

**Tech Stack:** Python 3.12, Home Assistant 2024.11+, voluptuous, pytest + pytest-homeassistant-custom-component, ruff; TypeScript, Lit 3, ECharts 5, Vite 5, vitest.

**Spec:** `docs/superpowers/specs/2026-08-29-inverter-analytics-design.md`

**Out of scope for this plan** (separate plans): `battery.py` and the "Battery" tab, `seasonal.py` and "Seasonality", `balance.py` and "Balance", brand presets, the "Verification" step in the wizard, Repair issues, CSV export, localization.

## Global Constraints

- Integration domain: `inverter_analytics`. Cannot be changed — paths, WS commands, and the panel URL depend on it.
- Minimum Home Assistant version: **2024.11.0**. `StaticPathConfig` and `async_register_static_paths` have existed since 2024.7, but from 2024.11 `OptionsFlow.config_entry` is provided by the platform automatically, and manual assignment is removed in newer versions — a lower floor would force writing code that breaks.
- Minimum Python version: **3.12**.
- No external Python dependencies: `"requirements": []` in `manifest.json`. All math uses the standard library.
- All work against the recorder database happens **only** via `get_instance(hass).async_add_executor_job(...)`. Direct synchronous recorder calls from the event loop are forbidden.
- No arithmetic mean over samples, ever. All averages, percentiles, and distributions are time-weighted (`Σ(v·dt)/Σdt`).
- `unavailable` / `unknown` states are never interpolated: they're excluded from the statistics, and their duration is tracked in `coverage`.
- All timestamps inside Python are timezone-aware UTC. Conversion to the local zone happens only at the hour-of-day bucketing step.
- All frontend colors go through Home Assistant CSS variables. Hardcoded hex colors are allowed only for the fixed chart-series palette, declared in a single file, `frontend/src/theme.ts`.
- Panel URL: `/inverter-analytics`. WS command prefix: `inverter_analytics/`.
- Repository branch: `main`. Every task ends in a commit.

## Config storage format

`ConfigEntry.data` has exactly this shape (locked in by Task 2, consumed everywhere):

```python
{
    "entities": {"load_power": "sensor.inverter_load_power", "pv_power": "sensor.pv_power"},
    "numbers": {"rated_power": 8000.0, "battery_capacity": 10.24},
    "inverted": ["battery_power"],
}
```

`ConfigEntry.options` has the same shape and **fully overrides** `data` when non-empty.

## File Structure

| File | Responsibility |
|---|---|
| `custom_components/inverter_analytics/const.py` | Constants: domain, panel URL, storage keys. No logic. |
| `custom_components/inverter_analytics/manifest.json` | Integration metadata for HA and HACS. |
| `custom_components/inverter_analytics/__init__.py` | Config entry lifecycle: registering the panel, static files, and the WS API. |
| `custom_components/inverter_analytics/roles.py` | Canonical role list + the `EntryConfig` model (reading `data`/`options`). Pure logic, no HA dependencies besides types. |
| `custom_components/inverter_analytics/config_flow.py` | Setup wizard and options flow. |
| `custom_components/inverter_analytics/panel.py` | Registering and unregistering the custom panel and static path. |
| `custom_components/inverter_analytics/websocket_api.py` | WS commands: parameter validation, cache, serialization. No math. |
| `custom_components/inverter_analytics/analytics/resample.py` | Time-weighted math: intervals, coverage, averages, histograms, percentiles, episodes. Pure functions, zero HA dependencies. |
| `custom_components/inverter_analytics/analytics/source.py` | Data access: raw/LTS/mixed selection, reading the recorder, building `Series`. |
| `custom_components/inverter_analytics/analytics/cache.py` | TTL result cache with a size limit. |
| `custom_components/inverter_analytics/analytics/load.py` | Load analytics: KPIs, histogram, LDC, rated-power bands, overloads. |
| `frontend/src/panel.ts` | The panel's root component: header, tabs, URL routing. |
| `frontend/src/api.ts` | Wrapper around HA's WS connection. |
| `frontend/src/theme.ts` | Series palette and shared chart styles. |
| `frontend/src/tabs/load-tab.ts` | "Load" tab. |
| `frontend/src/charts/*.ts` | ECharts wrappers: histogram, duration curve, bands. |

`analytics/resample.py` deliberately knows nothing about Home Assistant — this lets the highest-risk math be tested with hand-built data without spinning up `hass`.

---

### Task 1: Integration scaffold and CI

**Files:**
- Create: `custom_components/inverter_analytics/__init__.py`
- Create: `custom_components/inverter_analytics/manifest.json`
- Create: `custom_components/inverter_analytics/const.py`
- Create: `custom_components/inverter_analytics/config_flow.py` (a stub, fully rewritten in Task 3)
- Create: `hacs.json`, `pyproject.toml`, `requirements_test.txt`, `.gitignore`, `README.md`
- Create: `tests/conftest.py`
- Test: `tests/test_init.py`
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: nothing.
- Produces: `const.DOMAIN = "inverter_analytics"`, `const.PANEL_URL_PATH = "inverter-analytics"`, `const.STATIC_URL_BASE = "/inverter_analytics_static"`; `async_setup_entry(hass, entry) -> bool`, `async_unload_entry(hass, entry) -> bool`; `hass.data[DOMAIN][entry.entry_id]` — the entry's state dict.

- [ ] **Step 1: Create dependency files and test config**

`requirements_test.txt`:

```
# pytest-homeassistant-custom-component pins the exact compatible version of
# homeassistant itself and pulls in pytest and pytest-asyncio. Don't add a
# separate homeassistant line here: two sources of truth for the HA version
# send pip's resolver into multi-minute backtracking.
pytest-homeassistant-custom-component>=0.13.140
ruff>=0.6.0

# The frontend and recorder components the integration depends on pull these
# packages in at runtime. PHACC doesn't install them, so CI needs them explicitly.
# home-assistant-frontend is left unpinned: HA pins the exact version in its
# own manifest, and duplicating that pin here would drift on every HA update.
home-assistant-frontend
fnv-hash-fast
psutil-home-assistant
```

Verified environment: Python 3.12.9, HA 2025.1.4, pytest 8.3.4, ruff 0.16.5.

`pyproject.toml`:

```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
pythonpath = ["."]

[tool.ruff]
target-version = "py312"
line-length = 100
# ruff format reformats Python blocks inside Markdown. The plans and specs
# in docs/ are the verbatim source of briefs for upcoming tasks, so the
# formatter must not touch them. Applies to format, not check.
extend-exclude = ["docs"]

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM", "RUF"]
# The codebase is commented in Ukrainian; RUF001-003 false-positive on
# Cyrillic as "ambiguous" characters, confusing it with Latin.
ignore = ["RUF001", "RUF002", "RUF003"]

[tool.ruff.lint.isort]
force-sort-within-sections = true
known-first-party = ["custom_components"]
```

`.gitignore`:

```
__pycache__/
*.pyc
.pytest_cache/
.ruff_cache/
.venv/
node_modules/
frontend/dist/
```

Note: `frontend/dist/` (the intermediate Vite build) is ignored, but **not** `custom_components/inverter_analytics/frontend/dist/` — the final bundle is committed, because HACS only installs the `custom_components/` folder.

- [ ] **Step 2: Write a failing test**

`tests/conftest.py` contains only the plugin declaration — no autouse fixtures:

```python
"""Shared test fixtures."""

pytest_plugins = "pytest_homeassistant_custom_component"
```

Autouse isn't possible here: pytest resolves autouse fixtures before explicitly requested ones, so an autouse wrapper around `enable_custom_integrations` would end up building `hass` before `recorder_mock` gets its queue, and the latter fails with `assert not hass_fixture_setup`. So every test that loads the integration requests both fixtures explicitly, with `recorder_mock` first. The pure-math tests from Tasks 5-7 and 9 request neither, and pay for neither the recorder nor `hass`.

`tests/test_init.py`:

```python
"""Config entry lifecycle tests."""
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import DOMAIN


def _entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Inverter",
        data={
            "entities": {"load_power": "sensor.load_power"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )


async def test_setup_and_unload_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED
    assert entry.entry_id in hass.data[DOMAIN]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.NOT_LOADED
    assert entry.entry_id not in hass.data[DOMAIN]
```

- [ ] **Step 3: Run the test and confirm it fails**

Run: `pytest tests/test_init.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics'`

- [ ] **Step 4: Create the minimal integration**

`custom_components/inverter_analytics/manifest.json`:

```json
{
  "domain": "inverter_analytics",
  "name": "Inverter Analytics",
  "codeowners": ["@SorochanRoman"],
  "config_flow": true,
  "dependencies": ["frontend", "http", "recorder", "websocket_api"],
  "documentation": "https://github.com/SorochanRoman/ha-inverter-analytics",
  "integration_type": "service",
  "iot_class": "calculated",
  "issue_tracker": "https://github.com/SorochanRoman/ha-inverter-analytics/issues",
  "requirements": [],
  "version": "0.1.0"
}
```

`custom_components/inverter_analytics/const.py`:

```python
"""Constants for the Inverter Analytics integration."""
from __future__ import annotations

from typing import Final

DOMAIN: Final = "inverter_analytics"

PANEL_URL_PATH: Final = "inverter-analytics"
PANEL_TITLE: Final = "Inverter Analytics"
PANEL_ICON: Final = "mdi:chart-box-outline"

STATIC_URL_BASE: Final = "/inverter_analytics_static"
PANEL_BUNDLE: Final = "inverter-analytics-panel.js"
PANEL_ELEMENT: Final = "inverter-analytics-panel"

DATA_CACHE: Final = "cache"

CONF_ENTITIES: Final = "entities"
CONF_NUMBERS: Final = "numbers"
CONF_INVERTED: Final = "inverted"
```

`custom_components/inverter_analytics/__init__.py`:

```python
"""Inverter Analytics integration."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {}
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return True


async def _async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry after its options change."""
    await hass.config_entries.async_reload(entry.entry_id)
```

`custom_components/inverter_analytics/config_flow.py` — a stub. Home Assistant imports the `config_flow` platform while setting up any config entry, before `async_setup_entry` is even called, and without this file the entry gets `SETUP_ERROR`. `MockConfigEntry` bypasses the wizard itself, but not this import. Task 3 writes the full implementation, rewriting the file entirely.

```python
"""Inverter Analytics setup wizard.

Stub: full implementation with sensor mapping — Task 3.
"""

from __future__ import annotations

from homeassistant.config_entries import ConfigFlow

from .const import DOMAIN


class InverterAnalyticsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Wizard for adding an inverter."""

    VERSION = 1
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `pytest tests/test_init.py -v`
Expected: PASS (2 asserts, on LOADED and NOT_LOADED)

- [ ] **Step 6: Add HACS metadata and README**

`hacs.json`:

```json
{
  "name": "Inverter Analytics",
  "render_readme": true,
  "homeassistant": "2024.11.0"
}
```

`README.md` — a short description, requirements (HA 2024.11+, recorder enabled), instructions for installing via HACS Custom repositories, a link to the spec.

- [ ] **Step 7: Add CI**

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Hassfest
        uses: home-assistant/actions/hassfest@master
      - name: HACS
        uses: hacs/action@main
        with:
          category: integration

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements_test.txt
      - run: ruff check .
      - run: ruff format --check .
      - run: pytest -v
```

- [ ] **Step 8: Run the full suite and the linter**

Run: `ruff check . && ruff format --check . && pytest -v`
Expected: all green

- [ ] **Step 9: Commit**

```bash
git add custom_components tests hacs.json pyproject.toml requirements_test.txt .gitignore README.md .github
git commit -m "feat: inverter_analytics integration skeleton + CI"
```

---

### Task 2: Roles and the config model

**Files:**
- Create: `custom_components/inverter_analytics/roles.py`
- Test: `tests/test_roles.py`

**Interfaces:**
- Consumes: `const.CONF_ENTITIES`, `const.CONF_NUMBERS`, `const.CONF_INVERTED`.
- Produces:
  - `RoleKind` (StrEnum: `POWER`, `PERCENT`, `ENERGY`, `BINARY`, `NUMBER`)
  - `Role` (frozen dataclass: `key: str`, `kind: RoleKind`, `unit: str`, `required: bool`, `invertible: bool`)
  - `ROLES: tuple[Role, ...]`, `ROLES_BY_KEY: dict[str, Role]`
  - `entity_roles() -> tuple[Role, ...]`, `number_roles() -> tuple[Role, ...]`, `required_role_keys() -> frozenset[str]`
  - `EntryConfig` (frozen dataclass) with methods `from_entry(entry)`, `from_dict(data)`, `entity_id(key) -> str | None`, `number(key) -> float | None`, `sign(key) -> float`, `has(*keys) -> bool`

- [ ] **Step 1: Write a failing test**

`tests/test_roles.py`:

```python
"""Tests for the canonical roles and the config model."""
import pytest

from custom_components.inverter_analytics.roles import (
    ROLES_BY_KEY,
    EntryConfig,
    RoleKind,
    entity_roles,
    number_roles,
    required_role_keys,
)


def test_load_power_is_a_required_entity_role():
    role = ROLES_BY_KEY["load_power"]
    assert role.kind is RoleKind.POWER
    assert role.required is True
    assert role in entity_roles()


def test_rated_power_is_a_number_not_an_entity():
    role = ROLES_BY_KEY["rated_power"]
    assert role.kind is RoleKind.NUMBER
    assert role in number_roles()
    assert role not in entity_roles()


def test_only_load_power_and_rated_power_are_required():
    assert required_role_keys() == frozenset({"load_power", "rated_power"})


def test_battery_and_grid_power_are_invertible_pv_is_not():
    assert ROLES_BY_KEY["battery_power"].invertible is True
    assert ROLES_BY_KEY["grid_power"].invertible is True
    assert ROLES_BY_KEY["pv_power"].invertible is False


def test_role_keys_are_unique():
    keys = [role.key for role in ROLES_BY_KEY.values()]
    assert len(keys) == len(set(keys))


def test_entry_config_reads_entities_numbers_and_inversion():
    config = EntryConfig.from_dict(
        {
            "entities": {"load_power": "sensor.load", "battery_power": "sensor.batt"},
            "numbers": {"rated_power": 8000.0},
            "inverted": ["battery_power"],
        }
    )
    assert config.entity_id("load_power") == "sensor.load"
    assert config.entity_id("pv_power") is None
    assert config.number("rated_power") == 8000.0
    assert config.number("battery_capacity") is None
    assert config.sign("battery_power") == -1.0
    assert config.sign("load_power") == 1.0


def test_entry_config_has_checks_every_key():
    config = EntryConfig.from_dict(
        {"entities": {"load_power": "sensor.load"}, "numbers": {"rated_power": 8000.0}, "inverted": []}
    )
    assert config.has("load_power") is True
    assert config.has("load_power", "battery_soc") is False


def test_entry_config_rejects_unknown_role_key():
    with pytest.raises(KeyError):
        EntryConfig.from_dict(
            {"entities": {"nonsense": "sensor.x"}, "numbers": {}, "inverted": []}
        )


def test_entry_config_ignores_empty_entity_values():
    config = EntryConfig.from_dict(
        {"entities": {"load_power": "sensor.load", "pv_power": ""}, "numbers": {}, "inverted": []}
    )
    assert config.entity_id("pv_power") is None
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pytest tests/test_roles.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.roles'`

- [ ] **Step 3: Implement `roles.py`**

```python
"""Canonical sensor roles and the config-entry model."""
from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from enum import StrEnum
from typing import Any

from homeassistant.config_entries import ConfigEntry

from .const import CONF_ENTITIES, CONF_INVERTED, CONF_NUMBERS


class RoleKind(StrEnum):
    """The type of value a role carries."""

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


ROLES: tuple[Role, ...] = (
    Role("load_power", RoleKind.POWER, "W", required=True),
    Role("rated_power", RoleKind.NUMBER, "W", required=True),
    Role("pv_power", RoleKind.POWER, "W"),
    Role("battery_power", RoleKind.POWER, "W", invertible=True),
    Role("grid_power", RoleKind.POWER, "W", invertible=True),
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


def entity_roles() -> tuple[Role, ...]:
    """Roles that map to an entity."""
    return tuple(role for role in ROLES if role.kind is not RoleKind.NUMBER)


def number_roles() -> tuple[Role, ...]:
    """Roles that are given as a number in the config."""
    return tuple(role for role in ROLES if role.kind is RoleKind.NUMBER)


def required_role_keys() -> frozenset[str]:
    """Keys of the required roles."""
    return frozenset(role.key for role in ROLES if role.required)


@dataclass(frozen=True, slots=True)
class EntryConfig:
    """Parsed configuration for a single inverter."""

    entities: Mapping[str, str]
    numbers: Mapping[str, float]
    inverted: frozenset[str]

    @classmethod
    def from_dict(cls, data: Mapping[str, Any]) -> EntryConfig:
        """Build a config from a dict in the ConfigEntry.data format."""
        entities: dict[str, str] = {}
        for key, value in (data.get(CONF_ENTITIES) or {}).items():
            if key not in ROLES_BY_KEY:
                raise KeyError(f"Unknown role: {key}")
            if value:
                entities[key] = value

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

    def entity_id(self, role_key: str) -> str | None:
        """The entity_id for a role, or None."""
        return self.entities.get(role_key)

    def number(self, role_key: str) -> float | None:
        """The numeric value of a role, or None."""
        return self.numbers.get(role_key)

    def sign(self, role_key: str) -> float:
        """Sign multiplier for a role: -1.0 if inversion is enabled."""
        return -1.0 if role_key in self.inverted else 1.0

    def has(self, *role_keys: str) -> bool:
        """Whether all of the listed roles are set."""
        return all(
            (key in self.numbers) if ROLES_BY_KEY[key].kind is RoleKind.NUMBER else (key in self.entities)
            for key in role_keys
        )
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_roles.py -v`
Expected: PASS, 9 tests

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/roles.py tests/test_roles.py
git commit -m "feat: canonical sensor roles and the EntryConfig model"
```

---

### Task 3: Setup wizard with manual mapping

**Files:**
- Rewrite: `custom_components/inverter_analytics/config_flow.py` (fully replaces the Task 1 stub)
- Create: `custom_components/inverter_analytics/translations/en.json`
- Test: `tests/test_config_flow.py`

**Interfaces:**
- Consumes: `roles.entity_roles()`, `roles.number_roles()`, `roles.ROLES_BY_KEY`, `roles.RoleKind`, `const.CONF_ENTITIES`, `const.CONF_NUMBERS`, `const.CONF_INVERTED`, `const.DOMAIN`.
- Produces: `InverterAnalyticsConfigFlow` (VERSION = 1), `InverterAnalyticsOptionsFlow`; the functions `build_schema(defaults: Mapping[str, Any]) -> vol.Schema` and `pack(user_input: Mapping[str, Any]) -> dict[str, Any]`, `unpack(config: Mapping[str, Any]) -> dict[str, Any]` — used by both the wizard and the options flow.

The form is flat: keys `load_power`, `rated_power`, `invert_battery_power`, `name`. `pack()` converts the flat dict into the nested `ConfigEntry.data` shape; `unpack()` does the reverse, so the options flow can show the current values.

- [ ] **Step 1: Write a failing test**

`tests/test_config_flow.py`:

```python
"""Setup wizard tests."""
from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.config_flow import pack, unpack
from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.roles import EntryConfig


def test_pack_splits_flat_form_into_entities_numbers_and_inverted():
    packed = pack(
        {
            "name": "Deye 8kW",
            "load_power": "sensor.load",
            "battery_power": "sensor.batt",
            "rated_power": 8000,
            "invert_battery_power": True,
            "invert_grid_power": False,
        }
    )
    assert packed["entities"] == {"load_power": "sensor.load", "battery_power": "sensor.batt"}
    assert packed["numbers"] == {"rated_power": 8000.0}
    assert packed["inverted"] == ["battery_power"]
    assert "name" not in packed["entities"]


def test_pack_drops_empty_fields():
    packed = pack({"load_power": "sensor.load", "pv_power": "", "rated_power": 5000})
    assert "pv_power" not in packed["entities"]


def test_unpack_is_the_inverse_of_pack():
    flat = {"load_power": "sensor.load", "rated_power": 8000.0, "invert_battery_power": True,
            "battery_power": "sensor.batt"}
    assert unpack(pack(flat)) == flat


async def test_user_flow_creates_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {"name": "Deye 8kW", "load_power": "sensor.load", "rated_power": 8000},
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Deye 8kW"
    assert result["data"]["entities"] == {"load_power": "sensor.load"}
    assert result["data"]["numbers"] == {"rated_power": 8000.0}


async def test_options_flow_overrides_data(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={"entities": {"load_power": "sensor.old"}, "numbers": {"rated_power": 8000.0},
              "inverted": []},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"name": "Deye", "load_power": "sensor.new", "rated_power": 12000}
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options["entities"] == {"load_power": "sensor.new"}
    assert entry.options["numbers"] == {"rated_power": 12000.0}

    # EntryConfig contract: non-empty options fully override data rather
    # than merging with it. This is checked here because the options flow
    # is the only place these options ever appear.
    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.new"
    assert config.number("rated_power") == 12000.0
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pytest tests/test_config_flow.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.config_flow'`

- [ ] **Step 3: Implement `config_flow.py`**

```python
"""Inverter Analytics setup wizard."""
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
    """Entity picker, narrowed by device_class where that makes sense."""
    if kind is RoleKind.BINARY:
        return selector.EntitySelector(selector.EntitySelectorConfig(domain="binary_sensor"))
    return selector.EntitySelector(
        selector.EntitySelectorConfig(domain="sensor", device_class=_DEVICE_CLASS_BY_KIND[kind])
    )


def build_schema(defaults: Mapping[str, Any] | None = None) -> vol.Schema:
    """Build the flat schema for the mapping form."""
    defaults = defaults or {}
    fields: dict[Any, Any] = {
        vol.Required(CONF_NAME, default=defaults.get(CONF_NAME, "Inverter")): selector.TextSelector()
    }

    for role in number_roles():
        marker = vol.Required if role.required else vol.Optional
        key = (
            marker(role.key, default=defaults[role.key])
            if role.key in defaults
            else marker(role.key)
        )
        fields[key] = selector.NumberSelector(
            selector.NumberSelectorConfig(
                min=0, step="any", mode=selector.NumberSelectorMode.BOX, unit_of_measurement=role.unit
            )
        )

    for role in entity_roles():
        marker = vol.Required if role.required else vol.Optional
        key = (
            marker(role.key, default=defaults[role.key])
            if role.key in defaults
            else marker(role.key)
        )
        fields[key] = _entity_selector(role.kind)

    for role in entity_roles():
        if not role.invertible:
            continue
        flag = f"{INVERT_PREFIX}{role.key}"
        fields[vol.Optional(flag, default=bool(defaults.get(flag, False)))] = selector.BooleanSelector()

    return vol.Schema(fields)


def pack(user_input: Mapping[str, Any]) -> dict[str, Any]:
    """Convert the flat form into the nested ConfigEntry.data shape."""
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
    """Convert the nested shape back into a flat form."""
    flat: dict[str, Any] = {}
    flat.update(config.get(CONF_ENTITIES) or {})
    flat.update(config.get(CONF_NUMBERS) or {})
    for key in config.get(CONF_INVERTED) or ():
        flat[f"{INVERT_PREFIX}{key}"] = True
    return flat


class InverterAnalyticsConfigFlow(ConfigFlow, domain=DOMAIN):
    """Wizard for adding an inverter."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Manual mapping step."""
        if user_input is not None:
            return self.async_create_entry(title=user_input[CONF_NAME], data=pack(user_input))
        return self.async_show_form(step_id="user", data_schema=build_schema())

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return InverterAnalyticsOptionsFlow()


class InverterAnalyticsOptionsFlow(OptionsFlow):
    """Reconfigure the mapping without reinstalling."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show the form with the current values."""
        if user_input is not None:
            return self.async_create_entry(title="", data=pack(user_input))

        current = self.config_entry.options or self.config_entry.data
        defaults = unpack(current) | {CONF_NAME: self.config_entry.title}
        return self.async_show_form(step_id="init", data_schema=build_schema(defaults))
```

`self.config_entry` on `OptionsFlow` is provided by the platform automatically (HA 2024.11+) — don't assign it manually, that's removed in newer versions.

- [ ] **Step 4: Add the English strings**

`custom_components/inverter_analytics/translations/en.json`:

```json
{
  "config": {
    "step": {
      "user": {
        "title": "Inverter Analytics",
        "description": "Map your inverter sensors. Only load power and rated power are required.",
        "data": {
          "name": "Name",
          "rated_power": "Inverter rated power",
          "battery_capacity": "Battery capacity",
          "load_power": "Load power",
          "pv_power": "PV power",
          "battery_power": "Battery power",
          "grid_power": "Grid power",
          "battery_soc": "Battery state of charge",
          "grid_connected": "Grid connected",
          "pv_energy_total": "PV energy total",
          "load_energy_total": "Load energy total",
          "battery_charge_total": "Battery charge energy total",
          "battery_discharge_total": "Battery discharge energy total",
          "grid_import_total": "Grid import total",
          "grid_export_total": "Grid export total",
          "invert_battery_power": "Invert battery power sign",
          "invert_grid_power": "Invert grid power sign"
        }
      }
    }
  },
  "options": {
    "step": {
      "init": {
        "title": "Inverter Analytics",
        "description": "Change sensor mapping and inverter parameters.",
        "data": {
          "name": "Name",
          "rated_power": "Inverter rated power",
          "battery_capacity": "Battery capacity",
          "load_power": "Load power",
          "pv_power": "PV power",
          "battery_power": "Battery power",
          "grid_power": "Grid power",
          "battery_soc": "Battery state of charge",
          "grid_connected": "Grid connected",
          "pv_energy_total": "PV energy total",
          "load_energy_total": "Load energy total",
          "battery_charge_total": "Battery charge energy total",
          "battery_discharge_total": "Battery discharge energy total",
          "grid_import_total": "Grid import total",
          "grid_export_total": "Grid export total",
          "invert_battery_power": "Invert battery power sign",
          "invert_grid_power": "Invert grid power sign"
        }
      }
    }
  }
}
```

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `pytest tests/test_config_flow.py -v`
Expected: PASS, 5 tests

- [ ] **Step 6: Commit**

```bash
git add custom_components/inverter_analytics/config_flow.py \
        custom_components/inverter_analytics/translations tests/test_config_flow.py
git commit -m "feat: setup wizard with manual sensor mapping"
```

---

### Task 4: Registering the panel in the sidebar

**Files:**
- Create: `custom_components/inverter_analytics/panel.py`
- Create: `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` (a stub — the real bundle comes in Task 12)
- Modify: `custom_components/inverter_analytics/__init__.py`
- Modify: `.gitignore`
- Test: `tests/test_panel.py`

**Interfaces:**
- Consumes: `const.PANEL_URL_PATH`, `const.PANEL_TITLE`, `const.PANEL_ICON`, `const.STATIC_URL_BASE`, `const.PANEL_BUNDLE`, `const.PANEL_ELEMENT`, `const.DOMAIN`.
- Produces: `async_register_panel(hass) -> None`, `async_remove_panel(hass) -> None`. Both are idempotent: the panel and the static path are registered once for the whole of HA, regardless of how many config entries exist, and are torn down when the last entry disappears.

- [ ] **Step 1: Fix `.gitignore`**

Replace the line `frontend/dist/` with `/frontend/dist/`. Without the leading slash the pattern matches **any** `frontend/dist/` in the tree, including `custom_components/inverter_analytics/frontend/dist/` — and that bundle needs to be committed, or the HACS install ends up empty.

Check: `git check-ignore -v custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` should print nothing.

- [ ] **Step 2: Create the bundle stub**

`custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js`:

```javascript
// Stub. The real bundle is built from frontend/ via Vite (Task 12).
class InverterAnalyticsPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<p style='padding:16px'>Inverter Analytics: frontend not built yet.</p>";
  }
}
customElements.define("inverter-analytics-panel", InverterAnalyticsPanel);
```

- [ ] **Step 3: Write a failing test**

`tests/test_panel.py`:

```python
"""Panel registration tests."""
from homeassistant.components import frontend
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.const import DOMAIN, PANEL_URL_PATH


def _entry(title: str) -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title=title,
        data={"entities": {"load_power": "sensor.load"}, "numbers": {"rated_power": 8000.0},
              "inverted": []},
    )


async def test_panel_registered_on_setup(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Deye")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]


async def test_panel_removed_when_last_entry_unloaded(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = _entry("Deye")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH not in hass.data[frontend.DATA_PANELS]


async def test_panel_survives_while_another_entry_remains(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    first, second = _entry("Deye"), _entry("Victron")
    for entry in (first, second):
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert await hass.config_entries.async_unload(first.entry_id)
    await hass.async_block_till_done()

    assert PANEL_URL_PATH in hass.data[frontend.DATA_PANELS]
```

The third test catches the most likely bug: the panel getting removed when *any* entry unloads, not just the last one. Idempotent static-path registration is needed because HA brings up all of a domain's config entries concurrently via `asyncio.gather`, and without the guard each entry would add a duplicate resource to the router. Verified empirically on HA 2025.1.4: re-registration there doesn't raise, so the guard is hygiene, not crash prevention.

- [ ] **Step 4: Run the tests and confirm they fail**

Run: `pytest tests/test_panel.py -v`
Expected: FAIL — `KeyError: 'inverter-analytics'`, the panel isn't registered

- [ ] **Step 5: Implement `panel.py`**

```python
"""Registration of the Inverter Analytics custom panel."""
from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    PANEL_BUNDLE,
    PANEL_ELEMENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
)

_DATA_STATIC_REGISTERED = "static_registered"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the static files and the sidebar entry. Idempotent."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    if not domain_data.get(_DATA_STATIC_REGISTERED):
        dist = Path(__file__).parent / "frontend" / "dist"
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, str(dist), False)]
        )
        domain_data[_DATA_STATIC_REGISTERED] = True

    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        return

    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        frontend_url_path=PANEL_URL_PATH,
        require_admin=False,
        config={
            "_panel_custom": {
                "name": PANEL_ELEMENT,
                "module_url": f"{STATIC_URL_BASE}/{PANEL_BUNDLE}",
                "embed_iframe": False,
                "trust_external": False,
            }
        },
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    """Remove the sidebar entry. The static path stays registered — aiohttp can't unregister it."""
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
```

- [ ] **Step 6: Wire the panel into `__init__.py`**

Replace the bodies of `async_setup_entry` and `async_unload_entry`:

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {}
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    await async_register_panel(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    domain_data = hass.data.get(DOMAIN, {})
    domain_data.pop(entry.entry_id, None)
    if not _has_remaining_entries(hass):
        async_remove_panel(hass)
    return True


def _has_remaining_entries(hass: HomeAssistant) -> bool:
    """Whether any loaded entries of this integration remain."""
    domain_data = hass.data.get(DOMAIN, {})
    return any(
        entry.entry_id in domain_data for entry in hass.config_entries.async_entries(DOMAIN)
    )
```

Add the import: `from .panel import async_register_panel, async_remove_panel`.

The `_DATA_STATIC_REGISTERED` key lives in the same `hass.data[DOMAIN]` dict as the entries, so `_has_remaining_entries` checks specifically for `entry_id` membership rather than the dict being non-empty.

- [ ] **Step 7: Run the tests and confirm they pass**

Run: `pytest tests/test_panel.py tests/test_init.py -v`
Expected: PASS, 5 tests

- [ ] **Step 8: Commit**

```bash
git add custom_components/inverter_analytics/panel.py \
        custom_components/inverter_analytics/__init__.py \
        custom_components/inverter_analytics/frontend .gitignore tests/test_panel.py
git commit -m "feat: register the Inverter Analytics sidebar panel"
```

---

### Task 5: Core time-weighted math — intervals, coverage, mean

**Files:**
- Create: `custom_components/inverter_analytics/analytics/__init__.py` (empty)
- Create: `custom_components/inverter_analytics/analytics/resample.py`
- Test: `tests/test_resample_intervals.py`

**Interfaces:**
- Consumes: nothing. The module deliberately doesn't import Home Assistant — this is pure math.
- Produces:
  - `Sample` (frozen dataclass: `ts: datetime`, `value: float | None`)
  - `Interval` (frozen dataclass: `start: datetime`, `end: datetime`, `value: float`; property `seconds -> float`)
  - `Series` (frozen dataclass: `start: datetime`, `end: datetime`, `samples: tuple[Sample, ...]`; classmethod `of(start, end, samples) -> Series`; property `duration -> float`)
  - `to_intervals(series: Series) -> list[Interval]`
  - `coverage(series: Series) -> float`
  - `time_weighted_mean(intervals: Sequence[Interval]) -> float | None`

- [ ] **Step 1: Write a failing test**

`tests/test_resample_intervals.py`:

```python
"""Tests for converting states into intervals and weighted means."""
from datetime import UTC, datetime, timedelta

from custom_components.inverter_analytics.analytics.resample import (
    Sample,
    Series,
    coverage,
    time_weighted_mean,
    to_intervals,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def hour_series(*samples: Sample) -> Series:
    return Series.of(BASE, at(60), samples)


def test_two_states_split_the_window_by_duration():
    series = hour_series(Sample(at(0), 100.0), Sample(at(30), 200.0))
    intervals = to_intervals(series)
    assert [(iv.value, iv.seconds) for iv in intervals] == [(100.0, 1800.0), (200.0, 1800.0)]
    assert time_weighted_mean(intervals) == 150.0
    assert coverage(series) == 1.0


def test_uneven_durations_are_weighted_not_averaged():
    """A naive average would give 150; the correct one gives 175."""
    series = hour_series(Sample(at(0), 100.0), Sample(at(15), 200.0))
    intervals = to_intervals(series)
    assert time_weighted_mean(intervals) == 175.0


def test_sample_before_window_is_clipped_to_window_start():
    series = Series.of(BASE, at(60), [Sample(at(-10), 100.0), Sample(at(30), 200.0)])
    intervals = to_intervals(series)
    assert intervals[0].start == BASE
    assert intervals[0].seconds == 1800.0
    assert coverage(series) == 1.0


def test_samples_after_window_end_are_dropped():
    series = Series.of(BASE, at(60), [Sample(at(0), 100.0), Sample(at(90), 999.0)])
    intervals = to_intervals(series)
    assert len(intervals) == 1
    assert intervals[0].end == at(60)


def test_unavailable_states_are_excluded_and_reduce_coverage():
    series = hour_series(
        Sample(at(0), 100.0), Sample(at(15), None), Sample(at(45), 100.0)
    )
    intervals = to_intervals(series)
    assert [iv.seconds for iv in intervals] == [900.0, 900.0]
    assert time_weighted_mean(intervals) == 100.0
    assert coverage(series) == 0.5


def test_single_sample_covers_the_whole_window():
    series = hour_series(Sample(at(0), 42.0))
    intervals = to_intervals(series)
    assert len(intervals) == 1
    assert intervals[0].value == 42.0
    assert intervals[0].seconds == 3600.0
    assert coverage(series) == 1.0


def test_empty_series_has_no_intervals_no_mean_and_zero_coverage():
    series = hour_series()
    assert to_intervals(series) == []
    assert time_weighted_mean([]) is None
    assert coverage(series) == 0.0


def test_series_of_sorts_unordered_samples():
    series = Series.of(BASE, at(60), [Sample(at(30), 200.0), Sample(at(0), 100.0)])
    assert [s.value for s in series.samples] == [100.0, 200.0]


def test_zero_length_window_has_zero_coverage():
    series = Series.of(BASE, BASE, [Sample(at(-10), 100.0)])
    assert coverage(series) == 0.0
    assert to_intervals(series) == []
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_resample_intervals.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.analytics'`

- [ ] **Step 3: Implement the `resample.py` core**

Create an empty `custom_components/inverter_analytics/analytics/__init__.py`, then `resample.py`:

```python
"""Time-weighted math over Home Assistant states.

States arrive at irregular intervals, so each value is weighted by exactly
how long it held. This module does not depend on Home Assistant.
"""
from __future__ import annotations

from collections.abc import Iterable, Sequence
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class Sample:
    """A state at a point in time. value is None for unavailable/unknown."""

    ts: datetime
    value: float | None


@dataclass(frozen=True, slots=True)
class Interval:
    """A span during which the value stayed constant."""

    start: datetime
    end: datetime
    value: float

    @property
    def seconds(self) -> float:
        """Duration in seconds."""
        return (self.end - self.start).total_seconds()


@dataclass(frozen=True, slots=True)
class Series:
    """A sequence of states within the window [start, end)."""

    start: datetime
    end: datetime
    samples: tuple[Sample, ...]

    @classmethod
    def of(cls, start: datetime, end: datetime, samples: Iterable[Sample]) -> Series:
        """Build a series, ordering the samples by time."""
        return cls(start, end, tuple(sorted(samples, key=lambda sample: sample.ts)))

    @property
    def duration(self) -> float:
        """Window length in seconds."""
        return max((self.end - self.start).total_seconds(), 0.0)


def to_intervals(series: Series) -> list[Interval]:
    """Convert the states' step function into intervals clipped to the window.

    Samples with value None are skipped: a gap in the data is not interpolated.
    """
    intervals: list[Interval] = []
    samples = series.samples

    for index, sample in enumerate(samples):
        if sample.value is None:
            continue
        start = max(sample.ts, series.start)
        next_ts = samples[index + 1].ts if index + 1 < len(samples) else series.end
        end = min(next_ts, series.end)
        if end <= start:
            continue
        intervals.append(Interval(start, end, float(sample.value)))

    return intervals


def coverage(series: Series) -> float:
    """Fraction of the window with valid data, from 0.0 to 1.0."""
    total = series.duration
    if total <= 0:
        return 0.0
    covered = sum(interval.seconds for interval in to_intervals(series))
    return min(covered / total, 1.0)


def time_weighted_mean(intervals: Sequence[Interval]) -> float | None:
    """Duration-weighted mean. None if there's no data."""
    total_seconds = sum(interval.seconds for interval in intervals)
    if total_seconds <= 0:
        return None
    weighted = sum(interval.value * interval.seconds for interval in intervals)
    return weighted / total_seconds
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_resample_intervals.py -v`
Expected: PASS, 9 tests

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/analytics tests/test_resample_intervals.py
git commit -m "feat: time-weighted intervals, coverage and mean"
```

---

### Task 6: Duration histograms, percentiles, load duration curve

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/resample.py`
- Test: `tests/test_resample_histogram.py`

**Interfaces:**
- Consumes: `Interval` from Task 5.
- Produces:
  - `Bucket` (frozen dataclass: `index: int`, `start: float`, `end: float`, `seconds: float`, `fraction: float`)
  - `Histogram` (frozen dataclass: `bucket_width: float`, `offset: float`, `seconds: tuple[float, ...]`, `clipped_low_seconds: float = 0.0`, `clipped_high_seconds: float = 0.0`; property `total_seconds -> float`; method `buckets() -> list[Bucket]`)
  - `duration_histogram(intervals, bucket_width, offset=0.0, max_buckets=400) -> Histogram`
  - `percentile(hist: Histogram, q: float) -> float | None` — `q` from 0.0 to 1.0
  - `duration_curve(hist: Histogram, points: int = 100) -> list[tuple[float, float]]` — pairs of "fraction of time, value exceeded for that fraction of time"

- [ ] **Step 1: Write a failing test**

`tests/test_resample_histogram.py`:

```python
"""Duration histogram and percentile tests."""
from datetime import UTC, datetime, timedelta

import pytest

from custom_components.inverter_analytics.analytics.resample import (
    Interval,
    duration_curve,
    duration_histogram,
    percentile,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def interval(start_min: float, end_min: float, value: float) -> Interval:
    return Interval(BASE + timedelta(minutes=start_min), BASE + timedelta(minutes=end_min), value)


def two_bucket_histogram():
    """One hour at 50 W, one hour at 150 W; 100 W buckets."""
    intervals = [interval(0, 60, 50.0), interval(60, 120, 150.0)]
    return duration_histogram(intervals, bucket_width=100.0)


def test_histogram_accumulates_duration_not_sample_count():
    intervals = [interval(0, 50, 50.0), interval(50, 60, 150.0)]
    hist = duration_histogram(intervals, bucket_width=100.0)
    assert hist.seconds == (3000.0, 600.0)
    assert hist.total_seconds == 3600.0


def test_buckets_expose_edges_and_fractions():
    buckets = two_bucket_histogram().buckets()
    assert [(b.start, b.end) for b in buckets] == [(0.0, 100.0), (100.0, 200.0)]
    assert [b.fraction for b in buckets] == [0.5, 0.5]


def test_offset_shifts_bucket_edges():
    hist = duration_histogram([interval(0, 60, 25.0)], bucket_width=10.0, offset=20.0)
    assert hist.seconds == (3600.0,)
    assert hist.buckets()[0].start == 20.0


def test_values_below_offset_land_in_the_first_bucket():
    hist = duration_histogram([interval(0, 60, -5.0)], bucket_width=100.0)
    assert hist.seconds == (3600.0,)


def test_values_above_max_buckets_are_clamped_into_the_last_bucket():
    hist = duration_histogram([interval(0, 60, 10_000.0)], bucket_width=100.0, max_buckets=10)
    assert len(hist.seconds) == 10
    assert hist.seconds[-1] == 3600.0


def test_percentiles_interpolate_inside_buckets():
    hist = two_bucket_histogram()
    assert percentile(hist, 0.0) == 0.0
    assert percentile(hist, 0.25) == 50.0
    assert percentile(hist, 0.5) == 100.0
    assert percentile(hist, 1.0) == 200.0


def test_percentile_of_empty_histogram_is_none():
    assert percentile(duration_histogram([], bucket_width=100.0), 0.5) is None


def test_percentile_rejects_out_of_range_quantile():
    with pytest.raises(ValueError):
        percentile(two_bucket_histogram(), 1.5)


def test_duration_curve_descends_from_peak_to_floor():
    curve = duration_curve(two_bucket_histogram(), points=5)
    fractions = [point[0] for point in curve]
    values = [point[1] for point in curve]
    assert fractions == [0.0, 0.25, 0.5, 0.75, 1.0]
    assert values[0] == 200.0
    assert values[-1] == 0.0
    assert values == sorted(values, reverse=True)


def test_duration_curve_of_empty_histogram_is_empty():
    assert duration_curve(duration_histogram([], bucket_width=100.0)) == []


def test_zero_bucket_width_is_rejected():
    with pytest.raises(ValueError):
        duration_histogram([interval(0, 60, 50.0)], bucket_width=0.0)
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_resample_histogram.py -v`
Expected: FAIL — `ImportError: cannot import name 'duration_histogram'`

- [ ] **Step 3: Add the histograms to `resample.py`**

Append to the end of the file:

```python
@dataclass(frozen=True, slots=True)
class Bucket:
    """A single histogram bucket with UI-ready edges and a fraction."""

    index: int
    start: float
    end: float
    seconds: float
    fraction: float


@dataclass(frozen=True, slots=True)
class Histogram:
    """Duration distribution across value buckets."""

    bucket_width: float
    offset: float
    seconds: tuple[float, ...]

    @property
    def total_seconds(self) -> float:
        """Total duration across all buckets."""
        return sum(self.seconds)

    def buckets(self) -> list[Bucket]:
        """Expand the buckets with their edges and fractions."""
        total = self.total_seconds
        return [
            Bucket(
                index=index,
                start=self.offset + index * self.bucket_width,
                end=self.offset + (index + 1) * self.bucket_width,
                seconds=value,
                fraction=(value / total) if total > 0 else 0.0,
            )
            for index, value in enumerate(self.seconds)
        ]


def duration_histogram(
    intervals: Sequence[Interval],
    bucket_width: float,
    offset: float = 0.0,
    max_buckets: int = 400,
) -> Histogram:
    """Duration distribution across value buckets.

    Values below offset land in the zero bucket, values above the limit
    land in the last one: silently dropping the tails is worse than clamping them.
    """
    if bucket_width <= 0:
        raise ValueError("bucket_width must be positive")
    if max_buckets < 1:
        raise ValueError("max_buckets must be at least 1")

    totals: dict[int, float] = {}
    for interval in intervals:
        index = int((interval.value - offset) // bucket_width)
        index = max(0, min(index, max_buckets - 1))
        totals[index] = totals.get(index, 0.0) + interval.seconds

    size = max(totals) + 1 if totals else 0
    return Histogram(
        bucket_width=bucket_width,
        offset=offset,
        seconds=tuple(totals.get(index, 0.0) for index in range(size)),
    )


def percentile(hist: Histogram, q: float) -> float | None:
    """Duration-weighted percentile, linearly interpolated inside the bucket."""
    if not 0.0 <= q <= 1.0:
        raise ValueError("q must be between 0.0 and 1.0")

    total = hist.total_seconds
    if total <= 0:
        return None

    target = q * total
    cumulative = 0.0
    for bucket in hist.buckets():
        if bucket.seconds <= 0:
            continue
        if cumulative + bucket.seconds >= target:
            share = (target - cumulative) / bucket.seconds
            return bucket.start + share * hist.bucket_width
        cumulative += bucket.seconds

    return hist.offset + len(hist.seconds) * hist.bucket_width


def duration_curve(hist: Histogram, points: int = 100) -> list[tuple[float, float]]:
    """Load duration curve: the value exceeded for a given fraction of time."""
    if points < 2 or hist.total_seconds <= 0:
        return []
    result: list[tuple[float, float]] = []
    for index in range(points):
        fraction = index / (points - 1)
        value = percentile(hist, 1.0 - fraction)
        if value is not None:
            result.append((fraction, value))
    return result
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_resample_histogram.py -v`
Expected: PASS, 11 tests

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/analytics/resample.py tests/test_resample_histogram.py
git commit -m "feat: duration histograms, percentiles and the load duration curve"
```

---

### Task 7: Episodes, sustained load, local-hour bucketing

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/resample.py`
- Test: `tests/test_resample_episodes.py`

**Interfaces:**
- Consumes: `Interval` from Task 5.
- Produces:
  - `Episode` (frozen dataclass: `start: datetime`, `end: datetime`, `seconds: float`, `extreme: float`, `mean: float`)
  - `episodes_above(intervals, threshold, min_seconds=0.0) -> list[Episode]` — `extreme` is the maximum
  - `episodes_below(intervals, threshold, min_seconds=0.0) -> list[Episode]` — `extreme` is the minimum
  - `max_sustained_mean(intervals, window_seconds) -> float | None`
  - `hour_of_day_durations(intervals, tz: tzinfo) -> list[float]` — exactly 24 elements

`hour_of_day_durations` is needed by the "Seasonality" tab from a later plan, but it's implemented here: it's the highest-risk piece of math because of DST, and it belongs in the core test suite.

- [ ] **Step 1: Write a failing test**

`tests/test_resample_episodes.py`:

```python
"""Tests for episodes, sustained load, and hour-of-day bucketing."""
from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest

from custom_components.inverter_analytics.analytics.resample import (
    Interval,
    episodes_above,
    episodes_below,
    hour_of_day_durations,
    max_sustained_mean,
)

BASE = datetime(2026, 1, 1, tzinfo=UTC)
KYIV = ZoneInfo("Europe/Kyiv")


def interval(start_min: float, end_min: float, value: float) -> Interval:
    return Interval(BASE + timedelta(minutes=start_min), BASE + timedelta(minutes=end_min), value)


def test_adjacent_intervals_merge_into_one_episode():
    intervals = [interval(0, 10, 10.0), interval(10, 20, 5.0), interval(20, 30, 50.0)]
    episodes = episodes_below(intervals, threshold=20.0)
    assert len(episodes) == 1
    assert episodes[0].start == BASE
    assert episodes[0].end == BASE + timedelta(minutes=20)
    assert episodes[0].seconds == 1200.0
    assert episodes[0].extreme == 5.0
    assert episodes[0].mean == 7.5


def test_intervals_split_by_a_gap_do_not_merge():
    """A gap in the data breaks the episode — otherwise we'd invent a dip that never happened."""
    intervals = [interval(0, 10, 5.0), interval(20, 30, 5.0)]
    episodes = episodes_below(intervals, threshold=20.0)
    assert len(episodes) == 2


def test_short_episodes_are_filtered_by_min_seconds():
    intervals = [interval(0, 1, 5.0), interval(1, 10, 50.0), interval(10, 30, 5.0)]
    episodes = episodes_below(intervals, threshold=20.0, min_seconds=300.0)
    assert len(episodes) == 1
    assert episodes[0].seconds == 1200.0


def test_episodes_above_report_the_peak():
    intervals = [interval(0, 10, 9000.0), interval(10, 20, 9500.0), interval(20, 30, 1000.0)]
    episodes = episodes_above(intervals, threshold=8000.0)
    assert len(episodes) == 1
    assert episodes[0].extreme == 9500.0
    assert episodes[0].seconds == 1200.0


def test_no_episodes_when_threshold_is_never_crossed():
    assert episodes_above([interval(0, 60, 100.0)], threshold=1000.0) == []


def test_max_sustained_mean_finds_the_worst_window_across_boundaries():
    """A 6000 W peak lasts 5 min — the 15-minute sustained load is below the peak."""
    intervals = [interval(0, 10, 1000.0), interval(10, 15, 6000.0), interval(15, 60, 1000.0)]
    result = max_sustained_mean(intervals, window_seconds=900.0)
    assert result == pytest.approx((1000 * 600 + 6000 * 300) / 900)


def test_max_sustained_mean_needs_a_full_window():
    assert max_sustained_mean([interval(0, 10, 1000.0)], window_seconds=900.0) is None


def test_max_sustained_mean_ignores_windows_spanning_a_gap():
    intervals = [interval(0, 10, 9000.0), interval(30, 40, 9000.0)]
    assert max_sustained_mean(intervals, window_seconds=900.0) is None


def test_max_sustained_mean_of_constant_series_equals_that_value():
    assert max_sustained_mean([interval(0, 60, 1234.0)], window_seconds=900.0) == pytest.approx(1234.0)


def test_hour_buckets_split_an_interval_across_local_hours():
    intervals = [Interval(BASE, BASE + timedelta(hours=3), 100.0)]
    totals = hour_of_day_durations(intervals, KYIV)
    assert sum(totals) == 3 * 3600
    assert len([value for value in totals if value > 0]) == 3


def test_hour_buckets_skip_the_hour_lost_to_spring_dst():
    """In Kyiv, 2025-03-30 has no 03:00 hour — the day has 23 hours."""
    start = datetime(2025, 3, 30, tzinfo=KYIV).astimezone(UTC)
    end = datetime(2025, 3, 31, tzinfo=KYIV).astimezone(UTC)
    totals = hour_of_day_durations([Interval(start, end, 100.0)], KYIV)
    assert totals[3] == 0.0
    assert totals[2] == 3600.0
    assert totals[4] == 3600.0
    assert sum(totals) == 23 * 3600


def test_hour_buckets_double_the_hour_repeated_by_autumn_dst():
    """In Kyiv, 2025-10-26 repeats the 03:00 hour — the day has 25 hours."""
    start = datetime(2025, 10, 26, tzinfo=KYIV).astimezone(UTC)
    end = datetime(2025, 10, 27, tzinfo=KYIV).astimezone(UTC)
    totals = hour_of_day_durations([Interval(start, end, 100.0)], KYIV)
    assert totals[3] == 7200.0
    assert sum(totals) == 25 * 3600
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_resample_episodes.py -v`
Expected: FAIL — `ImportError: cannot import name 'episodes_above'`

- [ ] **Step 3: Add episodes and bucketing to `resample.py`**

Extend the imports at the top of the file:

```python
from bisect import bisect_right
from collections.abc import Callable, Iterable, Iterator, Sequence
from datetime import datetime, timedelta, tzinfo
```

Append to the end of the file:

```python
@dataclass(frozen=True, slots=True)
class Episode:
    """A contiguous span during which the condition held."""

    start: datetime
    end: datetime
    seconds: float
    extreme: float
    mean: float


def _contiguous_runs(intervals: Sequence[Interval]) -> Iterator[list[Interval]]:
    """Split intervals into runs with no time gaps."""
    run: list[Interval] = []
    for interval in intervals:
        if run and interval.start != run[-1].end:
            yield run
            run = []
        run.append(interval)
    if run:
        yield run


def _matching_runs(
    intervals: Sequence[Interval], predicate: Callable[[float], bool]
) -> Iterator[list[Interval]]:
    """Runs of adjacent intervals that satisfy the condition."""
    run: list[Interval] = []
    for interval in intervals:
        if not predicate(interval.value):
            if run:
                yield run
                run = []
            continue
        if run and interval.start != run[-1].end:
            yield run
            run = []
        run.append(interval)
    if run:
        yield run


def _to_episode(run: Sequence[Interval], extreme: Callable[[Iterable[float]], float]) -> Episode:
    """Collapse a run of intervals into a single episode."""
    seconds = sum(interval.seconds for interval in run)
    weighted = sum(interval.value * interval.seconds for interval in run)
    return Episode(
        start=run[0].start,
        end=run[-1].end,
        seconds=seconds,
        extreme=extreme(interval.value for interval in run),
        mean=weighted / seconds,
    )


def _episodes(
    intervals: Sequence[Interval],
    predicate: Callable[[float], bool],
    extreme: Callable[[Iterable[float]], float],
    min_seconds: float,
) -> list[Episode]:
    episodes: list[Episode] = []
    for run in _matching_runs(intervals, predicate):
        episode = _to_episode(run, extreme)
        if episode.seconds >= min_seconds:
            episodes.append(episode)
    return episodes


def episodes_above(
    intervals: Sequence[Interval], threshold: float, min_seconds: float = 0.0
) -> list[Episode]:
    """Episodes above a threshold; extreme is the maximum reached."""
    return _episodes(intervals, lambda value: value > threshold, max, min_seconds)


def episodes_below(
    intervals: Sequence[Interval], threshold: float, min_seconds: float = 0.0
) -> list[Episode]:
    """Episodes below a threshold; extreme is the minimum reached."""
    return _episodes(intervals, lambda value: value < threshold, min, min_seconds)


def _max_window_mean(run: Sequence[Interval], window_seconds: float) -> float | None:
    """The maximum moving average within a single contiguous run."""
    times: list[float] = [0.0]
    energy: list[float] = [0.0]
    for interval in run:
        times.append(times[-1] + interval.seconds)
        energy.append(energy[-1] + interval.value * interval.seconds)

    total = times[-1]
    if total < window_seconds:
        return None

    def energy_at(moment: float) -> float:
        if moment <= 0.0:
            return 0.0
        if moment >= total:
            return energy[-1]
        index = bisect_right(times, moment) - 1
        span = times[index + 1] - times[index]
        share = (moment - times[index]) / span
        return energy[index] + share * (energy[index + 1] - energy[index])

    # The maximum moving average is reached at a breakpoint, or one window before it.
    candidates = {0.0}
    for moment in times:
        if moment + window_seconds <= total:
            candidates.add(moment)
        if moment - window_seconds >= 0.0:
            candidates.add(moment - window_seconds)

    return max(
        (energy_at(moment + window_seconds) - energy_at(moment)) / window_seconds
        for moment in candidates
    )


def max_sustained_mean(
    intervals: Sequence[Interval], window_seconds: float
) -> float | None:
    """The largest average over any window of the given length.

    Windows that span a gap in the data are not considered.
    """
    if window_seconds <= 0:
        raise ValueError("window_seconds must be positive")

    best: float | None = None
    for run in _contiguous_runs(intervals):
        value = _max_window_mean(run, window_seconds)
        if value is not None and (best is None or value > best):
            best = value
    return best


def hour_of_day_durations(intervals: Sequence[Interval], tz: tzinfo) -> list[float]:
    """Duration by hour of day in the local zone, exactly 24 elements.

    The arithmetic is done in UTC; the local zone is used only to determine
    the hour number. So DST transitions neither create nor lose seconds:
    the sum always equals the total length of the input intervals.
    """
    totals = [0.0] * 24

    for interval in intervals:
        cursor = interval.start
        while cursor < interval.end:
            local = cursor.astimezone(tz)
            hour_start = cursor - timedelta(
                minutes=local.minute, seconds=local.second, microseconds=local.microsecond
            )
            boundary = hour_start + timedelta(hours=1)
            if boundary <= cursor:
                boundary = cursor + timedelta(hours=1)
            step_end = min(boundary, interval.end)
            totals[local.hour] += (step_end - cursor).total_seconds()
            cursor = step_end

    return totals
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_resample_episodes.py -v`
Expected: PASS, 12 tests

- [ ] **Step 5: Run the whole core test suite**

Run: `pytest tests/ -v && ruff check .`
Expected: all green

- [ ] **Step 6: Commit**

```bash
git add custom_components/inverter_analytics/analytics/resample.py tests/test_resample_episodes.py
git commit -m "feat: episodes, sustained load and local-hour bucketing"
```

---

### Task 8: Data access — choosing raw / LTS / mixed

**Files:**
- Create: `custom_components/inverter_analytics/analytics/source.py`
- Test: `tests/test_source.py`

**Interfaces:**
- Consumes: `resample.Sample`, `resample.Series`.
- Produces:
  - `Precision` (StrEnum: `RAW = "raw"`, `LTS = "lts"`, `MIXED = "mixed"`)
  - `Window` (frozen dataclass: `start: datetime`, `end: datetime`; property `seconds -> float`)
  - `PrecisionPlan` (frozen dataclass: `precision: Precision`, `boundary: datetime | None` — populated only for `MIXED`)
  - `raw_available_from(hass) -> datetime`
  - `plan_precision(hass, window: Window) -> PrecisionPlan`
  - `states_to_samples(states: Iterable[State], sign: float) -> list[Sample]`
  - `statistic_rows_to_samples(rows: Iterable[Mapping[str, Any]], sign: float) -> list[Sample]`
  - `async_series(hass, entity_id: str, window: Window, sign: float = 1.0) -> Series`

Hybrid mode doesn't get a separate branch in the analytics: the LTS portion is converted into samples (one sample per hour, valued at `mean`) and stitched together with the raw samples into a single `Series`. All the math downstream works the same either way.

- [ ] **Step 1: Write a failing test**

`tests/test_source.py`:

```python
"""Tests for source selection and conversion into samples."""
from datetime import UTC, datetime, timedelta
from types import SimpleNamespace
from unittest.mock import patch

from freezegun import freeze_time
from homeassistant.core import HomeAssistant, State
import pytest

from custom_components.inverter_analytics.analytics.source import (
    Precision,
    Window,
    plan_precision,
    raw_available_from,
    states_to_samples,
    statistic_rows_to_samples,
)

NOW = datetime(2026, 1, 31, 12, 0, tzinfo=UTC)


@pytest.fixture
def recorder_keep_days():
    """Stub out the recorder with an object that has keep_days=10."""
    with patch(
        "custom_components.inverter_analytics.analytics.source.get_instance",
        return_value=SimpleNamespace(keep_days=10),
    ):
        yield


@freeze_time(NOW)
def test_raw_available_from_follows_recorder_keep_days(hass: HomeAssistant, recorder_keep_days):
    assert raw_available_from(hass) == NOW - timedelta(days=10)


@freeze_time(NOW)
def test_recent_window_uses_raw_states(hass: HomeAssistant, recorder_keep_days):
    plan = plan_precision(hass, Window(NOW - timedelta(days=3), NOW))
    assert plan.precision is Precision.RAW
    # The boundary only exists for mixed windows; a uniform window has none.
    assert plan.boundary is None


@freeze_time(NOW)
def test_old_window_uses_long_term_statistics(hass: HomeAssistant, recorder_keep_days):
    plan = plan_precision(hass, Window(NOW - timedelta(days=90), NOW - timedelta(days=30)))
    assert plan.precision is Precision.LTS
    assert plan.boundary is None


@freeze_time(NOW)
def test_straddling_window_is_mixed_and_reports_the_boundary(hass: HomeAssistant, recorder_keep_days):
    plan = plan_precision(hass, Window(NOW - timedelta(days=30), NOW))
    assert plan.precision is Precision.MIXED
    assert plan.boundary == NOW - timedelta(days=10)


def test_states_convert_to_samples_and_unavailable_becomes_none():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    states = [
        State("sensor.x", "1000", last_changed=ts),
        State("sensor.x", "unavailable", last_changed=ts + timedelta(minutes=5)),
        State("sensor.x", "unknown", last_changed=ts + timedelta(minutes=10)),
        State("sensor.x", "2000", last_changed=ts + timedelta(minutes=15)),
    ]
    samples = states_to_samples(states, sign=1.0)
    assert [sample.value for sample in samples] == [1000.0, None, None, 2000.0]


def test_states_that_are_not_numbers_become_none():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    samples = states_to_samples([State("sensor.x", "off", last_changed=ts)], sign=1.0)
    assert samples[0].value is None


def test_sign_inverts_numeric_states_but_not_gaps():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    states = [State("sensor.x", "1000", last_changed=ts),
              State("sensor.x", "unavailable", last_changed=ts + timedelta(minutes=5))]
    samples = states_to_samples(states, sign=-1.0)
    assert samples[0].value == -1000.0
    assert samples[1].value is None


def test_statistic_rows_accept_float_timestamps():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    rows = [{"start": ts.timestamp(), "mean": 500.0},
            {"start": (ts + timedelta(hours=1)).timestamp(), "mean": 700.0}]
    samples = statistic_rows_to_samples(rows, sign=1.0)
    assert [sample.ts for sample in samples] == [ts, ts + timedelta(hours=1)]
    assert [sample.value for sample in samples] == [500.0, 700.0]


def test_statistic_rows_accept_datetime_starts():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    samples = statistic_rows_to_samples([{"start": ts, "mean": 500.0}], sign=1.0)
    assert samples[0].ts == ts


def test_statistic_rows_without_mean_become_gaps():
    ts = datetime(2026, 1, 1, tzinfo=UTC)
    samples = statistic_rows_to_samples([{"start": ts, "mean": None}], sign=1.0)
    assert samples[0].value is None
```

`tests/test_source_recorder.py` — an integration check against a real recorder:

```python
"""Check async_series against a live recorder."""
from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.components.recorder.common import async_wait_recording_done

from custom_components.inverter_analytics.analytics.resample import to_intervals
from custom_components.inverter_analytics.analytics.source import Window, async_series


async def test_async_series_reads_recorded_states(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    hass.states.async_set("sensor.load_power", "1000")
    await async_wait_recording_done(hass)
    hass.states.async_set("sensor.load_power", "2000")
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    window = Window(now - timedelta(hours=1), now + timedelta(seconds=1))
    series = await async_series(hass, "sensor.load_power", window)

    values = [interval.value for interval in to_intervals(series)]
    assert 1000.0 in values
    assert 2000.0 in values
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_source.py tests/test_source_recorder.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.analytics.source'`

- [ ] **Step 3: Implement `source.py`**

```python
"""Access to Home Assistant's historical data with precision selection."""
from __future__ import annotations

from collections.abc import Iterable, Mapping
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum
from functools import partial
from typing import Any

from homeassistant.components.recorder import get_instance, history
from homeassistant.components.recorder.statistics import statistics_during_period
from homeassistant.core import HomeAssistant, State
from homeassistant.util import dt as dt_util

from .resample import Sample, Series

_GAP_STATES = {"unavailable", "unknown", "none", ""}


class Precision(StrEnum):
    """Where the window's data came from."""

    RAW = "raw"
    LTS = "lts"
    MIXED = "mixed"


@dataclass(frozen=True, slots=True)
class Window:
    """The time window of the request."""

    start: datetime
    end: datetime

    @property
    def seconds(self) -> float:
        """Window length in seconds."""
        return max((self.end - self.start).total_seconds(), 0.0)


@dataclass(frozen=True, slots=True)
class PrecisionPlan:
    """The data-source decision. boundary is the moment from which raw states are available."""

    precision: Precision
    boundary: datetime | None


def raw_available_from(hass: HomeAssistant) -> datetime:
    """The earliest moment for which the recorder still holds raw states."""
    return dt_util.utcnow() - timedelta(days=get_instance(hass).keep_days)


def plan_precision(hass: HomeAssistant, window: Window) -> PrecisionPlan:
    """Choose the data source for the window."""
    boundary = raw_available_from(hass)
    if window.start >= boundary:
        # boundary only makes sense for a mixed window: it's the moment where the
        # reader switches from hourly averages to raw states. For uniform windows
        # there is no boundary, and the UI should not draw a marker.
        return PrecisionPlan(Precision.RAW, None)
    if window.end <= boundary:
        return PrecisionPlan(Precision.LTS, None)
    return PrecisionPlan(Precision.MIXED, boundary)


def states_to_samples(states: Iterable[State], sign: float) -> list[Sample]:
    """Convert states into samples; non-numeric states become gaps."""
    samples: list[Sample] = []
    for state in states:
        raw = state.state
        if raw is None or raw.lower() in _GAP_STATES:
            samples.append(Sample(state.last_changed, None))
            continue
        try:
            value = float(raw)
        except (TypeError, ValueError):
            samples.append(Sample(state.last_changed, None))
            continue
        samples.append(Sample(state.last_changed, value * sign))
    return samples


def statistic_rows_to_samples(rows: Iterable[Mapping[str, Any]], sign: float) -> list[Sample]:
    """Convert hourly statistics rows into samples valued at mean."""
    samples: list[Sample] = []
    for row in rows:
        start = row.get("start")
        moment = (
            dt_util.utc_from_timestamp(start) if isinstance(start, (int, float)) else start
        )
        if moment is None:
            continue
        mean = row.get("mean")
        samples.append(Sample(moment, None if mean is None else float(mean) * sign))
    return samples


async def _async_raw_samples(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float
) -> list[Sample]:
    """Read raw states from the recorder."""
    recorder = get_instance(hass)
    result = await recorder.async_add_executor_job(
        partial(
            history.state_changes_during_period,
            hass,
            window.start,
            window.end,
            entity_id,
            no_attributes=True,
            include_start_time_state=True,
        )
    )
    return states_to_samples(result.get(entity_id, []), sign)


async def _async_lts_samples(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float
) -> list[Sample]:
    """Read hourly long-term statistics."""
    recorder = get_instance(hass)
    result = await recorder.async_add_executor_job(
        partial(
            statistics_during_period,
            hass,
            window.start,
            window.end,
            {entity_id},
            "hour",
            None,
            {"mean"},
        )
    )
    return statistic_rows_to_samples(result.get(entity_id, []), sign)


async def async_series(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float = 1.0
) -> Series:
    """Build a state series for the window, automatically choosing the source."""
    plan = plan_precision(hass, window)
    samples: list[Sample] = []

    if plan.precision in (Precision.LTS, Precision.MIXED):
        lts_end = window.end if plan.precision is Precision.LTS else plan.boundary
        assert lts_end is not None
        samples += await _async_lts_samples(hass, entity_id, Window(window.start, lts_end), sign)

    if plan.precision in (Precision.RAW, Precision.MIXED):
        raw_start = window.start if plan.precision is Precision.RAW else plan.boundary
        assert raw_start is not None
        samples += await _async_raw_samples(hass, entity_id, Window(raw_start, window.end), sign)

    return Series.of(window.start, window.end, samples)
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_source.py tests/test_source_recorder.py -v`
Expected: PASS, 11 tests

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/analytics/source.py \
        tests/test_source.py tests/test_source_recorder.py
git commit -m "feat: recorder access with automatic raw/LTS/mixed selection"
```

---

### Task 9: Result cache

**Files:**
- Create: `custom_components/inverter_analytics/analytics/cache.py`
- Test: `tests/test_cache.py`

**Interfaces:**
- Consumes: nothing.
- Produces: `ResultCache(max_entries: int = 50, time_fn: Callable[[], float] = time.monotonic)` with methods `get(key: tuple) -> Any | None`, `set(key: tuple, value: Any, ttl: float) -> None`, `clear() -> None`, property `size -> int`.

The clock is injected so tests don't have to sleep. Eviction is oldest-by-write-time.

- [ ] **Step 1: Write a failing test**

`tests/test_cache.py`:

```python
"""Tests for the TTL result cache."""
from custom_components.inverter_analytics.analytics.cache import ResultCache


class FakeClock:
    def __init__(self) -> None:
        self.now = 0.0

    def __call__(self) -> float:
        return self.now

    def advance(self, seconds: float) -> None:
        self.now += seconds


def test_value_is_returned_before_ttl_expires():
    clock = FakeClock()
    cache = ResultCache(time_fn=clock)
    cache.set(("load", "a"), {"x": 1}, ttl=60.0)
    clock.advance(59.0)
    assert cache.get(("load", "a")) == {"x": 1}


def test_value_disappears_after_ttl():
    clock = FakeClock()
    cache = ResultCache(time_fn=clock)
    cache.set(("load", "a"), {"x": 1}, ttl=60.0)
    clock.advance(61.0)
    assert cache.get(("load", "a")) is None
    assert cache.size == 0


def test_missing_key_returns_none():
    assert ResultCache().get(("nothing",)) is None


def test_oldest_entry_is_evicted_when_full():
    clock = FakeClock()
    cache = ResultCache(max_entries=2, time_fn=clock)
    cache.set(("a",), 1, ttl=600.0)
    clock.advance(1.0)
    cache.set(("b",), 2, ttl=600.0)
    clock.advance(1.0)
    cache.set(("c",), 3, ttl=600.0)
    assert cache.size == 2
    assert cache.get(("a",)) is None
    assert cache.get(("b",)) == 2
    assert cache.get(("c",)) == 3


def test_set_overwrites_existing_key_without_growing():
    cache = ResultCache(max_entries=2)
    cache.set(("a",), 1, ttl=600.0)
    cache.set(("a",), 2, ttl=600.0)
    assert cache.size == 1
    assert cache.get(("a",)) == 2


def test_clear_empties_the_cache():
    cache = ResultCache()
    cache.set(("a",), 1, ttl=600.0)
    cache.clear()
    assert cache.size == 0
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_cache.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.analytics.cache'`

- [ ] **Step 3: Implement `cache.py`**

```python
"""Analytics result cache with TTL and a size limit."""
from __future__ import annotations

from collections import OrderedDict
from collections.abc import Callable, Hashable
from dataclasses import dataclass
import time
from typing import Any


@dataclass(frozen=True, slots=True)
class _Entry:
    value: Any
    expires_at: float


class ResultCache:
    """A size-bounded cache with a lifetime per entry."""

    def __init__(
        self, max_entries: int = 50, time_fn: Callable[[], float] = time.monotonic
    ) -> None:
        self._entries: OrderedDict[Hashable, _Entry] = OrderedDict()
        self._max_entries = max_entries
        self._time_fn = time_fn

    @property
    def size(self) -> int:
        """Number of entries in the cache."""
        return len(self._entries)

    def get(self, key: Hashable) -> Any | None:
        """Return the value, or None if it's missing or has expired."""
        entry = self._entries.get(key)
        if entry is None:
            return None
        if entry.expires_at <= self._time_fn():
            del self._entries[key]
            return None
        return entry.value

    def set(self, key: Hashable, value: Any, ttl: float) -> None:
        """Store a value with a lifetime in seconds."""
        if key in self._entries:
            del self._entries[key]
        self._entries[key] = _Entry(value=value, expires_at=self._time_fn() + ttl)
        while len(self._entries) > self._max_entries:
            self._entries.popitem(last=False)

    def clear(self) -> None:
        """Empty the cache."""
        self._entries.clear()
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_cache.py -v`
Expected: PASS, 6 tests

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/analytics/cache.py tests/test_cache.py
git commit -m "feat: TTL cache for analytics results"
```

---

### Task 10: Load analytics

**Files:**
- Create: `custom_components/inverter_analytics/analytics/load.py`
- Test: `tests/test_load.py`

**Interfaces:**
- Consumes: `resample.Series`, `resample.to_intervals`, `resample.coverage`, `resample.time_weighted_mean`, `resample.duration_histogram`, `resample.percentile`, `resample.duration_curve`, `resample.episodes_above`, `resample.max_sustained_mean`; `source.Window`, `source.async_series`, `source.plan_precision`; `roles.EntryConfig`.
- Produces:
  - `BANDS: tuple[tuple[str, float, float | None], ...]` — band boundaries as a share of rated power
  - `build_load_payload(series: Series, rated_power: float, bucket_count: int = 40) -> dict[str, Any]` — a pure function, the heart of the tab
  - `async_load_analytics(hass, config: EntryConfig, window: Window) -> dict[str, Any]` — a wrapper that reads the data and adds `precision`

The payload shape is locked in here and consumed by `websocket_api.py` (Task 11) and `load-tab.ts` (Task 13):

```json
{
  "coverage": 0.98,
  "rated_power": 8000.0,
  "kpi": {"mean": 1240.0, "median": 980.0, "p95": 3100.0, "max": 6800.0,
          "fraction_above_80pct": 0.024, "max_sustained_15m": 4200.0},
  // all kpi fields are nulled on an empty series: number | null
  "histogram": {"bucket_width": 200.0,
                "clipped_low_seconds": 0.0, "clipped_high_seconds": 0.0,
                "buckets": [{"start": 0.0, "end": 200.0, "seconds": 1200.0, "fraction": 0.05}]},
  "duration_curve": [{"fraction": 0.0, "value": 6800.0}],
  "bands": [{"key": "0-10", "from": 0.0, "to": 0.1, "seconds": 1200.0, "fraction": 0.31}],
  "overloads": [{"start": "2026-01-05T18:00:00+00:00", "end": "2026-01-05T18:07:00+00:00",
                 "seconds": 420.0, "peak": 8600.0}]
}
```

`async_load_analytics` adds `"precision"` and `"boundary"` to this.

- [ ] **Step 1: Write a failing test**

`tests/test_load.py`:

```python
"""Load analytics tests."""
from datetime import UTC, datetime, timedelta

import pytest

from custom_components.inverter_analytics.analytics.load import build_load_payload
from custom_components.inverter_analytics.analytics.resample import Sample, Series

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def flat_series(value: float, minutes: float = 60.0) -> Series:
    return Series.of(BASE, at(minutes), [Sample(BASE, value)])


def test_flat_load_gives_identical_mean_median_and_peak():
    payload = build_load_payload(flat_series(1000.0), rated_power=8000.0)
    assert payload["kpi"]["mean"] == pytest.approx(1000.0)
    assert payload["kpi"]["max"] == pytest.approx(1000.0)
    assert payload["kpi"]["median"] == pytest.approx(1000.0, abs=200.0)
    assert payload["coverage"] == 1.0


def test_bucket_width_is_one_fortieth_of_rated_power():
    payload = build_load_payload(flat_series(1000.0), rated_power=8000.0, bucket_count=40)
    assert payload["histogram"]["bucket_width"] == pytest.approx(200.0)
    assert payload["rated_power"] == 8000.0


def test_histogram_fractions_sum_to_one():
    series = Series.of(BASE, at(60), [Sample(BASE, 500.0), Sample(at(30), 4000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    total = sum(bucket["fraction"] for bucket in payload["histogram"]["buckets"])
    assert total == pytest.approx(1.0)


def test_bands_split_time_by_share_of_rated_power():
    """Half an hour at 5% of rated power, half an hour at 50%."""
    series = Series.of(BASE, at(60), [Sample(BASE, 400.0), Sample(at(30), 4000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    bands = {band["key"]: band["fraction"] for band in payload["bands"]}
    assert bands["0-10"] == pytest.approx(0.5)
    assert bands["50-75"] == pytest.approx(0.5)
    assert sum(bands.values()) == pytest.approx(1.0)


def test_all_bands_are_present_even_when_empty():
    payload = build_load_payload(flat_series(1000.0), rated_power=8000.0)
    keys = [band["key"] for band in payload["bands"]]
    assert keys == ["0-10", "10-25", "25-50", "50-75", "75-100", "100+"]


def test_fraction_above_80_percent_counts_only_high_load():
    series = Series.of(BASE, at(60), [Sample(BASE, 1000.0), Sample(at(45), 7000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["kpi"]["fraction_above_80pct"] == pytest.approx(0.25)


def test_overload_episodes_are_reported_with_peak():
    series = Series.of(
        BASE, at(60), [Sample(BASE, 1000.0), Sample(at(20), 8600.0), Sample(at(27), 1000.0)]
    )
    payload = build_load_payload(series, rated_power=8000.0)
    assert len(payload["overloads"]) == 1
    overload = payload["overloads"][0]
    assert overload["seconds"] == pytest.approx(420.0)
    assert overload["peak"] == pytest.approx(8600.0)
    assert overload["start"] == at(20).isoformat()


def test_brief_spikes_below_a_minute_are_not_reported_as_overloads():
    series = Series.of(
        BASE, at(60), [Sample(BASE, 1000.0), Sample(at(20), 8600.0), Sample(at(20.5), 1000.0)]
    )
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["overloads"] == []


def test_duration_curve_starts_at_the_peak():
    series = Series.of(BASE, at(60), [Sample(BASE, 1000.0), Sample(at(30), 5000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["duration_curve"][0]["fraction"] == 0.0
    assert payload["duration_curve"][0]["value"] >= 5000.0


def test_max_sustained_15m_is_lower_than_a_short_peak():
    series = Series.of(
        BASE, at(120), [Sample(BASE, 1000.0), Sample(at(60), 6000.0), Sample(at(65), 1000.0)]
    )
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["kpi"]["max"] == pytest.approx(6000.0)
    assert payload["kpi"]["max_sustained_15m"] < 6000.0


def test_empty_series_yields_null_kpis_not_an_exception():
    payload = build_load_payload(Series.of(BASE, at(60), []), rated_power=8000.0)
    assert payload["kpi"]["mean"] is None
    assert payload["kpi"]["max"] is None
    assert payload["histogram"]["buckets"] == []
    assert payload["coverage"] == 0.0


def test_rated_power_must_be_positive():
    with pytest.raises(ValueError):
        build_load_payload(flat_series(1000.0), rated_power=0.0)
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_load.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.analytics.load'`

- [ ] **Step 3: Implement `load.py`**

```python
"""Inverter load analytics."""
from __future__ import annotations

from collections.abc import Sequence
from typing import Any

from homeassistant.core import HomeAssistant

from ..roles import EntryConfig
from .resample import (
    Interval,
    Series,
    coverage,
    duration_curve,
    duration_histogram,
    episodes_above,
    max_sustained_mean,
    percentile,
    time_weighted_mean,
    to_intervals,
)
from .source import Window, async_series, plan_precision

BANDS: tuple[tuple[str, float, float | None], ...] = (
    ("0-10", 0.0, 0.10),
    ("10-25", 0.10, 0.25),
    ("25-50", 0.25, 0.50),
    ("50-75", 0.50, 0.75),
    ("75-100", 0.75, 1.00),
    ("100+", 1.00, None),
)

SUSTAINED_WINDOW_SECONDS = 15 * 60
OVERLOAD_MIN_SECONDS = 60.0
HIGH_LOAD_SHARE = 0.8
DURATION_CURVE_POINTS = 60


def _seconds_between(
    intervals: Sequence[Interval], low: float, high: float | None
) -> float:
    """Total duration during which the value stayed within [low, high)."""
    return sum(
        interval.seconds
        for interval in intervals
        if interval.value >= low and (high is None or interval.value < high)
    )


def build_load_payload(
    series: Series, rated_power: float, bucket_count: int = 40
) -> dict[str, Any]:
    """Compute the full load analytics from a ready-made series."""
    if rated_power <= 0:
        raise ValueError("rated_power must be positive")

    intervals = to_intervals(series)
    total_seconds = sum(interval.seconds for interval in intervals)
    bucket_width = rated_power / bucket_count
    histogram = duration_histogram(intervals, bucket_width=bucket_width)

    bands = []
    for index, (key, low_share, high_share) in enumerate(BANDS):
        # The lowest band also catches negative values, the same way the
        # histogram forces them into its zero bucket. Otherwise they'd
        # disappear from the numerators while staying in the denominator,
        # and the fractions would stop summing to one.
        # How much time was spent below zero is reported by
        # histogram.clipped_low_seconds.
        low = float("-inf") if index == 0 else low_share * rated_power
        high = None if high_share is None else high_share * rated_power
        seconds = _seconds_between(intervals, low, high)
        bands.append(
            {
                "key": key,
                "from": low_share,
                "to": high_share,
                "seconds": seconds,
                "fraction": (seconds / total_seconds) if total_seconds > 0 else 0.0,
            }
        )

    high_seconds = _seconds_between(intervals, HIGH_LOAD_SHARE * rated_power, None)
    overloads = episodes_above(
        intervals, threshold=rated_power, min_seconds=OVERLOAD_MIN_SECONDS
    )

    return {
        "coverage": coverage(series),
        "rated_power": rated_power,
        "kpi": {
            "mean": time_weighted_mean(intervals),
            "median": percentile(histogram, 0.5),
            "p95": percentile(histogram, 0.95),
            "max": max((interval.value for interval in intervals), default=None),
            # None, not 0.0: on an empty series, "0% of time above 80%" would
            # be a confident claim about a period we know nothing about.
            "fraction_above_80pct": (high_seconds / total_seconds) if total_seconds > 0 else None,
            "max_sustained_15m": max_sustained_mean(intervals, SUSTAINED_WINDOW_SECONDS),
        },
        "histogram": {
            "bucket_width": bucket_width,
            # Time outside the histogram's range gets forced into the edge
            # buckets and labeled with their boundaries. These counters say
            # exactly how much time was mislabeled that way — the UI must
            # surface this, not stay silent about it.
            "clipped_low_seconds": histogram.clipped_low_seconds,
            "clipped_high_seconds": histogram.clipped_high_seconds,
            "buckets": [
                {
                    "start": bucket.start,
                    "end": bucket.end,
                    "seconds": bucket.seconds,
                    "fraction": bucket.fraction,
                }
                for bucket in histogram.buckets()
            ],
        },
        "duration_curve": [
            {"fraction": fraction, "value": value}
            for fraction, value in duration_curve(histogram, points=DURATION_CURVE_POINTS)
        ],
        "bands": bands,
        "overloads": [
            {
                "start": episode.start.isoformat(),
                "end": episode.end.isoformat(),
                "seconds": episode.seconds,
                "peak": episode.extreme,
            }
            for episode in overloads
        ],
    }


async def async_load_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the data and compute load analytics."""
    entity_id = config.entity_id("load_power")
    rated_power = config.number("rated_power")
    if entity_id is None or rated_power is None:
        raise ValueError("load_power or rated_power is not set")

    series = await async_series(hass, entity_id, window, sign=config.sign("load_power"))
    payload = build_load_payload(series, rated_power=rated_power)

    plan = plan_precision(hass, window)
    payload["precision"] = plan.precision.value
    payload["boundary"] = plan.boundary.isoformat() if plan.boundary else None
    return payload
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `pytest tests/test_load.py -v`
Expected: PASS, 12 tests

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/analytics/load.py tests/test_load.py
git commit -m "feat: load analytics — KPIs, histogram, LDC, bands, overloads"
```

---

### Task 11: WebSocket API

**Files:**
- Create: `custom_components/inverter_analytics/websocket_api.py`
- Modify: `custom_components/inverter_analytics/__init__.py`
- Test: `tests/test_websocket_api.py`

**Interfaces:**
- Consumes: `roles.EntryConfig`, `analytics.cache.ResultCache`, `analytics.load.async_load_analytics`, `analytics.source.Window`, `analytics.source.raw_available_from`, `const.DATA_CACHE`, `const.DOMAIN`.
- Produces: `async_register(hass) -> None` (idempotent command registration), `clamp_window(start, end) -> tuple[Window, bool]`, constants `MAX_WINDOW_DAYS = 400`, `FRESH_TTL = 60.0`, `HISTORICAL_TTL = 86400.0`.
- Commands: `inverter_analytics/config`, `inverter_analytics/load`.

`inverter_analytics/config` returns `{"entries": [{entry_id, title, entities, numbers, inverted}], "raw_available_from": iso}`. The oldest available LTS date isn't returned at this stage of the plan: finding it needs a separate query against the statistics table, and that arrives together with the "Seasonality" tab, which is the one that actually needs it.

- [ ] **Step 1: Write a failing test**

`tests/test_websocket_api.py`:

```python
"""WebSocket API tests."""
from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.websocket_api import MAX_WINDOW_DAYS, clamp_window


def _entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {"load_power": "sensor.load_power"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )


def test_clamp_window_leaves_short_windows_untouched():
    end = dt_util.utcnow()
    start = end - timedelta(days=30)
    window, clamped = clamp_window(start, end)
    assert window.start == start
    assert clamped is False


def test_clamp_window_shortens_windows_beyond_the_limit():
    end = dt_util.utcnow()
    start = end - timedelta(days=MAX_WINDOW_DAYS + 100)
    window, clamped = clamp_window(start, end)
    assert clamped is True
    assert window.end - window.start == timedelta(days=MAX_WINDOW_DAYS)


async def test_config_command_lists_entries(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "inverter_analytics/config"})
    response = await client.receive_json()

    assert response["success"] is True
    entries = response["result"]["entries"]
    assert len(entries) == 1
    assert entries[0]["title"] == "Deye 8kW"
    assert entries[0]["entities"] == {"load_power": "sensor.load_power"}
    assert entries[0]["numbers"] == {"rated_power": 8000.0}
    assert "raw_available_from" in response["result"]


async def test_load_command_returns_analytics(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("sensor.load_power", "1000")
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": entry.entry_id,
            "start": (now - timedelta(hours=1)).isoformat(),
            "end": (now + timedelta(seconds=1)).isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is True
    result = response["result"]
    assert result["rated_power"] == 8000.0
    assert result["precision"] == "raw"
    assert [band["key"] for band in result["bands"]][0] == "0-10"
    assert "mean" in result["kpi"]


async def test_load_command_rejects_unknown_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": "does-not-exist",
            "start": (now - timedelta(hours=1)).isoformat(),
            "end": now.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "not_found"


async def test_load_command_rejects_inverted_window(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    now = dt_util.utcnow()
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "inverter_analytics/load",
            "entry_id": entry.entry_id,
            "start": now.isoformat(),
            "end": (now - timedelta(hours=1)).isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "invalid_window"


async def test_second_identical_request_is_served_from_cache(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("sensor.load_power", "1000")
    await async_wait_recording_done(hass)

    now = dt_util.utcnow()
    payload = {
        "type": "inverter_analytics/load",
        "entry_id": entry.entry_id,
        "start": (now - timedelta(hours=1)).isoformat(),
        "end": now.isoformat(),
    }
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, **payload})
    first = await client.receive_json()
    await client.send_json({"id": 2, **payload})
    second = await client.receive_json()

    assert first["result"] == second["result"]
    cache = hass.data[DOMAIN][entry.entry_id]["cache"]
    assert cache.size == 1
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `pytest tests/test_websocket_api.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.websocket_api'`

- [ ] **Step 3: Implement `websocket_api.py`**

```python
"""WebSocket API for the Inverter Analytics integration."""
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util
import voluptuous as vol

from .analytics.load import async_load_analytics
from .analytics.source import Window, raw_available_from
from .const import DATA_CACHE, DOMAIN
from .roles import EntryConfig

MAX_WINDOW_DAYS = 400
FRESH_TTL = 60.0
HISTORICAL_TTL = 86400.0
FRESH_MARGIN = timedelta(minutes=5)

_DATA_WS_REGISTERED = "ws_registered"


def clamp_window(start: datetime, end: datetime) -> tuple[Window, bool]:
    """Clip an overlong window. Returns the window and whether it was clipped."""
    limit = timedelta(days=MAX_WINDOW_DAYS)
    if end - start > limit:
        return Window(end - limit, end), True
    return Window(start, end), False


def _ttl_for(window: Window) -> float:
    """Fresh windows are cached briefly; closed historical windows for a day."""
    if window.end >= dt_util.utcnow() - FRESH_MARGIN:
        return FRESH_TTL
    return HISTORICAL_TTL


@callback
def async_register(hass: HomeAssistant) -> None:
    """Register the commands once for the whole Home Assistant instance."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if domain_data.get(_DATA_WS_REGISTERED):
        return
    websocket_api.async_register_command(hass, ws_config)
    websocket_api.async_register_command(hass, ws_load)
    domain_data[_DATA_WS_REGISTERED] = True


@websocket_api.websocket_command({vol.Required("type"): "inverter_analytics/config"})
@callback
def ws_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the mapping of every configured inverter."""
    entries = []
    for entry in hass.config_entries.async_entries(DOMAIN):
        config = EntryConfig.from_entry(entry)
        entries.append(
            {
                "entry_id": entry.entry_id,
                "title": entry.title,
                "entities": dict(config.entities),
                "numbers": dict(config.numbers),
                "inverted": sorted(config.inverted),
            }
        )

    connection.send_result(
        msg["id"],
        {"entries": entries, "raw_available_from": raw_available_from(hass).isoformat()},
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "inverter_analytics/load",
        vol.Required("entry_id"): str,
        vol.Required("start"): cv.datetime,
        vol.Required("end"): cv.datetime,
    }
)
@websocket_api.async_response
async def ws_load(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return load analytics for a window."""
    entry = hass.config_entries.async_get_entry(msg["entry_id"])
    if entry is None or entry.domain != DOMAIN:
        connection.send_error(msg["id"], "not_found", "Unknown entry_id")
        return

    start = dt_util.as_utc(msg["start"])
    end = dt_util.as_utc(msg["end"])
    if end <= start:
        connection.send_error(
            msg["id"], "invalid_window", "End of window must be after the start"
        )
        return

    window, clamped = clamp_window(start, end)
    cache = hass.data[DOMAIN][entry.entry_id][DATA_CACHE]
    key = ("load", entry.entry_id, window.start.isoformat(), window.end.isoformat())

    payload = cache.get(key)
    if payload is None:
        try:
            payload = await async_load_analytics(hass, EntryConfig.from_entry(entry), window)
        except ValueError as err:
            connection.send_error(msg["id"], "invalid_config", str(err))
            return
        cache.set(key, payload, ttl=_ttl_for(window))

    connection.send_result(
        msg["id"],
        payload
        | {
            "window": {"start": window.start.isoformat(), "end": window.end.isoformat()},
            "clamped": clamped,
        },
    )
```

- [ ] **Step 4: Wire the WS API and cache into `__init__.py`**

In `async_setup_entry`, replace how the entry state is created and add command registration:

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry."""
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {DATA_CACHE: ResultCache()}
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    async_register(hass)
    await async_register_panel(hass)
    return True
```

Add the imports:

```python
from .analytics.cache import ResultCache
from .const import DATA_CACHE, DOMAIN
from .websocket_api import async_register
```

The WS commands don't need to be torn down on unload: they check whether the entry exists themselves and return `not_found` once the inverter has been removed.

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `pytest tests/ -v`
Expected: PASS, the whole suite

- [ ] **Step 6: Commit**

```bash
git add custom_components/inverter_analytics/websocket_api.py \
        custom_components/inverter_analytics/__init__.py tests/test_websocket_api.py
git commit -m "feat: WebSocket API for configuration and load analytics"
```

---

### Task 12: Frontend scaffold — build, header, tabs, routing

**Files:**
- Create: `frontend/package.json`, `frontend/tsconfig.json`, `frontend/vite.config.ts`
- Create: `frontend/src/types.ts`, `frontend/src/api.ts`, `frontend/src/range.ts`, `frontend/src/theme.ts`, `frontend/src/panel.ts`
- Create: `frontend/src/tabs/load-tab.ts` (a stub, fully rewritten in Task 13)
- Create: `frontend/src/range.test.ts`
- Modify: `.github/workflows/ci.yml`
- Modify: `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` (overwritten by the build)

**Interfaces:**
- Consumes: the `inverter_analytics/config` and `inverter_analytics/load` WS commands from Task 11; the payload shape from Task 10.
- Produces:
  - `types.ts`: `LoadPayload`, `Kpi`, `HistogramBucket`, `Band`, `Overload`, `ConfigResult`, `EntryInfo`, `HomeAssistant`
  - `api.ts`: `fetchConfig(hass): Promise<ConfigResult>`, `fetchLoad(hass, entryId, start, end): Promise<LoadPayload>`
  - `range.ts`: `RANGE_KEYS`, `resolveRange(key: RangeKey, now: Date): {start: Date; end: Date}`
  - `theme.ts`: `SERIES` (the palette), `chartBaseOption()`
  - `panel.ts`: the custom element `inverter-analytics-panel`

- [ ] **Step 1: Create the build configuration**

`frontend/package.json`:

```json
{
  "name": "inverter-analytics-panel",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "vite build",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "echarts": "^5.5.0",
    "lit": "^3.1.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "vitest": "^2.0.0"
  }
}
```

`frontend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2021", "DOM"],
    "strict": true,
    "noUnusedLocals": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

`frontend/vite.config.ts`:

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2021",
    outDir: "../custom_components/inverter_analytics/frontend/dist",
    emptyOutDir: true,
    lib: {
      entry: "src/panel.ts",
      formats: ["es"],
      fileName: () => "inverter-analytics-panel.js",
    },
  },
});
```

Run `cd frontend && npm install`.

- [ ] **Step 2: Write a failing test for the period calculations**

`frontend/src/range.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { resolveRange } from "./range";

const NOW = new Date("2026-08-29T12:00:00Z");

describe("resolveRange", () => {
  it("24h ends now and starts a day earlier", () => {
    const { start, end } = resolveRange("24h", NOW);
    expect(end.toISOString()).toBe(NOW.toISOString());
    expect(end.getTime() - start.getTime()).toBe(24 * 3600 * 1000);
  });

  it("30d spans thirty days", () => {
    const { start, end } = resolveRange("30d", NOW);
    expect(end.getTime() - start.getTime()).toBe(30 * 24 * 3600 * 1000);
  });

  it("month starts at the first day of the current month", () => {
    const { start } = resolveRange("month", NOW);
    expect(start.getDate()).toBe(1);
    expect(start.getHours()).toBe(0);
    expect(start.getMonth()).toBe(NOW.getMonth());
  });

  it("year spans 365 days", () => {
    const { start, end } = resolveRange("year", NOW);
    expect(end.getTime() - start.getTime()).toBe(365 * 24 * 3600 * 1000);
  });
});
```

- [ ] **Step 3: Run the test and confirm it fails**

Run: `cd frontend && npx vitest run`
Expected: FAIL — `Failed to resolve import "./range"`

- [ ] **Step 4: Implement the types, API, periods, and palette**

`frontend/src/types.ts`:

```typescript
export interface Kpi {
  mean: number | null;
  median: number | null;
  p95: number | null;
  max: number | null;
  fraction_above_80pct: number | null;
  max_sustained_15m: number | null;
}

export interface HistogramBucket {
  start: number;
  end: number;
  seconds: number;
  fraction: number;
}

export interface Band {
  key: string;
  from: number;
  to: number | null;
  seconds: number;
  fraction: number;
}

export interface Overload {
  start: string;
  end: string;
  seconds: number;
  peak: number;
}

export interface LoadPayload {
  coverage: number;
  rated_power: number;
  kpi: Kpi;
  histogram: {
    bucket_width: number;
    clipped_low_seconds: number;
    clipped_high_seconds: number;
    buckets: HistogramBucket[];
  };
  duration_curve: { fraction: number; value: number }[];
  bands: Band[];
  overloads: Overload[];
  precision: "raw" | "lts" | "mixed";
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
}

export interface EntryInfo {
  entry_id: string;
  title: string;
  entities: Record<string, string>;
  numbers: Record<string, number>;
  inverted: string[];
}

export interface ConfigResult {
  entries: EntryInfo[];
  raw_available_from: string;
}

export interface HomeAssistant {
  connection: { sendMessagePromise<T>(message: unknown): Promise<T> };
  locale: { language: string };
}
```

`frontend/src/api.ts`:

```typescript
import type { ConfigResult, HomeAssistant, LoadPayload } from "./types";

export function fetchConfig(hass: HomeAssistant): Promise<ConfigResult> {
  return hass.connection.sendMessagePromise<ConfigResult>({
    type: "inverter_analytics/config",
  });
}

export function fetchLoad(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<LoadPayload> {
  return hass.connection.sendMessagePromise<LoadPayload>({
    type: "inverter_analytics/load",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}
```

`frontend/src/range.ts`:

```typescript
export const RANGE_KEYS = ["24h", "7d", "30d", "month", "year"] as const;
export type RangeKey = (typeof RANGE_KEYS)[number];

export const RANGE_LABELS: Record<RangeKey, string> = {
  "24h": "24 h",
  "7d": "7 days",
  "30d": "30 days",
  month: "This month",
  year: "Year",
};

const DAY_MS = 24 * 3600 * 1000;

export function resolveRange(key: RangeKey, now: Date): { start: Date; end: Date } {
  const end = new Date(now.getTime());
  switch (key) {
    case "24h":
      return { start: new Date(end.getTime() - DAY_MS), end };
    case "7d":
      return { start: new Date(end.getTime() - 7 * DAY_MS), end };
    case "30d":
      return { start: new Date(end.getTime() - 30 * DAY_MS), end };
    case "month": {
      const start = new Date(end.getFullYear(), end.getMonth(), 1, 0, 0, 0, 0);
      return { start, end };
    }
    case "year":
      return { start: new Date(end.getTime() - 365 * DAY_MS), end };
  }
}
```

`frontend/src/theme.ts`:

```typescript
/** Fixed series palette: the same colors on every tab. */
export const SERIES = {
  load: "#2f7ed8",
  pv: "#f7b32b",
  battery: "#2fa84f",
  grid: "#8a8f98",
  overload: "#d64545",
  muted: "#b0b6bf",
} as const;

/**
 * Shared base for ECharts options: transparent background and colors from the
 * Home Assistant theme. Returns base and axis separately, because each chart
 * defines its own axes, and the axis styles need to be merged into them, not
 * overwrite them.
 */
export function chartBaseOption(): {
  base: Record<string, unknown>;
  axis: Record<string, unknown>;
} {
  // Option-builder tests run in a node environment with no DOM, so reading
  // theme variables must be optional rather than throw.
  const style =
    typeof document === "undefined" ? null : getComputedStyle(document.documentElement);
  const text = style?.getPropertyValue("--primary-text-color").trim() || "#212121";
  const line = style?.getPropertyValue("--divider-color").trim() || "#e0e0e0";
  return {
    base: {
      backgroundColor: "transparent",
      textStyle: { color: text, fontFamily: "inherit" },
      grid: { left: 56, right: 24, top: 24, bottom: 40, containLabel: true },
      tooltip: { trigger: "axis" },
    },
    axis: {
      axisLine: { lineStyle: { color: line } },
      axisLabel: { color: text },
      splitLine: { lineStyle: { color: line } },
      nameTextStyle: { color: text },
    },
  };
}
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `cd frontend && npx vitest run`
Expected: PASS, 4 tests

- [ ] **Step 6: Implement the root panel**

`frontend/src/panel.ts`:

```typescript
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchConfig } from "./api";
import { RANGE_KEYS, RANGE_LABELS, type RangeKey } from "./range";
import type { ConfigResult, HomeAssistant } from "./types";
import "./tabs/load-tab";

const TABS = [
  { id: "load", label: "Load" },
  { id: "battery", label: "Battery" },
  { id: "seasonal", label: "Seasonality" },
  { id: "balance", label: "Balance" },
] as const;

@customElement("inverter-analytics-panel")
export class InverterAnalyticsPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public route?: { path: string };

  @state() private config?: ConfigResult;
  @state() private error?: string;
  @state() private entryId?: string;
  @state() private tab: string = "load";
  @state() private range: RangeKey = "30d";

  public connectedCallback(): void {
    super.connectedCallback();
    this.readLocation();
    window.addEventListener("popstate", this.readLocation);
    void this.loadConfig();
  }

  public disconnectedCallback(): void {
    window.removeEventListener("popstate", this.readLocation);
    super.disconnectedCallback();
  }

  private readLocation = (): void => {
    const path = window.location.pathname.split("/").filter(Boolean);
    const tab = path[1];
    if (tab && TABS.some((item) => item.id === tab)) {
      this.tab = tab;
    }
    const range = new URLSearchParams(window.location.search).get("range");
    if (range && (RANGE_KEYS as readonly string[]).includes(range)) {
      this.range = range as RangeKey;
    }
  };

  private writeLocation(): void {
    const url = `/inverter-analytics/${this.tab}?range=${this.range}`;
    window.history.replaceState(null, "", url);
  }

  private async loadConfig(): Promise<void> {
    try {
      this.config = await fetchConfig(this.hass);
      this.entryId ??= this.config.entries[0]?.entry_id;
    } catch (err) {
      this.error = String(err);
    }
  }

  private selectTab(tab: string): void {
    this.tab = tab;
    this.writeLocation();
  }

  private selectRange(range: RangeKey): void {
    this.range = range;
    this.writeLocation();
  }

  protected render() {
    if (this.error) {
      return html`<div class="notice">Failed to load configuration: ${this.error}</div>`;
    }
    if (!this.config) {
      return html`<div class="notice">Loading…</div>`;
    }
    if (!this.config.entries.length) {
      return html`<div class="notice">
        No inverter configured. Add the Inverter Analytics integration in Settings.
      </div>`;
    }

    return html`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1
          ? html`<select @change=${(event: Event) => {
              this.entryId = (event.target as HTMLSelectElement).value;
            }}>
              ${this.config.entries.map(
                (entry) => html`<option value=${entry.entry_id}>${entry.title}</option>`,
              )}
            </select>`
          : nothing}
        <div class="ranges">
          ${RANGE_KEYS.map(
            (key) => html`<button
              class=${key === this.range ? "active" : ""}
              @click=${() => this.selectRange(key)}
            >${RANGE_LABELS[key]}</button>`,
          )}
        </div>
      </div>

      <nav class="tabs">
        ${TABS.map(
          (item) => html`<button
            class=${item.id === this.tab ? "active" : ""}
            @click=${() => this.selectTab(item.id)}
          >${item.label}</button>`,
        )}
      </nav>

      <main>
        ${this.tab === "load"
          ? html`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>`
          : html`<div class="notice">This tab will appear in a future release.</div>`}
      </main>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      min-height: 100%;
      box-sizing: border-box;
    }
    .header { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    h1 { font-size: 20px; margin: 0; font-weight: 500; }
    .ranges { display: flex; gap: 4px; margin-left: auto; flex-wrap: wrap; }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
    }
    button.active { border-color: var(--primary-color); color: var(--primary-color); }
    .tabs { display: flex; gap: 4px; margin: 16px 0; flex-wrap: wrap; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    select {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 8px;
      font: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "inverter-analytics-panel": InverterAnalyticsPanel;
  }
}
```

- [ ] **Step 7: Create a temporary tab stub**

`panel.ts` imports `./tabs/load-tab`, whose real implementation is Task 13. So that Task 12 stays independently buildable and testable, create a stub that Task 13 will fully rewrite.

`frontend/src/tabs/load-tab.ts`:

```typescript
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant } from "../types";
import type { RangeKey } from "../range";

/** Stub: the full tab implementation is Task 13. */
@customElement("ia-load-tab")
export class IaLoadTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  protected render() {
    return html`<div class="notice">
      Load tab: period ${this.range}, inverter ${this.entryId ?? "—"}.
    </div>`;
  }

  static styles = css`
    .notice { padding: 24px; color: var(--secondary-text-color); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-load-tab": IaLoadTab;
  }
}
```

After this, `npm run typecheck && npm run test && npm run build` should be green, and the panel should open in a live Home Assistant with working tabs and period switching.

- [ ] **Step 8: Add the frontend build to CI**

Add a new job to `.github/workflows/ci.yml`:

```yaml
  frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
```

- [ ] **Step 9: Commit**

```bash
git add frontend .github/workflows/ci.yml
git commit -m "feat: frontend shell — build, header, tabs, routing"
```

---

### Task 13: "Load" tab

**Files:**
- Create: `frontend/src/format.ts`, `frontend/src/format.test.ts`
- Create: `frontend/src/charts/options.ts`, `frontend/src/charts/options.test.ts`
- Create: `frontend/src/charts/echart.ts`
- Rewrite: `frontend/src/tabs/load-tab.ts` (fully replaces the Task 12 stub)

**Interfaces:**
- Consumes: `types.LoadPayload`, `api.fetchLoad`, `range.resolveRange`, `theme.SERIES`, `theme.chartBaseOption`.
- Produces:
  - `format.ts`: `formatPower(value: number | null, locale: string): string`, `formatPercent(value: number | null, locale: string): string`, `formatDuration(seconds: number): string`
  - `charts/options.ts`: `histogramOption(payload: LoadPayload, mode: "watts" | "percent")`, `durationCurveOption(payload: LoadPayload)`, `bandsOption(payload: LoadPayload)`
  - `charts/echart.ts`: the `<ia-chart>` element with an `.option` property
  - `tabs/load-tab.ts`: the `<ia-load-tab>` element with `.hass`, `.entryId`, `.range` properties

The option builders are pure functions, so they're what the tests cover. The ECharts element itself isn't covered by tests: it has no logic besides lifecycle and resize handling.

- [ ] **Step 1: Write failing tests**

`frontend/src/format.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { formatDuration, formatPercent, formatPower } from "./format";

describe("formatPower", () => {
  it("shows watts below a kilowatt", () => {
    expect(formatPower(950, "en")).toBe("950 W");
  });

  it("switches to kilowatts above a kilowatt", () => {
    expect(formatPower(6800, "en")).toBe("6.8 kW");
  });

  it("renders a dash for missing values", () => {
    expect(formatPower(null, "en")).toBe("—");
  });
});

describe("formatPercent", () => {
  it("renders a fraction as a percentage", () => {
    expect(formatPercent(0.024, "en")).toBe("2.4%");
  });

  it("renders a dash for missing values", () => {
    expect(formatPercent(null, "en")).toBe("—");
  });
});

describe("formatDuration", () => {
  it("renders minutes below an hour", () => {
    expect(formatDuration(420)).toBe("7 min");
  });

  it("renders hours and minutes above an hour", () => {
    expect(formatDuration(3900)).toBe("1 h 5 min");
  });

  it("renders seconds below a minute", () => {
    expect(formatDuration(45)).toBe("45 s");
  });
});
```

`frontend/src/charts/options.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { SERIES } from "../theme";
import type { LoadPayload } from "../types";
import { bandsOption, durationCurveOption, histogramOption } from "./options";

const payload: LoadPayload = {
  coverage: 1,
  rated_power: 8000,
  kpi: {
    mean: 1000, median: 900, p95: 3000, max: 6800,
    fraction_above_80pct: 0.02, max_sustained_15m: 4200,
  },
  histogram: {
    bucket_width: 200,
    buckets: [
      { start: 0, end: 200, seconds: 1800, fraction: 0.5 },
      { start: 200, end: 400, seconds: 1800, fraction: 0.5 },
    ],
  },
  duration_curve: [
    { fraction: 0, value: 6800 },
    { fraction: 1, value: 0 },
  ],
  bands: [
    // The fractions are deliberately different: with two equal 0.5s, the assertion
    // about band order would still pass even if the reverse were broken.
    { key: "0-10", from: 0, to: 0.1, seconds: 900, fraction: 0.25 },
    { key: "100+", from: 1, to: null, seconds: 2700, fraction: 0.75 },
  ],
  overloads: [],
  precision: "raw",
  boundary: null,
  window: { start: "2026-08-01T00:00:00+00:00", end: "2026-08-29T00:00:00+00:00" },
  clamped: false,
};

describe("histogramOption", () => {
  it("labels the x axis in watts by default", () => {
    const option = histogramOption(payload, "watts") as any;
    expect(option.xAxis.data).toEqual(["0", "200"]);
  });

  it("labels the x axis as a share of rated power in percent mode", () => {
    const option = histogramOption(payload, "percent") as any;
    expect(option.xAxis.data).toEqual(["0", "2.5"]);
  });

  it("plots the fraction of time, not raw seconds", () => {
    const option = histogramOption(payload, "watts") as any;
    expect(option.series[0].data).toEqual([50, 50]);
  });

  it("survives an empty histogram", () => {
    const empty = { ...payload, histogram: { bucket_width: 200, buckets: [] } };
    const option = histogramOption(empty, "watts") as any;
    expect(option.series[0].data).toEqual([]);
  });
});

describe("durationCurveOption", () => {
  it("plots percent of time against power", () => {
    const option = durationCurveOption(payload) as any;
    expect(option.series[0].data).toEqual([[0, 6800], [100, 0]]);
  });
});

describe("bandsOption", () => {
  it("keeps band order and converts fractions to percent", () => {
    const option = bandsOption(payload) as any;
    expect(option.yAxis.data).toEqual(["100+", "0-10"]);
    expect(option.series[0].data).toEqual([75, 25]);
  });

  it("paints the overload band in the overload colour", () => {
    const option = bandsOption(payload) as any;
    // After the reverse, index zero is "100+".
    expect(option.series[0].itemStyle.color({ dataIndex: 0 })).toBe(SERIES.overload);
    expect(option.series[0].itemStyle.color({ dataIndex: 1 })).toBe(SERIES.load);
  });
});
```

The order in `bandsOption` is reversed deliberately: ECharts draws Y-axis categories bottom to top, so for the "0-10" band to end up at the top, the array has to go in reverse order.

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `cd frontend && npx vitest run`
Expected: FAIL — `Failed to resolve import "./format"` and `"./options"`

- [ ] **Step 3: Implement formatting**

`frontend/src/format.ts`:

```typescript
const DASH = "—";

export function formatPower(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  if (Math.abs(value) >= 1000) {
    const kilowatts = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
      value / 1000,
    );
    return `${kilowatts} kW`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)} W`;
}

export function formatPercent(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value * 100)}%`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}
```

- [ ] **Step 4: Implement the option builders**

`frontend/src/charts/options.ts`:

```typescript
import { SERIES, chartBaseOption } from "../theme";
import type { LoadPayload } from "../types";

const round = (value: number, digits: number): number =>
  Number(value.toFixed(digits));

export function histogramOption(
  payload: LoadPayload,
  mode: "watts" | "percent",
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = payload.histogram.buckets;
  const labels = buckets.map((bucket) =>
    mode === "watts"
      ? String(round(bucket.start, 0))
      : String(round((bucket.start / payload.rated_power) * 100, 1)),
  );

  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: labels,
      name: mode === "watts" ? "W" : "% of rated",
      nameLocation: "end",
    },
    yAxis: { ...axis, type: "value", name: "% of time" },
    series: [
      {
        type: "bar",
        data: buckets.map((bucket) => round(bucket.fraction * 100, 2)),
        itemStyle: { color: SERIES.load },
        barCategoryGap: "10%",
      },
    ],
  };
}

export function durationCurveOption(payload: LoadPayload): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    xAxis: { ...axis, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...axis, type: "value", name: "W" },
    series: [
      {
        type: "line",
        showSymbol: false,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: SERIES.load },
        itemStyle: { color: SERIES.load },
        data: payload.duration_curve.map((point) => [
          round(point.fraction * 100, 2),
          round(point.value, 1),
        ]),
      },
    ],
  };
}

export function bandsOption(payload: LoadPayload): Record<string, unknown> {
  // ECharts draws Y-axis categories bottom to top, so the band order is reversed.
  const { base, axis } = chartBaseOption();
  const bands = [...payload.bands].reverse();
  return {
    ...base,
    xAxis: { ...axis, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...axis, type: "category", data: bands.map((band) => band.key) },
    series: [
      {
        type: "bar",
        data: bands.map((band) => round(band.fraction * 100, 2)),
        itemStyle: {
          color: (params: { dataIndex: number }) =>
            bands[params.dataIndex].key === "100+" ? SERIES.overload : SERIES.load,
        },
      },
    ],
  };
}
```

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `cd frontend && npx vitest run`
Expected: PASS, 18 tests total: 4 from `range.test.ts`, 8 from `format.test.ts`, 6 from `charts/options.test.ts`

- [ ] **Step 6: Implement the ECharts wrapper**

`frontend/src/charts/echart.ts`:

```typescript
import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

@customElement("ia-chart")
export class IaChart extends LitElement {
  @property({ attribute: false }) public option?: Record<string, unknown>;
  @property({ type: String }) public height = "280px";

  private chart?: echarts.ECharts;
  private observer?: ResizeObserver;

  protected firstUpdated(): void {
    const host = this.renderRoot.querySelector(".canvas") as HTMLElement;
    this.chart = echarts.init(host, undefined, { renderer: "canvas" });
    this.observer = new ResizeObserver(() => this.chart?.resize());
    this.observer.observe(host);
    this.applyOption();
  }

  protected updated(): void {
    this.applyOption();
  }

  public disconnectedCallback(): void {
    this.observer?.disconnect();
    this.chart?.dispose();
    this.chart = undefined;
    super.disconnectedCallback();
  }

  private applyOption(): void {
    if (this.chart && this.option) {
      this.chart.setOption(this.option, true);
    }
  }

  protected render() {
    return html`<div class="canvas" style="height:${this.height}"></div>`;
  }

  static styles = css`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-chart": IaChart;
  }
}
```

- [ ] **Step 7: Replace the tab stub with the full implementation**

`frontend/src/tabs/load-tab.ts`:

```typescript
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchLoad } from "../api";
import { bandsOption, durationCurveOption, histogramOption } from "../charts/options";
import "../charts/echart";
import { formatDuration, formatPercent, formatPower } from "../format";
import { resolveRange, type RangeKey } from "../range";
import type { HomeAssistant, LoadPayload } from "../types";

const PRECISION_LABEL: Record<LoadPayload["precision"], string> = {
  raw: "Exact data",
  mixed: "Mixed",
  lts: "Hourly averages",
};

@customElement("ia-load-tab")
export class IaLoadTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: LoadPayload;
  @state() private error?: string;
  @state() private loading = false;
  @state() private mode: "watts" | "percent" = "watts";

  private requestId = 0;

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("entryId") || changed.has("range")) {
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.entryId) return;
    // Every request gets a number. While it's in flight, the user may have switched
    // the period — in that case the slower, stale response would arrive last and
    // overwrite fresh data under what is by then a different period's heading.
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const { start, end } = resolveRange(this.range, new Date());
      const payload = await fetchLoad(this.hass, this.entryId, start, end);
      if (requestId !== this.requestId) return;
      this.payload = payload;
    } catch (err) {
      if (requestId !== this.requestId) return;
      this.error = String(err);
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: LoadPayload) {
    const locale = this.hass.locale.language;
    const share = (value: number | null) =>
      value === null ? "" : formatPercent(value / payload.rated_power, locale) + " of rated";

    const cells: [string, string, string][] = [
      ["Mean", formatPower(payload.kpi.mean, locale), share(payload.kpi.mean)],
      ["Median", formatPower(payload.kpi.median, locale), ""],
      ["P95", formatPower(payload.kpi.p95, locale), ""],
      ["Peak", formatPower(payload.kpi.max, locale), share(payload.kpi.max)],
      ["Sustained 15 min", formatPower(payload.kpi.max_sustained_15m, locale), ""],
      [">80% of rated", formatPercent(payload.kpi.fraction_above_80pct, locale), "of time"],
    ];

    return html`<div class="kpi">
      ${cells.map(
        ([label, value, hint]) => html`<div class="cell">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
          <span class="hint">${hint}</span>
        </div>`,
      )}
    </div>`;
  }

  private renderOverloads(payload: LoadPayload) {
    if (!payload.overloads.length) {
      return html`<p class="empty">No overload episodes in this period.</p>`;
    }
    const locale = this.hass.locale.language;
    return html`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Peak</th></tr>
      </thead>
      <tbody>
        ${payload.overloads.map(
          (item) => html`<tr>
            <td>${new Date(item.start).toLocaleString(locale)}</td>
            <td>${formatDuration(item.seconds)}</td>
            <td>${formatPower(item.peak, locale)}</td>
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  protected render() {
    if (this.error) {
      return html`<div class="notice">
        Failed to load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">Calculating…</div>`;
    }

    const payload = this.payload;
    const locale = this.hass.locale.language;

    return html`
      <div class="status">
        <span class="badge">${PRECISION_LABEL[payload.precision]}</span>
        ${payload.coverage < 0.95
          ? html`<span class="warn">
              Data is missing for ${formatPercent(1 - payload.coverage, locale)} of the time
            </span>`
          : nothing}
        ${payload.clamped
          ? html`<span class="warn">Period clipped to the maximum allowed</span>`
          : nothing}
        ${payload.histogram.clipped_low_seconds + payload.histogram.clipped_high_seconds > 0
          ? html`<span class="warn">
              Some values fell outside the histogram range and are shown in the edge buckets
            </span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Updating…</span>` : nothing}
      </div>

      ${this.renderKpi(payload)}

      <section>
        <header>
          <h2>Time spent at each power level</h2>
          <button @click=${() => {
            this.mode = this.mode === "watts" ? "percent" : "watts";
          }}>${this.mode === "watts" ? "as % of rated" : "in watts"}</button>
        </header>
        <ia-chart .option=${histogramOption(payload, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Load duration curve</h2>
        <ia-chart .option=${durationCurveOption(payload)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across rated-power bands</h2>
        <ia-chart .option=${bandsOption(payload)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Overload episodes</h2>
        ${this.renderOverloads(payload)}
      </section>
    `;
  }

  static styles = css`
    :host { display: block; }
    .status { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn { color: var(--warning-color); font-size: 13px; }
    .kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .cell {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label { font-size: 12px; color: var(--secondary-text-color); }
    .value { font-size: 22px; font-weight: 500; }
    .hint { font-size: 12px; color: var(--secondary-text-color); }
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    section header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    section header h2 { margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
    .empty { color: var(--secondary-text-color); margin: 0; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-load-tab": IaLoadTab;
  }
}
```

- [ ] **Step 8: Build the bundle and check types**

Run: `cd frontend && npm run typecheck && npm run test && npm run build`
Expected: all green, and `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` now contains a built file bigger than the stub

- [ ] **Step 9: Verify on a live Home Assistant**

Copy `custom_components/inverter_analytics` into a test instance's `config/custom_components/`, restart, add the integration, point it at a load-power sensor and a rated power. Open "Inverter Analytics" in the sidebar.

Check manually:
- the KPIs are populated, not dashes
- the histogram switches between watts and percent of rated power
- changing the period in the header redraws the charts
- reloading the page keeps the tab and period (URL `/inverter-analytics/load?range=30d`)
- both light and dark themes are readable

- [ ] **Step 10: Run the full suite and commit**

Run: `pytest -v && ruff check . && cd frontend && npm run test && npm run build`

```bash
git add frontend custom_components/inverter_analytics/frontend/dist
git commit -m "feat: Load tab with histogram, LDC and rated-power bands"
```

---

## Task order and dependencies

```
Task 1 (scaffold)
  ├── Task 2 (roles) ── Task 3 (config flow)
  ├── Task 4 (panel)
  └── Task 5 (intervals) ── Task 6 (histograms)
                         └── Task 7 (episodes)
                                └── Task 8 (data source) ─┐
                                    Task 9 (cache) ───────┤
                                                          └── Task 10 (load analytics)
                                                                  └── Task 11 (WS API)
                                                                          └── Task 12 (frontend scaffold)
                                                                                  └── Task 13 (tab)
```

Tasks 2–4 are independent of each other after Task 1 and can run in any order. Tasks 5 → 6 → 7 modify the same file, so they're strictly sequential.

## Definition of done

Stages 1–3 are considered complete when:

1. `pytest -v` and `ruff check .` are green locally and in CI.
2. `npm run typecheck && npm run test && npm run build` are green, and the built bundle is committed.
3. The integration installs on a clean Home Assistant via HACS Custom repositories.
4. The setup wizard accepts a load sensor and a rated power and creates an entry.
5. The "Inverter Analytics" entry appears in the sidebar without a restart.
6. The "Load" tab shows populated KPIs, a power-distribution histogram, a duration curve, and rated-power bands for the 24h, 7-day, and 30-day periods.
7. The precision badge shows "Exact data" for a short period and "Mixed" for a period longer than `purge_keep_days`.
