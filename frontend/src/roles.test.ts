import { describe, expect, it } from "vitest";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import { listRoles, partLabel, roleLabel } from "./roles";

describe("roleLabel", () => {
  it("names a role as the setup form names it", () => {
    expect(roleLabel(en, "battery_soc")).toBe("Battery state of charge");
  });

  it("falls back to the key rather than to nothing", () => {
    // A backend newer than this bundle can report a role it has never heard
    // of. An empty string in the middle of a sentence is worse than a raw key.
    expect(roleLabel(en, "future_role")).toBe("future_role");
  });
});

describe("listRoles", () => {
  it("reads as a sentence at every length", () => {
    expect(listRoles(en, [])).toBe("");
    expect(listRoles(en, ["battery_soc"])).toBe("Battery state of charge");
    expect(listRoles(en, ["pv_power", "grid_power"])).toBe("PV power and Grid power");
    expect(listRoles(en, ["pv_power", "grid_power", "battery_soc"])).toBe(
      "PV power, Grid power and Battery state of charge",
    );
  });

  it("joins a Ukrainian list with «і»", () => {
    expect(listRoles(uk, ["battery_soc", "grid_connected"])).toBe(
      `${uk.roles.battery_soc} і ${uk.roles.grid_connected}`,
    );
  });
});

describe("partLabel", () => {
  it("keeps the backend's positional fallback word for word in English", () => {
    // roles.py builds "Phase N" / "String N" for load_pN, grid_pN and pv_pN.
    expect(partLabel(en, { key: "load_p2", label: "Phase 2" })).toBe("Phase 2");
    expect(partLabel(en, { key: "grid_p1", label: "Phase 1" })).toBe("Phase 1");
    expect(partLabel(en, { key: "pv_p3", label: "String 3" })).toBe("String 3");
  });

  it("names the positional fallback in Ukrainian", () => {
    expect(partLabel(uk, { key: "load_p2", label: "Phase 2" })).toBe("Фаза 2");
    expect(partLabel(uk, { key: "grid_p1", label: "Phase 1" })).toBe("Фаза 1");
    expect(partLabel(uk, { key: "pv_p3", label: "String 3" })).toBe("Стрінг 3");
  });

  it("leaves a label read from the entity id alone", () => {
    expect(partLabel(uk, { key: "load_l2", label: "L2" })).toBe("L2");
    expect(partLabel(uk, { key: "pv_s3", label: "PV3" })).toBe("PV3");
    expect(partLabel(uk, { key: "battery_1", label: "#1" })).toBe("#1");
  });
});
