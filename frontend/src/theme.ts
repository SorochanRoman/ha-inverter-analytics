/** Fixed series palette: identical colours across all tabs. */
export const SERIES = {
  load: "#2f7ed8",
  pv: "#f7b32b",
  battery: "#2fa84f",
  grid: "#8a8f98",
  overload: "#d64545",
  muted: "#b0b6bf",
  // The outbound half of each two-way flow. Paired with its inbound colour by
  // family so grid and battery each read as one thing going two ways, and
  // distinct enough that the legend does not put two greys side by side.
  gridExport: "#4aa3a3",
  batteryCharge: "#8fd19e",
} as const;

/**
 * The year-lines charts: the newest year in the accent, older years in greys
 * that fade with age, so the year being read stands out and the ones behind
 * it stay in order. Five greys cover the six calendar years five years of
 * history can touch; an older year beyond them takes the last.
 */
export const YEAR_LINES = {
  newest: SERIES.load,
  older: ["#7d8590", "#a0a6ae", "#bcc1c8", "#d0d4d9", "#e0e3e7"],
  // A fixed reference beside the years, dashed: the battery's nameplate, in
  // the battery's colour rather than an alarm colour, since it is no target.
  reference: SERIES.battery,
} as const;

/*
 * Room for the axis names. ECharts' containLabel makes room for the tick
 * labels and not for the axis names: a y-axis name sits nameGap (15 px) above
 * the plot in a 12 px font, so a grid that starts closer to the top than
 * that cuts the name off. Under a legend the plot also has to clear the
 * legend, which wraps to a second row on a narrow screen.
 */
const AXIS_NAME_TOP = 40;
export const LEGEND_GRID_TOP = 64;

/**
 * Where an x-axis name goes: centred under the tick labels. At the end of
 * the axis it starts nameGap to the right of the plot and runs off the
 * canvas, however long the language makes it.
 */
export const X_AXIS_NAME = { nameLocation: "middle", nameGap: 28 } as const;

/**
 * Shared base for ECharts options: transparent background and colours taken
 * from the Home Assistant theme. Returns base and axis separately because
 * each chart defines its own axes, and the axis styles need to be merged
 * into them rather than overwriting them.
 */
export function chartBaseOption(): {
  base: Record<string, unknown>;
  axis: Record<string, unknown>;
} {
  // Option-builder tests run in a Node environment without a DOM, so reading
  // theme variables must be optional rather than throwing.
  const style =
    typeof document === "undefined" ? null : getComputedStyle(document.documentElement);
  const text = style?.getPropertyValue("--primary-text-color").trim() || "#212121";
  const line = style?.getPropertyValue("--divider-color").trim() || "#e0e0e0";
  return {
    base: {
      backgroundColor: "transparent",
      textStyle: { color: text, fontFamily: "inherit" },
      grid: { left: 56, right: 24, top: AXIS_NAME_TOP, bottom: 40, containLabel: true },
      tooltip: { trigger: "axis" },
    },
    axis: {
      axisLine: { lineStyle: { color: line } },
      axisLabel: { color: text },
      splitLine: { lineStyle: { color: line } },
      nameTextStyle: { color: text },
    },
  };
}
