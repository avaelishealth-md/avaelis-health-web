import { NextResponse } from "next/server";
import crypto from "crypto";
import { marked } from "marked";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeHtml } from "@/lib/sanitize";
import { slugify, readMinutes } from "@/lib/slug";

export const runtime = "nodejs";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://avaelishealth.com.au";

// Normalise the engine's verified references into the clean shape we store + render.
// Drops anything without a title and an http(s) url; caps the list and field lengths.
function cleanRefs(input: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(input)) return null;
  const out: Record<string, unknown>[] = [];
  for (const r of input.slice(0, 60)) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const title = String(o.title || "").trim();
    const url = String(o.url || "").trim();
    if (!title || !/^https?:\/\//i.test(url)) continue;
    const ref: Record<string, unknown> = { title: title.slice(0, 400), url: url.slice(0, 600) };
    if (o.authors) ref.authors = String(o.authors).slice(0, 400);
    if (o.journal) ref.journal = String(o.journal).slice(0, 200);
    if (o.year) ref.year = String(o.year).slice(0, 8);
    if (o.pmid) ref.pmid = String(o.pmid).slice(0, 20);
    if (Array.isArray(o.pubTypes))
      ref.pubTypes = (o.pubTypes as unknown[]).map(String).map((s) => s.slice(0, 60)).slice(0, 6);
    if (typeof o.citedBy === "number" && Number.isFinite(o.citedBy)) ref.citedBy = o.citedBy;
    out.push(ref);
  }
  return out.length ? out : null;
}

// Ingest a generated blog from the content engine as a DRAFT post.
// Auth: shared secret in the `x-ingest-secret` header (must match INGEST_SECRET).
// Body: { title, slug?, excerpt?, body_markdown? | body_html?, tags?, audience?,
//         seo_title?, seo_description?, references?: [{title,url,authors,journal,year,pmid,pubTypes,citedBy}] }
export async function POST(req: Request) {
  const secret = process.env.INGEST_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Ingest is not configured." }, { status: 503 });
  }
  const provided = Buffer.from(req.headers.get("x-ingest-secret") || "");
  const expected = Buffer.from(secret);
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const title = String(data.title || "").trim();
  if (!title) return NextResponse.json({ error: "title is required" }, { status: 400 });

  const rawHtml = data.body_html
    ? String(data.body_html)
    : data.body_markdown
      ? String(await marked.parse(String(data.body_markdown)))
      : "";
  const body = sanitizeHtml(rawHtml);

  const excerpt = String(data.excerpt || "").trim() || null;
  const tags = Array.isArray(data.tags)
    ? (data.tags as unknown[]).map(String).map((s) => s.trim()).filter(Boolean)
    : [];
  const audience = data.audience === "clinician" ? "clinician" : "public";
  const seoTitle = String(data.seo_title || "").trim() || null;
  const seoDescription = String(data.seo_description || "").trim() || null;
  const refs = cleanRefs(data.references);

  const supabase = createAdminClient();

  // Unique slug.
  const base = slugify(String(data.slug || title)) || "post";
  let slug = base;
  for (let i = 2; i < 60; i++) {
    const { data: clash } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();
    if (!clash) break;
    slug = `${base}-${i}`;
  }

  const { data: row, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug,
      excerpt,
      body,
      audience,
      status: "draft",
      tags,
      seo_title: seoTitle,
      seo_description: seoDescription,
      refs,
      read_minutes: readMinutes(body),
      author: "Dr. Danny Cai",
    })
    .select("id, slug")
    .single();

  if (error) {
    console.error("ingest insert error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    id: row.id,
    slug: row.slug,
    url: `${SITE}/writing/${row.slug}?preview=1`,
  });
}
