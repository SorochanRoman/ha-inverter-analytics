import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchLoad } from "../api";
import { bandsOption, durationCurveOption, histogramOption } from "../charts/options";
import "../charts/echart";
import { formatDuration, formatPercent, formatPower } from "../format";
import { resolveRange, type RangeKey } from "../range";
import type { HomeAssistant, LoadPayload } from "../types";

const PRECISION_LABEL: Record<LoadPayload["precision"], string> = {
  raw: "Точні дані",
  mixed: "Змішано",
  lts: "Погодинні середні",
};

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
      this.error = String(err);
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: LoadPayload) {
    const locale = this.hass.locale.language;
    const share = (value: number | null) =>
      value === null ? "" : formatPercent(value / payload.rated_power, locale) + " ном.";

    const cells: [string, string, string][] = [
      ["Середнє", formatPower(payload.kpi.mean, locale), share(payload.kpi.mean)],
      ["Медіана", formatPower(payload.kpi.median, locale), ""],
      ["P95", formatPower(payload.kpi.p95, locale), ""],
      ["Пік", formatPower(payload.kpi.max, locale), share(payload.kpi.max)],
      ["Стійке 15 хв", formatPower(payload.kpi.max_sustained_15m, locale), ""],
      [">80% номіналу", formatPercent(payload.kpi.fraction_above_80pct, locale), "часу"],
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
      return html`<p class="empty">Перевантажень за цей період не було.</p>`;
    }
    const locale = this.hass.locale.language;
    return html`<table>
      <thead>
        <tr><th>Початок</th><th>Тривалість</th><th>Пік</th></tr>
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
        Не вдалося завантажити дані: ${this.error}
        <button @click=${() => this.load()}>Спробувати ще</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">Розрахунок…</div>`;
    }

    const payload = this.payload;
    const locale = this.hass.locale.language;

    return html`
      <div class="status">
        <span class="badge">${PRECISION_LABEL[payload.precision]}</span>
        ${payload.coverage < 0.95
          ? html`<span class="warn">
              Дані відсутні ${formatPercent(1 - payload.coverage, locale)} часу
            </span>`
          : nothing}
        ${payload.clamped
          ? html`<span class="warn">Період скорочено до максимально дозволеного</span>`
          : nothing}
        ${payload.histogram.clipped_low_seconds + payload.histogram.clipped_high_seconds > 0
          ? html`<span class="warn">
              Частина значень вийшла за діапазон гістограми й показана в крайніх корзинах
            </span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Оновлення…</span>` : nothing}
      </div>

      ${this.renderKpi(payload)}

      <section>
        <header>
          <h2>Скільки часу на якій потужності</h2>
          <button @click=${() => {
            this.mode = this.mode === "watts" ? "percent" : "watts";
          }}>${this.mode === "watts" ? "у % від номіналу" : "у ватах"}</button>
        </header>
        <ia-chart .option=${histogramOption(payload, this.mode)}></ia-chart>
      </section>

      <section>
        <h2>Крива тривалості навантаження</h2>
        <ia-chart .option=${durationCurveOption(payload)}></ia-chart>
      </section>

      <section>
        <h2>Розподіл по діапазонах номіналу</h2>
        <ia-chart .option=${bandsOption(payload)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>Епізоди перевантаження</h2>
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
