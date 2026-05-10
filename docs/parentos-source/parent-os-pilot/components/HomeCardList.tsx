/**
 * HomeCardList — Home screen.
 * Source: Pilot Runtime Spec v2 §C.6 (S1 Home)
 *
 * 5 entry buttons — one per Gold scenario.
 * No SOS button. No emotional state selector.
 */

import Link from "next/link";
import { GOLD_SCENARIOS, GOLD_SCENARIO_IDS } from "../lib/seed_loader";

const ARENA_HEBREW: Record<string, string> = {
  morning: "בוקר",
  sleep: "שינה",
  homework: "שיעורי בית",
};

const AGE_HEBREW: Record<string, string> = {
  "3-4": "גיל 3–4",
  "5-6": "גיל 5–6",
  "7-8": "גיל 7–8",
  "9-10": "גיל 9–10",
};

export default function HomeCardList() {
  return (
    <ul dir="rtl" className="home-list" aria-label="רגעים">
      {GOLD_SCENARIO_IDS.map((id) => {
        const s = GOLD_SCENARIOS[id];
        if (!s) return null;
        const arena = ARENA_HEBREW[s.arena] ?? s.arena;
        const age = AGE_HEBREW[s.age_band] ?? s.age_band;
        return (
          <li key={id} className="home-list-item">
            <Link href={`/routine/${id}`} className="home-card-link" aria-label={s.title}>
              <span className="home-card-title">{s.title}</span>
              <span className="home-card-meta">
                {arena} · {age}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
