# Inverter Analytics

A Home Assistant custom integration (HACS) that adds a sidebar page with
solar-inverter analytics, computed from data already in your `recorder`
database. No extra polling, no cloud, no additional sensors to configure
beyond pointing the integration at the ones you already have.

## What works today

- **A sidebar page with a Load tab.** A KPI row (mean, median, P95, peak,
  highest sustained 15-minute load, share of time above 80% of rated
  power), a histogram of how much time the inverter spends at each power
  level, a load duration curve, a breakdown across rated-power bands, and
  a table of overload episodes. The period picker (24 h / 7 days /
  30 days / this month / year) and the inverter selector live in the same
  header, and the selected tab and period are kept in the URL, so a
  reload or a shared link lands where you left off.
- **Manual sensor mapping** through the config flow. There are no
  vendor presets yet: you tell the integration which of your entities is
  the load power, what the inverter's rated power is, and so on. The
  mapping can be changed later from the integration's options, including
  renaming the inverter.
- **Automatic source selection.** Home Assistant keeps two records of the
  past: precise raw states, purged after `purge_keep_days`, and hourly
  long-term statistics kept forever. The integration decides which to
  read from the requested window, and reads both when the window straddles
  the boundary.

## What it will not pretend to know

The interface refuses to show confident numbers it cannot substantiate,
and this is deliberate rather than incidental:

- when a window crosses into long-term statistics, the precision badge
  says so **and gives the date** the transition happens;
- when part of the period has no data at all, it says how much of it
  actually has data;
- when a value fell outside the histogram's range and was pressed into an
  edge bucket, it says that the bucket's label no longer describes where
  that time was;
- when there is no data, a KPI shows a dash — not a zero. "Zero watts"
  and "we don't know" are different statements.

## Not built yet

The Battery, Seasonality and Energy balance tabs are placeholders; their
analytics are not implemented. Brand presets for specific inverter models
do not exist yet either — see `docs/known-gaps.md` for the full list of
what is deliberately missing and what remains unverified.

## Requirements

- Home Assistant 2024.11.0 or newer.
- The `recorder` component enabled — it is the sole source of history.
- A load-power sensor that `recorder` actually records. If your sensor is
  excluded from recorder, the page will be empty no matter how the
  integration is configured.

## Installing through HACS

1. Open HACS → **Integrations** → the three-dot menu → **Custom repositories**.
2. Add this repository's URL with the **Integration** category.
3. Find "Inverter Analytics" in the HACS integration list and install it.
4. Restart Home Assistant.
5. Add the integration from **Settings → Devices & Services → Add Integration**
   and map your entities to the roles it asks for. Only load power and
   rated power are required; everything else is optional and feeds tabs
   that are not built yet.

## Documentation

- `docs/known-gaps.md` — what is verified, what is not, and what the next
  phases will need to change.
- `docs/superpowers/specs/` — the design specification.
- `docs/superpowers/plans/` — the implementation plan that was executed.

## License

MIT — see `LICENSE`.
