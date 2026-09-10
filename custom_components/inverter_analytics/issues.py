"""Things worth telling the user about an inverter that is already set up.

Both checks here answer the same complaint: an integration configured once
never mentions that its configuration has fallen behind. A tab added in a
later version stays empty because a role nobody was ever asked about is
empty, and a sensor renamed in Home Assistant takes a chart down with it —
in both cases the page goes quiet and the reason lives somewhere the user has
no reason to look.

Home Assistant already has the place for that: the Repairs list in Settings,
which the user sees without going looking. These raise into it and, just as
importantly, withdraw from it the moment the reason is gone.
"""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir

from .const import DOMAIN
from .detect import classify, cluster_sensors, collect_sensors
from .remap import fed_by, fill, matching_cluster, offered_ids, wanted_fill
from .roles import EntryConfig

UNMAPPED_SENSORS = "unmapped_sensors"
MISSING_ENTITIES = "missing_entities"


def _issue_id(kind: str, entry: ConfigEntry) -> str:
    """One issue of each kind per inverter.

    Keyed by entry rather than by domain: two inverters can be behind in
    different ways, and a single shared issue would describe one of them and
    silently stand in for the other.
    """
    return f"{kind}_{entry.entry_id}"


def _resolve(hass: HomeAssistant, kind: str, entry: ConfigEntry) -> None:
    """Withdraw an issue whose reason no longer holds."""
    ir.async_delete_issue(hass, DOMAIN, _issue_id(kind, entry))


@callback
def async_check_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Run both checks for one inverter, raising or withdrawing as they find.

    Called once the rest of Home Assistant has started. Before that the entity
    registry is still filling up, and the missing-entity check would report
    every sensor belonging to an integration that happens to load later.
    """
    config = EntryConfig.from_entry(entry)
    _check_unmapped_sensors(hass, entry, config)
    _check_missing_entities(hass, entry, config)


def _check_unmapped_sensors(hass: HomeAssistant, entry: ConfigEntry, config: EntryConfig) -> None:
    """Detection can see sensors this inverter is not using.

    This is the case the whole reconfigure flow exists for, said out loud. An
    installation mapped before the Balance tab existed has six energy counters
    sitting unread, and no part of the interface it visits would ever bring
    that up.
    """
    cluster = matching_cluster(cluster_sensors(collect_sensors(hass)), config)
    if cluster is None:
        _resolve(hass, UNMAPPED_SENSORS, entry)
        return

    # Gated on what some feature is short of, not on what detection recognises.
    # Grid power is detected, stored and read by nothing yet; a card about it
    # would be a notification the user learns to dismiss without reading, and
    # that habit is expensive to have taught them by the time something does
    # matter.
    filled = wanted_fill(config, fill(classify(cluster), config))
    if not filled:
        _resolve(hass, UNMAPPED_SENSORS, entry)
        return

    count = len(offered_ids(filled))
    ir.async_create_issue(
        hass,
        DOMAIN,
        _issue_id(UNMAPPED_SENSORS, entry),
        is_fixable=True,
        severity=ir.IssueSeverity.WARNING,
        translation_key=UNMAPPED_SENSORS,
        translation_placeholders={
            "name": entry.title,
            "count": str(count),
            "sensors": "sensor" if count == 1 else "sensors",
            "features": ", ".join(fed_by(config, filled)),
        },
        data={"entry_id": entry.entry_id},
    )


def _check_missing_entities(hass: HomeAssistant, entry: ConfigEntry, config: EntryConfig) -> None:
    """A mapped sensor that no longer exists anywhere.

    Renaming an entity, or removing and re-adding the integration that owns
    it, leaves this one pointing at a name nothing answers to. Every chart
    drawn from it then comes back empty, which the page reports honestly and
    unhelpfully as an absence of data — the data is there, under another name.
    """
    missing = sorted(
        entity_id
        for ids in config.entities.values()
        for entity_id in ids
        if _is_gone(hass, entity_id)
    )
    if not missing:
        _resolve(hass, MISSING_ENTITIES, entry)
        return

    ir.async_create_issue(
        hass,
        DOMAIN,
        _issue_id(MISSING_ENTITIES, entry),
        # Which sensor replaces a renamed one is a question only the user can
        # answer, and answering it wrongly is worse than leaving it. The card
        # names them and sends the user to the form that can change them.
        is_fixable=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key=MISSING_ENTITIES,
        translation_placeholders={
            "name": entry.title,
            "count": str(len(missing)),
            "entities": ", ".join(missing),
        },
    )


def _is_gone(hass: HomeAssistant, entity_id: str) -> bool:
    """Whether nothing in this installation answers to that name.

    A sensor that is merely unavailable still has a state and still has a
    registry entry — it is a working mapping to a device that is off, and
    saying otherwise would raise a card every time an inverter loses its
    connection overnight. Both are checked because a template or YAML sensor
    need not be in the registry at all.
    """
    return hass.states.get(entity_id) is None and er.async_get(hass).async_get(entity_id) is None


@callback
def async_clear_issues(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Drop everything raised about an inverter that is being removed."""
    for kind in (UNMAPPED_SENSORS, MISSING_ENTITIES):
        _resolve(hass, kind, entry)
