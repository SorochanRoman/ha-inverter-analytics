"""Access to Home Assistant historical data with automatic precision selection."""

from __future__ import annotations

from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum
from functools import partial
from typing import Any

from homeassistant.components.recorder import get_instance, history
from homeassistant.components.recorder.statistics import statistics_during_period
from homeassistant.core import HomeAssistant, State
from homeassistant.util import dt as dt_util

from .resample import Sample, Series, coverage

_GAP_STATES = {"unavailable", "unknown", "none", ""}


class Precision(StrEnum):
    """Where a window's data was sourced from."""

    RAW = "raw"
    LTS = "lts"
    MIXED = "mixed"


@dataclass(frozen=True, slots=True)
class Window:
    """A query's time window."""

    start: datetime
    end: datetime

    @property
    def seconds(self) -> float:
        """Window length in seconds."""
        return max((self.end - self.start).total_seconds(), 0.0)


@dataclass(frozen=True, slots=True)
class PrecisionPlan:
    """The data-source decision. boundary is the moment raw states become available."""

    precision: Precision
    boundary: datetime | None


def raw_available_from(hass: HomeAssistant) -> datetime:
    """The earliest moment for which the recorder still holds raw states."""
    return dt_util.utcnow() - timedelta(days=get_instance(hass).keep_days)


def plan_precision(hass: HomeAssistant, window: Window) -> PrecisionPlan:
    """Choose a data source for the window."""
    boundary = raw_available_from(hass)
    if window.start >= boundary:
        # boundary only matters for a mixed window: it's the moment the reader
        # switches from hourly averages to raw states. A uniform window has no
        # such boundary, and the UI must not draw a marker for it.
        return PrecisionPlan(Precision.RAW, None)
    if window.end <= boundary:
        return PrecisionPlan(Precision.LTS, None)
    return PrecisionPlan(Precision.MIXED, boundary)


def states_to_samples(states: Iterable[State], sign: float) -> list[Sample]:
    """Convert states into samples; non-numeric states become gaps."""
    samples: list[Sample] = []
    for state in states:
        raw = state.state
        if raw is None or raw.lower() in _GAP_STATES:
            samples.append(Sample(state.last_changed, None))
            continue
        try:
            value = float(raw)
        except (TypeError, ValueError):
            samples.append(Sample(state.last_changed, None))
            continue
        samples.append(Sample(state.last_changed, value * sign))
    return samples


STATISTICS_PERIOD = timedelta(hours=1)


def statistic_rows_to_samples(rows: Iterable[Mapping[str, Any]], sign: float) -> list[Sample]:
    """Convert hourly statistics rows into samples using the mean value.

    Each row describes exactly one hour, and every hour is closed off after it.
    A state persists until the next one changes it, but a statistics row does
    not: an hour with no row means nobody recorded that hour, not that the
    previous hour continued.

    Without this a fortnight the recorder spent switched off is filled in by
    whatever value preceded it, and the coverage figure — the one number that
    says whether a month is comparable with its neighbours — reports the whole
    month as present. Seen against real imported statistics: four seeded days
    of June were reported as a complete month with a mean higher than May's.
    """
    samples: list[Sample] = []
    expected: datetime | None = None
    for row in rows:
        start = row.get("start")
        moment = dt_util.utc_from_timestamp(start) if isinstance(start, (int, float)) else start
        if moment is None:
            continue
        # Only where the run of hours breaks: a closer between two adjacent
        # hours would be replaced immediately, and a year of them would double
        # the sample count for nothing.
        if expected is not None and moment > expected:
            samples.append(Sample(expected, None))
        mean = row.get("mean")
        samples.append(Sample(moment, None if mean is None else float(mean) * sign))
        expected = moment + STATISTICS_PERIOD

    if expected is not None:
        samples.append(Sample(expected, None))
    return samples


def _read_raw_states(
    hass: HomeAssistant, entity_ids: Sequence[str], window: Window
) -> dict[str, list[State]]:
    """Read raw states for several entities inside one executor job.

    The recorder call itself is per-entity, but the round trip to the executor
    is not: the Balance tab needs six sensors over one window, and paying six
    thread hand-offs for what is one database session is the cost this exists
    to avoid.
    """
    collected: dict[str, list[State]] = {}
    for entity_id in entity_ids:
        result = history.state_changes_during_period(
            hass,
            window.start,
            window.end,
            entity_id,
            no_attributes=True,
            include_start_time_state=True,
        )
        collected[entity_id] = list(result.get(entity_id, []))
    return collected


async def _async_raw_states(
    hass: HomeAssistant, entity_ids: Sequence[str], window: Window
) -> dict[str, list[State]]:
    """Raw states for several entities."""
    recorder = get_instance(hass)
    return await recorder.async_add_executor_job(
        partial(_read_raw_states, hass, tuple(entity_ids), window)
    )


async def _async_lts_rows(
    hass: HomeAssistant, entity_ids: Sequence[str], window: Window
) -> dict[str, list[Mapping[str, Any]]]:
    """Hourly long-term statistics for several entities in one query."""
    recorder = get_instance(hass)
    result = await recorder.async_add_executor_job(
        partial(
            statistics_during_period,
            hass,
            window.start,
            window.end,
            set(entity_ids),
            "hour",
            None,
            {"mean"},
        )
    )
    return {entity_id: list(result.get(entity_id, [])) for entity_id in entity_ids}


@dataclass(frozen=True, slots=True)
class SeriesResult:
    """One entity's data for a window, with the provenance of that data."""

    series: Series
    precision: Precision
    boundary: datetime | None

    @property
    def coverage(self) -> float:
        """Share of the window this entity actually has data for."""
        return coverage(self.series)


def _observed_precision(plan: PrecisionPlan, has_lts: bool, has_raw: bool) -> Precision:
    """What one entity actually got, which need not be what the window planned.

    A sensor without a state_class has no long-term statistics at all, so a
    window the recorder can only answer from LTS comes back empty for it while
    its neighbour is fully covered. Reporting the plan for both would state
    something about this entity that is not true of it.
    """
    if plan.precision is not Precision.MIXED:
        return plan.precision
    if has_lts and has_raw:
        return Precision.MIXED
    if has_lts:
        return Precision.LTS
    return Precision.RAW


@dataclass(frozen=True, slots=True)
class EnergyRow:
    """One hour's worth of energy, as the recorder accounts for it."""

    start: datetime
    change: float


@dataclass(frozen=True, slots=True)
class EnergySeries:
    """A counter's hourly changes, with the span they actually cover."""

    rows: tuple[EnergyRow, ...]

    @property
    def total(self) -> float:
        """Energy across every hour returned."""
        return sum(row.change for row in self.rows)

    @property
    def covered_start(self) -> datetime | None:
        """The first hour with statistics, or None if there are none."""
        return self.rows[0].start if self.rows else None

    @property
    def covered_end(self) -> datetime | None:
        """The end of the last hour with statistics."""
        return (self.rows[-1].start + STATISTICS_PERIOD) if self.rows else None


def _read_energy(
    hass: HomeAssistant, entity_ids: Sequence[str], window: Window
) -> dict[str, list[Mapping[str, Any]]]:
    """Hourly counter changes for several entities, in one query."""
    result = statistics_during_period(
        hass, window.start, window.end, set(entity_ids), "hour", None, {"change"}
    )
    return {entity_id: list(result.get(entity_id, [])) for entity_id in entity_ids}


async def async_energy_many(
    hass: HomeAssistant, entity_ids: Sequence[str], window: Window
) -> dict[str, EnergySeries]:
    """Read hourly energy for several counters.

    Always from statistics, never from raw states, and for every window
    including today's. The six energy roles are total_increasing counters that
    reset — nightly, yearly, or whenever the vendor feels like it — and the
    recorder already detects the dip and keeps its accumulated sum climbing
    across it. `change` is that accounting, and it is what Home Assistant's own
    Energy dashboard reads.

    Raw states would be more precise for a rate. For a counter they are merely
    raw: using them would mean re-implementing reset detection, where one
    mistake turns a nightly reset into a day of negative production.
    """
    unique = list(dict.fromkeys(entity_ids))
    if not unique:
        return {}

    recorder = get_instance(hass)
    raw = await recorder.async_add_executor_job(partial(_read_energy, hass, tuple(unique), window))

    results: dict[str, EnergySeries] = {}
    for entity_id in unique:
        rows = []
        for row in raw.get(entity_id, []):
            change = row.get("change")
            start = row.get("start")
            moment = dt_util.utc_from_timestamp(start) if isinstance(start, (int, float)) else start
            # A null change is an hour the recorder has no accounting for, which
            # is not an hour of no energy. Dropping it keeps it out of both the
            # total and the covered span.
            if change is None or moment is None:
                continue
            rows.append(EnergyRow(moment, float(change)))
        results[entity_id] = EnergySeries(tuple(rows))
    return results


def describe_series(entity_id: str, result: SeriesResult) -> dict[str, Any]:
    """One entry of a payload's per-series provenance block."""
    return {
        "entity_id": entity_id,
        "precision": result.precision.value,
        "boundary": result.boundary.isoformat() if result.boundary else None,
        "coverage": result.coverage,
    }


async def async_series_many(
    hass: HomeAssistant,
    entity_ids: Sequence[str],
    window: Window,
    signs: Mapping[str, float] | None = None,
) -> dict[str, SeriesResult]:
    """Build a series per entity over one window, in one pass over the recorder."""
    unique = list(dict.fromkeys(entity_ids))
    if not unique:
        return {}

    plan = plan_precision(hass, window)
    signs = signs or {}

    lts_rows: dict[str, list[Mapping[str, Any]]] = {}
    if plan.precision in (Precision.LTS, Precision.MIXED):
        lts_end = window.end if plan.precision is Precision.LTS else plan.boundary
        if lts_end is None:
            raise ValueError("a mixed window has no boundary")
        lts_rows = await _async_lts_rows(hass, unique, Window(window.start, lts_end))

    raw_states: dict[str, list[State]] = {}
    if plan.precision in (Precision.RAW, Precision.MIXED):
        raw_start = window.start if plan.precision is Precision.RAW else plan.boundary
        if raw_start is None:
            raise ValueError("a mixed window has no boundary")
        raw_states = await _async_raw_states(hass, unique, Window(raw_start, window.end))

    results: dict[str, SeriesResult] = {}
    for entity_id in unique:
        sign = signs.get(entity_id, 1.0)
        rows = lts_rows.get(entity_id, [])
        states = raw_states.get(entity_id, [])
        samples = statistic_rows_to_samples(rows, sign) + states_to_samples(states, sign)
        observed = _observed_precision(plan, bool(rows), bool(states))
        results[entity_id] = SeriesResult(
            series=Series.of(window.start, window.end, samples),
            precision=observed,
            boundary=plan.boundary if observed is Precision.MIXED else None,
        )
    return results


async def async_series(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float = 1.0
) -> Series:
    """Build a series of states for a window, automatically choosing the source."""
    results = await async_series_many(hass, [entity_id], window, {entity_id: sign})
    return results[entity_id].series
