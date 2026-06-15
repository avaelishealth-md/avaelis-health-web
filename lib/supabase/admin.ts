import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS. SERVER-ONLY: never import this into a client component.
// Reserved for seeding/maintenance and reading unlisted clinician posts for the email flow.
// Normal admin CRUD uses the session-scoped server client (lib/supabase/server.ts) under RLS.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
