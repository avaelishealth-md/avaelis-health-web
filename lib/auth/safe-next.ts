// Validates a post-login redirect target. Only the relative /admin paths we
// actually serve are honoured; malformed/truncated paths (e.g. /admin/logi) and
// open-redirect attempts (//evil.com, https://…) fall back to the dashboard.
export function safeAdminNext(raw: string | null | undefined): string {
  if (raw === "/admin" || raw === "/admin/posts/new") return raw;
  if (raw && /^\/admin\/posts\/[A-Za-z0-9-]+$/.test(raw)) return raw; // edit a specific post
  return "/admin";
}
