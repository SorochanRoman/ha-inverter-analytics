/**
 * The Savings card's display decisions, kept out of the tab so they can be
 * tested: whether there is a figure, the bars, the running total, coverage.
 */
import type { SavingsBlock, SavingsDay, SavingsReason } from "./types";

export type SavingsState = { kind: "figure" } | { kind: "withheld"; reason: SavingsReason };

/** null for a backend older than the card, which sends no block at all. */
export function savingsState(block: SavingsBlock | undefined): SavingsState | null {
  if (!block) return null;
  return block.reason ? { kind: "withheld", reason: block.reason } : { kind: "figure" };
}

/** The two counters the savings figure is computed from. */
export const SAVINGS_ROLES = ["load_energy_total", "grid_import_total"] as const;

/**
 * The counters a `no_counters` card names: those not mapped. When the payload
 * lists both as mapped, both are named rather than none — the backend still
 * found one of them missing, and an empty sentence would say nothing.
 */
export function missingSavingsRoles(mapped: string[]): string[] {
  const unmapped = SAVINGS_ROLES.filter((role) => !mapped.includes(role));
  return unmapped.length ? unmapped : [...SAVINGS_ROLES];
}

/** One bar a day, or with byMonth the days summed into YYYY-MM months. */
export function savingsBars(
  days: SavingsDay[],
  byMonth: boolean,
): { label: string; value: number }[] {
  if (!byMonth) return days.map((day) => ({ label: day.day, value: day.value }));
  const months = new Map<string, number>();
  for (const day of days) {
    const key = day.day.slice(0, 7);
    months.set(key, (months.get(key) ?? 0) + day.value);
  }
  return [...months].map(([label, value]) => ({ label, value }));
}

/** The running total; a negative day (bought more than used) pulls it down. */
export function cumulative(values: number[]): number[] {
  let sum = 0;
  return values.map((value) => (sum += value));
}

/** The share of the period both counters cover, or null when it is all of it. */
export function coverageShare(block: SavingsBlock): number | null {
  if (block.window_hours <= 0) return null;
  const share = block.hours / block.window_hours;
  return share < 1 ? share : null;
}

/**
 * A whole amount in Home Assistant's currency. A code Intl rejects still
 * prints, as the number followed by the code.
 */
export function formatMoney(value: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      // Both bounds: an engine that keeps the currency's own minimum (2 for
      // most) rejects a maximum below it.
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${Math.round(value)} ${currency}`;
  }
}
