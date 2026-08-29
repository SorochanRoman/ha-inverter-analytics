import { SERIES, chartBaseOption } from "../theme";
import type { LoadPayload } from "../types";

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
      name: mode === "watts" ? "Вт" : "% номіналу",
      nameLocation: "end",
    },
    yAxis: { ...axis, type: "value", name: "% часу" },
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
    xAxis: { ...axis, type: "value", name: "% часу", min: 0, max: 100 },
    yAxis: { ...axis, type: "value", name: "Вт" },
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
  // ECharts малює категорії осі Y знизу вгору, тому порядок смуг перевернутий.
  const { base, axis } = chartBaseOption();
  const bands = [...payload.bands].reverse();
  return {
    ...base,
    xAxis: { ...axis, type: "value", name: "% часу", min: 0, max: 100 },
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
