/**
 * Run an async function one call at a time.
 *
 * Home Assistant assigns `hass` before `connectedCallback`, so a panel's
 * connected guard and its `willUpdate` hook both fire on an ordinary mount and
 * ask for the same thing twice. Callers arriving while a call is in flight
 * share its promise instead of starting a second one; once it settles the next
 * caller starts a fresh call, so this is deduplication, not caching.
 */
export function singleFlight<T>(run: () => Promise<T>): () => Promise<T> {
  let inFlight: Promise<T> | undefined;
  return () => {
    inFlight ??= run().finally(() => {
      inFlight = undefined;
    });
    return inFlight;
  };
}
