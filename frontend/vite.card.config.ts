import { defineConfig, transformWithEsbuild, type Plugin } from "vite";

// Vite never minifies whitespace in an ES library build, to keep its pure
// annotations for a later bundler. Home Assistant loads the card as-is and
// on every dashboard, so strip it here: the names and the syntax are
// already minified, and template literals (Lit's html and css) keep their
// text.
function minifyWhitespace(): Plugin {
  return {
    name: "card-minify-whitespace",
    // After Vite's own minify, which would print the whitespace back.
    async generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk") continue;
        const out = await transformWithEsbuild(chunk.code, chunk.fileName, {
          minifyWhitespace: true,
          legalComments: "inline",
          target: "es2021",
        });
        chunk.code = out.code;
      }
    },
  };
}

// The card loads on every dashboard, so it is its own small bundle: no
// ECharts, no panel dictionaries. A second build rather than a second entry
// in the panel's: a multi-entry library build splits the shared lit into a
// chunk file, which the bundle check in CI rejects, and the panel build
// empties the folder first.
export default defineConfig({
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  plugins: [minifyWhitespace()],
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
