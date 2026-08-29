# Inverter Analytics — Design Spec

**Date:** 2026-08-29
**Status:** approved, ready for implementation planning

## 1. Goal

A Home Assistant plugin that adds a dedicated analytics page for a hybrid inverter and battery. It answers questions the stock HA graphs don't:

- What is the real average inverter load, and what does its distribution look like?
- What percentage of time does the inverter run at each power level (in watts and as % of rated power)?
- How do these values change by month, day of week, hour of day?
- How is the battery being used: SoC distribution, how often and how deeply it dips, how many cycles has it done?
- Where does the energy go: self-consumption, self-sufficiency, grid outages?

## 2. Delivery form

HACS integration `inverter_analytics`: a Python backend + a custom sidebar panel with a bundled JS frontend.

Alternatives considered:

| Option | Why rejected |
|---|---|
| Frontend only (`panel_custom`, no Python) | Manual YAML configuration; ~80k raw data points per sensor would have to be pulled into the browser; no config flow with presets |
| Hybrid (Python only for config, calculations in the browser) | Keeps the main downside — heavy computation and large traffic on every page load |

The chosen option keeps computation on the server and exposes only aggregates (kilobytes) to the outside world, provides a proper setup UI, and installs as a single package.

## 3. Package structure

```
custom_components/inverter_analytics/
  __init__.py          # setup entry, panel registration + WS API
  manifest.json
  const.py
  config_flow.py       # presets, entity mapping, options flow
  presets.py           # entity_id patterns by brand
  roles.py             # canonical list of roles + validation
  websocket_api.py     # WS commands
  analytics/
    __init__.py
    source.py          # data access: raw states vs LTS
    resample.py        # time-weighted math
    load.py
    battery.py
    seasonal.py
    balance.py
    cache.py
  frontend/dist/inverter-analytics-panel.js
  translations/{en,uk}.json
frontend/               # panel source (Lit + TypeScript), built with Vite
docs/superpowers/specs/
```

The panel's source lives in `frontend/` at the repo root; Vite builds it into a single file, `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js`, which is what gets committed to the repo (HACS only installs `custom_components/`). Charts use ECharts with tree-shaking (line, bar, heatmap, boxplot, sankey), ≈120 KB gzipped. A dedicated bundle rather than HA's internal bundle, so that HA updates don't break the panel.

## 4. Roles and presets

The plugin works with **roles**, not specific sensors. The user provides the role → entity mapping.

| Role | Type | Unit | Required |
|---|---|---|---|
| `load_power` | entity | W | yes |
| `rated_power` | number in config | W | yes |
| `pv_power` | entity | W | no |
| `battery_power` | entity | W | no |
| `grid_power` | entity | W | no |
| `battery_soc` | entity | % | no |
| `battery_capacity` | number in config | kWh | no |
| `grid_connected` | entity (binary) | — | no |
| `pv_energy_total`, `load_energy_total`, `battery_charge_total`, `battery_discharge_total`, `grid_import_total`, `grid_export_total` | entity | kWh | no |

Rated inverter power and battery capacity are numbers in the config, not sensors: they're static characteristics of the hardware.

Every power role has an `invert` flag, because the sign convention for `battery_power` and `grid_power` is opposite across manufacturers.

`presets.py` is a dictionary of `brand → {role: [entity_id patterns]}`. Presets exist for: Deye/Sunsynk (solarman), Deye/Sunsynk (Solar Assistant), Victron, Growatt, Solax, GoodWe, Huawei, "Manual". A preset **only pre-fills the form** — it never blocks or fails if no match is found.

## 5. Data access

One interface, two backends:

- **`RawStateSource`** — `recorder.history` on the recorder's executor thread. Exact step functions.
- **`StatisticsSource`** — `statistics_during_period` with `mean/min/max/sum`, at `hour`/`day`/`month` granularity.

The choice is automatic. On startup we determine the actual depth of raw history available (the oldest row in `states`). If the requested window fits — use raw. If not — use LTS. If the window straddles the boundary — a hybrid calculation, with the response carrying `precision: "mixed"` and the boundary timestamp; the UI draws a vertical line with an explanation: "left of this line — hourly averages."

Window limits: LTS ≤ 400 days, raw ≤ actual recorder depth. Exceeding the limit clips the window with an explanation, rather than erroring.

### Known precision limitations

HA's raw history lives only as long as `purge_keep_days` allows (10 days by default). LTS only stores hourly `mean/min/max`, so the histogram for older periods is smeared — spikes shorter than an hour disappear from the average. Hourly `min`/`max` are still kept separately as an envelope, though, so SoC dips and peak loads are detected correctly even from LTS alone. Every API response is tagged with its precision level, and the UI surfaces it.

## 6. Math (`resample.py`)

States arrive from HA at irregular intervals, so there is **no plain arithmetic mean over samples** — everything is time-weighted:

- histogram: for each pair of adjacent states, `dt` is added to the bucket for that value
- mean = `Σ(v·dt) / Σdt`
- percentiles — from the cumulative duration histogram

For LTS windows, each hourly row contributes 3600 s at the `mean` value.

`unavailable` / `unknown` are excluded from the statistics, but their duration is tracked separately: the response carries `coverage` (the fraction of the window with valid data), and the UI warns when `coverage < 0.95`.

Bucketing by hour of day is done **in the local time zone** (`hass.config.time_zone`), with dedicated tests for DST transitions (23- and 25-hour days).

## 7. Analytics

### 7.1 Load (`load.py`)

- time-weighted mean, median, p95, maximum
- power-distribution histogram, bucket width = `rated_power / 40` (2.5% of rated power), configurable
- load duration curve (LDC): power sorted descending vs. cumulative % of time
- distribution across rated-power bands: 0-10 / 10-25 / 25-50 / 50-75 / 75-100 / >100%
- maximum sustained 15-minute load
- overload episodes: contiguous intervals above rated power, with duration and peak

### 7.2 Battery (`battery.py`)

- SoC distribution, 5% buckets
- % of time below thresholds (default 20 / 30 / 50, configurable)
- **dip episodes**: contiguous intervals with SoC below a threshold — count, duration, minimum reached; aggregated by day and by month
- equivalent full cycles: `Σ discharge energy / capacity`; from energy counters where available, otherwise by integrating `battery_power`
- DoD distribution across discharge events (local maximum → local minimum with hysteresis, so noise isn't counted as a cycle)
- charge/discharge power histogram — whether it's hitting the BMS limit
- autonomy estimate: median discharge rate by SoC band

### 7.3 Seasonality (`seasonal.py`)

- monthly table: average and p95 load, energy consumed, PV yield, average and minimum SoC, number of dips
- heatmaps of hour × day of week and hour × month
- "typical day": median with a p10–p90 band, with multiple months overlaid
- weekday / weekend overlay

### 7.4 Balance (`balance.py`)

- Sankey: PV / grid / battery → load / battery / export
- self-consumption and self-sufficiency ratios
- daily or monthly bars showing load-coverage breakdown
- grid outages: count, total offline time, longest outage, distribution by month. Source: `grid_connected`, or failing that a heuristic of `grid_power ≈ 0` while the battery is discharging
- energy totals are taken from `sum` in LTS rather than by integrating power: this correctly handles resets of `total_increasing` counters

## 8. WebSocket API

Commands: `inverter_analytics/config`, `.../load`, `.../battery`, `.../seasonal`, `.../balance`.
Parameters: `{entry_id, start, end, ...command-specific}`.

`config` returns the mapping, the applied preset, the available roles, and the data boundaries (oldest raw, oldest LTS).

All the heavy work happens on the recorder's executor thread. Only **aggregates** go out: histogram ≤100 buckets, heatmap 24×12, typical day 24×3. Payload sizes are kilobytes.

In-memory cache, keyed by `(entry_id, command, window, params)`. TTL: 60 s for windows ending "now"; 24 h for closed historical windows (they don't change). Bounded size (~50 entries).

## 9. UI

Sidebar entry "Inverter Analytics" (`mdi:chart-box-outline`). One page: a global header + 4 tabs.

### Header

Inverter selector (only if there is more than one config entry), period switch (`24 h` / `7 days` / `30 days` / `This month` / `Year` / Custom range), precision badge, refresh, CSV export.

The precision badge has three states: `Exact data` (raw), `Mixed since <date>` (hybrid), `Hourly averages` (LTS), with an explanatory tooltip.

The active tab and period are kept in the URL (`/inverter-analytics/battery?range=30d`) — links and page reloads don't lose state.

### "Load" tab

KPI row: Mean (and % of rated power), Median, P95, Peak (and % of rated power), % of time above 80% of rated power.
Then: a "Time spent at each power level" histogram with a "watts / % of rated power" toggle; a load duration curve; a distribution across rated-power bands; an overload-episodes table.

### "Battery" tab

KPIs: average SoC, minimum over the period, % of time below 20%, number of dips, equivalent cycles, average DoD.
Then: SoC-distribution histogram; dip calendar (day grid, colored by count and depth); episode table (start, duration, minimum SoC, load at that moment); DoD histogram; charge/discharge power chart.
SoC thresholds are editable in the tab header and persisted in the options.

### "Seasonality" tab

Monthly table with sparklines in the cells; two heatmaps (hour × day of week, hour × month); "typical day" — median with a p10–p90 band, with multiple months overlaid and a weekday/weekend overlay.

### "Balance" tab

Sankey of energy flows; two rings — self-consumption and self-sufficiency; load-coverage bars by day or month; grid-outage section.

### Styling

Only HA CSS variables (`--card-background-color`, `--primary-text-color`, `--primary-color`), zero hardcoded colors — light and dark themes work automatically. The series palette is fixed and shared across all tabs: PV yellow, battery green, grid gray, load blue. Numbers and dates go through `hass.locale`. Languages: uk, en.

## 10. User flow

**Installation**

1. HACS → Custom repositories → add the repository → Install → restart HA.
2. Settings → Devices & Services → Add integration → "Inverter Analytics".

**Setup wizard**

3. "Brand" step: list of presets + "Manual".
4. "Mapping" step: entity pickers, pre-filled by the preset (matches marked), numeric fields for rated power and capacity, sign-inversion checkboxes. Only `load_power` is required.
5. "Verification" step: a report **before saving** — how many sensors were found, since what date raw history and LTS are available, which sensors are excluded from the recorder, which lack `state_class`. Every warning comes with a concrete hint of what to add to `configuration.yaml`. This is a deliberately separate step: a sensor missing from the recorder is the top cause of "I installed it and the graphs are empty."
6. Done. The sidebar entry appears without restarting HA.

**Day-to-day use**

7. First open: "30 days" period, "Load" tab. From cache — ~100 ms; first computation 1-3 s, with skeletons instead of a spinner.
8. Changing the period recomputes the active tab; other tabs recompute lazily when visited.
9. Clicking a histogram bar or a day in the dip calendar opens a side panel with interval details and a "show in History" button — you can drill down from analytics into HA's raw data.
10. CSV export for the active chart.

**Maintenance**

11. A renamed or missing sensor → a Repair issue "Sensor X went missing" leading into the mapping reconfiguration.
12. Options flow: change the mapping, rated power, SoC thresholds, histogram bucket width — without reinstalling.

## 11. Error handling and empty states

- A missing optional role → the block shows a prompt, "Battery analysis needs an SoC sensor — add one," leading into the options flow, instead of an error.
- A sensor goes missing or gets renamed → Repair issue + banner on the panel.
- A sensor excluded from the recorder → caught at the "Verification" step, with a hint in the warning.
- No `state_class` → seasonality is unavailable for that sensor, with an explanation of why and what to do.
- Empty window → "No data for this period," with no broken axes.
- WS error → a toast and a "Try again" button, no endless spinner.
- Request exceeds the window limit → the period is clipped, with an explanation.

## 12. Testing

- **`resample.py`** — unit tests against hand-built step functions: time-weighting, DST transitions, gaps in data, `unavailable`, a single-point series, values at the window boundaries. This is the highest-risk part.
- **Analytics** — a synthetic 30-day dataset with known answers computed in advance; checks on histograms, percentiles, episode detection, cycle counting.
- **Config flow** — preset matched / didn't match / sensor excluded from recorder / options flow reconfiguration.
- **WS API** — via `hass_ws_client`, including cache and window clipping.
- **Frontend** — vitest on pure transform functions, no DOM.
- **CI** — hassfest, HACS validation, pytest (`pytest-homeassistant-custom-component`), ruff, frontend build.

## 13. Out of scope for v1

- Creating dedicated HA sensors (`sensor.inverter_avg_load_30d`) for automations
- Load and generation forecasting
- Weather correlation
- Battery degradation detection
- Aggregating multiple inverters into one chart

## 14. Implementation order

The scope is large, so implementation is broken into stages. Each stage is self-contained and ends in a working state.

1. **Scaffold** — integration, `manifest.json`, config flow with manual mapping (no presets), registering an empty panel, CI. Result: the integration installs, the menu entry opens.
2. **Data core** — `roles.py`, `source.py`, `resample.py` with a full test suite, cache. The highest-risk math is built and covered by tests before the first chart exists.
3. **Load** — `load.py`, the WS command, the first tab with KPIs, histogram, and LDC. Result: the user's main question already has an answer.
4. **Battery** — `battery.py`, the second tab, SoC thresholds in options.
5. **Seasonality** — `seasonal.py`, the hybrid raw+LTS path, the precision badge, the third tab.
6. **Balance** — `balance.py`, Sankey, grid outages, the fourth tab.
7. **Polish** — brand presets, the "Verification" step in the wizard, Repair issues, CSV export, uk/en localization.

Presets deliberately come last: they require knowing the final list of roles, and manual mapping already covers the need from stage one.
