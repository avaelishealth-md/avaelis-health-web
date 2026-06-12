"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          type: data.get("type"),
          message: data.get("message"),
        }),
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
      <div className="frm reveal d1" style={{ textAlign: "center", padding: "50px 0" }}>
        <p style={{ fontFamily: "Spectral,serif", fontSize: 24, color: "#9A7536", margin: 0 }}>
          Thank you, we will be in touch personally.
        </p>
      </div>
    );
  }

  return (
    <form className="frm reveal d1" onSubmit={onSubmit}>
      <label>Full name</label>
      <input name="name" type="text" placeholder="Your name" required />
      <label>Email</label>
      <input name="email" type="email" placeholder="you@example.com" required />
      <label>I&apos;m enquiring as</label>
      <select name="type" defaultValue="A prospective patient">
        <option>A prospective patient</option>
        <option>A clinician / course interest</option>
        <option>A partner or collaborator</option>
      </select>
      <label>What&apos;s prompting this?</label>
      <input name="message" type="text" placeholder="A line or two helps us prepare" />
      <button className="btn btn-f" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {status === "error" && (
        <p className="fine" style={{ color: "#A9603F" }}>{error}</p>
      )}
      <p className="fine">
        No public price list for treatment, personalised care is discussed in consultation. Your
        details stay private.
      </p>
    </form>
  );
}
