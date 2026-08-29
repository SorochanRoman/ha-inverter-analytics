export const RANGE_KEYS = ["24h", "7d", "30d", "month", "year"] as const;
export type RangeKey = (typeof RANGE_KEYS)[number];

export const RANGE_LABELS: Record<RangeKey, string> = {
  "24h": "24 h",
  "7d": "7 days",
  "30d": "30 days",
  month: "This month",
  year: "Year",
};

const DAY_MS = 24 * 3600 * 1000;
const MINUTE_MS = 60 * 1000;

export function resolveRange(key: RangeKey, now: Date): { start: Date; end: Date } {
  // Округлення до хвилини — умова того, щоб кеш на сервері взагалі міг
  // влучити: ключ кешу будується з меж вікна, а мілісекунди роблять
  // кожен запит унікальним.
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
