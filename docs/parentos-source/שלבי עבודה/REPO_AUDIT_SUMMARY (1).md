# REPO_AUDIT_SUMMARY.md — דוח סיכום סריקה מלאה

**תאריך:** 10.05.2026
**מבצע:** Repo Operator (Claude)
**מקור הסריקה:** `/mnt/project/`

---

## 📊 ספירה כוללת

| מדד | ערך |
|---|---|
| **תיקיות ראשיות נסרקו** | 9 (00–99) |
| **תיקיות משנה במבנה** | 25 |
| **קבצים בפועל ב-`/mnt/project/`** | 78 |
| **קבצים מתועדים ב-INDEX-ים קודמים** | 71 |
| **קבצים חסרים (ב-INDEX אך לא בפועל)** | 22 |
| **קבצים לא ב-INDEX (חדשים / ללא מיקום)** | 13 |

---

## 📁 קבצים שנוצרו בסריקה

### INDEX-ים מעודכנים (9 קבצים)
- `00_CORE/INDEX.md`
- `01_PRODUCT/INDEX.md`
- `02_CONTENT/INDEX.md`
- `03_TECH/INDEX.md`
- `04_BUILD/INDEX.md`
- `05_ASSETS/INDEX.md`
- `06_MARKETING/INDEX.md`
- `07_OPERATIONS/INDEX.md`
- `08_PROJECT_MGMT/INDEX.md`
- `99_ARCHIVE/INDEX.md`

### DRIVE_LINKS.csv (9 קבצים — אחד לכל תיקייה)
כולם כוללים עמודות: תיקייה ראשית, תיקיית משנה, שם קובץ, סוג, סטטוס, מיקום נוכחי, מיקום מומלץ, **קישור Google Drive (ריק — למילוי ידני)**, הערות.

### דוחות חריגות (4 קבצים)
- `MOVE_PLAN.md` — תכנית העברת קבצים (78 קבצים ממוינים)
- `DUPLICATES_REPORT.md` — 12 זוגות כפילויות
- `MANUAL_REVIEW.md` — 6 קבוצות קבצים שדורשים זיהוי/הכרעה
- `REPO_AUDIT_SUMMARY.md` — הדוח הזה

**סה"כ קבצים שנוצרו:** **22**

---

## ✅ מה בוצע

1. נסרקו 78 קבצים ב-`/mnt/project/` והוצלבו מול 6 קבצי INDEX קודמים.
2. נוצרו 9 INDEX.md חדשים — אחד לכל תיקייה ראשית, על בסיס סריקה בפועל ולא זיכרון.
3. נוצרו 9 DRIVE_LINKS.csv — אחד לכל תיקייה ראשית, מוכנים למילוי ידני של קישורים.
4. נוצר MOVE_PLAN שמסווג כל קובץ ל: **(א)** במיקום נכון, **(ב)** דורש העברה, **(ג)** דורש הכרעה.
5. נוצר DUPLICATES_REPORT שמסווג 12 זוגות כפילויות ל: זהים תוכנית / גרסאות שונות / שני פורמטים.
6. נוצר MANUAL_REVIEW שמזהה תוכן בפועל של קבצים מעורפלים (`template.md`, `SKILL.md`, system-skills).

---

## ❌ מה לא בוצע (לפי הוראות דליה)

- **לא נמחק שום קובץ.**
- **לא הועבר שום קובץ בפועל.**
- **לא נדרס שום קובץ.**
- **לא שונה שם של אף קובץ.**
- **לא אוחדה שום כפילות.**
- **לא ארכבתי קבצים עם פער תוכני משמעותי.**
- **לא תוקנו קבצי DOCX הלא תקפים.**

---

## 🚨 דגלים אדומים מסוכמים

### 1. תיקיית 00_CORE/theory/ ריקה לחלוטין
3 קבצים תיאורטיים (Bowlby, Maslow, התפתחות) חסרים לחלוטין.

### 2. תיקיית 01_PRODUCT/arenas/ ריקה לחלוטין
7 קבצים חסרים, כולל `CANONICAL_ARENA_TRIGGER_BANK_v1_0.md` שהוא **קריטי ל-AI Adapter** (375 triggers).

### 3. תיקיית 02_CONTENT/banks/ — 5 בנקים קריטיים חסרים
- `SOS_BANK.md` (12 יחידות — לב המערכת)
- `Development_Truth_Bank_Unified_v1_0.docx`
- `Parent_Sub_Pattern_Library_v1_0.docx`
- `Developmental_Constraints_NEVER_Demand_v1_0.docx`
- `Child_Signal_Bank_v1_0.docx` (יש רק DRAFT)

### 4. Locked_Decision_Ledger_v1.0 חסר
תיעוד 20 ההחלטות הנעולות (D-001 עד D-020) לא נמצא בסביבת העבודה.

### 5. שני קבצי DOCX לא תקפים
חזון v3.1 ועקרונות תפעוליים v3.0 — קבצי טקסט עם סיומת DOCX. גם בעלי MD5 זהה (אותו תוכן בשני שמות).

### 6. פערי תוכן בין גרסאות
- Language Engine: v1.2 (22.9 KB) → v2.1 (8.5 KB)
- חזון: v1.0 (20.9 KB) → v3.1 (5.7 KB)
- Tagged Scenarios: לא-נעול (52.9 KB) > LOCKED (49.7 KB)

---

## 🔄 הצעת המשך עבודה

הצעדים המוצעים, **בסדר עדיפות**:

### צעד 1 — אימות חסרים מול Google Drive המקורי
לוודא אם 22 הקבצים החסרים קיימים ב-Drive המקורי או שהם אבדו לחלוטין.
**סוג פעולה:** דליה, ידני.

### צעד 2 — הכרעות MANUAL_REVIEW
3 הכרעות נדרשות מדליה:
- האם `language-quality-validator` הוא ה-`runtime-copy-qa` שחסר ב-PROJECT_STATE?
- מה היחס בין `development-mapper_v2` (system-skill) לבין `development-mapper v1` שמתועד?
- האם יש PATCH אמיתי של PARENT_VOICE_BANK שלא נשמר?

### צעד 3 — בדיקת תוכן של קבצים בפער תוכני
3 צמדים דורשים השוואה ידנית לפני ארכיון:
- Language Engine v1.2 ↔ v2.1
- Tagged Scenarios הלא-נעול ↔ LOCKED
- חזון v1.0 ↔ v3.1

### צעד 4 — אישור ביצוע MOVE_PLAN
אחרי ההכרעות לעיל, להעביר בפועל את 6 הקבצים בביטחון גבוה ל-99_ARCHIVE/old_versions/.

### צעד 5 — בנייה בפועל של מבנה התיקיות
הקבצים שנוצרו עכשיו יושבים ב-flat directory. להעלות אותם ל-Google Drive במבנה ההיררכי הנכון.

---

## 📦 קבצי הסריקה — עץ פלט

```
/mnt/user-data/outputs/
├── REPO_AUDIT_SUMMARY.md       (הדוח הזה)
├── MOVE_PLAN.md
├── DUPLICATES_REPORT.md
├── MANUAL_REVIEW.md
└── by_folder/
    ├── 00_CORE/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 01_PRODUCT/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 02_CONTENT/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 03_TECH/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 04_BUILD/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 05_ASSETS/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 06_MARKETING/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 07_OPERATIONS/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    ├── 08_PROJECT_MGMT/
    │   ├── INDEX.md
    │   └── DRIVE_LINKS.csv
    └── 99_ARCHIVE/
        ├── INDEX.md
        └── DRIVE_LINKS.csv
```

---

**עודכן:** 10.05.2026 | **גרסה:** v1.0 | **בוצע על-ידי:** Repo Operator
