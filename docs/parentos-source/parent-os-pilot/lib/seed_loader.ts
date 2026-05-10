/**
 * Seed loader.
 * Loads locked JSON banks at boot. Freezes them. Exposes typed access.
 *
 * Source: Pilot Build Packet v2 §D.3
 */

import goldScenariosRaw from "../data/gold_scenarios.json";
import resistanceHoldRaw from "../data/resistance_hold_source.json";
import anchorTableRaw from "../data/anchor_table.json";
import fallbackRaw from "../data/fallback_packet.json";

import type { GoldScenariosBank, ResistanceHoldBank, AnchorBank } from "../types/banks";
import type { RoutinePayload } from "../types/routine";

// Deep-freeze utility — banks are read-only at runtime.
function deepFreeze<T>(obj: T): T {
  Object.freeze(obj);
  Object.values(obj as Record<string, unknown>).forEach((v) => {
    if (v && typeof v === "object" && !Object.isFrozen(v)) {
      deepFreeze(v);
    }
  });
  return obj;
}

export const GOLD_SCENARIOS = deepFreeze(goldScenariosRaw as GoldScenariosBank);
export const RESISTANCE_HOLD = deepFreeze(resistanceHoldRaw as ResistanceHoldBank);
export const ANCHOR_TABLE = deepFreeze(anchorTableRaw as AnchorBank);
export const FALLBACK_PACKET = deepFreeze(fallbackRaw as RoutinePayload);

/**
 * The 5 Gold scenario IDs — closed list.
 * Pilot v1 accepts no scenario_id outside this set.
 */
export const GOLD_SCENARIO_IDS = ["GS_001", "GS_002", "GS_003", "GS_004", "GS_005"] as const;
export type GoldScenarioId = typeof GOLD_SCENARIO_IDS[number];

export function isGoldScenarioId(id: string): id is GoldScenarioId {
  return (GOLD_SCENARIO_IDS as readonly string[]).includes(id);
}
