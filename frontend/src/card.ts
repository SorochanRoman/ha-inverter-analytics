/**
 * The Battery time dashboard card and its editor.
 *
 * It loads on every dashboard, so it imports neither ECharts nor the
 * panel's dictionaries: its words are in card-en.ts / card-uk.ts and the
 * language comes from lang-store.ts, the store without the dictionaries.
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import { DASH, formatCardPower, mergeEditorConfig, type CardConfig } from "./battery-time";
import { BatteryTimeController, messages, type CardHass } from "./battery-time-controller";
import { currentLocale } from "./i18n/lang-store";

const CARD_TYPE = "inverter-analytics-battery-time";
const EDITOR_TYPE = "inverter-analytics-battery-time-editor";

class InverterAnalyticsBatteryTime extends LitElement {
  private readonly battery = new BatteryTimeController(this);

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(): CardConfig {
    return { charge_to: 100 };
  }

  setConfig(config: CardConfig): void {
    this.battery.setConfig(config);
  }

  getCardSize(): number {
    return 3;
  }

  // A plain setter, not a property: Home Assistant hands over a new hass on
  // every state change in the house, and the controller decides when to render.
  set hass(hass: CardHass) {
    this.battery.setHass(hass);
  }

  get hass(): CardHass | undefined {
    return this.battery.hass;
  }

  render() {
    const view = this.battery.view();
    const power =
      view.state.kind === "loading" ? null : formatCardPower(view.powerW, view.locale, view.m);
    return this.frame(view.soc, view.status, view.note, power);
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
