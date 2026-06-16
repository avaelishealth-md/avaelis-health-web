import Link from "next/link";

// Branded 404 (uses the root layout, so fonts + GA are already in place).
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "72vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 22px",
        background: "#F8F3E9",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#8A7C68",
            margin: 0,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "'Spectral', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 5vw, 40px)",
            margin: "14px 0 10px",
            color: "#2A211A",
          }}
        >
          This page isn&apos;t here.
        </h1>
        <p style={{ color: "#5A4E40", fontWeight: 300, lineHeight: 1.6, margin: "0 auto 28px" }}>
          The page may have moved or never existed. Let&apos;s get you back to solid ground.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#9A7536",
            color: "#fff",
            textDecoration: "none",
            padding: "13px 26px",
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
