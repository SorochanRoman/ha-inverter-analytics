"""Tests for the result TTL cache."""

import pytest

from custom_components.inverter_analytics.analytics.cache import ResultCache


class FakeClock:
    def __init__(self) -> None:
        self.now = 0.0

    def __call__(self) -> float:
        return self.now

    def advance(self, seconds: float) -> None:
        self.now += seconds


def test_value_is_returned_before_ttl_expires():
    clock = FakeClock()
    cache = ResultCache(time_fn=clock)
    cache.set(("load", "a"), {"x": 1}, ttl=60.0)
    clock.advance(59.0)
    assert cache.get(("load", "a")) == {"x": 1}


def test_value_disappears_after_ttl():
    clock = FakeClock()
    cache = ResultCache(time_fn=clock)
    cache.set(("load", "a"), {"x": 1}, ttl=60.0)
    clock.advance(61.0)
    assert cache.get(("load", "a")) is None
    assert cache.size == 0


def test_missing_key_returns_none():
    assert ResultCache().get(("nothing",)) is None


def test_oldest_entry_is_evicted_when_full():
    clock = FakeClock()
    cache = ResultCache(max_entries=2, time_fn=clock)
    cache.set(("a",), 1, ttl=600.0)
    clock.advance(1.0)
    cache.set(("b",), 2, ttl=600.0)
    clock.advance(1.0)
    cache.set(("c",), 3, ttl=600.0)
    assert cache.size == 2
    assert cache.get(("a",)) is None
    assert cache.get(("b",)) == 2
    assert cache.get(("c",)) == 3


def test_set_overwrites_existing_key_without_growing():
    cache = ResultCache(max_entries=2)
    cache.set(("a",), 1, ttl=600.0)
    cache.set(("a",), 2, ttl=600.0)
    assert cache.size == 1
    assert cache.get(("a",)) == 2


def test_clear_empties_the_cache():
    cache = ResultCache()
    cache.set(("a",), 1, ttl=600.0)
    cache.clear()
    assert cache.size == 0


def test_a_cache_that_can_hold_nothing_is_a_configuration_error():
    """Evicting on every write is a silent no-op that reads as recomputation."""
    for size in (0, -1):
        with pytest.raises(ValueError, match="at least 1"):
            ResultCache(max_entries=size)


def test_rewriting_a_key_makes_it_the_newest_not_the_oldest():
    """Eviction is by insertion order, so a refreshed entry must move.

    Without the delete-then-insert, a key rewritten every minute would keep its
    original position and be evicted before entries nobody has touched.
    """
    clock = FakeClock()
    cache = ResultCache(max_entries=2, time_fn=clock)
    cache.set("a", 1, ttl=60)
    cache.set("b", 2, ttl=60)
    cache.set("a", 10, ttl=60)
    cache.set("c", 3, ttl=60)

    assert cache.get("a") == 10
    assert cache.get("c") == 3
    assert cache.get("b") is None


def test_an_entry_expires_at_its_deadline_not_after_it():
    clock = FakeClock()
    cache = ResultCache(max_entries=4, time_fn=clock)
    cache.set("k", "v", ttl=60)

    clock.now = 59.999
    assert cache.get("k") == "v"
    clock.now = 60.0
    assert cache.get("k") is None
