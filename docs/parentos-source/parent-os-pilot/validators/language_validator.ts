/**
 * Language validator.
 * Source: Output Contract v2 §A.4 (V-04, V-06, V-07, V-08)
 *
 *   V-04: "אם תבוא התנגדות" forbidden anywhere.
 *   V-06: All parent-facing strings: Hebrew only.
 *   V-07: No system tokens in parent-facing fields.
 *   V-08: Empty negation forbidden — every "לא" has direction.
 */

import type { RoutinePayload } from "../types/routine";
import type { ValidationIssue } from "./payload_validator";

const BANNED_PHRASES = ["אם תבוא התנגדות"];

const BANNED_TOKENS = [
  "Runtime",
  "Payload",
  "Pattern",
  "Layer",
  "Engine",
  "AI",
  "Schema",
  "JSON",
  "meta",
  "header",
];

/**
 * Parent-facing string fields. These are the strings the user reads.
 * Internal-only fields (meta.*, header keys) are excluded from
 * banned-token scanning because they are never rendered.
 */
function collectParentFacingStrings(p: RoutinePayload): string[] {
  return [
    p.title,
    p.translation.what_is_really_happening,
    p.translation.why_it_repeats,
    p.action.what_parent_says,
    p.action.what_parent_demands_now,
    p.action.what_parent_does_in_body,
    p.action.what_parent_does_not_do,
    p.resistance_hold.when_it_gets_hard,
  ];
}

/**
 * V-04 — banned phrase scan across ENTIRE payload (incl. internal).
 * "אם תבוא התנגדות" must not appear anywhere.
 */
export function validateBannedPhrases(payload: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const blob = JSON.stringify(payload);
  for (const phrase of BANNED_PHRASES) {
    if (blob.includes(phrase)) {
      issues.push({
        rule: "V-04",
        severity: "critical",
        message: `banned phrase present: "${phrase}"`,
      });
    }
  }
  return issues;
}

/**
 * V-06 / V-07 — parent-facing strings must be Hebrew, no banned tokens.
 *
 * Hebrew check: parent-facing strings must contain at least one Hebrew
 * letter. They may contain punctuation, Hebrew quotes, em-dash, digits,
 * and basic ASCII punctuation. They must not contain English letters.
 */
export function validateLanguage(payload: RoutinePayload): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const strings = collectParentFacingStrings(payload);

  const englishLetters = /[A-Za-z]/;
  const hebrewLetters = /[\u0590-\u05FF]/;

  for (const s of strings) {
    if (!hebrewLetters.test(s)) {
      issues.push({
        rule: "V-06",
        severity: "critical",
        message: `parent-facing string lacks Hebrew letters: "${s}"`,
      });
    }
    if (englishLetters.test(s)) {
      issues.push({
        rule: "V-06",
        severity: "critical",
        message: `parent-facing string contains English letters: "${s}"`,
      });
    }
    for (const token of BANNED_TOKENS) {
      // Whole-word, case-insensitive match — token boundaries on non-letter chars.
      const re = new RegExp(`(^|[^A-Za-z])${escapeRegExp(token)}([^A-Za-z]|$)`, "i");
      if (re.test(s)) {
        issues.push({
          rule: "V-07",
          severity: "critical",
          message: `parent-facing string contains banned token "${token}": "${s}"`,
        });
      }
    }
  }
  return issues;
}

/**
 * V-08 — empty negation. A "לא" must be followed by a directional clause.
 * Heuristic: if a string is exactly "לא." or "לא" — flag.
 * If a string starts with "לא" and contains no other Hebrew word — flag.
 * This is a warning-level rule, not critical.
 */
export function validateEmptyNegation(payload: RoutinePayload): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const strings = collectParentFacingStrings(payload);
  const hebrewWord = /[\u0590-\u05FF]+/g;

  for (const s of strings) {
    const trimmed = s.trim();
    if (trimmed === "לא" || trimmed === "לא.") {
      issues.push({
        rule: "V-08",
        severity: "warning",
        message: `empty negation: "${s}"`,
      });
      continue;
    }
    const words = trimmed.match(hebrewWord) || [];
    if (words.length === 1 && words[0] === "לא") {
      issues.push({
        rule: "V-08",
        severity: "warning",
        message: `empty negation: "${s}"`,
      });
    }
  }
  return issues;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
