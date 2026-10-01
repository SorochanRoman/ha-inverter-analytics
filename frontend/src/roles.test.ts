import { describe, expect, it } from "vitest";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import { listRoles, roleLabel } from "./roles";

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
