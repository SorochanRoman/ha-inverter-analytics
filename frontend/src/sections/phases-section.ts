import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { imbalanceOption } from "../charts/options";
import "../charts/echart";
import { formatCoverage, formatDuration, formatPercent, formatPower } from "../format";
import { I18nController } from "../i18n/controller";
import { partLabel } from "../roles";
import type { Phases, SeriesInfo } from "../types";
import { sectionStyles } from "./shared-styles";

@customElement("ia-phases-section")
export class IaPhasesSection extends LitElement {
  @property({ attribute: false }) public phases!: Phases;
  @property({ attribute: false }) public series: Record<string, SeriesInfo> = {};
  @property({ type: String }) public locale = "en";

  private i18n = new I18nController(this);

  private renderCards() {
    const m = this.i18n.m;
    const t = m.sections.phases;
    const { rating_per_phase } = this.phases;
    return html`<div class="cards">
      ${this.phases.per_phase.map((phase) => {
        const coverage = this.series[phase.key]?.coverage;
        return html`<div class="card">
          <span class="name">${partLabel(m, phase)}</span>
          <span class="value">${formatPower(phase.mean, this.locale)}</span>
          <span class="row"
            ><span>${m.common.peak}</span
            ><span>${formatPower(phase.peak, this.locale)}</span></span
          >
          <span class="row"
            ><span>P95</span><span>${formatPower(phase.p95, this.locale)}</span></span
          >
          <span class="row"
            ><span>${t.shareOfLoad}</span
            ><span>${formatPercent(phase.share, this.locale)}</span></span
          >
          <span class="row">
            <span>${t.peakVs({ rating: formatPower(rating_per_phase, this.locale) })}</span>
            <span>${formatPercent(phase.headroom, this.locale)}</span>
          </span>
          ${coverage !== undefined && coverage < 0.95
            ? html`<span class="warn">
                ${m.common.coversOfPeriod({ share: formatCoverage(coverage, this.locale) })}
              </span>`
            : nothing}
        </div>`;
      })}
    </div>`;
  }

  private renderImbalance() {
    const m = this.i18n.m;
    const t = m.sections.phases;
    const { imbalance } = this.phases;
    if (imbalance.mean === null) {
      return html`<p class="empty">
        ${t.neverAboveFloor({ floor: formatPower(imbalance.floor_w, this.locale) })}
      </p>`;
    }
    return html`
      <div class="cards">
        <div class="card">
          <span class="name">${t.meanImbalance}</span>
          <span class="value">${formatPercent(imbalance.mean, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">${t.p95Imbalance}</span>
          <span class="value">${formatPercent(imbalance.p95, this.locale)}</span>
        </div>
        <div class="card">
          <span class="name">
            ${t.above({ threshold: formatPercent(imbalance.threshold, this.locale) })}
          </span>
          <span class="value">${formatPercent(imbalance.fraction_above, this.locale)}</span>
          <span class="row"><span>${t.ofMeasuredTime}</span></span>
        </div>
      </div>
      <ia-chart .option=${imbalanceOption(imbalance, m)}></ia-chart>
      <p class="note">
        ${t.measuredOver({
          duration: formatDuration(imbalance.analysed_seconds, this.locale),
          share: formatCoverage(imbalance.coverage, this.locale),
        })}${imbalance.below_floor_seconds > 0
          ? html` ${t.belowFloorExcluded({
              duration: formatDuration(imbalance.below_floor_seconds, this.locale),
              floor: formatPower(imbalance.floor_w, this.locale),
            })}`
          : nothing}
      </p>
    `;
  }

  private renderEpisodes() {
    const m = this.i18n.m;
    const { episodes, per_phase } = this.phases;
    if (!episodes.length) {
      return html`<p class="empty">${m.sections.phases.noSustained}</p>`;
    }
    return html`<table>
      <thead>
        <tr>
          <th>${m.common.start}</th>
          <th>${m.common.duration}</th>
          <th>${m.sections.phases.worst}</th>
          ${per_phase.map((phase) => html`<th>${partLabel(m, phase)}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${episodes.map(
          (episode) => html`<tr>
            <td>${new Date(episode.start).toLocaleString(this.locale)}</td>
            <td>${formatDuration(episode.seconds, this.locale)}</td>
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
    const t = this.i18n.m.sections.phases;
    return html`
      <section>
        <h2>${t.title}</h2>
        ${this.renderCards()}
        ${rating_per_phase_derived
          ? html`<p class="note">
              ${t.derivedRating({
                n: rating_per_phase_divisor,
                rating: formatPower(rating_per_phase, this.locale),
              })}
            </p>`
          : nothing}
        ${imbalance.aligned_coverage < 0.95
          ? html`<p class="warn">
              ${t.alignedLow({ share: formatCoverage(imbalance.aligned_coverage, this.locale) })}
            </p>`
          : nothing}

        <h3>${t.imbalance}</h3>
        ${this.renderImbalance()}

        <h3>${t.sustainedEpisodes}</h3>
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
