# MOVE_PLAN.md — תכנית העברת קבצים

**תאריך:** 10.05.2026
**מטרה:** למפות את כל הקבצים שנמצאים במיקום לא נכון — לפני כל העברה.
**סטטוס:** הצעה בלבד. לא בוצעה העברה.

---

## כללים

- כל המיקומים הנוכחיים הם בפועל ב-`/mnt/project/` (רשימה שטוחה).
- המיקום המומלץ הוא לפי המבנה שתועד ב-INDEX-ים הנעולים.
- רמת ביטחון: **גבוהה / בינונית / נמוכה** — ביטחון נמוך = נדרשת הכרעה ידנית.
- **לא בוצעה שום העברה.** כל פעולה דורשת אישור נפרד.

---

## חלק א — קבצי גרסה ישנה → 99_ARCHIVE/old_versions/

| קובץ | מיקום נוכחי | מיקום מומלץ | סיבה | ביטחון |
|---|---|---|---|---|
| `Database_Schema_v1_0_04_05_2026.md` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים v1_2 חדש יותר ב-03_TECH/specs/ | גבוהה |
| `Skill_Schema_Guardian_v1_0_04_05_2026.md` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים v1_2 חדש יותר ב-03_TECH/skills/ | גבוהה |
| `__Runtime_Composer_v1_0_04_05_2026.md` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים `Runtime_Composer_v1_1` ב-03_TECH/skills/ | גבוהה |
| `__Screen_Packet_Builder_v1_0_04_05_2026.md` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים `Screen_Packet_Builder_v1_1` ב-03_TECH/skills/ | גבוהה |
| `__Gold_Test_Set_v1_0_1_04_05_2026.md` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים `Gold_Test_Set_v1_0_2` ב-04_BUILD/tests/ | גבוהה |
| `Operational_Closure_Pack_v1_4.docx` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים v1_5 חדש יותר ב-07_OPERATIONS/processes/ | גבוהה |
| `Tagged_Scenarios_Batch_01.docx` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים `__Tagged_Scenarios_Batch_01_v1_1_LOCKED` ב-02_CONTENT/scenarios/ — בדיקה ידנית: ייתכן שהתוכן שונה | בינונית |
| `Independence_Lab_Language_Engine_v1_2__1_.docx` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים `Language_Engine_v2_1` ב-00_CORE/doctrine/ | גבוהה |
| `מעבדת_העצמאות_חזון_v1_0.docx` | /mnt/project/ | 99_ARCHIVE/old_versions/ | קיים `_מעבדת_העצמאות_חזון_v3_1_2026-04-15` ב-00_CORE/doctrine/ | גבוהה |
| `__Skill_Runtime_Copy_QA_v1_0_1_04_05_2026.md` (v1.0.1) | /mnt/project/ | 03_TECH/skills/ ✅ — לא להעביר | זה הגרסה הפעילה לפי VERSION_NOTE.md | גבוהה |

---

## חלק ב — קבצים קיימים שצריכים להישאר במקום (כבר תועדו ב-INDEX)

קבצים אלה **כבר במיקום הנכון** לפי המבנה הנעול. לא נדרשת פעולה — רק וידוא שהם רשומים ב-INDEX וב-DRIVE_LINKS:

### 00_CORE/
- `_מעבדת_העצמאות_חזון_v3_1_2026-04-15.docx` → `00_CORE/doctrine/`
- `_01_01_גישתה_של_דליה_עקרונות_תפעוליים_v3_0_2026-04-14.docx` → `00_CORE/doctrine/`
- `__Language_Engine_v2_1_Operational_Source_of_Truth_02_05_2026.docx` → `00_CORE/doctrine/`

### 01_PRODUCT/
- `__Agent_System_Doctrine_v1.docx` → `01_PRODUCT/architecture/`
- `__Agent_Skill_System_Closed_Spec_v1.docx` → `01_PRODUCT/architecture/`
- `__Routine_UX_Spec_v1_1_27_04_2026.docx` → `01_PRODUCT/specs/`
- `__Developmental_Expectations_v1_0_27_04_2026.docx` → `01_PRODUCT/specs/`
- `__Siblings_Questions_v1_0_27_04_2026.docx` → `01_PRODUCT/specs/`
- `GOLD_CASE_HOMEWORK_AGE_7_v1.md` → `01_PRODUCT/gold_cases/`
- `GOLD_CASE_SIBLING_ATTENTION_HARM_AGE_4_v1.md` → `01_PRODUCT/gold_cases/`

### 02_CONTENT/
- `__CANONICAL_PARENT_VOICE_BANK_v1_0_LOCKED_02_05_2026.docx` → `02_CONTENT/banks/`
- `__CANONICAL_SOMATIC_BANK_v1_0_LOCKED_02_05_2026.docx` → `02_CONTENT/banks/`
- `CANONICAL_CHILD_SIGNAL_BANK_v1_0_DRAFT.docx` → `02_CONTENT/scenarios/` (כך לפי INDEX_02)
- `__Tagged_Scenarios_Batch_01_v1_1_LOCKED_02_05_2026.docx` → `02_CONTENT/scenarios/`
- `__Morning_Message_Bank_v1_1_27_04_2026.docx` → `02_CONTENT/messaging/`
- `__מאגר_פידבק_יומי_v1_1_27_04_2026.docx` → `02_CONTENT/messaging/`
- `__מאגר_SOS_v1_0_27_04_2026.docx` → `02_CONTENT/messaging/`

### 03_TECH/
- `Tech_Stack_Spec_v1_0_04_05_2026.md` → `03_TECH/specs/`
- `Database_Schema_v1_2_04_05_2026.md` → `03_TECH/specs/`
- `API_Contract_v1_0_04_05_2026.md` → `03_TECH/specs/`
- `State_Machine_Spec_v1_1_04_05_2026.docx` → `03_TECH/specs/`
- `UI_Component_Spec_v1_1_04_05_2026.docx` → `03_TECH/specs/`
- `Skill_Version_Lock_Decision_Keeper_v1_0_04_05_2026.md` → `03_TECH/skills/`
- `Skill_Schema_Guardian_v1_2_04_05_2026.md` → `03_TECH/skills/`
- `Runtime_Composer_v1_1_04_05_2026.md` → `03_TECH/skills/`
- `Screen_Packet_Builder_v1_1_04_05_2026.md` → `03_TECH/skills/`
- `__Skill_Scenario_Tagger_v2_1_04_05_2026.md` → `03_TECH/skills/`
- `__Skill_Runtime_Copy_QA_v1_0_1_04_05_2026.md` → `03_TECH/skills/`
- `Skill_Content_Structurer_v1_0_04_05_2026.md` → `03_TECH/skills/`
- `Skill_Registry_v1_0_1_04_05_2026.md` → `03_TECH/skills/`
- `Canonical_Runtime_Contract_v1_1_04_05_2026.docx` → `03_TECH/contracts/`
- `SOS_Payload_Builder_v1_1_2026-05-04.docx` → `03_TECH/contracts/`
- `Child_Signal_Mapping_Lock_v1_1_04_05_2026.docx` → `03_TECH/contracts/`
- `Fallback_Packet_Definition_v1_0_04_05_2026.docx` → `03_TECH/contracts/`

### 04_BUILD/
- `__Gold_Test_Set_v1_0_2_04_05_2026.md` → `04_BUILD/tests/`
- `QA_Checklist_Pack_v1_0_04_05_2026.md` → `04_BUILD/tests/`
- `Skills_Integration_Test_Spec_v1_1_04_05_2026.docx` → `04_BUILD/integration/`
- `Data_Structure_Tagged_Scenarios_v1_1_04_05_2026.docx` → `04_BUILD/integration/`

### 07_OPERATIONS/
- `Operational_Closure_Pack_v1_5.docx` → `07_OPERATIONS/processes/`

### 08_ניהול_פרויקט/
- `PROJECT_STATUS_AUDIT_v1_0_04_05_2026.docx` → `08_ניהול_פרויקט/status/`
- `PROJECT_FILE_SYSTEM_v1_0_2026-05-04.docx` → `08_ניהול_פרויקט/status/`
- `CONVERSATION_FILE_MAPPING_REGISTRY_v1_0_2026-05-04.docx` → `08_ניהול_פרויקט/status/`
- `KNOWLEDGE_MAP.md` → `08_ניהול_פרויקט/documentation/`
- `PROJECT_STATE.md` → `08_ניהול_פרויקט/documentation/`
- `SKILLS_INDEX.md` → `08_ניהול_פרויקט/documentation/`
- `VERSION_NOTE.md` → `08_ניהול_פרויקט/documentation/`
- `PARENT_VOICE_BANK_LOCK_NOTE.md` → `08_ניהול_פרויקט/documentation/`
- `SOMATIC_BANK_LOCK_NOTE.md` → `08_ניהול_פרויקט/documentation/`

---

## חלק ג — קבצים שלא מופיעים באף INDEX (דורשים הכרעה)

| קובץ | מיקום נוכחי | מיקום מומלץ | סיבה | ביטחון |
|---|---|---|---|---|
| `AI_Adapter_Integration_Guide_v1_0_COMPLETE.docx` | /mnt/project/ | `03_TECH/contracts/` | מסמך אינטגרציה — שייך ל-contracts | גבוהה |
| `ParentOS_MVP_Phase1_Screen_Specs_v1_0.json` | /mnt/project/ | `03_TECH/specs/` | UI specs בפורמט JSON | גבוהה |
| `ParentOS_Seed_Data_v1_0_09_05_2026.json` | /mnt/project/ | `04_BUILD/code/` או `02_CONTENT/banks/` | נתוני seed — תלוי אם זה נתוני אתחול לקוד או בנק תוכן | **נמוכה — נדרשת הכרעה** |
| `Language_Contract_v1_1.docx` | /mnt/project/ | `03_TECH/contracts/` | Contract של שפה | גבוהה |
| `03_משפט_פעולה_הגדרה_מבנית_v1_0_01-05-2026.docx` | /mnt/project/ | `00_CORE/doctrine/` או `02_CONTENT/banks/` | הגדרה מבנית — תלוי אם זה דוקטרינה או בנק | **בינונית — נדרשת הכרעה** |
| `Version_Lock_v1_02_05_2026.docx` | /mnt/project/ | `00_CORE/locked_decisions/` | קובץ נעילה | גבוהה |
| `template.md` | /mnt/project/ | `03_TECH/skills/` או `08_ניהול_פרויקט/documentation/` | תבנית — תלוי לאיזו מטרה | בינונית |
| `SKILL.md` | /mnt/project/ | `03_TECH/skills/` (?) | קובץ skill כללי — לא ברור איזה skill הוא | **נמוכה — נדרשת בדיקה ידנית** |
| `scenario-tagger_SKILL.md` | /mnt/project/ | `03_TECH/skills/` | skill scenario-tagger | גבוהה |
| `development-mapper_v2_SKILL.md` | /mnt/project/ | `03_TECH/skills/` | skill development-mapper | גבוהה |
| `שכבת_תוכן_חיה_להורים__שמרכז_משפטים_חיים__2_.docx` | /mnt/project/ | `02_CONTENT/banks/` | בנק תוכן | גבוהה |
| `עקרונות_כתיבה___גרסה_נעולה_v1_0__.docx` | /mnt/project/ | `00_CORE/doctrine/` | עקרונות כתיבה נעולים | גבוהה |
| `עקרונות_בניית_תהליך_עבודה_וסקילים.docx` | /mnt/project/ | `00_CORE/doctrine/` או `01_PRODUCT/architecture/` | עקרונות תהליך — תלוי אם זה דוקטרינה או ארכיטקטורה | **בינונית — נדרשת הכרעה** |

---

## חלק ד — קבצים מקומיים (דוחות הסריקה הזו)

קבצים שאני יוצר עכשיו — **לא קיימים עוד בפרויקט המקורי**:

| קובץ | מיקום מומלץ |
|---|---|
| `MOVE_PLAN.md` (זה) | `08_ניהול_פרויקט/status/` |
| `DUPLICATES_REPORT.md` | `08_ניהול_פרויקט/status/` |
| `DRIVE_LINKS.csv` (×9 — אחד לכל תיקייה ראשית) | בתוך כל תיקייה ראשית בנפרד |

---

## סיכום

| קטגוריה | מספר קבצים |
|---|---|
| גרסאות ישנות → 99_ARCHIVE | 9 |
| במיקום הנכון (לפי INDEX) | ~46 |
| לא ב-INDEX, ביטחון גבוה למיקום | 8 |
| לא ב-INDEX, נדרשת הכרעה ידנית | 5 |
| **סה"כ קבצים בסריקה** | **78** |

---

## הערות חשובות

1. **לא בוצעה העברה.** קובץ זה הוא תכנית בלבד.
2. **כפילויות לא נדונות כאן** — ראי `DUPLICATES_REPORT.md` בנפרד.
3. **קבצי "ביטחון נמוך"** דורשים הכרעה שלך לפני כל פעולה.
4. **לפני העברה לארכיון** — כדאי לוודא שכל קובץ-מקור (v1_2 / v1_1) באמת מכיל את כל מה שהיה ב-v1_0.

**עודכן:** 10.05.2026 | **גרסה:** v1.0
