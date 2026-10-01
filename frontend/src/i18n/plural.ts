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
