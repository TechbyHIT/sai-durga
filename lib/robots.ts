import { absoluteUrl } from "./site";

export const DISALLOWED_PATHS = [
  "/api/",
  "/admin/",
  "/search/",
  "/test/",
  "/draft/",
  "/*?sort=",
  "/*?filter=",
  "/*?utm=",
];

export function getSitemapUrl(): string {
  return absoluteUrl("/sitemap.xml");
}
