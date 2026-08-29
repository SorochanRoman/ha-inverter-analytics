import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { imbalanceOption } from "../charts/options";
import "../charts/echart";
import { formatCoverage, formatDuration, formatPercent, formatPower } from "../format";
import type { Phases, SeriesInfo } from "../types";
import { sectionStyles } from "./shared-styles";

@customElement("ia-phases-section")
export class IaPhasesSection extends LitElement {
  @property({ attribute: false }) public phases!: Phases;
  @property({ attribute: false }) public series: Record<string, SeriesInfo> = {};
  @property({ type: String }) public locale = "en";

  private renderCards() {
    const { rating_per_phase } = this.phases;
    return html`<div class="cards">
      ${this.phases.per_phase.map((phase) => {
        const coverage = this.series[phase.key]?.coverage;
        return html`<div class="card">
          <span class="name">${phase.label}</span>
          <span class="value">${formatPower(phase.mean, this.locale)}</span>
          <span class="row"><span>Peak</span><span>${formatPower(phase.peak, this.locale)}</span></span>
          <span class="row"><span>P95</span><span>${formatPower(phase.p95, this.locale)}</span></span>
          <span class="row"><span>Share of load</span><span>${formatPercent(phase.share, this.locale)}</span></span>
          <span class="row">
            <span>Peak vs ${formatPower(rating_per_phase, this.locale)}</span>
            <span>${formatPercent(phase.headroom, this.locale)}</span>
          </span>
          ${coverage !== undefined && coverage < 0.95
            ? html`<span class="warn">Covers ${formatCoverage(coverage, this.locale)} of the period</span>`
            : nothing}
        </div>`;
      })}
    </div>`;
  }

  private renderImbalance() {
    const { imbalance } = this.phases;
    if (imbalance.mean === null) {
      return html`<p class="empty">
        Total load never rose above ${formatPower(imbalance.floor_w, this.locale)}, so there was
        nothing to measure the spread against in this period.
      </p>`;
    }
    return html`
      <div class="cards">
        <div class="card">
          <span class="name">Mean imbalance</span>
          <span class="value">${formatPercent(imbalance.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">P95 imbalance</span>
          <span class="value">${formatPercent(imbalance.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">Above ${formatPercent(imbalance.threshold, this.locale)}</span>
          <span class="value">${formatPercent(imbalance.fraction_above, this.locale)}</span>
          <span class="row"><span>of the measured time</span></span>
        </div>
      </div>
      <ia-chart .option=${imbalanceOption(imbalance)}></ia-chart>
      <p class="note">
        Measured over ${formatDuration(imbalance.analysed_seconds)}
        (${formatCoverage(imbalance.coverage, this.locale)} of the period).${imbalance.below_floor_seconds >
        0
          ? html` A further ${formatDuration(imbalance.below_floor_seconds)} sat below
              ${formatPower(imbalance.floor_w, this.locale)} of total load and is excluded: at
              standby power a few watts of difference is a large percentage and means nothing.`
          : nothing}
      </p>
    `;
  }

  private renderEpisodes() {
    const { episodes, per_phase } = this.phases;
    if (!episodes.length) {
      return html`<p class="empty">No sustained imbalance in this period.</p>`;
    }
    return html`<table>
      <thead>
        <tr>
          <th>Start</th>
          <th>Duration</th>
          <th>Worst</th>
          ${per_phase.map((phase) => html`<th>${phase.label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${episodes.map(
          (episode) => html`<tr>
            <td>${new Date(episode.start).toLocaleString(this.locale)}</td>
            <td>${formatDuration(episode.seconds)}</td>
            <td>${formatPercent(episode.peak_imbalance, this.locale)}</td>
            ${episode.phases.map((value) => html`<td>${formatPower(value, this.locale)}</td>`)}
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  protected render() {
    const { imbalance, rating_per_phase, rating_per_phase_derived, rating_per_phase_divisor } =
      this.phases;
    return html`
      <section>
        <h2>Phases</h2>
        ${this.renderCards()}
        ${rating_per_phase_derived
          ? html`<p class="note">
              No per-phase rating is configured, so the total is split across
              ${rating_per_phase_divisor} phases — ${formatPower(rating_per_phase, this.locale)}
              each. Set the real figure in the integration's options if the hardware differs.
            </p>`
          : nothing}
        ${imbalance.aligned_coverage < 0.95
          ? html`<p class="warn">
              All phases had data at the same moment for only
              ${formatCoverage(imbalance.aligned_coverage, this.locale)} of the period. The spread
              cannot be measured while any one phase is unknown.
            </p>`
          : nothing}

        <h3>Imbalance</h3>
        ${this.renderImbalance()}

        <h3>Sustained imbalance episodes</h3>
        ${this.renderEpisodes()}
      </section>
    `;
  }

  static styles = [sectionStyles, css`:host { display: block; }`];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-phases-section": IaPhasesSection;
  }
}
