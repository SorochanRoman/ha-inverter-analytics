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
            <span class="name">Energy in / out</span>
            <span class="value">${formatEnergy(flow.energy_out_kwh, this.locale)}</span>
            <span class="row">
              <span>Charged</span><span>${formatEnergy(flow.energy_in_kwh, this.locale)}</span>
            </span>
          </div>
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

        <p class="note">
          Energy is integrated from the power readings rather than read off a meter, so a period
          with gaps understates it — compare it against the coverage above.
        </p>
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
