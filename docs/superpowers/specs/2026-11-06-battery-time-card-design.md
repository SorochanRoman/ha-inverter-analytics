# Battery time card — design

## 1. Goal

A dashboard card, in the style of a portable power station's display, that
says how long until the battery reaches its charge target or its discharge
floor at the current battery power: "Charging to 85% · 2 h 10 min (≈16:40)".

It ships inside this integration (not a separate HACS repo), reuses the
user's role mapping, and adds no YAML configuration beyond two targets.

Out of scope: a power-flow / balance line, a "time left if the grid went down
now" figure while charging, forecasts of sun or load.

## 2. The capacity rule

The README rule stands: **the nameplate `battery_capacity` is never
multiplied by a SoC percentage.** The card uses the **measured** usable
capacity — the same arithmetic as the Health tab (`clean_discharge_hours`
and the formula in `capacity_by_month`: `100 × Σ discharge / Σ drop` over
clean hours) — but pooled over the **last 60 days** instead of per month,
so it is current and cheap to compute.

- At least `CLEAN_HOURS_MIN` (20) clean hours in the 60 days, or no figure:
  reason `too_few_clean_hours`, with the count found.
- Missing `battery_soc`, `battery_charge_total` or `battery_discharge_total`
  → no figure, reason `missing_roles` with the roles listed.
- No fallback to the nameplate, ever.

- The pooled arithmetic is one shared helper in `analytics/health.py`,
  `pooled_capacity(hours) -> tuple[float | None, int]` (kWh or None, clean
  hours counted), applying `CLEAN_HOURS_MIN` and `100 × Σ out / Σ drop`.
  `capacity_by_month` calls it per month, so the formula exists once.

## 3. Backend

New WebSocket command `inverter_analytics/battery_eta` in
`websocket_api.py`; the arithmetic lives in a new pure module
`analytics/battery_eta.py` that imports the Health helpers rather than
copying them.

Request: optional `entry_id` (defaults to the only entry; with several
entries and none given, an error asking for one). This is new: every other
command requires `entry_id`.

Response:

```
{
  "capacity_kwh": float | null,
  "capacity_reason": str | null,       # "too_few_clean_hours" | "missing_roles"
  "missing_roles": [str],              # the roles behind "missing_roles", else []
  "clean_hours": int,
  "clean_hours_min": 20,
  "window_days": 60,
  "computed_at": iso8601,
  "soc_entity": str | null,
  "battery_power_entity": str | null,
  "battery_power_inverted": bool,
  "idle_w": float,                     # battery_idle_w or its default
  "low_pct": float,                    # battery_low_pct or its default
}
```

- Reads 60 days of hourly LTS only (not the 5 years Health reads).
- Cached per entry for 6 hours in the entry's existing `ResultCache`
  (`domain_data[entry_id][DATA_CACHE]`), key `("battery_eta", entry_id)`.
  An options change reloads the entry, which drops its cache.

## 4. Frontend

A second bundle, `inverter-analytics-card.js`, in the same `frontend/dist/`,
without ECharts.

- **Build.** A second Vite config (`vite.card.config.ts`, library mode, entry
  `src/card.ts`, `emptyOutDir: false`), run after the panel build by
  `npm run build`. Two separate builds, not two entries in one: a
  multi-entry library build splits the shared `lit` into a chunk, which CI's
  "no untracked files in dist" check rejects, and the panel build's
  `emptyOutDir: true` must run first. dist then holds exactly the two files,
  and CI's existing diff check covers both.
- **Loading.** Served from the existing static path. `panel.py`'s
  fingerprint helper takes the file name, and the card URL carries its own
  fingerprint. Registered once per Home Assistant with
  `frontend.add_extra_js_url` behind a `hass.data` flag, as the panel is;
  removed with `frontend.remove_extra_js_url` when the last entry unloads.
- Registered in `window.customCards` as **Battery time** with a visual editor.

Card config:

```yaml
type: custom:inverter-analytics-battery-time
entry_id: ...            # optional, as in §3
charge_to: 85            # number (%) or an entity id; default 100
discharge_to: sensor.x   # number (%) or an entity id; default low_pct from §3
```

An entity target is read live from `hass.states` (works with a solarman
`number.*` if the inverter exposes it), so a seasonal limit change is picked
up at once.

Live data: SoC and battery power come from `hass.states` on every `hass`
update — no polling of the backend. The basis (§3) is fetched on load and
refreshed hourly. Battery power sign follows `battery_power_inverted`;
positive after correction = charging.

### Layout

- A ring showing SoC with the percentage in the centre.
- Below it one status line (§5) and the smoothed battery power, e.g. "1.8 kW".
- Language from the shared store in `i18n/lang.ts`: the panel's EN/UK
  choice if one was made, otherwise Home Assistant's language
  (`noteHaLanguage(hass.locale.language)` on every `hass`).
- Strings in two small dictionaries of their own, `i18n/card-en.ts` and
  `i18n/card-uk.ts` (typed: `card-uk.ts` satisfies the type of
  `card-en.ts`), not in `en.ts` / `uk.ts`: the card loads on every
  dashboard, and the panel dictionaries are about 100 KB.
- HA theme variables only; works in light and dark.

## 5. Arithmetic and states

Pure functions in `frontend/src/battery-time.ts`, unit-tested.

- **Smoothing.** Time-weighted mean of battery power over the last
  120 s, from the states the card has seen. On first render the buffer has
  one point — use it.
- **States, in order:**
  1. SoC or power entity not mapped → "—", "Map battery SoC and battery power
     in Inverter Analytics".
  2. SoC, power or an entity target `unavailable`/`unknown` → "—", which
     entity.
  3. SoC ≥ charge target and not discharging (`P > −idle_w`) → "At limit 85%",
     no time. Checked before idle: a battery sitting at its limit is idle,
     and "At limit" is the more useful word for it.
  4. SoC ≤ discharge target and not charging (`P < idle_w`) → "At floor 20%",
     no time.
  5. `|P| < idle_w` → "Idle", no time.
  6. `capacity_kwh` null → "—", reason; for `too_few_clean_hours`
     "Capacity not measured yet (12 of 20 clean hours)".
  7. Otherwise `t = capacity_kwh × (target − SoC) / 100 / |P_kW|`
     with the target matching the direction.
- **Formatting.** `< 1 h` → minutes; `< 48 h` → "h + min" rounded to 5 min
  plus the clock time of arrival "(≈16:40)"; `≥ 48 h` → "over 2 days"
  without a clock time.

SoC has 1% steps; the figure is an estimate at the current power, and the
card says "at current power" in the editor description, not on the face.

## 6. Tests

- pytest: `battery_eta` — enough / too few clean hours, missing roles,
  inverted power flag passed through, cache hit, multiple entries.
- pytest: `pooled_capacity`, and `capacity_by_month` unchanged through it.
- vitest: smoothing (uneven intervals, single point), every state in §5 in
  order, both directions, entity targets, formatting boundaries
  (59 min, 1 h, 47 h 55 min, 48 h).
- CI: the bundle check covers the card bundle too.

## 7. Docs

- README: a "Battery time card" section, including the capacity rule.
- `docs/known-gaps.md`: not verified live until checked on the author's HA
  against the inverter's own figures.
