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


def _schema_keys(advanced: bool = False) -> set[str]:
    return {str(key.schema) for key in build_schema(advanced=advanced).schema}


# The options form renders the tuning thresholds that the wizard hides, so it
# is checked against the wider schema. Checking every step against the narrow
# one would let those two fields ship as raw identifiers.
_STEP_SCHEMAS = {"confirm": False, "manual": False, "init": True}


def test_every_schema_field_has_a_label_in_the_manual_step():
    assert _schema_keys() <= set(_step("manual")["data"])


def test_every_schema_field_has_a_description():
    """The description is the helper text under the input, and the point of this task."""
    assert _schema_keys() <= set(_step("manual")["data_description"])


def test_the_confirm_step_covers_its_extra_field():
    confirm = _step("confirm")
    assert CT_CHOICE in confirm["data"]
    assert "{no_statistics}" in confirm["description"]


def test_every_step_that_renders_the_schema_labels_all_of_it():
    """A step missing a key renders that field as a raw identifier, and nothing fails.

    confirm and options.init render the same schema as manual, so all three
    have to be checked or the file can drift for two of them unnoticed.
    """
    for name, advanced in _STEP_SCHEMAS.items():
        assert _schema_keys(advanced) <= set(_step(name)["data"]), f"{name} is missing labels"


def test_every_step_that_renders_the_schema_describes_all_of_it():
    for name, advanced in _STEP_SCHEMAS.items():
        assert _schema_keys(advanced) <= set(_step(name)["data_description"]), (
            f"{name} is missing descriptions"
        )


def test_rated_power_description_says_where_to_find_the_number():
    description = _step("manual")["data_description"]["rated_power"]
    assert "nameplate" in description.lower()


def test_the_duplicated_blocks_stay_identical():
    """The repetition is forced by the format; drift between copies is not.

    init is a superset of manual rather than a copy of it: it renders the two
    tuning thresholds the wizard hides. Everything the two steps share must
    still read identically, and the extra keys must be exactly those two —
    otherwise a field could go missing from the wizard and pass as an extra.
    """
    manual, init = _step("manual"), _step("init")
    advanced_only = _schema_keys(advanced=True) - _schema_keys()
    for block in ("data", "data_description"):
        assert set(init[block]) - set(manual[block]) == advanced_only
        assert {key: init[block][key] for key in manual[block]} == manual[block]
