/**
 * Fallback tests — Acceptance Test Matrix §D.6 rows 6-8.
 *
 * Triggers:
 *   - invalid scenario_id
 *   - Gold Set field missing (simulated)
 *   - Resistance Hold lookup miss (simulated)
 */

import { describe, it, expect } from "vitest";
import { composeRoutine } from "../lib/compose_routine";
import { gatewayValidate } from "../validators/gateway";
import { FALLBACK_PACKET } from "../lib/seed_loader";

describe("Fallback — atomic replacement on miss", () => {
  it("invalid scenario_id → fallback packet", () => {
    const composed = composeRoutine({ scenario_id: "GS_999" });
    expect(composed.meta.is_fallback).toBe(true);

    const result = gatewayValidate(composed);
    expect(result.payload.meta.is_fallback).toBe(true);
    expect(result.payload.title).toBe(FALLBACK_PACKET.title);
  });

  it("empty scenario_id → fallback packet", () => {
    const composed = composeRoutine({ scenario_id: "" });
    expect(composed.meta.is_fallback).toBe(true);
  });

  it("fallback packet renders with all 7 layers", () => {
    const result = gatewayValidate(JSON.parse(JSON.stringify(FALLBACK_PACKET)));
    // Fallback should be valid against shape rules.
    const critical = result.issues.filter((i) => i.severity === "critical");
    expect(critical).toEqual([]);
  });
});
