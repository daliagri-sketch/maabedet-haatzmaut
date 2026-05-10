/**
 * S2 — Routine Card route.
 * Source: Pilot Runtime Spec v2 §C.6 (S2) + Runtime Flow §D.4
 *
 * Flow:
 *   tap Routine card (scenario_id)
 *   → compose_routine(scenario_id)
 *   → gateway.validate(payload)
 *      • critical fail → replace with fallback_packet
 *   → write routine_views row
 *   → render S2 Routine Card
 *   → tap "חזרתי"
 *   → write routine_views.closed_at
 *   → S1 Home
 */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import RoutineCard from "../../../components/RoutineCard";
import ExitButton from "../../../components/ExitButton";
import { composeRoutine } from "../../../lib/compose_routine";
import { gatewayValidate } from "../../../validators/gateway";
import { driver } from "../../../lib/persistence";
import type { RoutinePayload } from "../../../types/routine";
import type { RoutineViewRow } from "../../../types/events";

interface PageProps {
  params: { scenario_id: string };
}

export default function RoutinePage({ params }: PageProps) {
  const router = useRouter();
  const [viewId] = useState<string>(() => generateUuid());
  const [payload, setPayload] = useState<RoutinePayload | null>(null);

  // Compose + validate + persist on mount.
  useEffect(() => {
    const composed = composeRoutine({ scenario_id: params.scenario_id });
    const result = gatewayValidate(composed);
    setPayload(result.payload);

    const row: RoutineViewRow = {
      view_id: viewId,
      user_id: getUserId(),
      session_id: getSessionId(),
      scenario_id: params.scenario_id,
      is_fallback: result.payload.meta.is_fallback,
      viewed_at: new Date().toISOString(),
      closed_at: null,
    };
    void driver.insertRoutineView(row);
  }, [params.scenario_id, viewId]);

  const handleReturn = useMemo(
    () => async () => {
      await driver.closeRoutineView(viewId, new Date().toISOString());
      router.push("/");
    },
    [router, viewId]
  );

  if (!payload) return null;

  return (
    <div dir="rtl" className="routine-page">
      <ExitButton onExit={() => router.push("/")} />
      <RoutineCard payload={payload} onReturn={handleReturn} />
    </div>
  );
}

// --- minimal helpers ---

function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // RFC 4122 v4 fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getUserId(): string {
  // Pilot v1 stub. Production wires Supabase auth.
  if (typeof window === "undefined") return "anonymous";
  const key = "parent_os_user_id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = generateUuid();
    window.localStorage.setItem(key, id);
  }
  return id;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "anonymous";
  const key = "parent_os_session_id";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = generateUuid();
    window.sessionStorage.setItem(key, id);
  }
  return id;
}
