# Charge ceiling and the no-export Sun rule — design

## 1. Goal

Two Sizing verdicts are wrong for a common installation: a hybrid inverter
with **no export** and a **charge limit changed by season** (85 % in summer
for battery health, higher in winter).

- *Days the battery filled* compares the charge with a fixed mark
  (`battery_full_pct`, 95 % by default). A battery capped at 85 % never
  counts as full, so the battery verdict reads "never filled" all summer and
  the Sun rule's fill clause can never pass.
- The Sun rule needs production of at least 100 % of consumption. Without
  export, production cannot exceed consumption plus charging, so the share
  tops out near 100 % and *enough* is unreachable — even in a summer when
  the inverter is throwing sun away.

This change recognises "full" from the battery's behaviour instead of a
number, and judges the sun of a no-export installation by how often it
filled the battery to its limit.

## 2. Ceiling hours

A **ceiling hour** is an hour, read from long-term statistics, in which the
inverter stopped charging the battery although the sun was up. All of:

| Condition | Read from | Constant |
|---|---|---|
| PV was producing | `pv_power` hourly mean ≥ `CEILING_PV_MIN_W` | `CEILING_PV_MIN_W = 100.0` |
| The battery stood still | `battery_power` hourly min ≥ −idle **and** max ≤ +idle, idle = `battery_idle_w` option or `DEFAULT_BATTERY_IDLE_W` | — |
| The charge was flat | `battery_soc` hourly max − min ≤ `CEILING_SOC_FLAT_PCT` | `CEILING_SOC_FLAT_PCT = 1.0` |
| Not held at the floor | `battery_soc` hourly min ≥ `low_pct + CEILING_ABOVE_LOW_PCT` | `CEILING_ABOVE_LOW_PCT = 20.0` |

The minimum and maximum of battery power are used, not the mean: half an
hour of charging and half an hour of discharging average to zero. The
condition is symmetric, so the sign of `battery_power` does not matter.

In self-consumption mode an inverter stops charging with the sun up only
when the battery has reached its limit, or when it is held at the floor —
which the last condition excludes. So a ceiling hour means "full", whatever
the limit was set to that month.

A pure function `ceiling_hours(soc, battery, pv, *, low_pct, idle_w) ->
set[datetime]` in `analytics/sizing.py` takes the three sensors' hourly
rows and returns the start of every ceiling hour, joining the rows by their
`start`. An hour missing from any of the three is not a ceiling hour.

## 3. Which "full" is used

- `battery_soc`, `battery_power` and `pv_power` all mapped → **ceiling
  mode**: a day is full when it contains at least one ceiling hour.
- Otherwise → **fixed mode**, as today: a day is full when its hourly
  maximum charge reached `full_pct`.

`battery_evidence` gains `ceiling: set[datetime] | None`. With a set, a day
is full when one of its hours is in the set; with `None`, the fixed mark
applies. Everything downstream of "full" — the battery verdict, the fill
share in the Sun rule, the *never filled* reason — is unchanged.

The payload's `rules` gains `full_mode: "ceiling" | "fixed"`. The full mark
`full_pct` stays in `rules`; in ceiling mode it is unused, and the inverted
thresholds check (`full_pct <= low_pct`) applies only in fixed mode.

## 4. Export

`export_limited: bool | None` for the whole window, put in `rules`:

1. `grid_export_total` mapped and the window has rows → `True` when its
   total is at most `EXPORT_LIMITED_SHARE = 0.01` of the PV total, else
   `False`.
2. Otherwise `grid_power` mapped and the window has rows → `True` when no
   hour's minimum went below `−grid_zero_w` (option, or
   `DEFAULT_GRID_ZERO_W`), with the sensor's configured sign applied so
   that negative means export. Else `False`.
3. Otherwise `None` — unknown, read as exporting.

Decided once for the window and used for every month, so the strip reads
one rule.

## 5. The Sun rule

With export (`export_limited` is `False` or `None`) the rule is unchanged,
except that *filled* now follows §3.

Without export (`export_limited` is `True`):

- **enough** when the fill share is at least `SOLAR_FILL_SHARE` (0.8): on
  most days the sun took the battery to its limit and more was available;
- **borderline** when the fill share is at least
  `SOLAR_CURTAILED_BORDERLINE_SHARE = 0.4`, or production is at least
  `SOLAR_BORDERLINE_SHARE` (0.7) of consumption;
- **short** otherwise.

Without a fill share (no charge data) the no-export rule cannot be read:
the block is withheld with the reason `no_fill`, rather than judged on a
share that cannot reach *enough*.

`rules` gains `solar_curtailed_borderline_share`. The note
`covers_but_battery_not_filling` is set only in the export rule.

## 6. Panel

- The battery rule sentence in ceiling mode says the battery "reached its
  charge limit with the sun up" instead of "filled to 95 %".
- The Sun rule sentence has a third form for the no-export rule, built from
  the rules in the payload; `ruleSentence` picks it when
  `rules.export_limited` is true. It follows the full mode: "reached its
  charge limit with the sun up" in ceiling mode, "reached 95 %" (the fixed
  mark) in fixed mode, since export is decided without the power sensors.
- `reasonSentence` gains the solar reason `no_fill`, and `reasonHint` a
  short hint for it; the sentence says "filled", which is true in both modes.
  In ceiling mode the battery's `never_full` sentence and hint say the
  battery never reached its charge limit.
- A one-line note under the rules says which "full" was used. Why the Sun is
  judged by days at full without export is said in the opening clause of the
  no-export rule sentence itself, not in this note.

All strings in `en.ts` and `uk.ts`; types in `types.ts`.

## 7. Reading the sensors

`async_sizing_analytics` additionally reads hourly extremes for
`battery_power` and `pv_power` when both are mapped with `battery_soc`, and
for `grid_power` whenever it is mapped, so that an export counter that is
absent or has no rows can fall back to it as §4 orders. The export decision
is read only when the PV and consumption counters are mapped, because it
feeds only the Sun card; without them `rules.export_limited` is null.
Missing statistics for any of them falls back as §3 and §4 say; the card
never fails because a helper sensor is absent.

## 8. Known gaps

- A battery filled from the grid at night is not counted as full: a ceiling
  hour needs the sun. Right for the Sun question; for the battery verdict it
  leaves such days out of the count of full days.
- An inverter in a mode other than self-consumption (for example one that
  holds the battery for backup and never discharges it) can produce ceiling
  hours below its real limit. The 20-point margin above the low mark is the
  only guard.

Both go into `docs/known-gaps.md`.

## 9. Tests

- `ceiling_hours`: an hour meeting all four conditions; each condition
  failing alone; charge-and-discharge in one hour (mean zero, min/max not);
  an hour missing from one sensor.
- `battery_evidence` in ceiling mode: an 85 % plateau counts as full; a
  day with no ceiling hour does not; fixed mode unchanged.
- Export detection: by counter (under and over 1 %), by grid power (sign
  applied), unknown.
- Sun rule without export: enough, borderline by fill and by share, short,
  withheld `no_fill`; with export unchanged.
- Payload: `full_mode`, `export_limited`, `solar_curtailed_borderline_share`
  present; months use the period's export decision.
- Frontend: dictionary tests for the new sentences in both languages; a
  pure-function test for the sentence choice if it is moved out of the tab.
