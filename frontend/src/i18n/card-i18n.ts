/**
 * The Battery time card's dictionary in the language the panel speaks.
 *
 * Apart from lang-store.ts, so the panel, which reads the store too, never
 * bundles the card's words.
 */
import { cardEn, type CardMessages } from "./card-en";
import { cardUk } from "./card-uk";
import { currentLang } from "./lang-store";

export function messages(): CardMessages {
  return currentLang() === "uk" ? cardUk : cardEn;
}
