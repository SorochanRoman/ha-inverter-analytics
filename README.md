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
- **Reconfiguring, with detection.** Detection is not something that only
  happens once. **Reconfigure** in the integration's menu runs it again
  against the inverter this entry already describes, and fills in only the
  roles that are still empty — so an installation mapped before a tab
  existed can be brought up to date without hunting for entity ids, and a
  sensor corrected by hand is never overwritten by the step meant to
  improve the mapping. It says what it found and which tab that opens.
  **Configure** is the inverter's name and the thresholds; the sensors live
  in Reconfigure.
- **The page says when it has not been told something.** A tab whose
  sensors are not mapped explains which ones it needs and where to add
  them, rather than reporting the absence of a setting as a failure to load
  data.
- **It tells you when your setup has fallen behind.** An integration
  configured once has no reason to be revisited, so anything it needs to say
  has to arrive where you are already looking. Two cards appear in
  **Settings → Repairs**: one when your installation has sensors this
  inverter is not reading — naming the tab they would feed, and offering to
  map them in place — and one when a mapped sensor no longer exists, which
  is what a rename looks like from here. Both withdraw themselves the moment
  the reason is gone. The first is raised only for sensors some analytic is
  actually waiting on: a notification you learn to dismiss unread is
  expensive to have taught you.
- **A Battery tab.** How much time the battery spends at each state of
  charge, a band breakdown, and a table of every episode where it fell
  below your low mark — with what it bottomed out at and what it recovered
  to. Charge and discharge power, how much of the time it is working at
  all, energy moved each way and equivalent full cycles per day. Anything
  that can only be answered from exact data says so on its own card, and a
  period covered only by hourly averages explains why dips cannot be
  counted there rather than showing an empty table.
- **A Seasonality tab.** Mean power for each month of the period with PV
  beside it, the same by hour of the day, and a heat map of the two crossed
  — where a winter evening peak and a summer midday one stop being two
  averages and become two shapes. Months the recorder only partly saw keep
  their bar in grey rather than vanishing, and months with no data at all
  are named as such.
- **A Balance tab.** Where the energy came from and where it went: solar,
  the grid both ways and the battery both ways, as two stacked bars whose
  matching is the balance. Self-sufficiency and self-consumption with the
  arithmetic written out, and a day-by-day breakdown. Energy is read from
  Home Assistant's own hourly statistics, which is where counter resets are
  already accounted for.
- **Round-trip efficiency**, when the battery's charge and discharge
  counters are mapped. It is withheld for a period that ends at a very
  different state of charge, and says why: the gap between what went in and
  what came out is then mostly energy still in the battery, not energy lost.
- **A Grid tab.** How often the grid went away, for how long, and when: the
  count, the total, the longest, the share of measured time, and brief
  interruptions too short to be outages; hours without grid by day and the
  share by hour of day; and a table of every outage with the battery's charge
  when it began, the lowest it reached and where it ended, plus the mean load
  through it. An outage cut by the window's edge says "at least". A restart
  of Home Assistant in the middle of an outage does not make two of it. The
  grid-presence sensor is a binary sensor with no statistics, so a window
  reaching past the recorder's retention says from which date it counts.
- **Autonomy, read off the battery.** How long the battery would last from
  full and from where it is now, at the discharge rate seen during this
  period's outages — the nameplate capacity is never multiplied into it. It
  is withheld, and says why, when the outages were too short to learn from
  or the sun covered them.
- **Outages inferred from flows**, for an installation with no presence
  sensor: grid power at zero while the battery discharges. The tab carries a
  banner saying that a night of zero export looks the same, and asks for a
  sensor.
- **A Sizing tab.** Three verdicts — the inverter against the load, the battery
  against the nights, the sun against the consumption — each *enough*,
  *borderline* or *short*, for the period and for every month in it, with the
  figure it was read from and the rule it was read with printed beside it.
  Every month is judged from hourly statistics — the peak and the floor of
  each hour, not the mean — so last winter is read the same way as last week.
  A day the battery ran low after filling counts against the battery; a day
  it ran low without filling counts against the sun. There is no combined
  score: which part is short is the whole point.
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

All six tabs are built. Seasonality cannot compare the same month across two years,
because a single query is capped at 400 days. The Balance tab shows no
costs: tariffs are a domain of their own, and a wrong number about money
is worse than no number. Detection covers the naming scheme of the
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
   strings the string comparison; a grid-presence binary sensor enables the
   Grid tab; the rest is optional.

## Updating

The version shown on the integration's page in Home Assistant is read from the
files on disk. If it has not changed, nothing has been downloaded yet — whatever
HACS is showing.

**Through HACS.** Open HACS → Inverter Analytics → the three-dot menu →
**Update information**, which re-reads the repository immediately instead of
waiting for the next scheduled scan. If no update appears after that, the
download is tracking the `main` branch rather than releases — choose
**Redownload** and pick a version from the list. Either way **restart Home
Assistant afterwards**: HACS replaces the files, but the running instance keeps
the old version loaded until it restarts, so the page goes on showing the old
number.

**Without HACS.** If the integration was copied in by hand, HACS does not manage
it and will never offer an update. From the directory holding
`configuration.yaml`:

```bash
curl -L -o release.tar.gz \
  https://github.com/SorochanRoman/ha-inverter-analytics/archive/refs/tags/v0.4.0.tar.gz
rm -rf custom_components/inverter_analytics
tar -xzf release.tar.gz --strip-components=2 -C custom_components \
    ha-inverter-analytics-0.4.0/custom_components/inverter_analytics
rm release.tar.gz
```

Then restart Home Assistant. Replace both version numbers to install a
different release; the directory inside the archive carries the version without
its leading `v`.

**After any update, reload the browser with Ctrl+Shift+R.** The panel is a
separate JavaScript bundle and browsers cache it aggressively.

## Documentation

- `docs/known-gaps.md` — what is verified, what is not, and what the next
  phases will need to change.
- `docs/superpowers/specs/` — the design specification.
- `docs/superpowers/plans/` — the implementation plan that was executed.

## License

MIT — see `LICENSE`.
