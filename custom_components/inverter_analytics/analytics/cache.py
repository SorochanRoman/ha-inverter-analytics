"""Cache for analytics results with a TTL and a size limit."""

from __future__ import annotations

from collections import OrderedDict
from collections.abc import Callable, Hashable
from dataclasses import dataclass
import time
from typing import Any


@dataclass(frozen=True, slots=True)
class _Entry:
    value: Any
    expires_at: float


class ResultCache:
    """A size-bounded cache with a per-entry lifetime."""

    def __init__(
        self, max_entries: int = 50, time_fn: Callable[[], float] = time.monotonic
    ) -> None:
        self._entries: OrderedDict[Hashable, _Entry] = OrderedDict()
        self._max_entries = max_entries
        self._time_fn = time_fn

    @property
    def size(self) -> int:
        """Number of entries in the cache."""
        return len(self._entries)

    def get(self, key: Hashable) -> Any | None:
        """Return the value, or None if it is missing or has expired."""
        entry = self._entries.get(key)
        if entry is None:
            return None
        if entry.expires_at <= self._time_fn():
            del self._entries[key]
            return None
        return entry.value

    def set(self, key: Hashable, value: Any, ttl: float) -> None:
        """Store a value with a lifetime in seconds."""
        if key in self._entries:
            del self._entries[key]
        self._entries[key] = _Entry(value=value, expires_at=self._time_fn() + ttl)
        while len(self._entries) > self._max_entries:
            self._entries.popitem(last=False)

    def clear(self) -> None:
        """Clear the cache."""
        self._entries.clear()
