# INDEX — 04_BUILD

**תיקייה ראשית:** Build & Testing

**תאריך עדכון:** 09.05.2026

---

## 🎯 תפקיד התיקייה

קוד, בדיקות, QA reports, ו-integration tests.  
**כל מה שקשור לבניה ובדיקות של המערכת.**

---

## 📁 מבנה תיקיות משנה

```
04_BUILD/
├── tests/       (2 קבצים)
├── integration/ (2 קבצים)
└── code/        (ייכלל ParentOS MVP code)
```

---

## 📄 קבצים בתיקייה

### `04_BUILD/tests/`

#### 1. **Gold_Test_Set_v1_0_2_04_05_2026.md**
- **תיאור:** 5 test cases
- **תוכן:** Gold Cases בפורמט test
- **גרסה:** v1.0.2
- **פורמט:** Markdown
- **שימוש:** Integration testing

**Test Cases:**
1. **HOMEWORK_AGE_7** — 4 patterns
2. **PLAYSTATION_AGE_6** — 4 patterns
3. **SCREEN_ENDING_AGE_6** — 4 patterns
4. **SIBLING_ATTENTION_HARM_AGE_4** — 4 patterns
5. **TWINS_PLAYGROUND_AGE_5** — 4 patterns

**Total:** 20 test scenarios (5 cases × 4 patterns)

#### 2. **QA_Checklist_Pack_v1_0_04_05_2026.md**
- **תיאור:** QA checklist
- **תוכן:** Pre-launch checklist
- **קטגוריות:**
  - Schema validation
  - Language quality
  - Pattern detection
  - Development constraints
  - Output structure
- **פורמט:** Markdown
- **שימוש:** Release QA

---

### `04_BUILD/integration/`

#### 3. **Skills_Integration_Test_Spec_v1_1_04_05_2026.docx**
- **תיאור:** Skills integration test
- **תוכן:** איך ה-6 skills עובדים ביחד
- **פורמט:** Word
- **שימוש:** Integration validation

**Workflow tested:**
```
Version Lock/Decision Keeper
  ↓
Schema Guardian
  ↓
Runtime Composer
  ↓
Parent Chat Adapter
  ↓
Runtime Copy QA
  ↓
Skill Stress Tester
```

#### 4. **Data_Structure_Tagged_Scenarios_v1_1_04_05_2026.docx**
- **תיאור:** Data structure for tagged scenarios
- **תוכן:** Schema definition + examples
- **פורמט:** Word
- **שימוש:** Scenario storage

---

### `04_BUILD/code/`

**[תיכלול קוד ParentOS MVP]**

**מה יכנס כאן:**
- `app/` — Next.js app directory
- `components/` — React components
- `lib/` — Utility functions
- `supabase/` — DB migrations
- `public/` — Static assets
- `package.json` — Dependencies
- `tsconfig.json` — TypeScript config
- `tailwind.config.js` — Tailwind config

**סטטוס:** 🔜 ממתין לקוד מסוכן Claude Code

---

## 🔗 קשרים לתיקיות אחרות

**← תלוי ב:**
- `01_PRODUCT/gold_cases/` — Test cases source
- `02_CONTENT/banks/` — Test data
- `03_TECH/specs/` — Implementation specs
- `03_TECH/skills/` — Skills to test

**→ משפיע על:**
- שום תיקייה (זה שלב הסופי)

---

## 📊 סטטוס

| תיקיית משנה | קבצים | סטטוס | עדכון אחרון |
|-------------|-------|--------|--------------|
| tests/ | 2 | ✅ מלא | 2026-05-04 |
| integration/ | 2 | ✅ מלא | 2026-05-04 |
| code/ | 0 | 🔜 ריק | — |

**סה"כ:** 4 קבצים (+ code לבוא)

---

## 🚨 הערות קריטיות

### Test Coverage
- **5 Gold Cases** → 20 test scenarios
- **6 Skills** → integration workflow
- **QA Checklist** → pre-launch validation

### Integration Tests
**Pipeline שנבדק:**
1. Version Lock (blocks invalid changes)
2. Schema Guardian (validates structure)
3. Runtime Composer (builds guidance)
4. Parent Chat Adapter (Hebrew NLP)
5. Runtime Copy QA (language check)
6. Skill Stress Tester (validates skills)

### Code Directory
**עתיד להכיל:**
- Full ParentOS MVP codebase
- Next.js 16.2.6
- TypeScript
- Supabase integration
- Hebrew RTL support

---

**עודכן:** 09.05.2026 | **גרסה:** v1.0
