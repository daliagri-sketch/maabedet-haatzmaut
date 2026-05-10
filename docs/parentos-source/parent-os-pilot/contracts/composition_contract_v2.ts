/**
 * ParentOS Composition Contract v2 — Routine-only.
 * Source: parent_os_composition_contract_v2_routine_only
 *
 * Bridge: Locked banks → Locked output.
 * Composer never generates text. Composer never paraphrases.
 * Composer never stitches banks together to "complete" a Gold scenario.
 * Fallback is atomic — partial composition is forbidden.
 */

import type { Pattern, Arena, AgeBand, HoldType } from "./enums";

export interface GoldRoutineBody {
  what_is_really_happening: string;
  why_it_repeats: string;
  what_parent_says: string;
  what_parent_demands_now: string;
  what_parent_does_in_body: string;
  what_parent_does_not_do: string;
  when_it_gets_hard: string;
}

export interface GoldScenario {
  scenario_id: string;
  title: string;
  pattern: Pattern;
  arena: Arena;
  age_band: AgeBand;
  routine: GoldRoutineBody;
  hold_id: string;
}

export interface ResistanceHoldEntry {
  hold_id: string;
  pattern: Pattern;
  hold_type: HoldType;
  text: string;
}

export interface AnchorEntry {
  pattern: Pattern;
  primary_anchor: string;
}

/**
 * Source precedence — Composition Contract v2 §B.4
 *
 *   1. Gold Canonical Set v1.1   — owns layers 1-6 + title + header
 *   2. Resistance Hold Source     — owns layer 7
 *   3. Routine Fallback Packet    — atomic replacement on any miss
 */
export const SOURCE_PRECEDENCE = [
  "gold_canonical_set",
  "resistance_hold_source",
  "fallback_packet",
] as const;

export type CompositionResult =
  | { ok: true; payload: import("./output_contract_v2").RoutinePayload; flags: string[] }
  | { ok: false; reason: string };
