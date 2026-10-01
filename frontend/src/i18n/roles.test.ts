import { describe, expect, it } from "vitest";
import formEn from "../../../custom_components/inverter_analytics/translations/en.json";
import { en } from "./en";

/**
 * The panel tells the reader which field to map; the field has to exist
 * under that name. These names are the form's own labels, so the two must
 * not drift. (uk.ts is checked against uk.json in the task that adds it.)
 */
describe("role names", () => {
  it("equal the setup form's labels in English", () => {
    const labels = formEn.config.step.manual.data as Record<string, string>;
    for (const [role, name] of Object.entries(en.roles)) {
      expect(name, role).toBe(labels[role]);
    }
  });
});
