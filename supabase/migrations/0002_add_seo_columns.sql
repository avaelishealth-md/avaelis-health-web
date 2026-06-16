-- Fix: SEO columns missing on the posts table.
-- 0001_init_posts.sql uses `create table if not exists`, so on a posts table
-- that already existed (an earlier schema without these columns) the SEO fields
-- were never added. The admin editor's save sends seo_title/seo_description, so
-- the whole save fails against the missing columns. This backfills them.
-- Idempotent: safe to run more than once. Run in the avaelis-prod SQL editor.

alter table public.posts add column if not exists seo_title text;
alter table public.posts add column if not exists seo_description text;
