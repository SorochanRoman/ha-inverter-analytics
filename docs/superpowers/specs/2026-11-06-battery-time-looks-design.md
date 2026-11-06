# Battery time: three card layouts and a badge — design

## 1. Goal

The Battery time card (0.11.0, spec `2026-11-06-battery-time-card-design.md`)
works, but its single plain face is not liked. This change:

- gives the card three layouts to choose from in the editor: **ring**,
  **bar** and **tile**;
- adds a **badge** for the dashboard's badge row, with three styles of its
  own: **full**, **ring** and **time**.

What the card knows does not change. The backend, the measured-capacity rule,
the states, their order and the arithmetic all stay as the earlier spec has
them; this is a change of look only. The nameplate is still never multiplied
by a SoC percentage.

## 2. Shared logic

The card element currently holds its live-data plumbing itself:

- the power sample buffer, the smoothing input and the sign;
- the basis fetch, its hourly refresh and the race guard;
- the watched-entities re-render gate and the 20 s tick;
- the language subscription.

These move into one Lit `ReactiveController`, `BatteryTimeController`, in
`frontend/src/battery-time-controller.ts`. It exposes:

- `view(): BatteryTimeView | null` — everything a face needs, already
  resolved:

  ```ts
  interface BatteryTimeView {
    state: CardState;          // from cardState, unchanged
    soc: number | null;
    powerW: number | null;     // smoothed, sign-corrected
    chargeTo: number | null;
    dischargeTo: number | null;
    etaText: string | null;    // formatEta result, null when the state has no time
    arrival: Date | null;      // now + rounded ETA when under 48 h, else null
    tone: Tone;                // §5
    m: CardMessages;
    locale: string;
  }
  ```

  `view()` returns `null` before the first `hass` arrives.
- `setConfig(config)` and `setHass(hass)`, for the host to forward to.

The card and the badge each create a controller and only render. Any helper
that a face needs and can be tested — the tone, the badge text, the grid
options, the ring geometry — is a pure function in `battery-time.ts`, or in a
new `battery-time-looks.ts` if `battery-time.ts` would grow past about
350 lines.

The behaviour moves without change, and so do the tests that pin it. The
controller adds one thing: when both the card and the badge are on one
dashboard, each keeps its own controller and fetches its own basis. The
backend's six-hour cache makes the second fetch cheap, so the two are not
shared.

## 3. The card

Config:

```yaml
type: custom:inverter-analytics-battery-time
layout: ring        # ring | bar | tile; default ring
entry_id: ...       # as before
charge_to: 85       # as before
discharge_to: 20    # as before
```

`setConfig` keeps `layout` (an unknown value falls back to `ring`) together
with the three existing keys. `mergeEditorConfig` learns `layout`. The editor
gets a select with the three layouts, labelled from the dictionaries.

### ring

- **Ring.** 160 px across, 12 px stroke. The track uses `--divider-color`;
  the fill is a gradient from the tone colour to a lighter shade of it,
  with round caps, and its length is the SoC.
- **Tick marks.** Two short marks sit on the ring: the charge target in
  `--primary-text-color`, and the discharge target at 50% opacity.
- **Centre.** The SoC at 40 px, with a one-word state label under it in the
  tone colour. The labels are: charging, discharging, idle, at limit,
  at floor, or "—".
- **Under the ring:**
  - the time at 26 px;
  - "to 85% · ≈16:40" in the secondary text colour;
  - a pill with the direction arrow and the power, tinted with the tone at
    15% opacity.
- **States with no time.** The time line becomes the state's sentence, and
  the pill still shows the power.

### bar

- **Top row.** The time on the left at 28 px, the power pill on the right.
- **Under it.** The status line: "charging to 85% · ≈16:40".
- **The bar.** A battery outline, 44 px tall, with a terminal nub on the
  right. The fill width is the SoC, in the tone gradient, with the SoC
  centred in the bar.
- **Marks.** Vertical marks at the discharge target (50% opacity) and the
  charge target, each with its percentage under the bar.

### tile

- **Icon.** 44 px round, background the tone at 20%. The `mdi` battery
  icon follows the SoC and the direction: `battery-charging-*` while
  charging, `battery-*` otherwise, in tens. It is rendered with `ha-icon`.
- **Text.** The primary line is "62% · 2 h 10 min" (or "62% · idle", and so
  on). The secondary line is "to 85% at 16:40 · ↑ 1.8 kW".
- **Bar.** A 6 px bar under the text, with the fill in the tone and a tick
  at the charge target.

### Common to all three layouts

- **Reasons.** The "—" reason lines (unmapped, unavailable, capacity not
  measured) render under each layout in the secondary text colour, as they
  do today.
- **Size.** `getCardSize()` returns 4 for ring, 2 for bar and 1 for tile.
- **Grid options.** `getGridOptions()`, used by sections dashboards, returns:

  | Layout | rows | columns | min_rows |
  |---|---|---|---|
  | ring | 4 | 6 | 4 |
  | bar | 2 | 6 | 2 |
  | tile | 1 | 6 | 1 |

  The function that picks these is pure and tested.

## 4. The badge

A new element, `inverter-analytics-battery-badge`. It ships in the same card
bundle and is registered in `window.customBadges`, using the same idempotent
guard as `customCards`:

```js
{ type: "inverter-analytics-battery-badge", name: "Battery time",
  description: "...", preview: true }
```

Custom badges need Home Assistant 2024.8 or later. `hacs.json`'s minimum
version is checked, and raised if it is lower.

Config:

```yaml
type: custom:inverter-analytics-battery-badge
style: full         # full | ring | time; default full
entry_id: ...
charge_to: 85
discharge_to: 20
```

The badge renders a pill: 36 px tall, an 18 px radius, the card background
and the divider border, matching HA's own badges.

- **full.** A 26 px tone-tinted circle with the battery `ha-icon`, then
  `"{soc}% · {time}"`. In a state with no time, the time is replaced by its
  short word: "idle", "at limit", "at floor" or "—".
- **ring.** A 26 px mini ring in the tone, with the SoC number inside. Next
  to it are two lines: a small "to {target}%", or the state word, above the
  time.
- **time.** A tone-tinted circle with ⚡ while charging, ↓ while discharging
  and the battery icon otherwise. Its text is:
  - "≈16:40" when the arrival is under 48 h;
  - "over 2 days" when it is 48 h or more;
  - the state word in states with no time.
- **Tap.** Tapping the badge fires `hass-more-info` for the SoC entity.
- **Editor.** `getConfigElement()` returns an editor with style, inverter,
  charge to and discharge to, built with the same `ha-form` approach and
  `mergeEditorConfig` as the card's.
- **Text.** The text for each style and state comes from a pure function,
  `badgeText(view, style)`, which returns `{ primary, secondary? }`. It is
  tested.

## 5. Tone and colours

`tone(state, soc, dischargeTo): Tone` is pure. `Tone` is one of `"charge"`,
`"discharge"`, `"rest"` or `"low"`:

| State | Tone |
|---|---|
| charging | `charge` |
| discharging and SoC above the discharge target | `discharge` |
| at floor, or SoC at or below the discharge target | `low` |
| idle, at limit, unmapped, unavailable, no capacity | `rest` |

The colours come from theme variables only, each with a fallback:

| Tone | Variable | Fallback |
|---|---|---|
| `charge` | `--success-color` | `#4caf50` |
| `discharge` | `--warning-color` | `#ff9800` |
| `low` | `--error-color` | `#f44336` |
| `rest` | `--secondary-text-color` | — |

Gradients and tints are built in CSS with `color-mix(in srgb, …)`, so a theme
that redefines the variables re-colours everything. Light and dark themes
work without a separate palette.

## 6. Strings

The new keys go in `card-en.ts` and `card-uk.ts`:

- the layout and style names for the editors;
- the one-word state labels;
- "to {t}%";
- "at {time}";
- the badge name and description.

Ukrainian follows `docs/glossary-uk.md`.

## 7. Bundle

The card bundle still loads on every dashboard. It must stay free of ECharts
and the panel dictionaries. It currently weighs about 39 KB; the target is
under 60 KB raw.

## 8. Tests

- Pure functions: `tone` for every state; `badgeText` for each style × each
  state, both languages; `gridOptions` per layout; layout and style fallback
  for unknown values; `mergeEditorConfig` with `layout` and `style`; the
  battery icon name by SoC and direction.
- The controller's moved behaviour keeps its existing tests. Where they lived
  in `card.ts` logic that is now in the controller, they move with it.
- A headless-Chrome smoke check of the built bundle with a fake `hass`: each
  layout and each badge style renders, in en and uk, and in each of the four
  tones. Record screenshots in the report.

## 9. Docs

- README card section: the three layouts, the badge and its three styles,
  with YAML examples.
- `docs/known-gaps.md`: the badge needs Home Assistant 2024.8 or later. The
  card and the badge each fetch the basis.
