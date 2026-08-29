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
  header, and the selected tab, period and inverter are kept in the URL,
  so a reload or a shared link lands where you left off.
- **Three-phase analytics.** Map your per-phase load sensors and the Load
  tab gains a Phases section: mean, P95, peak, share of load and headroom
  against the per-phase limit for each phase, the distribution of the
  imbalance between them, how much time it spent above a threshold, and
  the sustained episodes with each phase's power at the worst moment.
  Imbalance is measured only while total load is above a floor — at
  standby power a few watts of difference is a large percentage and means
  nothing — and the page says how much time that excluded.
- **PV string comparison.** With more than one string mapped, each one's
  mean, peak and share of production side by side. A string consistently
  below its neighbour points at shading, orientation or a fault.
- **Sensor detection.** The wizard looks at what is already in your
  installation, offers the inverters it recognises, and fills the mapping
  in for you — including phases in the right order and PV strings. Where
  the data genuinely cannot settle a question, such as which set of
  current transformers faces the grid, it asks instead of guessing. Every
  field explains what it is for, and manual mapping is always available.
  The mapping can be changed later from the integration's options,
  including renaming the inverter and the imbalance thresholds.
- **A Battery tab.** How much time the battery spends at each state of
  charge, a band breakdown, and a table of every episode where it fell
  below your low mark — with what it bottomed out at and what it recovered
  to. Charge and discharge power, how much of the time it is working at
  all, energy moved each way and equivalent full cycles per day. Anything
  that can only be answered from exact data says so on its own card, and a
  period covered only by hourly averages explains why dips cannot be
  counted there rather than showing an empty table.
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
  and "we don't know" are different statements;
- when one phase has less history than the others — a sensor without a
  `state_class` keeps no long-term statistics at all — its card says so
  rather than hiding behind the page's overall figure;
- the imbalance between phases can only be read at moments when *every*
  phase is known, so its coverage is reported as its own number and never
  interpolated across a gap;
- when no per-phase rating is configured, the headroom figures say the
  total was split and by how many phases, instead of presenting a derived
  number as a known one;
- a total and the parts it is supposed to be made of are checked against
  each other — if the load total and its phases cannot both be right, the
  page asks whether one of them is mapped to the wrong sensor;
- the battery power sensor's direction is checked against the charge
  itself, because answering that question wrongly during setup would
  silently swap charging and discharging everywhere.

## Not built yet

The Seasonality and Energy balance tabs are placeholders; their analytics
are not implemented. The Battery tab integrates power rather than reading
the energy meters, so round-trip efficiency is not among its figures. Detection covers the naming scheme of the
StephanJoubert Solarman integration, read off a live instance; other
vendors fall back to manual mapping. See `docs/known-gaps.md` for the
full list of what is deliberately missing and what remains unverified.

## Requirements

- Home Assistant 2024.11.0 or newer.
- The `recorder` component enabled — it is the sole source of history.
- A load-power sensor that `recorder` actually records. If your sensor is
  excluded from recorder, the page will be empty no matter how the
  integration is configured.

## Installing through HACS

1. Open HACS → **Integrations** → the three-dot menu → **Custom repositories**.
2. Add this repository's URL and pick **Integration** as the category.

   Not *Lovelace* / *Plugin*. Those expect a JavaScript file in the repository
   root, a `dist/` directory, or a release asset, and this repository has none
   of those by design — its frontend bundle ships inside
   `custom_components/inverter_analytics/frontend/dist/` and is installed with
   the integration. Choosing the wrong category fails with:

   ```
   Repository structure for main is not compliant
   ```

   If you see that, remove the custom repository and add it again as an
   Integration.
3. Find "Inverter Analytics" in the HACS integration list and install it.
4. Restart Home Assistant.
5. Add the integration from **Settings → Devices & Services → Add Integration**.
   It will offer the inverters it found; pick yours and check what it filled
   in, or choose manual mapping. Only load power and rated power are
   required. Per-phase load sensors enable the Phases section and PV
   strings the string comparison; the rest is optional and feeds tabs that
   are not built yet.

## Documentation

- `docs/known-gaps.md` — what is verified, what is not, and what the next
  phases will need to change.
- `docs/superpowers/specs/` — the design specification.
- `docs/superpowers/plans/` — the implementation plan that was executed.

## License

MIT — see `LICENSE`.
