# Known gaps after phases 1-3

Compiled from the final review of `feat/core-analytics` and from running the
integration in a live Home Assistant. This is not a wish list — it records what
was deliberately left out and what has not been proven, so that the next plans
are written with open eyes instead of discovering it mid-flight.

## 1. Verified in a live Home Assistant

The panel was brought up against a real HA 2025.1.4 instance (Python 3.12) with
`recorder`, the real config flow, and a load-power sensor. Proven:

- the integration loads (`state: loaded`) with no errors in the log;
- the bundle is served: HTTP 200, `text/javascript`;
- the setup wizard offers all 17 fields and creates an entry;
- the "Inverter Analytics" item appears in the sidebar with its icon;
- the tab renders in full: KPIs, histogram, load duration curve, rated-power
  bands with `100+` in the overload colour, and the overload episode table;
- switching the period refetches; the precision badge correctly changes from
  "Mixed since <date>" over 30 days to "Exact data" over 7 days;
- the watts/percent toggle rebuilds the axis;
- tab and period survive a page reload (`?range=7d`);
- `hassfest` and `integration_manifest` pass in CI.

**Five defects that no test caught were found and fixed** — see section 2.

## 2. What the live run exposed

1. **`ReferenceError: process is not defined` — the panel did not render at
   all.** Vite in library mode deliberately does not substitute
   `process.env.NODE_ENV`, and ECharts depends on it. Typecheck, 29 tests and
   the build were all green at the time: vitest runs under Node, where
   `process` exists. Fixed with `define` in `vite.config.ts`.
2. **Median 9.1 kW displayed next to a peak of 9.0 kW.** `percentile`
   interpolates to the bucket edge and could exceed the true maximum, putting
   two self-contradictory numbers in one row of cards. Percentiles are now
   clamped to the observed range.
3. **The load duration curve had the same overshoot.** Its leftmost point drew
   a peak above the one the KPI card reported — the same contradiction moved
   from card-versus-card to card-versus-chart. The curve is clamped too.
4. **"Data missing 100% of the time" next to populated KPIs.** Rounding 99.99% up to
   a flat hundred read as "there is no data", contradicting the numbers beside
   it. The warning now states how much data there *is*.
5. **Chart axis labels kept the previous theme's colours.** After switching to
   the light theme, light grey text on white simply vanished. The tab now
   rebuilds chart options when Home Assistant rewrites its CSS variables.

## 3. Still unverified

- **Installation through HACS.** The integration was copied into the config
  directory directly.
- **HACS validation in CI runs only for `main`.** It checks repository
  metadata — licence, description, topics — and GitHub exposes those from the
  default branch only. On a feature branch those checks measure nothing and
  cannot be fixed by a commit to that branch. `hassfest` runs everywhere,
  because it validates the manifest, which is code.
- **Real long-term statistics.** The hybrid raw+LTS path is correct by code and
  by tests, but the live database held only minutes of history, so the LTS
  branch never ran against genuine hourly data.
- **Whether a typical load sensor carries `state_class` at all.** Without it
  there is no LTS, and a 30-day window on a 10-day recorder will honestly
  report roughly 33% coverage — which a user is likely to read as a bug.
- **The sidebar item appearing without a browser reload.** The page was
  reloaded every time.
- **Switching themes through the HA profile UI.** Verified by substituting the
  CSS variables, which reproduces the mechanism but not the interface.
- **Date formatting follows the Home Assistant language, not our strings**, so
  an English interface shows "8/19/2026" beside Ukrainian text. A consequence
  of localisation being deferred.

## 4. Seams to widen before the next tabs

- **`source.py` handles one entity at a time.** `async_series` takes a single
  `entity_id`. The Balance tab needs six energy sensors over one window, which
  would mean six separate executor round trips, even though
  `statistics_during_period` already accepts a set of ids. Widen it *before*
  the balance plan, not after.
- **`precision` / `coverage` / `boundary` are flat, per-payload fields.**
  Correct for a single-series tab. For Battery (SoC plus power) or Balance (six
  sensors) a single `precision` becomes a lie: a sensor without `state_class`
  has no long-term statistics at all, so two series over the same window
  genuinely differ in provenance and in coverage. The next plan should be
  written against a per-series contract rather than inheriting this one.
- **`ws_load` is roughly 30 lines of boilerplate** — entry lookup, window
  validation, clamping, cache, merge. Extract it when the second command lands,
  not before.

## 5. Parked findings from the final fix wave

Both were introduced by the fixes themselves; neither corrupts state.

- **A duplicate `fetchConfig()` on an ordinary panel mount.** Home Assistant
  assigns `hass` before `connectedCallback`, so both the guard and `willUpdate`
  fire. Both calls write the same data and `entryId ??=` is a no-op on the
  second. Curable with a request counter in the style of `load-tab.ts`.
- **A double integration reload when an inverter is renamed.** The title update
  and the options update each wake the listener. Serialised by `setup_lock`;
  only happens on rename.

## 6. Deliberately deferred

**Test coverage gaps.** End-to-end assertion of `inverted` in the wizard; the
options form pre-fill; key reordering in `ResultCache.set`; the `<=` expiry
boundary; `max_entries < 0`; the `fraction_above_80pct` denominator under
partial coverage; WebSocket registration idempotency across two entries; the
boundary at exactly `MAX_WINDOW_DAYS`; `end` in the month/30d `resolveRange`
tests; LTS and MIXED against a live recorder. All of this is logic that was
verified by hand but is not pinned by a test. Separately: **three of the four
`describeError` tests would have passed before the fix** — only the
HA-shaped-object case discriminates.

**Style and robustness in pure code.** Inconsistent validation in
`EntryConfig.from_dict`; a bare `KeyError` from `has()`; `Series` can be
constructed around `Series.of()` and lose its sort invariant; no runtime check
that datetimes are timezone-aware; an unreachable branch in `percentile`;
`duration_curve` rebuilding buckets per point; seven linear scans for the
bands; the deliberately unreachable guard in hour bucketing, kept as
documentation of the termination invariant.

**Test harness.** The swallowed `SocketBlockedError` during frontend setup, and
the global `ThreadedResolver` substitution in `conftest.py`. Both are
documented at the site with their reasoning.

**Confirm the intent.** `replaceState` means the Back button does not undo a
tab switch. `entryId` is not in the URL, so a reload with several inverters
configured silently reverts to the first.
