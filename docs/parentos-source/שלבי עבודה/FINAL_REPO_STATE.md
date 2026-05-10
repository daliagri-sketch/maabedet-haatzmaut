# FINAL_REPO_STATE.md

**Source of Truth של הריפו — מעבדת העצמאות**

**תאריך:** 10.05.2026 | **גרסה:** v1.0 LOCKED 🔒
**מבצע:** Repo Operator
**מקור:** סריקה בפועל של `/mnt/project/` ב-10.05.2026 + הכרעות סופיות של דליה

---

## 🔒 סטטוס

מסמך זה הוא **המקור הסופי** למצב הריפו. אחרי נקודה זו לא חוזרים לדיון.
כל קובץ קיבל canonical path אחד וסטטוס אחד.

---

## מקרא סטטוסים

| סטטוס | משמעות |
|---|---|
| `ACTIVE` | קובץ פעיל בשימוש |
| `LOCKED` | נעול — אסור לשנות בלי החלטה מפורשת |
| `DRAFT` | טיוטה |
| `DUPLICATE_IDENTICAL` | תוכן זהה (MD5) לקובץ אחר — נשאר פיזית, לא נמחק |
| `FORMAT_ERROR` | סיומת שגויה / קובץ לא תקף — לא לתקן עדיין |
| `MISSING_FROM_LOCAL_WORKSPACE` | רשום ב-INDEX אך לא קיים בסביבת העבודה הנוכחית (ייתכן ב-Drive המקורי) |
| `ACTIVE_UNTIL_VERIFIED` | פעיל זמנית עד אימות תוכן — לא לארכב |

---

# המבנה הסופי

```
מעבדת_העצמאות_קבצים_מעודכנים/
├── 00_CORE/
├── 01_PRODUCT/
├── 02_CONTENT/
├── 03_TECH/
├── 04_BUILD/
├── 05_ASSETS/
├── 06_MARKETING/
├── 07_OPERATIONS/
├── 08_ניהול_פרויקט/
└── 99_ARCHIVE/
```

---

## 00_CORE/

**תפקיד:** Source of Truth, דוקטרינה, החלטות נעולות.

### `00_CORE/doctrine/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `_מעבדת_העצמאות_חזון_v3_1_2026-04-15.docx` | FORMAT_ERROR | `00_CORE/doctrine/_מעבדת_העצמאות_חזון_v3_1_2026-04-15.docx` |
| 2 | `_01_01_גישתה_של_דליה_עקרונות_תפעוליים_v3_0_2026-04-14.docx` | FORMAT_ERROR + DUPLICATE_IDENTICAL | `00_CORE/doctrine/_01_01_גישתה_של_דליה_עקרונות_תפעוליים_v3_0_2026-04-14.docx` |
| 3 | `__Language_Engine_v2_1_Operational_Source_of_Truth_02_05_2026.docx` | LOCKED | `00_CORE/doctrine/__Language_Engine_v2_1_Operational_Source_of_Truth_02_05_2026.docx` |
| 4 | `עקרונות_כתיבה___גרסה_נעולה_v1_0__.docx` | LOCKED | `00_CORE/doctrine/עקרונות_כתיבה___גרסה_נעולה_v1_0__.docx` |
| 5 | `03_משפט_פעולה_הגדרה_מבנית_v1_0_01-05-2026.docx` | ACTIVE | `00_CORE/doctrine/03_משפט_פעולה_הגדרה_מבנית_v1_0_01-05-2026.docx` |
| 6 | `Independence_Lab_Theoretical_Foundation_v1_0.docx` | MISSING_FROM_LOCAL_WORKSPACE | `00_CORE/doctrine/Independence_Lab_Theoretical_Foundation_v1_0.docx` |

### `00_CORE/theory/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `בולבי_ואיינסוורת___עצמאות_ילדים_3-10.docx` | MISSING_FROM_LOCAL_WORKSPACE | `00_CORE/theory/בולבי_ואיינסוורת___עצמאות_ילדים_3-10.docx` |
| 2 | `מאסלו__עצמאות_ילדים_ובוט_הורים.docx` | MISSING_FROM_LOCAL_WORKSPACE | `00_CORE/theory/מאסלו__עצמאות_ילדים_ובוט_הורים.docx` |
| 3 | `תיאוריות_ההתפתחות_המובילות_לשפה_מעשית_ותפקודית.docx` | MISSING_FROM_LOCAL_WORKSPACE | `00_CORE/theory/תיאוריות_ההתפתחות_המובילות_לשפה_מעשית_ותפקודית.docx` |

### `00_CORE/locked_decisions/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Version_Lock_v1_02_05_2026.docx` | LOCKED | `00_CORE/locked_decisions/Version_Lock_v1_02_05_2026.docx` |
| 2 | `Locked_Decision_Ledger_v1.0_02.05.2026.docx` | MISSING_FROM_LOCAL_WORKSPACE | `00_CORE/locked_decisions/Locked_Decision_Ledger_v1.0_02.05.2026.docx` |
| 3 | `Canonical_Vocabulary_v1_0_02.05.2026.docx` | MISSING_FROM_LOCAL_WORKSPACE | `00_CORE/locked_decisions/Canonical_Vocabulary_v1_0_02.05.2026.docx` |

---

## 01_PRODUCT/

**תפקיד:** ארכיטקטורה, מפרטים, Gold Cases, זירות.

### `01_PRODUCT/architecture/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `__Agent_System_Doctrine_v1.docx` | ACTIVE | `01_PRODUCT/architecture/__Agent_System_Doctrine_v1.docx` |
| 2 | `__Agent_Skill_System_Closed_Spec_v1.docx` | ACTIVE | `01_PRODUCT/architecture/__Agent_Skill_System_Closed_Spec_v1.docx` |
| 3 | `עקרונות_בניית_תהליך_עבודה_וסקילים.docx` | ACTIVE | `01_PRODUCT/architecture/עקרונות_בניית_תהליך_עבודה_וסקילים.docx` |

### `01_PRODUCT/specs/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `__Routine_UX_Spec_v1_1_27_04_2026.docx` | ACTIVE | `01_PRODUCT/specs/__Routine_UX_Spec_v1_1_27_04_2026.docx` |
| 2 | `__Developmental_Expectations_v1_0_27_04_2026.docx` | ACTIVE | `01_PRODUCT/specs/__Developmental_Expectations_v1_0_27_04_2026.docx` |
| 3 | `__Siblings_Questions_v1_0_27_04_2026.docx` | ACTIVE | `01_PRODUCT/specs/__Siblings_Questions_v1_0_27_04_2026.docx` |

### `01_PRODUCT/gold_cases/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `GOLD_CASE_HOMEWORK_AGE_7_v1.md` | ACTIVE | `01_PRODUCT/gold_cases/GOLD_CASE_HOMEWORK_AGE_7_v1.md` |
| 2 | `GOLD_CASE_SIBLING_ATTENTION_HARM_AGE_4_v1.md` | ACTIVE | `01_PRODUCT/gold_cases/GOLD_CASE_SIBLING_ATTENTION_HARM_AGE_4_v1.md` |
| 3 | `GOLD_CASE_PLAYSTATION_AGE_6_v1.md` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/gold_cases/GOLD_CASE_PLAYSTATION_AGE_6_v1.md` |
| 4 | `GOLD_CASE_SCREEN_ENDING_AGE_6_v1.md` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/gold_cases/GOLD_CASE_SCREEN_ENDING_AGE_6_v1.md` |
| 5 | `GOLD_CASE_TWINS_PLAYGROUND_AGE_5_v1.md` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/gold_cases/GOLD_CASE_TWINS_PLAYGROUND_AGE_5_v1.md` |
| 6 | `GOLD_CASES.md` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/gold_cases/GOLD_CASES.md` |

### `01_PRODUCT/arenas/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Arena_Library_v1_0_Completion_15_Arenas.docx` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/Arena_Library_v1_0_Completion_15_Arenas.docx` |
| 2 | `CANONICAL_ARENA_TRIGGER_BANK_v1_0.md` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/CANONICAL_ARENA_TRIGGER_BANK_v1_0.md` |
| 3 | `Chores.docx` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/Chores.docx` |
| 4 | `Screens.docx` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/Screens.docx` |
| 5 | `Sibling.docx` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/Sibling.docx` |
| 6 | `Sleep.docx` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/Sleep.docx` |
| 7 | `Transitions.docx` | MISSING_FROM_LOCAL_WORKSPACE | `01_PRODUCT/arenas/Transitions.docx` |

---

## 02_CONTENT/

**תפקיד:** בנקי תוכן מאומתים, תרחישים מתויגים, הודעות.

### `02_CONTENT/banks/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `__CANONICAL_PARENT_VOICE_BANK_v1_0_LOCKED_02_05_2026.docx` | LOCKED | `02_CONTENT/banks/__CANONICAL_PARENT_VOICE_BANK_v1_0_LOCKED_02_05_2026.docx` |
| 2 | `__CANONICAL_SOMATIC_BANK_v1_0_LOCKED_02_05_2026.docx` | LOCKED | `02_CONTENT/banks/__CANONICAL_SOMATIC_BANK_v1_0_LOCKED_02_05_2026.docx` |
| 3 | `שכבת_תוכן_חיה_להורים__שמרכז_משפטים_חיים_על_הצרכים_ההתפתחותיים_של_ילדים_לפי_גיל__2_.docx` | ACTIVE | `02_CONTENT/banks/שכבת_תוכן_חיה_להורים__שמרכז_משפטים_חיים_על_הצרכים_ההתפתחותיים_של_ילדים_לפי_גיל__2_.docx` |
| 4 | `Child_Signal_Bank_v1_0.docx` | MISSING_FROM_LOCAL_WORKSPACE | `02_CONTENT/banks/Child_Signal_Bank_v1_0.docx` |
| 5 | `SOS_BANK.md` | MISSING_FROM_LOCAL_WORKSPACE | `02_CONTENT/banks/SOS_BANK.md` |
| 6 | `Development_Truth_Bank_Unified_v1_0.docx` | MISSING_FROM_LOCAL_WORKSPACE | `02_CONTENT/banks/Development_Truth_Bank_Unified_v1_0.docx` |
| 7 | `Parent_Sub_Pattern_Library_v1_0.docx` | MISSING_FROM_LOCAL_WORKSPACE | `02_CONTENT/banks/Parent_Sub_Pattern_Library_v1_0.docx` |
| 8 | `Developmental_Constraints_NEVER_Demand_v1_0.docx` | MISSING_FROM_LOCAL_WORKSPACE | `02_CONTENT/banks/Developmental_Constraints_NEVER_Demand_v1_0.docx` |

### `02_CONTENT/scenarios/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `__Tagged_Scenarios_Batch_01_v1_1_LOCKED_02_05_2026.docx` | LOCKED | `02_CONTENT/scenarios/__Tagged_Scenarios_Batch_01_v1_1_LOCKED_02_05_2026.docx` |
| 2 | `Tagged_Scenarios_Batch_01.docx` | ACTIVE_UNTIL_VERIFIED | `02_CONTENT/scenarios/Tagged_Scenarios_Batch_01.docx` |
| 3 | `CANONICAL_PARENT_VOICE_BANK_v1_0_PATCHED.docx` | DUPLICATE_IDENTICAL | `02_CONTENT/scenarios/CANONICAL_PARENT_VOICE_BANK_v1_0_PATCHED.docx` |
| 4 | `CANONICAL_CHILD_SIGNAL_BANK_v1_0_DRAFT.docx` | DRAFT | `02_CONTENT/scenarios/CANONICAL_CHILD_SIGNAL_BANK_v1_0_DRAFT.docx` |

### `02_CONTENT/messaging/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `__Morning_Message_Bank_v1_1_27_04_2026.docx` | ACTIVE | `02_CONTENT/messaging/__Morning_Message_Bank_v1_1_27_04_2026.docx` |
| 2 | `__מאגר_פידבק_יומי_v1_1_27_04_2026.docx` | ACTIVE | `02_CONTENT/messaging/__מאגר_פידבק_יומי_v1_1_27_04_2026.docx` |
| 3 | `__מאגר_SOS_v1_0_27_04_2026.docx` | ACTIVE | `02_CONTENT/messaging/__מאגר_SOS_v1_0_27_04_2026.docx` |

---

## 03_TECH/

**תפקיד:** מפרטים טכניים, skills, contracts.

### `03_TECH/specs/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Tech_Stack_Spec_v1_0_04_05_2026.md` | ACTIVE | `03_TECH/specs/Tech_Stack_Spec_v1_0_04_05_2026.md` |
| 2 | `Tech_Stack_Spec_v1_0_04_05_2026.docx` | DUPLICATE_IDENTICAL | `03_TECH/specs/Tech_Stack_Spec_v1_0_04_05_2026.docx` |
| 3 | `Database_Schema_v1_2_04_05_2026.md` | ACTIVE | `03_TECH/specs/Database_Schema_v1_2_04_05_2026.md` |
| 4 | `Database_Schema_v1_0_04_05_2026.md` | ACTIVE_UNTIL_VERIFIED | `03_TECH/specs/Database_Schema_v1_0_04_05_2026.md` |
| 5 | `API_Contract_v1_0_04_05_2026.md` | ACTIVE | `03_TECH/specs/API_Contract_v1_0_04_05_2026.md` |
| 6 | `State_Machine_Spec_v1_1_04_05_2026.docx` | ACTIVE | `03_TECH/specs/State_Machine_Spec_v1_1_04_05_2026.docx` |
| 7 | `UI_Component_Spec_v1_1_04_05_2026.docx` | ACTIVE | `03_TECH/specs/UI_Component_Spec_v1_1_04_05_2026.docx` |
| 8 | `ParentOS_MVP_Phase1_Screen_Specs_v1_0.json` | ACTIVE | `03_TECH/specs/ParentOS_MVP_Phase1_Screen_Specs_v1_0.json` |

### `03_TECH/skills/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Skill_Version_Lock_Decision_Keeper_v1_0_04_05_2026.md` | ACTIVE | `03_TECH/skills/Skill_Version_Lock_Decision_Keeper_v1_0_04_05_2026.md` |
| 2 | `Skill_Schema_Guardian_v1_2_04_05_2026.md` | ACTIVE | `03_TECH/skills/Skill_Schema_Guardian_v1_2_04_05_2026.md` |
| 3 | `Skill_Schema_Guardian_v1_0_04_05_2026.md` | ACTIVE_UNTIL_VERIFIED | `03_TECH/skills/Skill_Schema_Guardian_v1_0_04_05_2026.md` |
| 4 | `Runtime_Composer_v1_1_04_05_2026.md` | ACTIVE | `03_TECH/skills/Runtime_Composer_v1_1_04_05_2026.md` |
| 5 | `__Runtime_Composer_v1_0_04_05_2026.md` | ACTIVE_UNTIL_VERIFIED | `03_TECH/skills/__Runtime_Composer_v1_0_04_05_2026.md` |
| 6 | `Screen_Packet_Builder_v1_1_04_05_2026.md` | ACTIVE | `03_TECH/skills/Screen_Packet_Builder_v1_1_04_05_2026.md` |
| 7 | `__Screen_Packet_Builder_v1_0_04_05_2026.md` | ACTIVE_UNTIL_VERIFIED | `03_TECH/skills/__Screen_Packet_Builder_v1_0_04_05_2026.md` |
| 8 | `__Skill_Scenario_Tagger_v2_1_04_05_2026.md` | ACTIVE | `03_TECH/skills/__Skill_Scenario_Tagger_v2_1_04_05_2026.md` |
| 9 | `scenario-tagger_SKILL.md` | ACTIVE | `03_TECH/skills/scenario-tagger_SKILL.md` |
| 10 | `__Skill_Runtime_Copy_QA_v1_0_1_04_05_2026.md` | ACTIVE | `03_TECH/skills/__Skill_Runtime_Copy_QA_v1_0_1_04_05_2026.md` |
| 11 | `Skill_Content_Structurer_v1_0_04_05_2026.md` | ACTIVE | `03_TECH/skills/Skill_Content_Structurer_v1_0_04_05_2026.md` |
| 12 | `Skill_Registry_v1_0_1_04_05_2026.md` | ACTIVE | `03_TECH/skills/Skill_Registry_v1_0_1_04_05_2026.md` |
| 13 | `development-mapper_v2_SKILL.md` | ACTIVE | `03_TECH/skills/development-mapper_v2_SKILL.md` |

### `03_TECH/skills/language-quality-validator/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `SKILL.md` | ACTIVE | `03_TECH/skills/language-quality-validator/SKILL.md` |

### `03_TECH/skills/templates/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Knowledge_Research_Pack_Template_v1_0.md` | ACTIVE | `03_TECH/skills/templates/Knowledge_Research_Pack_Template_v1_0.md` |

> **הערה:** קובץ זה הוא `template.md` שעבר rename והעברה לפי הכרעה סופית.

### `03_TECH/contracts/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Canonical_Runtime_Contract_v1_1_04_05_2026.docx` | ACTIVE | `03_TECH/contracts/Canonical_Runtime_Contract_v1_1_04_05_2026.docx` |
| 2 | `SOS_Payload_Builder_v1_1_2026-05-04.docx` | ACTIVE | `03_TECH/contracts/SOS_Payload_Builder_v1_1_2026-05-04.docx` |
| 3 | `Child_Signal_Mapping_Lock_v1_1_04_05_2026.docx` | ACTIVE | `03_TECH/contracts/Child_Signal_Mapping_Lock_v1_1_04_05_2026.docx` |
| 4 | `Fallback_Packet_Definition_v1_0_04_05_2026.docx` | ACTIVE | `03_TECH/contracts/Fallback_Packet_Definition_v1_0_04_05_2026.docx` |
| 5 | `AI_Adapter_Integration_Guide_v1_0_COMPLETE.docx` | ACTIVE | `03_TECH/contracts/AI_Adapter_Integration_Guide_v1_0_COMPLETE.docx` |
| 6 | `Language_Contract_v1_1.docx` | ACTIVE | `03_TECH/contracts/Language_Contract_v1_1.docx` |

---

## 04_BUILD/

**תפקיד:** קוד, בדיקות, integration, seed data.

### `04_BUILD/tests/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `__Gold_Test_Set_v1_0_2_04_05_2026.md` | ACTIVE | `04_BUILD/tests/__Gold_Test_Set_v1_0_2_04_05_2026.md` |
| 2 | `__Gold_Test_Set_v1_0_1_04_05_2026.md` | ACTIVE_UNTIL_VERIFIED | `04_BUILD/tests/__Gold_Test_Set_v1_0_1_04_05_2026.md` |
| 3 | `QA_Checklist_Pack_v1_0_04_05_2026.md` | ACTIVE | `04_BUILD/tests/QA_Checklist_Pack_v1_0_04_05_2026.md` |

### `04_BUILD/integration/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Skills_Integration_Test_Spec_v1_1_04_05_2026.docx` | ACTIVE | `04_BUILD/integration/Skills_Integration_Test_Spec_v1_1_04_05_2026.docx` |
| 2 | `Data_Structure_Tagged_Scenarios_v1_1_04_05_2026.docx` | ACTIVE | `04_BUILD/integration/Data_Structure_Tagged_Scenarios_v1_1_04_05_2026.docx` |

### `04_BUILD/code/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `ParentOS_Seed_Data_v1_0_09_05_2026.json` | ACTIVE | `04_BUILD/code/ParentOS_Seed_Data_v1_0_09_05_2026.json` |

> **הערה:** התיקייה תאוכלס בקוד Next.js + React + Supabase כאשר הבנייה תתקדם.

---

## 05_ASSETS/

**תפקיד:** עיצוב, פונטים, גרפיקה.

### `05_ASSETS/design/` — ריק
### `05_ASSETS/fonts/` — ריק
### `05_ASSETS/images/` — ריק

---

## 06_MARKETING/

**תפקיד:** שיווק, תוכן חיצוני, השקה.

### `06_MARKETING/content/` — ריק
### `06_MARKETING/messaging/` — ריק
### `06_MARKETING/launch/` — ריק

---

## 07_OPERATIONS/

**תפקיד:** תפעול, deployment, legal, analytics.

### `07_OPERATIONS/processes/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `Operational_Closure_Pack_v1_5.docx` | ACTIVE | `07_OPERATIONS/processes/Operational_Closure_Pack_v1_5.docx` |
| 2 | `Operational_Closure_Pack_v1_4.docx` | ACTIVE_UNTIL_VERIFIED | `07_OPERATIONS/processes/Operational_Closure_Pack_v1_4.docx` |

### `07_OPERATIONS/legal/` — ריק
### `07_OPERATIONS/analytics/` — ריק

---

## 08_ניהול_פרויקט/

**תפקיד:** ניהול, תיעוד, status.

### `08_ניהול_פרויקט/status/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `PROJECT_STATUS_AUDIT_v1_0_04_05_2026.docx` | ACTIVE | `08_ניהול_פרויקט/status/PROJECT_STATUS_AUDIT_v1_0_04_05_2026.docx` |
| 2 | `PROJECT_FILE_SYSTEM_v1_0_2026-05-04.docx` | ACTIVE | `08_ניהול_פרויקט/status/PROJECT_FILE_SYSTEM_v1_0_2026-05-04.docx` |
| 3 | `CONVERSATION_FILE_MAPPING_REGISTRY_v1_0_2026-05-04.docx` | ACTIVE | `08_ניהול_פרויקט/status/CONVERSATION_FILE_MAPPING_REGISTRY_v1_0_2026-05-04.docx` |
| 4 | `FINAL_REPO_STATE.md` | LOCKED | `08_ניהול_פרויקט/status/FINAL_REPO_STATE.md` |
| 5 | `MOVE_PLAN.md` | ACTIVE | `08_ניהול_פרויקט/status/MOVE_PLAN.md` |
| 6 | `DUPLICATES_REPORT.md` | ACTIVE | `08_ניהול_פרויקט/status/DUPLICATES_REPORT.md` |
| 7 | `MANUAL_REVIEW.md` | LOCKED | `08_ניהול_פרויקט/status/MANUAL_REVIEW.md` |
| 8 | `REPO_AUDIT_SUMMARY.md` | ACTIVE | `08_ניהול_פרויקט/status/REPO_AUDIT_SUMMARY.md` |

### `08_ניהול_פרויקט/documentation/`

| # | קובץ | סטטוס | Canonical Path |
|---|---|---|---|
| 1 | `KNOWLEDGE_MAP.md` | ACTIVE | `08_ניהול_פרויקט/documentation/KNOWLEDGE_MAP.md` |
| 2 | `PROJECT_STATE.md` | ACTIVE | `08_ניהול_פרויקט/documentation/PROJECT_STATE.md` |
| 3 | `SKILLS_INDEX.md` | ACTIVE | `08_ניהול_פרויקט/documentation/SKILLS_INDEX.md` |
| 4 | `VERSION_NOTE.md` | ACTIVE | `08_ניהול_פרויקט/documentation/VERSION_NOTE.md` |
| 5 | `PARENT_VOICE_BANK_LOCK_NOTE.md` | ACTIVE | `08_ניהול_פרויקט/documentation/PARENT_VOICE_BANK_LOCK_NOTE.md` |
| 6 | `SOMATIC_BANK_LOCK_NOTE.md` | ACTIVE | `08_ניהול_פרויקט/documentation/SOMATIC_BANK_LOCK_NOTE.md` |

### `08_ניהול_פרויקט/חומרים_לאמיר/` — ריק

---

## 99_ARCHIVE/

**תפקיד:** ארכיון.

### `99_ARCHIVE/deprecated/` — ריק
### `99_ARCHIVE/old_versions/` — ריק

> **החלטה סופית:** לא הועבר שום קובץ לארכיון. כל המועמדים הקודמים מקבלים סטטוס `ACTIVE_UNTIL_VERIFIED` ונשארים במיקומם הפעיל.

---

# סיכום ספירה

| תיקייה | קבצים | LOCKED | ACTIVE | ACTIVE_UNTIL_VERIFIED | DRAFT | DUPLICATE_IDENTICAL | FORMAT_ERROR | MISSING |
|---|---|---|---|---|---|---|---|---|
| 00_CORE | 12 | 2 | 1 | 0 | 0 | 0 | 2* | 7 |
| 01_PRODUCT | 19 | 0 | 6 | 0 | 0 | 0 | 0 | 13 |
| 02_CONTENT | 15 | 3 | 6 | 1 | 1 | 1 | 0 | 5 |
| 03_TECH | 26 | 0 | 21 | 4 | 0 | 1 | 0 | 0 |
| 04_BUILD | 6 | 0 | 5 | 1 | 0 | 0 | 0 | 0 |
| 05_ASSETS | 0 | — | — | — | — | — | — | — |
| 06_MARKETING | 0 | — | — | — | — | — | — | — |
| 07_OPERATIONS | 2 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 08_ניהול_פרויקט | 14 | 2 | 12 | 0 | 0 | 0 | 0 | 0 |
| 99_ARCHIVE | 0 | — | — | — | — | — | — | — |
| **סה"כ** | **94** | **7** | **52** | **7** | **1** | **2** | **2** | **25** |

\* קובץ אחד הוא גם FORMAT_ERROR וגם DUPLICATE_IDENTICAL — נספר פעם אחת ב-FORMAT_ERROR.

**קבצים פיזית קיימים בריפו:** 69 (94 - 25 חסרים).

---

# כללי שימוש

1. **כל קובץ חדש** שנוסף לריפו חייב לקבל canonical path מהמסמך הזה או הרחבה שלו.
2. **שינוי סטטוס** של קובץ דורש עדכון של המסמך הזה.
3. **קבצים בסטטוס `ACTIVE_UNTIL_VERIFIED`** נשארים פעילים. לא לארכב, לא למחוק, לא להעביר.
4. **קבצים בסטטוס `MISSING_FROM_LOCAL_WORKSPACE`** רשומים לתיעוד. ייתכן שקיימים ב-Drive המקורי.
5. **קבצים בסטטוס `FORMAT_ERROR`** לא תוקנו. לא לתקן עד החלטה מפורשת.
6. **קבצים בסטטוס `DUPLICATE_IDENTICAL`** נשארים פיזית. לא למחוק.

---

**נעול:** 10.05.2026 | **גרסה:** v1.0 🔒 | **Source of Truth של הריפו**
