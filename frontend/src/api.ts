import type {
  BalancePayload,
  BatteryPayload,
  ConfigResult,
  HomeAssistant,
  LoadPayload,
  SeasonalityPayload,
} from "./types";

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

export function fetchBattery(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<BatteryPayload> {
  return hass.connection.sendMessagePromise<BatteryPayload>({
    type: "inverter_analytics/battery",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}

export function fetchSeasonality(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<SeasonalityPayload> {
  return hass.connection.sendMessagePromise<SeasonalityPayload>({
    type: "inverter_analytics/seasonality",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}

export function fetchBalance(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<BalancePayload> {
  return hass.connection.sendMessagePromise<BalancePayload>({
    type: "inverter_analytics/balance",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}
