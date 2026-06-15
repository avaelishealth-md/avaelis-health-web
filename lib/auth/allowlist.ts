// Emails permitted to log into /admin. Configured via ADMIN_ALLOWLIST (comma-separated).
const ALLOWED = new Set(
  (process.env.ADMIN_ALLOWLIST || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

export function isAllowed(email?: string | null): boolean {
  return !!email && ALLOWED.has(email.toLowerCase());
}
