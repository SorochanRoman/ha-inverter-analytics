# Health — design

## 1. Goal

*Is the system getting worse?* The Sizing tab asks whether the system is
big enough; this one asks whether it is what it was. Four signals, each
month by month over the whole history the recorder holds, each set beside
the same month a year earlier so that a winter is compared with a winter:

- the usable capacity of the battery, as the battery itself delivers it;
- the round-trip efficiency of the battery;
- solar production, and the best hour the array managed;
- the hours the inverter spent at or near its rated power.

A seventh tab, **Health**.

## 2. The whole history, and only from statistics

Health is a question about the whole record, so the tab does not use the
period picker. Its command takes no window: the server reads from
`HEALTH_MAX_YEARS = 5` years ago to now, from long-term statistics only —
the hourly mean, minimum and maximum of the numeric sensors, and the
counters' hourly `change` rows — which is about 8.8k rows per sensor per
year (one an hour) and is cached for a day. The picker is dimmed while the
tab is open, with a quiet note beside it saying the period does not apply
here (also the group's accessible name — a title alone is not shown over
disabled buttons in every browser), and the badge reads "Whole history,
from <the first month with data>".

Raw states are never read here. They reach back only to the recorder's
retention, and a health signal that stops at ten days is not a health
signal. The 400-day cap on windowed commands is untouched: it guards raw
state queries, and this command makes none.

## 3. No verdicts

The Sizing tab gives verdicts because "enough" has a defensible rule. Health
does not: a threshold for "the battery is degrading" would rest on a state
of charge the battery management system *estimates*, on weather, on how the
house was used. So the tab draws the series, puts last year's month beside
this year's, and prints the difference. The reader decides. Every figure
that cannot be read honestly is withheld with its reason where the figure
would be, as on every other tab.

## 4. The four signals

Each signal is computed per local month from the hourly rows that fall in
it, and is `null` with a `reason` where the month cannot support it.

### 4.1 Battery capacity, from clean discharge hours

Needs `battery_soc`, `battery_discharge_total` and `battery_charge_total`.

An hour is a **clean discharge hour** when, in that hour:

- the charge counter moved by at most `CLEAN_CHARGE_MAX_KWH = 0.02` — no
  charging worth the name, so the state of charge fell for one reason;
- the discharge counter moved by more than zero;
- the state of charge fell by at least `CLEAN_DROP_MIN_POINTS = 3`, read as
  the hour's maximum minus its minimum. A drop of a point or two is inside
  the noise of a percentage the battery management system rounds.

For a month, **energy per point** is the sum of the discharge counter's
changes over its clean hours divided by the sum of their drops, in kWh per
percentage point, and **implied usable capacity** is that figure times a
hundred. A month with fewer than `CLEAN_HOURS_MIN = 20` clean hours is
withheld with the reason `too_few_clean_hours` and the count it did have:
twenty hours is a few winter nights, and below it one strange hour moves
the figure.

Where `battery_capacity` is configured it is drawn as a reference line and
named as the nameplate. The two are not the same quantity — one is what the
maker printed and the other is what the battery delivered through a BMS's
estimate of its charge — and the tab says so under the chart. What matters
is the shape of the series over the years, not its distance from the line.

The hour's maximum minus minimum overstates the drop if the charge rose and
fell inside the hour. With charging excluded the rise can only be a
recalibration by the BMS, which is rare and, when it happens, inflates the
denominator and pulls the month's figure *down*. The direction of the bias
is recorded here so a dip in the series is read with it in mind.

### 4.2 Round-trip efficiency, month by month

Needs `battery_charge_total` and `battery_discharge_total`; needs
`battery_soc` for the gate.

The Battery tab's figure for the period, done for every month: discharged
over charged, from the counters' monthly sums. The gate is the Battery tab's
own, imported rather than copied: withheld when the month's charge ended
more than `EFFICIENCY_MAX_DRIFT_PCT` (5) points from where it began — read
as the mean of the month's last hour against the mean of its first — with
the reason `drift`, and when less than `EFFICIENCY_MIN_KWH` (1) was charged,
with the reason `too_little_throughput`. Without a state of charge the drift
cannot be checked and the figure is withheld with `no_soc`. The two counters
must cover the same span: when the month has rows in only one of them, or
one counter's first or last row of the month is more than an hour from the
other's — a discharge counter added on the 15th, say — the figure is
withheld with `counters_partial`, checked right after `no_soc`, since the
ratio would set a month of charging against half a month of discharging.
When the month's
state of charge does not span its counter hours — fewer than two rows, or a
first row more than an hour after the first counter hour or a last row more
than an hour before the last — the figure is withheld with `soc_partial`:
the gate must check the same span the counters sum.

### 4.3 Solar production, and the best hour

Needs `pv_energy_total`; adds `pv_power` for the peak.

Per month: energy from the counter, and the **best hour** — the highest
hourly maximum of the PV power. The energy carries the weather, and the
table says so in its footer; the best hour of a month is close to a
clear-sky figure and carries much less of it, which is why it is here. A
falling best hour across the same months of successive years is what
soiling, shading growth or a failing string look like from here.

**Hours the system could not take are left out.** A hybrid inverter stops
taking sun when the battery is at its limit and export is limited: PV is
then cut back to what the house uses, and its maximum in that hour is the
load, not the array. A summer of such hours would draw as a falling best
hour while the array is fine. So, when `battery_soc`, `battery_power` and
`pv_power` are all mapped and `export_limited` is not `False`, the best hour
is read only from hours that are
**not ceiling hours** — the Sizing tab's `charge_ceiling`, imported, with
the same constants. A month with fewer than `BEST_HOUR_MIN_HOURS = 10`
unconstrained hours of PV at or above `CEILING_PV_MIN_W` is withheld with
the reason `curtailed` and the count. Without those three sensors the best
hour is read from every hour and the card says it may include hours the
system could not take. A month in which the three sensors saw no hour at
all — before one of them was added, say — is read the same way, from every
hour with `unconstrained_hours: null`: its hours were never measured, and
calling it `curtailed` would claim a limit nobody saw. A month with some
observed hours keeps the rule above.

On a system known to export (`export_limited` is `False`) a full battery
does not cut the array back — the surplus goes to the grid — so ceiling
hours are not left out: leaving them out would make the best hour follow
the battery filling, not the array. The best hour is then read from every
hour and `best_hour_mode` is `"all"`; the card says the system exports, so
every hour's peak is the array's, rather than that sensors are missing.
Unknown export (`None`) counts as limited, the safe side.

**Energy without export follows the house.** When the installation does not
export — the Sizing tab's `export_limited`, imported, decided once over the
whole history — the monthly energy is what was used, not what the array
could give, and its year-on-year difference measures the household. The
energy line stays, with that caption under it; the best hour carries the
health question for such a system.

### 4.4 Inverter load, year over year

Needs `load_power` and `rated_power`.

Per month: hours whose peak reached rated power and hours whose peak reached
`HIGH_LOAD_SHARE` of it, computed by the Sizing tab's `inverter_evidence`,
imported. Every month is counted against the rated power configured now —
the option has no history — and the definition says "current rated power",
so that an inverter swap moving the earlier years is not read as the house.
This is a change in how the house is used rather than in the
hardware, and the card says so; without a temperature or a fault sensor
there is nothing more the data can say about the inverter itself.

## 5. Comparing across years

Every signal is drawn as one line per year over the twelve months of the
year, so that the same month of different years stands in one vertical.
Under each chart, a table of the last twelve months with the same month a
year earlier beside it and the difference, in the signal's unit and as a
share.

Above each card, one figure: **the last twelve months against the twelve
before**, as the mean of the monthly figures on each side and the change
between them. It appears only when both sides hold at least
`COMPARISON_MIN_MONTHS = 6` months with a figure; otherwise the card says
how many each side has. A twelve-month mean of monthly means is not a
twelve-month mean of the hours — the months are weighted equally, and the
caption says "mean of the monthly figures".

## 6. Months

Months are the Seasonality tab's months, in the installation's zone, built
by `months_touched` over the whole window and keyed `YYYY-MM`. A month with
no rows for a signal is present in the table and empty, so that a gap in
the record looks like a gap and not like a good or a bad month. Coverage is
not drawn per month here, but it decides whether a month has a figure.
Solar energy and inverter hours are sums and the best hour is a maximum, so
a month with a third of its days reads as a worse month and pulls the
twelve-against-twelve mean down with it. For these three signals a month is
withheld with the reason `partial_month` when the signal's own distinct
hourly rows in it are fewer than `PARTIAL_MONTH_COVERAGE = 0.95` of the
month's hours. It is stricter than the Seasonality tab's
`INCOMPLETE_COVERAGE` (0.6) on purpose: that marks means, which do not
scale with coverage, while a sum does — a month 60% covered would read up
to 40% low. A missing 5% stays inside the noise a month's weather already
carries; more does not. The month's length is the
whole calendar month from `months_touched` — for the current month too,
not the part that has elapsed, because it is set beside a whole month a
year earlier. So today's month and the first month of a sensor's history are
usually withheld. A withheld month has no value, so it drops out of the
year-earlier difference and of the twelve-against-twelve figure on its own.
Capacity and efficiency are ratios and are not withheld for coverage: a
share of half a month is still a share, and each withholds itself when its
month lacks what it needs, with the reasons carrying the count.

## 7. Availability

The `health` feature opens with any one of its sensor sets — the two
battery counters with the state of charge, the PV counter, or the load with
its rating — the way Sizing does, and each card names what it is short of.

## 8. Sections

**Status row.** The "Whole history" badge with the first month, "Months in
<zone>", and a note when the statistics stop short of now.

**Four cards**, each: the twelve-against-twelve figure or why not; the
year-lines chart; the last-twelve-months table.

**How these are read.** A block at the foot stating the four definitions
and their constants, and the two caveats — what a BMS's charge is, and what
weather does to a month's energy.

## 9. Out of scope

- **Verdicts or thresholds for degradation**, for the reason in §3.
- **Specific yield per kWp**, which needs a number nobody has been asked
  for.
- **Temperature**, **fault codes**, **cell voltages** — sensors this
  integration does not map.
- **Forecasting** of anything.
- **Weather normalisation** of production; the best hour is the honest
  proxy and is labelled as one.

## 10. Testing

The clean-hour rule is tested at each of its three edges: a charge change of
exactly 0.02 admitted and 0.021 rejected, a drop of exactly 3 points
admitted and 2.9 rejected, a zero discharge change rejected; a month at 19
and at 20 clean hours; and the energy-per-point arithmetic on hand-built
hours including a BMS recalibration hour that inflates the denominator.

Efficiency is tested for both gates with the Battery tab's constants, for
`no_soc`, and for `counters_partial` with a discharge counter that starts
mid-month and with a month that has only the charge counter.

The best hour is tested to read every hour in a month the three sensors
never saw, to read every hour on an exporting system, to skip ceiling hours, to be withheld as
`curtailed` at 9 unconstrained hours and read at 10, and to fall back to
every hour without the three sensors; the export caption is tested to
follow `export_limited`.

`partial_month` is tested at the coverage edge and on distinct hours, for a
`now` in the middle of a month (solar energy, the best hour and the inverter
withheld, capacity not) and for a sensor history that starts mid-month.

Year alignment is tested with two years of months where the same month
differs, and with a February present in one year and absent in the other.
The twelve-against-twelve figure is tested at five and six months a side.

The command is tested to take no window and to read from five years back,
and the cache key to change with the day.

Live verification imports three years of hourly statistics for the state of
charge, the two battery counters, the PV counter and power, and the load,
with the implied capacity falling a few percent a year and one month of no
data, and reads the four cards back from the screen with the gap visible.

## 11. Conventions this tab follows

Written after this design, and binding on it:

- **Two languages.** Every string goes into `frontend/src/i18n/en.ts` and
  `uk.ts`; Ukrainian follows `docs/glossary-uk.md`.
- **Display decisions are pure functions.** There is no DOM test
  environment, so what a card or cell shows — a figure, a dash, which
  reason — is decided by pure functions in a module of its own (as
  `frontend/src/reserve.ts` does for the Grid tab) and tested there; the tab
  only renders their result.
- **The payload carries what the panel reads.** No field is added for
  symmetry with other tabs.
- **Imported, not copied.** `charge_ceiling`, `export_limited`,
  `inverter_evidence`, `rows_by_month` and `withheld` from `sizing.py`; the
  efficiency gate and its constants from `battery.py`.
- **Nameplate never multiplied in.** The capacity is a reference line only,
  as §4.1 says.
