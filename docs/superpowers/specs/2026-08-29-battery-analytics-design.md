# Battery analytics — design

## 1. Goal

Answer the two questions from the original request that are still unanswered:
how the battery is used, and how often it drops to a low state of charge.

## 2. Why this first

Every primitive it needs is already written and tested, and two of them have no
caller at all: `episodes_below` and the `battery_capacity` role. Detection
already finds `battery_soc`, `battery_power`, `battery_charge_total` and
`battery_discharge_total` on a real Solarman installation — verified against the
captured entity list and in a live instance. Nothing in this plan depends on the
long-term-statistics path, which remains the project's largest unverified area.

## 3. Roles used

| Role | Kind | Required for | Missing means |
|---|---|---|---|
| `battery_soc` | % | the tab at all | the tab does not render |
| `battery_power` | W, invertible | charge/discharge, energy, sign check | those sections absent |
| `battery_capacity` | kWh number | equivalent full cycles | cycles show a dash and say why |

`battery_charge_total` and `battery_discharge_total` are deliberately unused
here — see §9.

## 4. The decision that makes this tab honest

The Phases tab turned on one detail: without the load floor, the imbalance
histogram would scream every night. The battery has an exact counterpart, and
getting it wrong would be worse because it is silent.

**Long-term statistics store an hourly *mean* state of charge.** A battery that
falls to 8% for twenty minutes and recovers appears as perhaps 34% for that
hour. So on a 30-day window over a 10-day recorder, two thirds of the answer to
"how often does it dip" is not merely imprecise — it is absent, and nothing
about the number would say so.

Therefore:

- **Dip episodes, the lowest state of charge, and time below the threshold are
  computed over the raw portion of the window only**, and the tab states the
  date that portion begins. A minimum taken over hourly means is not a minimum
  of anything the battery did.
- **The distribution and the mean use the whole window**, carrying the usual
  precision badge. An hourly mean still flattens the extremes, so the
  lowest-charge band is understated; the badge is what says the window is mixed.

When the requested window lies entirely inside long-term statistics, the
episode section renders no table and says why, rather than an empty one that
reads as "no dips".

## 5. Sections

**KPI row.** Mean state of charge; lowest reached; time below the low
threshold; number of dips; the mean low point across those dips; equivalent full
cycles per day. Each figure that comes from the raw window only is marked as
such.

"Mean depth of discharge" was in an earlier draft and is not here. Measured
across dip episodes it would have been the threshold minus the minimum — a
useful number wearing the name of a different one, since every episode starts at
the threshold by construction. A real depth-of-discharge figure needs discharge
runs detected from the state of charge itself, which is noise-sensitive work
this tab does not need.

**Time spent at each state of charge.** A histogram in 5% buckets, and a band
breakdown (0–20 / 20–40 / 40–60 / 60–80 / 80–100) with the lowest band in the
warning colour, mirroring how `100+` is coloured on the Load tab.

**Low-charge episodes.** The literal answer to the original question: start,
duration, lowest state of charge reached, and what it recovered to. Runs shorter
than a minute are not episodes, matching the imbalance rule.

**Charging and discharging.** Time-weighted mean charge and discharge power;
the share of time spent charging, discharging and idle; and the energy moved in
each direction over the window.

The idle band needs a floor for the same reason imbalance did: a battery sitting
at 4 W is not charging. Default 50 W, editable in the options.

Energy is obtained by integrating `battery_power`, and is labelled as estimated
from power rather than read from a meter — with partial coverage it understates,
and the coverage figure is already on screen.

## 6. Equivalent full cycles

`discharged energy ÷ capacity`, per day of the window. Without
`battery_capacity` there is no denominator, so the figure is a dash with a line
saying which field would produce it — never a guess from the state of charge
alone.

## 7. The sign convention, checked rather than assumed

`battery_power` is invertible because vendors disagree about which direction is
positive. The wizard asks, and a user who answers wrongly inverts the entire tab
silently: charging is reported as discharging, and the dip analysis is reversed.

The data settles it. Aligning state of charge with battery power, the charge
must rise while the configured-positive direction flows. If the opposite holds
for most of the measured time, the tab says the sign looks inverted and names
the checkbox that fixes it.

This is the same idea as §8, applied to a single sensor: we hold two readings
that must agree, so we can check them instead of trusting the setup.

## 8. Total against parts (separate, smaller)

The Load tab stores both a total and its per-phase parts, and the same for PV
and its strings, and never compares them. A user who maps the grid clamp as the
load total gets a page of confident, wrong numbers, and no wizard can catch it —
only the data can.

Over the aligned timeline, compare the total's time-weighted mean with the sum
of the parts'. Beyond a generous margin (25%, since a total may legitimately
include something the parts do not), the status row asks whether one of them is
mapped to the wrong sensor and prints both figures. Phrased as a question: a
mismatch is evidence, not proof.

## 9. Out of scope

- **Round-trip efficiency and metered energy.** `battery_charge_total` and
  `battery_discharge_total` are `total_increasing`, which needs `sum`/`state`
  statistics; `source.py` asks only for `mean`. That extension belongs with the
  Balance tab, which needs it for six sensors at once. Deriving efficiency from
  integrated power instead would produce a number too sensitive to gaps to
  defend.
- Time-series charts. The tab's idiom is distributions and episodes.
- Temperature, cell voltages, state of health, forecasting.

## 10. Testing

The dip floor gets the treatment the imbalance floor got: a test proving that a
window sourced from hourly means yields no episode table rather than a
misleadingly empty one, and a test that a dip shorter than a minute is not an
episode.

The sign check is tested both ways round, including the case where the battery
barely moves and there is nothing to conclude — which must produce no warning
rather than a coin toss.

Live verification must cover a real dip, because every previous round found on
screen what the tests could not.
