/** @type {import('next').NextConfig} */
const nextConfig = {
  // Atelier prototype hot-links Pexels placeholders; allow them until owned imagery lands.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
  // Marketing-site port — keep TS checks, skip lint gating during the build.
  eslint: { ignoreDuringBuilds: true },
  // Podcast was retired in favour of the blog; keep old links alive.
  async redirects() {
    return [{ source: "/podcast", destination: "/writing", permanent: true }];
  },
};

export default nextConfig;
