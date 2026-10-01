import { describe, expect, it } from "vitest";
import formEn from "../../../custom_components/inverter_analytics/translations/en.json";
import formUk from "../../../custom_components/inverter_analytics/translations/uk.json";
import { en } from "./en";
import { uk } from "./uk";

/**
 * The panel tells the reader which field to map; the field has to exist
 * under that name. These names are the form's own labels, so the two must
 * not drift.
 */
describe("role names", () => {
  it("equal the setup form's labels in English", () => {
    const labels = formEn.config.step.manual.data as Record<string, string>;
    for (const [role, name] of Object.entries(en.roles)) {
      expect(name, role).toBe(labels[role]);
    }
  });

  it("equal the setup form's labels in Ukrainian", () => {
    const labels = formUk.config.step.manual.data as Record<string, string>;
    for (const [role, name] of Object.entries(uk.roles)) {
      expect(name, role).toBe(labels[role]);
    }
  });
});
