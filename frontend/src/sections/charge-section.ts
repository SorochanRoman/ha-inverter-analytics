import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { formatEnergy, formatPercent, formatPower } from "../format";
import type { ChargeFlow } from "../types";
import { sectionStyles } from "./shared-styles";

@customElement("ia-charge-section")
export class IaChargeSection extends LitElement {
  @property({ attribute: false }) public flow!: ChargeFlow;
  @property({ type: Boolean }) public hasCapacity = false;
  @property({ type: String }) public locale = "en";

  protected render() {
    const flow = this.flow;
    return html`
      <section>
        <h2>Charging and discharging</h2>

        ${flow.sign_looks_inverted
          ? html`<p class="warn">
              The charge rises while this battery reports discharging. The power sensor's
              direction is probably reversed — tick "Invert battery power" in the integration's
              options. Until then charging and discharging are swapped everywhere on this page.
            </p>`
          : nothing}

        <div class="cards">
          <div class="card">
            <span class="name">Mean charge power</span>
            <span class="value">${formatPower(flow.mean_charge_w, this.locale)}</span>
            <span class="row">
              <span>Of the time</span><span>${formatPercent(flow.share_charging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Mean discharge power</span>
            <span class="value">${formatPower(flow.mean_discharge_w, this.locale)}</span>
            <span class="row">
              <span>Of the time</span>
              <span>${formatPercent(flow.share_discharging, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Resting</span>
            <span class="value">${formatPercent(flow.share_idle, this.locale)}</span>
            <span class="row">
              <span>Below</span><span>${formatPower(flow.idle_w, this.locale)}</span>
            </span>
          </div>
          <div class="card">
            <span class="name">Discharged</span>
            <span class="value">${formatEnergy(flow.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>Charged</span><span>${formatEnergy(flow.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
          ${flow.round_trip_efficiency !== null
            ? html`<div class="card">
                <span class="name">Round-trip efficiency</span>
                <span class="value">
                  ${formatPercent(flow.round_trip_efficiency, this.locale)}
                </span>
                <span class="row"><span>Out of what went in</span></span>
              </div>`
            : nothing}
          <div class="card">
            <span class="name">Full cycles per day</span>
            <span class="value">
              ${flow.cycles_per_day === null
                ? "—"
                : new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 }).format(
                    flow.cycles_per_day,
                  )}
            </span>
            ${flow.cycles_per_day === null
              ? html`<span class="row"><span>Needs the battery capacity</span></span>`
              : nothing}
          </div>
        </div>

        ${flow.cycles_per_day === null && !this.hasCapacity
          ? html`<p class="note">
              Set the battery capacity in the integration's options and this becomes the energy
              discharged each day divided by one full charge. It is not guessed from the state of
              charge, which would count a shallow cycle the same as a deep one.
            </p>`
          : nothing}

        ${flow.energy_metered
          ? nothing
          : html`<p class="note">
              Energy is integrated from the power readings rather than read off a meter, so a
              period with gaps understates it — compare it against the coverage above. Map the
              battery's charge and discharge counters in the options to read the inverter's own
              accounting instead, and to get round-trip efficiency.
            </p>`}
        ${flow.energy_metered && flow.round_trip_efficiency === null
          ? html`<p class="note">
              No round-trip efficiency for this period.
              ${flow.soc_drift_pct !== null &&
              Math.abs(flow.soc_drift_pct) > flow.efficiency_max_drift_pct
                ? html`The charge ended
                    ${Math.abs(Math.round(flow.soc_drift_pct))} points
                    ${flow.soc_drift_pct < 0 ? "below" : "above"} where it started, so the gap
                    between charged and discharged is mostly energy still in the battery rather
                    than energy lost on the way through. A longer period, or one that begins and
                    ends at a similar charge, will give a figure.`
                : html`There was too little charging and discharging to divide one by the other.`}
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
