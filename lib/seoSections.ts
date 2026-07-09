import type { Service } from "@/data/services";
import type { City } from "@/data/cities";
import type { Area } from "@/data/areas";
import type { FaqItem } from "@/data/faqs";
import { site } from "@/lib/site";
import { pickBySeed, renderTemplate } from "@/lib/slug";
import { truncateDescription } from "@/lib/seo";
import {
  nearMeIntroVariants,
  bestServiceVariants,
  localTrustVariants,
  advancedSafetyVariants,
  nearMeSearchTerms,
  whyChooseLocalVariants,
  citySafetyNetNearMeVariants,
  priceNearMeVariants,
  serviceAreaCoverageVariants,
} from "@/data/seoLongForm";

export interface SeoContentSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface SeoEnrichContext {
  seed: string;
  service?: Service;
  city?: City;
  area?: Area;
  /** Display location for copy, e.g. "MVP Colony, Visakhapatnam" */
  locationLabel: string;
  pageKind: "service" | "service-city" | "service-area" | "city" | "area" | "intent" | "price" | "local-intent" | "comparison" | "other";
}

function vars(ctx: SeoEnrichContext): Record<string, string> {
  const service = ctx.service?.name ?? "invisible grills and safety nets";
  const shortService = ctx.service?.shortName ?? "Safety Nets";
  return {
    service,
    shortService,
    pluralService: ctx.service?.pluralName ?? "safety nets and invisible grills",
    location: ctx.locationLabel,
    brand: site.name,
    phone: site.phone,
  };
}

export function buildExtraSeoSections(ctx: SeoEnrichContext): SeoContentSection[] {
  const v = vars(ctx);
  const seed = ctx.seed;

  const sections: SeoContentSection[] = [
    {
      heading: `${v.shortService} Near Me in ${v.location}`,
      paragraphs: [
        renderTemplate(pickBySeed(nearMeIntroVariants, `${seed}|nearme`), v),
        renderTemplate(pickBySeed(bestServiceVariants, `${seed}|best`), v),
      ],
    },
    {
      heading: `Best ${v.service} in ${v.location}`,
      paragraphs: [
        renderTemplate(pickBySeed(localTrustVariants, `${seed}|local`), v),
        renderTemplate(pickBySeed(advancedSafetyVariants, `${seed}|advanced`), v),
      ],
      items: whyChooseLocalVariants,
    },
    {
      heading: "Popular Local Searches We Help With",
      items: nearMeSearchTerms.map((t) => renderTemplate(t, v)),
    },
    {
      heading: `${v.service} Price Near Me in ${v.location}`,
      paragraphs: [renderTemplate(pickBySeed(priceNearMeVariants, `${seed}|price`), v)],
    },
    {
      heading: `Service Coverage in ${v.location}`,
      paragraphs: [renderTemplate(pickBySeed(serviceAreaCoverageVariants, `${seed}|coverage`), v)],
    },
  ];

  if (ctx.pageKind === "city" || ctx.service?.slug === "safety-nets" || ctx.service?.slug === "balcony-safety-nets") {
    sections.splice(1, 0, {
      heading: `Best Safety Nets Near Me in ${v.location}`,
      paragraphs: [renderTemplate(pickBySeed(citySafetyNetNearMeVariants, `${seed}|safetynets`), v)],
    });
  }

  return sections;
}

export function buildNearMeFaqs(ctx: SeoEnrichContext): FaqItem[] {
  const v = vars(ctx);
  const service = ctx.service?.name ?? "invisible grills and safety nets";
  const location = ctx.locationLabel;

  const faqs: FaqItem[] = [
    {
      question: `Where can I find ${service.toLowerCase()} near me in ${location}?`,
      answer: `${site.name} provides ${service.toLowerCase()} across ${location} with a free on-site inspection. Call or WhatsApp ${site.phone} to confirm coverage in your exact locality and book a visit.`,
    },
    {
      question: `Who offers the best ${service.toLowerCase()} near me in ${location}?`,
      answer: `The best ${service.toLowerCase()} near you depends on material quality, correct fitting for your opening, and local experience with ${location} building types. ${site.name} uses premium branded materials, in-house installers, and inspection-first quoting — call for a free site check.`,
    },
    {
      question: `How much does ${service.toLowerCase()} cost near me in ${location}?`,
      answer: `Pricing depends on area size, material grade, height, access, and number of openings. We share a clear quotation after a free inspection in ${location} — no fake online fixed rates.`,
    },
    {
      question: `Do you provide same-week ${service.toLowerCase()} installation near ${location}?`,
      answer: `In most ${location} localities we can schedule a free site visit quickly and plan installation based on material readiness and site access. WhatsApp ${site.phone} with your location for the earliest slot.`,
    },
  ];

  if (ctx.pageKind === "city" || !ctx.service || ctx.service.slug.includes("safety") || ctx.service.slug.includes("net")) {
    faqs.unshift({
      question: `Where can I find safety nets near me in ${location}?`,
      answer: `${site.name} installs balcony safety nets, children safety nets, pet safety nets, terrace safety nets, and pigeon nets near you in ${location}. Book a free inspection at ${site.phone}.`,
    });
  }

  return faqs;
}

export function enhanceSeoTitle(title: string, ctx: SeoEnrichContext): string {
  if (title.toLowerCase().includes("near me")) return title;
  const service = ctx.service?.shortName;
  const loc = ctx.locationLabel;

  if (ctx.pageKind === "service-city" && service) {
    return `Best ${service} Near Me in ${loc} | ${site.name}`;
  }
  if (ctx.pageKind === "service-area" && service) {
    return `Best ${service} Near Me in ${loc} | ${site.name}`;
  }
  if (ctx.pageKind === "city") {
    return `Best Safety Nets & Invisible Grills Near Me in ${loc} | ${site.name}`;
  }
  if (ctx.pageKind === "area") {
    return `Best Safety Nets Near Me in ${loc} | ${site.name}`;
  }
  if (ctx.pageKind === "service" && service) {
    return `Best ${service} Near Me in Andhra Pradesh | ${site.name}`;
  }
  return title;
}

export function enhanceSeoDescription(description: string, ctx: SeoEnrichContext): string {
  const service = (ctx.service?.name ?? "invisible grills, safety nets, and pigeon nets").toLowerCase();
  const loc = ctx.locationLabel;
  const enhanced = `${site.name} — best ${service} near you in ${loc}. Local installers, free site inspection, premium materials, fast response. Call ${site.phone} or WhatsApp for quote.`;
  return truncateDescription(enhanced, 160);
}

export function enrichPageSeo<
  T extends { title: string; metaDescription: string; sections: unknown[]; faqs: FaqItem[]; seoSections?: SeoContentSection[] },
>(content: T, ctx: SeoEnrichContext): T {
  const seoSections = buildExtraSeoSections(ctx);
  const extraFaqs = buildNearMeFaqs(ctx);
  const seenQuestions = new Set(content.faqs.map((f) => f.question));

  return {
    ...content,
    title: enhanceSeoTitle(content.title, ctx),
    metaDescription: enhanceSeoDescription(content.metaDescription, ctx),
    seoSections,
    faqs: [...content.faqs, ...extraFaqs.filter((f) => !seenQuestions.has(f.question))],
  };
}

export function seoContextFromFlat(resolved: {
  pageType: string;
  service?: Service;
  city?: City;
  area?: Area;
  slug: string;
}): SeoEnrichContext {
  const locationLabel =
    resolved.area && resolved.city
      ? `${resolved.area.name}, ${resolved.city.name}`
      : resolved.area?.name ?? resolved.city?.name ?? "Andhra Pradesh";

  const pageKindMap: Record<string, SeoEnrichContext["pageKind"]> = {
    service: "service",
    "service-city": "service-city",
    "service-area": "service-area",
    "service-area-city": "service-area",
    "local-intent-city": "local-intent",
    "local-intent-area": "local-intent",
    "hyperlocal-intent-area": "local-intent",
    intent: "intent",
    price: "price",
    comparison: "comparison",
  };

  return {
    seed: resolved.slug,
    service: resolved.service,
    city: resolved.city,
    area: resolved.area,
    locationLabel,
    pageKind: pageKindMap[resolved.pageType] ?? "other",
  };
}

export function seoContextForCity(city: City): SeoEnrichContext {
  return { seed: `city|${city.slug}`, city, locationLabel: city.name, pageKind: "city" };
}

export function seoContextForArea(area: Area, city?: City): SeoEnrichContext {
  return {
    seed: `area|${area.slug}`,
    area,
    city,
    locationLabel: city ? `${area.name}, ${city.name}` : area.name,
    pageKind: "area",
  };
}
