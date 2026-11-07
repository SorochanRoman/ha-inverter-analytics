/**
 * The Battery time badge, for the dashboard's badge row, and its editor.
 *
 * It ships in the card's bundle, so the same rules hold: no ECharts, no
 * panel dictionaries. The pill is drawn here rather than with ha-badge,
 * which Home Assistant loads lazily, and without ha-card.
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import { mergeEditorConfig, type CardConfig } from "./battery-time";
import { BatteryTimeController, type CardHass } from "./battery-time-controller";
import {
  badgeEditorSchema,
  badgeIcon,
  badgeText,
  faceSentence,
  ringGeometry,
  styleOf,
  type BadgeEditorField,
  type BadgeStyle,
  type BatteryTimeView,
} from "./battery-time-looks";
import { messages } from "./i18n/card-i18n";

const BADGE_TYPE = "inverter-analytics-battery-badge";
const EDITOR_TYPE = "inverter-analytics-battery-badge-editor";

// The mini ring: 28 px across with a 3 px stroke.
const MINI_SIZE = 28;
const MINI_STROKE = 3;
const MINI_RADIUS = (MINI_SIZE - MINI_STROKE) / 2;

class InverterAnalyticsBatteryBadge extends LitElement {
  private readonly battery = new BatteryTimeController(this);
  private badgeStyle: BadgeStyle = "full";

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(): CardConfig {
    return { style: "full" };
  }

  setConfig(config: CardConfig): void {
    this.badgeStyle = styleOf(config.style);
    this.battery.setConfig(config);
  }

  // A plain setter, not a property: the controller decides when to render.
  set hass(hass: CardHass) {
    this.battery.setHass(hass);
  }

  get hass(): CardHass | undefined {
    return this.battery.hass;
  }

  render() {
    const view = this.battery.view();
    const text = badgeText(view, this.badgeStyle);
    const lead = this.badgeStyle === "ring" ? this.miniRing(view) : this.icon(view);
    const words = text.secondary
      ? html`<span class="two"><small>${text.primary}</small><span>${text.secondary}</span></span>`
      : html`<span class="one">${text.primary}</span>`;
    return html`<div
      class="pill tone-${view.tone} style-${this.badgeStyle}"
      role="button"
      tabindex="0"
      aria-label=${faceSentence(view)}
      @click=${this.open}
      @keydown=${this.key}
    >
      ${lead}${words}
    </div>`;
  }

  private icon(view: BatteryTimeView) {
    const icon = badgeIcon(view, this.badgeStyle);
    return icon
      ? html`<span class="icon" aria-hidden="true"><ha-icon .icon=${icon}></ha-icon></span>`
      : nothing;
  }

  private miniRing(view: BatteryTimeView) {
    const { circumference, fillDash } = ringGeometry(view.soc, null, null, MINI_RADIUS);
    const c = MINI_SIZE / 2;
    return html`<svg
      class="mini"
      viewBox="0 0 ${MINI_SIZE} ${MINI_SIZE}"
      width=${MINI_SIZE}
      height=${MINI_SIZE}
      aria-hidden="true"
    >
      ${svg`<circle class="track" cx=${c} cy=${c} r=${MINI_RADIUS}></circle>
        ${
          fillDash > 0
            ? svg`<circle
                class="fill"
                cx=${c}
                cy=${c}
                r=${MINI_RADIUS}
                stroke-dasharray=${`${fillDash} ${circumference}`}
                transform=${`rotate(-90 ${c} ${c})`}
              ></circle>`
            : nothing
        }`}
    </svg>`;
  }

  private open(): void {
    const entityId = this.battery.socEntity;
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }),
    );
  }

  private key(event: KeyboardEvent): void {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.open();
  }

  static styles = css`
    :host {
      display: inline-block;
      --tone: var(--secondary-text-color);
    }
    .tone-charge {
      --tone: var(--success-color);
    }
    .tone-discharge {
      --tone: var(--warning-color);
    }
    .tone-low {
      --tone: var(--error-color);
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 14px 0 4px;
      box-sizing: border-box;
      border-radius: 18px;
      border: 1px solid var(--divider-color);
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      font-size: 14px;
      line-height: 16px;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .pill:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 20%, transparent);
    }
    .icon ha-icon {
      --mdc-icon-size: 18px;
      color: var(--tone);
      display: flex;
    }
    .mini {
      flex: none;
      display: block;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: ${MINI_STROKE};
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke: var(--tone);
      stroke-linecap: round;
    }
    .one {
      font-weight: 500;
    }
    .two {
      display: flex;
      flex-direction: column;
    }
    .two small {
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 13px;
    }
    .two span {
      font-weight: 500;
    }
  `;
}

class InverterAnalyticsBatteryBadgeEditor extends LitElement {
  @state() private config: CardConfig = {};
  @state() public hass?: CardHass;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

  render() {
    const m = messages();
    const labels: Record<BadgeEditorField["name"], [string, string | undefined]> = {
      style: [m.editor.style, undefined],
      entry_id: [m.editor.entryId, m.editor.entryIdHint],
      charge_to: [m.editor.chargeTo, m.editor.chargeToHint],
      discharge_to: [m.editor.dischargeTo, m.editor.dischargeToHint],
    };
    const data = {
      style: styleOf(this.config.style),
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === undefined ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === undefined ? "" : String(this.config.discharge_to),
    };
    return html`<p class="description">${m.badge.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${badgeEditorSchema(m)}
        .computeLabel=${(field: BadgeEditorField) => labels[field.name][0]}
        .computeHelper=${(field: BadgeEditorField) => labels[field.name][1]}
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

if (!customElements.get(BADGE_TYPE)) {
  customElements.define(BADGE_TYPE, InverterAnalyticsBatteryBadge);
}
if (!customElements.get(EDITOR_TYPE)) {
  customElements.define(EDITOR_TYPE, InverterAnalyticsBatteryBadgeEditor);
}
const badges = ((window as any).customBadges ??= []);
if (!badges.some((badge: { type: string }) => badge.type === BADGE_TYPE)) {
  const m = messages();
  badges.push({
    type: BADGE_TYPE,
    name: m.badge.name,
    description: m.badge.description,
    preview: true,
  });
}
