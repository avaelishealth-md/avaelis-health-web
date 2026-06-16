"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

// Minimal newsletter signup used in the "dispatch" band on Writing / About.
// Posts to /api/subscribe with type "Newsletter" plus a `source` so each page is
// tagged ("Source: <page>") and we can see which page drove the signup.
export default function NewsletterForm({ source }: { source: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const email = String(new FormData(e.currentTarget).get("email") || "");
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "Newsletter", source }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className="form"
        style={{ background: "rgba(255,255,255,.04)", borderColor: "rgba(255,255,255,.16)" }}
      >
        <p className="lede" style={{ color: "var(--muted-l)", fontSize: 16, margin: 0 }}>
          Thank you, you&apos;re on the list.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      onSubmit={onSubmit}
      style={{ background: "rgba(255,255,255,.04)", borderColor: "rgba(255,255,255,.16)" }}
    >
      <div className="field">
        <label htmlFor={`news-email-${source}`} style={{ color: "var(--muted-l)" }}>Email</label>
        <input id={`news-email-${source}`} name="email" type="email" placeholder="you@example.com" required />
      </div>
      <button
        className="btn btn-b"
        type="submit"
        disabled={status === "sending"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="fine" style={{ color: "#E0A98F", marginTop: 8 }}>
          {error}
        </p>
      )}
    </form>
  );
}
