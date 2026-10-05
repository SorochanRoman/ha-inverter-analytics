import { describe, expect, it } from "vitest";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import type { SizingCard, SizingPayload, VerdictBlock } from "./types";
import {
  fullModeNote,
  reasonHint,
  reasonSentence,
  solarCellFigure,
  solarFillTested,
  solarRuleKind,
  verdictLabel,
} from "./verdict";

describe("verdict copy", () => {
  it("names each verdict", () => {
    expect(verdictLabel(en, "enough")).toBe("Enough");
    expect(verdictLabel(en, "borderline")).toBe("Borderline");
    expect(verdictLabel(en, "short")).toBe("Short");
    expect(verdictLabel(en, null)).toBe("No verdict");
  });

  it("explains why a verdict is withheld, per card", () => {
    expect(reasonSentence(en, "battery", "never_full", "fixed")).toMatch(/never filled/);
    expect(reasonSentence(en, "inverter", "no_data", "fixed")).toMatch(/no statistics/);
    expect(reasonSentence(en, "solar", "no_data", "fixed")).toMatch(/no statistics/);
  });

  it("falls back to the no-data sentence for a reason it has never heard of", () => {
    // A block can arrive with no reason at all — a mapped entity that no
    // longer exists — and the card must still print a sentence.
    expect(reasonSentence(en, "battery", "no_data", "fixed")).toMatch(/no statistics/);
    expect(reasonSentence(en, "solar", "something_new", "fixed")).toBe(
      reasonSentence(en, "solar", "no_data", "fixed"),
    );
  });

  it("tells a never-filled month apart from an unmeasured one in a cell", () => {
    expect(reasonHint(en, "battery", "never_full", "fixed")).toBe("never filled");
    expect(reasonHint(en, "battery", "no_data", "fixed")).toBe("no data");
    expect(reasonHint(en, "solar", "never_full", "fixed")).toBe("no data");
  });

  it("says a no-export span had no charge data to read the sun from, in either mode", () => {
    for (const mode of ["ceiling", "fixed"] as const) {
      expect(reasonSentence(en, "solar", "no_fill", mode)).toBe(
        "With no export the sun is read from how often the battery filled, and there is no " +
          "charge data for this span.",
      );
      expect(reasonHint(en, "solar", "no_fill", mode)).toBe("no charge data");
      expect(reasonSentence(uk, "solar", "no_fill", mode)).toBe(uk.verdict.noFill);
      expect(reasonHint(uk, "solar", "no_fill", mode)).toBe(uk.verdict.hintNoFill);
    }
    // The reason belongs to the sun; on another card it is still unknown.
    expect(reasonSentence(en, "battery", "no_fill", "fixed")).toBe(en.verdict.noData.battery);
    expect(reasonHint(en, "battery", "no_fill", "fixed")).toBe("no data");
  });

  it("says the battery never reached its limit when full is the charge limit", () => {
    expect(reasonSentence(en, "battery", "never_full", "ceiling")).toBe(
      "The battery never reached its charge limit in this span, so the nights say nothing " +
        "about its size.",
    );
    expect(reasonHint(en, "battery", "never_full", "ceiling")).toBe("limit not reached");
    expect(reasonSentence(en, "battery", "never_full", "fixed")).toBe(en.verdict.neverFull);
    expect(reasonHint(en, "battery", "never_full", "fixed")).toBe("never filled");
    expect(reasonSentence(uk, "battery", "never_full", "ceiling")).toBe(
      uk.verdict.neverReachedLimit,
    );
    expect(reasonHint(uk, "battery", "never_full", "ceiling")).toBe(uk.verdict.hintLimitNotReached);
    // The mode changes only the never-full words.
    expect(reasonSentence(en, "battery", "no_data", "ceiling")).toBe(en.verdict.noData.battery);
    expect(reasonHint(en, "battery", "no_data", "ceiling")).toBe("no data");
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

describe("which sun rule the payload was read by", () => {
  const fill = (share: number | null): VerdictBlock => ({
    verdict: "enough",
    reason: null,
    evidence: {
      pv_kwh: 100,
      load_kwh: 90,
      production_share: 1.1,
      self_sufficiency: 0.8,
      fill_share: share,
    },
    coverage: 1,
  });
  const payloadWith = (opts: {
    export_limited?: boolean | null;
    full_mode?: "ceiling" | "fixed";
    solar?: VerdictBlock | null;
  }): SizingPayload =>
    ({
      rules: {
        export_limited: opts.export_limited ?? null,
        full_mode: opts.full_mode ?? "ceiling",
      },
      period: { inverter: null, battery: null, solar: opts.solar ?? null },
      cards: {
        inverter: { missing: [], no_statistics: [] },
        battery: { missing: [], no_statistics: [] },
        solar: { missing: [], no_statistics: [] },
      },
    }) as unknown as SizingPayload;

  it("picks the no-export sun rule when export is limited", () => {
    expect(solarRuleKind(payloadWith({ export_limited: true }))).toBe("no_export");
    expect(solarRuleKind(payloadWith({ export_limited: true, solar: fill(null) }))).toBe(
      "no_export",
    );
  });

  it("picks the fixed no-export rule when export is limited and full is the fixed mark", () => {
    expect(solarRuleKind(payloadWith({ export_limited: true, full_mode: "fixed" }))).toBe(
      "no_export_fixed",
    );
  });

  it("ignores the full mode when the system exports", () => {
    for (const full_mode of ["ceiling", "fixed"] as const) {
      expect(
        solarRuleKind(payloadWith({ export_limited: false, full_mode, solar: fill(0.5) })),
      ).toBe("with_fill");
      expect(
        solarRuleKind(payloadWith({ export_limited: false, full_mode, solar: fill(null) })),
      ).toBe("plain");
    }
  });

  it("picks the fill rule when the system exports and the fill was tested", () => {
    expect(solarRuleKind(payloadWith({ export_limited: false, solar: fill(0.5) }))).toBe(
      "with_fill",
    );
  });

  it("reads an unknown export decision as exporting", () => {
    expect(solarRuleKind(payloadWith({ export_limited: null, solar: fill(0.5) }))).toBe(
      "with_fill",
    );
  });

  it("falls back to the plain rule when the fill was not tested", () => {
    expect(solarRuleKind(payloadWith({ export_limited: false, solar: fill(null) }))).toBe(
      "plain",
    );
  });
});

describe("which full the note says was read", () => {
  const payloadWith = (opts: {
    full_mode?: "ceiling" | "fixed";
    ceiling_missing?: string[];
    ceiling_no_rows?: string[];
    battery_missing?: string[];
  }): SizingPayload =>
    ({
      rules: {
        full_mode: opts.full_mode ?? "fixed",
        full_pct: 95,
        ceiling_missing: opts.ceiling_missing ?? [],
        ceiling_no_rows: opts.ceiling_no_rows ?? [],
      },
      cards: {
        inverter: { missing: [], no_statistics: [] },
        battery: { missing: opts.battery_missing ?? [], no_statistics: [] },
        solar: { missing: [], no_statistics: [] },
      },
    }) as unknown as SizingPayload;

  it("says the charge limit was read in ceiling mode", () => {
    expect(fullModeNote(en, payloadWith({ full_mode: "ceiling" }), "95%")).toBe(
      en.sizing.fullModeCeiling,
    );
  });

  it("names only the roles that are not mapped", () => {
    expect(fullModeNote(en, payloadWith({ ceiling_missing: ["pv_power"] }), "95%")).toBe(
      "Full means a charge of at least 95%. Map PV power to read the battery's own limit " +
        "instead.",
    );
    expect(
      fullModeNote(en, payloadWith({ ceiling_missing: ["battery_power", "pv_power"] }), "95%"),
    ).toBe(
      "Full means a charge of at least 95%. Map Battery power and PV power to read the " +
        "battery's own limit instead.",
    );
  });

  it("does not ask to map a sensor that is mapped but kept no statistics", () => {
    expect(fullModeNote(en, payloadWith({ ceiling_no_rows: ["battery_power"] }), "95%")).toBe(
      "Battery power keeps no statistics for this period, so full is the fixed mark of 95%.",
    );
    expect(
      fullModeNote(en, payloadWith({ ceiling_no_rows: ["battery_power", "pv_power"] }), "95%"),
    ).toBe(
      "Battery power and PV power keep no statistics for this period, so full is the fixed " +
        "mark of 95%.",
    );
  });

  it("prefers the unmapped roles when both lists have some", () => {
    const note = fullModeNote(
      en,
      payloadWith({
        ceiling_missing: ["pv_power"],
        ceiling_no_rows: ["battery_power"],
      }),
      "95%",
    );
    expect(note).toMatch(/^Full means a charge of at least 95%\. Map PV power/);
  });

  it("states the fixed mark alone when no reason is known", () => {
    expect(fullModeNote(en, payloadWith({}), "95%")).toBe("Full means a charge of at least 95%.");
  });

  it("skips the note when the charge sensor is not mapped", () => {
    const unmapped = payloadWith({
      battery_missing: ["battery_soc"],
      ceiling_missing: ["pv_power"],
    });
    expect(fullModeNote(en, unmapped, "95%")).toBeNull();
  });

  it("says the same in Ukrainian, with the roles quoted", () => {
    expect(fullModeNote(uk, payloadWith({ ceiling_missing: ["pv_power"] }), "95%")).toBe(
      "Повний заряд означає рівень заряду щонайменше 95%. Вкажіть «Потужність СЕС», щоб " +
        "натомість зчитувати власний ліміт заряду батареї.",
    );
    expect(fullModeNote(uk, payloadWith({ ceiling_no_rows: ["battery_power"] }), "95%")).toBe(
      "Сенсор «Потужність батареї» не має статистики за цей період, тож повний заряд " +
        "визначається фіксованою позначкою 95%.",
    );
    expect(
      fullModeNote(uk, payloadWith({ ceiling_no_rows: ["battery_power", "pv_power"] }), "95%"),
    ).toBe(
      "Сенсори «Потужність батареї» і «Потужність СЕС» не мають статистики за цей період, " +
        "тож повний заряд визначається фіксованою позначкою 95%.",
    );
    expect(fullModeNote(uk, payloadWith({}), "95%")).toBe(
      "Повний заряд означає рівень заряду щонайменше 95%.",
    );
  });
});

describe("the Sun's month cell", () => {
  const evidence = { production_share: 1.04, fill_share: 0.61 };

  it("shows the share of load under the export rule", () => {
    expect(solarCellFigure(en, false, evidence, "en")).toBe("104% of load");
    // An unknown decision is read as exporting, as the backend reads it.
    expect(solarCellFigure(en, null, evidence, "en")).toBe("104% of load");
  });

  it("shows the fill share under the no-export rule, which decided the verdict", () => {
    expect(solarCellFigure(en, true, evidence, "en")).toBe("filled on 61% of days");
    expect(solarCellFigure(uk, true, evidence, "uk")).toBe("повний заряд у 61% днів");
  });

  it("shows a dash when the figure its rule reads is missing", () => {
    expect(solarCellFigure(en, true, { production_share: 1.04, fill_share: null }, "en")).toBe(
      "—",
    );
    expect(solarCellFigure(en, true, { production_share: 1.04 }, "en")).toBe("—");
    expect(solarCellFigure(en, false, { production_share: null, fill_share: 0.61 }, "en")).toBe(
      "—",
    );
  });
});
