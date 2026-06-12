import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

// Configure these in Vercel → Project Settings → Environment Variables:
//   MAILCHIMP_API_KEY   (secret — the key ends in e.g. "-us21")
//   MAILCHIMP_LIST_ID   (the Audience ID from Mailchimp → Audience → Settings)
const API_KEY = process.env.MAILCHIMP_API_KEY || "";
const LIST_ID = process.env.MAILCHIMP_LIST_ID || "";
const DC = API_KEY.split("-")[1] || ""; // server prefix, derived from the key

// Map the on-site "enquiring as" choices to clean Mailchimp tags.
const TAG_MAP: Record<string, string> = {
  "A prospective patient": "Patient",
  "A clinician / course interest": "Clinician",
  "A partner or collaborator": "Partner",
  Newsletter: "Newsletter",
};

function mc(path: string, method: string, body?: unknown) {
  return fetch(`https://${DC}.api.mailchimp.com/3.0${path}`, {
    method,
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function POST(req: Request) {
  if (!API_KEY || !LIST_ID || !DC) {
    return NextResponse.json({ error: "The form isn't connected yet." }, { status: 503 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const email = String(data.email || "").trim().toLowerCase();
  const name = String(data.name || "").trim();
  const type = String(data.type || "").trim();
  const message = String(data.message || "").trim();

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const hash = crypto.createHash("md5").update(email).digest("hex");
  const tag = TAG_MAP[type] || "Enquiry";

  try {
    // 1) add or update the subscriber (idempotent — won't error on repeat submits)
    const put = await mc(`/lists/${LIST_ID}/members/${hash}`, "PUT", {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: name ? { FNAME: name } : undefined,
    });
    if (!put.ok && put.status !== 200) {
      const e = (await put.json().catch(() => ({}))) as { title?: string };
      console.error("Mailchimp member error", put.status, e?.title);
      return NextResponse.json(
        { error: "We couldn't submit that just now — please email us instead." },
        { status: 502 },
      );
    }

    // 2) tag by enquiry type so patient / clinician / partner are segmented
    await mc(`/lists/${LIST_ID}/members/${hash}/tags`, "POST", {
      tags: [{ name: tag, status: "active" }],
    });

    // 3) keep the enquiry message as a contact note (best-effort)
    if (message) {
      await mc(`/lists/${LIST_ID}/members/${hash}/notes`, "POST", {
        note: `Enquiry (${tag}): ${message}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Network error — please try again." }, { status: 502 });
  }
}
