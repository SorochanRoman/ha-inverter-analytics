import { describe, expect, it } from "vitest";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import { RANGE_KEYS, rangeLabel, rangesView, resolveRange } from "./range";

const NOW = new Date("2026-08-29T12:00:00Z");

describe("resolveRange", () => {
  it("24h ends now and starts a day earlier", () => {
    const { start, end } = resolveRange("24h", NOW);
    expect(end.toISOString()).toBe(NOW.toISOString());
    expect(end.getTime() - start.getTime()).toBe(24 * 3600 * 1000);
  });

  it("30d spans thirty days", () => {
    const { start, end } = resolveRange("30d", NOW);
    expect(end.getTime() - start.getTime()).toBe(30 * 24 * 3600 * 1000);
  });

  it("month starts at the first day of the current month", () => {
    const { start } = resolveRange("month", NOW);
    expect(start.getDate()).toBe(1);
    expect(start.getHours()).toBe(0);
    expect(start.getMonth()).toBe(NOW.getMonth());
  });

  it("year spans 365 days", () => {
    const { start, end } = resolveRange("year", NOW);
    expect(end.getTime() - start.getTime()).toBe(365 * 24 * 3600 * 1000);
  });

  it("quantises end to the minute", () => {
    const { end } = resolveRange("24h", new Date("2026-08-29T12:00:47.328Z"));
    expect(end.getSeconds()).toBe(0);
    expect(end.getMilliseconds()).toBe(0);
  });

  it("produces an identical end for calls a few hundred milliseconds apart", () => {
    const a = resolveRange("24h", new Date("2026-08-29T12:00:00.100Z"));
    const b = resolveRange("24h", new Date("2026-08-29T12:00:00.750Z"));
    expect(a.end.getTime()).toBe(b.end.getTime());
  });
});

describe("resolveRange end", () => {
  it("ends at the quantised present for every range", () => {
    // Checked once for all keys: the span assertions pass whatever the end is,
    // so a range that ended a day late would have gone unnoticed.
    const now = new Date("2026-08-29T12:00:30.500Z");
    const expected = new Date("2026-08-29T12:00:00Z").toISOString();
    for (const key of RANGE_KEYS) {
      expect(resolveRange(key, now).end.toISOString(), key).toBe(expected);
    }
  });

  it("month ends now rather than at the end of the month", () => {
    const { start, end } = resolveRange("month", NOW);
    expect(end.toISOString()).toBe(NOW.toISOString());
    expect(start.getTime()).toBeLessThan(end.getTime());
  });
});

describe("rangeLabel", () => {
  it("names the periods in both languages", () => {
    expect(rangeLabel(en, "7d")).toBe("7 days");
    expect(rangeLabel(uk, "7d")).toBe("7 днів");
    expect(rangeLabel(uk, "month")).toBe("Цей місяць");
  });
});

describe("rangesView", () => {
  it("names the group as the period on a windowed tab, with no note", () => {
    expect(rangesView(en, "load")).toEqual({ unused: false, label: "Period", note: null });
    expect(rangesView(uk, "sizing").label).toBe("Період");
  });

  it("says, in the label and in visible text, that Health does not use the period", () => {
    expect(rangesView(en, "health")).toEqual({
      unused: true,
      label: en.health.periodNotUsed,
      note: en.health.periodNotUsed,
    });
    expect(rangesView(uk, "health").note).toBe(uk.health.periodNotUsed);
  });
});
