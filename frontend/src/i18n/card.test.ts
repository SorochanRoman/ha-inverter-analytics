import { describe, expect, it } from "vitest";
import { cardEn } from "./card-en";
import { cardUk } from "./card-uk";

type Leaf = { path: string; value: unknown };

function leaves(node: unknown, path = ""): Leaf[] {
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, value]) =>
      leaves(value, path ? `${path}.${key}` : key),
    );
  }
  return [{ path, value: node }];
}

describe("the card's dictionaries", () => {
  it("have the same keys", () => {
    const keys = (d: unknown) => leaves(d).map((leaf) => leaf.path).sort();
    expect(keys(cardUk)).toEqual(keys(cardEn));
  });

  it("leave no Ukrainian string empty or in English", () => {
    const en = new Map(leaves(cardEn).map((leaf) => [leaf.path, leaf.value]));
    for (const { path, value } of leaves(cardUk)) {
      if (typeof value !== "string") continue;
      expect(value, path).not.toBe("");
      expect(value, path).not.toBe(en.get(path));
    }
  });

  it("interpolate the targets", () => {
    expect(cardEn.chargingTo({ t: "85" })).toBe("Charging to 85%");
    expect(cardEn.dischargingTo({ t: "20" })).toBe("Discharging to 20%");
    expect(cardEn.atLimit({ t: "85" })).toBe("At limit 85%");
    expect(cardEn.atFloor({ t: "20" })).toBe("At floor 20%");
    for (const fn of [cardUk.chargingTo, cardUk.dischargingTo, cardUk.atLimit, cardUk.atFloor]) {
      expect(fn({ t: "85" })).toContain("85%");
    }
  });

  it("interpolate the time and its parts", () => {
    expect(cardEn.withEta({ status: "Charging to 85%", eta: "2 h" })).toBe("Charging to 85% · 2 h");
    expect(cardEn.minutes({ m: "5" })).toBe("5 min");
    expect(cardEn.hoursMinutes({ h: "2", m: "10" })).toBe("2 h 10 min");
    expect(cardEn.hours({ h: "2" })).toBe("2 h");
    expect(cardEn.arrival({ time: "16:40" })).toBe("(≈16:40)");
    expect(cardUk.minutes({ m: "5" })).toBe("5 хв");
    expect(cardUk.hoursMinutes({ h: "2", m: "10" })).toBe("2 год 10 хв");
    expect(cardUk.hours({ h: "2" })).toBe("2 год");
    expect(cardUk.arrival({ time: "16:40" })).toBe("(≈16:40)");
  });

  it("interpolate the reasons", () => {
    expect(cardEn.unavailable({ entity: "sensor.soc" })).toBe("sensor.soc is unavailable");
    expect(cardEn.capacityNotMeasured({ n: 12, min: 20 })).toBe(
      "Capacity not measured yet (12 of 20 clean discharge hours)",
    );
    expect(cardEn.capacityNeedsRoles({ roles: "battery SoC" })).toBe(
      "Capacity needs battery SoC mapped",
    );
    expect(cardUk.unavailable({ entity: "sensor.soc" })).toContain("sensor.soc");
    expect(cardUk.capacityNotMeasured({ n: 12, min: 20 })).toContain("12 з 20");
    expect(cardUk.capacityNotMeasured({ n: 0, min: 21 })).toContain("0 з 21 чистої години");
    expect(cardUk.capacityNeedsRoles({ roles: "x" })).toContain("x");
  });

  it("keep the fixed sentences verbatim", () => {
    expect(cardEn.unmapped).toBe("Map battery SoC and battery power in Inverter Analytics");
    expect(cardEn.idle).toBe("Idle");
    expect(cardEn.over2Days).toBe("over 2 days");
    expect(cardEn.description).toBe(
      "Time at the current power, from the battery's measured capacity",
    );
    expect(cardEn.editor.entryId).toBe("Inverter");
    expect(cardEn.editor.chargeTo).toBe("Charge to");
    expect(cardEn.editor.dischargeTo).toBe("Discharge to");
  });

  it("name the looks for the editors", () => {
    expect(cardEn.editor.layout).toBe("Layout");
    expect(cardEn.editor.style).toBe("Style");
    expect(cardEn.layouts).toEqual({ ring: "Ring", bar: "Bar", tile: "Tile" });
    expect(cardEn.styles).toEqual({ full: "Full", ring: "Ring", time: "Time" });
    expect(cardUk.editor.layout).toBe("Вигляд");
    expect(cardUk.editor.style).toBe("Стиль");
    expect(cardUk.layouts).toEqual({ ring: "Кільце", bar: "Смуга", tile: "Плитка" });
    expect(cardUk.styles).toEqual({ full: "Повний", ring: "Кільце", time: "Час" });
  });

  it("have a one-word label for each state", () => {
    expect(cardEn.words).toEqual({
      charging: "charging",
      discharging: "discharging",
      idle: "idle",
      atLimit: "at limit",
      atFloor: "at floor",
    });
    expect(cardUk.words).toEqual({
      charging: "заряд",
      discharging: "розряд",
      idle: "простій",
      atLimit: "на ліміті",
      atFloor: "на нижній межі",
    });
  });

  it("interpolate the target, the clock time and the accessible sentence", () => {
    expect(cardEn.toTarget({ t: "85" })).toBe("to 85%");
    expect(cardEn.atTime({ time: "16:40" })).toBe("at 16:40");
    expect(cardEn.approx({ time: "16:40" })).toBe("≈16:40");
    expect(cardUk.toTarget({ t: "85" })).toBe("до 85%");
    expect(cardUk.atTime({ time: "16:40" })).toBe("о 16:40");
    expect(cardUk.approx({ time: "16:40" })).toBe("≈16:40");
    const sentence = { soc: "62%", status: "Charging to 85% · 2 h", power: "1.8 kW" };
    expect(cardEn.sentence(sentence)).toBe(
      "Battery at 62%. Charging to 85% · 2 h. Battery power 1.8 kW.",
    );
    expect(cardUk.sentence({ ...sentence, status: "Заряд до 85% · 2 год", power: "1,8 кВт" })).toBe(
      "Батарея на 62%. Заряд до 85% · 2 год. Потужність батареї 1,8 кВт.",
    );
  });

  it("name and describe the badge", () => {
    expect(cardEn.badge.name).toBe("Battery time");
    expect(cardEn.badge.description).toBe(
      "Battery charge and the time to its target, at the current power.",
    );
    expect(cardUk.badge.name).toBe("Час батареї");
    expect(cardUk.badge.description).toBe(
      "Заряд батареї й час до цілі за поточної потужності.",
    );
  });
});
