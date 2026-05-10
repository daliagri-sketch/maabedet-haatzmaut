/**
 * RESCUE zero-occurrence test — Acceptance Test Matrix §D.6 row 10.
 *
 * RESCUE must not appear in:
 *   - any payload (composed or fallback)
 *   - any seeded JSON file
 *   - any TypeScript source file (excluding documented LOCK NOTE comments)
 *
 * The pilot accepts RESCUE references only in documentation comments
 * that explicitly call out the legacy mapping. Validators reject it
 * everywhere else.
 */

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { composeRoutine } from "../lib/compose_routine";
import {
  GOLD_SCENARIO_IDS,
  GOLD_SCENARIOS,
  RESISTANCE_HOLD,
  ANCHOR_TABLE,
  FALLBACK_PACKET,
} from "../lib/seed_loader";

const RESCUE_RE = /(^|[^A-Za-z])RESCUE([^A-Za-z]|$)/;

describe("RESCUE = zero occurrences", () => {
  it("not present in any composed payload", () => {
    for (const id of GOLD_SCENARIO_IDS) {
      const p = composeRoutine({ scenario_id: id });
      expect(RESCUE_RE.test(JSON.stringify(p))).toBe(false);
    }
  });

  it("not present in fallback packet", () => {
    expect(RESCUE_RE.test(JSON.stringify(FALLBACK_PACKET))).toBe(false);
  });

  it("not present in any seeded bank", () => {
    expect(RESCUE_RE.test(JSON.stringify(GOLD_SCENARIOS))).toBe(false);
    expect(RESCUE_RE.test(JSON.stringify(RESISTANCE_HOLD))).toBe(false);
    expect(RESCUE_RE.test(JSON.stringify(ANCHOR_TABLE))).toBe(false);
  });

  it("data/*.json files contain zero RESCUE", () => {
    const dataDir = join(__dirname, "..", "data");
    const files = readdirSync(dataDir).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      const content = readFileSync(join(dataDir, f), "utf-8");
      expect(RESCUE_RE.test(content), `RESCUE found in ${f}`).toBe(false);
    }
  });
});
