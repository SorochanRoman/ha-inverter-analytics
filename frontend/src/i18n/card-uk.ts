/** The Battery time card's words in Ukrainian; terms follow docs/glossary-uk.md. */
import type { CardMessages } from "./card-en";
import { plural } from "./plural";

export const cardUk: CardMessages = {
  name: "Час батареї",
  description: "Час за поточної потужності, з виміряної ємності батареї",
  chargingTo: (p) => `Заряд до ${p.t}%`,
  dischargingTo: (p) => `Розряд до ${p.t}%`,
  atLimit: (p) => `Досягла ліміту ${p.t}%`,
  atFloor: (p) => `Досягла нижньої межі ${p.t}%`,
  idle: "Простій",
  withEta: (p) => `${p.status} · ${p.eta}`,
  minutes: (p) => `${p.m} хв`,
  hoursMinutes: (p) => `${p.h} год ${p.m} хв`,
  hours: (p) => `${p.h} год`,
  over2Days: "понад 2 доби",
  arrival: (p) => `(≈${p.time})`,
  unmapped: "Вкажіть рівень заряду й потужність батареї в Inverter Analytics",
  unavailable: (p) => `Сутність ${p.entity} недоступна`,
  // "з 20 чистих годин", "з 21 чистої години": the count after «з» decides.
  capacityNotMeasured: (p) =>
    `Ємність ще не виміряна (${p.n} з ${p.min} ` +
    plural("uk", p.min, { one: "чистої години", other: "чистих годин" }) +
    " розряду)",
  capacityNeedsRoles: (p) => `Для ємності вкажіть ${p.roles}`,
  and: "і",
  roles: {
    battery_soc: "рівень заряду батареї",
    battery_charge_total: "лічильник заряду батареї",
    battery_discharge_total: "лічильник розряду батареї",
  },
  units: { w: "Вт", kw: "кВт" },
  editor: {
    entryId: "Інвертор",
    entryIdHint: "Ідентифікатор запису інвертора; залиште порожнім, якщо інвертор один",
    chargeTo: "Заряджати до",
    chargeToHint: "Число (%) або сутність; 100, якщо порожньо",
    dischargeTo: "Розряджати до",
    dischargeToHint: "Число (%) або сутність; низький заряд батареї, якщо порожньо",
  },
};
