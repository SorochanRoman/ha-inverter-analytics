import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

/**
 * The ECharts pieces this bundle registers.
 *
 * ECharts is tree-shaken, and an option key whose component was never
 * registered is *silently ignored* — no warning, no error, the feature simply
 * does not appear. A legend shipped that way: the option carried it, the unit
 * test asserted it was there, and the chart drew two unlabelled colours.
 */
export const REGISTERED = [
  BarChart,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
];

/**
 * Top-level option keys the registered components can actually render.
 *
 * Kept beside REGISTERED so that adding one without the other is visible in a
 * single diff, and checked against every option builder by the tests.
 */
export const SUPPORTED_OPTION_KEYS: ReadonlySet<string> = new Set([
  // core, no component required
  "backgroundColor",
  "textStyle",
  "color",
  "animation",
  // GridComponent
  "grid",
  "xAxis",
  "yAxis",
  // TooltipComponent
  "tooltip",
  // LegendComponent
  "legend",
  // the charts themselves
  "series",
]);
