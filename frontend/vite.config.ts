import { defineConfig } from "vite";

export default defineConfig({
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
