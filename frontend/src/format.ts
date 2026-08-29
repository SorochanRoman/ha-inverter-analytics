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

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

/** Помилка від Home Assistant приходить об'єктом {code, message}, не рядком. */
export function describeError(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return String(error);
}

export function precisionLabel(
  precision: "raw" | "lts" | "mixed",
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
 * Попередження про неповноту даних.
 *
 * Формулюємо через те, скільки даних Є, а не скільки бракує: у 30-денному вікні
 * з двома хвилинами історії «бракує 100% часу» округлялось до сотні й читалось
 * як «даних немає» — поруч із заповненими KPI. Нижче одного відсотка кажемо
 * «менш ніж 1%», бо точна цифра там уже нічого не додає.
 */
export function coverageWarning(coverage: number, locale: string): string | null {
  if (coverage >= 0.95) return null;
  if (coverage <= 0) return "No data for this period";
  if (coverage < 0.01) return "Data covers less than 1% of the period";
  return `Data covers only ${formatPercent(coverage, locale)} of the period`;
}
