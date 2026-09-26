"""The fix offered from the Repairs card.

The card could have been a link to the reconfigure form, and for the missing
entity it is: choosing which sensor replaces a renamed one is a decision only
the user can make. Unmapped sensors are not like that. Detection has already
decided, the reconfigure form would show the user exactly what this flow
shows them, and the only thing walking them into it adds is the chance to
lose track of what they came for. So the fix does the work: it says what it
found, and applies it when told to.
"""

from __future__ import annotations

from typing import Any

from homeassistant.components.repairs import RepairsFlow
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResult
import voluptuous as vol

from .config_flow import pack, unpack
from .const import DOMAIN
from .detect import classify, cluster_sensors, collect_sensors, grid_candidates
from .issues import UNMAPPED_SENSORS
from .remap import fed_by, fill, matching_cluster, offered_ids, wanted_fill
from .roles import EntryConfig


class UnmappedSensorsFlow(RepairsFlow):
    """Map the sensors detection found, once the user has seen which ones."""

    def __init__(self, entry_id: str) -> None:
        """Hold the inverter the issue was raised about."""
        self._entry_id = entry_id

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Every path through this flow is the confirmation."""
        return await self.async_step_confirm()

    async def async_step_confirm(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Show what would be mapped; map it when submitted."""
        entry = self.hass.config_entries.async_get_entry(self._entry_id)
        if entry is None:
            # Removed between the card being drawn and being acted on. The
            # issue goes with it, so there is nothing left to fix.
            return self.async_abort(reason="entry_gone")

        config = EntryConfig.from_entry(entry)
        sensors = collect_sensors(self.hass)
        cluster = matching_cluster(cluster_sensors(sensors), config)
        filled = (
            wanted_fill(config, fill(classify(cluster, grid_candidates(sensors)), config))
            if cluster
            else {}
        )
        if not filled:
            # Mapped by hand in the meantime, or the sensors are gone. Either
            # way the card is stale and closing it is the honest outcome.
            return self.async_abort(reason="already_mapped")

        if user_input is not None:
            self.hass.config_entries.async_update_entry(
                entry, data=pack(unpack(entry.data) | filled)
            )
            return self.async_create_entry(title="", data={})

        return self.async_show_form(
            step_id="confirm",
            data_schema=vol.Schema({}),
            description_placeholders={
                "name": entry.title,
                # The entity ids themselves, not a count. This is the moment
                # the user agrees to a mapping, and agreeing to "six sensors"
                # is not agreeing to anything.
                "entities": "\n".join(f"- `{item}`" for item in sorted(offered_ids(filled))),
                "features": ", ".join(fed_by(config, filled)),
            },
        )


async def async_create_fix_flow(
    hass: HomeAssistant,
    issue_id: str,
    data: dict[str, str | int | float | None] | None,
) -> RepairsFlow:
    """Build the flow for a fixable issue.

    Only one kind of issue is fixable, and it carries the inverter it belongs
    to in its data — the issue id has the entry id appended, but parsing it
    back out would make the id's format load-bearing.
    """
    entry_id = (data or {}).get("entry_id")
    if not issue_id.startswith(UNMAPPED_SENSORS) or not isinstance(entry_id, str):
        raise ValueError(f"{DOMAIN} has no fix flow for issue {issue_id}")
    return UnmappedSensorsFlow(entry_id)
