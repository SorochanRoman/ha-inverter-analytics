import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchHealth } from "../api";
import { monthLabel, yearLinesOption } from "../charts/options";
import "../charts/echart";
import { describeError } from "../format";
import {
  HEALTH_CARDS,
  bestHourCaption,
  chartLines,
  comparisonView,
  energyCaption,
  formatHealthDifference,
  formatHealthShare,
  formatHealthValue,
  healthDefinitions,
  healthReason,
  lastTwelveRows,
  nameplateLine,
  type HealthCardKey,
} from "../health";
import { I18nController } from "../i18n/controller";
import { listRoles } from "../roles";
import { sectionStyles } from "../sections/shared-styles";
import type { HealthPayload, HealthSignalKey, HomeAssistant } from "../types";

/**
 * The Health tab: is the system what it was?
 *
 * No period: the command reads the whole history it can, five years of
 * long-term statistics, so this tab takes no range and the panel dims the
 * picker while it is open. Every decision about what a card shows is made in
 * health.ts; this only renders it.
 */
@customElement("ia-health-tab")
export class IaHealthTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;

  @state() private payload?: HealthPayload;
  // The error itself, not its sentence: render() words it, so a language
  // switch re-words an error already on screen.
  @state() private error?: unknown;
  @state() private loading = false;

  private i18n = new I18nController(this);

  private requestId = 0;
  private themeObserver?: MutationObserver;

  public connectedCallback(): void {
    super.connectedCallback();
    // Charts bake in the theme's colours at build time; see load-tab.ts.
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
    if (changed.has("entryId")) {
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.entryId) return;
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const payload = await fetchHealth(this.hass, this.entryId);
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

  /** The roles a signal is short of, in the Sizing cards' words. */
  private renderMissing(missing: string[]) {
    const m = this.i18n.m;
    // rated_power is a number in the options, not an entity: "not mapped"
    // would send the reader looking for a sensor to pick.
    const onlyRated = missing.length === 1 && missing[0] === "rated_power";
    return html`<p class="note">
      ${onlyRated
        ? m.sizing.needsNotSet({ roles: listRoles(m, missing, true) })
        : m.sizing.needsNotMapped({ roles: listRoles(m, missing, true), n: missing.length })}
    </p>`;
  }

  private renderComparison(payload: HealthPayload, signal: HealthSignalKey) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const view = comparisonView(payload.signals[signal]);
    if (view.kind === "notEnough") {
      return html`<div class="figure">
        <span class="label">${m.health.lastTwelve}</span>
        <p class="note">
          ${m.health.notEnough({
            recent: view.recent,
            previous: view.previous,
            needed: view.needed,
          })}
        </p>
      </div>`;
    }
    return html`<div class="figure">
      <span class="label">${m.health.lastTwelve}</span>
      <span class="value">${formatHealthValue(signal, view.recent, m, locale)}</span>
      <span class="row">
        <span
          >${m.health.twelveBefore({
            value: formatHealthValue(signal, view.previous, m, locale),
          })}</span
        >
        <span
          >${formatHealthDifference(signal, view.change, m, locale)}
          (${formatHealthShare(view.share, locale)})</span
        >
      </span>
      <span class="hint">${m.health.meanOfMonthly}</span>
    </div>`;
  }

  private renderTable(payload: HealthPayload, signal: HealthSignalKey) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const rows = lastTwelveRows(payload, signal);
    const months = payload.signals[signal].months;
    return html`<div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${m.health.columns.month}</th>
            <th>${m.health.columns.value}</th>
            <th>${m.health.columns.previous}</th>
            <th>${m.health.columns.difference}</th>
            <th>${m.health.columns.share}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => {
            const month = months[row.key];
            return html`<tr>
              <td>${monthLabel(row.key, undefined, locale)}</td>
              <td>
                ${formatHealthValue(signal, row.value, m, locale)}
                ${row.reason !== null
                  ? html`<span class="hint">${healthReason(m, row.reason, month, locale)}</span>`
                  : nothing}
                ${signal === "inverter" && month?.measured_hours !== undefined
                  ? html`<span class="hint"
                      >${m.health.inverterHint({
                        atRated: `${month.hours_at_rated ?? 0}`,
                        measured: `${month.measured_hours}`,
                      })}</span
                    >`
                  : nothing}
              </td>
              <td>${formatHealthValue(signal, row.previousValue, m, locale)}</td>
              <td>${formatHealthDifference(signal, row.difference, m, locale)}</td>
              <td>${formatHealthShare(row.share, locale)}</td>
            </tr>`;
          })}
        </tbody>
      </table>
    </div>`;
  }

  /** The captions a signal's chart carries beneath it. */
  private renderCaptions(payload: HealthPayload, signal: HealthSignalKey) {
    const m = this.i18n.m;
    if (signal === "capacity" && payload.nameplate_kwh !== null) {
      return html`<p class="note">${m.health.nameplateNote}</p>`;
    }
    if (signal === "solar_energy") {
      return html`<p class="note">${m.health.energyCaption[energyCaption(payload)]}</p>`;
    }
    if (signal === "best_hour") {
      return html`<p class="note">${m.health.bestHourCaption[bestHourCaption(payload)]}</p>`;
    }
    return nothing;
  }

  private renderSignal(payload: HealthPayload, signal: HealthSignalKey, titled: boolean) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const data = payload.signals[signal];
    const heading = titled ? html`<h3>${m.health.signals[signal]}</h3>` : nothing;
    if (data.missing.length) {
      return html`${heading}${this.renderMissing(data.missing)}`;
    }
    const { lines, unit } = chartLines(payload, signal, m);
    return html`
      ${heading} ${this.renderComparison(payload, signal)}
      <ia-chart
        .option=${yearLinesOption(lines, unit, m, nameplateLine(payload, signal, m, locale))}
        height="240px"
      ></ia-chart>
      ${this.renderCaptions(payload, signal)} ${this.renderTable(payload, signal)}
    `;
  }

  private renderCard(payload: HealthPayload, card: HealthCardKey, signals: HealthSignalKey[]) {
    const m = this.i18n.m;
    return html`<section>
      <h2>${m.health.cards[card]}</h2>
      ${signals.map((signal) => this.renderSignal(payload, signal, signals.length > 1))}
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
    const definitions = healthDefinitions(m, locale, payload.pv_power_derived);
    return html`
      <div class="status">
        <span class="badge"
          >${payload.first_month
            ? m.health.wholeHistory({ month: monthLabel(payload.first_month, undefined, locale) })
            : m.health.wholeHistoryEmpty}</span
        >
        <span class="badge">${m.seasonality.monthsIn({ timezone: payload.timezone })}</span>
        ${!payload.covers_now && payload.covered_end
          ? html`<span class="warn"
              >${m.sizing.statisticsCoverUpTo({
                time: new Date(payload.covered_end).toLocaleString(locale),
              })}</span
            >`
          : nothing}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      ${HEALTH_CARDS.map(({ key, signals }) => this.renderCard(payload, key, signals))}

      <section>
        <h2>${m.health.howRead}</h2>
        ${HEALTH_CARDS.map(({ key }) => html`<p class="note">${definitions[key]}</p>`)}
        <p class="note">${m.health.caveats.bms}</p>
        <p class="note">${m.health.caveats.weather}</p>
      </section>
    `;
  }

  static styles = [
    sectionStyles,
    css`
      :host {
        display: block;
      }
      .status {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }
      .badge {
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        padding: 2px 10px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .figure {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 12px;
      }
      .figure .label,
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .figure .value {
        font-size: 20px;
        font-weight: 500;
      }
      .figure .row {
        justify-content: flex-start;
        gap: 16px;
      }
      .figure .note {
        margin: 0;
      }
      td .hint {
        display: block;
        font-weight: 400;
      }
      .table-wrap {
        overflow-x: auto;
      }
      .notice {
        padding: 24px;
        color: var(--secondary-text-color);
      }
      button {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 4px 10px;
        cursor: pointer;
        font: inherit;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-health-tab": IaHealthTab;
  }
}
