"""Time-weighted math over Home Assistant states.

States arrive at irregular intervals, so each value is weighted by exactly
how long it held. This module has no dependency on Home Assistant.
"""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Callable, Iterable, Iterator, Sequence
from dataclasses import dataclass
from datetime import datetime, timedelta, tzinfo
from itertools import pairwise


@dataclass(frozen=True, slots=True)
class Sample:
    """A state at a point in time. value is None — unavailable/unknown."""

    ts: datetime
    value: float | None


@dataclass(frozen=True, slots=True)
class Interval:
    """A span during which a value stayed constant."""

    start: datetime
    end: datetime
    value: float

    @property
    def seconds(self) -> float:
        """Duration in seconds."""
        return (self.end - self.start).total_seconds()


@dataclass(frozen=True, slots=True)
class Series:
    """A sequence of states within the window [start, end)."""

    start: datetime
    end: datetime
    samples: tuple[Sample, ...]

    @classmethod
    def of(cls, start: datetime, end: datetime, samples: Iterable[Sample]) -> Series:
        """Build a series, ordering the samples by time."""
        return cls(start, end, tuple(sorted(samples, key=lambda sample: sample.ts)))

    @property
    def duration(self) -> float:
        """Window length in seconds."""
        return max((self.end - self.start).total_seconds(), 0.0)


def to_intervals(series: Series) -> list[Interval]:
    """Turn a step function of states into intervals, clipped to the window.

    Samples with value None are skipped: a gap in the data is not interpolated.
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


@dataclass(frozen=True, slots=True)
class AlignedInterval:
    """A span over which every one of several series held a constant value."""

    start: datetime
    end: datetime
    values: tuple[float, ...]

    @property
    def seconds(self) -> float:
        """Duration in seconds."""
        return (self.end - self.start).total_seconds()


def align(series_list: Sequence[Series]) -> list[AlignedInterval]:
    """Merge several step functions onto one timeline.

    Phases are separate entities that change state at their own moments, so
    nothing instantaneous can be computed across them until they share a
    timeline. The result is cut at every change in any series, so within each
    interval all of them are constant.

    A gap in any one series invalidates the interval, exactly as a gap in a
    single series does: the imbalance across three phases is unknown while one
    of them is unknown, and interpolating over it would invent the very
    difference the number is supposed to measure. The consequence is that the
    aligned coverage is always at most the worst individual series' coverage,
    which is why it is reported as its own number rather than the header's.
    """
    if not series_list:
        return []

    per_series = [to_intervals(series) for series in series_list]
    # The overlap of the windows, which narrows the sweep but does not decide
    # the result: to_intervals has already clipped each series to its own
    # window, so a segment outside the overlap has no covering interval in at
    # least one series and the gap rule below would drop it anyway. Widening
    # this to the union produces the same aligned intervals, more slowly —
    # which is why no test can distinguish the two.
    start = max(series.start for series in series_list)
    end = min(series.end for series in series_list)
    if end <= start:
        return []

    edges = {start, end}
    for intervals in per_series:
        for interval in intervals:
            if start < interval.start < end:
                edges.add(interval.start)
            if start < interval.end < end:
                edges.add(interval.end)
    boundaries = sorted(edges)

    # Every interval boundary is a cut, so within a segment each series either
    # covers it completely or does not overlap it at all — which is what lets a
    # single forward-moving cursor per series answer the whole sweep.
    cursors = [0] * len(per_series)
    aligned: list[AlignedInterval] = []

    for segment_start, segment_end in pairwise(boundaries):
        values: list[float] = []
        for index, intervals in enumerate(per_series):
            while (
                cursors[index] < len(intervals) and intervals[cursors[index]].end <= segment_start
            ):
                cursors[index] += 1
            cursor = cursors[index]
            if cursor < len(intervals) and intervals[cursor].start <= segment_start:
                values.append(intervals[cursor].value)
            else:
                break
        if len(values) == len(per_series):
            aligned.append(AlignedInterval(segment_start, segment_end, tuple(values)))

    return aligned


def aligned_coverage(aligned: Sequence[AlignedInterval], window_seconds: float) -> float:
    """Share of the window over which every series had data at once."""
    if window_seconds <= 0:
        return 0.0
    covered = sum(interval.seconds for interval in aligned)
    return min(covered / window_seconds, 1.0)


def coverage(series: Series) -> float:
    """Share of the window with valid data, from 0.0 to 1.0."""
    total = series.duration
    if total <= 0:
        return 0.0
    covered = sum(interval.seconds for interval in to_intervals(series))
    return min(covered / total, 1.0)


def time_weighted_mean(intervals: Sequence[Interval]) -> float | None:
    """Mean weighted by duration. None if there is no data."""
    total_seconds = sum(interval.seconds for interval in intervals)
    if total_seconds <= 0:
        return None
    weighted = sum(interval.value * interval.seconds for interval in intervals)
    return weighted / total_seconds


@dataclass(frozen=True, slots=True)
class Bucket:
    """One histogram bucket with UI-ready bounds and fraction."""

    index: int
    start: float
    end: float
    seconds: float
    fraction: float


@dataclass(frozen=True, slots=True)
class Histogram:
    """Distribution of duration across value buckets.

    Out-of-range values are clamped into the first or last bucket: time is
    not lost, but its value range is misrepresented. The clipped_low_seconds
    and clipped_high_seconds counters record how much time is misattributed
    outside its true value range.
    """

    bucket_width: float
    offset: float
    seconds: tuple[float, ...]
    clipped_low_seconds: float = 0.0
    clipped_high_seconds: float = 0.0

    @property
    def total_seconds(self) -> float:
        """Total duration across all buckets."""
        return sum(self.seconds)

    def buckets(self) -> list[Bucket]:
        """Expand into buckets with bounds and fractions."""
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
    """Distribution of duration across value buckets.

    Values below offset fall into bucket zero, values above the top edge
    fall into the last bucket: silently dropping the tails is worse than
    clamping them. Time from clamped values stays in the edge buckets, but
    the clipped_* counters record the misattributed ranges.
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
    """Duration-weighted percentile, linearly interpolated within a bucket."""
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


def clamp(value: float, low: float | None, high: float | None) -> float:
    """Clamp a value to a range, ignoring either bound when it is None."""
    if high is not None:
        value = min(value, high)
    if low is not None:
        value = max(value, low)
    return value


def percentile_in_range(
    hist: Histogram, q: float, low: float | None, high: float | None
) -> float | None:
    """Percentile clamped to the observed range.

    The histogram loses the distribution within a bucket, so percentile
    interpolates up to its edge and can return a value above the true
    maximum. On screen this produced a median of 9.1 kW next to a peak of
    9.0 kW — self-contradicting numbers.
    """
    value = percentile(hist, q)
    if value is None:
        return None
    return clamp(value, low, high)


def duration_curve(hist: Histogram, points: int = 100) -> list[tuple[float, float]]:
    """Load duration curve: the value exceeded for a given fraction of time."""
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
    """A contiguous span during which the condition held."""

    start: datetime
    end: datetime
    seconds: float
    extreme: float
    mean: float


def _contiguous_runs(intervals: Sequence[Interval]) -> Iterator[list[Interval]]:
    """Split intervals into runs with no time gaps between them."""
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
    """Runs of adjacent intervals that satisfy the condition.

    Filtering by the condition before checking adjacency gives the same run
    boundaries either way: a gap in the data and an interval that fails the
    condition both break the chain the same way.
    """
    yield from _contiguous_runs([i for i in intervals if predicate(i.value)])


def _to_episode(run: Sequence[Interval], extreme: Callable[[Iterable[float]], float]) -> Episode:
    """Collapse a run of intervals into a single episode."""
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
    """Episodes exceeding a threshold; extreme is the peak value reached."""
    return _episodes(intervals, lambda value: value > threshold, max, min_seconds)


def episodes_below(
    intervals: Sequence[Interval], threshold: float, min_seconds: float = 0.0
) -> list[Episode]:
    """Episodes dropping below a threshold; extreme is the minimum reached."""
    return _episodes(intervals, lambda value: value < threshold, min, min_seconds)


def _max_window_mean(run: Sequence[Interval], window_seconds: float) -> float | None:
    """Maximum sliding-window mean within a single contiguous run."""
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

    # The maximum sliding-window mean is attained at a breakpoint, or one window before it.
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
    """The largest mean over any window of the given length.

    Windows that cross a gap in the data are not considered.
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
    """Duration by hour of day in the local zone, exactly 24 elements.

    The arithmetic is done in UTC; the local zone is only used to work out
    the hour number. This means DST transitions neither create nor lose
    seconds: the sum always equals the total length of the input intervals.
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
