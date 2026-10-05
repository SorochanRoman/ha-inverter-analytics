/**
 * The panel's words in English — the reference dictionary.
 *
 * uk.ts is typed against this object, so a key added here and not there
 * fails the typecheck. Sentences that carry values are functions of one
 * object of already-formatted strings: each language orders and inflects
 * its own sentence rather than gluing words around a number.
 */
import { plural } from "./plural";

export const en = {
  common: {
    and: "and",
    // One name inside a list, set off the way the language sets off a name it
    // quotes: English leaves a role name bare, Ukrainian puts it in «».
    quoted: (p: { text: string }) => p.text,
    // The words every tab shares: its error notice, its status line, the
    // first columns of its episode tables.
    couldNotLoadData: (p: { error: string }) => `Could not load data: ${p.error}`,
    tryAgain: "Try again",
    computing: "Computing…",
    refreshing: "Refreshing…",
    periodShortened: "Period shortened to the maximum allowed",
    start: "Start",
    duration: "Duration",
    peak: "Peak",
    coversOfPeriod: (p: { share: string }) => `Covers ${p.share} of the period`,
    meanLoad: "Mean load",
    // Under an episode table the backend capped at its longest entries.
    longestShown: (p: { shown: number; total: number }) =>
      plural("en", p.shown, {
        one: `The longest of ${p.total} is shown.`,
        other: `The ${p.shown} longest of ${p.total} are shown, in time order.`,
      }),
    selfSufficiency: "Self-sufficiency",
  },
  units: {
    w: "W",
    kw: "kW",
    kwh: "kWh",
    s: "s",
    min: "min",
    h: "h",
    ofRated: "of rated",
    // Percentage points: the difference between two shares.
    pp: "pp",
  },
  panel: {
    language: "Language",
    // The accessible name of the period buttons' group.
    period: "Period",
    couldNotLoad: (p: { error: string }) => `Could not load configuration: ${p.error}`,
    loading: "Loading…",
    noInverter:
      "No inverter is configured yet. Add the Inverter Analytics integration in settings.",
    tabs: {
      load: "Load",
      battery: "Battery",
      seasonal: "Seasonality",
      balance: "Balance",
      grid: "Grid",
      sizing: "Sizing",
      health: "Health",
    },
    // The notice on a tab whose sensors are not mapped. One role or several
    // changes more than a pronoun, so each is a whole paragraph.
    // Role names reach every sentence already set off by common.quoted, one
    // by one: the caller quotes, no dictionary function adds its own quotes.
    missingOne: (p: { feature: string; roles: string }) =>
      `${p.feature} needs ${p.roles}, and it is not mapped to this inverter. ` +
      "Nothing here is broken and there is no data missing — this page has simply not been " +
      "told which of your sensors that is.",
    missingMany: (p: { feature: string; roles: string }) =>
      `${p.feature} needs ${p.roles}, and none of them are mapped to this inverter. ` +
      "Nothing here is broken and there is no data missing — this page has simply not been " +
      "told which of your sensors those are.",
    reconfigureBefore: "Open the integration, choose ",
    reconfigure: "Reconfigure",
    reconfigureAfter: ", and it will offer what it can find in your installation.",
    goToSettings: "Go to Inverter Analytics settings",
  },
  ranges: {
    "24h": "24 h",
    "7d": "7 days",
    "30d": "30 days",
    month: "This month",
    year: "Year",
  },
  // The backend sends a label with each feature too; these win so the name
  // follows the panel's language. Keyed as FEATURES in roles.py.
  features: {
    load: "Load analytics",
    battery: "Battery analytics",
    seasonal: "Seasonality",
    balance: "Energy balance",
    grid: "Grid outages",
    sizing: "Sizing",
    health: "Health",
  },
  // The setup form's field labels; see roles.ts.
  roles: {
    load_power: "Load power",
    load_power_phase: "Load power per phase",
    rated_power: "Rated power",
    rated_power_per_phase: "Rated power per phase",
    pv_power: "PV power",
    pv_power_string: "PV power per string",
    battery_power: "Battery power",
    grid_power: "Grid power",
    grid_power_phase: "Grid power per phase",
    battery_soc: "Battery state of charge",
    battery_capacity: "Battery capacity",
    grid_connected: "Grid connected",
    pv_energy_total: "PV energy total",
    load_energy_total: "Load energy total",
    battery_charge_total: "Battery charge energy total",
    battery_discharge_total: "Battery discharge energy total",
    grid_import_total: "Grid import total",
    grid_export_total: "Grid export total",
  },
  // Backend error codes with a fixed message. invalid_config is not here:
  // its message names the role and value at fault, which a fixed sentence
  // would lose.
  errors: {
    not_found: "Inverter not found or disabled",
    invalid_window: "Window end must be later than its start",
  },
  // format.ts: precisionLabel and coverageWarning.
  format: {
    exactData: "Exact data",
    hourlyAverages: "Hourly averages",
    mixed: "Mixed",
    mixedSince: (p: { date: string }) => `Mixed since ${p.date}`,
    noData: "No data for this period",
    coversUnderOnePercent: "Data covers less than 1% of the period",
    coversOnly: (p: { share: string }) => `Data covers only ${p.share} of the period`,
  },
  // verdict.ts: the sizing verdicts and why one is withheld.
  verdict: {
    enough: "Enough",
    borderline: "Borderline",
    short: "Short",
    none: "No verdict",
    // Keyed by sizing card.
    noData: {
      inverter: "There are no statistics for the load in this span.",
      battery: "There are no statistics for the battery's charge in this span.",
      solar:
        "There are no statistics for the counters in this span, or too little consumption " +
        "to take a share of.",
    },
    neverFull:
      "The battery never filled in this span, so the nights say nothing about its size.",
    hintNeverFilled: "never filled",
    // Battery reason "never_full" when full is the battery's own charge limit.
    neverReachedLimit:
      "The battery never reached its charge limit in this span, so the nights say nothing " +
      "about its size.",
    hintLimitNotReached: "limit not reached",
    hintNoData: "no data",
    // Solar reason "no_fill": a no-export system whose sun is read from days
    // the battery was full, with no charge data in the span. It names neither
    // the limit nor the mark, so it reads true in both full modes.
    noFill:
      "With no export the sun is read from how often the battery filled, and there is no " +
      "charge data for this span.",
    hintNoFill: "no charge data",
  },
  // charts/options.ts: axis names, legend entries and series names. A legend
  // finds its series by name, so both sides read the same entry here.
  charts: {
    // The locale the charts write month names and numbers in, also used by
    // the month table. It is the panel language's own locale, not Home
    // Assistant's: an English panel has always said "Mar" and "2.5",
    // whatever the profile's locale.
    locale: "en",
    percentOfTime: "% of time",
    percentImbalance: "% imbalance",
    percentCharge: "% charge",
    percentOfMeasuredTime: "% of measured time",
    hour: "hour",
    hours: "hours",
    mean: "Mean",
    peak: "Peak",
    load: "Load",
    pv: "PV",
    // The two rows of the balance bar: what came into the system, what left it.
    in: "In",
    out: "Out",
    // The six energy counters as movements of energy, in the order shown.
    // Not the setup-form names in roles: "From grid" is right on an axis and
    // useless in an instruction to go and map a sensor.
    flows: {
      pv_energy_total: "Solar",
      grid_import_total: "From grid",
      battery_discharge_total: "From battery",
      load_energy_total: "House",
      grid_export_total: "To grid",
      battery_charge_total: "To battery",
    },
    // The by-day outage tooltip.
    hoursWithoutGrid: (p: { hours: string }) => `${p.hours} h without grid`,
    outagesBegan: (p: { n: number }) =>
      p.n === 0
        ? "no outages began"
        : plural("en", p.n, {
            one: `${p.n} outage began`,
            other: `${p.n} outages began`,
          }),
  },
  load: {
    // A total and its parts that disagree. Two sentences rather than one with
    // the subject slotted in: in Ukrainian the subject's gender changes the words around it.
    loadConsistency: (p: { total: string; partsTotal: string }) =>
      `Total load averages ${p.total} while the phases add up to ${p.partsTotal}. ` +
      "Is one of them mapped to the wrong sensor?",
    pvConsistency: (p: { total: string; partsTotal: string }) =>
      `Total PV power averages ${p.total} while the strings add up to ${p.partsTotal}. ` +
      "Is one of them mapped to the wrong sensor?",
    histogramClipped:
      "Some values fell outside the histogram range and are shown in its edge buckets",
    mean: "Mean",
    median: "Median",
    sustained15m: "Sustained 15 min",
    above80OfRated: ">80% of rated",
    ofTime: "of time",
    shareOfRated: (p: { share: string }) => `${p.share} of rated`,
    noOverloads: "No overloads in this period.",
    timeAtPowerLevel: "Time spent at each power level",
    asPercentOfRated: "as % of rated",
    inWatts: "in watts",
    durationCurve: "Load duration curve",
    ratedBands: "Distribution across rated-power bands",
    overloadEpisodes: "Overload episodes",
  },
  battery: {
    meanCharge: "Mean charge",
    overWholePeriod: "over the whole period",
    lowestCharge: "Lowest charge",
    exactDataOnly: "exact data only",
    needsExactData: "needs exact data",
    below: (p: { level: string }) => `Below ${p.level}`,
    dips: "Dips",
    lastingOverMinute: "lasting over a minute",
    meanLowPoint: "Mean low point",
    acrossThoseDips: "across those dips",
    dipsNotMeasurable:
      "This period is covered only by hourly averages, which record the mean charge across each " +
      "hour. A fall to 8% for twenty minutes shows up there as a comfortable number, so dips " +
      'cannot be counted at all — an empty table would read as "none happened". Pick a shorter ' +
      "period to see them.",
    noEpisodes: (p: { level: string }) =>
      `The charge never stayed below ${p.level} for more than a minute in this period.`,
    lowest: "Lowest",
    recoveredTo: "Recovered to",
    dipsCountedFrom: (p: { date: string }) =>
      `Dips counted from ${p.date}, where exact data begins`,
    timeAtSoc: "Time spent at each state of charge",
    chargeBands: "Distribution across charge bands",
    lowChargeEpisodes: "Low-charge episodes",
    // The heading itself is sections.charge.title, shared with the section.
    mapPowerSensor:
      "Map a battery power sensor in the integration's options to see how much moves in and " +
      "out, and how much of the time the battery is working.",
  },
  seasonality: {
    monthsIn: (p: { timezone: string }) => `Months in ${p.timezone}`,
    meanByMonth: "Mean power by month",
    // A thin month still has a bar; an absent one has none. Counted apart, so
    // one sentence never says nine months are grey when one of them is.
    thinMonths: (p: { n: number; share: string }) =>
      plural("en", p.n, {
        one: `One month is covered by less than ${p.share} of its days and is drawn in grey.`,
        other:
          `${p.n} months are covered by less than ${p.share} of their days and are drawn ` +
          "in grey.",
      }),
    partialNotLower:
      "A month the recorder only saw part of is not a lower month; the figures stand, the " +
      "comparison does not.",
    absentMonths: (p: { n: number }) =>
      plural("en", p.n, {
        one: "One month has no recorded data at all and carries no bar.",
        other: `${p.n} months have no recorded data at all and carry no bar.`,
      }),
    statisticsFromStart:
      "Home Assistant keeps long-term statistics only from the moment a sensor starts " +
      "producing them.",
    monthByMonth: "Month by month",
    month: "Month",
    busiestHour: "Busiest hour",
    meanPv: "Mean PV",
    ofTheMonth: "Of the month",
    busiestHourNote:
      '"Busiest hour" is the highest hourly average, not the highest load. Beyond the ' +
      "recorder's retention Home Assistant keeps only an hourly mean, so a brief peak inside an " +
      "hour has already been averaged away by the time this page sees it.",
    meanByHour: "Mean power by hour of day",
    byHourNote:
      "Averaged across the whole period, so it blends the seasons. The heat map below is the " +
      "same question asked per month.",
    hourByMonth: "Hour of day, month by month",
    heatmapNote:
      "Where a winter evening peak and a summer midday one stop being two averages and become " +
      "two shapes. Hours with no recorded data are left blank rather than drawn as zero.",
  },
  balance: {
    hourlyStatistics: "Hourly statistics",
    daysIn: (p: { timezone: string }) => `Days in ${p.timezone}`,
    countedUpTo: (p: { time: string }) => `Counted up to ${p.time}`,
    noEnergyStatistics: "No energy statistics in this period",
    intoSystem: "into the system",
    outOfIt: "out of it",
    inAgainstOut: "In against out",
    needsAllSix: (p: { missing: string }) =>
      `The books can only be closed with all six counters mapped. Missing: ${p.missing}. ` +
      "Until then the difference between the two bars would measure what is not mapped " +
      "rather than what was lost.",
    // The balance line, split around the <strong> amount the template holds.
    // Unaccounted and more-out are two endings, not a word slot.
    inOut: (p: { in: string; out: string }) => `In ${p.in}, out ${p.out} —`,
    unaccountedFor: (p: { share: string }) => `unaccounted for (${p.share}).`,
    moreOutThanIn: (p: { share: string }) => `more out than in (${p.share}).`,
    unaccountedNote:
      "Conversion and battery round-trip losses live in this figure, and so does every " +
      "disagreement between the six meters. It is called unaccounted rather than losses " +
      "because nothing here can tell heat in the inverter from error in a clamp.",
    ratiosTitle: "Self-sufficiency and self-consumption",
    ratiosNeedCounters:
      "Self-sufficiency needs the house and grid-import counters; self-consumption needs " +
      "solar and grid export.",
    selfConsumption: "Self-consumption",
    dayByDay: "Day by day",
    noDays: "No days with energy statistics in this period.",
    dayByDayNote:
      "Two bars a day: what came in, and what went out. Adding the two together would count " +
      "the same energy twice. Energy is read from Home Assistant's hourly statistics, which " +
      "is where counter resets are already accounted for. The current hour is compiled only " +
      "once it ends, so a period running up to now stops at the last completed hour.",
  },
  grid: {
    outages: "Outages",
    withoutGrid: "Without grid",
    unrecordedAssumedOff: (p: { duration: string }) => `+ ${p.duration} unrecorded, assumed off`,
    shareOfTime: "Share of time",
    ofMeasuredTime: "of measured time",
    longest: "Longest",
    fromTime: (p: { time: string }) => `from ${p.time}`,
    meanDuration: "Mean duration",
    briefInterruptions: "Brief interruptions",
    underAMinute: "under a minute",
    // An outage cut by the window's start or still going is longer than seen.
    atLeast: (p: { duration: string }) => `at least ${p.duration}`,
    noOutages: (p: { duration: string }) =>
      `No outages in this period — none in ${p.duration} of measurement.`,
    chargeAtStart: "Charge at start",
    lowest: "Lowest",
    atEnd: "At end",
    unrecorded: (p: { duration: string }) => `(${p.duration} unrecorded)`,
    noAutonomy: "No autonomy estimate.",
    // Keyed by AutonomyReason; the one with a figure is a function.
    autonomyReasons: {
      no_soc: "It needs the battery's state of charge, which is not mapped to this inverter.",
      no_outages: "There were no outages in this period to read a discharge rate from.",
      no_soc_in_outages:
        "The battery's charge was not recorded during any of this period's outages, so there " +
        "is no discharge to read a rate from.",
      no_net_discharge:
        "The charge did not fall during this period's outages — the sun covered them — so " +
        "there is no discharge rate to read.",
    },
    tooLittleEvidence: (p: { hours: string }) =>
      `The charge spent ${p.hours} falling to the lowest point of each outage, and an ` +
      "estimate needs at least an hour.",
    fromFullTo: (p: { level: string }) => `From full to ${p.level}`,
    fromNow: "From where it is now",
    chargeNow: "Charge now",
    dischargeRate: "Discharge rate",
    pointsPerHour: (p: { rate: string }) => `${p.rate} pts/h`,
    evidenceNote: (p: { hours: string }) =>
      `At the rate seen during this period's outages, over the ${p.hours} the charge spent ` +
      "falling to each one's lowest point. Whether a summer afternoon's outage says anything " +
      "about a winter evening's is for the reader to judge; the mean load beside it is there " +
      "to help.",
    hoursLeft: "Hours left",
    neededAtStart: "Needed at start",
    didNotLast: "did not last",
    moreThanFull: "more than a full battery",
    // Keyed by ReserveReason.
    reserveReasons: {
      no_soc: "no charge data",
      cut: "cut by the period",
      no_net_discharge: "sun covered it",
      too_short: "too short to judge",
    },
    hardestOutageNeeds: "Hardest outage needs",
    hardestOutageOn: (p: { date: string }) => `Outage of ${p.date}`,
    noHardestOutage: "No outage long enough to judge",
    outagesCovered: "Outages covered",
    coveredOf: (p: { covered: number; judged: number }) => `${p.covered} of ${p.judged}`,
    coveredHint: (p: { level: string }) => `Never below ${p.level}`,
    reserveNote:
      "Hours left are read from the lowest point of each outage, at the rate the charge fell to " +
      "reach it, and the charge needed is the low mark plus that fall. Both depend on the hour " +
      "and the load: a daytime outage says little about a night one.",
    // Why counting starts late: two whole sentences rather than a clause slot.
    countedFromInferred: (p: { date: string }) =>
      `Outages counted from ${p.date} — earlier history is only hourly averages, which ` +
      "cannot say when inside an hour the grid was gone",
    countedFromNoHistory: (p: { date: string }) =>
      `Outages counted from ${p.date} — the recorder keeps no earlier history of this sensor`,
    inferredBanner:
      "Inferred from power flows, not measured. A night the battery carries the house with " +
      "nothing crossing the grid connection looks exactly like an outage, and a daytime " +
      "outage the sun covers is not seen at all. Map a sensor that reports grid presence to " +
      "measure instead.",
    hoursByDay: "Hours without grid, by day",
    noDaysWithData: "No days with data in this period.",
    missingDays: (p: { n: number }) =>
      plural("en", p.n, {
        one: `${p.n} day in this period had no data and is not drawn.`,
        other: `${p.n} days in this period had no data and are not drawn.`,
      }),
    shareByHour: "Share of time without grid, by hour of day",
    hoursNeverRecorded:
      "Hours the sensor never recorded are left empty rather than drawn at zero.",
    autonomy: "Autonomy",
  },
  sizing: {
    cards: {
      inverter: "Inverter, against the load",
      battery: "Battery, against the nights",
      solar: "Sun, against the consumption",
    },
    // The month-table columns, and the part named before each rule.
    parts: {
      inverter: "Inverter",
      battery: "Battery",
      solar: "Sun",
    },
    // The one figure in a month cell.
    hoursAtRated: (p: { hours: string }) => `${p.hours} h at rated`,
    // The total is a number so a language can inflect "days" by it.
    daysOf: (p: { days: string; total: number }) => `${p.days} of ${p.total} days`,
    ofLoad: (p: { share: string }) => `${p.share} of load`,
    // A Sun month cell on a no-export system, whose verdict the fill decided.
    filledOnDays: (p: { share: string }) => `filled on ${p.share} of days`,
    // The evidence rows of each card.
    countOf: (p: { count: string; total: string }) => `${p.count} of ${p.total}`,
    hoursReachedRated: "Hours the load reached rated power",
    hoursAboveOfRated: (p: { share: string }) => `Hours above ${p.share} of rated`,
    highestPeak: "Highest hourly peak",
    daysFilledAndLow: "Days it filled, and still hit the low mark",
    daysLowWithoutFilling: "Days it hit the low mark without filling",
    daysFilled: "Days it filled",
    lowestCharge: "Lowest charge",
    productionShare: "Production as a share of consumption",
    producedConsumed: "Produced / consumed",
    daysBatteryFilled: "Days the battery filled",
    // The rule each verdict was read by, in the reader's own numbers, saying
    // exactly what sizing.py tests: "reaching" is >=, "fell below" is <. With no
    // charge sensor mapped the solar rule has no fill clause, and is a
    // sentence of its own rather than one with a hole in it.
    inverterRule: (p: { shortShare: string; highShare: string; borderlineShare: string }) =>
      `Short when the load reached rated power in more than ${p.shortShare} of hours; ` +
      `borderline on any such hour, or reaching ${p.highShare} of rated in more than ` +
      `${p.borderlineShare} of hours.`,
    batteryRule: (p: { full: string; low: string; share: string }) =>
      `Counted over days with data: short when the battery filled to ${p.full} and still ` +
      `fell below ${p.low} on at least ${p.share} of them; borderline when it happened at all; ` +
      "no verdict for a span in which it never filled. A day it ran low without filling " +
      "counts against the sun, not the battery.",
    // The battery rule when "full" is the battery's own charge limit.
    batteryRuleCeiling: (p: { low: string; share: string }) =>
      "Counted over days with data: short when the battery reached its charge limit with " +
      `the sun up and still fell below ${p.low} on at least ${p.share} of them; borderline ` +
      "when it happened at all; no verdict for a span in which it never reached its limit. " +
      "A day it ran low without reaching it counts against the sun, not the battery.",
    solarRuleWithFill: (p: { enough: string; fill: string; borderline: string }) =>
      `Enough when production is at least ${p.enough} of consumption and the battery filled ` +
      `on at least ${p.fill} of days; borderline from ${p.borderline} of consumption; short ` +
      "below.",
    solarRule: (p: { enough: string; borderline: string }) =>
      `Enough when production is at least ${p.enough} of consumption; borderline from ` +
      `${p.borderline} of consumption; short below.`,
    // The Sun rule of a system that kept its production in.
    solarRuleNoExport: (p: { fill: string; borderlineFill: string; borderline: string }) =>
      "With no export, production cannot pass consumption, so the sun is read from the " +
      `battery: enough when it reached its charge limit with the sun up on at least ${p.fill} ` +
      `of days; borderline from ${p.borderlineFill} of days, or from ${p.borderline} of ` +
      "consumption; short below.",
    // The same rule when full is the fixed mark from the options.
    solarRuleNoExportFixed: (p: {
      full: string;
      fill: string;
      borderlineFill: string;
      borderline: string;
    }) =>
      "With no export, production cannot pass consumption, so the sun is read from the " +
      `battery: enough when it reached ${p.full} on at least ${p.fill} of days; borderline ` +
      `from ${p.borderlineFill} of days, or from ${p.borderline} of consumption; short below.`,
    // Which "full" the battery and Sun verdicts were read by.
    fullModeCeiling:
      "Full means the battery reached its own charge limit: the inverter stopped charging " +
      "while the sun was up. A limit set below 100% for the summer still counts.",
    // The fixed mark, and why it was read: the roles to map, or the mapped
    // roles that kept no statistics. The roles arrive set off by
    // common.quoted; the count lets a language agree with one or several.
    fullModeFixed: (p: { full: string; roles: string; n: number }) =>
      `Full means a charge of at least ${p.full}. Map ${p.roles} to read the battery's own ` +
      "limit instead.",
    fullModeNoRows: (p: { full: string; roles: string; n: number }) =>
      `${p.roles} ${p.n === 1 ? "keeps" : "keep"} no statistics for this period, so full is ` +
      `the fixed mark of ${p.full}.`,
    fullModePlain: (p: { full: string }) => `Full means a charge of at least ${p.full}.`,
    // What a card is short of before a verdict can be read. Rated power is a
    // number in the options, not an entity, so it is "not set", not "not
    // mapped"; the count lets a language agree with one role or several.
    // Both get their roles already set off by common.quoted, one by one, so
    // a language that quotes names quotes every name in a list.
    needsNotSet: (p: { roles: string }) => `Needs ${p.roles}, which is not set for this inverter.`,
    needsNotMapped: (p: { roles: string; n: number }) =>
      `Needs ${p.roles}, not mapped to this inverter.`,
    thresholdsInverted: (p: { full: string; low: string }) =>
      `The full mark (${p.full}) is at or below the low mark (${p.low}), so no day can be ` +
      "judged. Raise Full battery charge or lower Low battery charge in the integration's " +
      "options.",
    // Split around the <code>state_class</code> the template holds.
    noStatisticsBefore: (p: { sensors: string; n: number }) =>
      `${p.sensors} keeps no long-term statistics — it has no`,
    noStatisticsAfter: (p: { n: number }) => "— so this card cannot be read from it.",
    readFrom: (p: { share: string }) => `Read from ${p.share} of the period.`,
    batteryNotFilling: (p: { share: string }) =>
      `Production covers the load, but the battery filled on only ${p.share} of days — ` +
      "export by day and import by night.",
    cellCoverage: (p: { share: string }) => `from ${p.share}`,
    noMonths: "No month falls inside this period.",
    ofTheMonth: (p: { share: string }) => `from ${p.share} of the month`,
    statisticsCoverUpTo: (p: { time: string }) => `Statistics cover up to ${p.time}`,
    noStatistics: "No statistics in this period",
    greyMonths: (p: { share: string }) =>
      `A month drawn in grey was seen for less than ${p.share} of its length; its verdict ` +
      "stands on that part alone. The first and last months of a period are almost always " +
      "partial.",
    howVerdictsRead: "How the verdicts are read",
    ruleLine: (p: { part: string; rule: string }) => `${p.part} — ${p.rule}`,
    hourlyNotMean:
      "Every month is judged from hourly statistics — the peak and the floor of each hour, " +
      "not the mean — so a verdict for last winter is read the same way as one for last " +
      "week. Nothing here is a combined score: which part is short is the whole point.",
  },
  // health.ts and the Health tab. No verdicts anywhere: each figure is set
  // beside the same month a year earlier and the reader decides.
  health: {
    cards: {
      capacity: "Battery capacity",
      efficiency: "Round-trip efficiency",
      solar: "Solar production",
      inverter: "Inverter load",
    },
    // Chart and table headings: the solar card holds two signals.
    signals: {
      capacity: "Usable capacity",
      efficiency: "Round-trip efficiency",
      solar_energy: "Energy",
      best_hour: "Best hour",
      inverter: "Hours near rated power",
    },
    columns: {
      month: "Month",
      value: "Figure",
      previous: "A year earlier",
      difference: "Difference",
      share: "Change",
    },
    // The status badge, from the first month with a figure.
    wholeHistory: (p: { month: string }) => `Whole history, from ${p.month}`,
    wholeHistoryEmpty: "Whole history — no month has a figure yet",
    // The figure above each card and its caption.
    lastTwelve: "Last 12 months against the 12 before",
    meanOfMonthly: "mean of the monthly figures",
    twelveBefore: (p: { value: string }) => `the 12 before: ${p.value}`,
    notEnough: (p: { recent: number; previous: number; needed: number }) =>
      `Not enough months to compare: the last 12 have ${p.recent} with a figure and the ` +
      `12 before have ${p.previous}; each side needs ${p.needed}.`,
    // The dimmed period buttons while the tab is open: their group's
    // accessible name, their title, and a note shown beside them.
    periodNotUsed: "Health reads the whole history; the period does not apply here.",
    // Under an inverter month's figure.
    inverterHint: (p: { atRated: string; measured: string }) =>
      `${p.atRated} h at rated, of ${p.measured} h measured`,
    // Under an efficiency month whose figure the month's capacity corrected for
    // the charge it ended with: the drift can run either way, so it names the change.
    driftCorrected: "corrected for the change in the battery's charge",
    // Why a month has no figure, keyed by the payload's reason.
    reasons: {
      too_few_clean_hours: (p: { n: number; minHours: number }) =>
        `${plural("en", p.n, {
          one: `Only ${p.n} clean discharge hour`,
          other: `Only ${p.n} clean discharge hours`,
        })} this month; it needs ${p.minHours}, or one strange hour moves the figure.`,
      no_soc:
        "No state of charge this month, so there is no telling whether the battery ended " +
        "where it began.",
      counters_partial:
        "The charge and discharge counters do not cover the same hours this month, so what " +
        "went in and what came out are not from the same span.",
      soc_partial:
        "The state of charge covers only part of the hours the counters do, so the check " +
        "that the battery ended where it began would not cover the same span.",
      drift: (p: { points: string }) =>
        `The charge ended more than ${p.points} points from where it began, so part of ` +
        "what came out went in another month, or the reverse — and there is no capacity " +
        "figure for this month to correct it with.",
      too_little_throughput: (p: { min: string }) =>
        `Less than ${p.min} went into the battery this month — too little to read an ` +
        "efficiency from.",
      partial_month:
        "Only part of this month has statistics, and a part is not compared with a whole month.",
      // partial_month when the payload says how much of the month was covered.
      partialCoverage: (p: { share: string; needed: string }) =>
        `${p.share} of the month has statistics; a month needs ${p.needed}, and a part is ` +
        "not compared with a whole month.",
      curtailed: (p: { n: number; minHours: number }) =>
        `${plural("en", p.n, {
          one: `Only ${p.n} hour of sun`,
          other: `Only ${p.n} hours of sun`,
        })} the system could take in full; the best hour needs ${p.minHours}.`,
    },
    // bestHourCaption.
    bestHourCaption: {
      unconstrained:
        "Hours when the battery was at its charge limit are left out: the inverter may have " +
        "cut the array back to what the house used, so their peak may be the load, not the " +
        "array.",
      all:
        "Read from every hour. Without the state of charge, battery power and PV power, an " +
        "hour the system could not take cannot be told apart, so a low month may be the " +
        "house and not the array.",
      exporting:
        "Read from every hour. This system exports, so a full battery does not cut the array " +
        "back — the surplus goes to the grid — and every hour's peak is the array's.",
    },
    // energyCaption.
    energyCaption: {
      household:
        "This system does not export, so the energy is what the house used, not what the " +
        "array could give: its difference from a year earlier measures the household. Read " +
        "the best hour for the array.",
      array:
        "Energy carries the weather: a dull month is low for reasons of its own. The best " +
        "hour carries much less of it.",
    },
    // The reference line on the capacity chart, and why it is not a target.
    nameplate: (p: { value: string }) => `Nameplate ${p.value}`,
    nameplateNote:
      "The nameplate is what the maker printed; the line is what the battery delivered, " +
      "read through the BMS's estimate of its charge. They are different quantities: watch " +
      "the shape of the line over the years, not its distance from the nameplate.",
    // The block at the foot of the tab.
    howRead: "How these are read",
    definitions: {
      capacity: (p: { charge: string; drop: string; minHours: number }) =>
        "Usable capacity comes from clean discharge hours: hours in which the charge counter " +
        `moved by at most ${p.charge}, the discharge counter moved, and the state of charge ` +
        `fell by at least ${p.drop} points. The discharge over the fall is the energy per ` +
        `point; times a hundred, the capacity. A month needs ${p.minHours} such hours. A ` +
        "recalibration by the BMS inside one can only pull a month's figure down.",
      efficiency: (p: { points: string; min: string }) =>
        "Round-trip efficiency is what came out of the battery over what went in, from the " +
        "counters' monthly sums. When a month's charge ended more than " +
        `${p.points} points from where it began, the difference is corrected with that ` +
        "month's measured capacity; without one the month has no figure. Nor has a month " +
        `into which less than ${p.min} went.`,
      solar: (p: { minHours: number; minPower: string }) =>
        "Solar production is the PV counter's energy per month. The best hour is the " +
        "month's highest hourly peak of PV power — close to a clear-sky figure. Hours the " +
        `system could not take are left out, and a month needs ${p.minHours} other hours of ` +
        `sun at or above ${p.minPower}.`,
      // Appended to solar when no total PV power is mapped.
      solarDerived:
        "This system has no total PV power sensor, so PV power is the sum of its strings. " +
        "An hour counts only when every string has statistics for it, and its peak is " +
        "summed from the strings' own peaks: they need not peak at the same moment, so " +
        "the best hour can read a little above the array's true peak.",
      inverter: (p: { share: string }) =>
        "Inverter load counts the hours whose peak reached the current rated power, and those " +
        `whose peak reached ${p.share} of it; every year is counted against today's rating. ` +
        "That is how the house is used, not the state of the hardware: without a temperature " +
        "or fault sensor the data can say nothing more about the inverter itself.",
    },
    caveats: {
      bms:
        "The state of charge is the battery management system's estimate, not a measurement. " +
        "It drifts and is recalibrated, so one month can move for reasons that are not the " +
        "battery.",
      weather:
        "A month's energy follows its weather: a dull year reads like a weaker array. The " +
        "best hour carries much less of it.",
    },
  },
  sections: {
    charge: {
      title: "Charging and discharging",
      signInverted:
        "The charge rises while this battery reports discharging. The power sensor's " +
        'direction is probably reversed — tick "Invert battery power" in the integration\'s ' +
        "options. Until then charging and discharging are swapped everywhere on this page.",
      meanChargePower: "Mean charge power",
      meanDischargePower: "Mean discharge power",
      ofTheTime: "Of the time",
      resting: "Resting",
      below: "Below",
      discharged: "Discharged",
      charged: "Charged",
      roundTripEfficiency: "Round-trip efficiency",
      outOfWhatWentIn: "Out of what went in",
      fullCyclesPerDay: "Full cycles per day",
      needsCapacity: "Needs the battery capacity",
      setCapacity:
        "Set the battery capacity in the integration's options and this becomes the energy " +
        "discharged each day divided by one full charge. It is not guessed from the state of " +
        "charge, which would count a shallow cycle the same as a deep one.",
      integrated:
        "Energy is integrated from the power readings rather than read off a meter, so a " +
        "period with gaps understates it — compare it against the coverage above. Map the " +
        "battery's charge and discharge counters in the options to read the inverter's own " +
        "accounting instead, and to get round-trip efficiency.",
      noEfficiency: "No round-trip efficiency for this period.",
      // Below and above are two sentences, not a word slot: the comparative
      // agrees with its noun in Ukrainian.
      driftBelow: (p: { n: number }) =>
        `The charge ended ${p.n} ${plural("en", p.n, { one: "point", other: "points" })} ` +
        "below where it started, so the gap between charged and discharged is mostly energy " +
        "still in the battery rather than energy lost on the way through. A longer period, or " +
        "one that begins and ends at a similar charge, will give a figure.",
      driftAbove: (p: { n: number }) =>
        `The charge ended ${p.n} ${plural("en", p.n, { one: "point", other: "points" })} ` +
        "above where it started, so the gap between charged and discharged is mostly energy " +
        "still in the battery rather than energy lost on the way through. A longer period, or " +
        "one that begins and ends at a similar charge, will give a figure.",
      tooLittle: "There was too little charging and discharging to divide one by the other.",
    },
    phases: {
      title: "Phases",
      positional: (p: { n: number }) => `Phase ${p.n}`,
      shareOfLoad: "Share of load",
      peakVs: (p: { rating: string }) => `Peak vs ${p.rating}`,
      neverAboveFloor: (p: { floor: string }) =>
        `Total load never rose above ${p.floor}, so there was nothing to measure the spread ` +
        "against in this period.",
      meanImbalance: "Mean imbalance",
      p95Imbalance: "P95 imbalance",
      above: (p: { threshold: string }) => `Above ${p.threshold}`,
      ofMeasuredTime: "of the measured time",
      measuredOver: (p: { duration: string; share: string }) =>
        `Measured over ${p.duration} (${p.share} of the period).`,
      belowFloorExcluded: (p: { duration: string; floor: string }) =>
        `A further ${p.duration} sat below ${p.floor} of total load and is excluded: at ` +
        "standby power a few watts of difference is a large percentage and means nothing.",
      noSustained: "No sustained imbalance in this period.",
      worst: "Worst",
      derivedRating: (p: { n: number; rating: string }) =>
        "No per-phase rating is configured, so the total is split across " +
        `${p.n} ${plural("en", p.n, { one: "phase", other: "phases" })} — ${p.rating} each. ` +
        "Set the real figure in the integration's options if the hardware differs.",
      alignedLow: (p: { share: string }) =>
        `All phases had data at the same moment for only ${p.share} of the period. The spread ` +
        "cannot be measured while any one phase is unknown.",
      imbalance: "Imbalance",
      sustainedEpisodes: "Sustained imbalance episodes",
    },
    strings: {
      title: "PV strings",
      positional: (p: { n: number }) => `String ${p.n}`,
      shareOfPv: "Share of PV",
      alignedLow: (p: { share: string }) =>
        `All strings had data at the same moment for only ${p.share} of the period, so the ` +
        "shares are of that time rather than the whole window.",
      compare:
        "A string consistently below its neighbour points at shading, a different orientation " +
        "or a fault. Compare mean rather than peak: peaks coincide, averages do not.",
    },
  },
};

export type Messages = typeof en;
