-- ============================================================================
-- Initial schema for "מעבדת העצמאות" (Independence Lab)
-- Parent-centric app for diagnosing parenting patterns and tracking progress.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helpers: updated_at trigger function
-- ---------------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- parents
-- One row per authenticated user. PK = auth.users.id so it drops with the user.
-- partner_id links two parents (app is responsible for keeping the link symmetric).
-- ---------------------------------------------------------------------------
create table public.parents (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  partner_id  uuid references public.parents(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint parents_partner_not_self check (partner_id is null or partner_id <> id)
);

create index parents_partner_id_idx on public.parents (partner_id);

create trigger parents_set_updated_at
  before update on public.parents
  for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- children
-- A parent can have many children.
-- ---------------------------------------------------------------------------
create table public.children (
  id          uuid primary key default gen_random_uuid(),
  parent_id   uuid not null references public.parents(id) on delete cascade,
  name        text not null,
  birthdate   date,
  gender      text,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint children_gender_allowed
    check (gender is null or gender in ('male','female','other','prefer_not_to_say'))
);

create index children_parent_id_idx on public.children (parent_id);

create trigger children_set_updated_at
  before update on public.children
  for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- patterns
-- Fixed catalog of parenting patterns. Seeded in seed.sql.
-- slug is the stable machine identifier; name is the Hebrew display label.
-- ---------------------------------------------------------------------------
create table public.patterns (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  name               text not null,
  short_description  text,
  long_description   text,
  color              text,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  constraint patterns_slug_format check (slug ~ '^[a-z][a-z0-9_]*$')
);

create index patterns_sort_order_idx on public.patterns (sort_order);

-- ---------------------------------------------------------------------------
-- questionnaire_questions
-- Each question is attributed to a single pattern it helps diagnose.
-- options is used by 'single_choice' / 'multi_choice' types.
-- ---------------------------------------------------------------------------
create table public.questionnaire_questions (
  id             uuid primary key default gen_random_uuid(),
  pattern_id     uuid not null references public.patterns(id) on delete cascade,
  question_text  text not null,
  question_type  text not null default 'scale',
  options        jsonb,
  weight         numeric not null default 1,
  sort_order     integer not null default 0,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  constraint questionnaire_questions_type_allowed
    check (question_type in ('scale','yes_no','single_choice','multi_choice')),
  constraint questionnaire_questions_weight_positive
    check (weight > 0)
);

create index questionnaire_questions_pattern_idx
  on public.questionnaire_questions (pattern_id, sort_order);

-- ---------------------------------------------------------------------------
-- user_pattern_results
-- One row per completed questionnaire run for a parent (and optionally a child).
-- scores is the raw per-pattern score map, e.g. {"loop": 12, "quiet_giveup": 5}.
-- ---------------------------------------------------------------------------
create table public.user_pattern_results (
  id                  uuid primary key default gen_random_uuid(),
  parent_id           uuid not null references public.parents(id) on delete cascade,
  child_id            uuid references public.children(id) on delete cascade,
  primary_pattern_id  uuid not null references public.patterns(id),
  scores              jsonb not null default '{}'::jsonb,
  completed_at        timestamptz not null default now(),
  created_at          timestamptz not null default now()
);

create index user_pattern_results_parent_idx
  on public.user_pattern_results (parent_id, completed_at desc);
create index user_pattern_results_child_idx
  on public.user_pattern_results (child_id);

-- ---------------------------------------------------------------------------
-- content_bank
-- Educational content (articles, exercises, prompts, etc.).
-- Linked to a pattern so we can surface the right content after diagnosis.
-- ---------------------------------------------------------------------------
create table public.content_bank (
  id                uuid primary key default gen_random_uuid(),
  pattern_id        uuid references public.patterns(id) on delete set null,
  title             text not null,
  body              text not null,
  content_type      text not null,
  media_url         text,
  duration_minutes  integer,
  sort_order        integer not null default 0,
  is_published      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint content_bank_content_type_allowed
    check (content_type in ('article','exercise','reflection_prompt','video','audio')),
  constraint content_bank_duration_non_negative
    check (duration_minutes is null or duration_minutes >= 0)
);

create index content_bank_pattern_idx
  on public.content_bank (pattern_id, sort_order)
  where is_published = true;

create trigger content_bank_set_updated_at
  before update on public.content_bank
  for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- progress_events
-- Append-only event log for analytics / progress tracking.
-- payload is free-form JSON for event-specific data.
-- ---------------------------------------------------------------------------
create table public.progress_events (
  id          uuid primary key default gen_random_uuid(),
  parent_id   uuid not null references public.parents(id) on delete cascade,
  child_id    uuid references public.children(id) on delete cascade,
  event_type  text not null,
  payload     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  constraint progress_events_type_allowed
    check (event_type in (
      'completed_questionnaire',
      'viewed_content',
      'completed_exercise',
      'wrote_reflection',
      'partner_invited',
      'shared_with_partner'
    ))
);

create index progress_events_parent_idx
  on public.progress_events (parent_id, created_at desc);
create index progress_events_type_idx
  on public.progress_events (event_type);

-- ---------------------------------------------------------------------------
-- partner_reflections
-- Reflections written by a parent, optionally triggered by a reflection_prompt
-- from content_bank, optionally shared with their partner.
-- ---------------------------------------------------------------------------
create table public.partner_reflections (
  id                      uuid primary key default gen_random_uuid(),
  parent_id               uuid not null references public.parents(id) on delete cascade,
  child_id                uuid references public.children(id) on delete cascade,
  prompt_id               uuid references public.content_bank(id) on delete set null,
  content                 text not null,
  is_shared_with_partner  boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  constraint partner_reflections_content_not_empty check (length(btrim(content)) > 0)
);

create index partner_reflections_parent_idx
  on public.partner_reflections (parent_id, created_at desc);
create index partner_reflections_child_idx
  on public.partner_reflections (child_id);

create trigger partner_reflections_set_updated_at
  before update on public.partner_reflections
  for each row execute function public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Enabled on every table. No policies yet — access will be blocked until
-- policies are written in a later migration.
-- ---------------------------------------------------------------------------
alter table public.parents                 enable row level security;
alter table public.children                enable row level security;
alter table public.patterns                enable row level security;
alter table public.questionnaire_questions enable row level security;
alter table public.user_pattern_results    enable row level security;
alter table public.content_bank            enable row level security;
alter table public.progress_events         enable row level security;
alter table public.partner_reflections     enable row level security;
