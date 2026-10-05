import { describe, expect, it } from "vitest";
import {
  bestHourCaption,
  comparisonView,
  energyCaption,
  lastTwelveRows,
  yearLines,
} from "./health";
import type { HealthComparison, HealthPayload, HealthSignal, HealthSignalKey } from "./types";

function monthsBetween(first: string, last: string): string[] {
  const keys: string[] = [];
  let [year, month] = first.split("-").map(Number);
  const [lastYear, lastMonth] = last.split("-").map(Number);
  while (year < lastYear || (year === lastYear && month <= lastMonth)) {
    keys.push(`${year}-${String(month).padStart(2, "0")}`);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return keys;
}

function comparison(fields: Partial<HealthComparison> = {}): HealthComparison {
  return {
    recent_mean: null,
    previous_mean: null,
    change: null,
    recent_months: 0,
    previous_months: 0,
    ...fields,
  };
}

function signal(fields: Partial<HealthSignal> = {}): HealthSignal {
  return { missing: [], months: {}, comparison: comparison(), ...fields };
}

function payload(
  months: string[],
  signals: Partial<Record<HealthSignalKey, HealthSignal>> = {},
  fields: Partial<HealthPayload> = {},
): HealthPayload {
  return {
    timezone: "Europe/Kyiv",
    months,
    first_month: months[0] ?? null,
    covered_end: null,
    covers_now: true,
    export_limited: false,
    best_hour_mode: "unconstrained",
    nameplate_kwh: null,
    signals: {
      capacity: signal(),
      efficiency: signal(),
      solar_energy: signal(),
      best_hour: signal(),
      inverter: signal(),
      ...signals,
    },
    ...fields,
  };
}

describe("year lines", () => {
  it("puts the same month of two years in the same position", () => {
    const data = payload(monthsBetween("2024-03", "2025-05"), {
      capacity: signal({
        months: {
          "2024-03": { value: 10, reason: null, clean_hours: 30 },
          "2025-03": { value: 9.5, reason: null, clean_hours: 31 },
          "2025-05": { value: 9.2, reason: null, clean_hours: 25 },
        },
      }),
    });
    const lines = yearLines(data, "capacity");
    expect(lines.map((line) => line.year)).toEqual([2024, 2025]);
    for (const line of lines) expect(line.values).toHaveLength(12);
    expect(lines[0].values[2]).toBe(10);
    expect(lines[1].values[2]).toBe(9.5);
    expect(lines[1].values[4]).toBe(9.2);
    // Months before the window, and months with no figure, are gaps.
    expect(lines[0].values[0]).toBeNull();
    expect(lines[0].values[4]).toBeNull();
  });

  it("keeps a February present in one year and absent in the other as a gap", () => {
    const data = payload(monthsBetween("2024-01", "2025-12"), {
      solar_energy: signal({
        months: {
          "2024-01": { value: 80, reason: null },
          "2024-02": { value: 120, reason: null },
          "2024-03": { value: 250, reason: null },
          "2025-01": { value: 75, reason: null },
          "2025-03": { value: 240, reason: null },
        },
      }),
    });
    const [first, second] = yearLines(data, "solar_energy");
    expect(first.values.slice(0, 3)).toEqual([80, 120, 250]);
    expect(second.values.slice(0, 3)).toEqual([75, null, 240]);
  });

  it("draws a withheld month as a gap", () => {
    const data = payload(["2025-01"], {
      efficiency: signal({ months: { "2025-01": { value: null, reason: "drift" } } }),
    });
    expect(yearLines(data, "efficiency")[0].values[0]).toBeNull();
  });

  it("gives every year in the months even when the signal has none", () => {
    const data = payload(monthsBetween("2024-11", "2025-02"));
    const lines = yearLines(data, "inverter");
    expect(lines.map((line) => line.year)).toEqual([2024, 2025]);
    expect(lines.every((line) => line.values.every((value) => value === null))).toBe(true);
  });
});

describe("the last twelve months", () => {
  const months = monthsBetween("2024-01", "2025-12");

  it("sets each month beside the same month a year earlier", () => {
    const data = payload(months, {
      capacity: signal({
        months: {
          "2024-12": { value: 10, reason: null, clean_hours: 40 },
          "2025-12": { value: 9, reason: null, clean_hours: 40 },
          "2025-11": { value: null, reason: "too_few_clean_hours", clean_hours: 12 },
          "2024-11": { value: 10.5, reason: null, clean_hours: 40 },
          "2024-10": { value: 0, reason: null, clean_hours: 40 },
          "2025-10": { value: 8, reason: null, clean_hours: 40 },
        },
      }),
    });
    const rows = lastTwelveRows(data, "capacity");
    expect(rows).toHaveLength(12);
    expect(rows[0].key).toBe("2025-01");
    expect(rows[11]).toEqual({
      key: "2025-12",
      value: 9,
      reason: null,
      previousValue: 10,
      difference: -1,
      share: -0.1,
    });
    // Withheld this year: the reason stays, nothing is compared.
    expect(rows[10]).toEqual({
      key: "2025-11",
      value: null,
      reason: "too_few_clean_hours",
      previousValue: 10.5,
      difference: null,
      share: null,
    });
    // Zero a year earlier: a difference, but no share of nothing.
    expect(rows[9]).toMatchObject({ previousValue: 0, difference: 8, share: null });
  });

  it("has no previous value without the year before", () => {
    const data = payload(monthsBetween("2025-03", "2025-12"), {
      solar_energy: signal({ months: { "2025-12": { value: 60, reason: null } } }),
    });
    const rows = lastTwelveRows(data, "solar_energy");
    expect(rows).toHaveLength(10);
    expect(rows[9]).toEqual({
      key: "2025-12",
      value: 60,
      reason: null,
      previousValue: null,
      difference: null,
      share: null,
    });
    // A month absent from the signal is a gap with no reason.
    expect(rows[0]).toMatchObject({ value: null, reason: null });
  });
});

describe("the twelve-against-twelve figure", () => {
  it("says how many months each side has below six", () => {
    const view = comparisonView(
      signal({ comparison: comparison({ recent_months: 5, previous_months: 6 }) }),
    );
    expect(view).toEqual({ kind: "notEnough", recent: 5, previous: 6 });
  });

  it("shows the means and the change at six a side", () => {
    const view = comparisonView(
      signal({
        comparison: comparison({
          recent_mean: 9.4,
          previous_mean: 9.8,
          change: -0.4,
          recent_months: 6,
          previous_months: 6,
        }),
      }),
    );
    expect(view).toEqual({ kind: "figure", recent: 9.4, previous: 9.8, change: -0.4 });
  });
});

describe("the captions", () => {
  it("names the hours the best hour was read from", () => {
    const months = ["2025-01"];
    expect(bestHourCaption(payload(months, {}, { best_hour_mode: "unconstrained" }))).toBe(
      "unconstrained",
    );
    expect(bestHourCaption(payload(months, {}, { best_hour_mode: "all" }))).toBe("all");
  });

  it("says the energy follows the house only when export is limited", () => {
    const months = ["2025-01"];
    expect(energyCaption(payload(months, {}, { export_limited: true }))).toBe("household");
    expect(energyCaption(payload(months, {}, { export_limited: false }))).toBe("array");
    expect(energyCaption(payload(months, {}, { export_limited: null }))).toBe("array");
  });
});
