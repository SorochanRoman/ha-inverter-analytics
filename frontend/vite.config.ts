import { defineConfig } from "vite";

export default defineConfig({
  // Vite у library mode навмисно НЕ підставляє process.env.NODE_ENV: він
  // очікує, що це зробить бандлер споживача. Home Assistant вантажить наш
  // файл як є, тож без підстановки ECharts падає з
  // "ReferenceError: process is not defined" ще до першого рендеру, і панель
  // лишається порожньою. Жоден тест цього не ловить: vitest працює в Node,
  // де process існує, а typecheck і збірка проходять успішно.
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
