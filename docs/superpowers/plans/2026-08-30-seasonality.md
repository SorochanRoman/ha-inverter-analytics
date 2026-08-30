# Seasonality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Seasonality tab showing how load and PV change with the month of the year, and how the shape of a day changes with the season.

**Architecture:** One local-time bucketing primitive in `resample.py` that all three views share; pure aggregation in `analytics/seasonality.py`; a WebSocket command on the shared command shape; a Lit tab with two bar charts and a heat map.

**Tech Stack:** Python 3.12 / Home Assistant 2024.11+, Lit 3 + TypeScript + ECharts 5, pytest + vitest.

## Global Constraints

- Everything committed is English: docs, UI strings, backend messages that reach the screen, code comments, docstrings, commit messages.
- Every bucket carries its own coverage. Months below 60% are marked incomplete and still shown, never dropped.
- A monthly peak is labelled the highest hourly average wherever it appears, never "peak load".
- Bucketing is done in UTC and uses the local zone only to choose the bucket, so a DST transition neither creates nor loses seconds.
- `ruff check` and `ruff format --check` clean; `pytest` output pristine, no stray log lines.
- Charts use only option keys in `SUPPORTED_OPTION_KEYS`; a new chart type means registering its component there.

---

### Task 1: Local-time bucketing

**Files:** Modify `custom_components/inverter_analytics/analytics/resample.py`, `tests/test_resample_episodes.py`

**Interfaces produced:**
- `LocalPiece` — `local: datetime`, `seconds: float`, `value: float`
- `split_local_hours(intervals, tz) -> Iterator[LocalPiece]`

- [ ] Extract the hour-splitting loop currently inside `hour_of_day_durations` into `split_local_hours`, and move `hour_of_day_durations` onto it so one place gets DST right.
- [ ] Test that emitted seconds sum to the input duration across both DST transitions, and that the existing `hour_of_day_durations` tests still pass unchanged — they are the proof the refactor kept its behaviour.

### Task 2: Seasonality analytics

**Files:** Create `custom_components/inverter_analytics/analytics/seasonality.py`, `tests/test_seasonality.py`

**Interfaces produced:**
- `build_seasonality_payload(load, pv, *, tz, window) -> dict`
- `INCOMPLETE_COVERAGE = 0.6`

- [ ] Monthly buckets: mean, highest hourly average, seconds covered, coverage against the window's share of that month, `complete` flag.
- [ ] Hour-of-day means across the window.
- [ ] Month-by-hour means for the heat map, with per-cell coverage so an empty cell is not drawn as zero.
- [ ] PV alongside load when mapped, sharing the bucketing.
- [ ] Tests: a partial first month beside a full one; a month with no data at all; the peak labelled and derived from hourly means; a window shorter than one month.

### Task 3: WebSocket command

**Files:** Modify `websocket_api.py`, `tests/test_websocket_api.py`

- [ ] `inverter_analytics/seasonality` on `_async_windowed_response`, keyed `"seasonality"`.
- [ ] `async_seasonality_analytics` reading load and PV in one pass and passing `hass.config.time_zone`.
- [ ] `invalid_config` when no load-power sensor is mapped.

### Task 4: The Seasonality tab

**Files:** Create `frontend/src/tabs/seasonality-tab.ts`; modify `types.ts`, `api.ts`, `charts/registry.ts`, `charts/options.ts`, `panel.ts`, `charts/options.test.ts`

- [ ] Register `HeatmapChart` and `VisualMapComponent`, adding `visualMap` to `SUPPORTED_OPTION_KEYS` — an unregistered component is ignored in silence.
- [ ] `monthlyOption`, `hourOfDayOption`, `monthHourHeatmapOption`.
- [ ] Incomplete months marked in the chart and named in the text beneath it.
- [ ] Wire the tab into `panel.ts` in place of its placeholder.

### Task 5: Live verification against real long-term statistics

**Files:** none — verification only

- [ ] Seed several months of hourly statistics for a load sensor via `homeassistant.components.recorder.statistics.async_import_statistics`, with one deliberately partial month.
- [ ] Confirm the tab renders from statistics alone, that the partial month is marked, and that the peak is labelled as an hourly average.
- [ ] This is the project's first test of the long-term-statistics path against real hourly rows; record the result in `docs/known-gaps.md` either way.
