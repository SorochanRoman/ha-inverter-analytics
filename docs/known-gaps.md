# Known gaps

What is verified, what is not, and what the next tabs will have to change.
This is not a wish list — it records what was deliberately left out and what
has not been proven, so the next plan is written with open eyes instead of
discovering it mid-flight.

## 1. Verified in a live Home Assistant

Three rounds of work have been brought up against a real HA 2025.1.4 instance
(Python 3.12) with `recorder`, the real config flow and real sensors.

**Core analytics.** The integration loads with no errors; the bundle is served
as `text/javascript`; the sidebar item appears; the Load tab renders KPIs, the
histogram, the duration curve, the rated-power bands and the overload table;
switching period refetches and the precision badge changes from "Mixed since
<date>" to "Exact data"; the watts/percent toggle rebuilds the axis.

**Detection and the wizard.** Discovery offered "Deye — 7 sensors" and the
confirm step arrived pre-filled with the total load, all three phases *in
order*, both PV strings and the battery state of charge, with no manual typing.

**Imbalance episodes and the load floor.** A history built for it — 100 s of
heavy imbalance, a balanced stretch, 60 s of standby, then 80 s of moderate
imbalance — produced two episodes with their per-phase values, and 60 s
correctly excluded as below the load floor. Both had only ever been exercised
by unit tests against hand-built data.

**Long-term statistics, at last.** Five months of real hourly rows were
imported through `recorder/import_statistics` and the Seasonality tab was read
back from them: monthly means, the busiest hour, the hour-of-day curve and the
month-by-hour heat map all came from statistics rather than states, with the
deliberately thin month marked and the eight empty ones present but bar-less.
This closes the project's largest unverified area — and it found a defect the
moment it ran; see item 15.

**Round-trip efficiency against seeded statistics.** A battery cycle imported
beyond the recorder's retention — charged 60 kWh, discharged 50.4, ending 4.5
points from where it began — read back as exactly 84.0%, and the same figures
over a window whose charge drifted 23 points correctly produced no efficiency at
all with the reason on screen.

**Energy counters across a reset.** Six counters were imported as hourly
statistics over five days with one meter reset to zero mid-window — its
accumulated sum climbing, its own reading dropping, which is what the recorder
writes for a `total_increasing` sensor it has caught resetting. Every total came
back to the hundredth of a kilowatt-hour, no day held negative energy, and the
reset day is indistinguishable from its neighbours on screen.

**Battery analytics.** A history built for it — a charge, a hard discharge, a
70-second fall to 12%, a 15-second one that must not count, and a recovery —
produced exactly one episode with its lowest point and recovery, while the time
below the threshold counted both. The sign check reached a verdict once it had
enough evidence and correctly reported the wiring as right. The consistency
check raised nothing on a correctly mapped inverter.

**Phase and string analytics.** The payload carries `load_l1`/`load_l2`/
`load_l3` and `pv_s1`/`pv_s2` with their own coverage; the per-phase shares sum
to one; the Phases section renders the cards, the derived-rating note, the
aligned-coverage warning, the three imbalance figures and the distribution with
buckets above the threshold in the overload colour; the PV comparison renders
its cards and a labelled mean-versus-peak chart. No errors from our bundle in
the browser console.

**An entry stored in the pre-multi-entity shape still loads.** The instance
holds one from an earlier round with `"load_power": "sensor.…"` as a bare
string; it renders normally beside a new one.

## 2. What the live runs exposed

Each of these shipped green: typecheck, unit tests and build all passed, and
the defect was only visible on screen.

1. **`ReferenceError: process is not defined`** — the panel did not render at
   all. Vite in library mode does not substitute `process.env.NODE_ENV`, and
   ECharts depends on it. vitest runs under Node, where `process` exists.
2. **Median 9.1 kW beside a peak of 9.0 kW.** `percentile` interpolates to the
   bucket edge and could exceed the true maximum. Percentiles are clamped.
3. **The duration curve had the same overshoot** — the same contradiction moved
   from card-versus-card to card-versus-chart. The curve is clamped too.
4. **"Data missing 100% of the time" beside populated KPIs.** Rounding 99.99%
   up to a flat hundred read as "there is no data".
5. **Chart axis labels kept the previous theme's colours** and vanished on a
   light background. The tab rebuilds options when HA rewrites its CSS
   variables.
6. **"Covers 0% of the period" on every phase and string card** — item 4 in
   mirror image, in new code that formatted the share directly instead of going
   through the helper written for exactly this. `formatCoverage` never rounds a
   real measurement down to nothing.
7. **The inverter dropdown named the wrong inverter after a reload.** Lit
   assigns properties before the children exist, so `.value` on a `<select>`
   landed on an empty element and the browser fell back to the first entry: one
   inverter's data under another's name. Bound with `?selected` on the option.
8. **An episode reported a state the hardware never had.** Home Assistant
   writes one entity at a time, so a reading arriving after a very different
   one passes through a mixed state for a few milliseconds — 4000/5/5 between
   10/5/5 and 4000/2500/2500. The mean and p95 are time-weighted and shrugged
   it off; `peak_imbalance` is a maximum over instants and reported it, with
   the phase values printed beside it. align() now treats changes inside a
   settling window as simultaneous.
9. **A 100-second episode displayed as "2 min".** Episodes start at exactly
   sixty seconds, which is where rounding to whole minutes is worst.
10. **The panel bundle had no cache-busting.** Its URL never changed, so after
    an upgrade a browser holding the old file kept running the previous
    release's panel — no error, no hint that a reload would help. Found while
    trying to see a fix take effect and failing, twice, including after a hard
    reload. The URL now carries the manifest version.
11. **"Exact data" beside "dips counted from 19 August".** Both true — the
    entity had no statistics, and the recorder's retention still bounds where
    raw states can exist — and together reading as a contradiction. The cutoff
    is now announced only when data actually exists before it.
12. **Version-based cache-busting did not bust the cache.** The fix for defect
    10 keyed the panel URL on the manifest version, which does not move between
    releases — so it did nothing during development or for anyone tracking a
    branch, and the very next verification hit the same stale bundle. Keyed on
    a digest of the file's contents instead.
13. **A card titled "Energy in / out" showed the out figure.** Its sub-row was
    labelled "Charged", so the title's order contradicted what was on screen.
14. **A missing hour of statistics was read as a continuation.** A state
    persists until something changes it; a statistics row describes one hour
    and nothing more. Treating them alike carried the last value before an
    outage across the whole outage, so four seeded days of June came back as a
    fully covered month whose mean beat May's — and coverage is the one figure
    the Seasonality tab's honesty rests on. Only visible against real imported
    statistics, which nothing before this had ever used.
15. **"9 months are drawn in grey" when one was.** The sentence counted months
    with a thin bar together with months that have no bar at all. Two different
    problems, now two sentences.
16. **Two greys and a fault red in the energy legend.** The two grid
    directions were both grey and near-indistinguishable side by side, and
    charging the battery was drawn in the red this app uses for overloads.
    Every flow now has its own colour, checked by a test.
17. **A day's sources and sinks stacked into one bar.** The column added
    production to consumption — the same energy twice — and looked exactly
    like a daily total. Two stacks per day now, matching the chart above it.
18. **The chart legend never rendered.** ECharts is tree-shaken and *silently*
   ignores an option whose component was not registered, so the string
   comparison drew two unlabelled colours — while a unit test asserted
   `legend.data` was present and passed. Every option builder is now checked
   against the set of keys the registered components can render.

## 3. Still unverified

- **The Sizing tab, all of it.** Built and unit-tested; not yet read from a
  live instance. The live run imports hourly statistics with `min` and `max`
  for the load and the state of charge, and the counters, over three seeded
  months — one clearly enough, one clearly short, one in which the battery
  never fills — and reads the three cards and the monthly strip back,
  including the grey partial month at each end and the *never filled* reason.
- **The Grid tab, all of it.** Nothing in the outage work has been seen in a
  live Home Assistant; it rests on unit tests over hand-built series. The live
  run has to build a template `binary_sensor.grid_connected` from the
  inverter's grid status and let it record, then a day's history holding a
  100-second outage, a 20-second flicker, a three-hour outage with a
  30-second `unavailable` in the middle through which the charge falls past
  the low mark, and an outage still in progress at the moment of reading; then
  confirm **Reconfigure → Fill in what detection found** offers
  `grid_connected` pre-filled, and that adding a second matching binary sensor
  turns it into the question with both options and no count in its label; then
  read the 24 h period and find two outages plus the ongoing one in the table,
  one brief interruption in the KPIs, the three-hour outage present once with
  "(30 s unrecorded)", its lowest charge in the low colour and the ongoing one
  as "at least", and, switching to 30 days, the counted-from note carrying the
  recorder's own boundary; then check the autonomy rate against the charges
  the table shows; then unmap `grid_connected`, map the external CTs and
  battery power instead, and confirm the banner, the five-minute floor and the
  absent brief-interruption figure.
- **Inferred outages against a real zero-export night.** The rule is that
  nothing crosses the grid connection while the battery discharges — which is
  also what a house living off its own battery looks like. How often that
  misfires on a real installation is unknown; the banner exists because it is
  unknown, and it is not a substitute for finding out.
- **Installation through HACS.** The integration was copied into the config
  directory directly.
- **HACS validation in CI runs only for `main`.** It checks repository
  metadata — licence, description, topics — which GitHub exposes from the
  default branch only, so on a feature branch those checks measure nothing.
  `hassfest` runs everywhere, because it validates the manifest, which is code.
- **A sensor that genuinely lacks `state_class`.** Per-entity precision is
  proven by unit test with the recorder mocked; no live sensor has ever been
  missing its statistics while a neighbour had them.
- **Whether a typical load sensor carries `state_class` at all.** Without it
  there is no LTS, and a 30-day window on a 10-day recorder will honestly
  report roughly 33% coverage — which a user is likely to read as a bug.
- **The sidebar item appearing without a browser reload.**
- **Switching themes through the HA profile UI.** Verified by substituting the
  CSS variables, which reproduces the mechanism but not the interface.
- **Dates and numbers follow the panel language.** A Ukrainian panel formats
  with "uk". An English panel keeps the Home Assistant locale, so an en-GB or
  German profile sees no change — unless that locale is Ukrainian, in which
  case it formats with "en": the format helpers pick their units from the
  locale, and an English panel must not print кВт. HA's explicit
  `date_format` and `time_format` preferences are still ignored — only
  `language` is read.
- **The Ukrainian panel and `uk.json`, all of it.** Nothing in the Ukrainian
  work has been seen in a running Home Assistant; it rests on unit tests that
  every key is present and translated, and on the build. The live run has to
  switch the panel to UK and read every tab's headings, notes, cards, charts
  and the feature notice in Ukrainian, with numbers written with a comma and
  in кВт; reload and find the choice kept; switch back and find the English
  exactly as before; then open **Reconfigure** in a Ukrainian profile and find
  the labels and descriptions in Ukrainian.

## 4. Seams to widen before the next tabs

- **Cross-role phase counts are unvalidated.** `load_power_phase` and
  `grid_power_phase` may hold different numbers of entities. Nothing combines
  them yet, so nothing is wrong today; the Balance tab is where that stops
  being true.
- **No preset produces a `grid_power` total**, only per-phase parts. A
  three-phase Solarman user therefore has grid data as parts alone, so the
  balance work will have to sum there with no vendor total to prefer — the
  first place the "total wins" rule has nothing to apply to.

## 5. Deliberately deferred

**The panel and the forms choose their language separately.** The panel
follows its own `EN | UK` switch (or, until it is used, the Home Assistant
profile language); the setup and options forms follow the profile language
only, because Home Assistant renders them. With the panel in Ukrainian and
Home Assistant in English, the panel names a field in Ukrainian that the form
shows in English. Not worked around: the forms cannot be told to follow the
switch.

**English fragments inside the Ukrainian forms.** Several placeholders in the
forms and in Repairs are filled by the backend with finished English text —
`{found}`, `{no_statistics}`, `{sensors}`, `{features}` — so a Ukrainian form
still reads "3 sensors" in the middle of a Ukrainian sentence. The same goes
for the text of the inverter options on the first setup step, which the
backend builds whole ("Deye — 42 sensors", "— no load sensor found" in
`_cluster_label`, `config_flow.py`). `uk.json` can translate the sentence
around a placeholder but not what the backend puts in it. Doing better means the backend sending values that can be translated —
counts and keys rather than phrases — and the translation files composing
them; nothing else needs that yet, so it waits.

**The English Sizing rules say less exactly what the code does.** The battery
rule says the charge "fell to" the low mark, where the code counts a day when
it fell *below* it (`< low`); the inverter rule says "above 80%" of rated,
where the code counts 80% itself (`>= 80%`). The Ukrainian sentences follow
the code exactly, so on these two points the languages differ. The English
wording is a follow-up; it was left alone here because the Ukrainian work was
not to change a word of the English.

**Year-on-year comparison.** Windows are capped at 400 days, so the same month
in two different years cannot both be in view. Lifting the cap is a separate
decision about how much one query may ask of the recorder.

**Efficiency without a returning charge.** Round-trip efficiency is withheld
when the state of charge ends more than five points from where it started,
because the gap between charged and discharged is then mostly stored energy. It
could instead be corrected using the capacity and the drift — but that compounds
a user-entered capacity with a percentage reading, and a corrected number that
looks precise is worse than an absent one that explains itself.

**The autonomy rate's denominator.** The state of charge lost across the
period's outages is divided by their whole duration, not by the seconds the
charge sensor actually had a state inside them. A sensor that dropped out for
part of an outage therefore makes the discharge rate look gentler than it was.
Dividing by covered seconds instead would mean carrying a second timeline
through the calculation for a correction that only bites when the charge
sensor is unreliable — and if it is, the figure it produces is not worth
refining.

**Autonomy uncorrected for sun during an outage.** An outage the sun partly
covered has the battery recharging inside it, so the points lost per hour
understate what a night would cost. Correcting it needs PV production during
each outage and an assumption about how much of it reached the battery rather
than the load — and a rate built on that assumption would look precise while
resting on it. The tab instead prints the evidence beside the number: how many
hours of outage it rests on and the mean load through them, so the reader can
see what kind of outage it learned from. The one case where the sun wins
outright — no net discharge at all — is withheld rather than estimated.

**A real depth-of-discharge figure.** Measured across dip episodes it would be
the threshold minus the minimum, since every episode starts at the threshold by
construction. A true figure needs discharge runs detected from the charge
itself, which is noise-sensitive work no current tab needs.

**The sizing thresholds.** 1% and 5% of hours for the inverter, a quarter of
days for the battery, 100% / 70% of consumption and 80% of days filling for the
sun are judgement, not measurement. They are constants printed on the tab
rather than options, because a threshold a user can move is a verdict a user
can make say what they want; if a real installation shows them to be badly
placed, they move in code, with the reason recorded here. The same reasoning
puts a coverage figure on every card and not only on the month row: the row is
as covered as its best-covered sensor, counters included, so one sensor with a
full month of rows would otherwise vouch for a card read from twelve days.

**The units guard.** `SensorInfo.unit` is still collected and still unread. A
kW-reporting sensor mapped to a W role is off by a thousand, and detection could
refuse it or convert it; neither is written.

**Detection breadth.** The patterns were read off a live StephanJoubert
Solarman instance. Other vendors fall back to manual mapping. A shared name
prefix can still group a fraction of an installation — five battery sensors of
a `deye2_*` install clear the prefix floor on their own — but such a candidate
is now labelled "no load sensor found" rather than looking recognised.

**Style and robustness in pure code.** `duration_histogram` rebuilds its dict
per call; `Histogram.buckets()` allocates on each access; the deliberately
unreachable guard in hour bucketing is kept as documentation of the termination
invariant. `align()`'s window intersection cannot change its result — the gap
rule already covers it — and is documented as a narrowing, not a guarantee, so
that no test pretends to cover it.

**Test harness.** The swallowed `SocketBlockedError` during frontend setup, and
the global `ThreadedResolver` substitution in `conftest.py`. Both are
documented at the site with their reasoning.

**Frontend component tests.** There is no DOM environment in the suite, so
panel and section components are not rendered by any test. Logic that would
otherwise be untestable — `singleFlight`, `parseLocation`/`buildLocation`,
`formatCoverage`, the chart option builders — lives in its own modules and is
covered there. What remains uncovered is the wiring between them, which is why
the live run keeps finding what it finds.

## 6. What the phase work left behind

Written from reviewing the finished code rather than its spec.

- **`Ambiguity` now has its second question.** Each one carries the field it is
  asked through and each answer applies to its own role, and the grid work
  supplied the second case: more than one binary sensor matching the
  grid-presence pattern raises "Which sensor says the grid is present?"
  alongside the current-transformer choice. So the multi-question path is no
  longer a mechanism only a test has walked — but it is still only code and
  unit tests. Two ambiguities arriving together, and the flow asking both in
  one step, has never happened in a live installation; section 3 says what the
  live run must check.
- **Phase identity is read from the entity id**, and falls back to position when
  the name reveals nothing, labelling that case "Phase 2" without claiming
  which phase the hardware calls it. A repeated index drops the whole role to
  positional naming. What is *not* handled: a name whose number means something
  else entirely, which would be read as a phase index.
- **The derived per-phase rating divides by the highest phase index mapped**,
  so mapping L1 and L3 divides by three rather than two. If the hardware really
  has more phases than the highest one mapped, the figure is still optimistic.
- **`build_parts_summary` computes shares over the aligned timeline**, so they
  sum to one — but they are shares of the time every part had data at once, not
  of the whole window. The section says so; the numbers do not carry it.
