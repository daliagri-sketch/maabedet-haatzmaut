# INDEX — 03_TECH

**תיקייה ראשית:** Technical Specifications & Skills
**תאריך עדכון:** 10.05.2026 | **גרסה:** v1.1
**מקור:** סריקה בפועל של `/mnt/project/` ב-10.05.2026

---

## 🎯 תפקיד התיקייה

מפרטים טכניים, skills, contracts, וארכיטקטורה טכנית.

---

## 📁 מבנה תיקיות משנה

```
03_TECH/
├── specs/      (Tech stack, DB, API, State Machine, UI)
├── skills/     (8 skills פעילים)
└── contracts/  (Runtime, SOS, Signal Mapping, Fallback)
```

---

## 📄 קבצים

### `03_TECH/specs/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `Tech_Stack_Spec_v1_0_04_05_2026.md` | פעיל | 3.9 KB |
| 2 | `Tech_Stack_Spec_v1_0_04_05_2026.docx` | DUPLICATE_FORMAT | 4.0 KB. אותה גרסה בפורמט DOCX. **דורש הכרעה.** |
| 3 | `Database_Schema_v1_2_04_05_2026.md` | פעיל | 25 KB |
| 4 | `API_Contract_v1_0_04_05_2026.md` | פעיל | 3.5 KB |
| 5 | `State_Machine_Spec_v1_1_04_05_2026.docx` | פעיל | 4.7 KB |
| 6 | `UI_Component_Spec_v1_1_04_05_2026.docx` | פעיל | 5.2 KB |
| 7 | `ParentOS_MVP_Phase1_Screen_Specs_v1_0.json` | קיים | 21.7 KB. UI specs בפורמט JSON. |

---

### `03_TECH/skills/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `Skill_Version_Lock_Decision_Keeper_v1_0_04_05_2026.md` | פעיל | 12.6 KB |
| 2 | `Skill_Schema_Guardian_v1_2_04_05_2026.md` | פעיל | 11.9 KB |
| 3 | `Runtime_Composer_v1_1_04_05_2026.md` | פעיל | 3.5 KB |
| 4 | `Screen_Packet_Builder_v1_1_04_05_2026.md` | פעיל | 4.4 KB |
| 5 | `__Skill_Scenario_Tagger_v2_1_04_05_2026.md` | פעיל | 13.3 KB |
| 6 | `__Skill_Runtime_Copy_QA_v1_0_1_04_05_2026.md` | פעיל v1.0.1 | 10.2 KB. (לפי VERSION_NOTE — v1.0 → ארכיון) |
| 7 | `Skill_Content_Structurer_v1_0_04_05_2026.md` | פעיל | 17.5 KB |
| 8 | `Skill_Registry_v1_0_1_04_05_2026.md` | פעיל | 6.0 KB |
| 9 | `scenario-tagger_SKILL.md` | קיים | 11.9 KB. ייתכן שזה גרסת system-skill מהפלטפורמה. |
| 10 | `development-mapper_v2_SKILL.md` | קיים | 5.9 KB. ייתכן שזה גרסת system-skill מהפלטפורמה. |

---

### `03_TECH/contracts/`

| # | שם קובץ | סטטוס | הערות |
|---|---|---|---|
| 1 | `Canonical_Runtime_Contract_v1_1_04_05_2026.docx` | פעיל | 22.3 KB |
| 2 | `SOS_Payload_Builder_v1_1_2026-05-04.docx` | פעיל | 18.9 KB |
| 3 | `Child_Signal_Mapping_Lock_v1_1_04_05_2026.docx` | פעיל | 15.4 KB |
| 4 | `Fallback_Packet_Definition_v1_0_04_05_2026.docx` | פעיל | 15.6 KB |
| 5 | `AI_Adapter_Integration_Guide_v1_0_COMPLETE.docx` | קיים | 3.8 KB |
| 6 | `Language_Contract_v1_1.docx` | קיים | 5.6 KB |

---

## 📊 סטטוס

| תיקיית משנה | קבצים בפועל | קבצים לפי INDEX קודם | הערות |
|---|---|---|---|
| specs/ | 7 | 5 | +2 (ParentOS_Screen_Specs, Tech_Stack DOCX) |
| skills/ | 10 | 8 | +2 (system-skills) |
| contracts/ | 6 | 4 | +2 (AI_Adapter_Guide, Language_Contract) |
| **סה"כ** | **23** | **17** | +6 |

---

## 🚨 דגלים אדומים

1. **Tech_Stack_Spec בשני פורמטים** — `.md` ו-`.docx` של אותה גרסה. דורש הכרעה איזה פורמט "פעיל" ואיזה ארכיון.
2. **שני system-skills** (`scenario-tagger_SKILL.md`, `development-mapper_v2_SKILL.md`) — ייתכן שאלה גרסאות מקבילות לסקילים שכבר תועדו (`__Skill_Scenario_Tagger_v2_1`, וגרסה v1 של development-mapper). **דורש בדיקה ידנית** — ראה MANUAL_REVIEW.md.

---

## 🔗 קשרים

**← תלוי ב:** 00_CORE/locked_decisions/, 02_CONTENT/banks/
**→ משפיע על:** 04_BUILD/code/, 04_BUILD/tests/

---

**עודכן:** 10.05.2026 | **גרסה:** v1.1 (סריקה בפועל)
