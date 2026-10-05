"""Health: is the system what it was, month by month over the whole history.

No verdicts. A threshold for "the battery is degrading" would rest on a state
of charge the battery management system estimates, on weather and on how the
house was used, so nothing here judges: each signal is a figure per local
month, set beside the same month a year earlier, and the reader decides. A
month that cannot support a figure has None with the reason in its place.

Everything is read from long-term statistics only — hourly means, minima and
maxima of numeric sensors and the counters' hourly changes — because raw
states reach back only to the recorder's retention, and a health signal that
stops at ten days is not a health signal.
"""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Iterable, Mapping, Sequence
from datetime import datetime, timedelta, tzinfo
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from ..const import DEFAULT_BATTERY_IDLE_W, DEFAULT_BATTERY_LOW_PCT, DEFAULT_GRID_ZERO_W
from ..roles import EntryConfig
from .battery import EFFICIENCY_MAX_DRIFT_PCT, EFFICIENCY_MIN_KWH
from .pv import pv_hourly, pv_power_derived, pv_power_ids
from .seasonality import month_key, months_touched
from .sizing import (
    CEILING_PV_MIN_W,
    Ceiling,
    charge_ceiling,
    export_limited,
    inverter_evidence,
    rows_by_month,
    signed_grid,
)
from .source import (
    EnergySeries,
    HourlyRow,
    HourlySeries,
    Window,
    async_energy_many,
    async_hourly_extremes_many,
)

# How far back the history is read; long-term statistics make this cheap.
HEALTH_MAX_YEARS = 5
# A charge counter that moved at most this much in an hour: no charging worth
# the name, so the state of charge fell for one reason.
CLEAN_CHARGE_MAX_KWH = 0.02
# A drop of a point or two is inside the noise of a percentage the BMS rounds.
CLEAN_DROP_MIN_POINTS = 3.0
# A few winter nights; below it one strange hour moves the month's figure.
CLEAN_HOURS_MIN = 20
# Each side of the twelve-against-twelve figure needs this many months with one.
COMPARISON_MIN_MONTHS = 6
# Unconstrained hours a month needs before its best hour is read.
BEST_HOUR_MIN_HOURS = 10
# The share of a month's hours a sum or a peak needs before the month is set
# beside a whole one. Stricter than Seasonality's INCOMPLETE_COVERAGE (0.6),
# which marks means, and a mean does not scale with coverage. Energy and
# hours are sums and do: a month 60% covered reads up to 40% low. A missing
# 5% stays inside the noise a month's weather already puts in; more does not.
PARTIAL_MONTH_COVERAGE = 0.95
# The largest drift correction trusted, as a share of the month's charge: a
# bigger one is the month's figure rather than a correction to it.
DRIFT_CORRECTION_MAX_SHARE = 0.1

TOO_FEW_CLEAN_HOURS = "too_few_clean_hours"
NO_SOC = "no_soc"
SOC_PARTIAL = "soc_partial"
COUNTERS_PARTIAL = "counters_partial"
DRIFT = "drift"
DRIFT_UNCORRECTABLE = "drift_uncorrectable"
TOO_LITTLE_THROUGHPUT = "too_little_throughput"
CURTAILED = "curtailed"
PARTIAL_MONTH = "partial_month"

SIGNALS = ("capacity", "efficiency", "solar_energy", "best_hour", "inverter")

_COMPARISON_SPAN = 12
# How far the state of charge may start after, or end before, the counters,
# and how far apart the two counters' own first and last hours may be.
_SOC_BRACKET_SLACK = timedelta(hours=1)
# Clean-hour comparisons are made at this many decimals, so a true 3.0-point
# drop or a 0.02 kWh change is not put on the wrong side by float noise.
_COMPARE_DECIMALS = 6
# Statistics that end within this of now are read as current.
_COVERS_NOW_SLACK = timedelta(hours=2)
_DAYS_PER_YEAR = 365
_SECONDS_PER_HOUR = 3600


def _month(start: datetime, tz: tzinfo) -> str:
    return month_key(start.astimezone(tz))


def clean_discharge_hours(
    soc: Sequence[HourlyRow], charge: EnergySeries, discharge: EnergySeries
) -> list[tuple[datetime, float, float]]:
    """The hours in which the charge fell for one reason: discharging.

    Each is (start, discharged_kwh, drop_points), the drop read as the hour's
    maximum minus its minimum. That overstates the drop if the charge rose and
    fell inside the hour; with charging excluded a rise can only be a BMS
    recalibration, which inflates the denominator and pulls the month's
    figure down — the direction of the bias, recorded so a dip is read with it
    in mind. An hour any of the three inputs lacks is not clean.
    """
    charged = {row.start: row.change for row in charge.rows}
    discharged = {row.start: row.change for row in discharge.rows}
    hours: list[tuple[datetime, float, float]] = []
    for row in sorted(soc, key=lambda item: item.start):
        if row.start not in charged or row.start not in discharged:
            continue
        drop = row.max - row.min
        out = discharged[row.start]
        if (
            round(charged[row.start], _COMPARE_DECIMALS) <= CLEAN_CHARGE_MAX_KWH
            and round(out, _COMPARE_DECIMALS) > 0
            and round(drop, _COMPARE_DECIMALS) >= CLEAN_DROP_MIN_POINTS
        ):
            hours.append((row.start, out, drop))
    return hours


def capacity_by_month(
    hours: Iterable[tuple[datetime, float, float]], tz: tzinfo
) -> dict[str, dict[str, Any]]:
    """Implied usable capacity per local month, in kWh, from its clean hours.

    Energy per point — the clean hours' discharge over their drops — times a
    hundred. Never multiplied by the nameplate, which is a reference line only.
    """
    grouped: dict[str, list[tuple[float, float]]] = defaultdict(list)
    for start, out, drop in hours:
        grouped[_month(start, tz)].append((out, drop))
    months: dict[str, dict[str, Any]] = {}
    for key in sorted(grouped):
        items = grouped[key]
        count = len(items)
        if count < CLEAN_HOURS_MIN:
            months[key] = {"value": None, "reason": TOO_FEW_CLEAN_HOURS, "clean_hours": count}
            continue
        out = sum(item[0] for item in items)
        drop = sum(item[1] for item in items)
        months[key] = {"value": 100 * out / drop, "reason": None, "clean_hours": count}
    return months


def _sums_by_month(series: EnergySeries, tz: tzinfo) -> dict[str, float]:
    sums: dict[str, float] = defaultdict(float)
    for row in series.rows:
        sums[_month(row.start, tz)] += row.change
    return sums


def _counter_spans(counter: EnergySeries, tz: tzinfo) -> dict[str, tuple[datetime, datetime]]:
    """The first and last hour of each local month that the counter has rows for."""
    spans: dict[str, tuple[datetime, datetime]] = {}
    for row in counter.rows:
        key = _month(row.start, tz)
        first, last = spans.get(key, (row.start, row.start))
        spans[key] = (min(first, row.start), max(last, row.start))
    return spans


def _same_span(one: tuple[datetime, datetime], other: tuple[datetime, datetime]) -> bool:
    """Whether two counters' spans in a month start and end within an hour of each other."""
    return (
        abs(one[0] - other[0]) <= _SOC_BRACKET_SLACK
        and abs(one[1] - other[1]) <= _SOC_BRACKET_SLACK
    )


def efficiency_by_month(
    charge: EnergySeries,
    discharge: EnergySeries,
    soc: Sequence[HourlyRow] | None,
    tz: tzinfo,
    *,
    capacity: Mapping[str, Mapping[str, Any]] | None = None,
) -> dict[str, dict[str, Any]]:
    """Round-trip efficiency per local month that has counter rows.

    The Battery tab's gate, with its constants: the month's charge must end
    within EFFICIENCY_MAX_DRIFT_PCT of where it began (the mean of its last
    hour against the mean of its first), and at least EFFICIENCY_MIN_KWH must
    have gone in. Without a state of charge the drift cannot be checked. The
    two counters must cover the same span — each one's first and last row of
    the month within an hour of the other's — or the ratio sets a month of
    charging against half a month of discharging; otherwise counters_partial.
    A charge that does not span the month's counter hours (within an hour at
    either end) is withheld as soc_partial: the gate must check the same span
    the counters sum.

    A drift beyond the limit is corrected rather than withheld when `capacity`
    — capacity_by_month's months — has a figure for the same month: the
    battery's own measurement, never the nameplate. A positive drift (the
    charge ended higher) is energy that went in and stayed, worth
    drift_points * capacity / 100 kWh, so it is added to what came out; a
    negative one is energy that came out of what was already there, so it is
    taken away. Such a month carries drift_corrected: True. Five points of a
    31 kWh battery is about 1.5 kWh against hundreds of kWh of throughput, so
    the correction is small next to what it lets through. A correction
    larger than DRIFT_CORRECTION_MAX_SHARE of the charge, or one that would
    leave nothing out, is not trusted: drift_uncorrectable, kept apart from
    drift, which means there was no capacity figure to correct with.
    """
    charged = _sums_by_month(charge, tz)
    discharged = _sums_by_month(discharge, tz)
    charge_spans = _counter_spans(charge, tz)
    discharge_spans = _counter_spans(discharge, tz)
    soc_by_month: dict[str, list[HourlyRow]] = defaultdict(list)
    for row in soc or ():
        soc_by_month[_month(row.start, tz)].append(row)

    months: dict[str, dict[str, Any]] = {}
    for key in sorted(charged.keys() | discharged.keys()):
        rows = soc_by_month.get(key)
        if not rows:
            months[key] = {"value": None, "reason": NO_SOC}
            continue
        charge_span, discharge_span = charge_spans.get(key), discharge_spans.get(key)
        if (
            charge_span is None
            or discharge_span is None
            or not _same_span(charge_span, discharge_span)
        ):
            months[key] = {"value": None, "reason": COUNTERS_PARTIAL}
            continue
        first = min(rows, key=lambda row: row.start)
        last = max(rows, key=lambda row: row.start)
        counted_from = min(charge_span[0], discharge_span[0])
        counted_to = max(charge_span[1], discharge_span[1])
        if (
            len(rows) < 2
            or first.start > counted_from + _SOC_BRACKET_SLACK
            or last.start < counted_to - _SOC_BRACKET_SLACK
        ):
            months[key] = {"value": None, "reason": SOC_PARTIAL}
            continue
        drift = last.mean - first.mean
        measured = (capacity or {}).get(key, {}).get("value")
        corrected = abs(drift) > EFFICIENCY_MAX_DRIFT_PCT
        if corrected and measured is None:
            months[key] = {"value": None, "reason": DRIFT}
            continue
        into, out = charged.get(key, 0.0), discharged.get(key, 0.0)
        if into < EFFICIENCY_MIN_KWH or out <= 0:
            months[key] = {"value": None, "reason": TOO_LITTLE_THROUGHPUT}
            continue
        if not corrected:
            months[key] = {"value": out / into, "reason": None}
            continue
        stored = drift * measured / 100
        out += stored
        if abs(stored) > DRIFT_CORRECTION_MAX_SHARE * into or out <= 0:
            months[key] = {"value": None, "reason": DRIFT_UNCORRECTABLE}
            continue
        months[key] = {"value": out / into, "reason": None, "drift_corrected": True}
    return months


def comparison(months: Mapping[str, Mapping[str, Any]], keys: Sequence[str]) -> dict[str, Any]:
    """The last twelve months against the twelve before, as means of the monthly figures.

    keys is every month key up to now, ascending. A side's mean counts only
    the months with a figure; the means and their change appear only when both
    sides have COMPARISON_MIN_MONTHS of them. The counts always appear, so the
    card can say why there is no figure. Months are weighted equally: this is
    a mean of monthly figures, not of hours.
    """
    recent_keys = keys[-_COMPARISON_SPAN:]
    previous_keys = keys[-2 * _COMPARISON_SPAN : -_COMPARISON_SPAN]

    def values(side: Sequence[str]) -> list[float]:
        found = []
        for key in side:
            value = months.get(key, {}).get("value")
            if value is not None:
                found.append(value)
        return found

    recent, previous = values(recent_keys), values(previous_keys)
    result: dict[str, Any] = {
        "recent_mean": None,
        "previous_mean": None,
        "change": None,
        "recent_months": len(recent),
        "previous_months": len(previous),
    }
    if len(recent) >= COMPARISON_MIN_MONTHS and len(previous) >= COMPARISON_MIN_MONTHS:
        recent_mean = sum(recent) / len(recent)
        previous_mean = sum(previous) / len(previous)
        result.update(
            recent_mean=recent_mean,
            previous_mean=previous_mean,
            change=recent_mean - previous_mean,
        )
    return result


def solar_energy_by_month(pv: EnergySeries, tz: tzinfo) -> dict[str, dict[str, Any]]:
    """The PV counter's energy per local month that has rows, in kWh.

    It carries the weather, and on a system that does not export it carries
    the household too; the best hour is the figure that carries less of both.
    """
    return {
        key: {"value": total, "reason": None}
        for key, total in sorted(_sums_by_month(pv, tz).items())
    }


def best_hour_by_month(
    pv_power: Sequence[HourlyRow], tz: tzinfo, *, ceiling: Ceiling | None
) -> dict[str, dict[str, Any]]:
    """The highest hourly PV peak per local month, leaving out ceiling hours.

    In a ceiling hour the battery was full and the inverter cut the array back
    to what the house used, so its peak is the load, not the array. With a
    ceiling, the candidates are hours the three sensors saw and that were not
    ceiling hours: an hour they did not see cannot be told apart from one at
    the limit. A month needs BEST_HOUR_MIN_HOURS candidates of real sun (mean
    at or above CEILING_PV_MIN_W) before its best hour is read; below that it
    is curtailed, with the count. Without one every hour is read, and
    unconstrained_hours is None because nothing was left out. The same holds
    for a month in which the three sensors saw no hour at all: calling it
    curtailed would claim a limit nobody measured.
    """
    months: dict[str, dict[str, Any]] = {}
    for key, rows in sorted(rows_by_month(pv_power, tz).items()):
        if ceiling is None or not any(row.start in ceiling.observed for row in rows):
            months[key] = {
                "value": max(row.max for row in rows),
                "reason": None,
                "unconstrained_hours": None,
            }
            continue
        candidates = [
            row for row in rows if row.start in ceiling.observed and row.start not in ceiling.hours
        ]
        sunny = sum(1 for row in candidates if row.mean >= CEILING_PV_MIN_W)
        if sunny < BEST_HOUR_MIN_HOURS:
            months[key] = {"value": None, "reason": CURTAILED, "unconstrained_hours": sunny}
            continue
        months[key] = {
            "value": max(row.max for row in candidates),
            "reason": None,
            "unconstrained_hours": sunny,
        }
    return months


def inverter_by_month(
    load: Sequence[HourlyRow], rated_power: float, tz: tzinfo
) -> dict[str, dict[str, Any]]:
    """Hours whose load peak reached 80% of rated power, per local month.

    The Sizing tab's evidence, month by month. A month without load rows is
    absent, as on every signal: a gap, not a month of no load. It describes how the house is
    used rather than the hardware: without a temperature or fault sensor there
    is nothing more the data can say about the inverter itself.
    """
    months: dict[str, dict[str, Any]] = {}
    for key, rows in sorted(rows_by_month(load, tz).items()):
        evidence = inverter_evidence(rows, rated_power)
        months[key] = {
            "value": evidence["hours_above_high"],
            "reason": None,
            "hours_at_rated": evidence["hours_at_rated"],
            "measured_hours": evidence["measured_hours"],
        }
    return months


def withhold_partial_months(
    months: Mapping[str, Mapping[str, Any]],
    starts: Iterable[datetime],
    month_hours: Mapping[str, float],
    tz: tzinfo,
) -> dict[str, dict[str, Any]]:
    """Withhold, as partial_month, each month the signal's own rows cover too little of.

    For the signals that are sums or maxima — solar energy, inverter hours and
    the best hour — a month with a third of its days is not comparable with a
    whole one: it reads as a worse month, and it pulls the twelve-month mean
    down with it. Coverage is the number of distinct hourly rows in the month
    over the month's hours; below PARTIAL_MONTH_COVERAGE the figure is
    withheld, its other fields kept. month_hours is the length of the
    whole calendar month, the current one included: the current month is set
    beside a whole month a year earlier, so it is measured against a whole
    month, not against the part that has elapsed. A month absent from
    month_hours is left as it is. Ratios — capacity and efficiency — do not go
    through here: a share of half a month is still a share. A withheld month
    carries `coverage`, the share of the whole calendar month it covered, so
    the panel can say how far short it fell.
    """
    seen: dict[str, set[datetime]] = defaultdict(set)
    for start in starts:
        seen[_month(start, tz)].add(start)
    result: dict[str, dict[str, Any]] = {}
    for key, month in months.items():
        hours = month_hours.get(key)
        covered = len(seen.get(key, ()))
        if hours and covered < PARTIAL_MONTH_COVERAGE * hours:
            result[key] = {
                **month,
                "value": None,
                "reason": PARTIAL_MONTH,
                "coverage": covered / hours,
            }
        else:
            result[key] = dict(month)
    return result


def _first_month(keys: Sequence[str], signals: Mapping[str, Mapping[str, Any]]) -> str | None:
    """The first month in which any signal has a figure, not merely a reason."""
    for key in keys:
        for signal in signals.values():
            if signal["months"].get(key, {}).get("value") is not None:
                return key
    return None


def build_health_payload(
    *,
    now: datetime,
    tz: tzinfo,
    soc: HourlySeries | None,
    battery_power: HourlySeries | None,
    pv_power: HourlySeries | None,
    load: HourlySeries | None,
    charge: EnergySeries | None,
    discharge: EnergySeries | None,
    pv: EnergySeries | None,
    export: EnergySeries | None,
    grid: HourlySeries | None,
    rated_power: float,
    low_pct: float,
    idle_w: float,
    zero_w: float,
    nameplate_kwh: float | None,
    missing: Mapping[str, Sequence[str]],
) -> dict[str, Any]:
    """Every signal for every month from HEALTH_MAX_YEARS ago to now.

    The series are already read, or None when their role is not mapped; grid
    is already signed so that negative is export. `missing` names, per
    signal, the roles it needs that are not mapped, and such a signal has no
    months at all. The ceiling is read only when the charge, the battery's
    power and the PV power all have rows — a sensor with none would make every
    hour look unconstrained — and only when export is not known to flow.
    """
    window = Window(now - timedelta(days=HEALTH_MAX_YEARS * _DAYS_PER_YEAR), now)
    # Whole calendar months, the current one too: see withhold_partial_months.
    month_hours = {
        key: seconds / _SECONDS_PER_HOUR for key, seconds in months_touched(window, tz).items()
    }
    keys = sorted(month_hours)

    exports = export_limited(
        pv=pv,
        export=export,
        grid=grid.rows if grid is not None else None,
        zero_w=zero_w,
    )
    # A full battery cuts the array back only where the surplus cannot go to
    # the grid. On a system known to export, leaving ceiling hours out would
    # make the best hour follow the battery filling, not the array. Unknown
    # counts as limited: leaving hours out is the safe side.
    ceiling = None
    if (
        exports is not False
        and soc
        and soc.rows
        and battery_power
        and battery_power.rows
        and pv_power
        and pv_power.rows
    ):
        ceiling = charge_ceiling(
            soc.rows, battery_power.rows, pv_power.rows, low_pct=low_pct, idle_w=idle_w
        )

    def wanted(name: str) -> bool:
        return not missing.get(name)

    computed: dict[str, dict[str, dict[str, Any]]] = {name: {} for name in SIGNALS}
    if wanted("capacity") and soc is not None and charge is not None and discharge is not None:
        hours = clean_discharge_hours(soc.rows, charge, discharge)
        computed["capacity"] = capacity_by_month(hours, tz)
    if wanted("efficiency") and charge is not None and discharge is not None:
        soc_rows = soc.rows if soc is not None else None
        computed["efficiency"] = efficiency_by_month(
            charge, discharge, soc_rows, tz, capacity=computed["capacity"]
        )
    if wanted("solar_energy") and pv is not None:
        computed["solar_energy"] = withhold_partial_months(
            solar_energy_by_month(pv, tz), (row.start for row in pv.rows), month_hours, tz
        )
    if wanted("best_hour") and pv_power is not None:
        computed["best_hour"] = withhold_partial_months(
            best_hour_by_month(pv_power.rows, tz, ceiling=ceiling),
            (row.start for row in pv_power.rows),
            month_hours,
            tz,
        )
    if wanted("inverter") and load is not None:
        computed["inverter"] = withhold_partial_months(
            inverter_by_month(load.rows, rated_power, tz),
            (row.start for row in load.rows),
            month_hours,
            tz,
        )

    signals = {
        name: {
            "missing": list(missing.get(name, ())),
            "months": months,
            "comparison": comparison(months, keys),
        }
        for name, months in computed.items()
    }

    read = [soc, battery_power, pv_power, load, charge, discharge, pv, export, grid]
    ends = [item.covered_end for item in read if item is not None and item.covered_end]
    covered_end = max(ends) if ends else None
    return {
        "timezone": str(tz),
        "months": keys,
        "first_month": _first_month(keys, signals),
        "covered_end": covered_end.isoformat() if covered_end else None,
        "covers_now": bool(covered_end and covered_end >= now - _COVERS_NOW_SLACK),
        "export_limited": exports,
        "best_hour_mode": "unconstrained" if ceiling is not None else "all",
        "nameplate_kwh": nameplate_kwh,
        "signals": signals,
    }


# What each signal needs mapped. Efficiency needs the state of charge for its
# gate; no_soc is left for a mapped sensor with no rows in a month.
_SIGNAL_ROLES: dict[str, tuple[str, ...]] = {
    "capacity": ("battery_soc", "battery_discharge_total", "battery_charge_total"),
    "efficiency": ("battery_soc", "battery_charge_total", "battery_discharge_total"),
    "solar_energy": ("pv_energy_total",),
    "best_hour": ("pv_power",),
    "inverter": ("load_power", "rated_power"),
}
_HOURLY_ROLES = ("battery_soc", "battery_power", "pv_power", "load_power")
_ENERGY_ROLES = (
    "battery_charge_total",
    "battery_discharge_total",
    "pv_energy_total",
    "grid_export_total",
)


async def async_health_analytics(hass: HomeAssistant, config: EntryConfig) -> dict[str, Any]:
    """Read HEALTH_MAX_YEARS of statistics and compute every signal.

    Statistics only, never raw states, and no window from the caller: the
    question is about the whole record.
    """
    rated_power = config.number("rated_power")
    # A missing or zero rating would put every hour "at rated".
    has_rated = rated_power is not None and rated_power > 0
    mapped = {
        role: config.entity_id(role) for role in (*_HOURLY_ROLES, *_ENERGY_ROLES, "grid_power")
    }
    # The total, or the strings standing in for it when none is mapped.
    pv_ids = pv_power_ids(config)

    def is_mapped(role: str) -> bool:
        if role == "rated_power":
            return has_rated
        if role == "pv_power":
            return bool(pv_ids)
        return bool(mapped.get(role))

    missing = {
        name: [role for role in roles if not is_mapped(role)]
        for name, roles in _SIGNAL_ROLES.items()
    }
    if all(missing.values()):
        raise ValueError(
            "health needs battery_soc with battery_charge_total and battery_discharge_total, "
            "pv_energy_total, or load_power with rated_power"
        )

    now = dt_util.utcnow()
    window = Window(now - timedelta(days=HEALTH_MAX_YEARS * _DAYS_PER_YEAR), now)
    hourly_roles = [*_HOURLY_ROLES]
    # Grid power only answers export when the export counter is not mapped.
    if not mapped["grid_export_total"]:
        hourly_roles.append("grid_power")
    hourly_ids = [
        entity_id
        for role in hourly_roles
        for entity_id in (pv_ids if role == "pv_power" else (mapped[role],))
        if entity_id
    ]
    energy_ids = [mapped[role] for role in _ENERGY_ROLES if mapped[role]]
    extremes = await async_hourly_extremes_many(hass, hourly_ids, window)
    energy = await async_energy_many(hass, energy_ids, window)

    def hourly(role: str) -> HourlySeries | None:
        entity_id = mapped[role]
        return extremes.get(entity_id) if entity_id else None

    def counter(role: str) -> EnergySeries | None:
        entity_id = mapped[role]
        return energy.get(entity_id) if entity_id else None

    grid_rows = signed_grid(config, hourly("grid_power")) if "grid_power" in hourly_roles else None
    zone = dt_util.get_time_zone(hass.config.time_zone) or dt_util.UTC
    payload = build_health_payload(
        now=now,
        tz=zone,
        soc=hourly("battery_soc"),
        battery_power=hourly("battery_power"),
        pv_power=pv_hourly(config, extremes),
        load=hourly("load_power"),
        charge=counter("battery_charge_total"),
        discharge=counter("battery_discharge_total"),
        pv=counter("pv_energy_total"),
        export=counter("grid_export_total"),
        grid=HourlySeries(tuple(grid_rows)) if grid_rows is not None else None,
        rated_power=rated_power or 0.0,
        low_pct=config.number("battery_low_pct") or DEFAULT_BATTERY_LOW_PCT,
        idle_w=config.number("battery_idle_w") or DEFAULT_BATTERY_IDLE_W,
        zero_w=config.number("grid_zero_w") or DEFAULT_GRID_ZERO_W,
        nameplate_kwh=config.number("battery_capacity"),
        missing=missing,
    )
    # Summed from the strings, the best hour's peak is the sum of their peaks,
    # which can read a little above the array's true peak; the tab says so.
    payload["pv_power_derived"] = pv_power_derived(config)
    return payload
