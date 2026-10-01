# Ukrainian Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The whole panel in English or Ukrainian behind an `EN | UK` switch, and the integration's forms in Ukrainian through `translations/uk.json`; then release 0.6.0.

**Architecture:** Typed dictionaries in `frontend/src/i18n/` (`en.ts` is the reference, `uk.ts: Messages = typeof en`), a tiny store that resolves the language (stored choice, else Home Assistant's profile language), and a Lit `ReactiveController` that re-renders a component when the language changes. Pure helpers take the dictionary (or a locale they derive it from) as an argument. The spec is `docs/superpowers/specs/2026-10-01-ukrainian-design.md`.

**Tech Stack:** TypeScript 5, Lit 3, ECharts 5, Vite 5, Vitest 2 (Node, no DOM); Python 3.12, pytest, ruff.

## Global Constraints

- Everything committed is English — code, comments, commit messages, docs — except the Ukrainian strings themselves in `frontend/src/i18n/uk.ts` and `translations/uk.json`.
- No new npm or pip dependencies.
- `en.ts` is the reference. The rendered English text must stay exactly what it is today; moving a string into the dictionary is not a chance to reword it.
- Every task leaves `npm run typecheck`, `npm run test` (in `frontend/`) and `pytest` green, and commits.
- Commands: frontend checks run from `frontend/` — `npm run typecheck && npm run test`. Python: `.venv/bin/pytest -q` and `.venv/bin/ruff check . && .venv/bin/ruff format --check .` from the repo root.
- Commit messages: conventional prefix (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`), lower-case subject, ending with the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Ukrainian follows the glossary below. A term not in it: use the word Home Assistant's own Ukrainian translation uses, and add it to the glossary in the same commit.
- Sentences are translated, not mapped word for word. A rule sentence must say in Ukrainian exactly what the code computes — the same thresholds, the same conditions.
- The product name "Inverter Analytics", entity IDs, sensor names quoted from the user's installation, and `code` fragments are not translated.

### Glossary

| English | Ukrainian |
|---|---|
| Load (tab, power) | Навантаження |
| Battery | Батарея |
| Seasonality | Сезонність |
| Balance | Баланс |
| Grid | Мережа |
| Sizing | Достатність |
| Inverter | Інвертор |
| Sun / PV / solar production | Сонце / СЕС / сонячна генерація |
| consumption | споживання |
| production | генерація |
| state of charge | рівень заряду |
| rated power | номінальна потужність |
| overload | перевантаження |
| outage | відключення |
| import / export (grid) | імпорт / експорт |
| from grid / to grid | з мережі / у мережу |
| phase / imbalance | фаза / перекіс фаз |
| PV string | стрінг |
| counter (energy total) | лічильник |
| statistics / hourly statistics | статистика / погодинна статистика |
| coverage | покриття даними |
| period | період |
| mean / median / peak | середнє / медіана / пік |
| round-trip efficiency | ККД заряду-розряду |
| full cycles | повні цикли |
| Enough / Borderline / Short / No verdict | Достатньо / На межі / Замало / Без вердикту |
| Reconfigure (HA button) | Переналаштувати |
| Options (HA button) | Параметри |
| Repairs | Виправлення |
| W / kW / kWh | Вт / кВт / кВт·год |
| s / min / h (durations) | с / хв / год |
| 24 h / 7 days / 30 days / This month / Year | 24 год / 7 днів / 30 днів / Цей місяць / Рік |
| sensor | сенсор |
| capacity (battery) | ємність |
| Exact data / Hourly averages / Mixed (precision) | Точні дані / Погодинні середні / Змішані |
| the battery filled / never filled | батарея зарядилася повністю / жодного разу не зарядилася повністю |
| integration | інтеграція |
| settings | налаштування |

---

## File map

| File | Responsibility |
|---|---|
| `frontend/src/i18n/en.ts` (create) | The English dictionary and `Messages` type. |
| `frontend/src/i18n/uk.ts` (create) | The Ukrainian dictionary, typed `Messages`. |
| `frontend/src/i18n/lang.ts` (create) | Language resolution, the store, `messagesFor`, `messagesForLocale`, `localeFor`. |
| `frontend/src/i18n/plural.ts` (create) | `plural(lang, n, forms)`. |
| `frontend/src/i18n/controller.ts` (create) | `I18nController` for Lit components. |
| `frontend/src/i18n/*.test.ts` (create) | Store, plural, dictionary and role-name tests. |
| `frontend/src/panel.ts` | Header switch, tab names, the feature notice. |
| `frontend/src/range.ts`, `roles.ts`, `format.ts`, `verdict.ts`, `charts/options.ts` | Pure helpers that take the dictionary. |
| `frontend/src/tabs/*.ts`, `frontend/src/sections/*.ts` | Read every visible string from `this.i18n.m`. |
| `frontend/tsconfig.json` | `resolveJsonModule` so tests can import the translation JSON. |
| `custom_components/inverter_analytics/translations/uk.json` (create) | The forms in Ukrainian. |
| `tests/test_translations.py` | Key and placeholder parity of `uk.json` with `en.json`. |
| `docs/known-gaps.md` | The form/panel language mismatch. |
| `README.md`, `manifest.json` | Language note; version 0.6.0. |

## The dictionary shape

Every task adds to the same two objects. The shape, which all tasks follow:

```ts
// frontend/src/i18n/en.ts
export const en = {
  common: { ... },      // shared words: "Refreshing…", "Computing…", "—"
  units: { ... },       // W, kW, kWh, s, min, h, "of rated"
  panel: { ... },       // header, switch, tab names, feature notice
  ranges: { ... },      // RangeKey -> label
  features: { ... },    // feature key -> name (backend sends "label" too)
  roles: { ... },       // role key -> setup-form field label
  errors: { ... },      // backend error code -> sentence
  format: { ... },      // precisionLabel, coverageWarning
  verdict: { ... },     // verdict.ts
  charts: { ... },      // axis names, legends, series names
  load: { ... }, battery: { ... }, seasonality: { ... },
  balance: { ... }, grid: { ... }, sizing: { ... },
  sections: { charge: { ... }, phases: { ... }, strings: { ... } },
};

export type Messages = typeof en;
```

Rules for entries:

- A string with no values is a `string`.
- A string with values is an arrow function of **one object parameter with named fields**, all already formatted as strings by the caller (`formatPower`, `formatPercent`, …), typed in `en.ts`:
  `batteryRule: (p: { full: string; low: string; share: string }) => \`…${p.full}…\``.
  In `uk.ts` the parameter type is inferred from `Messages`: `batteryRule: (p) => \`…\``.
- Counts that change the noun go through `plural()` inside the function, which then also takes the number: `points: (p: { n: number }) => …`.
- A sentence that embeds markup (`<strong>`, a link) is split so the markup stays in the template: `reconfigureBefore`, `reconfigureAfter` around `<strong>${m.panel.reconfigure}</strong>`. Never put HTML in the dictionary.
- Key names are camelCase English describing the content (`howVerdictsRead`, `monthByMonth`), not positions (`p1`, `note3`).

---

### Task 1: The i18n core

**Files:**
- Create: `frontend/src/i18n/en.ts`, `frontend/src/i18n/uk.ts`, `frontend/src/i18n/plural.ts`, `frontend/src/i18n/lang.ts`, `frontend/src/i18n/controller.ts`
- Test: `frontend/src/i18n/lang.test.ts`, `frontend/src/i18n/plural.test.ts`

**Interfaces:**
- Produces:
  - `type Lang = "en" | "uk"`; `LANGS: readonly Lang[]`
  - `en`, `uk`, `type Messages`
  - `plural(lang: Lang, n: number, forms: { one: string; few?: string; many?: string; other: string }): string`
  - `resolveLang(stored: string | null, haLanguage: string | undefined): Lang`
  - `currentLang(): Lang`, `setLang(lang: Lang): void`, `noteHaLanguage(language: string | undefined): void`, `subscribe(listener: () => void): () => void`
  - `messagesFor(lang: Lang): Messages`, `localeFor(lang: Lang, haLanguage: string | undefined): string`, `messagesForLocale(locale: string): Messages`, `currentLocale(): string`
  - `class I18nController implements ReactiveController` with getters `lang: Lang`, `m: Messages`, `locale: string`
  - `_resetLangForTests(): void`

- [ ] **Step 1: Write the failing tests**

`frontend/src/i18n/plural.test.ts`:

```ts
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
```

`frontend/src/i18n/lang.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  _resetLangForTests,
  currentLang,
  currentLocale,
  localeFor,
  messagesForLocale,
  noteHaLanguage,
  resolveLang,
  setLang,
  subscribe,
} from "./lang";
import { en } from "./en";
import { uk } from "./uk";

function fakeStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    getItem: (key: string) => (key in data ? data[key] : null),
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
    data,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  _resetLangForTests();
});

describe("resolveLang", () => {
  it("prefers a stored choice", () => {
    expect(resolveLang("uk", "en")).toBe("uk");
    expect(resolveLang("en", "uk")).toBe("en");
  });

  it("follows Home Assistant's language when nothing is stored", () => {
    expect(resolveLang(null, "uk")).toBe("uk");
    expect(resolveLang(null, "uk-UA")).toBe("uk");
    expect(resolveLang(null, "de")).toBe("en");
    expect(resolveLang(null, undefined)).toBe("en");
  });

  it("ignores a stored value it does not know", () => {
    expect(resolveLang("fr", "uk")).toBe("uk");
  });
});

describe("localeFor", () => {
  it("formats in Ukrainian when the panel is Ukrainian", () => {
    expect(localeFor("uk", "en-GB")).toBe("uk");
  });

  it("keeps Home Assistant's locale for an English panel", () => {
    expect(localeFor("en", "en-GB")).toBe("en-GB");
    expect(localeFor("en", "de")).toBe("de");
  });

  it("does not format an English panel in Ukrainian", () => {
    // The locale is how pure helpers tell which units to print, so an
    // English panel must never carry a Ukrainian locale.
    expect(localeFor("en", "uk-UA")).toBe("en");
  });
});

describe("messagesForLocale", () => {
  it("maps a locale back to its dictionary", () => {
    expect(messagesForLocale("uk")).toBe(uk);
    expect(messagesForLocale("en-GB")).toBe(en);
  });
});

describe("the store", () => {
  it("reads the stored choice once and writes a new one", () => {
    const storage = fakeStorage({ "inverter-analytics.lang": "uk" });
    vi.stubGlobal("localStorage", storage);
    expect(currentLang()).toBe("uk");
    setLang("en");
    expect(currentLang()).toBe("en");
    expect(storage.data["inverter-analytics.lang"]).toBe("en");
  });

  it("follows Home Assistant's language until a choice is made", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    noteHaLanguage("uk-UA");
    expect(currentLang()).toBe("uk");
    expect(currentLocale()).toBe("uk");
  });

  it("survives a browser that refuses storage", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("denied");
      },
    });
    expect(currentLang()).toBe("en");
    setLang("uk");
    expect(currentLang()).toBe("uk");
  });

  it("tells subscribers about a change and stops when asked", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const listener = vi.fn();
    const unsubscribe = subscribe(listener);
    setLang("uk");
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    setLang("en");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("tells subscribers when Home Assistant's language changes the result", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const listener = vi.fn();
    subscribe(listener);
    noteHaLanguage("en");
    noteHaLanguage("uk");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd frontend && npx vitest run src/i18n`
Expected: FAIL — cannot resolve `./plural`, `./lang`.

- [ ] **Step 3: Write the core**

`frontend/src/i18n/plural.ts`:

```ts
import type { Lang } from "./lang";

export interface PluralForms {
  one: string;
  few?: string;
  many?: string;
  other: string;
}

/**
 * The noun form a count takes.
 *
 * Ukrainian has three forms where English has two — 1 день, 2 дні, 5 днів —
 * and which one applies depends on the last digits, not on the count being
 * above one. Intl.PluralRules knows the rules for both languages.
 */
export function plural(lang: Lang, n: number, forms: PluralForms): string {
  const category = new Intl.PluralRules(lang).select(n);
  if (category === "one") return forms.one;
  if (category === "few") return forms.few ?? forms.other;
  if (category === "many") return forms.many ?? forms.other;
  return forms.other;
}
```

`frontend/src/i18n/en.ts` — start with the groups Task 1 needs; later tasks add the rest:

```ts
/**
 * The panel's words in English — the reference dictionary.
 *
 * uk.ts is typed against this object, so a key added here and not there
 * fails the typecheck. Sentences that carry values are functions of one
 * object of already-formatted strings: each language orders and inflects
 * its own sentence rather than gluing words around a number.
 */
export const en = {
  panel: {
    language: "Language",
  },
};

export type Messages = typeof en;
```

`frontend/src/i18n/uk.ts`:

```ts
/** The panel's words in Ukrainian. Typed against en.ts; see there. */
import type { Messages } from "./en";

export const uk: Messages = {
  panel: {
    language: "Мова",
  },
};
```

`frontend/src/i18n/lang.ts`:

```ts
/**
 * Which language the panel speaks.
 *
 * A choice made with the switch is kept in the browser and wins. Until one
 * is made, the panel follows the language of the user's Home Assistant
 * profile: someone whose Home Assistant is in Ukrainian should not have to
 * find a switch to read the panel in Ukrainian.
 */
import { en, type Messages } from "./en";
import { uk } from "./uk";

export type Lang = "en" | "uk";
export const LANGS: readonly Lang[] = ["en", "uk"];

const STORAGE_KEY = "inverter-analytics.lang";
const DICTIONARIES: Record<Lang, Messages> = { en, uk };

function isLang(value: unknown): value is Lang {
  return value === "en" || value === "uk";
}

function speaksUkrainian(language: string | undefined): boolean {
  return (language ?? "").toLowerCase().startsWith("uk");
}

export function resolveLang(stored: string | null, haLanguage: string | undefined): Lang {
  if (isLang(stored)) return stored;
  return speaksUkrainian(haLanguage) ? "uk" : "en";
}

/**
 * The locale numbers and dates are formatted in.
 *
 * A Ukrainian panel formats in Ukrainian. An English panel keeps Home
 * Assistant's locale, so en-GB or de users see no change — except a
 * Ukrainian one, which becomes "en": the helpers in format.ts read the
 * locale to pick their units, and an English panel must not print кВт.
 */
export function localeFor(lang: Lang, haLanguage: string | undefined): string {
  if (lang === "uk") return "uk";
  if (!haLanguage || speaksUkrainian(haLanguage)) return "en";
  return haLanguage;
}

export function messagesFor(lang: Lang): Messages {
  return DICTIONARIES[lang];
}

/** The dictionary a locale from localeFor belongs to. */
export function messagesForLocale(locale: string): Messages {
  return messagesFor(speaksUkrainian(locale) ? "uk" : "en");
}

// undefined: storage not read yet; null: read, nothing usable stored.
let stored: Lang | null | undefined;
let haLanguage: string | undefined;
const listeners = new Set<() => void>();

function readStored(): Lang | null {
  if (stored === undefined) {
    try {
      const value = globalThis.localStorage?.getItem(STORAGE_KEY) ?? null;
      stored = isLang(value) ? value : null;
    } catch {
      stored = null;
    }
  }
  return stored;
}

function notify(): void {
  for (const listener of listeners) listener();
}

export function currentLang(): Lang {
  return resolveLang(readStored(), haLanguage);
}

export function currentLocale(): string {
  return localeFor(currentLang(), haLanguage);
}

export function setLang(lang: Lang): void {
  stored = lang;
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, lang);
  } catch {
    // The choice still holds for this page; it just will not outlive it.
  }
  notify();
}

/** Called by the panel whenever Home Assistant hands it a new hass. */
export function noteHaLanguage(language: string | undefined): void {
  if (language === haLanguage) return;
  const before = currentLocale();
  haLanguage = language;
  if (currentLocale() !== before) notify();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function _resetLangForTests(): void {
  stored = undefined;
  haLanguage = undefined;
  listeners.clear();
}
```

`frontend/src/i18n/controller.ts`:

```ts
import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Messages } from "./en";
import { currentLang, currentLocale, messagesFor, subscribe, type Lang } from "./lang";

/**
 * Gives a component the current dictionary and re-renders it on a switch.
 *
 * Create one as a field — `private i18n = new I18nController(this)` — and
 * read `this.i18n.m` and `this.i18n.locale` in render(). Nothing has to be
 * passed down the tree: every component asks the same store.
 */
export class I18nController implements ReactiveController {
  private unsubscribe?: () => void;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.unsubscribe = subscribe(() => this.host.requestUpdate());
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  get lang(): Lang {
    return currentLang();
  }

  get m(): Messages {
    return messagesFor(currentLang());
  }

  get locale(): string {
    return currentLocale();
  }
}
```

- [ ] **Step 4: Run the tests and the typecheck**

Run: `cd frontend && npx vitest run src/i18n && npm run typecheck`
Expected: PASS, no type errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/i18n
git commit -m "feat: the i18n core — dictionaries, language store and controller

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: The switch, the panel's own words, and every component wired

**Files:**
- Modify: `frontend/src/panel.ts`, `frontend/src/range.ts`, `frontend/src/roles.ts`, `frontend/src/format.ts` (`describeError` only), `frontend/src/i18n/en.ts`, `frontend/src/i18n/uk.ts`, `frontend/tsconfig.json`
- Modify (wiring only): every file in `frontend/src/tabs/` and `frontend/src/sections/` except `shared-styles.ts`
- Test: `frontend/src/range.test.ts`, `frontend/src/roles.test.ts`, `frontend/src/format.test.ts`, create `frontend/src/i18n/roles.test.ts`

**Interfaces:**
- Consumes: everything Task 1 produces.
- Produces:
  - `RANGE_LABELS` is removed; `rangeLabel(m: Messages, key: RangeKey): string`
  - `roleLabel(m: Messages, role: string): string`, `listRoles(m: Messages, roles: readonly string[]): string`; `ROLE_LABELS` is removed — the names live in `m.roles`
  - `describeError(error: unknown, m: Messages): string`
  - `m.common`, `m.panel`, `m.ranges`, `m.features`, `m.roles`, `m.errors`
  - In every tab and section: a field `private i18n = new I18nController(this);`, and every former `this.hass.locale.language` read replaced by `this.i18n.locale`. Sections keep their `locale` property for now (tabs pass `this.i18n.locale`).

- [ ] **Step 1: Write the failing tests**

Update `frontend/src/range.test.ts` — replace any `RANGE_LABELS` assertion with:

```ts
import { en } from "./i18n/en";
import { uk } from "./i18n/uk";
import { rangeLabel } from "./range";

describe("rangeLabel", () => {
  it("names the periods in both languages", () => {
    expect(rangeLabel(en, "7d")).toBe("7 days");
    expect(rangeLabel(uk, "7d")).toBe("7 днів");
    expect(rangeLabel(uk, "month")).toBe("Цей місяць");
  });
});
```

Update `frontend/src/roles.test.ts` so every call passes `en` (`listRoles(en, [...])`, `roleLabel(en, ...)`), and add:

```ts
it("joins a Ukrainian list with «і»", () => {
  expect(listRoles(uk, ["battery_soc", "grid_connected"])).toBe(
    `${uk.roles.battery_soc} і ${uk.roles.grid_connected}`,
  );
});
```

Create `frontend/src/i18n/roles.test.ts`:

```ts
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
```

In `frontend/src/format.test.ts`, update the `describeError` cases to pass `en` and add:

```ts
it("names a known backend error in the panel's language", () => {
  expect(describeError({ code: "not_found", message: "Inverter not found or disabled" }, uk)).toBe(
    uk.errors.not_found,
  );
});

it("falls back to the backend's message for an unknown code", () => {
  expect(describeError({ code: "weird", message: "Something odd" }, uk)).toBe("Something odd");
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `cd frontend && npm run test`
Expected: FAIL — `rangeLabel` not exported; JSON import unresolved by typecheck later.

- [ ] **Step 3: Implement**

1. `frontend/tsconfig.json`: add `"resolveJsonModule": true` to `compilerOptions`.
2. `range.ts`: delete `RANGE_LABELS`; add

   ```ts
   export function rangeLabel(m: Messages, key: RangeKey): string {
     return m.ranges[key];
   }
   ```

   with `ranges: { "24h": "24 h", "7d": "7 days", "30d": "30 days", month: "This month", year: "Year" }` in `en.ts` and the glossary values in `uk.ts`.
3. `roles.ts`: move the `ROLE_LABELS` object verbatim into `en.roles`; keep the doc comment above `roleLabel`, and add a sentence that the Ukrainian names must equal `uk.json`. `roleLabel(m, role)` returns `(m.roles as Record<string, string>)[role] ?? role`. `listRoles(m, roles)` joins with `m.common.and` (`"and"` / `"і"`). In `uk.roles`, write the Ukrainian field labels; Task 8 will copy these same strings into `uk.json` and its test enforces equality.
4. `format.ts`: `describeError(error, m)` — if the error has a string `code` and `m.errors` has it, return that; otherwise the existing behaviour. Add `en.errors = { not_found: "Inverter not found or disabled", invalid_window: "Window end must be later than its start" }` and the Ukrainian. Grep backend for other `send_error` codes (`grep -rn send_error custom_components`) and add each.
5. `panel.ts`:
   - `private i18n = new I18nController(this);`
   - In `willUpdate`, when `changed.has("hass")`: `noteHaLanguage(this.hass?.locale?.language);` before the existing logic.
   - `TABS` keeps only ids: `const TABS = ["load", "battery", "seasonal", "balance", "grid", "sizing"] as const;` and the label is `m.panel.tabs[id]`.
   - Every literal in `render()` / `renderTab()` / error states goes to `m.panel` — including the unavailable-feature notice (split around `<strong>` per the rules), "Go to Inverter Analytics settings", loading and error text. `feature.label` becomes `m.features[feature.key as keyof Messages["features"]] ?? feature.label`; fill `en.features` from `FEATURES` in `custom_components/inverter_analytics/roles.py` (the `label` of each, keyed by `key`).
   - The notice's "it is" / "none of them are" choice becomes two dictionary functions taking the role list: `m.panel.missingOne({ feature, roles })` and `m.panel.missingMany({ feature, roles })`, each a whole sentence.
   - The switch, placed in `.header` just before `.ranges`:

     ```ts
     <div class="langs" role="group" aria-label=${m.panel.language}>
       ${LANGS.map(
         (lang) => html`<button
           class=${lang === this.i18n.lang ? "active" : ""}
           @click=${() => setLang(lang)}
         >${lang.toUpperCase()}</button>`,
       )}
     </div>
     ```

     Style `.langs` with the same rules as `.ranges` (`display: flex; gap: 4px;`), and move `margin-left: auto` from `.ranges` to `.langs` so the two groups sit together on the right.
6. Each tab and section: add `import { I18nController } from "../i18n/controller";`, the field, and replace `this.hass.locale.language` with `this.i18n.locale`. Where a tab passes `.locale=${...}` to a section, pass `this.i18n.locale`. Do not move any other string in this task.

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run typecheck && npm run test && grep -rn "hass.locale.language" src`
Expected: PASS; the grep prints only `panel.ts` (the `noteHaLanguage` call) and `types.ts`.

- [ ] **Step 5: Commit**

```bash
git add frontend
git commit -m "feat: the EN | UK switch, and the panel's own words in both languages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Units, formats and verdicts

**Files:**
- Modify: `frontend/src/format.ts`, `frontend/src/verdict.ts`, `frontend/src/i18n/en.ts`, `frontend/src/i18n/uk.ts`, the callers of `formatDuration` and of the `verdict.ts` functions
- Test: `frontend/src/format.test.ts`, `frontend/src/verdict.test.ts`

**Interfaces:**
- Consumes: `messagesForLocale(locale)`, `I18nController`.
- Produces:
  - `formatPower`, `formatPercent`, `formatCoverage`, `formatEnergy`, `precisionLabel`, `coverageWarning` keep their signatures; their words and units come from `messagesForLocale(locale)`.
  - `formatDuration(seconds: number, locale: string): string` (new parameter).
  - `verdictLabel(m: Messages, verdict)`, `reasonSentence(m: Messages, card, reason)`, `reasonHint(m: Messages, card, reason)`.
  - `m.units = { w, kw, kwh, s, min, h, ofRated }`, `m.format`, `m.verdict`.

- [ ] **Step 1: Write the failing tests**

In `format.test.ts`: the existing `coverageWarning` cases pass `"uk"` while expecting English — change them to `"en"`, then add:

```ts
describe("in Ukrainian", () => {
  it("prints Ukrainian units", () => {
    expect(formatPower(950, "uk")).toBe("950 Вт");
    expect(formatPower(6800, "uk")).toBe("6,8 кВт");
    expect(formatEnergy(12.5, "uk")).toBe("12,5 кВт·год");
  });

  it("prints durations with Ukrainian units", () => {
    expect(formatDuration(100, "uk")).toBe("1 хв 40 с");
    expect(formatDuration(3900, "uk")).toBe("1 год 5 хв");
  });

  it("words the coverage warning in Ukrainian", () => {
    expect(coverageWarning(0, "uk")).toBe(uk.format.noData);
    expect(coverageWarning(0.4, "uk")).toContain("40");
  });

  it("names the precision in Ukrainian", () => {
    expect(precisionLabel("lts", null, "uk")).toBe(uk.format.hourlyAverages);
  });
});
```

Existing `formatDuration(x)` calls become `formatDuration(x, "en")` with unchanged expectations.

In `verdict.test.ts`, pass `en` to every call and add:

```ts
it("prints the verdicts in Ukrainian", () => {
  expect(verdictLabel(uk, "enough")).toBe("Достатньо");
  expect(verdictLabel(uk, "borderline")).toBe("На межі");
  expect(verdictLabel(uk, "short")).toBe("Замало");
  expect(verdictLabel(uk, null)).toBe("Без вердикту");
});
```

Check the `Intl` output for `uk` before asserting: Node 20 renders `6,8` with a comma; the thousands separator is a narrow no-break space (U+202F) — assert on values below 1000 or build the expectation with `Intl.NumberFormat("uk")`.

- [ ] **Step 2: Run them to verify they fail**

Run: `cd frontend && npm run test`
Expected: FAIL on the new Ukrainian cases.

- [ ] **Step 3: Implement**

- `format.ts`: each function computes `const m = messagesForLocale(locale);` and uses `m.units.*` / `m.format.*`. `precisionLabel`'s "Mixed since <date>" becomes `m.format.mixedSince({ date })`. `coverageWarning`'s third sentence becomes `m.format.coversOnly({ share })`. English output must be byte-identical — the existing tests prove it.
- `verdict.ts`: the three functions take `m` first; `NO_DATA` moves to `m.verdict.noData` (keyed by card); the module comment stays.
- Update every caller (`grep -rn "formatDuration\|verdictLabel\|reasonSentence\|reasonHint" src`) — tabs pass `this.i18n.locale` / `this.i18n.m`.

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run typecheck && npm run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add frontend
git commit -m "feat: units, formats and verdicts in the panel's language

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Chart labels

**Files:**
- Modify: `frontend/src/charts/options.ts`, its callers in `frontend/src/tabs/` and `frontend/src/sections/`, `frontend/src/i18n/en.ts`, `frontend/src/i18n/uk.ts`
- Test: `frontend/src/charts/options.test.ts`

**Interfaces:**
- Consumes: `Messages`, `I18nController`.
- Produces: every exported `*Option` function takes `m: Messages` as its **last** parameter; `monthLabel(key: string, previous: string | undefined, locale: string)`; `FLOW_LABELS` (if present) moves into `m.charts`; `m.charts.*` holds every axis name, legend entry and series name.

- [ ] **Step 1: Update the tests first**

In `options.test.ts`, pass `en` as the last argument everywhere (and `"en"` to `monthLabel`). Expectations stay. Add:

```ts
describe("in Ukrainian", () => {
  it("names the axes and series in Ukrainian", () => {
    const option = monthlyOption(sampleMonths, true, uk) as { legend: { data: string[] } };
    expect(option.legend.data).toEqual([uk.charts.load, uk.charts.pv]);
  });

  it("shortens month names in the panel's locale", () => {
    expect(monthLabel("2026-03", undefined, "uk")).toBe(
      `${new Date(Date.UTC(2000, 2, 1)).toLocaleDateString("uk", { month: "short" })} 2026`,
    );
  });
});
```

(`sampleMonths` — reuse whatever fixture the file already builds for `monthlyOption`.)

- [ ] **Step 2: Run to verify failure**

Run: `cd frontend && npx vitest run src/charts`
Expected: FAIL (extra argument / Ukrainian names missing).

- [ ] **Step 3: Implement**

Replace every English literal in `options.ts` (axis `name`, `legend.data`, series `name`, tooltip text, `"% of time"`, `"Mean"`, `"Peak"`, `"Load"`, `"PV"`, …) with `m.charts.*`. Series identity that code looks up by name (legend ↔ series) must use the same dictionary value on both sides. `monthLabel` uses its `locale` argument instead of `"en"`. Update callers to pass `this.i18n.m` / `this.i18n.locale`.

- [ ] **Step 4: Verify**

Run: `cd frontend && npm run typecheck && npm run test && grep -nE "name: \"[A-Za-z%]|data: \[\"" src/charts/options.ts`
Expected: PASS; the grep prints nothing (unit-only names like `"W"` must also come from `m.units`).

- [ ] **Step 5: Commit**

```bash
git add frontend
git commit -m "feat: chart axes, legends and series in the panel's language

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Tasks 5–7: The tabs and sections

These three tasks share one procedure; each covers its own files.

| Task | Files | Dictionary groups |
|---|---|---|
| 5 | `tabs/load-tab.ts`, `tabs/battery-tab.ts`, `sections/charge-section.ts`, `sections/phases-section.ts`, `sections/strings-section.ts` | `load`, `battery`, `sections.*` |
| 6 | `tabs/seasonality-tab.ts`, `tabs/balance-tab.ts` | `seasonality`, `balance` |
| 7 | `tabs/grid-tab.ts`, `tabs/sizing-tab.ts` | `grid`, `sizing` |

**Interfaces:**
- Consumes: `this.i18n.m`, `this.i18n.locale`, `this.i18n.lang`, `plural`, the helpers of Tasks 3–4.
- Produces: no new exports; the listed files contain no user-visible English literal.

- [ ] **Step 1: Inventory**

For each file, list every user-visible literal: text nodes in `html\`\``, attribute values a user reads (`title=`, `aria-label=`, `placeholder=`), strings returned by private helpers (`ruleSentence`, `renderSetupNote`, …), and fragments joined by a ternary (`"below" : "above"`). Code-only strings (CSS, event names, keys, URLs) are not visible.

- [ ] **Step 2: Move them into `en.ts`, unchanged**

Add one group per file. Turn every sentence that interpolates into a function of named, pre-formatted strings. A ternary that changes a word mid-sentence becomes two whole sentences (`driftBelow`, `driftAbove`) — not a word slot. A count that changes a noun (`${n} points`) uses `plural(lang, n, …)` inside the function with `n: number` in its parameter. Replace the literal in the component with `m.<group>.<key>` or `m.<group>.<key>({ … })`, with `const m = this.i18n.m;` at the top of `render()` and each helper.

Example — `sizing-tab.ts` before:

```ts
<h2>How the verdicts are read</h2>
<p class="note">Inverter — ${this.ruleSentence("inverter", payload, locale)}</p>
```

after:

```ts
<h2>${m.sizing.howVerdictsRead}</h2>
<p class="note">${m.sizing.ruleLine({ part: m.sizing.cards.inverter, rule: this.ruleSentence("inverter", payload, locale) })}</p>
```

with, in `en.ts`:

```ts
sizing: {
  howVerdictsRead: "How the verdicts are read",
  ruleLine: (p: { part: string; rule: string }) => `${p.part} — ${p.rule}`,
  batteryRule: (p: { full: string; low: string; share: string }) =>
    `Counted over days with data: short when the battery filled to ${p.full} and still fell to ${p.low} on at least ${p.share} of them; borderline when it happened at all; no verdict for a span in which it never filled. A day it ran low without filling counts against the sun, not the battery.`,
  …
}
```

- [ ] **Step 3: Check English is unchanged**

Run: `cd frontend && npm run typecheck && npm run test`
Then for each file: `git diff -U0 <file> | grep '^-' | grep -oE '[A-Z][a-z]+( [a-z]+){2,}'` and confirm each phrase appears in `en.ts` (`grep -c "<phrase>" src/i18n/en.ts`). No English sentence may disappear from the code without reappearing in `en.ts`.

- [ ] **Step 4: Translate into `uk.ts`**

Write the same group in Ukrainian per the glossary. Translate the meaning; keep every number the function receives; keep the reasoning the English sentence gives (these notes explain *why*, and that is the point of translating them).

- [ ] **Step 5: Verify no literal is left**

Run: `cd frontend && npm run typecheck && npm run test && grep -nE ">[^<>${}]*[A-Za-z]{3,}[^<>]*<" <files>`
Expected: PASS; the grep shows no visible English text between tags (inspect each hit — code-only matches are fine).

- [ ] **Step 6: Commit**

```bash
git add frontend
git commit -m "feat: the <tab names> tabs in both languages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Dictionary checks

**Files:**
- Create: `frontend/src/i18n/messages.test.ts`

**Interfaces:**
- Consumes: `en`, `uk`.

- [ ] **Step 1: Write the test**

```ts
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
  // e.g. "units.percent" if it exists — add paths here, with a reason, rather than weakening the test.
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

/** Calls a dictionary function with every parameter it might read. */
function render(value: unknown): string {
  if (typeof value !== "function") return String(value);
  const sample = new Proxy(
    {},
    { get: (_, key) => (key === "n" ? 3 : key === "roles" ? "A" : `«${String(key)}»`) },
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
      if (!SAME_IN_BOTH.has(path)) {
        expect(text).not.toBe(render(enLeaves.get(path)));
      }
    });
  }
});

describe("the English dictionary", () => {
  for (const { path, value } of leaves(en)) {
    it(`${path} renders`, () => {
      expect(render(value)).not.toContain("undefined");
    });
  }
});
```

- [ ] **Step 2: Run it**

Run: `cd frontend && npx vitest run src/i18n/messages.test.ts`
Expected: PASS. Every failure is either an untranslated string (translate it) or a value genuinely identical in both languages (add its path to `SAME_IN_BOTH` with a comment saying why).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/i18n
git commit -m "test: every Ukrainian string is present and translated

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: `uk.json` for the forms

**Files:**
- Create: `custom_components/inverter_analytics/translations/uk.json`
- Modify: `tests/test_translations.py`, `frontend/src/i18n/roles.test.ts`

**Interfaces:**
- Consumes: `uk.roles` from Task 2 — its strings are the `data` labels in `uk.json`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_translations.py`:

```python
import re

UK = pathlib.Path("custom_components/inverter_analytics/translations/uk.json")
PLACEHOLDER = re.compile(r"\{[a-z_]+\}")


def _leaves(node: object, path: str = "") -> dict[str, str]:
    if isinstance(node, dict):
        out: dict[str, str] = {}
        for key, value in node.items():
            out.update(_leaves(value, f"{path}.{key}" if path else key))
        return out
    return {path: str(node)}


def test_the_ukrainian_file_has_exactly_the_english_keys():
    """A key missing here is shown in English; an extra one labels nothing."""
    en = _leaves(json.loads(TRANSLATIONS.read_text()))
    uk = _leaves(json.loads(UK.read_text()))
    assert set(uk) == set(en)


def test_the_ukrainian_file_keeps_every_placeholder():
    """Home Assistant fills {found} by name; a translated placeholder stays empty."""
    en = _leaves(json.loads(TRANSLATIONS.read_text()))
    uk = _leaves(json.loads(UK.read_text()))
    for key, text in en.items():
        assert sorted(PLACEHOLDER.findall(uk[key])) == sorted(PLACEHOLDER.findall(text)), key


def test_the_ukrainian_file_is_translated():
    en = _leaves(json.loads(TRANSLATIONS.read_text()))
    uk = _leaves(json.loads(UK.read_text()))
    untranslated = [key for key, text in en.items() if uk[key] == text and len(text) > 3]
    assert not untranslated
```

Extend `frontend/src/i18n/roles.test.ts`:

```ts
import formUk from "../../../custom_components/inverter_analytics/translations/uk.json";
import { uk } from "./uk";

it("equal the setup form's labels in Ukrainian", () => {
  const labels = formUk.config.step.manual.data as Record<string, string>;
  for (const [role, name] of Object.entries(uk.roles)) {
    expect(name, role).toBe(labels[role]);
  }
});
```

- [ ] **Step 2: Run to verify failure**

Run: `.venv/bin/pytest tests/test_translations.py -q`
Expected: FAIL — `uk.json` does not exist.

- [ ] **Step 3: Write `uk.json`**

Translate `en.json` in full: same structure, same keys, every `title`, `description`, `data`, `data_description`, `menu_options`, `abort` and `issues` text. Field labels in `data` are exactly the strings in `uk.roles` (copy them; where `en.json` has a label `en.roles` lacks, e.g. `name`, `ct_choice`, `invert_*`, translate it). Identical keys across steps get identical Ukrainian — `test_the_duplicated_blocks_stay_identical` only checks `en.json`, so check by eye or with:

```bash
python3 - <<'EOF'
import json
d = json.load(open("custom_components/inverter_analytics/translations/uk.json"))
seen = {}
for section in ("config", "options"):
    for step, body in d[section]["step"].items():
        for block in ("data", "data_description"):
            for k, v in body.get(block, {}).items():
                if (block, k) in seen and seen[(block, k)] != v:
                    print("differs:", block, k, step)
                seen[(block, k)] = v
EOF
```

Expected: no output. Keep `{placeholders}` verbatim; keep "Inverter Analytics".

- [ ] **Step 4: Verify**

Run: `.venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check . && (cd frontend && npm run test)`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add custom_components/inverter_analytics/translations/uk.json tests/test_translations.py frontend/src/i18n/roles.test.ts
git commit -m "feat: the setup, reconfigure and options forms in Ukrainian

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Build, docs, live check

**Files:**
- Modify: `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` (built), `docs/known-gaps.md`, `README.md`

- [ ] **Step 1: Build**

Run: `cd frontend && npm run build`
Expected: writes `custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` with no warnings beyond the existing ones. Confirm both dictionaries are in it: `grep -c "Достатньо" ../custom_components/inverter_analytics/frontend/dist/inverter-analytics-panel.js` prints ≥ 1.

- [ ] **Step 2: Known gaps**

In `docs/known-gaps.md`, section "5. Deliberately deferred", add:

```markdown
**The panel and the forms choose their language separately.** The panel
follows its own `EN | UK` switch (or, until it is used, the Home Assistant
profile language); the setup and options forms follow the profile language
only, because Home Assistant renders them. With the panel in Ukrainian and
Home Assistant in English, the panel names a field in Ukrainian that the form
shows in English. Not worked around: the forms cannot be told to follow the
switch.
```

and under "3. Still unverified", if Step 4 cannot be done live, a line saying the Ukrainian panel and `uk.json` have not been seen in a running Home Assistant.

- [ ] **Step 3: README**

Add a short "Language" subsection near the panel description: the panel speaks English and Ukrainian, the switch is in the header, without a choice it follows the Home Assistant profile language, and the forms follow the profile language.

- [ ] **Step 4: Live check (when a Home Assistant is reachable)**

Load the panel; switch to UK: every tab's headings, notes, cards, charts and the feature notice are Ukrainian; numbers use a comma and кВт; reload — the choice is kept; switch back — English as before. Open the integration's Reconfigure in a Ukrainian profile: Ukrainian labels and descriptions. If none is reachable, record that in known-gaps (Step 2) instead.

- [ ] **Step 5: Full check and commit**

Run: `(cd frontend && npm run typecheck && npm run test) && .venv/bin/pytest -q && .venv/bin/ruff check . && .venv/bin/ruff format --check .`

```bash
git add -A custom_components/inverter_analytics/frontend/dist docs/known-gaps.md README.md
git commit -m "docs: the Ukrainian panel in the README and known gaps; rebuild the bundle

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Release 0.6.0

Previous releases: feature branch fast-forwarded into `main`, then a `chore: release X.Y.Z` commit bumping `manifest.json` and the tarball URLs in `README.md`, an annotated tag `vX.Y.Z`, a push, and a GitHub release titled `X.Y.Z — <headline>`.

- [ ] **Step 1: Merge**

```bash
git switch main && git pull --ff-only && git merge --ff-only feat/i18n-uk
```

- [ ] **Step 2: Bump**

`custom_components/inverter_analytics/manifest.json`: `"version": "0.6.0"`. `README.md`: replace `v0.5.0` and `0.5.0` in the manual-install snippet with `v0.6.0` / `0.6.0`.

- [ ] **Step 3: Check, commit, tag, push**

```bash
(cd frontend && npm run typecheck && npm run test) && .venv/bin/pytest -q
git add custom_components/inverter_analytics/manifest.json README.md
git commit -m "chore: release 0.6.0

0.5.0 shipped the Sizing tab. This one speaks Ukrainian: the whole panel
behind an EN | UK switch, and the setup and options forms through uk.json.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git tag -a v0.6.0 -m "0.6.0 — Ukrainian"
git push origin main v0.6.0
```

- [ ] **Step 4: GitHub release**

```bash
gh release create v0.6.0 --title "0.6.0 — Ukrainian" --notes-file <notes>
```

Notes, in English, in the style of 0.5.0's: what changed (the switch; it follows the profile language until used; numbers and units in the panel's language; the forms in Ukrainian), and the known limitation from known-gaps.

- [ ] **Step 5: Confirm**

Run: `gh release view v0.6.0 && git log --oneline -1 origin/main`
Expected: the release is Latest; `origin/main` is the release commit.
