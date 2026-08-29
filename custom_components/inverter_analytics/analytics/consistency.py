"""Checking a total against the parts it is supposed to be made of.

A wizard cannot tell that the grid clamp was mapped as the load total; the user
picked a real power sensor and every field validates. The data can tell, because
we hold two readings that must agree.
"""

from __future__ import annotations

from collections.abc import Sequence
from typing import Any

from .resample import Interval, Series, align, time_weighted_mean

# Generous on purpose. A total may legitimately include something its parts do
# not — a phase the user did not map, an auxiliary circuit — and nagging about
# a real difference would train people to ignore the warning. A quarter apart
# is past explaining that way.
MISMATCH_MARGIN = 0.25

# Below this the comparison is noise: two readings that both average a few
# watts differ by large percentages while meaning nothing.
MIN_MEANINGFUL_W = 20.0


def compare_total_with_parts(total: Series, parts: Sequence[Series]) -> dict[str, Any] | None:
    """Whether a total and the sum of its parts describe the same thing.

    None when there is nothing to compare — no overlap, or both readings so
    small that any ratio between them is noise.
    """
    if not parts:
        return None

    aligned = align([total, *parts])
    if not aligned:
        return None

    total_mean = time_weighted_mean(
        [Interval(item.start, item.end, item.values[0]) for item in aligned]
    )
    parts_mean = time_weighted_mean(
        [Interval(item.start, item.end, sum(item.values[1:])) for item in aligned]
    )
    if total_mean is None or parts_mean is None:
        return None

    largest = max(abs(total_mean), abs(parts_mean))
    if largest < MIN_MEANINGFUL_W:
        return None

    mismatch = abs(total_mean - parts_mean) / largest
    return {
        "total_mean": total_mean,
        "parts_mean": parts_mean,
        "mismatch": mismatch,
        "beyond_margin": mismatch > MISMATCH_MARGIN,
        "margin": MISMATCH_MARGIN,
    }
