import { describe, expect, it } from "vitest";
import { buildLocation, parseLocation } from "./location";

const TABS = ["load", "battery"];
const FALLBACK = { tab: "load", range: "30d" } as const;

describe("parseLocation", () => {
  it("reads the tab, range and inverter", () => {
    expect(
      parseLocation("/inverter-analytics/battery", "?range=7d&entry=abc", TABS, FALLBACK),
    ).toEqual({ tab: "battery", range: "7d", entryId: "abc" });
  });

  it("falls back rather than rendering an unknown tab", () => {
    expect(parseLocation("/inverter-analytics/nope", "", TABS, FALLBACK).tab).toBe("load");
  });

  it("falls back rather than requesting an unknown range", () => {
    expect(parseLocation("/inverter-analytics/load", "?range=decade", TABS, FALLBACK).range).toBe(
      "30d",
    );
  });

  it("keeps the previously selected inverter when the URL names none", () => {
    const location = parseLocation("/inverter-analytics/load", "", TABS, {
      ...FALLBACK,
      entryId: "kept",
    });
    expect(location.entryId).toBe("kept");
  });
});

describe("buildLocation", () => {
  it("carries the inverter so a reload does not silently switch to the first", () => {
    expect(
      buildLocation("/inverter-analytics", { tab: "load", range: "7d", entryId: "abc" }),
    ).toBe("/inverter-analytics/load?range=7d&entry=abc");
  });

  it("omits the inverter when none is chosen", () => {
    expect(buildLocation("/inverter-analytics", { tab: "load", range: "24h" })).toBe(
      "/inverter-analytics/load?range=24h",
    );
  });

  it("round-trips through parseLocation", () => {
    const original = { tab: "battery", range: "year", entryId: "xyz" } as const;
    const url = new URL(buildLocation("/inverter-analytics", original), "http://x");
    expect(parseLocation(url.pathname, url.search, TABS, FALLBACK)).toEqual(original);
  });
});
