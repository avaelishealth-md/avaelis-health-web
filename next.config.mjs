/** @type {import('next').NextConfig} */
const nextConfig = {
  // Atelier prototype hot-links Pexels placeholders; allow them until owned imagery lands.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
  // Marketing-site port — keep TS checks, skip lint gating during the build.
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      // Podcast was retired in favour of the blog; keep old links alive.
      { source: "/podcast", destination: "/writing", permanent: true },
    ];
    // NOTE: do NOT add a www<->apex redirect here. Vercel already redirects between
    // the apex and www at the domain level; a code redirect fights it and causes an
    // infinite ERR_TOO_MANY_REDIRECTS loop. Set the canonical host in Vercel → Domains.
  },
};

export default nextConfig;
