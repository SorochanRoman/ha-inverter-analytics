import type { Messages } from "./i18n/en";

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
 *
 * The names live in m.roles. The English ones equal translations/en.json;
 * the Ukrainian ones must equal translations/uk.json word for word.
 *
 * roleLabel gives the role's name in the setup form, or the raw key if it is
 * a stranger.
 */
export function roleLabel(m: Messages, role: string): string {
  return (m.roles as Record<string, string>)[role] ?? role;
}

/** "A", "A and B", "A, B and C" — a list a sentence can end on. */
export function listRoles(m: Messages, roles: readonly string[]): string {
  const labels = roles.map((role) => roleLabel(m, role));
  if (labels.length <= 1) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} ${m.common.and} ${labels[labels.length - 1]}`;
}

/** Where the user goes to map them. */
export const INTEGRATION_URL = "/config/integrations/integration/inverter_analytics";
