# Multi-series roles, auto-detection and three-phase analytics — Design Spec

**Date:** 2026-08-29
**Status:** approved, ready for implementation planning
**Builds on:** `2026-08-29-inverter-analytics-design.md` (phases 1-3, shipped)

## 1. Goal

Four problems, in the order the user raised them:

1. **The setup wizard asks for too much.** Seventeen fields, no explanation of
   what any of them mean, and no indication which ones matter.
2. **No one-click setup for Solarman.** Every user maps every sensor by hand.
3. **No support for several PV strings.** A role maps to exactly one entity.
4. **No support for three-phase inverters.** Same limitation, plus no analysis
   of the imbalance that three-phase hardware actually fails on.

Problems 3 and 4 are the same limitation seen twice, and fixing it is what makes
1 and 2 tractable: adding per-phase and per-string fields to the current flat
form would take it from seventeen fields to over thirty.

## 2. Why now

`entity_id("load_power")` is currently read by exactly **one line** of code.
The one-entity-per-role assumption has not spread yet. Once the Battery,
Seasonality and Balance tabs are written against it, every one of them becomes
a site that has to change. This is the cheapest moment this change will ever be.

## 3. Scope

**In:** field descriptions; entity auto-detection with a Solarman preset; roles
that hold several entities; three-phase load analytics in the Load tab.

**Out:** per-string PV charts. The mapping is captured and stored so nothing is
lost, but the charts belong to the tab that owns PV, and that tab does not
exist. Inventing a home for them here would make the Load tab a dumping ground.

## 4. Roles gain multiplicity

`EntryConfig.entities` becomes `Mapping[str, tuple[str, ...]]`. `Role` gains a
`multiple: bool` flag. Roles that are single by nature — battery SoC, energy
counters — keep a one-element tuple and are still read through `entity_id()`.

**A total and its parts are separate roles, not one role with several entities.**

| Role | Multiple | Example from a real Solarman instance |
|---|---|---|
| `load_power` | no, required | `sensor.solarman_total_load_power` |
| `load_power_phase` | yes | `sensor.solarman_load_l1_power` … `l3` |
| `pv_power` | no | `sensor.solarman_power_production_now` |
| `pv_power_string` | yes | `sensor.solarman_pv1_power`, `pv2_power` |
| `grid_power` | no | — |
| `grid_power_phase` | yes | `sensor.solarman_external_ct_l1_power` … `l3` |

Aggregation rule: **if the vendor publishes its own total, use it.** That is a
measurement; a sum of parts is a reconstruction. Sum the parts only when no
total is configured. When both exist, the total feeds the headline analytics and
the parts feed the per-part section.

This matters concretely: `total_load_power` and `load_l1 + l2 + l3` will not
agree exactly — different measurement points, different polling instants.
Silently substituting one for the other would display a number no instrument
measured.

## 5. Detection

Two stages, neither relying on entity names alone.

**Grouping.** Try the Home Assistant device registry first: devices owning at
least one power sensor. The StephanJoubert Solarman integration is configured in
YAML and may register no device, so there is a fallback: cluster entities by
`object_id` prefix. On the reference instance that yields exactly two clusters,
`solarman_*` and `deye12_sun12k_*` — two inverters. Phone batteries, a printer
and a boiler do not join either cluster, because they share no prefix with an
inverter. Filtering on `device_class` alone would have swept all of them in.

**Classification inside a cluster.** `device_class` and unit are the primary
signal; a regex over the `object_id` suffix is secondary:

| Pattern | Role |
|---|---|
| `pv(\d+)_power` | `pv_power_string`, index from the match |
| `load_l(\d)_power` | `load_power_phase`, phase from the match |
| `total_load_power` | `load_power` |
| `(internal\|external)_ct_l(\d)_power` | `grid_power_phase` candidates |
| `battery_power` / `battery_soc` | `battery_power` / `battery_soc` |
| `total_(battery_charge\|battery_discharge\|production\|load_consumption)` | matching energy counters |

Indices come from the name, so a fourth PV string is picked up without a code
change.

`pv_power_string` and `grid_power_phase` are detected and stored but not yet
analysed — the same decision as for PV charts in section 3. Capturing them now
means a user configures once; leaving them out would mean asking them again when
the tab that uses them arrives.

## 6. The wizard becomes three steps

**Discover.** A list of what was found — "Solarman — 24 sensors", "Deye12
SUN12K — 10 sensors", "Manual". One click.

**Confirm.** The detected mapping, grouped, every row an editable picker
pre-filled with the detected entity. This step also carries the one field
detection cannot supply: **rated power**. It appears nowhere in the sensor data
and cannot be inferred.

This step also resolves an ambiguity the preset must not decide silently. The
reference instance exposes **two CT sets**, `internal_ct_l*` and
`external_ct_l*`. Conventionally the external clamp sits on the service entrance
and measures grid exchange while the internal one is the inverter's own
measurement — but that depends on how the installer wired it. The wizard asks,
with that explanation, rather than guessing.

**Manual.** The full form, grouped into sections, shown only when detection
found nothing or the user chose it.

## 7. Field descriptions

Every field gets a `data_description` entry in the translations, which Home
Assistant renders as grey helper text under the input. Not a restatement of the
label — what the label does not tell you:

- **Rated power** — "The inverter's continuous rated power in watts, from its
  nameplate. Load bands and overload episodes are measured against it. For a
  SUN-12K this is 12000."
- **Load power** — "Total consumption on the inverter's output. If you also have
  per-phase sensors, map them below to get imbalance analysis."
- **Invert sign** — "Enable if your sensor reports discharge as a positive
  number. Easy to check: look at the sign while the battery is charging."

The confirm step additionally **warns about sensors without `state_class`**.
The reference instance has three (`micro_inverter_power`, `total_power`,
`gen_power`). No long-term statistics exist for those, so any window longer than
`purge_keep_days` will come back empty. Saying so during setup is the same
principle the rest of the project follows: surface it now, not in a month.

## 8. New primitive: series alignment

Everything per-part depends on one thing the codebase does not have. Phases are
independent entities with independent state-change timestamps; computing
instantaneous imbalance requires a common timeline.

`align(series_list) -> list[AlignedInterval]` is added to `resample.py`: it
merges N step functions into intervals over which **every** series is constant.
The sum of parts, the imbalance and the string comparison all build on it.

It inherits the existing rule: **a gap in any series invalidates the interval.**
Imbalance cannot be computed while one phase is unknown. The consequence must be
reported rather than hidden — the aligned view's coverage is always lower than
any individual series' coverage, and it is its own number, not the one in the
header.

## 9. Phase imbalance

Per phase: time-weighted mean, p95, peak, share of total. Imbalance at an
instant is `(P_max − P_min) / P_avg` across the three phases.

**One detail decides whether this chart is useful or noise.** At night, with
20 W of load, a 5 W difference between phases is a 25% imbalance — technically
true, practically meaningless. Imbalance is therefore computed **only while
total load exceeds a floor** (5% of rated by default), and how much time was
excluded is reported alongside. Without that gate the histogram would scream
about imbalance every night.

Reported: the imbalance distribution, the fraction of time above a threshold
(30% by default), and the worst episodes with their per-phase values.

Both numbers — the load floor and the imbalance threshold — are editable in the
integration's options, next to the battery SoC thresholds that already live
there. The defaults are starting points, not claims about a particular
installation.

Imbalance needs at least two phases. With exactly two the formula still holds
and the section renders; with fewer, the section is absent along with the rest
of the phase content.

Also **per-phase headroom**. Hybrid inverters usually cap each phase at roughly
a third of the total rating, so an imbalanced load trips one phase while total
power is still far from the limit. An optional "power per phase" number is
added; when it is not set the analytics uses `rated_power / 3` **and says so**
rather than presenting a derived figure as if it were known.

## 10. Payload contract

The final review of phases 1-3 already noted that a flat `precision` becomes a
lie once more than one series is involved. This change forces the issue.

```json
{
  "precision": "raw", "boundary": null, "coverage": 0.98,
  "series": {
    "load_total": {"precision": "raw", "coverage": 0.98},
    "load_l1":    {"precision": "raw", "coverage": 0.97},
    "load_l2":    {"precision": "lts", "coverage": 0.41}
  },
  "phases": {
    "per_phase": [{"key": "L1", "mean": 2100, "p95": 3400, "peak": 3900, "share": 0.41}],
    "imbalance": {"mean": 0.18, "p95": 0.44, "fraction_above": 0.07, "threshold": 0.3,
                  "floor_w": 600, "coverage": 0.94},
    "episodes": [{"start": "...", "end": "...", "seconds": 900, "peak_imbalance": 0.52,
                  "phases": [3900, 2100, 800]}]
  }
}
```

The top-level fields stay and describe **the primary series**, the total load —
that is what the badge shows, and the existing frontend keeps working unchanged.
`series` carries the detail, and any section reading a different series shows its
own coverage when it differs. A `load_l2` sitting on LTS at 41% coverage is
exactly the case where one number in the header would have lied.

## 11. UI

The Load tab gains a **Phases** section below its existing content: three
per-phase cards, a histogram of the imbalance distribution, the fraction of time
above the threshold, and a table of the worst episodes. Same idiom as the rest
of the tab — no time-series charts.

The section is absent entirely when no phase entities are configured. A
single-phase inverter's page does not change.

## 12. Testing

`align()` is where the bugs will be: series with different update rates, a gap
in one of three, series whose first sample starts after the window, a series
shorter than the window, and two series that change at exactly the same instant.

Imbalance is tested against hand-built data with known answers, and separately
for the thing most likely to be built but not verified: that the load floor
actually discards night-time noise rather than merely existing in the code.

Detection is tested against the reference instance's real entity list, captured
as a fixture — including the entities that must **not** be matched (phone
batteries, the printer, the boiler).

## 13. Suggested split into plans

The work divides cleanly along a seam, and each half is independently useful:

1. **Configuration** — multi-entity roles, detection, the three-step wizard,
   field descriptions, the Solarman preset. Ends with a user who can set up a
   three-phase inverter in one click and sees the same Load tab as today.
2. **Phase analytics** — `align()`, the imbalance maths, the payload change and
   the Phases section. Ends with that setup producing something new to look at.

Shipping (1) alone is not a dead end: the mapping is captured, the wizard is
better for everyone, and nothing regresses for single-phase users.

## 14. Out of scope

Per-string PV charts, shading detection by hour of day, the Battery,
Seasonality and Balance tabs, presets for vendors other than Solarman, and
per-phase analytics for grid or inverter output — the phase work here covers
load only, which is what the Load tab is about.
