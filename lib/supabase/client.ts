import { createBrowserClient } from "@supabase/ssr";

// Browser (client component) Supabase client — used by the admin login form and the
// editor's image upload. Only the public URL + anon key are exposed here (by design).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
