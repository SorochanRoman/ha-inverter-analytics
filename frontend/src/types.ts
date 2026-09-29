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

/**
 * Whether one tab can be filled from this entry's mapping, and what it is
 * short of. Computed in the backend, where the requirement is declared once —
 * the panel used to render every tab regardless and let the analytics raise.
 */
export interface FeatureInfo {
  key: string;
  label: string;
  available: boolean;
  missing: string[];
}

export interface EntryInfo {
  entry_id: string;
  title: string;
  entities: Record<string, string[]>;
  numbers: Record<string, number>;
  inverted: string[];
  features: FeatureInfo[];
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
  /** True when the figures came from energy meters rather than integrated power. */
  energy_metered: boolean;
  /** Only from meters, and only when the charge ended near where it started. */
  round_trip_efficiency: number | null;
  soc_drift_pct: number | null;
  efficiency_max_drift_pct: number;
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
  /** True only when the cutoff actually held data back, rather than merely existing. */
  dips_restricted: boolean;
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

export interface MonthBucket {
  key: string;
  load_mean: number | null;
  /** The highest hourly average, never the peak load: statistics average each hour. */
  load_peak_hourly: number | null;
  pv_mean: number | null;
  seconds: number;
  month_seconds: number;
  coverage: number;
  complete: boolean;
}

export interface HourBucket {
  hour: number;
  load_mean: number | null;
  pv_mean: number | null;
  seconds: number;
}

export interface MonthHourCell {
  month: string;
  hour: number;
  load_mean: number | null;
  seconds: number;
}

export interface SeasonalityPayload {
  coverage: number;
  incomplete_below: number;
  has_pv: boolean;
  months: MonthBucket[];
  hours: HourBucket[];
  cells: MonthHourCell[];
  timezone: string;
  series: Record<string, SeriesInfo>;
  precision: Precision;
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
}

export interface BalanceDay {
  day: string;
  flows: Record<string, number>;
}

export interface BalancePayload {
  totals: Record<string, number>;
  mapped: string[];
  missing: string[];
  sources_total: number;
  sinks_total: number;
  /** null until all six counters are mapped: otherwise it measures the omission. */
  unaccounted: number | null;
  unaccounted_share: number | null;
  self_sufficiency: number | null;
  self_consumption: number | null;
  days: BalanceDay[];
  covered_start: string | null;
  covered_end: string | null;
  window_start: string;
  window_end: string;
  covers_whole_window: boolean;
  entities: Record<string, string>;
  timezone: string;
  precision: Precision;
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
}

export type OutageSource = "sensor" | "inferred";

export interface OutageEpisode {
  start: string;
  end: string;
  seconds: number;
  /** Data gaps inside the outage that were assumed to be part of it. */
  bridged_seconds: number;
  started_before_window: boolean;
  ongoing: boolean;
  /** Present only when a state-of-charge sensor is mapped. */
  soc_start?: number | null;
  soc_end?: number | null;
  soc_min?: number | null;
  below_low?: boolean | null;
  /** Present only when a load sensor is mapped. */
  load_mean_w?: number | null;
}

export interface GridHour {
  hour: number;
  off_seconds: number;
  measured_seconds: number;
}

export interface GridDay {
  day: string;
  off_seconds: number;
  measured_seconds: number;
  count: number;
}

export type AutonomyReason =
  | "no_soc"
  | "no_outages"
  | "no_soc_in_outages"
  | "too_little_evidence"
  | "no_net_discharge";

export interface Autonomy {
  rate_pct_per_hour: number | null;
  evidence_hours: number;
  hours_from_full: number | null;
  hours_from_now: number | null;
  soc_now: number | null;
  load_mean_w: number | null;
  reason: AutonomyReason | null;
}

export interface GridKpi {
  count: number;
  /** Measured absence only; the bridged gaps below are not in it. */
  off_seconds: number;
  /** Gaps bridged inside outages, which longest_seconds and mean_seconds include. */
  bridged_seconds: number;
  off_share: number | null;
  longest_seconds: number | null;
  longest_start: string | null;
  mean_seconds: number | null;
  /** Null in inferred mode, where a flicker cannot be seen. */
  brief_interruptions: number | null;
}

export interface GridPayload {
  source: OutageSource;
  /** Where counting begins when the window reaches past the recorder's retention. */
  counted_from: string | null;
  coverage: number;
  measured_seconds: number;
  low_pct: number;
  has_soc: boolean;
  has_load: boolean;
  kpi: GridKpi;
  hours: GridHour[];
  days: GridDay[];
  episodes: OutageEpisode[];
  autonomy: Autonomy;
  series: Record<string, SeriesInfo>;
  precision: Precision;
  boundary: string | null;
  timezone: string;
  window: { start: string; end: string };
  clamped: boolean;
}

export type Verdict = "enough" | "borderline" | "short";
export type SizingCardKey = "inverter" | "battery" | "solar";

export interface VerdictBlock {
  verdict: Verdict | null;
  /** Why no verdict: "no_data" or, for the battery, "never_full". */
  reason: string | null;
  evidence: Record<string, number | null>;
  /**
   * The share of the span this card's own sensor had statistics for, which is
   * not the month's: a full month of load beside twelve days of charge would
   * otherwise present the battery verdict under a full-month banner.
   */
  coverage: number;
  /** Solar only: production covers the load but the battery is not filling. */
  note?: "covers_but_battery_not_filling";
}

export interface SizingMonth {
  key: string;
  coverage: number;
  complete: boolean;
  inverter: VerdictBlock | null;
  battery: VerdictBlock | null;
  solar: VerdictBlock | null;
}

export interface SizingCard {
  missing: string[];
  no_statistics: string[];
  /** Battery only: the full mark is at or below the low mark, so no day can be judged. */
  thresholds_inverted?: boolean;
}

export interface SizingPayload {
  period: Record<SizingCardKey, VerdictBlock | null>;
  months: SizingMonth[];
  incomplete_below: number;
  rules: {
    inverter_short_share: number;
    inverter_borderline_share: number;
    high_load_share: number;
    battery_short_share: number;
    solar_enough_share: number;
    solar_borderline_share: number;
    solar_fill_share: number;
    low_pct: number;
    full_pct: number;
  };
  cards: Record<SizingCardKey, SizingCard>;
  entities: Record<string, string>;
  covered_start: string | null;
  covered_end: string | null;
  covers_whole_window: boolean;
  timezone: string;
  precision: Precision;
  boundary: string | null;
  window: { start: string; end: string };
  clamped: boolean;
}
