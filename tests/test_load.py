"""Tests for the load analytics."""

from datetime import UTC, datetime, timedelta

import pytest

from custom_components.inverter_analytics.analytics.load import build_load_payload
from custom_components.inverter_analytics.analytics.resample import Sample, Series

BASE = datetime(2026, 1, 1, tzinfo=UTC)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def flat_series(value: float, minutes: float = 60.0) -> Series:
    return Series.of(BASE, at(minutes), [Sample(BASE, value)])


def test_flat_load_gives_identical_mean_median_and_peak():
    payload = build_load_payload(flat_series(1000.0), rated_power=8000.0)
    assert payload["kpi"]["mean"] == pytest.approx(1000.0)
    assert payload["kpi"]["max"] == pytest.approx(1000.0)
    assert payload["kpi"]["median"] == pytest.approx(1000.0, abs=200.0)
    assert payload["coverage"] == 1.0


def test_bucket_width_is_one_fortieth_of_rated_power():
    payload = build_load_payload(flat_series(1000.0), rated_power=8000.0, bucket_count=40)
    assert payload["histogram"]["bucket_width"] == pytest.approx(200.0)
    assert payload["rated_power"] == 8000.0


def test_histogram_fractions_sum_to_one():
    series = Series.of(BASE, at(60), [Sample(BASE, 500.0), Sample(at(30), 4000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    total = sum(bucket["fraction"] for bucket in payload["histogram"]["buckets"])
    assert total == pytest.approx(1.0)


def test_bands_split_time_by_share_of_rated_power():
    """Half an hour at 5% of rated power, half an hour at 50%."""
    series = Series.of(BASE, at(60), [Sample(BASE, 400.0), Sample(at(30), 4000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    bands = {band["key"]: band["fraction"] for band in payload["bands"]}
    assert bands["0-10"] == pytest.approx(0.5)
    assert bands["50-75"] == pytest.approx(0.5)
    assert sum(bands.values()) == pytest.approx(1.0)


def test_all_bands_are_present_even_when_empty():
    payload = build_load_payload(flat_series(1000.0), rated_power=8000.0)
    keys = [band["key"] for band in payload["bands"]]
    assert keys == ["0-10", "10-25", "25-50", "50-75", "75-100", "100+"]


def test_fraction_above_80_percent_counts_only_high_load():
    series = Series.of(BASE, at(60), [Sample(BASE, 1000.0), Sample(at(45), 7000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["kpi"]["fraction_above_80pct"] == pytest.approx(0.25)


def test_overload_episodes_are_reported_with_peak():
    series = Series.of(
        BASE, at(60), [Sample(BASE, 1000.0), Sample(at(20), 8600.0), Sample(at(27), 1000.0)]
    )
    payload = build_load_payload(series, rated_power=8000.0)
    assert len(payload["overloads"]) == 1
    overload = payload["overloads"][0]
    assert overload["seconds"] == pytest.approx(420.0)
    assert overload["peak"] == pytest.approx(8600.0)
    assert overload["start"] == at(20).isoformat()


def test_brief_spikes_below_a_minute_are_not_reported_as_overloads():
    series = Series.of(
        BASE, at(60), [Sample(BASE, 1000.0), Sample(at(20), 8600.0), Sample(at(20.5), 1000.0)]
    )
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["overloads"] == []


def test_duration_curve_starts_at_the_peak():
    series = Series.of(BASE, at(60), [Sample(BASE, 1000.0), Sample(at(30), 5000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["duration_curve"][0]["fraction"] == 0.0
    assert payload["duration_curve"][0]["value"] >= 5000.0


def test_max_sustained_15m_is_lower_than_a_short_peak():
    series = Series.of(
        BASE, at(120), [Sample(BASE, 1000.0), Sample(at(60), 6000.0), Sample(at(65), 1000.0)]
    )
    payload = build_load_payload(series, rated_power=8000.0)
    assert payload["kpi"]["max"] == pytest.approx(6000.0)
    assert payload["kpi"]["max_sustained_15m"] < 6000.0


def test_negative_values_fall_into_the_lowest_band_not_through_the_cracks():
    """Negative load must not vanish from the bands while still counting toward the denominator."""
    series = Series.of(BASE, at(60), [Sample(BASE, -100.0), Sample(at(30), 400.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    bands = {band["key"]: band["fraction"] for band in payload["bands"]}
    assert bands["0-10"] == pytest.approx(1.0)
    assert sum(bands.values()) == pytest.approx(1.0)
    # The histogram separately reports how much time fell outside the range.
    assert payload["histogram"]["clipped_low_seconds"] == pytest.approx(1800.0)


def test_empty_series_yields_null_kpis_not_an_exception():
    payload = build_load_payload(Series.of(BASE, at(60), []), rated_power=8000.0)
    assert payload["kpi"]["mean"] is None
    assert payload["kpi"]["max"] is None
    assert payload["kpi"]["fraction_above_80pct"] is None
    assert payload["histogram"]["buckets"] == []
    assert payload["coverage"] == 0.0


def test_rated_power_must_be_positive():
    with pytest.raises(ValueError):
        build_load_payload(flat_series(1000.0), rated_power=0.0)


def test_percentiles_never_exceed_the_observed_peak():
    """The histogram interpolates up to a bucket edge — the median must never exceed the peak.

    A live run once showed "Median 9.1 kW" next to "Peak 9 kW": two
    self-contradicting numbers in the same row of cards.
    """
    payload = build_load_payload(flat_series(9000.0), rated_power=8000.0)
    kpi = payload["kpi"]
    assert kpi["max"] == pytest.approx(9000.0)
    assert kpi["median"] <= kpi["max"]
    assert kpi["p95"] <= kpi["max"]


def test_percentiles_are_not_clamped_away_from_a_real_spread():
    """Clamping must not break the ordinary case with a wide spread."""
    series = Series.of(BASE, at(60), [Sample(BASE, 1000.0), Sample(at(30), 5000.0)])
    payload = build_load_payload(series, rated_power=8000.0)
    kpi = payload["kpi"]
    assert 1000.0 <= kpi["median"] <= 5000.0
    assert kpi["p95"] <= kpi["max"] == pytest.approx(5000.0)


def test_duration_curve_never_rises_above_the_reported_peak():
    """The curve and the Peak card sit on one screen — they must not disagree.

    Both are built from the same percentiles, which interpolate to the bucket
    edge. Clamping only the KPIs moved the contradiction from card-versus-card
    to card-versus-chart, where it is harder to notice.
    """
    payload = build_load_payload(flat_series(9000.0), rated_power=8000.0)
    peak = payload["kpi"]["max"]
    assert peak == pytest.approx(9000.0)
    assert all(point["value"] <= peak for point in payload["duration_curve"])


def test_high_load_share_is_measured_against_covered_time_not_the_window():
    """The denominator is the time there is data for, not the period asked about.

    Half an hour at full load inside a window that only has half an hour of
    data is all of the measured time, not a quarter of it — reading it against
    the window would understate every partial period by however much is missing.
    """
    series = Series.of(
        BASE,
        at(120),
        [Sample(at(0), 9000.0), Sample(at(30), None)],
    )
    payload = build_load_payload(series, rated_power=9000.0)
    assert payload["coverage"] == 0.25
    assert payload["kpi"]["fraction_above_80pct"] == 1.0
