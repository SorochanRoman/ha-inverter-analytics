import type { Messages } from "./i18n/en";
import { messagesForLocale } from "./i18n/lang";
import type { Precision } from "./types";

const DASH = "—";

export function formatPower(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  const m = messagesForLocale(locale);
  if (Math.abs(value) >= 1000) {
    const kilowatts = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
      value / 1000,
    );
    return `${kilowatts} ${m.units.kw}`;
  }
  const watts = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
  return `${watts} ${m.units.w}`;
}

export function formatPercent(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value * 100)}%`;
}

/**
 * A coverage share, where rounding to a flat zero would be a lie.
 *
 * Two minutes of history inside a thirty-day window is 0.005%, which
 * formatPercent renders as "0%" — "there is no data" printed beside populated
 * numbers. This is the same defect coverageWarning was written for, and every
 * place that shows a coverage figure has to avoid it, not just the header.
 */
export function formatCoverage(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  if (value <= 0) return "0%";
  if (value < 0.001) return "<0.1%";
  return formatPercent(value, locale);
}

/** Below this, the seconds are shown: rounding them away misstates a short span. */
const SECONDS_SHOWN_BELOW = 10 * 60;

export function formatEnergy(kwh: number | null, locale: string): string {
  if (kwh === null || Number.isNaN(kwh)) return DASH;
  const { units } = messagesForLocale(locale);
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(kwh)} ${units.kwh}`;
}

/**
 * A number to one decimal, rounded exactly as toFixed(1) rounds — never
 * grouped, and in English byte for byte what toFixed(1) gave — with the
 * locale's decimal mark. Intl.NumberFormat would round the binary halves
 * (0.15, 1.45, 8.35) up where toFixed rounds them down.
 */
export function formatOneDecimal(value: number, locale: string): string {
  const fixed = value.toFixed(1);
  const mark =
    new Intl.NumberFormat(locale).formatToParts(1.5).find((part) => part.type === "decimal")
      ?.value ?? ".";
  return mark === "." ? fixed : fixed.replace(".", mark);
}

export function formatDuration(seconds: number, locale: string): string {
  const { units } = messagesForLocale(locale);
  if (seconds < 60) return `${Math.round(seconds)} ${units.s}`;

  const whole = Math.round(seconds);
  if (whole < SECONDS_SHOWN_BELOW) {
    // An imbalance episode cannot be shorter than a minute, so the shortest
    // ones sit right at the boundary where rounding to whole minutes hurts
    // most: 100 seconds shown as "2 min" overstates it by a fifth.
    const rest = whole % 60;
    const minutes = (whole - rest) / 60;
    return rest === 0
      ? `${minutes} ${units.min}`
      : `${minutes} ${units.min} ${rest} ${units.s}`;
  }

  const minutes = Math.round(whole / 60);
  if (minutes < 60) return `${minutes} ${units.min}`;
  return `${Math.floor(minutes / 60)} ${units.h} ${minutes % 60} ${units.min}`;
}

/** An error from Home Assistant arrives as an object {code, message}, not a string. */
/**
 * An error as a sentence. A backend code with a fixed message is named in
 * the panel's language; anything else keeps the message it came with.
 */
export function describeError(error: unknown, m: Messages): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" && Object.prototype.hasOwnProperty.call(m.errors, code)) {
      return m.errors[code as keyof Messages["errors"]];
    }
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return String(error);
}

export function precisionLabel(
  precision: Precision,
  boundary: string | null,
  locale: string,
): string {
  const { format } = messagesForLocale(locale);
  if (precision === "raw") return format.exactData;
  if (precision === "lts") return format.hourlyAverages;
  if (boundary) {
    return format.mixedSince({ date: new Date(boundary).toLocaleDateString(locale) });
  }
  return format.mixed;
}

/**
 * Warning about incomplete data.
 *
 * We phrase this in terms of how much data there IS, not how much is
 * missing: in a 30-day window with two minutes of history, "missing 100% of
 * the time" rounded up to a flat hundred and read as "no data" — right next
 * to populated KPIs. Below one percent we say "less than 1%", because the
 * exact figure adds nothing at that point.
 */
export function coverageWarning(coverage: number, locale: string): string | null {
  if (coverage >= 0.95) return null;
  const { format } = messagesForLocale(locale);
  if (coverage <= 0) return format.noData;
  if (coverage < 0.01) return format.coversUnderOnePercent;
  return format.coversOnly({ share: formatPercent(coverage, locale) });
}
