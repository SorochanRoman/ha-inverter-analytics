import { describe, expect, it } from "vitest";
import { cappedListNote } from "./episodes";
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";

describe("cappedListNote", () => {
  it("is absent when the list holds every episode", () => {
    expect(cappedListNote(20, 20)).toBeNull();
    expect(cappedListNote(3, 3)).toBeNull();
    expect(cappedListNote(0, 0)).toBeNull();
  });

  it("names both counts when the total exceeds the list", () => {
    expect(cappedListNote(20, 312)).toEqual({ shown: 20, total: 312 });
  });

  it("is absent when a payload carries no total", () => {
    expect(cappedListNote(20, undefined)).toBeNull();
  });
});

describe("the capped-list sentence", () => {
  it("names how many of how many are shown, in time order", () => {
    expect(en.common.longestShown({ shown: 20, total: 312 })).toBe(
      "The 20 longest of 312 are shown, in time order.",
    );
  });

  it("inflects by the count shown in Ukrainian", () => {
    expect(uk.common.longestShown({ shown: 20, total: 312 })).toBe(
      "Показано 20 найдовших епізодів із 312, за порядком у часі.",
    );
    expect(uk.common.longestShown({ shown: 21, total: 312 })).toContain("21 найдовший епізод із");
    expect(uk.common.longestShown({ shown: 2, total: 312 })).toContain("2 найдовші епізоди із");
  });
});
