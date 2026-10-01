import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { formatEnergy, formatPercent, formatPower } from "../format";
import { I18nController } from "../i18n/controller";
import type { ChargeFlow } from "../types";
import { sectionStyles } from "./shared-styles";

@customElement("ia-charge-section")
export class IaChargeSection extends LitElement {
  @property({ attribute: false }) public flow!: ChargeFlow;
  @property({ type: Boolean }) public hasCapacity = false;
  @property({ type: String }) public locale = "en";

  private i18n = new I18nController(this);

  protected render() {
    const m = this.i18n.m;
    const t = m.sections.charge;
    const flow = this.flow;
    return html`
      <section>
        <h2>${t.title}</h2>

        ${flow.sign_looks_inverted ? html`<p class="warn">${t.signInverted}</p>` : nothing}

        <div class="cards">
          <div class="card">
            <span class="name">${t.meanChargePower}</span>
            <span class="value">${formatPower(flow.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span
              ><span>${formatPercent(flow.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.meanDischargePower}</span>
            <span class="value">${formatPower(flow.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>${t.ofTheTime}</span>
              <span>${formatPercent(flow.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.resting}</span>
            <span class="value">${formatPercent(flow.share_idle, this.locale)}</span>
            <span class="row">
              <span>${t.below}</span><span>${formatPower(flow.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">${t.discharged}</span>
            <span class="value">${formatEnergy(flow.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>${t.charged}</span><span>${formatEnergy(flow.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          ${flow.round_trip_efficiency !== null
            ? html`<div class="card">
                <span class="name">${t.roundTripEfficiency}</span>
                <span class="value">
                  ${formatPercent(flow.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>${t.outOfWhatWentIn}</span></span>
              </div>`
            : nothing}
          <div class="card">
            <span class="name">${t.fullCyclesPerDay}</span>
            <span class="value">
              ${flow.cycles_per_day === null
                ? "—"
                : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
                    flow.cycles_per_day,
                  )}
            </span>
            ${flow.cycles_per_day === null
              ? html`<span class="row"><span>${t.needsCapacity}</span></span>`
              : nothing}
          </div>
        </div>

        ${flow.cycles_per_day === null && !this.hasCapacity
          ? html`<p class="note">${t.setCapacity}</p>`
          : nothing}

        ${flow.energy_metered
          ? nothing
          : html`<p class="note">${t.integrated}</p>`}
        ${flow.energy_metered && flow.round_trip_efficiency === null
          ? html`<p class="note">
              ${t.noEfficiency}
              ${flow.soc_drift_pct !== null &&
              Math.abs(flow.soc_drift_pct) > flow.efficiency_max_drift_pct
                ? (flow.soc_drift_pct < 0 ? t.driftBelow : t.driftAbove)({
                    n: Math.abs(Math.round(flow.soc_drift_pct)),
                  })
                : t.tooLittle}
            </p>`
          : nothing}
      </section>
    `;
  }

  static styles = [sectionStyles, css`:host { display: block; }`];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-charge-section": IaChargeSection;
  }
}
