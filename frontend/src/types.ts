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

export interface SeriesInfo {
  entity_id: string;
  precision: Precision;
  boundary: string | null;
  coverage: number;
}

export interface PartSummary {
  key: string;
  label: string;
  index: number | null;
  mean: number | null;
  p95: number | null;
  peak: number | null;
  share: number | null;
}

export interface PhasePart extends PartSummary {
  headroom: number | null;
}

export interface ImbalanceEpisode {
  start: string;
  end: string;
  seconds: number;
  peak_imbalance: number;
  mean_imbalance: number;
  phases: number[];
}

export interface Imbalance {
  mean: number | null;
  p95: number | null;
  fraction_above: number | null;
  analysed_seconds: number;
  coverage: number;
  histogram: { start: number; end: number; fraction: number }[];
  threshold: number;
  floor_w: number;
  below_floor_seconds: number;
  aligned_coverage: number;
}

export interface Phases {
  per_phase: PhasePart[];
  rating_per_phase: number;
  rating_per_phase_derived: boolean;
  rating_per_phase_divisor: number;
  imbalance: Imbalance;
  episodes: ImbalanceEpisode[];
}

export interface Strings {
  parts: PartSummary[];
  aligned_coverage: number;
}

export type Precision = "raw" | "lts" | "mixed";

export interface Consistency {
  total_mean: number;
  parts_mean: number;
  mismatch: number;
  beyond_margin: boolean;
  margin: number;
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
  precision: Precision;
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
  series: Record<string, SeriesInfo>;
  /** Absent unless at least two phase sensors are mapped. */
  phases?: Phases;
  /** Absent unless at least two PV strings are mapped. */
  strings?: Strings;
  /** Present per group only when there was something to compare. */
  consistency: { load?: Consistency; pv?: Consistency };
}

export interface EntryInfo {
  entry_id: string;
  title: string;
  entities: Record<string, string[]>;
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

export interface BatteryKpi {
  mean_soc: number | null;
  min_soc: number | null;
  seconds_below_low: number;
  dip_count: number;
  mean_low_point: number | null;
}

export interface Dip {
  start: string;
  end: string;
  seconds: number;
  lowest: number;
  recovered_to: number | null;
}

export interface ChargeFlow {
  idle_w: number;
  mean_charge_w: number | null;
  mean_discharge_w: number | null;
  share_charging: number | null;
  share_discharging: number | null;
  share_idle: number | null;
  energy_in_kwh: number;
  energy_out_kwh: number;
  cycles_per_day: number | null;
  /** null when the battery barely moved and there was nothing to conclude. */
  sign_looks_inverted: boolean | null;
}

export interface BatteryPayload {
  coverage: number;
  low_pct: number;
  /** Where raw states begin; null when the whole window is raw. */
  raw_from: string | null;
  raw_seconds: number;
  /** False when the window lies entirely in hourly statistics, which cannot show a dip. */
  dips_measurable: boolean;
  has_capacity: boolean;
  kpi: BatteryKpi;
  histogram: {
    bucket_width: number;
    clipped_low_seconds: number;
    clipped_high_seconds: number;
    buckets: HistogramBucket[];
  };
  bands: Band[];
  episodes: Dip[];
  /** Absent when no battery-power sensor is mapped. */
  power: ChargeFlow | null;
  series: Record<string, SeriesInfo>;
  precision: Precision;
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
}
