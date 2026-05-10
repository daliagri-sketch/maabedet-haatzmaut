# MANUAL_REVIEW.md — קבצים לבדיקה ידנית

**תאריך:** 10.05.2026
**מטרה:** קבצים שדורשים זיהוי תוכני, השוואה, או הכרעה ידנית — לפני העברה.
**סטטוס:** כל הקבצים האלה **לא הועברו**, נשארו במקומם הזמני, או סומנו במיקום זמני ב-INDEX.

---

## חלק א — קבצים שזיהיתי לפי תוכן

### 1. `template.md` ✅ זוהה

**תוכן בפועל:**
> "תבנית פלט — Knowledge Research Pack
> הסקיל ממלא את התבנית הזו עם הפרמטרים מהזירה והגיל שנבחרו.
> חבילת מחקר עומק — שכבת ידע מעבדת העצמאות
> זירה: {{ARENA}} | גיל: {{AGE_GROUP}}"

**זיהוי:** template של "חבילת מחקר עומק" — נועד לאיסוף שכבת ידע לזירה+גיל מ-NotebookLM/חוקר חיצוני. 8 שאלות ממוקדות.

**מיקום מומלץ:** `03_TECH/skills/` (כ-template עזר ל-skill מחקר עומק)
**או חלופה:** `01_PRODUCT/specs/` (אם זה חלק מהמוצר ולא מהסקיל)

**ביטחון:** בינוני. דליה צריכה להחליט אם זה template של skill או של תהליך מחקר.

---

### 2. `SKILL.md` ✅ זוהה

**תוכן בפועל (YAML frontmatter):**
> ```yaml
> name: language-quality-validator
> description: בדיקת איכות שפה למשפטי תוכן במעבדת העצמאות — לפי עקרונות "שפה חיה". מקבל רשימת משפטים, מחזיר טבלת בדיקה לפי 5 מבחנים + הצעת תיקון לכל כשל.
> ```

**זיהוי:** זה הסקיל `language-quality-validator` — סקיל מערכת פעיל (קיים גם ב-`/mnt/skills/user/language-quality-validator/SKILL.md`).

**מיקום מומלץ:** `03_TECH/skills/` בשם משופר: `Skill_Language_Quality_Validator_v1_0.md`

**ביטחון:** גבוה. דליה צריכה רק לאשר שיוסף לרשימת ה-skills הפעילים (שהיא כרגע 8 — יהפוך ל-9).

**הערה חשובה:** ה-skill הזה מופיע ב-`PROJECT_STATE.md` כ-skill `runtime-copy-qa` חסר — ייתכן שהשינוי בשם יצר בלבול. **דורש החלטה אם זה אותו skill או skill נפרד.**

---

## חלק ב — צמדי קבצים שדומים בתוכן ודורשים השוואה

### 3. `scenario-tagger_SKILL.md` vs `__Skill_Scenario_Tagger_v2_1_04_05_2026.md`

| שדה | קובץ A | קובץ B |
|---|---|---|
| שם | `scenario-tagger_SKILL.md` | `__Skill_Scenario_Tagger_v2_1_04_05_2026.md` |
| גודל | 11.9 KB | 13.3 KB |
| YAML name | `scenario-tagger` | `Skill_Scenario_Tagger` |
| YAML status | (אין) | `LOCKED_WITH_DEPENDENCY` |
| YAML version | (אין) | `v2.1` |

**הערכה:** אלה שני מסמכים שונים על אותו skill:
- **A:** הגרסה הריצה של ה-skill (system-skill, נטען לזיכרון Claude).
- **B:** תיעוד הגרסה הנעולה עם dependencies + version control.

**שניהם נחוצים** — לכל מטרה אחרת. **לא להעביר אחד מהם לארכיון.**

**מיקום מומלץ לשניהם:** `03_TECH/skills/`

---

### 4. `development-mapper_v2_SKILL.md` vs (אין skill מתועד עם שם זה ב-INDEX)

**זיהוי:** זה ה-system-skill הפעיל של development-mapper.

**הערה:** ה-INDEX הקודם של 03_TECH לא כלל skill בשם זה. הוא מופיע ב-`PROJECT_STATE.md` כ-`development-mapper v1` נעול. ייתכן ש-`v2` הוא גרסה חדשה יותר שלא תועדה.

**מיקום מומלץ:** `03_TECH/skills/`

**דורש בדיקה:** האם `v2` שונה מ-`v1` שמופיע ב-PROJECT_STATE? אם כן — איזו פעילה?

---

## חלק ג — קבצי DOCX שאינם DOCX אמיתיים

### 5. `_מעבדת_העצמאות_חזון_v3_1_2026-04-15.docx`
### 6. `_01_01_גישתה_של_דליה_עקרונות_תפעוליים_v3_0_2026-04-14.docx`

**ממצא טכני:** שני הקבצים הם **קבצי טקסט UTF-8** עם סיומת `.docx` שגויה.
**ממצא תוכני:** שני הקבצים מכילים **בדיוק אותו תוכן** (MD5 זהה) — שניהם טקסט של מסמך חזון.

**סטטוס:** FORMAT_ERROR. **לא לתקן עדיין** (לפי הכרעת דליה).

**שתי שאלות פתוחות לדליה:**
1. האם הקובץ הנכון של "גישתה של דליה" קיים ב-Google Drive המקורי? אם כן — להעלות אותו.
2. האם יש DOCX אמיתי של חזון v3.1 ב-Google Drive המקורי?

**הערה:** התוכן בפועל (טקסט החזון) קריא וניתן לשימוש — אבל הוא לא DOCX, ולכן לא ייפתח כראוי בכלים שמצפים ל-DOCX.

---

## חלק ד — קבצים עם פער תוכני משמעותי (לא לארכב — לפי הכרעת דליה)

### 7. `Independence_Lab_Language_Engine_v1_2__1_.docx` (22.9 KB) vs `Language_Engine_v2_1` (8.5 KB)

**הפרש:** 14.4 KB — סביר שתוכן ניכר נעלם או שהוקטן משמעותית.
**פעולה:** לא לארכב את v1.2. להשאיר במקומו עד שדליה תאשר אחרי בדיקת תוכן.

---

### 8. `Tagged_Scenarios_Batch_01.docx` (52.9 KB) vs `__Tagged_Scenarios_Batch_01_v1_1_LOCKED` (49.7 KB)

**הפרש:** 3.2 KB. הלא-נעול גדול יותר מהנעול — חשד שאיבדנו תוכן בנעילה.
**פעולה:** לא לארכב. **דליה צריכה להשוות תוכנים.**

---

### 9. `מעבדת_העצמאות_חזון_v1_0.docx` (20.9 KB) vs `_מעבדת_העצמאות_חזון_v3_1` (5.7 KB)

**הפרש:** 15.2 KB. v3.1 גם בעייתי טכנית (טקסט במקום DOCX).
**פעולה:** לא לארכב את v1.0. הוא ייתכן הגרסה היחידה השלמה של החזון.

---

## חלק ה — כפילויות זהות (MD5 זהה — לא לאחד, לא למחוק)

### 10. `CANONICAL_PARENT_VOICE_BANK_v1_0_PATCHED.docx` ↔ `__CANONICAL_PARENT_VOICE_BANK_v1_0_LOCKED_02_05_2026.docx`

**MD5 זהה:** `1a9e3762f5a0fa513c48e066c0ee482b`
**פעולה:** סומנו כ-DUPLICATE_IDENTICAL. **לא למחוק** (לפי הכרעת דליה). שניהם נשארים במקומם — אחד ב-`02_CONTENT/banks/`, השני ב-`02_CONTENT/scenarios/`.

**שאלה פתוחה לדליה:** האם הייתה אמורה להיות גרסה PATCHED שונה תוכנית, ולא נשמרה? אם כן — ייתכן שצריך לאתר את ה-PATCH האמיתי מהיסטוריית גוגל דרייב.

---

## חלק ו — קבצים חסרים שמופיעים ב-INDEX-ים קודמים אך לא בפועל

### תיקיית 00_CORE/theory/ (3 קבצים)
- `בולבי_ואיינסוורת___עצמאות_ילדים_3-10.docx`
- `מאסלו__עצמאות_ילדים_ובוט_הורים.docx`
- `תיאוריות_ההתפתחות_המובילות_לשפה_מעשית_ותפקודית...docx`

### תיקיית 00_CORE/locked_decisions/ (2 קבצים)
- `Locked_Decision_Ledger_v1.0_02.05.2026.docx`
- `Canonical_Vocabulary_v1_0_02.05.2026.docx`

### תיקיית 00_CORE/doctrine/ (1 קובץ)
- `Independence_Lab_Theoretical_Foundation_v1_0.docx`

### תיקיית 01_PRODUCT/gold_cases/ (4 קבצים)
- `GOLD_CASE_PLAYSTATION_AGE_6_v1.md`
- `GOLD_CASE_SCREEN_ENDING_AGE_6_v1.md`
- `GOLD_CASE_TWINS_PLAYGROUND_AGE_5_v1.md`
- `GOLD_CASES.md`

### תיקיית 01_PRODUCT/arenas/ (7 קבצים — תת-תיקייה ריקה לחלוטין)
- `Arena_Library_v1_0_Completion_15_Arenas.docx`
- `CANONICAL_ARENA_TRIGGER_BANK_v1_0.md` — **קריטי ל-AI Adapter**
- `Chores.docx`, `Screens.docx`, `Sibling.docx`, `Sleep.docx`, `Transitions.docx`

### תיקיית 02_CONTENT/banks/ (5 קבצים)
- `Child_Signal_Bank_v1_0.docx` (יש רק DRAFT)
- `SOS_BANK.md` — **קריטי, 12 יחידות SOS**
- `Development_Truth_Bank_Unified_v1_0.docx`
- `Parent_Sub_Pattern_Library_v1_0.docx`
- `Developmental_Constraints_NEVER_Demand_v1_0.docx`

**סה"כ חסרים:** **22 קבצים** מתועדים ב-INDEX-ים אך לא נמצאים בפועל.

**שאלה לדליה:** האם הקבצים האלה ב-Google Drive המקורי שלך? אם כן, הם פשוט לא הועלו לסביבת העבודה הנוכחית, וזה לא בעיה. אם לא — יש פער תיעוד גדול.

---

## סיכום פעולות נדרשות

| חלק | קבצים | פעולה נדרשת מדליה |
|---|---|---|
| א | 2 (template.md, SKILL.md) | אישור מיקום + שינוי שם ל-SKILL.md |
| ב | 3 צמדים (system-skills) | החלטה אם להשאיר את שני הקבצים |
| ג | 2 (DOCX לא תקפים) | בירור אם DOCX אמיתי קיים ב-Drive |
| ד | 3 (פער תוכני) | השוואת תוכן ידנית לפני ארכיון |
| ה | 1 צמד (MD5 זהה) | החלטה אם זה תקלה או מתוכנן |
| ו | 22 (חסרים) | בירור איפה הם — Drive או אבדו |

---

**עודכן:** 10.05.2026 | **גרסה:** v1.0
