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
  formatOneDecimal,
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
  ReserveReason,
  ReserveSummary,
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
      this.error = err;
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  private renderKpi(payload: GridPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const kpi = payload.kpi;
    const measured = payload.measured_seconds > 0;
    const cells: [string, string, string][] = [
      [m.grid.outages, measured ? `${kpi.count}` : DASH, ""],
      [
        m.grid.withoutGrid,
        measured ? formatDuration(kpi.off_seconds, locale) : DASH,
        // Only measured absence is in the figure, while "Longest" and "Mean"
        // include the gaps bridged inside an outage; unsaid, the two contradict
        // each other on a single outage that a restart cut in half.
        kpi.bridged_seconds > 0
          ? m.grid.unrecordedAssumedOff({
              duration: formatDuration(kpi.bridged_seconds, locale),
            })
          : "",
      ],
      // Not formatPercent: a real 0.007% share beside "Outages: 3" rounds to a
      // flat "0%", which reads as no outages at all.
      [m.grid.shareOfTime, formatCoverage(kpi.off_share, locale), m.grid.ofMeasuredTime],
      [
        m.grid.longest,
        kpi.longest_seconds === null ? DASH : formatDuration(kpi.longest_seconds, locale),
        kpi.longest_start
          ? m.grid.fromTime({ time: new Date(kpi.longest_start).toLocaleString(locale) })
          : "",
      ],
      [
        m.grid.meanDuration,
        kpi.mean_seconds === null ? DASH : formatDuration(kpi.mean_seconds, locale),
        "",
      ],
    ];
    if (kpi.brief_interruptions !== null) {
      cells.push([m.grid.briefInterruptions, `${kpi.brief_interruptions}`, m.grid.underAMinute]);
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
    const duration = formatDuration(episode.seconds, this.i18n.locale);
    return cut ? this.i18n.m.grid.atLeast({ duration }) : duration;
  }

  private renderEpisodes(payload: GridPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    if (!payload.episodes.length) {
      return html`<p class="empty">
        ${m.grid.noOutages({ duration: formatDuration(payload.measured_seconds, locale) })}
      </p>`;
    }
    const soc = (value: number | null | undefined) =>
      value === null || value === undefined ? DASH : formatPercent(value / 100, locale);
    return html`<table>
      <thead>
        <tr>
          <th>${m.common.start}</th>
          <th>${m.common.duration}</th>
          ${payload.has_soc
            ? html`<th>${m.grid.chargeAtStart}</th>
                <th>${m.grid.lowest}</th>
                <th>${m.grid.atEnd}</th>
                <th>${m.grid.hoursLeft}</th>
                <th>${m.grid.neededAtStart}</th>`
            : nothing}
          ${payload.has_load ? html`<th>${m.common.meanLoad}</th>` : nothing}
        </tr>
      </thead>
      <tbody>
        ${payload.episodes.map(
          (item) => html`<tr>
            <td>${new Date(item.start).toLocaleString(locale)}</td>
            <td>
              ${this.renderDuration(item)}
              ${item.bridged_seconds > 0
                ? html`<span class="hint"
                    >${m.grid.unrecorded({
                      duration: formatDuration(item.bridged_seconds, locale),
                    })}</span
                  >`
                : nothing}
            </td>
            ${payload.has_soc
              ? html`<td>${soc(item.soc_start)}</td>
                  <td class=${item.below_low ? "low" : ""}>${soc(item.soc_min)}</td>
                  <td>${soc(item.soc_end)}</td>
                  <td>${this.renderHoursLeft(item)}</td>
                  <td>${this.renderNeeded(item)}</td>`
              : nothing}
            ${payload.has_load
              ? html`<td>${formatPower(item.load_mean_w ?? null, locale)}</td>`
              : nothing}
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  private reserveReason(item: OutageEpisode) {
    const reasons: Record<ReserveReason, string> = this.i18n.m.grid.reserveReasons;
    return html`<span class="hint">${reasons[item.reserve_reason ?? "no_soc"]}</span>`;
  }

  private renderHoursLeft(item: OutageEpisode) {
    if (item.hours_left === null || item.hours_left === undefined) return this.reserveReason(item);
    if (item.hours_left === 0) return html`<span class="low">${this.i18n.m.grid.didNotLast}</span>`;
    return formatHours(item.hours_left, this.i18n.locale);
  }

  private renderNeeded(item: OutageEpisode) {
    if (item.needed_pct === null || item.needed_pct === undefined) return this.reserveReason(item);
    const value = formatPercent(Math.min(item.needed_pct, 100) / 100, this.i18n.locale);
    // The space between the spans is the only thing keeping the two apart.
    return item.needed_pct > 100
      ? html`<span class="low">&gt; ${value}</span>
          <span class="hint">${this.i18n.m.grid.moreThanFull}</span>`
      : value;
  }

  private renderReserve(reserve: ReserveSummary, lowPct: number) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const worst = reserve.worst_needed_pct;
    return html`
      <div class="cards">
        <div class="card">
          <span class="name">${m.grid.hardestOutageNeeds}</span>
          <span class="value"
            >${worst === null ? DASH : formatPercent(Math.min(worst, 100) / 100, locale)}</span
          >
          <span class="row"
            ><span
              >${reserve.worst_start === null
                ? m.grid.noHardestOutage
                : worst !== null && worst > 100
                  ? m.grid.moreThanFull
                  : m.grid.hardestOutageOn({
                      date: new Date(reserve.worst_start).toLocaleDateString(locale),
                    })}</span
            ></span
          >
        </div>
        <div class="card">
          <span class="name">${m.grid.outagesCovered}</span>
          <span class="value"
            >${reserve.judged === 0
              ? DASH
              : m.grid.coveredOf({ covered: reserve.covered, judged: reserve.judged })}</span
          >
          <span class="row"
            ><span>${m.grid.coveredHint({ level: formatPercent(lowPct / 100, locale) })}</span></span
          >
        </div>
      </div>
      <p class="note">${m.grid.reserveNote}</p>
    `;
  }

  private renderAutonomy(autonomy: Autonomy, lowPct: number) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    if (autonomy.reason !== null) {
      // Keyed by the union rather than by string, so a reason the backend
      // learns to send is a compile error here and not "undefined" on screen.
      const reasons: Record<AutonomyReason, string> = {
        ...m.grid.autonomyReasons,
        too_little_evidence: m.grid.tooLittleEvidence({
          hours: formatHours(autonomy.evidence_hours, locale),
        }),
      };
      return html`<p class="note">${m.grid.noAutonomy} ${reasons[autonomy.reason]}</p>`;
    }
    const rate = autonomy.rate_pct_per_hour;
    return html`
      <div class="cards">
        <div class="card">
          <span class="name"
            >${m.grid.fromFullTo({ level: formatPercent(lowPct / 100, locale) })}</span
          >
          <span class="value">${formatHours(autonomy.hours_from_full, locale)}</span>
        </div>
        <div class="card">
          <span class="name">${m.grid.fromNow}</span>
          <span class="value">${formatHours(autonomy.hours_from_now, locale)}</span>
          <span class="row">
            <span>${m.grid.chargeNow}</span>
            <span
              >${autonomy.soc_now === null
                ? DASH
                : formatPercent(autonomy.soc_now / 100, locale)}</span
            >
          </span>
        </div>
        <div class="card">
          <span class="name">${m.grid.dischargeRate}</span>
          <span class="value"
            >${rate === null
              ? DASH
              : m.grid.pointsPerHour({ rate: formatOneDecimal(rate, m.charts.locale) })}</span
          >
          <span class="row">
            <span>${m.common.meanLoad}</span>
            <span>${formatPower(autonomy.load_mean_w, locale)}</span>
          </span>
        </div>
      </div>
      <p class="note">
        ${m.grid.evidenceNote({ hours: formatHours(autonomy.evidence_hours, locale) })}
      </p>
    `;
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
    const daysWithoutData = payload.days.length === 0;
    // Days the sensor had no data for are absent from the chart rather than
    // drawn at zero, so the count of them has to be said in words.
    const missingDays =
      localDaysSpanned(payload.counted_from ?? payload.window.start, payload.window.end) -
      payload.days.length;
    const countedFrom = payload.counted_from
      ? new Date(payload.counted_from).toLocaleDateString(locale)
      : null;

    return html`
      <div class="status">
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${countedFrom
          ? html`<span class="warn">
              ${payload.source === "inferred"
                ? m.grid.countedFromInferred({ date: countedFrom })
                : m.grid.countedFromNoHistory({ date: countedFrom })}
            </span>`
          : nothing}
        ${warning ? html`<span class="warn">${warning}</span>` : nothing}
        ${payload.clamped
          ? html`<span class="warn">${m.common.periodShortened}</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      ${payload.source === "inferred"
        ? html`<p class="banner">${m.grid.inferredBanner}</p>`
        : nothing}

      ${this.renderKpi(payload)}

      <section>
        <h2>${m.grid.hoursByDay}</h2>
        ${daysWithoutData
          ? html`<p class="empty">${m.grid.noDaysWithData}</p>`
          : html`<ia-chart
                .option=${outageDaysOption(payload.days, m)}
                height="220px"
              ></ia-chart>
              ${missingDays > 0
                ? html`<p class="note">${m.grid.missingDays({ n: missingDays })}</p>`
                : nothing}`}
      </section>

      <section>
        <h2>${m.grid.shareByHour}</h2>
        <ia-chart .option=${outageHoursOption(payload.hours, m)} height="220px"></ia-chart>
        <p class="note">${m.grid.hoursNeverRecorded}</p>
      </section>

      <section>
        <h2>${m.grid.outages}</h2>
        ${this.renderEpisodes(payload)}
      </section>

      <section>
        <h2>${m.grid.autonomy}</h2>
        ${this.renderAutonomy(payload.autonomy, payload.low_pct)}
        ${payload.has_soc ? this.renderReserve(payload.reserve, payload.low_pct) : nothing}
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
      .low { color: var(--error-color, #d64545); font-weight: 500; }
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
