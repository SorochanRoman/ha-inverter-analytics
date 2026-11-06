import { describe, expect, it } from "vitest";
import {
  cardState,
  formatCardPower,
  formatEta,
  resolveTarget,
  smoothedPower,
  trimSamples,
} from "./battery-time";
import { cardEn } from "./i18n/card-en";
import type { BatteryEtaBasis } from "./types";

function basis(fields: Partial<BatteryEtaBasis> = {}): BatteryEtaBasis {
  return {
    capacity_kwh: 31,
    capacity_reason: null,
    missing_roles: [],
    clean_hours: 40,
    clean_hours_min: 20,
    window_days: 60,
    computed_at: "2026-11-06T12:00:00+00:00",
    soc_entity: "sensor.soc",
    battery_power_entity: "sensor.battery_power",
    battery_power_inverted: false,
    idle_w: 50,
    low_pct: 20,
    ...fields,
  };
}

type Input = Parameters<typeof cardState>[0];

function input(fields: Partial<Input> = {}): Input {
  const b = fields.basis ?? basis();
  return {
    soc: 50,
    powerW: 1550,
    chargeTo: 85,
    dischargeTo: 20,
    unavailable: null,
    mapped: true,
    capacityKwh: b.capacity_kwh,
    basis: b,
    ...fields,
  };
}

describe("smoothing the battery power", () => {
  it("weights each sample by how long it held", () => {
    const samples = [
      { t: 0, w: 1000 },
      { t: 90_000, w: 2000 },
    ];
    expect(smoothedPower(samples, 120_000)).toBeCloseTo(1250);
  });

  it("uses a single sample as it is", () => {
    expect(smoothedPower([{ t: 5_000, w: -700 }], 5_000)).toBe(-700);
    expect(smoothedPower([{ t: 5_000, w: -700 }], 60_000)).toBe(-700);
  });

  it("has nothing to say without samples", () => {
    expect(smoothedPower([], 1_000)).toBeNull();
  });

  it("cuts samples older than the span at the span's start", () => {
    // 3000 W from t=0 holds until t=100 s; the span starts at t=80 s, so it
    // counts for 20 s, then 1000 W for the remaining 100 s.
    const samples = [
      { t: 0, w: 3000 },
      { t: 100_000, w: 1000 },
    ];
    expect(smoothedPower(samples, 200_000)).toBeCloseTo((3000 * 20 + 1000 * 100) / 120);
  });

  it("ignores a sample entirely superseded before the span", () => {
    const samples = [
      { t: 0, w: 9000 },
      { t: 10_000, w: 500 },
    ];
    expect(smoothedPower(samples, 500_000)).toBe(500);
  });

  it("trims the buffer to the span, keeping the sample that still holds", () => {
    const samples = [
      { t: 0, w: 1 },
      { t: 10_000, w: 2 },
      { t: 100_000, w: 3 },
      { t: 190_000, w: 4 },
    ];
    expect(trimSamples(samples, 200_000)).toEqual([
      { t: 10_000, w: 2 },
      { t: 100_000, w: 3 },
      { t: 190_000, w: 4 },
    ]);
    expect(trimSamples([{ t: 0, w: 1 }], 1_000_000)).toEqual([{ t: 0, w: 1 }]);
  });
});

describe("the card's state, in order", () => {
  it("1. unmapped wins over everything", () => {
    expect(cardState(input({ mapped: false, unavailable: "sensor.soc" }))).toEqual({
      kind: "unmapped",
    });
  });

  it("2. an unavailable entity wins over the limit", () => {
    expect(cardState(input({ unavailable: "number.charge_limit", soc: 90 }))).toEqual({
      kind: "unavailable",
      entity: "number.charge_limit",
    });
  });

  it("3. at limit wins over idle", () => {
    expect(cardState(input({ soc: 85, chargeTo: 85, powerW: 0 }))).toEqual({
      kind: "at_limit",
      target: 85,
    });
  });

  it("3. at limit holds while still charging, but not while discharging", () => {
    expect(cardState(input({ soc: 86, powerW: 400 }))).toEqual({ kind: "at_limit", target: 85 });
    expect(cardState(input({ soc: 90, powerW: -3100 })).kind).toBe("discharging");
  });

  it("4. at floor wins over idle", () => {
    expect(cardState(input({ soc: 20, powerW: 0 }))).toEqual({ kind: "at_floor", target: 20 });
  });

  it("4. at floor while discharging below the floor's idle band", () => {
    expect(cardState(input({ soc: 18, powerW: -900 }))).toEqual({
      kind: "at_floor",
      target: 20,
    });
    expect(cardState(input({ soc: 18, powerW: 900 })).kind).toBe("charging");
  });

  it("5. idle inside the idle band wins over a missing capacity", () => {
    const b = basis({ capacity_kwh: null, capacity_reason: "too_few_clean_hours" });
    expect(cardState(input({ basis: b, capacityKwh: null, powerW: 49 }))).toEqual({
      kind: "idle",
    });
    expect(cardState(input({ basis: b, capacityKwh: null, powerW: -49 }))).toEqual({
      kind: "idle",
    });
  });

  it("6. no capacity, too few clean hours", () => {
    const b = basis({ capacity_kwh: null, capacity_reason: "too_few_clean_hours", clean_hours: 12 });
    expect(cardState(input({ basis: b, capacityKwh: null }))).toEqual({
      kind: "no_capacity",
      reason: "too_few_clean_hours",
      clean_hours: 12,
      clean_hours_min: 20,
      missing_roles: [],
    });
  });

  it("6. no capacity, missing roles", () => {
    const b = basis({
      capacity_kwh: null,
      capacity_reason: "missing_roles",
      missing_roles: ["battery_charge_total"],
      clean_hours: 0,
    });
    expect(cardState(input({ basis: b, capacityKwh: null }))).toEqual({
      kind: "no_capacity",
      reason: "missing_roles",
      clean_hours: 0,
      clean_hours_min: 20,
      missing_roles: ["battery_charge_total"],
    });
  });

  it("7. charging to the target: 31 kWh × 35 / 100 / 1.55 kW = 7 h", () => {
    const state = cardState(input({ soc: 50, chargeTo: 85, powerW: 1550 }));
    expect(state.kind).toBe("charging");
    if (state.kind !== "charging") return;
    expect(state.target).toBe(85);
    expect(state.minutes).toBeCloseTo(420);
  });

  it("7. discharging to the floor: 31 kWh × 30 / 100 / 3.1 kW = 3 h", () => {
    const state = cardState(input({ soc: 50, dischargeTo: 20, powerW: -3100 }));
    expect(state.kind).toBe("discharging");
    if (state.kind !== "discharging") return;
    expect(state.target).toBe(20);
    expect(state.minutes).toBeCloseTo(180);
  });

  it("7. moving at exactly the idle power is not idle", () => {
    expect(cardState(input({ powerW: 50 })).kind).toBe("charging");
  });
});

describe("resolving a target", () => {
  const states = {
    "number.limit": { state: "85" },
    "number.gone": { state: "unavailable" },
    "number.unknown": { state: "unknown" },
    "sensor.text": { state: "high" },
  };

  it("uses a number as it is", () => {
    expect(resolveTarget(90, states, 100)).toEqual({ value: 90, unavailable: null });
  });

  it("falls back when nothing is set", () => {
    expect(resolveTarget(undefined, states, 100)).toEqual({ value: 100, unavailable: null });
  });

  it("reads an entity's number state live", () => {
    expect(resolveTarget("number.limit", states, 100)).toEqual({ value: 85, unavailable: null });
  });

  it("calls an unavailable, unknown, non-number or missing entity unavailable", () => {
    for (const id of ["number.gone", "number.unknown", "sensor.text", "number.missing"]) {
      expect(resolveTarget(id, states, 100)).toEqual({ value: null, unavailable: id });
    }
  });

  it("takes a number typed as text in the editor as a number", () => {
    expect(resolveTarget("80", states, 100)).toEqual({ value: 80, unavailable: null });
  });
});

describe("formatting the time", () => {
  // Local time, so the clock time does not depend on the test machine's zone.
  const now = new Date(2026, 10, 6, 14, 30);

  it("shows minutes under an hour", () => {
    expect(formatEta(59, now, "en", cardEn)).toBe("59 min");
  });

  it("shows hours, minutes and the clock time from an hour", () => {
    expect(formatEta(60, now, "en", cardEn)).toBe("1 h (≈15:30)");
  });

  it("rounds to five minutes, and the clock time with it", () => {
    expect(formatEta(128, now, "en", cardEn)).toBe("2 h 10 min (≈16:40)");
    expect(formatEta(122, now, "en", cardEn)).toBe("2 h (≈16:30)");
  });

  it("still shows the clock time at 47 h 55 min", () => {
    expect(formatEta(47 * 60 + 55, now, "en", cardEn)).toBe("47 h 55 min (≈14:25)");
  });

  it("says over 2 days from 48 h, with no clock time", () => {
    expect(formatEta(48 * 60, now, "en", cardEn)).toBe("over 2 days");
  });
});

describe("formatting the power", () => {
  it("shows watts below a kilowatt and kilowatts with one decimal above", () => {
    expect(formatCardPower(999, "en", cardEn)).toBe("999 W");
    expect(formatCardPower(1800, "en", cardEn)).toBe("1.8 kW");
    expect(formatCardPower(-2350, "en", cardEn)).toBe("-2.4 kW");
    expect(formatCardPower(null, "en", cardEn)).toBe("—");
  });
});
