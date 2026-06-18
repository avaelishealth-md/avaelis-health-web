import { NextResponse } from "next/server";
import { addContact } from "@/lib/mailchimp";
import { sendEmail, talkSummaryEmail } from "@/lib/email";
import { getTalkSummaryPost } from "@/lib/posts";
import { sanitizeHtml, stripDuplicateLede } from "@/lib/sanitize";

export const runtime = "nodejs";

// Where the confirmation email points back to. The summary itself is revealed inline on
// /talk-summary after signup, so this stays a page that always exists (no 404). Override via env.
const SUMMARY_URL = process.env.TALK_SUMMARY_URL || "https://avaelishealth.com.au/talk-summary";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const name = String(data.name || "").trim().slice(0, 80);
  const email = String(data.email || "").trim().toLowerCase();
  const phone = String(data.phone || "").trim().slice(0, 40);
  const role = String(data.role || "").trim().slice(0, 60);

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }

  const tags = ["Clinician", "Source: Talk QR"];
  if (role) tags.push(`Role: ${role}`);

  // Capturing the lead is the priority at the talk, so fail loud if it doesn't land
  // (don't tell the clinician "on its way" when nothing was saved).
  const contact = await addContact({
    email,
    name,
    phone,
    tags,
    note: `Talk QR signup${role ? ` (${role})` : ""}${phone ? ` · ${phone}` : ""}`,
  });
  if (!contact.ok) {
    console.error("talk-summary: lead capture failed", email, contact.error);
    return NextResponse.json(
      { error: "We couldn't register you just now. Please try again in a moment." },
      { status: 502 },
    );
  }

  // Email a copy too (no-op if Resend isn't configured yet).
  const sent = await sendEmail({
    to: email,
    subject: "Your summary from Dr Danny Cai's talk",
    html: talkSummaryEmail({ name, url: SUMMARY_URL }),
  });

  // Reveal the gated summary inline now that the lead is captured. Read via the service
  // role so it can be an unlisted draft; body is sanitised before it leaves the server.
  const summary = await getTalkSummaryPost();
  const post = summary
    ? {
        title: summary.title,
        html: sanitizeHtml(stripDuplicateLede(summary.body || "", summary.title)),
        readMinutes: summary.read_minutes ?? 1,
        refs: summary.refs ?? null,
      }
    : null;

  return NextResponse.json({ ok: true, emailed: !!sent.id, post });
}
