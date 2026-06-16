-- Carry the content engine's verified references onto posts. Rendered as a styled
-- reference list on the blog + the clinician summary. jsonb array of objects:
--   { title, authors?, journal?, year?, url, pmid?, pubTypes?[], citedBy? }
-- Named `refs` (not `references`, which is a reserved SQL keyword). Idempotent.

alter table public.posts add column if not exists refs jsonb;
