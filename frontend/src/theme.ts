/** Fixed series palette: identical colours across all tabs. */
export const SERIES = {
  load: "#2f7ed8",
  pv: "#f7b32b",
  battery: "#2fa84f",
  grid: "#8a8f98",
  overload: "#d64545",
  muted: "#b0b6bf",
} as const;

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
      grid: { left: 56, right: 24, top: 24, bottom: 40, containLabel: true },
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
