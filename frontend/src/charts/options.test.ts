import { describe, expect, it } from "vitest";
import { SERIES } from "../theme";
import { SUPPORTED_OPTION_KEYS } from "./registry";
import type { Band, BatteryPayload, Imbalance, LoadPayload, PartSummary } from "../types";
import {
  bandsOption,
  durationCurveOption,
  histogramOption,
  imbalanceOption,
  partsOption,
  socBandsOption,
  socHistogramOption,
} from "./options";

const payload: LoadPayload = {
  coverage: 1,
  rated_power: 8000,
  kpi: {
    mean: 1000, median: 900, p95: 3000, max: 6800,
    fraction_above_80pct: 0.02, max_sustained_15m: 4200,
  },
  histogram: {
    bucket_width: 200,
    clipped_low_seconds: 0,
    clipped_high_seconds: 0,
    buckets: [
      { start: 0, end: 200, seconds: 1800, fraction: 0.5 },
      { start: 200, end: 400, seconds: 1800, fraction: 0.5 },
    ],
  },
  duration_curve: [
    { fraction: 0, value: 6800 },
    { fraction: 1, value: 0 },
  ],
  bands: [
    { key: "0-10", from: 0, to: 0.1, seconds: 900, fraction: 0.25 },
    { key: "100+", from: 1, to: null, seconds: 2700, fraction: 0.75 },
  ],
  overloads: [],
  series: {},
  consistency: {},
  precision: "raw",
  boundary: null,
  window: { start: "2026-08-01T00:00:00+00:00", end: "2026-08-29T00:00:00+00:00" },
  clamped: false,
};

describe("histogramOption", () => {
  it("labels the x axis in watts by default", () => {
    const option = histogramOption(payload, "watts") as any;
    expect(option.xAxis.data).toEqual(["0", "200"]);
  });

  it("labels the x axis as a share of rated power in percent mode", () => {
    const option = histogramOption(payload, "percent") as any;
    expect(option.xAxis.data).toEqual(["0", "2.5"]);
  });

  it("plots the fraction of time, not raw seconds", () => {
    const option = histogramOption(payload, "watts") as any;
    expect(option.series[0].data).toEqual([50, 50]);
  });

  it("survives an empty histogram", () => {
    const empty = {
      ...payload,
      histogram: { bucket_width: 200, clipped_low_seconds: 0, clipped_high_seconds: 0, buckets: [] },
    };
    const option = histogramOption(empty, "watts") as any;
    expect(option.series[0].data).toEqual([]);
  });
});

describe("durationCurveOption", () => {
  it("plots percent of time against power", () => {
    const option = durationCurveOption(payload) as any;
    expect(option.series[0].data).toEqual([[0, 6800], [100, 0]]);
  });
});

describe("bandsOption", () => {
  it("keeps band order and converts fractions to percent", () => {
    const option = bandsOption(payload) as any;
    expect(option.yAxis.data).toEqual(["100+", "0-10"]);
    expect(option.series[0].data).toEqual([75, 25]);
  });

  it("paints the overload band in the overload colour", () => {
    const option = bandsOption(payload) as any;
    // After the reversal, index zero is "100+".
    expect(option.series[0].itemStyle.color({ dataIndex: 0 })).toBe(SERIES.overload);
    expect(option.series[0].itemStyle.color({ dataIndex: 1 })).toBe(SERIES.load);
  });
});

describe("imbalanceOption", () => {
  const imbalance: Imbalance = {
    mean: 0.2,
    p95: 0.5,
    fraction_above: 0.1,
    analysed_seconds: 3600,
    coverage: 0.9,
    threshold: 0.3,
    floor_w: 400,
    below_floor_seconds: 600,
    aligned_coverage: 0.95,
    histogram: [
      { start: 0, end: 0.2, fraction: 0.6 },
      { start: 0.2, end: 0.4, fraction: 0.3 },
      { start: 0.4, end: 0.6, fraction: 0.1 },
    ],
  };

  it("labels the axis in percent and plots the share of time", () => {
    const option = imbalanceOption(imbalance) as any;
    expect(option.xAxis.data).toEqual(["0", "20", "40"]);
    expect(option.series[0].data).toEqual([60, 30, 10]);
  });

  it("colours only the buckets at or above the threshold as a problem", () => {
    const option = imbalanceOption(imbalance) as any;
    const colourOf = option.series[0].itemStyle.color;
    expect(colourOf({ dataIndex: 0 })).toBe(SERIES.load);
    expect(colourOf({ dataIndex: 1 })).toBe(SERIES.load);
    // The 0.4 bucket starts above the 0.3 threshold.
    expect(colourOf({ dataIndex: 2 })).toBe(SERIES.overload);
  });

  it("survives an empty distribution", () => {
    const option = imbalanceOption({ ...imbalance, histogram: [] }) as any;
    expect(option.series[0].data).toEqual([]);
  });
});

describe("partsOption", () => {
  const parts: PartSummary[] = [
    { key: "pv_s1", label: "PV1", index: 1, mean: 1200.4, p95: 3000, peak: 3400, share: 0.6 },
    { key: "pv_s2", label: "PV2", index: 2, mean: 800, p95: 2000, peak: 2600, share: 0.4 },
  ];

  it("plots mean against peak for each part", () => {
    const option = partsOption(parts, SERIES.pv) as any;
    expect(option.xAxis.data).toEqual(["PV1", "PV2"]);
    expect(option.series[0].data).toEqual([1200.4, 800]);
    expect(option.series[1].data).toEqual([3400, 2600]);
  });

  it("keeps a part with no data as a hole rather than a zero", () => {
    const option = partsOption([{ ...parts[0], mean: null, peak: null }], SERIES.pv) as any;
    expect(option.series[0].data).toEqual([null]);
    expect(option.series[1].data).toEqual([null]);
  });
});

describe("partsOption legend", () => {
  it("names the two bars and leaves the plot room for the legend", () => {
    const option = partsOption(
      [{ key: "pv_s1", label: "PV1", index: 1, mean: 1, p95: 2, peak: 3, share: 1 }],
      SERIES.pv,
    ) as any;
    expect(option.legend.data).toEqual(["Mean", "Peak"]);
    expect(option.grid.top).toBeGreaterThan(option.legend.top);
  });
});

describe("option builders against what the bundle registers", () => {
  const parts: PartSummary[] = [
    { key: "pv_s1", label: "PV1", index: 1, mean: 1, p95: 2, peak: 3, share: 1 },
  ];
  const imbalance: Imbalance = {
    mean: 0.2, p95: 0.5, fraction_above: 0.1, analysed_seconds: 60, coverage: 1,
    threshold: 0.3, floor_w: 400, below_floor_seconds: 0, aligned_coverage: 1,
    histogram: [{ start: 0, end: 0.2, fraction: 1 }],
  };

  const built: [string, Record<string, unknown>][] = [
    ["histogram", histogramOption(payload, "watts")],
    ["durationCurve", durationCurveOption(payload)],
    ["bands", bandsOption(payload)],
    ["imbalance", imbalanceOption(imbalance)],
    ["parts", partsOption(parts, SERIES.pv)],
  ];

  it.each(built)("%s uses only keys a registered component can render", (_name, option) => {
    // ECharts ignores an option whose component was never registered, without
    // a word. That is how a legend shipped as two unlabelled bar colours.
    const unsupported = Object.keys(option).filter((key) => !SUPPORTED_OPTION_KEYS.has(key));
    expect(unsupported).toEqual([]);
  });
});

describe("battery charts", () => {
  const battery = {
    low_pct: 20,
    histogram: {
      bucket_width: 5,
      clipped_low_seconds: 0,
      clipped_high_seconds: 0,
      buckets: [
        { start: 0, end: 5, seconds: 60, fraction: 0.1 },
        { start: 15, end: 20, seconds: 60, fraction: 0.2 },
        { start: 20, end: 25, seconds: 60, fraction: 0.7 },
      ],
    },
  } as unknown as BatteryPayload;

  const bands: Band[] = [
    { key: "0-20", from: 0, to: 20, seconds: 60, fraction: 0.1 },
    { key: "80-100", from: 80, to: null, seconds: 540, fraction: 0.9 },
  ];

  it("colours only the buckets at or below the low mark as a warning", () => {
    const option = socHistogramOption(battery) as any;
    const colourOf = option.series[0].itemStyle.color;
    expect(colourOf({ dataIndex: 0 })).toBe(SERIES.overload);
    // Ends exactly at the threshold, so it is still below it.
    expect(colourOf({ dataIndex: 1 })).toBe(SERIES.overload);
    expect(colourOf({ dataIndex: 2 })).toBe(SERIES.battery);
  });

  it("reverses the bands so the highest charge sits at the top", () => {
    const option = socBandsOption(bands) as any;
    expect(option.yAxis.data).toEqual(["80-100", "0-20"]);
    expect(option.series[0].data).toEqual([90, 10]);
    expect(option.series[0].itemStyle.color({ dataIndex: 1 })).toBe(SERIES.overload);
  });

  it("uses only keys a registered component can render", () => {
    for (const option of [socHistogramOption(battery), socBandsOption(bands)]) {
      expect(Object.keys(option).filter((k) => !SUPPORTED_OPTION_KEYS.has(k))).toEqual([]);
    }
  });
});
