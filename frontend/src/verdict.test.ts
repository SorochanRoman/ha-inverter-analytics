import { describe, expect, it } from "vitest";
import { reasonHint, reasonSentence, verdictLabel } from "./verdict";

describe("verdict copy", () => {
  it("names each verdict", () => {
    expect(verdictLabel("enough")).toBe("Enough");
    expect(verdictLabel("borderline")).toBe("Borderline");
    expect(verdictLabel("short")).toBe("Short");
    expect(verdictLabel(null)).toBe("No verdict");
  });

  it("explains why a verdict is withheld, per card", () => {
    expect(reasonSentence("battery", "never_full")).toMatch(/never filled/);
    expect(reasonSentence("inverter", "no_data")).toMatch(/no statistics/);
    expect(reasonSentence("solar", "no_data")).toMatch(/no statistics/);
  });

  it("falls back to the no-data sentence for a reason it has never heard of", () => {
    // A block can arrive with no reason at all — a mapped entity that no
    // longer exists — and the card must still print a sentence.
    expect(reasonSentence("battery", "no_data")).toMatch(/no statistics/);
    expect(reasonSentence("solar", "something_new")).toBe(reasonSentence("solar", "no_data"));
  });

  it("tells a never-filled month apart from an unmeasured one in a cell", () => {
    expect(reasonHint("battery", "never_full")).toBe("never filled");
    expect(reasonHint("battery", "no_data")).toBe("no data");
    expect(reasonHint("solar", "never_full")).toBe("no data");
  });
});
