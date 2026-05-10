-- ============================================================================
-- questionnaire_questions: adapt schema for Blindspot v3.0 model.
-- Each question has 4 fixed-position answers (A/B/C/D) mapped to patterns:
--   A → loop, B → quiet_giveup, C → zero_to_hundred, D → just_this_once.
-- The pattern mapping is positional (not a FK), so pattern_id is no longer
-- required.
-- ============================================================================

alter table public.questionnaire_questions
  alter column pattern_id drop not null;

-- age_group --------------------------------------------------------------
alter table public.questionnaire_questions
  add column if not exists age_group text;

alter table public.questionnaire_questions
  drop constraint if exists questionnaire_questions_age_group_allowed;

alter table public.questionnaire_questions
  add constraint questionnaire_questions_age_group_allowed
  check (age_group is null or age_group in ('3-5','6-8','9-10'));

-- arena ------------------------------------------------------------------
alter table public.questionnaire_questions
  add column if not exists arena text;

alter table public.questionnaire_questions
  drop constraint if exists questionnaire_questions_arena_allowed;

alter table public.questionnaire_questions
  add constraint questionnaire_questions_arena_allowed
  check (arena is null or arena in (
    'morning','screens','food','shower','homework',
    'sleep','siblings','transitions','chores'
  ));

-- Four answer columns ----------------------------------------------------
alter table public.questionnaire_questions
  add column if not exists answer_a text;
alter table public.questionnaire_questions
  add column if not exists answer_b text;
alter table public.questionnaire_questions
  add column if not exists answer_c text;
alter table public.questionnaire_questions
  add column if not exists answer_d text;

-- Either all four answers are present, or none (for in-progress drafts).
alter table public.questionnaire_questions
  drop constraint if exists questionnaire_questions_answers_complete;

alter table public.questionnaire_questions
  add constraint questionnaire_questions_answers_complete
  check (
    (answer_a is null and answer_b is null and answer_c is null and answer_d is null)
    or (
      answer_a is not null and answer_b is not null
      and answer_c is not null and answer_d is not null
    )
  );

-- Index for fetching questions by age group in display order.
create index if not exists questionnaire_questions_age_group_idx
  on public.questionnaire_questions (age_group, sort_order)
  where is_active = true;
