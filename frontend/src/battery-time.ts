/**
 * The Battery time card's arithmetic: pure, so it is tested without a DOM.
 *
 * The time is the measured usable capacity (never the nameplate) times the
 * points left to the target, over the current battery power. It assumes the
 * power holds, which is why the card says "at the current power".
 */
import {
  DASH,
  etaParts,
  etaText,
  formatCardPower,
} from "./battery-time-looks";
import type { CardMessages } from "./i18n/card-en";
import type { BatteryEtaBasis } from "./types";

export { DASH, formatCardPower };
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
      /** The power's direction, decided here once for the word, the target and the tone. */
      direction: "charging" | "discharging";
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
  // The one place the direction is decided; zero power is not charging.
  const charging = p > 0;
  if (input.capacityKwh === null) {
    return {
      kind: "no_capacity",
      direction: charging ? "charging" : "discharging",
      reason: basis.capacity_reason === "missing_roles" ? "missing_roles" : "too_few_clean_hours",
      clean_hours: basis.clean_hours,
      clean_hours_min: basis.clean_hours_min,
      missing_roles: basis.missing_roles,
    };
  }
  const target = charging ? chargeTo : dischargeTo;
  const hours = (input.capacityKwh * Math.abs(target - soc)) / 100 / (Math.abs(p) / 1000);
  return { kind: charging ? "charging" : "discharging", target, minutes: hours * 60 };
}

/**
 * The time to the target as one string: "45 min (≈15:15)", "2 h 10 min
 * (≈16:40)", or "over 2 days" with no clock time. etaParts has the rules.
 */
export function formatEta(minutes: number, now: Date, locale: string, m: CardMessages): string {
  return etaText(etaParts(minutes, now, locale, m), locale, m);
}

/** The card's own config keys; anything else in the config belongs to Home Assistant. */
export interface CardConfig {
  type?: string;
  entry_id?: string;
  charge_to?: number | string;
  discharge_to?: number | string;
  /** The card's layout, as the YAML has it; read through layoutOf. */
  layout?: string;
  /** The badge's style, as the YAML has it; read through styleOf. */
  style?: string;
  [key: string]: unknown;
}

/** Text from the form back into a config value: a number stays a number, empty is unset. */
function configValue(value: unknown): number | string | undefined {
  if (value === undefined || value === null) return undefined;
  const text = String(value).trim();
  if (text === "") return undefined;
  const number = Number(text);
  return Number.isFinite(number) ? number : text;
}

/**
 * The config after the editor's form changed: its fields set or removed,
 * every other key — grid_options, visibility, card_mod — kept. A field the
 * form did not hand back counts as left empty, as before: the card's editor
 * has no style and the badge's no layout, so neither keeps the other's.
 */
type EditorKey = "entry_id" | "charge_to" | "discharge_to" | "layout" | "style";

/** The keys the card's editor owns; the badge's `style` is not among them. */
export const CARD_EDITOR_KEYS: readonly EditorKey[] = [
  "entry_id",
  "charge_to",
  "discharge_to",
  "layout",
];

/** The keys the badge's editor owns; the card's `layout` is not among them. */
export const BADGE_EDITOR_KEYS: readonly EditorKey[] = [
  "entry_id",
  "charge_to",
  "discharge_to",
  "style",
];

/**
 * The config after an edit: each key the editor owns is set from the form or,
 * when the form left it empty, removed. Keys it does not own stay as they
 * were, so the card's editor never clears a badge's style, nor the reverse.
 */
export function mergeEditorConfig(
  config: CardConfig,
  values: Record<string, unknown>,
  keys: readonly EditorKey[] = [...CARD_EDITOR_KEYS, "style"],
): CardConfig {
  const next: CardConfig = { ...config };
  for (const key of keys) {
    const value = configValue(values[key]);
    if (value === undefined) delete next[key];
    else if (key === "charge_to" || key === "discharge_to") next[key] = value;
    else next[key] = String(value);
  }
  return next;
}

function isEntityTarget(value: number | string | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !Number.isFinite(Number(value));
}

/** The entities whose state the card shows: SoC, power, and any entity target. */
export function watchedEntities(
  basis: BatteryEtaBasis | undefined,
  config: Pick<CardConfig, "charge_to" | "discharge_to">,
): string[] {
  const ids: string[] = [];
  if (basis?.soc_entity) ids.push(basis.soc_entity);
  if (basis?.battery_power_entity) ids.push(basis.battery_power_entity);
  if (isEntityTarget(config.charge_to)) ids.push(config.charge_to);
  if (isEntityTarget(config.discharge_to)) ids.push(config.discharge_to);
  return ids;
}

/** Home Assistant replaces a state object when it changes, so identity is enough. */
export function watchedStatesChanged(
  previous: readonly unknown[] | undefined,
  next: readonly unknown[],
): boolean {
  if (!previous || previous.length !== next.length) return true;
  return next.some((value, i) => value !== previous[i]);
}

export const BASIS_REFRESH_MS = 3600_000;

/** The basis is fetched again when missing or older than an hour. */
export function basisIsStale(fetchedAt: number | undefined, now: number): boolean {
  return fetchedAt === undefined || now - fetchedAt > BASIS_REFRESH_MS;
}
