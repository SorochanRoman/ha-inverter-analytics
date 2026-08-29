import { describe, expect, it } from "vitest";
import {
  coverageWarning,
  describeError,
  formatDuration,
  formatPercent,
  formatPower,
  precisionLabel,
} from "./format";

describe("formatPower", () => {
  it("shows watts below a kilowatt", () => {
    expect(formatPower(950, "en")).toBe("950 W");
  });

  it("switches to kilowatts above a kilowatt", () => {
    expect(formatPower(6800, "en")).toBe("6.8 kW");
  });

  it("renders a dash for missing values", () => {
    expect(formatPower(null, "en")).toBe("—");
  });
});

describe("formatPercent", () => {
  it("renders a fraction as a percentage", () => {
    expect(formatPercent(0.024, "en")).toBe("2.4%");
  });

  it("renders a dash for missing values", () => {
    expect(formatPercent(null, "en")).toBe("—");
  });
});

describe("formatDuration", () => {
  it("renders minutes below an hour", () => {
    expect(formatDuration(420)).toBe("7 min");
  });

  it("renders hours and minutes above an hour", () => {
    expect(formatDuration(3900)).toBe("1 h 5 min");
  });

  it("renders seconds below a minute", () => {
    expect(formatDuration(45)).toBe("45 s");
  });
});

describe("describeError", () => {
  it("extracts the message from an HA-shaped error object", () => {
    expect(describeError({ code: "invalid_window", message: "Window end must be later than its start" })).toBe(
      "Window end must be later than its start",
    );
  });

  it("extracts the message from a plain Error", () => {
    expect(describeError(new Error("boom"))).toContain("boom");
  });

  it("passes a bare string through", () => {
    expect(describeError("something went wrong")).toBe("something went wrong");
  });

  it("falls back to String() for an object without a message", () => {
    expect(describeError({ code: "not_found" })).toBe(String({ code: "not_found" }));
  });
});

describe("precisionLabel", () => {
  it("labels raw precision", () => {
    expect(precisionLabel("raw", null, "en")).toBe("Exact data");
  });

  it("labels lts precision", () => {
    expect(precisionLabel("lts", null, "en")).toBe("Hourly averages");
  });

  it("labels mixed precision with the boundary date", () => {
    expect(precisionLabel("mixed", "2026-08-01T00:00:00Z", "en")).toBe(
      `Mixed since ${new Date("2026-08-01T00:00:00Z").toLocaleDateString("en")}`,
    );
  });

  it("labels mixed precision without a boundary", () => {
    expect(precisionLabel("mixed", null, "en")).toBe("Mixed");
  });
});

describe("coverageWarning", () => {
  it("stays silent when coverage is good", () => {
    expect(coverageWarning(0.99, "uk")).toBeNull();
  });

  it("says data exists rather than how much is missing", () => {
    const text = coverageWarning(0.4, "uk");
    expect(text).toContain("40%");
    expect(text).not.toContain("missing");
  });

  it("avoids a bogus 100% when a sliver of data exists", () => {
    // A 30-day window with two minutes of history: it used to say "100%
    // missing" right next to populated KPIs.
    expect(coverageWarning(0.00005, "uk")).toBe("Data covers less than 1% of the period");
  });

  it("says plainly when there is no data at all", () => {
    expect(coverageWarning(0, "uk")).toBe("No data for this period");
  });
});
