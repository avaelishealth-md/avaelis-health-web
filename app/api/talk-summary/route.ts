import { NextResponse } from "next/server";
import { addContact } from "@/lib/mailchimp";
import { sendEmail, talkSummaryEmail } from "@/lib/email";

export const runtime = "nodejs";

// The clinician summary the email links to (publish this post first). Override via env.
const SUMMARY_URL =
  process.env.TALK_SUMMARY_URL || "https://avaelishealth.com.au/writing/clinical-applications";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const name = String(data.name || "").trim().slice(0, 80);
  const email = String(data.email || "").trim().toLowerCase();
  const role = String(data.role || "").trim().slice(0, 60);

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const tags = ["Clinician", "Source: Talk QR"];
  if (role) tags.push(`Role: ${role}`);

  // Capture the lead (best-effort; the talk capture is the priority).
  await addContact({
    email,
    name,
    tags,
    note: role ? `Talk QR signup (${role})` : "Talk QR signup",
  });

  // Deliver the summary by email (no-op until Resend is configured).
  await sendEmail({
    to: email,
    subject: "Your summary from Dr Danny Cai's talk",
    html: talkSummaryEmail({ name, url: SUMMARY_URL }),
  });

  return NextResponse.json({ ok: true, url: SUMMARY_URL });
}
