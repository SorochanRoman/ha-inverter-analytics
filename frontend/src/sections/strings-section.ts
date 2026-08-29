import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { partsOption } from "../charts/options";
import "../charts/echart";
import { formatCoverage, formatPercent, formatPower } from "../format";
import { SERIES } from "../theme";
import type { SeriesInfo, Strings } from "../types";
import { sectionStyles } from "./shared-styles";

@customElement("ia-strings-section")
export class IaStringsSection extends LitElement {
  @property({ attribute: false }) public strings!: Strings;
  @property({ attribute: false }) public series: Record<string, SeriesInfo> = {};
  @property({ type: String }) public locale = "en";

  protected render() {
    const { parts, aligned_coverage } = this.strings;
    return html`
      <section>
        <h2>PV strings</h2>
        <div class="cards">
          ${parts.map((part) => {
            const coverage = this.series[part.key]?.coverage;
            return html`<div class="card">
              <span class="name">${part.label}</span>
              <span class="value">${formatPower(part.mean, this.locale)}</span>
              <span class="row"><span>Peak</span><span>${formatPower(part.peak, this.locale)}</span></span>
              <span class="row"><span>Share of PV</span><span>${formatPercent(part.share, this.locale)}</span></span>
              ${coverage !== undefined && coverage < 0.95
                ? html`<span class="warn">Covers ${formatCoverage(coverage, this.locale)} of the period</span>`
                : nothing}
            </div>`;
          })}
        </div>
        <ia-chart .option=${partsOption(parts, SERIES.pv)}></ia-chart>
        ${aligned_coverage < 0.95
          ? html`<p class="warn">
              All strings had data at the same moment for only
              ${formatCoverage(aligned_coverage, this.locale)} of the period, so the shares are of
              that time rather than the whole window.
            </p>`
          : nothing}
        <p class="note">
          A string consistently below its neighbour points at shading, a different orientation or
          a fault. Compare mean rather than peak: peaks coincide, averages do not.
        </p>
      </section>
    `;
  }

  static styles = [sectionStyles, css`:host { display: block; }`];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-strings-section": IaStringsSection;
  }
}
