/**
 * setup-migration-env.mjs
 * Interactive helper so you don't have to hand-edit .env.local.
 * It asks for the 4 migration values and writes them into the repo's .env.local for you.
 *
 * Run it (from anywhere — it always writes to THIS repo's .env.local):
 *   node "D:\dev\avaelis-health-web\scripts\setup-migration-env.mjs"
 *
 * Paste each value when prompted and press Enter. Values stay in your terminal,
 * never in chat. When it finishes, come back and say "done".
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Always target this repo's .env.local, regardless of where you run the command from.
const FILE = path.resolve(import.meta.dirname, "..", ".env.local");

const VARS = [
  { key: "OLD_MC_API_KEY", label: "OLD account API key (jason@ — ends in -us11)", ok: (v) => /-us\d+$/i.test(v) },
  { key: "OLD_MC_AUDIENCE_ID", label: "OLD Audience ID (jason@)", ok: (v) => v.length >= 5 },
  { key: "NEW_MC_API_KEY", label: "NEW account API key (info@ — ends in -usNN)", ok: (v) => /-us\d+$/i.test(v) },
  { key: "NEW_MC_AUDIENCE_ID", label: "NEW Audience ID (info@)", ok: (v) => v.length >= 5 },
];
const mask = (v) => (v.length <= 6 ? "***" : "***" + v.slice(-5));

const rl = readline.createInterface({ input, output });
console.log("\nPaste each value, press Enter. Ctrl+C to cancel.\n");

const values = {};
for (const { key, label, ok } of VARS) {
  let v = "";
  for (;;) {
    v = (await rl.question(`${label}\n  ${key} = `)).trim();
    if (!v) { console.log("  (nothing pasted — try again)\n"); continue; }
    if (!ok(v)) { console.log("  (that doesn't look complete — copy the WHOLE value and retry)\n"); continue; }
    break;
  }
  values[key] = v;
  console.log(`  ok, saved ${key} (${mask(v)})\n`);
}
rl.close();

let lines = fs.existsSync(FILE) ? fs.readFileSync(FILE, "utf8").split(/\r?\n/) : [];
for (const { key } of VARS) {
  const idx = lines.findIndex((l) => l.startsWith(`${key}=`));
  if (idx >= 0) lines[idx] = `${key}=${values[key]}`;
  else lines.push(`${key}=${values[key]}`);
}
fs.writeFileSync(FILE, lines.join("\n"), "utf8");

console.log(`Done. Wrote the 4 values to:\n  ${FILE}\n`);
console.log('Now go back to chat and say "done" — I will run the migration.\n');
