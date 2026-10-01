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
import { I18nController } from "../i18n/controller";
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
import { reasonHint, reasonSentence, solarFillTested, verdictLabel } from "../verdict";

const CARDS: SizingCardKey[] = ["inverter", "battery", "solar"];

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
  // The error itself, not its sentence: render() words it, so a language
  // switch re-words an error already on screen.
  @state() private error?: unknown;
  @state() private loading = false;

  private i18n = new I18nController(this);

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
      this.error = err;
    } finally {
      if (requestId === this.requestId) {
        this.loading = false;
      }
    }
  }

  /** The one figure a rule turned on, for a month cell. */
  private cellFigure(card: SizingCardKey, block: VerdictBlock, locale: string): string {
    const m = this.i18n.m;
    const e = block.evidence;
    if (card === "inverter") return m.sizing.hoursAtRated({ hours: `${e.hours_at_rated ?? 0}` });
    if (card === "battery") {
      return m.sizing.daysOf({
        days: `${e.days_full_and_low ?? 0}`,
        total: e.days_with_data ?? 0,
      });
    }
    return e.production_share === null || e.production_share === undefined
      ? DASH
      : m.sizing.ofLoad({ share: formatPercent(e.production_share, locale) });
  }

  private renderEvidence(
    card: SizingCardKey,
    block: VerdictBlock,
    rules: SizingPayload["rules"],
    locale: string,
  ) {
    const m = this.i18n.m;
    const e = block.evidence;
    const countOf = (count?: number | null, total?: number | null) =>
      m.sizing.countOf({ count: `${count ?? DASH}`, total: `${total ?? DASH}` });
    const row = (name: string, value: string) =>
      html`<span class="row"><span>${name}</span><span>${value}</span></span>`;
    if (card === "inverter") {
      return html`
        ${row(m.sizing.hoursReachedRated, countOf(e.hours_at_rated, e.measured_hours))}
        ${row(
          m.sizing.hoursAboveOfRated({ share: formatPercent(rules.high_load_share, locale) }),
          `${e.hours_above_high ?? DASH}`,
        )}
        ${row(m.sizing.highestPeak, formatPower(e.peak_w ?? null, locale))}
      `;
    }
    if (card === "battery") {
      return html`
        ${row(m.sizing.daysFilledAndLow, countOf(e.days_full_and_low, e.days_with_data))}
        ${row(m.sizing.daysLowWithoutFilling, `${e.days_low_without_full ?? DASH}`)}
        ${row(m.sizing.daysFilled, `${e.days_full ?? DASH}`)}
        ${row(
          m.sizing.lowestCharge,
          e.lowest_pct === null || e.lowest_pct === undefined
            ? DASH
            : formatPercent(e.lowest_pct / 100, locale),
        )}
      `;
    }
    return html`
      ${row(
        m.sizing.productionShare,
        e.production_share === null || e.production_share === undefined
          ? DASH
          : formatPercent(e.production_share, locale),
      )}
      ${row(
        m.sizing.producedConsumed,
        `${formatEnergy(e.pv_kwh ?? null, locale)} / ${formatEnergy(e.load_kwh ?? null, locale)}`,
      )}
      ${row(
        m.common.selfSufficiency,
        e.self_sufficiency === null || e.self_sufficiency === undefined
          ? DASH
          : formatPercent(e.self_sufficiency, locale),
      )}
      ${row(
        m.sizing.daysBatteryFilled,
        e.fill_share === null || e.fill_share === undefined
          ? DASH
          : formatPercent(e.fill_share, locale),
      )}
    `;
  }

  /**
   * The rule the verdict was read by, in the reader's own numbers.
   *
   * Takes the whole payload and not just the rules because the solar rule is
   * not the same rule on every installation: the fill clause is printed only
   * when the span has a fill share, which is when the verdict tested it (see
   * solarFillTested). With no charge sensor, inverted thresholds, or a charge
   * sensor with no rows in the span, printing the clause would describe a
   * condition the verdict never tested.
   */
  private ruleSentence(card: SizingCardKey, payload: SizingPayload, locale: string): string {
    const m = this.i18n.m;
    const rules = payload.rules;
    const pct = (value: number) => formatPercent(value, locale);
    if (card === "inverter") {
      return m.sizing.inverterRule({
        shortShare: pct(rules.inverter_short_share),
        highShare: pct(rules.high_load_share),
        borderlineShare: pct(rules.inverter_borderline_share),
      });
    }
    if (card === "battery") {
      return m.sizing.batteryRule({
        full: pct(rules.full_pct / 100),
        low: pct(rules.low_pct / 100),
        share: pct(rules.battery_short_share),
      });
    }
    const enough = pct(rules.solar_enough_share);
    const borderline = pct(rules.solar_borderline_share);
    return solarFillTested(payload)
      ? m.sizing.solarRuleWithFill({ enough, fill: pct(rules.solar_fill_share), borderline })
      : m.sizing.solarRule({ enough, borderline });
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
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const meta = payload.cards[card];
    if (meta.missing.length) {
      // rated_power is a number in the options, not an entity: "not mapped"
      // would send the reader looking for a sensor to pick.
      const onlyRated = meta.missing.length === 1 && meta.missing[0] === "rated_power";
      return html`<p class="note">
        ${onlyRated
          ? m.sizing.needsNotSet({ roles: listRoles(m, meta.missing, true) })
          : m.sizing.needsNotMapped({
              roles: listRoles(m, meta.missing, true),
              n: meta.missing.length,
            })}
      </p>`;
    }
    if (meta.thresholds_inverted) {
      return html`<p class="note">
        ${m.sizing.thresholdsInverted({
          full: formatPercent(payload.rules.full_pct / 100, locale),
          low: formatPercent(payload.rules.low_pct / 100, locale),
        })}
      </p>`;
    }
    if (meta.no_statistics.length) {
      const n = meta.no_statistics.length;
      return html`<p class="note">
        ${m.sizing.noStatisticsBefore({ sensors: meta.no_statistics.join(", "), n })}
        <code>state_class</code> ${m.sizing.noStatisticsAfter({ n })}
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
   * Silent at nothing at all, too: the withheld sentence above it has already
   * said there are no statistics, and "read from 0%" only repeats it.
   */
  private renderCoverageNote(block: VerdictBlock, payload: SizingPayload) {
    if (block.coverage === 0 || block.coverage >= payload.incomplete_below) return nothing;
    const locale = this.i18n.locale;
    return html`<p class="note">
      ${this.i18n.m.sizing.readFrom({ share: formatCoverage(block.coverage, locale) })}
    </p>`;
  }

  private renderCard(card: SizingCardKey, payload: SizingPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
    const block = payload.period[card];
    const setup = this.renderSetupNote(card, payload);
    let body;
    if (setup !== null) {
      body = setup;
    } else if (block === null) {
      // Everything the payload could name has been ruled out above, so this
      // is a sensor that was mapped and has since been deleted. It still gets
      // a sentence: an empty card reads as a bug.
      body = html`<p class="note">${reasonSentence(m, card, "no_data")}</p>`;
    } else if (block.verdict === null) {
      body = html`
        <p class="note">${reasonSentence(m, card, block.reason ?? "no_data")}</p>
        ${this.renderCoverageNote(block, payload)}
      `;
    } else {
      body = html`
        ${this.renderEvidence(card, block, payload.rules, locale)}
        ${this.renderCoverageNote(block, payload)}
        ${block.note === "covers_but_battery_not_filling"
          ? html`<p class="note">
              ${m.sizing.batteryNotFilling({
                share: formatPercent(block.evidence.fill_share ?? 0, locale),
              })}
            </p>`
          : nothing}
        <p class="note">${this.ruleSentence(card, payload, locale)}</p>
      `;
    }
    return html`<div class="card">
      <span class="name">${m.sizing.cards[card]}</span>
      <span class="value ${block?.verdict ?? "none"}"
        >${verdictLabel(m, block?.verdict ?? null)}</span
      >
      ${body}
    </div>`;
  }

  private renderMonths(payload: SizingPayload) {
    const m = this.i18n.m;
    const locale = this.i18n.locale;
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
        ${verdictLabel(m, block.verdict)}
        ${block.verdict === null
          ? // Why there is no verdict: a month the battery never filled is the
            // rule working, a month with no statistics is missing data, and
            // "No verdict" alone reads the same for both.
            html`<span class="hint">${reasonHint(m, card, block.reason ?? "no_data")}</span>`
          : html`<span class="hint">${this.cellFigure(card, block, locale)}</span>`}
        ${thin
          ? html`<span class="hint"
              >${m.sizing.cellCoverage({ share: formatCoverage(block.coverage, locale) })}</span
            >`
          : nothing}
      </td>`;
    };
    if (!payload.months.length) {
      return html`<p class="empty">${m.sizing.noMonths}</p>`;
    }
    return html`<table>
      <thead>
        <tr>
          <th>${m.seasonality.month}</th>
          <th>${m.sizing.parts.inverter}</th>
          <th>${m.sizing.parts.battery}</th>
          <th>${m.sizing.parts.solar}</th>
        </tr>
      </thead>
      <tbody>
        ${payload.months.map(
          (month: SizingMonth) => html`<tr class=${month.complete ? "" : "partial"}>
            <td>
              ${monthName(month.key, locale)}
              ${month.coverage === 0
                ? html`<span class="hint">${m.verdict.hintNoData}</span>`
                : month.complete
                  ? nothing
                  : html`<span class="hint"
                      >${m.sizing.ofTheMonth({
                        share: formatCoverage(month.coverage, locale),
                      })}</span
                    >`}
            </td>
            ${cell("inverter", month)} ${cell("battery", month)} ${cell("solar", month)}
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  protected render() {
    const m = this.i18n.m;
    if (this.error !== undefined) {
      return html`<div class="notice">
        ${m.common.couldNotLoadData({ error: describeError(this.error, m) })}
        <button @click=${() => this.load()}>${m.common.tryAgain}</button>
      </div>`;
    }
    if (!this.payload) {
      return html`<div class="notice">${m.common.computing}</div>`;
    }
    const payload = this.payload;
    const locale = this.i18n.locale;
    const ruleLine = (card: SizingCardKey) =>
      m.sizing.ruleLine({
        part: m.sizing.parts[card],
        rule: this.ruleSentence(card, payload, locale),
      });
    return html`
      <div class="status">
        <span class="badge">${m.balance.hourlyStatistics}</span>
        <span class="badge">${m.seasonality.monthsIn({ timezone: payload.timezone })}</span>
        ${payload.clamped
          ? html`<span class="warn">${m.common.periodShortened}</span>`
          : nothing}
        ${!payload.covers_whole_window && payload.covered_end
          ? html`<span class="warn"
              >${m.sizing.statisticsCoverUpTo({
                time: new Date(payload.covered_end).toLocaleString(locale),
              })}</span
            >`
          : nothing}
        ${!payload.covered_end
          ? html`<span class="warn">${m.sizing.noStatistics}</span>`
          : nothing}
        ${this.loading ? html`<span class="warn">${m.common.refreshing}</span>` : nothing}
      </div>

      <section>
        <div class="cards">${CARDS.map((card) => this.renderCard(card, payload))}</div>
      </section>

      <section>
        <h2>${m.seasonality.monthByMonth}</h2>
        ${this.renderMonths(payload)}
        <p class="note">
          ${m.sizing.greyMonths({ share: formatPercent(payload.incomplete_below, locale) })}
        </p>
      </section>

      <section>
        <h2>${m.sizing.howVerdictsRead}</h2>
        <p class="note">${ruleLine("inverter")}</p>
        <p class="note">${ruleLine("battery")}</p>
        <p class="note">${ruleLine("solar")}</p>
        <p class="note">${m.sizing.hourlyNotMean}</p>
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
