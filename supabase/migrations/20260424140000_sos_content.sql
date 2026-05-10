-- ============================================================================
-- content_bank: add SOS content support
-- 1. Expand content_type allowed values to include sos_* types.
-- 2. Add emotional_state column (burning / stuck / empty) with CHECK.
-- 3. Add index to help SOS lookups at runtime.
-- ============================================================================

alter table public.content_bank
  drop constraint if exists content_bank_content_type_allowed;

alter table public.content_bank
  add constraint content_bank_content_type_allowed
  check (content_type in (
    'reminder','routine_task','small_action','child_learning',
    'sos_body','sos_anchor','sos_action'
  ));

alter table public.content_bank
  add column if not exists emotional_state text;

alter table public.content_bank
  drop constraint if exists content_bank_emotional_state_allowed;

alter table public.content_bank
  add constraint content_bank_emotional_state_allowed
  check (emotional_state is null or emotional_state in ('burning','stuck','empty'));

create index if not exists content_bank_sos_lookup_idx
  on public.content_bank (content_type, emotional_state, pattern_id)
  where is_published = true and content_type like 'sos_%';
