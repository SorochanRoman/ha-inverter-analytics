import { describe, expect, it } from "vitest";
import { en } from "./en";
import { uk } from "./uk";

describe("the sizing rules", () => {
  it("say in English what the code tests", () => {
    expect(
      en.sizing.inverterRule({ shortShare: "1%", highShare: "80%", borderlineShare: "5%" }),
    ).toBe(
      "Short when the load reached rated power in more than 1% of hours; borderline on any " +
        "such hour, or reaching 80% of rated in more than 5% of hours.",
    );
    expect(en.sizing.batteryRule({ full: "95%", low: "20%", share: "25%" })).toBe(
      "Counted over days with data: short when the battery filled to 95% and still fell below " +
        "20% on at least 25% of them; borderline when it happened at all; no verdict for a " +
        "span in which it never filled. A day it ran low without filling counts against the " +
        "sun, not the battery.",
    );
    expect(en.sizing.solarRuleWithFill({ enough: "100%", fill: "80%", borderline: "70%" })).toBe(
      "Enough when production is at least 100% of consumption and the battery filled on at " +
        "least 80% of days; borderline from 70% of consumption; short below.",
    );
    expect(en.sizing.solarRule({ enough: "100%", borderline: "70%" })).toBe(
      "Enough when production is at least 100% of consumption; borderline from 70% of " +
        "consumption; short below.",
    );
  });

  it("reads the ceiling and no-export rules in English", () => {
    expect(en.sizing.batteryRuleCeiling({ low: "20%", share: "25%" })).toContain("charge limit");
    expect(
      en.sizing.solarRuleNoExport({ fill: "80%", borderlineFill: "40%", borderline: "70%" }),
    ).toContain("no export");
    expect(en.sizing.batteryRuleCeiling({ low: "20%", share: "25%" })).toBe(
      "Counted over days with data: short when the battery reached its charge limit with the " +
        "sun up and still fell below 20% on at least 25% of them; borderline when it happened " +
        "at all; no verdict for a span in which it never reached its limit. A day it ran low " +
        "without reaching it counts against the sun, not the battery.",
    );
    expect(
      en.sizing.solarRuleNoExport({ fill: "80%", borderlineFill: "40%", borderline: "70%" }),
    ).toBe(
      "With no export, production cannot pass consumption, so the sun is read from the " +
        "battery: enough when it reached its charge limit with the sun up on at least 80% of " +
        "days; borderline from 40% of days, or from 70% of consumption; short below.",
    );
    expect(en.sizing.fullModeCeiling).toBe(
      "Full means the battery reached its own charge limit: the inverter stopped charging " +
        "while the sun was up. A limit set below 100% for the summer still counts.",
    );
    expect(
      en.sizing.fullModeFixed({ full: "95%", roles: "Battery power and PV power", n: 2 }),
    ).toBe(
      "Full means a charge of at least 95%. Map Battery power and PV power to read the " +
        "battery's own limit instead.",
    );
    expect(en.sizing.fullModeNoRows({ full: "95%", roles: "PV power", n: 1 })).toBe(
      "PV power keeps no statistics for this period, so full is the fixed mark of 95%.",
    );
    expect(en.sizing.fullModePlain({ full: "95%" })).toBe("Full means a charge of at least 95%.");
  });

  it("reads the fixed no-export rule in English", () => {
    expect(
      en.sizing.solarRuleNoExportFixed({
        full: "95%",
        fill: "80%",
        borderlineFill: "40%",
        borderline: "70%",
      }),
    ).toBe(
      "With no export, production cannot pass consumption, so the sun is read from the " +
        "battery: enough when it reached 95% on at least 80% of days; borderline from 40% of " +
        "days, or from 70% of consumption; short below.",
    );
  });

  it("keep the ceiling and no-export thresholds in Ukrainian", () => {
    const fixed = uk.sizing.solarRuleNoExportFixed({
      full: "95%",
      fill: "80%",
      borderlineFill: "40%",
      borderline: "70%",
    });
    expect(fixed).toMatch(/^Без експорту/);
    expect(fixed).toContain("до 95%");
    expect(fixed).not.toContain("ліміт");
    expect(fixed).toContain("щонайменше в 80% днів");
    expect(fixed).toContain("від 40% днів");
    expect(fixed).toContain("від 70% споживання");
    const battery = uk.sizing.batteryRuleCeiling({ low: "20%", share: "25%" });
    expect(battery).toContain("ліміту заряду");
    expect(battery).toContain("щонайменше в 25%");
    expect(battery).toContain("нижче 20%");
    const solar = uk.sizing.solarRuleNoExport({
      fill: "80%",
      borderlineFill: "40%",
      borderline: "70%",
    });
    expect(solar).toMatch(/^Без експорту/);
    expect(solar).toContain("щонайменше в 80% днів");
    expect(solar).toContain("від 40% днів");
    expect(solar).toContain("від 70% споживання");
    expect(uk.sizing.fullModeFixed({ full: "95%", roles: "«Потужність СЕС»", n: 1 })).toContain(
      "щонайменше 95%",
    );
    expect(uk.sizing.fullModeNoRows({ full: "95%", roles: "«Потужність СЕС»", n: 1 })).toContain(
      "фіксованою позначкою 95%",
    );
    expect(uk.sizing.fullModePlain({ full: "95%" })).toContain("щонайменше 95%");
    expect(uk.sizing.fullModeCeiling).toContain("ліміту заряду");
  });

  it("keep every threshold in Ukrainian, with the code's strict and inclusive bounds", () => {
    const inverter = uk.sizing.inverterRule({
      shortShare: "1%",
      highShare: "80%",
      borderlineShare: "5%",
    });
    expect(inverter).toContain("в більш ніж 1% годин");
    expect(inverter).toContain("сягало 80% від номінальної в більш ніж 5% годин");
    const battery = uk.sizing.batteryRule({ full: "95%", low: "20%", share: "25%" });
    expect(battery).toContain("щонайменше в 25% із них");
    expect(battery).toContain("зарядилася до 95% і все одно опустилася нижче 20%");
    expect(uk.sizing.solarRuleWithFill({ enough: "100%", fill: "80%", borderline: "70%" })).toBe(
      "Достатньо, якщо генерація становить щонайменше 100% споживання і батарея заряджалася " +
        "повністю щонайменше в 80% днів; на межі — від 70% споживання; замало — якщо менше.",
    );
    expect(uk.sizing.solarRule({ enough: "100%", borderline: "70%" })).not.toContain("батарея");
  });
});

describe("the sizing sentences that count", () => {
  it("say days in English as before", () => {
    expect(en.sizing.daysOf({ days: "3", total: 1 })).toBe("3 of 1 days");
    expect(en.sizing.daysOf({ days: "3", total: 30 })).toBe("3 of 30 days");
  });

  it("put days in the genitive by the total in Ukrainian", () => {
    expect(uk.sizing.daysOf({ days: "0", total: 1 })).toBe("0 з 1 дня");
    expect(uk.sizing.daysOf({ days: "2", total: 3 })).toBe("2 з 3 днів");
    expect(uk.sizing.daysOf({ days: "4", total: 30 })).toBe("4 з 30 днів");
    expect(uk.sizing.daysOf({ days: "4", total: 21 })).toBe("4 з 21 дня");
  });

  it("agree with one role or several in Ukrainian", () => {
    expect(en.sizing.needsNotMapped({ roles: "Load power", n: 1 })).toBe(
      "Needs Load power, not mapped to this inverter.",
    );
    expect(uk.sizing.needsNotMapped({ roles: "«Потужність навантаження»", n: 1 })).toMatch(
      /^Потрібне поле «Потужність навантаження», але .* його не вказано\.$/,
    );
    expect(uk.sizing.needsNotMapped({ roles: "«A» і «B»", n: 2 })).toMatch(
      /^Потрібні поля «A» і «B», але .* їх не вказано\.$/,
    );
  });

  it("speak of one sensor or several without statistics", () => {
    expect(en.sizing.noStatisticsBefore({ sensors: "sensor.a", n: 1 })).toBe(
      "sensor.a keeps no long-term statistics — it has no",
    );
    expect(en.sizing.noStatisticsAfter({ n: 2 })).toBe("— so this card cannot be read from it.");
    expect(uk.sizing.noStatisticsBefore({ sensors: "sensor.a", n: 1 })).toContain("у нього");
    expect(uk.sizing.noStatisticsBefore({ sensors: "sensor.a, sensor.b", n: 2 })).toContain(
      "не зберігають",
    );
    expect(uk.sizing.noStatisticsAfter({ n: 21 })).toContain("з них");
  });
});

describe("the grid sentences", () => {
  it("say missing days in English as before", () => {
    expect(en.grid.missingDays({ n: 1 })).toBe(
      "1 day in this period had no data and is not drawn.",
    );
    expect(en.grid.missingDays({ n: 4 })).toBe(
      "4 days in this period had no data and are not drawn.",
    );
  });

  it("inflect day and the verb by the count in Ukrainian", () => {
    expect(uk.grid.missingDays({ n: 1 })).toBe(
      "1 день цього періоду не має даних і не показаний.",
    );
    expect(uk.grid.missingDays({ n: 21 })).toMatch(/^21 день .* не має /);
    expect(uk.grid.missingDays({ n: 3 })).toMatch(/^3 дні .* не мають /);
    expect(uk.grid.missingDays({ n: 11 })).toMatch(/^11 днів .* не мають /);
  });

  it("keep the long English notes word for word", () => {
    expect(en.grid.inferredBanner).toBe(
      "Inferred from power flows, not measured. A night the battery carries the house with " +
        "nothing crossing the grid connection looks exactly like an outage, and a daytime " +
        "outage the sun covers is not seen at all. Map a sensor that reports grid presence " +
        "to measure instead.",
    );
    expect(en.grid.evidenceNote({ hours: "3 h 0 min" })).toBe(
      "At the rate seen during this period's outages, over the 3 h 0 min the charge spent " +
        "falling to each one's lowest point. Whether a summer afternoon's outage says " +
        "anything about a winter evening's is for the reader to judge; the mean load beside " +
        "it is there to help.",
    );
    expect(en.sizing.greyMonths({ share: "80%" })).toBe(
      "A month drawn in grey was seen for less than 80% of its length; its verdict stands on " +
        "that part alone. The first and last months of a period are almost always partial.",
    );
  });
});

describe("the outage reserve", () => {
  it("reads in English", () => {
    expect(en.grid.hoursLeft).toBe("Hours left");
    expect(en.grid.neededAtStart).toBe("Needed at start");
    expect(en.grid.coveredOf({ covered: 5, judged: 6 })).toBe("5 of 6");
    expect(en.grid.hardestOutageOn({ date: "1 Oct" })).toBe("Outage of 1 Oct");
    expect(en.grid.coveredHint({ level: "20%" })).toBe("Never below 20%");
    expect(en.grid.reserveNote).toContain("from the lowest point");
    expect(en.grid.reserveNote).not.toContain("own rate");
  });

  it("reads in Ukrainian", () => {
    expect(uk.grid.coveredOf({ covered: 5, judged: 6 })).toBe("5 з 6");
    expect(uk.grid.hardestOutageOn({ date: "1 жовт." })).toBe("Відключення 1 жовт.");
    expect(uk.grid.coveredHint({ level: "20%" })).toBe("Ні разу нижче 20%");
    expect(uk.grid.reserveNote).toContain("від найнижчої точки");
    expect(uk.grid.reserveNote).not.toContain("власною швидкістю");
    expect(uk.grid.reserveReasons.no_net_discharge).not.toBe(en.grid.reserveReasons.no_net_discharge);
  });
});
