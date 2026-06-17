// X/Twitter share image — reuse the same auto-generated branded card as Open Graph,
// so every platform shows the post's card rather than the site's default portrait.
// runtime is declared here (not re-exported) so Next can read it statically and the
// card's Buffer-based cover handling runs on Node.
export const runtime = "nodejs";
export { default, alt, size, contentType } from "./opengraph-image";
