import { describe, expect, it } from "vitest";
import { listRoles, roleLabel } from "./roles";

describe("roleLabel", () => {
  it("names a role as the setup form names it", () => {
    expect(roleLabel("battery_soc")).toBe("Battery state of charge");
  });

  it("falls back to the key rather than to nothing", () => {
    // A backend newer than this bundle can report a role it has never heard
    // of. An empty string in the middle of a sentence is worse than a raw key.
    expect(roleLabel("future_role")).toBe("future_role");
  });
});

describe("listRoles", () => {
  it("reads as a sentence at every length", () => {
    expect(listRoles([])).toBe("");
    expect(listRoles(["battery_soc"])).toBe("Battery state of charge");
    expect(listRoles(["pv_power", "grid_power"])).toBe("PV power and Grid power");
    expect(listRoles(["pv_power", "grid_power", "battery_soc"])).toBe(
      "PV power, Grid power and Battery state of charge",
    );
  });
});
