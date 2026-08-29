import { SERIES, chartBaseOption } from "../theme";
import type { Imbalance, LoadPayload, PartSummary } from "../types";

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
    legend: { data: ["Mean", "Peak"], textStyle: base.textStyle },
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
