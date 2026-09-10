/**
 * What each configurable sensor is called in the setup form.
 *
 * The backend decides which roles a tab needs and reports the ones an entry
 * has not got; it sends role keys, not prose. These are the names those keys
 * carry in the integration's own options, so that "map the battery state of
 * charge" sends the reader looking for a field that exists under exactly that
 * name rather than for something they have to translate first.
 *
 * Distinct from FLOW_LABELS in charts/options, which names the same counters
 * as movements of energy — "From grid" is right on an axis and useless in an
 * instruction to go and map a sensor.
 */
export const ROLE_LABELS: Record<string, string> = {
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
};

/** The role's name in the setup form, or the raw key if it is a stranger. */
export function roleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

/** "A", "A and B", "A, B and C" — a list a sentence can end on. */
export function listRoles(roles: readonly string[]): string {
  const labels = roles.map(roleLabel);
  if (labels.length <= 1) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}

/** Where the user goes to map them. */
export const INTEGRATION_URL = "/config/integrations/integration/inverter_analytics";
