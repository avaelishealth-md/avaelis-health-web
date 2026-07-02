/**
 * migrate-mailchimp.mjs
 * One-time migration of the AvaElis Health audience from the OLD Mailchimp
 * account (jason@avaelishealth.com.au) to the NEW paid account (info@avaelishealth.com.au).
 *
 * Preserves, per member: email, status (subscribed / unsubscribed / pending /
 * transactional), ALL merge fields (including AHPRA) and ALL tags. It never
 * resurrects an opt-out, and it SKIPS "cleaned" members (Mailchimp's API cannot
 * recreate a cleaned/hard-bounced contact — they are reported, not migrated).
 *
 * REQUIRED ENV VARS — put REAL values in .env.local (gitignored). Never commit keys.
 *   OLD_MC_API_KEY      OLD account API key. Mailchimp (logged in as jason@) ->
 *                       Profile -> Extras -> API keys. Ends in "-usXX" (server prefix).
 *   OLD_MC_AUDIENCE_ID  OLD audience ID. Audience -> Settings ->
 *                       "Audience name and campaign defaults" -> Audience ID.
 *   NEW_MC_API_KEY      NEW account API key (logged in as info@), same place.
 *   NEW_MC_AUDIENCE_ID  NEW audience ID, same place.
 *
 * RUN (from the repo root; Node 18+ has native --env-file):
 *   Dry run (reads OLD, writes a CSV backup to ./backup, writes NOTHING to NEW):
 *     node --env-file=.env.local scripts/migrate-mailchimp.mjs --dry-run
 *   Commit (migrates for real):
 *     node --env-file=.env.local scripts/migrate-mailchimp.mjs --commit
 *
 * Safe to re-run: members are upserted by email hash (no duplicates). Default is
 * dry-run; you must pass --commit to write to the NEW audience.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const COMMIT = process.argv.includes("--commit");
const MODE = COMMIT ? "COMMIT (writing to NEW)" : "DRY RUN (no writes to NEW)";

function env(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env var: ${name}. Put it in .env.local and run with --env-file=.env.local`);
    process.exit(1);
  }
  return v;
}
const OLD = { key: env("OLD_MC_API_KEY"), list: env("OLD_MC_AUDIENCE_ID") };
const NEW = { key: env("NEW_MC_API_KEY"), list: env("NEW_MC_AUDIENCE_ID") };

function dc(key) {
  const prefix = key.split("-")[1];
  if (!prefix) {
    console.error("An API key is missing its -usXX server prefix. Check the key is complete.");
    process.exit(1);
  }
  return prefix;
}
const subId = (email) => crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function mc(acct, pathname, { method = "GET", body, query } = {}) {
  const url = new URL(`https://${dc(acct.key)}.api.mailchimp.com/3.0${pathname}`);
  if (query) for (const [k, v] of Object.entries(query)) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    method,
    headers: { Authorization: `apikey ${acct.key}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok && res.status !== 200) {
    const t = await res.text().catch(() => "");
    throw new Error(`Mailchimp ${method} ${pathname} -> ${res.status} ${t.slice(0, 300)}`);
  }
  return res.json();
}

// --- 1. Read every member from OLD (paginated) ---
async function fetchAll(acct) {
  const out = [];
  const count = 1000;
  let offset = 0;
  for (;;) {
    const data = await mc(acct, `/lists/${acct.list}/members`, {
      query: { count, offset, fields: "members.email_address,members.status,members.merge_fields,members.tags,total_items" },
    });
    out.push(...(data.members || []));
    if (out.length >= (data.total_items || 0) || (data.members || []).length === 0) break;
    offset += count;
    await sleep(300); // gentle on rate limits
  }
  return out;
}

// --- 2. CSV backup of OLD ---
function csv(v) {
  const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function writeBackup(members, stamp) {
  const dir = path.resolve("backup");
  fs.mkdirSync(dir, { recursive: true });
  const mergeKeys = [...new Set(members.flatMap((m) => Object.keys(m.merge_fields || {})))].sort();
  const header = ["email_address", "status", ...mergeKeys.map((k) => `MERGE_${k}`), "tags"];
  const rows = members.map((m) =>
    [m.email_address, m.status, ...mergeKeys.map((k) => m.merge_fields?.[k] ?? ""), (m.tags || []).map((t) => t.name).join("; ")]
      .map(csv)
      .join(","),
  );
  const file = path.join(dir, `old-audience-${stamp}.csv`);
  fs.writeFileSync(file, [header.join(","), ...rows].join("\n"), "utf8");
  return file;
}

// --- 3. Make sure every OLD merge field (incl. AHPRA) exists in NEW ---
async function syncMergeFields() {
  const oldFields = (await mc(OLD, `/lists/${OLD.list}/merge-fields`, { query: { count: 1000 } })).merge_fields || [];
  const newFields = (await mc(NEW, `/lists/${NEW.list}/merge-fields`, { query: { count: 1000 } })).merge_fields || [];
  const haveTags = new Set(newFields.map((f) => f.tag));
  const missing = oldFields.filter((f) => !haveTags.has(f.tag));
  for (const f of missing) {
    if (!COMMIT) {
      console.log(`  [dry-run] would create merge field ${f.tag} (${f.type})`);
      continue;
    }
    await mc(NEW, `/lists/${NEW.list}/merge-fields`, {
      method: "POST",
      body: { name: f.name, type: f.type, tag: f.tag, required: false, public: f.public, options: f.options },
    });
    console.log(`  created merge field ${f.tag} (${f.type})`);
    await sleep(300);
  }
  return missing.map((f) => f.tag);
}

// --- 4. Submit + poll a Mailchimp batch ---
async function runBatch(ops, label) {
  if (!ops.length) {
    console.log(`  ${label}: nothing to do`);
    return { total: 0, finished: 0, errored: 0 };
  }
  const { id } = await mc(NEW, "/batches", { method: "POST", body: { operations: ops } });
  console.log(`  ${label}: submitted batch ${id} (${ops.length} operations)`);
  for (;;) {
    await sleep(3000);
    const b = await mc(NEW, `/batches/${id}`);
    process.stdout.write(`\r  ${label}: ${b.finished_operations}/${b.total_operations} done, ${b.errored_operations} errored [${b.status}]    `);
    if (b.status === "finished") {
      process.stdout.write("\n");
      if (b.errored_operations && b.response_body_url) console.log(`  ${label}: error detail -> ${b.response_body_url}`);
      return { total: b.total_operations, finished: b.finished_operations, errored: b.errored_operations };
    }
  }
}

async function main() {
  console.log(`\nAvaElis Mailchimp migration   [${MODE}]\n`);

  console.log("Reading OLD audience...");
  const members = await fetchAll(OLD);
  const byStatus = members.reduce((a, m) => ((a[m.status] = (a[m.status] || 0) + 1), a), {});
  console.log(`  ${members.length} members  ${JSON.stringify(byStatus)}`);

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = writeBackup(members, stamp);
  console.log(`  CSV backup written: ${backup}`);

  console.log("\n  sample (first 3):");
  members.slice(0, 3).forEach((m) =>
    console.log(`   - ${m.email_address} [${m.status}] AHPRA=${m.merge_fields?.AHPRA || "-"} tags=${(m.tags || []).map((t) => t.name).join("|") || "-"}`),
  );

  console.log("\nSyncing merge-field schema OLD -> NEW...");
  const createdFields = await syncMergeFields();

  const cleaned = members.filter((m) => m.status === "cleaned");
  const eligible = members.filter((m) => m.status !== "cleaned");
  const memberOps = eligible.map((m) => ({
    method: "PUT",
    path: `/lists/${NEW.list}/members/${subId(m.email_address)}`,
    // one-time copy: set the member's true OLD status (never flips an opt-out to subscribed)
    body: JSON.stringify({ email_address: m.email_address, status: m.status, merge_fields: m.merge_fields || {} }),
  }));
  const tagOps = eligible
    .filter((m) => (m.tags || []).length)
    .map((m) => ({
      method: "POST",
      path: `/lists/${NEW.list}/members/${subId(m.email_address)}/tags`,
      body: JSON.stringify({ tags: (m.tags || []).map((t) => ({ name: t.name, status: "active" })) }),
    }));

  if (!COMMIT) {
    console.log("\n[dry-run] Would migrate:");
    console.log(`  members upserted to NEW: ${memberOps.length}`);
    console.log(`  tag operations:          ${tagOps.length}`);
    console.log(`  merge fields created:    ${createdFields.length ? createdFields.join(", ") : "none (all present)"}`);
    console.log(`  SKIPPED (cleaned/bounced, cannot recreate): ${cleaned.length}`);
    cleaned.slice(0, 20).forEach((m) => console.log(`     - ${m.email_address}`));
    console.log("\nNothing was written to NEW. Re-run with --commit to migrate.\n");
    return;
  }

  console.log("\nWriting to NEW (members first, then tags)...");
  const r1 = await runBatch(memberOps, "members");
  const r2 = await runBatch(tagOps, "tags");

  await sleep(2000);
  const after = await fetchAll(NEW);

  console.log("\n================ RECONCILIATION ================");
  console.log(`OLD total members:        ${members.length}`);
  console.log(`  skipped (cleaned):      ${cleaned.length}`);
  console.log(`  eligible to migrate:    ${eligible.length}`);
  console.log(`member upserts:           ${r1.finished}/${r1.total} ok, ${r1.errored} errored`);
  console.log(`tag operations:           ${r2.finished}/${r2.total} ok, ${r2.errored} errored`);
  console.log(`NEW audience now holds:   ${after.length} members`);
  console.log(`expected (eligible):      ${eligible.length}`);
  if (after.length !== eligible.length || r1.errored || r2.errored)
    console.log("WARNING: mismatch or errors — check the error detail URL(s) above and the backup CSV.");
  else console.log("OK: counts reconcile.");
  console.log(`backup CSV:               ${backup}`);
  console.log("===============================================\n");
}

main().catch((e) => {
  console.error("\nFATAL:", e.message);
  process.exit(1);
});
