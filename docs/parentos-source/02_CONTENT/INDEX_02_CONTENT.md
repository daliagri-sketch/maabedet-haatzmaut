# INDEX — 02_CONTENT

**תיקייה ראשית:** Content Banks & Knowledge

**תאריך עדכון:** 09.05.2026

---

## 🎯 תפקיד התיקייה

כל בנקי התוכן המאומתים של מעבדת העצמאות.  
**אין AI generation חופשי — רק תוכן שמקורו מאומת.**

---

## 📁 מבנה תיקיות משנה

```
02_CONTENT/
├── banks/      (7 קבצים)
├── scenarios/  (3 קבצים)
└── messaging/  (3 קבצים)
```

---

## 📄 קבצים בתיקייה

### `02_CONTENT/banks/`

#### 1. **Child_Signal_Bank_v1_0.docx**
- **תיאור:** 85 סיגנלים של ילדים
- **תוכן:** 18 arenas × 5 signals — מה הילד עושה + פרשנות
- **גודל:** 24 KB
- **סטטוס:** ✅ נעול
- **שימוש:** זיהוי child state

#### 2. **CANONICAL_PARENT_VOICE_BANK_v1_0_LOCKED_02_05_2026.docx**
- **תיאור:** בנק משפטי הורה
- **תוכן:** משפטי פעולה לפי גיל / זירה / דפוס
- **גודל:** טרם נמדד
- **סטטוס:** 🔒 נעול
- **שימוש:** Voice line selection

#### 3. **CANONICAL_SOMATIC_BANK_v1_0_LOCKED_02_05_2026.docx**
- **תיאור:** בנק פעולות גוף
- **תוכן:** Interrupt + Inhibitory Actions
- **גודל:** 54.7 KB
- **סטטוס:** 🔒 נעול
- **שימוש:** Somatic action selection

#### 4. **SOS_BANK.md**
- **תיאור:** 12 יחידות SOS
- **תוכן:** 4 patterns × 3 emotional_states
- **פורמט:** Markdown
- **מבנה:** action + anchor + internal_sentence
- **גודל:** קטן (MD)
- **סטטוס:** 🔒 נעול
- **שימוש:** SOS Payload Builder

#### 5. **Development_Truth_Bank_Unified_v1_0.docx**
- **תיאור:** מסוגלות לפי גיל
- **תוכן:** 4 טבלאות (age bands: 3-4, 5-6, 7-8, 9-10)
- **קטגוריות:** 6 per band (Executive Function / Frustration Tolerance / Transitions / Independence / Emotional Regulation / Sibling Dynamics)
- **עמודות:** Capable Of / Not Yet Capable Of / Needs / Example: Can Do / Example: Too Much
- **גודל:** 15.7 KB
- **שימוש:** Development Mapper skill

#### 6. **Parent_Sub_Pattern_Library_v1_0.docx**
- **תיאור:** 17 תת-דפוסים הוריים
- **תוכן:** 4 main patterns (LOOP ×5, RESCUE ×4, REACT ×4, FREEZE ×4)
- **עמודות:** Sub-pattern / What It Looks Like / Body Signal / Cost / Correction
- **גודל:** 12.6 KB
- **שימוש:** Pattern detection (fine-grained)

#### 7. **Developmental_Constraints_NEVER_Demand_v1_0.docx**
- **תיאור:** 25 אל תדרוש
- **תוכן:** גיל 3-10 — מה לעולם אל תדרוש + למה + אלטרנטיבה
- **פורמט:** 6-7 rows per age band
- **עמודות:** Age / Never Demand / Why (Developmental Reason) / Alternative
- **גודל:** 12.3 KB
- **שימוש:** Development Mapper — constraint validation

---

### `02_CONTENT/scenarios/`

#### 8. **Tagged_Scenarios_Batch_01_v1_1_LOCKED_02_05_2026.docx**
- **תיאור:** תרחישים מתוייגים — Batch 01
- **תוכן:** תרחישים מלאים עם tags
- **סטטוס:** 🔒 נעול
- **שימוש:** Scenario library

#### 9. **CANONICAL_PARENT_VOICE_BANK_v1_0_PATCHED.docx**
- **תיאור:** Parent Voice Bank — גרסה מתוקנת
- **תוכן:** Parent Voice + patches
- **שימוש:** Voice line fallback

#### 10. **CANONICAL_CHILD_SIGNAL_BANK_v1_0_DRAFT.docx**
- **תיאור:** Child Signal Bank — draft
- **סטטוס:** 📝 טיוטה
- **שימוש:** עבודה בתהליך

---

### `02_CONTENT/messaging/`

#### 11. **Morning_Message_Bank_v1_1_27_04_2026.docx**
- **תיאור:** בנק הודעות בוקר
- **תוכן:** הודעות יומיות warm-up
- **שימוש:** Routine messaging

#### 12. **מאגר_פידבק_יומי_v1_1_27_04_2026.docx**
- **תיאור:** פידבקים יומיים
- **תוכן:** משפטי reflection + reinforcement
- **שימוש:** Post-action feedback

#### 13. **מאגר_SOS_v1_0_27_04_2026.docx**
- **תיאור:** מאגר SOS — גרסה מורחבת
- **תוכן:** SOS content bank
- **שימוש:** SOS messaging

---

## 🔗 קשרים לתיקיות אחרות

**← תלוי ב:**
- `00_CORE/doctrine/` — כל התוכן נגזר מדוקטרינה
- `01_PRODUCT/gold_cases/` — דוגמאות reference

**→ משפיע על:**
- `03_TECH/skills/` — Skills שולפים מהבנקים
- `04_BUILD/code/` — Runtime Composer משתמש בבנקים

---

## 📊 סטטוס

| תיקיית משנה | קבצים | סטטוס | עדכון אחרון |
|-------------|-------|--------|--------------|
| banks/ | 7 | ✅ מלא | 2026-05-09 |
| scenarios/ | 3 | 🔄 חלקי | 2026-05-02 |
| messaging/ | 3 | ✅ מלא | 2026-04-27 |

**סה"כ:** 13 קבצים

---

## 🚨 הערות קריטיות

### בנקים נעולים (🔒)
1. **CANONICAL_PARENT_VOICE_BANK** — לא לערוך ללא החלטה מתועדת
2. **CANONICAL_SOMATIC_BANK** — לא לערוך ללא החלטה מתועדת
3. **SOS_BANK.md** — 12 יחידות נעולות (4 patterns × 3 states)

### בנקים קריטיים ל-AI Adapter
1. **Child_Signal_Bank** — 85 entries, 18 arenas
2. **Development_Truth_Bank_Unified** — 4 age bands, 6 categories each
3. **Developmental_Constraints_NEVER_Demand** — 25 constraints
4. **Parent_Sub_Pattern_Library** — 17 sub-patterns

### גרסאות
- **v1_0** — גרסה נעולה
- **v1_1** — גרסה מתוקנת (patches)
- **DRAFT** — עדיין בעבודה

---

**עודכן:** 09.05.2026 | **גרסה:** v1.0
