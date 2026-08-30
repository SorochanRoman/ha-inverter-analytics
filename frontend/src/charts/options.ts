import { SERIES, chartBaseOption } from "../theme";
import type {
  Band,
  BatteryPayload,
  HourBucket,
  Imbalance,
  LoadPayload,
  MonthBucket,
  MonthHourCell,
  PartSummary,
} from "../types";

const round = (value: number, digits: number): number =>
  Number(value.toFixed(digits));

export function histogramOption(
  payload: LoadPayload,
  mode: "watts" | "percent",
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = payload.histogram.buckets;
  const labels = buckets.map((bucket) =>
    mode === "watts"
      ? String(round(bucket.start, 0))
      : String(round((bucket.start / payload.rated_power) * 100, 1)),
  );

  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: labels,
      name: mode === "watts" ? "W" : "% of rated",
      nameLocation: "end",
    },
    yAxis: { ...axis, type: "value", name: "% of time" },
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

export function durationCurveOption(payload: LoadPayload): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    xAxis: { ...axis, type: "value", name: "% of time", min: 0, max: 100 },
    yAxis: { ...axis, type: "value", name: "W" },
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

export function bandsOption(payload: LoadPayload): Record<string, unknown> {
  // ECharts draws Y-axis categories bottom-up, so the band order is reversed.
  const { base, axis } = chartBaseOption();
  const bands = [...payload.bands].reverse();
  return {
    ...base,
    xAxis: { ...axis, type: "value", name: "% of time", min: 0, max: 100 },
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

export function imbalanceOption(imbalance: Imbalance): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = imbalance.histogram;
  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: buckets.map((bucket) => String(round(bucket.start * 100, 0))),
      name: "% imbalance",
      nameLocation: "end",
    },
    yAxis: { ...axis, type: "value", name: "% of time" },
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
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  return {
    ...base,
    // Two bar colours with nothing naming them is a guess. The shared grid
    // starts 24px from the top, which is exactly where the legend draws, so
    // the plot has to be pushed down to make room for it.
    legend: { data: ["Mean", "Peak"], top: 0, textStyle: base.textStyle },
    grid: { ...(base.grid as Record<string, unknown>), top: 48 },
    xAxis: { ...axis, type: "category", data: parts.map((part) => part.label) },
    yAxis: { ...axis, type: "value", name: "W" },
    series: [
      {
        name: "Mean",
        type: "bar",
        data: parts.map((part) => (part.mean === null ? null : round(part.mean, 1))),
        itemStyle: { color: colour },
      },
      {
        name: "Peak",
        type: "bar",
        data: parts.map((part) => (part.peak === null ? null : round(part.peak, 1))),
        itemStyle: { color: SERIES.muted },
      },
    ],
  };
}

export function socHistogramOption(payload: BatteryPayload): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const buckets = payload.histogram.buckets;
  return {
    ...base,
    xAxis: {
      ...axis,
      type: "category",
      data: buckets.map((bucket) => String(round(bucket.start, 0))),
      name: "% charge",
      nameLocation: "end",
    },
    yAxis: { ...axis, type: "value", name: "% of time" },
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

export function socBandsOption(bands: Band[]): Record<string, unknown> {
  // ECharts draws Y-axis categories bottom-up, so the band order is reversed.
  const { base, axis } = chartBaseOption();
  const ordered = [...bands].reverse();
  return {
    ...base,
    xAxis: { ...axis, type: "value", name: "% of time", min: 0, max: 100 },
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

/** Shortens 2026-03 to Mar, keeping the year only where it turns over. */
export function monthLabel(key: string, previous?: string): string {
  const [year, month] = key.split("-").map(Number);
  const name = new Date(Date.UTC(2000, month - 1, 1)).toLocaleDateString("en", { month: "short" });
  return previous && previous.slice(0, 4) === String(year) ? name : `${name} ${year}`;
}

export function monthlyOption(months: MonthBucket[], hasPv: boolean): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const labels = months.map((month, index) => monthLabel(month.key, months[index - 1]?.key));

  const series: Record<string, unknown>[] = [
    {
      name: "Load",
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
      name: "PV",
      type: "bar",
      data: months.map((month) => (month.pv_mean === null ? null : round(month.pv_mean, 1))),
      itemStyle: { color: SERIES.pv },
    });
  }

  return {
    ...base,
    legend: hasPv ? { data: ["Load", "PV"], top: 0, textStyle: base.textStyle } : undefined,
    grid: { ...(base.grid as Record<string, unknown>), top: hasPv ? 48 : 24 },
    xAxis: { ...axis, type: "category", data: labels },
    yAxis: { ...axis, type: "value", name: "W" },
    series,
  };
}

export function hourOfDayOption(hours: HourBucket[], hasPv: boolean): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const series: Record<string, unknown>[] = [
    {
      name: "Load",
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
      name: "PV",
      type: "line",
      showSymbol: false,
      lineStyle: { color: SERIES.pv },
      itemStyle: { color: SERIES.pv },
      data: hours.map((hour) => (hour.pv_mean === null ? null : round(hour.pv_mean, 1))),
    });
  }
  return {
    ...base,
    legend: hasPv ? { data: ["Load", "PV"], top: 0, textStyle: base.textStyle } : undefined,
    grid: { ...(base.grid as Record<string, unknown>), top: hasPv ? 48 : 24 },
    xAxis: {
      ...axis,
      type: "category",
      data: hours.map((hour) => String(hour.hour)),
      name: "hour",
      nameLocation: "end",
    },
    yAxis: { ...axis, type: "value", name: "W" },
    series,
  };
}

export function monthHourHeatmapOption(
  cells: MonthHourCell[],
  months: MonthBucket[],
): Record<string, unknown> {
  const { base, axis } = chartBaseOption();
  const keys = months.map((month) => month.key);
  const labels = keys.map((key, index) => monthLabel(key, keys[index - 1]));
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
      name: "hour",
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
