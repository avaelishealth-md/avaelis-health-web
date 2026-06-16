import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { getPostBySlug } from "@/lib/posts";
import { sanitizeHtml } from "@/lib/sanitize";
import CpdNotice from "@/components/CpdNotice";

// Always render fresh (drafts via ?preview, content changes on publish).
export const dynamic = "force-dynamic";

const fetchPost = cache((slug: string, preview: boolean) => getPostBySlug(slug, preview));

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  params: { slug: string };
  searchParams: { preview?: string };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const post = await fetchPost(params.slug, searchParams.preview === "1");
  if (!post) return { title: "Writing · AvaElis Health" };
  return {
    title: `${post.seo_title || post.title} · AvaElis Health`,
    description: post.seo_description || post.excerpt || undefined,
  };
}

export default async function PostPage({ params, searchParams }: Props) {
  const preview = searchParams.preview === "1";
  const post = await fetchPost(params.slug, preview);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || post.excerpt || undefined,
    author: { "@type": "Person", name: post.author },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    image: post.cover_image || undefined,
  };

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Home</a> / <a href="/writing">Writing</a> / {post.title}
          </div>
          {post.tags?.[0] && <span className="ov">{post.tags[0]}</span>}
          <h1>{post.title}</h1>
          <p className="mono" style={{ marginTop: "12px", color: "var(--muted)", fontSize: "12px" }}>
            {post.read_minutes ?? 1} min read · {post.author}
            {post.published_at ? ` · ${fmtDate(post.published_at)}` : ""}
            {preview && post.status !== "published" ? " · DRAFT PREVIEW" : ""}
          </p>
        </div>
      </div>

      {post.cover_image && (
        <div className="pad-s wrap">
          <div className="imgph" style={{ aspectRatio: "16/9", borderRadius: "18px", overflow: "hidden" }}>
            <img src={post.cover_image} alt={post.title} />
          </div>
        </div>
      )}

      <div className="pad-s wrap">
        <article className="article">
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body || "") }} />
        </article>
      </div>

      {post.tags?.some((t) => t.toLowerCase() === "cpd") && (
        <div className="pad-s wrap">
          <CpdNotice />
        </div>
      )}

      <div className="pad-s wrap">
        <div className="disclaimer">
          General education, not individual medical advice. No prescription medicines are
          advertised; personalised treatment follows clinical consultation.
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
