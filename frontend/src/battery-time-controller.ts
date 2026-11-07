/**
 * The Battery time card's and badge's live data, as a Lit controller.
 *
 * It keeps the power samples, fetches and refreshes the basis, follows the
 * language, and asks its host to render only when something it shows has
 * changed or the clock has moved. The host forwards its config and its
 * hass, then renders from view(), which is never null and already worded.
 */
import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  BASIS_REFRESH_MS,
  basisIsStale,
  cardState,
  readNumber,
  resolveTarget,
  smoothedPower,
  trimSamples,
  watchedEntities,
  watchedStatesChanged,
  type CardConfig,
  type PowerSample,
} from "./battery-time";
import { describeView, etaParts, tone, type BatteryTimeView } from "./battery-time-looks";
import { messages } from "./i18n/card-i18n";
import { currentLocale, noteHaLanguage, subscribe } from "./i18n/lang-store";
import type { BatteryEtaBasis } from "./types";

// The smoothed power and the clock time move with time alone, between
// state changes: render again this often while the card is on screen.
const TICK_MS = 20_000;
const DEFAULT_CHARGE_TO = 100;

export interface EntityState {
  state: string;
  last_updated?: string;
}

export interface CardHass {
  states: Record<string, EntityState>;
  locale?: { language?: string };
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

function errorText(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

export class BatteryTimeController implements ReactiveController {
  private readonly host: ReactiveControllerHost & HTMLElement;
  private config: CardConfig = {};
  private basis?: BatteryEtaBasis;
  private basisError?: string;
  private _hass?: CardHass;
  private samples: PowerSample[] = [];
  private lastPower?: EntityState;
  private timer?: ReturnType<typeof setInterval>;
  private tick?: ReturnType<typeof setInterval>;
  private watched?: unknown[];
  private fetchedAt?: number;
  private unsubscribeLang?: () => void;
  private fetchedFor?: string;

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.host = host;
    host.addController(this);
  }

  get hass(): CardHass | undefined {
    return this._hass;
  }

  /** The SoC entity, which a tap opens in more info; none before the basis. */
  get socEntity(): string | undefined {
    return this.basis?.soc_entity ?? undefined;
  }

  setConfig(config: CardConfig): void {
    const next: CardConfig = {
      entry_id: config.entry_id || undefined,
      charge_to: config.charge_to,
      discharge_to: config.discharge_to,
    };
    const entryChanged = next.entry_id !== this.config.entry_id;
    this.config = next;
    this.watched = undefined;
    if (entryChanged && this._hass && this.fetchedFor !== undefined) {
      // Another inverter: its own entities, so start the power buffer again.
      this.samples = [];
      this.lastPower = undefined;
      this.basis = undefined;
      void this.fetchBasis();
    }
    this.host.requestUpdate();
  }

  setHass(hass: CardHass): void {
    this._hass = hass;
    // A change of language reaches the host through the subscription.
    noteHaLanguage(hass.locale?.language);
    this.notePower(hass);
    if (this.fetchedFor === undefined) void this.fetchBasis();
    if (this.host.isConnected) this.startTimers();
    // Home Assistant hands over a new hass on every state change in the
    // house; render only when one the card shows has changed.
    const watched = watchedEntities(this.basis, this.config).map((id) => hass.states[id]);
    if (watchedStatesChanged(this.watched, watched)) {
      this.watched = watched;
      this.host.requestUpdate();
    }
  }

  hostConnected(): void {
    this.unsubscribeLang?.();
    this.unsubscribeLang = subscribe(() => this.host.requestUpdate());
    if (this._hass) {
      this.startTimers();
      // Back on screen after a while away: the hourly refresh did not run.
      if (this.fetchedFor !== undefined && basisIsStale(this.fetchedAt, Date.now())) {
        void this.fetchBasis();
      }
    }
  }

  hostDisconnected(): void {
    this.unsubscribeLang?.();
    this.unsubscribeLang = undefined;
    if (this.timer !== undefined) clearInterval(this.timer);
    if (this.tick !== undefined) clearInterval(this.tick);
    this.timer = undefined;
    this.tick = undefined;
  }

  hostUpdate(): void {
    // The basis may have arrived after the last hass: take the power now.
    if (this._hass && this.basis && this.lastPower === undefined) this.notePower(this._hass);
  }

  private startTimers(): void {
    if (this.timer === undefined) {
      this.timer = setInterval(() => void this.fetchBasis(), BASIS_REFRESH_MS);
    }
    if (this.tick === undefined) {
      this.tick = setInterval(() => this.host.requestUpdate(), TICK_MS);
    }
  }

  private async fetchBasis(): Promise<void> {
    const hass = this._hass;
    if (!hass) return;
    const entryId = this.config.entry_id;
    this.fetchedFor = entryId ?? "";
    const message: Record<string, unknown> = { type: "inverter_analytics/battery_eta" };
    if (entryId) message.entry_id = entryId;
    let basis: BatteryEtaBasis | undefined;
    let basisError: string | undefined;
    try {
      basis = await hass.callWS<BatteryEtaBasis>(message);
    } catch (error) {
      basisError = errorText(error);
    }
    // The inverter was changed in the editor while this was on its way.
    if (this.config.entry_id !== entryId) return;
    this.basis = basis;
    this.basisError = basisError;
    this.fetchedAt = Date.now();
    this.watched = undefined;
    this.host.requestUpdate();
  }

  /** Keeps the last 120 s of battery power the card has seen, sign corrected. */
  private notePower(hass: CardHass): void {
    const entity = this.basis?.battery_power_entity;
    if (!entity) return;
    const current = hass.states[entity];
    if (current === this.lastPower) return;
    this.lastPower = current;
    const now = Date.now();
    const value = readNumber(current?.state);
    if (value === null) {
      this.samples = [];
      return;
    }
    const sign = this.basis?.battery_power_inverted ? -1 : 1;
    this.samples = trimSamples([...this.samples, { t: now, w: value * sign }], now);
  }

  /** Everything a face shows, resolved and worded; loading until hass and basis. */
  view(): BatteryTimeView {
    const m = messages();
    const locale = currentLocale();
    const hass = this._hass;
    const basis = this.basis;

    if (!hass || !basis) {
      const state = { kind: "loading" } as const;
      const { word, status, note } = describeView({
        state,
        soc: null,
        target: null,
        eta: null,
        basisError: this.basisError ?? null,
        m,
        locale,
      });
      return {
        state,
        soc: null,
        powerW: null,
        chargeTo: null,
        dischargeTo: null,
        target: null,
        eta: null,
        tone: "rest",
        word,
        status,
        note,
        m,
        locale,
      };
    }

    const socEntity = basis.soc_entity;
    const powerEntity = basis.battery_power_entity;
    const mapped = Boolean(socEntity && powerEntity);
    const soc = socEntity ? readNumber(hass.states[socEntity]?.state) : null;
    const powerNow = powerEntity ? readNumber(hass.states[powerEntity]?.state) : null;
    const powerW = powerNow === null ? null : smoothedPower(this.samples, Date.now());
    const chargeTo = resolveTarget(this.config.charge_to, hass.states, DEFAULT_CHARGE_TO);
    const dischargeTo = resolveTarget(this.config.discharge_to, hass.states, basis.low_pct);

    let unavailable: string | null = null;
    if (mapped) {
      if (soc === null) unavailable = socEntity;
      else if (powerW === null) unavailable = powerEntity;
      else unavailable = chargeTo.unavailable ?? dischargeTo.unavailable;
    }

    const state = cardState({
      soc,
      powerW,
      chargeTo: chargeTo.value,
      dischargeTo: dischargeTo.value,
      unavailable,
      mapped,
      capacityKwh: basis.capacity_kwh,
      basis,
    });
    // The target in the state's direction: a charge or discharge carries its
    // own; without a capacity the state's direction picks one; at the limit,
    // the floor or at rest there is none.
    let target: number | null = null;
    if (state.kind === "charging" || state.kind === "discharging") target = state.target;
    else if (state.kind === "no_capacity") {
      target = state.direction === "charging" ? chargeTo.value : dischargeTo.value;
    }
    const eta =
      state.kind === "charging" || state.kind === "discharging"
        ? etaParts(state.minutes, new Date(), locale, m)
        : null;
    const { word, status, note } = describeView({
      state,
      soc,
      target,
      eta,
      basisError: this.basisError ?? null,
      m,
      locale,
    });
    return {
      state,
      soc,
      powerW,
      chargeTo: chargeTo.value,
      dischargeTo: dischargeTo.value,
      target,
      eta,
      tone: tone(state),
      word,
      status,
      note,
      m,
      locale,
    };
  }
}
