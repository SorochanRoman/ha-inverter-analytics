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

// Parameters typed as numbers in en.ts (counts a language inflects by).
const NUMERIC_PARAMS = new Set(["n", "total"]);

/** Calls a dictionary function with every parameter it might read. */
function render(value: unknown): string {
  if (typeof value !== "function") return String(value);
  const sample = new Proxy(
    {},
    {
      get: (_, key) =>
        typeof key === "string" && NUMERIC_PARAMS.has(key)
          ? 3
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
