/**
 * Persistence types — Routine-only Pilot v1.
 * Source: Pilot Runtime Spec v2 §C.4
 *
 * Only one table exists: routine_views.
 * No sos_events. No reflection_events.
 */

export interface RoutineViewRow {
  view_id: string;
  user_id: string;
  session_id: string;
  scenario_id: string;
  is_fallback: boolean;
  viewed_at: string; // ISO 8601
  closed_at: string | null; // set when parent taps "חזרתי"
}
