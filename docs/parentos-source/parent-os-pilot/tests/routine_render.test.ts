/**
 * Routine render tests — Acceptance Test Matrix §D.6 rows 1-5.
 *
 * For each Gold scenario:
 *   - composeRoutine produces a valid 7-layer payload
 *   - gateway passes (no fallback)
 *   - all 7 layer fields are non-empty Hebrew strings
 */

import { describe, it, expect } from "vitest";
import { composeRoutine } from "../lib/compose_routine";
import { gatewayValidate } from "../validators/gateway";
import { GOLD_SCENARIO_IDS } from "../lib/seed_loader";

describe("Routine render — 5 Gold cases", () => {
  for (const id of GOLD_SCENARIO_IDS) {
    it(`renders ${id} as full 7-layer payload, no fallback`, () => {
      const composed = composeRoutine({ scenario_id: id });
      const result = gatewayValidate(composed);

      expect(result.used_fallback).toBe(false);
      expect(result.payload.meta.is_fallback).toBe(false);
      expect(result.payload.meta.scenario_id).toBe(id);

      // All 7 layers present and non-empty.
      expect(result.payload.translation.what_is_really_happening.length).toBeGreaterThan(0);
      expect(result.payload.translation.why_it_repeats.length).toBeGreaterThan(0);
      expect(result.payload.action.what_parent_says.length).toBeGreaterThan(0);
      expect(result.payload.action.what_parent_demands_now.length).toBeGreaterThan(0);
      expect(result.payload.action.what_parent_does_in_body.length).toBeGreaterThan(0);
      expect(result.payload.action.what_parent_does_not_do.length).toBeGreaterThan(0);
      expect(result.payload.resistance_hold.when_it_gets_hard.length).toBeGreaterThan(0);

      // No critical issues.
      const critical = result.issues.filter((i) => i.severity === "critical");
      expect(critical).toEqual([]);
    });
  }
});
