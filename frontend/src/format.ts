const DASH = "—";

export function formatPower(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  if (Math.abs(value) >= 1000) {
    const kilowatts = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
      value / 1000,
    );
    return `${kilowatts} кВт`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)} Вт`;
}

export function formatPercent(value: number | null, locale: string): string {
  if (value === null || Number.isNaN(value)) return DASH;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value * 100)}%`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} с`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} хв`;
  return `${Math.floor(minutes / 60)} год ${minutes % 60} хв`;
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
  if (precision === "raw") return "Точні дані";
  if (precision === "lts") return "Погодинні середні";
  if (boundary) {
    return `Змішано з ${new Date(boundary).toLocaleDateString(locale)}`;
  }
  return "Змішано";
}
