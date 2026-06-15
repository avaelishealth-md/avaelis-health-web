-- AvaElis blog CMS — initial schema (posts + RLS + storage).
-- Run this in the avaelis-prod project: Supabase dashboard -> SQL Editor -> paste -> Run.
-- Idempotent: safe to run more than once.

create extension if not exists pgcrypto;

create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  body            text,                                   -- sanitised HTML from the TipTap editor
  cover_image     text,                                   -- public Storage URL
  audience        text not null default 'public'  check (audience in ('public','clinician')),
  status          text not null default 'draft'   check (status in ('draft','published')),
  tags            text[] not null default '{}',
  seo_title       text,
  seo_description text,
  read_minutes    int,
  author          text not null default 'Dr. Danny Cai',
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists posts_status_aud_idx on public.posts (status, audience, published_at desc);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

-- Row level security ------------------------------------------------------
alter table public.posts enable row level security;

-- Anyone (anon + logged in) can read PUBLISHED posts only.
-- Note: clinician posts are "unlisted" (published but filtered out of the index in app code),
-- so the public read policy is status-based, NOT audience-based.
drop policy if exists "read published" on public.posts;
create policy "read published" on public.posts
  for select to anon, authenticated using (status = 'published');

-- Logged-in admins (allow-list enforced in the app) get full CRUD.
drop policy if exists "auth read all" on public.posts;
create policy "auth read all" on public.posts for select to authenticated using (true);
drop policy if exists "auth insert" on public.posts;
create policy "auth insert" on public.posts for insert to authenticated with check (true);
drop policy if exists "auth update" on public.posts;
create policy "auth update" on public.posts for update to authenticated using (true) with check (true);
drop policy if exists "auth delete" on public.posts;
create policy "auth delete" on public.posts for delete to authenticated using (true);

-- Storage: public bucket for cover + inline images ------------------------
insert into storage.buckets (id, name, public)
  values ('post-images', 'post-images', true)
  on conflict (id) do nothing;

drop policy if exists "read post-images" on storage.objects;
create policy "read post-images" on storage.objects
  for select using (bucket_id = 'post-images');
drop policy if exists "auth upload post-images" on storage.objects;
create policy "auth upload post-images" on storage.objects
  for insert to authenticated with check (bucket_id = 'post-images');
drop policy if exists "auth modify post-images" on storage.objects;
create policy "auth modify post-images" on storage.objects
  for update to authenticated using (bucket_id = 'post-images');
drop policy if exists "auth delete post-images" on storage.objects;
create policy "auth delete post-images" on storage.objects
  for delete to authenticated using (bucket_id = 'post-images');
