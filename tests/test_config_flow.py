"""Тести майстра налаштування."""

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.inverter_analytics.config_flow import pack, unpack
from custom_components.inverter_analytics.const import DOMAIN
from custom_components.inverter_analytics.roles import EntryConfig


def test_pack_splits_flat_form_into_entities_numbers_and_inverted():
    packed = pack(
        {
            "name": "Deye 8kW",
            "load_power": "sensor.load",
            "battery_power": "sensor.batt",
            "rated_power": 8000,
            "invert_battery_power": True,
            "invert_grid_power": False,
        }
    )
    assert packed["entities"] == {"load_power": "sensor.load", "battery_power": "sensor.batt"}
    assert packed["numbers"] == {"rated_power": 8000.0}
    assert packed["inverted"] == ["battery_power"]
    assert "name" not in packed["entities"]


def test_pack_drops_empty_fields():
    packed = pack({"load_power": "sensor.load", "pv_power": "", "rated_power": 5000})
    assert "pv_power" not in packed["entities"]


def test_unpack_restores_entities_numbers_and_set_inversions():
    flat = {
        "load_power": "sensor.load",
        "battery_power": "sensor.batt",
        "rated_power": 8000.0,
        "invert_battery_power": True,
    }
    assert unpack(pack(flat)) == flat


def test_pack_drops_unset_inversion_flags():
    """False дорівнює відсутності: build_schema все одно підставляє False."""
    packed = pack({"load_power": "sensor.load", "invert_battery_power": False})
    assert packed["inverted"] == []
    assert "invert_battery_power" not in unpack(packed)


async def test_user_flow_creates_entry(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {"name": "Deye 8kW", "load_power": "sensor.load", "rated_power": 8000},
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Deye 8kW"
    assert result["data"]["entities"] == {"load_power": "sensor.load"}
    assert result["data"]["numbers"] == {"rated_power": 8000.0}


async def test_options_flow_overrides_data(
    recorder_mock, enable_custom_integrations, hass: HomeAssistant
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Deye",
        data={
            # "legacy_role" імітує роль, знята з ROLES у пізнішій версії:
            # build_schema() будує поля лише з поточних відомих ролей, тож
            # options flow органічно ніколи не міг би повторно надіслати
            # це значення — воно не існує ні як дефолт форми, ні в
            # відправленому user_input.
            "entities": {"load_power": "sensor.old", "legacy_role": "sensor.retired"},
            "numbers": {"rated_power": 8000.0},
            "inverted": [],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {"name": "Deye 8kW", "load_power": "sensor.new", "rated_power": 12000},
    )
    await hass.async_block_till_done()

    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options["entities"] == {"load_power": "sensor.new"}
    assert entry.options["numbers"] == {"rated_power": 12000.0}

    # Форма попередньо заповнює назву поточним title і запрошує її
    # редагувати — редаговане ім'я має потрапити в title запису, а не
    # загубитися (pack() свідомо відкидає CONF_NAME з даних).
    assert entry.title == "Deye 8kW"

    # Контракт EntryConfig: непорожні options повністю перекривають data,
    # а не зливаються з ними. "legacy_role" був у data, але схема форми
    # не знає такої ролі, тож options ніколи не міг отримати цей ключ.
    # EntryConfig.from_entry() читає лише entry.options (бо вони непорожні)
    # і не торкається entry.data — інакше EntryConfig.from_dict() впав би
    # з KeyError на невідомій ролі "legacy_role" ще до того, як тест
    # встиг би щось перевірити. Саме відсутність винятку тут і є доказом,
    # що data не зливається (навіть на рівні вкладеного entities-словника)
    # в options.
    config = EntryConfig.from_entry(entry)
    assert config.entity_id("load_power") == "sensor.new"
    assert config.number("rated_power") == 12000.0
    assert "legacy_role" not in config.entities
