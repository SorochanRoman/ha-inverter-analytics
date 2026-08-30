import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchBalance } from "../api";
import { FLOW_LABELS, dailyFlowsOption, flowBarsOption } from "../charts/options";
import "../charts/echart";
import { describeError, formatEnergy, formatPercent } from "../format";
import { resolveRange, type RangeKey } from "../range";
import type { BalancePayload, HomeAssistant } from "../types";

const SOURCES = ["pv_energy_total", "grid_import_total", "battery_discharge_total"] as const;
const SINKS = ["load_energy_total", "grid_export_total", "battery_charge_total"] as const;
const ALL = [...SOURCES, ...SINKS];

@customElement("ia-balance-tab")
export class IaBalanceTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: BalancePayload;
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
      const payload = await fetchBalance(this.hass, this.entryId, start, end);
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

  private renderTotals(payload: BalancePayload) {
    const locale = this.hass.locale.language;
    return html`<div class="kpi">
      ${ALL.filter((role) => role in payload.totals).map(
        (role) => html`<div class="cell">
          <span class="label">${FLOW_LABELS[role]}</span>
          <span class="value">${formatEnergy(payload.totals[role], locale)}</span>
          <span class="hint">
            ${(SOURCES as readonly string[]).includes(role) ? "into the system" : "out of it"}
          </span>
        </div>`,
      )}
    </div>`;
  }

  private renderBalance(payload: BalancePayload) {
    const locale = this.hass.locale.language;

    if (payload.unaccounted === null) {
      return html`<p class="empty">
        The books can only be closed with all six counters mapped. Missing:
        ${payload.missing.map((role) => FLOW_LABELS[role]).join(", ")}. Until then the difference
        between the two bars would measure what is not mapped rather than what was lost.
      </p>`;
    }

    return html`
      <p class="balance">
        In ${formatEnergy(payload.sources_total, locale)}, out
        ${formatEnergy(payload.sinks_total, locale)} —
        <strong>${formatEnergy(Math.abs(payload.unaccounted), locale)}</strong>
        ${payload.unaccounted >= 0 ? "unaccounted for" : "more out than in"}
        (${formatPercent(payload.unaccounted_share, locale)}).
      </p>
      <p class="note">
        Conversion and battery round-trip losses live in this figure, and so does every
        disagreement between the six meters. It is called unaccounted rather than losses because
        nothing here can tell heat in the inverter from error in a clamp.
      </p>
    `;
  }

  private renderRatios(payload: BalancePayload) {
    const locale = this.hass.locale.language;
    const totals = payload.totals;
    const has = (role: string) => role in totals;

    if (payload.self_sufficiency === null && payload.self_consumption === null) {
      return html`<p class="empty">
        Self-sufficiency needs the house and grid-import counters; self-consumption needs solar
        and grid export.
      </p>`;
    }

    return html`<div class="kpi">
      ${payload.self_sufficiency !== null
        ? html`<div class="cell">
            <span class="label">Self-sufficiency</span>
            <span class="value">${formatPercent(payload.self_sufficiency, locale)}</span>
            <span class="hint">
              ${has("load_energy_total") && has("grid_import_total")
                ? `(${formatEnergy(totals.load_energy_total, locale)} − ${formatEnergy(
                    totals.grid_import_total,
                    locale,
                  )}) ÷ ${formatEnergy(totals.load_energy_total, locale)}`
                : ""}
            </span>
          </div>`
        : nothing}
      ${payload.self_consumption !== null
        ? html`<div class="cell">
            <span class="label">Self-consumption</span>
            <span class="value">${formatPercent(payload.self_consumption, locale)}</span>
            <span class="hint">
              ${has("pv_energy_total") && has("grid_export_total")
                ? `(${formatEnergy(totals.pv_energy_total, locale)} − ${formatEnergy(
                    totals.grid_export_total,
                    locale,
                  )}) ÷ ${formatEnergy(totals.pv_energy_total, locale)}`
                : ""}
            </span>
          </div>`
        : nothing}
    </div>`;
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
        <span class="badge">Hourly statistics</span>
        <span class="badge">Days in ${payload.timezone}</span>
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${!payload.covers_whole_window && payload.covered_end
          ? html`<span class="warn">
              Counted up to ${new Date(payload.covered_end).toLocaleString(locale)}
            </span>`
          : nothing}
        ${!payload.covered_end
          ? html`<span class="warn">No energy statistics in this period</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      ${this.renderTotals(payload)}

      <section>
        <h2>In against out</h2>
        <ia-chart
          .option=${flowBarsOption(payload.totals, SOURCES, SINKS)}
          height="220px"
        ></ia-chart>
        ${this.renderBalance(payload)}
      </section>

      <section>
        <h2>Self-sufficiency and self-consumption</h2>
        ${this.renderRatios(payload)}
      </section>

      <section>
        <h2>Day by day</h2>
        ${payload.days.length
          ? html`<ia-chart .option=${dailyFlowsOption(payload.days, SOURCES, SINKS)}></ia-chart>`
          : html`<p class="empty">No days with energy statistics in this period.</p>`}
        <p class="note">
          Two bars a day: what came in, and what went out. Adding the two together would count
          the same energy twice. Energy is read from Home Assistant's hourly statistics, which is where counter resets
          are already accounted for. The current hour is compiled only once it ends, so a period
          running up to now stops at the last completed hour.
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
    .kpi {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
    section .kpi { margin-bottom: 0; }
    section .cell { border: 1px solid var(--divider-color); }
    h2 { font-size: 15px; font-weight: 500; margin: 0 0 12px; }
    .balance { font-size: 14px; margin: 12px 0 0; }
    .note { font-size: 12px; color: var(--secondary-text-color); margin: 12px 0 0; }
    .empty { color: var(--secondary-text-color); margin: 0; font-size: 13px; }
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
    "ia-balance-tab": IaBalanceTab;
  }
}
