import type { Precision } from "./types";

const DASH = "—";

export function formatPower(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  if (Math.abs(value) >= 1000) {
    const kilowatts = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
      value / 1000,
    );
    return `${kilowatts} kW`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)} W`;
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

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

/** An error from Home Assistant arrives as an object {code, message}, not a string. */
export function describeError(error: unknown): string {
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
  if (precision === "raw") return "Exact data";
  if (precision === "lts") return "Hourly averages";
  if (boundary) {
    return `Mixed since ${new Date(boundary).toLocaleDateString(locale)}`;
  }
  return "Mixed";
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
  if (coverage <= 0) return "No data for this period";
  if (coverage < 0.01) return "Data covers less than 1% of the period";
  return `Data covers only ${formatPercent(coverage, locale)} of the period`;
}
