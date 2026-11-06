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
});
