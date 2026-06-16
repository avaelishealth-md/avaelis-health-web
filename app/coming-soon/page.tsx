import type { Metadata } from "next";

export const metadata: Metadata = {
  // absolute so the layout's "%s · AvaElis Health" template doesn't double the brand.
  title: { absolute: "AvaElis Health · Launching soon" },
  robots: { index: false, follow: false },
};

export default function ComingSoon() {
  return (
    <>
      <style>{`html,body{margin:0;padding:0;background:#F2EBDD}`}</style>
      <main
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "#F2EBDD",
          color: "#2A211A",
          padding: "48px 24px",
          fontFamily: "'Albert Sans', system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <span
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#9A7536",
              color: "#F2EBDD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: 22,
            }}
          >
            Æ
          </span>
          <span
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: 29,
              letterSpacing: ".01em",
            }}
          >
            AvaElis Health
          </span>
        </div>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "#9A7536",
            margin: "0 0 30px",
          }}
        >
          Longevity Clinic
        </p>

        <h1
          style={{
            fontFamily: "'Spectral', Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(34px, 6.5vw, 54px)",
            lineHeight: 1.12,
            margin: "0 0 20px",
          }}
        >
          Launching soon.
        </h1>

        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            color: "#5A4E40",
            maxWidth: "32em",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Boutique longevity medicine with Dr.&nbsp;Danny Cai. More years thriving,
          less years declining.
        </p>

        <p style={{ marginTop: 36, fontSize: 13, color: "#8A7C68" }}>
          Enquiries ·{" "}
          <a
            href="https://au.linkedin.com/in/dr-danny-cai-4a7ab093"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9A7536", textDecoration: "none", borderBottom: "1px solid #9A7536", paddingBottom: 1 }}
          >
            connect on LinkedIn
          </a>
        </p>
      </main>
    </>
  );
}
