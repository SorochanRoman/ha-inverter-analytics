# Seasonality — design

## 1. Goal

The last unanswered part of the original request: how the load changes with the
month of the year, and how the shape of a day changes with it.

## 2. What makes this tab different from the others

Every tab so far could be answered from a few days of raw states. This one
cannot: a question about months needs months, which means it is answered almost
entirely from long-term statistics — the path the project has never verified
against real hourly data. That is a feature of the plan, not a risk to route
around: building this tab is what finally exercises it.

## 3. The decision that makes the numbers comparable

The Phases tab turned on the load floor and the Battery tab on what an hourly
mean can and cannot show. This tab's equivalent is coverage.

**A month with three days of data is not comparable with a month that has
thirty.** Plotted side by side they look like a measurement and a conclusion —
"April collapsed" — when the truth is that the recorder was set up in April, or
the integration was offline, or the window simply starts mid-month.

So every bucket carries its own coverage, the chart marks any month below a
threshold (60%) as incomplete rather than quietly drawing it, and the figure
stays visible with its coverage beside it. Hiding it would be its own kind of
lie: a gap in the bars invites the reader to invent a reason.

The same applies to the first and last months of any window, which are almost
always partial. They are the most likely to mislead and the least likely to be
noticed.

## 4. Peaks, and why this resolves differently from the Battery tab

Long-term statistics store an hourly *mean*. The Battery tab responded by
refusing to compute dips outside the raw window, because a minimum taken over
hourly means is not a minimum of anything the battery did.

Here the same restriction would empty the tab: a question about months has no
answer inside a ten-day retention. So the resolution is the other one available
— **report the figure and name it for what it is**. A month's peak is labelled
the highest hourly average, never the peak load, and the interface says so
where it is shown rather than in documentation nobody reads.

Means are unaffected: a duration-weighted mean of hourly means is the mean.

## 5. Sections

**By month.** Mean load per month across the window, with PV beside it when a
PV power sensor is mapped. Each bar carries its coverage; incomplete months are
marked.

**By hour of day.** Mean load for each hour across the whole window, which
answers "when is the house busy" but deliberately blends seasons.

**Month by hour.** The section that justifies the tab: a heat map of mean load
for each hour of each month, which is where a winter evening peak and a summer
midday one become visible as different shapes rather than different averages.

**Mean power, not totals.** A month's total energy depends on how many days it
has, so comparing totals compares calendars. The mean is length-independent,
which is what the question asks about.

## 6. Time zones

A month boundary and an hour of the day are both local-time concepts, and the
existing `hour_of_day_durations` already gets this right: the arithmetic is done
in UTC and the local zone is used only to work out which bucket a moment falls
in, so daylight-saving transitions neither create nor lose seconds.

All three views need exactly that, so the splitting is extracted into one
primitive and `hour_of_day_durations` is moved onto it. One place gets DST right
instead of three places each getting it right separately — which is the shape of
a bug waiting for the third one.

## 7. Out of scope

- **Year-on-year comparison.** Windows are capped at 400 days, so the same month
  in two different years cannot both be in view. Lifting the cap is a separate
  decision about how much a single query may ask of the recorder.
- Weather or degree-day normalisation. "Colder than last year" is a different
  question from "different from last year", and answering the first needs a data
  source this integration does not have.
- Forecasting.

## 8. Testing

The bucketing primitive is tested across a daylight-saving transition in both
directions, and for the property that the seconds it emits sum to the input's
duration.

Coverage marking is tested for the case it exists for: a partial first month
beside a full one, where the mean alone would read as a collapse.

Live verification has to seed real long-term statistics rather than raw states,
since no other test in the project ever has. Without that this tab is verified
only against data it will not see in production.
