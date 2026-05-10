# INDEX — 02_CONTENT

**תיקייה ראשית:** Content Banks & Knowledge
**תאריך עדכון:** 10.05.2026 | **גרסה:** v1.1
**מקור:** סריקה בפועל של `/mnt/project/` ב-10.05.2026

---

## 🎯 תפקיד התיקייה

כל בנקי התוכן המאומתים. **אין AI generation חופשי — רק תוכן שמקורו מאומת.**

---

## 📁 מבנה תיקיות משנה

```
02_CONTENT/
├── banks/      (בנקי תוכן קנוניים)
├── scenarios/  (תרחישים מתויגים)
└── messaging/  (הודעות בוקר, פידבק, SOS)
```

---

## 📄 קבצים

### `02_CONTENT/banks/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `__CANONICAL_PARENT_VOICE_BANK_v1_0_LOCKED_02_05_2026.docx` | 🔒 נעול | בנק משפטי הורה. 53.4 KB |
| 2 | `__CANONICAL_SOMATIC_BANK_v1_0_LOCKED_02_05_2026.docx` | 🔒 נעול | בנק פעולות גוף. 10.4 KB |
| 3 | `שכבת_תוכן_חיה_להורים__שמרכז_משפטים_חיים_על_הצרכים_ההתפתחותיים_של_ילדים_לפי_גיל__2_.docx` | קיים | שכבת תוכן חיה. 20.2 KB |

**חסר לפי INDEX קודם:**
- `Child_Signal_Bank_v1_0.docx` (24 KB) — **חסר** (הגרסה ה-DRAFT נמצאת ב-`scenarios/`)
- `SOS_BANK.md` (12 יחידות SOS) — **חסר**
- `Development_Truth_Bank_Unified_v1_0.docx` — **חסר** (קריטי ל-Development Mapper)
- `Parent_Sub_Pattern_Library_v1_0.docx` — **חסר**
- `Developmental_Constraints_NEVER_Demand_v1_0.docx` — **חסר**

🚨 **5 מתוך 7 בנקים מתועדים חסרים בפועל.**

---

### `02_CONTENT/scenarios/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `__Tagged_Scenarios_Batch_01_v1_1_LOCKED_02_05_2026.docx` | 🔒 נעול | תרחישים מתוייגים. 49.7 KB |
| 2 | `Tagged_Scenarios_Batch_01.docx` | DUPLICATE_VERSION | 52.9 KB — גדול יותר מ-LOCKED. **בדיקה ידנית — אל לארכב.** |
| 3 | `CANONICAL_PARENT_VOICE_BANK_v1_0_PATCHED.docx` | DUPLICATE_IDENTICAL | MD5 זהה ל-LOCKED של בנק ההורה. **בדיקה ידנית.** |
| 4 | `CANONICAL_CHILD_SIGNAL_BANK_v1_0_DRAFT.docx` | טיוטה | 33.7 KB. ייתכן שזה הגרסה היחידה הקיימת של Child Signal Bank. |

---

### `02_CONTENT/messaging/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `__Morning_Message_Bank_v1_1_27_04_2026.docx` | קיים | בנק הודעות בוקר. 8.0 KB |
| 2 | `__מאגר_פידבק_יומי_v1_1_27_04_2026.docx` | קיים | פידבקים יומיים. 4.3 KB |
| 3 | `__מאגר_SOS_v1_0_27_04_2026.docx` | קיים | מאגר SOS מורחב. 4.5 KB |

---

## 📊 סטטוס

| תיקיית משנה | קבצים בפועל | קבצים לפי INDEX קודם | חסרים |
|---|---|---|---|
| banks/ | 3 | 7 | 5 |
| scenarios/ | 4 | 3 | — (גדל בגלל כפילויות) |
| messaging/ | 3 | 3 | 0 |
| **סה"כ** | **10** | **13** | **5** |

---

## 🚨 דגלים אדומים

1. **5 בנקים קריטיים חסרים** מתיקיית `banks/`, כולל:
   - SOS_BANK.md (12 יחידות SOS — לב המערכת)
   - Development_Truth_Bank_Unified
   - Parent_Sub_Pattern_Library (17 תת-דפוסים)
   - Developmental_Constraints (25 "אל תדרוש")
   - Child_Signal_Bank v1.0 (יש רק DRAFT)

2. **כפילויות שלא מטופלות:**
   - `Tagged_Scenarios_Batch_01.docx` (3.2 KB גדול יותר מ-LOCKED) — **לא לארכב**
   - `PARENT_VOICE_BANK_PATCHED` (MD5 זהה ל-LOCKED) — סומן DUPLICATE_IDENTICAL

3. **יש רק DRAFT של Child_Signal_Bank** — הגרסה ה"רשמית" v1_0 חסרה.

---

## 🔗 קשרים

**← תלוי ב:** 00_CORE/doctrine/, 01_PRODUCT/gold_cases/
**→ משפיע על:** 03_TECH/skills/, 04_BUILD/code/

---

**עודכן:** 10.05.2026 | **גרסה:** v1.1 (סריקה בפועל)
