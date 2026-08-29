"""Time-weighted математика над станами Home Assistant.

Стани приходять нерівномірно, тому кожне значення важить рівно стільки,
скільки воно трималось. Модуль не залежить від Home Assistant.
"""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Callable, Iterable, Iterator, Sequence
from dataclasses import dataclass
from datetime import datetime, timedelta, tzinfo


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
        raise ValueError("bucket_width must be positive")
    if max_buckets < 1:
        raise ValueError("max_buckets must be at least 1")

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
        raise ValueError("q must be between 0.0 and 1.0")

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


@dataclass(frozen=True, slots=True)
class Episode:
    """Суцільний проміжок, протягом якого виконувалась умова."""

    start: datetime
    end: datetime
    seconds: float
    extreme: float
    mean: float


def _contiguous_runs(intervals: Sequence[Interval]) -> Iterator[list[Interval]]:
    """Розбити інтервали на серії без розривів у часі."""
    run: list[Interval] = []
    for interval in intervals:
        if run and interval.start != run[-1].end:
            yield run
            run = []
        run.append(interval)
    if run:
        yield run


def _matching_runs(
    intervals: Sequence[Interval], predicate: Callable[[float], bool]
) -> Iterator[list[Interval]]:
    """Серії суміжних інтервалів, що задовольняють умову.

    Відсіювання за умовою до перевірки суміжності дає ті самі межі серій:
    і розрив у даних, і інтервал, що умову не задовольняє, однаково
    розривають ланцюг.
    """
    yield from _contiguous_runs([i for i in intervals if predicate(i.value)])


def _to_episode(run: Sequence[Interval], extreme: Callable[[Iterable[float]], float]) -> Episode:
    """Згорнути серію інтервалів в один епізод."""
    seconds = sum(interval.seconds for interval in run)
    weighted = sum(interval.value * interval.seconds for interval in run)
    return Episode(
        start=run[0].start,
        end=run[-1].end,
        seconds=seconds,
        extreme=extreme(interval.value for interval in run),
        mean=weighted / seconds,
    )


def _episodes(
    intervals: Sequence[Interval],
    predicate: Callable[[float], bool],
    extreme: Callable[[Iterable[float]], float],
    min_seconds: float,
) -> list[Episode]:
    episodes: list[Episode] = []
    for run in _matching_runs(intervals, predicate):
        episode = _to_episode(run, extreme)
        if episode.seconds >= min_seconds:
            episodes.append(episode)
    return episodes


def episodes_above(
    intervals: Sequence[Interval], threshold: float, min_seconds: float = 0.0
) -> list[Episode]:
    """Епізоди перевищення порогу; extreme — досягнутий максимум."""
    return _episodes(intervals, lambda value: value > threshold, max, min_seconds)


def episodes_below(
    intervals: Sequence[Interval], threshold: float, min_seconds: float = 0.0
) -> list[Episode]:
    """Епізоди падіння нижче порогу; extreme — досягнутий мінімум."""
    return _episodes(intervals, lambda value: value < threshold, min, min_seconds)


def _max_window_mean(run: Sequence[Interval], window_seconds: float) -> float | None:
    """Максимальне ковзне середнє всередині однієї суцільної серії."""
    times: list[float] = [0.0]
    energy: list[float] = [0.0]
    for interval in run:
        times.append(times[-1] + interval.seconds)
        energy.append(energy[-1] + interval.value * interval.seconds)

    total = times[-1]
    if total < window_seconds:
        return None

    def energy_at(moment: float) -> float:
        if moment <= 0.0:
            return 0.0
        if moment >= total:
            return energy[-1]
        index = bisect_right(times, moment) - 1
        span = times[index + 1] - times[index]
        share = (moment - times[index]) / span
        return energy[index] + share * (energy[index + 1] - energy[index])

    # Максимум ковзного середнього досягається на точці зламу або за вікно до неї.
    candidates = {0.0}
    for moment in times:
        if moment + window_seconds <= total:
            candidates.add(moment)
        if moment - window_seconds >= 0.0:
            candidates.add(moment - window_seconds)

    return max(
        (energy_at(moment + window_seconds) - energy_at(moment)) / window_seconds
        for moment in candidates
    )


def max_sustained_mean(intervals: Sequence[Interval], window_seconds: float) -> float | None:
    """Найбільше середнє за будь-яке вікно заданої довжини.

    Вікна, що перетинають розрив у даних, не розглядаються.
    """
    if window_seconds <= 0:
        raise ValueError("window_seconds must be positive")

    best: float | None = None
    for run in _contiguous_runs(intervals):
        value = _max_window_mean(run, window_seconds)
        if value is not None and (best is None or value > best):
            best = value
    return best


def hour_of_day_durations(intervals: Sequence[Interval], tz: tzinfo) -> list[float]:
    """Тривалість по годинах доби в локальній зоні, рівно 24 елементи.

    Арифметика виконується в UTC, а локальна зона використовується лише для
    визначення номера години. Тому переходи на літній час не створюють і не
    втрачають секунд: сума завжди дорівнює довжині вхідних інтервалів.
    """
    totals = [0.0] * 24

    for interval in intervals:
        cursor = interval.start
        while cursor < interval.end:
            local = cursor.astimezone(tz)
            hour_start = cursor - timedelta(
                minutes=local.minute, seconds=local.second, microseconds=local.microsecond
            )
            boundary = hour_start + timedelta(hours=1)
            if boundary <= cursor:
                boundary = cursor + timedelta(hours=1)
            step_end = min(boundary, interval.end)
            totals[local.hour] += (step_end - cursor).total_seconds()
            cursor = step_end

    return totals
