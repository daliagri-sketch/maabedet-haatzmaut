-- ============================================================================
-- Seed: patterns
-- Official four patterns for "מעבדת העצמאות".
-- Slugs are stable identifiers (English). Names are Hebrew display labels.
-- ============================================================================

insert into public.patterns (slug, name, short_description, color, sort_order) values
  ('loop',           'הלופ',        'אותה אינטראקציה חוזרת על עצמה שוב ושוב בלי שינוי.',        '#F59E0B', 1),
  ('quiet_giveup',   'ויתור שקט',   'ויתור לא-מדובר שמצטבר בלי שההורה או הילד שמים לב.',         '#64748B', 2),
  ('zero_to_hundred','מ-0 ל-100',   'מעבר חד מאיפוק מלא לפיצוץ בלי שלבים בדרך.',                 '#EF4444', 3),
  ('just_this_once', 'רק הפעם',     'ויתור חד-פעמי שהופך בהדרגה להרגל קבוע.',                    '#14B8A6', 4)
on conflict (slug) do nothing;

-- ============================================================================
-- Seed: content_bank
-- 4 patterns × 4 content types × 5 items each = 80 rows.
-- Hebrew living-language: short, concrete, usable in a real house moment.
-- Re-running this block is safe: it clears and reinserts these four types.
-- ============================================================================

delete from public.content_bank
where content_type in ('reminder','routine_task','small_action','child_learning');

insert into public.content_bank
  (pattern_id, title, body, content_type, age_group, arena, sort_order, is_published)
select p.id, v.title, v.body, v.content_type, v.age_group, v.arena, v.sort_order, true
from (values
  -- ==========================================================================
  -- LOOP (הלופ) — חוזרים על הבקשה שוב ושוב; הילד לומד לחכות לתזכורת הבאה.
  -- ==========================================================================
  -- reminder (max 8 words)
  ('loop', 'אמרתי שלוש פעמים. עדיין יושב מול המסך.', 'אמרתי שלוש פעמים. עדיין יושב מול המסך.', 'reminder', 'all', 'screens', 1),
  ('loop', 'הפעם העשירית נשמעת לו כמו הראשונה.', 'הפעם העשירית נשמעת לו כמו הראשונה.', 'reminder', 'all', 'all', 2),
  ('loop', 'אם חזרתי חמש פעמים, הוא הפסיק לשמוע.', 'אם חזרתי חמש פעמים, הוא הפסיק לשמוע.', 'reminder', 'all', 'all', 3),
  ('loop', 'אני חוזרת. הוא שומע פחות.', 'אני חוזרת. הוא שומע פחות.', 'reminder', 'all', 'all', 4),
  ('loop', 'המשפט השישי כבר לא משפט.', 'המשפט השישי כבר לא משפט.', 'reminder', 'all', 'all', 5),
  -- routine_task (max 12 words)
  ('loop', 'פעם ביום, אומרת בקשה רק פעם אחת.', 'פעם ביום, אומרת בקשה רק פעם אחת.', 'routine_task', 'all', 'all', 6),
  ('loop', 'בבוקר בוחרת משפט שלא אחזור עליו היום.', 'בבוקר בוחרת משפט שלא אחזור עליו היום.', 'routine_task', 'all', 'morning', 7),
  ('loop', 'אחרי ארוחת ערב, סופרת כמה פעמים ביקשתי אותו דבר.', 'אחרי ארוחת ערב, סופרת כמה פעמים ביקשתי אותו דבר.', 'routine_task', 'all', 'food', 8),
  ('loop', 'לפני שחוזרת שוב, עוצרת שתי שניות.', 'לפני שחוזרת שוב, עוצרת שתי שניות.', 'routine_task', 'all', 'all', 9),
  ('loop', 'בערב רושמת: מה ביקשתי יותר מארבע פעמים.', 'בערב רושמת: מה ביקשתי יותר מארבע פעמים.', 'routine_task', 'all', 'all', 10),
  -- small_action (max 10 words)
  ('loop', 'כשחזרתי פעם שלישית, מניחה יד על הכתף.', 'כשחזרתי פעם שלישית, מניחה יד על הכתף.', 'small_action', '3-5', 'all', 11),
  ('loop', 'מורידה את הטלפון, הולכת אליו, מסתכלת בעיניים.', 'מורידה את הטלפון, הולכת אליו, מסתכלת בעיניים.', 'small_action', 'all', 'screens', 12),
  ('loop', 'אחרי הבקשה הראשונה, סוגרת פה.', 'אחרי הבקשה הראשונה, סוגרת פה.', 'small_action', 'all', 'all', 13),
  ('loop', 'נוגעת בזרוע במקום לחזור על המשפט.', 'נוגעת בזרוע במקום לחזור על המשפט.', 'small_action', '3-5', 'all', 14),
  ('loop', 'במקום לומר "קום" שוב — מרימה את השמיכה.', 'במקום לומר "קום" שוב — מרימה את השמיכה.', 'small_action', 'all', 'morning', 15),
  -- child_learning (max 14 words)
  ('loop', 'הילד לומד שאין סיבה לזוז בפעם הראשונה.', 'הילד לומד שאין סיבה לזוז בפעם הראשונה.', 'child_learning', 'all', 'all', 16),
  ('loop', 'הילד לומד לחכות לתזכורת השלישית — רק אז זה נחשב.', 'הילד לומד לחכות לתזכורת השלישית — רק אז זה נחשב.', 'child_learning', '6-8', 'all', 17),
  ('loop', 'הוא מבין שהמילים הראשונות הן כותרת, לא הוראה.', 'הוא מבין שהמילים הראשונות הן כותרת, לא הוראה.', 'child_learning', 'all', 'all', 18),
  ('loop', 'הילד לומד שההורה יחזור — אין לחץ לזוז מיד.', 'הילד לומד שההורה יחזור — אין לחץ לזוז מיד.', 'child_learning', 'all', 'all', 19),
  ('loop', 'הוא מזהה שבקשה ראשונה היא רק הודעה.', 'הוא מזהה שבקשה ראשונה היא רק הודעה.', 'child_learning', '9-10', 'all', 20),

  -- ==========================================================================
  -- QUIET_GIVEUP (ויתור שקט) — מורידים דרישה בשקט או עושים בעצמנו;
  -- הילד לומד שמישהו אחר יגמור במקומו.
  -- ==========================================================================
  -- reminder
  ('quiet_giveup', 'עייפות לא זהה להסכמה.', 'עייפות לא זהה להסכמה.', 'reminder', 'all', 'all', 1),
  ('quiet_giveup', 'אם עשיתי בעצמי, כאילו ויתרתי בקול.', 'אם עשיתי בעצמי, כאילו ויתרתי בקול.', 'reminder', 'all', 'all', 2),
  ('quiet_giveup', 'לא אמרתי ולא עשיתי — הסכמתי.', 'לא אמרתי ולא עשיתי — הסכמתי.', 'reminder', 'all', 'all', 3),
  ('quiet_giveup', 'ויתור בלי מילים הוא עדיין ויתור.', 'ויתור בלי מילים הוא עדיין ויתור.', 'reminder', 'all', 'all', 4),
  ('quiet_giveup', 'שקט אחרי בקשה — אור ירוק.', 'שקט אחרי בקשה — אור ירוק.', 'reminder', 'all', 'all', 5),
  -- routine_task
  ('quiet_giveup', 'בסוף היום, בוחרת משימה שעשיתי במקומו.', 'בסוף היום, בוחרת משימה שעשיתי במקומו.', 'routine_task', 'all', 'all', 6),
  ('quiet_giveup', 'פעם ביום אומרת "לא" על דבר קטן — בקול.', 'פעם ביום אומרת "לא" על דבר קטן — בקול.', 'routine_task', 'all', 'all', 7),
  ('quiet_giveup', 'בבוקר בוחרת דבר אחד שהוא יעשה לבד היום.', 'בבוקר בוחרת דבר אחד שהוא יעשה לבד היום.', 'routine_task', 'all', 'morning', 8),
  ('quiet_giveup', 'בערב שואלת: מה עשיתי במקומו היום?', 'בערב שואלת: מה עשיתי במקומו היום?', 'routine_task', 'all', 'all', 9),
  ('quiet_giveup', 'פעם בשבוע רושמת איפה התקפלתי בשקט.', 'פעם בשבוע רושמת איפה התקפלתי בשקט.', 'routine_task', 'all', 'all', 10),
  -- small_action
  ('quiet_giveup', 'כשבא לי לעשות במקומו — יושבת ומחכה דקה.', 'כשבא לי לעשות במקומו — יושבת ומחכה דקה.', 'small_action', 'all', 'all', 11),
  ('quiet_giveup', 'אומרת בקול, "אני צריכה רגע לחשוב."', 'אומרת בקול, "אני צריכה רגע לחשוב."', 'small_action', 'all', 'all', 12),
  ('quiet_giveup', 'מניחה את הדבר שלו חזרה ויוצאת מהחדר.', 'מניחה את הדבר שלו חזרה ויוצאת מהחדר.', 'small_action', '6-8', 'all', 13),
  ('quiet_giveup', 'קמה מהספה, ניגשת אליו, מחזירה לו את המשימה.', 'קמה מהספה, ניגשת אליו, מחזירה לו את המשימה.', 'small_action', 'all', 'screens', 14),
  ('quiet_giveup', 'אומרת "זה לא הסיכום" ומפסיקה לעשות בעצמי.', 'אומרת "זה לא הסיכום" ומפסיקה לעשות בעצמי.', 'small_action', 'all', 'all', 15),
  -- child_learning
  ('quiet_giveup', 'הילד לומד שמישהו יבוא ויגמור במקומו.', 'הילד לומד שמישהו יבוא ויגמור במקומו.', 'child_learning', 'all', 'all', 16),
  ('quiet_giveup', 'הוא מבין שאמא עושה — אז הוא לא חייב להתחיל.', 'הוא מבין שאמא עושה — אז הוא לא חייב להתחיל.', 'child_learning', '3-5', 'all', 17),
  ('quiet_giveup', 'הילד לומד ששתיקה היא "כן".', 'הילד לומד ששתיקה היא "כן".', 'child_learning', 'all', 'all', 18),
  ('quiet_giveup', 'הוא לא יודע על מה ויתרתי, אז לא מוקיר את זה.', 'הוא לא יודע על מה ויתרתי, אז לא מוקיר את זה.', 'child_learning', '6-8', 'siblings', 19),
  ('quiet_giveup', 'הילד לומד לחכות, ולא לעשות — מישהו יעשה בסוף.', 'הילד לומד לחכות, ולא לעשות — מישהו יעשה בסוף.', 'child_learning', 'all', 'homework', 20),

  -- ==========================================================================
  -- ZERO_TO_HUNDRED (מ-0 ל-100) — מתחילים רגועים, פתאום קופצים בטון;
  -- הילד לומד שהגבול אמיתי רק בקול גבוה.
  -- ==========================================================================
  -- reminder
  ('zero_to_hundred', 'רגוע, רגוע, פתאום צעקה.', 'רגוע, רגוע, פתאום צעקה.', 'reminder', 'all', 'all', 1),
  ('zero_to_hundred', 'הגבול מתחיל בקול גבוה — מבחינתו.', 'הגבול מתחיל בקול גבוה — מבחינתו.', 'reminder', 'all', 'all', 2),
  ('zero_to_hundred', 'אם אני לא צועקת — זה עוד לא אמיתי.', 'אם אני לא צועקת — זה עוד לא אמיתי.', 'reminder', 'all', 'all', 3),
  ('zero_to_hundred', 'מ-0 ל-100 — אין דרגות באמצע.', 'מ-0 ל-100 — אין דרגות באמצע.', 'reminder', 'all', 'all', 4),
  ('zero_to_hundred', 'הצעקה מסיימת, היא לא פותרת.', 'הצעקה מסיימת, היא לא פותרת.', 'reminder', '3-5', 'all', 5),
  -- routine_task
  ('zero_to_hundred', 'פעם ביום, בוחרת דרגה באמצע ועוצרת שם.', 'פעם ביום, בוחרת דרגה באמצע ועוצרת שם.', 'routine_task', 'all', 'all', 6),
  ('zero_to_hundred', 'בערב שואלת: מתי היום עליתי חזק מדי?', 'בערב שואלת: מתי היום עליתי חזק מדי?', 'routine_task', 'all', 'all', 7),
  ('zero_to_hundred', 'אחרי הצעקה, רושמת מה היה לפני — רגע אחד.', 'אחרי הצעקה, רושמת מה היה לפני — רגע אחד.', 'routine_task', 'all', 'all', 8),
  ('zero_to_hundred', 'בבוקר בוחרת סימן אחד של עלייה ומקשיבה לו.', 'בבוקר בוחרת סימן אחד של עלייה ומקשיבה לו.', 'routine_task', 'all', 'morning', 9),
  ('zero_to_hundred', 'פעם ביום אומרת בקול: "אני עכשיו ב-50."', 'פעם ביום אומרת בקול: "אני עכשיו ב-50."', 'routine_task', 'all', 'all', 10),
  -- small_action
  ('zero_to_hundred', 'ברגע שהקול עולה — מורידה אותו דרגה.', 'ברגע שהקול עולה — מורידה אותו דרגה.', 'small_action', 'all', 'all', 11),
  ('zero_to_hundred', 'יוצאת מהחדר לדקה לפני שאני פותחת את הפה.', 'יוצאת מהחדר לדקה לפני שאני פותחת את הפה.', 'small_action', 'all', 'all', 12),
  ('zero_to_hundred', 'במקום לצעוק — לוחשת.', 'במקום לצעוק — לוחשת.', 'small_action', 'all', 'all', 13),
  ('zero_to_hundred', 'שמה יד על הלב, סופרת שלוש שאיפות.', 'שמה יד על הלב, סופרת שלוש שאיפות.', 'small_action', 'all', 'all', 14),
  ('zero_to_hundred', 'מתיישבת במקום לעמוד — הטון יורד איתי.', 'מתיישבת במקום לעמוד — הטון יורד איתי.', 'small_action', '6-8', 'all', 15),
  -- child_learning
  ('zero_to_hundred', 'הילד לומד ששקט הוא עוד לא גבול.', 'הילד לומד ששקט הוא עוד לא גבול.', 'child_learning', 'all', 'all', 16),
  ('zero_to_hundred', 'הוא לומד לחכות לצעקה — רק שם מתחיל "עכשיו".', 'הוא לומד לחכות לצעקה — רק שם מתחיל "עכשיו".', 'child_learning', 'all', 'all', 17),
  ('zero_to_hundred', 'הוא דרוך, לא משתף — מחכה לפיצוץ.', 'הוא דרוך, לא משתף — מחכה לפיצוץ.', 'child_learning', '9-10', 'siblings', 18),
  ('zero_to_hundred', 'הילד לומד שטון רגיל הוא בקשה, לא הוראה.', 'הילד לומד שטון רגיל הוא בקשה, לא הוראה.', 'child_learning', 'all', 'all', 19),
  ('zero_to_hundred', 'הוא לומד להיזהר, לא לדבר — פוחד מהקפיצה.', 'הוא לומד להיזהר, לא לדבר — פוחד מהקפיצה.', 'child_learning', '3-5', 'all', 20),

  -- ==========================================================================
  -- JUST_THIS_ONCE (רק הפעם) — פותחים חריגים קטנים שוב ושוב;
  -- הילד לומד לחפש את הסדק בגבול.
  -- ==========================================================================
  -- reminder
  ('just_this_once', '"רק הפעם" שלישי הוא כבר כלל.', '"רק הפעם" שלישי הוא כבר כלל.', 'reminder', 'all', 'all', 1),
  ('just_this_once', 'החריג של אתמול — ההסכם של מחר.', 'החריג של אתמול — ההסכם של מחר.', 'reminder', 'all', 'all', 2),
  ('just_this_once', 'עוד חמש דקות = חצי שעה.', 'עוד חמש דקות = חצי שעה.', 'reminder', 'all', 'screens', 3),
  ('just_this_once', 'אם אני מסבירה למה — כבר נשברתי.', 'אם אני מסבירה למה — כבר נשברתי.', 'reminder', 'all', 'all', 4),
  ('just_this_once', '"לא היום" עדיף על "רק הפעם".', '"לא היום" עדיף על "רק הפעם".', 'reminder', 'all', 'all', 5),
  -- routine_task
  ('just_this_once', 'לפני "רק הפעם", סופרת: זו הפעם הכמה?', 'לפני "רק הפעם", סופרת: זו הפעם הכמה?', 'routine_task', 'all', 'all', 6),
  ('just_this_once', 'בערב, מסמנת חריג אחד שעשיתי היום.', 'בערב, מסמנת חריג אחד שעשיתי היום.', 'routine_task', 'all', 'sleep', 7),
  ('just_this_once', 'בבוקר, בוחרת כלל אחד שלא ייפול היום.', 'בבוקר, בוחרת כלל אחד שלא ייפול היום.', 'routine_task', 'all', 'morning', 8),
  ('just_this_once', 'פעם בשבוע, בודקת איזה חריג חזר שלוש פעמים.', 'פעם בשבוע, בודקת איזה חריג חזר שלוש פעמים.', 'routine_task', 'all', 'all', 9),
  ('just_this_once', 'כשאני עייפה — מחכה דקה לפני שאני עונה.', 'כשאני עייפה — מחכה דקה לפני שאני עונה.', 'routine_task', 'all', 'all', 10),
  -- small_action
  ('just_this_once', 'במקום "רק הפעם" — אומרת "לא היום".', 'במקום "רק הפעם" — אומרת "לא היום".', 'small_action', 'all', 'all', 11),
  ('just_this_once', 'כשהוא מבקש חריג — יוצאת מהחדר, חוזרת עם תשובה.', 'כשהוא מבקש חריג — יוצאת מהחדר, חוזרת עם תשובה.', 'small_action', '9-10', 'screens', 12),
  ('just_this_once', 'שותה כוס מים לפני שאני עונה "בסדר".', 'שותה כוס מים לפני שאני עונה "בסדר".', 'small_action', 'all', 'all', 13),
  ('just_this_once', 'אומרת בקול: "היום חריג, מחר כמו תמיד."', 'אומרת בקול: "היום חריג, מחר כמו תמיד."', 'small_action', 'all', 'all', 14),
  ('just_this_once', 'קמה, מתיישבת מולו ישר, ואז עונה.', 'קמה, מתיישבת מולו ישר, ואז עונה.', 'small_action', 'all', 'food', 15),
  -- child_learning
  ('just_this_once', 'הילד לומד שהחריג של אתמול הוא הכלל של מחר.', 'הילד לומד שהחריג של אתמול הוא הכלל של מחר.', 'child_learning', 'all', 'all', 16),
  ('just_this_once', 'הוא לומד לבקש שוב — אולי הפעם ייפתח.', 'הוא לומד לבקש שוב — אולי הפעם ייפתח.', 'child_learning', 'all', 'all', 17),
  ('just_this_once', 'הילד לומד שהורה עייף אומר "כן" מהר יותר.', 'הילד לומד שהורה עייף אומר "כן" מהר יותר.', 'child_learning', '6-8', 'sleep', 18),
  ('just_this_once', 'הוא מחפש את הרגע שבו "לא" נהפך ל"כן".', 'הוא מחפש את הרגע שבו "לא" נהפך ל"כן".', 'child_learning', 'all', 'all', 19),
  ('just_this_once', 'הילד לומד שכללים זזים לפי מצב ההורה, לא לפי שלו.', 'הילד לומד שכללים זזים לפי מצב ההורה, לא לפי שלו.', 'child_learning', 'all', 'all', 20)
) as v(pattern_slug, title, body, content_type, age_group, arena, sort_order)
join public.patterns p on p.slug = v.pattern_slug;

-- ============================================================================
-- Seed: content_bank (SOS)
-- 12 sos_body + 20 sos_anchor + 20 sos_action = 52 rows.
-- sos_body is pattern-agnostic (pattern_id = NULL = applies to all patterns).
-- sos_anchor and sos_action are attached to a specific pattern.
-- emotional_state is required for all SOS rows: burning / stuck / empty.
-- Re-running this block is safe: clears and reinserts only the three sos_* types.
-- ============================================================================

delete from public.content_bank
where content_type in ('sos_body','sos_anchor','sos_action');

-- ----------------------------------------------------------------------------
-- sos_body — physical action per emotional_state. 4 per state × 3 states = 12.
-- ----------------------------------------------------------------------------
insert into public.content_bank
  (pattern_id, title, body, content_type, emotional_state, age_group, arena, sort_order, is_published)
values
  -- burning: step back / loosen hands / create distance
  (null, 'שתי פסיעות אחורה. הגוף מוריד הילוך.', 'שתי פסיעות אחורה. הגוף מוריד הילוך.', 'sos_body', 'burning', 'all', 'all', 1, true),
  (null, 'פותחת אגרוף. מרפה את הכתפיים.', 'פותחת אגרוף. מרפה את הכתפיים.', 'sos_body', 'burning', 'all', 'all', 2, true),
  (null, 'יוצאת מהחדר, סוגרת דלת.', 'יוצאת מהחדר, סוגרת דלת.', 'sos_body', 'burning', 'all', 'all', 3, true),
  (null, 'מרחיקה ידיים מהפנים שלו. נושמת.', 'מרחיקה ידיים מהפנים שלו. נושמת.', 'sos_body', 'burning', 'all', 'all', 4, true),
  -- stuck: feel feet / lean / stay in place
  (null, 'מרגישה את כפות הרגליים על הרצפה.', 'מרגישה את כפות הרגליים על הרצפה.', 'sos_body', 'stuck', 'all', 'all', 5, true),
  (null, 'נשענת על הקיר ומחכה שזה יעבור.', 'נשענת על הקיר ומחכה שזה יעבור.', 'sos_body', 'stuck', 'all', 'all', 6, true),
  (null, 'לוחצת ידיים על השולחן. נשארת.', 'לוחצת ידיים על השולחן. נשארת.', 'sos_body', 'stuck', 'all', 'all', 7, true),
  (null, 'יושבת איפה שאני. לא זזה.', 'יושבת איפה שאני. לא זזה.', 'sos_body', 'stuck', 'all', 'all', 8, true),
  -- empty: hand on heart / one moment for yourself
  (null, 'יד על הלב. שאיפה אחת רחבה.', 'יד על הלב. שאיפה אחת רחבה.', 'sos_body', 'empty', 'all', 'all', 9, true),
  (null, 'עוצמת עיניים לחמש שניות.', 'עוצמת עיניים לחמש שניות.', 'sos_body', 'empty', 'all', 'all', 10, true),
  (null, 'לוגמת מים. מחכה לבלוע.', 'לוגמת מים. מחכה לבלוע.', 'sos_body', 'empty', 'all', 'all', 11, true),
  (null, 'שמה יד על הבטן, מרגישה עלייה וירידה.', 'שמה יד על הבטן, מרגישה עלייה וירידה.', 'sos_body', 'empty', 'all', 'all', 12, true);

-- ----------------------------------------------------------------------------
-- sos_anchor — one thought the parent can hold, per pattern. 5 per pattern × 4 = 20.
-- Pattern meanings:
--   loop           = "one request is enough"
--   quiet_giveup   = "the demand stays"
--   zero_to_hundred= "stopping is the win"
--   just_this_once = "the boundary stays"
-- ----------------------------------------------------------------------------
insert into public.content_bank
  (pattern_id, title, body, content_type, emotional_state, age_group, arena, sort_order, is_published)
select p.id, v.title, v.body, 'sos_anchor', v.emotional_state, 'all', 'all', v.sort_order, true
from (values
  -- loop
  ('loop', 'בקשה אחת מספיקה. שתיים זה כבר יותר מדי.', 'בקשה אחת מספיקה. שתיים זה כבר יותר מדי.', 'burning', 1),
  ('loop', 'אמרתי פעם אחת. זה הסיכום.', 'אמרתי פעם אחת. זה הסיכום.', 'burning', 2),
  ('loop', 'הוא שמע. אני לא חייבת לחזור.', 'הוא שמע. אני לא חייבת לחזור.', 'stuck', 3),
  ('loop', 'המילים שלי לא נחלשות משקט.', 'המילים שלי לא נחלשות משקט.', 'stuck', 4),
  ('loop', 'משפט אחד, ואז הוא בתורו.', 'משפט אחד, ואז הוא בתורו.', 'empty', 5),
  -- quiet_giveup
  ('quiet_giveup', 'הדרישה לא זזה. גם אם אני זזה.', 'הדרישה לא זזה. גם אם אני זזה.', 'burning', 6),
  ('quiet_giveup', 'אני לא עושה את זה במקומו.', 'אני לא עושה את זה במקומו.', 'stuck', 7),
  ('quiet_giveup', 'המשימה שלו, נשארת שלו.', 'המשימה שלו, נשארת שלו.', 'stuck', 8),
  ('quiet_giveup', 'לא אמרתי "כן". שתיקה זה לא כן.', 'לא אמרתי "כן". שתיקה זה לא כן.', 'empty', 9),
  ('quiet_giveup', 'אני יכולה לחכות. הדרישה נשארת.', 'אני יכולה לחכות. הדרישה נשארת.', 'empty', 10),
  -- zero_to_hundred
  ('zero_to_hundred', 'לעצור זה כבר ניצחון.', 'לעצור זה כבר ניצחון.', 'burning', 11),
  ('zero_to_hundred', 'אני לא חייבת להמשיך לדבר.', 'אני לא חייבת להמשיך לדבר.', 'burning', 12),
  ('zero_to_hundred', 'הפסקה של דקה = החלטה טובה.', 'הפסקה של דקה = החלטה טובה.', 'stuck', 13),
  ('zero_to_hundred', 'אני מחזיקה את הטון. זה הכול.', 'אני מחזיקה את הטון. זה הכול.', 'stuck', 14),
  ('zero_to_hundred', 'שקט שלי — לא נסיגה.', 'שקט שלי — לא נסיגה.', 'empty', 15),
  -- just_this_once
  ('just_this_once', 'הגבול נשאר. גם הערב.', 'הגבול נשאר. גם הערב.', 'burning', 16),
  ('just_this_once', '"לא" שלי לא צריך הצדקה.', '"לא" שלי לא צריך הצדקה.', 'burning', 17),
  ('just_this_once', 'היום לא חריג.', 'היום לא חריג.', 'stuck', 18),
  ('just_this_once', 'הוא ישרוד את ה"לא" הזה.', 'הוא ישרוד את ה"לא" הזה.', 'empty', 19),
  ('just_this_once', 'אם אפתח סדק — הוא ירחיב.', 'אם אפתח סדק — הוא ירחיב.', 'empty', 20)
) as v(pattern_slug, title, body, emotional_state, sort_order)
join public.patterns p on p.slug = v.pattern_slug;

-- ----------------------------------------------------------------------------
-- sos_action — one clear next action at home, per pattern. 5 per pattern × 4 = 20.
-- Pattern meanings:
--   loop           = "say once, then stop"
--   quiet_giveup   = "stand near, do not do it instead"
--   zero_to_hundred= "step back, stop the talk"
--   just_this_once = "do not open an exception"
-- ----------------------------------------------------------------------------
insert into public.content_bank
  (pattern_id, title, body, content_type, emotional_state, age_group, arena, sort_order, is_published)
select p.id, v.title, v.body, 'sos_action', v.emotional_state, 'all', 'all', v.sort_order, true
from (values
  -- loop
  ('loop', 'אומרת את הבקשה פעם אחת. סוגרת פה.', 'אומרת את הבקשה פעם אחת. סוגרת פה.', 'burning', 1),
  ('loop', 'יוצאת מהחדר אחרי משפט ראשון.', 'יוצאת מהחדר אחרי משפט ראשון.', 'burning', 2),
  ('loop', 'עומדת לידו בשקט אחרי שאמרתי.', 'עומדת לידו בשקט אחרי שאמרתי.', 'stuck', 3),
  ('loop', 'שותקת שתי דקות אחרי הבקשה.', 'שותקת שתי דקות אחרי הבקשה.', 'stuck', 4),
  ('loop', 'מניחה את הדבר לידו. לא מוסיפה מילים.', 'מניחה את הדבר לידו. לא מוסיפה מילים.', 'empty', 5),
  -- quiet_giveup
  ('quiet_giveup', 'עומדת לידו, מחזיקה את המשימה אצלו.', 'עומדת לידו, מחזיקה את המשימה אצלו.', 'burning', 6),
  ('quiet_giveup', 'שמה את הדבר שלו בידיים שלו.', 'שמה את הדבר שלו בידיים שלו.', 'stuck', 7),
  ('quiet_giveup', 'ידיים מאחורי הגב עד שהוא יתחיל.', 'ידיים מאחורי הגב עד שהוא יתחיל.', 'stuck', 8),
  ('quiet_giveup', 'יושבת מולו בלי לגעת במטלה.', 'יושבת מולו בלי לגעת במטלה.', 'empty', 9),
  ('quiet_giveup', 'מחכה דקה לפני שאני מציעה עזרה.', 'מחכה דקה לפני שאני מציעה עזרה.', 'empty', 10),
  -- zero_to_hundred
  ('zero_to_hundred', 'יוצאת מהחדר עכשיו. חוזרת בעוד חמש דקות.', 'יוצאת מהחדר עכשיו. חוזרת בעוד חמש דקות.', 'burning', 11),
  ('zero_to_hundred', 'סוגרת פה, יושבת על כיסא.', 'סוגרת פה, יושבת על כיסא.', 'burning', 12),
  ('zero_to_hundred', 'אומרת "אני חוזרת בעוד רגע" ויוצאת.', 'אומרת "אני חוזרת בעוד רגע" ויוצאת.', 'stuck', 13),
  ('zero_to_hundred', 'מרחיקה יד מהטלפון שלו, לא מחזירה מילה.', 'מרחיקה יד מהטלפון שלו, לא מחזירה מילה.', 'stuck', 14),
  ('zero_to_hundred', 'פונה לכיוון השני, נושמת לפני שאני חוזרת.', 'פונה לכיוון השני, נושמת לפני שאני חוזרת.', 'empty', 15),
  -- just_this_once
  ('just_this_once', 'עונה "לא היום" ומחזירה מבט.', 'עונה "לא היום" ומחזירה מבט.', 'burning', 16),
  ('just_this_once', 'חוזרת על אותה תשובה במילים זהות.', 'חוזרת על אותה תשובה במילים זהות.', 'burning', 17),
  ('just_this_once', 'לא מסבירה. חוזרת לספה.', 'לא מסבירה. חוזרת לספה.', 'stuck', 18),
  ('just_this_once', 'אומרת "מחר" וממשיכה את הפעילות שלי.', 'אומרת "מחר" וממשיכה את הפעילות שלי.', 'empty', 19),
  ('just_this_once', 'סוגרת דלת של המטבח, לא של הלב.', 'סוגרת דלת של המטבח, לא של הלב.', 'empty', 20)
) as v(pattern_slug, title, body, emotional_state, sort_order)
join public.patterns p on p.slug = v.pattern_slug;
