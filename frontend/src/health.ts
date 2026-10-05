/**
 * What the Health cards show, decided apart from the tab.
 *
 * There is no DOM environment for tests here (see docs/known-gaps.md), so the
 * choices that have to stay right — which month sits in which vertical, when
 * a difference is printed, when the twelve-against-twelve figure appears —
 * live in pure functions, and the tab only renders what they return.
 */
import { DASH, formatEnergy, formatPercent, formatPower } from "./format";
import type { Messages } from "./i18n/en";
import type {
  HealthMonth,
  HealthPayload,
  HealthReason,
  HealthSignal,
  HealthSignalKey,
} from "./types";

/*
 * The server's constants, mirrored for the sentences that print them. The
 * payload carries only what the panel reads off a month, not the rules it was
 * read by; tests/test_health_frontend_constants.py fails if these drift from
 * analytics/health.py, battery.py, sizing.py and load.py.
 */
export const CLEAN_CHARGE_MAX_KWH = 0.02;
export const CLEAN_DROP_MIN_POINTS = 3.0;
export const CLEAN_HOURS_MIN = 20;
export const COMPARISON_MIN_MONTHS = 6;
export const BEST_HOUR_MIN_HOURS = 10;
export const EFFICIENCY_MAX_DRIFT_PCT = 5.0;
export const EFFICIENCY_MIN_KWH = 1.0;
export const CEILING_PV_MIN_W = 100.0;
export const HIGH_LOAD_SHARE = 0.8;

export type HealthCardKey = "capacity" | "efficiency" | "solar" | "inverter";

/** Four cards over five signals: the solar card holds the energy and the best hour. */
export const HEALTH_CARDS: { key: HealthCardKey; signals: HealthSignalKey[] }[] = [
  { key: "capacity", signals: ["capacity"] },
  { key: "efficiency", signals: ["efficiency"] },
  { key: "solar", signals: ["solar_energy", "best_hour"] },
  { key: "inverter", signals: ["inverter"] },
];

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
  | {
      kind: "figure";
      recent: number;
      previous: number;
      change: number;
      /** The change as a share of the earlier mean; null when that mean is zero. */
      share: number | null;
    }
  | { kind: "notEnough"; recent: number; previous: number; needed: number };

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
    return {
      kind: "notEnough",
      recent: recent_months,
      previous: previous_months,
      needed: COMPARISON_MIN_MONTHS,
    };
  }
  return {
    kind: "figure",
    recent: recent_mean,
    previous: previous_mean,
    change,
    share: previous_mean === 0 ? null : change / previous_mean,
  };
}

/**
 * Whether the best hour left out hours the system could not take, or read
 * every hour — and, when it read every hour, whether that is because export
 * let the array run free or because the sensors to tell were missing.
 */
export function bestHourCaption(payload: HealthPayload): "unconstrained" | "all" | "exporting" {
  if (payload.best_hour_mode === "all" && payload.export_limited === false) return "exporting";
  return payload.best_hour_mode;
}

/**
 * Whose energy the solar line is: the household's on a system that kept its
 * production in, the array's otherwise. Unknown export reads as the array.
 */
export function energyCaption(payload: HealthPayload): "household" | "array" {
  return payload.export_limited === true ? "household" : "array";
}

/** A number with its sign, "+" or the locale's minus, and nothing on zero. */
function signed(value: number, digits: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    signDisplay: "exceptZero",
  }).format(value);
}

/** One figure of a signal, in its unit: a month's value or a twelve-month mean. */
export function formatHealthValue(
  signal: HealthSignalKey,
  value: number | null,
  m: Messages,
  locale: string,
): string {
  if (value === null) return DASH;
  switch (signal) {
    case "capacity":
    case "solar_energy":
      return formatEnergy(value, locale);
    case "efficiency":
      return formatPercent(value, locale);
    case "best_hour":
      return formatPower(value, locale);
    case "inverter":
      return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value)} ${m.units.h}`;
  }
}

/**
 * A difference between two figures of a signal, signed. Efficiency is a
 * share, so its difference is in percentage points: "-2%" beside a "-2.1%"
 * change would read as the same kind of number twice.
 */
export function formatHealthDifference(
  signal: HealthSignalKey,
  difference: number | null,
  m: Messages,
  locale: string,
): string {
  if (difference === null) return DASH;
  switch (signal) {
    case "capacity":
    case "solar_energy":
      return `${signed(difference, 1, locale)} ${m.units.kwh}`;
    case "efficiency":
      return `${signed(difference * 100, 1, locale)} ${m.units.pp}`;
    case "best_hour":
      return Math.abs(difference) >= 1000
        ? `${signed(difference / 1000, 1, locale)} ${m.units.kw}`
        : `${signed(difference, 0, locale)} ${m.units.w}`;
    case "inverter":
      return `${signed(difference, 1, locale)} ${m.units.h}`;
  }
}

/** A change as a share of the earlier figure, signed. */
export function formatHealthShare(share: number | null, locale: string): string {
  if (share === null) return DASH;
  return `${signed(share * 100, 1, locale)}%`;
}

/**
 * The year lines a signal's chart draws, in the unit its axis is named by.
 * Efficiency is sent as a share and drawn in percent; the best hour is sent
 * in watts and drawn in kilowatts, where an array's peak reads naturally.
 */
export function chartLines(
  payload: HealthPayload,
  signal: HealthSignalKey,
  m: Messages,
): { lines: YearLine[]; unit: string } {
  const lines = yearLines(payload, signal);
  const scale = (factor: number) =>
    lines.map((line) => ({
      year: line.year,
      values: line.values.map((value) => (value === null ? null : value * factor)),
    }));
  switch (signal) {
    case "capacity":
    case "solar_energy":
      return { lines, unit: m.units.kwh };
    case "efficiency":
      return { lines: scale(100), unit: "%" };
    case "best_hour":
      return { lines: scale(1 / 1000), unit: m.units.kw };
    case "inverter":
      return { lines, unit: m.units.h };
  }
}

/** The nameplate's reference line on the capacity chart, or null without one. */
export function nameplateLine(
  payload: HealthPayload,
  signal: HealthSignalKey,
  m: Messages,
  locale: string,
): { value: number; name: string } | null {
  if (signal !== "capacity" || payload.nameplate_kwh === null) return null;
  return {
    value: payload.nameplate_kwh,
    name: m.health.nameplate({ value: formatEnergy(payload.nameplate_kwh, locale) }),
  };
}

/** The constant a sentence prints, with as many decimals as it has. */
function plain(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
}

/** Why a month has no figure, with the count it did have and the one it needed. */
export function healthReason(
  m: Messages,
  reason: HealthReason,
  month: HealthMonth | undefined,
  locale: string,
): string {
  const reasons = m.health.reasons;
  switch (reason) {
    case "too_few_clean_hours":
      return reasons.too_few_clean_hours({
        n: month?.clean_hours ?? 0,
        minHours: CLEAN_HOURS_MIN,
      });
    case "no_soc":
      return reasons.no_soc;
    case "soc_partial":
      return reasons.soc_partial;
    case "drift":
      return reasons.drift({ points: plain(EFFICIENCY_MAX_DRIFT_PCT, locale) });
    case "too_little_throughput":
      return reasons.too_little_throughput({ min: formatEnergy(EFFICIENCY_MIN_KWH, locale) });
    case "partial_month":
      return reasons.partial_month;
    case "curtailed":
      return reasons.curtailed({
        n: month?.unconstrained_hours ?? 0,
        minHours: BEST_HOUR_MIN_HOURS,
      });
  }
}

/**
 * The four definitions at the foot of the tab, with the constants they rest
 * on. formatEnergy keeps one decimal, which would print the clean-hour charge
 * limit of 0.02 kWh as "0 kWh"; it is formatted to its own two.
 */
export function healthDefinitions(
  m: Messages,
  locale: string,
): Record<HealthCardKey, string> {
  const d = m.health.definitions;
  return {
    capacity: d.capacity({
      charge: `${plain(CLEAN_CHARGE_MAX_KWH, locale)} ${m.units.kwh}`,
      drop: plain(CLEAN_DROP_MIN_POINTS, locale),
      minHours: CLEAN_HOURS_MIN,
    }),
    efficiency: d.efficiency({
      points: plain(EFFICIENCY_MAX_DRIFT_PCT, locale),
      min: formatEnergy(EFFICIENCY_MIN_KWH, locale),
    }),
    solar: d.solar({
      minHours: BEST_HOUR_MIN_HOURS,
      minPower: formatPower(CEILING_PV_MIN_W, locale),
    }),
    inverter: d.inverter({ share: formatPercent(HIGH_LOAD_SHARE, locale) }),
  };
}
