import { defineConfig } from "vite";

// The card loads on every dashboard, so it is its own small bundle: no
// ECharts, no panel dictionaries. A second build rather than a second entry
// in the panel's: a multi-entry library build splits the shared lit into a
// chunk file, which the bundle check in CI rejects, and the panel build
// empties the folder first.
export default defineConfig({
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    target: "es2021",
    outDir: "../custom_components/inverter_analytics/frontend/dist",
    emptyOutDir: false,
    lib: {
      entry: "src/card.ts",
      formats: ["es"],
      fileName: () => "inverter-analytics-card.js",
    },
  },
});
