import { blogPosts } from "@/data/blogTopics";
import { citiesBySlug } from "@/data/cities";
import { areasBySlug } from "@/data/areas";
import type { SitemapBucket } from "@/data/pageRules";
import { resolveFlatSlug } from "./pageGenerator";
import type { SitemapUrlEntry } from "./sitemap";

export const SITEMAP_BUCKET_LABELS: Record<SitemapBucket, string> = {
  core: "Main Pages",
  services: "All Services",
  locations: "City Pages",
  areas: "Area Pages",
  "service-city": "Services by City",
  "service-area": "Services by Area",
  "service-area-city": "Services by Area & City",
  "local-intent-area": "Local Pages by Area",
  "hyperlocal-intent-area": "Local Pages by Neighbourhood",
  intent: "Services by Property Type",
  price: "Price Guides",
  comparison: "Comparisons",
  blog: "Blog & Guides",
};

const STATIC_PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/services": "All Services",
  "/locations": "All Locations",
  "/areas": "All Areas",
  "/blog": "Blog & Guides",
  "/faq": "FAQ",
  "/contact": "Contact Us",
  "/sitemap": "Site Map — All Pages",
};

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Lightweight label for a sitemap URL — no full page content build. */
export function labelForSitemapEntry(entry: SitemapUrlEntry): string {
  let pathname: string;
  try {
    pathname = new URL(entry.loc).pathname;
  } catch {
    return entry.loc;
  }

  if (STATIC_PATH_LABELS[pathname]) return STATIC_PATH_LABELS[pathname];

  if (pathname.startsWith("/locations/")) {
    const slug = pathname.split("/")[2];
    const city = slug ? citiesBySlug[slug] : undefined;
    return city ? `Services in ${city.name}` : humanizeSlug(slug ?? "");
  }

  if (pathname.startsWith("/areas/")) {
    const slug = pathname.split("/")[2];
    const area = slug ? areasBySlug[slug] : undefined;
    return area ? `Services in ${area.name}` : humanizeSlug(slug ?? "");
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.split("/")[2];
    const post = blogPosts.find((p) => p.slug === slug);
    return post?.title ?? humanizeSlug(slug ?? "");
  }

  const flatSlug = pathname.slice(1);
  const resolved = resolveFlatSlug(flatSlug);
  if (resolved) {
    const { service, city, area, intent, seoModifier, audience, comparison, serviceB, genericAlternativeB } =
      resolved;

    switch (resolved.pageType) {
      case "service":
        return service!.name;
      case "service-city":
        return `${service!.name} in ${city!.name}`;
      case "service-area":
        return `${service!.name} in ${area!.name}`;
      case "service-area-city":
        return `${service!.name} in ${area!.name}, ${city!.name}`;
      case "local-intent-city":
        return `${service!.name} ${seoModifier!.label} in ${city!.name}`;
      case "local-intent-area":
        return `${service!.name} ${seoModifier!.label} in ${area!.name}`;
      case "hyperlocal-intent-area":
        return `${service!.name} ${seoModifier!.label} for ${audience!.label} in ${area!.name}`;
      case "intent":
        return `${service!.name} for ${intent!.label}`;
      case "price":
        return `${service!.name} Price Guide`;
      case "comparison": {
        const nameB = serviceB?.name ?? genericAlternativeB?.name ?? comparison!.serviceBSlug;
        return `${service!.name} vs ${nameB}`;
      }
    }
  }

  return humanizeSlug(flatSlug);
}

export function pathForSitemapEntry(entry: SitemapUrlEntry): string {
  try {
    return new URL(entry.loc).pathname;
  } catch {
    return entry.loc;
  }
}
