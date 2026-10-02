/**
 * What the outage-reserve cells and cards show, decided apart from the tab.
 *
 * There is no DOM environment for tests here (see docs/known-gaps.md), so the
 * choices that have to stay right live in pure functions and the element only
 * renders what they return.
 */
import type { OutageEpisode, ReserveReason, ReserveSummary } from "./types";

export type HoursLeftCell =
  | { kind: "reason"; reason: ReserveReason }
  | { kind: "didNotLast" }
  | { kind: "hours"; hours: number };

export type NeededCell =
  | { kind: "reason"; reason: ReserveReason }
  | { kind: "over" }
  | { kind: "pct"; pct: number };

export type HardestCard =
  | { kind: "none" }
  | { kind: "over"; start: string }
  | { kind: "pct"; pct: number; start: string };

export type CoveredCard = { kind: "none" } | { kind: "count"; covered: number; judged: number };

/** A withheld figure with no reason sent can only be one without a charge reading. */
function reasonOf(item: OutageEpisode): ReserveReason {
  return item.reserve_reason ?? "no_soc";
}

export function hoursLeftCell(item: OutageEpisode): HoursLeftCell {
  const hours = item.hours_left;
  if (hours === null || hours === undefined) return { kind: "reason", reason: reasonOf(item) };
  // Zero alone is an outage that ended exactly at the low mark; it lasted.
  if (hours === 0 && item.below_low) return { kind: "didNotLast" };
  return { kind: "hours", hours };
}

export function neededCell(item: OutageEpisode): NeededCell {
  const pct = item.needed_pct;
  if (pct === null || pct === undefined) return { kind: "reason", reason: reasonOf(item) };
  return pct > 100 ? { kind: "over" } : { kind: "pct", pct };
}

export function hardestCard(reserve: ReserveSummary): HardestCard {
  const pct = reserve.worst_needed_pct;
  const start = reserve.worst_start;
  if (pct === null || start === null) return { kind: "none" };
  return pct > 100 ? { kind: "over", start } : { kind: "pct", pct, start };
}

export function coveredCard(reserve: ReserveSummary): CoveredCard {
  return reserve.judged === 0
    ? { kind: "none" }
    : { kind: "count", covered: reserve.covered, judged: reserve.judged };
}
