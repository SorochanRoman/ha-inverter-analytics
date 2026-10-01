import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchBattery } from "../api";
import { socBandsOption, socHistogramOption } from "../charts/options";
import "../charts/echart";
import "../sections/charge-section";
import {
  coverageWarning,
  describeError,
  formatDuration,
  formatPercent,
  precisionLabel,
} from "../format";
import { I18nController } from "../i18n/controller";
import { resolveRange, type RangeKey } from "../range";
import type { BatteryPayload, HomeAssistant } from "../types";

@customElement("ia-battery-tab")
export class IaBatteryTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: BatteryPayload;
  // The error itself, not its sentence: render() words it, so a language
  // switch re-words an error already on screen.
  @state() private error?: unknown;
  @state() private loading = false;

  private i18n = new I18nController(this);

  private requestId = 0;
  private themeObserver?: MutationObserver;

  public connectedCallback(): void {
    super.connectedCallback();
    // Chart options bake in the colours read at build time, so without a
    // rebuild the axis labels stay stuck with the previous theme.
    this.themeObserver = new MutationObserver(() => this.requestUpdate());
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  public disconnectedCallback(): void {
    this.themeObserver?.disconnect();
    this.themeObserver = undefined;
    super.disconnectedCallback();
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("entryId") || changed.has("range")) {
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.entryId) return;
    // While a request is in flight the user may have switched periods; the
    // older response must not overwrite the newer one.
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const { start, end } = resolveRange(this.range, new Date());
      const payload = await fetchBattery(this.hass, this.entryId, start, end);
      if (requestId !== this.requestId) return;
      this.payload = payload;
    } catch (err) {
      if (requestId !== this.requestId) return;
      this.error = err;
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: BatteryPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const measurable = payload.dips_measurable;
    const dash = "—";

    const cells: [string, string, string][] = [
      [
        m.battery.meanCharge,
        formatPercent(pct(payload.kpi.mean_soc), locale),
        m.battery.overWholePeriod,
      ],
      [
        m.battery.lowestCharge,
        measurable ? formatPercent(pct(payload.kpi.min_soc), locale) : dash,
        measurable ? m.battery.exactDataOnly : m.battery.needsExactData,
      ],
      [
        m.battery.below({ level: formatPercent(pct(payload.low_pct), locale) }),
        measurable ? formatDuration(payload.kpi.seconds_below_low, locale) : dash,
        measurable ? m.battery.exactDataOnly : m.battery.needsExactData,
      ],
      [
        m.battery.dips,
        measurable ? String(payload.kpi.dip_count) : dash,
        measurable ? m.battery.lastingOverMinute : m.battery.needsExactData,
      ],
      [
        m.battery.meanLowPoint,
        measurable ? formatPercent(pct(payload.kpi.mean_low_point), locale) : dash,
        measurable ? m.battery.acrossThoseDips : m.battery.needsExactData,
      ],
    ];

    return html`<div class="kpi">
      ${cells.map(
        ([label, value, hint]) => html`<div class="cell">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
          <span class="hint">${hint}</span>
        </div>`,
      )}
    </div>`;
  }

  private renderEpisodes(payload: BatteryPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;

    if (!payload.dips_measurable) {
      return html`<p class="empty">${m.battery.dipsNotMeasurable}</p>`;
    }
    if (!payload.episodes.length) {
      return html`<p class="empty">
        ${m.battery.noEpisodes({ level: formatPercent(pct(payload.low_pct), locale) })}
      </p>`;
    }

    return html`<table>
      <thead>
        <tr>
          <th>${m.common.start}</th>
          <th>${m.common.duration}</th>
          <th>${m.battery.lowest}</th>
          <th>${m.battery.recoveredTo}</th>
        </tr>
      </thead>
      <tbody>
        ${payload.episodes.map(
          (dip) => html`<tr>
            <td>${new Date(dip.start).toLocaleString(locale)}</td>
            <td>${formatDuration(dip.seconds, locale)}</td>
            <td>${formatPercent(pct(dip.lowest), locale)}</td>
            <td>${formatPercent(pct(dip.recovered_to), locale)}</td>
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  protected render() {
    const m = this.i18n.m;
    if (this.error !== undefined) {
      return html`<div class="notice">
        ${m.common.couldNotLoadData({ error: describeError(this.error, m) })}
        <button @click=${() => this.load()}>${m.common.tryAgain}</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">${m.common.computing}</div>`;
    }

    const payload = this.payload;
    const locale = this.i18n.locale;
    const warning = coverageWarning(payload.coverage, locale);

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">${m.common.periodShortened}</span>`
          : nothing}
        ${payload.raw_from && payload.dips_restricted && payload.dips_measurable
          ? html`<span class="warn">
              ${m.battery.dipsCountedFrom({
                date: new Date(payload.raw_from).toLocaleDateString(locale),
              })}
            </span>`
          : nothing}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      ${this.renderKpi(payload)}

      <section>
        <h2>${m.battery.timeAtSoc}</h2>
        <ia-chart .option=${socHistogramOption(payload, m)}></ia-chart>
      </section>

      <section>
        <h2>${m.battery.chargeBands}</h2>
        <ia-chart .option=${socBandsOption(payload.bands, m)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${m.battery.lowChargeEpisodes}</h2>
        ${this.renderEpisodes(payload)}
      </section>

      ${payload.power
        ? html`<ia-charge-section
            .flow=${payload.power}
            .hasCapacity=${payload.has_capacity}
            .locale=${locale}
          ></ia-charge-section>`
        : html`<section>
            <h2>${m.sections.charge.title}</h2>
            <p class="empty">${m.battery.mapPowerSensor}</p>
          </section>`}
    `;
  }

  static styles = css`
    :host { display: block; }
    .status { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
    .badge {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn { color: var(--warning-color); font-size: 13px; }
    .kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .cell {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label { font-size: 12px; color: var(--secondary-text-color); }
    .value { font-size: 22px; font-weight: 500; }
    .hint { font-size: 12px; color: var(--secondary-text-color); }
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
    .empty { color: var(--secondary-text-color); margin: 0; }
    .notice { padding: 24px; color: var(--secondary-text-color); }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font: inherit;
    }
  `;
}

/** The payload carries a state of charge as 0-100; formatPercent wants 0-1. */
function pct(value: number | null): number | null {
  return value === null ? null : value / 100;
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-battery-tab": IaBatteryTab;
  }
}
