import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchSeasonality } from "../api";
import { hourOfDayOption, monthHourHeatmapOption, monthLabel, monthlyOption } from "../charts/options";
import "../charts/echart";
import {
  coverageWarning,
  describeError,
  formatPercent,
  formatPower,
  precisionLabel,
} from "../format";
import { resolveRange, type RangeKey } from "../range";
import type { HomeAssistant, SeasonalityPayload } from "../types";

@customElement("ia-seasonality-tab")
export class IaSeasonalityTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "year";

  @state() private payload?: SeasonalityPayload;
  @state() private error?: string;
  @state() private loading = false;

  private requestId = 0;
  private themeObserver?: MutationObserver;

  public connectedCallback(): void {
    super.connectedCallback();
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
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const { start, end } = resolveRange(this.range, new Date());
      const payload = await fetchSeasonality(this.hass, this.entryId, start, end);
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

  private renderMonthTable(payload: SeasonalityPayload) {
    const locale = this.hass.locale.language;
    const keys = payload.months.map((month) => month.key);
    return html`<table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Mean load</th>
          <th>Busiest hour</th>
          ${payload.has_pv ? html`<th>Mean PV</th>` : nothing}
          <th>Of the month</th>
        </tr>
      </thead>
      <tbody>
        ${payload.months.map(
          (month, index) => html`<tr class=${month.complete ? "" : "partial"}>
            <td>${monthLabel(month.key, keys[index - 1])}</td>
            <td>${formatPower(month.load_mean, locale)}</td>
            <td>${formatPower(month.load_peak_hourly, locale)}</td>
            ${payload.has_pv ? html`<td>${formatPower(month.pv_mean, locale)}</td>` : nothing}
            <td>${formatPercent(month.coverage, locale)}</td>
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
    const partial = payload.months.filter((month) => !month.complete);

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        <span class="badge">Months in ${payload.timezone}</span>
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      <section>
        <h2>Mean power by month</h2>
        <ia-chart .option=${monthlyOption(payload.months, payload.has_pv)}></ia-chart>
        ${partial.length
          ? html`<p class="note">
              ${partial.length === 1 ? "One month is" : `${partial.length} months are`} covered by
              less than ${formatPercent(payload.incomplete_below, locale)} of their days and
              ${partial.length === 1 ? "is" : "are"} drawn in grey. A month the recorder only saw
              part of is not a lower month; the figures stand, the comparison does not.
            </p>`
          : nothing}
      </section>

      <section>
        <h2>Month by month</h2>
        ${this.renderMonthTable(payload)}
        <p class="note">
          "Busiest hour" is the highest hourly average, not the highest load. Beyond the
          recorder's retention Home Assistant keeps only an hourly mean, so a brief peak inside an
          hour has already been averaged away by the time this page sees it.
        </p>
      </section>

      <section>
        <h2>Mean power by hour of day</h2>
        <ia-chart .option=${hourOfDayOption(payload.hours, payload.has_pv)}></ia-chart>
        <p class="note">
          Averaged across the whole period, so it blends the seasons. The heat map below is the
          same question asked per month.
        </p>
      </section>

      <section>
        <h2>Hour of day, month by month</h2>
        <ia-chart
          .option=${monthHourHeatmapOption(payload.cells, payload.months)}
          height="420px"
        ></ia-chart>
        <p class="note">
          Where a winter evening peak and a summer midday one stop being two averages and become
          two shapes. Hours with no recorded data are left blank rather than drawn as zero.
        </p>
      </section>
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
    section {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
    tr.partial td { color: var(--secondary-text-color); }
    .note { font-size: 12px; color: var(--secondary-text-color); margin: 12px 0 0; }
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

declare global {
  interface HTMLElementTagNameMap {
    "ia-seasonality-tab": IaSeasonalityTab;
  }
}
