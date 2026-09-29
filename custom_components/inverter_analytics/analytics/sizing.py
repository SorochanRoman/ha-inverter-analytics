"""Is the system big enough? Three verdicts, each with its rule beside it.

Everything here works from hourly statistics rows that have already been
read — the mean, floor and peak of each hour — and from the counters' hourly
energy. Nothing touches Home Assistant until async_sizing_analytics, which a
later task adds at the bottom of this module.

A single score is deliberately not built. It would combine three unrelated
questions with weights nobody measured, and it would hide the one thing the
reader needs: which part is short.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Iterable, Mapping, Sequence
from datetime import datetime, tzinfo
from typing import Any

from .load import HIGH_LOAD_SHARE
from .seasonality import INCOMPLETE_COVERAGE, month_key, months_touched
from .source import EnergySeries, HourlyRow, HourlySeries, Window

ENOUGH = "enough"
BORDERLINE = "borderline"
SHORT = "short"

# The thresholds are judgement — there is no measurement of "enough" — so
# they are named here and printed on the card, where they can be argued with.
INVERTER_SHORT_SHARE = 0.01
INVERTER_BORDERLINE_SHARE = 0.05
BATTERY_SHORT_SHARE = 0.25
SOLAR_ENOUGH_SHARE = 1.0
SOLAR_BORDERLINE_SHARE = 0.7
SOLAR_FILL_SHARE = 0.8

# Below this much consumption a share of it is arithmetic noise; the same
# floor Balance uses for its ratios.
MIN_LOAD_KWH = 0.1

SECONDS_PER_HOUR = 3600.0


def local_day(moment: datetime, tz: tzinfo) -> str:
    """The local calendar day an hour belongs to. An hourly row is never split."""
    return moment.astimezone(tz).date().isoformat()


def rows_by_month(rows: Iterable[HourlyRow], tz: tzinfo) -> dict[str, list[HourlyRow]]:
    """Hourly rows keyed by the local month their hour starts in."""
    grouped: dict[str, list[HourlyRow]] = defaultdict(list)
    for row in rows:
        grouped[month_key(row.start.astimezone(tz))].append(row)
    return grouped


def withheld(reason: str, evidence: Mapping[str, Any]) -> dict[str, Any]:
    """A verdict that cannot be given, with the reason where the verdict would be."""
    return {"verdict": None, "reason": reason, "evidence": dict(evidence)}


def inverter_evidence(rows: Sequence[HourlyRow], rated_power: float) -> dict[str, Any]:
    """Hours whose peak reached rated power, or 80% of it, and the highest peak.

    "Reached", never "overloaded": an hourly maximum says the load got there
    and nothing about for how long. The Load tab counts sixty-second episodes
    from raw states, and that is where the duration question lives.
    """
    return {
        "measured_hours": len(rows),
        "hours_at_rated": sum(1 for row in rows if row.max >= rated_power),
        "hours_above_high": sum(1 for row in rows if row.max >= rated_power * HIGH_LOAD_SHARE),
        "peak_w": max((row.max for row in rows), default=None),
    }


def inverter_verdict(evidence: Mapping[str, Any]) -> dict[str, Any]:
    """short above 1% of hours at rated; borderline on any such hour or 5% above 80%."""
    measured = evidence["measured_hours"]
    if measured == 0:
        return withheld("no_data", evidence)
    at_rated = evidence["hours_at_rated"] / measured
    above_high = evidence["hours_above_high"] / measured
    if at_rated > INVERTER_SHORT_SHARE:
        verdict = SHORT
    elif evidence["hours_at_rated"] > 0 or above_high > INVERTER_BORDERLINE_SHARE:
        verdict = BORDERLINE
    else:
        verdict = ENOUGH
    return {"verdict": verdict, "reason": None, "evidence": dict(evidence)}


def battery_evidence(
    rows: Sequence[HourlyRow], tz: tzinfo, *, low_pct: float, full_pct: float
) -> dict[str, Any]:
    """Days that filled, days that hit the low mark, and how the two overlap.

    A day is judged on its hourly floors and peaks in the local zone. A day
    that hit the low mark after reaching full was given everything the battery
    can hold and it was not enough for the night — that is the battery being
    small. A day that hit the low mark without ever filling was not a fair
    test of the battery: that is the sun, or a charging policy, and it feeds
    the solar verdict instead.
    """
    full: dict[str, bool] = defaultdict(bool)
    low: dict[str, bool] = defaultdict(bool)
    for row in rows:
        day = local_day(row.start, tz)
        full[day] = full[day] or row.max >= full_pct
        low[day] = low[day] or row.min < low_pct
    days = set(full) | set(low)
    return {
        "days_with_data": len(days),
        "days_full": sum(1 for day in days if full[day]),
        "days_full_and_low": sum(1 for day in days if full[day] and low[day]),
        "days_low_without_full": sum(1 for day in days if low[day] and not full[day]),
        "lowest_pct": min((row.min for row in rows), default=None),
    }


def battery_verdict(evidence: Mapping[str, Any]) -> dict[str, Any]:
    """short at a quarter of days full-and-low; borderline on any; none if it never filled."""
    days = evidence["days_with_data"]
    if days == 0:
        return withheld("no_data", evidence)
    if evidence["days_full"] == 0:
        # The nights say nothing about a battery that was never filled.
        return withheld("never_full", evidence)
    share = evidence["days_full_and_low"] / days
    if share >= BATTERY_SHORT_SHARE:
        verdict = SHORT
    elif evidence["days_full_and_low"] > 0:
        verdict = BORDERLINE
    else:
        verdict = ENOUGH
    return {"verdict": verdict, "reason": None, "evidence": dict(evidence)}


def solar_evidence(
    pv_kwh: float, load_kwh: float, import_kwh: float | None, battery: Mapping[str, Any] | None
) -> dict[str, Any]:
    """Production as a share of consumption, self-sufficiency, and how often the battery filled."""
    enough_load = load_kwh >= MIN_LOAD_KWH
    fill_share = None
    if battery and battery["days_with_data"]:
        fill_share = battery["days_full"] / battery["days_with_data"]
    return {
        "pv_kwh": pv_kwh,
        "load_kwh": load_kwh,
        "production_share": (pv_kwh / load_kwh) if enough_load else None,
        "self_sufficiency": (
            max(0.0, min(1.0, (load_kwh - import_kwh) / load_kwh))
            if enough_load and import_kwh is not None
            else None
        ),
        "fill_share": fill_share,
    }


def solar_verdict(evidence: Mapping[str, Any]) -> dict[str, Any]:
    """enough at full cover with the battery filling; borderline from 70% cover; short below."""
    share = evidence["production_share"]
    if share is None:
        return withheld("no_data", evidence)
    fill = evidence["fill_share"]
    filling = fill is None or fill >= SOLAR_FILL_SHARE
    if share >= SOLAR_ENOUGH_SHARE and filling:
        verdict = ENOUGH
    elif share >= SOLAR_BORDERLINE_SHARE:
        verdict = BORDERLINE
    else:
        verdict = SHORT
    result: dict[str, Any] = {"verdict": verdict, "reason": None, "evidence": dict(evidence)}
    # Export by day and import by night is a real shape, and a bare
    # "borderline" would hide it; the card says it in words.
    if share >= SOLAR_ENOUGH_SHARE and not filling:
        result["note"] = "covers_but_battery_not_filling"
    return result


def _energy_by_month(series: EnergySeries | None, tz: tzinfo) -> dict[str, float]:
    """A counter's hourly changes summed into the local month each hour starts in."""
    totals: dict[str, float] = defaultdict(float)
    for row in series.rows if series else ():
        totals[month_key(row.start.astimezone(tz))] += row.change
    return totals


def _solar_block(
    energy: Mapping[str, EnergySeries],
    pv_kwh: float,
    load_kwh: float,
    import_kwh: float | None,
    battery: Mapping[str, Any] | None,
) -> dict[str, Any] | None:
    """The solar card, or None when the two counters it needs are not mapped."""
    if "pv_energy_total" not in energy or "load_energy_total" not in energy:
        return None
    return solar_verdict(solar_evidence(pv_kwh, load_kwh, import_kwh, battery))


def _covered(
    load: HourlySeries | None, soc: HourlySeries | None, energy: Mapping[str, EnergySeries]
) -> tuple[datetime | None, datetime | None]:
    """The span the mapped sensors actually have data for, as Balance reports it."""
    series = [item for item in (load, soc, *energy.values()) if item is not None]
    starts = [item.covered_start for item in series if item.covered_start]
    ends = [item.covered_end for item in series if item.covered_end]
    return (min(starts) if starts else None, max(ends) if ends else None)


def build_sizing_payload(
    *,
    window: Window,
    tz: tzinfo,
    rated_power: float,
    load: HourlySeries | None,
    soc: HourlySeries | None,
    energy: Mapping[str, EnergySeries],
    low_pct: float,
    full_pct: float,
) -> dict[str, Any]:
    """The three verdicts for the period and for every month the window touches.

    A card whose sensors are not mapped is None, not a withheld verdict: the
    tab names the role. The period verdict is read from the whole window's
    evidence with the same rules, never by averaging the months — a year with
    one short month is a year in which the inverter was short for a month,
    and the strip says which one.
    """
    load_rows = load.rows if load else ()
    soc_rows = soc.rows if soc else ()
    load_months = rows_by_month(load_rows, tz)
    soc_months = rows_by_month(soc_rows, tz)
    pv_months = _energy_by_month(energy.get("pv_energy_total"), tz)
    consumption_months = _energy_by_month(energy.get("load_energy_total"), tz)
    import_series = energy.get("grid_import_total")
    import_months = _energy_by_month(import_series, tz)

    def judge(
        load_part: Sequence[HourlyRow],
        soc_part: Sequence[HourlyRow],
        pv_kwh: float,
        load_kwh: float,
        import_kwh: float | None,
    ) -> dict[str, Any]:
        battery = (
            battery_evidence(soc_part, tz, low_pct=low_pct, full_pct=full_pct) if soc else None
        )
        return {
            "inverter": (
                inverter_verdict(inverter_evidence(load_part, rated_power)) if load else None
            ),
            "battery": battery_verdict(battery) if battery is not None else None,
            "solar": _solar_block(energy, pv_kwh, load_kwh, import_kwh, battery),
        }

    months = []
    for key, month_seconds in sorted(months_touched(window, tz).items()):
        # Coverage from whichever mapped sensor has rows; the first with any.
        measured = max(len(load_months.get(key, ())), len(soc_months.get(key, ())))
        coverage = min(measured * SECONDS_PER_HOUR / month_seconds, 1.0) if month_seconds else 0.0
        months.append(
            {
                "key": key,
                "coverage": coverage,
                "complete": coverage >= INCOMPLETE_COVERAGE,
                **judge(
                    load_months.get(key, ()),
                    soc_months.get(key, ()),
                    pv_months.get(key, 0.0),
                    consumption_months.get(key, 0.0),
                    import_months.get(key) if import_series else None,
                ),
            }
        )

    covered_start, covered_end = _covered(load, soc, energy)
    return {
        "period": judge(
            load_rows,
            soc_rows,
            sum(pv_months.values()),
            sum(consumption_months.values()),
            sum(import_months.values()) if import_series else None,
        ),
        "months": months,
        "incomplete_below": INCOMPLETE_COVERAGE,
        "rules": {
            "inverter_short_share": INVERTER_SHORT_SHARE,
            "inverter_borderline_share": INVERTER_BORDERLINE_SHARE,
            "high_load_share": HIGH_LOAD_SHARE,
            "battery_short_share": BATTERY_SHORT_SHARE,
            "solar_enough_share": SOLAR_ENOUGH_SHARE,
            "solar_borderline_share": SOLAR_BORDERLINE_SHARE,
            "solar_fill_share": SOLAR_FILL_SHARE,
            "low_pct": low_pct,
            "full_pct": full_pct,
        },
        "covered_start": covered_start.isoformat() if covered_start else None,
        "covered_end": covered_end.isoformat() if covered_end else None,
        "covers_whole_window": bool(
            covered_start
            and covered_end
            and covered_start <= window.start
            and covered_end >= window.end
        ),
    }
