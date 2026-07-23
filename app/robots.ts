import type { MetadataRoute } from "next";
import { DISALLOWED_PATHS, getSitemapUrl } from "@/lib/robots";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: getSitemapUrl(),
    host: site.baseUrl,
  };
}
