"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { safeAdminNext } from "@/lib/auth/safe-next";

type Status = "idle" | "sending" | "sent" | "error";

const ERRORS: Record<string, string> = {
  "not-allowed": "That email isn't on the access list. Ask Jason to add you.",
  auth: "That sign-in link was invalid or expired. Please request a new one.",
  "missing-code": "Sign-in link was incomplete. Please request a new one.",
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const urlError =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("error")
      : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMsg("");
    try {
      const supabase = createClient();
      const params = new URLSearchParams(window.location.search);
      const next = safeAdminNext(params.get("next"));
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Only existing allow-listed users may sign in; unknown emails can't bootstrap an account.
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="adm-wrap narrow">
      <h1>Studio sign in</h1>
      <p className="sub">Enter your email and we&apos;ll send you a one-time sign-in link.</p>

      {status === "sent" ? (
        <p className="adm-ok">
          Check your inbox. A sign-in link is on its way to <strong>{email}</strong>.
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="adm-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@avaelishealth.com"
            />
          </div>
          <button className="adm-btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send sign-in link"}
          </button>
          {status === "error" && <p className="adm-error">{msg}</p>}
          {urlError && status === "idle" && (
            <p className="adm-error">{ERRORS[urlError] || "Please sign in again."}</p>
          )}
        </form>
      )}
    </div>
  );
}
