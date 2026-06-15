"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAllowed } from "@/lib/auth/allowlist";
import { sanitizeHtml } from "@/lib/sanitize";
import { slugify, readMinutes } from "@/lib/slug";

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAllowed(user?.email)) throw new Error("Not authorised");
  return supabase;
}

export type SaveInput = {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  body?: string;
  cover_image?: string;
  audience: "public" | "clinician";
  tags?: string;
  seo_title?: string;
  seo_description?: string;
  publish?: boolean;
};

export async function savePost(input: SaveInput): Promise<{ id: string; slug: string }> {
  const supabase = await requireAdmin();

  const title = (input.title || "").trim();
  if (!title) throw new Error("Title is required");

  const body = sanitizeHtml(input.body || "");
  const baseSlug = slugify(input.slug || title) || "post";
  const tags = (input.tags || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Ensure a unique slug (ignoring this post's own row).
  let slug = baseSlug;
  for (let i = 2; i < 60; i++) {
    const { data: clash } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!clash || clash.id === input.id) break;
    slug = `${baseSlug}-${i}`;
  }

  const fields: Record<string, unknown> = {
    title,
    slug,
    excerpt: (input.excerpt || "").trim() || null,
    body,
    cover_image: (input.cover_image || "").trim() || null,
    audience: input.audience === "clinician" ? "clinician" : "public",
    tags,
    seo_title: (input.seo_title || "").trim() || null,
    seo_description: (input.seo_description || "").trim() || null,
    read_minutes: readMinutes(body),
  };
  if (input.publish) fields.status = "published";

  let postId = input.id;

  if (input.id) {
    if (input.publish) {
      const { data: existing } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", input.id)
        .maybeSingle();
      if (existing && !existing.published_at) fields.published_at = new Date().toISOString();
    }
    const { error } = await supabase.from("posts").update(fields).eq("id", input.id);
    if (error) throw new Error(error.message);
  } else {
    if (input.publish) fields.published_at = new Date().toISOString();
    const { data, error } = await supabase.from("posts").insert(fields).select("id").single();
    if (error) throw new Error(error.message);
    postId = data.id as string;
  }

  revalidatePath("/writing");
  revalidatePath(`/writing/${slug}`);
  return { id: postId as string, slug };
}

export async function setPublished(id: string, publish: boolean): Promise<void> {
  const supabase = await requireAdmin();
  const fields: Record<string, unknown> = { status: publish ? "published" : "draft" };
  if (publish) {
    const { data: existing } = await supabase
      .from("posts")
      .select("published_at, slug")
      .eq("id", id)
      .maybeSingle();
    if (existing && !existing.published_at) fields.published_at = new Date().toISOString();
  }
  const { error } = await supabase.from("posts").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/writing");
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/writing");
}
