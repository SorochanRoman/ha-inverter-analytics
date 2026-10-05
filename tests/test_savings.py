"""Tests for what the installation saved."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.inverter_analytics.analytics.savings import build_savings, savings_by_hour
from custom_components.inverter_analytics.analytics.source import EnergyRow, EnergySeries, Window

KYIV = ZoneInfo("Europe/Kyiv")


def hourly(start_local: datetime, changes: list[float | None]) -> EnergySeries:
    """Hourly rows from a local start; None leaves the hour out."""
    rows = []
    for index, change in enumerate(changes):
        if change is None:
            continue
        moment = (start_local + timedelta(hours=index)).astimezone(UTC)
        rows.append(EnergyRow(start=moment, change=change))
    return EnergySeries(rows=tuple(rows))


DAY = datetime(2026, 9, 10, 0, 0, tzinfo=KYIV)


def values(load, imported, **kwargs):
    defaults = {
        "tz": KYIV,
        "price_day": 4.32,
        "price_night": 2.16,
        "night_start": 23,
        "night_end": 7,
    }
    return [round(value, 4) for _, value in savings_by_hour(load, imported, **(defaults | kwargs))]


def test_a_night_hour_uses_the_night_price_and_a_day_hour_the_day_price():
    load = hourly(DAY + timedelta(hours=6), [1.0, 1.0])  # 06:00 night, 07:00 day
    imported = hourly(DAY + timedelta(hours=6), [0.0, 0.0])
    assert values(load, imported) == [2.16, 4.32]


def test_the_night_zone_wraps_midnight():
    load = hourly(DAY + timedelta(hours=22), [1.0, 1.0, 1.0])  # 22, 23, 00
    imported = hourly(DAY + timedelta(hours=22), [0.0, 0.0, 0.0])
    assert values(load, imported) == [4.32, 2.16, 2.16]


def test_a_zone_that_does_not_wrap():
    load = hourly(DAY + timedelta(hours=12), [1.0, 1.0, 1.0])  # 12, 13, 14
    imported = hourly(DAY + timedelta(hours=12), [0.0, 0.0, 0.0])
    assert values(load, imported, night_start=13, night_end=14) == [4.32, 2.16, 4.32]


def test_an_empty_zone_is_all_day():
    load = hourly(DAY + timedelta(hours=23), [1.0])
    imported = hourly(DAY + timedelta(hours=23), [0.0])
    assert values(load, imported, night_start=7, night_end=7) == [4.32]


def test_a_single_tariff_uses_the_day_price_at_night():
    load = hourly(DAY + timedelta(hours=2), [1.0])
    imported = hourly(DAY + timedelta(hours=2), [0.0])
    assert values(load, imported, price_night=None) == [4.32]


def test_what_was_bought_is_taken_away_and_a_negative_hour_is_kept():
    # 03:00: the battery charged from the grid, so more was bought than used.
    load = hourly(DAY + timedelta(hours=3), [0.5, 2.0])
    imported = hourly(DAY + timedelta(hours=3), [3.0, 0.5])
    assert values(load, imported) == [round((0.5 - 3.0) * 2.16, 4), round(1.5 * 2.16, 4)]


def test_an_hour_missing_from_either_counter_is_left_out():
    load = hourly(DAY + timedelta(hours=10), [1.0, 1.0, None])
    imported = hourly(DAY + timedelta(hours=10), [0.0, None, 0.0])
    assert values(load, imported) == [4.32]


def window(days: int = 1) -> Window:
    start = DAY.astimezone(UTC)
    return Window(start=start, end=start + timedelta(days=days))


def build(load, imported, **kwargs):
    defaults = {
        "tz": KYIV,
        "window": window(),
        "currency": "UAH",
        "price_day": 4.32,
        "price_night": None,
        "night_start": 23,
        "night_end": 7,
    }
    return build_savings(load, imported, **(defaults | kwargs))


def test_the_block_sums_by_local_day():
    load = hourly(DAY, [1.0] * 24)
    imported = hourly(DAY, [0.5] * 24)
    block = build(load, imported, window=window(1))
    assert block["reason"] is None
    assert block["currency"] == "UAH"
    assert block["days"] == [{"day": "2026-09-10", "value": round(24 * 0.5 * 4.32, 4)}]
    assert block["total"] == round(24 * 0.5 * 4.32, 4)
    assert block["per_day"] == block["total"]
    assert block["hours"] == 24
    assert block["window_hours"] == 24
    assert block["two_zone"] is False


def test_days_follow_local_midnight_across_a_dst_change():
    # Kyiv leaves summer time on 2026-10-25: that local day has 25 hours.
    start = datetime(2026, 10, 25, 0, 0, tzinfo=KYIV)
    rows = tuple(
        EnergyRow(start=start.astimezone(UTC) + timedelta(hours=h), change=1.0) for h in range(25)
    )
    load = EnergySeries(rows=rows)
    imported = EnergySeries(rows=tuple(EnergyRow(r.start, 0.0) for r in rows))
    span = Window(
        start=start.astimezone(UTC),
        end=start.astimezone(UTC) + timedelta(hours=25),
    )
    block = build(load, imported, window=span)
    assert [d["day"] for d in block["days"]] == ["2026-10-25"]
    assert block["window_hours"] == 25


def test_reasons():
    load = hourly(DAY, [1.0])
    imported = hourly(DAY, [0.0])
    assert build(load, imported, price_day=None)["reason"] == "no_price"
    assert build(None, imported)["reason"] == "no_counters"
    assert build(load, None)["reason"] == "no_counters"
    assert build(load, hourly(DAY + timedelta(hours=5), [0.0]))["reason"] == "no_hours"
    withheld = build(load, imported, price_day=None)
    assert withheld["total"] is None and withheld["per_day"] is None and withheld["days"] == []


def test_a_price_of_zero_is_a_price():
    load = hourly(DAY, [1.0])
    imported = hourly(DAY, [0.0])
    assert build(load, imported, price_day=0.0)["total"] == 0.0


def test_two_zone_is_said():
    load = hourly(DAY, [1.0])
    imported = hourly(DAY, [0.0])
    assert build(load, imported, price_night=2.16)["two_zone"] is True
