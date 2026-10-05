import { describe, expect, it } from "vitest";
import { en } from "./en";
import { uk } from "./uk";

/**
 * The typecheck proves uk.ts has every key; it cannot prove the values are
 * translations. These catch the two ways a key is "done" without being so:
 * left empty, or left in English.
 */

// Identical in both languages on purpose.
const SAME_IN_BOTH = new Set<string>([
  // "part — rule": only punctuation joining two already-translated values.
  "sizing.ruleLine",
]);

type Leaf = { path: string; value: unknown };

function leaves(node: unknown, path = ""): Leaf[] {
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, value]) =>
      leaves(value, path ? `${path}.${key}` : key),
    );
  }
  return [{ path, value: node }];
}

// The numeric params are the fields typed `: number` in en.ts — the counts a
// language inflects by. Every other param is an already-formatted string.
const NUMERIC_PARAMS = new Set([
  "n",
  "total",
  "covered",
  "judged",
  "recent",
  "previous",
  "minHours",
]);

// Counts that land on every plural branch either language has: 1 and 21 are
// Ukrainian "one", 2 is "few", 0, 5 and 11 are "many" (11 despite ending in 1).
const PLURAL_COUNTS = [0, 1, 2, 5, 11, 21];

/** Calls a dictionary function with every parameter it might read. */
function render(value: unknown, count = 3): string {
  if (typeof value !== "function") return String(value);
  const sample = new Proxy(
    {},
    {
      get: (_, key) =>
        typeof key === "string" && NUMERIC_PARAMS.has(key)
          ? count
          : key === "roles"
            ? "A"
            : `«${String(key)}»`,
    },
  );
  return String((value as (p: unknown) => unknown)(sample));
}

const enLeaves = new Map(leaves(en).map((leaf) => [leaf.path, leaf.value]));

describe("the Ukrainian dictionary", () => {
  for (const { path, value } of leaves(uk)) {
    it(`${path} is translated`, () => {
      const text = render(value);
      expect(text.trim()).not.toBe("");
      expect(text).not.toContain("undefined");
      expect(text).not.toContain("NaN");
      if (!SAME_IN_BOTH.has(path)) {
        expect(text).not.toBe(render(enLeaves.get(path)));
      }
    });
  }
});

describe("the English dictionary", () => {
  for (const { path, value } of leaves(en)) {
    it(`${path} renders`, () => {
      const text = render(value);
      expect(text).not.toContain("undefined");
      expect(text).not.toContain("NaN");
    });
  }
});

describe("every plural branch", () => {
  for (const [lang, dict] of [
    ["en", en],
    ["uk", uk],
  ] as const) {
    for (const { path, value } of leaves(dict)) {
      if (typeof value !== "function") continue;
      it(`${lang} ${path} renders at every count`, () => {
        for (const count of PLURAL_COUNTS) {
          const text = render(value, count);
          expect(text.trim()).not.toBe("");
          expect(text).not.toContain("undefined");
          expect(text).not.toContain("NaN");
        }
      });
    }
  }
});
