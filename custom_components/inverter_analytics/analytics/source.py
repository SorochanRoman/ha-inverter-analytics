"""Access to Home Assistant historical data with automatic precision selection."""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum
from functools import partial
from typing import Any

from homeassistant.components.recorder import get_instance, history
from homeassistant.components.recorder.statistics import statistics_during_period
from homeassistant.core import HomeAssistant, State
from homeassistant.util import dt as dt_util

from .resample import Sample, Series

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


def statistic_rows_to_samples(rows: Iterable[Mapping[str, Any]], sign: float) -> list[Sample]:
    """Convert hourly statistics rows into samples using the mean value."""
    samples: list[Sample] = []
    for row in rows:
        start = row.get("start")
        moment = dt_util.utc_from_timestamp(start) if isinstance(start, (int, float)) else start
        if moment is None:
            continue
        mean = row.get("mean")
        samples.append(Sample(moment, None if mean is None else float(mean) * sign))
    return samples


async def _async_raw_samples(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float
) -> list[Sample]:
    """Read raw states from the recorder."""
    recorder = get_instance(hass)
    result = await recorder.async_add_executor_job(
        partial(
            history.state_changes_during_period,
            hass,
            window.start,
            window.end,
            entity_id,
            no_attributes=True,
            include_start_time_state=True,
        )
    )
    return states_to_samples(result.get(entity_id, []), sign)


async def _async_lts_samples(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float
) -> list[Sample]:
    """Read hourly long-term statistics."""
    recorder = get_instance(hass)
    result = await recorder.async_add_executor_job(
        partial(
            statistics_during_period,
            hass,
            window.start,
            window.end,
            {entity_id},
            "hour",
            None,
            {"mean"},
        )
    )
    return statistic_rows_to_samples(result.get(entity_id, []), sign)


async def async_series(
    hass: HomeAssistant, entity_id: str, window: Window, sign: float = 1.0
) -> Series:
    """Build a series of states for a window, automatically choosing the source."""
    plan = plan_precision(hass, window)
    samples: list[Sample] = []

    if plan.precision in (Precision.LTS, Precision.MIXED):
        lts_end = window.end if plan.precision is Precision.LTS else plan.boundary
        assert lts_end is not None
        samples += await _async_lts_samples(hass, entity_id, Window(window.start, lts_end), sign)

    if plan.precision in (Precision.RAW, Precision.MIXED):
        raw_start = window.start if plan.precision is Precision.RAW else plan.boundary
        assert raw_start is not None
        samples += await _async_raw_samples(hass, entity_id, Window(raw_start, window.end), sign)

    return Series.of(window.start, window.end, samples)
