/**
 * Source precedence resolver.
 * Source: Composition Contract v2 §B.4
 *
 * Order:
 *   1. Gold Canonical Set v1.1   — owns layers 1-6 + title + header
 *   2. Resistance Hold Source     — owns layer 7 (when Gold is silent on it)
 *   3. Routine Fallback Packet    — atomic replacement on any miss
 *
 * Note: In pilot v1, Gold scenarios already carry layer 7 (when_it_gets_hard)
 * inlined per §D.3.1 (resolved at seed time). The Resistance Hold Source
 * is retained for traceability and v1.1 expansion. This module exposes
 * lookup utilities; the composer reads Gold first.
 */

import { RESISTANCE_HOLD } from "./seed_loader";
import type { Pattern, HoldType } from "../contracts/enums";
import type { ResistanceHoldEntry } from "../types/banks";

/**
 * Lookup a Resistance Hold entry by (pattern, hold_type).
 * Returns null on miss — caller must trigger fallback.
 */
export function lookupResistanceHold(
  pattern: Pattern,
  hold_type: HoldType
): ResistanceHoldEntry | null {
  const entries = Object.values(RESISTANCE_HOLD);
  const match = entries.find(
    (e) => e.pattern === pattern && e.hold_type === hold_type
  );
  return match ?? null;
}
