/**
 * The words the three sizing verdicts are printed in.
 *
 * Kept apart from the tab because they are the only part of it a test can
 * reach: there is no DOM environment here (see docs/known-gaps.md), so the
 * copy that has to stay exact lives in pure functions and the element only
 * arranges what they return.
 */
import type { Messages } from "./i18n/en";
import type { SizingCardKey, Verdict } from "./types";

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
  return card === "battery" && reason === "never_full"
    ? m.verdict.hintNeverFilled
    : m.verdict.hintNoData;
}
