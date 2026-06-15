import { Resend } from "resend";

const FROM = process.env.RESEND_FROM || "AvaElis Health <hello@avaelishealth.com.au>";

export function emailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
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
