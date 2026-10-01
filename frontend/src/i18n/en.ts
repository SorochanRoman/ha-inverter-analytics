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
