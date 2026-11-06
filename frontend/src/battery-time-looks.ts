/**
 * What the Battery time card's layouts and the badge show: pure, so it is
 * tested without a DOM.
 *
 * Every face renders from one BatteryTimeView, already worded here. No face
 * words a state or a reason itself, and none computes a number: the
 * arithmetic stays in battery-time.ts.
 *
 * This module imports only types from battery-time.ts, which imports
 * etaParts and DASH from here, so the two never load each other in a cycle.
 */
import type { CardState } from "./battery-time";
import type { CardMessages } from "./i18n/card-en";

export const DASH = "—";

export type Layout = "ring" | "bar" | "tile";
export type BadgeStyle = "full" | "ring" | "time";
export type Tone = "charge" | "discharge" | "low" | "rest";

const LAYOUTS: readonly Layout[] = ["ring", "bar", "tile"];
const STYLES: readonly BadgeStyle[] = ["full", "ring", "time"];

/** The card's layout from its config; anything unknown is the ring. */
export function layoutOf(value: unknown): Layout {
  return LAYOUTS.includes(value as Layout) ? (value as Layout) : "ring";
}

/** The badge's style from its config; anything unknown is full. */
export function styleOf(value: unknown): BadgeStyle {
  return STYLES.includes(value as BadgeStyle) ? (value as BadgeStyle) : "full";
}

export interface EtaParts {
  /** "2 h 10 min", "45 min", "over 2 days". */
  duration: string;
  /** Now plus the rounded time, for every time under 48 h; null past that. */
  arrival: Date | null;
  over2Days: boolean;
}

/**
 * The time to the target, in parts: minutes under an hour; hours and
 * minutes, rounded to five minutes, under two days; past that, "over 2
 * days" and no arrival, which would mislead by then.
 */
export function etaParts(minutes: number, now: Date, locale: string, m: CardMessages): EtaParts {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  // Round first, then choose the form: 59.6 min is "1 h", 47 h 58 is "over 2 days".
  const whole = Math.max(1, Math.round(minutes));
  if (whole < 60) {
    return {
      duration: m.minutes({ m: number.format(whole) }),
      arrival: new Date(now.getTime() + whole * 60_000),
      over2Days: false,
    };
  }
  const rounded = Math.round(minutes / 5) * 5;
  if (rounded >= 48 * 60) return { duration: m.over2Days, arrival: null, over2Days: true };
  const h = Math.floor(rounded / 60);
  const rest = rounded % 60;
  const duration =
    rest === 0
      ? m.hours({ h: number.format(h) })
      : m.hoursMinutes({ h: number.format(h), m: number.format(rest) });
  return { duration, arrival: new Date(now.getTime() + rounded * 60_000), over2Days: false };
}

/** A clock time, 24-hour: "16:40". */
export function clockTime(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

/** The time as one string, as the status line words it: "2 h 10 min (≈16:40)". */
export function etaText(parts: EtaParts, locale: string, m: CardMessages): string {
  if (parts.arrival === null) return parts.duration;
  return `${parts.duration} ${m.arrival({ time: clockTime(parts.arrival, locale) })}`;
}

/** Loading: no hass yet, or no basis yet. */
export type ViewState = CardState | { kind: "loading" };

/** A percentage the way the status line shows a target: up to one decimal. */
function pct(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
}

function joinRoles(roles: string[], m: CardMessages): string {
  const names = roles.map((role) => m.roles[role] ?? role);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} ${m.and} ${names[names.length - 1]}`;
}

/**
 * The state worded: a one-word label, the status line, and the reason or
 * the basis error. The status and the note are the 0.11 card's, except that
 * a time under an hour now carries its clock time too.
 *
 * `target` is the target in the state's direction; only no_capacity reads
 * it, since the other states carry their own. `eta` is the charging or
 * discharging state's time; without one the status shows a dash.
 */
export function describeView(input: {
  state: ViewState;
  soc: number | null;
  powerW: number | null;
  target: number | null;
  eta: EtaParts | null;
  basisError: string | null;
  m: CardMessages;
  locale: string;
}): { word: string; status: string; note: string | null } {
  const { state, m, locale } = input;
  switch (state.kind) {
    case "loading":
      // A failed fetch leaves the card without a basis: say why.
      return { word: DASH, status: DASH, note: input.basisError };
    case "unmapped":
      return { word: DASH, status: DASH, note: m.unmapped };
    case "unavailable":
      return {
        word: DASH,
        status: DASH,
        note: state.entity ? m.unavailable({ entity: state.entity }) : null,
      };
    case "at_limit":
      return {
        word: m.words.atLimit,
        status: m.atLimit({ t: pct(state.target, locale) }),
        note: null,
      };
    case "at_floor":
      return {
        word: m.words.atFloor,
        status: m.atFloor({ t: pct(state.target, locale) }),
        note: null,
      };
    case "idle":
      return { word: m.words.idle, status: m.idle, note: null };
    case "no_capacity": {
      // The direction stays visible without a time.
      const charging = (input.powerW ?? 0) > 0;
      const direction = charging ? m.chargingTo : m.dischargingTo;
      const note =
        state.reason === "missing_roles"
          ? m.capacityNeedsRoles({ roles: joinRoles(state.missing_roles, m) })
          : m.capacityNotMeasured({ n: state.clean_hours, min: state.clean_hours_min });
      return {
        word: charging ? m.words.charging : m.words.discharging,
        status: m.withEta({ status: direction({ t: pct(input.target ?? 0, locale) }), eta: DASH }),
        note,
      };
    }
    case "charging":
    case "discharging": {
      const charging = state.kind === "charging";
      const direction = charging ? m.chargingTo : m.dischargingTo;
      const eta = input.eta ? etaText(input.eta, locale, m) : DASH;
      return {
        word: charging ? m.words.charging : m.words.discharging,
        status: m.withEta({ status: direction({ t: pct(state.target, locale) }), eta }),
        note: null,
      };
    }
  }
}

/**
 * The colour family of the state. Without a measured capacity the power's
 * sign decides, with cardState's own band: exactly the idle power already
 * counts as moving.
 */
export function tone(state: ViewState, powerW: number | null, idleW: number): Tone {
  switch (state.kind) {
    case "charging":
      return "charge";
    case "discharging":
      return "discharge";
    case "at_floor":
      return "low";
    case "no_capacity":
      if (powerW === null) return "rest";
      if (powerW >= idleW) return "charge";
      if (powerW <= -idleW) return "discharge";
      return "rest";
    default:
      return "rest";
  }
}

/** The Material Design battery icon for a SoC: outline below 5%, full from 95%, tens between. */
export function batteryIcon(soc: number | null, charging: boolean): string {
  if (soc === null) return "mdi:battery-unknown";
  const base = charging ? "mdi:battery-charging" : "mdi:battery";
  if (soc < 5) return `${base}-outline`;
  if (soc >= 95) return charging ? `${base}-100` : base;
  return `${base}-${Math.round(soc / 10) * 10}`;
}

/** Everything a face needs, resolved and worded. */
export interface BatteryTimeView {
  state: ViewState;
  soc: number | null;
  /** Smoothed, sign corrected: positive is charging. */
  powerW: number | null;
  chargeTo: number | null;
  dischargeTo: number | null;
  /** The target in the state's direction, if any. */
  target: number | null;
  /** Null when the state has no time. */
  eta: EtaParts | null;
  tone: Tone;
  /** One-word state label. */
  word: string;
  /** The status line, as the 0.11 card words it. */
  status: string;
  /** The reason or the basis error, worded; null when none. */
  note: string | null;
  m: CardMessages;
  locale: string;
}

/** The SoC as the faces show it: a whole percentage, or the dash. */
export function socText(soc: number | null, locale: string): string {
  if (soc === null) return DASH;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(soc)}%`;
}

/**
 * The badge's text. "Time" is the duration in full and ring, and the
 * arrival in time; a state with no time shows its word instead.
 */
export function badgeText(
  view: BatteryTimeView,
  style: BadgeStyle,
): { primary: string; secondary?: string } {
  const { m, locale, eta } = view;
  const soc = socText(view.soc, locale);
  const duration = eta ? eta.duration : view.word;
  switch (style) {
    case "full":
      return { primary: `${soc} · ${duration}` };
    case "ring": {
      const top =
        view.target === null ? soc : `${soc} · ${m.toTarget({ t: pct(view.target, locale) })}`;
      return { primary: top, secondary: duration };
    }
    case "time":
      if (eta?.arrival) return { primary: m.approx({ time: clockTime(eta.arrival, locale) }) };
      if (eta?.over2Days) return { primary: m.over2Days };
      return { primary: view.word };
  }
}

// Sections rows are 56 px with an 8 px gap; see the spec's height budgets.
const GRID: Record<Layout, { rows: number; columns: number; min_rows: number; size: number }> = {
  ring: { rows: 5, columns: 6, min_rows: 5, size: 6 },
  bar: { rows: 3, columns: 6, min_rows: 3, size: 3 },
  tile: { rows: 2, columns: 6, min_rows: 2, size: 2 },
};

/** What getGridOptions returns for the layout, in the sections view. */
export function gridOptions(layout: Layout): { rows: number; columns: number; min_rows: number } {
  const { rows, columns, min_rows } = GRID[layout];
  return { rows, columns, min_rows };
}

/** What getCardSize returns for the layout, in the masonry view. */
export function cardSize(layout: Layout): number {
  return GRID[layout].size;
}

function clampPct(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * The ring's dash and its target ticks. The fill is `fillDash` of the
 * `circumference`; each tick's `at` is degrees clockwise from the top.
 */
export function ringGeometry(
  soc: number | null,
  chargeTo: number | null,
  dischargeTo: number | null,
  radius: number,
): {
  circumference: number;
  fillDash: number;
  ticks: { at: number; kind: "charge" | "discharge" }[];
} {
  const circumference = 2 * Math.PI * radius;
  const ticks: { at: number; kind: "charge" | "discharge" }[] = [];
  const angle = (target: number) => (clampPct(target) * 360) / 100;
  if (chargeTo !== null) ticks.push({ at: angle(chargeTo), kind: "charge" });
  if (dischargeTo !== null) ticks.push({ at: angle(dischargeTo), kind: "discharge" });
  const fillDash = soc === null ? 0 : (circumference * clampPct(soc)) / 100;
  return { circumference, fillDash, ticks };
}
