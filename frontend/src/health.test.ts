import { describe, expect, it } from "vitest";
import {
  COMPARISON_MIN_MONTHS,
  HEALTH_CARDS,
  bestHourCaption,
  chartLines,
  comparisonView,
  energyCaption,
  formatHealthDifference,
  formatHealthShare,
  formatHealthValue,
  healthDefinitions,
  healthReason,
  lastTwelveRows,
  nameplateLine,
  yearLines,
} from "./health";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
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
    expect(view).toEqual({ kind: "notEnough", recent: 5, previous: 6, needed: 6 });
    expect(COMPARISON_MIN_MONTHS).toBe(6);
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
    expect(view).toMatchObject({ kind: "figure", recent: 9.4, previous: 9.8, change: -0.4 });
    expect(view.kind === "figure" && view.share).toBeCloseTo(-0.4 / 9.8);
  });

  it("has no share of an earlier mean of zero", () => {
    const view = comparisonView(
      signal({
        comparison: comparison({
          recent_mean: 3,
          previous_mean: 0,
          change: 3,
          recent_months: 12,
          previous_months: 12,
        }),
      }),
    );
    expect(view).toMatchObject({ kind: "figure", change: 3, share: null });
  });

  it("words the not-enough case without a fixed count in the sentence", () => {
    expect(en.health.notEnough({ recent: 9, previous: 2, needed: 6 })).toBe(
      "Not enough months to compare: the last 12 have 9 with a figure and the 12 before " +
        "have 2; each side needs 6.",
    );
    expect(en.health.notEnough({ recent: 9, previous: 2, needed: 7 })).toContain("needs 7");
    expect(uk.health.notEnough({ recent: 9, previous: 2, needed: 7 })).toContain("потрібно 7");
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

describe("the cards", () => {
  it("cover every signal once, the solar card holding two", () => {
    const signals = HEALTH_CARDS.flatMap((card) => card.signals);
    expect(signals.sort()).toEqual(
      ["best_hour", "capacity", "efficiency", "inverter", "solar_energy"].sort(),
    );
    expect(HEALTH_CARDS.find((card) => card.key === "solar")?.signals).toEqual([
      "solar_energy",
      "best_hour",
    ]);
  });
});

describe("figures in their units", () => {
  it("formats a value per signal", () => {
    expect(formatHealthValue("capacity", 9.46, en, "en")).toBe("9.5 kWh");
    expect(formatHealthValue("solar_energy", 412, en, "en")).toBe("412 kWh");
    expect(formatHealthValue("efficiency", 0.912, en, "en")).toBe("91.2%");
    expect(formatHealthValue("best_hour", 5230, en, "en")).toBe("5.2 kW");
    expect(formatHealthValue("inverter", 14.25, en, "en")).toBe("14.3 h");
    expect(formatHealthValue("capacity", null, en, "en")).toBe("—");
  });

  it("signs a difference, and puts efficiency in points", () => {
    expect(formatHealthDifference("capacity", -0.42, en, "en")).toBe("-0.4 kWh");
    expect(formatHealthDifference("solar_energy", 12, en, "en")).toBe("+12 kWh");
    expect(formatHealthDifference("efficiency", -0.021, en, "en")).toBe("-2.1 pp");
    expect(formatHealthDifference("efficiency", -0.021, uk, "uk")).toMatch(/2,1 в\.п\.$/);
    expect(formatHealthDifference("best_hour", -250, en, "en")).toBe("-250 W");
    expect(formatHealthDifference("best_hour", 1200, en, "en")).toBe("+1.2 kW");
    expect(formatHealthDifference("inverter", 0, en, "en")).toBe("0 h");
    expect(formatHealthDifference("inverter", null, en, "en")).toBe("—");
  });

  it("signs a share", () => {
    expect(formatHealthShare(-0.1, "en")).toBe("-10%");
    expect(formatHealthShare(0.025, "en")).toBe("+2.5%");
    expect(formatHealthShare(null, "en")).toBe("—");
  });
});

describe("the chart lines", () => {
  const data = payload(["2025-01"], {
    efficiency: signal({ months: { "2025-01": { value: 0.9, reason: null } } }),
    best_hour: signal({ months: { "2025-01": { value: 5200, reason: null } } }),
    capacity: signal({ months: { "2025-01": { value: 9.5, reason: null, clean_hours: 30 } } }),
  });

  it("draws efficiency in percent and the best hour in kilowatts", () => {
    const efficiency = chartLines(data, "efficiency", en);
    expect(efficiency.unit).toBe("%");
    expect(efficiency.lines[0].values[0]).toBeCloseTo(90);
    expect(efficiency.lines[0].values[1]).toBeNull();
    const best = chartLines(data, "best_hour", en);
    expect(best.unit).toBe("kW");
    expect(best.lines[0].values[0]).toBeCloseTo(5.2);
    expect(chartLines(data, "capacity", uk)).toMatchObject({ unit: "кВт·год" });
    expect(chartLines(data, "capacity", en).lines[0].values[0]).toBe(9.5);
    expect(chartLines(data, "inverter", en).unit).toBe("h");
  });

  it("draws the nameplate only on capacity, and only when it is set", () => {
    expect(nameplateLine(data, "capacity", en, "en")).toBeNull();
    const set = payload(["2025-01"], {}, { nameplate_kwh: 10.24 });
    expect(nameplateLine(set, "capacity", en, "en")).toEqual({
      value: 10.24,
      name: "Nameplate 10.2 kWh",
    });
    expect(nameplateLine(set, "efficiency", en, "en")).toBeNull();
  });
});

describe("the reasons", () => {
  it("prints the count a month had and the one it needed", () => {
    expect(
      healthReason(en, "too_few_clean_hours", { value: null, reason: null, clean_hours: 12 }, "en"),
    ).toBe(
      "Only 12 clean discharge hours this month; it needs 20, or one strange hour moves the figure.",
    );
    expect(
      healthReason(en, "curtailed", { value: null, reason: null, unconstrained_hours: 1 }, "en"),
    ).toContain("Only 1 hour of sun the system could take in full; the best hour needs 10.");
    expect(healthReason(en, "drift", undefined, "en")).toContain("more than 5 points");
    expect(healthReason(en, "too_little_throughput", undefined, "en")).toContain(
      "Less than 1 kWh",
    );
    expect(healthReason(en, "no_soc", undefined, "en")).toBe(en.health.reasons.no_soc);
    expect(healthReason(en, "soc_partial", undefined, "en")).toBe(en.health.reasons.soc_partial);
  });

  it("says a part of a month is not set beside a whole one", () => {
    expect(healthReason(en, "partial_month", undefined, "en")).toBe(
      "Only part of this month has statistics, and a part is not compared with a whole month.",
    );
    expect(healthReason(uk, "partial_month", undefined, "uk")).toBe(
      uk.health.reasons.partial_month,
    );
  });

  it("counts zero when the month did not say", () => {
    expect(healthReason(en, "too_few_clean_hours", undefined, "en")).toContain("Only 0");
  });
});

describe("the definitions", () => {
  it("print the constants they rest on", () => {
    const d = healthDefinitions(en, "en");
    // formatEnergy would round this to "0 kWh".
    expect(d.capacity).toContain("at most 0.02 kWh");
    expect(d.capacity).toContain("at least 3 points");
    expect(d.capacity).toContain("needs 20 such hours");
    expect(d.efficiency).toContain("more than 5 points");
    expect(d.efficiency).toContain("less than 1 kWh");
    expect(d.solar).toContain("needs 10 other hours of sun at or above 100 W");
    expect(d.inverter).toContain("reached 80% of it");
  });

  it("use the locale's decimal mark", () => {
    expect(healthDefinitions(uk, "uk").capacity).toContain("0,02 кВт·год");
  });
});
