"""Naming patterns used to recognise an inverter's sensors.

Data, not logic. The patterns below were read off a live instance running the
StephanJoubert Solarman integration with a Deye hybrid profile, rather than
guessed — a pattern that merely looks plausible produces a mapping that is
confidently wrong, which is worse than no mapping at all.

Patterns match the object_id, so they are prefix-agnostic: the same table works
whether the integration named things solarman_* or deye_*.
"""

from __future__ import annotations

from collections.abc import Mapping
from typing import Final

# (regex over the object_id, role key). A capture group, where present, is the
# index of a phase or a string and decides the order within a multiple role.
PATTERNS: Final[tuple[tuple[str, str], ...]] = (
    (r"^(?:.*_)?total_load_power$", "load_power"),
    (r"^(?:.*_)?load_l(\d+)_power$", "load_power_phase"),
    (r"^(?:.*_)?pv(\d+)_power$", "pv_power_string"),
    (r"^(?:.*_)?power_production_now$", "pv_power"),
    (r"^(?:.*_)?battery_power$", "battery_power"),
    (r"^(?:.*_)?battery_soc$", "battery_soc"),
    (r"^(?:.*_)?total_production$", "pv_energy_total"),
    (r"^(?:.*_)?total_load_consumption$", "load_energy_total"),
    (r"^(?:.*_)?total_battery_charge$", "battery_charge_total"),
    (r"^(?:.*_)?total_battery_discharge$", "battery_discharge_total"),
    (r"^(?:.*_)?total_energy_bought$", "grid_import_total"),
    (r"^(?:.*_)?total_energy_sold$", "grid_export_total"),
)

# Both clamp sets are wired per phase and look identical to a pattern. Which one
# faces the grid depends on the installation, so this is asked, never assumed.
CT_PATTERN: Final = r"^(?:.*_)?(external_ct|internal_ct)_l(\d+)_power$"

CT_CHOICES: Final[Mapping[str, str]] = {
    "external_ct": (
        "External CT — usually clamped on the service entrance and measuring "
        "import and export against the grid"
    ),
    "internal_ct": ("Internal CT — the inverter's own measurement of what passes through it"),
}
