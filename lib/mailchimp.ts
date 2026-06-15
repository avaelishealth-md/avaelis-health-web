import crypto from "crypto";

const API_KEY = process.env.MAILCHIMP_API_KEY || "";
const LIST_ID = process.env.MAILCHIMP_LIST_ID || "";
const DC = API_KEY.split("-")[1] || "";

export function mailchimpConfigured(): boolean {
  return !!API_KEY && !!LIST_ID && !!DC;
}

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

// Add or update a subscriber (idempotent), with optional tags + a contact note.
export async function addContact(opts: {
  email: string;
  name?: string;
  tags?: string[];
  note?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!mailchimpConfigured()) return { ok: false, error: "not-configured" };
  const email = opts.email.trim().toLowerCase();
  const hash = crypto.createHash("md5").update(email).digest("hex");
  try {
    const put = await mc(`/lists/${LIST_ID}/members/${hash}`, "PUT", {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: opts.name ? { FNAME: opts.name } : undefined,
    });
    if (!put.ok && put.status !== 200) {
      const e = (await put.json().catch(() => ({}))) as { title?: string };
      return { ok: false, error: e?.title || "member-error" };
    }
    if (opts.tags?.length) {
      await mc(`/lists/${LIST_ID}/members/${hash}/tags`, "POST", {
        tags: opts.tags.map((name) => ({ name, status: "active" })),
      });
    }
    if (opts.note) {
      await mc(`/lists/${LIST_ID}/members/${hash}/notes`, "POST", { note: opts.note });
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}
