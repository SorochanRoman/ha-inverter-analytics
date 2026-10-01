import { describe, expect, it } from "vitest";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import { reasonHint, reasonSentence, verdictLabel } from "./verdict";

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
