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
      // The direction stays visible without a time; cardState decided it.
      const charging = state.direction === "charging";
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
 * The direction the battery is moving in, as cardState decided it; null for
 * every state at rest or without a reading.
 */
function directionOf(state: ViewState): "charging" | "discharging" | null {
  if (state.kind === "charging" || state.kind === "discharging") return state.kind;
  if (state.kind === "no_capacity") return state.direction;
  return null;
}

/** The colour family of the state. Without a measured capacity, the state's direction. */
export function tone(state: ViewState): Tone {
  if (state.kind === "at_floor") return "low";
  const direction = directionOf(state);
  if (direction === "charging") return "charge";
  if (direction === "discharging") return "discharge";
  return "rest";
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

/** Battery power: watts below a kilowatt, kilowatts with one decimal from it. */
export function formatCardPower(watts: number | null, locale: string, m: CardMessages): string {
  if (watts === null || Number.isNaN(watts)) return DASH;
  // Round first, then choose the unit: 999.6 W is "1.0 kW", not "1,000 W".
  if (Math.abs(Math.round(watts)) >= 1000) {
    const kw = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(watts / 1000);
    return `${kw} ${m.units.kw}`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(watts)} ${m.units.w}`;
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

/**
 * The badge's icon. Full: the battery at its level. Time: a bolt while
 * charging, an arrow while discharging, the battery otherwise. Ring: none,
 * since the mini ring takes its place.
 */
export function badgeIcon(view: BatteryTimeView, style: BadgeStyle): string | null {
  if (style === "ring") return null;
  const direction = directionOf(view.state);
  if (style === "time") {
    if (direction === "charging") return "mdi:lightning-bolt";
    if (direction === "discharging") return "mdi:arrow-down";
  }
  return batteryIcon(view.soc, direction === "charging");
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

/** A target as a mark's label shows it: "85%", up to one decimal. */
export function pctLabel(value: number, locale: string): string {
  return `${pct(value, locale)}%`;
}

/**
 * The target and the arrival: "to 85% · ≈16:40" under the ring. Without an
 * arrival only the target; without a target, nothing.
 */
export function targetLine(view: BatteryTimeView): string | null {
  const { m, locale } = view;
  if (view.target === null) return null;
  const to = m.toTarget({ t: pct(view.target, locale) });
  const arrival = view.eta?.arrival;
  if (!arrival) return to;
  return `${to} · ${m.approx({ time: clockTime(arrival, locale) })}`;
}

/**
 * The line under the bar's time, which the big text already shows: the
 * target and the arrival as under the ring; the status in a state with no
 * time.
 */
export function barLine(view: BatteryTimeView): string {
  return (view.eta ? targetLine(view) : null) ?? view.status;
}

/**
 * The power pill: the power without its sign, and an arrow for the state's
 * direction. At rest (idle, at the limit, at the floor) there is no arrow:
 * a few watts either way are not a direction. No pill while loading or with
 * no power.
 */
export function powerPill(view: BatteryTimeView): { icon: string | null; text: string } | null {
  const { powerW } = view;
  if (view.state.kind === "loading" || powerW === null || Number.isNaN(powerW)) return null;
  const direction = directionOf(view.state);
  const icon =
    direction === "charging" ? "mdi:arrow-up" : direction === "discharging" ? "mdi:arrow-down" : null;
  return { icon, text: formatCardPower(Math.abs(powerW), view.locale, view.m) };
}

/** A target's mark on the bar or the tile: where, which, and how its label sits. */
export interface TargetMark {
  /** Percent along the bar, clamped to 0–100. */
  at: number;
  kind: "charge" | "discharge";
  /** "85%", up to one decimal; the target as set, before clamping. */
  label: string;
  /**
   * How the label sits on the mark: centred, or beginning or ending at it
   * near an edge, so "100.5%" stays inside the bar.
   */
  anchor: "start" | "middle" | "end";
}

/**
 * Both targets' marks, the discharge one first: whichever way the battery
 * moves, the tile and the bar show where it stops either way.
 */
export function targetMarks(view: BatteryTimeView): TargetMark[] {
  const marks: TargetMark[] = [];
  const mark = (target: number | null, kind: TargetMark["kind"]) => {
    if (target === null) return;
    const at = clampPct(target);
    const anchor = at <= 10 ? "start" : at >= 90 ? "end" : "middle";
    marks.push({ at, kind, label: pctLabel(target, view.locale), anchor });
  };
  mark(view.dischargeTo, "discharge");
  mark(view.chargeTo, "charge");
  return marks;
}

/**
 * The tile's second line: "≈16:40 · ↑ 1.8 kW". The target is left out, for
 * the line to fit half a section; the ticks on the tile's bar show the
 * targets, as targetMarks places them.
 */
export function tileLine(view: BatteryTimeView): {
  text: string | null;
  icon: string | null;
  power: string | null;
} {
  const arrival = view.eta?.arrival;
  const pill = powerPill(view);
  return {
    text: arrival ? view.m.approx({ time: clockTime(arrival, view.locale) }) : null,
    icon: pill?.icon ?? null,
    power: pill?.text ?? null,
  };
}

/** The tile's first line: "62% · 2 h 10 min"; "— · —" where nothing is known. */
export function tilePrimary(view: BatteryTimeView): string {
  const kind = view.state.kind;
  if (kind === "unmapped" || kind === "unavailable" || kind === "loading") {
    return `${DASH} · ${DASH}`;
  }
  return badgeText(view, "full").primary;
}

/** What a screen reader says for a face: the SoC, the status and the signed power. */
export function faceSentence(view: BatteryTimeView): string {
  const { m, locale } = view;
  return m.sentence({
    soc: socText(view.soc, locale),
    status: view.status,
    power: formatCardPower(view.powerW, locale, m),
  });
}

/** One field of the card editor's ha-form. */
export type EditorField =
  | {
      name: "layout";
      selector: { select: { mode: "dropdown"; options: { value: Layout; label: string }[] } };
    }
  | { name: "entry_id" | "charge_to" | "discharge_to"; selector: { text: Record<string, never> } };

/** The card editor's form, worded in the language: the layout, then the three targets. */
export function editorSchema(m: CardMessages): EditorField[] {
  return [
    {
      name: "layout",
      selector: {
        select: {
          mode: "dropdown",
          options: LAYOUTS.map((value) => ({ value, label: m.layouts[value] })),
        },
      },
    },
    { name: "entry_id", selector: { text: {} } },
    { name: "charge_to", selector: { text: {} } },
    { name: "discharge_to", selector: { text: {} } },
  ];
}

/** One field of the badge editor's ha-form. */
export type BadgeEditorField =
  | {
      name: "style";
      selector: { select: { mode: "dropdown"; options: { value: BadgeStyle; label: string }[] } };
    }
  | { name: "entry_id" | "charge_to" | "discharge_to"; selector: { text: Record<string, never> } };

/** The badge editor's form, worded in the language: the style, then the three targets. */
export function badgeEditorSchema(m: CardMessages): BadgeEditorField[] {
  return [
    {
      name: "style",
      selector: {
        select: {
          mode: "dropdown",
          options: STYLES.map((value) => ({ value, label: m.styles[value] })),
        },
      },
    },
    { name: "entry_id", selector: { text: {} } },
    { name: "charge_to", selector: { text: {} } },
    { name: "discharge_to", selector: { text: {} } },
  ];
}
