import { describe, expect, it } from "vitest";
import { plural } from "./plural";

const day = { one: "день", few: "дні", many: "днів", other: "дня" };

describe("plural", () => {
  it("picks the Ukrainian forms by the rules for one, few and many", () => {
    expect(plural("uk", 1, day)).toBe("день");
    expect(plural("uk", 2, day)).toBe("дні");
    expect(plural("uk", 5, day)).toBe("днів");
    expect(plural("uk", 11, day)).toBe("днів");
    expect(plural("uk", 21, day)).toBe("день");
    expect(plural("uk", 22, day)).toBe("дні");
  });

  it("uses one and other in English", () => {
    const en = { one: "day", other: "days" };
    expect(plural("en", 1, en)).toBe("day");
    expect(plural("en", 2, en)).toBe("days");
  });

  it("falls back to other when a form is not given", () => {
    expect(plural("uk", 5, { one: "a", other: "b" })).toBe("b");
  });
});
