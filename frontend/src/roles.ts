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
 * Distinct from m.charts.flows (flowLabel in charts/options), which names
 * the same counters as movements of energy — "From grid" is right on an axis and useless in an
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

/**
 * A part key the backend builds when it could not read an index from the
 * entity ids: load_p2, grid_p2, pv_p3 (see part_identities in roles.py). A
 * part whose index was read gets load_l2 / pv_s3 instead, so the key alone
 * says whether the label is the positional fallback ("Phase 2", "String 3").
 */
const POSITIONAL_PART = /^(load|grid|pv)_p(\d+)$/;

/**
 * The name a phase or PV string is shown under. A label the backend read
 * from the entity id ("L2", "PV3") is kept as it is; the positional fallback
 * is English prose, so it is named again from the dictionary.
 */
export function partLabel(m: Messages, part: { key: string; label: string }): string {
  const match = POSITIONAL_PART.exec(part.key);
  if (!match) return part.label;
  const n = Number(match[2]);
  return match[1] === "pv" ? m.sections.strings.positional({ n }) : m.sections.phases.positional({ n });
}

/** Where the user goes to map them. */
export const INTEGRATION_URL = "/config/integrations/integration/inverter_analytics";
