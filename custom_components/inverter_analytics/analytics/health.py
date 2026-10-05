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
from datetime import datetime, tzinfo
from typing import Any

from .battery import EFFICIENCY_MAX_DRIFT_PCT, EFFICIENCY_MIN_KWH
from .seasonality import month_key
from .source import EnergySeries, HourlyRow

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

TOO_FEW_CLEAN_HOURS = "too_few_clean_hours"
NO_SOC = "no_soc"
DRIFT = "drift"
TOO_LITTLE_THROUGHPUT = "too_little_throughput"

_COMPARISON_SPAN = 12


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
        if charged[row.start] <= CLEAN_CHARGE_MAX_KWH and out > 0 and drop >= CLEAN_DROP_MIN_POINTS:
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


def efficiency_by_month(
    charge: EnergySeries,
    discharge: EnergySeries,
    soc: Sequence[HourlyRow] | None,
    tz: tzinfo,
) -> dict[str, dict[str, Any]]:
    """Round-trip efficiency per local month that has counter rows.

    The Battery tab's gate, with its constants: the month's charge must end
    within EFFICIENCY_MAX_DRIFT_PCT of where it began (the mean of its last
    hour against the mean of its first), and at least EFFICIENCY_MIN_KWH must
    have gone in. Without a state of charge the drift cannot be checked.
    """
    charged = _sums_by_month(charge, tz)
    discharged = _sums_by_month(discharge, tz)
    soc_by_month: dict[str, list[HourlyRow]] = defaultdict(list)
    for row in soc or ():
        soc_by_month[_month(row.start, tz)].append(row)

    months: dict[str, dict[str, Any]] = {}
    for key in sorted(charged.keys() | discharged.keys()):
        rows = soc_by_month.get(key)
        if not rows:
            months[key] = {"value": None, "reason": NO_SOC}
            continue
        first = min(rows, key=lambda row: row.start)
        last = max(rows, key=lambda row: row.start)
        if abs(last.mean - first.mean) > EFFICIENCY_MAX_DRIFT_PCT:
            months[key] = {"value": None, "reason": DRIFT}
            continue
        into, out = charged.get(key, 0.0), discharged.get(key, 0.0)
        if into < EFFICIENCY_MIN_KWH or out <= 0:
            months[key] = {"value": None, "reason": TOO_LITTLE_THROUGHPUT}
            continue
        months[key] = {"value": out / into, "reason": None}
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
