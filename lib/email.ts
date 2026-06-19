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

// Branded HTML for the clinician talk-summary email: a gracious note, the CPD hook, and the
// full summary embedded as the reader's own copy. Sent ONLY to talk-summary signups. No em dashes.
export function talkSummaryEmail(opts: { name?: string; title?: string; summaryHtml?: string; fullUrl?: string }): string {
  const hi = opts.name ? `Hi ${esc(opts.name)},` : "Hello,";
  const title = esc(opts.title || "Your clinician summary");
  const summary = opts.summaryHtml || ""; // already sanitised by the caller
  const url = esc(opts.fullUrl || "https://www.avaelishealth.com.au/talk-summary");
  const badge = "https://www.avaelishealth.com.au/assets/racgp-cpd-badge.png";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    .sum h2{font-family:Georgia,serif;font-weight:normal;font-size:18px;margin:18px 0 8px;color:#2A211A}
    .sum h3{font-family:Georgia,serif;font-weight:normal;font-size:16px;margin:16px 0 6px;color:#2A211A}
    .sum p{margin:0 0 12px}
    .sum ul,.sum ol{margin:0 0 12px;padding-left:20px} .sum li{margin:4px 0}
    .sum table{border-collapse:collapse;width:100%;margin:14px 0;font-size:13.5px}
    .sum th,.sum td{border:1px solid #DBCFB7;padding:8px 10px;text-align:left;vertical-align:top}
    .sum th{background:#EFE6D6}
  </style></head><body style="margin:0;background:#F2EBDD;font-family:Arial,Helvetica,sans-serif;color:#2A211A">
  <div style="max-width:600px;margin:0 auto;padding:32px 18px">
    <div style="background:#F8F3E9;border:1px solid #DBCFB7;border-radius:16px;padding:32px 30px">
      <div style="width:46px;height:46px;border-radius:50%;background:#9A7536;color:#F2EBDD;font-size:23px;text-align:center;line-height:46px;font-family:Georgia,serif">&AElig;</div>
      <p style="font-size:11px;font-weight:bold;letter-spacing:.22em;text-transform:uppercase;color:#9A7536;margin:18px 0 6px">For clinicians</p>
      <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:24px;line-height:1.2;margin:0 0 14px">Your copy of Dr. Danny's talk summary</h1>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 14px">${hi}</p>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 4px">Thank you for your interest in Dr. Danny Cai's Lifestyle Health Summit talk. As promised, here is your copy of the clinician summary to keep and revisit, covering the diagnostics worth doing, where peptides sit, and the evidence behind it. You can also <a href="${url}" style="color:#9A7536;font-weight:bold">read the full summary online</a>.</p>
      <div style="background:#5A3A42;border-radius:12px;padding:22px;margin:24px 0;text-align:center">
        <p style="font-size:11px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;color:#C8A35E;margin:0 0 8px">Earn 1 RACGP CPD hour</p>
        <p style="font-family:Georgia,serif;font-size:18px;color:#ffffff;margin:0 0 10px">Go further: the accredited longevity CPD course</p>
        <p style="font-size:13.5px;line-height:1.6;color:#E7DECF;margin:0 0 16px">Dr. Danny Cai's RACGP-accredited education for clinicians (CPD Activity 1631161, Educational Activities, 1 hour), delivered with Medihuanna. Evidence-led longevity you can use in practice.</p>
        <img src="${badge}" alt="RACGP CPD Approved Activity, Educational Activities, 1 hour" width="130" style="display:inline-block;background:#ffffff;border-radius:8px;padding:8px">
      </div>
      <div class="sum" style="border-top:1px solid #DBCFB7;margin-top:8px;padding-top:22px;font-size:15px;line-height:1.65;color:#3A3128">
        <h2 style="font-family:Georgia,serif;font-weight:normal;font-size:20px;margin:0 0 14px;color:#2A211A">${title}</h2>
        ${summary}
      </div>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:24px 0 0">If you would like to discuss working together or refer a patient, simply reply to this email.</p>
      <p style="font-size:14px;line-height:1.6;color:#5A4E40;margin-top:24px">Warm regards,<br>Dr. Danny Cai<br><span style="color:#8A7C68">AvaElis Health, Longevity Clinic</span></p>
    </div>
    <p style="font-size:11px;color:#8A7C68;text-align:center;margin-top:18px;line-height:1.5">AvaElis Health provides general longevity and preventive care. This material is general professional education, not individual medical advice. No prescription medicines are advertised.</p>
  </div></body></html>`;
}

// Short confirmation sent automatically on a talk-summary signup. Acknowledges the request, sets the
// expectation that the full summary follows once AHPRA registration is verified, and carries the CPD
// hook. No clinical content (that is sent manually after verification). Gracious tone, no em dashes.
export function talkSummaryAckEmail(opts: { name?: string }): string {
  const hi = opts.name ? `Hi ${esc(opts.name)},` : "Hello,";
  const badge = "https://www.avaelishealth.com.au/assets/racgp-cpd-badge.png";
  return `<!doctype html><html><head><meta charset="utf-8"></head>
  <body style="margin:0;background:#F2EBDD;font-family:Arial,Helvetica,sans-serif;color:#2A211A">
  <div style="max-width:600px;margin:0 auto;padding:32px 18px">
    <div style="background:#F8F3E9;border:1px solid #DBCFB7;border-radius:16px;padding:32px 30px">
      <div style="width:46px;height:46px;border-radius:50%;background:#9A7536;color:#F2EBDD;font-size:23px;text-align:center;line-height:46px;font-family:Georgia,serif">&AElig;</div>
      <p style="font-size:11px;font-weight:bold;letter-spacing:.22em;text-transform:uppercase;color:#9A7536;margin:18px 0 6px">For clinicians</p>
      <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:24px;line-height:1.2;margin:0 0 14px">Thank you, your summary is on its way</h1>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 14px">${hi}</p>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:0 0 14px">Thank you for your interest in Dr. Danny Cai's Lifestyle Health Summit talk. Because the summary is written for registered health practitioners, we verify each AHPRA registration before sending. Once your registration is confirmed, we will email you the full clinician summary, covering the diagnostics worth doing, where peptides sit, and the evidence behind it. This usually takes a short time.</p>
      <div style="background:#5A3A42;border-radius:12px;padding:22px;margin:24px 0;text-align:center">
        <p style="font-size:11px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;color:#C8A35E;margin:0 0 8px">Earn 1 RACGP CPD hour</p>
        <p style="font-family:Georgia,serif;font-size:18px;color:#ffffff;margin:0 0 10px">Go further: the accredited longevity CPD course</p>
        <p style="font-size:13.5px;line-height:1.6;color:#E7DECF;margin:0 0 16px">Dr. Danny Cai's RACGP-accredited education for clinicians (CPD Activity 1631161, Educational Activities, 1 hour), delivered with Medihuanna. Evidence-led longevity you can use in practice.</p>
        <img src="${badge}" alt="RACGP CPD Approved Activity, Educational Activities, 1 hour" width="130" style="display:inline-block;background:#ffffff;border-radius:8px;padding:8px">
      </div>
      <p style="font-size:15px;line-height:1.65;color:#5A4E40;margin:24px 0 0">If you would like to discuss working together or refer a patient, simply reply to this email.</p>
      <p style="font-size:14px;line-height:1.6;color:#5A4E40;margin-top:24px">Warm regards,<br>Dr. Danny Cai<br><span style="color:#8A7C68">AvaElis Health, Longevity Clinic</span></p>
    </div>
    <p style="font-size:11px;color:#8A7C68;text-align:center;margin-top:18px;line-height:1.5">AvaElis Health provides general longevity and preventive care. This material is general professional education, not individual medical advice. No prescription medicines are advertised.</p>
  </div></body></html>`;
}
