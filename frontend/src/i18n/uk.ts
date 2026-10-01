/** The panel's words in Ukrainian. Typed against en.ts; see there. */
import type { Messages } from "./en";
import { plural } from "./plural";

export const uk: Messages = {
  common: {
    and: "і",
  },
  units: {
    w: "Вт",
    kw: "кВт",
    kwh: "кВт·год",
    s: "с",
    min: "хв",
    h: "год",
    ofRated: "від номінальної",
  },
  panel: {
    language: "Мова",
    couldNotLoad: (p) => `Не вдалося завантажити конфігурацію: ${p.error}`,
    tryAgain: "Спробувати ще раз",
    loading: "Завантаження…",
    noInverter:
      "Ще не налаштовано жодного інвертора. Додайте інтеграцію Inverter Analytics у налаштуваннях.",
    tabs: {
      load: "Навантаження",
      battery: "Батарея",
      seasonal: "Сезонність",
      balance: "Баланс",
      grid: "Мережа",
      sizing: "Достатність",
    },
    missingOne: (p) =>
      `Для розділу «${p.feature}» потрібне поле «${p.roles}», але для цього інвертора його не вказано. ` +
      "Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не сказали, " +
      "який із ваших сенсорів це.",
    missingMany: (p) =>
      `Для розділу «${p.feature}» потрібні поля ${p.roles}, але для цього інвертора жодне з них не вказано. ` +
      "Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не сказали, " +
      "які з ваших сенсорів це.",
    reconfigureBefore: "Відкрийте інтеграцію, виберіть ",
    reconfigure: "Переналаштувати",
    reconfigureAfter: ", і вона запропонує те, що зможе знайти у вашій установці.",
    goToSettings: "Перейти до налаштувань Inverter Analytics",
  },
  ranges: {
    "24h": "24 год",
    "7d": "7 днів",
    "30d": "30 днів",
    month: "Цей місяць",
    year: "Рік",
  },
  features: {
    load: "Аналітика навантаження",
    battery: "Аналітика батареї",
    seasonal: "Сезонність",
    balance: "Енергобаланс",
    grid: "Відключення мережі",
    sizing: "Достатність",
  },
  roles: {
    load_power: "Потужність навантаження",
    load_power_phase: "Потужність навантаження по фазах",
    rated_power: "Номінальна потужність",
    rated_power_per_phase: "Номінальна потужність на фазу",
    pv_power: "Потужність СЕС",
    pv_power_string: "Потужність СЕС по стрінгах",
    battery_power: "Потужність батареї",
    grid_power: "Потужність мережі",
    grid_power_phase: "Потужність мережі по фазах",
    battery_soc: "Рівень заряду батареї",
    battery_capacity: "Ємність батареї",
    grid_connected: "Мережа підключена",
    pv_energy_total: "Лічильник генерації СЕС",
    load_energy_total: "Лічильник споживання",
    battery_charge_total: "Лічильник заряду батареї",
    battery_discharge_total: "Лічильник розряду батареї",
    grid_import_total: "Лічильник імпорту з мережі",
    grid_export_total: "Лічильник експорту в мережу",
  },
  errors: {
    not_found: "Інвертор не знайдено або вимкнено",
    invalid_window: "Кінець періоду має бути пізніше за його початок",
  },
  format: {
    exactData: "Точні дані",
    hourlyAverages: "Погодинні середні",
    mixed: "Змішані",
    mixedSince: (p) => `Змішані з ${p.date}`,
    noData: "Немає даних за цей період",
    coversUnderOnePercent: "Дані покривають менше ніж 1% періоду",
    coversOnly: (p) => `Дані покривають лише ${p.share} періоду`,
  },
  verdict: {
    enough: "Достатньо",
    borderline: "На межі",
    short: "Замало",
    none: "Без вердикту",
    noData: {
      inverter: "За цей період немає статистики навантаження.",
      battery: "За цей період немає статистики рівня заряду батареї.",
      solar:
        "За цей період немає статистики лічильників або споживання замало, щоб рахувати частку.",
    },
    neverFull:
      "За цей період батарея жодного разу не зарядилася повністю, тож ночі нічого не кажуть про її ємність.",
    hintNeverFilled: "без повного заряду",
    hintNoData: "немає даних",
  },
  charts: {
    monthNamesLocale: "uk",
    percentOfTime: "% часу",
    percentImbalance: "% перекосу фаз",
    percentCharge: "% заряду",
    percentOfMeasuredTime: "% виміряного часу",
    hour: "година",
    hours: "години",
    mean: "Середнє",
    peak: "Пік",
    load: "Навантаження",
    pv: "СЕС",
    in: "Надходження",
    out: "Витрата",
    flows: {
      pv_energy_total: "Сонце",
      grid_import_total: "З мережі",
      battery_discharge_total: "З батареї",
      load_energy_total: "Будинок",
      grid_export_total: "У мережу",
      battery_charge_total: "У батарею",
    },
    hoursWithoutGrid: (p) => `${p.hours} год без мережі`,
    // The verb agrees with the count: 1 відключення почалося, 2 почалися,
    // 5 відключень почалося.
    outagesBegan: (p) =>
      p.n === 0
        ? "жодне відключення не почалося"
        : plural("uk", p.n, {
            one: `${p.n} відключення почалося`,
            few: `${p.n} відключення почалися`,
            many: `${p.n} відключень почалося`,
            other: `${p.n} відключення почалося`,
          }),
  },
};
