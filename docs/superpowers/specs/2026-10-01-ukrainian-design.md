# Ukrainian language — design

## 1. Goal

The panel's explanations — "How the verdicts are read", the notes under every
chart, the reasons a figure is withheld — carry most of what the integration
has to say, and today they exist only in English. This adds Ukrainian:

- **the whole panel**: tab names, headings, cards, badges, warnings, the
  explanatory notes, chart axes and legends, error messages;
- **the integration's own forms**: the setup wizard, Reconfigure, Options and
  the Repairs issues, through `translations/uk.json`.

English stays the reference language. Every string that exists in English
must exist in Ukrainian, and the build says so when one does not.

## 2. Choosing the language

The panel and the forms are chosen differently, because Home Assistant owns
one and we own the other.

**Forms.** Home Assistant picks `uk.json` itself when the user's profile
language is Ukrainian. Nothing to build beyond the file.

**Panel.** A segmented `EN | UK` switch in the panel header, next to the
period buttons and styled like them. The choice is stored in the browser's
`localStorage` under `inverter-analytics.lang`. The language in force is:

1. the stored choice, if there is one and it is `"en"` or `"uk"`;
2. otherwise `"uk"` when `hass.locale.language` starts with `uk`, else `"en"`.

So a user whose Home Assistant is already in Ukrainian sees a Ukrainian panel
without touching the switch. Storage access is wrapped in `try/catch`: when
the browser refuses it, the panel falls back to rule 2 and the switch still
works for the session.

## 3. The dictionaries

All under `frontend/src/i18n/`.

- `en.ts` — `export const en = { ... }`, grouped by where the text appears:
  `common`, `panel`, `load`, `battery`, `seasonality`, `balance`, `grid`,
  `sizing`, `charts`, `roles`, `features`, `errors`, `units`.
- `uk.ts` — `export const uk: Messages = { ... }`, with
  `export type Messages = typeof en` (structurally, with function values
  widened to their signatures). A missing key or a function with the wrong
  parameters fails `npm run typecheck`, which CI already runs.
- `lang.ts` — the store: `currentLang()`, `setLang(lang)`, `messages()`,
  `subscribe(listener)`, and the resolution rules of §2.
- `controller.ts` — `I18nController`, a Lit `ReactiveController`. A
  component creates one (`private i18n = new I18nController(this)`), reads
  `this.i18n.m` and `this.i18n.locale` in `render()`, and is re-rendered when
  the language changes. No property is threaded through the component tree.

**Plain strings** stay strings. **Sentences with values** are functions of
named parameters, so each language orders and inflects them itself rather
than gluing English fragments around a number:

```ts
// en
batteryRule: (p: { full: string; low: string; share: string }) =>
  `Counted over days with data: short when the battery filled to ${p.full} …`,
// uk
batteryRule: (p) => `Рахується за днями з даними: замало, коли батарея заряджалася до ${p.full} …`,
```

**Plurals** go through `Intl.PluralRules` via a helper
`plural(lang, n, { one, few, many, other })`; Ukrainian needs `few` and
`many` ("1 день / 2 дні / 5 днів"), English uses `one`/`other`.

**Pure functions** — `charts/options.ts`, `roles.ts`, `range.ts`,
`describeError` in `format.ts` — take `m: Messages` (and the locale where
they format numbers) as an argument instead of reading the store, so their
tests call them with both dictionaries.

## 4. Numbers, dates and units

`Intl` formatting takes its locale from the controller:

- panel in Ukrainian → `"uk"`: "1,5 кВт·год", "12 вер.";
- panel in English → `hass.locale.language`, exactly as today, so a user on
  `en-GB` or `de` sees no change.

Units (W, kW, kWh, "% of rated") come from `m.units`; Ukrainian uses Вт, кВт,
кВт·год.

## 5. Text that comes from the backend

The backend sends keys, not prose, with two exceptions, both handled on the
frontend without changing Python:

- `feature.label` in the config payload — the panel names a feature from
  `m.features[feature.key]` and falls back to the label it was sent;
- error messages — `describeError` maps the error code (`not_found`,
  `invalid_window`, …) to `m.errors[code]` and falls back to the message.

## 6. Role names and the forms

`ROLE_LABELS` deliberately equal the field labels in the setup form, so that
"map Battery state of charge" points at a field that exists under that name.
The Ukrainian role names are copied verbatim from `uk.json`, and a test keeps
both pairs equal: `m.roles` in `en.ts` against `en.json`, and in `uk.ts`
against `uk.json`.

**Known limitation.** The panel language and the form language are chosen
independently (§2). A user with the panel in Ukrainian and Home Assistant in
English is told the Ukrainian field name and finds the English one in the
form. Not worked around; noted in `docs/known-gaps.md`.

## 7. `uk.json`

A full translation of `en.json`: every step, field label, field description,
menu option, abort reason and issue. Placeholders (`{found}`,
`{no_statistics}`, …) are kept unchanged.

`tests/test_translations.py` gains a check that runs over both files: the
same nested key set, and the same placeholders in every string. The existing
schema checks stay on `en.json`; key parity carries them to `uk.json`.

## 8. Translation quality

- Ukrainian technical vocabulary as Home Assistant's own Ukrainian
  translation uses it where it has a term (Енергія, Мережа, Батарея,
  Сонячна генерація), so the panel reads like the rest of the UI.
- Verdicts: Enough / Borderline / Short → **Достатньо / На межі / Замало**.
- Sentences are translated, not mapped word for word; the meaning of each
  rule sentence must match what the code computes, as the English one does.
- Product name stays "Inverter Analytics"; sensor entity IDs and `code`
  fragments stay as they are.

## 9. Tests

- `typecheck` — completeness and parameter shapes of `uk.ts` (§3).
- `i18n/lang.test.ts` — resolution: stored choice wins; `uk-UA` and `uk`
  resolve to Ukrainian without a stored choice; anything else to English; a
  throwing `localStorage` falls back without error.
- `i18n/plural.test.ts` — 1, 2, 5, 11, 21, 22 in Ukrainian; 1 and 2 in
  English.
- `i18n/messages.test.ts` — no Ukrainian string is empty or equal to its
  English one, except an explicit allow-list (units shared by both, product
  name); every function renders without `undefined` for sample parameters.
- `i18n/roles.test.ts` — role names equal the form labels in `en.json` /
  `uk.json` (§6).
- Existing tests for `options.ts`, `roles.ts`, `range.ts`, `format.ts` are
  updated to pass `en` and gain a Ukrainian case each.
- Python: key and placeholder parity of `uk.json` (§7).

## 10. Order of work

1. The mechanism: `i18n/` modules, the controller, the switch in the header,
   the panel's own strings. English output is unchanged byte for byte.
2. Move every tab's and section's strings into `en.ts`, one tab at a time;
   still English only, so each step is reviewable as a pure refactor.
3. Write `uk.ts`. Typecheck guides it to completion.
4. Write `uk.json` and the Python parity test.
5. Rebuild `dist`, check both languages in a running Home Assistant.

## 11. Out of scope

- A third language. The structure allows one; nobody has asked.
- Translating the README and the docs — they stay English.
- The Health tab, which is being designed separately; once this lands, its
  strings go into the dictionaries like everything else.
