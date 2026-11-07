import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BatteryTimeController, type CardHass, type EntityState } from "./battery-time-controller";
import { _resetLangForTests, setLang } from "./i18n/lang-store";
import type { BatteryEtaBasis } from "./types";

function basis(fields: Partial<BatteryEtaBasis> = {}): BatteryEtaBasis {
  return {
    capacity_kwh: 10,
    capacity_reason: null,
    missing_roles: [],
    clean_hours: 40,
    clean_hours_min: 20,
    window_days: 60,
    computed_at: "2026-11-06T12:00:00+00:00",
    soc_entity: "sensor.soc",
    battery_power_entity: "sensor.battery_power",
    battery_power_inverted: false,
    idle_w: 50,
    low_pct: 20,
    ...fields,
  };
}

interface Pending {
  message: Record<string, unknown>;
  resolve: (value: BatteryEtaBasis) => void;
  reject: (error: unknown) => void;
}

/** A hass whose callWS answers only when the test says so. */
function fakeHass(states: Record<string, EntityState>, calls: Pending[]): CardHass {
  return {
    states,
    locale: { language: "en" },
    callWS: <T>(message: Record<string, unknown>) =>
      new Promise<T>((resolve, reject) => {
        calls.push({ message, resolve: resolve as (value: BatteryEtaBasis) => void, reject });
      }),
  };
}

function fakeHost() {
  const host = {
    controllers: [] as unknown[],
    isConnected: true,
    addController(controller: unknown) {
      host.controllers.push(controller);
    },
    removeController() {},
    requestUpdate: vi.fn(),
    updateComplete: Promise.resolve(true),
  };
  return host;
}

function setup(
  states: Record<string, EntityState> = {
    "sensor.soc": { state: "50" },
    "sensor.battery_power": { state: "2000" },
  },
) {
  const host = fakeHost();
  const controller = new BatteryTimeController(host as never);
  const calls: Pending[] = [];
  const hass = fakeHass(states, calls);
  return { host, controller, calls, hass, states };
}

/** Lets the awaited callWS settle. */
async function settle(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

/** Node's own localStorage warns when touched without a file: the store gets this one. */
function fakeStorage() {
  const data: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in data ? data[key] : null),
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
  };
}

beforeEach(() => {
  vi.stubGlobal("localStorage", fakeStorage());
  vi.useFakeTimers();
  // Local noon, so the clock times read the same in any time zone.
  vi.setSystemTime(new Date(2026, 10, 6, 12, 0));
  _resetLangForTests();
});

afterEach(() => {
  vi.useRealTimers();
  _resetLangForTests();
  vi.unstubAllGlobals();
});

describe("the battery time controller", () => {
  it("registers itself with its host", () => {
    const { host, controller } = setup();
    expect(host.controllers).toEqual([controller]);
  });

  it("is loading before any hass, with dashes", () => {
    const { controller } = setup();
    const view = controller.view();
    expect(view.state).toEqual({ kind: "loading" });
    expect(view.status).toBe("—");
    expect(view.note).toBeNull();
    expect(view.soc).toBeNull();
    expect(view.tone).toBe("rest");
  });

  it("takes a config before the hass and fetches for its inverter", async () => {
    const { host, controller, calls, hass } = setup();
    controller.setConfig({ entry_id: "abc", charge_to: 85 });
    expect(calls).toHaveLength(0);
    controller.hostConnected();
    controller.setHass(hass);
    expect(calls).toHaveLength(1);
    expect(calls[0].message).toEqual({ type: "inverter_analytics/battery_eta", entry_id: "abc" });
    expect(controller.view().state).toEqual({ kind: "loading" });

    host.requestUpdate.mockClear();
    calls[0].resolve(basis());
    await settle();
    expect(host.requestUpdate).toHaveBeenCalled();
    // The basis arrived after the hass: the host's update takes the power.
    controller.hostUpdate();
    const view = controller.view();
    expect(view.state.kind).toBe("charging");
    expect(view.soc).toBe(50);
    expect(view.powerW).toBe(2000);
    expect(view.chargeTo).toBe(85);
    expect(view.dischargeTo).toBe(20);
    expect(view.target).toBe(85);
    expect(view.tone).toBe("charge");
    expect(view.word).toBe("charging");
    // 3.5 kWh at 2 kW is 1 h 45 min, ≈13:45.
    expect(view.eta?.duration).toBe("1 h 45 min");
    expect(view.status).toBe("Charging to 85% · 1 h 45 min (≈13:45)");
    expect(view.note).toBeNull();
    expect(view.locale).toBe("en");
  });

  it("asks for the default inverter when the config names none", () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    expect(calls[0].message).toEqual({ type: "inverter_analytics/battery_eta" });
  });

  it("fetches once, however many hass objects arrive", () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    controller.setHass({ ...hass });
    expect(calls).toHaveLength(1);
  });

  it("discards a basis that was on its way when the inverter changed", async () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({ entry_id: "a" });
    controller.setHass(hass);
    controller.setConfig({ entry_id: "b" });
    expect(calls).toHaveLength(2);
    expect(calls[1].message.entry_id).toBe("b");

    calls[1].resolve(basis({ soc_entity: "sensor.soc_b" }));
    await settle();
    calls[0].resolve(basis({ soc_entity: "sensor.soc_a" }));
    await settle();
    // The stale answer for "a" did not replace the one for "b".
    expect(controller.view().state).toEqual({ kind: "unavailable", entity: "sensor.soc_b" });
  });

  it("does not refetch when the config changes but the inverter does not", () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({ entry_id: "a" });
    controller.setHass(hass);
    controller.setConfig({ entry_id: "a", charge_to: 90 });
    expect(calls).toHaveLength(1);
  });

  it("drops an old fetch error when the inverter changes", async () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].reject({ message: "Unknown entry" });
    await settle();
    controller.setConfig({ entry_id: "other" });
    expect(controller.view().note).toBeNull();
  });

  it("words a failed fetch under the dash", async () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].reject({ message: "Unknown entry" });
    await settle();
    const view = controller.view();
    expect(view.state).toEqual({ kind: "loading" });
    expect(view.note).toBe("Unknown entry");
  });

  it("does not ask its host to render for a hass that changed nothing it shows", async () => {
    const { host, controller, calls, hass, states } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(basis());
    await settle();
    controller.setHass({ ...hass, states: { ...states } });
    host.requestUpdate.mockClear();

    controller.setHass({ ...hass, states: { ...states, "light.kitchen": { state: "on" } } });
    expect(host.requestUpdate).not.toHaveBeenCalled();

    controller.setHass({ ...hass, states: { ...states, "sensor.soc": { state: "51" } } });
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
  });

  it("asks its host to render when the config changes", () => {
    const { host, controller } = setup();
    controller.setConfig({ charge_to: 90 });
    expect(host.requestUpdate).toHaveBeenCalled();
  });

  it("refreshes the basis every hour", async () => {
    const { controller, calls, hass } = setup();
    controller.hostConnected();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(basis());
    await settle();
    vi.advanceTimersByTime(3600_000 - 1);
    expect(calls).toHaveLength(1);
    vi.advanceTimersByTime(1);
    expect(calls).toHaveLength(2);
  });

  it("renders again every 20 s on screen", () => {
    const { host, controller, hass } = setup();
    controller.hostConnected();
    controller.setConfig({});
    controller.setHass(hass);
    host.requestUpdate.mockClear();
    vi.advanceTimersByTime(19_999);
    expect(host.requestUpdate).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(20_000);
    expect(host.requestUpdate).toHaveBeenCalledTimes(2);
  });

  it("starts no timers while its host is off screen", () => {
    const { host, controller, hass } = setup();
    host.isConnected = false;
    controller.setConfig({});
    controller.setHass(hass);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clears its timers and its language subscription when the host leaves", () => {
    const { host, controller, calls, hass } = setup();
    controller.hostConnected();
    controller.setConfig({});
    controller.setHass(hass);
    expect(vi.getTimerCount()).toBe(2);

    controller.hostDisconnected();
    host.isConnected = false;
    expect(vi.getTimerCount()).toBe(0);
    host.requestUpdate.mockClear();
    vi.advanceTimersByTime(2 * 3600_000);
    expect(host.requestUpdate).not.toHaveBeenCalled();
    expect(calls).toHaveLength(1);
    setLang("uk");
    expect(host.requestUpdate).not.toHaveBeenCalled();
  });

  it("follows a change of language while on screen", () => {
    const { host, controller } = setup();
    controller.hostConnected();
    host.requestUpdate.mockClear();
    setLang("uk");
    expect(host.requestUpdate).toHaveBeenCalled();
    expect(controller.view().locale).toBe("uk");
  });

  it("refetches a stale basis when the host comes back on screen", async () => {
    const { host, controller, calls, hass } = setup();
    controller.hostConnected();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(basis());
    await settle();
    controller.hostDisconnected();
    host.isConnected = false;

    // Back after a short while: the basis still holds.
    vi.advanceTimersByTime(10 * 60_000);
    host.isConnected = true;
    controller.hostConnected();
    expect(calls).toHaveLength(1);
    controller.hostDisconnected();
    host.isConnected = false;

    // Back after more than an hour away: the hourly refresh did not run.
    vi.advanceTimersByTime(3600_000);
    host.isConnected = true;
    controller.hostConnected();
    expect(calls).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(2);
  });

  it("starts the power buffer again for another inverter", async () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({ entry_id: "a" });
    controller.setHass(hass);
    calls[0].resolve(basis());
    await settle();
    controller.setHass({ ...hass, states: { ...hass.states } });
    expect(controller.view().state.kind).toBe("charging");

    // Inverter a has been charging at 2 kW for a minute.
    vi.advanceTimersByTime(60_000);
    controller.setConfig({ entry_id: "b" });
    expect(controller.view().state).toEqual({ kind: "loading" });

    // Inverter b's power entity reads 400 W: had a's samples been kept, the
    // smoothed power would lean towards 2 kW.
    const states = { ...hass.states, "sensor.b_power": { state: "400" } };
    controller.setHass({ ...hass, states });
    calls[1].resolve(basis({ battery_power_entity: "sensor.b_power" }));
    await settle();
    controller.hostUpdate();
    vi.advanceTimersByTime(30_000);
    expect(controller.view().powerW).toBe(400);
  });

  it("corrects the sign of an inverted power sensor", async () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(basis({ battery_power_inverted: true }));
    await settle();
    controller.hostUpdate();
    const view = controller.view();
    expect(view.powerW).toBe(-2000);
    expect(view.state.kind).toBe("discharging");
    expect(view.target).toBe(20);
    expect(view.tone).toBe("discharge");
  });

  it("keeps the direction's target and tone without a measured capacity", async () => {
    const { controller, calls, hass } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(basis({ capacity_kwh: null, capacity_reason: "too_few_clean_hours" }));
    await settle();
    controller.hostUpdate();
    const view = controller.view();
    expect(view.state.kind).toBe("no_capacity");
    expect(view.target).toBe(100);
    expect(view.tone).toBe("charge");
    expect(view.eta).toBeNull();
    expect(view.status).toBe("Charging to 100% · —");
  });

  it("decides the direction once: word, target and tone agree with no idle band", async () => {
    const { controller, calls, hass, states } = setup({
      "sensor.soc": { state: "50" },
      "sensor.battery_power": { state: "0" },
    });
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(
      basis({ capacity_kwh: null, capacity_reason: "too_few_clean_hours", idle_w: 0 }),
    );
    await settle();
    controller.setHass({ ...hass, states: { ...states } });
    controller.hostUpdate();
    const view = controller.view();
    expect(view.powerW).toBe(0);
    expect(view.state).toMatchObject({ kind: "no_capacity", direction: "discharging" });
    expect(view.word).toBe("discharging");
    expect(view.status).toBe("Discharging to 20% · —");
    expect(view.target).toBe(20);
    expect(view.tone).toBe("discharge");
  });

  it("has no target and no time at rest", async () => {
    const { controller, calls, hass, states } = setup();
    controller.setConfig({});
    controller.setHass(hass);
    calls[0].resolve(basis());
    await settle();
    controller.setHass({ ...hass, states: { ...states, "sensor.battery_power": { state: "0" } } });
    const view = controller.view();
    expect(view.state.kind).toBe("idle");
    expect(view.target).toBeNull();
    expect(view.eta).toBeNull();
    expect(view.tone).toBe("rest");
  });

  it("names the SoC entity for more info once the basis is in", async () => {
    const { controller, calls, hass } = setup();
    expect(controller.socEntity).toBeUndefined();
    controller.setConfig({});
    controller.setHass(hass);
    expect(controller.socEntity).toBeUndefined();
    calls[0].resolve(basis({ soc_entity: "sensor.inverter_soc" }));
    await settle();
    expect(controller.socEntity).toBe("sensor.inverter_soc");
  });
});
