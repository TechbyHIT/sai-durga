import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path only, e.g. "/invisible-grills-in-visakhapatnam" — always self-referencing unless canonicalPath is given. */
  path: string;
  /** Set when this page should canonicalize to a *different* URL (duplicate-content consolidation). */
  canonicalPath?: string;
  index: boolean;
  imagePath?: string;
  imageAlt?: string;
}

/**
 * Single choke point for building page <head> metadata. Every page in the app calls
 * this so canonical/robots/OG/Twitter behaviour stays consistent as the system scales.
 */
export function buildMetadata(opts: BuildMetadataOptions): Metadata {
  const canonicalPath = opts.canonicalPath ?? opts.path;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const image = opts.imagePath ? absoluteUrl(opts.imagePath) : absoluteUrl("/og-default.jpg");

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: opts.index,
      follow: true,
      googleBot: {
        index: opts.index,
        follow: true,
      },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonicalUrl,
      siteName: site.name,
      images: [{ url: image, alt: opts.imageAlt ?? opts.title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

export function truncateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, maxLength - 1).trimEnd()}\u2026`;
}
