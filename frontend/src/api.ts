import type { ConfigResult, HomeAssistant, LoadPayload } from "./types";

export function fetchConfig(hass: HomeAssistant): Promise<ConfigResult> {
  return hass.connection.sendMessagePromise<ConfigResult>({
    type: "inverter_analytics/config",
  });
}

export function fetchLoad(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<LoadPayload> {
  return hass.connection.sendMessagePromise<LoadPayload>({
    type: "inverter_analytics/load",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}
