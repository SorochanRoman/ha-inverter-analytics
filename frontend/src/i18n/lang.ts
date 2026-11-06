/**
 * Which language the panel speaks, and its dictionaries.
 *
 * The choice itself lives in lang-store.ts, which the Battery time card
 * imports without these dictionaries; this module re-exports it.
 */
import { en, type Messages } from "./en";
import { speaksUkrainian, type Lang } from "./lang-store";
import { uk } from "./uk";

export * from "./lang-store";

const DICTIONARIES: Record<Lang, Messages> = { en, uk };

export function messagesFor(lang: Lang): Messages {
  return DICTIONARIES[lang];
}

/** The dictionary a locale from localeFor belongs to. */
export function messagesForLocale(locale: string): Messages {
  return messagesFor(speaksUkrainian(locale) ? "uk" : "en");
}
