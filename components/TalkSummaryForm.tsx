"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

const ROLES = [
  "Doctor / GP",
  "Physiotherapist",
  "Sports physician",
  "Exercise physiologist",
  "Nurse",
  "Other clinician",
];

export default function TalkSummaryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/talk-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          role: data.get("role"),
        }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      if (j.url) setLink(j.url);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form">
        <p className="lede" style={{ fontSize: 17, margin: "0 0 10px" }}>
          Thank you, the summary is on its way to your inbox.
        </p>
        {link && (
          <p className="fine" style={{ marginTop: 6 }}>
            You can also{" "}
            <a href={link} style={{ color: "var(--bronze)", textDecoration: "underline" }}>
              read it here now
            </a>
            . If the email does not arrive, please check your spam folder.
          </p>
        )}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="ts-name">Full name</label>
        <input id="ts-name" name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="ts-email">Email</label>
        <input id="ts-email" name="email" type="email" placeholder="you@clinic.com" required />
      </div>
      <div className="field">
        <label htmlFor="ts-role">I&apos;m a</label>
        <select id="ts-role" name="role" defaultValue={ROLES[0]}>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-f"
        type="submit"
        disabled={status === "sending"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {status === "sending" ? "Sending…" : "Send me the summary"}
      </button>
      {status === "error" && (
        <p className="fine" style={{ color: "#A9603F", marginTop: 8 }}>
          {error}
        </p>
      )}
      <p className="fine">Your details stay private and are used only to send the summary and follow up.</p>
    </form>
  );
}
