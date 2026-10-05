import { describe, expect, it } from "vitest";
import { en } from "./en";
import { uk } from "./uk";

describe("the seasonality sentences that count months", () => {
  it("say one month and several months in English as before", () => {
    expect(en.seasonality.thinMonths({ n: 1, share: "80%" })).toBe(
      "One month is covered by less than 80% of its days and is drawn faded.",
    );
    expect(en.seasonality.thinMonths({ n: 3, share: "80%" })).toBe(
      "3 months are covered by less than 80% of their days and are drawn faded.",
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

describe("the savings card", () => {
  it("names the prices it used: both on a two-zone tariff, one otherwise", () => {
    expect(en.balance.savingsNote({ twoZone: true })).toContain("day and night");
    expect(en.balance.savingsNote({ twoZone: false })).not.toContain("day and night");
    expect(uk.balance.savingsNote({ twoZone: true })).toContain("нічною");
    expect(uk.balance.savingsNote({ twoZone: false })).not.toContain("нічною");
  });

  it("names the missing counters in both languages", () => {
    expect(en.balance.savingsReasons.no_counters({ roles: "X", n: 1 })).toContain("X");
    expect(uk.balance.savingsReasons.no_counters({ roles: "X", n: 2 })).toContain("X");
  });

  it("says the daily figure is over the days counted", () => {
    expect(en.balance.savingsPerDay({ amount: "40 UAH" })).toBe(
      "40 UAH a day on average, over the days counted",
    );
    expect(uk.balance.savingsPerDay({ amount: "40 грн" })).toBe(
      "у середньому 40 грн на день, за враховані дні",
    );
  });

  it("states the coverage share", () => {
    expect(en.balance.savingsCoverage({ share: "50%" })).toContain("50%");
    expect(uk.balance.savingsCoverage({ share: "50%" })).toContain("50%");
  });
});
