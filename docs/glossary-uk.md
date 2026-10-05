# Ukrainian glossary

The Ukrainian strings in `frontend/src/i18n/uk.ts` and
`custom_components/inverter_analytics/translations/uk.json` follow this
glossary. A new term is added here in the same commit as its first use; for a
term not listed, use the word Home Assistant's own Ukrainian translation uses.

Sentences are translated, not mapped word for word. A rule sentence must say in
Ukrainian exactly what the code computes — the same thresholds, the same
conditions. The product name "Inverter Analytics", entity IDs, sensor names
quoted from the user's installation, and `code` fragments are not translated.

| English | Ukrainian |
|---|---|
| Load (tab, power) | Навантаження |
| Battery | Батарея |
| Seasonality | Сезонність |
| Balance | Баланс |
| Grid | Мережа |
| Sizing | Достатність |
| Inverter | Інвертор |
| Sun / PV / solar production | Сонце / СЕС / сонячна генерація |
| consumption | споживання |
| production | генерація |
| state of charge | рівень заряду |
| rated power | номінальна потужність |
| overload | перевантаження |
| outage | відключення |
| import / export (grid) | імпорт / експорт |
| from grid / to grid | з мережі / у мережу |
| phase / imbalance | фаза / перекіс фаз |
| PV string | стрінг |
| counter (energy total) | лічильник |
| statistics / hourly statistics | статистика / погодинна статистика |
| coverage | покриття даними |
| period | період |
| mean / median / peak | середнє / медіана / пік |
| round-trip efficiency | ККД заряду-розряду |
| full cycles | повні цикли |
| Enough / Borderline / Short / No verdict | Достатньо / На межі / Замало / Без вердикту |
| Reconfigure (HA button) | Переналаштувати |
| Options (HA button) | Параметри |
| Repairs | Виправлення |
| W / kW / kWh | Вт / кВт / кВт·год |
| s / min / h (durations) | с / хв / год |
| 24 h / 7 days / 30 days / This month / Year | 24 год / 7 днів / 30 днів / Цей місяць / Рік |
| House (balance flow) | Будинок |
| In / Out (balance bars) | Надійшло / Вийшло |
| In against out (balance heading) | Надійшло й вийшло |
| sensor | сенсор |
| capacity (battery) | ємність |
| Exact data / Hourly averages / Mixed (precision) | Точні дані / Погодинні середні / Змішані |
| the battery filled / never filled | батарея зарядилася повністю / жодного разу не зарядилася повністю |
| integration | інтеграція |
| settings | налаштування |
| of rated (power) | від номінальної |
| dip (state of charge) | провал |
| episode (overload, low charge, imbalance) | епізод |
| resting (battery idle) | простій |
| load duration curve | крива тривалості навантаження |
| charging and discharging | заряд і розряд |
| P95 | P95 |
| time zone | часовий пояс |
| recorder (HA) | реєстратор |
| busiest hour | найнавантаженіша година |
| heat map | теплова карта |
| self-sufficiency / self-consumption | самозабезпечення / самоспоживання |
| unaccounted (energy) | неврахована |
| bar (chart) | стовпчик |
| autonomy (battery through an outage) | автономність |
| brief interruptions (grid) | короткі перебої |
| unrecorded (gap inside an outage) | без записів |
| assumed off (unrecorded gap counted as an outage) | вважаємо відключенням |
| is reported (time past a threshold, option help) | враховується у звіті |
| sustained (load over 15 min, imbalance) | тривалий (Тривала 15 хв) |
| discharge rate / pts/h (charge points per hour) | швидкість розряду / в.п./год |
| verdict (sizing) | вердикт |
| low mark / full mark (charge thresholds) | низька позначка / позначка повного заряду |
| Low battery charge / Full battery charge (option fields) | Низький заряд батареї / Повний заряд батареї |
| "X, against the Y" (sizing card titles) | «X проти Y» |
| map (a sensor to a role, in the forms) | вказати (сенсор) |
| mapping (sensor to role) | відповідність сенсорів |
| detection (sensor discovery) | виявлення |
| installation (the user's HA) | інсталяція |
| entity (HA) | сутність |
| wizard (config flow) | майстер |
| current transformer / clamp | трансформатор струму / кліщі |
| invert (sign switch) | інвертувати |
| Hours left (outage table column) | Ще витримала б |
| Needed at start (charge, outage table column) | Потрібно на старті |
| did not last (battery through an outage) | не витримала |
| hardest outage | найважче відключення |
| Outages covered (battery never below the low mark) | Покрито відключень |
| cut by the period (outage at the window's edge) | обрізане періодом |
| too short to judge | закоротке для оцінки |
| Configure (HA button that opens the options, in en.json) | «Налаштувати» |
| charge limit (the battery's own ceiling) / reached its limit | ліміт заряду / досягла ліміту |
| with the sun up | поки світило сонце |
| no export (a system that keeps production in) | без експорту |
| no charge data (sizing month cell) | немає даних заряду |
| Health (tab) | Стан |
| usable capacity (battery, implied) | корисна ємність |
| clean discharge hour | чиста година розряду |
| best hour (PV, highest hourly peak) | найкраща година |
| nameplate (capacity) | паспортна ємність |
| Whole history (health badge) | Уся історія |
| a year earlier (table column) | рік тому |
| points (of state of charge) | в.п. |
| percentage points, pp (a difference between two shares) | в.п. |
| the period does not apply (Health, dimmed picker) | період тут не застосовується |
| mean of the monthly figures | середнє місячних значень |
| BMS (battery management system) | BMS (система керування батареєю) |
| recalibration (BMS) | перекалібрування |
