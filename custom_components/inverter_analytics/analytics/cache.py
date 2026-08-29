"""Кеш результатів аналітики з TTL і обмеженням розміру."""

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
    """Обмежений за розміром кеш із часом життя запису."""

    def __init__(
        self, max_entries: int = 50, time_fn: Callable[[], float] = time.monotonic
    ) -> None:
        self._entries: OrderedDict[Hashable, _Entry] = OrderedDict()
        self._max_entries = max_entries
        self._time_fn = time_fn

    @property
    def size(self) -> int:
        """Кількість записів у кеші."""
        return len(self._entries)

    def get(self, key: Hashable) -> Any | None:
        """Повернути значення або None, якщо його немає чи воно протухло."""
        entry = self._entries.get(key)
        if entry is None:
            return None
        if entry.expires_at <= self._time_fn():
            del self._entries[key]
            return None
        return entry.value

    def set(self, key: Hashable, value: Any, ttl: float) -> None:
        """Записати значення з часом життя в секундах."""
        if key in self._entries:
            del self._entries[key]
        self._entries[key] = _Entry(value=value, expires_at=self._time_fn() + ttl)
        while len(self._entries) > self._max_entries:
            self._entries.popitem(last=False)

    def clear(self) -> None:
        """Очистити кеш."""
        self._entries.clear()
