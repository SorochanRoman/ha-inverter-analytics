/**
 * The backend lists only the longest episodes of a period (load overloads,
 * phase imbalance) and sends the full count beside the list. These decide
 * whether the table says so.
 */

export interface CappedListNote {
  shown: number;
  total: number;
}

/** Both counts when the list is shorter than the total, otherwise null. */
export function cappedListNote(
  shown: number,
  total: number | undefined,
): CappedListNote | null {
  if (total === undefined || total <= shown) return null;
  return { shown, total };
}
