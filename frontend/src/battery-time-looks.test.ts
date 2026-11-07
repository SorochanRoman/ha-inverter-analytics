import { describe, expect, it } from "vitest";
import { cardState, type CardState } from "./battery-time";
import {
  badgeText,
  barLine,
  batteryIcon,
  cardSize,
  describeView,
  editorSchema,
  etaParts,
  faceSentence,
  gridOptions,
  layoutOf,
  pctLabel,
  powerPill,
  ringGeometry,
  targetLine,
  tileLine,
  tilePrimary,
  styleOf,
  tone,
  type BatteryTimeView,
  type EtaParts,
  type ViewState,
} from "./battery-time-looks";
import { cardEn, type CardMessages } from "./i18n/card-en";
import { cardUk } from "./i18n/card-uk";
import type { BatteryEtaBasis } from "./types";

// Local time, so the clock time does not depend on the test machine's zone.
const now = new Date(2026, 10, 6, 14, 30);
const at = (h: number, min: number) => new Date(2026, 10, 6, h, min);

describe("the parts of the time", () => {
  it("gives minutes under an hour, now with the arrival", () => {
    expect(etaParts(45, now, "en", cardEn)).toEqual({
      duration: "45 min",
      arrival: at(15, 15),
      over2Days: false,
    });
    expect(etaParts(0.2, now, "en", cardEn)).toEqual({
      duration: "1 min",
      arrival: at(14, 31),
      over2Days: false,
    });
  });

  it("gives hours and minutes from an hour, rounded to five minutes", () => {
    expect(etaParts(60, now, "en", cardEn)).toEqual({
      duration: "1 h",
      arrival: at(15, 30),
      over2Days: false,
    });
    expect(etaParts(128, now, "en", cardEn)).toEqual({
      duration: "2 h 10 min",
      arrival: at(16, 40),
      over2Days: false,
    });
    expect(etaParts(122, now, "en", cardEn).duration).toBe("2 h");
  });

  it("still has an arrival at 47 h 55 min", () => {
    const parts = etaParts(47 * 60 + 55, now, "en", cardEn);
    expect(parts.duration).toBe("47 h 55 min");
    expect(parts.arrival).toEqual(new Date(now.getTime() + (47 * 60 + 55) * 60_000));
    expect(parts.over2Days).toBe(false);
  });

  it("says over 2 days from 48 h, with no arrival", () => {
    expect(etaParts(48 * 60, now, "en", cardEn)).toEqual({
      duration: "over 2 days",
      arrival: null,
      over2Days: true,
    });
  });

  it("chooses the form from the rounded value", () => {
    expect(etaParts(59.4, now, "en", cardEn).duration).toBe("59 min");
    expect(etaParts(59.6, now, "en", cardEn).duration).toBe("1 h");
    expect(etaParts(47 * 60 + 58, now, "en", cardEn).over2Days).toBe(true);
  });

  it("words the duration in Ukrainian", () => {
    expect(etaParts(45, now, "uk", cardUk).duration).toBe("45 хв");
    expect(etaParts(128, now, "uk", cardUk).duration).toBe("2 год 10 хв");
    expect(etaParts(48 * 60, now, "uk", cardUk).duration).toBe("понад 2 доби");
  });
});

const charging: CardState = { kind: "charging", target: 85, minutes: 128 };
const discharging: CardState = { kind: "discharging", target: 20, minutes: 45 };
const noCapacityHours: CardState = {
  kind: "no_capacity",
  direction: "charging",
  reason: "too_few_clean_hours",
  clean_hours: 12,
  clean_hours_min: 20,
  missing_roles: [],
};
const noCapacityRoles: CardState = {
  kind: "no_capacity",
  direction: "discharging",
  reason: "missing_roles",
  clean_hours: 0,
  clean_hours_min: 20,
  missing_roles: ["battery_soc", "battery_charge_total", "battery_discharge_total"],
};

function describeIn(
  m: CardMessages,
  locale: string,
  state: ViewState,
  fields: { target?: number | null; basisError?: string | null } = {},
) {
  const eta =
    state.kind === "charging" || state.kind === "discharging"
      ? etaParts(state.minutes, now, locale, m)
      : null;
  return describeView({
    state,
    soc: 62,
    target: fields.target ?? null,
    eta,
    basisError: fields.basisError ?? null,
    m,
    locale,
  });
}

describe("the worded view, in English", () => {
  const d = (state: ViewState, fields?: Parameters<typeof describeIn>[3]) =>
    describeIn(cardEn, "en", state, fields);

  it("charging and discharging carry the time and its clock time", () => {
    expect(d(charging, { target: 85 })).toEqual({
      word: "charging",
      status: "Charging to 85% · 2 h 10 min (≈16:40)",
      note: null,
    });
    expect(d(discharging, { target: 20 })).toEqual({
      word: "discharging",
      status: "Discharging to 20% · 45 min (≈15:15)",
      note: null,
    });
  });

  it("at the limit, at the floor and idle", () => {
    expect(d({ kind: "at_limit", target: 85 })).toEqual({
      word: "at limit",
      status: "At limit 85%",
      note: null,
    });
    expect(d({ kind: "at_floor", target: 20 })).toEqual({
      word: "floor",
      status: "At floor 20%",
      note: null,
    });
    expect(d({ kind: "idle" })).toEqual({ word: "idle", status: "Idle", note: null });
  });

  it("a target with a fraction keeps one decimal", () => {
    expect(d({ kind: "at_limit", target: 85.25 }).status).toBe("At limit 85.3%");
  });

  it("no capacity keeps the direction and names the reason", () => {
    expect(d(noCapacityHours, { target: 85 })).toEqual({
      word: "charging",
      status: "Charging to 85% · —",
      note: "Capacity not measured yet (12 of 20 clean discharge hours)",
    });
    expect(d(noCapacityRoles, { target: 20 })).toEqual({
      word: "discharging",
      status: "Discharging to 20% · —",
      note: "Capacity needs battery SoC, battery charge total and battery discharge total mapped",
    });
  });

  it("names a single missing role without a list", () => {
    const one: CardState = { ...noCapacityRoles, missing_roles: ["battery_soc"] } as CardState;
    expect(d(one, { target: 85 }).note).toBe("Capacity needs battery SoC mapped");
  });

  it("unmapped and unavailable have a dash and say why", () => {
    expect(d({ kind: "unmapped" })).toEqual({
      word: "—",
      status: "—",
      note: "Map battery SoC and battery power in Inverter Analytics",
    });
    expect(d({ kind: "unavailable", entity: "sensor.soc" })).toEqual({
      word: "—",
      status: "—",
      note: "sensor.soc is unavailable",
    });
    expect(d({ kind: "unavailable", entity: "" })).toEqual({ word: "—", status: "—", note: null });
  });

  it("loading has a dash, and the basis error when the fetch failed", () => {
    expect(d({ kind: "loading" })).toEqual({ word: "—", status: "—", note: null });
    expect(d({ kind: "loading" }, { basisError: "Unknown command." })).toEqual({
      word: "—",
      status: "—",
      note: "Unknown command.",
    });
  });
});

describe("the worded view, in Ukrainian", () => {
  const d = (state: ViewState, fields?: Parameters<typeof describeIn>[3]) =>
    describeIn(cardUk, "uk", state, fields);

  it("words every state", () => {
    expect(d(charging, { target: 85 })).toEqual({
      word: "заряд",
      status: "Заряд до 85% · 2 год 10 хв (≈16:40)",
      note: null,
    });
    expect(d(discharging, { target: 20 })).toEqual({
      word: "розряд",
      status: "Розряд до 20% · 45 хв (≈15:15)",
      note: null,
    });
    expect(d({ kind: "at_limit", target: 85 })).toEqual({
      word: "на ліміті",
      status: "Досягла ліміту 85%",
      note: null,
    });
    expect(d({ kind: "at_floor", target: 20 })).toEqual({
      word: "мінімум",
      status: "Досягла нижньої межі 20%",
      note: null,
    });
    expect(d({ kind: "idle" })).toEqual({ word: "простій", status: "Простій", note: null });
    expect(d(noCapacityHours, { target: 85 })).toEqual({
      word: "заряд",
      status: "Заряд до 85% · —",
      note: "Ємність ще не виміряна (12 з 20 чистих годин розряду)",
    });
    expect(d(noCapacityRoles, { target: 20 })).toEqual({
      word: "розряд",
      status: "Розряд до 20% · —",
      // Short role names: the note has two lines in the bar and the tile.
      note: "Для ємності вкажіть рівень заряду, лічильник заряду і лічильник розряду",
    });
    expect(d({ kind: "unmapped" })).toEqual({
      word: "—",
      status: "—",
      note: "Вкажіть рівень заряду й потужність батареї в Inverter Analytics",
    });
    expect(d({ kind: "unavailable", entity: "sensor.soc" })).toEqual({
      word: "—",
      status: "—",
      note: "Сутність sensor.soc недоступна",
    });
    expect(d({ kind: "loading" })).toEqual({ word: "—", status: "—", note: null });
    expect(d({ kind: "loading" }, { basisError: "Помилка" }).note).toBe("Помилка");
  });

  it("formats a fractional target the Ukrainian way", () => {
    expect(d({ kind: "at_limit", target: 85.5 }).status).toBe("Досягла ліміту 85,5%");
  });
});

describe("the tone", () => {
  it("follows the state's kind", () => {
    expect(tone(charging)).toBe("charge");
    expect(tone(discharging)).toBe("discharge");
    expect(tone({ kind: "at_floor", target: 20 })).toBe("low");
    expect(tone({ kind: "at_limit", target: 85 })).toBe("rest");
    expect(tone({ kind: "idle" })).toBe("rest");
    expect(tone({ kind: "unmapped" })).toBe("rest");
    expect(tone({ kind: "unavailable", entity: "sensor.soc" })).toBe("rest");
    expect(tone({ kind: "loading" })).toBe("rest");
  });

  it("is charge for a battery charging below its floor", () => {
    const basis: BatteryEtaBasis = {
      capacity_kwh: 10,
      capacity_reason: null,
      missing_roles: [],
      clean_hours: 40,
      clean_hours_min: 20,
      window_days: 60,
      computed_at: "2026-11-06T12:00:00+00:00",
      soc_entity: "sensor.soc",
      battery_power_entity: "sensor.battery_power",
      battery_power_inverted: false,
      idle_w: 50,
      low_pct: 20,
    };
    const state = cardState({
      soc: 15,
      powerW: 1800,
      chargeTo: 85,
      dischargeTo: 20,
      unavailable: null,
      mapped: true,
      capacityKwh: 10,
      basis,
    });
    expect(tone(state)).toBe("charge");
  });

  it("follows the state's direction without a measured capacity", () => {
    expect(tone(noCapacityHours)).toBe("charge");
    expect(tone(noCapacityRoles)).toBe("discharge");
  });
});

describe("the battery icon", () => {
  it("steps by tens while not charging", () => {
    expect(batteryIcon(0, false)).toBe("mdi:battery-outline");
    expect(batteryIcon(4, false)).toBe("mdi:battery-outline");
    expect(batteryIcon(5, false)).toBe("mdi:battery-10");
    expect(batteryIcon(62, false)).toBe("mdi:battery-60");
    expect(batteryIcon(94, false)).toBe("mdi:battery-90");
    expect(batteryIcon(95, false)).toBe("mdi:battery");
    expect(batteryIcon(100, false)).toBe("mdi:battery");
  });

  it("steps by tens while charging", () => {
    expect(batteryIcon(0, true)).toBe("mdi:battery-charging-outline");
    expect(batteryIcon(4, true)).toBe("mdi:battery-charging-outline");
    expect(batteryIcon(5, true)).toBe("mdi:battery-charging-10");
    expect(batteryIcon(66, true)).toBe("mdi:battery-charging-70");
    expect(batteryIcon(94, true)).toBe("mdi:battery-charging-90");
    expect(batteryIcon(95, true)).toBe("mdi:battery-charging-100");
    expect(batteryIcon(100, true)).toBe("mdi:battery-charging-100");
  });

  it("is unknown with no SoC", () => {
    expect(batteryIcon(null, false)).toBe("mdi:battery-unknown");
    expect(batteryIcon(null, true)).toBe("mdi:battery-unknown");
  });
});

function view(
  m: CardMessages,
  locale: string,
  state: ViewState,
  fields: Partial<BatteryTimeView> = {},
): BatteryTimeView {
  const eta: EtaParts | null =
    state.kind === "charging" || state.kind === "discharging"
      ? etaParts(state.minutes, now, locale, m)
      : null;
  let target: number | null = null;
  if (state.kind === "charging" || state.kind === "discharging") target = state.target;
  else if (state.kind === "no_capacity") target = state.direction === "charging" ? 85 : 20;
  const soc = "soc" in fields ? (fields.soc ?? null) : 62;
  const powerW = fields.powerW ?? 1800;
  const words = describeView({
    state,
    soc,
    target,
    eta,
    basisError: null,
    m,
    locale,
  });
  return {
    state,
    soc,
    powerW,
    chargeTo: 85,
    dischargeTo: 20,
    target,
    eta,
    tone: tone(state),
    ...words,
    m,
    locale,
    ...fields,
  };
}

const badgeStates: [string, ViewState][] = [
  ["charging", charging],
  ["discharging", discharging],
  ["at_limit", { kind: "at_limit", target: 85 }],
  ["at_floor", { kind: "at_floor", target: 20 }],
  ["idle", { kind: "idle" }],
  ["no_capacity", noCapacityHours],
  ["unmapped", { kind: "unmapped" }],
  ["unavailable", { kind: "unavailable", entity: "sensor.soc" }],
  ["loading", { kind: "loading" }],
];

describe("the badge's text, in English", () => {
  const v = (state: ViewState, fields?: Partial<BatteryTimeView>) =>
    view(cardEn, "en", state, fields);
  const expected: Record<string, Record<"full" | "ring" | "time", object>> = {
    charging: {
      full: { primary: "62% · 2 h 10 min" },
      ring: { primary: "62% · to 85%", secondary: "2 h 10 min" },
      time: { primary: "≈16:40" },
    },
    discharging: {
      full: { primary: "62% · 45 min" },
      ring: { primary: "62% · to 20%", secondary: "45 min" },
      time: { primary: "≈15:15" },
    },
    at_limit: {
      full: { primary: "62% · at limit" },
      ring: { primary: "62%", secondary: "at limit" },
      time: { primary: "at limit" },
    },
    at_floor: {
      full: { primary: "62% · floor" },
      ring: { primary: "62%", secondary: "floor" },
      time: { primary: "floor" },
    },
    idle: {
      full: { primary: "62% · idle" },
      ring: { primary: "62%", secondary: "idle" },
      time: { primary: "idle" },
    },
    no_capacity: {
      full: { primary: "62% · charging" },
      ring: { primary: "62% · to 85%", secondary: "charging" },
      time: { primary: "charging" },
    },
    unmapped: {
      full: { primary: "— · —" },
      ring: { primary: "—", secondary: "—" },
      time: { primary: "—" },
    },
    unavailable: {
      full: { primary: "— · —" },
      ring: { primary: "—", secondary: "—" },
      time: { primary: "—" },
    },
    loading: {
      full: { primary: "— · —" },
      ring: { primary: "—", secondary: "—" },
      time: { primary: "—" },
    },
  };

  for (const [name, state] of badgeStates) {
    it(`words ${name} in each style`, () => {
      const noSoc = ["unmapped", "unavailable", "loading"].includes(name);
      const vw = v(state, noSoc ? { soc: null } : {});
      for (const style of ["full", "ring", "time"] as const) {
        expect(badgeText(vw, style), `${name} ${style}`).toEqual(expected[name][style]);
      }
    });
  }

  it("says over 2 days in the time style past 48 h", () => {
    const vw = v({ kind: "charging", target: 85, minutes: 50 * 60 });
    expect(badgeText(vw, "time")).toEqual({ primary: "over 2 days" });
    expect(badgeText(vw, "full")).toEqual({ primary: "62% · over 2 days" });
  });

  it("reads a dash and the word with no SoC, whatever the state", () => {
    expect(badgeText(v({ kind: "idle" }, { soc: null }), "full")).toEqual({ primary: "— · idle" });
  });

  it("names the target in the ring style whenever the view has one", () => {
    expect(badgeText(v({ kind: "at_limit", target: 85 }, { target: 85 }), "ring")).toEqual({
      primary: "62% · to 85%",
      secondary: "at limit",
    });
  });
});

describe("the badge's text, in Ukrainian", () => {
  const v = (state: ViewState, fields?: Partial<BatteryTimeView>) =>
    view(cardUk, "uk", state, fields);
  const expected: Record<string, Record<"full" | "ring" | "time", object>> = {
    charging: {
      full: { primary: "62% · 2 год 10 хв" },
      ring: { primary: "62% · до 85%", secondary: "2 год 10 хв" },
      time: { primary: "≈16:40" },
    },
    discharging: {
      full: { primary: "62% · 45 хв" },
      ring: { primary: "62% · до 20%", secondary: "45 хв" },
      time: { primary: "≈15:15" },
    },
    at_limit: {
      full: { primary: "62% · на ліміті" },
      ring: { primary: "62%", secondary: "на ліміті" },
      time: { primary: "на ліміті" },
    },
    at_floor: {
      full: { primary: "62% · мінімум" },
      ring: { primary: "62%", secondary: "мінімум" },
      time: { primary: "мінімум" },
    },
    idle: {
      full: { primary: "62% · простій" },
      ring: { primary: "62%", secondary: "простій" },
      time: { primary: "простій" },
    },
    no_capacity: {
      full: { primary: "62% · заряд" },
      ring: { primary: "62% · до 85%", secondary: "заряд" },
      time: { primary: "заряд" },
    },
    unmapped: {
      full: { primary: "— · —" },
      ring: { primary: "—", secondary: "—" },
      time: { primary: "—" },
    },
    unavailable: {
      full: { primary: "— · —" },
      ring: { primary: "—", secondary: "—" },
      time: { primary: "—" },
    },
    loading: {
      full: { primary: "— · —" },
      ring: { primary: "—", secondary: "—" },
      time: { primary: "—" },
    },
  };

  for (const [name, state] of badgeStates) {
    it(`words ${name} in each style`, () => {
      const noSoc = ["unmapped", "unavailable", "loading"].includes(name);
      const vw = v(state, noSoc ? { soc: null } : {});
      for (const style of ["full", "ring", "time"] as const) {
        expect(badgeText(vw, style), `${name} ${style}`).toEqual(expected[name][style]);
      }
    });
  }

  it("says over 2 days in the time style past 48 h", () => {
    const vw = v({ kind: "charging", target: 85, minutes: 50 * 60 });
    expect(badgeText(vw, "time")).toEqual({ primary: "понад 2 доби" });
  });
});

describe("the layout's size", () => {
  it("matches the height budgets", () => {
    expect(gridOptions("ring")).toEqual({ rows: 5, columns: 6, min_rows: 5 });
    expect(gridOptions("bar")).toEqual({ rows: 3, columns: 6, min_rows: 3 });
    expect(gridOptions("tile")).toEqual({ rows: 2, columns: 6, min_rows: 2 });
    expect(cardSize("ring")).toBe(6);
    expect(cardSize("bar")).toBe(3);
    expect(cardSize("tile")).toBe(2);
  });
});

describe("the layout and the style from the config", () => {
  it("keep a known value", () => {
    expect(layoutOf("ring")).toBe("ring");
    expect(layoutOf("bar")).toBe("bar");
    expect(layoutOf("tile")).toBe("tile");
    expect(styleOf("full")).toBe("full");
    expect(styleOf("ring")).toBe("ring");
    expect(styleOf("time")).toBe("time");
  });

  it("fall back to ring and full", () => {
    for (const value of [undefined, null, "", "donut", 3, "RING", {}]) {
      expect(layoutOf(value)).toBe("ring");
      expect(styleOf(value)).toBe("full");
    }
    expect(styleOf("bar")).toBe("full");
    expect(layoutOf("time")).toBe("ring");
  });
});

describe("the ring's geometry", () => {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  it("fills nothing at 0, half at 50, all at 100", () => {
    expect(ringGeometry(0, null, null, radius)).toEqual({ circumference, fillDash: 0, ticks: [] });
    expect(ringGeometry(50, null, null, radius).fillDash).toBeCloseTo(circumference / 2);
    expect(ringGeometry(100, null, null, radius).fillDash).toBeCloseTo(circumference);
  });

  it("clamps the SoC, and fills nothing with none", () => {
    expect(ringGeometry(120, null, null, radius).fillDash).toBeCloseTo(circumference);
    expect(ringGeometry(-5, null, null, radius).fillDash).toBe(0);
    expect(ringGeometry(null, null, null, radius).fillDash).toBe(0);
  });

  it("places the targets' ticks clockwise from the top", () => {
    expect(ringGeometry(50, 85, 20, radius).ticks).toEqual([
      { at: 306, kind: "charge" },
      { at: 72, kind: "discharge" },
    ]);
    expect(ringGeometry(50, 100, 0, radius).ticks).toEqual([
      { at: 360, kind: "charge" },
      { at: 0, kind: "discharge" },
    ]);
    expect(ringGeometry(50, 50, null, radius).ticks).toEqual([{ at: 180, kind: "charge" }]);
  });
});

describe("the card editor's schema", () => {
  it("offers the three layouts first, worded in the language", () => {
    for (const m of [cardEn, cardUk]) {
      const schema = editorSchema(m);
      expect(schema.map((field) => field.name)).toEqual([
        "layout",
        "entry_id",
        "charge_to",
        "discharge_to",
      ]);
      expect(schema[0].selector).toEqual({
        select: {
          mode: "dropdown",
          options: [
            { value: "ring", label: m.layouts.ring },
            { value: "bar", label: m.layouts.bar },
            { value: "tile", label: m.layouts.tile },
          ],
        },
      });
      for (const field of schema.slice(1)) expect(field.selector).toEqual({ text: {} });
    }
    expect(editorSchema(cardUk)[0].selector).not.toEqual(editorSchema(cardEn)[0].selector);
  });
});

describe("the faces' lines", () => {
  const en = (state: ViewState, fields?: Partial<BatteryTimeView>) =>
    view(cardEn, "en", state, fields);
  const uk = (state: ViewState, fields?: Partial<BatteryTimeView>) =>
    view(cardUk, "uk", state, fields);

  it("words the target and the arrival", () => {
    expect(targetLine(en(charging))).toBe("to 85% · ≈16:40");
    expect(targetLine(uk(charging))).toBe("до 85% · ≈16:40");
  });

  it("drops the arrival when there is none, and the line with no target", () => {
    const far = { kind: "charging", target: 85, minutes: 50 * 60 } as const;
    expect(targetLine(en(far))).toBe("to 85%");
    expect(targetLine(en({ kind: "idle" }))).toBeNull();
    expect(targetLine(en(noCapacityHours, { target: 85 }))).toBe("to 85%");
  });

  it("shows the power without its sign, the arrow giving the direction", () => {
    expect(powerPill(en(charging, { powerW: 1800 }))).toEqual({
      icon: "mdi:arrow-up",
      text: "1.8 kW",
    });
    expect(powerPill(uk(discharging, { powerW: -650 }))).toEqual({
      icon: "mdi:arrow-down",
      text: "650 Вт",
    });
    expect(powerPill(uk(noCapacityRoles, { powerW: -650 }))).toEqual({
      icon: "mdi:arrow-down",
      text: "650 Вт",
    });
  });

  it("shows no arrow at rest, only the power", () => {
    expect(powerPill(en({ kind: "idle" }, { powerW: 10 }))).toEqual({ icon: null, text: "10 W" });
    expect(powerPill(en({ kind: "idle" }, { powerW: -0.3 }))).toEqual({ icon: null, text: "0 W" });
    expect(powerPill(en({ kind: "at_limit", target: 85 }, { powerW: 30 }))).toEqual({
      icon: null,
      text: "30 W",
    });
    expect(powerPill(uk({ kind: "at_floor", target: 20 }, { powerW: -20 }))).toEqual({
      icon: null,
      text: "20 Вт",
    });
  });

  it("puts the target and the arrival under the bar's time, or the status without one", () => {
    expect(barLine(en(charging))).toBe("to 85% · ≈16:40");
    expect(barLine(uk(discharging))).toBe("до 20% · ≈15:15");
    const far = { kind: "charging", target: 85, minutes: 50 * 60 } as const;
    expect(barLine(en(far))).toBe("to 85%");
    expect(barLine(en({ kind: "at_floor", target: 20 }))).toBe("At floor 20%");
    expect(barLine(uk({ kind: "idle" }))).toBe("Простій");
    expect(barLine(en(noCapacityHours))).toBe("Charging to 85% · —");
    expect(barLine(en({ kind: "loading" }))).toBe("—");
  });

  it("words the tile's second line: the arrival and the power, no target", () => {
    expect(tileLine(uk(charging, { powerW: 1800 }))).toEqual({
      text: "≈16:40",
      icon: "mdi:arrow-up",
      power: "1,8 кВт",
    });
    const far = { kind: "discharging", target: 20, minutes: 50 * 60 } as const;
    expect(tileLine(en(far, { powerW: -1800 }))).toEqual({
      text: null,
      icon: "mdi:arrow-down",
      power: "1.8 kW",
    });
    expect(tileLine(en({ kind: "idle" }, { powerW: 10 }))).toEqual({
      text: null,
      icon: null,
      power: "10 W",
    });
    expect(tileLine(en({ kind: "loading" }, { powerW: null }))).toEqual({
      text: null,
      icon: null,
      power: null,
    });
  });

  it("shows no power pill while loading or with no power", () => {
    expect(powerPill(en({ kind: "loading" }, { powerW: null }))).toBeNull();
    expect(powerPill(en({ kind: "unavailable", entity: "sensor.p" }, { powerW: null }))).toBeNull();
  });

  it("words the tile's first line, dashes where nothing is known", () => {
    expect(tilePrimary(en(charging))).toBe("62% · 2 h 10 min");
    expect(tilePrimary(uk({ kind: "idle" }))).toBe("62% · простій");
    expect(tilePrimary(uk({ kind: "at_floor", target: 20 }))).toBe("62% · мінімум");
    expect(tilePrimary(en({ kind: "at_floor", target: 20 }))).toBe("62% · floor");
    expect(tilePrimary(en({ kind: "unavailable", entity: "sensor.p" }))).toBe("— · —");
    expect(tilePrimary(en({ kind: "unmapped" }))).toBe("— · —");
    expect(tilePrimary(en({ kind: "loading" }, { soc: null }))).toBe("— · —");
  });

  it("says the whole state for a screen reader", () => {
    expect(faceSentence(en(charging, { powerW: 1800 }))).toBe(
      "Battery at 62%. Charging to 85% · 2 h 10 min (≈16:40). Battery power 1.8 kW.",
    );
    expect(faceSentence(en({ kind: "loading" }, { soc: null, powerW: null }))).toBe(
      "Battery at —. —. Battery power —.",
    );
    expect(faceSentence(uk(discharging, { powerW: -650 }))).toBe(
      "Заряд батареї 62%. Розряд до 20% · 45 хв (≈15:15). Потужність батареї -650 Вт.",
    );
  });

  it("labels a target mark with up to one decimal", () => {
    expect(pctLabel(20, "en")).toBe("20%");
    expect(pctLabel(85.25, "en")).toBe("85.3%");
    expect(pctLabel(85.5, "uk")).toBe("85,5%");
  });
});
