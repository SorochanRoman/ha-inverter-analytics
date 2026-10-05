# Savings card — design

## 1. Goal

Show how much money the installation saved over the chosen period: what the
house would have paid for the energy it used, minus what it actually paid
for the energy it bought. The figure covers the whole system — the sun and
the battery together, including a battery charged from the grid at night on
a two-zone tariff. It is not split into "sun" and "battery".

## 2. Settings

Four new tuning numbers in `roles.py`, `RoleKind.NUMBER`, shown in the
options form beside the other thresholds:

| Role | Unit | Default | Meaning |
|---|---|---|---|
| `price_day` | currency / kWh | none | Price of a kWh, or the day-zone price on a two-zone tariff |
| `price_night` | currency / kWh | none | Night-zone price; empty means a single tariff |
| `night_start_hour` | h | 23 | First local hour of the night zone |
| `night_end_hour` | h | 7 | First local hour after the night zone |

- None of them are prompted for during setup. The defaults sit in
  `const.py`, and `config_flow.py` suggests them the same way it suggests
  `grid_zero_w`.
- **Hours.** The night zone is every local hour `h` with
  `night_start_hour <= h < night_end_hour` when start < end, and
  `h >= night_start_hour or h < night_end_hour` when the zone wraps
  midnight. A zone with start == end is empty, so every hour is day.
- **Currency.** The currency is `hass.config.currency`, sent in the payload.
  A price is a plain number in that currency.
- **Texts.** Labels and descriptions go in `translations/en.json` and
  `translations/uk.json`.

## 3. Arithmetic

In `analytics/savings.py`, pure, with no Home Assistant dependency:

```
savings_by_hour(load_rows, import_rows, *, tz, price_day, price_night,
                night_start, night_end) -> list[(start, value)]
```

- The two counters' hourly rows are joined by `start`. Only an hour that has
  a row from **both** counters gives a value; any other hour is left out.
- An hour's value is `(load.change − import.change) × price(local hour of
  start)`. Here `price` is `price_night` inside the night zone when it is
  set, and `price_day` otherwise.
- **Negative hours.** A value can be negative: an hour that charged the
  battery from the grid bought more than the house used. Such an hour is
  kept, because the same energy comes back as a positive value when the
  battery gives it out.

`build_savings(...)` folds those values into the payload block `savings`:

```
{
  "currency": "UAH",
  "total": float | None,
  "per_day": float | None,          # total over the days with any hour
  "days": [{"day": "YYYY-MM-DD", "value": float}],   # local days
  "hours": int,                     # hours with a value
  "window_hours": int,              # whole hours in the window
  "two_zone": bool,
  "reason": None | "no_price" | "no_counters" | "no_hours",
}
```

- `no_price`: `price_day` is not set.
- `no_counters`: `load_energy_total` or `grid_import_total` is not mapped.
- `no_hours`: both are mapped, but no hour has rows from both.
- With any reason set, `total`, `per_day` and `days` are `None` / `[]`.
- The block goes into the Balance payload as `savings`. It is read from the
  hourly rows `async_balance_analytics` already fetches, with no extra
  recorder read.

## 4. Panel

A card **Savings** on the Balance tab, after the existing cards. It follows
the chosen period.

- **Headline.** The total, formatted with `Intl.NumberFormat` style
  `currency` in the panel's locale, and the mean per day under it.
- **Chart.** Bars for each day, or each month when the range is `year`, plus
  a cumulative line on a second y axis. Months are summed from the days in
  the frontend.
- **Coverage.** When `hours < window_hours`, one line says what share of the
  period has both counters, using the same "covers part of the period" style
  as the other cards.
- **Note.** A note under the chart says three things:
  - this is the whole system's saving, the sun and the battery including
    night charging;
  - today's prices are applied to the whole period;
  - money for energy sold to the grid is not counted.
- **Withheld.** With a reason, the card shows only the reason's sentence:
  - `no_price` says where to set the price;
  - `no_counters` names the missing counter with `roleLabel`.
- **Where the logic lives.** The display decisions are pure functions in a
  new `frontend/src/savings.ts`: the card state, days or months, the
  cumulative series. The chart builder goes in `charts/options.ts`.
- **Texts and types.** Strings go in `en.ts` and `uk.ts`, types in
  `types.ts`.

## 5. Known gaps

Recorded in `docs/known-gaps.md`:

- Today's prices are applied to the whole period; there is no tariff history.
- A battery charged from the grid at night counts towards the saving; the
  figure is the system's, not the sun's.
- Income from export is not counted.
- An hour missing from either counter is left out, so a partly covered
  period reads low; the coverage line says so.
- During an outage the house's use is still valued at the grid price,
  although without the system it would have had no power at all.

## 6. Tests

- **Zones:** a day zone, a night zone, a zone wrapping midnight, an empty
  zone, a single tariff (night price unset).
- **Hours:** an hour present in only one counter is left out; a negative
  hour is kept; the days are grouped by local day across a DST change.
- **Reasons:** `no_price`, `no_counters`, `no_hours`.
- **Payload:** `savings` is in the Balance payload, with the currency from
  the config.
- **Frontend:** card state for each reason, day versus month bars, the
  cumulative series, currency formatting, and dictionary tests in both
  languages.
