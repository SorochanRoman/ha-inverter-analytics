"""The Health tab prints the server's constants; its copies must not drift."""

import pathlib
import re

import pytest

from custom_components.inverter_analytics.analytics import battery, health, load, sizing

HEALTH_TS = pathlib.Path("frontend/src/health.ts")

MIRRORED = {
    "CLEAN_CHARGE_MAX_KWH": health.CLEAN_CHARGE_MAX_KWH,
    "CLEAN_DROP_MIN_POINTS": health.CLEAN_DROP_MIN_POINTS,
    "CLEAN_HOURS_MIN": health.CLEAN_HOURS_MIN,
    "COMPARISON_MIN_MONTHS": health.COMPARISON_MIN_MONTHS,
    "BEST_HOUR_MIN_HOURS": health.BEST_HOUR_MIN_HOURS,
    "EFFICIENCY_MAX_DRIFT_PCT": battery.EFFICIENCY_MAX_DRIFT_PCT,
    "EFFICIENCY_MIN_KWH": battery.EFFICIENCY_MIN_KWH,
    "CEILING_PV_MIN_W": sizing.CEILING_PV_MIN_W,
    "HIGH_LOAD_SHARE": load.HIGH_LOAD_SHARE,
    "PARTIAL_MONTH_COVERAGE": health.PARTIAL_MONTH_COVERAGE,
}


@pytest.mark.parametrize(("name", "value"), MIRRORED.items())
def test_frontend_copy_matches(name: str, value: float) -> None:
    source = HEALTH_TS.read_text(encoding="utf-8")
    match = re.search(rf"^export const {name} = ([0-9.]+);$", source, re.MULTILINE)
    assert match, f"{name} is not exported from {HEALTH_TS}"
    assert float(match.group(1)) == value
