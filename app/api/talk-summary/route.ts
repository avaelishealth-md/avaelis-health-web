import { NextResponse } from "next/server";
import { addContact } from "@/lib/mailchimp";
import { sendEmail, talkSummaryAckEmail } from "@/lib/email";

export const runtime = "nodejs";

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
  const ahpra = String(data.ahpra || "").trim().toUpperCase().replace(/\s+/g, "").slice(0, 20);

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  // Lenient on purpose: Nikki verifies the number by hand against the register, so we only guard
  // against an empty or typo entry here rather than risk rejecting a real practitioner at the talk.
  if (ahpra.replace(/[^A-Z0-9]/g, "").length < 5) {
    return NextResponse.json({ error: "Please enter your AHPRA registration number." }, { status: 400 });
  }

  const tags = ["Clinician", "Source: Talk QR", "Pending verification"];
  if (role) tags.push(`Role: ${role}`);

  // Capturing the lead is the priority at the talk, so fail loud if it doesn't land. The summary is
  // NOT released here: Nikki verifies the AHPRA number against the register, then sends it manually.
  const contact = await addContact({
    email,
    name,
    phone,
    tags,
    mergeFields: { AHPRA: ahpra }, // best-effort column; the note below is the guaranteed record
    note: `PENDING AHPRA VERIFICATION (Talk QR) · AHPRA: ${ahpra}${role ? ` · Role: ${role}` : ""}${phone ? ` · ${phone}` : ""}${name ? ` · ${name}` : ""}`,
  });
  if (!contact.ok) {
    // Never turn a clinician away at the talk. The most common failure is an address already in a
    // Mailchimp compliance state (a prior unsubscribe or bounce), which a retry cannot fix; the rest
    // are transient. Log the full lead so it can be recovered and reconciled by hand, and still
    // confirm to the attendee rather than showing an error and losing the lead.
    console.error(
      "talk-summary: MAILCHIMP CAPTURE FAILED, lead logged for recovery:",
      JSON.stringify({ email, name, phone, role, ahpra, mcError: contact.error }),
    );
    return NextResponse.json({ ok: true, emailed: false });
  }

  // Auto-send only a short confirmation with the CPD hook (no clinical content); the full summary
  // follows manually after verification. No-op until Resend is configured. Talk-summary signups only.
  const sent = await sendEmail({
    to: email,
    subject: "Your clinician summary from Dr. Danny Cai is on its way",
    html: talkSummaryAckEmail({ name }),
  });

  return NextResponse.json({ ok: true, emailed: !!sent.id });
}
