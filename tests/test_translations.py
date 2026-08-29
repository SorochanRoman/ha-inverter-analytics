"""The translation file must keep up with the schema.

A missing label renders as a raw key in the wizard and nothing fails, so this
is checked rather than remembered.
"""

import json
import pathlib

from custom_components.inverter_analytics.config_flow import CT_CHOICE, build_schema

TRANSLATIONS = pathlib.Path("custom_components/inverter_analytics/translations/en.json")


def _step(name: str) -> dict:
    data = json.loads(TRANSLATIONS.read_text())
    section = "options" if name == "init" else "config"
    return data[section]["step"][name]


def _schema_keys() -> set[str]:
    return {str(key.schema) for key in build_schema().schema}


def test_every_schema_field_has_a_label_in_the_manual_step():
    assert _schema_keys() <= set(_step("manual")["data"])


def test_every_schema_field_has_a_description():
    """The description is the helper text under the input, and the point of this task."""
    assert _schema_keys() <= set(_step("manual")["data_description"])


def test_the_confirm_step_covers_its_extra_field():
    confirm = _step("confirm")
    assert CT_CHOICE in confirm["data"]
    assert "{no_statistics}" in confirm["description"]


def test_rated_power_description_says_where_to_find_the_number():
    description = _step("manual")["data_description"]["rated_power"]
    assert "nameplate" in description.lower()
