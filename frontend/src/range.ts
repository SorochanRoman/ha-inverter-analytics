import type { Messages } from "./i18n/en";

export const RANGE_KEYS = ["24h", "7d", "30d", "month", "year"] as const;
export type RangeKey = (typeof RANGE_KEYS)[number];

export function rangeLabel(m: Messages, key: RangeKey): string {
  return m.ranges[key];
}

/** Tabs that read the whole history and leave the period picker unused. */
export const WHOLE_HISTORY_TABS: readonly string[] = ["health"];

/**
 * How the period buttons present themselves on a tab. On a whole-history tab
 * the group is named by the reason it does nothing, and the reason is shown
 * as text beside it too: Firefox shows no title over disabled buttons, so a
 * tooltip alone would leave the dimmed picker unexplained.
 */
export function rangesView(
  m: Messages,
  tab: string,
): { unused: boolean; label: string; note: string | null } {
  if (WHOLE_HISTORY_TABS.includes(tab)) {
    return { unused: true, label: m.health.periodNotUsed, note: m.health.periodNotUsed };
  }
  return { unused: false, label: m.panel.period, note: null };
}

const DAY_MS = 24 * 3600 * 1000;
const MINUTE_MS = 60 * 1000;

export function resolveRange(key: RangeKey, now: Date): { start: Date; end: Date } {
  // Rounding to the minute is what lets the server-side cache hit at all:
  // the cache key is built from the window bounds, and millisecond precision
  // would make every request unique.
  const end = new Date(Math.floor(now.getTime() / MINUTE_MS) * MINUTE_MS);
  switch (key) {
    case "24h":
      return { start: new Date(end.getTime() - DAY_MS), end };
    case "7d":
      return { start: new Date(end.getTime() - 7 * DAY_MS), end };
    case "30d":
      return { start: new Date(end.getTime() - 30 * DAY_MS), end };
    case "month": {
      const start = new Date(end.getFullYear(), end.getMonth(), 1, 0, 0, 0, 0);
      return { start, end };
    }
    case "year":
      return { start: new Date(end.getTime() - 365 * DAY_MS), end };
  }
}
