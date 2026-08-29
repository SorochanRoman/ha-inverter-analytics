import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant } from "../types";
import type { RangeKey } from "../range";

/** Заглушка: повна реалізація вкладки — Task 13. */
@customElement("ia-load-tab")
export class IaLoadTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  protected render() {
    return html`<div class="notice">
      Вкладка «Навантаження»: період ${this.range}, інвертор ${this.entryId ?? "—"}.
    </div>`;
  }

  static styles = css`
    .notice { padding: 24px; color: var(--secondary-text-color); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-load-tab": IaLoadTab;
  }
}
