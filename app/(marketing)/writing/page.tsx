import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import { listPublishedPublic } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing & Insights",
  description:
    "Researched writing on longevity and precision wellness from Dr. Danny Cai. The considered view, not medical advice.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing & Insights",
    description: "Researched writing on longevity and precision wellness from Dr. Danny Cai.",
    url: "/writing",
  },
};

// Always render fresh from Supabase (content changes when Danny publishes).
export const dynamic = "force-dynamic";

export default async function WritingPage() {
  const posts = await listPublishedPublic();
  const [featured, ...rest] = posts;

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="breadcrumb"><a href="/">Home</a> / Writing</div>
          <span className="ov">Writing &amp; insights</span>
          <h1>Evidence led notes, <em>never hype.</em></h1>
          <p className="lede">Researched writing on longevity and precision wellness, the considered view, not medical advice.</p>
        </div>
      </div>

      {featured && (
        <div className="pad-s wrap">
          <a className="feat-art" href={`/writing/${featured.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="imgph">{featured.cover_image ? <img src={featured.cover_image} alt="" /> : null}</div>
            <div className="ab">
              <span className="cat">Featured{featured.tags?.[0] ? ` · ${featured.tags[0]}` : ""}</span>
              <h2 className="big" style={{ fontSize: "clamp(24px, 6vw, 32px)", margin: "12px 0" }}>{featured.title}</h2>
              {featured.excerpt && <p className="lede" style={{ fontSize: "16px" }}>{featured.excerpt}</p>}
              <span className="mono" style={{ fontSize: "11px", color: "var(--muted)", display: "block", marginTop: "16px" }}>
                {featured.read_minutes ?? 1} min read · {featured.author}
              </span>
            </div>
          </a>
        </div>
      )}

      {rest.length > 0 && (
        <div className="pad-s wrap">
          <div className="g3">
            {rest.map((p) => (
              <a key={p.id} className="artcard" href={`/writing/${p.slug}`}>
                <div className="imgph">{p.cover_image ? <img src={p.cover_image} alt="" /> : null}</div>
                <span className="cat">{p.tags?.[0] ?? "Note"}</span>
                <h3>{p.title}</h3>
                {p.excerpt && <p>{p.excerpt}</p>}
                <span className="meta">{p.read_minutes ?? 1} min read</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="pad-s wrap">
          <p className="lede" style={{ color: "var(--ink-2)" }}>
            New writing is on the way. Join the dispatch below to get it first.
          </p>
        </div>
      )}

      <div className="band" style={{ background: "var(--plum)" }}><div className="pad-s wrap split">
        <div><div className="rule" style={{ background: "var(--bronze-l)" }}></div><span className="ov">The dispatch</span><h2 className="big" style={{ color: "#fff", marginTop: "12px" }}>Considered notes, on occasion.</h2><p className="lede" style={{ color: "var(--muted-l)", marginTop: "14px" }}>Evidence led writing from Dr. Danny. No noise.</p></div>
        <NewsletterForm source="Writing" />
      </div></div>
    </>
  );
}
