"""Tests for how the load payload is composed from several series."""

from datetime import UTC, datetime, timedelta
from unittest.mock import patch

from custom_components.inverter_analytics.analytics.load import async_load_analytics
from custom_components.inverter_analytics.analytics.resample import Sample, Series
from custom_components.inverter_analytics.analytics.source import (
    Precision,
    SeriesResult,
    Window,
)
from custom_components.inverter_analytics.roles import EntryConfig

MODULE = "custom_components.inverter_analytics.analytics.load"
BASE = datetime(2026, 1, 1, tzinfo=UTC)
END = BASE + timedelta(hours=1)
WINDOW = Window(BASE, END)

TOTAL = "sensor.total_load_power"
L1, L2, L3 = (f"sensor.load_l{index}_power" for index in (1, 2, 3))
PV1, PV2 = "sensor.pv1_power", "sensor.pv2_power"


def series(*values: float, start: datetime = BASE) -> Series:
    """A series over the whole window whose samples begin at `start`.

    The window is always the full one — shifting it instead would make every
    series fully covered by its own reckoning, which is exactly the confusion
    the per-series coverage exists to clear up.
    """
    step = (END - start) / max(len(values), 1)
    return Series.of(BASE, END, [Sample(start + step * i, v) for i, v in enumerate(values)])


def result(*values: float, precision: Precision = Precision.RAW, start: datetime = BASE):
    return SeriesResult(series(*values, start=start), precision, None)


def config(**entities) -> EntryConfig:
    return EntryConfig.from_dict(
        {
            "entities": {"load_power": [TOTAL], **entities},
            "numbers": {"rated_power": 9000.0},
        }
    )


async def run(entry_config, results):
    with patch(f"{MODULE}.async_series_many", return_value=results):
        return await async_load_analytics(None, entry_config, WINDOW)


async def test_a_single_phase_inverter_gets_no_phases_block():
    payload = await run(config(), {TOTAL: result(3000.0)})
    assert "phases" not in payload
    assert "strings" not in payload
    assert set(payload["series"]) == {"load_total"}


async def test_one_mapped_phase_is_not_enough_to_compare_anything():
    payload = await run(config(load_power_phase=[L1]), {TOTAL: result(3000.0), L1: result(3000.0)})
    assert "phases" not in payload


async def test_three_phases_produce_a_phases_block_keyed_by_phase_number():
    payload = await run(
        config(load_power_phase=[L1, L2, L3]),
        {
            TOTAL: result(6000.0),
            L1: result(3000.0),
            L2: result(2000.0),
            L3: result(1000.0),
        },
    )
    assert [entry["label"] for entry in payload["phases"]["per_phase"]] == ["L1", "L2", "L3"]
    assert set(payload["series"]) == {"load_total", "load_l1", "load_l2", "load_l3"}
    assert payload["phases"]["imbalance"]["mean"] == 1.0


async def test_each_series_reports_its_own_precision_and_coverage():
    """The case a single header number lied about."""
    payload = await run(
        config(load_power_phase=[L1, L2]),
        {
            TOTAL: result(3000.0),
            L1: result(1500.0),
            # Half the window missing, and sourced from hourly averages.
            L2: result(1500.0, precision=Precision.LTS, start=BASE + timedelta(minutes=30)),
        },
    )
    assert payload["series"]["load_total"]["coverage"] == 1.0
    assert payload["series"]["load_l2"]["coverage"] == 0.5
    assert payload["series"]["load_l2"]["precision"] == "lts"
    assert payload["series"]["load_l2"]["entity_id"] == L2
    # The header keeps describing the total, which is what the badge shows.
    assert payload["precision"] == "raw"
    assert payload["coverage"] == 1.0


async def test_the_aligned_coverage_is_reported_separately_from_the_header():
    payload = await run(
        config(load_power_phase=[L1, L2]),
        {
            TOTAL: result(3000.0),
            L1: result(1500.0),
            L2: result(1500.0, start=BASE + timedelta(minutes=30)),
        },
    )
    assert payload["coverage"] == 1.0
    assert payload["phases"]["imbalance"]["aligned_coverage"] == 0.5


async def test_pv_strings_are_compared_when_more_than_one_is_mapped():
    payload = await run(
        config(pv_power_string=[PV1, PV2]),
        {TOTAL: result(3000.0), PV1: result(3000.0), PV2: result(1000.0)},
    )
    parts = payload["strings"]["parts"]
    assert [part["label"] for part in parts] == ["PV1", "PV2"]
    assert [part["share"] for part in parts] == [0.75, 0.25]
    assert set(payload["series"]) == {"load_total", "pv_s1", "pv_s2"}


async def test_a_lone_string_is_not_a_comparison():
    payload = await run(config(pv_power_string=[PV1]), {TOTAL: result(3000.0), PV1: result(3000.0)})
    assert "strings" not in payload


async def test_a_lone_phase_sensor_is_not_read_at_all():
    """No section is produced from it, so the recorder query would be wasted."""
    captured: dict[str, list[str]] = {}

    async def fake(hass, entity_ids, window, signs=None):
        captured["ids"] = list(entity_ids)
        return {entity_id: result(3000.0) for entity_id in entity_ids}

    with patch(f"{MODULE}.async_series_many", side_effect=fake):
        await async_load_analytics(None, config(load_power_phase=[L1]), WINDOW)

    assert captured["ids"] == [TOTAL]


PV_TOTAL = "sensor.pv_power"


async def test_a_total_matching_its_phases_raises_nothing():
    payload = await run(
        config(load_power_phase=[L1, L2, L3]),
        {
            TOTAL: result(6000.0),
            L1: result(2000.0),
            L2: result(2000.0),
            L3: result(2000.0),
        },
    )
    assert payload["consistency"]["load"]["beyond_margin"] is False


async def test_a_total_that_cannot_be_its_phases_is_reported():
    """The grid clamp mapped as the load total: every field validates.

    No wizard can catch this — the user picked a real power sensor of the right
    device class. Only the two readings disagreeing can.
    """
    payload = await run(
        config(load_power_phase=[L1, L2, L3]),
        {
            TOTAL: result(9000.0),
            L1: result(1000.0),
            L2: result(1000.0),
            L3: result(1000.0),
        },
    )
    check = payload["consistency"]["load"]
    assert check["beyond_margin"] is True
    assert check["total_mean"] == 9000.0
    assert check["parts_mean"] == 3000.0


async def test_a_small_difference_is_not_worth_saying_anything_about():
    """A total may legitimately include something its parts do not."""
    payload = await run(
        config(load_power_phase=[L1, L2]),
        {TOTAL: result(2200.0), L1: result(1000.0), L2: result(1000.0)},
    )
    assert payload["consistency"]["load"]["beyond_margin"] is False


async def test_two_near_zero_readings_are_not_compared():
    """Both averaging a few watts differ by large percentages meaning nothing."""
    payload = await run(
        config(load_power_phase=[L1, L2]),
        {TOTAL: result(10.0), L1: result(1.0), L2: result(1.0)},
    )
    assert "load" not in payload["consistency"]


async def test_pv_strings_are_checked_against_the_pv_total():
    payload = await run(
        config(pv_power_string=[PV1, PV2], pv_power=[PV_TOTAL]),
        {
            TOTAL: result(3000.0),
            PV_TOTAL: result(5000.0),
            PV1: result(1000.0),
            PV2: result(1000.0),
        },
    )
    assert payload["consistency"]["pv"]["beyond_margin"] is True


async def test_without_a_pv_total_there_is_nothing_to_check_against():
    payload = await run(
        config(pv_power_string=[PV1, PV2]),
        {TOTAL: result(3000.0), PV1: result(1000.0), PV2: result(1000.0)},
    )
    assert "pv" not in payload["consistency"]
