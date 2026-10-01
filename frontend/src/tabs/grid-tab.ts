import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchGrid } from "../api";
import { outageDaysOption, outageHoursOption } from "../charts/options";
import "../charts/echart";
import {
  coverageWarning,
  describeError,
  formatCoverage,
  formatDuration,
  formatPercent,
  formatPower,
  precisionLabel,
} from "../format";
import { I18nController } from "../i18n/controller";
import { resolveRange, type RangeKey } from "../range";
import { sectionStyles } from "../sections/shared-styles";
import type {
  Autonomy,
  AutonomyReason,
  GridPayload,
  HomeAssistant,
  OutageEpisode,
} from "../types";

const DASH = "—";

function formatHours(hours: number | null, locale: string): string {
  if (hours === null) return DASH;
  return formatDuration(hours * 3600, locale);
}

const DAY_MS = 24 * 3600 * 1000;

/**
 * Local calendar days a half-open span touches.
 *
 * The payload's days are keyed in Home Assistant's zone and this counts them in
 * the browser's, which is close enough for "how many days are missing" and off
 * by at most one when the two zones disagree about the span's edges. The end is
 * exclusive — a window ending at midnight does not touch the day it stops at.
 */
function localDaysSpanned(from: string, to: string): number {
  const start = new Date(from);
  const last = new Date(new Date(to).getTime() - 1);
  const midnight = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.round((midnight(last) - midnight(start)) / DAY_MS) + 1;
}

@customElement("ia-grid-tab")
export class IaGridTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: GridPayload;
  @state() private error?: string;
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
      const payload = await fetchGrid(this.hass, this.entryId, start, end);
      if (requestId !== this.requestId) return;
      this.payload = payload;
    } catch (err) {
      if (requestId !== this.requestId) return;
      this.error = describeError(err, this.i18n.m);
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: GridPayload) {
    const locale = this.i18n.locale;
    const kpi = payload.kpi;
    const measured = payload.measured_seconds > 0;
    const cells: [string, string, string][] = [
      ["Outages", measured ? `${kpi.count}` : DASH, ""],
      [
        "Without grid",
        measured ? formatDuration(kpi.off_seconds, locale) : DASH,
        // Only measured absence is in the figure, while "Longest" and "Mean"
        // include the gaps bridged inside an outage; unsaid, the two contradict
        // each other on a single outage that a restart cut in half.
        kpi.bridged_seconds > 0
          ? `+ ${formatDuration(kpi.bridged_seconds, locale)} unrecorded, assumed off`
          : "",
      ],
      // Not formatPercent: a real 0.007% share beside "Outages: 3" rounds to a
      // flat "0%", which reads as no outages at all.
      ["Share of time", formatCoverage(kpi.off_share, locale), "of measured time"],
      [
        "Longest",
        kpi.longest_seconds === null ? DASH : formatDuration(kpi.longest_seconds, locale),
        kpi.longest_start ? `from ${new Date(kpi.longest_start).toLocaleString(locale)}` : "",
      ],
      ["Mean duration", kpi.mean_seconds === null ? DASH : formatDuration(kpi.mean_seconds, locale), ""],
    ];
    if (kpi.brief_interruptions !== null) {
      cells.push(["Brief interruptions", `${kpi.brief_interruptions}`, "under a minute"]);
    }
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

  private renderDuration(episode: OutageEpisode): string {
    const cut = episode.started_before_window || episode.ongoing;
    return `${cut ? "at least " : ""}${formatDuration(episode.seconds, this.i18n.locale)}`;
  }

  private renderEpisodes(payload: GridPayload) {
    if (!payload.episodes.length) {
      return html`<p class="empty">
        No outages in this period — none in ${formatDuration(payload.measured_seconds, this.i18n.locale)} of
        measurement.
      </p>`;
    }
    const locale = this.i18n.locale;
    const soc = (value: number | null | undefined) =>
      value === null || value === undefined ? DASH : formatPercent(value / 100, locale);
    return html`<table>
      <thead>
        <tr>
          <th>Start</th>
          <th>Duration</th>
          ${payload.has_soc
            ? html`<th>Charge at start</th><th>Lowest</th><th>At end</th>`
            : nothing}
          ${payload.has_load ? html`<th>Mean load</th>` : nothing}
        </tr>
      </thead>
      <tbody>
        ${payload.episodes.map(
          (item) => html`<tr>
            <td>${new Date(item.start).toLocaleString(locale)}</td>
            <td>
              ${this.renderDuration(item)}
              ${item.bridged_seconds > 0
                ? html`<span class="hint">(${formatDuration(item.bridged_seconds, locale)} unrecorded)</span>`
                : nothing}
            </td>
            ${payload.has_soc
              ? html`<td>${soc(item.soc_start)}</td>
                  <td class=${item.below_low ? "low" : ""}>${soc(item.soc_min)}</td>
                  <td>${soc(item.soc_end)}</td>`
              : nothing}
            ${payload.has_load ? html`<td>${formatPower(item.load_mean_w ?? null, locale)}</td>` : nothing}
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  private renderAutonomy(autonomy: Autonomy, lowPct: number) {
    const locale = this.i18n.locale;
    if (autonomy.reason !== null) {
      // Keyed by the union rather than by string, so a reason the backend
      // learns to send is a compile error here and not "undefined" on screen.
      const reasons: Record<AutonomyReason, string> = {
        no_soc: "It needs the battery's state of charge, which is not mapped to this inverter.",
        no_outages: "There were no outages in this period to read a discharge rate from.",
        no_soc_in_outages:
          "The battery's charge was not recorded during any of this period's outages, so there is no discharge to read a rate from.",
        too_little_evidence: `The outages with a charge reading at both ends add up to ${formatHours(autonomy.evidence_hours, locale)}, and an estimate needs at least an hour.`,
        no_net_discharge:
          "The charge did not fall during this period's outages — the sun covered them — so there is no discharge rate to read.",
      };
      return html`<p class="note">No autonomy estimate. ${reasons[autonomy.reason]}</p>`;
    }
    return html`
      <div class="cards">
        <div class="card">
          <span class="name">From full to ${formatPercent(lowPct / 100, locale)}</span>
          <span class="value">${formatHours(autonomy.hours_from_full, locale)}</span>
        </div>
        <div class="card">
          <span class="name">From where it is now</span>
          <span class="value">${formatHours(autonomy.hours_from_now, locale)}</span>
          <span class="row">
            <span>Charge now</span>
            <span>${autonomy.soc_now === null ? DASH : formatPercent(autonomy.soc_now / 100, locale)}</span>
          </span>
        </div>
        <div class="card">
          <span class="name">Discharge rate</span>
          <span class="value">${autonomy.rate_pct_per_hour === null ? DASH : `${autonomy.rate_pct_per_hour.toFixed(1)} pts/h`}</span>
          <span class="row">
            <span>Mean load</span><span>${formatPower(autonomy.load_mean_w, locale)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        At the rate seen during this period's outages — ${formatHours(autonomy.evidence_hours, locale)} of
        them. Whether a summer afternoon's outage says anything about a winter evening's is for
        the reader to judge; the mean load beside it is there to help.
      </p>
    `;
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
    const locale = this.i18n.locale;
    const warning = coverageWarning(payload.coverage, locale);
    const daysWithoutData = payload.days.length === 0;
    // Days the sensor had no data for are absent from the chart rather than
    // drawn at zero, so the count of them has to be said in words.
    const missingDays =
      localDaysSpanned(payload.counted_from ?? payload.window.start, payload.window.end) -
      payload.days.length;

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${payload.counted_from
          ? html`<span class="warn">
              Outages counted from ${new Date(payload.counted_from).toLocaleDateString(locale)} —
              ${payload.source === "inferred"
                ? "earlier history is only hourly averages, which cannot say when inside an hour the grid was gone"
                : "the recorder keeps no earlier history of this sensor"}
            </span>`
          : nothing}
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      ${payload.source === "inferred"
        ? html`<p class="banner">
            Inferred from power flows, not measured. A night the battery carries the house with
            nothing crossing the grid connection looks exactly like an outage, and a daytime outage
            the sun covers is not seen at all. Map a sensor that reports grid presence to measure
            instead.
          </p>`
        : nothing}

      ${this.renderKpi(payload)}

      <section>
        <h2>Hours without grid, by day</h2>
        ${daysWithoutData
          ? html`<p class="empty">No days with data in this period.</p>`
          : html`<ia-chart .option=${outageDaysOption(payload.days, this.i18n.m)} height="220px"></ia-chart>
              ${missingDays > 0
                ? html`<p class="note">
                    ${missingDays} ${missingDays === 1 ? "day" : "days"} in this period had no data
                    and ${missingDays === 1 ? "is" : "are"} not drawn.
                  </p>`
                : nothing}`}
      </section>

      <section>
        <h2>Share of time without grid, by hour of day</h2>
        <ia-chart .option=${outageHoursOption(payload.hours, this.i18n.m)} height="220px"></ia-chart>
        <p class="note">Hours the sensor never recorded are left empty rather than drawn at zero.</p>
      </section>

      <section>
        <h2>Outages</h2>
        ${this.renderEpisodes(payload)}
      </section>

      <section>
        <h2>Autonomy</h2>
        ${this.renderAutonomy(payload.autonomy, payload.low_pct)}
      </section>
    `;
  }

  static styles = [
    sectionStyles,
    css`
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
      .banner {
        border: 1px solid var(--warning-color);
        border-radius: 12px;
        padding: 12px 16px;
        margin: 0 0 16px;
        font-size: 13px;
      }
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
      /* Scoped to the KPI cells: the autonomy cards keep the shared
         .card .value size, so an unscoped rule here would be a rule that
         only ever loses. */
      .cell .value { font-size: 22px; font-weight: 500; }
      .hint { font-size: 12px; color: var(--secondary-text-color); }
      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--divider-color); }
      td.low { color: var(--error-color, #d64545); font-weight: 500; }
      .empty { color: var(--secondary-text-color); margin: 0; }
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-grid-tab": IaGridTab;
  }
}
