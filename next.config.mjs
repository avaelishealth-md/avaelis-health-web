/** @type {import('next').NextConfig} */
const nextConfig = {
  // Atelier prototype hot-links Pexels placeholders; allow them until owned imagery lands.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
  // Marketing-site port — keep TS checks, skip lint gating during the build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
