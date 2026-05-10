# INDEX — 01_PRODUCT

**תיקייה ראשית:** Product Architecture & Specifications
**תאריך עדכון:** 10.05.2026 | **גרסה:** v1.1
**מקור:** סריקה בפועל של `/mnt/project/` ב-10.05.2026

---

## 🎯 תפקיד התיקייה

ארכיטקטורה, מפרטים, Gold Cases, וזירות. **כל החלטת מוצר מתועדת כאן.**

---

## 📁 מבנה תיקיות משנה

```
01_PRODUCT/
├── architecture/  (דוקטרינות מערכת ו-skills)
├── specs/         (מפרטים פונקציונליים)
├── gold_cases/    (תרחישי זהב)
└── arenas/        (זירות + triggers)
```

---

## 📄 קבצים

### `01_PRODUCT/architecture/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `__Agent_System_Doctrine_v1.docx` | קיים | דוקטרינת מערכת סוכנים. 5.5 KB |
| 2 | `__Agent_Skill_System_Closed_Spec_v1.docx` | קיים | מפרט סגור skills. 8.9 KB |
| 3 | `עקרונות_בניית_תהליך_עבודה_וסקילים.docx` | קיים | עקרונות עבודה ובניית skills. 11.2 KB. מועבר לכאן לפי הכרעת דליה. |

---

### `01_PRODUCT/specs/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `__Routine_UX_Spec_v1_1_27_04_2026.docx` | קיים | UX שגרה — full flow. 8.7 KB |
| 2 | `__Developmental_Expectations_v1_0_27_04_2026.docx` | קיים | ציפיות התפתחותיות לפי גיל. 5.3 KB |
| 3 | `__Siblings_Questions_v1_0_27_04_2026.docx` | קיים | 20 שאלות אחים — Blindspot. 2.9 KB |

---

### `01_PRODUCT/gold_cases/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `GOLD_CASE_HOMEWORK_AGE_7_v1.md` | קיים | גיל 7, שיעורי בית. 5.6 KB |
| 2 | `GOLD_CASE_SIBLING_ATTENTION_HARM_AGE_4_v1.md` | קיים | גיל 4, אחים. 6.9 KB |

**חסר לפי INDEX קודם:**
- `GOLD_CASE_PLAYSTATION_AGE_6_v1.md` — **חסר**
- `GOLD_CASE_SCREEN_ENDING_AGE_6_v1.md` — **חסר**
- `GOLD_CASE_TWINS_PLAYGROUND_AGE_5_v1.md` — **חסר**
- `GOLD_CASES.md` (development-mapper example) — **חסר**

⚠️ 4 מתוך 6 Gold Cases חסרים בפועל. ייתכן שהם רק ב-Google Drive.

---

### `01_PRODUCT/arenas/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|

**כל 7 הקבצים תועדו ב-INDEX קודם, אך לא נמצאים בפועל ב-`/mnt/project/`:**
- `Arena_Library_v1_0_Completion_15_Arenas.docx` — **חסר**
- `CANONICAL_ARENA_TRIGGER_BANK_v1_0.md` — **חסר** (קריטי ל-AI Adapter — 375 triggers)
- `Chores.docx` — **חסר**
- `Screens.docx` — **חסר**
- `Sibling.docx` — **חסר**
- `Sleep.docx` — **חסר**
- `Transitions.docx` — **חסר**

🚨 **תת-תיקייה ריקה לחלוטין בפועל.**

---

## 📊 סטטוס

| תיקיית משנה | קבצים בפועל | קבצים לפי INDEX קודם | חסרים |
|---|---|---|---|
| architecture/ | 3 | 2 | — (גדל) |
| specs/ | 3 | 3 | 0 |
| gold_cases/ | 2 | 6 | 4 |
| arenas/ | 0 | 7 | 7 |
| **סה"כ** | **8** | **18** | **11** |

---

## 🚨 דגלים אדומים

1. **תיקיית `arenas/` ריקה לחלוטין בפועל** — כולל `CANONICAL_ARENA_TRIGGER_BANK` הקריטי ל-AI Adapter (375 triggers).
2. **4 מתוך 6 Gold Cases חסרים** — רק HOMEWORK_AGE_7 ו-SIBLING_ATTENTION_HARM_AGE_4 קיימים בפועל.
3. **חסר משמעותי** — מומלץ לאתר את הקבצים האלה ב-Google Drive המקורי לפני הבנייה.

---

## 🔗 קשרים

**← תלוי ב:** 00_CORE/doctrine/
**→ משפיע על:** 02_CONTENT/banks/, 03_TECH/skills/, 04_BUILD/tests/

---

**עודכן:** 10.05.2026 | **גרסה:** v1.1 (סריקה בפועל)
