import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Post } from "@/lib/types";

function configured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Published, public posts for the /writing index (newest first).
export async function listPublishedPublic(): Promise<Post[]> {
  if (!configured()) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .eq("audience", "public")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("listPublishedPublic:", error.message);
    return [];
  }
  return (data as Post[]) ?? [];
}

// A single post by slug. Published only, unless `preview` AND the caller is an authed admin
// (RLS still blocks drafts for anon, so a logged-out ?preview=1 returns null).
export async function getPostBySlug(slug: string, preview = false): Promise<Post | null> {
  if (!configured()) return null;
  const supabase = createClient();
  let query = supabase.from("posts").select("*").eq("slug", slug);
  if (!preview) query = query.eq("status", "published");
  const { data, error } = await query.maybeSingle();
  if (error) {
    console.error("getPostBySlug:", error.message);
    return null;
  }
  return (data as Post) ?? null;
}

// The clinician talk-summary post, read via the SERVICE ROLE so it can be an unlisted
// DRAFT — it is delivered only after email capture on /talk-summary, never listed publicly.
// Keep the post as a draft so /writing/<slug> stays a 404 and the gate is the only way in.
// Slug configurable via TALK_SUMMARY_SLUG. SERVER-ONLY (lib/posts is never client-imported).
export async function getTalkSummaryPost(): Promise<Post | null> {
  if (!configured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const slug = process.env.TALK_SUMMARY_SLUG || "clinical-applications";
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error("getTalkSummaryPost:", error.message);
    return null;
  }
  return (data as Post) ?? null;
}

// Slugs of published public posts (for the sitemap).
export async function listPublishedSlugs(): Promise<string[]> {
  if (!configured()) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published")
    .eq("audience", "public");
  if (error) return [];
  return (data ?? []).map((r: { slug: string }) => r.slug);
}
