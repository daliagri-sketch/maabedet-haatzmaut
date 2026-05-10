-- ============================================================================
-- admin_morning_messages
-- Stand-alone module for the Morning Messages admin panel.
-- Independent table: no FKs to, and no ALTERs of, any existing table.
-- ============================================================================

create table public.admin_morning_messages (
  id          uuid primary key default gen_random_uuid(),
  text        text not null,
  category    text not null default 'general',
  age_tag     text not null default 'all',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  constraint admin_morning_messages_text_not_empty
    check (length(btrim(text)) > 0),
  constraint admin_morning_messages_age_tag_allowed
    check (age_tag in ('3-5','6-8','9-10','all'))
);

create index admin_morning_messages_active_idx
  on public.admin_morning_messages (is_active, created_at desc);

create index admin_morning_messages_category_idx
  on public.admin_morning_messages (category);

alter table public.admin_morning_messages enable row level security;

-- ---------------------------------------------------------------------------
-- Seed: 10 sample Hebrew morning messages.
-- ---------------------------------------------------------------------------
insert into public.admin_morning_messages (text, category, age_tag) values
  ('בוקר טוב, אהובי. נתחיל לאט.',                               'connection', 'all'),
  ('היום אני כאן בשבילך, גם כשקשה.',                            'connection', 'all'),
  ('נשימה אחת לפני שהיום מתחיל.',                               'calm',       'all'),
  ('בוקר. עוד יום שאת/ה איתי.',                                 'connection', 'all'),
  ('את/ה לא לבד. אני כאן.',                                     'connection', '3-5'),
  ('אני אוהבת אותך גם לפני שאמרתי בוקר טוב.',                    'connection', '3-5'),
  ('היום נלמד משהו חדש ביחד.',                                  'energizing', '6-8'),
  ('הבוקר שלך, הקצב שלך.',                                      'autonomy',   '9-10'),
  ('צריך משהו לפני שמתחילים?',                                   'connection', '6-8'),
  ('נתחיל מהקטן ביותר. רק להתלבש.',                              'transition', 'all');
