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
      // Canonical host: send www to the apex (matches the site URL used everywhere).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.avaelishealth.com.au" }],
        destination: "https://avaelishealth.com.au/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
