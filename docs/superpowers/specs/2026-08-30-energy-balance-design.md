# Energy balance — design

## 1. Goal

Where the energy came from and where it went: production, consumption, the grid
in both directions and the battery in both directions, over a period. Plus the
two figures people actually want from that — self-sufficiency and
self-consumption.

## 2. Energy is not power, and does not travel the same road

Every tab so far reads a *rate* and weights it by time. This one reads
*counters*, and that changes the source path rather than merely the arithmetic.

The six energy roles are `total_increasing` sensors: they climb until the
vendor resets them, nightly or yearly or on a firmware whim. Home Assistant's
statistics already handle that — the recorder detects the dip and keeps its
accumulated `sum` climbing across the reset — and exposes the answer directly as
the `change` type, which is what its own Energy dashboard uses.

Reading raw states instead would mean re-implementing reset detection, and
getting it wrong turns one nightly reset into a day of negative production.

**So energy comes from statistics for every window, including today's.** This is
a deliberate departure from `plan_precision`, which chooses raw states for
recent windows because they are more precise. For a counter they are not more
precise; they are merely raw. The tab says which it used, as every tab does, but
the answer here is always the same one.

## 3. The consequence to state plainly

Hourly statistics are compiled at the end of each hour, so **the current hour is
not in them yet**. A window ending now is short by up to an hour: negligible
across thirty days, roughly four percent across one day.

The payload therefore reports the span the statistics actually cover, and the
interface shows it when it differs from the period requested. Silently
returning "today's energy" that stops fifty minutes ago is the kind of small lie
this project has spent four rounds removing.

## 4. The balance, and what its residual really is

Conservation says:

```
PV + grid import + battery discharge  =  load + grid export + battery charge
```

It never balances exactly. The difference is inverter conversion loss, battery
round-trip loss, and sensor disagreement — which is a genuinely interesting
number and also an easy one to overclaim.

Two rules keep it honest:

- **The residual is shown only when all six counters are mapped.** With any of
  them missing, the residual is dominated by what is missing rather than by
  losses, and would read as an efficiency figure while measuring an omission.
  The flows that *are* mapped are still shown; only the balance line waits.
- **It is labelled "unaccounted", never "losses" or "efficiency".** We can say
  the books do not close and by how much. We cannot say the missing energy
  became heat in the inverter rather than error in a clamp.

## 5. Self-sufficiency and self-consumption

```
self-sufficiency = (load − grid import) / load
self-consumption = (PV − grid export) / PV
```

Each needs its own two sensors and nothing else, so each appears as soon as its
pair is mapped rather than waiting for the full six. Both are clamped to 0–100%
and suppressed when the denominator is at or near zero: a night with no
production has no self-consumption figure, and "0%" would be a claim rather than
a shrug.

## 6. Sections

**Totals.** One card per mapped flow, in kWh.

**Sankey-in-a-bar.** Two stacked bars — sources and destinations — over one
axis, so the balance is visible as the two bars matching or not. A real Sankey
would need another ECharts component and reads worse at this size.

**Day by day.** Stacked bars of the same flows per local day, which is where a
week of bad weather or a night of grid import becomes a shape rather than a
number.

**Self-sufficiency and self-consumption**, with the arithmetic written out
underneath, because a percentage nobody can reconstruct is a percentage nobody
trusts.

## 7. Days are local

A day boundary is a wall-clock idea. Each hourly row is bucketed by the local
date of its start, using the installation's zone the way the Seasonality tab
does. An hourly row is never split, so no daylight-saving arithmetic is needed
here — the day that gains an hour simply has twenty-five rows.

## 8. Out of scope

- **Cost.** Tariffs, standing charges and export rates are a separate domain,
  and a wrong number about money is worse than no number.
- **Per-device consumption.** This tab is about the inverter's own accounting.
- **Carbon.** Same reasoning as cost, plus a data source we do not have.

## 9. Testing

The reset case is the one that matters: a counter that drops to zero mid-window
must not produce negative energy. It is tested against `change` rows, which is
how it will actually arrive.

The residual is tested for its gate — five of six sensors mapped must produce
flows and no balance line — and for the sign convention, so that "unaccounted"
means energy that went in and did not come out.

Live verification imports counter statistics with a reset in the middle, since
that is the case no unit test can prove is being read the way HA writes it.
