"""Tests for per-phase analytics and imbalance."""

from datetime import UTC, datetime, timedelta

from custom_components.inverter_analytics.analytics.phases import (
    build_phase_payload,
    imbalance_of,
)
from custom_components.inverter_analytics.analytics.resample import AlignedInterval
from custom_components.inverter_analytics.roles import PartIdentity

BASE = datetime(2026, 1, 1, tzinfo=UTC)
DAY = 24 * 3600.0

L1 = PartIdentity("load_l1", "L1", 1)
L2 = PartIdentity("load_l2", "L2", 2)
L3 = PartIdentity("load_l3", "L3", 3)


def at(minutes: float) -> datetime:
    return BASE + timedelta(minutes=minutes)


def span(from_minutes: float, to_minutes: float, *values: float) -> AlignedInterval:
    return AlignedInterval(at(from_minutes), at(to_minutes), tuple(values))


def build(aligned, identities=(L1, L2, L3), **kwargs):
    options = {
        "rated_power": 9000.0,
        "window_seconds": sum(item.seconds for item in aligned),
        "per_phase_rating": None,
        "floor_pct": 5.0,
        "threshold_pct": 30.0,
    } | kwargs
    return build_phase_payload(aligned, identities, **options)


def test_imbalance_is_the_spread_over_the_average():
    assert imbalance_of([3000.0, 2000.0, 1000.0]) == 1.0
    assert imbalance_of([2000.0, 2000.0, 2000.0]) == 0.0


def test_imbalance_has_no_denominator_at_or_below_zero():
    assert imbalance_of([0.0, 0.0, 0.0]) is None
    assert imbalance_of([-100.0, 0.0, 100.0]) is None


def test_a_single_phase_has_no_spread_to_measure():
    assert imbalance_of([1000.0]) is None
    assert build([span(0, 60, 1000.0)], identities=(L1,)) is None


def test_per_phase_means_and_shares_come_from_the_aligned_timeline():
    payload = build([span(0, 30, 4000.0, 2000.0, 2000.0), span(30, 60, 2000.0, 2000.0, 2000.0)])
    per_phase = payload["per_phase"]
    assert [entry["label"] for entry in per_phase] == ["L1", "L2", "L3"]
    assert [entry["mean"] for entry in per_phase] == [3000.0, 2000.0, 2000.0]
    assert [entry["peak"] for entry in per_phase] == [4000.0, 2000.0, 2000.0]
    assert per_phase[0]["share"] == 3000.0 / 7000.0


def test_the_load_floor_discards_night_time_noise_rather_than_merely_existing():
    """The detail that decides whether the chart is useful or noise.

    Half the window is 20 W of standby split 10/5/5 — a 75% imbalance that is
    arithmetically true and practically meaningless. The other half is a
    balanced 9 kW. Without the floor the reported mean would be 0.375; with it
    the standby half is excluded and the answer is 0.
    """
    payload = build(
        [span(0, 30, 10.0, 5.0, 5.0), span(30, 60, 3000.0, 3000.0, 3000.0)],
    )
    imbalance = payload["imbalance"]
    assert imbalance["mean"] == 0.0
    assert imbalance["below_floor_seconds"] == 1800.0
    assert imbalance["analysed_seconds"] == 1800.0
    assert imbalance["coverage"] == 0.5


def test_the_floor_is_read_from_the_configured_share_of_rated_power():
    aligned = [span(0, 60, 200.0, 100.0, 100.0)]
    # 400 W total against 9 kW rated: above a 1% floor, below the 5% default.
    assert build(aligned, floor_pct=1.0)["imbalance"]["analysed_seconds"] == 3600.0
    assert build(aligned)["imbalance"]["analysed_seconds"] == 0.0


def test_an_entirely_excluded_window_reports_nothing_rather_than_zero():
    payload = build([span(0, 60, 10.0, 5.0, 5.0)])
    assert payload["imbalance"]["mean"] is None
    assert payload["imbalance"]["fraction_above"] is None
    assert payload["imbalance"]["coverage"] == 0.0


def test_time_above_the_threshold_is_measured_against_the_analysed_time():
    payload = build(
        [span(0, 15, 4000.0, 2000.0, 2000.0), span(15, 60, 3000.0, 3000.0, 3000.0)],
    )
    # 15 minutes at an imbalance of 0.75, 45 balanced: a quarter of the time.
    assert payload["imbalance"]["fraction_above"] == 0.25


def test_an_episode_carries_the_phase_values_at_its_worst_moment():
    payload = build(
        [
            span(0, 10, 3000.0, 3000.0, 3000.0),
            span(10, 20, 4000.0, 2500.0, 2500.0),
            span(20, 30, 5000.0, 2000.0, 2000.0),
            span(30, 60, 3000.0, 3000.0, 3000.0),
        ]
    )
    episodes = payload["episodes"]
    assert len(episodes) == 1
    assert episodes[0]["seconds"] == 1200.0
    assert episodes[0]["phases"] == [5000.0, 2000.0, 2000.0]
    assert episodes[0]["peak_imbalance"] == (5000.0 - 2000.0) / 3000.0


def test_a_brief_spike_is_not_an_episode():
    payload = build(
        [
            span(0, 30, 3000.0, 3000.0, 3000.0),
            span(30, 30.5, 6000.0, 1500.0, 1500.0),
            span(30.5, 60, 3000.0, 3000.0, 3000.0),
        ]
    )
    assert payload["episodes"] == []


def test_a_missing_per_phase_rating_is_derived_and_says_so():
    payload = build([span(0, 60, 3000.0, 3000.0, 3000.0)])
    assert payload["rating_per_phase_derived"] is True
    assert payload["rating_per_phase"] == 3000.0
    assert payload["rating_per_phase_divisor"] == 3


def test_a_configured_per_phase_rating_is_used_as_given():
    payload = build([span(0, 60, 3000.0, 3000.0, 3000.0)], per_phase_rating=4000.0)
    assert payload["rating_per_phase_derived"] is False
    assert payload["rating_per_phase"] == 4000.0
    assert payload["per_phase"][0]["headroom"] == 0.75


def test_two_mapped_phases_of_a_three_phase_inverter_do_not_halve_the_rating():
    """L1 and L3 mapped means the hardware has at least three phases.

    Dividing the total rating by the two that happen to be mapped would make
    every headroom figure optimistic by half. The index read back out of the
    entity id is what rules that out.
    """
    payload = build([span(0, 60, 3000.0, 3000.0)], identities=(L1, L3))
    assert payload["rating_per_phase_divisor"] == 3
    assert payload["rating_per_phase"] == 3000.0
