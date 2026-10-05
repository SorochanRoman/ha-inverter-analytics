import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchLoad } from "../api";
import { cappedListNote } from "../episodes";
import { bandsOption, durationCurveOption, histogramOption } from "../charts/options";
import "../charts/echart";
import "../sections/phases-section";
import "../sections/strings-section";
import {
  coverageWarning,
  describeError,
  formatDuration,
  formatPercent,
  formatPower,
  precisionLabel,
} from "../format";
import { I18nController } from "../i18n/controller";
import { resolveRange, type RangeKey } from "../range";
import type { Consistency, HomeAssistant, LoadPayload } from "../types";

@customElement("ia-load-tab")
export class IaLoadTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: LoadPayload;
  // The error itself, not its sentence: render() words it, so a language
  // switch re-words an error already on screen.
  @state() private error?: unknown;
  @state() private loading = false;
  @state() private mode: "watts" | "percent" = "watts";

  private i18n = new I18nController(this);

  private requestId = 0;

  private themeObserver?: MutationObserver;

  public connectedCallback(): void {
    super.connectedCallback();
    // Home Assistant applies a theme by rewriting CSS variables on <html>.
    // Chart options bake in the colours read at build time, so without a
    // rebuild the axis labels stay stuck with the previous theme: after
    // switching to a light theme they turn light grey on white and vanish.
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
    // Each request gets a number. While it's in flight, the user may have
    // already switched periods — in that case the response is stale and
    // must not be shown.
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
      this.error = err;
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  /**
   * A total and its parts that cannot both be right.
   *
   * Phrased as a question rather than a verdict: a legitimate installation can
   * have a total that covers more than the parts, so this is evidence the user
   * should look at, not a fault we have proved.
   */
  private renderConsistency(
    check: Consistency | undefined,
    sentence: (p: { total: string; partsTotal: string }) => string,
  ) {
    if (!check?.beyond_margin) return nothing;
    const locale = this.i18n.locale;
    return html`<span class="warn">
      ${sentence({
        total: formatPower(check.total_mean, locale),
        partsTotal: formatPower(check.parts_mean, locale),
      })}
    </span>`;
  }

  private renderKpi(payload: LoadPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const share = (value: number | null) =>
      value === null
        ? ""
        : m.load.shareOfRated({ share: formatPercent(value / payload.rated_power, locale) });

    const cells: [string, string, string][] = [
      [m.load.mean, formatPower(payload.kpi.mean, locale), share(payload.kpi.mean)],
      [m.load.median, formatPower(payload.kpi.median, locale), ""],
      ["P95", formatPower(payload.kpi.p95, locale), ""],
      [m.common.peak, formatPower(payload.kpi.max, locale), share(payload.kpi.max)],
      [m.load.sustained15m, formatPower(payload.kpi.max_sustained_15m, locale), ""],
      [
        m.load.above80OfRated,
        formatPercent(payload.kpi.fraction_above_80pct, locale),
        m.load.ofTime,
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

  private renderOverloads(payload: LoadPayload) {
    const m = this.i18n.m;
    if (!payload.overloads.length) {
      return html`<p class="empty">${m.load.noOverloads}</p>`;
    }
    const locale = this.i18n.locale;
    const capped = cappedListNote(payload.overloads.length, payload.overloads_total);
    return html`<table>
      <thead>
        <tr><th>${m.common.start}</th><th>${m.common.duration}</th><th>${m.common.peak}</th></tr>
      </thead>
      <tbody>
        ${payload.overloads.map(
          (item) => html`<tr>
            <td>${new Date(item.start).toLocaleString(locale)}</td>
            <td>${formatDuration(item.seconds, locale)}</td>
            <td>${formatPower(item.peak, locale)}</td>
          </tr>`,
        )}
      </tbody>
    </table>
    ${capped ? html`<p class="note">${m.common.longestShown(capped)}</p>` : nothing}`;
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
        <span class="badge">${precisionLabel(payload.precision, payload.boundary, locale)}</span>
        ${coverageWarning(payload.coverage, locale)
          ? html`<span class="warn">${coverageWarning(payload.coverage, locale)}</span>`
          : nothing}
        ${payload.clamped
          ? html`<span class="warn">${m.common.periodShortened}</span>`
          : nothing}
        ${payload.histogram.clipped_low_seconds + payload.histogram.clipped_high_seconds > 0
          ? html`<span class="warn">${m.load.histogramClipped}</span>`
          : nothing}
        ${this.renderConsistency(payload.consistency.load, m.load.loadConsistency)}
        ${this.renderConsistency(payload.consistency.pv, m.load.pvConsistency)}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      ${this.renderKpi(payload)}

      <section>
        <header>
          <h2>${m.load.timeAtPowerLevel}</h2>
          <button @click=${() => {
            this.mode = this.mode === "watts" ? "percent" : "watts";
          }}>${this.mode === "watts" ? m.load.asPercentOfRated : m.load.inWatts}</button>
        </header>
        <ia-chart .option=${histogramOption(payload, this.mode, m)}></ia-chart>
      </section>

      <section>
        <h2>${m.load.durationCurve}</h2>
        <ia-chart .option=${durationCurveOption(payload, m)}></ia-chart>
      </section>

      <section>
        <h2>${m.load.ratedBands}</h2>
        <ia-chart .option=${bandsOption(payload, m)} height="220px"></ia-chart>
      </section>

      <section>
        <h2>${m.load.overloadEpisodes}</h2>
        ${this.renderOverloads(payload)}
      </section>

      ${payload.phases
        ? html`<ia-phases-section
            .phases=${payload.phases}
            .series=${payload.series}
            .locale=${locale}
          ></ia-phases-section>`
        : nothing}

      ${payload.strings
        ? html`<ia-strings-section
            .strings=${payload.strings}
            .series=${payload.series}
            .locale=${locale}
          ></ia-strings-section>`
        : nothing}
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
    .note { font-size: 12px; color: var(--secondary-text-color); margin: 8px 0 0; }
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
