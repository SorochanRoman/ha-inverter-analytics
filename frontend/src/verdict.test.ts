import { describe, expect, it } from "vitest";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import type { SizingCard, SizingPayload, VerdictBlock } from "./types";
import { reasonHint, reasonSentence, solarFillTested, verdictLabel } from "./verdict";

describe("verdict copy", () => {
  it("names each verdict", () => {
    expect(verdictLabel(en, "enough")).toBe("Enough");
    expect(verdictLabel(en, "borderline")).toBe("Borderline");
    expect(verdictLabel(en, "short")).toBe("Short");
    expect(verdictLabel(en, null)).toBe("No verdict");
  });

  it("explains why a verdict is withheld, per card", () => {
    expect(reasonSentence(en, "battery", "never_full")).toMatch(/never filled/);
    expect(reasonSentence(en, "inverter", "no_data")).toMatch(/no statistics/);
    expect(reasonSentence(en, "solar", "no_data")).toMatch(/no statistics/);
  });

  it("falls back to the no-data sentence for a reason it has never heard of", () => {
    // A block can arrive with no reason at all — a mapped entity that no
    // longer exists — and the card must still print a sentence.
    expect(reasonSentence(en, "battery", "no_data")).toMatch(/no statistics/);
    expect(reasonSentence(en, "solar", "something_new")).toBe(reasonSentence(en, "solar", "no_data"));
  });

  it("tells a never-filled month apart from an unmeasured one in a cell", () => {
    expect(reasonHint(en, "battery", "never_full")).toBe("never filled");
    expect(reasonHint(en, "battery", "no_data")).toBe("no data");
    expect(reasonHint(en, "solar", "never_full")).toBe("no data");
  });

  it("prints the verdicts in Ukrainian", () => {
    expect(verdictLabel(uk, "enough")).toBe("Достатньо");
    expect(verdictLabel(uk, "borderline")).toBe("На межі");
    expect(verdictLabel(uk, "short")).toBe("Замало");
    expect(verdictLabel(uk, null)).toBe("Без вердикту");
  });
});

describe("whether the solar rule tested the battery filling", () => {
  const solarBlock = (fill: number | null): VerdictBlock => ({
    verdict: "enough",
    reason: null,
    evidence: {
      pv_kwh: 100,
      load_kwh: 90,
      production_share: 1.1,
      self_sufficiency: 0.8,
      fill_share: fill,
    },
    coverage: 1,
  });
  const payload = (
    solar: VerdictBlock | null,
    battery: SizingCard = { missing: [], no_statistics: [] },
  ): SizingPayload =>
    ({
      period: { inverter: null, battery: null, solar },
      cards: {
        inverter: { missing: [], no_statistics: [] },
        battery,
        solar: { missing: [], no_statistics: [] },
      },
    }) as unknown as SizingPayload;

  it("says no when the charge sensor is not mapped", () => {
    const unmapped = { missing: ["battery_soc"], no_statistics: [] };
    expect(solarFillTested(payload(solarBlock(null), unmapped))).toBe(false);
    expect(solarFillTested(payload(null, unmapped))).toBe(false);
  });

  it("says no when the battery thresholds are inverted", () => {
    const inverted = { missing: [], no_statistics: [], thresholds_inverted: true };
    expect(solarFillTested(payload(solarBlock(null), inverted))).toBe(false);
    expect(solarFillTested(payload(null, inverted))).toBe(false);
  });

  it("says no when the span has no fill share, even with the battery mapped", () => {
    expect(solarFillTested(payload(solarBlock(null)))).toBe(false);
  });

  it("says yes when the fill share was measured", () => {
    expect(solarFillTested(payload(solarBlock(0.5)))).toBe(true);
  });

  it("falls back to the battery mapping when there is no period verdict", () => {
    expect(solarFillTested(payload(null))).toBe(true);
  });
});
