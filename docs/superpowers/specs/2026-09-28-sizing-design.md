# Sizing — design

## 1. Goal

*Is this system big enough?* Three verdicts — the inverter against the load,
the battery against the nights, the sun against the consumption — each one
`enough`, `borderline` or `short`, for the period chosen and for every month
in it, so that a reader can see not only whether the system is short but
when: a system that is generously sized from April to September and short
from November to February is the normal case, and the point of this tab is to
show that shape rather than a yearly average of it.

A sixth tab, **Sizing**.

## 2. Not a score

A single number — "7 / 10" — would be the obvious deliverable and is
deliberately not built. It would combine three unrelated questions with
weights nobody measured, and it would hide the one thing the reader needs:
*which* part is short. The tab shows three verdicts, and beside each one the
figure it was read from and the rule it was read with. A verdict nobody can
reconstruct is a verdict nobody trusts, and this project has spent five tabs
on exactly that principle.

## 3. Where the evidence comes from

Every month in the period is judged from the same kind of evidence, whether it
is last week or last February. Home Assistant's long-term statistics hold,
for every numeric sensor with a `state_class`, not only an hourly *mean* but
an hourly *minimum* and *maximum*. The maximum of the load in an hour is the
true peak of that hour; the minimum of the state of charge is the true floor.
Neither is smoothed the way the mean is, so a verdict read from them beyond
the recorder's retention is as honest as one read from yesterday.

**The tab therefore reads statistics for every window, including today's**,
the way the Balance tab does for energy. Raw states would be more precise for
the last few days and would make those days incomparable with the rest: a
"share of time above 80%" computed from raw states and one computed from
hourly means are two different quantities, and a month-by-month strip that
mixed them would say the old months were better than they were. The badge
reads "Hourly statistics" everywhere on this tab, and the note that the
current hour is not yet compiled appears as it does on Balance.

Energy for the solar verdict comes from the counters through the same hourly
`change` rows Balance already reads, so a counter reset costs nothing here
either.

A sensor without a `state_class` has no statistics at all. A card whose sensor
is that kind says so, names the sensor, and gives no verdict.

## 4. The three verdicts

Each verdict is read from a small set of figures with a rule written in
constants and printed on the card. The thresholds are judgement — there is
no measurement of "enough" — so they are stated where the verdict is, not
buried where they cannot be argued with.

### 4.1 The inverter, against the load

Needs `load_power` and `rated_power`.

Evidence, per month and for the period:

- **hours at rated power** — hours whose hourly maximum reached
  `rated_power`;
- **hours above 80%** — hours whose hourly maximum reached `HIGH_LOAD_SHARE`
  (`0.8`, the Load tab's existing threshold) of rated power;
- **the peak** — the highest hourly maximum;
- **measured hours** — the denominator, hours that have a statistics row.

Rule:

- `short` when hours at rated power exceed `INVERTER_SHORT_SHARE = 0.01` of
  measured hours (about seven hours in a month);
- `borderline` when there is any hour at rated power, or hours above 80%
  exceed `INVERTER_BORDERLINE_SHARE = 0.05` of measured hours;
- `enough` otherwise.

The card says "hours in which the load reached rated power", never
"overload hours". An hourly maximum says the load got there; it does not say
for how long, and the Load tab — which counts sixty-second episodes from raw
states — is where that question is answered for recent days.

### 4.2 The battery, against the nights

Needs `battery_soc`. Uses `battery_low_pct` (the Battery tab's low mark) and
a new advanced option, `battery_full_pct`, defaulting to
`DEFAULT_BATTERY_FULL_PCT = 95`: many battery management systems cap the
charge below a hundred, and a battery that fills to 90% every day has filled.

A day is judged on its hourly minima and maxima in the local zone:

- **reached full** — some hour's maximum was at or above `battery_full_pct`;
- **hit the low mark** — some hour's minimum was below `battery_low_pct`.

Days that hit the low mark are split by whether they had reached full:

- **full, and still at the low mark** — the battery was given all it can hold
  and it was not enough for the night. This is the battery being small.
- **at the low mark without reaching full** — the battery was never filled,
  so the night was not a fair test of it. This is the sun (or a charging
  policy) being short, and it feeds the solar verdict rather than this one.

Evidence: the two counts, the number of days with data, and the month's
lowest state of charge.

Rule, over days that reached full:

- `short` when "full and still at the low mark" is at least
  `BATTERY_SHORT_SHARE = 0.25` of days with data;
- `borderline` when it happened at all;
- `enough` when it never did.

A month in which the battery never reached full has no battery verdict — the
card says "never filled this month, so the nights say nothing about its
size" — and the solar verdict carries that month instead.

Outages are not part of this verdict. Whether the battery lasted through an
outage is on the Grid tab, and it can only be read from raw states, which do
not reach a year back; a monthly strip that answered it for ten days and went
quiet for the rest would be worse than leaving it where it is honest.

### 4.3 The sun, against the consumption

Needs `pv_energy_total` and `load_energy_total`. Adds `grid_import_total`
when mapped, and the battery's days-reached-full when `battery_soc` is
mapped.

Evidence, per month and for the period:

- **production as a share of consumption** — PV energy over load energy;
- **self-sufficiency** — `(load − grid import) / load`, as Balance computes
  it, when the import counter is mapped;
- **days the battery filled** — from §4.2, as a share of days with data,
  when the state of charge is mapped.

Rule:

- `enough` when production is at least `SOLAR_ENOUGH_SHARE = 1.0` of
  consumption and, where the battery is mapped, it filled on at least
  `SOLAR_FILL_SHARE = 0.8` of days with data;
- `borderline` when production is at least `SOLAR_BORDERLINE_SHARE = 0.7` of
  consumption;
- `short` otherwise.

In a Ukrainian winter this verdict will be `short` for almost every
installation. That is the true answer, and the monthly strip is there to show
where the boundary between short and enough falls in the year, which is what
a sizing decision is actually about.

A month whose production covers consumption while the battery never fills is
a real shape — export during the day, import at night — and the card says so
in words rather than letting a `borderline` stand for it: "production covers
the load, but the battery filled on only 30% of days".

## 5. The period verdict

The three verdicts at the top of the tab are read from the same rules applied
to the whole period's evidence — hours summed, days summed, energy summed —
not from averaging the monthly verdicts. A year with one short month is a
year in which the inverter was short for a month, and the monthly strip says
which one; the period card says what the year as a whole looked like.

## 6. The monthly strip

A table with a row for each month the period touches, in the installation's
zone, and three cells: the verdict as a word and a colour, and under it the
one figure the rule turned on — hours at rated power, days full-and-low,
production share. Months are built by the Seasonality tab's month machinery,
so the same rules apply: a month whose coverage is below `INCOMPLETE_COVERAGE`
(`0.6`) keeps its verdict but is drawn in grey with "from 40% of the month"
under it; a month with no data at all is present, named, and empty. The
first and last months of any window are almost always partial, and they are
the ones a reader is most likely to draw a conclusion from.

A cell whose sensor is not mapped shows a dash and names the role. A cell
whose sensor keeps no statistics says so once, in the card above, and shows a
dash in every month.

## 7. Availability

The `sizing` feature opens with any one of its three sensor sets — the
inverter's, the battery's or the sun's — the way Balance opens on its first
counter, and each card reports its own missing roles. `missing` for the
feature as a whole lists whatever none of the three cards has; the Repairs
card for an installation that has the sensors and is not reading them
follows from that without further work.

## 8. Sections

**Status row.** The "Hourly statistics" badge, the covered-span note when the
statistics stop short of the period, the clamped-window warning.

**Three cards.** Each with the verdict, one sentence of rule with its
thresholds, the evidence figures, and — where a card cannot give a verdict —
the reason: which sensor to map, or that the sensor keeps no statistics, or
that the battery never filled.

**Month by month.** The strip of §6.

**How the verdicts are read.** A short block at the foot of the tab stating
the three rules in full, with their constants, so nothing on the page has to
be taken on trust.

## 9. Out of scope

- **A combined score**, for the reason in §2.
- **Recommendations** — "add 5 kWh of battery". Turning a short verdict into a
  quantity needs a model of the load nobody has asked this tab to build, and
  a wrong quantity about money is worse than no quantity.
- **Outages in the monthly strip**, for the reason in §4.2.
- **Health** — degradation of the battery, a fall in production against the
  same month a year ago. That is the next design, and it depends on lifting
  the 400-day cap on a single query.
- **Weekly rows.** The unit of a sizing decision is the season; a week of bad
  weather is noise here.

## 10. Testing

The rules are tested at their boundaries with hand-built hourly rows: an
inverter exactly at 1% of hours at rated power, one hour at rated power in an
otherwise idle month, hours above 80% just over and just under 5%; a battery
with days that reached full and still hit the low mark against days that hit
it without filling, and a month that never filled giving no verdict; a solar
month at exactly 100% with the battery filling on 79% and on 80% of days, and
one at 69% and 70%.

The day split is tested across a daylight-saving transition, since a day is a
local idea and an hourly row is never split.

The period verdict is tested to be read from summed evidence and not from the
monthly verdicts: a year of `enough` months with one `short` month, where the
year's summed hours are under the short threshold, must be `borderline`, not
`short`.

Statistics reading is tested for a row with `min` and `max` present, a row
with a null `max` (an hour the recorder did not compile) dropped rather than
read as zero, and the covered span reported.

Live verification imports hourly statistics with min and max for the load,
the state of charge and the counters over three seeded months — one clearly
enough, one clearly short, one that never fills — and reads the three cards
and the strip back from the screen, including the grey partial month at each
end.
