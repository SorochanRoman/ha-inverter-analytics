"""PV power, read from the total or, failing it, from the strings.

Some presets produce no total PV power sensor at all, only one per string —
a Deye on Solarman has `pv1_power` and `pv2_power` and nothing above them.
Without a stand-in, every reader that needs PV power treated such an
installation as one with no PV power mapped: Sizing and Health lost their
ceiling mode, Health its best hour, Seasonality its PV line.

The total wins whenever it is mapped. The strings stand in only for its
absence, and a reading built from them is marked as derived, because one
thing about it is not quite the same: see pv_total_hourly.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence

from ..roles import EntryConfig
from .grid import sum_series
from .resample import Series
from .source import HourlyRow, HourlySeries, SeriesResult


def pv_power_derived(config: EntryConfig) -> bool:
    """Whether PV power is the sum of the strings rather than a mapped total."""
    return not config.entity_ids("pv_power") and bool(config.entity_ids("pv_power_string"))


def pv_power_ids(config: EntryConfig) -> tuple[str, ...]:
    """The entities PV power is read from: the total, or the strings in its place."""
    total = config.entity_id("pv_power")
    if total:
        return (total,)
    return config.entity_ids("pv_power_string")


def pv_total_hourly(rows_by_string: Sequence[Sequence[HourlyRow]]) -> list[HourlyRow]:
    """The array's hours, summed from its strings' hourly statistics.

    The mean of a sum is the sum of the means, and the floor of the sum is at
    least the sum of the floors — exact when the strings bottom out together,
    which in practice they do, at night and under the same cloud. The peak is
    the one figure that can read high: the sum of the strings' maxima is the
    hour's peak only if they peaked at the same instant, and two strings on
    different roof faces need not. It can overstate the hour's true peak a
    little; never understate it.

    An hour is kept only when every string has a row for it. Half an array is
    not the array's hour, and counting it would read as a dull hour of sun.
    """
    if not rows_by_string:
        return []
    by_start = [{row.start: row for row in rows} for rows in rows_by_string]
    common = set(by_start[0]).intersection(*by_start[1:])
    total = []
    for start in sorted(common):
        rows = [hours[start] for hours in by_start]
        total.append(
            HourlyRow(
                start,
                sum(row.mean for row in rows),
                sum(row.min for row in rows),
                sum(row.max for row in rows),
            )
        )
    return total


def pv_hourly(config: EntryConfig, extremes: Mapping[str, HourlySeries]) -> HourlySeries | None:
    """PV power's hourly statistics, or None when neither total nor strings are mapped."""
    ids = pv_power_ids(config)
    if not ids:
        return None
    if not pv_power_derived(config):
        return extremes.get(ids[0])
    empty = HourlySeries(())
    return HourlySeries(
        tuple(pv_total_hourly([extremes.get(entity_id, empty).rows for entity_id in ids]))
    )


def pv_series(config: EntryConfig, results: Mapping[str, SeriesResult]) -> Series | None:
    """PV power as a series, summed from the strings when no total is mapped.

    A gap in any string is a gap in the sum, as it is for the grid phases.
    """
    ids = pv_power_ids(config)
    if not ids:
        return None
    if not pv_power_derived(config):
        return results[ids[0]].series
    return sum_series([results[entity_id].series for entity_id in ids])
