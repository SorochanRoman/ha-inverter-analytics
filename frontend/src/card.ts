/**
 * The Battery time dashboard card and its editor.
 *
 * It loads on every dashboard, so it imports neither ECharts nor the
 * panel's dictionaries: its words are in card-en.ts / card-uk.ts and the
 * language comes from lang-store.ts, the store without the dictionaries.
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import {
  BASIS_REFRESH_MS,
  DASH,
  basisIsStale,
  cardState,
  formatCardPower,
  mergeEditorConfig,
  readNumber,
  resolveTarget,
  smoothedPower,
  trimSamples,
  watchedEntities,
  watchedStatesChanged,
  type CardConfig,
  type PowerSample,
} from "./battery-time";
import { describeView, etaParts } from "./battery-time-looks";
import { cardEn, type CardMessages } from "./i18n/card-en";
import { cardUk } from "./i18n/card-uk";
import { currentLang, currentLocale, noteHaLanguage, subscribe } from "./i18n/lang-store";
import type { BatteryEtaBasis } from "./types";

const CARD_TYPE = "inverter-analytics-battery-time";
const EDITOR_TYPE = "inverter-analytics-battery-time-editor";
// The smoothed power and the clock time move with time alone, between
// state changes: render again this often while the card is on screen.
const TICK_MS = 20_000;
const DEFAULT_CHARGE_TO = 100;

interface EntityState {
  state: string;
  last_updated?: string;
}

interface CardHass {
  states: Record<string, EntityState>;
  locale?: { language?: string };
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

function messages(): CardMessages {
  return currentLang() === "uk" ? cardUk : cardEn;
}

function errorText(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

class InverterAnalyticsBatteryTime extends LitElement {
  @state() private config: CardConfig = {};
  @state() private basis?: BatteryEtaBasis;
  @state() private basisError?: string;
  private _hass?: CardHass;
  private samples: PowerSample[] = [];
  private lastPower?: EntityState;
  private timer?: ReturnType<typeof setInterval>;
  private tick?: ReturnType<typeof setInterval>;
  private watched?: unknown[];
  private fetchedAt?: number;
  private unsubscribeLang?: () => void;
  private fetchedFor?: string;

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(): CardConfig {
    return { charge_to: 100 };
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
  }

  getCardSize(): number {
    return 3;
  }

  set hass(hass: CardHass) {
    this._hass = hass;
    // A change of language reaches the card through its subscription.
    noteHaLanguage(hass.locale?.language);
    this.notePower(hass);
    if (this.fetchedFor === undefined) void this.fetchBasis();
    if (this.isConnected) this.startTimers();
    // Home Assistant hands over a new hass on every state change in the
    // house; render only when one the card shows has changed.
    const watched = watchedEntities(this.basis, this.config).map((id) => hass.states[id]);
    if (watchedStatesChanged(this.watched, watched)) {
      this.watched = watched;
      this.requestUpdate();
    }
  }

  get hass(): CardHass | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribeLang = subscribe(() => this.requestUpdate());
    if (this._hass) {
      this.startTimers();
      // Back on screen after a while away: the hourly refresh did not run.
      if (this.fetchedFor !== undefined && basisIsStale(this.fetchedAt, Date.now())) {
        void this.fetchBasis();
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeLang?.();
    if (this.timer !== undefined) clearInterval(this.timer);
    if (this.tick !== undefined) clearInterval(this.tick);
    this.timer = undefined;
    this.tick = undefined;
  }

  private startTimers(): void {
    if (this.timer === undefined) {
      this.timer = setInterval(() => void this.fetchBasis(), BASIS_REFRESH_MS);
    }
    if (this.tick === undefined) this.tick = setInterval(() => this.requestUpdate(), TICK_MS);
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

  protected willUpdate(): void {
    // The basis may have arrived after the last hass: take the power now.
    if (this._hass && this.basis && this.lastPower === undefined) this.notePower(this._hass);
  }

  render() {
    const m = messages();
    const locale = currentLocale();
    const hass = this._hass;
    const basis = this.basis;

    if (!hass || !basis) {
      const { status, note } = describeView({
        state: { kind: "loading" },
        soc: null,
        powerW: null,
        target: null,
        eta: null,
        basisError: this.basisError ?? null,
        m,
        locale,
      });
      return this.frame(null, status, note, null);
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

    const result = cardState({
      soc,
      powerW,
      chargeTo: chargeTo.value,
      dischargeTo: dischargeTo.value,
      unavailable,
      mapped,
      capacityKwh: basis.capacity_kwh,
      basis,
    });
    const charging = (powerW ?? 0) > 0;
    const { status, note } = describeView({
      state: result,
      soc,
      powerW,
      target: charging ? chargeTo.value : dischargeTo.value,
      eta:
        result.kind === "charging" || result.kind === "discharging"
          ? etaParts(result.minutes, new Date(), locale, m)
          : null,
      basisError: this.basisError ?? null,
      m,
      locale,
    });
    return this.frame(soc, status, note, formatCardPower(powerW, locale, m));
  }

  private frame(soc: number | null, status: string, note: string | null, power: string | null) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const share = soc === null ? 0 : Math.min(100, Math.max(0, soc)) / 100;
    const centre =
      soc === null
        ? DASH
        : `${new Intl.NumberFormat(currentLocale(), { maximumFractionDigits: 0 }).format(soc)}%`;
    return html`<ha-card>
      <div class="body">
        <svg class="ring" viewBox="0 0 100 100" width="100" height="100" role="img">
          ${svg`<circle class="track" cx="50" cy="50" r=${radius}></circle>
            <circle
              class="fill"
              cx="50"
              cy="50"
              r=${radius}
              stroke-dasharray=${`${circumference * share} ${circumference}`}
              transform="rotate(-90 50 50)"
            ></circle>
            <text class="soc" x="50" y="50" text-anchor="middle" dominant-baseline="central">
              ${centre}
            </text>`}
        </svg>
        <div class="status">${status}</div>
        ${note ? html`<div class="note">${note}</div>` : nothing}
        ${power ? html`<div class="power">${power}</div>` : nothing}
      </div>
    </ha-card>`;
  }

  static styles = css`
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 16px;
      text-align: center;
    }
    .ring {
      margin-bottom: 8px;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: 8;
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke: var(--primary-color);
      stroke-linecap: round;
    }
    .soc {
      fill: var(--primary-text-color);
      font-size: 22px;
      font-weight: 500;
    }
    .status {
      color: var(--primary-text-color);
      font-size: 16px;
    }
    .note,
    .power {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `;
}

interface FormSchema {
  name: "entry_id" | "charge_to" | "discharge_to";
  selector: { text: Record<string, never> };
}

const EDITOR_SCHEMA: FormSchema[] = [
  { name: "entry_id", selector: { text: {} } },
  { name: "charge_to", selector: { text: {} } },
  { name: "discharge_to", selector: { text: {} } },
];

class InverterAnalyticsBatteryTimeEditor extends LitElement {
  @state() private config: CardConfig = {};
  @state() public hass?: CardHass;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

  render() {
    const m = messages();
    const labels: Record<string, [string, string]> = {
      entry_id: [m.editor.entryId, m.editor.entryIdHint],
      charge_to: [m.editor.chargeTo, m.editor.chargeToHint],
      discharge_to: [m.editor.dischargeTo, m.editor.dischargeToHint],
    };
    const data = {
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === undefined ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === undefined ? "" : String(this.config.discharge_to),
    };
    return html`<p class="description">${m.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${EDITOR_SCHEMA}
        .computeLabel=${(field: FormSchema) => labels[field.name][0]}
        .computeHelper=${(field: FormSchema) => labels[field.name][1]}
        @value-changed=${this.changed}
      ></ha-form>`;
  }

  private changed(event: CustomEvent<{ value: Record<string, unknown> }>): void {
    event.stopPropagation();
    const config = mergeEditorConfig(this.config, event.detail.value);
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }),
    );
  }

  static styles = css`
    .description {
      color: var(--secondary-text-color);
      margin: 0 0 16px;
    }
  `;
}

if (!customElements.get(CARD_TYPE)) customElements.define(CARD_TYPE, InverterAnalyticsBatteryTime);
if (!customElements.get(EDITOR_TYPE)) {
  customElements.define(EDITOR_TYPE, InverterAnalyticsBatteryTimeEditor);
}
const cards = ((window as any).customCards ??= []);
if (!cards.some((card: { type: string }) => card.type === CARD_TYPE)) {
  const m = messages();
  cards.push({ type: CARD_TYPE, name: m.name, description: m.description, preview: true });
}
