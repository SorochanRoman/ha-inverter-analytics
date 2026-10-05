import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchBalance } from "../api";
import { dailyFlowsOption, flowBarsOption, flowLabel, savingsOption } from "../charts/options";
import "../charts/echart";
import { DASH, describeError, formatCoverage, formatEnergy, formatPercent } from "../format";
import { I18nController } from "../i18n/controller";
import { resolveRange, type RangeKey } from "../range";
import { listRoles } from "../roles";
import {
  coverageShare,
  formatMoney,
  missingSavingsRoles,
  savingsBars,
  savingsState,
} from "../savings";
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
      const payload = await fetchBalance(this.hass, this.entryId, start, end);
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

  private renderTotals(payload: BalancePayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    return html`<div class="kpi">
      ${ALL.filter((role) => role in payload.totals).map(
        (role) => html`<div class="cell">
          <span class="label">${flowLabel(m, role)}</span>
          <span class="value">${formatEnergy(payload.totals[role], locale)}</span>
          <span class="hint">
            ${(SOURCES as readonly string[]).includes(role)
              ? m.balance.intoSystem
              : m.balance.outOfIt}
          </span>
        </div>`,
      )}
    </div>`;
  }

  private renderBalance(payload: BalancePayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;

    if (payload.unaccounted === null) {
      return html`<p class="empty">
        ${m.balance.needsAllSix({
          missing: payload.missing.map((role) => flowLabel(m, role)).join(", "),
        })}
      </p>`;
    }

    return html`
      <p class="balance">
        ${m.balance.inOut({
          in: formatEnergy(payload.sources_total, locale),
          out: formatEnergy(payload.sinks_total, locale),
        })}
        <strong>${formatEnergy(Math.abs(payload.unaccounted), locale)}</strong>
        ${(payload.unaccounted >= 0 ? m.balance.unaccountedFor : m.balance.moreOutThanIn)({
          share: formatPercent(payload.unaccounted_share, locale),
        })}
      </p>
      <p class="note">${m.balance.unaccountedNote}</p>
    `;
  }

  private renderRatios(payload: BalancePayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const totals = payload.totals;
    const has = (role: string) => role in totals;

    if (payload.self_sufficiency === null && payload.self_consumption === null) {
      return html`<p class="empty">${m.balance.ratiosNeedCounters}</p>`;
    }

    return html`<div class="kpi">
      ${payload.self_sufficiency !== null
        ? html`<div class="cell">
            <span class="label">${m.common.selfSufficiency}</span>
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
            <span class="label">${m.balance.selfConsumption}</span>
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

  private renderSavings(payload: BalancePayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const block = payload.savings;
    const state = savingsState(block);
    // No block: a backend older than the card, so no card rather than an error.
    if (!block || !state) return nothing;

    if (state.kind === "withheld") {
      let reason: string;
      if (state.reason === "no_counters") {
        const missing = missingSavingsRoles(payload.mapped);
        reason = m.balance.savingsReasons.no_counters({
          roles: listRoles(m, missing, true),
          n: missing.length,
        });
      } else {
        reason = m.balance.savingsReasons[state.reason];
      }
      return html`<section>
        <h2>${m.balance.savingsTitle}</h2>
        <p class="empty">${reason}</p>
      </section>`;
    }

    const share = coverageShare(block);
    const money = (value: number | null) =>
      value === null ? DASH : formatMoney(value, block.currency, locale);
    // A year is read by the month; a day's bar would be a sliver among 365.
    const bars = savingsBars(block.days, this.range === "year");
    return html`<section>
      <h2>${m.balance.savingsTitle}</h2>
      <div class="kpi">
        <div class="cell">
          <span class="label">${m.balance.savingsSeries}</span>
          <span class="value">${money(block.total)}</span>
          <span class="hint">
            ${m.balance.savingsPerDay({
              amount: money(block.per_day),
            })}
          </span>
        </div>
      </div>
      <ia-chart .option=${savingsOption(bars, block.currency, m)}></ia-chart>
      ${share !== null
        ? html`<p class="warn">
            ${m.balance.savingsCoverage({ share: formatCoverage(share, locale) })}
          </p>`
        : nothing}
      <p class="note">${m.balance.savingsNote({ twoZone: block.two_zone })}</p>
    </section>`;
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

    return html`
      <div class="status">
        <span class="badge">${m.balance.hourlyStatistics}</span>
        <span class="badge">${m.balance.daysIn({ timezone: payload.timezone })}</span>
        ${payload.clamped
          ? html`<span class="warn">${m.common.periodShortened}</span>`
          : nothing}
        ${!payload.covers_whole_window && payload.covered_end
          ? html`<span class="warn">
              ${m.balance.countedUpTo({
                time: new Date(payload.covered_end).toLocaleString(locale),
              })}
            </span>`
          : nothing}
        ${!payload.covered_end
          ? html`<span class="warn">${m.balance.noEnergyStatistics}</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      ${this.renderTotals(payload)}

      <section>
        <h2>${m.balance.inAgainstOut}</h2>
        <ia-chart
          .option=${flowBarsOption(payload.totals, SOURCES, SINKS, m)}
          height="220px"
        ></ia-chart>
        ${this.renderBalance(payload)}
      </section>

      <section>
        <h2>${m.balance.ratiosTitle}</h2>
        ${this.renderRatios(payload)}
      </section>

      <section>
        <h2>${m.balance.dayByDay}</h2>
        ${payload.days.length
          ? html`<ia-chart
              .option=${dailyFlowsOption(payload.days, SOURCES, SINKS, m)}
            ></ia-chart>`
          : html`<p class="empty">${m.balance.noDays}</p>`}
        <p class="note">${m.balance.dayByDayNote}</p>
      </section>

      ${this.renderSavings(payload)}
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
