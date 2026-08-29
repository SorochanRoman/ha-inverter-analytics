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
import { resolveRange, type RangeKey } from "../range";
import type { BatteryPayload, HomeAssistant } from "../types";

@customElement("ia-battery-tab")
export class IaBatteryTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: BatteryPayload;
  @state() private error?: string;
  @state() private loading = false;

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
      this.error = describeError(err);
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: BatteryPayload) {
    const locale = this.hass.locale.language;
    const measurable = payload.dips_measurable;
    const dash = "—";

    const cells: [string, string, string][] = [
      ["Mean charge", formatPercent(pct(payload.kpi.mean_soc), locale), "over the whole period"],
      [
        "Lowest charge",
        measurable ? formatPercent(pct(payload.kpi.min_soc), locale) : dash,
        measurable ? "exact data only" : "needs exact data",
      ],
      [
        `Below ${formatPercent(pct(payload.low_pct), locale)}`,
        measurable ? formatDuration(payload.kpi.seconds_below_low) : dash,
        measurable ? "exact data only" : "needs exact data",
      ],
      [
        "Dips",
        measurable ? String(payload.kpi.dip_count) : dash,
        measurable ? "lasting over a minute" : "needs exact data",
      ],
      [
        "Mean low point",
        measurable ? formatPercent(pct(payload.kpi.mean_low_point), locale) : dash,
        measurable ? "across those dips" : "needs exact data",
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
    const locale = this.hass.locale.language;

    if (!payload.dips_measurable) {
      return html`<p class="empty">
        This period is covered only by hourly averages, which record the mean charge across each
        hour. A fall to 8% for twenty minutes shows up there as a comfortable number, so dips
        cannot be counted at all — an empty table would read as "none happened". Pick a shorter
        period to see them.
      </p>`;
    }
    if (!payload.episodes.length) {
      return html`<p class="empty">
        The charge never stayed below ${formatPercent(pct(payload.low_pct), locale)} for more than
        a minute in this period.
      </p>`;
    }

    return html`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Lowest</th><th>Recovered to</th></tr>
      </thead>
      <tbody>
        ${payload.episodes.map(
          (dip) => html`<tr>
            <td>${new Date(dip.start).toLocaleString(locale)}</td>
            <td>${formatDuration(dip.seconds)}</td>
            <td>${formatPercent(pct(dip.lowest), locale)}</td>
            <td>${formatPercent(pct(dip.recovered_to), locale)}</td>
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  protected render() {
    if (this.error) {
      return html`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">Computing…</div>`;
    }

    const payload = this.payload;
    const locale = this.hass.locale.language;
    const warning = coverageWarning(payload.coverage, locale);

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${payload.raw_from && payload.dips_restricted && payload.dips_measurable
          ? html`<span class="warn">
              Dips counted from ${new Date(payload.raw_from).toLocaleDateString(locale)}, where
              exact data begins
            </span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      ${this.renderKpi(payload)}

      <section>
        <h2>Time spent at each state of charge</h2>
        <ia-chart .option=${socHistogramOption(payload)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across charge bands</h2>
        <ia-chart .option=${socBandsOption(payload.bands)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Low-charge episodes</h2>
        ${this.renderEpisodes(payload)}
      </section>

      ${payload.power
        ? html`<ia-charge-section
            .flow=${payload.power}
            .hasCapacity=${payload.has_capacity}
            .locale=${locale}
          ></ia-charge-section>`
        : html`<section>
            <h2>Charging and discharging</h2>
            <p class="empty">
              Map a battery power sensor in the integration's options to see how much moves in and
              out, and how much of the time the battery is working.
            </p>
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
