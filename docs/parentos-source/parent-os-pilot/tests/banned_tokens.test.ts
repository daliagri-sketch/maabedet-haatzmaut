/**
 * Banned token scan — Acceptance Test Matrix §D.6 rows 9, 11.
 *
 *   Row 9:  Banned tokens — zero occurrences in parent-facing strings
 *           across all 5 cases.
 *   Row 11: "אם תבוא התנגדות" — zero occurrences anywhere.
 */

import { describe, it, expect } from "vitest";
import { composeRoutine } from "../lib/compose_routine";
import { GOLD_SCENARIO_IDS, FALLBACK_PACKET } from "../lib/seed_loader";

const BANNED_PHRASE = "אם תבוא התנגדות";

const BANNED_TOKENS_PARENT_FACING = [
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

function parentFacingStrings(payload: ReturnType<typeof composeRoutine>): string[] {
  return [
    payload.title,
    payload.translation.what_is_really_happening,
    payload.translation.why_it_repeats,
    payload.action.what_parent_says,
    payload.action.what_parent_demands_now,
    payload.action.what_parent_does_in_body,
    payload.action.what_parent_does_not_do,
    payload.resistance_hold.when_it_gets_hard,
  ];
}

describe("Banned token scan — full UI surface", () => {
  it('"אם תבוא התנגדות" — zero occurrences in any payload', () => {
    for (const id of GOLD_SCENARIO_IDS) {
      const p = composeRoutine({ scenario_id: id });
      const blob = JSON.stringify(p);
      expect(blob.includes(BANNED_PHRASE)).toBe(false);
    }
    const fbBlob = JSON.stringify(FALLBACK_PACKET);
    expect(fbBlob.includes(BANNED_PHRASE)).toBe(false);
  });

  it("banned tokens — zero occurrences in parent-facing strings", () => {
    for (const id of GOLD_SCENARIO_IDS) {
      const p = composeRoutine({ scenario_id: id });
      const strings = parentFacingStrings(p);
      for (const s of strings) {
        for (const token of BANNED_TOKENS_PARENT_FACING) {
          const re = new RegExp(`(^|[^A-Za-z])${escapeRe(token)}([^A-Za-z]|$)`, "i");
          expect(
            re.test(s),
            `banned token "${token}" in "${s}" of ${id}`
          ).toBe(false);
        }
      }
    }
  });

  it("English letters absent from parent-facing strings", () => {
    for (const id of GOLD_SCENARIO_IDS) {
      const p = composeRoutine({ scenario_id: id });
      const strings = parentFacingStrings(p);
      for (const s of strings) {
        // Hebrew quotes (״ and gershayim) are allowed; English letters are not.
        expect(/[A-Za-z]/.test(s), `English letters in "${s}" of ${id}`).toBe(false);
      }
    }
  });
});

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
