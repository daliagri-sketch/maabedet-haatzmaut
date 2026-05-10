/**
 * ParentOS Output Contract v2 — Routine-only.
 * Source: parent_os_output_contract_v2_routine_only §A.2
 *
 * One card type. Seven layers. Fixed order.
 *
 * Forbidden anywhere in this payload:
 *   - closure_actions
 *   - cta_secondary
 *   - support_layer
 *   - explanation
 *   - knowledge_layer
 *   - reflection
 *   - sos
 *   - emotional_state
 *   - mode = "sos"
 *   - "RESCUE" (anywhere)
 *   - "אם תבוא התנגדות" (anywhere)
 */

import type { Pattern, Arena, AgeBand, Mode } from "./enums";

export interface RoutineHeader {
  age_band: AgeBand | "inherited";
  arena: Arena | "inherited";
  mode: Mode;
}

export interface RoutineTranslation {
  what_is_really_happening: string;
  why_it_repeats: string;
}

export interface RoutineAction {
  what_parent_says: string;
  what_parent_demands_now: string;
  what_parent_does_in_body: string;
  what_parent_does_not_do: string;
}

export interface ResistanceHold {
  when_it_gets_hard: string;
}

export interface RoutineMeta {
  pattern: Pattern | null;
  scenario_id: string | null;
  somatic_id?: string | null;
  hold_id?: string | null;
  is_fallback: boolean;
}

export interface RoutinePayload {
  header: RoutineHeader;
  title: string;
  translation: RoutineTranslation;
  action: RoutineAction;
  resistance_hold: ResistanceHold;
  meta: RoutineMeta;
}

/**
 * The fixed display order — never reorder, never skip.
 * Source: Output Contract v2 §A.1
 */
export const LAYER_ORDER = [
  "what_is_really_happening",
  "why_it_repeats",
  "what_parent_says",
  "what_parent_demands_now",
  "what_parent_does_in_body",
  "what_parent_does_not_do",
  "when_it_gets_hard",
] as const;

/**
 * Hebrew labels — bound by the UI, never embedded in payload data.
 * Source: Output Contract v2 §A.3
 */
export const LAYER_LABELS: Record<typeof LAYER_ORDER[number], string> = {
  what_is_really_happening: "מה באמת קורה",
  why_it_repeats: "למה זה חוזר",
  what_parent_says: "מה אומרים",
  what_parent_demands_now: "מה דורשים עכשיו",
  what_parent_does_in_body: "מה עושים בגוף",
  what_parent_does_not_do: "מה לא עושים עכשיו",
  when_it_gets_hard: "כשיהיה קשה",
};
