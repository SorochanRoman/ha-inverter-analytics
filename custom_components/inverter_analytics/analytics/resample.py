"""Time-weighted математика над станами Home Assistant.

Стани приходять нерівномірно, тому кожне значення важить рівно стільки,
скільки воно трималось. Модуль не залежить від Home Assistant.
"""

from __future__ import annotations

from collections.abc import Iterable, Sequence
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class Sample:
    """Стан у момент часу. value is None — unavailable/unknown."""

    ts: datetime
    value: float | None


@dataclass(frozen=True, slots=True)
class Interval:
    """Проміжок, протягом якого значення було сталим."""

    start: datetime
    end: datetime
    value: float

    @property
    def seconds(self) -> float:
        """Тривалість у секундах."""
        return (self.end - self.start).total_seconds()


@dataclass(frozen=True, slots=True)
class Series:
    """Послідовність станів у межах вікна [start, end)."""

    start: datetime
    end: datetime
    samples: tuple[Sample, ...]

    @classmethod
    def of(cls, start: datetime, end: datetime, samples: Iterable[Sample]) -> Series:
        """Створити серію, впорядкувавши семпли за часом."""
        return cls(start, end, tuple(sorted(samples, key=lambda sample: sample.ts)))

    @property
    def duration(self) -> float:
        """Довжина вікна в секундах."""
        return max((self.end - self.start).total_seconds(), 0.0)


def to_intervals(series: Series) -> list[Interval]:
    """Перетворити крокову функцію станів на інтервали, обрізані вікном.

    Семпли зі значенням None пропускаються: розрив у даних не інтерполюється.
    """
    intervals: list[Interval] = []
    samples = series.samples

    for index, sample in enumerate(samples):
        if sample.value is None:
            continue
        start = max(sample.ts, series.start)
        next_ts = samples[index + 1].ts if index + 1 < len(samples) else series.end
        end = min(next_ts, series.end)
        if end <= start:
            continue
        intervals.append(Interval(start, end, float(sample.value)))

    return intervals


def coverage(series: Series) -> float:
    """Частка вікна, для якої є валідні дані, від 0.0 до 1.0."""
    total = series.duration
    if total <= 0:
        return 0.0
    covered = sum(interval.seconds for interval in to_intervals(series))
    return min(covered / total, 1.0)


def time_weighted_mean(intervals: Sequence[Interval]) -> float | None:
    """Середнє, зважене за тривалістю. None, якщо даних немає."""
    total_seconds = sum(interval.seconds for interval in intervals)
    if total_seconds <= 0:
        return None
    weighted = sum(interval.value * interval.seconds for interval in intervals)
    return weighted / total_seconds
