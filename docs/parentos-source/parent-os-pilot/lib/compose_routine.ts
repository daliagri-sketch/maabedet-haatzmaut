/**
 * Routine composer — the only composer in pilot v1.
 * Source: Composition Contract v2 §B.1, B.2
 *
 * Path:
 *   Step 1 → translation.what_is_really_happening   (Gold Set)
 *   Step 2 → translation.why_it_repeats             (Gold Set)
 *   Step 3 → action.what_parent_says                (Gold Set)
 *   Step 4 → action.what_parent_demands_now         (Gold Set)
 *   Step 5 → action.what_parent_does_in_body        (Gold Set)
 *   Step 6 → action.what_parent_does_not_do         (Gold Set)
 *   Step 7 → resistance_hold.when_it_gets_hard      (Gold Set — pre-resolved at seed)
 *
 * If any field missing → atomic fallback.
 */

import { GOLD_SCENARIOS, FALLBACK_PACKET, isGoldScenarioId } from "./seed_loader";
import type { RoutinePayload } from "../types/routine";
import { MODE } from "../contracts/enums";

export interface ComposeRoutineInput {
  scenario_id: string;
}

export function composeRoutine(input: ComposeRoutineInput): RoutinePayload {
  const { scenario_id } = input;

  // Routing check — scenario must be in Gold Set.
  if (!isGoldScenarioId(scenario_id)) {
    return cloneFallback();
  }

  const scenario = GOLD_SCENARIOS[scenario_id];
  if (!scenario) {
    return cloneFallback();
  }

  // Required fields check — atomic fallback if any missing or empty.
  const r = scenario.routine;
  const required: ReadonlyArray<keyof typeof r> = [
    "what_is_really_happening",
    "why_it_repeats",
    "what_parent_says",
    "what_parent_demands_now",
    "what_parent_does_in_body",
    "what_parent_does_not_do",
    "when_it_gets_hard",
  ];

  for (const k of required) {
    const v = r[k];
    if (typeof v !== "string" || v.trim().length === 0) {
      return cloneFallback();
    }
  }

  const payload: RoutinePayload = {
    header: {
      age_band: scenario.age_band,
      arena: scenario.arena,
      mode: MODE,
    },
    title: scenario.title,
    translation: {
      what_is_really_happening: r.what_is_really_happening,
      why_it_repeats: r.why_it_repeats,
    },
    action: {
      what_parent_says: r.what_parent_says,
      what_parent_demands_now: r.what_parent_demands_now,
      what_parent_does_in_body: r.what_parent_does_in_body,
      what_parent_does_not_do: r.what_parent_does_not_do,
    },
    resistance_hold: {
      when_it_gets_hard: r.when_it_gets_hard,
    },
    meta: {
      pattern: scenario.pattern,
      scenario_id: scenario.scenario_id,
      hold_id: scenario.hold_id,
      is_fallback: false,
    },
  };

  return payload;
}

/**
 * Clones the frozen fallback packet so callers can safely attach metadata.
 */
function cloneFallback(): RoutinePayload {
  return JSON.parse(JSON.stringify(FALLBACK_PACKET)) as RoutinePayload;
}
