/**
 * Pattern validator.
 * Source: Output Contract v2 §A.4 (V-03)
 *
 *   V-03: meta.pattern ∈ 4 canonical values; RESCUE rejected.
 *
 * RESCUE is a legacy Somatic Bank label. It maps to quiet_surrender
 * at seed time only. It must never appear at runtime — anywhere.
 */

import type { RoutinePayload } from "../types/routine";
import { PATTERNS } from "../contracts/enums";
import type { ValidationIssue } from "./payload_validator";

const CANONICAL_PATTERNS: ReadonlyArray<string> = PATTERNS;

export function validatePattern(payload: RoutinePayload): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const p = payload.meta.pattern;

  // Fallback packets carry pattern: null — that's allowed.
  if (p === null && payload.meta.is_fallback) {
    return issues;
  }

  if (p === null) {
    issues.push({
      rule: "V-03",
      severity: "critical",
      message: "meta.pattern is null on a non-fallback payload",
    });
    return issues;
  }

  if (!CANONICAL_PATTERNS.includes(p)) {
    issues.push({
      rule: "V-03",
      severity: "critical",
      message: `meta.pattern is not canonical: "${p}"`,
    });
  }
  return issues;
}

/**
 * V-03 hard check — RESCUE must not appear anywhere in the payload.
 * Scans the serialized form so it catches RESCUE in any field, key, or value.
 */
export function validateNoRescue(payload: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const blob = JSON.stringify(payload);
  // Match RESCUE as a whole word (case-sensitive — the canonical legacy label).
  if (/(^|[^A-Za-z])RESCUE([^A-Za-z]|$)/.test(blob)) {
    issues.push({
      rule: "V-03",
      severity: "critical",
      message: 'forbidden legacy term "RESCUE" present in payload',
    });
  }
  return issues;
}
