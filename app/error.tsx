"use client";

// Root error boundary — catches render/data errors (e.g. a Supabase outage on /writing)
// instead of showing the bare Next.js error screen.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
          Something went wrong
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
          A small hiccup on our end.
        </h1>
        <p style={{ color: "#5A4E40", fontWeight: 300, lineHeight: 1.6, margin: "0 auto 28px" }}>
          Please try again. If it keeps happening, come back in a little while.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#9A7536",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "13px 26px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              background: "#fff",
              color: "#9A7536",
              border: "1px solid #9A7536",
              textDecoration: "none",
              padding: "13px 26px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
