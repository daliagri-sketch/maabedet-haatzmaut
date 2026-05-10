-- ============================================================================
-- content_bank shape update
-- 1. Replace content_type allowed values with the four official kinds.
-- 2. Add age_group and arena with CHECK constraints.
-- ============================================================================

-- Replace content_type CHECK -------------------------------------------------
alter table public.content_bank
  drop constraint if exists content_bank_content_type_allowed;

alter table public.content_bank
  add constraint content_bank_content_type_allowed
  check (content_type in ('reminder','routine_task','small_action','child_learning'));

-- Add age_group --------------------------------------------------------------
alter table public.content_bank
  add column if not exists age_group text not null default 'all';

alter table public.content_bank
  drop constraint if exists content_bank_age_group_allowed;

alter table public.content_bank
  add constraint content_bank_age_group_allowed
  check (age_group in ('3-5','6-8','9-10','all'));

-- Add arena ------------------------------------------------------------------
alter table public.content_bank
  add column if not exists arena text not null default 'all';

alter table public.content_bank
  drop constraint if exists content_bank_arena_allowed;

alter table public.content_bank
  add constraint content_bank_arena_allowed
  check (arena in ('morning','screens','food','shower','homework','sleep','siblings','transitions','all'));

-- Helpful index for the common "fetch content for a pattern" query -----------
create index if not exists content_bank_lookup_idx
  on public.content_bank (pattern_id, content_type, age_group, arena)
  where is_published = true;
