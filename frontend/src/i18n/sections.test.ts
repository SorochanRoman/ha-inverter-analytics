import { describe, expect, it } from "vitest";
import { en } from "./en";
import { uk } from "./uk";

describe("the section sentences that count", () => {
  it("say points and phases in English as before", () => {
    expect(en.sections.charge.driftBelow({ n: 7 })).toMatch(/^The charge ended 7 points below/);
    expect(en.sections.phases.derivedRating({ n: 3, rating: "4 kW" })).toContain(
      "split across 3 phases — 4 kW each.",
    );
  });

  it("inflect the noun by the count in Ukrainian", () => {
    expect(uk.sections.charge.driftAbove({ n: 21 })).toContain("на 21 пункт вищим");
    expect(uk.sections.charge.driftAbove({ n: 6 })).toContain("на 6 пунктів вищим");
    expect(uk.sections.charge.driftBelow({ n: 3 })).toContain("на 3 пункти нижчим");
    expect(uk.sections.phases.derivedRating({ n: 3, rating: "4 кВт" })).toContain("на 3 фази —");
    expect(uk.sections.phases.derivedRating({ n: 5, rating: "4 кВт" })).toContain("на 5 фаз —");
  });
});
