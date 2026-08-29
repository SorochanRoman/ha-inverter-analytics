import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchLoad } from "../api";
import { bandsOption, durationCurveOption, histogramOption } from "../charts/options";
import "../charts/echart";
import {
  coverageWarning,
  describeError,
  formatDuration,
  formatPercent,
  formatPower,
  precisionLabel,
} from "../format";
import { resolveRange, type RangeKey } from "../range";
import type { HomeAssistant, LoadPayload } from "../types";

@customElement("ia-load-tab")
export class IaLoadTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: LoadPayload;
  @state() private error?: string;
  @state() private loading = false;
  @state() private mode: "watts" | "percent" = "watts";

  private requestId = 0;

  private themeObserver?: MutationObserver;

  public connectedCallback(): void {
    super.connectedCallback();
    // Home Assistant застосовує тему, переписуючи CSS-змінні на <html>.
    // Опції графіків тримають кольори, зчитані в момент побудови, тож без
    // перебудови підписи осей лишаються від попередньої теми: після
    // перемикання на світлу вони стають світло-сірими на білому й зникають.
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
    // Кожен запит отримує номер. Поки він летить, користувач міг уже
    // перемкнути період — тоді відповідь застаріла й показувати її не можна.
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const { start, end } = resolveRange(this.range, new Date());
      const payload = await fetchLoad(this.hass, this.entryId, start, end);
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

  private renderKpi(payload: LoadPayload) {
    const locale = this.hass.locale.language;
    const share = (value: number | null) =>
      value === null ? "" : formatPercent(value / payload.rated_power, locale) + " of rated";

    const cells: [string, string, string][] = [
      ["Mean", formatPower(payload.kpi.mean, locale), share(payload.kpi.mean)],
      ["Median", formatPower(payload.kpi.median, locale), ""],
      ["P95", formatPower(payload.kpi.p95, locale), ""],
      ["Peak", formatPower(payload.kpi.max, locale), share(payload.kpi.max)],
      ["Sustained 15 min", formatPower(payload.kpi.max_sustained_15m, locale), ""],
      [">80% of rated", formatPercent(payload.kpi.fraction_above_80pct, locale), "of time"],
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

  private renderOverloads(payload: LoadPayload) {
    if (!payload.overloads.length) {
      return html`<p class="empty">No overloads in this period.</p>`;
    }
    const locale = this.hass.locale.language;
    return html`<table>
      <thead>
        <tr><th>Start</th><th>Duration</th><th>Peak</th></tr>
      </thead>
      <tbody>
        ${payload.overloads.map(
          (item) => html`<tr>
            <td>${new Date(item.start).toLocaleString(locale)}</td>
            <td>${formatDuration(item.seconds)}</td>
            <td>${formatPower(item.peak, locale)}</td>
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

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${coverageWarning(payload.coverage, locale)
          ? html`<span class="warn">${coverageWarning(payload.coverage, locale)}</span>`
          : nothing}
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${payload.histogram.clipped_low_seconds + payload.histogram.clipped_high_seconds > 0
          ? html`<span class="warn">
              Some values fell outside the histogram range and are shown in its edge buckets
            </span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      ${this.renderKpi(payload)}

      <section>
        <header>
          <h2>Time spent at each power level</h2>
          <button @click=${() => {
            this.mode = this.mode === "watts" ? "percent" : "watts";
          }}>${this.mode === "watts" ? "as % of rated" : "in watts"}</button>
        </header>
        <ia-chart .option=${histogramOption(payload, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Load duration curve</h2>
        <ia-chart .option=${durationCurveOption(payload)}></ia-chart>
      </section>

      <section>
        <h2>Distribution across rated-power bands</h2>
        <ia-chart .option=${bandsOption(payload)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Overload episodes</h2>
        ${this.renderOverloads(payload)}
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
    section header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    section header h2 { margin-bottom: 12px; }
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

declare global {
  interface HTMLElementTagNameMap {
    "ia-load-tab": IaLoadTab;
  }
}
