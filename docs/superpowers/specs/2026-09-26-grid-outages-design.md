# Grid outages — design

## 1. Goal

How often the grid goes away, for how long, when in the day, and how the
battery coped each time. A fifth tab, **Grid**, answering the question a
household with a hybrid inverter asks most: *when the grid dropped, did we
make it through?*

The `grid_connected` role has existed since the first release, is described in
the wizard as "used to measure outages", and is read by nothing. This closes
that.

## 2. Where the signal comes from

The role is a `binary_sensor` that is `on` while grid power is present. In the
installation this was designed against it is a template sensor derived from
the inverter's own status, and nothing about the design depends on how it was
made — only on `on` meaning "grid present" and `off` meaning "grid absent".
Anything else — `unavailable`, `unknown` — is a gap in the data, never an
outage: an integration that lost its connection has said nothing about the
grid.

**A binary sensor has no long-term statistics.** Home Assistant compiles
hourly means for numeric sensors with a `state_class`; a binary one has
neither, so the only history is the recorder's raw states, kept for
`purge_keep_days`. This tab therefore reads raw states and nothing else, and
every window that reaches further back than the recorder keeps is answered
only for the part it can be:

- the payload carries `counted_from`, the earliest moment raw states exist,
  whenever the window starts before it;
- the interface says "Outages counted from <date> — the recorder keeps no
  earlier history of this sensor", every time that holds. Unlike the battery
  tab's dip cutoff this is said whether or not data existed before, because
  here it never can, and a thirty-day window silently answered from ten days
  is the reading this project exists to prevent;
- coverage is the share of the *countable* span the sensor had data for, not
  of the window requested. A ten-day recorder asked about a month is not "33%
  covered"; it is fully covered from the date it names.

The precision badge reads "Exact data" — the source is raw whatever the
window — and the counted-from note beside it carries the limit.

## 3. What an outage is

A contiguous run of `off` lasting at least `OUTAGE_MIN_SECONDS = 60`, the same
floor every other episode on this page uses. Shorter interruptions are real
and are not hidden: their count is reported as "brief interruptions under a
minute", a figure of its own rather than rows in the table. A template sensor
updates when the inverter is polled, so nothing shorter than the poll interval
can be seen at all; the number is a floor on flickers, not a count of them.

**A gap does not end an outage.** Home Assistant restarting in the middle of a
three-hour outage leaves the sensor unavailable for thirty seconds, and read
naively that is two outages of ninety minutes with a "longest" figure that is
wrong. A run of `off`, a gap of at most `OUTAGE_BRIDGE_SECONDS = 600` with no
`on` inside it, and another run of `off` is one outage. The episode records
`bridged_seconds` so the table can say what was assumed. A gap longer than
that ends the outage at the last moment the grid was known to be absent: the
tab does not guess what happened while nobody was recording.

**The window's edges.** An outage in progress when the window opens starts at
the window's start and is marked `started_before_window`; one still in
progress when it closes ends at the window's end and is marked `ongoing`. Both
show their duration as "at least", because that is what is known.

## 4. The figures

The KPI row: number of outages, total time without grid, share of measured
time without grid, the longest outage with when it began, mean duration, and
brief interruptions. A dash where there is no measured time — no data is not
zero outages.

The share is of *measured* time, the seconds the sensor had a state, and the
interface says "of measured time". Dividing by the window would let a sensor
that was unavailable for half the period report half the outages it had.

**By hour of day.** Twenty-four buckets in the installation's zone, each
holding the seconds without grid and the seconds measured, drawn as the share
of measured time the grid was absent in that hour. A share rather than raw
hours, because under uneven coverage raw hours compare an hour the recorder
saw ten times with one it saw twice. Hours with no measured time are drawn
empty, not as zero.

**By day.** One bar per local day: hours without grid and the number of
outages that began that day. An hourly piece is never split across days;
`split_local_hours` does the cutting the way the Seasonality tab already does
it. Days the sensor had no data for are absent from the chart, and the note
says how many there were: a bar at zero would read as a calm day.

## 5. The battery during each outage

When `battery_soc` is mapped, every outage in the table carries the state of
charge in force when it began, the state in force when it ended, the minimum
reached inside it, and whether that minimum fell below `battery_low_pct` — the
same mark the Battery tab's dips use, so the two tabs agree on what "low"
means. When `load_power` is mapped, the time-weighted mean load during the
outage as well.

The minimum here is real: this tab works from raw states, so a fall to 8% for
twenty minutes is an 8%, not the 34% an hourly mean would make of it.

A column whose sensor is not mapped is not there. A cell whose sensor had no
data inside that outage shows a dash. Nothing is interpolated across an
outage — the value in force at its start is the last sample before it, which
is what the recorder means by a state.

## 6. Autonomy, measured on the battery rather than the nameplate

*If the grid went away now, how long would the battery last?* The obvious
answer multiplies the configured capacity by the state of charge and divides
by a load; it compounds a number the user typed with a percentage the BMS
estimates, and the result looks precise. This tab does not do that.

The discharge rate is read off the battery itself, during the outages it
actually had: the sum over outages of the state of charge lost, divided by
the sum of their durations, in percentage points per hour. From that:

- **from full**: `(100 − battery_low_pct) / rate` hours;
- **from where it is now**: `(soc_now − battery_low_pct) / rate` hours, where
  `soc_now` is the last known state of charge in the window, and only when it
  is above the low mark.

Both are labelled "at the rate seen during this period's outages", with the
evidence beside them — how many hours of outage the rate rests on, and the
mean load during them, so the reader can judge whether a summer afternoon's
outage says anything about a winter evening's.

It is withheld, with the reason on screen, when:

- there were no outages, or no state of charge inside them;
- the evidence is under `AUTONOMY_MIN_HOURS = 1` of outage;
- the net change is not a fall — the sun covered the outages and the battery
  charged or held. There is no discharge rate to read, and saying so is more
  useful than inventing one.

`battery_capacity` is not used. It is not needed, and an answer that does not
depend on it cannot be wrong because of it.

## 7. Inferred outages, for an installation with no sensor

When `grid_connected` is not mapped but grid power and battery power are,
the tab can *infer* outages from the flows: a moment is off-grid when the
grid is exchanging nothing — `|grid| ≤ grid_zero_w` — while the battery is
discharging below `battery_idle_w`. Grid power is `grid_power` when mapped,
otherwise the aligned sum of `grid_power_phase`. The rule has its own floor,
`INFERRED_MIN_SECONDS = 300`: a flicker cannot be inferred, and pretending to
count them would be noise.

This is the weakest thing on the page, and it says so. The tab carries a
banner whenever it is in this mode:

> Inferred from power flows, not measured. A night the battery carries the
> house with nothing crossing the grid connection looks exactly like an
> outage, and a daytime outage the sun covers is not seen at all. Map a
> sensor that reports grid presence to measure instead.

Brief interruptions and gap bridging are not reported in this mode — neither
has a meaning when the outages themselves are a guess. The payload's `source`
is `"inferred"` rather than `"sensor"`, and every section that shows a number
from it inherits the banner rather than repeating it.

`grid_zero_w` is a new advanced option — a current-transformer reading is
never quite zero, and how far from zero depends on the clamp — defaulting to
`DEFAULT_GRID_ZERO_W = 10`.

## 8. Finding the sensor

Detection today reads only the `sensor` domain and only power, energy and
battery device classes, so a grid-presence sensor has never been seen by it.
It starts reading `binary_sensor` as well, but such a sensor is not part of
an inverter's cluster: it describes the site, is usually a template the user
wrote, and shares neither the inverter's device nor its name prefix.

So it is offered to every cluster rather than clustered. A binary sensor whose
object id says `on_grid`, or `grid_` followed by `connected`, `status`,
`online`, `present` or `available`, is a candidate. Exactly one candidate
fills `grid_connected` on its own; more than one becomes an `Ambiguity` —
"Which sensor says the grid is present?" — asked through the same mechanism
as the current-transformer question. This is the first time a second question
exists outside a test, which `docs/known-gaps.md` lists as unverified.

Because `grid_connected` becomes something a feature is waiting on, the
existing `unmapped_sensors` repair raises for an installation that has the
sensor and is not reading it, with no further work.

## 9. Availability

The Grid feature is available when `grid_connected` is mapped, **or** when
`grid_power` and `battery_power` are, **or** when `grid_power_phase` and
`battery_power` are. `Feature` gains a tuple of alternative role sets for
this; `requires` stays the primary set and stays what `missing` is reported
against. An installation running in inferred mode therefore still has
`grid_connected` listed as missing — which is right, because mapping it is
the improvement the banner asks for, and the repair card should keep saying
so.

## 10. Sections

**Status row.** The precision badge, the counted-from note, the coverage
warning, the clamped-window warning, and in inferred mode the banner.

**KPIs.** As in section 4.

**By day** and **by hour of day**, two bar charts.

**Outages.** A table: start, duration ("at least" where the edge was the
window's), then the battery columns when their sensors are mapped, then the
mean load. An outage below the low mark carries the overload colour on its
minimum. Empty state: "No outages in this period", beside how much time was
measured — "none in 9 days 4 h of measurement" is a different sentence from
"none".

**Autonomy.** One card, or one sentence saying why not.

## 11. Out of scope

- **Grid power analytics** — import and export distribution, peak import,
  per-phase exchange. The tab is the natural home for it, and a later
  iteration's work.
- **A month-by-month view.** A ten-day recorder cannot fill one; users with
  longer retention get the day chart, which already answers it.
- **Notifications** when an outage begins. That is an automation on the
  sensor itself, not analytics.
- **Cost of outages**, for the reason every other tab gives about money.

## 12. Testing

The pure payload is tested on hand-built binary series: a run under a minute
counted as a brief interruption and not an outage; a gap inside an outage
bridged when short and splitting it when long, with `bridged_seconds` carried;
an outage in force at the window's start and one running past its end, each
flagged; the share of measured time computed against measured seconds rather
than the window; hour-of-day and day buckets in a zone with a daylight-saving
transition inside the window.

The battery columns are tested for the value in force at an outage's start, a
minimum that lies inside the outage and not before it, and a dash when the
state of charge has no data there. Autonomy is tested for each reason it is
withheld and for the two figures when it is not.

Inferred mode is tested for its rule — grid at zero with the battery
discharging counts, grid at zero with the battery resting does not — and for
the per-phase sum standing in for a missing total.

Detection is tested for one candidate filling the role, two becoming a
question, and none leaving it empty; and for the candidate reaching every
cluster rather than one.

Live verification builds a history for the sensor itself: an outage of a
hundred seconds, a twenty-second flicker, a three-hour outage with a
thirty-second `unavailable` gap in the middle and a state of charge falling
through the low mark inside it, and one still running when the window ends.
The table, the KPIs and the autonomy figure are read back from the screen,
and the detection is run against a template binary sensor the way a user
would have made one.
