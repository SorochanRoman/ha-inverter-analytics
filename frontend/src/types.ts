export interface Kpi {
  mean: number | null;
  median: number | null;
  p95: number | null;
  max: number | null;
  fraction_above_80pct: number | null;
  max_sustained_15m: number | null;
}

export interface HistogramBucket {
  start: number;
  end: number;
  seconds: number;
  fraction: number;
}

export interface Band {
  key: string;
  from: number;
  to: number | null;
  seconds: number;
  fraction: number;
}

export interface Overload {
  start: string;
  end: string;
  seconds: number;
  peak: number;
}

export interface LoadPayload {
  coverage: number;
  rated_power: number;
  kpi: Kpi;
  histogram: {
    bucket_width: number;
    clipped_low_seconds: number;
    clipped_high_seconds: number;
    buckets: HistogramBucket[];
  };
  duration_curve: { fraction: number; value: number }[];
  bands: Band[];
  overloads: Overload[];
  precision: "raw" | "lts" | "mixed";
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
}

export interface EntryInfo {
  entry_id: string;
  title: string;
  entities: Record<string, string>;
  numbers: Record<string, number>;
  inverted: string[];
}

export interface ConfigResult {
  entries: EntryInfo[];
  raw_available_from: string;
}

export interface HomeAssistant {
  connection: { sendMessagePromise<T>(message: unknown): Promise<T> };
  locale: { language: string };
}
