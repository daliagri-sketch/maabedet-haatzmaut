/**
 * Source traceability validator.
 * Source: Output Contract v2 §A.4 (V-09)
 *
 *   V-09: All content traceable to a locked bank entry or hardcoded fallback.
 *
 * Every parent-facing string in a non-fallback payload must match
 * exactly a string in:
 *   - GOLD_SCENARIOS (the scenario's routine body)
 *
 * For a fallback payload, every string must match the FALLBACK_PACKET.
 * No paraphrase, no model generation.
 */

import type { RoutinePayload } from "../types/routine";
import { GOLD_SCENARIOS, FALLBACK_PACKET } from "../lib/seed_loader";
import type { ValidationIssue } from "./payload_validator";

export function validateSourceTraceability(payload: RoutinePayload): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (payload.meta.is_fallback) {
    // All parent-facing strings must match FALLBACK_PACKET exactly.
    return validateAgainstFallback(payload);
  }

  const scenario_id = payload.meta.scenario_id;
  if (!scenario_id) {
    issues.push({
      rule: "V-09",
      severity: "critical",
      message: "non-fallback payload has null scenario_id",
    });
    return issues;
  }

  const source = GOLD_SCENARIOS[scenario_id];
  if (!source) {
    issues.push({
      rule: "V-09",
      severity: "critical",
      message: `scenario_id "${scenario_id}" not in Gold Set`,
    });
    return issues;
  }

  const expected: Array<[string, string]> = [
    ["title", source.title],
    ["translation.what_is_really_happening", source.routine.what_is_really_happening],
    ["translation.why_it_repeats", source.routine.why_it_repeats],
    ["action.what_parent_says", source.routine.what_parent_says],
    ["action.what_parent_demands_now", source.routine.what_parent_demands_now],
    ["action.what_parent_does_in_body", source.routine.what_parent_does_in_body],
    ["action.what_parent_does_not_do", source.routine.what_parent_does_not_do],
    ["resistance_hold.when_it_gets_hard", source.routine.when_it_gets_hard],
  ];

  const actual: Record<string, string> = {
    "title": payload.title,
    "translation.what_is_really_happening": payload.translation.what_is_really_happening,
    "translation.why_it_repeats": payload.translation.why_it_repeats,
    "action.what_parent_says": payload.action.what_parent_says,
    "action.what_parent_demands_now": payload.action.what_parent_demands_now,
    "action.what_parent_does_in_body": payload.action.what_parent_does_in_body,
    "action.what_parent_does_not_do": payload.action.what_parent_does_not_do,
    "resistance_hold.when_it_gets_hard": payload.resistance_hold.when_it_gets_hard,
  };

  for (const [path, expectedValue] of expected) {
    const actualValue = actual[path];
    if (actualValue !== expectedValue) {
      issues.push({
        rule: "V-09",
        severity: "critical",
        message: `untraceable string at ${path} — does not match Gold Set source`,
      });
    }
  }

  return issues;
}

function validateAgainstFallback(payload: RoutinePayload): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const fb = FALLBACK_PACKET;

  const checks: Array<[string, string, string]> = [
    ["title", payload.title, fb.title],
    [
      "translation.what_is_really_happening",
      payload.translation.what_is_really_happening,
      fb.translation.what_is_really_happening,
    ],
    [
      "translation.why_it_repeats",
      payload.translation.why_it_repeats,
      fb.translation.why_it_repeats,
    ],
    ["action.what_parent_says", payload.action.what_parent_says, fb.action.what_parent_says],
    [
      "action.what_parent_demands_now",
      payload.action.what_parent_demands_now,
      fb.action.what_parent_demands_now,
    ],
    [
      "action.what_parent_does_in_body",
      payload.action.what_parent_does_in_body,
      fb.action.what_parent_does_in_body,
    ],
    [
      "action.what_parent_does_not_do",
      payload.action.what_parent_does_not_do,
      fb.action.what_parent_does_not_do,
    ],
    [
      "resistance_hold.when_it_gets_hard",
      payload.resistance_hold.when_it_gets_hard,
      fb.resistance_hold.when_it_gets_hard,
    ],
  ];

  for (const [path, actual, expected] of checks) {
    if (actual !== expected) {
      issues.push({
        rule: "V-09",
        severity: "critical",
        message: `fallback payload mismatch at ${path}`,
      });
    }
  }

  return issues;
}
