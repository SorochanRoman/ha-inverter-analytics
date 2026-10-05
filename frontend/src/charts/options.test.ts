import { describe, expect, it } from "vitest";
import { SERIES, YEAR_LINES } from "../theme";
import { en } from "../i18n/en";
import { uk } from "../i18n/uk";
import { SUPPORTED_OPTION_KEYS } from "./registry";
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
import {
  bandsOption,
  dailyFlowsOption,
  durationCurveOption,
  flowBarsOption,
  histogramOption,
  hourOfDayOption,
  imbalanceOption,
  monthHourHeatmapOption,
  monthLabel,
  monthlyOption,
  outageDaysOption,
  outageHoursOption,
  partsOption,
  socBandsOption,
  socHistogramOption,
  yearLinesOption,
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
  overloads_total: 0,
  series: {},
  consistency: {},
  precision: "raw",
  boundary: null,
  window: { start: "2026-08-01T00:00:00+00:00", end: "2026-08-29T00:00:00+00:00" },
  clamped: false,
};

describe("histogramOption", () => {
  it("labels the x axis in watts by default", () => {
    const option = histogramOption(payload, "watts", en) as any;
    expect(option.xAxis.data).toEqual(["0", "200"]);
  });

  it("labels the x axis as a share of rated power in percent mode", () => {
    const option = histogramOption(payload, "percent", en) as any;
    expect(option.xAxis.data).toEqual(["0", "2.5"]);
  });

  it("plots the fraction of time, not raw seconds", () => {
    const option = histogramOption(payload, "watts", en) as any;
    expect(option.series[0].data).toEqual([50, 50]);
  });

  it("survives an empty histogram", () => {
    const empty = {
      ...payload,
      histogram: { bucket_width: 200, clipped_low_seconds: 0, clipped_high_seconds: 0, buckets: [] },
    };
    const option = histogramOption(empty, "watts", en) as any;
    expect(option.series[0].data).toEqual([]);
  });
});

describe("durationCurveOption", () => {
  it("plots percent of time against power", () => {
    const option = durationCurveOption(payload, en) as any;
    expect(option.series[0].data).toEqual([[0, 6800], [100, 0]]);
  });
});

describe("bandsOption", () => {
  it("keeps band order and converts fractions to percent", () => {
    const option = bandsOption(payload, en) as any;
    expect(option.yAxis.data).toEqual(["100+", "0-10"]);
    expect(option.series[0].data).toEqual([75, 25]);
  });

  it("paints the overload band in the overload colour", () => {
    const option = bandsOption(payload, en) as any;
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
    const option = imbalanceOption(imbalance, en) as any;
    expect(option.xAxis.data).toEqual(["0", "20", "40"]);
    expect(option.series[0].data).toEqual([60, 30, 10]);
  });

  it("colours only the buckets at or above the threshold as a problem", () => {
    const option = imbalanceOption(imbalance, en) as any;
    const colourOf = option.series[0].itemStyle.color;
    expect(colourOf({ dataIndex: 0 })).toBe(SERIES.load);
    expect(colourOf({ dataIndex: 1 })).toBe(SERIES.load);
    // The 0.4 bucket starts above the 0.3 threshold.
    expect(colourOf({ dataIndex: 2 })).toBe(SERIES.overload);
  });

  it("survives an empty distribution", () => {
    const option = imbalanceOption({ ...imbalance, histogram: [] }, en) as any;
    expect(option.series[0].data).toEqual([]);
  });
});

describe("partsOption", () => {
  const parts: PartSummary[] = [
    { key: "pv_s1", label: "PV1", index: 1, mean: 1200.4, p95: 3000, peak: 3400, share: 0.6 },
    { key: "pv_s2", label: "PV2", index: 2, mean: 800, p95: 2000, peak: 2600, share: 0.4 },
  ];

  it("plots mean against peak for each part", () => {
    const option = partsOption(parts, SERIES.pv, en) as any;
    expect(option.xAxis.data).toEqual(["PV1", "PV2"]);
    expect(option.series[0].data).toEqual([1200.4, 800]);
    expect(option.series[1].data).toEqual([3400, 2600]);
  });

  it("names positional parts on the axis in the panel language", () => {
    const positional: PartSummary[] = [
      { ...parts[0], key: "pv_p1", label: "String 1", index: null },
      { ...parts[1], key: "pv_p2", label: "String 2", index: null },
    ];
    expect((partsOption(positional, SERIES.pv, en) as any).xAxis.data).toEqual([
      "String 1",
      "String 2",
    ]);
    expect((partsOption(positional, SERIES.pv, uk) as any).xAxis.data).toEqual([
      "Стрінг 1",
      "Стрінг 2",
    ]);
  });

  it("keeps a part with no data as a hole rather than a zero", () => {
    const option = partsOption([{ ...parts[0], mean: null, peak: null }], SERIES.pv, en) as any;
    expect(option.series[0].data).toEqual([null]);
    expect(option.series[1].data).toEqual([null]);
  });
});

describe("partsOption legend", () => {
  it("names the two bars and leaves the plot room for the legend", () => {
    const option = partsOption(
      [{ key: "pv_s1", label: "PV1", index: 1, mean: 1, p95: 2, peak: 3, share: 1 }],
      SERIES.pv,
      en,
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
    ["histogram", histogramOption(payload, "watts", en)],
    ["durationCurve", durationCurveOption(payload, en)],
    ["bands", bandsOption(payload, en)],
    ["imbalance", imbalanceOption(imbalance, en)],
    ["parts", partsOption(parts, SERIES.pv, en)],
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
    const option = socHistogramOption(battery, en) as any;
    const colourOf = option.series[0].itemStyle.color;
    expect(colourOf({ dataIndex: 0 })).toBe(SERIES.overload);
    // Ends exactly at the threshold, so it is still below it.
    expect(colourOf({ dataIndex: 1 })).toBe(SERIES.overload);
    expect(colourOf({ dataIndex: 2 })).toBe(SERIES.battery);
  });

  it("reverses the bands so the highest charge sits at the top", () => {
    const option = socBandsOption(bands, en) as any;
    expect(option.yAxis.data).toEqual(["80-100", "0-20"]);
    expect(option.series[0].data).toEqual([90, 10]);
    expect(option.series[0].itemStyle.color({ dataIndex: 1 })).toBe(SERIES.overload);
  });

  it("uses only keys a registered component can render", () => {
    for (const option of [socHistogramOption(battery, en), socBandsOption(bands, en)]) {
      expect(Object.keys(option).filter((k) => !SUPPORTED_OPTION_KEYS.has(k))).toEqual([]);
    }
  });
});

describe("seasonality charts", () => {
  const months: MonthBucket[] = [
    { key: "2025-12", load_mean: 3000, load_peak_hourly: 5000, pv_mean: 200,
      seconds: 100, month_seconds: 100, coverage: 1, complete: true },
    { key: "2026-01", load_mean: 3200, load_peak_hourly: 5200, pv_mean: 250,
      seconds: 10, month_seconds: 100, coverage: 0.1, complete: false },
  ];
  const hours: HourBucket[] = Array.from({ length: 24 }, (_, hour) => ({
    hour, load_mean: 1000 + hour, pv_mean: hour * 10, seconds: 3600,
  }));
  const cells: MonthHourCell[] = [
    { month: "2025-12", hour: 18, load_mean: 4000, seconds: 3600 },
    { month: "2026-01", hour: 12, load_mean: 2000, seconds: 3600 },
    { month: "1999-01", hour: 0, load_mean: 1, seconds: 3600 },
  ];

  it("labels the year only where it turns over", () => {
    expect(monthLabel("2025-12", undefined, "en")).toBe("Dec 2025");
    expect(monthLabel("2026-01", "2025-12", "en")).toBe("Jan 2026");
    expect(monthLabel("2026-02", "2026-01", "en")).toBe("Feb");
  });

  it("greys an incomplete month rather than dropping it", () => {
    const option = monthlyOption(months, false, en) as any;
    const colourOf = option.series[0].itemStyle.color;
    expect(option.series[0].data).toEqual([3000, 3200]);
    expect(colourOf({ dataIndex: 0 })).toBe(SERIES.load);
    expect(colourOf({ dataIndex: 1 })).toBe(SERIES.muted);
  });

  it("adds a PV series only when there is PV", () => {
    expect((monthlyOption(months, false, en) as any).series).toHaveLength(1);
    expect((monthlyOption(months, true, en) as any).series).toHaveLength(2);
    expect((hourOfDayOption(hours, true, en) as any).series).toHaveLength(2);
  });

  it("maps heat-map cells onto the month axis and ignores strays", () => {
    const option = monthHourHeatmapOption(cells, months, en) as any;
    // The 1999 cell belongs to no column on this axis and must not shift the rest.
    expect(option.series[0].data).toEqual([[0, 18, 4000], [1, 12, 2000]]);
    expect(option.visualMap.min).toBe(2000);
    expect(option.visualMap.max).toBe(4000);
  });

  it("survives having no cells at all", () => {
    const option = monthHourHeatmapOption([], months, en) as any;
    expect(option.series[0].data).toEqual([]);
    expect(option.visualMap.max).toBe(1);
  });

  it("uses only keys a registered component can render", () => {
    const built = [
      monthlyOption(months, true, en),
      hourOfDayOption(hours, true, en),
      monthHourHeatmapOption(cells, months, en),
    ];
    for (const option of built) {
      const unsupported = Object.keys(option)
        .filter((key) => option[key as keyof typeof option] !== undefined)
        .filter((key) => !SUPPORTED_OPTION_KEYS.has(key));
      expect(unsupported).toEqual([]);
    }
  });

  describe("in Ukrainian", () => {
    it("names the axes and series in Ukrainian", () => {
      const option = monthlyOption(months, true, uk) as { legend: { data: string[] } };
      expect(option.legend.data).toEqual([uk.charts.load, uk.charts.pv]);
    });

    it("shortens month names in the panel's locale", () => {
      expect(monthLabel("2026-03", undefined, "uk")).toBe(
        `${new Date(Date.UTC(2000, 2, 1)).toLocaleDateString("uk", { month: "short" })} 2026`,
      );
    });
  });
});

describe("balance charts", () => {
  const SOURCES = ["pv_energy_total", "grid_import_total", "battery_discharge_total"];
  const SINKS = ["load_energy_total", "grid_export_total", "battery_charge_total"];
  const totals = {
    pv_energy_total: 10, grid_import_total: 1, battery_discharge_total: 1,
    load_energy_total: 8, grid_export_total: 1, battery_charge_total: 2,
  };
  const days: BalanceDay[] = [
    { day: "2026-06-01", flows: { pv_energy_total: 5, load_energy_total: 4 } },
    { day: "2026-06-02", flows: { pv_energy_total: 5 } },
  ];

  it("stacks each side onto its own bar", () => {
    const option = flowBarsOption(totals, SOURCES, SINKS, en) as any;
    const stacks = Object.fromEntries(option.series.map((s: any) => [s.name, s.stack]));
    expect(stacks["Solar"]).toBe("in");
    expect(stacks["House"]).toBe("out");
    // Row 1 is "In" and row 0 is "Out": a source must not appear on the out bar.
    const solar = option.series.find((s: any) => s.name === "Solar");
    expect(solar.data).toEqual([null, 10]);
    const house = option.series.find((s: any) => s.name === "House");
    expect(house.data).toEqual([8, null]);
  });

  it("leaves out a flow that is not mapped", () => {
    const partial = { pv_energy_total: 10, load_energy_total: 8 };
    const option = flowBarsOption(partial, SOURCES, SINKS, en) as any;
    expect(option.series.map((s: any) => s.name)).toEqual(["Solar", "House"]);
  });

  it("keeps a day without a counter as a hole rather than a zero", () => {
    const option = dailyFlowsOption(days, SOURCES, SINKS, en) as any;
    const house = option.series.find((s: any) => s.name === "House");
    expect(house.data).toEqual([4, null]);
  });

  it("drops a series no day has any accounting for", () => {
    const option = dailyFlowsOption(days, SOURCES, SINKS, en) as any;
    expect(option.series.map((s: any) => s.name)).toEqual(["Solar", "House"]);
  });

  it("keeps a day's sources and sinks on separate stacks", () => {
    // One stack would add a day's production to its consumption and draw a
    // column whose height counts the same energy twice.
    const option = dailyFlowsOption(days, SOURCES, SINKS, en) as any;
    const stacks = Object.fromEntries(option.series.map((s: any) => [s.name, s.stack]));
    expect(stacks["Solar"]).toBe("in");
    expect(stacks["House"]).toBe("out");
  });

  it("uses only keys a registered component can render", () => {
    const built = [
      flowBarsOption(totals, SOURCES, SINKS, en),
      dailyFlowsOption(days, SOURCES, SINKS, en),
    ];
    for (const option of built) {
      expect(Object.keys(option).filter((k) => !SUPPORTED_OPTION_KEYS.has(k))).toEqual([]);
    }
  });
});

describe("flow colours", () => {
  it("gives every flow a colour of its own", () => {
    // Two greys sat side by side in the legend for the two grid directions,
    // and charging the battery was drawn in the red that means a fault here.
    const totals = Object.fromEntries(Object.keys(en.charts.flows).map((role) => [role, 1]));
    const option = flowBarsOption(
      totals,
      ["pv_energy_total", "grid_import_total", "battery_discharge_total"],
      ["load_energy_total", "grid_export_total", "battery_charge_total"],
      en,
    ) as any;

    const colours = option.series.map((s: any) => s.itemStyle.color);
    expect(new Set(colours).size).toBe(colours.length);
    expect(colours).not.toContain(SERIES.overload);
  });
});

describe("outage charts", () => {
  const days: GridDay[] = [
    { day: "2026-01-01", off_seconds: 7200, measured_seconds: 86400, count: 2 },
    { day: "2026-01-02", off_seconds: 0, measured_seconds: 86400, count: 0 },
  ];
  const hours: GridHour[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    off_seconds: hour === 20 ? 1800 : 0,
    measured_seconds: hour === 5 ? 0 : 3600,
  }));

  it("draws hours without grid per day, in the overload colour", () => {
    const option = outageDaysOption(days, en);
    const series = option.series as { data: unknown[]; itemStyle: { color: string } }[];
    expect(series[0].data).toEqual([2, 0]);
    expect(series[0].itemStyle.color).toBe(SERIES.overload);
    expect((option.xAxis as { data: string[] }).data).toEqual(["01-01", "01-02"]);
  });

  it("names the outages that began on a day in the tooltip", () => {
    // The count is the second by-day requirement and has no axis of its own.
    const tooltip = outageDaysOption(days, en).tooltip as {
      formatter: (params: { name: string; value: number; dataIndex: number }[]) => string;
    };
    const text = tooltip.formatter([{ name: "01-01", value: 2, dataIndex: 0 }]);
    expect(text).toContain("01-01");
    expect(text).toContain("2 h");
    expect(text).toContain("2 outages began");
    const quiet = tooltip.formatter([{ name: "01-02", value: 0, dataIndex: 1 }]);
    expect(quiet).toContain("no outages began");
  });

  it("draws the share of measured time per hour, with an unmeasured hour left empty", () => {
    const option = outageHoursOption(hours, en);
    const data = (option.series as { data: (number | null)[] }[])[0].data;
    expect(data[20]).toBe(50);
    expect(data[5]).toBeNull();
    expect(data[0]).toBe(0);
  });

  it("uses only keys the registered components can render", () => {
    for (const option of [outageDaysOption(days, en), outageHoursOption(hours, en)]) {
      for (const key of Object.keys(option)) {
        expect(SUPPORTED_OPTION_KEYS.has(key), key).toBe(true);
      }
    }
  });
});

describe("chart words in Ukrainian", () => {
  it("names the flows, units and outage counts in Ukrainian", () => {
    const option = flowBarsOption(
      { pv_energy_total: 1, load_energy_total: 1 },
      ["pv_energy_total"],
      ["load_energy_total"],
      uk,
    ) as any;
    expect(option.legend.data).toEqual([
      uk.charts.flows.pv_energy_total,
      uk.charts.flows.load_energy_total,
    ]);
    expect(option.xAxis.name).toBe(uk.units.kwh);

    const days: GridDay[] = [
      { day: "2026-01-01", off_seconds: 7200, measured_seconds: 86400, count: 2 },
      { day: "2026-01-02", off_seconds: 0, measured_seconds: 86400, count: 5 },
      { day: "2026-01-03", off_seconds: 0, measured_seconds: 86400, count: 0 },
      { day: "2026-01-04", off_seconds: 5400, measured_seconds: 86400, count: 1 },
    ];
    const tooltip = outageDaysOption(days, uk).tooltip as {
      formatter: (params: { name: string; value: number; dataIndex: number }[]) => string;
    };
    expect(tooltip.formatter([{ name: "01-01", value: 2, dataIndex: 0 }])).toContain(
      "2 відключення",
    );
    expect(tooltip.formatter([{ name: "01-02", value: 0, dataIndex: 1 }])).toContain(
      "5 відключень",
    );
    expect(tooltip.formatter([{ name: "01-03", value: 0, dataIndex: 2 }])).toContain(
      "жодне відключення не почалося",
    );
    expect(tooltip.formatter([{ name: "01-04", value: 1.5, dataIndex: 3 }])).toContain("1,5 год");
    expect(tooltip.formatter([{ name: "01-04", value: 1.5, dataIndex: 3 }])).toContain(
      "1 відключення почалося",
    );
  });

  it("writes decimals with a comma in Ukrainian", () => {
    const option = histogramOption(payload, "percent", uk) as any;
    expect(option.xAxis.data).toEqual(["0", "2,5"]);
  });
});

describe("year lines", () => {
  const lines = [
    { year: 2023, values: [null, null, 10.4, 10.2, ...Array(8).fill(10)] },
    { year: 2024, values: [9.9, null, 9.8, ...Array(9).fill(9.7)] },
    { year: 2025, values: [9.5, 9.4, 9.3, ...Array(9).fill(null)] },
  ];

  it("draws one line per year with a legend by year", () => {
    const option = yearLinesOption(lines, en.units.kwh, en) as any;
    expect(option.series.map((series: any) => series.name)).toEqual(["2023", "2024", "2025"]);
    expect(option.legend.data).toEqual(["2023", "2024", "2025"]);
    expect(option.series.every((series: any) => series.type === "line")).toBe(true);
    expect(option.yAxis.name).toBe("kWh");
  });

  it("keeps a gap a gap", () => {
    const option = yearLinesOption(lines, en.units.kwh, en) as any;
    expect(option.series.every((series: any) => series.connectNulls === false)).toBe(true);
    expect(option.series[1].data[1]).toBeNull();
    expect(option.series[2].data.slice(2, 4)).toEqual([9.3, null]);
  });

  it("gives the newest year the accent and older years quiet colours", () => {
    const option = yearLinesOption(lines, en.units.kwh, en) as any;
    const colours = option.series.map((series: any) => series.lineStyle.color);
    expect(colours[2]).toBe(YEAR_LINES.newest);
    expect(colours[1]).toBe(YEAR_LINES.older[0]);
    expect(colours[0]).toBe(YEAR_LINES.older[1]);
  });

  it("names the twelve months in the panel's locale", () => {
    const english = yearLinesOption(lines, en.units.kwh, en) as any;
    expect(english.xAxis.data).toHaveLength(12);
    expect(english.xAxis.data[0]).toBe("Jan");
    expect(english.xAxis.data[11]).toBe("Dec");
    const ukrainian = yearLinesOption(lines, uk.units.kwh, uk) as any;
    expect(ukrainian.xAxis.data[2]).toBe(
      new Date(Date.UTC(2000, 2, 1)).toLocaleDateString("uk", { month: "short" }),
    );
    expect(ukrainian.yAxis.name).toBe("кВт·год");
  });

  it("survives more years than quiet colours, and none at all", () => {
    const many = Array.from({ length: 8 }, (_, index) => ({
      year: 2018 + index,
      values: Array(12).fill(1),
    }));
    const option = yearLinesOption(many, "h", en) as any;
    expect(option.series.every((series: any) => typeof series.lineStyle.color === "string")).toBe(
      true,
    );
    expect((yearLinesOption([], "h", en) as any).series).toEqual([]);
  });

  it("draws a reference as a flat dashed line with its own legend entry", () => {
    const option = yearLinesOption(lines, en.units.kwh, en, {
      value: 10.24,
      name: "Nameplate 10.2 kWh",
    }) as any;
    expect(option.series).toHaveLength(4);
    expect(option.legend.data).toEqual(["2023", "2024", "2025", "Nameplate 10.2 kWh"]);
    const reference = option.series[3];
    expect(reference.data).toEqual(Array(12).fill(10.24));
    expect(reference.lineStyle.type).toBe("dashed");
    expect(reference.lineStyle.color).toBe(YEAR_LINES.reference);
    expect(reference.showSymbol).toBe(false);
    // Without one, the years alone.
    expect((yearLinesOption(lines, en.units.kwh, en, null) as any).series).toHaveLength(3);
  });

  it("uses only keys a registered component can render", () => {
    const option = yearLinesOption(lines, en.units.kwh, en, { value: 10, name: "N" });
    const unsupported = Object.keys(option)
      .filter((key) => option[key] !== undefined)
      .filter((key) => !SUPPORTED_OPTION_KEYS.has(key));
    expect(unsupported).toEqual([]);
  });
});

describe("room for the axis names", () => {
  // ECharts' containLabel makes room for the tick labels, not for the axis
  // names: a y-axis name sits nameGap (15 px) above the plot in a 12 px font,
  // and an x-axis name at the end of its axis runs off the right edge.
  const months: MonthBucket[] = [
    { key: "2025-12", load_mean: 3000, load_peak_hourly: 5000, pv_mean: 200,
      seconds: 100, month_seconds: 100, coverage: 1, complete: true },
  ];
  const hours: HourBucket[] = [{ hour: 0, load_mean: 1, pv_mean: 1, seconds: 3600 }];
  const imbalance: Imbalance = {
    mean: 0.2, p95: 0.5, fraction_above: 0.1, analysed_seconds: 60, coverage: 1,
    threshold: 0.3, floor_w: 400, below_floor_seconds: 0, aligned_coverage: 1,
    histogram: [{ start: 0, end: 0.2, fraction: 1 }],
  };
  const battery = {
    low_pct: 20,
    histogram: { bucket_width: 5, clipped_low_seconds: 0, clipped_high_seconds: 0, buckets: [] },
  } as unknown as BatteryPayload;
  const flows = ["pv_energy_total"];
  const built: [string, any][] = [
    ["histogram", histogramOption(payload, "percent", uk)],
    ["durationCurve", durationCurveOption(payload, uk)],
    ["bands", bandsOption(payload, uk)],
    ["imbalance", imbalanceOption(imbalance, uk)],
    ["parts", partsOption([], SERIES.pv, uk)],
    ["socHistogram", socHistogramOption(battery, uk)],
    ["socBands", socBandsOption([], uk)],
    ["monthly", monthlyOption(months, false, uk)],
    ["monthlyPv", monthlyOption(months, true, uk)],
    ["hourOfDay", hourOfDayOption(hours, false, uk)],
    ["hourOfDayPv", hourOfDayOption(hours, true, uk)],
    ["heatmap", monthHourHeatmapOption([], months, uk)],
    ["flowBars", flowBarsOption({ pv_energy_total: 1 }, flows, [], uk)],
    ["dailyFlows", dailyFlowsOption([], flows, [], uk)],
    ["outageDays", outageDaysOption([], uk)],
    ["outageHours", outageHoursOption([], uk)],
    ["yearLines", yearLinesOption([{ year: 2025, values: [] }], uk.units.kwh, uk)],
  ];

  it.each(built)("%s leaves a y-axis name room above the plot", (_name, option) => {
    if (!option.yAxis.name) return;
    // 15 px gap + a 12 px line + a margin; under a legend, the legend's two
    // rows on a narrow screen as well.
    const needed = option.legend ? 64 : 40;
    expect(option.grid.top).toBeGreaterThanOrEqual(needed);
  });

  it.each(built)("%s centres an x-axis name under the axis", (_name, option) => {
    if (!option.xAxis.name) return;
    expect(option.xAxis.nameLocation).toBe("middle");
    expect(option.xAxis.nameGap).toBeGreaterThanOrEqual(24);
  });
});
