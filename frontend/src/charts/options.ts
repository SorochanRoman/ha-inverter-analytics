import type { Messages } from "../i18n/en";
import { partLabel } from "../roles";
import { LEGEND_GRID_TOP, SERIES, X_AXIS_NAME, YEAR_LINES, chartBaseOption } from "../theme";
import type {
  BalanceDay,
  Band,
  BatteryPayload,
  GridDay,
  GridHour,
  HourBucket,
  Imbalance,
  LoadPayload,
  MonthBucket,
  MonthHourCell,
  PartSummary,
} from "../types";

const round = (value: number, digits: number): number =>
  Number(value.toFixed(digits));

/**
 * A rounded number as text in the panel's locale: 2.5 in English, 2,5 in
 * Ukrainian. Without grouping, so English stays what String() printed.
 */
const decimal = (value: number, digits: number, m: Messages): string =>
  new Intl.NumberFormat(m.charts.locale, {
    maximumFractionDigits: digits,
    useGrouping: false,
  }).format(round(value, digits));

export function histogramOption(
  payload: LoadPayload,
  mode: "watts" | "percent",
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = payload.histogram.buckets;
  const labels = buckets.map((bucket) =>
    mode === "watts"
      ? String(round(bucket.start, 0))
      : decimal((bucket.start / payload.rated_power) * 100, 1, m),
  );

  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: labels,
      name: mode === "watts" ? m.units.w : `% ${m.units.ofRated}`,
      ...X_AXIS_NAME,
    },
    yAxis: { ...axis, type: "value", name: m.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: buckets.map((bucket) => round(bucket.fraction * 100, 2)),
        itemStyle: { color: SERIES.load },
        barCategoryGap: "10%",
      },
    ],
  };
}

export function durationCurveOption(payload: LoadPayload, m: Messages): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    xAxis: {
      ...axis,
      ...X_AXIS_NAME,
      type: "value",
      name: m.charts.percentOfTime,
      min: 0,
      max: 100,
    },
    yAxis: { ...axis, type: "value", name: m.units.w },
    series: [
      {
        type: "line",
        showSymbol: false,
        areaStyle: { opacity: 0.15 },
        lineStyle: { color: SERIES.load },
        itemStyle: { color: SERIES.load },
        data: payload.duration_curve.map((point) => [
          round(point.fraction * 100, 2),
          round(point.value, 1),
        ]),
      },
    ],
  };
}

export function bandsOption(payload: LoadPayload, m: Messages): Record<string, unknown> {
  // ECharts draws Y-axis categories bottom-up, so the band order is reversed.
  const { base, axis } = chartBaseOption();
  const bands = [...payload.bands].reverse();
  return {
    ...base,
    xAxis: {
      ...axis,
      ...X_AXIS_NAME,
      type: "value",
      name: m.charts.percentOfTime,
      min: 0,
      max: 100,
    },
    yAxis: { ...axis, type: "category", data: bands.map((band) => band.key) },
    series: [
      {
        type: "bar",
        data: bands.map((band) => round(band.fraction * 100, 2)),
        itemStyle: {
          color: (params: { dataIndex: number }) =>
            bands[params.dataIndex].key === "100+" ? SERIES.overload : SERIES.load,
        },
      },
    ],
  };
}

export function imbalanceOption(imbalance: Imbalance, m: Messages): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = imbalance.histogram;
  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: buckets.map((bucket) => String(round(bucket.start * 100, 0))),
      name: m.charts.percentImbalance,
      ...X_AXIS_NAME,
    },
    yAxis: { ...axis, type: "value", name: m.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: buckets.map((bucket) => round(bucket.fraction * 100, 2)),
        // Everything at or above the threshold is the part worth looking at,
        // so it is coloured as an overload rather than left to the reader to
        // compare against a number written elsewhere on the page.
        itemStyle: {
          color: (params: { dataIndex: number }) =>
            buckets[params.dataIndex].start >= imbalance.threshold
              ? SERIES.overload
              : SERIES.load,
        },
        barCategoryGap: "10%",
      },
    ],
  };
}

export function partsOption(
  parts: PartSummary[],
  colour: string,
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    // Two bar colours with nothing naming them is a guess. The legend draws
    // where the shared grid starts, so the plot is pushed down below it.
    legend: { data: [m.charts.mean, m.charts.peak], top: 0, textStyle: base.textStyle },
    grid: { ...(base.grid as Record<string, unknown>), top: LEGEND_GRID_TOP },
    xAxis: { ...axis, type: "category", data: parts.map((part) => partLabel(m, part)) },
    yAxis: { ...axis, type: "value", name: m.units.w },
    series: [
      {
        name: m.charts.mean,
        type: "bar",
        data: parts.map((part) => (part.mean === null ? null : round(part.mean, 1))),
        itemStyle: { color: colour },
      },
      {
        name: m.charts.peak,
        type: "bar",
        data: parts.map((part) => (part.peak === null ? null : round(part.peak, 1))),
        itemStyle: { color: SERIES.muted },
      },
    ],
  };
}

export function socHistogramOption(payload: BatteryPayload, m: Messages): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = payload.histogram.buckets;
  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: buckets.map((bucket) => String(round(bucket.start, 0))),
      name: m.charts.percentCharge,
      ...X_AXIS_NAME,
    },
    yAxis: { ...axis, type: "value", name: m.charts.percentOfTime },
    series: [
      {
        type: "bar",
        data: buckets.map((bucket) => round(bucket.fraction * 100, 2)),
        // Everything under the configured low mark is the part worth looking
        // at, coloured as a warning rather than left for the reader to compare
        // against a number written elsewhere on the page.
        itemStyle: {
          color: (params: { dataIndex: number }) =>
            buckets[params.dataIndex].end <= payload.low_pct ? SERIES.overload : SERIES.battery,
        },
        barCategoryGap: "10%",
      },
    ],
  };
}

export function socBandsOption(bands: Band[], m: Messages): Record<string, unknown> {
  // ECharts draws Y-axis categories bottom-up, so the band order is reversed.
  const { base, axis } = chartBaseOption();
  const ordered = [...bands].reverse();
  return {
    ...base,
    xAxis: {
      ...axis,
      ...X_AXIS_NAME,
      type: "value",
      name: m.charts.percentOfTime,
      min: 0,
      max: 100,
    },
    yAxis: { ...axis, type: "category", data: ordered.map((band) => band.key) },
    series: [
      {
        type: "bar",
        data: ordered.map((band) => round(band.fraction * 100, 2)),
        itemStyle: {
          color: (params: { dataIndex: number }) =>
            ordered[params.dataIndex].key === "0-20" ? SERIES.overload : SERIES.battery,
        },
      },
    ],
  };
}

/** The short name of a calendar month, 1 to 12: Mar, or бер. in Ukrainian. */
function monthName(month: number, locale: string): string {
  return new Date(Date.UTC(2000, month - 1, 1)).toLocaleDateString(locale, { month: "short" });
}

/**
 * Shortens 2026-03 to Mar (бер. in Ukrainian), keeping the year only where
 * it turns over.
 */
export function monthLabel(key: string, previous: string | undefined, locale: string): string {
  const [year, month] = key.split("-").map(Number);
  const name = monthName(month, locale);
  return previous && previous.slice(0, 4) === String(year) ? name : `${name} ${year}`;
}

export function monthlyOption(
  months: MonthBucket[],
  hasPv: boolean,
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const labels = months.map((month, index) =>
    monthLabel(month.key, months[index - 1]?.key, m.charts.locale),
  );

  const series: Record<string, unknown>[] = [
    {
      name: m.charts.load,
      type: "bar",
      data: months.map((month) => (month.load_mean === null ? null : round(month.load_mean, 1))),
      // An incomplete month keeps its bar and loses its solidity: dropping it
      // would leave a hole the reader fills in with a reason of their own.
      itemStyle: {
        color: (params: { dataIndex: number }) =>
          months[params.dataIndex].complete ? SERIES.load : SERIES.muted,
      },
    },
  ];
  if (hasPv) {
    series.push({
      name: m.charts.pv,
      type: "bar",
      data: months.map((month) => (month.pv_mean === null ? null : round(month.pv_mean, 1))),
      itemStyle: { color: SERIES.pv },
    });
  }

  return {
    ...base,
    legend: hasPv
      ? { data: [m.charts.load, m.charts.pv], top: 0, textStyle: base.textStyle }
      : undefined,
    grid: hasPv ? { ...(base.grid as Record<string, unknown>), top: LEGEND_GRID_TOP } : base.grid,
    xAxis: { ...axis, type: "category", data: labels },
    yAxis: { ...axis, type: "value", name: m.units.w },
    series,
  };
}

export function hourOfDayOption(
  hours: HourBucket[],
  hasPv: boolean,
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const series: Record<string, unknown>[] = [
    {
      name: m.charts.load,
      type: "line",
      showSymbol: false,
      areaStyle: { opacity: 0.15 },
      lineStyle: { color: SERIES.load },
      itemStyle: { color: SERIES.load },
      data: hours.map((hour) => (hour.load_mean === null ? null : round(hour.load_mean, 1))),
    },
  ];
  if (hasPv) {
    series.push({
      name: m.charts.pv,
      type: "line",
      showSymbol: false,
      lineStyle: { color: SERIES.pv },
      itemStyle: { color: SERIES.pv },
      data: hours.map((hour) => (hour.pv_mean === null ? null : round(hour.pv_mean, 1))),
    });
  }
  return {
    ...base,
    legend: hasPv
      ? { data: [m.charts.load, m.charts.pv], top: 0, textStyle: base.textStyle }
      : undefined,
    grid: hasPv ? { ...(base.grid as Record<string, unknown>), top: LEGEND_GRID_TOP } : base.grid,
    xAxis: {
      ...axis,
      type: "category",
      data: hours.map((hour) => String(hour.hour)),
      name: m.charts.hour,
      ...X_AXIS_NAME,
    },
    yAxis: { ...axis, type: "value", name: m.units.w },
    series,
  };
}

export function monthHourHeatmapOption(
  cells: MonthHourCell[],
  months: MonthBucket[],
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const keys = months.map((month) => month.key);
  const labels = keys.map((key, index) => monthLabel(key, keys[index - 1], m.charts.locale));
  const index = new Map(keys.map((key, position) => [key, position]));

  const data = cells
    .filter((cell) => cell.load_mean !== null && index.has(cell.month))
    .map((cell) => [index.get(cell.month), cell.hour, round(cell.load_mean as number, 1)]);
  const values = data.map((point) => point[2] as number);

  return {
    ...base,
    tooltip: { trigger: "item" },
    grid: { ...(base.grid as Record<string, unknown>), top: 48, bottom: 60 },
    xAxis: { ...axis, type: "category", data: labels, splitArea: { show: true } },
    yAxis: {
      ...axis,
      type: "category",
      data: Array.from({ length: 24 }, (_, hour) => String(hour)),
      name: m.charts.hour,
    },
    visualMap: {
      min: values.length ? Math.min(...values) : 0,
      max: values.length ? Math.max(...values) : 1,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: base.textStyle,
      inRange: { color: [SERIES.battery, SERIES.pv, SERIES.overload] },
    },
    series: [{ type: "heatmap", data }],
  };
}

/** An energy role's name as a movement of energy, or the raw key if it is a stranger. */
export function flowLabel(m: Messages, role: string): string {
  return (m.charts.flows as Record<string, string>)[role] ?? role;
}

// Every flow gets its own colour: the two grid directions were both grey and
// indistinguishable in the legend, and charging the battery was drawn in the
// overload red this app uses for faults.
const FLOW_COLOURS: Record<string, string> = {
  pv_energy_total: SERIES.pv,
  grid_import_total: SERIES.grid,
  battery_discharge_total: SERIES.battery,
  load_energy_total: SERIES.load,
  grid_export_total: SERIES.gridExport,
  battery_charge_total: SERIES.batteryCharge,
};

export function flowBarsOption(
  totals: Record<string, number>,
  sources: readonly string[],
  sinks: readonly string[],
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const present = [...sources, ...sinks].filter((role) => role in totals);

  // One stacked bar per side over a shared axis, so the books balancing is
  // visible as the two bars matching rather than as a number to be compared.
  return {
    ...base,
    legend: { data: present.map((role) => flowLabel(m, role)), top: 0, textStyle: base.textStyle },
    grid: { ...(base.grid as Record<string, unknown>), top: LEGEND_GRID_TOP },
    xAxis: { ...axis, ...X_AXIS_NAME, type: "value", name: m.units.kwh },
    yAxis: { ...axis, type: "category", data: [m.charts.out, m.charts.in] },
    series: present.map((role) => ({
      name: flowLabel(m, role),
      type: "bar",
      stack: sources.includes(role) ? "in" : "out",
      itemStyle: { color: FLOW_COLOURS[role] },
      // Row 1 is "In", row 0 is "Out": ECharts draws category axes bottom-up.
      data: sources.includes(role)
        ? [null, round(totals[role], 3)]
        : [round(totals[role], 3), null],
    })),
  };
}

export function dailyFlowsOption(
  days: BalanceDay[],
  sources: readonly string[],
  sinks: readonly string[],
  m: Messages,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const present = [...sources, ...sinks].filter((role) =>
    days.some((day) => role in day.flows),
  );

  return {
    ...base,
    legend: { data: present.map((role) => flowLabel(m, role)), top: 0, textStyle: base.textStyle },
    grid: { ...(base.grid as Record<string, unknown>), top: LEGEND_GRID_TOP },
    xAxis: { ...axis, type: "category", data: days.map((day) => day.day.slice(5)) },
    yAxis: { ...axis, type: "value", name: m.units.kwh },
    series: present.map((role) => ({
      name: flowLabel(m, role),
      type: "bar",
      // Two stacks per day, not one. Adding a day's sources to its sinks
      // produces a column whose height means nothing — the same energy counted
      // twice — while looking exactly like a daily total.
      stack: sources.includes(role) ? "in" : "out",
      itemStyle: { color: FLOW_COLOURS[role] },
      // A day the counter has no accounting for stays a hole, not a zero.
      data: days.map((day) => (role in day.flows ? round(day.flows[role], 3) : null)),
    })),
  };
}

export function outageDaysOption(days: GridDay[], m: Messages): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    tooltip: {
      ...(base.tooltip as Record<string, unknown>),
      // How many outages began on a day is the other thing the by-day view has
      // to answer, and a second axis for a count of two or three would cost
      // more than it says. The tooltip is where it fits.
      formatter: (params: { name: string; value: number; dataIndex: number }[]) => {
        const point = params[0];
        const count = days[point.dataIndex].count;
        const hours = m.charts.hoursWithoutGrid({ hours: decimal(point.value, 2, m) });
        return `${point.name}<br/>${hours}<br/>${m.charts.outagesBegan({ n: count })}`;
      },
    },
    xAxis: { ...axis, type: "category", data: days.map((day) => day.day.slice(5)) },
    yAxis: { ...axis, type: "value", name: m.charts.hours },
    series: [
      {
        type: "bar",
        // Days the sensor had no data for are not in the list at all, so
        // every bar here stands on measured time.
        data: days.map((day) => round(day.off_seconds / 3600, 2)),
        itemStyle: { color: SERIES.overload },
      },
    ],
  };
}

export function outageHoursOption(hours: GridHour[], m: Messages): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    xAxis: { ...axis, type: "category", data: hours.map((item) => `${item.hour}`) },
    yAxis: { ...axis, type: "value", name: m.charts.percentOfMeasuredTime, min: 0, max: 100 },
    series: [
      {
        type: "bar",
        // A share rather than raw hours: under uneven coverage raw hours
        // compare an hour the recorder saw ten times with one it saw twice.
        // An hour with no measured time stays a hole, not a zero.
        data: hours.map((item) =>
          item.measured_seconds > 0
            ? round((item.off_seconds / item.measured_seconds) * 100, 2)
            : null,
        ),
        itemStyle: { color: SERIES.overload },
      },
    ],
  };
}

/**
 * One line per year over the twelve months, so a winter is set beside a
 * winter. A gap stays a gap: connecting across it would draw a month nobody
 * measured. Symbols stay on, or a month alone between gaps would vanish.
 *
 * A reference, when given, is a flat dashed line across all twelve months
 * under its own name in the legend. It is drawn as a series rather than a
 * markLine so the bundle registers no component for one line on one chart.
 */
export function yearLinesOption(
  lines: { year: number; values: (number | null)[] }[],
  unit: string,
  m: Messages,
  reference: { value: number; name: string } | null = null,
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const names = lines.map((line) => String(line.year));
  const series: Record<string, unknown>[] = lines.map((line, index) => {
    const age = lines.length - 1 - index;
    const colour =
      age === 0
        ? YEAR_LINES.newest
        : YEAR_LINES.older[Math.min(age - 1, YEAR_LINES.older.length - 1)];
    return {
      name: String(line.year),
      type: "line",
      connectNulls: false,
      showSymbol: true,
      symbolSize: age === 0 ? 6 : 4,
      // Drawn over the older years rather than under them.
      z: age === 0 ? 3 : 2,
      lineStyle: { color: colour, width: age === 0 ? 2.5 : 1.5 },
      itemStyle: { color: colour },
      data: line.values.map((value) => (value === null ? null : round(value, 2))),
    };
  });
  if (reference !== null) {
    names.push(reference.name);
    series.push({
      name: reference.name,
      type: "line",
      connectNulls: false,
      showSymbol: false,
      symbolSize: 0,
      z: 1,
      lineStyle: { color: YEAR_LINES.reference, width: 1.5, type: "dashed" },
      itemStyle: { color: YEAR_LINES.reference },
      data: Array.from({ length: 12 }, () => round(reference.value, 2)),
    });
  }
  return {
    ...base,
    legend: { data: names, top: 0, textStyle: base.textStyle },
    grid: { ...(base.grid as Record<string, unknown>), top: LEGEND_GRID_TOP },
    xAxis: {
      ...axis,
      type: "category",
      data: Array.from({ length: 12 }, (_, index) => monthName(index + 1, m.charts.locale)),
    },
    // The shape over the years is the point, not the distance from zero.
    yAxis: { ...axis, type: "value", name: unit, scale: true },
    series,
  };
}
