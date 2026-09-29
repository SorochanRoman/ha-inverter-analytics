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
from .seasonality import month_key
from .source import HourlyRow

ENOUGH = "enough"
BORDERLINE = "borderline"
SHORT = "short"

# The thresholds are judgement — there is no measurement of "enough" — so
# they are named here and printed on the card, where they can be argued with.
INVERTER_SHORT_SHARE = 0.01
INVERTER_BORDERLINE_SHARE = 0.05

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
