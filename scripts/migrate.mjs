// One-off migration runner. Reads SUPABASE_DB_URL from .env.local and applies a .sql file.
//   node scripts/migrate.mjs [path-to.sql]   (defaults to supabase/migrations/0001_init_posts.sql)
// Get the connection string from Supabase -> Settings -> Database -> Connection string
// (URI; "Direct connection" or "Session pooler"). Put it in .env.local as SUPABASE_DB_URL=...
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(here, "..", ".env.local") });

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("Missing SUPABASE_DB_URL in .env.local (Supabase -> Settings -> Database -> Connection string).");
  process.exit(1);
}

const sqlPath = process.argv[2] || path.join(here, "..", "supabase", "migrations", "0001_init_posts.sql");
const sql = await readFile(sqlPath, "utf8");

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  await client.query(sql);
  console.log("Migration applied OK:", path.basename(sqlPath));
} catch (e) {
  console.error("Migration failed:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
