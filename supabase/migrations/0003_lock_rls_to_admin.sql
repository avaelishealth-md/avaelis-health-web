-- Lock posts + post-images writes (and draft reads) to allow-listed admins only.
--
-- Background: the original policies granted FULL CRUD to ANY authenticated user, so
-- anyone who could obtain a Supabase session (the anon key is public in the client
-- bundle) could read drafts and insert/update/delete posts directly via the REST API,
-- bypassing the app-layer allow-list. This scopes writes + draft reads to an admins table.
--
-- The DO blocks drop the EXISTING policies by introspection (the deployed table predates
-- the repo migrations, so policy names may differ), then recreate the correct set.
--
-- !! BEFORE RUNNING: put the email(s) you log into the studio with into the insert below,
-- or RLS will deny saving. Find them with:  select email from auth.users;
-- The service-role ingest endpoint bypasses RLS, so the content engine is unaffected.
-- Idempotent: safe to run more than once.

-- 1) Admins table (server-only) + membership helper.
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;  -- no policies => clients can't read it

-- >>> EDIT THIS: one row per admin email (lowercase, must match your studio login) <<<
insert into public.admins (email) values
  ('your-admin-email@example.com')
  on conflict (email) do nothing;

create or replace function public.is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- 2) posts: drop all existing policies, recreate (public reads published; admins do everything).
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'posts' loop
    execute format('drop policy %I on public.posts', p.policyname);
  end loop;
end $$;

create policy "public read published" on public.posts
  for select to anon, authenticated using (status = 'published');
create policy "admin read all" on public.posts
  for select to authenticated using (public.is_admin());
create policy "admin insert" on public.posts
  for insert to authenticated with check (public.is_admin());
create policy "admin update" on public.posts
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete" on public.posts
  for delete to authenticated using (public.is_admin());

-- 3) storage post-images: drop only THIS bucket's policies (by definition), recreate.
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and (coalesce(qual, '') like '%post-images%' or coalesce(with_check, '') like '%post-images%')
  loop
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;

create policy "post-images public read" on storage.objects
  for select using (bucket_id = 'post-images');
create policy "post-images admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'post-images' and public.is_admin());
create policy "post-images admin update" on storage.objects
  for update to authenticated using (bucket_id = 'post-images' and public.is_admin());
create policy "post-images admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'post-images' and public.is_admin());
