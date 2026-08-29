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


@dataclass(frozen=True, slots=True)
class Bucket:
    """Одна корзина гістограми з готовими для UI межами й часткою."""

    index: int
    start: float
    end: float
    seconds: float
    fraction: float


@dataclass(frozen=True, slots=True)
class Histogram:
    """Розподіл тривалості по корзинах значень.

    Значення поза діапазоном притискуються до перших або останніх корзин:
    час не губиться, але його діапазон позначається неправильно.
    Лічильники clipped_low_seconds і clipped_high_seconds записують,
    скільки часу мислиться поза своїм діапазоном значень.
    """

    bucket_width: float
    offset: float
    seconds: tuple[float, ...]
    clipped_low_seconds: float = 0.0
    clipped_high_seconds: float = 0.0

    @property
    def total_seconds(self) -> float:
        """Сумарна тривалість усіх корзин."""
        return sum(self.seconds)

    def buckets(self) -> list[Bucket]:
        """Розгорнути корзини з межами та частками."""
        total = self.total_seconds
        return [
            Bucket(
                index=index,
                start=self.offset + index * self.bucket_width,
                end=self.offset + (index + 1) * self.bucket_width,
                seconds=value,
                fraction=(value / total) if total > 0 else 0.0,
            )
            for index, value in enumerate(self.seconds)
        ]


def duration_histogram(
    intervals: Sequence[Interval],
    bucket_width: float,
    offset: float = 0.0,
    max_buckets: int = 400,
) -> Histogram:
    """Розподіл тривалості по корзинах значень.

    Значення нижче offset потрапляють у нульову корзину, вище межі —
    у останню: обрізати хвости мовчки гірше, ніж їх притиснути.
    Час у прив'язаних значень лишається в кінцевих корзинах, але
    лічильники clipped_* записують мислені діапазони.
    """
    if bucket_width <= 0:
        raise ValueError("bucket_width має бути додатним")
    if max_buckets < 1:
        raise ValueError("max_buckets має бути щонайменше 1")

    totals: dict[int, float] = {}
    clipped_low = 0.0
    clipped_high = 0.0

    for interval in intervals:
        raw_index = int((interval.value - offset) // bucket_width)
        index = max(0, min(raw_index, max_buckets - 1))
        if raw_index < 0:
            clipped_low += interval.seconds
        elif raw_index >= max_buckets:
            clipped_high += interval.seconds
        totals[index] = totals.get(index, 0.0) + interval.seconds

    size = max(totals) + 1 if totals else 0
    return Histogram(
        bucket_width=bucket_width,
        offset=offset,
        seconds=tuple(totals.get(index, 0.0) for index in range(size)),
        clipped_low_seconds=clipped_low,
        clipped_high_seconds=clipped_high,
    )


def percentile(hist: Histogram, q: float) -> float | None:
    """Перцентиль за тривалістю з лінійною інтерполяцією всередину корзини."""
    if not 0.0 <= q <= 1.0:
        raise ValueError("q має бути в межах від 0.0 до 1.0")

    total = hist.total_seconds
    if total <= 0:
        return None

    target = q * total
    cumulative = 0.0
    for bucket in hist.buckets():
        if bucket.seconds <= 0:
            continue
        if cumulative + bucket.seconds >= target:
            share = (target - cumulative) / bucket.seconds
            return bucket.start + share * hist.bucket_width
        cumulative += bucket.seconds

    return hist.offset + len(hist.seconds) * hist.bucket_width


def duration_curve(hist: Histogram, points: int = 100) -> list[tuple[float, float]]:
    """Крива тривалості навантаження: значення, що перевищується частку часу."""
    if points < 2 or hist.total_seconds <= 0:
        return []
    result: list[tuple[float, float]] = []
    for index in range(points):
        fraction = index / (points - 1)
        value = percentile(hist, 1.0 - fraction)
        if value is not None:
            result.append((fraction, value))
    return result
