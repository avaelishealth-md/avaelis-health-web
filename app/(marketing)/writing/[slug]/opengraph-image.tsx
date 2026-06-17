import { ImageResponse } from "next/og";
import { createAdminClient } from "@/lib/supabase/admin";

// Auto-generated social share card (Open Graph) per blog post.
// Hybrid: if the post has a cover image, use it as a darkened backdrop with the
// title over it; otherwise a clean branded paper card. Font + cover are fetched
// with fallbacks so a failure degrades gracefully and never breaks the preview.
export const runtime = "nodejs";
export const alt = "AvaElis Health";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontUrl = (w: number) =>
  `https://cdn.jsdelivr.net/npm/@fontsource/spectral@5.0.0/files/spectral-latin-${w}-normal.woff`;

async function loadFont(w: number): Promise<ArrayBuffer | null> {
  try {
    const r = await fetch(fontUrl(w), { cache: "force-cache" });
    return r.ok ? await r.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function loadCover(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  try {
    const r = await fetch(url, { cache: "force-cache" });
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 2_500_000) return null; // skip very large covers
    const ct = r.headers.get("content-type") || "image/jpeg";
    return `data:${ct};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

async function getPost(slug: string) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("posts")
      .select("title, cover_image, tags, read_minutes")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return data as {
      title: string;
      cover_image: string | null;
      tags: string[] | null;
      read_minutes: number | null;
    } | null;
  } catch {
    return null;
  }
}

function Coin({ fg, bg }: { fg: string; bg: string }) {
  return (
    <div
      style={{
        display: "flex",
        width: 64,
        height: 64,
        borderRadius: 64,
        background: bg,
        color: fg,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      Æ
    </div>
  );
}

export default async function Image({ params }: { params: { slug: string } }) {
  const [post, f500, f600] = await Promise.all([
    getPost(params.slug),
    loadFont(500),
    loadFont(600),
  ]);
  const cover = await loadCover(post?.cover_image);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[] = [];
  if (f500) fonts.push({ name: "Spectral", data: f500, weight: 500, style: "normal" });
  if (f600) fonts.push({ name: "Spectral", data: f600, weight: 600, style: "normal" });
  const fontFamily = fonts.length ? "Spectral" : "serif";

  const title = post?.title || "AvaElis Health";
  const eyebrow = post?.tags?.[0] || "Evidence-led notes";
  const meta = post?.read_minutes ? `Dr. Danny Cai · ${post.read_minutes} min read` : "Dr. Danny Cai";
  const titleSize = title.length > 78 ? 46 : title.length > 52 ? 54 : 62;

  const card = cover ? (
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", fontFamily }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover}
        width={1200}
        height={630}
        style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          backgroundImage:
            "linear-gradient(to top, rgba(24,18,12,0.94) 0%, rgba(24,18,12,0.55) 50%, rgba(24,18,12,0.22) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 68,
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Coin fg="#F2EBDD" bg="#9A7536" />
          <div style={{ display: "flex", marginLeft: 18, fontSize: 22, letterSpacing: 3, color: "#EFE4CF", textTransform: "uppercase" }}>
            AvaElis Health
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#E0B486", textTransform: "uppercase", marginBottom: 18 }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 600, lineHeight: 1.12 }}>{title}</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 24, color: "#D8C9B2" }}>{meta}</div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#F2EBDD",
        padding: 68,
        justifyContent: "space-between",
        fontFamily,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Coin fg="#F2EBDD" bg="#9A7536" />
        <div style={{ display: "flex", marginLeft: 18, fontSize: 22, letterSpacing: 3, color: "#8A7C68", textTransform: "uppercase" }}>
          AvaElis Health
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#A9603F", textTransform: "uppercase", marginBottom: 18 }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: titleSize, fontWeight: 600, lineHeight: 1.12, color: "#2A211A" }}>{title}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #DBCFB7", paddingTop: 24 }}>
        <div style={{ display: "flex", fontSize: 22, color: "#5A4E40" }}>{meta}</div>
        <div style={{ display: "flex", fontSize: 22, color: "#9A7536" }}>avaelishealth.com.au</div>
      </div>
    </div>
  );

  try {
    return new ImageResponse(card, { ...size, fonts: fonts.length ? fonts : undefined });
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#F2EBDD",
            alignItems: "center",
            justifyContent: "center",
            color: "#2A211A",
            fontSize: 56,
          }}
        >
          AvaElis Health
        </div>
      ),
      size,
    );
  }
}
