/**
 * The panel's words in English — the reference dictionary.
 *
 * uk.ts is typed against this object, so a key added here and not there
 * fails the typecheck. Sentences that carry values are functions of one
 * object of already-formatted strings: each language orders and inflects
 * its own sentence rather than gluing words around a number.
 */
import { plural } from "./plural";

export const en = {
  common: {
    and: "and",
  },
  units: {
    w: "W",
    kw: "kW",
    kwh: "kWh",
    s: "s",
    min: "min",
    h: "h",
    ofRated: "of rated",
  },
  panel: {
    language: "Language",
    couldNotLoad: (p: { error: string }) => `Could not load configuration: ${p.error}`,
    tryAgain: "Try again",
    loading: "Loading…",
    noInverter:
      "No inverter is configured yet. Add the Inverter Analytics integration in settings.",
    tabs: {
      load: "Load",
      battery: "Battery",
      seasonal: "Seasonality",
      balance: "Balance",
      grid: "Grid",
      sizing: "Sizing",
    },
    // The notice on a tab whose sensors are not mapped. One role or several
    // changes more than a pronoun, so each is a whole paragraph.
    missingOne: (p: { feature: string; roles: string }) =>
      `${p.feature} needs ${p.roles}, and it is not mapped to this inverter. ` +
      "Nothing here is broken and there is no data missing — this page has simply not been " +
      "told which of your sensors that is.",
    missingMany: (p: { feature: string; roles: string }) =>
      `${p.feature} needs ${p.roles}, and none of them are mapped to this inverter. ` +
      "Nothing here is broken and there is no data missing — this page has simply not been " +
      "told which of your sensors those are.",
    reconfigureBefore: "Open the integration, choose ",
    reconfigure: "Reconfigure",
    reconfigureAfter: ", and it will offer what it can find in your installation.",
    goToSettings: "Go to Inverter Analytics settings",
  },
  ranges: {
    "24h": "24 h",
    "7d": "7 days",
    "30d": "30 days",
    month: "This month",
    year: "Year",
  },
  // The backend sends a label with each feature too; these win so the name
  // follows the panel's language. Keyed as FEATURES in roles.py.
  features: {
    load: "Load analytics",
    battery: "Battery analytics",
    seasonal: "Seasonality",
    balance: "Energy balance",
    grid: "Grid outages",
    sizing: "Sizing",
  },
  // The setup form's field labels; see roles.ts.
  roles: {
    load_power: "Load power",
    load_power_phase: "Load power per phase",
    rated_power: "Rated power",
    rated_power_per_phase: "Rated power per phase",
    pv_power: "PV power",
    pv_power_string: "PV power per string",
    battery_power: "Battery power",
    grid_power: "Grid power",
    grid_power_phase: "Grid power per phase",
    battery_soc: "Battery state of charge",
    battery_capacity: "Battery capacity",
    grid_connected: "Grid connected",
    pv_energy_total: "PV energy total",
    load_energy_total: "Load energy total",
    battery_charge_total: "Battery charge energy total",
    battery_discharge_total: "Battery discharge energy total",
    grid_import_total: "Grid import total",
    grid_export_total: "Grid export total",
  },
  // Backend error codes with a fixed message. invalid_config is not here:
  // its message names the role and value at fault, which a fixed sentence
  // would lose.
  errors: {
    not_found: "Inverter not found or disabled",
    invalid_window: "Window end must be later than its start",
  },
  // format.ts: precisionLabel and coverageWarning.
  format: {
    exactData: "Exact data",
    hourlyAverages: "Hourly averages",
    mixed: "Mixed",
    mixedSince: (p: { date: string }) => `Mixed since ${p.date}`,
    noData: "No data for this period",
    coversUnderOnePercent: "Data covers less than 1% of the period",
    coversOnly: (p: { share: string }) => `Data covers only ${p.share} of the period`,
  },
  // verdict.ts: the sizing verdicts and why one is withheld.
  verdict: {
    enough: "Enough",
    borderline: "Borderline",
    short: "Short",
    none: "No verdict",
    // Keyed by sizing card.
    noData: {
      inverter: "There are no statistics for the load in this span.",
      battery: "There are no statistics for the battery's charge in this span.",
      solar:
        "There are no statistics for the counters in this span, or too little consumption to take a share of.",
    },
    neverFull:
      "The battery never filled in this span, so the nights say nothing about its size.",
    hintNeverFilled: "never filled",
    hintNoData: "no data",
  },
  // charts/options.ts: axis names, legend entries and series names. A legend
  // finds its series by name, so both sides read the same entry here.
  charts: {
    // The locale the charts write month names and numbers in, also used by
    // the month table. It is the panel language's own locale, not Home
    // Assistant's: an English panel has always said "Mar" and "2.5",
    // whatever the profile's locale.
    locale: "en",
    percentOfTime: "% of time",
    percentImbalance: "% imbalance",
    percentCharge: "% charge",
    percentOfMeasuredTime: "% of measured time",
    hour: "hour",
    hours: "hours",
    mean: "Mean",
    peak: "Peak",
    load: "Load",
    pv: "PV",
    // The two rows of the balance bar: what came into the system, what left it.
    in: "In",
    out: "Out",
    // The six energy counters as movements of energy, in the order shown.
    // Not the setup-form names in roles: "From grid" is right on an axis and
    // useless in an instruction to go and map a sensor.
    flows: {
      pv_energy_total: "Solar",
      grid_import_total: "From grid",
      battery_discharge_total: "From battery",
      load_energy_total: "House",
      grid_export_total: "To grid",
      battery_charge_total: "To battery",
    },
    // The by-day outage tooltip.
    hoursWithoutGrid: (p: { hours: string }) => `${p.hours} h without grid`,
    outagesBegan: (p: { n: number }) =>
      p.n === 0
        ? "no outages began"
        : plural("en", p.n, {
            one: `${p.n} outage began`,
            other: `${p.n} outages began`,
          }),
  },
};

export type Messages = typeof en;
