/**
 * ParentOS canonical enums.
 * Source: Output Contract v2 §A.2
 *
 * RESCUE is NOT a canonical pattern. Do not add it. Validators reject it.
 */

export const PATTERNS = ["loop", "quiet_surrender", "zero_to_hundred", "just_this_once"] as const;
export type Pattern = typeof PATTERNS[number];

export const ARENAS = [
  "morning",
  "sleep",
  "homework",
  "screens",
  "siblings",
  "shower",
  "extracurricular",
  "friends",
  "departure",
  "return_kindergarten",
  "return_school",
  "travel",
  "public",
] as const;
export type Arena = typeof ARENAS[number];

export const AGE_BANDS = ["3-4", "5-6", "7-8", "9-10"] as const;
export type AgeBand = typeof AGE_BANDS[number];

export const HOLD_TYPES = ["body_inhibitory", "word_anchor", "presence_hold"] as const;
export type HoldType = typeof HOLD_TYPES[number];

export const MODE = "routine" as const;
export type Mode = typeof MODE;

/**
 * Pilot v1 default hold_type. Locked per Composition Contract v2 §B.3.
 */
export const PILOT_DEFAULT_HOLD_TYPE: HoldType = "word_anchor";
