# GOLD CASE — PLAYSTATION / AGE 6
**Status: APPROVED — 02.05.2026**
**Version: v1**

## Use as reference for:
- סיום משחק / גיל 6
- התעלמות מוחלטת מהוראה
- Parent pattern differentiation (לופ / מ-0-ל-100 / רק_הפעם / ויתור_שקט)
- Heart Engine + Parent Guidance integration
- Full pipeline validation

---

## Scenario

**Child:** עומרי, גיל 6
**Arena:** מסכים — סיום משחק
**Task:** עצירת PlayStation + מקלחת + שינה
**Child state:** עסוק / מתעלם לחלוטין
**Resistance type:** ignoring — no response to verbal request
**Trigger:** הורה מבקש לעצור

**Development (shared):**
- capable_of: להבין הוראה אחת ברורה / לעצור כשמשהו בסיטואציה משתנה
- not_ready_for: לעבור ממשחק להוראה מילולית בלבד / לווסת לבד עזיבת משחק
- recommended_scaffold: level 3 / language_level: max_words 6

---

## PATTERN 1 — לופ

```
situation_reflection:
  ביקשת שיעצור, יתקלח, ילך לישון.
  הוא ממשיך לשחק כאילו לא אמרת כלום.

child_translation:
  הוא לא מתעלם בכוונה.
  הוא למד שאפשר להמשיך
  עד שמשהו באמת משתנה.

parent_reflection:
  אתה אומר שוב.
  ועוד פעם.
  ומחכה שהפעם זה יעבוד.

inner_anchor:
  בן 6 לא זז מחזרה על אותה בקשה.
  הוא זז כשמשהו בסיטואציה משתנה.
  כל חזרה אומרת לו שאפשר לחכות עוד.

say:
  עכשיו עוצרים את המשחק.

self_action:
  לא אומרים שוב.
  ניגשים למסך.

child_action:
  אומרים פעם אחת.
  ומכבים.

resistance_response:
  אם הוא מתנגד —
  לא נכנסים לוויכוח.
  המסך כבה.

meaning:
  ככה הוא לומד
  שכשאמרת עכשיו —
  זה עכשיו.

reflection:
  לא חזרת שוב.
  זה השינוי.

flag: null
```

## PATTERN 2 — מ-0-ל-100

```
situation_reflection:
  ביקשת.
  הוא המשיך לשחק.
  הקול שלך כבר עולה.

child_translation:
  הוא לא מתגרה בך.
  הוא עדיין בתוך המשחק
  ולא עבר לשמוע אותך.

parent_reflection:
  אתה מרגיש שהוא מתעלם ממך.
  עוד שנייה תגיב מתוך הכעס.

inner_anchor:
  בן 6 לא עובר ממשחק להוראה
  כשמישהו מגיע עם קול כועס.
  הגוף שלו נסגר לפני שהוא מספיק לשמוע.
  הוא צריך אותך רגוע
  כדי שהמעבר יקרה.

say:
  עכשיו עוצרים. מקלחת ושינה.

self_action:
  עוצרים לפני שמדברים.
  ניגשים בשקט.

child_action:
  משפט אחד.
  ומכבים.

resistance_response:
  אם הוא מתנגד —
  לא מרימים קול.
  המסך כבה בלי ויכוח.

meaning:
  ככה הוא לומד
  שאתה רציני
  גם בלי לצעוק.

reflection:
  לא צעקת.
  זה השינוי.

flag: null
```

## PATTERN 3 — רק_הפעם

```
situation_reflection:
  ביקשת שיעצור.
  הוא ממשיך.
  ואתה כבר חושב אם עוד רגע זה באמת משנה.

child_translation:
  הוא לא מתעלם.
  הוא מחכה לראות
  אם הפעם זה יעבוד כמו בפעמים שעבד.

parent_reflection:
  אתה עייף.
  ומחשב אם שווה את הוויכוח עכשיו.
  ואתה כבר מתכונן לתת עוד קצת.

inner_anchor:
  בן 6 לומד מה עובד.
  אם המתנה תמיד נותנת עוד זמן —
  הוא ימשיך לחכות.
  כל דחייה שלך עכשיו
  מלמדת אותו שהגבול זז.

say:
  עכשיו מכבים. לא מוסיפים זמן.

self_action:
  לא מחשבים מחדש.
  ניגשים למסך.

child_action:
  אומרים פעם אחת.
  ומכבים.

resistance_response:
  אם הוא מבקש עוד קצת —
  לא פותחים דיון.
  המסך כבה.

meaning:
  ככה הוא לומד
  שכשאמרת עכשיו —
  זה לא מתחיל משא ומתן.

reflection:
  לא נתת עוד רגע.
  זה השינוי.

flag: null
```

## PATTERN 4 — ויתור_שקט

```
situation_reflection:
  ביקשת.
  הוא ממשיך לשחק.
  ואתה כבר לא בטוח שיש לך כוח לזה עכשיו.

child_translation:
  הוא מחכה לראות
  אם הפעם הכלל יחזיק.

parent_reflection:
  אתה עייף.
  ורוצה שזה ייגמר בלי ויכוח.
  ואתה כבר חושב לתת לו עוד רגע.

inner_anchor:
  בן 6 לא לומד לעצור
  כשהכלל משתנה בגלל עייפות.
  כל פעם שנסגת —
  הוא לומד שאפשר לחכות עוד.

say:
  עכשיו מכבים.

self_action:
  לא מסבירים שוב.
  ניגשים למסך.

child_action:
  אומרים פעם אחת.
  ומכבים.

resistance_response:
  אם הוא מתנגד —
  לא מוסיפים זמן.
  נשארים איתו.
  ולא משנים את הכלל.

meaning:
  ככה הוא לומד
  שעייפות שלך
  לא מזיזה את הכלל.

reflection:
  לא נסגת.
  זה השינוי.

flag: null
```
