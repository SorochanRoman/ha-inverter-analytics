/**
 * What the Health cards show, decided apart from the tab.
 *
 * There is no DOM environment for tests here (see docs/known-gaps.md), so the
 * choices that have to stay right — which month sits in which vertical, when
 * a difference is printed, when the twelve-against-twelve figure appears —
 * live in pure functions, and the tab only renders what they return.
 */
import type {
  HealthPayload,
  HealthReason,
  HealthSignal,
  HealthSignalKey,
} from "./types";

export interface YearLine {
  year: number;
  /** Twelve values by calendar month; null is a gap, never a zero. */
  values: (number | null)[];
}

export interface TwelveRow {
  key: string;
  value: number | null;
  reason: HealthReason | null;
  /** The same month a year earlier. */
  previousValue: number | null;
  difference: number | null;
  /** The difference as a share of the year-earlier figure. */
  share: number | null;
}

export type ComparisonView =
  | { kind: "figure"; recent: number; previous: number; change: number }
  | { kind: "notEnough"; recent: number; previous: number };

const MONTHS_IN_YEAR = 12;

function valueOf(signal: HealthSignal, key: string): number | null {
  return signal.months[key]?.value ?? null;
}

function yearEarlier(key: string): string {
  const [year, month] = key.split("-");
  return `${Number(year) - 1}-${month}`;
}

/**
 * One line per calendar year in the payload's months, so the same month of
 * different years stands in one vertical. A month the signal does not have,
 * or withholds, is null: a gap in the record must look like a gap.
 */
export function yearLines(payload: HealthPayload, signal: HealthSignalKey): YearLine[] {
  const data = payload.signals[signal];
  const years = [...new Set(payload.months.map((key) => Number(key.slice(0, 4))))].sort(
    (a, b) => a - b,
  );
  return years.map((year) => ({
    year,
    values: Array.from({ length: MONTHS_IN_YEAR }, (_, index) =>
      valueOf(data, `${year}-${String(index + 1).padStart(2, "0")}`),
    ),
  }));
}

/**
 * The last twelve months, each beside the same month a year earlier. A
 * difference needs both figures; a share also needs the earlier one to be
 * other than zero, since a share of nothing is not a number.
 */
export function lastTwelveRows(payload: HealthPayload, signal: HealthSignalKey): TwelveRow[] {
  const data = payload.signals[signal];
  return payload.months.slice(-MONTHS_IN_YEAR).map((key) => {
    const value = valueOf(data, key);
    const previousValue = valueOf(data, yearEarlier(key));
    let difference: number | null = null;
    let share: number | null = null;
    if (value !== null && previousValue !== null) {
      difference = value - previousValue;
      if (previousValue !== 0) share = difference / previousValue;
    }
    return {
      key,
      value,
      reason: data.months[key]?.reason ?? null,
      previousValue,
      difference,
      share,
    };
  });
}

/**
 * The figure above a card, or how many months each side has. The server
 * sends the means only when both sides have enough months, so their presence
 * is the decision; the counts are always there to say why not.
 */
export function comparisonView(signal: HealthSignal): ComparisonView {
  const { recent_mean, previous_mean, change, recent_months, previous_months } =
    signal.comparison;
  if (recent_mean === null || previous_mean === null || change === null) {
    return { kind: "notEnough", recent: recent_months, previous: previous_months };
  }
  return { kind: "figure", recent: recent_mean, previous: previous_mean, change };
}

/** Whether the best hour left out hours the system could not take, or read every hour. */
export function bestHourCaption(payload: HealthPayload): "unconstrained" | "all" {
  return payload.best_hour_mode;
}

/**
 * Whose energy the solar line is: the household's on a system that kept its
 * production in, the array's otherwise. Unknown export reads as the array.
 */
export function energyCaption(payload: HealthPayload): "household" | "array" {
  return payload.export_limited === true ? "household" : "array";
}
