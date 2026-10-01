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
