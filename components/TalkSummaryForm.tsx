"use client";

import { useState } from "react";
import References from "@/components/References";
import type { PostRef } from "@/lib/types";

type Status = "idle" | "sending" | "done" | "error";
type RevealedPost = { title: string; html: string; readMinutes: number; refs?: PostRef[] | null };

const ROLES = [
  "Doctor / GP",
  "Physiotherapist",
  "Sports physician",
  "Exercise physiologist",
  "Nurse",
  "Other clinician",
];

// Email gate for the clinician talk summary. On submit we capture the lead, then the
// server reveals the (unlisted) summary inline. The summary HTML never ships until signup.
export default function TalkSummaryForm({ teaser }: { teaser?: string | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [emailed, setEmailed] = useState(false);
  const [post, setPost] = useState<RevealedPost | null>(null);

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
          phone: data.get("phone"),
          role: data.get("role"),
        }),
      });
      const j = (await res.json().catch(() => ({}))) as {
        error?: string;
        emailed?: boolean;
        post?: RevealedPost | null;
      };
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      setEmailed(!!j.emailed);
      setPost(j.post ?? null);
      setStatus("done");
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="ts-done">
        <p className="ts-thanks">
          Thank you{emailed ? ". A copy is also on its way to your inbox" : ""}.
        </p>
        {post ? (
          <>
            <article className="article">
              <h2 style={{ marginTop: 0 }}>{post.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>
            <References refs={post.refs} />
            <div style={{ background: "var(--plum)", borderRadius: 14, padding: "26px 22px", marginTop: 30, textAlign: "center" }}>
              <span className="ov" style={{ color: "var(--bronze-l)" }}>Earn 1 RACGP CPD hour</span>
              <h3 style={{ color: "#fff", fontSize: "22px", margin: "10px 0 10px" }}>
                Go further: the accredited longevity CPD course
              </h3>
              <p style={{ color: "var(--muted-l)", maxWidth: "36em", margin: "0 auto 18px" }}>
                Dr. Danny Cai&apos;s RACGP-accredited education for clinicians (CPD Activity 1631161,
                Educational Activities, 1 hour), delivered with Medihuanna. Evidence-led longevity you
                can use in practice.
              </p>
              <a className="btn btn-f" href="/#education" target="_blank" rel="noopener noreferrer">
                Explore the CPD course
              </a>
            </div>
          </>
        ) : (
          <p className="lede" style={{ textAlign: "center" }}>
            We have your details. The clinician summary will be sent to your inbox shortly.
          </p>
        )}
        <div className="disclaimer" style={{ marginTop: 26 }}>
          General education for health professionals, not individual medical advice. No prescription
          medicines are advertised.
        </div>
      </div>
    );
  }

  return (
    <form className="form ts-form" onSubmit={onSubmit}>
      <span className="ov ts-form-ov">For clinicians · Lifestyle Health Summit 2026</span>
      <h2 className="ts-form-h">Get Dr. Danny&apos;s full talk summary</h2>
      <p className="ts-form-sub">
        The complete evidence summary, with every reference, opens the moment you enter your details.
      </p>
      <div className="field">
        <label htmlFor="ts-name">Full name</label>
        <input id="ts-name" name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="ts-email">Email</label>
        <input id="ts-email" name="email" type="email" placeholder="you@clinic.com" required />
      </div>
      <div className="field">
        <label htmlFor="ts-phone">Mobile</label>
        <input id="ts-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" required />
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
        {status === "sending" ? "Opening…" : "Open the summary"}
      </button>
      {status === "error" && (
        <p className="fine" style={{ color: "#A9603F", marginTop: 8 }}>
          {error}
        </p>
      )}
      <p className="fine">
        Your details stay private and are used only to send the summary and follow up.
      </p>
    </form>
  );
}
