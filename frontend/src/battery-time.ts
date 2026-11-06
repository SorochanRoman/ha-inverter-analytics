/**
 * The Battery time card's arithmetic: pure, so it is tested without a DOM.
 *
 * The time is the measured usable capacity (never the nameplate) times the
 * points left to the target, over the current battery power. It assumes the
 * power holds, which is why the card says "at the current power".
 */
import type { CardMessages } from "./i18n/card-en";
import type { BatteryEtaBasis } from "./types";

export const DASH = "—";
export const SMOOTHING_SPAN_MS = 120_000;

export interface PowerSample {
  /** Epoch milliseconds the state was seen. */
  t: number;
  /** Watts, sign corrected: positive is charging. */
  w: number;
}

/**
 * Time-weighted mean battery power over the last `spanMs`.
 *
 * Each sample holds until the next one, or until `now`. A sample from before
 * the span still counts from the span's start until it was replaced. With a
 * single sample, or no time elapsed, the latest value is the answer.
 */
export function smoothedPower(
  samples: PowerSample[],
  now: number,
  spanMs = SMOOTHING_SPAN_MS,
): number | null {
  if (samples.length === 0) return null;
  const start = now - spanMs;
  let weighted = 0;
  let total = 0;
  for (let i = 0; i < samples.length; i++) {
    const from = Math.max(samples[i].t, start);
    const to = Math.min(i + 1 < samples.length ? samples[i + 1].t : now, now);
    if (to <= from) continue;
    weighted += samples[i].w * (to - from);
    total += to - from;
  }
  if (total === 0) return samples[samples.length - 1].w;
  return weighted / total;
}

/** Drops samples smoothedPower would no longer use: those replaced before the span began. */
export function trimSamples(
  samples: PowerSample[],
  now: number,
  spanMs = SMOOTHING_SPAN_MS,
): PowerSample[] {
  const start = now - spanMs;
  let first = 0;
  while (first + 1 < samples.length && samples[first + 1].t <= start) first++;
  return samples.slice(first);
}

/**
 * A charge or discharge target: a number used as is, or an entity read live.
 *
 * An entity that is unavailable, unknown, missing or not a number makes the
 * target unavailable, named so the card can say which. Text that is a number
 * (what the editor's text field hands back) counts as a number.
 */
export function resolveTarget(
  value: number | string | undefined,
  states: Record<string, { state: string }>,
  fallback: number,
): { value: number | null; unavailable: string | null } {
  if (value === undefined || value === "") return { value: fallback, unavailable: null };
  if (typeof value === "number") return { value, unavailable: null };
  const typed = Number(value);
  if (value.trim() !== "" && Number.isFinite(typed)) return { value: typed, unavailable: null };
  const parsed = readNumber(states[value]?.state);
  return parsed === null ? { value: null, unavailable: value } : { value: parsed, unavailable: null };
}

/** A state's number, or null for unavailable, unknown, missing or text. */
export function readNumber(state: string | undefined): number | null {
  if (state === undefined || state === "unavailable" || state === "unknown" || state === "") {
    return null;
  }
  const value = Number(state);
  return Number.isFinite(value) ? value : null;
}

export type CardState =
  | { kind: "unmapped" }
  | { kind: "unavailable"; entity: string }
  | { kind: "at_limit"; target: number }
  | { kind: "at_floor"; target: number }
  | { kind: "idle" }
  | {
      kind: "no_capacity";
      reason: "too_few_clean_hours" | "missing_roles";
      clean_hours: number;
      clean_hours_min: number;
      missing_roles: string[];
    }
  | { kind: "charging" | "discharging"; target: number; minutes: number };

/**
 * What the card says, in the order of the design (spec §5).
 *
 * The caller resolves the entity targets and names the first unavailable
 * entity in `unavailable`. "At limit" comes before "Idle": a battery
 * sitting at its limit is idle, and the limit is the more useful word.
 */
export function cardState(input: {
  soc: number | null;
  powerW: number | null;
  chargeTo: number | null;
  dischargeTo: number | null;
  unavailable: string | null;
  mapped: boolean;
  capacityKwh: number | null;
  basis: BatteryEtaBasis;
}): CardState {
  const { soc, powerW: p, chargeTo, dischargeTo, basis } = input;
  if (!input.mapped) return { kind: "unmapped" };
  if (input.unavailable !== null) return { kind: "unavailable", entity: input.unavailable };
  // The caller names whatever is missing; this only guards the types.
  if (soc === null || p === null || chargeTo === null || dischargeTo === null) {
    return { kind: "unavailable", entity: "" };
  }
  const idle = basis.idle_w;
  if (soc >= chargeTo && p > -idle) return { kind: "at_limit", target: chargeTo };
  if (soc <= dischargeTo && p < idle) return { kind: "at_floor", target: dischargeTo };
  if (Math.abs(p) < idle) return { kind: "idle" };
  if (input.capacityKwh === null) {
    return {
      kind: "no_capacity",
      reason: basis.capacity_reason === "missing_roles" ? "missing_roles" : "too_few_clean_hours",
      clean_hours: basis.clean_hours,
      clean_hours_min: basis.clean_hours_min,
      missing_roles: basis.missing_roles,
    };
  }
  const charging = p > 0;
  const target = charging ? chargeTo : dischargeTo;
  const hours = (input.capacityKwh * Math.abs(target - soc)) / 100 / (Math.abs(p) / 1000);
  return { kind: charging ? "charging" : "discharging", target, minutes: hours * 60 };
}

/**
 * The time to the target: minutes under an hour; hours and minutes, rounded
 * to five minutes, with the clock time of arrival under two days; past
 * that, "over 2 days" and no clock time, which would mislead by then.
 */
export function formatEta(minutes: number, now: Date, locale: string, m: CardMessages): string {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  if (minutes < 60) return m.minutes({ m: number.format(Math.max(1, Math.round(minutes))) });
  if (minutes >= 48 * 60) return m.over2Days;
  const rounded = Math.round(minutes / 5) * 5;
  const h = Math.floor(rounded / 60);
  const rest = rounded % 60;
  const duration =
    rest === 0
      ? m.hours({ h: number.format(h) })
      : m.hoursMinutes({ h: number.format(h), m: number.format(rest) });
  const arrival = new Date(now.getTime() + rounded * 60_000);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(arrival);
  return `${duration} ${m.arrival({ time })}`;
}

/** Battery power: watts below a kilowatt, kilowatts with one decimal from it. */
export function formatCardPower(watts: number | null, locale: string, m: CardMessages): string {
  if (watts === null || Number.isNaN(watts)) return DASH;
  if (Math.abs(watts) >= 1000) {
    const kw = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(watts / 1000);
    return `${kw} ${m.units.kw}`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(watts)} ${m.units.w}`;
}
