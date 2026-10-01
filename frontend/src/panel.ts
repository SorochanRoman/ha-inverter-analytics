import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchConfig } from "./api";
import { describeError } from "./format";
import { singleFlight } from "./single-flight";
import { buildLocation, parseLocation } from "./location";
import { I18nController } from "./i18n/controller";
import type { Messages } from "./i18n/en";
import { LANGS, noteHaLanguage, setLang } from "./i18n/lang";
import { RANGE_KEYS, rangeLabel, type RangeKey } from "./range";
import { INTEGRATION_URL, listRoles } from "./roles";
import type { ConfigResult, EntryInfo, FeatureInfo, HomeAssistant } from "./types";
import "./tabs/balance-tab";
import "./tabs/battery-tab";
import "./tabs/grid-tab";
import "./tabs/load-tab";
import "./tabs/seasonality-tab";
import "./tabs/sizing-tab";

const BASE_PATH = "/inverter-analytics";

const TABS = ["load", "battery", "seasonal", "balance", "grid", "sizing"] as const;

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

  private i18n = new I18nController(this);

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
    // Until the reader picks a language, the panel follows Home Assistant's.
    if (changed.has("hass")) {
      noteHaLanguage(this.hass?.locale?.language);
    }
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
      TABS,
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
      this.error = describeError(err, this.i18n.m);
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
    const m = this.i18n.m;
    if (this.error) {
      return html`<div class="notice">
        ${m.panel.couldNotLoad({ error: this.error })}
        <button @click=${() => { this.error = undefined; void this.loadConfig(); }}>
          ${m.panel.tryAgain}
        </button>
      </div>`;
    }
    if (!this.config) {
      return html`<div class="notice">${m.panel.loading}</div>`;
    }
    if (!this.config.entries.length) {
      return html`<div class="notice">
        ${m.panel.noInverter}
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
        <div class="langs" role="group" aria-label=${m.panel.language}>
          ${LANGS.map(
            (lang) => html`<button
              class=${lang === this.i18n.lang ? "active" : ""}
              @click=${() => setLang(lang)}
            >${lang.toUpperCase()}</button>`,
          )}
        </div>
        <div class="ranges">
          ${RANGE_KEYS.map(
            (key) => html`<button
              class=${key === this.range ? "active" : ""}
              @click=${() => this.selectRange(key)}
            >${rangeLabel(m, key)}</button>`,
          )}
        </div>
      </div>

      <nav class="tabs">
        ${TABS.map((id) => {
          // Dimmed rather than hidden. A tab that disappears takes with it
          // any hint that the feature exists, and the reason it is empty —
          // an unmapped sensor — is one the user can act on the moment they
          // are told which sensor it is.
          const unavailable = this.feature(id)?.available === false;
          return html`<button
            class="${id === this.tab ? "active" : ""} ${unavailable ? "muted" : ""}"
            @click=${() => this.selectTab(id)}
          >${m.panel.tabs[id]}</button>`;
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
    const m = this.i18n.m;
    const feature = this.feature(this.tab);
    if (feature && !feature.available) {
      const words = {
        feature: m.features[feature.key as keyof Messages["features"]] ?? feature.label,
        roles: listRoles(m, feature.missing),
      };
      return html`<div class="notice">
        <p>
          ${feature.missing.length === 1 ? m.panel.missingOne(words) : m.panel.missingMany(words)}
        </p>
        <p>
          ${m.panel.reconfigureBefore}<strong>${m.panel.reconfigure}</strong>${m.panel.reconfigureAfter}
        </p>
        <a href=${INTEGRATION_URL}>${m.panel.goToSettings}</a>
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
        ${this.tab === "sizing"
          ? html`<ia-sizing-tab
              .hass=${this.hass}
              .entryId=${this.entryId}
              .range=${this.range}
            ></ia-sizing-tab>`
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
    .langs { display: flex; gap: 4px; margin-left: auto; }
    .ranges { display: flex; gap: 4px; flex-wrap: wrap; }
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
