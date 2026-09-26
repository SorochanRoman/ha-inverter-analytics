# Grid Outages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Grid tab that counts outages from a grid-presence sensor, shows how the battery coped through each one, estimates autonomy from the battery's own discharge rate, and falls back to inferring outages from power flows when no sensor is mapped.

**Architecture:** A binary-series reader in `source.py` that reads raw states only and reports the part of a window it can answer; pure outage maths in `analytics/grid.py` on the existing `Interval` / `Series` types; a WebSocket command on the shared `_async_windowed_response`; detection extended to the `binary_sensor` domain with a site-wide candidate offered to every cluster; a Lit tab with two bar charts, an episode table and an autonomy card.

**Tech Stack:** Python 3.12 / Home Assistant 2024.11+, Lit 3 + TypeScript + ECharts 5, pytest + vitest.

Spec: `docs/superpowers/specs/2026-09-26-grid-outages-design.md`.

## Global Constraints

- Everything committed is English: docs, UI strings, backend messages that reach the screen, code comments, docstrings, commit messages.
- The grid-presence sensor is read from raw states only; every window that starts before the recorder's retention reports `counted_from` and is answered for the countable part alone.
- `OUTAGE_MIN_SECONDS = 60`, `OUTAGE_BRIDGE_SECONDS = 600`, `INFERRED_MIN_SECONDS = 300`, `AUTONOMY_MIN_HOURS = 1`, `DEFAULT_GRID_ZERO_W = 10`.
- The share of time without grid divides by measured seconds, never by the window.
- Autonomy comes from the state of charge lost per hour of outage; `battery_capacity` is not read.
- Inferred mode reports `source: "inferred"`, no brief interruptions, and the tab carries the banner whenever it is in that mode.
- `ruff check` and `ruff format --check` clean; `pytest` output pristine, no stray log lines.
- Charts use only option keys in `SUPPORTED_OPTION_KEYS`.
- The built bundle `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` is committed with the frontend change that produced it.

---

### Task 1: The Grid feature, and the one new option

**Files:**
- Modify: `custom_components/inverter_analytics/roles.py` (the `Role` table, `Feature`, `FEATURES`, `feature_availability`)
- Modify: `custom_components/inverter_analytics/const.py`
- Modify: `custom_components/inverter_analytics/config_flow.py:48-53` (`_TUNING_DEFAULTS`)
- Modify: `custom_components/inverter_analytics/translations/en.json` (the `options.step.init` block)
- Test: `tests/test_roles.py`

**Interfaces:**
- Produces: `Feature.alternatives: tuple[tuple[str, ...], ...]`; `FEATURES_BY_KEY["grid"]` with `key="grid"`, `label="Grid outages"`, `requires=("grid_connected",)`; the role `grid_zero_w` (`RoleKind.NUMBER`, unit `"W"`, `advanced=True`); `DEFAULT_GRID_ZERO_W = 10.0` in `const.py`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_roles.py`:

```python
def _grid(config: EntryConfig) -> dict:
    return next(item for item in feature_availability(config) if item["key"] == "grid")


def test_the_grid_feature_opens_on_a_presence_sensor():
    config = EntryConfig.from_dict(
        {"entities": {"grid_connected": "binary_sensor.grid"}, "numbers": {}}
    )
    assert _grid(config)["available"] is True
    assert _grid(config)["missing"] == []


def test_the_grid_feature_opens_on_power_flows_and_keeps_asking_for_the_sensor():
    """Inferred outages are the fallback; the sensor stays worth mapping."""
    total = EntryConfig.from_dict(
        {
            "entities": {"grid_power": "sensor.grid", "battery_power": "sensor.bat"},
            "numbers": {},
        }
    )
    phases = EntryConfig.from_dict(
        {
            "entities": {
                "grid_power_phase": ["sensor.l1", "sensor.l2"],
                "battery_power": "sensor.bat",
            },
            "numbers": {},
        }
    )
    for config in (total, phases):
        assert _grid(config)["available"] is True
        assert _grid(config)["missing"] == ["grid_connected"]


def test_grid_power_alone_does_not_open_the_grid_feature():
    config = EntryConfig.from_dict({"entities": {"grid_power": "sensor.grid"}, "numbers": {}})
    assert _grid(config)["available"] is False
    assert _grid(config)["missing"] == ["grid_connected"]


def test_grid_zero_is_a_tuning_number():
    role = ROLES_BY_KEY["grid_zero_w"]
    assert role.kind is RoleKind.NUMBER
    assert role.advanced is True
    assert "grid_zero_w" in tuning_role_keys()
```

Extend `test_every_feature_names_roles_that_exist` so the alternatives are checked too:

```python
def test_every_feature_names_roles_that_exist():
    """A typo would make a feature permanently unavailable and never say why."""
    for feature in FEATURES:
        assert set(feature.requires) <= set(ROLES_BY_KEY), feature.key
        for alternative in feature.alternatives:
            assert set(alternative) <= set(ROLES_BY_KEY), feature.key
```

Add `tuning_role_keys` and `RoleKind` to the module's imports from `roles` if they are not there already.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_roles.py -v`
Expected: the four new tests FAIL — `StopIteration` from `_grid` (no feature keyed `grid`) and `KeyError: 'grid_zero_w'`; the extended test FAILS with `AttributeError: 'Feature' object has no attribute 'alternatives'`.

- [ ] **Step 3: Add the role, the constant and the feature**

In `const.py`, under the battery defaults:

```python
# Only for outages inferred from power flows. A current-transformer reading
# is never quite zero, and how far from zero depends on the clamp.
DEFAULT_GRID_ZERO_W: Final = 10.0
```

In `roles.py`, add to `ROLES` after `battery_idle_w`:

```python
    Role("grid_zero_w", RoleKind.NUMBER, "W", advanced=True),
```

Extend `Feature`:

```python
@dataclass(frozen=True, slots=True)
class Feature:
    ...
    needs_all: bool = True
    # Other role sets that open the feature on their own. `requires` stays
    # what `missing` is reported against: the Grid tab opens on grid power
    # and battery power, but inferring outages from flows is a fallback, and
    # the presence sensor is still the thing worth asking for — so it stays
    # listed as missing, and the repair card keeps saying so.
    alternatives: tuple[tuple[str, ...], ...] = ()
```

Add to `FEATURES` after the balance entry:

```python
    Feature(
        "grid",
        "Grid outages",
        ("grid_connected",),
        alternatives=(("grid_power", "battery_power"), ("grid_power_phase", "battery_power")),
    ),
```

In `feature_availability`, replace the `available = ...` line:

```python
        available = not missing if feature.needs_all else len(missing) < len(feature.requires)
        available = available or any(config.has(*roles) for roles in feature.alternatives)
```

In `config_flow.py`, add `DEFAULT_GRID_ZERO_W` to the `const` import and to `_TUNING_DEFAULTS`:

```python
    "battery_idle_w": DEFAULT_BATTERY_IDLE_W,
    "grid_zero_w": DEFAULT_GRID_ZERO_W,
```

In `translations/en.json`, `options.step.init.data`:

```json
"grid_zero_w": "Grid zero power"
```

and `options.step.init.data_description`:

```json
"grid_zero_w": "Only used when outages are inferred from power flows, on an inverter with no grid-presence sensor mapped. Grid power within this many watts of zero counts as no exchange with the grid. A current-transformer reading is never quite zero; how far from it depends on the clamp. Default 10 W."
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_roles.py tests/test_translations.py tests/test_config_flow.py -v`
Expected: all PASS. `test_translations` is what checks the new option has a label and a description.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/roles.py custom_components/inverter_analytics/const.py custom_components/inverter_analytics/config_flow.py custom_components/inverter_analytics/translations/en.json tests/test_roles.py
git commit -m "feat: the grid feature, and the zero-power option it will need"
```

---

### Task 2: Reading a binary sensor, and the part of a window it can answer

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/source.py`
- Test: `tests/test_source.py`

**Interfaces:**
- Consumes: `Window`, `raw_available_from(hass)`, `_async_raw_states(hass, entity_ids, window)`, `Sample`, `Series`.
- Produces:
  - `binary_states_to_samples(states: Iterable[State]) -> list[Sample]` — `on` → `1.0`, `off` → `0.0`, anything else → `None`.
  - `Countable` dataclass: `window: Window`, `counted_from: datetime | None`.
  - `countable_window(hass, window) -> Countable`.
  - `async_binary_series(hass, entity_id: str, window: Window) -> Series` — raw states only.

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_source.py` (add `binary_states_to_samples`, `countable_window`, `async_binary_series` to the `source` import):

```python
def test_binary_states_become_one_and_zero_and_anything_else_a_gap():
    states = [
        State("binary_sensor.grid", "on"),
        State("binary_sensor.grid", "off"),
        State("binary_sensor.grid", "unavailable"),
        State("binary_sensor.grid", "unknown"),
    ]
    assert [sample.value for sample in binary_states_to_samples(states)] == [1.0, 0.0, None, None]


@freeze_time(NOW)
def test_countable_window_starts_where_the_recorder_does(hass: HomeAssistant, recorder_keep_days):
    boundary = NOW - timedelta(days=10)

    whole = countable_window(hass, Window(NOW - timedelta(days=30), NOW))
    assert whole.window == Window(boundary, NOW)
    assert whole.counted_from == boundary

    recent = countable_window(hass, Window(NOW - timedelta(days=2), NOW))
    assert recent.window == Window(NOW - timedelta(days=2), NOW)
    assert recent.counted_from is None


@freeze_time(NOW)
def test_a_window_the_recorder_no_longer_holds_is_countable_for_nothing(
    hass: HomeAssistant, recorder_keep_days
):
    gone = countable_window(hass, Window(NOW - timedelta(days=30), NOW - timedelta(days=20)))
    assert gone.window.seconds == 0.0
    assert gone.counted_from == NOW - timedelta(days=10)


async def test_binary_series_reads_raw_states_only(hass: HomeAssistant):
    window = Window(NOW - timedelta(hours=1), NOW)
    states = [State("binary_sensor.grid", "off", last_changed=NOW - timedelta(minutes=30))]
    with patch(
        "custom_components.inverter_analytics.analytics.source._async_raw_states",
        return_value={"binary_sensor.grid": states},
    ) as raw, patch(
        "custom_components.inverter_analytics.analytics.source._async_lts_rows"
    ) as lts:
        series = await async_binary_series(hass, "binary_sensor.grid", window)
    assert raw.called
    assert not lts.called
    assert series.start == window.start and series.end == window.end
    assert [sample.value for sample in series.samples] == [0.0]
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_source.py -v`
Expected: FAIL with `ImportError: cannot import name 'binary_states_to_samples'`.

- [ ] **Step 3: Write the reader**

In `source.py`, after `states_to_samples`:

```python
_BINARY_ON = "on"
_BINARY_OFF = "off"


def binary_states_to_samples(states: Iterable[State]) -> list[Sample]:
    """Convert a binary sensor's states into samples: on is one, off is zero.

    Anything else — unavailable, unknown — is a gap, never a value. An
    integration that lost its connection has said nothing about the grid, and
    reading its silence as an outage would count every restart as one.
    """
    samples: list[Sample] = []
    for state in states:
        raw = (state.state or "").lower()
        if raw == _BINARY_ON:
            value: float | None = 1.0
        elif raw == _BINARY_OFF:
            value = 0.0
        else:
            value = None
        samples.append(Sample(state.last_changed, value))
    return samples


@dataclass(frozen=True, slots=True)
class Countable:
    """The part of a window that raw states can answer.

    counted_from is the recorder's boundary when the request began before
    it, and None when the whole window is inside retention. A window that
    ends before the boundary has a zero-length countable part: there is
    nothing to read, and the caller says so rather than reading nothing.
    """

    window: Window
    counted_from: datetime | None


def countable_window(hass: HomeAssistant, window: Window) -> Countable:
    """Clip a window to where raw states still exist.

    For a sensor with no long-term statistics — every binary sensor — this
    is the only history there is, and a thirty-day request answered from
    ten days without saying so is exactly the reading this project exists
    to prevent.
    """
    boundary = raw_available_from(hass)
    if window.start >= boundary:
        return Countable(window, None)
    start = min(boundary, window.end)
    return Countable(Window(start, window.end), boundary)


async def async_binary_series(hass: HomeAssistant, entity_id: str, window: Window) -> Series:
    """A binary sensor's states over a window, from raw states only.

    Home Assistant compiles hourly statistics for numeric sensors with a
    state_class; a binary sensor has neither, so there is no second source
    to fall back to and no precision to choose.
    """
    states = await _async_raw_states(hass, [entity_id], window)
    return Series.of(window.start, window.end, binary_states_to_samples(states.get(entity_id, [])))
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_source.py -v`
Expected: PASS.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/analytics/source.py tests/test_source.py
git commit -m "feat: read a binary sensor from raw states, and say how far back that reaches"
```

---

### Task 3: Outage episodes, the figures, and the two distributions

**Files:**
- Create: `custom_components/inverter_analytics/analytics/grid.py`
- Test: `tests/test_grid.py`

**Interfaces:**
- Consumes: `Interval`, `Series`, `to_intervals`, `coverage`, `hour_of_day_durations`, `split_local_hours` from `resample.py`; `Window` from `source.py`.
- Produces:
  - Constants `OUTAGE_MIN_SECONDS = 60.0`, `OUTAGE_BRIDGE_SECONDS = 600.0`, `INFERRED_MIN_SECONDS = 300.0`, `SOURCE_SENSOR = "sensor"`, `SOURCE_INFERRED = "inferred"`.
  - `Outage` dataclass: `start`, `end`, `bridged_seconds: float`, `started_before_window: bool`, `ongoing: bool`, property `seconds`.
  - `outage_episodes(intervals, *, window, min_seconds, bridge_seconds) -> list[Outage]`.
  - `brief_interruptions(intervals, *, min_seconds, bridge_seconds) -> int`.
  - `build_grid_payload(grid: Series, *, window: Window, tz: tzinfo, source: str, low_pct: float, soc: Series | None = None, load: Series | None = None, counted_from: datetime | None = None) -> dict[str, Any]` — Task 4 fills in the battery columns and autonomy; this task produces the payload with `episodes` carrying only timing, `autonomy` absent.

- [ ] **Step 1: Write the failing tests**

Create `tests/test_grid.py`:

```python
"""Tests for the grid outage analytics."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.grid import (
    OUTAGE_BRIDGE_SECONDS,
    OUTAGE_MIN_SECONDS,
    SOURCE_SENSOR,
    build_grid_payload,
    outage_episodes,
)
from custom_components.inverter_analytics.analytics.resample import Sample, Series, to_intervals
from custom_components.inverter_analytics.analytics.source import Window

BASE = datetime(2026, 1, 1, tzinfo=UTC)
KYIV = ZoneInfo("Europe/Kyiv")


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def grid_series(*points: tuple[float, float | None], end: float = 240.0) -> Series:
    """A binary series: (minute, 1.0 for on / 0.0 for off / None for a gap)."""
    return Series.of(BASE, at(end), [Sample(at(m), v) for m, v in points])


def episodes(series: Series):
    return outage_episodes(
        to_intervals(series),
        window=Window(series.start, series.end),
        min_seconds=OUTAGE_MIN_SECONDS,
        bridge_seconds=OUTAGE_BRIDGE_SECONDS,
    )


def build(series: Series, **kwargs):
    options = {
        "window": Window(series.start, series.end),
        "tz": UTC,
        "source": SOURCE_SENSOR,
        "low_pct": 20.0,
    } | kwargs
    return build_grid_payload(series, **options)


def test_a_run_of_off_is_an_outage_with_its_duration():
    found = episodes(grid_series((0, 1.0), (60, 0.0), (90, 1.0)))
    assert len(found) == 1
    assert found[0].start == at(60)
    assert found[0].end == at(90)
    assert found[0].seconds == 1800.0
    assert found[0].bridged_seconds == 0.0
    assert found[0].started_before_window is False
    assert found[0].ongoing is False


def test_a_flicker_under_a_minute_is_not_an_outage_but_is_counted():
    series = grid_series((0, 1.0), (60, 0.0), (60.5, 1.0), (100, 0.0), (130, 1.0))
    assert len(episodes(series)) == 1
    assert build(series)["kpi"]["brief_interruptions"] == 1
    assert build(series)["kpi"]["count"] == 1


def test_a_short_gap_inside_an_outage_is_bridged_and_reported():
    """Home Assistant restarting mid-outage must not make two outages of one."""
    series = grid_series((0, 1.0), (60, 0.0), (120, None), (120.5, 0.0), (180, 1.0))
    found = episodes(series)
    assert len(found) == 1
    assert found[0].start == at(60) and found[0].end == at(180)
    assert found[0].bridged_seconds == 30.0


def test_a_long_gap_ends_the_outage_where_the_grid_was_last_known_absent():
    series = grid_series((0, 1.0), (60, 0.0), (120, None), (150, 0.0), (180, 1.0))
    found = episodes(series)
    assert [(item.start, item.end) for item in found] == [(at(60), at(120)), (at(150), at(180))]
    assert all(item.bridged_seconds == 0.0 for item in found)


def test_the_grid_returning_inside_a_gap_is_not_bridged_over():
    series = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (121, None), (122, 0.0), (180, 1.0))
    found = episodes(series)
    assert [(item.start, item.end) for item in found] == [(at(60), at(120)), (at(122), at(180))]


def test_outages_at_the_edges_of_the_window_say_so():
    series = grid_series((0, 0.0), (30, 1.0), (200, 0.0))
    found = episodes(series)
    assert found[0].started_before_window is True and found[0].ongoing is False
    assert found[1].started_before_window is False and found[1].ongoing is True
    assert found[1].end == at(240)


def test_the_share_is_of_measured_time_not_of_the_window():
    # 120 minutes measured, of which 30 off; the other 120 minutes are a gap.
    series = grid_series((0, 1.0), (60, 0.0), (90, 1.0), (120, None))
    payload = build(series)
    assert payload["measured_seconds"] == 7200.0
    assert payload["kpi"]["off_seconds"] == 1800.0
    assert payload["kpi"]["off_share"] == 0.25
    assert payload["coverage"] == 0.5


def test_no_measured_time_means_dashes_not_zeroes():
    payload = build(grid_series((0, None)))
    assert payload["measured_seconds"] == 0.0
    assert payload["kpi"]["count"] == 0
    assert payload["kpi"]["off_share"] is None
    assert payload["kpi"]["longest_seconds"] is None
    assert payload["kpi"]["mean_seconds"] is None


def test_the_longest_outage_is_named_with_when_it_began():
    series = grid_series((0, 1.0), (10, 0.0), (20, 1.0), (100, 0.0), (160, 1.0))
    kpi = build(series)["kpi"]
    assert kpi["count"] == 2
    assert kpi["longest_seconds"] == 3600.0
    assert kpi["longest_start"] == at(100).isoformat()
    assert kpi["mean_seconds"] == 2100.0


def test_hours_of_day_carry_off_and_measured_seconds_in_the_local_zone():
    # BASE is 02:00 in Kyiv. Off from 02:30 to 03:30 local.
    series = grid_series((0, 1.0), (30, 0.0), (90, 1.0), end=180)
    hours = build(series, tz=KYIV)["hours"]
    by_hour = {item["hour"]: item for item in hours}
    assert by_hour[2] == {"hour": 2, "off_seconds": 1800.0, "measured_seconds": 3600.0}
    assert by_hour[3] == {"hour": 3, "off_seconds": 1800.0, "measured_seconds": 3600.0}
    assert by_hour[4] == {"hour": 4, "off_seconds": 0.0, "measured_seconds": 3600.0}
    assert by_hour[5]["measured_seconds"] == 0.0


def test_days_carry_off_time_and_the_outages_that_began_on_them():
    # BASE is 2026-01-01 02:00 Kyiv; 22 hours later is the next local day.
    series = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (23 * 60 + 30, 0.0), end=24 * 60)
    days = build(series, tz=KYIV)["days"]
    assert [item["day"] for item in days] == ["2026-01-01", "2026-01-02"]
    assert days[0]["off_seconds"] == 3600.0 and days[0]["count"] == 1
    assert days[1]["off_seconds"] == 1800.0 and days[1]["count"] == 1
    assert days[0]["measured_seconds"] == 22 * 3600.0


def test_a_day_with_no_data_is_absent_not_zero():
    series = grid_series((0, None), (25 * 60, 1.0), end=48 * 60)
    days = build(series)["days"]
    assert [item["day"] for item in days] == ["2026-01-02"]


def test_days_and_hours_add_up_across_a_clock_change():
    # Kyiv moves its clocks forward on 2026-03-29 at 03:00, so that day is 23 hours.
    start = datetime(2026, 3, 28, 22, 0, tzinfo=UTC)  # 2026-03-29 00:00 in Kyiv
    series = Series.of(start, start + timedelta(hours=23), [Sample(start, 1.0)])
    payload = build_grid_payload(
        series,
        window=Window(series.start, series.end),
        tz=KYIV,
        source=SOURCE_SENSOR,
        low_pct=20.0,
    )
    assert payload["days"] == [
        {"day": "2026-03-29", "off_seconds": 0.0, "measured_seconds": 23 * 3600.0, "count": 0}
    ]
    assert sum(item["measured_seconds"] for item in payload["hours"]) == 23 * 3600.0
    assert payload["hours"][3]["measured_seconds"] == 0.0, "the hour that never happened"


def test_the_payload_names_its_source_and_the_cutoff():
    payload = build(grid_series((0, 1.0)), counted_from=at(-60))
    assert payload["source"] == "sensor"
    assert payload["counted_from"] == at(-60).isoformat()
    assert build(grid_series((0, 1.0)))["counted_from"] is None
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_grid.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'custom_components.inverter_analytics.analytics.grid'`.

- [ ] **Step 3: Write the module**

Create `custom_components/inverter_analytics/analytics/grid.py`:

```python
"""Grid outages: how often the grid goes away, for how long, and when.

Everything here works from a binary series — one while the grid is present,
zero while it is absent, a gap where nobody knows — that has already been
read. build_grid_payload touches no Home Assistant API; async_grid_analytics,
added in a later task, is the thin layer that reads the sensors.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Sequence
from dataclasses import dataclass
from datetime import datetime, tzinfo
from typing import Any

from .resample import Interval, Series, coverage, hour_of_day_durations, split_local_hours, to_intervals
from .source import Window

# The same floor every other episode on the page uses. Shorter interruptions
# are real and are counted, but as a figure of their own rather than as rows.
OUTAGE_MIN_SECONDS = 60.0

# A gap in the data this short, with no `on` inside it, does not end an
# outage: Home Assistant restarting mid-outage leaves the sensor unavailable
# for half a minute, and read naively that is two outages with a wrong
# "longest".
OUTAGE_BRIDGE_SECONDS = 600.0

# Outages inferred from power flows have their own floor. A flicker cannot be
# inferred, and pretending to count them would be noise.
INFERRED_MIN_SECONDS = 300.0

SOURCE_SENSOR = "sensor"
SOURCE_INFERRED = "inferred"

# A binary interval holds 1.0 or 0.0; the midpoint keeps float comparisons
# out of the code that reads it.
_PRESENT = 0.5


@dataclass(frozen=True, slots=True)
class Outage:
    """A contiguous span during which the grid was absent."""

    start: datetime
    end: datetime
    bridged_seconds: float
    started_before_window: bool
    ongoing: bool

    @property
    def seconds(self) -> float:
        """Duration in seconds, including anything bridged."""
        return (self.end - self.start).total_seconds()


def _off_runs(
    intervals: Sequence[Interval], bridge_seconds: float
) -> list[tuple[datetime, datetime, float]]:
    """Runs of grid absence, bridging short data gaps that hold no `on`.

    An `on` interval always closes the run; a gap closes it only when it is
    longer than the bridge. A gap longer than that ends the outage at the last
    moment the grid was known to be absent — nothing guesses at what happened
    while nobody was recording.
    """
    runs: list[tuple[datetime, datetime, float]] = []
    current: list[Any] | None = None
    for interval in intervals:
        if interval.value >= _PRESENT:
            if current is not None:
                runs.append((current[0], current[1], current[2]))
                current = None
            continue
        if current is not None:
            gap = (interval.start - current[1]).total_seconds()
            if gap <= bridge_seconds:
                current[1] = interval.end
                current[2] += gap
                continue
            runs.append((current[0], current[1], current[2]))
        current = [interval.start, interval.end, 0.0]
    if current is not None:
        runs.append((current[0], current[1], current[2]))
    return runs


def outage_episodes(
    intervals: Sequence[Interval], *, window: Window, min_seconds: float, bridge_seconds: float
) -> list[Outage]:
    """Runs of absence long enough to count, flagged where the window cut them.

    A run starting at the window's start was in force when the window opened;
    one ending at its end is still in progress. Both show as "at least" on
    screen, because that is what is known.
    """
    return [
        Outage(start, end, bridged, start <= window.start, end >= window.end)
        for start, end, bridged in _off_runs(intervals, bridge_seconds)
        if (end - start).total_seconds() >= min_seconds
    ]


def brief_interruptions(
    intervals: Sequence[Interval], *, min_seconds: float, bridge_seconds: float
) -> int:
    """Runs of absence too short to be outages.

    A floor on flickers, not a count of them: a template sensor updates when
    the inverter is polled, so nothing shorter than the poll interval can be
    seen at all.
    """
    return sum(
        1
        for start, end, _ in _off_runs(intervals, bridge_seconds)
        if (end - start).total_seconds() < min_seconds
    )


def _by_hour(intervals: Sequence[Interval], tz: tzinfo) -> list[dict[str, Any]]:
    """Seconds without grid and seconds measured, for each local hour of day.

    Both, so the interface can draw a share: under uneven coverage raw hours
    compare an hour the recorder saw ten times with one it saw twice.
    """
    off = hour_of_day_durations([item for item in intervals if item.value < _PRESENT], tz)
    measured = hour_of_day_durations(intervals, tz)
    return [
        {"hour": hour, "off_seconds": off[hour], "measured_seconds": measured[hour]}
        for hour in range(24)
    ]


def _by_day(
    intervals: Sequence[Interval], outages: Sequence[Outage], tz: tzinfo
) -> list[dict[str, Any]]:
    """Per local day: time without grid, time measured, outages that began.

    A day the sensor had no data for is not in the list at all. A bar at zero
    would read as a calm day, and the interface says how many days are absent
    instead. An outage in force when the window opened counts on the window's
    first day, which is the only day it can be said to have begun on here.
    """
    days: dict[str, dict[str, float]] = defaultdict(
        lambda: {"off_seconds": 0.0, "measured_seconds": 0.0, "count": 0}
    )
    for piece in split_local_hours(intervals, tz):
        day = days[piece.local.date().isoformat()]
        day["measured_seconds"] += piece.seconds
        if piece.value < _PRESENT:
            day["off_seconds"] += piece.seconds
    for outage in outages:
        key = outage.start.astimezone(tz).date().isoformat()
        if key in days:
            days[key]["count"] += 1
    return [{"day": key, **values} for key, values in sorted(days.items())]


def _describe(outage: Outage) -> dict[str, Any]:
    return {
        "start": outage.start.isoformat(),
        "end": outage.end.isoformat(),
        "seconds": outage.seconds,
        "bridged_seconds": outage.bridged_seconds,
        "started_before_window": outage.started_before_window,
        "ongoing": outage.ongoing,
    }


def build_grid_payload(
    grid: Series,
    *,
    window: Window,
    tz: tzinfo,
    source: str,
    low_pct: float,
    soc: Series | None = None,
    load: Series | None = None,
    counted_from: datetime | None = None,
) -> dict[str, Any]:
    """Outages, their distribution over the day and the period, and the KPIs.

    Every share here divides by measured seconds — the time the sensor had a
    state — and never by the window. Dividing by the window would let a
    sensor that was unavailable for half the period report half the outages
    it had.
    """
    intervals = to_intervals(grid)
    measured = sum(item.seconds for item in intervals)
    off = sum(item.seconds for item in intervals if item.value < _PRESENT)
    min_seconds = OUTAGE_MIN_SECONDS if source == SOURCE_SENSOR else INFERRED_MIN_SECONDS
    outages = outage_episodes(
        intervals, window=window, min_seconds=min_seconds, bridge_seconds=OUTAGE_BRIDGE_SECONDS
    )
    longest = max(outages, key=lambda item: item.seconds, default=None)

    return {
        "source": source,
        "counted_from": counted_from.isoformat() if counted_from else None,
        "coverage": coverage(grid),
        "measured_seconds": measured,
        "low_pct": low_pct,
        "has_soc": soc is not None,
        "has_load": load is not None,
        "kpi": {
            "count": len(outages),
            "off_seconds": off,
            "off_share": (off / measured) if measured > 0 else None,
            "longest_seconds": longest.seconds if longest else None,
            "longest_start": longest.start.isoformat() if longest else None,
            "mean_seconds": (
                sum(item.seconds for item in outages) / len(outages) if outages else None
            ),
            # Only from a real sensor: a flicker cannot be inferred from flows.
            "brief_interruptions": (
                brief_interruptions(
                    intervals, min_seconds=min_seconds, bridge_seconds=OUTAGE_BRIDGE_SECONDS
                )
                if source == SOURCE_SENSOR
                else None
            ),
        },
        "hours": _by_hour(intervals, tz),
        "days": _by_day(intervals, outages, tz),
        "episodes": [_describe(outage) for outage in outages],
    }
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_grid.py -v`
Expected: PASS.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/analytics/grid.py tests/test_grid.py
git commit -m "feat: grid outage episodes, the figures and the two distributions"
```

---

### Task 4: The battery through each outage, and autonomy

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/grid.py`
- Test: `tests/test_grid.py`

**Interfaces:**
- Consumes: `restrict(series, start)` from `analytics/battery.py`; `time_weighted_mean` from `resample.py`.
- Produces: `AUTONOMY_MIN_HOURS = 1.0`; each episode gains `soc_start`, `soc_end`, `soc_min`, `below_low` when `soc` is given and `load_mean_w` when `load` is given; the payload gains `"autonomy"`: `{rate_pct_per_hour, evidence_hours, hours_from_full, hours_from_now, soc_now, load_mean_w, reason}` with `reason` one of `None`, `"no_soc"`, `"no_outages"`, `"too_little_evidence"`, `"no_net_discharge"`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_grid.py`:

```python
def soc_series(*points: tuple[float, float | None], end: float = 240.0) -> Series:
    return Series.of(BASE, at(end), [Sample(at(m), v) for m, v in points])


def test_each_outage_carries_the_charge_in_force_at_its_start_and_end_and_its_minimum():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 90.0), (30, 80.0), (100, 40.0), (150, 15.0), (170, 25.0), (200, 60.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_start"] == 80.0, "the sample before the outage is the value in force"
    assert episode["soc_end"] == 25.0
    assert episode["soc_min"] == 15.0
    assert episode["below_low"] is True


def test_a_minimum_before_the_outage_does_not_count():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0))
    soc = soc_series((0, 10.0), (30, 80.0), (90, 70.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_min"] == 70.0
    assert episode["below_low"] is False


def test_no_charge_data_inside_an_outage_is_a_dash():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0))
    soc = soc_series((0, None), (150, 50.0))
    episode = build(grid, soc=soc)["episodes"][0]
    assert episode["soc_start"] is None
    assert episode["soc_end"] is None
    assert episode["soc_min"] is None
    assert episode["below_low"] is None


def test_the_columns_are_absent_when_the_sensors_are():
    episode = build(grid_series((0, 1.0), (60, 0.0), (120, 1.0)))["episodes"][0]
    assert "soc_start" not in episode
    assert "load_mean_w" not in episode
    payload = build(grid_series((0, 1.0)))
    assert payload["has_soc"] is False and payload["has_load"] is False


def test_the_mean_load_during_an_outage_is_time_weighted():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0))
    load = soc_series((0, 100.0), (90, 1000.0))
    episode = build(grid, load=load)["episodes"][0]
    assert episode["load_mean_w"] == 550.0


def test_autonomy_reads_the_discharge_rate_off_the_outages():
    # Two outages, an hour each; 20 points lost in the first, 10 in the second.
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (150, 0.0), (210, 1.0))
    soc = soc_series((0, 100.0), (60, 100.0), (120, 80.0), (150, 80.0), (210, 70.0), (230, 65.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] is None
    assert autonomy["rate_pct_per_hour"] == 15.0
    assert autonomy["evidence_hours"] == 2.0
    # From full to the 20% mark at 15 points an hour.
    assert autonomy["hours_from_full"] == 80.0 / 15.0
    # From where it is now: the last known charge, 65%.
    assert autonomy["soc_now"] == 65.0
    assert autonomy["hours_from_now"] == 45.0 / 15.0


def test_autonomy_is_withheld_without_a_charge_sensor():
    assert build(grid_series((0, 1.0), (60, 0.0), (120, 1.0)))["autonomy"]["reason"] == "no_soc"


def test_autonomy_is_withheld_without_outages():
    autonomy = build(grid_series((0, 1.0)), soc=soc_series((0, 50.0)))["autonomy"]
    assert autonomy["reason"] == "no_outages"
    assert autonomy["hours_from_full"] is None


def test_autonomy_needs_an_hour_of_evidence():
    grid = grid_series((0, 1.0), (60, 0.0), (90, 1.0))
    soc = soc_series((0, 100.0), (90, 80.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] == "too_little_evidence"
    assert autonomy["evidence_hours"] == 0.5


def test_autonomy_is_withheld_when_the_sun_covered_the_outages():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 50.0), (180, 70.0))
    assert build(grid, soc=soc)["autonomy"]["reason"] == "no_net_discharge"


def test_hours_from_now_is_absent_below_the_low_mark():
    grid = grid_series((0, 1.0), (60, 0.0), (180, 1.0))
    soc = soc_series((0, 60.0), (180, 15.0))
    autonomy = build(grid, soc=soc)["autonomy"]
    assert autonomy["reason"] is None
    assert autonomy["hours_from_now"] is None


def test_autonomy_reports_the_mean_load_during_the_outages():
    grid = grid_series((0, 1.0), (60, 0.0), (120, 1.0), (150, 0.0), (180, 1.0))
    soc = soc_series((0, 100.0), (180, 70.0))
    load = soc_series((0, 1000.0), (150, 400.0))
    autonomy = build(grid, soc=soc, load=load)["autonomy"]
    # 60 minutes at 1000 W, 30 at 400 W.
    assert autonomy["load_mean_w"] == 800.0
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_grid.py -v`
Expected: the new tests FAIL with `KeyError: 'soc_start'` and `KeyError: 'autonomy'`.

- [ ] **Step 3: Add the battery columns and the autonomy block**

In `grid.py`, add to the imports:

```python
from .battery import restrict
from .resample import Sample, time_weighted_mean
```

(merge `Sample` and `time_weighted_mean` into the existing `resample` import line), and add the constant after `INFERRED_MIN_SECONDS`:

```python
# Below this much outage the discharge rate is one afternoon's weather.
AUTONOMY_MIN_HOURS = 1.0

SECONDS_PER_HOUR = 3600.0
```

Add these functions before `build_grid_payload`:

```python
def _between(series: Series, start: datetime, end: datetime) -> Series:
    """The part of a series inside [start, end), keeping the value in force at start."""
    clipped = restrict(series, start)
    return Series(
        clipped.start,
        min(clipped.end, end),
        tuple(sample for sample in clipped.samples if sample.ts < end),
    )


def _in_force(series: Series, moment: datetime) -> float | None:
    """The value holding at a moment: the last sample at or before it.

    A state persists until the next one replaces it, so the reading written
    at the very instant the grid returned is the charge the outage ended on.
    A gap there — the last sample being unavailable — is None, not the value
    before the gap.
    """
    latest: Sample | None = None
    for sample in series.samples:
        if sample.ts > moment:
            break
        latest = sample
    return latest.value if latest else None


def _battery_columns(
    outage: Outage, soc: Series | None, load: Series | None, low_pct: float
) -> dict[str, Any]:
    """What the battery did through one outage, from raw states.

    The values at the start and the end are whatever was in force at those
    moments, which is what the recorder means by a state; nothing is
    interpolated across an outage. The minimum is real: this works from raw states, so a fall to 8%
    for twenty minutes is an 8%, not the 34% an hourly mean would make of it.
    """
    columns: dict[str, Any] = {}
    if soc is not None:
        part = to_intervals(_between(soc, outage.start, outage.end))
        lowest = min((item.value for item in part), default=None)
        columns |= {
            "soc_start": _in_force(soc, outage.start),
            "soc_end": _in_force(soc, outage.end),
            "soc_min": lowest,
            "below_low": None if lowest is None else lowest < low_pct,
        }
    if load is not None:
        part = to_intervals(_between(load, outage.start, outage.end))
        columns["load_mean_w"] = time_weighted_mean(part)
    return columns


def _last_known(series: Series | None) -> float | None:
    if series is None:
        return None
    intervals = to_intervals(series)
    return intervals[-1].value if intervals else None


def _autonomy(
    episodes: Sequence[dict[str, Any]], soc: Series | None, low_pct: float
) -> dict[str, Any]:
    """How long the battery would last, at the rate seen during this period's outages.

    Read off the battery itself rather than multiplied out of a nameplate
    capacity: the state of charge lost per hour of outage. Withheld, with the
    reason, when there is nothing to read it from — and when the outages were
    covered by the sun and the charge did not fall, because there is no
    discharge rate in that and inventing one would be worse than saying so.
    """
    evidence = [
        (item["soc_start"] - item["soc_end"], item["seconds"])
        for item in episodes
        if item.get("soc_start") is not None and item.get("soc_end") is not None
    ]
    hours = sum(seconds for _, seconds in evidence) / SECONDS_PER_HOUR
    drop = sum(points for points, _ in evidence)
    loads = [(item["load_mean_w"], item["seconds"]) for item in episodes if item.get("load_mean_w") is not None]
    load_seconds = sum(seconds for _, seconds in loads)
    result: dict[str, Any] = {
        "rate_pct_per_hour": None,
        "evidence_hours": hours,
        "hours_from_full": None,
        "hours_from_now": None,
        "soc_now": _last_known(soc),
        "load_mean_w": (
            sum(watts * seconds for watts, seconds in loads) / load_seconds if load_seconds else None
        ),
        "reason": None,
    }
    if soc is None:
        return result | {"reason": "no_soc"}
    if not episodes:
        return result | {"reason": "no_outages"}
    if hours < AUTONOMY_MIN_HOURS:
        return result | {"reason": "too_little_evidence"}
    if drop <= 0:
        return result | {"reason": "no_net_discharge"}

    rate = drop / hours
    soc_now = result["soc_now"]
    return result | {
        "rate_pct_per_hour": rate,
        "hours_from_full": (100.0 - low_pct) / rate,
        "hours_from_now": (
            (soc_now - low_pct) / rate if soc_now is not None and soc_now > low_pct else None
        ),
    }
```

In `build_grid_payload`, replace the `"episodes"` line and add `"autonomy"`:

```python
    episodes = [_describe(outage) | _battery_columns(outage, soc, load, low_pct) for outage in outages]
    ...
        "episodes": episodes,
        "autonomy": _autonomy(episodes, soc, low_pct),
```

(Compute `episodes` before the return, after `outages`.)

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_grid.py tests/test_battery.py -v`
Expected: PASS.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/analytics/grid.py tests/test_grid.py
git commit -m "feat: the battery through each outage, and autonomy read off its discharge rate"
```

---

### Task 5: Inferring outages from power flows

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/grid.py`
- Test: `tests/test_grid.py`

**Interfaces:**
- Consumes: `align(series_list)` and `AlignedInterval` from `resample.py`.
- Produces: `sum_series(parts: Sequence[Series]) -> Series`; `infer_grid_series(grid_power: Series, battery_power: Series, *, zero_w: float, idle_w: float) -> Series` — a binary series, one while the grid is exchanging power or the battery is not discharging, zero while both conditions for an outage hold, a gap wherever either input has one.

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_grid.py` (add `SOURCE_INFERRED`, `infer_grid_series`, `sum_series` to the `grid` import):

```python
def test_inferred_outage_needs_zero_grid_and_a_discharging_battery():
    grid_power = soc_series((0, 500.0), (60, 0.0), (120, 3.0), (180, 400.0))
    battery = soc_series((0, 200.0), (60, -800.0), (120, -10.0), (150, -800.0))
    inferred = infer_grid_series(grid_power, battery, zero_w=10.0, idle_w=50.0)
    values = [(int((i.start - BASE).total_seconds() / 60), i.value) for i in to_intervals(inferred)]
    # 60-120: grid at zero, battery discharging -> off.
    # 120-150: grid at zero, battery resting -> not an outage.
    # 150-180: grid near zero, battery discharging -> off.
    assert values == [(0, 1.0), (60, 0.0), (120, 1.0), (150, 0.0), (180, 1.0)]


def test_a_gap_in_either_input_is_a_gap_in_the_inference():
    grid_power = soc_series((0, 0.0), (60, None), (120, 0.0))
    battery = soc_series((0, -800.0))
    inferred = infer_grid_series(grid_power, battery, zero_w=10.0, idle_w=50.0)
    starts = [int((i.start - BASE).total_seconds() / 60) for i in to_intervals(inferred)]
    assert starts == [0, 120]


def test_phases_are_summed_before_the_inference():
    parts = [soc_series((0, 5.0), (60, 200.0)), soc_series((0, 3.0)), soc_series((0, -6.0))]
    total = sum_series(parts)
    assert [i.value for i in to_intervals(total)] == [2.0, 197.0]


def test_inferred_mode_uses_the_longer_floor_and_reports_no_flickers():
    grid = grid_series((0, 1.0), (60, 0.0), (63, 1.0), (100, 0.0), (110, 1.0))
    payload = build(grid, source=SOURCE_INFERRED)
    assert payload["source"] == "inferred"
    assert payload["kpi"]["count"] == 1, "three minutes is under the inferred floor"
    assert payload["kpi"]["brief_interruptions"] is None
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_grid.py -v`
Expected: FAIL with `ImportError: cannot import name 'infer_grid_series'`.

- [ ] **Step 3: Write the inference**

Add `Sample` and `align` to the `resample` import in `grid.py`, then add before `build_grid_payload`:

```python
def _aligned_to_series(
    aligned: Sequence[AlignedInterval], start: datetime, end: datetime, value_of
) -> Series:
    """Turn aligned intervals back into a series, with a gap wherever they break."""
    samples: list[Sample] = []
    previous_end: datetime | None = None
    for item in aligned:
        if previous_end is not None and item.start > previous_end:
            samples.append(Sample(previous_end, None))
        samples.append(Sample(item.start, value_of(item.values)))
        previous_end = item.end
    if previous_end is not None and previous_end < end:
        samples.append(Sample(previous_end, None))
    return Series.of(start, end, samples)


def sum_series(parts: Sequence[Series]) -> Series:
    """Per-phase readings added on a common timeline.

    No preset produces a grid-power total, only phases; this is where the
    "total wins" rule has nothing to apply to and the sum has to stand in.
    A gap in any phase is a gap in the sum, as it is everywhere else here.
    """
    if not parts:
        raise ValueError("nothing to sum")
    return _aligned_to_series(align(list(parts)), parts[0].start, parts[0].end, sum)


def infer_grid_series(
    grid_power: Series, battery_power: Series, *, zero_w: float, idle_w: float
) -> Series:
    """Guess at grid presence from what the flows look like.

    Off-grid when nothing crosses the grid connection while the battery is
    discharging. This is the weakest thing on the page and the tab says so:
    a night the battery carries the house with nothing crossing the grid
    connection looks exactly like an outage, and a daytime outage the sun
    covers is not seen at all. It exists for an installation that has no
    presence sensor to map, and the banner asks for one.

    battery_power arrives with the configured sign applied, so discharging
    is negative here whatever the vendor's convention.
    """

    def presence(values: tuple[float, ...]) -> float:
        grid, battery = values
        return 0.0 if abs(grid) <= zero_w and battery < -idle_w else 1.0

    return _aligned_to_series(
        align([grid_power, battery_power]), grid_power.start, grid_power.end, presence
    )
```

Add `AlignedInterval` to the `resample` import as well.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_grid.py -v`
Expected: PASS.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/analytics/grid.py tests/test_grid.py
git commit -m "feat: infer outages from power flows when there is no sensor to read"
```

---

### Task 6: Reading the sensors, and the WebSocket command

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/grid.py`
- Modify: `custom_components/inverter_analytics/websocket_api.py`
- Test: `tests/test_websocket_api.py`

**Interfaces:**
- Consumes: `countable_window`, `async_binary_series`, `async_series_many`, `describe_series`, `SeriesResult`, `Precision` from `source.py`; `DEFAULT_BATTERY_LOW_PCT`, `DEFAULT_BATTERY_IDLE_W`, `DEFAULT_GRID_ZERO_W` from `const.py`.
- Produces: `async_grid_analytics(hass, config, window) -> dict`; the command `inverter_analytics/grid` registered as `ws_grid`, cache kind `"grid"`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_websocket_api.py`:

```python
async def test_grid_command_counts_outages_from_the_presence_sensor(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye 8kW",
        data={
            "entities": {
                "load_power": ["sensor.load_power"],
                "grid_connected": ["binary_sensor.grid"],
            },
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    hass.states.async_set("binary_sensor.grid", "on")
    await async_wait_recording_done(hass)

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/grid",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(hours=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"]
    result = response["result"]
    assert result["source"] == "sensor"
    assert result["precision"] == "raw"
    assert result["kpi"]["count"] == 0
    assert result["measured_seconds"] > 0
    assert result["has_load"] is True and result["has_soc"] is False
    assert "binary_sensor.grid" == result["series"]["grid_connected"]["entity_id"]


async def test_grid_command_says_what_to_map_when_nothing_is(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant, hass_ws_client
) -> None:
    entry = _entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    end = dt_util.utcnow()
    await client.send_json_auto_id(
        {
            "type": "inverter_analytics/grid",
            "entry_id": entry.entry_id,
            "start": (end - timedelta(days=1)).isoformat(),
            "end": end.isoformat(),
        }
    )
    response = await client.receive_json()

    assert response["success"] is False
    assert response["error"]["code"] == "invalid_config"
    assert "grid_connected" in response["error"]["message"]
```

In `test_the_commands_are_registered_once_for_the_whole_instance`, add `"ws_grid"` to the expected list after `"ws_balance"`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_websocket_api.py -v`
Expected: the two new tests FAIL with an `unknown_command` error; the registration test FAILS on the missing `ws_grid`.

- [ ] **Step 3: Write the reader and the command**

Append to `grid.py` (add `HomeAssistant`, `dt_util`, `EntryConfig`, the three defaults, and the `source` names to the imports):

```python
async def async_grid_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the sensors and compute the outage analytics.

    Raw states only, whichever mode: a binary sensor has no statistics, and
    an hourly mean of grid power cannot say when inside the hour it was zero.
    """
    countable = countable_window(hass, window)
    presence_id = config.entity_id("grid_connected")
    battery_id = config.entity_id("battery_power")
    grid_id = config.entity_id("grid_power")
    phase_ids = config.entity_ids("grid_power_phase")

    if presence_id:
        source = SOURCE_SENSOR
    elif battery_id and (grid_id or phase_ids):
        source = SOURCE_INFERRED
    else:
        raise ValueError(
            "grid_connected is not configured, and outages cannot be inferred "
            "without grid power and battery power"
        )

    soc_id = config.entity_id("battery_soc")
    load_id = config.entity_id("load_power")
    numeric = [entity_id for entity_id in (soc_id, load_id) if entity_id]
    signs: dict[str, float] = {}
    if source == SOURCE_INFERRED:
        flow_ids = [grid_id] if grid_id else list(phase_ids)
        numeric += [battery_id, *flow_ids]
        signs[battery_id] = config.sign("battery_power")
        signs |= {
            entity_id: config.sign("grid_power" if grid_id else "grid_power_phase")
            for entity_id in flow_ids
        }

    results = await async_series_many(hass, numeric, countable.window, signs) if numeric else {}

    if source == SOURCE_SENSOR:
        grid = await async_binary_series(hass, presence_id, countable.window)
        series_block = {"grid_connected": describe_series(presence_id, SeriesResult(grid, Precision.RAW, None))}
    else:
        flows = [results[entity_id].series for entity_id in flow_ids]
        grid = infer_grid_series(
            flows[0] if grid_id else sum_series(flows),
            results[battery_id].series,
            zero_w=config.number("grid_zero_w") or DEFAULT_GRID_ZERO_W,
            idle_w=config.number("battery_idle_w") or DEFAULT_BATTERY_IDLE_W,
        )
        series_block = {
            "battery_power": describe_series(battery_id, results[battery_id]),
            **{f"grid_{index + 1}": describe_series(eid, results[eid]) for index, eid in enumerate(flow_ids)},
        }

    zone = dt_util.get_time_zone(hass.config.time_zone) or dt_util.UTC
    payload = build_grid_payload(
        grid,
        window=countable.window,
        tz=zone,
        source=source,
        low_pct=config.number("battery_low_pct") or DEFAULT_BATTERY_LOW_PCT,
        soc=results[soc_id].series if soc_id else None,
        load=results[load_id].series if load_id else None,
        counted_from=countable.counted_from,
    )
    if soc_id:
        series_block["battery_soc"] = describe_series(soc_id, results[soc_id])
    if load_id:
        series_block["load_total"] = describe_series(load_id, results[load_id])
    payload["series"] = series_block
    payload["precision"] = Precision.RAW.value
    payload["boundary"] = None
    payload["timezone"] = str(zone)
    return payload
```

In `websocket_api.py`, import `async_grid_analytics` from `.analytics.grid`, register it in `async_register` after `ws_balance`, and add:

```python
@websocket_api.websocket_command(
    {vol.Required("type"): "inverter_analytics/grid", **_WINDOW_SCHEMA}
)
@websocket_api.async_response
async def ws_grid(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return the grid outage analytics for a window."""
    await _async_windowed_response(hass, connection, msg, "grid", async_grid_analytics)
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_websocket_api.py tests/test_grid.py -v`
Expected: PASS.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/analytics/grid.py custom_components/inverter_analytics/websocket_api.py tests/test_websocket_api.py
git commit -m "feat: the grid WebSocket command, reading whichever source the entry has"
```

---

### Task 7: Finding the presence sensor

**Files:**
- Modify: `custom_components/inverter_analytics/presets.py`
- Modify: `custom_components/inverter_analytics/detect.py` (`collect_sensors`, `cluster_sensors`, `classify`)
- Modify: `custom_components/inverter_analytics/config_flow.py` (`async_step_user`, `async_step_reconfigure`, `_ambiguity_selector`)
- Modify: `custom_components/inverter_analytics/issues.py:61-63`
- Modify: `custom_components/inverter_analytics/repairs.py:49-50`
- Modify: `custom_components/inverter_analytics/translations/en.json` (`confirm` and `reconfigure_detected` steps)
- Test: `tests/test_detect_classify.py`, `tests/test_detect_clusters.py`, `tests/test_issues.py`, `tests/test_translations.py`

**Interfaces:**
- Produces: `presets.GRID_PRESENCE_PATTERN`; `detect.GRID_CHOICE = "grid_choice"`; `grid_candidates(sensors: Sequence[SensorInfo]) -> tuple[str, ...]`; `classify(cluster, shared: Sequence[str] = ())`.

- [ ] **Step 1: Write the failing tests**

In `tests/test_detect_classify.py`, add `GRID_CHOICE` and `grid_candidates` to the `detect` import, then append:

```python
def binary(entity_id: str, device_class: str | None = None) -> SensorInfo:
    return SensorInfo(
        entity_id=entity_id, device_class=device_class, unit=None, state_class=None, device_id=None
    )


def test_grid_candidates_are_binary_sensors_whose_name_says_so():
    sensors = [
        *SOLARMAN_SENSORS,
        binary("binary_sensor.grid_connected"),
        binary("binary_sensor.deye_on_grid"),
        binary("binary_sensor.front_door"),
        binary("binary_sensor.grid_alarm"),
    ]
    assert grid_candidates(sensors) == (
        "binary_sensor.deye_on_grid",
        "binary_sensor.grid_connected",
    )


def test_a_lone_grid_presence_sensor_is_offered_to_the_cluster():
    detection = classify(_solarman(), shared=("binary_sensor.grid_connected",))
    assert detection.mapping["grid_connected"] == ("binary_sensor.grid_connected",)


def test_two_grid_presence_sensors_become_a_question():
    detection = classify(
        _solarman(), shared=("binary_sensor.grid_connected", "binary_sensor.on_grid")
    )
    assert "grid_connected" not in detection.mapping
    question = next(a for a in detection.ambiguities if a.role == "grid_connected")
    assert question.key == GRID_CHOICE
    assert question.options == {
        "binary_sensor.grid_connected": ("binary_sensor.grid_connected",),
        "binary_sensor.on_grid": ("binary_sensor.on_grid",),
    }


def test_no_candidate_leaves_the_role_empty_and_asks_nothing():
    detection = classify(_solarman())
    assert "grid_connected" not in detection.mapping
    assert all(a.role != "grid_connected" for a in detection.ambiguities)
```

In `tests/test_detect_clusters.py`, append:

```python
def test_a_binary_sensor_never_joins_a_cluster_even_with_a_power_class():
    """binary_sensor has a device class called power too — "power detected"."""
    binary = SensorInfo(
        entity_id="binary_sensor.solarman_grid_connected",
        device_class="power",
        unit=None,
        state_class=None,
        device_id=None,
    )
    clusters = {c.key: c for c in cluster_sensors([*SOLARMAN_SENSORS, binary])}
    assert all(
        s.entity_id != binary.entity_id for s in clusters["solarman"].sensors
    )
```

In `tests/test_issues.py`, append:

```python
async def test_a_presence_sensor_nobody_mapped_is_offered_for_the_grid_tab(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    _register_solarman(hass)
    hass.states.async_set("binary_sensor.grid_connected", "on")
    entry = _entry({"load_power": [LOAD], **{role: [eid] for eid, role in COUNTERS.items()}})
    await _setup(hass, entry)

    issue = _issue(hass, UNMAPPED_SENSORS, entry)
    assert issue is not None
    assert issue.translation_placeholders["count"] == "1"
    assert issue.translation_placeholders["features"] == "Grid outages"
```

In `tests/test_translations.py`, import `GRID_CHOICE` beside `CT_CHOICE`, extend `test_the_confirm_step_covers_its_extra_field` and `test_the_detected_reconfigure_step_covers_the_same_extra_field` to assert `GRID_CHOICE in step["data"]`, and change the allowed set in `test_no_step_labels_a_field_it_does_not_render` to `_schema_keys(**shape) | {CT_CHOICE, GRID_CHOICE}`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_detect_classify.py tests/test_detect_clusters.py tests/test_issues.py tests/test_translations.py -v`
Expected: FAIL with `ImportError: cannot import name 'GRID_CHOICE'` and, for the clusters test, the binary sensor found inside the cluster.

- [ ] **Step 3: Teach detection about the binary domain**

In `presets.py`, after `CT_CHOICES`:

```python
# A grid-presence sensor describes the site, not the inverter: it is usually a
# template the user wrote, and shares neither the inverter's device nor its
# name. Matched by name alone, over the binary_sensor domain only.
GRID_PRESENCE_PATTERN: Final = (
    r"^(?:.*_)?(?:on_grid|grid_(?:connected|status|online|present|available))$"
)
```

In `detect.py`:

```python
# The form field the grid-presence question is asked through.
GRID_CHOICE = "grid_choice"

_BINARY_DOMAIN = "binary_sensor."
```

In `cluster_sensors`, change the skip to keep binary sensors out whatever their class:

```python
    for sensor in sensors:
        # binary_sensor has a device class called power too — "power
        # detected" — and it must not be swept in beside a power reading.
        if sensor.entity_id.startswith(_BINARY_DOMAIN):
            continue
        if sensor.device_class not in _RELEVANT_DEVICE_CLASSES:
            continue
```

In `collect_sensors`, read both domains: `for state in hass.states.async_all(("sensor", "binary_sensor")):`.

Add after `cluster_sensors`:

```python
def grid_candidates(sensors: Sequence[SensorInfo]) -> tuple[str, ...]:
    """Binary sensors that look like they report whether the grid is present.

    Offered to every cluster rather than clustered: grid presence is a
    property of the site, and one sensor answers it for every inverter on it.
    """
    return tuple(
        sorted(
            sensor.entity_id
            for sensor in sensors
            if sensor.entity_id.startswith(_BINARY_DOMAIN)
            and re.match(presets.GRID_PRESENCE_PATTERN, _object_id(sensor.entity_id))
        )
    )
```

Change `classify`'s signature to `def classify(cluster: Cluster, shared: Sequence[str] = ()) -> Detection:` and, after the CT block and before `return Detection(...)`:

```python
    # Exactly one candidate needs no question. Several do: which of two
    # sensors describes the grid is not something a name can settle.
    if "grid_connected" not in mapping:
        if len(shared) == 1:
            mapping["grid_connected"] = (shared[0],)
        elif len(shared) > 1:
            ambiguities.append(
                Ambiguity(
                    key=GRID_CHOICE,
                    role="grid_connected",
                    question="Which sensor says the grid is present?",
                    options={entity_id: (entity_id,) for entity_id in shared},
                )
            )
```

Every call site now passes the candidates. In `config_flow.py`:

```python
    async def async_step_user(self, user_input=None):
        sensors = collect_sensors(self.hass)
        clusters = cluster_sensors(sensors)
        ...
            self._detection = classify(cluster, grid_candidates(sensors))
```

```python
    async def async_step_reconfigure(self, user_input=None):
        ...
        sensors = collect_sensors(self.hass)
        cluster = matching_cluster(cluster_sensors(sensors), config)
        self._detection = (
            classify(cluster, grid_candidates(sensors)) if cluster is not None else None
        )
```

In `issues.py` `_check_unmapped_sensors` and in `repairs.py` `async_step_confirm`, the same shape:

```python
    sensors = collect_sensors(hass)          # self.hass in repairs.py
    cluster = matching_cluster(cluster_sensors(sensors), config)
    ...
    filled = wanted_fill(config, fill(classify(cluster, grid_candidates(sensors)), config))
```

Add `grid_candidates` to each module's `detect` import.

In `_ambiguity_selector`, drop the count where it says nothing:

```python
def _option_label(key: str, entities: tuple[str, ...]) -> str:
    label = CT_CHOICES.get(key, key)
    # The count tells the clamp sets apart — two phases against three. Every
    # grid-presence option is one sensor, and "(1 sensors)" is noise.
    return f"{label} ({len(entities)} sensors)" if len(entities) > 1 else label
```

and use `label=_option_label(key, entities)` in the selector.

In `translations/en.json`, add to both `confirm` and `reconfigure_detected`:

`data`: `"grid_choice": "Grid presence"`

`data_description`: `"grid_choice": "More than one binary sensor in this installation looks like it reports whether the grid is present. Pick the one that does; it feeds the Grid tab."`

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_detect_classify.py tests/test_detect_clusters.py tests/test_issues.py tests/test_translations.py tests/test_config_flow.py -v`
Expected: PASS.

- [ ] **Step 5: Lint and commit**

```bash
ruff check . && ruff format --check .
git add custom_components/inverter_analytics/presets.py custom_components/inverter_analytics/detect.py custom_components/inverter_analytics/config_flow.py custom_components/inverter_analytics/issues.py custom_components/inverter_analytics/repairs.py custom_components/inverter_analytics/translations/en.json tests/test_detect_classify.py tests/test_detect_clusters.py tests/test_issues.py tests/test_translations.py
git commit -m "feat: find the grid-presence sensor, and ask when there are two"
```

---

### Task 8: Types, the API call and the two charts

**Files:**
- Modify: `frontend/src/types.ts`, `frontend/src/api.ts`, `frontend/src/charts/options.ts`
- Test: `frontend/src/charts/options.test.ts`

**Interfaces:**
- Produces: `GridPayload`, `OutageEpisode`, `GridHour`, `GridDay`, `Autonomy` in `types.ts`; `fetchGrid(hass, entryId, start, end): Promise<GridPayload>`; `outageDaysOption(days: GridDay[])` and `outageHoursOption(hours: GridHour[])`.

- [ ] **Step 1: Write the failing tests**

Append to `options.test.ts` (add `outageDaysOption`, `outageHoursOption` to the import, `GridDay`, `GridHour` to the types import):

```ts
describe("outage charts", () => {
  const days: GridDay[] = [
    { day: "2026-01-01", off_seconds: 7200, measured_seconds: 86400, count: 2 },
    { day: "2026-01-02", off_seconds: 0, measured_seconds: 86400, count: 0 },
  ];
  const hours: GridHour[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    off_seconds: hour === 20 ? 1800 : 0,
    measured_seconds: hour === 5 ? 0 : 3600,
  }));

  it("draws hours without grid per day, in the overload colour", () => {
    const option = outageDaysOption(days);
    const series = option.series as { data: unknown[]; itemStyle: { color: string } }[];
    expect(series[0].data).toEqual([2, 0]);
    expect(series[0].itemStyle.color).toBe(SERIES.overload);
    expect((option.xAxis as { data: string[] }).data).toEqual(["01-01", "01-02"]);
  });

  it("draws the share of measured time per hour, with an unmeasured hour left empty", () => {
    const option = outageHoursOption(hours);
    const data = (option.series as { data: (number | null)[] }[])[0].data;
    expect(data[20]).toBe(50);
    expect(data[5]).toBeNull();
    expect(data[0]).toBe(0);
  });

  it("uses only keys the registered components can render", () => {
    for (const option of [outageDaysOption(days), outageHoursOption(hours)]) {
      for (const key of Object.keys(option)) {
        expect(SUPPORTED_OPTION_KEYS.has(key), key).toBe(true);
      }
    }
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd frontend && npm run test`
Expected: FAIL — `outageDaysOption is not a function` (and typecheck errors on the missing types).

- [ ] **Step 3: Add the types, the call and the builders**

In `types.ts`, after `BalancePayload`:

```ts
export type OutageSource = "sensor" | "inferred";

export interface OutageEpisode {
  start: string;
  end: string;
  seconds: number;
  /** Data gaps inside the outage that were assumed to be part of it. */
  bridged_seconds: number;
  started_before_window: boolean;
  ongoing: boolean;
  /** Present only when a state-of-charge sensor is mapped. */
  soc_start?: number | null;
  soc_end?: number | null;
  soc_min?: number | null;
  below_low?: boolean | null;
  /** Present only when a load sensor is mapped. */
  load_mean_w?: number | null;
}

export interface GridHour {
  hour: number;
  off_seconds: number;
  measured_seconds: number;
}

export interface GridDay {
  day: string;
  off_seconds: number;
  measured_seconds: number;
  count: number;
}

export type AutonomyReason = "no_soc" | "no_outages" | "too_little_evidence" | "no_net_discharge";

export interface Autonomy {
  rate_pct_per_hour: number | null;
  evidence_hours: number;
  hours_from_full: number | null;
  hours_from_now: number | null;
  soc_now: number | null;
  load_mean_w: number | null;
  reason: AutonomyReason | null;
}

export interface GridKpi {
  count: number;
  off_seconds: number;
  off_share: number | null;
  longest_seconds: number | null;
  longest_start: string | null;
  mean_seconds: number | null;
  /** Null in inferred mode, where a flicker cannot be seen. */
  brief_interruptions: number | null;
}

export interface GridPayload {
  source: OutageSource;
  /** Where counting begins when the window reaches past the recorder's retention. */
  counted_from: string | null;
  coverage: number;
  measured_seconds: number;
  low_pct: number;
  has_soc: boolean;
  has_load: boolean;
  kpi: GridKpi;
  hours: GridHour[];
  days: GridDay[];
  episodes: OutageEpisode[];
  autonomy: Autonomy;
  series: Record<string, SeriesInfo>;
  precision: Precision;
  boundary: string | null;
  timezone: string;
  window: { start: string; end: string };
  clamped: boolean;
}
```

In `api.ts`, add `GridPayload` to the import and:

```ts
export function fetchGrid(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<GridPayload> {
  return hass.connection.sendMessagePromise<GridPayload>({
    type: "inverter_analytics/grid",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}
```

In `options.ts`, add `GridDay`, `GridHour` to the types import and append:

```ts
export function outageDaysOption(days: GridDay[]): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    xAxis: { ...axis, type: "category", data: days.map((day) => day.day.slice(5)) },
    yAxis: { ...axis, type: "value", name: "hours" },
    series: [
      {
        type: "bar",
        // Days the sensor had no data for are not in the list at all, so
        // every bar here stands on measured time.
        data: days.map((day) => round(day.off_seconds / 3600, 2)),
        itemStyle: { color: SERIES.overload },
      },
    ],
  };
}

export function outageHoursOption(hours: GridHour[]): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    xAxis: { ...axis, type: "category", data: hours.map((item) => `${item.hour}`) },
    yAxis: { ...axis, type: "value", name: "% of measured time", min: 0, max: 100 },
    series: [
      {
        type: "bar",
        // A share rather than raw hours: under uneven coverage raw hours
        // compare an hour the recorder saw ten times with one it saw twice.
        // An hour with no measured time stays a hole, not a zero.
        data: hours.map((item) =>
          item.measured_seconds > 0
            ? round((item.off_seconds / item.measured_seconds) * 100, 2)
            : null,
        ),
        itemStyle: { color: SERIES.overload },
      },
    ],
  };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `cd frontend && npm run typecheck && npm run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/types.ts frontend/src/api.ts frontend/src/charts/options.ts frontend/src/charts/options.test.ts
git commit -m "feat: the grid payload types, its API call and its two charts"
```

---

### Task 9: The Grid tab

**Files:**
- Create: `frontend/src/tabs/grid-tab.ts`
- Modify: `frontend/src/panel.ts` (the `TABS` list, the imports, `renderTab`)
- Modify: `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` (built)

**Interfaces:**
- Consumes: `fetchGrid`, `outageDaysOption`, `outageHoursOption`, `formatDuration`, `formatPercent`, `formatPower`, `coverageWarning`, `precisionLabel`, `describeError`, `resolveRange`, `sectionStyles`.
- Produces: the element `ia-grid-tab` with `.hass`, `.entryId`, `.range`.

- [ ] **Step 1: Write the tab**

Create `frontend/src/tabs/grid-tab.ts`:

```ts
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchGrid } from "../api";
import { outageDaysOption, outageHoursOption } from "../charts/options";
import "../charts/echart";
import {
  coverageWarning,
  describeError,
  formatDuration,
  formatPercent,
  formatPower,
  precisionLabel,
} from "../format";
import { resolveRange, type RangeKey } from "../range";
import { sectionStyles } from "../sections/shared-styles";
import type { Autonomy, GridPayload, HomeAssistant, OutageEpisode } from "../types";

const DASH = "—";

function formatHours(hours: number | null): string {
  if (hours === null) return DASH;
  return formatDuration(hours * 3600);
}

@customElement("ia-grid-tab")
export class IaGridTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: GridPayload;
  @state() private error?: string;
  @state() private loading = false;

  private requestId = 0;
  private themeObserver?: MutationObserver;

  public connectedCallback(): void {
    super.connectedCallback();
    // Charts bake in the theme's colours at build time; see load-tab.ts.
    this.themeObserver = new MutationObserver(() => this.requestUpdate());
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  public disconnectedCallback(): void {
    this.themeObserver?.disconnect();
    this.themeObserver = undefined;
    super.disconnectedCallback();
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("entryId") || changed.has("range")) {
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.entryId) return;
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const { start, end } = resolveRange(this.range, new Date());
      const payload = await fetchGrid(this.hass, this.entryId, start, end);
      if (requestId !== this.requestId) return;
      this.payload = payload;
    } catch (err) {
      if (requestId !== this.requestId) return;
      this.error = describeError(err);
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: GridPayload) {
    const locale = this.hass.locale.language;
    const kpi = payload.kpi;
    const measured = payload.measured_seconds > 0;
    const cells: [string, string, string][] = [
      ["Outages", measured ? `${kpi.count}` : DASH, ""],
      ["Without grid", measured ? formatDuration(kpi.off_seconds) : DASH, ""],
      ["Share of time", formatPercent(kpi.off_share, locale), "of measured time"],
      [
        "Longest",
        kpi.longest_seconds === null ? DASH : formatDuration(kpi.longest_seconds),
        kpi.longest_start ? `from ${new Date(kpi.longest_start).toLocaleString(locale)}` : "",
      ],
      ["Mean duration", kpi.mean_seconds === null ? DASH : formatDuration(kpi.mean_seconds), ""],
    ];
    if (kpi.brief_interruptions !== null) {
      cells.push(["Brief interruptions", `${kpi.brief_interruptions}`, "under a minute"]);
    }
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

  private renderDuration(episode: OutageEpisode): string {
    const cut = episode.started_before_window || episode.ongoing;
    return `${cut ? "at least " : ""}${formatDuration(episode.seconds)}`;
  }

  private renderEpisodes(payload: GridPayload) {
    if (!payload.episodes.length) {
      return html`<p class="empty">
        No outages in this period — none in ${formatDuration(payload.measured_seconds)} of
        measurement.
      </p>`;
    }
    const locale = this.hass.locale.language;
    const soc = (value: number | null | undefined) =>
      value === null || value === undefined ? DASH : formatPercent(value / 100, locale);
    return html`<table>
      <thead>
        <tr>
          <th>Start</th>
          <th>Duration</th>
          ${payload.has_soc
            ? html`<th>Charge at start</th><th>Lowest</th><th>At end</th>`
            : nothing}
          ${payload.has_load ? html`<th>Mean load</th>` : nothing}
        </tr>
      </thead>
      <tbody>
        ${payload.episodes.map(
          (item) => html`<tr>
            <td>${new Date(item.start).toLocaleString(locale)}</td>
            <td>
              ${this.renderDuration(item)}
              ${item.bridged_seconds > 0
                ? html`<span class="hint">(${formatDuration(item.bridged_seconds)} unrecorded)</span>`
                : nothing}
            </td>
            ${payload.has_soc
              ? html`<td>${soc(item.soc_start)}</td>
                  <td class=${item.below_low ? "low" : ""}>${soc(item.soc_min)}</td>
                  <td>${soc(item.soc_end)}</td>`
              : nothing}
            ${payload.has_load ? html`<td>${formatPower(item.load_mean_w ?? null, locale)}</td>` : nothing}
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  private renderAutonomy(autonomy: Autonomy, lowPct: number) {
    const locale = this.hass.locale.language;
    if (autonomy.reason !== null) {
      const reasons: Record<string, string> = {
        no_soc: "It needs the battery's state of charge, which is not mapped to this inverter.",
        no_outages: "There were no outages in this period to read a discharge rate from.",
        too_little_evidence: `The outages in this period add up to ${formatHours(autonomy.evidence_hours)}, and an estimate needs at least an hour.`,
        no_net_discharge:
          "The charge did not fall during this period's outages — the sun covered them — so there is no discharge rate to read.",
      };
      return html`<p class="note">No autonomy estimate. ${reasons[autonomy.reason]}</p>`;
    }
    return html`
      <div class="cards">
        <div class="card">
          <span class="name">From full to ${formatPercent(lowPct / 100, locale)}</span>
          <span class="value">${formatHours(autonomy.hours_from_full)}</span>
        </div>
        <div class="card">
          <span class="name">From where it is now</span>
          <span class="value">${formatHours(autonomy.hours_from_now)}</span>
          <span class="row">
            <span>Charge now</span>
            <span>${autonomy.soc_now === null ? DASH : formatPercent(autonomy.soc_now / 100, locale)}</span>
          </span>
        </div>
        <div class="card">
          <span class="name">Discharge rate</span>
          <span class="value">${autonomy.rate_pct_per_hour === null ? DASH : `${autonomy.rate_pct_per_hour.toFixed(1)} pts/h`}</span>
          <span class="row">
            <span>Mean load</span><span>${formatPower(autonomy.load_mean_w, locale)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        At the rate seen during this period's outages — ${formatHours(autonomy.evidence_hours)} of
        them. Whether a summer afternoon's outage says anything about a winter evening's is for
        the reader to judge; the mean load beside it is there to help.
      </p>
    `;
  }

  protected render() {
    if (this.error) {
      return html`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">Computing…</div>`;
    }

    const payload = this.payload;
    const locale = this.hass.locale.language;
    const warning = coverageWarning(payload.coverage, locale);
    const daysWithoutData = payload.days.length === 0;

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${payload.counted_from
          ? html`<span class="warn">
              Outages counted from ${new Date(payload.counted_from).toLocaleDateString(locale)} —
              the recorder keeps no earlier history of this sensor
            </span>`
          : nothing}
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      ${payload.source === "inferred"
        ? html`<p class="banner">
            Inferred from power flows, not measured. A night the battery carries the house with
            nothing crossing the grid connection looks exactly like an outage, and a daytime outage
            the sun covers is not seen at all. Map a sensor that reports grid presence to measure
            instead.
          </p>`
        : nothing}

      ${this.renderKpi(payload)}

      <section>
        <h2>Hours without grid, by day</h2>
        ${daysWithoutData
          ? html`<p class="empty">No days with data in this period.</p>`
          : html`<ia-chart .option=${outageDaysOption(payload.days)} height="220px"></ia-chart>`}
      </section>

      <section>
        <h2>Share of time without grid, by hour of day</h2>
        <ia-chart .option=${outageHoursOption(payload.hours)} height="220px"></ia-chart>
        <p class="note">Hours the sensor never recorded are left empty rather than drawn at zero.</p>
      </section>

      <section>
        <h2>Outages</h2>
        ${this.renderEpisodes(payload)}
      </section>

      <section>
        <h2>Autonomy</h2>
        ${this.renderAutonomy(payload.autonomy, payload.low_pct)}
      </section>
    `;
  }

  static styles = [
    sectionStyles,
    css`
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
      .banner {
        border: 1px solid var(--warning-color);
        border-radius: 12px;
        padding: 12px 16px;
        margin: 0 0 16px;
        font-size: 13px;
      }
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
      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
      td.low { color: var(--error-color, #d64545); font-weight: 500; }
      .empty { color: var(--secondary-text-color); margin: 0; }
      .note { font-size: 12px; color: var(--secondary-text-color); margin: 12px 0 0; }
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-grid-tab": IaGridTab;
  }
}
```

Check that `sectionStyles` defines `.cards`, `.card`, `.name`, `.value` and `.row` (it does — the charge section uses them) and that a `.value` rule here does not fight the one there; if it does, drop the local `.value` rule and keep the section's.

- [ ] **Step 2: Wire the tab into the panel**

In `panel.ts`: add `import "./tabs/grid-tab";`, add `{ id: "grid", label: "Grid" }` to `TABS` after balance, and in `renderTab` add after the balance block:

```ts
        ${this.tab === "grid"
          ? html`<ia-grid-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-grid-tab>`
          : nothing}
```

- [ ] **Step 3: Typecheck, test and build**

Run: `cd frontend && npm run typecheck && npm run test && npm run build`
Expected: all clean; the build rewrites `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js`.

- [ ] **Step 4: Run the whole backend suite once more**

Run: `pytest -q`
Expected: PASS, no stray log lines.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/tabs/grid-tab.ts frontend/src/panel.ts custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js
git commit -m "feat: the Grid tab"
```

---

### Task 10: Docs, and live verification

**Files:**
- Modify: `README.md` ("What works today", "Not built yet", the wizard paragraph under Installing)
- Modify: `docs/known-gaps.md` (sections 1, 3 and 6)
- Modify: `custom_components/inverter_analytics/translations/en.json` (the `grid_connected` descriptions, which say "Used to measure outages" and are now true; leave as is unless a live run shows they mislead)

- [ ] **Step 1: README**

Add to "What works today", after the Balance bullets:

```markdown
- **A Grid tab.** How often the grid went away, for how long, and when: the
  count, the total, the longest, the share of measured time, and brief
  interruptions too short to be outages; hours without grid by day and the
  share by hour of day; and a table of every outage with the battery's charge
  when it began, the lowest it reached and where it ended, plus the mean load
  through it. An outage cut by the window's edge says "at least". A restart
  of Home Assistant in the middle of an outage does not make two of it. The
  grid-presence sensor is a binary sensor with no statistics, so a window
  reaching past the recorder's retention says from which date it counts.
- **Autonomy, read off the battery.** How long the battery would last from
  full and from where it is now, at the discharge rate seen during this
  period's outages — the nameplate capacity is never multiplied into it. It
  is withheld, and says why, when the outages were too short to learn from
  or the sun covered them.
- **Outages inferred from flows**, for an installation with no presence
  sensor: grid power at zero while the battery discharges. The tab carries a
  banner saying that a night of zero export looks the same, and asks for a
  sensor.
```

Under "Installing through HACS", step 5, change "the rest is optional and feeds tabs that are not built yet" to "a grid-presence binary sensor enables the Grid tab; the rest is optional".

Remove "All four tabs are built." from "Not built yet" and write "All five tabs are built."

- [ ] **Step 2: known-gaps**

In section 6, replace the `Ambiguity` bullet: the second question now exists — the grid-presence choice — and say whether the live run exercised it. In section 3, add: "Inferred outages against a real zero-export night" as unverified until it is. In section 5, add the reasoning for not correcting the discharge rate for PV that charged during an outage.

- [ ] **Step 3: Live verification**

Against the live instance:

1. Create a template `binary_sensor.grid_connected` from the inverter's grid status and let it record.
2. Through `recorder`, or by driving the template's source, build a history in the last day: an outage of 100 s; a 20 s flicker; a three-hour outage with a 30 s `unavailable` in the middle, during which the battery's charge falls through the low mark; an outage still running at the moment of reading.
3. Open **Reconfigure → Fill in what detection found** and confirm `grid_connected` is offered pre-filled. Add a second matching binary sensor and confirm the question appears with both, labelled without a count.
4. On the Grid tab, with the 24 h period: two outages plus one ongoing in the table, one brief interruption in the KPIs, the three-hour outage shown once with "(30 s unrecorded)", its lowest charge in the low colour, and the ongoing one "at least". Switch to 30 days: the counted-from note appears with the recorder's boundary.
5. Read the autonomy card and check the rate against the charge the table shows.
6. Remove `grid_connected` from the mapping, map the external CTs and battery power, and confirm the banner, the five-minute floor and the absent brief-interruption KPI.
7. Record what was found in `docs/known-gaps.md` section 1, and any defect in section 2, either way.

- [ ] **Step 4: Commit**

```bash
git add README.md docs/known-gaps.md custom_components/inverter_analytics/translations/en.json
git commit -m "docs: the Grid tab in the README, live findings in known-gaps"
```
