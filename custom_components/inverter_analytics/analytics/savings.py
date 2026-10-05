"""What the installation saved: the energy the house used and did not buy, priced.

The whole system's saving, the sun and the battery together — a battery
charged from the grid at night on a two-zone tariff is in it. Works from
hourly counter changes already read; no dependency on Home Assistant.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import UTC, datetime, timedelta, tzinfo
from typing import Any

from .source import EnergySeries, Window

NO_PRICE = "no_price"
NO_COUNTERS = "no_counters"
NO_HOURS = "no_hours"


def _is_night(hour: int, start: int, end: int) -> bool:
    """Whether a local hour falls in the night zone; start == end is no zone."""
    if start == end:
        return False
    if start < end:
        return start <= hour < end
    return hour >= start or hour < end


def _whole_hours(window: Window) -> int:
    """The hours wholly inside the window: those a statistic can exist for.

    The panel's windows end now, to the minute, so the first and last hours are
    partial and the last is not compiled yet. Counting them would leave every
    complete period an hour short of its own window. Worked in UTC, which is
    exact for every whole-hour time zone.
    """
    start = window.start.astimezone(UTC)
    first = start.replace(minute=0, second=0, microsecond=0)
    if first < start:
        first += timedelta(hours=1)
    last = window.end.astimezone(UTC).replace(minute=0, second=0, microsecond=0)
    return max(int((last - first).total_seconds() // 3600), 0)


def savings_by_hour(
    load: EnergySeries,
    imported: EnergySeries,
    *,
    tz: tzinfo,
    price_day: float,
    price_night: float | None,
    night_start: int,
    night_end: int,
) -> list[tuple[datetime, float]]:
    """Each hour both counters saw: (used - bought) times that hour's price.

    An hour can be negative — one that charged the battery from the grid bought
    more than the house used — and is kept: the same energy comes back when the
    battery gives it out. An hour either counter is missing is left out, not
    read as zero.
    """
    bought = {row.start: row.change for row in imported.rows}
    values: list[tuple[datetime, float]] = []
    for row in load.rows:
        if row.start not in bought:
            continue
        hour = row.start.astimezone(tz).hour
        night = price_night is not None and _is_night(hour, night_start, night_end)
        price = price_night if night else price_day
        values.append((row.start, (row.change - bought[row.start]) * price))
    return values


def build_savings(
    load: EnergySeries | None,
    imported: EnergySeries | None,
    *,
    tz: tzinfo,
    window: Window,
    currency: str,
    price_day: float | None,
    price_night: float | None,
    night_start: int,
    night_end: int,
) -> dict[str, Any]:
    """The Balance payload's savings block, or the reason there is no figure."""
    block: dict[str, Any] = {
        "currency": currency,
        "total": None,
        "per_day": None,
        "days": [],
        "hours": 0,
        "window_hours": _whole_hours(window),
        # An empty night zone prices every hour at the day price.
        "two_zone": price_night is not None and night_start != night_end,
        "reason": None,
    }
    if price_day is None:
        return block | {"reason": NO_PRICE}
    if load is None or imported is None:
        return block | {"reason": NO_COUNTERS}
    hourly = savings_by_hour(
        load,
        imported,
        tz=tz,
        price_day=price_day,
        price_night=price_night,
        night_start=night_start,
        night_end=night_end,
    )
    if not hourly:
        return block | {"reason": NO_HOURS}
    daily: dict[str, float] = defaultdict(float)
    for start, value in hourly:
        daily[start.astimezone(tz).date().isoformat()] += value
    total = sum(daily.values())
    return block | {
        "total": round(total, 4),
        # The mean per 24 hours of data. Dividing by calendar days would halve
        # a rolling day, which touches two of them.
        "per_day": round(total * 24 / len(hourly), 4),
        "days": [{"day": day, "value": round(value, 4)} for day, value in sorted(daily.items())],
        "hours": len(hourly),
    }
