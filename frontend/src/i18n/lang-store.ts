/**
 * Which language the panel speaks.
 *
 * A choice made with the switch is kept in the browser and wins. Until one
 * is made, the panel follows the language of the user's Home Assistant
 * profile: someone whose Home Assistant is in Ukrainian should not have to
 * find a switch to read the panel in Ukrainian.
 *
 * This module holds the choice and nothing else, so the Battery time card,
 * which loads on every dashboard, can follow it without pulling in the
 * panel's dictionaries; lang.ts adds those for the panel.
 */
export type Lang = "en" | "uk";
export const LANGS: readonly Lang[] = ["en", "uk"];

const STORAGE_KEY = "inverter-analytics.lang";

function isLang(value: unknown): value is Lang {
  return value === "en" || value === "uk";
}

export function speaksUkrainian(language: string | undefined): boolean {
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

/**
 * The panel and the Battery time card are separate bundles, each with its
 * own copy of this store, so a switch is announced on window for the other
 * copies on the page, and other tabs hear of it through the storage event.
 */
const LANG_EVENT = "inverter-analytics-lang";

export function setLang(lang: Lang): void {
  stored = lang;
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, lang);
  } catch {
    // The choice still holds for this page; it just will not outlive it.
  }
  notify();
  globalThis.window?.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
}

/** A choice made elsewhere; one that matches ours is our own echo, or no change. */
function adopt(value: unknown): void {
  if (!isLang(value) || value === stored) return;
  stored = value;
  notify();
}

globalThis.window?.addEventListener(LANG_EVENT, (event) => {
  adopt((event as CustomEvent<unknown>).detail);
});
globalThis.window?.addEventListener("storage", (event) => {
  const { key, newValue } = event as StorageEvent;
  if (key === STORAGE_KEY) adopt(newValue);
});

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
