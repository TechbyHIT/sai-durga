/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const imageUnoptimized = process.env.NEXT_IMAGE_UNOPTIMIZED === "1";

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  images: {
    unoptimized: imageUnoptimized,
    formats: imageUnoptimized ? undefined : ["image/webp"],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    dangerouslyAllowSVG: false,
  },

  experimental: {
    // Keep ISR in memory only — prevents unbounded .next/cache disk growth on VPS.
    isrFlushToDisk: false,
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net; frame-ancestors 'self';",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    return [];
  },
};

if (isProd) {
  // Silence verbose build-time logging in production containers.
  nextConfig.logging = { fetches: { fullUrl: false } };
}

export default nextConfig;
