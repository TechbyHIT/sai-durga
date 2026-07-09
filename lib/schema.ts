import { site, absoluteUrl } from "./site";
import type { FaqItem } from "@/data/faqs";

/**
 * Pure JSON-LD builder functions. No fake reviews or aggregateRating are ever
 * generated — FAQ schema always mirrors the FAQs actually rendered on the page.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.baseUrl,
    logo: absoluteUrl("/logo.png"),
    email: site.email,
    telephone: site.phone,
    sameAs: [],
  };
}

export function localBusinessSchema(opts?: { areaServed?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    image: absoluteUrl("/logo.png"),
    telephone: site.phone,
    email: site.email,
    url: site.baseUrl,
    address: {
      "@type": "PostalAddress",
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    areaServed: opts?.areaServed ?? "Andhra Pradesh",
    priceRange: "$$",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema(opts: {
  serviceName: string;
  description: string;
  areaServed?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.serviceName,
    name: opts.serviceName,
    description: opts.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      telephone: site.phone,
    },
    areaServed: opts.areaServed ?? "Andhra Pradesh",
    url: opts.url,
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbListSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function imageObjectSchema(opts: { url: string; alt: string; width?: number; height?: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl(opts.url),
    description: opts.alt,
    width: opts.width ?? 1200,
    height: opts.height ?? 800,
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    url: opts.url,
    image: opts.imageUrl ? [absoluteUrl(opts.imageUrl)] : undefined,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };
}
