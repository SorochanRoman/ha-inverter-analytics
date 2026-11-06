/**
 * The Battery time dashboard card and its editor.
 *
 * It loads on every dashboard, so it imports neither ECharts nor the
 * panel's dictionaries: its words are in card-en.ts / card-uk.ts and the
 * language comes from lang-store.ts, the store without the dictionaries.
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import { mergeEditorConfig, type CardConfig } from "./battery-time";
import { BatteryTimeController, messages, type CardHass } from "./battery-time-controller";
import {
  batteryIcon,
  cardSize,
  editorSchema,
  faceSentence,
  gridOptions,
  layoutOf,
  pctLabel,
  powerPill,
  ringGeometry,
  socText,
  targetLine,
  tilePrimary,
  type BatteryTimeView,
  type EditorField,
  type Layout,
} from "./battery-time-looks";

const CARD_TYPE = "inverter-analytics-battery-time";
const EDITOR_TYPE = "inverter-analytics-battery-time-editor";

// The ring: 120 px across with a 10 px stroke, so the stroke's centre line
// sits at 55.
const RING_SIZE = 120;
const RING_STROKE = 10;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;

// SVG ids are per document in some browsers even inside a shadow root:
// give each card its own gradient.
let gradientCount = 0;

function clampPct(value: number): number {
  return Math.min(100, Math.max(0, value));
}

class InverterAnalyticsBatteryTime extends LitElement {
  private readonly battery = new BatteryTimeController(this);
  private layout: Layout = "ring";
  private readonly gradientId = `ia-battery-fill-${++gradientCount}`;

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(): CardConfig {
    return { charge_to: 100 };
  }

  setConfig(config: CardConfig): void {
    this.layout = layoutOf(config.layout);
    this.battery.setConfig(config);
  }

  /** The height in the masonry view, in 50 px units. */
  getCardSize(): number {
    return cardSize(this.layout);
  }

  /** The size in the sections view. */
  getGridOptions(): { rows: number; columns: number; min_rows: number } {
    return gridOptions(this.layout);
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
    const face =
      this.layout === "bar"
        ? this.bar(view)
        : this.layout === "tile"
          ? this.tile(view)
          : this.ring(view);
    return html`<ha-card class="tone-${view.tone} ${this.layout}">
      <div class="body">${face}${this.note(view)}</div>
    </ha-card>`;
  }

  private note(view: BatteryTimeView) {
    return view.note ? html`<div class="note" title=${view.note}>${view.note}</div>` : nothing;
  }

  private pill(view: BatteryTimeView) {
    const pill = powerPill(view);
    if (!pill) return nothing;
    return html`<span class="pill">
      ${pill.icon ? html`<ha-icon .icon=${pill.icon}></ha-icon>` : nothing}${pill.text}
    </span>`;
  }

  private ring(view: BatteryTimeView) {
    const { circumference, fillDash, ticks } = ringGeometry(
      view.soc,
      view.chargeTo,
      view.dischargeTo,
      RING_RADIUS,
    );
    const c = RING_SIZE / 2;
    const tick = (at: number, kind: string) => {
      const a = (at * Math.PI) / 180;
      const inner = RING_RADIUS - RING_STROKE / 2;
      const outer = RING_RADIUS + RING_STROKE / 2;
      return svg`<line
        class="tick ${kind}"
        x1=${c + inner * Math.sin(a)}
        y1=${c - inner * Math.cos(a)}
        x2=${c + outer * Math.sin(a)}
        y2=${c - outer * Math.cos(a)}
      ></line>`;
    };
    const line = view.eta ? targetLine(view, "approx") : null;
    return html`<div class="ring-box">
        <svg
          class="ring"
          viewBox="0 0 ${RING_SIZE} ${RING_SIZE}"
          width=${RING_SIZE}
          height=${RING_SIZE}
          role="img"
          aria-label=${faceSentence(view)}
        >
          ${svg`<defs>
              <linearGradient id=${this.gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop class="stop-tone" offset="0"></stop>
                <stop class="stop-light" offset="1"></stop>
              </linearGradient>
            </defs>
            <circle class="track" cx=${c} cy=${c} r=${RING_RADIUS}></circle>
            ${
              fillDash > 0
                ? svg`<circle
                    class="fill"
                    cx=${c}
                    cy=${c}
                    r=${RING_RADIUS}
                    stroke=${`url(#${this.gradientId})`}
                    stroke-dasharray=${`${fillDash} ${circumference}`}
                    transform=${`rotate(-90 ${c} ${c})`}
                  ></circle>`
                : nothing
            }
            ${ticks.map((t) => tick(t.at, t.kind))}`}
        </svg>
        <div class="centre" aria-hidden="true">
          <div class="soc">${socText(view.soc, view.locale)}</div>
          <div class="word"><span class="dot"></span>${view.word}</div>
        </div>
      </div>
      ${
        view.eta
          ? html`<div class="time">${view.eta.duration}</div>`
          : html`<div class="time status-big">${view.status}</div>`
      }
      ${line ? html`<div class="sub">${line}</div>` : nothing} ${this.pill(view)}`;
  }

  private bar(view: BatteryTimeView) {
    const share = view.soc === null ? 0 : clampPct(view.soc);
    const marks: { at: number; kind: string }[] = [];
    if (view.dischargeTo !== null) marks.push({ at: view.dischargeTo, kind: "discharge" });
    if (view.chargeTo !== null) marks.push({ at: view.chargeTo, kind: "charge" });
    const pos = (at: number) => `left: calc(3px + (100% - 6px) * ${clampPct(at) / 100})`;
    return html`<div class="top">
        <span class="time">${view.eta ? view.eta.duration : view.word}</span>${this.pill(view)}
      </div>
      <div class="status">${view.status}</div>
      <div class="battery" role="img" aria-label=${faceSentence(view)}>
        <div class="level" style="width: calc((100% - 6px) * ${share / 100})"></div>
        ${marks.map((m) => html`<div class="mark ${m.kind}" style=${pos(m.at)}></div>`)}
        <div class="level-text">${socText(view.soc, view.locale)}</div>
      </div>
      <div class="scale" aria-hidden="true">
        ${marks.map(
          (m) =>
            html`<span class="${m.kind}" style=${pos(m.at)}>${pctLabel(m.at, view.locale)}</span>`,
        )}
      </div>`;
  }

  private tile(view: BatteryTimeView) {
    const share = view.soc === null ? 0 : clampPct(view.soc);
    const line = targetLine(view, "at");
    const pill = powerPill(view);
    const power = pill
      ? html`${pill.icon ? html`<ha-icon class="arrow" .icon=${pill.icon}></ha-icon>` : nothing}${pill.text}`
      : nothing;
    return html`<div class="row">
        <div class="icon">
          <ha-icon .icon=${batteryIcon(view.soc, view.tone === "charge")}></ha-icon>
        </div>
        <div class="lines">
          <div class="primary">${tilePrimary(view)}</div>
          <div class="secondary">${line ?? nothing}${line && pill ? " · " : nothing}${power}</div>
        </div>
      </div>
      <div class="thin" aria-hidden="true">
        <i style="width: ${share}%"></i>
        ${view.chargeTo !== null ? html`<b style="left: ${clampPct(view.chargeTo)}%"></b>` : nothing}
      </div>`;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    ha-card {
      height: 100%;
      box-sizing: border-box;
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
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      padding: 16px;
      color: var(--primary-text-color);
      container-type: inline-size;
    }
    .note {
      margin-top: 4px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    /* The bar's and the tile's height budgets hold one line of note. */
    .bar .note,
    .tile .note {
      -webkit-line-clamp: 1;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 28px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 14px;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 15%, transparent);
      color: var(--primary-text-color);
      font-size: 14px;
      white-space: nowrap;
    }
    .pill ha-icon {
      --mdc-icon-size: 16px;
      color: var(--tone);
    }

    /* ring */
    .ring .body {
      align-items: center;
      text-align: center;
    }
    .ring-box {
      position: relative;
      width: ${RING_SIZE}px;
      height: ${RING_SIZE}px;
      margin-bottom: 8px;
    }
    svg.ring {
      display: block;
    }
    .track,
    .fill {
      fill: none;
      stroke-width: ${RING_STROKE};
    }
    .track {
      stroke: var(--divider-color);
    }
    .fill {
      stroke-linecap: round;
    }
    .stop-tone {
      stop-color: var(--tone);
    }
    .stop-light {
      stop-color: var(--tone);
      stop-color: color-mix(in srgb, var(--tone), white 40%);
    }
    .tick {
      stroke: var(--primary-text-color);
      stroke-width: 2.5;
    }
    .tick.discharge {
      opacity: 0.5;
    }
    .centre {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .soc {
      font-size: 34px;
      font-weight: 500;
      line-height: 1;
    }
    .word {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
      max-width: 100px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 14px;
      white-space: nowrap;
    }
    .dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--tone);
    }
    .ring .time {
      font-size: 26px;
      font-weight: 500;
      line-height: 30px;
    }
    .ring .time.status-big {
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      padding: 5px 0;
    }
    .sub {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 20px;
    }
    .ring .pill {
      margin-top: 8px;
    }

    /* bar */
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 32px;
    }
    .bar .time {
      min-width: 0;
      font-size: 28px;
      font-weight: 500;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar .pill {
      flex: none;
    }
    /* Half a section (6 of 12 columns) is about 245 px: the time and the
       pill share one 32 px row there. */
    @container (max-width: 260px) {
      .bar .time {
        font-size: 20px;
      }
      .bar .pill {
        padding: 0 8px;
      }
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .battery {
      position: relative;
      height: 40px;
      box-sizing: border-box;
      margin: 12px 10px 0 0;
      border: 2px solid var(--secondary-text-color);
      border-color: color-mix(in srgb, var(--secondary-text-color) 55%, transparent);
      border-radius: 10px;
    }
    .battery::after {
      content: "";
      position: absolute;
      right: -8px;
      top: 10px;
      width: 6px;
      height: 16px;
      border-radius: 0 3px 3px 0;
      background: var(--secondary-text-color);
      background: color-mix(in srgb, var(--secondary-text-color) 55%, transparent);
    }
    .level {
      position: absolute;
      left: 3px;
      top: 3px;
      bottom: 3px;
      border-radius: 6px;
      background: var(--tone);
      background: linear-gradient(90deg, var(--tone), color-mix(in srgb, var(--tone), white 40%));
    }
    .mark {
      position: absolute;
      top: -6px;
      bottom: -6px;
      width: 2px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
    .mark.discharge,
    .scale .discharge {
      opacity: 0.5;
    }
    .level-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      text-shadow: 0 0 3px var(--card-background-color, transparent);
    }
    .scale {
      position: relative;
      height: 16px;
      margin-right: 10px;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 16px;
    }
    .scale span {
      position: absolute;
      top: 2px;
      transform: translateX(-50%);
    }

    /* tile */
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--tone);
      background: color-mix(in srgb, var(--tone) 20%, transparent);
    }
    .icon ha-icon {
      --mdc-icon-size: 24px;
      color: var(--tone);
    }
    .lines {
      min-width: 0;
    }
    .primary,
    .secondary {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .primary {
      font-size: 16px;
      font-weight: 500;
    }
    .secondary {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
    .secondary .arrow {
      --mdc-icon-size: 14px;
      color: var(--tone);
      vertical-align: -1px;
      margin-right: 2px;
    }
    .thin {
      position: relative;
      height: 6px;
      margin-top: 8px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .thin i {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 3px;
      background: var(--tone);
    }
    .thin b {
      position: absolute;
      top: -3px;
      width: 2px;
      height: 12px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
  `;
}

class InverterAnalyticsBatteryTimeEditor extends LitElement {
  @state() private config: CardConfig = {};
  @state() public hass?: CardHass;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

  render() {
    const m = messages();
    const labels: Record<EditorField["name"], [string, string | undefined]> = {
      layout: [m.editor.layout, undefined],
      entry_id: [m.editor.entryId, m.editor.entryIdHint],
      charge_to: [m.editor.chargeTo, m.editor.chargeToHint],
      discharge_to: [m.editor.dischargeTo, m.editor.dischargeToHint],
    };
    const data = {
      layout: layoutOf(this.config.layout),
      entry_id: this.config.entry_id ?? "",
      charge_to: this.config.charge_to === undefined ? "" : String(this.config.charge_to),
      discharge_to: this.config.discharge_to === undefined ? "" : String(this.config.discharge_to),
    };
    return html`<p class="description">${m.description}</p>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${editorSchema(m)}
        .computeLabel=${(field: EditorField) => labels[field.name][0]}
        .computeHelper=${(field: EditorField) => labels[field.name][1]}
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
