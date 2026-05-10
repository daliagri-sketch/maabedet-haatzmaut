# INDEX — 03_TECH

**תיקייה ראשית:** Technical Specifications & Skills

**תאריך עדכון:** 09.05.2026

---

## 🎯 תפקיד התיקייה

מפרטים טכניים, skills, contracts, וארכיטקטורה טכנית.  
**כל ההחלטות הטכניות והגדרת ה-runtime מתועדות כאן.**

---

## 📁 מבנה תיקיות משנה

```
03_TECH/
├── specs/      (5 קבצים)
├── skills/     (8 קבצים)
└── contracts/  (4 קבצים)
```

---

## 📄 קבצים בתיקייה

### `03_TECH/specs/`

#### 1. **Tech_Stack_Spec_v1_0_04_05_2026.md**
- **תיאור:** Stack טכנולוגי
- **תוכן:** Next.js 16.2.6, TypeScript, Tailwind, Supabase
- **פורמט:** Markdown
- **שימוש:** Build guidelines

#### 2. **Database_Schema_v1_2_04_05_2026.md**
- **תיאור:** DB schema
- **תוכן:** Tables: users, children, contexts, interactions, guidance_outputs
- **גרסה:** v1.2 (עדכון 04.05.2026)
- **פורמט:** Markdown
- **שימוש:** Supabase migrations

#### 3. **API_Contract_v1_0_04_05_2026.md**
- **תיאור:** API endpoints
- **תוכן:** POST /api/guidance, GET /api/context, PUT /api/reflection
- **פורמט:** Markdown
- **שימוש:** Frontend ↔ Backend contract

#### 4. **State_Machine_Spec_v1_1_04_05_2026.docx**
- **תיאור:** State flow
- **תוכן:** SOS flow / Routine flow / Reflection flow
- **פורמט:** Word
- **שימוש:** State transitions logic

#### 5. **UI_Component_Spec_v1_1_04_05_2026.docx**
- **תיאור:** UI components
- **תוכן:** ContextHeader / ParentInput / GuidanceCard / SOSButton / ReflectionCard
- **פורמט:** Word
- **שימוש:** Component development

---

### `03_TECH/skills/`

#### 6. **Skill_Version_Lock_Decision_Keeper_v1_0_04_05_2026.md**
- **תיאור:** Version Lock / Decision Keeper skill
- **תפקיד:** מונע פתיחה מחדש של החלטות נעולות
- **קלט:** הצעת שינוי
- **פלט:** ALLOWED / BLOCKED + reasoning
- **שימוש:** Pre-change validation

#### 7. **Skill_Schema_Guardian_v1_2_04_05_2026.md**
- **תיאור:** Schema Guardian skill
- **תפקיד:** מוודא שכל output עומד בסכמה
- **קלט:** Proposed output
- **פלט:** schema_valid: true/false + errors[]
- **גרסה:** v1.2
- **שימוש:** Output validation

#### 8. **Runtime_Composer_v1_1_04_05_2026.md**
- **תיאור:** Runtime Composer skill
- **תפקיד:** מרכיב guidance card מתוך בנקים
- **קלט:** arena + pattern + child_age + emotional_state
- **פלט:** Guidance Card (4/3 sections)
- **גרסה:** v1.1
- **שימוש:** Core runtime logic

#### 9. **Screen_Packet_Builder_v1_1_04_05_2026.md**
- **תיאור:** Screen Packet Builder skill
- **תפקיד:** בונה packet מוכן ל-UI
- **קלט:** Guidance data
- **פלט:** Screen JSON (ready to render)
- **גרסה:** v1.1
- **שימוש:** UI rendering

#### 10. **Skill_Scenario_Tagger_v2_1_04_05_2026.md**
- **תיאור:** Scenario Tagger skill
- **תפקיד:** מתייג תרחישים לפי סכמה
- **קלט:** תרחיש גולמי
- **פלט:** Tagged scenario (arena / pattern / age / emotional_state)
- **גרסה:** v2.1
- **שימוש:** Content tagging

#### 11. **Skill_Runtime_Copy_QA_v1_0_1_04_05_2026.md**
- **תיאור:** Runtime Copy QA skill
- **תפקיד:** בודק שפה לפני output
- **קלט:** Output text
- **פלט:** QA report (forbidden_language / tone / clarity)
- **גרסה:** v1.0.1
- **שימוש:** Language quality validation

#### 12. **Skill_Content_Structurer_v1_0_04_05_2026.md**
- **תיאור:** Content Structurer skill
- **תפקיד:** ממבנה תוכן גולמי
- **קלט:** Raw content
- **פלט:** Structured content
- **שימוש:** Content preparation

#### 13. **Skill_Registry_v1_0_1_04_05_2026.md**
- **תיאור:** Skill Registry
- **תפקיד:** רשימת כל ה-skills + responsibilities
- **תוכן:** 8 skills documented
- **גרסה:** v1.0.1
- **שימוש:** Skill documentation

---

### `03_TECH/contracts/`

#### 14. **Canonical_Runtime_Contract_v1_1_04_05_2026.docx**
- **תיאור:** Runtime contract
- **תוכן:** Input schema → Processing flow → Output schema
- **גרסה:** v1.1
- **שימוש:** AI Adapter ↔ Frontend contract

#### 15. **SOS_Payload_Builder_v1_1_2026-05-04.docx**
- **תיאור:** SOS Payload Builder
- **תוכן:** Builds SOS output (3 sections: somatic + voice + anchor)
- **קלט:** pattern + emotional_state
- **פלט:** SOS payload
- **גרסה:** v1.1
- **שימוש:** SOS flow

#### 16. **Child_Signal_Mapping_Lock_v1_1_04_05_2026.docx**
- **תיאור:** Child Signal mapping
- **תוכן:** מיפוי child_state → signals
- **גרסה:** v1.1
- **שימוש:** Child state detection

#### 17. **Fallback_Packet_Definition_v1_0_04_05_2026.docx**
- **תיאור:** Fallback packet
- **תוכן:** Static fallback כשה-runtime נכשל
- **פורמט:** 3 levels (SOS_FALLBACK → Home Shell → Inline HTML)
- **שימוש:** Error handling

---

## 🔗 קשרים לתיקיות אחרות

**← תלוי ב:**
- `00_CORE/locked_decisions/` — Version Lock decisions
- `02_CONTENT/banks/` — Skills שולפים מבנקים

**→ משפיע על:**
- `04_BUILD/code/` — Specs → implementation
- `04_BUILD/tests/` — Skills → test cases

---

## 📊 סטטוס

| תיקיית משנה | קבצים | סטטוס | עדכון אחרון |
|-------------|-------|--------|--------------|
| specs/ | 5 | ✅ מלא | 2026-05-04 |
| skills/ | 8 | ✅ מלא | 2026-05-04 |
| contracts/ | 4 | ✅ מלא | 2026-05-04 |

**סה"כ:** 17 קבצים

---

## 🚨 הערות קריטיות

### Skills (8)
1. **Version Lock / Decision Keeper** — מונע שינויים אסורים
2. **Schema Guardian** — validates output schema
3. **Runtime Composer** — core logic
4. **Screen Packet Builder** — UI ready packets
5. **Scenario Tagger** — content tagging
6. **Runtime Copy QA** — language validation
7. **Content Structurer** — content preparation
8. **Skill Registry** — documentation

### Contracts (4)
1. **Canonical_Runtime_Contract** — AI Adapter ↔ Frontend
2. **SOS_Payload_Builder** — SOS output structure
3. **Child_Signal_Mapping_Lock** — child state → signals
4. **Fallback_Packet_Definition** — error handling

### Specs (5)
1. **Tech_Stack** — Next.js + Supabase
2. **Database_Schema** — v1.2
3. **API_Contract** — endpoints
4. **State_Machine** — flow logic
5. **UI_Component** — component specs

---

**עודכן:** 09.05.2026 | **גרסה:** v1.0
