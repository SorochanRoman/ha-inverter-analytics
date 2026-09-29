import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchSizing } from "../api";
import {
  describeError,
  formatCoverage,
  formatEnergy,
  formatPercent,
  formatPower,
} from "../format";
import { resolveRange, type RangeKey } from "../range";
import { listRoles } from "../roles";
import { sectionStyles } from "../sections/shared-styles";
import type {
  HomeAssistant,
  SizingCardKey,
  SizingMonth,
  SizingPayload,
  VerdictBlock,
} from "../types";
import { reasonSentence, verdictLabel } from "../verdict";

const CARDS: { key: SizingCardKey; title: string }[] = [
  { key: "inverter", title: "Inverter, against the load" },
  { key: "battery", title: "Battery, against the nights" },
  { key: "solar", title: "Sun, against the consumption" },
];

const DASH = "—";

/** 2026-03 → "Mar 2026", in the reader's language. */
function monthName(key: string, locale: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
}

@customElement("ia-sizing-tab")
export class IaSizingTab extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: String }) public entryId?: string;
  @property({ type: String }) public range: RangeKey = "30d";

  @state() private payload?: SizingPayload;
  @state() private error?: string;
  @state() private loading = false;

  private requestId = 0;

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("entryId") || changed.has("range")) {
      void this.load();
    }
  }

  private async load(): Promise<void> {
    if (!this.entryId) return;
    const requestId = ++this.requestId;
    this.loading = true;
    this.error = undefined;
    try {
      const { start, end } = resolveRange(this.range, new Date());
      const payload = await fetchSizing(this.hass, this.entryId, start, end);
      if (requestId !== this.requestId) return;
      this.payload = payload;
    } catch (err) {
      if (requestId !== this.requestId) return;
      this.error = describeError(err);
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  /** The one figure a rule turned on, for a month cell. */
  private cellFigure(card: SizingCardKey, block: VerdictBlock, locale: string): string {
    const e = block.evidence;
    if (card === "inverter") return `${e.hours_at_rated ?? 0} h at rated`;
    if (card === "battery") return `${e.days_full_and_low ?? 0} of ${e.days_with_data ?? 0} days`;
    return e.production_share === null || e.production_share === undefined
      ? DASH
      : `${formatPercent(e.production_share, locale)} of load`;
  }

  private renderEvidence(
    card: SizingCardKey,
    block: VerdictBlock,
    rules: SizingPayload["rules"],
    locale: string,
  ) {
    const e = block.evidence;
    const row = (name: string, value: string) =>
      html`<span class="row"><span>${name}</span><span>${value}</span></span>`;
    if (card === "inverter") {
      return html`
        ${row(
          "Hours the load reached rated power",
          `${e.hours_at_rated ?? DASH} of ${e.measured_hours ?? DASH}`,
        )}
        ${row(
          `Hours above ${formatPercent(rules.high_load_share, locale)} of rated`,
          `${e.hours_above_high ?? DASH}`,
        )}
        ${row("Highest hourly peak", formatPower(e.peak_w ?? null, locale))}
      `;
    }
    if (card === "battery") {
      return html`
        ${row(
          "Days it filled, and still hit the low mark",
          `${e.days_full_and_low ?? DASH} of ${e.days_with_data ?? DASH}`,
        )}
        ${row("Days it hit the low mark without filling", `${e.days_low_without_full ?? DASH}`)}
        ${row("Days it filled", `${e.days_full ?? DASH}`)}
        ${row(
          "Lowest charge",
          e.lowest_pct === null || e.lowest_pct === undefined
            ? DASH
            : formatPercent(e.lowest_pct / 100, locale),
        )}
      `;
    }
    return html`
      ${row(
        "Production as a share of consumption",
        e.production_share === null || e.production_share === undefined
          ? DASH
          : formatPercent(e.production_share, locale),
      )}
      ${row(
        "Produced / consumed",
        `${formatEnergy(e.pv_kwh ?? null, locale)} / ${formatEnergy(e.load_kwh ?? null, locale)}`,
      )}
      ${row(
        "Self-sufficiency",
        e.self_sufficiency === null || e.self_sufficiency === undefined
          ? DASH
          : formatPercent(e.self_sufficiency, locale),
      )}
      ${row(
        "Days the battery filled",
        e.fill_share === null || e.fill_share === undefined
          ? DASH
          : formatPercent(e.fill_share, locale),
      )}
    `;
  }

  private ruleSentence(card: SizingCardKey, rules: SizingPayload["rules"], locale: string): string {
    const pct = (value: number) => formatPercent(value, locale);
    if (card === "inverter") {
      return `Short when the load reached rated power in more than ${pct(rules.inverter_short_share)} of hours; borderline on any such hour, or above ${pct(rules.high_load_share)} of rated in more than ${pct(rules.inverter_borderline_share)} of hours.`;
    }
    if (card === "battery") {
      return `Counted over days the battery filled to ${pct(rules.full_pct / 100)}: short when it still fell to ${pct(rules.low_pct / 100)} on at least ${pct(rules.battery_short_share)} of days; borderline when it happened at all. Days it ran low without filling count against the sun, not the battery.`;
    }
    return `Enough when production is at least ${pct(rules.solar_enough_share)} of consumption and the battery filled on at least ${pct(rules.solar_fill_share)} of days; borderline from ${pct(rules.solar_borderline_share)} of consumption; short below.`;
  }

  /**
   * What the card is short of before any verdict can be read, or null.
   *
   * The configuration answers come in one order: a role that is not mapped,
   * then marks that cannot be told apart, then a sensor that keeps no
   * statistics. Each of them is something the reader can go and change, and
   * each makes the verdict below it meaningless, so they outrank it.
   */
  private renderSetupNote(card: SizingCardKey, payload: SizingPayload) {
    const locale = this.hass.locale.language;
    const meta = payload.cards[card];
    if (meta.missing.length) {
      // rated_power is a number in the options, not an entity: "not mapped"
      // would send the reader looking for a sensor to pick.
      const onlyRated = meta.missing.length === 1 && meta.missing[0] === "rated_power";
      return html`<p class="note">
        Needs ${listRoles(meta.missing)},
        ${onlyRated ? "which is not set for this inverter" : "not mapped to this inverter"}.
      </p>`;
    }
    if (meta.thresholds_inverted) {
      return html`<p class="note">
        The full mark (${formatPercent(payload.rules.full_pct / 100, locale)}) is at or below the
        low mark (${formatPercent(payload.rules.low_pct / 100, locale)}), so no day can be judged.
        Raise Full battery charge or lower Low battery charge in the integration's options.
      </p>`;
    }
    if (meta.no_statistics.length) {
      return html`<p class="note">
        ${meta.no_statistics.join(", ")} keeps no long-term statistics — it has no
        <code>state_class</code> — so this card cannot be read from it.
      </p>`;
    }
    return null;
  }

  /**
   * How little of the period this card's own sensor was seen for, when that
   * is little. A verdict read from twelve days of a ninety-day window is a
   * verdict about twelve days, and a flat "Short" above the period selector
   * does not say so. Silent above the threshold: the ordinary case is a card
   * that saw the whole period, and a line saying so on every card is noise.
   */
  private renderCoverageNote(block: VerdictBlock, payload: SizingPayload) {
    if (block.coverage >= payload.incomplete_below) return nothing;
    const locale = this.hass.locale.language;
    return html`<p class="note">
      Read from ${formatCoverage(block.coverage, locale)} of the period.
    </p>`;
  }

  private renderCard(card: SizingCardKey, title: string, payload: SizingPayload) {
    const locale = this.hass.locale.language;
    const block = payload.period[card];
    const setup = this.renderSetupNote(card, payload);
    let body;
    if (setup !== null) {
      body = setup;
    } else if (block === null) {
      // Everything the payload could name has been ruled out above, so this
      // is a sensor that was mapped and has since been deleted. It still gets
      // a sentence: an empty card reads as a bug.
      body = html`<p class="note">${reasonSentence(card, "no_data")}</p>`;
    } else if (block.verdict === null) {
      body = html`
        <p class="note">${reasonSentence(card, block.reason ?? "no_data")}</p>
        ${this.renderCoverageNote(block, payload)}
      `;
    } else {
      body = html`
        ${this.renderEvidence(card, block, payload.rules, locale)}
        ${this.renderCoverageNote(block, payload)}
        ${block.note === "covers_but_battery_not_filling"
          ? html`<p class="note">
              Production covers the load, but the battery filled on only
              ${formatPercent(block.evidence.fill_share ?? 0, locale)} of days — export by day and
              import by night.
            </p>`
          : nothing}
        <p class="note">${this.ruleSentence(card, payload.rules, locale)}</p>
      `;
    }
    return html`<div class="card">
      <span class="name">${title}</span>
      <span class="value ${block?.verdict ?? "none"}">${verdictLabel(block?.verdict ?? null)}</span>
      ${body}
    </div>`;
  }

  private renderMonths(payload: SizingPayload) {
    const locale = this.hass.locale.language;
    const cell = (card: SizingCardKey, month: SizingMonth) => {
      const block = month[card];
      // Unmapped, or a sensor that keeps no statistics: the card above says
      // which; the strip shows a dash in every month rather than "No verdict".
      if (block === null || payload.cards[card].no_statistics.length) {
        return html`<td class="none">${DASH}</td>`;
      }
      // The row's coverage is that of the best-covered sensor. A card read
      // from far less than the row claims has to say so itself, or a battery
      // judged from twelve days is presented under a full month.
      const thin = month.complete && block.coverage < payload.incomplete_below;
      return html`<td class=${block.verdict ?? "none"}>
        ${verdictLabel(block.verdict)}
        ${block.verdict === null
          ? nothing
          : html`<span class="hint">${this.cellFigure(card, block, locale)}</span>`}
        ${thin
          ? html`<span class="hint">from ${formatCoverage(block.coverage, locale)}</span>`
          : nothing}
      </td>`;
    };
    if (!payload.months.length) {
      return html`<p class="empty">No month falls inside this period.</p>`;
    }
    return html`<table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Inverter</th>
          <th>Battery</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        ${payload.months.map(
          (month: SizingMonth) => html`<tr class=${month.complete ? "" : "partial"}>
            <td>
              ${monthName(month.key, locale)}
              ${month.coverage === 0
                ? html`<span class="hint">no data</span>`
                : month.complete
                  ? nothing
                  : html`<span class="hint"
                      >from ${formatCoverage(month.coverage, locale)} of the month</span
                    >`}
            </td>
            ${cell("inverter", month)} ${cell("battery", month)} ${cell("solar", month)}
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  protected render() {
    if (this.error) {
      return html`<div class="notice">
        Could not load data: ${this.error}
        <button @click=${() => this.load()}>Try again</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">Computing…</div>`;
    }
    const payload = this.payload;
    const locale = this.hass.locale.language;
    return html`
      <div class="status">
        <span class="badge">Hourly statistics</span>
        <span class="badge">Months in ${payload.timezone}</span>
        ${payload.clamped
          ? html`<span class="warn">Period shortened to the maximum allowed</span>`
          : nothing}
        ${!payload.covers_whole_window && payload.covered_end
          ? html`<span class="warn"
              >Statistics cover up to ${new Date(payload.covered_end).toLocaleString(locale)}</span
            >`
          : nothing}
        ${!payload.covered_end ? html`<span class="warn">No statistics in this period</span>` : nothing}
        ${this.loading ? html`<span class="warn">Refreshing…</span>` : nothing}
      </div>

      <section>
        <div class="cards">${CARDS.map((card) => this.renderCard(card.key, card.title, payload))}</div>
      </section>

      <section>
        <h2>Month by month</h2>
        ${this.renderMonths(payload)}
        <p class="note">
          A month drawn in grey was seen for less than
          ${formatPercent(payload.incomplete_below, locale)} of its length; its verdict stands on
          that part alone. The first and last months of a period are almost always partial.
        </p>
      </section>

      <section>
        <h2>How the verdicts are read</h2>
        <p class="note">Inverter — ${this.ruleSentence("inverter", payload.rules, locale)}</p>
        <p class="note">Battery — ${this.ruleSentence("battery", payload.rules, locale)}</p>
        <p class="note">Sun — ${this.ruleSentence("solar", payload.rules, locale)}</p>
        <p class="note">
          Every month is judged from hourly statistics — the peak and the floor of each hour, not
          the mean — so a verdict for last winter is read the same way as one for last week. Nothing
          here is a combined score: which part is short is the whole point.
        </p>
      </section>
    `;
  }

  static styles = [
    sectionStyles,
    css`
      :host {
        display: block;
      }
      .status {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }
      .badge {
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        padding: 2px 10px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .card .value.enough,
      td.enough {
        color: var(--success-color, #2fa84f);
      }
      .card .value.borderline,
      td.borderline {
        color: var(--warning-color, #f7b32b);
      }
      .card .value.short,
      td.short {
        color: var(--error-color, #d64545);
      }
      .card .value.none,
      td.none {
        color: var(--secondary-text-color);
      }
      td .hint {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: 400;
      }
      td.enough,
      td.borderline,
      td.short {
        font-weight: 500;
      }
      tr.partial td {
        color: var(--secondary-text-color);
      }
      .notice {
        padding: 24px;
        color: var(--secondary-text-color);
      }
      code {
        font-size: 12px;
      }
      button {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 4px 10px;
        cursor: pointer;
        font: inherit;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-sizing-tab": IaSizingTab;
  }
}
