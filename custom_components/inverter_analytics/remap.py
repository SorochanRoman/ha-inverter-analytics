"""What detection can add to an inverter that is already configured.

Setup runs detection once and never again, which is fine for an installation
that was complete the day it was mapped and useless for one that was not: a
role added in a later version stays empty, its tab stays dark, and nothing in
the interface is in a position to mention that the sensor it wants is sitting
right there in the state machine.

This is the part that compares the two — what the entry has against what the
installation offers — and it lives on its own because two callers need it. The
reconfigure flow asks so it can pre-fill a form; the repairs check asks so it
can raise a card in Settings for an installation whose owner has no reason to
go looking. Detection itself stays free of the role vocabulary, and the config
model stays free of detection.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from typing import Any

from .detect import Ambiguity, Cluster, Detection
from .roles import FEATURES, ROLES_BY_KEY, EntryConfig, missing_roles, normalise_entity_ids


def matching_cluster(clusters: Sequence[Cluster], config: EntryConfig) -> Cluster | None:
    """The candidate this entry was actually built from.

    Setup asked which inverter this was, and the entry does not record the
    answer — so nothing afterwards can ask again without putting the question
    back to the user. The mapped entity ids answer it instead: the cluster
    holding most of them is the one the entry describes. An entry mapped
    entirely by hand may overlap no cluster at all, and then detection has
    nothing trustworthy to say about it.
    """
    mapped = {entity_id for ids in config.entities.values() for entity_id in ids}
    if not mapped:
        return None
    overlaps = ((len(mapped & {s.entity_id for s in c.sensors}), c) for c in clusters)
    best = max(overlaps, key=lambda item: item[0], default=(0, None))
    return best[1] if best[0] else None


def fill(detection: Detection | None, config: EntryConfig) -> dict[str, Any]:
    """What detection can offer for the roles this entry has left empty.

    Only the empty ones. An entry whose load sensor was corrected by hand
    after a wrong detection must not have that correction quietly undone by
    running detection again — everything here is for what is missing, and the
    manual form is where what is present gets changed.
    """
    if detection is None:
        return {}
    filled: dict[str, Any] = {}
    for role_key, ids in detection.mapping.items():
        role = ROLES_BY_KEY.get(role_key)
        if role is None or config.entity_ids(role_key) or not ids:
            continue
        filled[role_key] = list(ids) if role.multiple else ids[0]
    return filled


def open_ambiguities(detection: Detection, config: EntryConfig) -> tuple[Ambiguity, ...]:
    """The questions still worth asking.

    A role that is already mapped is not in question: re-asking it would
    present the entry's own answer back as undecided, and overwrite it with
    whichever option happened to be listed first.
    """
    return tuple(item for item in detection.ambiguities if not config.entity_ids(item.role))


def offered_ids(filled: Mapping[str, Any]) -> frozenset[str]:
    """Every entity id in a fill, whichever kind of role holds it.

    A multiple role's value is a list, so a membership test against the fill's
    values alone silently misses every phase and every string.
    """
    ids: set[str] = set()
    for value in filled.values():
        if isinstance(value, str):
            ids.add(value)
        else:
            ids.update(value)
    return frozenset(ids)


def _with_fill(config: EntryConfig, filled: Mapping[str, Any]) -> EntryConfig:
    """The configuration this entry would have if the fill were accepted."""
    entities = dict(config.entities)
    entities.update({key: normalise_entity_ids(value) for key, value in filled.items()})
    return EntryConfig(entities=entities, numbers=config.numbers, inverted=config.inverted)


def wanted_fill(config: EntryConfig, filled: Mapping[str, Any]) -> dict[str, Any]:
    """The part of a fill that some feature is actually waiting on.

    Detection recognises more than the analytics currently read — grid power
    is mapped and stored and drives nothing yet. Raising a repair about a
    sensor that would change nothing on screen is how a notification area
    becomes something users learn to scroll past, so the checks are gated on
    this rather than on the fill itself. The reconfigure form still offers the
    whole fill: the user is already there, and a stored role costs them
    nothing.
    """
    wanted = {role for feature in FEATURES for role in missing_roles(config, feature)}
    return {key: value for key, value in filled.items() if key in wanted}


def unlocked_by(config: EntryConfig, filled: Mapping[str, Any]) -> list[str]:
    """The features that would go from unavailable to available."""
    after = _with_fill(config, filled)
    return [
        feature.label
        for feature in FEATURES
        if missing_roles(config, feature) and not missing_roles(after, feature)
    ]


def fed_by(config: EntryConfig, filled: Mapping[str, Any]) -> list[str]:
    """The features a fill brings closer to complete, whether or not it opens them.

    Weaker than unlocked_by and true more often. The Balance tab opens on its
    first counter and is not finished until its sixth, so an entry that has
    two of them gains a great deal from the other four while never crossing
    the line unlocked_by watches.
    """
    after = _with_fill(config, filled)
    return [
        feature.label
        for feature in FEATURES
        if len(missing_roles(after, feature)) < len(missing_roles(config, feature))
    ]
