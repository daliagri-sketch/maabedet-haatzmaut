/**
 * Payload validator.
 * Source: Output Contract v2 §A.4 (V-01, V-02, V-05)
 *
 *   V-01: All 7 body fields present, non-empty.
 *   V-02: Order locked.
 *   V-05: No SOS / emotional_state / closure_actions / reflection fields.
 */

import type { RoutinePayload } from "../types/routine";
import { LAYER_ORDER } from "../types/routine";

export interface ValidationIssue {
  rule: string;
  severity: "critical" | "warning";
  message: string;
}

const FORBIDDEN_TOP_LEVEL_KEYS = [
  "closure_actions",
  "cta_secondary",
  "support_layer",
  "explanation",
  "knowledge_layer",
  "reflection",
  "sos",
  "emotional_state",
];

const FORBIDDEN_NESTED_KEYS = [
  "closure_actions",
  "support_layer",
  "explanation",
  "reflection",
  "sos",
  "emotional_state",
];

export function validatePayloadShape(payload: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (typeof payload !== "object" || payload === null) {
    return [{ rule: "V-01", severity: "critical", message: "payload is not an object" }];
  }

  const p = payload as Record<string, unknown>;

  // V-01 — required top-level keys
  const requiredTop = ["header", "title", "translation", "action", "resistance_hold", "meta"];
  for (const k of requiredTop) {
    if (!(k in p)) {
      issues.push({ rule: "V-01", severity: "critical", message: `missing top-level field: ${k}` });
    }
  }

  // V-05 — forbidden top-level keys
  for (const k of FORBIDDEN_TOP_LEVEL_KEYS) {
    if (k in p) {
      issues.push({
        rule: "V-05",
        severity: "critical",
        message: `forbidden top-level field present: ${k}`,
      });
    }
  }

  // V-01 — header must have age_band, arena, mode
  const header = p.header as Record<string, unknown> | undefined;
  if (header) {
    for (const k of ["age_band", "arena", "mode"]) {
      if (!header[k] || typeof header[k] !== "string") {
        issues.push({
          rule: "V-01",
          severity: "critical",
          message: `header.${k} missing or invalid`,
        });
      }
    }
    if (header.mode !== "routine") {
      issues.push({
        rule: "V-05",
        severity: "critical",
        message: `header.mode must be "routine", got "${header.mode}"`,
      });
    }
  }

  // V-01 — translation must have both fields, non-empty
  const t = p.translation as Record<string, unknown> | undefined;
  if (t) {
    for (const k of ["what_is_really_happening", "why_it_repeats"]) {
      if (!isNonEmptyString(t[k])) {
        issues.push({
          rule: "V-01",
          severity: "critical",
          message: `translation.${k} missing or empty`,
        });
      }
    }
  }

  // V-01 — action must have all 4 fields, non-empty
  const a = p.action as Record<string, unknown> | undefined;
  if (a) {
    for (const k of [
      "what_parent_says",
      "what_parent_demands_now",
      "what_parent_does_in_body",
      "what_parent_does_not_do",
    ]) {
      if (!isNonEmptyString(a[k])) {
        issues.push({
          rule: "V-01",
          severity: "critical",
          message: `action.${k} missing or empty`,
        });
      }
    }
  }

  // V-01 — resistance_hold must have when_it_gets_hard, non-empty
  const rh = p.resistance_hold as Record<string, unknown> | undefined;
  if (rh) {
    if (!isNonEmptyString(rh.when_it_gets_hard)) {
      issues.push({
        rule: "V-01",
        severity: "critical",
        message: "resistance_hold.when_it_gets_hard missing or empty",
      });
    }
  }

  // V-05 — forbidden nested keys
  function scanForForbiddenKeys(obj: unknown, path: string): void {
    if (!obj || typeof obj !== "object") return;
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (FORBIDDEN_NESTED_KEYS.includes(k) && path !== "") {
        issues.push({
          rule: "V-05",
          severity: "critical",
          message: `forbidden nested field present: ${path}.${k}`,
        });
      }
      if (v && typeof v === "object") {
        scanForForbiddenKeys(v, path === "" ? k : `${path}.${k}`);
      }
    }
  }
  scanForForbiddenKeys(p, "");

  // V-01 — meta must include is_fallback
  const m = p.meta as Record<string, unknown> | undefined;
  if (m && typeof m.is_fallback !== "boolean") {
    issues.push({
      rule: "V-01",
      severity: "critical",
      message: "meta.is_fallback missing or not boolean",
    });
  }

  return issues;
}

/**
 * V-02 — order check.
 * The payload object key order is informational only; the UI binds via
 * LAYER_ORDER. This function confirms LAYER_ORDER matches the contract.
 */
export function validateLayerOrderContract(): ValidationIssue[] {
  const expected = [
    "what_is_really_happening",
    "why_it_repeats",
    "what_parent_says",
    "what_parent_demands_now",
    "what_parent_does_in_body",
    "what_parent_does_not_do",
    "when_it_gets_hard",
  ];
  const actual = [...LAYER_ORDER];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    return [
      {
        rule: "V-02",
        severity: "critical",
        message: `LAYER_ORDER mismatch — got ${JSON.stringify(actual)}`,
      },
    ];
  }
  return [];
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

export function validatePayload(payload: RoutinePayload): ValidationIssue[] {
  return [...validatePayloadShape(payload), ...validateLayerOrderContract()];
}
