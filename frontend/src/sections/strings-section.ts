import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { partsOption } from "../charts/options";
import "../charts/echart";
import { formatCoverage, formatPercent, formatPower } from "../format";
import { I18nController } from "../i18n/controller";
import { partLabel } from "../roles";
import { SERIES } from "../theme";
import type { SeriesInfo, Strings } from "../types";
import { sectionStyles } from "./shared-styles";

@customElement("ia-strings-section")
export class IaStringsSection extends LitElement {
  @property({ attribute: false }) public strings!: Strings;
  @property({ attribute: false }) public series: Record<string, SeriesInfo> = {};
  @property({ type: String }) public locale = "en";

  private i18n = new I18nController(this);

  protected render() {
    const m = this.i18n.m;
    const t = m.sections.strings;
    const { parts, aligned_coverage } = this.strings;
    return html`
      <section>
        <h2>${t.title}</h2>
        <div class="cards">
          ${parts.map((part) => {
            const coverage = this.series[part.key]?.coverage;
            return html`<div class="card">
              <span class="name">${partLabel(m, part)}</span>
              <span class="value">${formatPower(part.mean, this.locale)}</span>
              <span class="row"
                ><span>${m.common.peak}</span
                ><span>${formatPower(part.peak, this.locale)}</span></span
              >
              <span class="row"
                ><span>${t.shareOfPv}</span
                ><span>${formatPercent(part.share, this.locale)}</span></span
              >
              ${coverage !== undefined && coverage < 0.95
                ? html`<span class="warn">
                    ${m.common.coversOfPeriod({ share: formatCoverage(coverage, this.locale) })}
                  </span>`
                : nothing}
            </div>`;
          })}
        </div>
        <ia-chart .option=${partsOption(parts, SERIES.pv, m)}></ia-chart>
        ${aligned_coverage < 0.95
          ? html`<p class="warn">
              ${t.alignedLow({ share: formatCoverage(aligned_coverage, this.locale) })}
            </p>`
          : nothing}
        <p class="note">${t.compare}</p>
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
