# TypeScript comment translation report (Ukrainian -> English)

Scope: `frontend/src/**/*.ts` and `frontend/vite.config.ts`. Only comments
(`//`, `/* */`, `/** */`) were touched; no identifiers, strings, types, or
structure were changed.

## Files touched

- `frontend/vite.config.ts` — block comment explaining why `process.env.NODE_ENV`
  is defined for library-mode Vite (ECharts otherwise throws
  `ReferenceError: process is not defined` at runtime in Home Assistant, a
  failure invisible to typecheck/tests/build since vitest runs under Node).
- `frontend/src/panel.ts` — comment in `willUpdate` about `hass` arriving after
  `connectedCallback` and the retry condition.
- `frontend/src/theme.ts` — JSDoc on `SERIES`, JSDoc on `chartBaseOption`
  (why `base`/`axis` are returned separately), and the comment about theme
  variables being optional in DOM-less test environments.
- `frontend/src/format.ts` — JSDoc on `describeError` (HA error shape) and the
  multi-line JSDoc on `coverageWarning` explaining the "data present" framing
  and the 30-day/two-minute rounding bug.
- `frontend/src/format.test.ts` — inline comment in the "avoids a bogus 100%"
  test referencing the same rounding bug.
- `frontend/src/range.ts` — comment on minute-quantisation of the window end,
  explaining the server-side cache-key collision problem.
- `frontend/src/charts/options.ts` — comment in `bandsOption` about ECharts
  drawing category axes bottom-up.
- `frontend/src/charts/options.test.ts` — inline comment on band-index-after-reversal
  in the "paints the overload band" test.
- `frontend/src/tabs/load-tab.ts` — comment in `connectedCallback` about the
  `MutationObserver` on `document.documentElement` and stale theme colours,
  and the comment in `load()` about the request-counter guarding against
  stale/out-of-order responses.

Files checked and found to already be Ukrainian-free (read in full to confirm,
no edits needed): `frontend/src/charts/echart.ts`, `frontend/src/api.ts`,
`frontend/src/types.ts`, `frontend/src/range.test.ts`.

## Ambiguous comments and how they were resolved

- `theme.ts` JSDoc on `chartBaseOption`: the source comment only says the axis
  styles must be "mixed into" the per-chart axis config rather than "erased"
  by it — it does not itself mention an earlier draft or a dark-mode
  regression (that context was given in the task brief, not in the code).
  Translated faithfully to what the comment actually says: returning `base`
  and `axis` separately so each chart's own axis definition can merge with
  the shared axis styling instead of overwriting it. I did not invent or add
  the "earlier draft losing colours in dark mode" narrative since it isn't in
  the source comment.
- `load-tab.ts` `load()` comment: the Ukrainian text says the response
  "becomes stale and must not be shown" once a newer request has been
  started; it doesn't spell out the specific "older response overwrites a
  newer one under the new period's heading" scenario from the task brief.
  Translated what's actually written rather than substituting the brief's
  more detailed framing, to avoid drifting from the original author's wording.

No other ambiguity — all other comments had a single natural reading.

## Stale/suspect comments noticed while reading (not fixed, per instructions)

- None found. Every comment I translated still accurately describes the code
  next to it (verified against current logic: `resolveRange`'s minute
  quantisation, `coverageWarning`'s thresholds, `bandsOption`'s reversal,
  `load()`'s request-id guard, and the `MutationObserver` on `style` changes
  in `load-tab.ts` all match their comments).

## Ukrainian string literals found

None. `grep -rnE '[а-яіїєґА-ЯІЇЄҐ]' frontend/src frontend/vite.config.ts`
returned no matches after the edits — confirming no Ukrainian string literals
were left behind either (there were none in the flagged files to begin with;
all Ukrainian text found was in comments/JSDoc).

## Verification

- `grep -rnE '[а-яіїєґА-ЯІЇЄҐ]' frontend/src frontend/vite.config.ts` — no output.
- `npm run typecheck` — clean, no errors.
- `npm run test` — 3 test files, 33 tests, all passed.
