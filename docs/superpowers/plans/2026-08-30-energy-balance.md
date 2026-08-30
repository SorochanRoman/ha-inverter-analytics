# Energy Balance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Balance tab showing where energy came from and where it went, with self-sufficiency and self-consumption.

**Architecture:** A new statistics reader for counters in `source.py` using the recorder's `change` type; pure aggregation in `analytics/balance.py`; a WebSocket command on the shared command shape; a Lit tab with stacked bars.

**Tech Stack:** Python 3.12 / Home Assistant 2024.11+, Lit 3 + TypeScript + ECharts 5, pytest + vitest.

## Global Constraints

- Everything committed is English: docs, UI strings, backend messages that reach the screen, code comments, docstrings, commit messages.
- Energy always comes from hourly statistics, never from raw states: reset handling lives in the recorder's accumulated `sum`.
- The payload reports the span the statistics actually cover; the interface shows it when it differs from the period requested.
- The residual appears only when all six counters are mapped, and is labelled "unaccounted" — never "losses" or "efficiency".
- Self-sufficiency and self-consumption are clamped to 0–100% and absent when their denominator is at or near zero.
- `ruff check` and `ruff format --check` clean; `pytest` output pristine, no stray log lines.
- Charts use only option keys in `SUPPORTED_OPTION_KEYS`.

---

### Task 1: Reading counters

**Files:** Modify `custom_components/inverter_analytics/analytics/source.py`, `tests/test_source.py`

**Interfaces produced:**
- `EnergyRow` — `start: datetime`, `change: float`
- `async_energy_many(hass, entity_ids, window) -> dict[str, list[EnergyRow]]`
- `EnergySeries` — rows plus `covered_start` / `covered_end`

- [ ] One executor round trip for all six ids, asking `statistics_during_period` for `{"change"}` at `"hour"`.
- [ ] Rows with a null change are dropped, not read as zero: an hour with no statistics is not an hour of no energy.
- [ ] The covered span comes from the first and last row actually returned.
- [ ] Tests: several entities in one round trip; a null change dropped; an empty result reporting no covered span rather than raising.

### Task 2: Balance analytics

**Files:** Create `custom_components/inverter_analytics/analytics/balance.py`, `tests/test_balance.py`

**Interfaces produced:**
- `build_balance_payload(flows, *, tz, window, covered) -> dict`
- `FLOW_ROLES`, `SOURCE_ROLES`, `SINK_ROLES`, `MIN_DENOMINATOR_KWH`

- [ ] Totals per flow; sources and sinks summed; residual with its all-six gate.
- [ ] Self-sufficiency and self-consumption, each gated on its own pair and its denominator.
- [ ] Daily buckets keyed by local date, an hourly row never split.
- [ ] Tests: a mid-window counter reset producing no negative energy; five of six mapped giving flows and no residual; the residual's sign; both ratios clamped and suppressed; days bucketed in the local zone.

### Task 3: WebSocket command

**Files:** Modify `websocket_api.py`, `tests/test_websocket_api.py`

- [ ] `inverter_analytics/balance` on `_async_windowed_response`, keyed `"balance"`.
- [ ] `async_balance_analytics` reading every mapped energy role in one pass.
- [ ] `invalid_config` when none of the six is mapped — the tab has nothing to show.

### Task 4: The Balance tab

**Files:** Create `frontend/src/tabs/balance-tab.ts`; modify `types.ts`, `api.ts`, `charts/options.ts`, `panel.ts`, `charts/options.test.ts`

- [ ] `flowBarsOption` (sources against sinks) and `dailyFlowsOption` (stacked per day).
- [ ] Totals cards, the balance line with its unaccounted figure, both ratios with their arithmetic written out.
- [ ] The covered-span notice when it differs from the period requested.
- [ ] Wire the tab into `panel.ts` in place of its placeholder — the last one.

### Task 5: Live verification with a counter reset

**Files:** none — verification only

- [ ] Import counter statistics for all six roles across several days, with one counter reset to zero mid-window.
- [ ] Confirm no negative energy, that the residual appears only with all six mapped, and that the covered span is reported.
- [ ] Record the result in `docs/known-gaps.md` either way.
