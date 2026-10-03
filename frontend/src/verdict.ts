/**
 * The words the three sizing verdicts are printed in.
 *
 * Kept apart from the tab because they are the only part of it a test can
 * reach: there is no DOM environment here (see docs/known-gaps.md), so the
 * copy that has to stay exact lives in pure functions and the element only
 * arranges what they return.
 */
import type { Messages } from "./i18n/en";
import type { SizingCardKey, SizingPayload, Verdict } from "./types";

export function verdictLabel(m: Messages, verdict: Verdict | null): string {
  switch (verdict) {
    case "enough":
      return m.verdict.enough;
    case "borderline":
      return m.verdict.borderline;
    case "short":
      return m.verdict.short;
    default:
      return m.verdict.none;
  }
}

/**
 * Why a verdict is withheld, in a sentence the card can print.
 *
 * Any reason this does not recognise falls back to "no statistics": a block
 * that arrives without one at all — a mapped entity that has since been
 * deleted — must still be explained rather than rendered as an empty card.
 */
export function reasonSentence(m: Messages, card: SizingCardKey, reason: string): string {
  if (card === "battery" && reason === "never_full") return m.verdict.neverFull;
  if (card === "solar" && reason === "no_fill") return m.verdict.noFill;
  return m.verdict.noData[card];
}

/**
 * The same reason in the two or three words a month cell has room for.
 *
 * A month the battery never filled and a month with no statistics at all are
 * both "No verdict" in the strip, and they are not the same reading: the
 * first is the tab's own rule doing its job, the second is missing data.
 */
export function reasonHint(m: Messages, card: SizingCardKey, reason: string): string {
  if (card === "battery" && reason === "never_full") return m.verdict.hintNeverFilled;
  if (card === "solar" && reason === "no_fill") return m.verdict.hintNoFill;
  return m.verdict.hintNoData;
}

/**
 * Whether the solar verdict tested the battery filling, so the rule can say so.
 *
 * The backend skips the fill test whenever the span has no fill share: no
 * charge sensor, thresholds inverted so the charge is never read, or a charge
 * sensor with no rows in the span. A withheld block still carries its
 * evidence, so the period block answers when there is one; without it the
 * battery card's configuration is the best guess.
 */
export function solarFillTested(payload: SizingPayload): boolean {
  const solar = payload.period.solar;
  if (solar) return typeof solar.evidence.fill_share === "number";
  const battery = payload.cards.battery;
  return !battery.missing.length && !battery.thresholds_inverted;
}

/**
 * Which of the three Sun rules the verdict was read by.
 *
 * A system that kept its production in cannot show production above
 * consumption, so the backend judges its sun by days at the charge limit
 * instead; that rule wins whenever `export_limited` is true. An unknown
 * decision (null) is read as exporting, as the backend reads it. Otherwise the
 * fill clause is printed only when the fill was tested (see solarFillTested).
 */
export function solarRuleKind(payload: SizingPayload): "no_export" | "with_fill" | "plain" {
  if (payload.rules.export_limited === true) return "no_export";
  return solarFillTested(payload) ? "with_fill" : "plain";
}
