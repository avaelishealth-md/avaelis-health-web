import { Resend } from "resend";

const FROM = process.env.RESEND_FROM || "AvaElis Health <hello@avaelishealth.com.au>";

export function emailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

function esc(s: string): string {
  return (s || "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

// Send a transactional email via Resend. No-op (logs) if RESEND_API_KEY is not set yet,
// so callers never crash before the email provider is wired.
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ id?: string; skipped?: boolean; error?: unknown }> {
  if (!emailConfigured()) {
    console.warn("Resend not configured; skipping email to", opts.to);
    return { skipped: true };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
  if (error) {
    console.error("Resend error:", error);
    return { error };
  }
  return { id: data?.id };
}

// Branded HTML for the clinician talk-summary email.
export function talkSummaryEmail(opts: { name?: string; url: string }): string {
  const hi = opts.name ? `Hi ${esc(opts.name)},` : "Hello,";
  const url = esc(opts.url);
  return `<!doctype html><html><body style="margin:0;background:#F2EBDD;font-family:Arial,Helvetica,sans-serif;color:#2A211A">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <div style="background:#F8F3E9;border:1px solid #DBCFB7;border-radius:16px;padding:32px">
      <div style="width:44px;height:44px;border-radius:50%;background:#9A7536;color:#F2EBDD;font-size:22px;text-align:center;line-height:44px;font-family:Georgia,serif">&AElig;</div>
      <h1 style="font-family:Georgia,serif;font-weight:500;font-size:23px;margin:20px 0 8px">Your clinician summary</h1>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 14px">${hi}</p>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 14px">Thank you for your interest in Dr Danny Cai's talk on peptide therapeutics, covering the evidence, classifications and regulatory considerations. You can revisit the clinician summary anytime.</p>
      <p style="margin:24px 0"><a href="${url}" style="background:#9A7536;color:#ffffff;text-decoration:none;padding:13px 24px;border-radius:100px;font-size:14px;display:inline-block">Open the clinician summary</a></p>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 14px">If you would like to discuss working together or refer a patient, just reply to this email.</p>
      <p style="font-size:14px;line-height:1.6;color:#5A4E40;margin-top:26px">Dr Danny Cai<br><span style="color:#8A7C68">AvaElis Health &middot; Longevity Clinic</span></p>
    </div>
    <p style="font-size:11px;color:#8A7C68;text-align:center;margin-top:18px;line-height:1.5">AvaElis Health provides general longevity and preventive care. This material is general professional education, not individual medical advice. No prescription medicines are advertised.</p>
  </div></body></html>`;
}
