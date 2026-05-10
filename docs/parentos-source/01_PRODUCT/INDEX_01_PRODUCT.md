# INDEX — 01_PRODUCT

**תיקייה ראשית:** Product Architecture & Specifications

**תאריך עדכון:** 09.05.2026

---

## 🎯 תפקיד התיקייה

ארכיטקטורה, מפרטים, Gold Cases, וזירות של מעבדת העצמאות.  
**כל החלטת מוצר מתועדת כאן.**

---

## 📁 מבנה תיקיות משנה

```
01_PRODUCT/
├── architecture/  (2 קבצים)
├── specs/         (3 קבצים)
├── gold_cases/    (6 קבצים)
└── arenas/        (7 קבצים)
```

---

## 📄 קבצים בתיקייה

### `01_PRODUCT/architecture/`

#### 1. **Agent_System_Doctrine_v1.docx**
- **תיאור:** דוקטרינת מערכת סוכנים
- **תוכן:** Agent roles, responsibilities, interaction rules
- **שימוש:** בסיס למערכת ה-agents

#### 2. **Agent_Skill_System_Closed_Spec_v1.docx**
- **תיאור:** מפרט סגור skills
- **תוכן:** 6 skills + responsibilities + no overlaps
- **שימוש:** Skill development guidelines

---

### `01_PRODUCT/specs/`

#### 3. **Routine_UX_Spec_v1_1_27_04_2026.docx**
- **תיאור:** UX שגרה — full flow
- **תוכן:** 4 sections (מה קורה / מה עושים / מה אומרים / מה לא עושים)
- **שימוש:** Routine screen design

#### 4. **Developmental_Expectations_v1_0_27_04_2026.docx**
- **תיאור:** ציפיות התפתחותיות לפי גיל
- **תוכן:** Age bands 3-4, 5-6, 7-8, 9-10
- **שימוש:** Development Mapper

#### 5. **Siblings_Questions_v1_0_27_04_2026.docx**
- **תיאור:** שאלות אחים — Blindspot flow
- **תוכן:** 20 שאלות לזיהוי דפוסים באחים
- **שימוש:** עתידי (לא MVP)

---

### `01_PRODUCT/gold_cases/`

#### 6. **GOLD_CASE_HOMEWORK_AGE_7_v1.md**
- **גיל:** 7 | **זירה:** שיעורי בית
- **תרחיש:** ישיבה לשיעורים + תסכול
- **דפוסים:** 4 (LOOP / REACT / RESCUE / FREEZE)

#### 7. **GOLD_CASE_PLAYSTATION_AGE_6_v1.md**
- **גיל:** 6 | **זירה:** מסכים
- **תרחיש:** סיום PlayStation — ignoring parent
- **דפוסים:** 4 (לופ / מ-0-ל-100 / רק_הפעם / ויתור_שקט)

#### 8. **GOLD_CASE_SCREEN_ENDING_AGE_6_v1.md**
- **גיל:** 6 | **זירה:** מסכים
- **תרחיש:** סיום זמן מסך — emotional escalation
- **דפוסים:** 4 (לופ / מ-0-ל-100 / רק_הפעם / ויתור_שקט)

#### 9. **GOLD_CASE_SIBLING_ATTENTION_HARM_AGE_4_v1.md**
- **גיל:** 4 | **זירה:** אחים
- **תרחיש:** פגיעה חוזרת כש-sibling מקבל תשומת לב
- **דפוסים:** 4 — safety first + no reward after harm

#### 10. **GOLD_CASE_TWINS_PLAYGROUND_AGE_5_v1.md**
- **גיל:** 5 | **זירה:** מרחב ציבורי
- **תרחיש:** תאומים מורידים בגדים בגן שעשועים
- **דפוסים:** 4 — public boundary without shame

#### 11. **GOLD_CASES.md**
- **תיאור:** development-mapper example
- **תוכן:** Age 4, arena בוקר, dressing — full output
- **שימוש:** Reference for Development Mapper skill

---

### `01_PRODUCT/arenas/`

#### 12. **Arena_Library_v1_0_Completion_15_Arenas.docx**
- **תיאור:** תיאורי 15 זירות
- **תוכן:** בוקר / שינה / אוכל / מסכים / אחים / שיעורים / חוגים / מקלחת / יציאה / חזרה / נסיעות / קניות / אירוח / חברים / ציבורי
- **פורמט:** Triggers / Parent patterns / Child patterns / Failure / Works
- **גודל:** 11.5 KB
- **שימוש:** תיאורי זירות כלליים

#### 13. **CANONICAL_ARENA_TRIGGER_BANK_v1_0.md**
- **תיאור:** 375 triggers לזיהוי arena
- **תוכן:** 15 arenas × 25 entries = keywords + time_markers + parent_input_examples + negative_examples
- **פורמט:** Markdown
- **שימוש:** **קריטי ל-AI Adapter** — זיהוי arena מתוך Parent Input

#### 14. **Chores.docx**
- **תיאור:** 10 תרחישים מטלות
- **זירה:** chores
- **גילאים:** 3-10
- **פורמט:** situation_reflection / child_translation / parent_reflection / meaning / anchor

#### 15. **Screens.docx**
- **תיאור:** 20 תרחישים מסכים
- **זירה:** screens
- **גילאים:** 3-10
- **פורמט:** ID / age / difficulty / תרחיש מלא

#### 16. **Sibling.docx**
- **תיאור:** 10 תרחישים אחים
- **זירה:** sibling
- **גילאים:** 3-10
- **תוכן:** קנאה / תחרות / פגיעה / attention seeking

#### 17. **Sleep.docx**
- **תיאור:** 20 תרחישים שינה
- **זירה:** sleep
- **גילאים:** 3-10
- **תוכן:** סירוב לישון / קריאות לילה / פחד חושך

#### 18. **Transitions.docx**
- **תיאור:** 15 תרחישים מעברים
- **זירה:** transitions / leaving_home
- **גילאים:** 3-10
- **תוכן:** יציאה מבית / סיום פעילות / מעברים קשים

---

## 🔗 קשרים לתיקיות אחרות

**← תלוי ב:**
- `00_CORE/doctrine/` — כל המפרטים נגזרים מ-SoT

**→ משפיע על:**
- `02_CONTENT/banks/` — Gold Cases → content generation
- `03_TECH/skills/` — Specs → skill implementation
- `04_BUILD/tests/` — Gold Cases → test cases

---

## 📊 סטטוס

| תיקיית משנה | קבצים | סטטוס | עדכון אחרון |
|-------------|-------|--------|--------------|
| architecture/ | 2 | ✅ מלא | 2026-04-14 |
| specs/ | 3 | ✅ מלא | 2026-04-27 |
| gold_cases/ | 6 | ✅ מלא | 2026-05-02 |
| arenas/ | 7 | ✅ מלא | 2026-05-09 |

**סה"כ:** 18 קבצים

---

## 🚨 הערות חשובות

1. **CANONICAL_ARENA_TRIGGER_BANK_v1_0.md** — קריטי ל-AI Adapter, 375 entries
2. **Gold Cases** — דוגמאות מלאות Input → Output לפי 4 patterns
3. **Arena scenarios** — תרחישים ספציפיים בכל זירה (chores, screens, sibling, sleep, transitions)
4. **Specs** — UX + developmental expectations + siblings questions

---

**עודכן:** 09.05.2026 | **גרסה:** v1.0
