import { RANGE_KEYS, type RangeKey } from "./range";

export interface PanelLocation {
  tab: string;
  range: RangeKey;
  entryId?: string;
}

/**
 * Read the panel's state out of the URL.
 *
 * The selected inverter belongs here rather than in the component alone: with
 * more than one configured, a reload otherwise drops silently back to the
 * first one and the page shows a different inverter's numbers under the same
 * link. Unknown values fall back to the defaults instead of rendering an empty
 * tab, because the URL is user-editable.
 */
export function parseLocation(
  pathname: string,
  search: string,
  tabs: readonly string[],
  fallback: PanelLocation,
): PanelLocation {
  const segments = pathname.split("/").filter(Boolean);
  const tab = segments[1];
  const params = new URLSearchParams(search);
  const range = params.get("range");
  const entryId = params.get("entry");

  return {
    tab: tab && tabs.includes(tab) ? tab : fallback.tab,
    range: range && (RANGE_KEYS as readonly string[]).includes(range)
      ? (range as RangeKey)
      : fallback.range,
    entryId: entryId || fallback.entryId,
  };
}

export function buildLocation(base: string, location: PanelLocation): string {
  const params = new URLSearchParams({ range: location.range });
  if (location.entryId) {
    params.set("entry", location.entryId);
  }
  return `${base}/${location.tab}?${params.toString()}`;
}
