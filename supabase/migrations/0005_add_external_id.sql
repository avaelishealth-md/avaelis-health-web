-- Stable per-article id from the content engine, so re-sending an article updates the
-- SAME post even if its title/slug later changes (sturdier than matching on slug alone).
--
-- The ingest route only reads/writes external_id when the engine actually sends one, so
-- it keeps working via slug-matching until this is applied. Run it before the engine
-- starts sending external_id. Idempotent: safe to run more than once.

alter table public.posts add column if not exists external_id text;

-- Unique per non-null value (existing posts keep external_id NULL and aren't affected).
create unique index if not exists posts_external_id_key
  on public.posts (external_id)
  where external_id is not null;
