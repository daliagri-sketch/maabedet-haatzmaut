# ParentOS Pilot v1 — Routine Only

Built exactly per `parent_os_pilot_build_packet_v2_routine_only`.

## Scope

- 5 Routine cards (GS_001–GS_005)
- 7 layers each: מה באמת קורה / למה זה חוזר / מה אומרים / מה דורשים עכשיו / מה עושים בגוף / מה לא עושים עכשיו / כשיהיה קשה
- One fallback packet (atomic)
- One persistence table: `routine_views`
- Validation gateway with 7 V-rules

## Not in scope

No SOS. No Reflection. No chat. No classifier. No emotional state. No new content.

## Run

```bash
npm install
npm run dev        # starts Next.js
npm test           # runs vitest
npm run typecheck  # TypeScript
```

## Persistence

The pilot ships with `InMemoryDriver` for `routine_views`. Production wires Supabase using the schema in `lib/persistence.ts` and Pilot Runtime Spec v2 §C.4.

## File map

```
app/                           — routes (S1 home, S2 routine card)
components/                    — UI (RoutineCard, HomeCardList, ExitButton)
data/                          — locked seed JSON
contracts/                     — types (output_contract_v2, composition_contract_v2, enums)
validators/                    — gateway + 4 validators
lib/                           — composer + seed loader + persistence + precedence
types/                         — re-exports
styles/                        — globals.css (locked design tokens)
tests/                         — vitest specs
```

## Locked artifacts referenced

- ParentOS Output Contract v2 (Routine-only)
- ParentOS Composition Contract v2 (Routine-only)
- ParentOS Pilot Runtime Spec v2 (Routine-only)
- Gold Canonical Set v1.1
- Resistance Hold Source (renamed from SOS Hold Bank v1.0)

No other source consulted.
