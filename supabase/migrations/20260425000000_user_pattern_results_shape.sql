-- ============================================================================
-- user_pattern_results: align shape with the save-questionnaire-result contract.
-- The table is empty at this point, so column drops and NOT NULL adds are safe.
--
-- Columns after this migration:
--   id                  uuid  pk
--   parent_id           uuid  FK parents
--   child_id            uuid  FK children (nullable per initial schema)
--   primary_pattern     text  one of the 4 pattern slugs
--   secondary_pattern   text  one of the 4 pattern slugs
--   scores_json         jsonb map of pattern → count
--   result_type         text  'dominant' | 'two_patterns'
--   created_at          timestamptz
-- ============================================================================

alter table public.user_pattern_results drop column if exists primary_pattern_id;
alter table public.user_pattern_results drop column if exists scores;
alter table public.user_pattern_results drop column if exists completed_at;

alter table public.user_pattern_results
  add column if not exists primary_pattern text;
alter table public.user_pattern_results
  add column if not exists secondary_pattern text;
alter table public.user_pattern_results
  add column if not exists scores_json jsonb not null default '{}'::jsonb;
alter table public.user_pattern_results
  add column if not exists result_type text;

alter table public.user_pattern_results alter column primary_pattern set not null;
alter table public.user_pattern_results alter column secondary_pattern set not null;
alter table public.user_pattern_results alter column result_type set not null;

alter table public.user_pattern_results
  drop constraint if exists user_pattern_results_primary_allowed;
alter table public.user_pattern_results
  add constraint user_pattern_results_primary_allowed
  check (primary_pattern in ('loop','quiet_giveup','zero_to_hundred','just_this_once'));

alter table public.user_pattern_results
  drop constraint if exists user_pattern_results_secondary_allowed;
alter table public.user_pattern_results
  add constraint user_pattern_results_secondary_allowed
  check (secondary_pattern in ('loop','quiet_giveup','zero_to_hundred','just_this_once'));

alter table public.user_pattern_results
  drop constraint if exists user_pattern_results_type_allowed;
alter table public.user_pattern_results
  add constraint user_pattern_results_type_allowed
  check (result_type in ('dominant','two_patterns'));
