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
import { I18nController } from "../i18n/controller";
import { resolveRange, type RangeKey } from "../range";
import type { HomeAssistant, SeasonalityPayload } from "../types";

@customElement("ia-seasonality-tab")
export class IaSeasonalityTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "year";

  @state() private payload?: SeasonalityPayload;
  // The error itself, not its sentence: render() words it, so a language
  // switch re-words an error already on screen.
  @state() private error?: unknown;
  @state() private loading = false;

  private i18n = new I18nController(this);

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
      this.error = err;
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderMonthTable(payload: SeasonalityPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const keys = payload.months.map((month) => month.key);
    return html`<table>
      <thead>
        <tr>
          <th>${m.seasonality.month}</th>
          <th>${m.common.meanLoad}</th>
          <th>${m.seasonality.busiestHour}</th>
          ${payload.has_pv ? html`<th>${m.seasonality.meanPv}</th>` : nothing}
          <th>${m.seasonality.ofTheMonth}</th>
        </tr>
      </thead>
      <tbody>
        ${payload.months.map(
          (month, index) => html`<tr class=${month.complete ? "" : "partial"}>
            <td>${monthLabel(month.key, keys[index - 1], m.charts.locale)}</td>
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
    // Split deliberately: a month with a thin bar and a month with no bar at
    // all are different problems, and one sentence counting them together said
    // nine months were "drawn faded" when one of them was.
    const thin = payload.months.filter((month) => !month.complete && month.load_mean !== null);
    const absent = payload.months.filter((month) => month.load_mean === null);

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        <span class="badge">${m.seasonality.monthsIn({ timezone: payload.timezone })}</span>
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">${m.common.periodShortened}</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      <section>
        <h2>${m.seasonality.meanByMonth}</h2>
        <ia-chart .option=${monthlyOption(payload.months, payload.has_pv, m)}></ia-chart>
        ${thin.length
          ? html`<p class="note">
              ${m.seasonality.thinMonths({
                n: thin.length,
                share: formatPercent(payload.incomplete_below, locale),
              })}
              ${m.seasonality.partialNotLower}
            </p>`
          : nothing}
        ${absent.length
          ? html`<p class="note">
              ${m.seasonality.absentMonths({ n: absent.length })}
              ${m.seasonality.statisticsFromStart}
            </p>`
          : nothing}
      </section>

      <section>
        <h2>${m.seasonality.monthByMonth}</h2>
        ${this.renderMonthTable(payload)}
        <p class="note">${m.seasonality.busiestHourNote}</p>
      </section>

      <section>
        <h2>${m.seasonality.meanByHour}</h2>
        <ia-chart .option=${hourOfDayOption(payload.hours, payload.has_pv, m)}></ia-chart>
        <p class="note">${m.seasonality.byHourNote}</p>
      </section>

      <section>
        <h2>${m.seasonality.hourByMonth}</h2>
        <ia-chart
          .option=${monthHourHeatmapOption(payload.cells, payload.months, m)}
          height="420px"
        ></ia-chart>
        <p class="note">${m.seasonality.heatmapNote}</p>
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
