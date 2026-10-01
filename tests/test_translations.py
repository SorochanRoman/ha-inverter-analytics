"""The translation file must keep up with the schema.

A missing label renders as a raw key in the wizard and nothing fails, so this
is checked rather than remembered.
"""

import json
import pathlib
import re

from custom_components.inverter_analytics.config_flow import build_schema
from custom_components.inverter_analytics.detect import CT_CHOICE, GRID_CHOICE

TRANSLATIONS = pathlib.Path("custom_components/inverter_analytics/translations/en.json")

# Every step that renders build_schema, and the shape it asks for. A step
# missing a key renders that field as a raw identifier and nothing fails, so
# each one is checked against the schema it actually shows rather than against
# the widest one.
STEP_SHAPES: dict[str, dict[str, bool]] = {
    "manual": {},
    "confirm": {},
    "reconfigure_detected": {"name": False},
    "reconfigure_manual": {"name": False},
    "init": {"mapping": False, "tuning": True},
}


def _step(name: str) -> dict:
    data = json.loads(TRANSLATIONS.read_text())
    section = "options" if name == "init" else "config"
    return data[section]["step"][name]


def _schema_keys(**shape: bool) -> set[str]:
    return {str(key.schema) for key in build_schema(**shape).schema}


def test_every_schema_field_has_a_label_in_the_manual_step():
    assert _schema_keys() <= set(_step("manual")["data"])


def test_every_schema_field_has_a_description():
    """The description is the helper text under the input, and the point of this task."""
    assert _schema_keys() <= set(_step("manual")["data_description"])


def test_the_confirm_step_covers_its_extra_field():
    confirm = _step("confirm")
    assert CT_CHOICE in confirm["data"]
    assert GRID_CHOICE in confirm["data"]
    assert "{no_statistics}" in confirm["description"]


def test_the_detected_reconfigure_step_covers_the_same_extra_field():
    """It substitutes the same question into the same schema the wizard does."""
    detected = _step("reconfigure_detected")
    assert CT_CHOICE in detected["data"]
    assert GRID_CHOICE in detected["data"]
    for placeholder in ("{found}", "{no_statistics}"):
        assert placeholder in detected["description"]


def test_the_reconfigure_menu_names_both_of_its_options():
    menu = _step("reconfigure")
    assert set(menu["menu_options"]) == {"reconfigure_detected", "reconfigure_manual"}
    assert "{found}" in menu["description"]


def test_every_step_that_renders_the_schema_labels_all_of_it():
    for name, shape in STEP_SHAPES.items():
        assert _schema_keys(**shape) <= set(_step(name)["data"]), f"{name} is missing labels"


def test_every_step_that_renders_the_schema_describes_all_of_it():
    for name, shape in STEP_SHAPES.items():
        assert _schema_keys(**shape) <= set(_step(name)["data_description"]), (
            f"{name} is missing descriptions"
        )


def test_no_step_labels_a_field_it_does_not_render():
    """An extra key is how a field goes missing from a form unnoticed.

    Dropping a role from a step's schema while its label stays behind leaves
    the file looking complete. The only keys allowed beyond the schema are the
    questions that stand in for a picker rather than being added to it.
    """
    for name, shape in STEP_SHAPES.items():
        allowed = _schema_keys(**shape) | {CT_CHOICE, GRID_CHOICE}
        for block in ("data", "data_description"):
            assert set(_step(name)[block]) <= allowed, f"{name}.{block} labels an absent field"


def test_rated_power_description_says_where_to_find_the_number():
    description = _step("manual")["data_description"]["rated_power"]
    assert "nameplate" in description.lower()


def test_the_duplicated_blocks_stay_identical():
    """The repetition is forced by the format; drift between copies is not.

    Five steps render overlapping slices of one schema — the wizard's two, the
    two reconfigure forms and the options form. No two of them may describe the
    same field differently, or the same sensor gets two meanings depending on
    which form the user reached it through.
    """
    steps = {name: _step(name) for name in STEP_SHAPES}
    for block in ("data", "data_description"):
        seen: dict[str, tuple[str, str]] = {}
        for name, step in steps.items():
            for key, text in step[block].items():
                if key in seen:
                    other, previous = seen[key]
                    assert text == previous, f"{block}.{key} differs between {other} and {name}"
                else:
                    seen[key] = (name, text)


def test_the_options_step_points_at_reconfigure_for_the_mapping():
    """The mapping moved; the form the user knew has to say where it went."""
    assert "reconfigure" in _step("init")["description"].lower()


UK = pathlib.Path("custom_components/inverter_analytics/translations/uk.json")
PLACEHOLDER = re.compile(r"\{[a-z_]+\}")


def _leaves(node: object, path: str = "") -> dict[str, str]:
    if isinstance(node, dict):
        out: dict[str, str] = {}
        for key, value in node.items():
            out.update(_leaves(value, f"{path}.{key}" if path else key))
        return out
    return {path: str(node)}


def test_the_ukrainian_file_has_exactly_the_english_keys():
    """A key missing here is shown in English; an extra one labels nothing."""
    en = _leaves(json.loads(TRANSLATIONS.read_text()))
    uk = _leaves(json.loads(UK.read_text()))
    assert set(uk) == set(en)


def test_the_ukrainian_file_keeps_every_placeholder():
    """Home Assistant fills {found} by name; a translated placeholder stays empty."""
    en = _leaves(json.loads(TRANSLATIONS.read_text()))
    uk = _leaves(json.loads(UK.read_text()))
    for key, text in en.items():
        assert sorted(PLACEHOLDER.findall(uk[key])) == sorted(PLACEHOLDER.findall(text)), key


PRODUCT_NAME = "Inverter Analytics"


def test_the_ukrainian_file_is_translated():
    en = _leaves(json.loads(TRANSLATIONS.read_text()))
    uk = _leaves(json.loads(UK.read_text()))
    # The product name is not translated, so a title that is exactly the
    # product name reads the same in both files. Only that exact value is
    # exempt: a sentence that merely contains the name must still differ.
    untranslated = [
        key
        for key, text in en.items()
        if uk[key] == text and len(text) > 3 and text != PRODUCT_NAME
    ]
    assert not untranslated
