/**
 * RoutineCard — renders the 7-layer Routine card in locked order.
 * Source: UI Binding Map — Pilot Runtime Spec v2 §C.6
 *
 * Order is doctrine. Never reordered. Never skipped.
 */

import type { RoutinePayload } from "../types/routine";
import { LAYER_ORDER, LAYER_LABELS } from "../types/routine";

interface RoutineCardProps {
  payload: RoutinePayload;
  onReturn: () => void;
}

export default function RoutineCard({ payload, onReturn }: RoutineCardProps) {
  const sections: Array<{ key: typeof LAYER_ORDER[number]; label: string; text: string }> = [
    {
      key: "what_is_really_happening",
      label: LAYER_LABELS.what_is_really_happening,
      text: payload.translation.what_is_really_happening,
    },
    {
      key: "why_it_repeats",
      label: LAYER_LABELS.why_it_repeats,
      text: payload.translation.why_it_repeats,
    },
    {
      key: "what_parent_says",
      label: LAYER_LABELS.what_parent_says,
      text: payload.action.what_parent_says,
    },
    {
      key: "what_parent_demands_now",
      label: LAYER_LABELS.what_parent_demands_now,
      text: payload.action.what_parent_demands_now,
    },
    {
      key: "what_parent_does_in_body",
      label: LAYER_LABELS.what_parent_does_in_body,
      text: payload.action.what_parent_does_in_body,
    },
    {
      key: "what_parent_does_not_do",
      label: LAYER_LABELS.what_parent_does_not_do,
      text: payload.action.what_parent_does_not_do,
    },
    {
      key: "when_it_gets_hard",
      label: LAYER_LABELS.when_it_gets_hard,
      text: payload.resistance_hold.when_it_gets_hard,
    },
  ];

  return (
    <article dir="rtl" className="routine-card" data-fallback={payload.meta.is_fallback}>
      <h1 className="routine-title">{payload.title}</h1>

      <div className="routine-divider" aria-hidden="true" />

      {sections.map((s) => (
        <section key={s.key} className="routine-layer" data-layer={s.key}>
          <h2 className="layer-label">{s.label}</h2>
          <p className="layer-text">{s.text}</p>
        </section>
      ))}

      <div className="routine-divider" aria-hidden="true" />

      <button
        type="button"
        className="cta-primary"
        onClick={onReturn}
        aria-label="חזרתי"
      >
        חזרתי
      </button>
    </article>
  );
}
