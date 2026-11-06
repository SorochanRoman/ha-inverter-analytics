# Battery time: three card layouts and a badge — design

## 1. Goal

The Battery time card (0.11.0, spec `2026-11-06-battery-time-card-design.md`)
works, but its single plain face is not liked. This change:

- gives the card three layouts, chosen in the editor: **ring**, **bar** and
  **tile**;
- adds a **badge** for the dashboard's badge row, with three styles: **full**,
  **ring** and **time**.

What the card knows does not change. The backend, the measured-capacity rule
and the arithmetic stay as the earlier spec has them, and so do the states
and their order. This is a change of look, not of what is computed. The
nameplate is still never multiplied by a SoC percentage.

The minimum Home Assistant version stays at **2024.11** (`hacs.json`).
Custom badges and `getGridOptions` are both available from there.

## 2. Shared logic

### 2.1 The controller

The card element currently does all of its own live-data plumbing:

- the power sample buffer, the sign, and the smoothing input;
- fetching the basis, refreshing it hourly, refetching it on reconnect when
  stale, and guarding against an entity change during a fetch;
- the gate that re-renders only when a watched entity changes, and the 20 s
  tick;
- the language subscription;
- the late-basis `notePower` in `willUpdate`.

All of this moves into one Lit `ReactiveController`,
`BatteryTimeController`, in `frontend/src/battery-time-controller.ts`. The
card and the badge each create one and only render.

- **Inputs.** The host forwards `setConfig(config)` and `setHass(hass)` to
  the controller.
- **`hass` stays a plain setter** on both hosts, never `@property`.
  Otherwise every state change in the house re-renders the host, and the
  gate is bypassed.
- **Lifecycle.**
  - `hostConnected` starts the timers and refetches a missing or stale
    basis, as the card's `connectedCallback` does today.
  - `hostDisconnected` clears the timers and the language subscription.
  - `hostUpdate` takes over the late-basis `notePower`.
- **Two hosts on one page.** The card and the badge each fetch their own
  basis. The backend's six-hour cache makes the second fetch cheap.

### 2.2 The view

`view(): BatteryTimeView` is never null. Everything a face needs comes out
of it already resolved and worded:

```ts
interface BatteryTimeView {
  state: CardState | { kind: "loading" };   // loading: no hass yet, or no basis yet
  soc: number | null;
  powerW: number | null;       // smoothed, sign-corrected
  chargeTo: number | null;
  dischargeTo: number | null;
  target: number | null;       // the target in the state's direction, if any
  eta: EtaParts | null;        // null when the state has no time
  tone: Tone;                  // §5
  word: string;                // one-word state label (§6)
  status: string;              // the status line, as the 0.11 card words it
  note: string | null;         // the reason or the basis error, worded; null when none
  m: CardMessages;
  locale: string;
}
```

- **What moves.** The current `describe()` and `joinRoles` in `card.ts`
  move into a pure function, `describeView(...)`, that produces `status`,
  `note` and `word`. No face words a reason itself.
- **Loading.** The `loading` state renders the face's frame with "—" in
  place of numbers, as the card does now before the basis arrives.

### 2.3 ETA parts

`formatEta` currently returns a single string with the clock time inside.
The faces need the duration and the arrival time separately, so the work is
split:

```ts
interface EtaParts {
  duration: string;      // "2 h 10 min", "45 min", "over 2 days"
  arrival: Date | null;  // now + rounded ETA for every ETA under 48 h (also under 1 h); null otherwise
  over2Days: boolean;
}
etaParts(minutes, now, m): EtaParts
```

- `formatEta` is rebuilt on top of `etaParts`. Its output stays the same,
  except that ETAs under 1 h now also get "(≈HH:MM)".
- The rounding rules and the boundaries stay as they are, and their tests
  stay.

### 2.4 Where the code goes

The new pure functions go in `frontend/src/battery-time-looks.ts`, because
`battery-time.ts` would otherwise pass 350 lines. They are:

- `etaParts`;
- `describeView`;
- `tone`;
- `batteryIcon`;
- `badgeText`;
- `gridOptions`;
- `cardSize`;
- `ringGeometry`.

## 3. The card

Config:

```yaml
type: custom:inverter-analytics-battery-time
layout: ring        # ring | bar | tile; default ring
entry_id: ...       # as before
charge_to: 85       # as before
discharge_to: 20    # as before
```

- **Config keys.** `setConfig` keeps `layout`, with any unknown value falling
  back to `ring`, alongside the three existing keys. `mergeEditorConfig`
  learns `layout`.
- **Existing test.** The test "keeps keys it does not own, such as Home
  Assistant's layout" is renamed and changed to use `grid_options`.
- **Layout select in the editor.** It is an `ha-form` select selector whose
  `options: [{value, label}]` are built from the dictionaries. The schema
  therefore becomes a function of `messages()`, called in `render()`, in
  place of the module constant `EDITOR_SCHEMA`, so the labels follow the
  language.

### Height budgets

Sections rows are 56 px tall with an 8 px gap, so n rows give
`56n + 8(n − 1)` px.

| Layout | Content (px, with 16 px padding top and bottom) | rows | min_rows | columns | `getCardSize()` |
|---|---|---|---|---|---|
| ring | 32 + ring 120 + 8 + time 30 + status 20 + 8 + pill 28 + note 20 = 266 → 5 rows (312) | 5 | 5 | 6 | 6 |
| bar | 32 + top row 32 + status 20 + 12 + battery 40 + scale 16 + note 20 = 172 → 3 rows (184) | 3 | 3 | 6 | 3 |
| tile | 32 + two lines 40 + 8 + bar 6 + note 20 = 106 → 2 rows (120) | 2 | 2 | 6 | 2 |

`gridOptions(layout)` and `cardSize(layout)` are pure functions. Both are
tested against this table.

### ring

- **Ring.** 120 px across, with a 10 px stroke. The track is drawn in
  `--divider-color`. The fill follows the SoC: an SVG `linearGradient` in
  bounding-box space (not a conic one), from the tone to the tone mixed
  40% with white, with round caps.
- **Ticks.** Short ticks mark the charge target, in
  `--primary-text-color`, and the discharge target at 50% opacity.
  `ringGeometry(soc, chargeTo, dischargeTo)` returns the dash and tick
  positions.
- **Centre.** The SoC, 34 px, in `--primary-text-color`. Under it, `word`
  in `--secondary-text-color`, next to a 10 px dot filled with the tone.
- **Below the ring.**
  - `eta.duration`, 26 px, or `status` in a state with no time;
  - "to 85% · ≈16:40" in `--secondary-text-color`, which drops the arrival
    when there is none;
  - a pill with an `mdi:arrow-up` or `mdi:arrow-down` icon in the tone and
    the power, its text in `--primary-text-color`, and its background the
    tone at 15%;
  - `note`, if any.
- **SVG accessibility.** The SVG carries `role="img"` and an `aria-label`
  with the full sentence: SoC, status and power.

### bar

- **Top row.** `eta.duration` (or `word`) on the left, 28 px. The power pill
  on the right.
- **Status.** `status` in `--secondary-text-color`.
- **Battery.** An outline 40 px tall with a terminal nub. The fill is the
  SoC in the tone gradient, with the SoC centred in `--primary-text-color`.
- **Marks.** Vertical marks at the discharge target (50% opacity) and the
  charge target, with their percentages below.
- **Note and accessibility.** `note`, if any. `role="img"` and an
  `aria-label`, as in ring.

### tile

- **Icon.** A 40 px round tile, its background the tone at 20%, holding an
  `ha-icon` with `batteryIcon(soc, charging)`:
  - charging: `mdi:battery-charging-outline` at 0–4%,
    `mdi:battery-charging-10` … `mdi:battery-charging-90` by tens, and
    `mdi:battery-charging-100` at 95% and above;
  - otherwise: `mdi:battery-outline` at 0–4%, `mdi:battery-10` …
    `mdi:battery-90`, and `mdi:battery` at 95% and above;
  - no SoC: `mdi:battery-unknown`.

  The icon is coloured with the tone.
- **Primary line.** "62% · 2 h 10 min", or "62% · idle" and the like. In
  `unmapped` / `unavailable` / `loading` it reads "— · —". Text is in
  `--primary-text-color`.
- **Secondary line.** "to 85% at 16:40 · ↑ 1.8 kW" in
  `--secondary-text-color`. The arrow is an `ha-icon`, not a glyph.
- **Bar.** A 6 px bar: the fill in the tone, with a tick at the charge
  target.
- **Note.** `note`, if any.

## 4. The badge

A new element, `inverter-analytics-battery-badge`, in the same card bundle.
It registers in `window.customBadges` with the same idempotent guard as
`customCards`:

```js
{ type: "inverter-analytics-battery-badge",
  name: "Battery time",
  description: "Battery charge and the time to its target, at the current power.",
  preview: true }
```

- **Wrapper.** No `ha-card` and no reliance on `ha-badge`, which Home
  Assistant loads lazily. The badge is a hand-rolled pill: 36 px tall,
  18 px radius, in `--ha-card-background` / `--card-background-color`, with
  a `--divider-color` border and text in `--primary-text-color`.
- **Static methods.** `getConfigElement()` and `getStubConfig()`, used by
  HA's badge element editor.
- **Tap.** Tap, Enter or Space fires
  `hass-more-info` with `detail: { entityId: soc_entity }`, `bubbles` and
  `composed`. The pill carries `role="button"`, `tabindex="0"`, and an
  `aria-label` holding the full sentence.

Config:

```yaml
type: custom:inverter-analytics-battery-badge
style: full         # full | ring | time; default full
entry_id: ...
charge_to: 85
discharge_to: 20
```

### Styles

`badgeText(view, style) → { primary, secondary? }` is pure. "Time" means the
duration in `full` and `ring`, and the arrival time in `time`.

- **full.** A 26 px tone-tinted circle with `batteryIcon`, then
  `"{soc}% · {duration}"`. In a state with no time, the duration becomes
  `word`. With no SoC it reads `"— · {word}"`.
- **ring.** A 28 px mini ring in the tone, with no number inside. Next to it
  sit two lines:
  - top, 11 px: `"{soc}% · to {target}%"`, or `"{soc}%"` when there is no
    target;
  - bottom: the duration, or `word`.
- **time.** A tone-tinted circle with an icon: `mdi:lightning-bolt` while
  charging, `mdi:arrow-down` while discharging, `batteryIcon` otherwise.
  The text is:
  - `"≈16:40"` when an arrival exists;
  - "over 2 days" when `eta.over2Days`;
  - `word` in a state with no time.
- **Editor.** Style, inverter, charge to and discharge to. It uses the same
  `ha-form` approach as the card, with a language-following schema, and
  `mergeEditorConfig`, which learns `style`.

## 5. Tone and colours

`tone(state): Tone` depends only on the state's kind.

| State | Tone |
|---|---|
| `charging` | `charge` |
| `discharging` | `discharge` |
| `at_floor` | `low` |
| `no_capacity` | by the sign of the smoothed power: `charge` above +idle, `discharge` below −idle, `rest` otherwise |
| `idle`, `at_limit`, `unmapped`, `unavailable`, `loading` | `rest` |

`cardState` already returns `at_floor` whenever SoC ≤ floor and the power is
below idle. A battery charging at 15% with a 20% floor is therefore
`charging`, and its tone is `charge`.

For `no_capacity`, the direction stays visible. Its `word` is "charging" or
"discharging", and its status reads "Charging to 85% · —", as in the 0.11
card.

Colours come from theme variables only:

| Tone | Variable |
|---|---|
| `charge` | `--success-color` |
| `discharge` | `--warning-color` |
| `low` | `--error-color` |
| `rest` | `--secondary-text-color` |

- **Tone is for fills, rings, icons, dots and tints only, never for text.**
  Text is always `--primary-text-color` or `--secondary-text-color`. HA's
  `--warning-color` (#ffa600) on white reads at about 1.9:1, which is not
  readable as text in the light theme.
- **Tints and gradients** use `color-mix(in srgb, …)`. Each such
  declaration comes after a plain `var(--tone)` one, so an older WebView
  that drops `color-mix` still gets a solid colour.
- **Themes.** Light and dark both work from the theme. There is no palette
  of our own.

## 6. Strings

New keys go in `card-en.ts` and `card-uk.ts`:

- layout and style names, for the editors;
- one-word state labels: charging, discharging, idle, at limit, at floor,
  and "—" for unmapped, unavailable and loading;
- "to {t}%";
- "at {time}";
- the badge's name and description;
- the accessible sentence template.

Ukrainian follows `docs/glossary-uk.md`.

## 7. Bundle

The card bundle loads on every dashboard. It stays free of ECharts and of
the panel dictionaries. It is about 39 KB today; the target is under 60 KB
raw.

## 8. Tests

- **Pure functions, in vitest.**
  - `etaParts` at the existing boundaries, plus an ETA under 1 h with an
    arrival;
  - `formatEta` still produces the same output;
  - `describeView` for every state, in both languages, including the basis
    error and loading;
  - `tone` for every state, and for `no_capacity` in both directions and at
    rest;
  - `batteryIcon` at 0, 4, 5, 94, 95 and 100, charging and not, and with no
    SoC;
  - `badgeText` for each style × each state, in both languages;
  - `gridOptions` and `cardSize` per layout, against the §3 table;
  - unknown layout and unknown style falling back to the defaults;
  - `mergeEditorConfig` with `layout` and `style`, and `grid_options` kept;
  - `ringGeometry` at 0, 50 and 100, with the ticks.
- **The controller, in vitest**, with a fake host (`addController`, a
  `requestUpdate` spy), fake timers and a stubbed `callWS`. Covers:
  - `setConfig` before `hass`;
  - an entity change during a fetch, where the stale result is discarded;
  - a stale refetch on `hostConnected`;
  - an unrelated `hass` not calling `requestUpdate`;
  - timers cleared on `hostDisconnected`;
  - the hourly refresh;
  - the 20 s tick.
- **Smoke check.** A one-off, manual check of the built bundle in headless
  Chrome, using the agent-browser skill or a throwaway script outside the
  repository, with a fake `hass`. It shows each layout and each badge style
  in en and uk, in the four tones, in both a light and a dark theme.
  Screenshots go in the report. This is evidence, not CI.

## 9. Docs

- **README.** The card section covers the three layouts, the badge and its
  three styles, with YAML examples.
- **`docs/known-gaps.md`.** One entry: the card and the badge each fetch
  the basis. A second entry: the layouts have not been checked by eye in a
  live Home Assistant until the author does so.
