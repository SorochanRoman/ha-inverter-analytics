import { describe, expect, it } from "vitest";
import { listRoles } from "../roles";
import { en } from "./en";
import { uk } from "./uk";

describe("the missing-roles notice", () => {
  it("names one role or several in English", () => {
    expect(en.panel.missingOne({ feature: "Battery", roles: "Battery state of charge" })).toBe(
      "Battery needs Battery state of charge, and it is not mapped to this inverter. " +
        "Nothing here is broken and there is no data missing — this page has simply not been " +
        "told which of your sensors that is.",
    );
    expect(en.panel.missingMany({ feature: "Balance", roles: "PV energy and Grid import" })).toBe(
      "Balance needs PV energy and Grid import, and none of them are mapped to this inverter. " +
        "Nothing here is broken and there is no data missing — this page has simply not been " +
        "told which of your sensors those are.",
    );
  });

  it("agrees with one field or several in Ukrainian", () => {
    expect(uk.panel.missingOne({ feature: "Батарея", roles: "Рівень заряду" })).toBe(
      "Для розділу «Батарея» потрібне поле «Рівень заряду», але для цього інвертора його не " +
        "вказано. Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не " +
        "сказали, який із ваших сенсорів це.",
    );
    expect(uk.panel.missingMany({ feature: "Баланс", roles: "«A» і «B»" })).toBe(
      "Для розділу «Баланс» потрібні поля «A» і «B», але для цього інвертора жодне з них не " +
        "вказано. Тут нічого не зламано й жодних даних не бракує — цій сторінці просто не " +
        "сказали, які з ваших сенсорів це.",
    );
  });

  it("quotes every role of a list in Ukrainian and none in English", () => {
    const roles = ["pv_power", "grid_power"];
    expect(en.panel.missingMany({ feature: "Load", roles: listRoles(en, roles, true) })).toMatch(
      /^Load needs PV power and Grid power, and none/,
    );
    expect(uk.panel.missingMany({ feature: "Навантаження", roles: listRoles(uk, roles, true) }))
      .toContain(`потрібні поля «${uk.roles.pv_power}» і «${uk.roles.grid_power}», але`);
  });
});
