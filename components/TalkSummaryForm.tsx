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

// Clinician gate for the talk summary. On submit we capture the lead plus the AHPRA number and
// confirm receipt. The summary is NOT shown here: Nikki verifies the registration against the
// register, then sends it manually. So nothing clinical ever ships from this form.
export default function TalkSummaryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [emailed, setEmailed] = useState(false);

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
          ahpra: data.get("ahpra"),
        }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string; emailed?: boolean };
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      setEmailed(!!j.emailed);
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
        <p className="ts-thanks">Thank you. Your request has been received.</p>
        <p className="lede" style={{ textAlign: "center", maxWidth: "34em", margin: "0 auto" }}>
          The summary is written for registered health practitioners, so we verify each AHPRA
          registration before sending. Once your registration is confirmed we will email you the full
          clinician summary, with every reference.
          {emailed ? " A confirmation is on its way to your inbox now." : ""}
        </p>
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
        Enter your details and AHPRA registration number. We verify your registration, then email you
        the full evidence summary with every reference.
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
      <div className="field">
        <label htmlFor="ts-ahpra">AHPRA registration number</label>
        <input
          id="ts-ahpra"
          name="ahpra"
          type="text"
          placeholder="e.g. MED0001234567"
          autoCapitalize="characters"
          required
        />
      </div>
      <button
        className="btn btn-f"
        type="submit"
        disabled={status === "sending"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {status === "sending" ? "Sending…" : "Request the summary"}
      </button>
      {status === "error" && (
        <p className="fine" style={{ color: "#A9603F", marginTop: 8 }}>
          {error}
        </p>
      )}
      <p className="fine">
        Your details stay private and are used only to verify your registration and send the summary.
      </p>
    </form>
  );
}
