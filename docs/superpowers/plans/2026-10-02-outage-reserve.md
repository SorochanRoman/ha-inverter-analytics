# Outage Reserve Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** For every outage on the Grid tab, show how much longer the battery would have lasted and the charge it needed at the start, plus a summary of the hardest outage and how many were covered.

**Architecture:** Two pure functions in `analytics/grid.py` (`reserve_columns`, `reserve_summary`) feed new fields into the payload `build_grid_payload` already returns. The Lit panel renders two new table columns and two summary cards, with every string in the en/uk dictionaries. Spec: `docs/superpowers/specs/2026-10-02-outage-reserve-design.md`.

**Tech Stack:** Python 3.12 + pytest + ruff; TypeScript + Lit + Vitest.

## Global Constraints

- Everything committed is English except Ukrainian strings in `frontend/src/i18n/uk.ts`.
- No new dependencies.
- Everything is in points of charge; the nameplate capacity is never multiplied in.
- Existing English panel text must render exactly as before.
- Commit messages: conventional prefix, lower-case subject, ending with the two lines
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and
  `Claude-Session: https://claude.ai/code/session_01HjPyoP3CZ788fs56zNTuqC`.
- Full check: `(cd frontend && npm run typecheck && npm run test) && .venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check .`
- Ukrainian follows the glossary table in `docs/superpowers/plans/2026-10-01-ukrainian.md`; new terms go into it in the same commit.

---

### Task 1: The reserve, computed

**Files:**
- Modify: `custom_components/inverter_analytics/analytics/grid.py` (constants near `AUTONOMY_MIN_HOURS`; new functions after `_battery_columns`; `build_grid_payload`)
- Test: `tests/test_grid.py`

**Interfaces:**
- Produces:
  - `RESERVE_MIN_SECONDS = 1800.0`, `RESERVE_MIN_DROP_PCT = 2.0`
  - `reserve_columns(episode: Mapping[str, Any], low_pct: float) -> dict[str, Any]` → keys `hours_left: float | None`, `needed_pct: float | None`, `reserve_reason: str | None` (one of `"no_soc"`, `"cut"`, `"no_net_discharge"`, `"too_short"`)
  - `reserve_summary(episodes: Sequence[Mapping[str, Any]], low_pct: float) -> dict[str, Any]` → `worst_needed_pct`, `worst_start`, `covered`, `judged`
  - payload: each episode gains the three keys **only when `soc` is passed**; `payload["reserve"]` always present.

- [ ] **Step 1: Write the failing tests** — append to `tests/test_grid.py` (add the three new names to the existing import from `...analytics.grid`):

```python
def outage(**overrides):
    base = {
        "start": at(0).isoformat(),
        "seconds": 3 * 3600.0,
        "started_before_window": False,
        "ongoing": False,
        "soc_start": 80.0,
        "soc_end": 50.0,
        "soc_min": 50.0,
    }
    return base | overrides


def test_reserve_reads_hours_left_and_the_charge_needed():
    # 30 points in 3 hours is 10 points an hour; 30 points above a 20% mark
    # is three more hours, and the outage needed 20 + 30 = 50% at its start.
    assert reserve_columns(outage(), 20.0) == {
        "hours_left": 3.0,
        "needed_pct": 50.0,
        "reserve_reason": None,
    }


def test_a_battery_that_went_below_the_mark_had_no_hours_left():
    columns = reserve_columns(outage(soc_end=15.0, soc_min=15.0), 20.0)
    assert columns["hours_left"] == 0.0
    assert columns["needed_pct"] == 85.0


def test_the_charge_needed_may_exceed_a_full_battery():
    columns = reserve_columns(outage(soc_start=90.0, soc_end=5.0), 20.0)
    assert columns["needed_pct"] == 105.0


def test_reserve_reasons_in_order():
    assert reserve_columns(outage(soc_end=None), 20.0)["reserve_reason"] == "no_soc"
    assert reserve_columns(outage(soc_start=None, ongoing=True), 20.0)["reserve_reason"] == "no_soc"
    assert reserve_columns(outage(ongoing=True), 20.0)["reserve_reason"] == "cut"
    assert reserve_columns(outage(started_before_window=True), 20.0)["reserve_reason"] == "cut"
    assert reserve_columns(outage(soc_end=80.0), 20.0)["reserve_reason"] == "no_net_discharge"
    assert reserve_columns(outage(soc_end=85.0), 20.0)["reserve_reason"] == "no_net_discharge"
    assert reserve_columns(outage(seconds=1799.0), 20.0)["reserve_reason"] == "too_short"
    assert reserve_columns(outage(soc_end=78.5), 20.0)["reserve_reason"] == "too_short"


def test_reserve_thresholds_are_inclusive():
    assert reserve_columns(outage(seconds=1800.0), 20.0)["reserve_reason"] is None
    assert reserve_columns(outage(soc_end=78.0), 20.0)["reserve_reason"] is None


def test_a_withheld_reserve_has_no_figures():
    columns = reserve_columns(outage(ongoing=True), 20.0)
    assert columns["hours_left"] is None and columns["needed_pct"] is None


def test_the_summary_names_the_hardest_outage_and_counts_the_covered():
    first = outage() | reserve_columns(outage(), 20.0)
    hard_raw = outage(start=at(600).isoformat(), soc_start=90.0, soc_end=10.0, soc_min=10.0)
    hard = hard_raw | reserve_columns(hard_raw, 20.0)
    unknown = outage(soc_min=None) | {"hours_left": None, "needed_pct": None, "reserve_reason": "cut"}
    assert reserve_summary([first, hard, unknown], 20.0) == {
        "worst_needed_pct": 100.0,
        "worst_start": at(600).isoformat(),
        "covered": 1,
        "judged": 2,
    }


def test_the_summary_without_figures():
    assert reserve_summary([], 20.0) == {
        "worst_needed_pct": None,
        "worst_start": None,
        "covered": 0,
        "judged": 0,
    }
```

Then add a payload test next to the existing `build_grid_payload` tests. Reuse the module's existing helper that builds a payload (the one at about line 48, which calls `build_grid_payload(series, **options)`) and a SoC `Series` built the way neighbouring tests build theirs; read them first and follow their shape. It must assert:

```python
    # without a SoC sensor: no reserve keys on episodes, an empty summary
    assert "hours_left" not in payload["episodes"][0]
    assert payload["reserve"] == {"worst_needed_pct": None, "worst_start": None, "covered": 0, "judged": 0}
    # with a SoC sensor: the three keys on every episode
    assert {"hours_left", "needed_pct", "reserve_reason"} <= set(payload_with_soc["episodes"][0])
```

- [ ] **Step 2: Run them to see them fail**

Run: `.venv/bin/pytest tests/test_grid.py -q`
Expected: ImportError for `reserve_columns`.

- [ ] **Step 3: Implement**

Near `AUTONOMY_MIN_HOURS` in `grid.py`:

```python
# Below either of these one outage's rate of discharge is noise: a state of
# charge moves in whole points, so two points in ten minutes is anything from
# six to eighteen points an hour.
RESERVE_MIN_SECONDS = 1800.0
RESERVE_MIN_DROP_PCT = 2.0
```

After `_battery_columns` (add `Mapping` to the `collections.abc` import):

```python
def reserve_columns(episode: Mapping[str, Any], low_pct: float) -> dict[str, Any]:
    """How much longer one outage could have run, and what it needed at the start.

    Read in points of charge at that outage's own rate, never multiplied out
    of a nameplate capacity. Withheld with the reason when the outage cannot
    say: no charge at one end, an outage the period cuts, one the sun covered,
    or one too short for its rate to mean anything.
    """
    start = episode.get("soc_start")
    end = episode.get("soc_end")
    withheld: dict[str, Any] = {"hours_left": None, "needed_pct": None}
    if start is None or end is None:
        return withheld | {"reserve_reason": "no_soc"}
    if episode["started_before_window"] or episode["ongoing"]:
        return withheld | {"reserve_reason": "cut"}
    drop = start - end
    if drop <= 0:
        return withheld | {"reserve_reason": "no_net_discharge"}
    if episode["seconds"] < RESERVE_MIN_SECONDS or drop < RESERVE_MIN_DROP_PCT:
        return withheld | {"reserve_reason": "too_short"}
    rate = drop / (episode["seconds"] / SECONDS_PER_HOUR)
    return {
        "hours_left": max(0.0, end - low_pct) / rate,
        "needed_pct": low_pct + drop,
        "reserve_reason": None,
    }


def reserve_summary(episodes: Sequence[Mapping[str, Any]], low_pct: float) -> dict[str, Any]:
    """The hardest outage of the period, and how many the battery covered."""
    figures = [item for item in episodes if item.get("needed_pct") is not None]
    worst = max(figures, key=lambda item: item["needed_pct"], default=None)
    judged = [item for item in episodes if item.get("soc_min") is not None]
    return {
        "worst_needed_pct": worst["needed_pct"] if worst else None,
        "worst_start": worst["start"] if worst else None,
        "covered": sum(1 for item in judged if item["soc_min"] >= low_pct),
        "judged": len(judged),
    }
```

In `build_grid_payload`, after `episodes` is built:

```python
    if soc is not None:
        episodes = [item | reserve_columns(item, low_pct) for item in episodes]
```

and in the returned dict, after `"autonomy"`:

```python
        "reserve": reserve_summary(episodes, low_pct),
```

- [ ] **Step 4: Run the tests**

Run: `.venv/bin/pytest tests/test_grid.py -q && .venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check .`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/analytics/grid.py tests/test_grid.py
git commit -m "feat: hours left and charge needed for every outage

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HjPyoP3CZ788fs56zNTuqC"
```

---

### Task 2: The reserve, on the Grid tab

**Files:**
- Modify: `frontend/src/types.ts` (`OutageEpisode`, `GridPayload`, new `ReserveReason`, `ReserveSummary`)
- Modify: `frontend/src/i18n/en.ts`, `frontend/src/i18n/uk.ts` (`grid` group)
- Modify: `frontend/src/tabs/grid-tab.ts` (`renderEpisodes`, new `renderReserve`, `render`)
- Modify: `README.md` (Grid section), `docs/superpowers/plans/2026-10-01-ukrainian.md` (glossary, if new terms)
- Modify (built): `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js`
- Test: `frontend/src/i18n/grid-sizing.test.ts`

**Interfaces:**
- Consumes: payload from Task 1 — episode keys `hours_left`, `needed_pct`, `reserve_reason`; `payload.reserve` = `{worst_needed_pct, worst_start, covered, judged}`.
- Produces: no exports beyond types.

- [ ] **Step 1: Types**

```ts
export type ReserveReason = "no_soc" | "cut" | "no_net_discharge" | "too_short";

export interface ReserveSummary {
  worst_needed_pct: number | null;
  worst_start: string | null;
  covered: number;
  judged: number;
}
```

`OutageEpisode` gains, under the SoC comment:

```ts
  hours_left?: number | null;
  needed_pct?: number | null;
  reserve_reason?: ReserveReason | null;
```

`GridPayload` gains `reserve: ReserveSummary;`.

- [ ] **Step 2: Dictionary — failing test first**

Add to `frontend/src/i18n/grid-sizing.test.ts`:

```ts
describe("the outage reserve", () => {
  it("reads in English", () => {
    expect(en.grid.hoursLeft).toBe("Hours left");
    expect(en.grid.neededAtStart).toBe("Needed at start");
    expect(en.grid.coveredOf({ covered: 5, judged: 6 })).toBe("5 of 6");
    expect(en.grid.hardestOutageOn({ date: "1 Oct" })).toBe("Outage of 1 Oct");
  });

  it("reads in Ukrainian", () => {
    expect(uk.grid.coveredOf({ covered: 5, judged: 6 })).toBe("5 з 6");
    expect(uk.grid.reserveReasons.no_net_discharge).not.toBe(en.grid.reserveReasons.no_net_discharge);
  });
});
```

Run `cd frontend && npx vitest run src/i18n/grid-sizing.test.ts` — fails.

Add to `en.grid` (exact English):

```ts
    hoursLeft: "Hours left",
    neededAtStart: "Needed at start",
    didNotLast: "did not last",
    moreThanFull: "more than a full battery",
    reserveReasons: {
      no_soc: "no charge data",
      cut: "cut by the period",
      no_net_discharge: "sun covered it",
      too_short: "too short to judge",
    },
    hardestOutageNeeds: "Hardest outage needs",
    hardestOutageOn: (p: { date: string }) => `Outage of ${p.date}`,
    noHardestOutage: "No outage long enough to judge",
    outagesCovered: "Outages covered",
    coveredOf: (p: { covered: number; judged: number }) => `${p.covered} of ${p.judged}`,
    coveredHint: (p: { level: string }) => `Never below ${p.level}`,
    reserveNote:
      "Hours left are read at each outage's own rate of discharge, and the charge needed is the low mark plus what that outage took. Both depend on the hour and the load: a daytime outage says little about a night one.",
```

And to `uk.grid` the Ukrainian per the glossary, e.g. «Ще витримала б», «Потрібно на старті», «не витримала», «більше за повну батарею», reasons «немає даних заряду» / «обрізане періодом» / «покрило сонце» / «закоротке для оцінки», «Найважче відключення потребує», `Відключення ${p.date}`, «Жодного відключення, достатньо довгого для оцінки», «Покрито відключень», `${p.covered} з ${p.judged}`, `Ні разу нижче ${p.level}`, and a faithful translation of `reserveNote`. Add new terms to the glossary.

- [ ] **Step 3: Table columns** in `renderEpisodes`, after the *At end* header/cell, inside the existing `payload.has_soc` branches:

```ts
// header
html`<th>${m.grid.hoursLeft}</th><th>${m.grid.neededAtStart}</th>`
// cells
html`<td>${this.renderHoursLeft(item)}</td><td>${this.renderNeeded(item)}</td>`
```

with helpers on the class:

```ts
  private reserveReason(item: OutageEpisode) {
    const reasons: Record<ReserveReason, string> = this.i18n.m.grid.reserveReasons;
    return html`<span class="hint">${reasons[item.reserve_reason ?? "no_soc"]}</span>`;
  }

  private renderHoursLeft(item: OutageEpisode) {
    if (item.hours_left === null || item.hours_left === undefined) return this.reserveReason(item);
    if (item.hours_left === 0) return html`<span class="low">${this.i18n.m.grid.didNotLast}</span>`;
    return formatHours(item.hours_left, this.i18n.locale);
  }

  private renderNeeded(item: OutageEpisode) {
    if (item.needed_pct === null || item.needed_pct === undefined) return this.reserveReason(item);
    const value = formatPercent(Math.min(item.needed_pct, 100) / 100, this.i18n.locale);
    return item.needed_pct > 100
      ? html`<span class="low">&gt; ${value}</span
          ><span class="hint">${this.i18n.m.grid.moreThanFull}</span>`
      : value;
  }
```

Check that `.hint` and `.low` already exist in the tab's styles (they are used by the episode table); reuse them.

- [ ] **Step 4: Summary cards** — a `renderReserve(reserve: ReserveSummary, lowPct: number)` method returning a `.cards` block with two cards, rendered in the Autonomy section right after `renderAutonomy(...)` and only when `payload.has_soc`:

```ts
  private renderReserve(reserve: ReserveSummary, lowPct: number) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const worst = reserve.worst_needed_pct;
    return html`
      <div class="cards">
        <div class="card">
          <span class="name">${m.grid.hardestOutageNeeds}</span>
          <span class="value"
            >${worst === null ? DASH : formatPercent(Math.min(worst, 100) / 100, locale)}</span
          >
          <span class="row"
            ><span
              >${reserve.worst_start === null
                ? m.grid.noHardestOutage
                : worst !== null && worst > 100
                  ? m.grid.moreThanFull
                  : m.grid.hardestOutageOn({
                      date: new Date(reserve.worst_start).toLocaleDateString(locale),
                    })}</span
            ></span
          >
        </div>
        <div class="card">
          <span class="name">${m.grid.outagesCovered}</span>
          <span class="value"
            >${reserve.judged === 0
              ? DASH
              : m.grid.coveredOf({ covered: reserve.covered, judged: reserve.judged })}</span
          >
          <span class="row"
            ><span>${m.grid.coveredHint({ level: formatPercent(lowPct / 100, locale) })}</span></span
          >
        </div>
      </div>
      <p class="note">${m.grid.reserveNote}</p>
    `;
  }
```

- [ ] **Step 5: README** — in the Grid tab bullet, add one sentence: for each outage, the hours the battery would still have lasted at that outage's rate and the charge it needed at the start, plus the hardest outage's need and how many outages the battery covered — all in points of charge, never from the nameplate.

- [ ] **Step 6: Verify, build, commit**

Run: `(cd frontend && npm run typecheck && npm run test && npm run build) && .venv/bin/pytest -q`
Expected: green; the built bundle contains `"Hours left"` (`grep -c "Hours left" custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` ≥ 1).

```bash
git add frontend README.md docs/superpowers/plans/2026-10-01-ukrainian.md custom_components/inverter_analytics/frontend/dist
git commit -m "feat: the outage reserve on the Grid tab

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HjPyoP3CZ788fs56zNTuqC"
```
