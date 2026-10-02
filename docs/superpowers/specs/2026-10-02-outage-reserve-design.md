# Outage reserve — design

## 1. Goal

*Would the battery have carried it, and with how much to spare?* The Grid
tab lists every outage with the charge at its start, its lowest point and its
end. This adds, for each outage, the two answers a household plans around:

- **hours left** — how much longer the battery would have lasted, at that
  outage's own rate of discharge, before reaching the low mark;
- **needed at start** — the charge it would have taken at the start to get
  through that same outage without going below the low mark.

And a summary above the table: the charge needed for the hardest outage of
the period, and how many outages the battery covered.

Stage 2 of the metrics roadmap. Out of scope: energy not supplied, an
outage log of the integration's own, "from the current charge" (the
existing *hours from now* card answers it).

## 2. History

Raw states only, as the tab already works: the grid sensor has no long-term
statistics, so outages are visible only inside the recorder's retention
(`purge_keep_days`). The tab already says where its counting starts. Nothing
changes there.

## 3. Per-outage figures

A pure function in `analytics/grid.py`, `reserve_columns(episode, low_pct)`,
takes one episode dict as `build_grid_payload` builds it and returns the
columns to add. For an episode with a charge at both ends:

- `drop` = `soc_start − soc_end`, in percentage points;
- `rate` = `drop ÷ (seconds ÷ 3600)`, points per hour;
- `hours_left` = `max(0, soc_end − low_pct) ÷ rate`;
- `needed_pct` = `low_pct + drop`, which may exceed 100.

Everything is in points of charge. The nameplate capacity is never
multiplied in, as with the existing autonomy.

Withheld — both figures `None` and `reserve_reason` set — in this order:

| Reason | When |
|---|---|
| `no_soc` | `soc_start` or `soc_end` is `None` or absent |
| `cut` | `started_before_window` or `ongoing`: the true drop is not visible |
| `no_net_discharge` | `drop ≤ 0`: the sun or a charge covered the outage |
| `too_short` | `seconds < RESERVE_MIN_SECONDS` (1800) or `drop < RESERVE_MIN_DROP_PCT` (2): with a 1 % SoC step the rate is noise |

Otherwise `reserve_reason` is `None`. The returned dict always has the three
keys `hours_left`, `needed_pct`, `reserve_reason` when a SoC sensor is
mapped; `build_grid_payload` merges them into each episode only then.

## 4. Summary

`payload["reserve"]`, present always, computed by a pure
`reserve_summary(episodes, low_pct)`:

- `worst_needed_pct` — the largest `needed_pct` among episodes that have one,
  else `None`;
- `worst_start` — that episode's `start`, else `None`;
- `covered` — episodes whose `soc_min` is not `None` and `≥ low_pct`;
- `judged` — episodes whose `soc_min` is not `None`.

Without a SoC sensor: `None`, `None`, `0`, `0`.

## 5. Panel

In the outage table, when `has_soc`, two columns after *At end*:
**Hours left** and **Needed at start**.

- A figure renders with the existing formatters (`formatHours`,
  `formatPercent`). `hours_left` of 0 with `below_low` reads "did not last";
  `needed_pct > 100` reads "> 100%" with a hint "more than a full battery".
- A withheld figure renders a short reason in the cell, in quiet text, the
  way the Sizing tab's month cells do: "no charge data", "outage cut by the
  period", "sun covered it", "too short to judge".

In the Autonomy section, two cards:

- **Hardest outage needs** — `worst_needed_pct` as a percentage, with
  `worst_start` under it; a dash and a one-line reason when `None`.
- **Outages covered** — "covered of judged", e.g. "5 of 6".

And one note: the drop of an outage depends on the hour and the load, so a
daytime outage says little about a night one.

All strings go into `en.ts` and `uk.ts`; types in `types.ts`
(`OutageEpisode` gains the three optional fields, `GridPayload` gains
`reserve`).

## 6. Tests

- Python, `tests/test_grid.py`: `reserve_columns` for a normal outage, each
  reason, the thresholds at their edges, `soc_end` below the low mark
  (`hours_left` 0), `needed_pct` above 100; `reserve_summary` with and
  without figures; `build_grid_payload` carries the columns only with a SoC
  sensor, and always carries `reserve`.
- Frontend: dictionary tests for every new function with values in both
  languages; `messages.test.ts` and the typecheck already guarantee the
  Ukrainian is complete.

## 7. Release

0.7.0, with the README's Grid section describing the two columns and the
cards.
