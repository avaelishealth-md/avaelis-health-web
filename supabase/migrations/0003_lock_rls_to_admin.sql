-- Lock posts + post-images writes (and draft reads) to allow-listed admins only.
--
-- Background: 0001 granted FULL CRUD to ANY authenticated user (using(true)), so anyone
-- who could obtain a Supabase session (the anon key is public in the client bundle) could
-- read drafts and insert/update/delete posts directly via the REST API, bypassing the
-- app-layer allow-list. This scopes those policies to a server-only admins table.
--
-- !! IMPORTANT !! After running this, every admin email in your Vercel ADMIN_ALLOWLIST
-- MUST exist in public.admins, or saving in the studio will be denied by RLS. Edit the
-- seed insert below to match. The service-role ingest endpoint bypasses RLS, so the
-- content engine is unaffected. Idempotent: safe to run more than once.

create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);
-- RLS on, no policies => only the service role can read/write it (clients can't enumerate admins).
alter table public.admins enable row level security;

-- >>> EDIT THESE to match ADMIN_ALLOWLIST, then run. Add one row per admin email. <<<
insert into public.admins (email) values
  ('drdannycai@avaelishealth.com.au')
  on conflict (email) do nothing;

create or replace function public.is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- posts: replace the broad authenticated policies with admin-scoped ones.
-- (The public "read published" policy from 0001 stays, so anon/auth still read published rows.)
drop policy if exists "auth read all" on public.posts;
create policy "admin read all" on public.posts
  for select to authenticated using (public.is_admin());
drop policy if exists "auth insert" on public.posts;
create policy "admin insert" on public.posts
  for insert to authenticated with check (public.is_admin());
drop policy if exists "auth update" on public.posts;
create policy "admin update" on public.posts
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "auth delete" on public.posts;
create policy "admin delete" on public.posts
  for delete to authenticated using (public.is_admin());

-- storage: lock post-images writes to admins; keep the public read policy from 0001.
drop policy if exists "auth upload post-images" on storage.objects;
create policy "admin upload post-images" on storage.objects
  for insert to authenticated with check (bucket_id = 'post-images' and public.is_admin());
drop policy if exists "auth modify post-images" on storage.objects;
create policy "admin modify post-images" on storage.objects
  for update to authenticated using (bucket_id = 'post-images' and public.is_admin());
drop policy if exists "auth delete post-images" on storage.objects;
create policy "admin delete post-images" on storage.objects
  for delete to authenticated using (bucket_id = 'post-images' and public.is_admin());
