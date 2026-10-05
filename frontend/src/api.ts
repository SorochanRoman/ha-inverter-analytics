import type {
  BalancePayload,
  BatteryPayload,
  ConfigResult,
  GridPayload,
  HealthPayload,
  HomeAssistant,
  LoadPayload,
  SeasonalityPayload,
  SizingPayload,
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

export function fetchGrid(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<GridPayload> {
  return hass.connection.sendMessagePromise<GridPayload>({
    type: "inverter_analytics/grid",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}

export function fetchSizing(
  hass: HomeAssistant,
  entryId: string,
  start: Date,
  end: Date,
): Promise<SizingPayload> {
  return hass.connection.sendMessagePromise<SizingPayload>({
    type: "inverter_analytics/sizing",
    entry_id: entryId,
    start: start.toISOString(),
    end: end.toISOString(),
  });
}

/** No window: the server reads the whole history from long-term statistics. */
export function fetchHealth(hass: HomeAssistant, entryId: string): Promise<HealthPayload> {
  return hass.connection.sendMessagePromise<HealthPayload>({
    type: "inverter_analytics/health",
    entry_id: entryId,
  });
}
