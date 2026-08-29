import { defineConfig } from "vite";

export default defineConfig({
  // Vite in library mode deliberately does NOT substitute process.env.NODE_ENV:
  // it expects the consuming bundler to do that. Home Assistant loads our
  // file as-is, so without the substitution ECharts throws
  // "ReferenceError: process is not defined" before the first render, and
  // the panel stays empty. No test catches this: vitest runs in Node, where
  // process exists, so typecheck and the build both stay green.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    target: "es2021",
    outDir: "../custom_components/inverter_analytics/frontend/dist",
    emptyOutDir: true,
    lib: {
      entry: "src/panel.ts",
      formats: ["es"],
      fileName: () => "inverter-analytics-panel.js",
    },
  },
});
