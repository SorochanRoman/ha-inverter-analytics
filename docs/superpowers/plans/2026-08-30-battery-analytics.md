# Battery Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Battery tab that shows how the battery is used and how often it drops to a low state of charge, plus a consistency check between a total and its parts.

**Architecture:** Same shape as the Load tab. Pure maths in `analytics/battery.py` over series produced by `async_series_many`; a WebSocket command returning one payload; a Lit tab rendering distributions and episodes, no time-series charts.

**Tech Stack:** Python 3.12 / Home Assistant 2024.11+, Lit 3 + TypeScript + ECharts 5, pytest + vitest.

## Global Constraints

- Everything committed is English: docs, UI strings, backend messages that reach the screen, code comments, docstrings, commit messages.
- Episodes, the minimum state of charge and time below the threshold are computed over the **raw portion of the window only**; the payload carries the moment that portion begins.
- A window entirely inside long-term statistics renders no episode table and says why — never an empty one.
- Figures that cannot be substantiated show a dash and the reason, never a zero or a guess.
- `ruff check` and `ruff format --check` clean; `pytest` output pristine, no stray log lines.
- Charts use only option keys in `SUPPORTED_OPTION_KEYS`.

---

### Task 1: Battery maths

**Files:** Create `custom_components/inverter_analytics/analytics/battery.py`, `tests/test_battery.py`

**Interfaces produced:**
- `build_battery_payload(soc, power, *, capacity_kwh, low_pct, idle_w, raw_from) -> dict`
- `SOC_BANDS`, `DIP_MIN_SECONDS`, `SIGN_MIN_SECONDS`

- [ ] Distribution over 0–100 in 5% buckets, plus five bands.
- [ ] KPIs: mean state of charge (whole window); lowest, time below threshold, dip count, mean low point (raw window only).
- [ ] Dip episodes via `episodes_below`, `min_seconds=DIP_MIN_SECONDS`, each carrying the lowest charge reached and what it recovered to.
- [ ] Charge/discharge: mean powers, time shares with the idle floor, energy each way by integration, cycles per day when capacity is known.
- [ ] Sign check by aligning charge with power; no verdict without enough evidence.
- [ ] Tests: the raw-window restriction, a sub-minute dip, an LTS-only window, both sign verdicts and the undecidable case, cycles without capacity.

### Task 2: Tuning numbers

**Files:** Modify `roles.py`, `const.py`, `translations/en.json`, `tests/test_roles.py`

- [ ] `battery_low_pct` (default 20) and `battery_idle_w` (default 50) as advanced NUMBER roles.
- [ ] Labels and descriptions in the options step; the translation test covers them already.

### Task 3: WebSocket command, boilerplate extracted

**Files:** Modify `websocket_api.py`, `analytics/battery.py`, `tests/test_websocket_api.py`

- [ ] Extract the entry lookup, window validation, clamping, cache and merge shared by `ws_load` into one helper — the second command is the moment `docs/known-gaps.md` named for this.
- [ ] `inverter_analytics/battery` returning the payload; `invalid_config` when no state-of-charge sensor is mapped.
- [ ] `async_battery_analytics` reading soc and power in one pass, passing the raw boundary.

### Task 4: The Battery tab

**Files:** Create `frontend/src/tabs/battery-tab.ts`, `frontend/src/sections/charge-section.ts`; modify `types.ts`, `api.ts`, `charts/options.ts`, `panel.ts`, `charts/options.test.ts`

- [ ] Types for the payload; `fetchBattery`.
- [ ] `socHistogramOption` and `socBandsOption`, lowest band in the warning colour.
- [ ] KPI row, distribution, bands, episode table, charging section, sign warning.
- [ ] Wire the tab into `panel.ts` in place of its placeholder.

### Task 5: Total against parts

**Files:** Modify `analytics/load.py`, `frontend/src/types.ts`, `frontend/src/tabs/load-tab.ts`; tests in `tests/test_load_analytics.py`

- [ ] Compare the total's time-weighted mean with the sum of the parts' over the aligned timeline, for load phases and PV strings.
- [ ] Beyond 25%, report both figures; phrased as a question in the status row.
- [ ] Test that a correct mapping raises nothing and a swapped one does.

### Task 6: Live verification

- [ ] Push a history with a real dip below the threshold, a sub-minute dip that must not count, and a charge/discharge cycle.
- [ ] Confirm the episode table, the sign check and the LTS-only case on screen.
