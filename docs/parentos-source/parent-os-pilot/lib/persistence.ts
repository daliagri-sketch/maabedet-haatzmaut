/**
 * Persistence — Routine-only Pilot v1.
 * Source: Pilot Runtime Spec v2 §C.4
 *
 * Only one table: routine_views.
 * No sos_events. No reflection_events.
 *
 * This module exposes the contract; the actual DB driver is wired
 * by the host environment (Supabase). The pilot uses parameterized
 * statements equivalent to the schema defined in §C.4.
 */

import type { RoutineViewRow } from "../types/events";

export interface PersistenceDriver {
  insertRoutineView(row: RoutineViewRow): Promise<void>;
  closeRoutineView(view_id: string, closed_at: string): Promise<void>;
}

/**
 * In-memory driver — used during build/dev only. Production wires Supabase.
 */
export class InMemoryDriver implements PersistenceDriver {
  private rows: Map<string, RoutineViewRow> = new Map();

  async insertRoutineView(row: RoutineViewRow): Promise<void> {
    this.rows.set(row.view_id, row);
  }

  async closeRoutineView(view_id: string, closed_at: string): Promise<void> {
    const row = this.rows.get(view_id);
    if (!row) return;
    this.rows.set(view_id, { ...row, closed_at });
  }

  // Test helpers — not part of the public contract.
  _all(): RoutineViewRow[] {
    return Array.from(this.rows.values());
  }
  _clear(): void {
    this.rows.clear();
  }
}

export const driver: PersistenceDriver = new InMemoryDriver();
