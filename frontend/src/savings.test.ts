import { describe, expect, it } from "vitest";
import {
  coverageShare,
  cumulative,
  formatMoney,
  missingSavingsRoles,
  savingsBars,
  savingsState,
} from "./savings";
import type { SavingsBlock } from "./types";

const block = (overrides: Partial<SavingsBlock> = {}): SavingsBlock => ({
  currency: "UAH", total: 120, per_day: 40, hours: 72, window_hours: 72, two_zone: true,
  reason: null,
  days: [
    { day: "2026-08-31", value: 30 },
    { day: "2026-09-01", value: 50 },
    { day: "2026-09-02", value: 40 },
  ],
  ...overrides,
});

describe("savings", () => {
  it("states a figure, a reason, or nothing for an older backend", () => {
    expect(savingsState(block())).toEqual({ kind: "figure" });
    for (const reason of ["no_price", "no_counters", "no_hours"] as const) {
      expect(savingsState(block({ reason, total: null }))).toEqual({ kind: "withheld", reason });
    }
    expect(savingsState(undefined)).toBeNull();
  });

  it("bars by day, or summed by month", () => {
    expect(savingsBars(block().days, false).map((bar) => bar.label)).toEqual([
      "2026-08-31", "2026-09-01", "2026-09-02",
    ]);
    expect(savingsBars(block().days, true)).toEqual([
      { label: "2026-08", value: 30 },
      { label: "2026-09", value: 90 },
    ]);
  });

  it("accumulates, negatives included", () => {
    expect(cumulative([30, -10, 40])).toEqual([30, 20, 60]);
  });

  it("states coverage only when part of the period is counted", () => {
    expect(coverageShare(block())).toBeNull();
    expect(coverageShare(block({ hours: 36 }))).toBe(0.5);
    expect(coverageShare(block({ window_hours: 0, hours: 0 }))).toBeNull();
  });

  it("formats money in the locale, and survives an unknown currency", () => {
    expect(formatMoney(1234.4, "UAH", "uk")).toMatch(/1\s?234/);
    expect(formatMoney(5, "NOTACODE", "en")).toBe("5 NOTACODE");
  });

  it("names the counters the figure is missing", () => {
    expect(missingSavingsRoles(["pv_energy_total", "load_energy_total"])).toEqual([
      "grid_import_total",
    ]);
    expect(missingSavingsRoles(["grid_import_total"])).toEqual(["load_energy_total"]);
    expect(missingSavingsRoles([])).toEqual(["load_energy_total", "grid_import_total"]);
    // Both listed as mapped yet withheld for counters: name both rather than none.
    expect(missingSavingsRoles(["load_energy_total", "grid_import_total"])).toEqual([
      "load_energy_total",
      "grid_import_total",
    ]);
  });
});
