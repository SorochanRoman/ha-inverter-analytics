/**
 * The Battery time card's words in English — the reference dictionary.
 *
 * The card loads on every dashboard, so it carries its own small
 * dictionaries rather than the panel's en.ts / uk.ts, which are about
 * 100 KB. card-uk.ts is typed against this object. Sentences that carry
 * values are functions of one object of already-formatted strings.
 */
export const cardEn = {
  name: "Battery time",
  description: "Time at the current power, from the battery's measured capacity",
  chargingTo: (p: { t: string }) => `Charging to ${p.t}%`,
  dischargingTo: (p: { t: string }) => `Discharging to ${p.t}%`,
  atLimit: (p: { t: string }) => `At limit ${p.t}%`,
  atFloor: (p: { t: string }) => `At floor ${p.t}%`,
  idle: "Idle",
  // The status line and the time, e.g. "Charging to 85% · 2 h 10 min (≈16:40)".
  withEta: (p: { status: string; eta: string }) => `${p.status} · ${p.eta}`,
  minutes: (p: { m: string }) => `${p.m} min`,
  hoursMinutes: (p: { h: string; m: string }) => `${p.h} h ${p.m} min`,
  hours: (p: { h: string }) => `${p.h} h`,
  over2Days: "over 2 days",
  arrival: (p: { time: string }) => `(≈${p.time})`,
  unmapped: "Map battery SoC and battery power in Inverter Analytics",
  unavailable: (p: { entity: string }) => `${p.entity} is unavailable`,
  capacityNotMeasured: (p: { n: number; min: number }) =>
    `Capacity not measured yet (${p.n} of ${p.min} clean discharge hours)`,
  capacityNeedsRoles: (p: { roles: string }) => `Capacity needs ${p.roles} mapped`,
  and: "and",
  // The roles the measured capacity needs, as capacityNeedsRoles names them.
  roles: {
    battery_soc: "battery SoC",
    battery_charge_total: "battery charge total",
    battery_discharge_total: "battery discharge total",
  } as Record<string, string>,
  units: { w: "W", kw: "kW" },
  // One-word state labels, under the ring's SoC and in the tile and badge.
  // Unmapped, unavailable and loading show the dash instead.
  words: {
    charging: "charging",
    discharging: "discharging",
    idle: "idle",
    atLimit: "at limit",
    // Short: it shares the bar's top row with the power and the tile's first line with the SoC.
    atFloor: "floor",
  },
  // "to 85%" beside the time; "≈16:40" in the ring, the bar, the tile and the badge.
  toTarget: (p: { t: string }) => `to ${p.t}%`,
  approx: (p: { time: string }) => `≈${p.time}`,
  // What a screen reader says for the ring, the bar and the badge.
  sentence: (p: { soc: string; status: string; power: string }) =>
    `Battery at ${p.soc}. ${p.status}. Battery power ${p.power}.`,
  layouts: { ring: "Ring", bar: "Bar", tile: "Tile" },
  styles: { full: "Full", ring: "Ring", time: "Time" },
  badge: {
    name: "Battery time",
    description: "Battery charge and the time to its target, at the current power.",
  },
  editor: {
    layout: "Layout",
    style: "Style",
    entryId: "Inverter",
    entryIdHint: "The inverter's entry id; leave empty if there is only one",
    chargeTo: "Charge to",
    chargeToHint: "A number (%) or an entity; 100 if empty",
    dischargeTo: "Discharge to",
    dischargeToHint: "A number (%) or an entity; the low battery charge if empty",
  },
};

export type CardMessages = typeof cardEn;
