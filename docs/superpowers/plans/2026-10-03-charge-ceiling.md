# Charge Ceiling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recognise a full battery from its behaviour (the charger stopped with the sun up) instead of a fixed mark, and judge the Sun of a no-export installation by how often it filled the battery to its limit.

**Architecture:** Pure functions in `analytics/sizing.py` (`ceiling_hours`, `export_limited`, an extended `battery_evidence` and `solar_verdict`) fed by two or three extra hourly-extremes reads in `async_sizing_analytics`. The payload's `rules` say which mode was used; the Sizing tab picks its rule sentences from them. Spec: `docs/superpowers/specs/2026-10-03-charge-ceiling-design.md`.

**Tech Stack:** Python 3.12 + pytest + ruff; TypeScript + Lit + Vitest.

## Global Constraints

- Everything committed is English except Ukrainian strings in `frontend/src/i18n/uk.ts`.
- No new dependencies.
- No figure is shown that cannot be read honestly: a verdict that cannot be read is withheld with its reason.
- Existing behaviour stays where the spec does not change it: with export, the Sun rule is the same; without `battery_power` and `pv_power`, "full" is the fixed mark as today.
- Constants (verbatim): `CEILING_PV_MIN_W = 100.0`, `CEILING_SOC_FLAT_PCT = 1.0`, `CEILING_ABOVE_LOW_PCT = 20.0`, `EXPORT_LIMITED_SHARE = 0.01`, `SOLAR_CURTAILED_BORDERLINE_SHARE = 0.4`; existing `SOLAR_FILL_SHARE = 0.8`, `SOLAR_BORDERLINE_SHARE = 0.7`.
- Commit messages: conventional prefix, lower-case subject, ending with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and
  `Claude-Session: https://claude.ai/code/session_01HjPyoP3CZ788fs56zNTuqC`.
- Full check: `(cd frontend && npm run typecheck && npm run test) && .venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check .`
- Ukrainian follows the glossary in `docs/superpowers/plans/2026-10-01-ukrainian.md`; new terms are added there in the same commit.

---

### Task 1: Ceiling hours and the full day

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/sizing.py` (constants; new `ceiling_hours`; `battery_evidence`)
- Test: `tests/test_sizing.py`

**Interfaces:**
- Produces:
  - `CEILING_PV_MIN_W`, `CEILING_SOC_FLAT_PCT`, `CEILING_ABOVE_LOW_PCT`
  - `ceiling_hours(soc: Sequence[HourlyRow], battery: Sequence[HourlyRow], pv: Sequence[HourlyRow], *, low_pct: float, idle_w: float) -> set[datetime]`
  - `battery_evidence(rows, tz, *, low_pct, full_pct, ceiling: set[datetime] | None = None)` — with a set, a day is full when one of its SoC rows' `start` is in the set; with `None`, the fixed mark as today.

- [ ] **Step 1: Failing tests** (follow the file's existing helpers for building `HourlyRow`s; read them first):

```python
def hour(h: int, *, mean: float, low: float, high: float) -> HourlyRow:
    return HourlyRow(start=BASE + timedelta(hours=h), mean=mean, min=low, max=high)


def test_a_ceiling_hour_is_sun_up_battery_still_charge_flat_and_high():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    battery = [hour(12, mean=0.0, low=-20.0, high=30.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    assert ceiling_hours(soc, battery, pv, low_pct=20.0, idle_w=50.0) == {BASE + timedelta(hours=12)}


def test_each_condition_alone_breaks_a_ceiling_hour():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    battery = [hour(12, mean=0.0, low=-20.0, high=30.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    args = {"low_pct": 20.0, "idle_w": 50.0}
    assert not ceiling_hours(soc, battery, [hour(12, mean=99.0, low=0.0, high=200.0)], **args)
    assert not ceiling_hours(soc, [hour(12, mean=0.0, low=-20.0, high=51.0)], pv, **args)
    assert not ceiling_hours([hour(12, mean=85.0, low=83.5, high=85.0)], battery, pv, **args)
    assert not ceiling_hours([hour(12, mean=39.0, low=39.0, high=39.5)], battery, pv, **args)


def test_charge_and_discharge_in_one_hour_is_not_standing_still():
    # Half an hour each way averages to zero; the extremes give it away.
    soc = [hour(12, mean=85.0, low=84.5, high=85.0)]
    battery = [hour(12, mean=0.0, low=-1500.0, high=1500.0)]
    pv = [hour(12, mean=2500.0, low=1800.0, high=3200.0)]
    assert not ceiling_hours(soc, battery, pv, low_pct=20.0, idle_w=50.0)


def test_an_hour_missing_from_one_sensor_is_not_a_ceiling_hour():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    battery = [hour(12, mean=0.0, low=-20.0, high=30.0)]
    assert not ceiling_hours(soc, battery, [], low_pct=20.0, idle_w=50.0)


def test_a_battery_capped_at_85_counts_as_full_by_its_ceiling():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0), hour(30, mean=30.0, low=15.0, high=50.0)]
    ceiling = {BASE + timedelta(hours=12)}
    evidence = battery_evidence(soc, UTC, low_pct=20.0, full_pct=95.0, ceiling=ceiling)
    assert evidence["days_full"] == 1
    assert evidence["days_with_data"] == 2


def test_without_a_ceiling_the_fixed_mark_still_applies():
    soc = [hour(12, mean=85.0, low=85.0, high=85.0)]
    assert battery_evidence(soc, UTC, low_pct=20.0, full_pct=95.0)["days_full"] == 0
```

(`BASE`, `UTC` — use the module's existing names; add imports for `ceiling_hours`, `HourlyRow`, `timedelta` as needed.)

Run: `.venv/bin/pytest tests/test_sizing.py -q` → fails on import.

- [ ] **Step 2: Implement**

```python
# A ceiling hour: the inverter stopped charging although the sun was up. In
# self-consumption mode that happens only at the battery's charge limit — or
# at its floor, which the margin above the low mark excludes. Read from the
# hour's extremes, not its mean: half an hour each way averages to zero.
CEILING_PV_MIN_W = 100.0
CEILING_SOC_FLAT_PCT = 1.0
CEILING_ABOVE_LOW_PCT = 20.0


def ceiling_hours(
    soc: Sequence[HourlyRow],
    battery: Sequence[HourlyRow],
    pv: Sequence[HourlyRow],
    *,
    low_pct: float,
    idle_w: float,
) -> set[datetime]:
    """Hours in which the battery stood full while the sun was up, whatever its limit."""
    battery_by_start = {row.start: row for row in battery}
    pv_by_start = {row.start: row for row in pv}
    hours: set[datetime] = set()
    for charge in soc:
        power = battery_by_start.get(charge.start)
        sun = pv_by_start.get(charge.start)
        if power is None or sun is None:
            continue
        if (
            sun.mean >= CEILING_PV_MIN_W
            and power.min >= -idle_w
            and power.max <= idle_w
            and charge.max - charge.min <= CEILING_SOC_FLAT_PCT
            and charge.min >= low_pct + CEILING_ABOVE_LOW_PCT
        ):
            hours.add(charge.start)
    return hours
```

`battery_evidence`: add the keyword `ceiling: set[datetime] | None = None`; inside the loop,
`reached = row.start in ceiling if ceiling is not None else row.max >= full_pct` and
`full[day] = full[day] or reached`. Extend its docstring by one sentence: with a set of ceiling
hours, "full" is the battery's own limit, so a charge capped below the fixed mark still counts.

- [ ] **Step 3: Verify** — `.venv/bin/pytest tests/test_sizing.py -q && .venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check .`

- [ ] **Step 4: Commit** — `feat: recognise a full battery by its charge ceiling`

---

### Task 2: Export, the Sun rule and the payload

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/sizing.py` (`export_limited`, `solar_verdict`, `_solar_block`, `build_sizing_payload`, `async_sizing_analytics`)
- Test: `tests/test_sizing.py`, and the sizing websocket/payload tests if any pin the payload shape (`grep -rn build_sizing_payload tests`)

**Interfaces:**
- Consumes: Task 1's `ceiling_hours`, `battery_evidence(..., ceiling=)`.
- Produces:
  - `EXPORT_LIMITED_SHARE = 0.01`, `SOLAR_CURTAILED_BORDERLINE_SHARE = 0.4`
  - `export_limited(*, pv_kwh: float, export: EnergySeries | None, grid: Sequence[HourlyRow] | None, zero_w: float) -> bool | None`
    — counter with rows → `export.total <= EXPORT_LIMITED_SHARE * pv_kwh`; else grid rows (already signed so negative = export) → `all(row.min >= -zero_w for row in grid)`; else `None`.
  - `solar_verdict(evidence, *, export_limited: bool | None = None)`
  - `build_sizing_payload(..., ceiling: set[datetime] | None = None, export_limited: bool | None = None)`; `rules` gains `full_mode` (`"ceiling"` when `ceiling is not None`, else `"fixed"`), `export_limited`, `solar_curtailed_borderline_share`.
  - New solar withheld reason `"no_fill"`.

- [ ] **Step 1: Failing tests**

```python
def test_export_is_limited_by_the_counter():
    assert export_limited(pv_kwh=1000.0, export=energy_series(5.0), grid=None, zero_w=10.0) is True
    assert export_limited(pv_kwh=1000.0, export=energy_series(50.0), grid=None, zero_w=10.0) is False


def test_export_is_limited_by_grid_power_when_no_counter():
    never_out = [hour(12, mean=300.0, low=-5.0, high=900.0)]
    out = [hour(12, mean=300.0, low=-800.0, high=900.0)]
    assert export_limited(pv_kwh=1000.0, export=None, grid=never_out, zero_w=10.0) is True
    assert export_limited(pv_kwh=1000.0, export=None, grid=out, zero_w=10.0) is False


def test_export_is_unknown_without_either():
    assert export_limited(pv_kwh=1000.0, export=None, grid=None, zero_w=10.0) is None


def no_export(share: float, fill: float | None):
    return {"production_share": share, "fill_share": fill, "pv_kwh": 1.0, "load_kwh": 1.0,
            "self_sufficiency": None}


def test_the_no_export_sun_rule():
    assert solar_verdict(no_export(0.95, 0.85), export_limited=True)["verdict"] == "enough"
    assert solar_verdict(no_export(0.5, 0.45), export_limited=True)["verdict"] == "borderline"
    assert solar_verdict(no_export(0.75, 0.1), export_limited=True)["verdict"] == "borderline"
    assert solar_verdict(no_export(0.5, 0.1), export_limited=True)["verdict"] == "short"


def test_the_no_export_rule_needs_a_fill_share():
    block = solar_verdict(no_export(0.95, None), export_limited=True)
    assert block["verdict"] is None and block["reason"] == "no_fill"


def test_with_export_the_sun_rule_is_unchanged():
    assert solar_verdict(no_export(0.95, 0.85))["verdict"] == "borderline"
    assert solar_verdict(no_export(1.1, 0.85), export_limited=False)["verdict"] == "enough"
```

(`energy_series(total)` — build an `EnergySeries` with one row of that change, following how the module's tests already build energy; check `withheld()` for the exact shape of a withheld block and adjust the `no_fill` assertion to it.)

Add a payload test: `build_sizing_payload(..., ceiling={...}, export_limited=True)` carries `rules["full_mode"] == "ceiling"`, `rules["export_limited"] is True`, `rules["solar_curtailed_borderline_share"] == 0.4`, and the months' solar blocks are judged by the no-export rule; without the new arguments, `full_mode == "fixed"` and `export_limited is None`.

- [ ] **Step 2: Implement**

- `export_limited` as in Interfaces, with a docstring naming the three sources in order.
- `solar_verdict(evidence, *, export_limited=None)`: keep the current body for `export_limited` not `True`. For `True`:

```python
    if export_limited:
        # Without export, production cannot pass consumption plus charging, so
        # a share of consumption never reaches "enough". The sun of such a
        # system is enough when it keeps taking the battery to its limit.
        if fill is None:
            return withheld("no_fill", evidence)
        if fill >= SOLAR_FILL_SHARE:
            verdict = ENOUGH
        elif fill >= SOLAR_CURTAILED_BORDERLINE_SHARE or share >= SOLAR_BORDERLINE_SHARE:
            verdict = BORDERLINE
        else:
            verdict = SHORT
        return {"verdict": verdict, "reason": None, "evidence": dict(evidence)}
```

  placed after the existing `share is None` check.
- `_solar_block` and `build_sizing_payload` pass `export_limited` through; `judge` passes `ceiling` to `battery_evidence`. One decision for the whole window, used for every month.
- `async_sizing_analytics`:
  - `battery_id = config.entity_id("battery_power")`, `pv_id = config.entity_id("pv_power")`; `ceiling_mode = bool(soc_id and battery_id and pv_id)`.
  - `thresholds_inverted = (not ceiling_mode) and full_pct <= low_pct`.
  - Read hourly extremes for `battery_id` and `pv_id` too when `ceiling_mode`; for `grid_id = config.entity_id("grid_power")` when mapped and `grid_export_total` is not mapped. Add `grid_export_total` to `energy_ids` when mapped and `has_solar`.
  - Signed grid rows: if `config.sign("grid_power") < 0`, use `HourlyRow(start, -mean, -max, -min)`.
  - `ceiling = ceiling_hours(soc_rows, battery_rows, pv_rows, low_pct=low_pct, idle_w=config.number("battery_idle_w") or DEFAULT_BATTERY_IDLE_W) if ceiling_mode else None` — when `ceiling_mode` but one of the extra sensors returned no rows, use `None` (fixed mode) rather than an empty set.
  - `export = export_limited(pv_kwh=<period PV total>, export=energy.get("grid_export_total"), grid=<signed grid rows or None>, zero_w=config.number("grid_zero_w") or DEFAULT_GRID_ZERO_W)`.
  - `grid_export_total` must not change the solar card's `missing` / `no_statistics` lists (it is optional).

- [ ] **Step 3: Verify** — full check.

- [ ] **Step 4: Commit** — `feat: the sun of a no-export system is judged by days at the charge limit`

---

### Task 3: The Sizing tab

**Files:**
- Modify: `frontend/src/types.ts` (`SizingPayload.rules`), `frontend/src/verdict.ts` (`reasonSentence`, `reasonHint`, new `solarRuleKind`), `frontend/src/tabs/sizing-tab.ts` (`ruleSentence`, the note), `frontend/src/i18n/en.ts`, `frontend/src/i18n/uk.ts`
- Modify: `docs/known-gaps.md`, `README.md` (Sizing section), glossary, built bundle
- Test: `frontend/src/verdict.test.ts`, `frontend/src/i18n/grid-sizing.test.ts`

**Interfaces:**
- Consumes: `rules.full_mode: "ceiling" | "fixed"`, `rules.export_limited: boolean | null`, `rules.solar_curtailed_borderline_share: number`; solar reason `"no_fill"`.
- Produces: `solarRuleKind(payload: SizingPayload): "no_export" | "with_fill" | "plain"` in `verdict.ts` — `"no_export"` when `rules.export_limited === true`, else `"with_fill"` when `solarFillTested(payload)`, else `"plain"`.

- [ ] **Step 1: Types** — add the three fields to `rules`.

- [ ] **Step 2: Failing tests**

```ts
// verdict.test.ts
it("picks the no-export sun rule when export is limited", () => {
  expect(solarRuleKind(payloadWith({ export_limited: true }))).toBe("no_export");
});
```

(build `payloadWith` from the existing `solarFillTested` test fixtures in the same file.)

```ts
// grid-sizing.test.ts
it("reads the ceiling and no-export rules in English", () => {
  expect(en.sizing.batteryRuleCeiling({ low: "20%", share: "25%" })).toContain("charge limit");
  expect(
    en.sizing.solarRuleNoExport({ fill: "80%", borderlineFill: "40%", borderline: "70%" }),
  ).toContain("no export");
});
```

- [ ] **Step 3: Strings** (exact English; Ukrainian per glossary, same meaning):

```ts
    batteryRuleCeiling: (p: { low: string; share: string }) =>
      `Counted over days with data: short when the battery reached its charge limit with the sun up and still fell below ${p.low} on at least ${p.share} of them; borderline when it happened at all; no verdict for a span in which it never reached its limit. A day it ran low without reaching it counts against the sun, not the battery.`,
    solarRuleNoExport: (p: { fill: string; borderlineFill: string; borderline: string }) =>
      `With no export, production cannot pass consumption, so the sun is read from the battery: enough when it reached its charge limit with the sun up on at least ${p.fill} of days; borderline from ${p.borderlineFill} of days, or from ${p.borderline} of consumption; short below.`,
    fullModeCeiling:
      "Full means the battery reached its own charge limit: the inverter stopped charging while the sun was up. A limit set below 100% for the summer still counts.",
    fullModeFixed: (p: { full: string }) =>
      `Full means a charge of at least ${p.full}. Map battery power and PV power to read the battery's own limit instead.`,
```

`verdict.noData.solar` stays; add the solar reason `no_fill`:
`reasonSentence` → "With no export the sun is read from how often the battery reached its limit, and there is no charge data for this span."; `reasonHint` → "no charge data".

- [ ] **Step 4: The tab**
- `ruleSentence("battery")` uses `batteryRuleCeiling` when `rules.full_mode === "ceiling"`, else the existing `batteryRule`.
- `ruleSentence("solar")` switches on `solarRuleKind(payload)`: `"no_export"` → `solarRuleNoExport` with `fill = pct(rules.solar_fill_share)`, `borderlineFill = pct(rules.solar_curtailed_borderline_share)`, `borderline = pct(rules.solar_borderline_share)`; the other two as today.
- Under "How the verdicts are read", one more note: `fullModeCeiling` or `fullModeFixed({ full: pct(rules.full_pct / 100) })`.

- [ ] **Step 5: Docs** — the two known gaps from spec §8 in `docs/known-gaps.md`; one sentence in the README's Sizing bullet: full is recognised from the battery's own limit when battery and PV power are mapped, and without export the Sun is read from days at that limit.

- [ ] **Step 6: Verify, build, commit**

Run: `(cd frontend && npm run typecheck && npm run test && npm run build) && .venv/bin/pytest -q`

Commit: `feat: the Sizing tab says which full and which sun rule it read`
