"""Is the system big enough? Three verdicts, each with its rule beside it.

Everything here works from hourly statistics rows that have already been
read — the mean, floor and peak of each hour — and from the counters' hourly
energy. Nothing touches Home Assistant until async_sizing_analytics at the
bottom of this module, which is the thin layer that reads the sensors.

A single score is deliberately not built. It would combine three unrelated
questions with weights nobody measured, and it would hide the one thing the
reader needs: which part is short.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass
from datetime import datetime, tzinfo
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from ..const import (
    DEFAULT_BATTERY_FULL_PCT,
    DEFAULT_BATTERY_IDLE_W,
    DEFAULT_BATTERY_LOW_PCT,
    DEFAULT_GRID_ZERO_W,
)
from ..roles import EntryConfig
from .balance import MIN_DENOMINATOR_KWH
from .load import HIGH_LOAD_SHARE
from .seasonality import INCOMPLETE_COVERAGE, month_key, months_touched
from .source import (
    EnergySeries,
    HourlyRow,
    HourlySeries,
    Window,
    async_energy_many,
    async_hourly_extremes_many,
)

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
# A system that cannot export throws its surplus away, so its production is
# capped near consumption and the battery's days at its limit say more.
SOLAR_CURTAILED_BORDERLINE_SHARE = 0.4

# Export at or below this share of production is a system that does not
# export: a meter's rounding and the odd second of overshoot, not a feed-in.
EXPORT_LIMITED_SHARE = 0.01

# The share of the consumption counter's hours the import counter must also
# have before (load - import) / load is a share of the same span. One hour the
# recorder never compiled must not drop the figure; a missing month must.
IMPORT_COVERAGE_FLOOR = 0.9

# A ceiling hour: the inverter stopped charging although the sun was up. In
# self-consumption mode that happens only at the battery's charge limit — or
# at its floor, which the margin above the low mark excludes. Read from the
# hour's extremes, not its mean: half an hour each way averages to zero.
CEILING_PV_MIN_W = 100.0
CEILING_SOC_FLAT_PCT = 1.0
CEILING_ABOVE_LOW_PCT = 20.0

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


def ceiling_hours(
    soc: Sequence[HourlyRow],
    battery: Sequence[HourlyRow],
    pv: Sequence[HourlyRow],
    *,
    low_pct: float,
    idle_w: float,
) -> set[datetime]:
    """Hours in which the battery stood full while the sun was up, whatever its limit."""
    battery_by_start = {row.start: row for row in battery}
    pv_by_start = {row.start: row for row in pv}
    hours: set[datetime] = set()
    for charge in soc:
        power = battery_by_start.get(charge.start)
        sun = pv_by_start.get(charge.start)
        if power is None or sun is None:
            continue
        if (
            sun.mean >= CEILING_PV_MIN_W
            and power.min >= -idle_w
            and power.max <= idle_w
            and charge.max - charge.min <= CEILING_SOC_FLAT_PCT
            and charge.min >= low_pct + CEILING_ABOVE_LOW_PCT
        ):
            hours.add(charge.start)
    return hours


def battery_evidence(
    rows: Sequence[HourlyRow],
    tz: tzinfo,
    *,
    low_pct: float,
    full_pct: float,
    ceiling: set[datetime] | None = None,
) -> dict[str, Any]:
    """Days that filled, days that hit the low mark, and how the two overlap.

    A day is judged on its hourly floors and peaks in the local zone. A day
    that hit the low mark after reaching full was given everything the battery
    can hold and it was not enough for the night — that is the battery being
    small. A day that hit the low mark without ever filling was not a fair
    test of the battery: that is the sun, or a charging policy, and it feeds
    the solar verdict instead. With a set of ceiling hours, "full" is the
    battery's own limit, so a charge capped below the fixed mark still counts.
    """
    full: dict[str, bool] = defaultdict(bool)
    low: dict[str, bool] = defaultdict(bool)
    for row in rows:
        day = local_day(row.start, tz)
        reached = row.start in ceiling if ceiling is not None else row.max >= full_pct
        full[day] = full[day] or reached
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
    # Below this much consumption a share of it is arithmetic noise; Balance
    # names the floor and its ratios use the same one.
    enough_load = load_kwh >= MIN_DENOMINATOR_KWH
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


def export_limited(
    *,
    pv_kwh: float,
    export: EnergySeries | None,
    grid: Sequence[HourlyRow] | None,
    zero_w: float,
) -> bool | None:
    """Whether the system kept its production in, decided once for the window.

    Read from the first source that has rows: the export counter, against
    `EXPORT_LIMITED_SHARE` of production; then grid power, signed so that
    negative is export, against the zero band; otherwise None — unknown,
    which the Sun rule reads as exporting.
    """
    if export is not None and export.rows:
        return export.total <= EXPORT_LIMITED_SHARE * pv_kwh
    if grid:
        return all(row.min >= -zero_w for row in grid)
    return None


def solar_verdict(
    evidence: Mapping[str, Any], *, export_limited: bool | None = None
) -> dict[str, Any]:
    """enough at full cover with the battery filling; borderline from 70% cover; short below.

    Without export the battery's days at its limit decide instead: enough at
    80% of days, borderline from 40% or from 70% cover, short below.
    """
    share = evidence["production_share"]
    if share is None:
        return withheld("no_data", evidence)
    fill = evidence["fill_share"]
    if export_limited:
        # Without export, production cannot pass consumption plus charging, so
        # a share of consumption never reaches "enough". The sun of such a
        # system is enough when it keeps taking the battery to its limit.
        if fill is None:
            return withheld("no_fill", evidence)
        if fill >= SOLAR_FILL_SHARE:
            verdict = ENOUGH
        elif fill >= SOLAR_CURTAILED_BORDERLINE_SHARE or share >= SOLAR_BORDERLINE_SHARE:
            verdict = BORDERLINE
        else:
            verdict = SHORT
        return {"verdict": verdict, "reason": None, "evidence": dict(evidence)}
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


@dataclass(frozen=True, slots=True)
class _Counters:
    """What the energy counters contribute to one span, with the hours behind it.

    The hours are carried beside the kilowatt-hours because a counter that is
    mapped but has no statistics for the span sums to zero, and zero
    production is a verdict where no production data is not one.
    """

    pv_kwh: float
    load_kwh: float
    import_kwh: float | None
    pv_hours: int
    consumption_hours: int
    import_hours: int

    @property
    def comparable_import_kwh(self) -> float | None:
        """The import total, or None when it covers less of the span than the load.

        Self-sufficiency is (load - import) / load, and the subtraction is
        only honest while both counters saw the same hours. An import counter
        that started recording three weeks into a ninety-day window would
        otherwise print a self-sufficiency of 92% that nothing measured.
        """
        if self.import_kwh is None:
            return None
        if self.import_hours < IMPORT_COVERAGE_FLOOR * self.consumption_hours:
            return None
        return self.import_kwh


def _energy_by_month(
    series: EnergySeries | None, tz: tzinfo
) -> tuple[dict[str, float], dict[str, int]]:
    """A counter's hours summed into the local month each starts in, and counted there."""
    totals: dict[str, float] = defaultdict(float)
    hours: dict[str, int] = defaultdict(int)
    for row in series.rows if series else ():
        key = month_key(row.start.astimezone(tz))
        totals[key] += row.change
        hours[key] += 1
    return totals, hours


def _coverage(measured_hours: float, span_hours: float) -> float:
    """The share of a span that has rows behind it, never above one."""
    return min(measured_hours / span_hours, 1.0) if span_hours > 0 else 0.0


def _solar_block(
    energy: Mapping[str, EnergySeries],
    counters: _Counters,
    battery: Mapping[str, Any] | None,
    *,
    export_limited: bool | None,
) -> dict[str, Any] | None:
    """The solar card, or None when the two counters it needs are not mapped."""
    if "pv_energy_total" not in energy or "load_energy_total" not in energy:
        return None
    evidence = solar_evidence(
        counters.pv_kwh, counters.load_kwh, counters.comparable_import_kwh, battery
    )
    if counters.pv_hours == 0:
        # A counter with no rows for this span sums to zero, and reading that
        # as a month without sun would print "short" over an unmeasured month.
        return withheld("no_data", evidence)
    return solar_verdict(evidence, export_limited=export_limited)


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
    ceiling: set[datetime] | None = None,
    export_limited: bool | None = None,
) -> dict[str, Any]:
    """The three verdicts for the period and for every month the window touches.

    A card whose sensors are not mapped is None, not a withheld verdict: the
    tab names the role. The period verdict is read from the whole window's
    evidence with the same rules, never by averaging the months — a year with
    one short month is a year in which the inverter was short for a month,
    and the strip says which one.

    Every card carries the coverage of the sensors it was read from, which is
    not the month's: a full month of load beside twelve days of charge would
    otherwise present the battery verdict under a full-month banner.

    With a set of ceiling hours "full" is the battery's own limit, and with
    `export_limited` true the Sun is judged by days at that limit. Both are
    decided once for the window, so every month reads the same rule.
    """
    load_rows = load.rows if load is not None else ()
    soc_rows = soc.rows if soc is not None else ()
    load_months = rows_by_month(load_rows, tz)
    soc_months = rows_by_month(soc_rows, tz)
    pv_months, pv_month_hours = _energy_by_month(energy.get("pv_energy_total"), tz)
    consumption_months, consumption_month_hours = _energy_by_month(
        energy.get("load_energy_total"), tz
    )
    import_series = energy.get("grid_import_total")
    import_months, import_month_hours = _energy_by_month(import_series, tz)

    def judge(
        load_part: Sequence[HourlyRow],
        soc_part: Sequence[HourlyRow],
        counters: _Counters,
        *,
        span_hours: float,
    ) -> dict[str, Any]:
        battery = (
            battery_evidence(soc_part, tz, low_pct=low_pct, full_pct=full_pct, ceiling=ceiling)
            if soc is not None
            else None
        )
        blocks: dict[str, dict[str, Any] | None] = {
            "inverter": (
                inverter_verdict(inverter_evidence(load_part, rated_power))
                if load is not None
                else None
            ),
            "battery": battery_verdict(battery) if battery is not None else None,
            "solar": _solar_block(energy, counters, battery, export_limited=export_limited),
        }
        measured = {
            "inverter": len(load_part),
            "battery": len(soc_part),
            # The pair is only as measured as its thinner half: a share of
            # consumption needs both counters to have seen the same span.
            "solar": min(counters.pv_hours, counters.consumption_hours),
        }
        for role, block in blocks.items():
            # Withheld blocks too: "no verdict" and "no verdict, and here is
            # how little was seen" are different things to read.
            if block is not None:
                block["coverage"] = _coverage(measured[role], span_hours)
        return blocks

    months = []
    for key, month_seconds in sorted(months_touched(window, tz).items()):
        load_part = load_months.get(key, ())
        soc_part = soc_months.get(key, ())
        counters = _Counters(
            pv_kwh=pv_months.get(key, 0.0),
            load_kwh=consumption_months.get(key, 0.0),
            import_kwh=import_months.get(key) if import_series is not None else None,
            pv_hours=pv_month_hours.get(key, 0),
            consumption_hours=consumption_month_hours.get(key, 0),
            import_hours=import_month_hours.get(key, 0),
        )
        span_hours = month_seconds / SECONDS_PER_HOUR
        # The month is as covered as its best-covered mapped sensor. Counters
        # count: a month the Solar card reads in full is a month with data,
        # whether or not a load sensor was ever mapped.
        measured = max(len(load_part), len(soc_part), counters.pv_hours, counters.consumption_hours)
        coverage = _coverage(measured, span_hours)
        months.append(
            {
                "key": key,
                "coverage": coverage,
                "complete": coverage >= INCOMPLETE_COVERAGE,
                **judge(load_part, soc_part, counters, span_hours=span_hours),
            }
        )

    covered_start, covered_end = _covered(load, soc, energy)
    period_counters = _Counters(
        pv_kwh=sum(pv_months.values()),
        load_kwh=sum(consumption_months.values()),
        # Mapped but empty is not "imported nothing": summing no rows to zero
        # would report a window nobody measured as fully self-sufficient.
        import_kwh=sum(import_months.values()) if import_months else None,
        pv_hours=sum(pv_month_hours.values()),
        consumption_hours=sum(consumption_month_hours.values()),
        import_hours=sum(import_month_hours.values()),
    )
    return {
        "period": judge(
            load_rows,
            soc_rows,
            period_counters,
            span_hours=window.seconds / SECONDS_PER_HOUR,
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
            "solar_curtailed_borderline_share": SOLAR_CURTAILED_BORDERLINE_SHARE,
            "low_pct": low_pct,
            "full_pct": full_pct,
            "full_mode": "ceiling" if ceiling is not None else "fixed",
            "export_limited": export_limited,
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


_SOLAR_ROLES = ("pv_energy_total", "load_energy_total")


def _no_statistics(hass: HomeAssistant, entity_ids: Sequence[str]) -> list[str]:
    """Mapped sensors that keep no statistics, because they have no state_class."""
    gone = []
    for entity_id in entity_ids:
        state = hass.states.get(entity_id)
        if state is not None and not state.attributes.get("state_class"):
            gone.append(entity_id)
    return gone


def _ceiling(
    config: EntryConfig,
    soc: HourlySeries | None,
    battery: HourlySeries | None,
    pv: HourlySeries | None,
    *,
    low_pct: float,
) -> set[datetime] | None:
    """The window's ceiling hours, or None to judge "full" by the fixed mark.

    An empty set is an answer — the battery never stood at its limit — but a
    sensor with no rows at all is not, and reading it as one would print
    "never filled" over a battery nobody measured.
    """
    if not (soc and soc.rows and battery and battery.rows and pv and pv.rows):
        return None
    return ceiling_hours(
        soc.rows,
        battery.rows,
        pv.rows,
        low_pct=low_pct,
        idle_w=config.number("battery_idle_w") or DEFAULT_BATTERY_IDLE_W,
    )


def _signed_grid(config: EntryConfig, grid: HourlySeries | None) -> list[HourlyRow] | None:
    """Grid power hours with the configured sign applied, so that negative is export.

    Inverting a row swaps its extremes: the lowest raw reading is the highest signed one.
    """
    if grid is None:
        return None
    if config.sign("grid_power") >= 0:
        return list(grid.rows)
    return [HourlyRow(row.start, -row.mean, -row.max, -row.min) for row in grid.rows]


async def async_sizing_analytics(
    hass: HomeAssistant, config: EntryConfig, window: Window
) -> dict[str, Any]:
    """Read the statistics and compute the three verdicts."""
    load_id = config.entity_id("load_power")
    soc_id = config.entity_id("battery_soc")
    rated_power = config.number("rated_power")
    solar_ids = {role: config.entity_id(role) for role in _SOLAR_ROLES}
    import_id = config.entity_id("grid_import_total")
    export_id = config.entity_id("grid_export_total")
    battery_id = config.entity_id("battery_power")
    pv_id = config.entity_id("pv_power")
    # Ceiling mode reads "full" as the battery's own limit, which needs the
    # charge, the battery's power and the sun's together.
    ceiling_mode = bool(soc_id and battery_id and pv_id)
    has_solar = all(solar_ids.values())
    # rated_power is a required role, so a missing or zero one means a
    # corrupted entry — but read as a threshold it would put every hour "at
    # rated" and print "short" over a system nobody measured.
    has_rated = rated_power is not None and rated_power > 0

    # The same roles the tab opens on, so a mapping that shows the tab is never
    # answered with an error: every partial shape below is a card that names
    # the role it is short of, which is the answer the reader can act on.
    if not load_id and not soc_id and not any(solar_ids.values()):
        raise ValueError(
            "sizing needs at least one of load_power, battery_soc, "
            "pv_energy_total or load_energy_total"
        )

    low_pct = config.number("battery_low_pct") or DEFAULT_BATTERY_LOW_PCT
    full_pct = config.number("battery_full_pct") or DEFAULT_BATTERY_FULL_PCT
    # Both marks are user-editable, and crossed they make every day full and
    # low at once — a battery judged "short" by arithmetic alone. The card
    # says which pair is wrong instead of pretending to a verdict. Ceiling
    # mode never reads the full mark, so a crossed pair does no harm there.
    marks_crossed = full_pct <= low_pct

    judged_load = load_id if has_rated else None
    read_soc = soc_id if ceiling_mode or not marks_crossed else None
    # Grid power is only the fallback for the export counter, and export only
    # feeds the Sun card.
    grid_id = config.entity_id("grid_power") if has_solar and not export_id else None
    helpers = (battery_id, pv_id) if ceiling_mode else ()
    extremes = await async_hourly_extremes_many(
        hass,
        [entity_id for entity_id in (judged_load, read_soc, *helpers, grid_id) if entity_id],
        window,
    )
    energy_ids = {role: entity_id for role, entity_id in solar_ids.items() if entity_id}
    if has_solar and import_id:
        energy_ids["grid_import_total"] = import_id
    if has_solar and export_id:
        energy_ids["grid_export_total"] = export_id
    energy: dict[str, EnergySeries] = {}
    if has_solar:
        energy_by_id = await async_energy_many(hass, list(energy_ids.values()), window)
        energy = {role: energy_by_id[entity_id] for role, entity_id in energy_ids.items()}

    ceiling = (
        _ceiling(
            config,
            extremes.get(soc_id),
            extremes.get(battery_id),
            extremes.get(pv_id),
            low_pct=low_pct,
        )
        if ceiling_mode
        else None
    )
    # A helper sensor without statistics drops back to the fixed mark, and
    # there the crossed pair is as wrong as it ever was.
    thresholds_inverted = ceiling is None and marks_crossed
    judged_soc = None if thresholds_inverted else read_soc
    pv_series = energy.get("pv_energy_total")
    export = export_limited(
        pv_kwh=pv_series.total if pv_series is not None else 0.0,
        export=energy.get("grid_export_total"),
        grid=_signed_grid(config, extremes.get(grid_id) if grid_id else None),
        zero_w=config.number("grid_zero_w") or DEFAULT_GRID_ZERO_W,
    )

    zone = dt_util.get_time_zone(hass.config.time_zone) or dt_util.UTC
    payload = build_sizing_payload(
        window=window,
        tz=zone,
        rated_power=rated_power or 0.0,
        load=extremes.get(judged_load) if judged_load else None,
        soc=extremes.get(judged_soc) if judged_soc else None,
        energy=energy,
        low_pct=low_pct,
        full_pct=full_pct,
        ceiling=ceiling,
        export_limited=export,
    )
    payload["cards"] = {
        "inverter": {
            "missing": ([] if load_id else ["load_power"]) + ([] if has_rated else ["rated_power"]),
            "no_statistics": _no_statistics(hass, [load_id] if load_id else []),
        },
        "battery": {
            "missing": [] if soc_id else ["battery_soc"],
            "no_statistics": _no_statistics(hass, [soc_id] if soc_id else []),
            "thresholds_inverted": thresholds_inverted,
        },
        "solar": {
            "missing": [role for role, entity_id in solar_ids.items() if not entity_id],
            # The two counters the verdict is read from, and not the import
            # counter beside them: that one feeds self_sufficiency alone, and
            # naming it here would print "this card cannot be read" over a
            # verdict that was read perfectly well.
            "no_statistics": _no_statistics(
                hass, [entity_id for entity_id in solar_ids.values() if entity_id]
            ),
        },
    }
    payload["entities"] = {
        role: entity_id
        for role, entity_id in {"load_power": load_id, "battery_soc": soc_id, **energy_ids}.items()
        if entity_id
    }
    payload["timezone"] = str(zone)
    # Statistics whatever the window: there is no precision choice to report,
    # but the badge exists on every tab and its absence would look like an omission.
    payload["precision"] = "lts"
    payload["boundary"] = None
    return payload
