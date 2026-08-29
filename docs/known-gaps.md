# Known gaps

What is verified, what is not, and what the next tabs will have to change.
This is not a wish list — it records what was deliberately left out and what
has not been proven, so the next plan is written with open eyes instead of
discovering it mid-flight.

## 1. Verified in a live Home Assistant

Three rounds of work have been brought up against a real HA 2025.1.4 instance
(Python 3.12) with `recorder`, the real config flow and real sensors.

**Core analytics.** The integration loads with no errors; the bundle is served
as `text/javascript`; the sidebar item appears; the Load tab renders KPIs, the
histogram, the duration curve, the rated-power bands and the overload table;
switching period refetches and the precision badge changes from "Mixed since
<date>" to "Exact data"; the watts/percent toggle rebuilds the axis.

**Detection and the wizard.** Discovery offered "Deye — 7 sensors" and the
confirm step arrived pre-filled with the total load, all three phases *in
order*, both PV strings and the battery state of charge, with no manual typing.

**Phase and string analytics.** The payload carries `load_l1`/`load_l2`/
`load_l3` and `pv_s1`/`pv_s2` with their own coverage; the per-phase shares sum
to one; the Phases section renders the cards, the derived-rating note, the
aligned-coverage warning, the three imbalance figures and the distribution with
buckets above the threshold in the overload colour; the PV comparison renders
its cards and a labelled mean-versus-peak chart. No errors from our bundle in
the browser console.

**An entry stored in the pre-multi-entity shape still loads.** The instance
holds one from an earlier round with `"load_power": "sensor.…"` as a bare
string; it renders normally beside a new one.

## 2. What the live runs exposed

Each of these shipped green: typecheck, unit tests and build all passed, and
the defect was only visible on screen.

1. **`ReferenceError: process is not defined`** — the panel did not render at
   all. Vite in library mode does not substitute `process.env.NODE_ENV`, and
   ECharts depends on it. vitest runs under Node, where `process` exists.
2. **Median 9.1 kW beside a peak of 9.0 kW.** `percentile` interpolates to the
   bucket edge and could exceed the true maximum. Percentiles are clamped.
3. **The duration curve had the same overshoot** — the same contradiction moved
   from card-versus-card to card-versus-chart. The curve is clamped too.
4. **"Data missing 100% of the time" beside populated KPIs.** Rounding 99.99%
   up to a flat hundred read as "there is no data".
5. **Chart axis labels kept the previous theme's colours** and vanished on a
   light background. The tab rebuilds options when HA rewrites its CSS
   variables.
6. **"Covers 0% of the period" on every phase and string card** — item 4 in
   mirror image, in new code that formatted the share directly instead of going
   through the helper written for exactly this. `formatCoverage` never rounds a
   real measurement down to nothing.
7. **The inverter dropdown named the wrong inverter after a reload.** Lit
   assigns properties before the children exist, so `.value` on a `<select>`
   landed on an empty element and the browser fell back to the first entry: one
   inverter's data under another's name. Bound with `?selected` on the option.
8. **The chart legend never rendered.** ECharts is tree-shaken and *silently*
   ignores an option whose component was not registered, so the string
   comparison drew two unlabelled colours — while a unit test asserted
   `legend.data` was present and passed. Every option builder is now checked
   against the set of keys the registered components can render.

## 3. Still unverified

- **Installation through HACS.** The integration was copied into the config
  directory directly.
- **HACS validation in CI runs only for `main`.** It checks repository
  metadata — licence, description, topics — which GitHub exposes from the
  default branch only, so on a feature branch those checks measure nothing.
  `hassfest` runs everywhere, because it validates the manifest, which is code.
- **Real long-term statistics.** The hybrid raw+LTS path is correct by code and
  by tests, but the live database held minutes of history, so the LTS branch
  has never run against genuine hourly data. Per-entity precision is proven by
  unit test with the recorder mocked, not by a real sensor lacking a
  `state_class`.
- **Imbalance episodes and the load floor, on screen.** Both are covered by
  unit tests with hand-built data, and the live run produced neither: its
  samples were four seconds apart, below the sixty-second episode floor, and
  every value was above the load floor. The episode table has only ever
  rendered its empty state.
- **Whether a typical load sensor carries `state_class` at all.** Without it
  there is no LTS, and a 30-day window on a 10-day recorder will honestly
  report roughly 33% coverage — which a user is likely to read as a bug.
- **The sidebar item appearing without a browser reload.**
- **Switching themes through the HA profile UI.** Verified by substituting the
  CSS variables, which reproduces the mechanism but not the interface.
- **Date formatting follows the Home Assistant language**, so an English
  interface on a Ukrainian HA shows Ukrainian dates. This is deliberate:
  numbers and dates belong to the reader's locale even when the strings are
  English. HA's explicit `date_format` and `time_format` preferences are
  ignored — only `language` is read.

## 4. Seams to widen before the next tabs

- **`ws_load` is roughly 30 lines of boilerplate** — entry lookup, window
  validation, clamping, cache, merge. Extract it when the second command lands,
  not before.
- **Cross-role phase counts are unvalidated.** `load_power_phase` and
  `grid_power_phase` may hold different numbers of entities. Nothing combines
  them yet, so nothing is wrong today; the Balance tab is where that stops
  being true.
- **No preset produces a `grid_power` total**, only per-phase parts. A
  three-phase Solarman user therefore has grid data as parts alone, so the
  balance work will have to sum there with no vendor total to prefer — the
  first place the "total wins" rule has nothing to apply to.

## 5. Deliberately deferred

**Tabs.** Battery, Seasonality and Energy balance are placeholders.

**Detection breadth.** The patterns were read off a live StephanJoubert
Solarman instance. Other vendors fall back to manual mapping. A shared name
prefix can still group a fraction of an installation — five battery sensors of
a `deye2_*` install clear the prefix floor on their own — but such a candidate
is now labelled "no load sensor found" rather than looking recognised.

**Style and robustness in pure code.** `duration_histogram` rebuilds its dict
per call; `Histogram.buckets()` allocates on each access; the deliberately
unreachable guard in hour bucketing is kept as documentation of the termination
invariant. `align()`'s window intersection cannot change its result — the gap
rule already covers it — and is documented as a narrowing, not a guarantee, so
that no test pretends to cover it.

**Test harness.** The swallowed `SocketBlockedError` during frontend setup, and
the global `ThreadedResolver` substitution in `conftest.py`. Both are
documented at the site with their reasoning.

**Frontend component tests.** There is no DOM environment in the suite, so
panel and section components are not rendered by any test. Logic that would
otherwise be untestable — `singleFlight`, `parseLocation`/`buildLocation`,
`formatCoverage`, the chart option builders — lives in its own modules and is
covered there. What remains uncovered is the wiring between them, which is why
the live run keeps finding what it finds.

## 6. What the phase work left behind

Written from reviewing the finished code rather than its spec.

- **`Ambiguity` is now genuinely multi-question** — each carries the field it is
  asked through, and each answer applies to its own role — but only one
  ambiguity is ever produced, so the second question has never existed outside
  a test.
- **Phase identity is read from the entity id**, and falls back to position when
  the name reveals nothing, labelling that case "Phase 2" without claiming
  which phase the hardware calls it. A repeated index drops the whole role to
  positional naming. What is *not* handled: a name whose number means something
  else entirely, which would be read as a phase index.
- **The derived per-phase rating divides by the highest phase index mapped**,
  so mapping L1 and L3 divides by three rather than two. If the hardware really
  has more phases than the highest one mapped, the figure is still optimistic.
- **`build_parts_summary` computes shares over the aligned timeline**, so they
  sum to one — but they are shares of the time every part had data at once, not
  of the whole window. The section says so; the numbers do not carry it.
