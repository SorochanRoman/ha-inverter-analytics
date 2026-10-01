/**
 * The panel's words in English — the reference dictionary.
 *
 * uk.ts is typed against this object, so a key added here and not there
 * fails the typecheck. Sentences that carry values are functions of one
 * object of already-formatted strings: each language orders and inflects
 * its own sentence rather than gluing words around a number.
 */
export const en = {
  common: {
    and: "and",
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
      `${p.feature} needs ${p.roles}, and it is mapped to this inverter. ` +
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
};

export type Messages = typeof en;
