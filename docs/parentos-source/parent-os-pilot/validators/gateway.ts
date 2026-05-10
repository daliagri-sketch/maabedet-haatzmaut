/**
 * Validation gateway.
 * Source: Pilot Build Packet v2 §D.5
 *
 * Order:
 *   1. shape_validator         — V-01, V-05
 *   2. forbidden_field_check   — included in shape (V-05)
 *   3. enum_validator          — V-03 (canonical patterns)
 *   4. rescue_check            — V-03 hard scan
 *   5. banned_phrase_check     — V-04
 *   6. banned_token_check      — V-07
 *   7. source_traceability     — V-09
 *
 * Critical fail → fallback packet.
 * Warning → log only, payload passes.
 */

import type { RoutinePayload } from "../types/routine";
import { FALLBACK_PACKET } from "../lib/seed_loader";

import { validatePayload } from "./payload_validator";
import {
  validateBannedPhrases,
  validateLanguage,
  validateEmptyNegation,
} from "./language_validator";
import { validatePattern, validateNoRescue } from "./pattern_validator";
import { validateSourceTraceability } from "./source_validator";

import type { ValidationIssue } from "./payload_validator";

export interface GatewayResult {
  payload: RoutinePayload;
  issues: ValidationIssue[];
  used_fallback: boolean;
}

export function gatewayValidate(payload: RoutinePayload): GatewayResult {
  const allIssues: ValidationIssue[] = [];

  // Run validators in declared order.
  allIssues.push(...validatePayload(payload));
  allIssues.push(...validateBannedPhrases(payload));
  allIssues.push(...validateLanguage(payload));
  allIssues.push(...validateEmptyNegation(payload));
  allIssues.push(...validatePattern(payload));
  allIssues.push(...validateNoRescue(payload));
  allIssues.push(...validateSourceTraceability(payload));

  const hasCritical = allIssues.some((i) => i.severity === "critical");

  if (hasCritical) {
    // Atomic fallback. Re-validate the fallback to surface defects in the bank.
    const fb = JSON.parse(JSON.stringify(FALLBACK_PACKET)) as RoutinePayload;
    return { payload: fb, issues: allIssues, used_fallback: true };
  }

  return { payload, issues: allIssues, used_fallback: false };
}
