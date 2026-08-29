import { describe, expect, it } from "vitest";
import { formatDuration, formatPercent, formatPower } from "./format";

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
    expect(formatDuration(420)).toBe("7 хв");
  });

  it("renders hours and minutes above an hour", () => {
    expect(formatDuration(3900)).toBe("1 год 5 хв");
  });

  it("renders seconds below a minute", () => {
    expect(formatDuration(45)).toBe("45 с");
  });
});
