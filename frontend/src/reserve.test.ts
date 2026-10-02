import { describe, expect, it } from "vitest";
import { coveredCard, hardestCard, hoursLeftCell, neededCell } from "./reserve";
import type { OutageEpisode, ReserveSummary } from "./types";

function episode(fields: Partial<OutageEpisode>): OutageEpisode {
  return {
    start: "2026-10-01T20:00:00+00:00",
    end: "2026-10-01T22:00:00+00:00",
    seconds: 7200,
    bridged_seconds: 0,
    started_before_window: false,
    ongoing: false,
    ...fields,
  };
}

function summary(fields: Partial<ReserveSummary>): ReserveSummary {
  return { worst_needed_pct: null, worst_start: null, covered: 0, judged: 0, ...fields };
}

describe("the hours-left cell", () => {
  it("did not last only when zero and below the low mark", () => {
    expect(hoursLeftCell(episode({ hours_left: 0, below_low: true }))).toEqual({
      kind: "didNotLast",
    });
  });

  it("shows zero hours for an outage that ended exactly at the low mark", () => {
    expect(hoursLeftCell(episode({ hours_left: 0, below_low: false }))).toEqual({
      kind: "hours",
      hours: 0,
    });
  });

  it("shows the figure", () => {
    expect(hoursLeftCell(episode({ hours_left: 3.5 }))).toEqual({ kind: "hours", hours: 3.5 });
  });

  it("gives the reason when withheld", () => {
    expect(hoursLeftCell(episode({ hours_left: null, reserve_reason: "cut" }))).toEqual({
      kind: "reason",
      reason: "cut",
    });
  });

  it("falls back to no charge data when no reason is sent", () => {
    expect(hoursLeftCell(episode({ hours_left: null, reserve_reason: null }))).toEqual({
      kind: "reason",
      reason: "no_soc",
    });
    expect(hoursLeftCell(episode({}))).toEqual({ kind: "reason", reason: "no_soc" });
  });
});

describe("the needed-at-start cell", () => {
  it("shows the figure up to a full battery", () => {
    expect(neededCell(episode({ needed_pct: 100 }))).toEqual({ kind: "pct", pct: 100 });
  });

  it("says more than full above 100", () => {
    expect(neededCell(episode({ needed_pct: 130 }))).toEqual({ kind: "over" });
  });

  it("gives the reason when withheld, or no charge data without one", () => {
    expect(neededCell(episode({ needed_pct: null, reserve_reason: "too_short" }))).toEqual({
      kind: "reason",
      reason: "too_short",
    });
    expect(neededCell(episode({ needed_pct: null, reserve_reason: null }))).toEqual({
      kind: "reason",
      reason: "no_soc",
    });
  });
});

describe("the hardest-outage card", () => {
  const start = "2026-10-01T20:00:00+00:00";

  it("shows the need and the date", () => {
    expect(hardestCard(summary({ worst_needed_pct: 64, worst_start: start }))).toEqual({
      kind: "pct",
      pct: 64,
      start,
    });
  });

  it("keeps the date when the need is above a full battery", () => {
    expect(hardestCard(summary({ worst_needed_pct: 120, worst_start: start }))).toEqual({
      kind: "over",
      start,
    });
  });

  it("has nothing to show without a start", () => {
    expect(hardestCard(summary({ worst_needed_pct: 64, worst_start: null }))).toEqual({
      kind: "none",
    });
    expect(hardestCard(summary({}))).toEqual({ kind: "none" });
  });
});

describe("the covered card", () => {
  it("has nothing to show when no outage was judged", () => {
    expect(coveredCard(summary({ judged: 0 }))).toEqual({ kind: "none" });
  });

  it("counts covered of judged", () => {
    expect(coveredCard(summary({ covered: 5, judged: 6 }))).toEqual({
      kind: "count",
      covered: 5,
      judged: 6,
    });
  });
});
