# GOLD CASES — development-mapper

## Case 1 — PASS
age: 4 | arena: בוקר | task: dressing | child_state: תקוע + מסרב | current_scaffolding_level: 4

### Output
```
capable_of:
  - ללבוש מכנסיים עם גומי אם מונחים פתוחים על הרצפה
  - להכניס רגליים לגרביים אם ההורה מחזיק פתוחה
  - להכניס ידיים לשרוולים אם פתח הצוואר מוחזק פתוח
not_ready_for:
  - רצף לבישה עצמאי מלא
  - נעליים עם שרוכים
  - ויסות עצמי של תחושת התנגדות ויציאה ממנה
partial_success:
  - כל פריט בנפרד עשוי להיות חלקי
recommended_scaffold:
  level: 4
  description: ההורה מניח כל פריט בגוף הילד ומבקש תנועה אחת
language_level:
  complexity: פשוט
  max_words: 3
risk_if_overasked:
  - קפיאה מלאה וסירוב לכל מגע
  - חיזוק דפוס parent_takeover
next_small_step:
  action: להניח את המכנסיים על רגליו ולבקש ממנו למשוך למעלה
  scaffold_needed: כן
flag: parent_takeover / outside_scaffolding
```
