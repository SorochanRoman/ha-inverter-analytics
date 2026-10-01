import { describe, expect, it } from "vitest";
import { en } from "./en";
import { uk } from "./uk";

describe("the seasonality sentences that count months", () => {
  it("say one month and several months in English as before", () => {
    expect(en.seasonality.thinMonths({ n: 1, share: "80%" })).toBe(
      "One month is covered by less than 80% of its days and is drawn in grey.",
    );
    expect(en.seasonality.thinMonths({ n: 3, share: "80%" })).toBe(
      "3 months are covered by less than 80% of their days and are drawn in grey.",
    );
    expect(en.seasonality.absentMonths({ n: 1 })).toBe(
      "One month has no recorded data at all and carries no bar.",
    );
    expect(en.seasonality.absentMonths({ n: 9 })).toBe(
      "9 months have no recorded data at all and carry no bar.",
    );
  });

  it("inflect month by the count in Ukrainian", () => {
    expect(uk.seasonality.thinMonths({ n: 1, share: "80%" })).toMatch(/^Один місяць має/);
    expect(uk.seasonality.thinMonths({ n: 21, share: "80%" })).toMatch(/^21 місяць має/);
    expect(uk.seasonality.thinMonths({ n: 3, share: "80%" })).toMatch(/^3 місяці мають/);
    expect(uk.seasonality.thinMonths({ n: 5, share: "80%" })).toMatch(/^5 місяців мають/);
    expect(uk.seasonality.absentMonths({ n: 1 })).toMatch(/^Для одного місяця /);
    expect(uk.seasonality.absentMonths({ n: 4 })).toMatch(/^Для 4 місяців /);
    expect(uk.seasonality.absentMonths({ n: 12 })).toMatch(/^Для 12 місяців /);
  });
});

describe("the balance line", () => {
  it("ends as unaccounted or as more out than in", () => {
    expect(en.balance.unaccountedFor({ share: "4%" })).toBe("unaccounted for (4%).");
    expect(en.balance.moreOutThanIn({ share: "4%" })).toBe("more out than in (4%).");
    expect(uk.balance.moreOutThanIn({ share: "4%" })).toBe("вийшло більше, ніж надійшло (4%).");
  });
});
