import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchConfig } from "./api";
import { describeError } from "./format";
import { singleFlight } from "./single-flight";
import { buildLocation, parseLocation } from "./location";
import { RANGE_KEYS, RANGE_LABELS, type RangeKey } from "./range";
import { INTEGRATION_URL, listRoles } from "./roles";
import type { ConfigResult, EntryInfo, FeatureInfo, HomeAssistant } from "./types";
import "./tabs/balance-tab";
import "./tabs/battery-tab";
import "./tabs/grid-tab";
import "./tabs/load-tab";
import "./tabs/seasonality-tab";

const BASE_PATH = "/inverter-analytics";

const TABS = [
  { id: "load", label: "Load" },
  { id: "battery", label: "Battery" },
  { id: "seasonal", label: "Seasonality" },
  { id: "balance", label: "Balance" },
  { id: "grid", label: "Grid" },
] as const;

@customElement("inverter-analytics-panel")
export class InverterAnalyticsPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public route?: { path: string };

  @state() private config?: ConfigResult;
  @state() private error?: string;
  @state() private entryId?: string;
  @state() private tab: string = "load";
  @state() private range: RangeKey = "30d";

  public connectedCallback(): void {
    super.connectedCallback();
    this.readLocation();
    window.addEventListener("popstate", this.readLocation);
    if (this.hass) {
      void this.loadConfig();
    }
  }

  public disconnectedCallback(): void {
    window.removeEventListener("popstate", this.readLocation);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    // Home Assistant may assign hass only after the element has connected —
    // in that case connectedCallback would have called fetchConfig(undefined).
    // Wait for the first hass value and try again if the config hasn't
    // loaded yet (and the previous attempt didn't fail with an error the
    // user can retry via the button).
    if (changed.has("hass") && this.hass && !this.config && !this.error) {
      void this.loadConfig();
    }
  }

  private readLocation = (): void => {
    const next = parseLocation(
      window.location.pathname,
      window.location.search,
      TABS.map((item) => item.id),
      { tab: this.tab, range: this.range, entryId: this.entryId },
    );
    this.tab = next.tab;
    this.range = next.range;
    this.entryId = next.entryId;
  };

  /**
   * Changing tab is a navigation, so it goes on the history stack and the
   * Back button undoes it. Changing the period or the inverter refines the
   * same view, and pushing those would make Back walk through every click of
   * a filter before leaving the page.
   */
  private writeLocation(push = false): void {
    const url = buildLocation(BASE_PATH, {
      tab: this.tab,
      range: this.range,
      entryId: this.entryId,
    });
    if (push) {
      window.history.pushState(null, "", url);
    } else {
      window.history.replaceState(null, "", url);
    }
  }

  // The connected guard and willUpdate both fire on an ordinary mount, so
  // without this the panel asks for its configuration twice on every load.
  private loadConfig = singleFlight(() => this.requestConfig());

  private async requestConfig(): Promise<void> {
    try {
      this.config = await fetchConfig(this.hass);
      // A URL naming an inverter that no longer exists must not leave the
      // panel asking the backend for it on every range change.
      const known = this.config.entries.some((entry) => entry.entry_id === this.entryId);
      if (!known) {
        this.entryId = this.config.entries[0]?.entry_id;
      }
      this.writeLocation();
    } catch (err) {
      this.error = describeError(err);
    }
  }

  private get entry(): EntryInfo | undefined {
    return this.config?.entries.find((item) => item.entry_id === this.entryId);
  }

  /**
   * What the backend says about one tab. A tab with no feature of its own is
   * treated as available: the panel must not hide a tab because a version of
   * the integration older than the tab had nothing to say about it.
   */
  private feature(tab: string): FeatureInfo | undefined {
    return this.entry?.features?.find((item) => item.key === tab);
  }

  private selectTab(tab: string): void {
    this.tab = tab;
    this.writeLocation(true);
  }

  private selectRange(range: RangeKey): void {
    this.range = range;
    this.writeLocation();
  }

  private selectEntry(entryId: string): void {
    this.entryId = entryId;
    this.writeLocation();
  }

  protected render() {
    if (this.error) {
      return html`<div class="notice">
        Could not load configuration: ${this.error}
        <button @click=${() => { this.error = undefined; void this.loadConfig(); }}>
          Try again
        </button>
      </div>`;
    }
    if (!this.config) {
      return html`<div class="notice">Loading…</div>`;
    }
    if (!this.config.entries.length) {
      return html`<div class="notice">
        No inverter is configured yet. Add the Inverter Analytics integration in settings.
      </div>`;
    }

    return html`
      <div class="header">
        <h1>Inverter Analytics</h1>
        ${this.config.entries.length > 1
          ? html`<select
              @change=${(event: Event) => {
                this.selectEntry((event.target as HTMLSelectElement).value);
              }}
            >
              ${this.config.entries.map(
                // ?selected on the option, not .value on the select: Lit sets
                // properties before the children exist, so on first render the
                // assignment lands on an empty select and the browser falls
                // back to the first entry. The page then showed one inverter's
                // data under another inverter's name.
                (entry) => html`<option
                  value=${entry.entry_id}
                  ?selected=${entry.entry_id === this.entryId}
                >
                  ${entry.title}
                </option>`,
              )}
            </select>`
          : nothing}
        <div class="ranges">
          ${RANGE_KEYS.map(
            (key) => html`<button
              class=${key === this.range ? "active" : ""}
              @click=${() => this.selectRange(key)}
            >${RANGE_LABELS[key]}</button>`,
          )}
        </div>
      </div>

      <nav class="tabs">
        ${TABS.map((item) => {
          // Dimmed rather than hidden. A tab that disappears takes with it
          // any hint that the feature exists, and the reason it is empty —
          // an unmapped sensor — is one the user can act on the moment they
          // are told which sensor it is.
          const unavailable = this.feature(item.id)?.available === false;
          return html`<button
            class="${item.id === this.tab ? "active" : ""} ${unavailable ? "muted" : ""}"
            @click=${() => this.selectTab(item.id)}
          >${item.label}</button>`;
        })}
      </nav>

      <main>
        ${this.renderTab()}
      </main>
    `;
  }

  /**
   * The tab, or an explanation of why it cannot be drawn.
   *
   * "No data" and "you have not told me which sensor that is" are different
   * statements, and the page used to make only the first of them: asking for
   * battery analytics from an inverter with no state-of-charge sensor mapped
   * answered with the words "battery_soc is not configured" under the heading
   * "Could not load data", which reads as a fault rather than as a setting.
   */
  private renderTab() {
    const feature = this.feature(this.tab);
    if (feature && !feature.available) {
      return html`<div class="notice">
        <p>
          ${feature.label} needs ${listRoles(feature.missing)}, and
          ${feature.missing.length === 1 ? "it is" : "none of them are"} mapped to this inverter.
          Nothing here is broken and there is no data missing — this page has simply not been
          told which of your sensors ${feature.missing.length === 1 ? "that is" : "those are"}.
        </p>
        <p>
          Open the integration, choose <strong>Reconfigure</strong>, and it will offer what it
          can find in your installation.
        </p>
        <a href=${INTEGRATION_URL}>Go to Inverter Analytics settings</a>
      </div>`;
    }

    return html`
        ${this.tab === "load"
          ? html`<ia-load-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-load-tab>`
          : nothing}
        ${this.tab === "battery"
          ? html`<ia-battery-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-battery-tab>`
          : nothing}
        ${this.tab === "seasonal"
          ? html`<ia-seasonality-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-seasonality-tab>`
          : nothing}
        ${this.tab === "balance"
          ? html`<ia-balance-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-balance-tab>`
          : nothing}
        ${this.tab === "grid"
          ? html`<ia-grid-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-grid-tab>`
          : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      min-height: 100%;
      box-sizing: border-box;
    }
    .header { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    h1 { font-size: 20px; margin: 0; font-weight: 500; }
    .ranges { display: flex; gap: 4px; margin-left: auto; flex-wrap: wrap; }
    button {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
    }
    button.active { border-color: var(--primary-color); color: var(--primary-color); }
    .tabs { display: flex; gap: 4px; margin: 16px 0; flex-wrap: wrap; }
    button.muted { color: var(--secondary-text-color); border-style: dashed; }
    button.muted.active { color: var(--primary-color); }
    .notice { padding: 24px; color: var(--secondary-text-color); max-width: 60ch; }
    .notice p { margin: 0 0 12px; }
    .notice a { color: var(--primary-color); }
    select {
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 6px 8px;
      font: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "inverter-analytics-panel": InverterAnalyticsPanel;
  }
}
