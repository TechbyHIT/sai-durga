import { services, servicesBySlug, Service } from "@/data/services";
import { cities, citiesBySlug, City, priorityCities } from "@/data/cities";
import { areas, areasBySlug, getAreasByCity, Area } from "@/data/areas";
import { intents, intentsBySlug, serviceExtraIntents, Intent, slugifyLabel } from "@/data/keywords";
import { comparisons, comparisonsBySlug, genericAlternatives, Comparison, GenericAlternative } from "@/data/comparisons";
import { localSeoModifiers, localSeoModifiersBySlug, hyperlocalAudiences, hyperlocalAudiencesBySlug, LocalSeoModifier, HyperlocalAudience } from "@/data/seoScale";
import { PRIORITY_LIMITS, HYPERLOCAL_INDEXED_AREA_COUNT } from "@/data/pageRules";
import {
  introVariants,
  whyImportantVariants,
  benefitsIntroVariants,
  installProcessVariants,
  priceFactorsIntroVariants,
  finalCtaVariants,
  nearbyAreasIntroVariants,
  localAreaIntroVariants,
  commonProblemsIntroVariants,
} from "@/data/contentBlocks";
import { businessFaqs, getServiceFaqs, buildPriceFaqs, buildComparisonFaqs, FaqItem } from "@/data/faqs";
import { pickBySeed, pickManyBySeed, renderTemplate, slugify } from "./slug";
import { getHeroImage, getGalleryImages, getInstallationPhotos, PageImage } from "./images";
import { LinkChip, servicePageLinks, serviceCityPageLinks, serviceAreaPageLinks, intentPageLinks, pricePageLinks, comparisonPageLinks, cityPageLinks, areaPageLinks, allServicesInCityLinks, allServicesInAreaLinks, cityProgrammaticLinks, areaProgrammaticLinks, navProgrammaticLinks } from "./internalLinks";
import { enrichPageSeo, seoContextFromFlat, seoContextForCity, seoContextForArea } from "./seoSections";
import { site } from "./site";

export type FlatPageType =
  | "service"
  | "service-city"
  | "service-area"
  | "service-area-city"
  | "local-intent-city"
  | "local-intent-area"
  | "hyperlocal-intent-area"
  | "intent"
  | "price"
  | "comparison";

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface ComparisonTableRow {
  label: string;
  a: string;
  b: string;
}

export interface PageContent {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  faqs: FaqItem[];
  heroImage: PageImage;
  galleryImages: PageImage[];
  /** Second photo grid — extra installation images from related categories. */
  installImages?: PageImage[];
  relatedLinks: LinkChip[];
  nearbyLinks: LinkChip[];
  /** All services linked to this city/area (location hub pages). */
  servicesInLocationLinks?: LinkChip[];
  /** Extra programmatic SEO pages (intents, modifiers, nav menu). */
  morePageLinks?: LinkChip[];
  locationName?: string;
  /** Extra long-form SEO blocks (near me, best, local intent) — rendered below the fold. */
  seoSections?: ContentSection[];
  breadcrumbs: LinkChip[];
  comparisonTable?: ComparisonTableRow[];
}

export interface ResolvedFlatPage {
  pageType: FlatPageType;
  slug: string;
  service?: Service;
  serviceB?: Service;
  isGenericComparisonB?: boolean;
  genericAlternativeB?: GenericAlternative;
  comparison?: Comparison;
  city?: City;
  area?: Area;
  intent?: Intent;
  seoModifier?: LocalSeoModifier;
  audience?: HyperlocalAudience;
  canonicalSlug: string;
}

// ---------------------------------------------------------------------------
// Slug resolution — every combination is *parsed*, never eagerly enumerated,
// which is what allows this to scale to hundreds of thousands of theoretical
// URLs while the actual "database" (data/*.ts) stays a few hundred rows.
// ---------------------------------------------------------------------------

const servicesByLengthDesc = [...services].sort((a, b) => b.slug.length - a.slug.length);

const priceSlugToService: Record<string, Service> = Object.fromEntries(
  services.map((s) => [`${slugify(s.shortName)}-price`, s]),
);

// ---------------------------------------------------------------------------
// Hyperlocal promotion — the top-ranked areas (priority → standard → emerging)
// get their audience-specific pages indexed as standalone, self-canonical URLs.
// Everything below the cut still renders but canonicalizes to the broader
// local-intent-area page, so we never publish near-duplicate long-tail pages
// for weak-demand areas. This single ordered set is what turns hundreds of
// thousands of theoretical URLs into a controlled ~400k indexed footprint.
// ---------------------------------------------------------------------------

const AREA_TIER_RANK: Record<string, number> = { priority: 0, standard: 1, emerging: 2 };

const rankedAreas: Area[] = [...areas].sort(
  (a, b) => (AREA_TIER_RANK[a.tier] ?? 3) - (AREA_TIER_RANK[b.tier] ?? 3),
);

const promotedHyperlocalAreaSlugs: Set<string> = new Set(
  rankedAreas.slice(0, HYPERLOCAL_INDEXED_AREA_COUNT).map((a) => a.slug),
);

/** True when an area is ranked high enough for its hyperlocal pages to be indexed directly. */
export function isHyperlocalAreaPromoted(areaSlug: string): boolean {
  return promotedHyperlocalAreaSlugs.has(areaSlug);
}

/** The ordered list of areas whose hyperlocal pages are indexed (used by sitemap + stats). */
export function getPromotedHyperlocalAreas(): Area[] {
  return rankedAreas.slice(0, HYPERLOCAL_INDEXED_AREA_COUNT);
}

function matchServicePrefix(slug: string, connector: string): { service: Service; rest: string } | null {
  for (const svc of servicesByLengthDesc) {
    const prefix = `${svc.slug}${connector}`;
    if (slug.startsWith(prefix) && slug.length > prefix.length) {
      return { service: svc, rest: slug.slice(prefix.length) };
    }
  }
  return null;
}

function matchServiceLoosePrefix(slug: string): { service: Service; rest: string } | null {
  for (const svc of servicesByLengthDesc) {
    const prefix = `${svc.slug}-`;
    if (slug.startsWith(prefix) && slug.length > prefix.length) {
      return { service: svc, rest: slug.slice(prefix.length) };
    }
  }
  return null;
}

function tryHyperlocalIntentArea(slug: string): ResolvedFlatPage | null {
  const m = matchServiceLoosePrefix(slug);
  if (!m) return null;
  const locationMarker = "-in-";
  const audienceMarker = "-for-";
  const locationIndex = m.rest.lastIndexOf(locationMarker);
  if (locationIndex <= 0) return null;

  const descriptor = m.rest.slice(0, locationIndex);
  const areaSlug = m.rest.slice(locationIndex + locationMarker.length);
  const audienceIndex = descriptor.lastIndexOf(audienceMarker);
  if (audienceIndex <= 0) return null;

  const modifierSlug = descriptor.slice(0, audienceIndex);
  const audienceSlug = descriptor.slice(audienceIndex + audienceMarker.length);
  const modifier = localSeoModifiersBySlug[modifierSlug];
  const audience = hyperlocalAudiencesBySlug[audienceSlug];
  const area = areasBySlug[areaSlug];
  if (!modifier || !audience || !area) return null;

  // Promoted (top-ranked) areas keep their own canonical so the page is indexed as a
  // distinct, audience-specific URL. Weaker areas canonicalize to the broader page.
  const promoted = isHyperlocalAreaPromoted(area.slug);

  return {
    pageType: "hyperlocal-intent-area",
    slug,
    service: m.service,
    area,
    city: citiesBySlug[area.parentCitySlug],
    seoModifier: modifier,
    audience,
    canonicalSlug: promoted ? slug : `${m.service.slug}-${modifier.slug}-in-${area.slug}`,
  };
}

function tryLocalIntentLocation(slug: string): ResolvedFlatPage | null {
  const m = matchServiceLoosePrefix(slug);
  if (!m) return null;
  const marker = "-in-";
  const markerIndex = m.rest.lastIndexOf(marker);
  if (markerIndex <= 0) return null;

  const modifierSlug = m.rest.slice(0, markerIndex);
  const locationSlug = m.rest.slice(markerIndex + marker.length);
  const modifier = localSeoModifiersBySlug[modifierSlug];
  if (!modifier) return null;

  const area = areasBySlug[locationSlug];
  if (area) {
    return {
      pageType: "local-intent-area",
      slug,
      service: m.service,
      area,
      city: citiesBySlug[area.parentCitySlug],
      seoModifier: modifier,
      canonicalSlug: slug,
    };
  }

  const city = citiesBySlug[locationSlug];
  if (city) {
    return {
      pageType: "local-intent-city",
      slug,
      service: m.service,
      city,
      seoModifier: modifier,
      canonicalSlug: `${m.service.slug}-in-${city.slug}`,
    };
  }

  return null;
}

export function isValidIntentForService(service: Service, intentSlug: string): boolean {
  const propertySlugs = service.propertyTypes.map(slugifyLabel);
  if (propertySlugs.includes(intentSlug)) return true;
  return (serviceExtraIntents[service.slug] ?? []).includes(intentSlug);
}

function tryServiceAreaCity(slug: string): ResolvedFlatPage | null {
  const m = matchServicePrefix(slug, "-in-");
  if (!m) return null;
  for (const city of cities) {
    const suffix = `-${city.slug}`;
    if (m.rest.endsWith(suffix) && m.rest.length > suffix.length) {
      const areaSlugCandidate = m.rest.slice(0, m.rest.length - suffix.length);
      const area = areasBySlug[areaSlugCandidate];
      if (area && area.parentCitySlug === city.slug) {
        return {
          pageType: "service-area-city",
          slug,
          service: m.service,
          city,
          area,
          canonicalSlug: `${m.service.slug}-in-${area.slug}`,
        };
      }
    }
  }
  return null;
}

function tryServiceArea(slug: string): ResolvedFlatPage | null {
  const m = matchServicePrefix(slug, "-in-");
  if (!m) return null;
  const area = areasBySlug[m.rest];
  if (!area) return null;
  return {
    pageType: "service-area",
    slug,
    service: m.service,
    area,
    city: citiesBySlug[area.parentCitySlug],
    canonicalSlug: slug,
  };
}

function tryServiceCity(slug: string): ResolvedFlatPage | null {
  const m = matchServicePrefix(slug, "-in-");
  if (!m) return null;
  const city = citiesBySlug[m.rest];
  if (!city) return null;
  return { pageType: "service-city", slug, service: m.service, city, canonicalSlug: slug };
}

function tryIntent(slug: string): ResolvedFlatPage | null {
  const m = matchServicePrefix(slug, "-for-");
  if (!m) return null;
  const intent = intentsBySlug[m.rest];
  if (!intent) return null;
  if (!isValidIntentForService(m.service, intent.slug)) return null;
  return { pageType: "intent", slug, service: m.service, intent, canonicalSlug: slug };
}

function tryPrice(slug: string): ResolvedFlatPage | null {
  const service = priceSlugToService[slug];
  if (!service) return null;
  return { pageType: "price", slug, service, canonicalSlug: slug };
}

function tryComparison(slug: string): ResolvedFlatPage | null {
  const comparison = comparisonsBySlug[slug];
  if (!comparison) return null;
  const serviceA = servicesBySlug[comparison.serviceASlug];
  if (!serviceA) return null;
  const serviceB = comparison.isGenericB ? undefined : servicesBySlug[comparison.serviceBSlug];
  const genericAlternativeB = comparison.isGenericB ? genericAlternatives[comparison.serviceBSlug] : undefined;
  return {
    pageType: "comparison",
    slug,
    service: serviceA,
    serviceB,
    isGenericComparisonB: comparison.isGenericB,
    genericAlternativeB,
    comparison,
    canonicalSlug: slug,
  };
}

function tryPlainService(slug: string): ResolvedFlatPage | null {
  const service = servicesBySlug[slug];
  if (!service) return null;
  return { pageType: "service", slug, service, canonicalSlug: slug };
}

export function resolveFlatSlug(slug: string): ResolvedFlatPage | null {
  return (
    tryComparison(slug) ||
    tryPrice(slug) ||
    tryHyperlocalIntentArea(slug) ||
    tryLocalIntentLocation(slug) ||
    tryServiceAreaCity(slug) ||
    tryServiceArea(slug) ||
    tryServiceCity(slug) ||
    tryIntent(slug) ||
    tryPlainService(slug) ||
    null
  );
}

// ---------------------------------------------------------------------------
// Content assembly
// ---------------------------------------------------------------------------

function v(templates: readonly string[], seed: string, vars: Record<string, string>): string {
  return renderTemplate(pickBySeed(templates, seed), vars);
}

function locationName(resolved: ResolvedFlatPage): string {
  if (resolved.area && resolved.city && resolved.pageType === "service-area-city") {
    return `${resolved.area.name}, ${resolved.city.name}`;
  }
  if (resolved.area) return resolved.area.name;
  if (resolved.city) return resolved.city.name;
  return "Andhra Pradesh";
}

export function buildFlatPageContent(resolved: ResolvedFlatPage): PageContent {
  let content!: PageContent;
  switch (resolved.pageType) {
    case "service":
      content = buildServiceContent(resolved.service!);
      break;
    case "service-city":
      content = buildServiceCityContent(resolved.service!, resolved.city!);
      break;
    case "service-area":
      content = buildServiceAreaContent(resolved.service!, resolved.area!, resolved.city);
      break;
    case "service-area-city":
      content = buildServiceAreaCityContent(resolved.service!, resolved.area!, resolved.city!);
      break;
    case "local-intent-city":
      content = buildLocalIntentContent(resolved.service!, resolved.seoModifier!, resolved.city!, undefined, resolved.audience);
      break;
    case "local-intent-area":
    case "hyperlocal-intent-area":
      content = buildLocalIntentContent(resolved.service!, resolved.seoModifier!, resolved.area!, resolved.city, resolved.audience);
      break;
    case "intent":
      content = buildIntentContent(resolved.service!, resolved.intent!);
      break;
    case "price":
      content = buildPriceContent(resolved.service!);
      break;
    case "comparison":
      content = buildComparisonContent(resolved.comparison!, resolved.service!, resolved.serviceB, resolved.genericAlternativeB);
      break;
  }
  return enrichPageSeo(attachExtraGalleries(attachLocationLinks(content, resolved), resolved), seoContextFromFlat(resolved));
}

function attachExtraGalleries(content: PageContent, resolved: ResolvedFlatPage): PageContent {
  const categories = resolved.service?.imageCategories ?? ["safety-nets-balcony", "invisible-grill-balcony"];
  const extra = ["safety-nets-balcony", "invisible-grill-balcony", "duct-area-nets", "children-safety-nets"];
  const seed = resolved.slug;
  const alt = content.h1;

  return {
    ...content,
    galleryImages: getGalleryImages(categories, seed, alt, 8),
    installImages: getInstallationPhotos(categories, extra, seed, alt, 6),
  };
}

function attachHubGalleries(content: PageContent, seed: string, alt: string): PageContent {
  const categories = ["safety-nets-balcony", "invisible-grill-balcony", "duct-area-nets", "cricket-nets"];
  return {
    ...content,
    galleryImages: getGalleryImages(categories, seed, alt, 8),
    installImages: getInstallationPhotos(categories, ["children-safety-nets", "pet-safety-nets", "spikes", "cloth-hangers"], seed, alt, 6),
  };
}

function attachLocationLinks(content: PageContent, resolved: ResolvedFlatPage): PageContent {
  const city = resolved.city;
  const area = resolved.area;
  const parentCity = area ? citiesBySlug[area.parentCitySlug] : undefined;

  if (content.servicesInLocationLinks?.length) {
    return content;
  }

  return {
    ...content,
    locationName: content.locationName ?? city?.name ?? area?.name,
    servicesInLocationLinks: city
      ? allServicesInCityLinks(city)
      : area
        ? allServicesInAreaLinks(area)
        : undefined,
    morePageLinks:
      content.morePageLinks ??
      (city ? cityProgrammaticLinks(city) : area ? areaProgrammaticLinks(area, parentCity) : navProgrammaticLinks()),
  };
}

function buildServiceContent(service: Service): PageContent {
  const seed = service.slug;
  const vars = { service: service.name, pluralService: service.pluralName, location: "Andhra Pradesh", brand: site.name };
  const { related, nearby } = servicePageLinks(service);
  const faqs = [...getServiceFaqs(service.slug), ...businessFaqs];
  const heroImage = getHeroImage(service.imageCategories, seed, `${service.name} installation by ${site.name}`);

  return {
    title: `${service.name} Installation | ${site.name}`,
    metaDescription: `Professional ${service.name.toLowerCase()} for apartments, villas, balconies, windows, and commercial buildings across coastal Andhra Pradesh. Call ${site.name} for a free quote.`,
    h1: service.name,
    intro: v(introVariants, `${seed}|intro`, vars),
    sections: [
      { heading: `Why ${service.name} Matters`, paragraphs: [v(whyImportantVariants, `${seed}|why`, vars)] },
      { heading: "Common Customer Problems", items: service.problems },
      { heading: `Benefits of ${service.name}`, items: service.benefits },
      { heading: "Where We Install", items: service.installLocations },
      { heading: "Materials Used", items: service.materials },
      { heading: "Installation Process", items: pickBySeed(installProcessVariants, `${seed}|process`) },
      { heading: "Price Factors", items: service.priceFactors },
      {
        heading: "Popular Locations",
        items: priorityCities.slice(0, 8).map((c) => `${service.name} in ${c.name}`),
      },
    ],
    faqs,
    heroImage,
    galleryImages: getGalleryImages(service.imageCategories, seed, `${service.name} by ${site.name}`),
    relatedLinks: related,
    nearbyLinks: nearby,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: service.name, href: `/${service.slug}` },
    ],
  };
}

function buildServiceCityContent(service: Service, city: City): PageContent {
  const seed = `${service.slug}|${city.slug}`;
  const vars = { service: service.name, pluralService: service.pluralName, location: city.name, brand: site.name };
  const { related, nearby } = serviceCityPageLinks(service, city);
  const areasInCity = getAreasByCity(city.slug);
  const faqs: FaqItem[] = [
    ...getServiceFaqs(service.slug),
    {
      question: `Do you cover all areas of ${city.name}?`,
      answer: `Yes — we install ${service.name.toLowerCase()} across ${city.name}, including ${
        areasInCity.slice(0, 3).map((a) => a.name).join(", ") || "the main residential localities"
      }, with the exact schedule confirmed after your free site visit.`,
    },
  ];

  return {
    title: `${service.name} in ${city.name} | ${site.name}`,
    metaDescription: `Get ${service.name.toLowerCase()} in ${city.name} for balconies, windows, apartments, villas, commercial buildings, and high-rise buildings. Call ${site.name} for a free quote.`,
    h1: `${service.name} in ${city.name}`,
    intro: v(introVariants, `${seed}|intro`, vars),
    sections: [
      {
        heading: `Why ${service.name} is Important in ${city.name}`,
        paragraphs: [v(whyImportantVariants, `${seed}|why`, vars), city.localNote, city.climateNote],
      },
      { heading: "Common Customer Problems", items: service.problems },
      { heading: `Benefits of ${service.name}`, items: service.benefits },
      { heading: "Where We Install", items: service.installLocations },
      { heading: "Materials Used", items: service.materials },
      { heading: "Installation Process", items: pickBySeed(installProcessVariants, `${seed}|process`) },
      {
        heading: "Price Factors",
        paragraphs: [v(priceFactorsIntroVariants, `${seed}|pricef`, vars)],
        items: service.priceFactors,
      },
      {
        heading: `Nearby Areas Covered in ${city.name}`,
        paragraphs: areasInCity.length ? [v(nearbyAreasIntroVariants, `${seed}|nearby`, vars)] : undefined,
        items: areasInCity.slice(0, 10).map((a) => a.name),
      },
      {
        heading: `Related Services in ${city.name}`,
        items: services.filter((s) => s.slug !== service.slug).map((s) => s.name),
      },
    ],
    faqs,
    heroImage: getHeroImage(service.imageCategories, seed, `${service.name} installation in ${city.name}`),
    galleryImages: getGalleryImages(service.imageCategories, seed, `${service.name} in ${city.name}`),
    relatedLinks: related,
    nearbyLinks: nearby,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: service.name, href: `/${service.slug}` },
      { label: city.name, href: `/${service.slug}-in-${city.slug}` },
    ],
  };
}

function buildServiceAreaContent(service: Service, area: Area, city: City | undefined): PageContent {
  const seed = `${service.slug}|${area.slug}`;
  const vars = { service: service.name, pluralService: service.pluralName, location: area.name, city: city?.name ?? "", brand: site.name };
  const { related, nearby } = serviceAreaPageLinks(service, area, city);
  const faqs: FaqItem[] = [...getServiceFaqs(service.slug), businessFaqs[0]];

  return {
    title: `${service.name} in ${area.name} | ${site.name}`,
    metaDescription: `Get ${service.name.toLowerCase()} in ${area.name}${city ? `, ${city.name}` : ""} for apartments, villas, balconies, and commercial buildings. Call ${site.name} for a free quote.`,
    h1: `${service.name} in ${area.name}`,
    intro: renderTemplate(pickBySeed(localAreaIntroVariants, `${seed}|intro`), {
      areaName: area.name,
      city: city?.name ?? "your city",
      areaNote: area.localNote,
      service: service.name.toLowerCase(),
    }),
    sections: [
      {
        heading: `Why Customers in ${area.name} Need ${service.name}`,
        paragraphs: [area.localNote, v(whyImportantVariants, `${seed}|why`, vars)],
      },
      { heading: "Common Problems Solved", items: service.problems },
      { heading: "Best Use Cases", items: service.installLocations },
      { heading: "Apartment and Villa Solutions", paragraphs: [
        `In ${area.name}, most homes are ${service.propertyTypes.slice(0, 3).join(", ")} — our team custom-fits ${service.name.toLowerCase()} to each layout rather than a one-size-fits-all approach.`,
      ] },
      { heading: "Materials Used", items: service.materials },
      { heading: "Installation Process", items: pickBySeed(installProcessVariants, `${seed}|process`) },
      { heading: "Price Factors", items: service.priceFactors },
      {
        heading: "Nearby Areas",
        items: nearby.slice(0, 6).map((l) => l.label),
      },
      ...(city ? [{ heading: "Related City Page", items: [`${service.name} in ${city.name}`] }] : []),
    ],
    faqs,
    heroImage: getHeroImage(service.imageCategories, seed, `${service.name} installation in ${area.name}`),
    galleryImages: getGalleryImages(service.imageCategories, seed, `${service.name} in ${area.name}`),
    relatedLinks: related,
    nearbyLinks: nearby,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: service.name, href: `/${service.slug}` },
      { label: area.name, href: `/${service.slug}-in-${area.slug}` },
    ],
  };
}

function buildServiceAreaCityContent(service: Service, area: Area, city: City): PageContent {
  const base = buildServiceAreaContent(service, area, city);
  return {
    ...base,
    title: `${service.name} in ${area.name}, ${city.name} | ${site.name}`,
    h1: `${service.name} in ${area.name}, ${city.name}`,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: service.name, href: `/${service.slug}` },
      { label: city.name, href: `/${service.slug}-in-${city.slug}` },
      { label: area.name, href: `/${service.slug}-in-${area.slug}-${city.slug}` },
    ],
  };
}

function buildLocalIntentContent(
  service: Service,
  modifier: LocalSeoModifier,
  location: Area | City,
  parentCity?: City,
  audience?: HyperlocalAudience,
): PageContent {
  const isArea = "parentCitySlug" in location;
  const area = isArea ? location : undefined;
  const city = isArea ? parentCity : location;
  const locationName = isArea && city ? `${location.name}, ${city.name}` : location.name;
  const seed = `${service.slug}|${modifier.slug}|${location.slug}|${audience?.slug ?? "general"}`;
  const baseLinks = area ? serviceAreaPageLinks(service, area, city) : serviceCityPageLinks(service, city!);
  const audienceText = audience ? ` for ${audience.label}` : "";
  const pagePhrase = `${service.name} ${modifier.label}${audienceText}`;
  const faqs: FaqItem[] = [
    {
      question: `Do you provide ${service.name.toLowerCase()} ${modifier.searchPhrase} in ${location.name}?`,
      answer: `Yes, ${site.name} provides ${service.name.toLowerCase()} ${modifier.searchPhrase} in ${location.name}${city && isArea ? ` and nearby areas of ${city.name}` : ""}. We confirm the exact requirement after a free site inspection.`,
    },
    {
      question: `Can I get a free quote for ${pagePhrase.toLowerCase()}?`,
      answer: `Yes. Share your location, photos if available, and the type of opening or site area. Our team will inspect the space and give a clear quote covering material, fittings, and labour.`,
    },
    {
      question: `How fast can ${service.name.toLowerCase()} work be completed in ${location.name}?`,
      answer: `Most standard jobs can be measured quickly and scheduled based on team availability, site access, floor height, and material readiness. We confirm timelines during the inspection.`,
    },
    businessFaqs[0],
  ];

  const related: LinkChip[] = [
    { label: `${service.name} Overview`, href: `/${service.slug}` },
    ...(city ? [{ label: `${service.name} in ${city.name}`, href: `/${service.slug}-in-${city.slug}` }] : []),
    { label: `${service.shortName} Price Guide`, href: `/${slugify(service.shortName)}-price` },
    { label: "Contact Us", href: "/contact" },
    ...baseLinks.related.slice(0, 4),
  ];

  const nearby = [
    ...baseLinks.nearby.slice(0, 8),
    ...(area && city ? [{ label: `All services in ${area.name}`, href: `/areas/${area.slug}` }] : []),
    ...(city ? [{ label: `${city.name} Locations Hub`, href: `/locations/${city.slug}` }] : []),
  ];

  // Sibling areas in the same city — real internal links plus extra local keyword coverage.
  const siblingAreas = area && city
    ? getAreasByCity(city.slug).filter((a) => a.slug !== area.slug).slice(0, 8)
    : [];

  // Related keyword phrases built from modifier synonyms so each page surfaces the
  // long-tail variations customers actually type, without spinning up new URLs for them.
  const keywordModifiers = pickManyBySeed(localSeoModifiers, `${seed}|kw`, 8).filter((mod) => mod.slug !== modifier.slug);
  const relatedSearches = keywordModifiers.map(
    (mod) => `${service.name} ${mod.label.toLowerCase()} in ${location.name}`,
  );
  const audienceSearches = hyperlocalAudiences
    .filter((a) => a.slug !== audience?.slug)
    .slice(0, 4)
    .map((a) => `${service.name} for ${a.label.toLowerCase()} in ${location.name}`);

  return {
    title: `${pagePhrase} in ${location.name} | ${site.name}`,
    metaDescription: `Get ${pagePhrase.toLowerCase()} in ${locationName} for balconies, windows, apartments, villas, and commercial buildings. Free site inspection from ${site.name}.`,
    h1: `${pagePhrase} in ${location.name}`,
    intro: `${site.name} provides ${pagePhrase.toLowerCase()} in ${locationName} with practical site inspection, clear material guidance, and clean installation. ${modifier.description} Every recommendation is based on the actual space, floor height, wall condition, and customer requirement rather than a generic online estimate.`,
    sections: [
      {
        heading: `${pagePhrase} for Local Customers in ${location.name}`,
        paragraphs: [
          `${location.name} customers usually need quick guidance on material, fitting style, durability, and price before booking installation. This page focuses on ${modifier.searchPhrase} intent for ${service.name.toLowerCase()}, so visitors can understand what to check before calling for a site visit.`,
          isArea && city
            ? `${location.name} is part of the wider ${city.name} service zone, which helps our team plan travel, material movement, and installation slots more accurately for apartments, independent homes, villas, and commercial buildings.`
            : `${location.name} is one of our active service cities, so the same installation standards, material guidance, and free inspection process apply across its local areas.`,
        ],
      },
      {
        heading: "What This Page Helps You Decide",
        paragraphs: [
          `This page is useful if you are comparing providers, checking ${modifier.searchPhrase} options, planning a quote, or trying to understand whether ${service.name.toLowerCase()} is suitable for your balcony, window, terrace, duct, or building type.`,
        ],
        items: [
          `Whether ${service.name.toLowerCase()} is suitable for your specific space`,
          "Which material and fitting method makes sense for long-term use",
          "How site access, height, and custom corners affect the final quote",
          "What details to share before booking a free inspection",
        ],
      },
      { heading: "Common Problems Solved", items: service.problems },
      { heading: `Benefits of ${service.name}`, paragraphs: [v(benefitsIntroVariants, `${seed}|benefits`, { service: service.name, pluralService: service.pluralName, location: location.name })], items: service.benefits },
      {
        heading: audience ? `Best For ${audience.label}` : "Best Use Cases",
        paragraphs: [
          audience
            ? `${audience.description} For ${audience.sentenceLabel}, the right installation should balance safety, visibility, durability, and maintenance instead of only chasing the lowest quote.`
            : `${service.name} can be adapted for different building layouts. The best result comes from measuring each opening and selecting the right material, border support, and anchor method for the actual site.`,
        ],
        items: service.installLocations,
      },
      { heading: "Materials and Fittings", paragraphs: [`Material choice matters for ${modifier.searchPhrase} pages because customers often compare price without knowing what is included. ${site.name} explains wire/net/rope/fitting options clearly before installation so the quote is not misleading.`], items: service.materials },
      { heading: "Installation Process", items: pickBySeed(installProcessVariants, `${seed}|process`) },
      { heading: "Price and Quote Factors", paragraphs: [v(priceFactorsIntroVariants, `${seed}|price`, { service: service.name, pluralService: service.pluralName, location: location.name })], items: service.priceFactors },
      {
        heading: `Why Choose ${site.name}`,
        items: [
          "Free, no-obligation site inspection before the final quote",
          "Local installation planning for the exact area and building type",
          "Clear explanation of material, fitting method, and maintenance",
          "Call and WhatsApp support for quick booking and follow-up",
        ],
      },
      {
        heading: `Popular ${service.name} Searches in ${location.name}`,
        paragraphs: [
          `Customers in ${location.name} look for ${service.name.toLowerCase()} in many different ways depending on their building, budget, and priority. If you are searching for any of the terms below, this is the right page to start from — every request goes through the same free inspection and honest quote process.`,
        ],
        items: [...relatedSearches, ...audienceSearches],
      },
      ...(siblingAreas.length
        ? [{
            heading: `Areas We Also Cover Near ${location.name}`,
            paragraphs: [
              `${site.name} installs ${service.name.toLowerCase()} across ${city?.name ?? "the wider region"}. If you are close to ${location.name}, we also serve these nearby localities with the same team and material standards.`,
            ],
            items: siblingAreas.map((a) => `${service.name} in ${a.name}`),
          }]
        : []),
    ],
    faqs,
    heroImage: getHeroImage(service.imageCategories, seed, `${pagePhrase} in ${location.name}`),
    galleryImages: getGalleryImages(service.imageCategories, seed, `${pagePhrase} in ${location.name}`),
    relatedLinks: related,
    nearbyLinks: [
      ...nearby,
      ...siblingAreas.slice(0, 6).map((a) => ({ label: `${service.shortName} in ${a.name}`, href: `/${service.slug}-in-${a.slug}` })),
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: service.name, href: `/${service.slug}` },
      ...(city ? [{ label: city.name, href: `/locations/${city.slug}` }] : []),
      ...(area ? [{ label: area.name, href: `/areas/${area.slug}` }] : []),
      { label: modifier.label, href: `/${service.slug}-${modifier.slug}-in-${location.slug}` },
    ],
  };
}

function buildIntentContent(service: Service, intent: Intent): PageContent {
  const seed = `${service.slug}|for|${intent.slug}`;
  const vars = { service: service.name, pluralService: service.pluralName, location: intent.sentenceLabel, brand: site.name };
  const { related, nearby } = intentPageLinks(service, intent);
  const benefitsIntro = v(benefitsIntroVariants, `${seed}|benefitsIntro`, vars);
  const commonProblemsIntro = v(commonProblemsIntroVariants, `${seed}|problemsIntro`, vars);

  return {
    title: `${service.name} for ${intent.label} | ${site.name}`,
    metaDescription: `${service.name} designed for ${intent.sentenceLabel} — professional installation from ${site.name} with a free site inspection and quote.`,
    h1: `${service.name} for ${intent.label}`,
    intro: `${service.summary} This page focuses specifically on ${intent.description.toLowerCase()} — from material choice through to the installation process — so you know exactly what to expect for this particular use case.`,
    sections: [
      {
        heading: `Why ${service.name} Works Well for ${intent.label}`,
        paragraphs: [v(whyImportantVariants, `${seed}|why`, vars)],
      },
      { heading: "Common Problems This Solves", paragraphs: [commonProblemsIntro], items: service.problems },
      { heading: "Key Benefits", paragraphs: [benefitsIntro], items: service.benefits },
      { heading: "Installation Considerations", items: service.installLocations },
      { heading: "Materials Used", items: service.materials },
      { heading: "Installation Process", items: pickBySeed(installProcessVariants, `${seed}|process`) },
      { heading: "Price Factors", items: service.priceFactors },
    ],
    faqs: [...getServiceFaqs(service.slug), businessFaqs[0]],
    heroImage: getHeroImage(service.imageCategories, seed, `${service.name} for ${intent.label}`),
    galleryImages: getGalleryImages(service.imageCategories, seed, `${service.name} for ${intent.label}`),
    relatedLinks: related,
    nearbyLinks: nearby,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: service.name, href: `/${service.slug}` },
      { label: intent.label, href: `/${service.slug}-for-${intent.slug}` },
    ],
  };
}

function buildPriceContent(service: Service): PageContent {
  const seed = `${service.slug}|price`;
  const { related, nearby } = pricePageLinks(service);

  return {
    title: `${service.shortName} Price Guide | ${site.name}`,
    metaDescription: `Understand what affects ${service.shortName.toLowerCase()} pricing — material, area, installation difficulty, and more. Get an accurate free quote from ${site.name}.`,
    h1: `${service.name} Price Guide`,
    intro: `${service.name} pricing depends on your exact space, material choice, and site conditions — this guide explains what genuinely affects the cost so you know what to expect before requesting a free, no-obligation quote from ${site.name}. We deliberately avoid publishing a fixed per-square-foot rate online, because two sites with the same area can have very different final costs once access, height, and finish are factored in.`,
    sections: [
      { heading: `What Affects ${service.shortName} Price`, items: service.priceFactors },
      { heading: "Material Quality", items: service.materials },
      { heading: "Area Size", paragraphs: ["Total running feet or square feet of the space directly drives material quantity and labour time — larger continuous runs are typically more cost-efficient per foot than several small, broken-up sections."] },
      { heading: "Installation Difficulty", paragraphs: ["Ground-floor, easy-access installations are quicker than high-floor or obstructed sites. Awkward angles, existing fixtures, and limited working space can all add time to the job."] },
      { heading: "Floor Height", paragraphs: ["Higher floors may need additional safety measures and time during installation, which can affect labour cost. Our team carries the right equipment for high-rise access as standard."] },
      { heading: "Custom Fitting", paragraphs: ["Irregular shapes, pillars, or existing grills require custom measurement and fitting, affecting both material and labour. We measure every opening individually rather than estimating from a floor plan."] },
      { heading: "Maintenance", paragraphs: ["Well-installed systems need minimal upkeep — occasional inspection is usually enough to keep them performing for years, even in coastal humidity and salt-air conditions."] },
      { heading: "How to Get an Accurate Quotation", paragraphs: [`Share your location and rough requirement with ${site.name}, and we'll schedule a free site inspection to give you a firm, no-obligation quote covering material, fittings, and installation labour together.`] },
    ],
    faqs: buildPriceFaqs(service.name),
    heroImage: getHeroImage(service.imageCategories, seed, `${service.name} price guide`),
    galleryImages: getGalleryImages(service.imageCategories, seed, `${service.name} pricing`),
    relatedLinks: related,
    nearbyLinks: nearby,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: service.name, href: `/${service.slug}` },
      { label: "Price Guide", href: `/${slugify(service.shortName)}-price` },
    ],
  };
}

function buildComparisonContent(
  comparison: Comparison,
  serviceA: Service,
  serviceB: Service | undefined,
  genericB: GenericAlternative | undefined,
): PageContent {
  const nameB = serviceB?.name ?? genericB?.name ?? "Alternative";
  const seed = comparison.slug;
  const { related, nearby } = comparisonPageLinks(comparison, serviceA, serviceB);

  const table: ComparisonTableRow[] = [
    { label: "Best for balcony safety", a: comparison.bestForBalcony === "A" ? "Yes" : comparison.bestForBalcony === "tie" ? "Yes" : "—", b: comparison.bestForBalcony === "B" ? "Yes" : comparison.bestForBalcony === "tie" ? "Yes" : "—" },
    { label: "Best for child safety", a: comparison.bestForChildSafety === "A" ? "Yes" : comparison.bestForChildSafety === "tie" ? "Yes" : "—", b: comparison.bestForChildSafety === "B" ? "Yes" : comparison.bestForChildSafety === "tie" ? "Yes" : "—" },
    { label: "Best for pet safety", a: comparison.bestForPetSafety === "A" ? "Yes" : comparison.bestForPetSafety === "tie" ? "Yes" : "—", b: comparison.bestForPetSafety === "B" ? "Yes" : comparison.bestForPetSafety === "tie" ? "Yes" : "—" },
    { label: "Best for pigeon control", a: comparison.bestForPigeonControl === "A" ? "Yes" : comparison.bestForPigeonControl === "tie" ? "Yes" : "—", b: comparison.bestForPigeonControl === "B" ? "Yes" : comparison.bestForPigeonControl === "tie" ? "Yes" : "—" },
  ];

  return {
    title: `${serviceA.name} vs ${nameB} | ${site.name}`,
    metaDescription: `${serviceA.name} vs ${nameB}: a practical, honest comparison covering cost, maintenance, appearance, and which is best for your situation.`,
    h1: `${serviceA.name} vs ${nameB}`,
    intro: `Choosing between ${serviceA.name.toLowerCase()} and ${nameB.toLowerCase()}? Here's an honest, practical comparison to help you decide based on your balcony, family, and budget — covering cost, maintenance, appearance, and which option genuinely fits which situation.`,
    sections: [
      {
        heading: "Quick Overview",
        paragraphs: [
          `Both ${serviceA.name.toLowerCase()} and ${nameB.toLowerCase()} are common choices for balcony and terrace protection in coastal Andhra Pradesh, but they solve slightly different problems and suit different budgets, building types, and priorities. The comparison below breaks down each factor individually so you can match the right option to your specific space rather than relying on a generic recommendation.`,
        ],
      },
      { heading: "Best for Balcony Safety", paragraphs: [describeWinner(comparison.bestForBalcony, serviceA.name, nameB)] },
      { heading: "Best for Child Safety", paragraphs: [describeWinner(comparison.bestForChildSafety, serviceA.name, nameB)] },
      { heading: "Best for Pet Safety", paragraphs: [describeWinner(comparison.bestForPetSafety, serviceA.name, nameB)] },
      { heading: "Best for Pigeon Control", paragraphs: [describeWinner(comparison.bestForPigeonControl, serviceA.name, nameB)] },
      { heading: "Cost Factors", paragraphs: [comparison.costNote] },
      { heading: "Maintenance Comparison", paragraphs: [comparison.maintenanceNote] },
      { heading: "Appearance Comparison", paragraphs: [comparison.appearanceNote] },
      { heading: "Expert Recommendation", paragraphs: [comparison.expertRecommendation] },
      {
        heading: "Which Should You Choose?",
        paragraphs: [
          `There is no universally "better" option — the right choice depends on your building type, budget, and whether unobstructed views or maximum physical barrier strength matters more to you. ${site.name} inspects your specific space for free before recommending ${serviceA.name.toLowerCase()}, ${nameB.toLowerCase()}, or a combination of both.`,
        ],
      },
    ],
    faqs: buildComparisonFaqs(serviceA.name, nameB),
    heroImage: getHeroImage(serviceA.imageCategories, seed, `${serviceA.name} vs ${nameB}`),
    galleryImages: getGalleryImages(serviceA.imageCategories, seed, `${serviceA.name} vs ${nameB}`),
    relatedLinks: related,
    nearbyLinks: nearby,
    comparisonTable: table,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Compare", href: "/compare" },
      { label: `${serviceA.name} vs ${nameB}`, href: `/${comparison.slug}` },
    ],
  };
}

function describeWinner(winner: "A" | "B" | "tie", nameA: string, nameB: string): string {
  if (winner === "tie") return `Both ${nameA} and ${nameB} perform well here — the right pick depends on your specific site.`;
  const winnerName = winner === "A" ? nameA : nameB;
  return `${winnerName} is generally the stronger choice for this specific use case.`;
}

// ---------------------------------------------------------------------------
// Hub-page content (locations, areas) — reuses the same link engine so every
// page type feeds internal links, quality scoring, and schema consistently.
// ---------------------------------------------------------------------------

export function buildCityContent(city: City): PageContent {
  const { related, nearby, servicesInLocation, morePages } = cityPageLinks(city);
  const areasInCity = getAreasByCity(city.slug);
  const genericVars = { service: "our safety net and invisible grill installations", location: city.name };
  const whyImportant = renderTemplate(pickBySeed(whyImportantVariants, `city|${city.slug}|why`), genericVars);
  const benefitsIntro = renderTemplate(pickBySeed(benefitsIntroVariants, `city|${city.slug}|benefits`), genericVars);
  const installProcess = pickBySeed(installProcessVariants, `city|${city.slug}|install`);

  const base: PageContent = {
    title: `${city.name} — Invisible Grills & Safety Nets | ${site.name}`,
    metaDescription: `${site.name} installs invisible grills, safety nets, pigeon nets, and more across ${city.name}. Free site inspection and quote.`,
    h1: `Our Services in ${city.name}`,
    intro: `${site.name} serves ${city.name} with a full range of balcony and terrace safety solutions. ${city.localNote}`,
    sections: [
      { heading: `About ${city.name}`, paragraphs: [city.localNote, city.climateNote, city.buildingProfile] },
      { heading: `Why It Matters in ${city.name}`, paragraphs: [whyImportant] },
      { heading: "Services Available", items: services.map((s) => s.name) },
      { heading: `Why Choose ${site.name} in ${city.name}`, paragraphs: [benefitsIntro], items: [
        "Free, no-obligation on-site inspection before every quote",
        "In-house installation team — no outsourced subcontractors",
        "Materials selected for coastal Andhra Pradesh's humidity and salt-air exposure",
        "Transparent pricing with no hidden charges after installation",
      ] },
      { heading: "How Installation Works", items: installProcess },
      { heading: "Areas We Cover", items: areasInCity.map((a) => a.name) },
    ],
    faqs: [
      { question: `Do you provide free site visits in ${city.name}?`, answer: `Yes, we offer a free on-site inspection anywhere in ${city.name} before quoting.` },
      { question: `Which areas of ${city.name} do you cover?`, answer: `We cover ${areasInCity.slice(0, 5).map((a) => a.name).join(", ") || "all major residential localities"} and are expanding coverage regularly.` },
      { question: `Which services are most popular in ${city.name}?`, answer: `${services.filter((s) => s.navPriority === 1).slice(0, 3).map((s) => s.name).join(", ")} are the most requested services in ${city.name}, based on our recent site visits.` },
      businessFaqs[0],
    ],
    heroImage: getHeroImage(["safety-nets-balcony", "invisible-grill-balcony"], city.slug, `Safety net and invisible grill installation in ${city.name}`),
    galleryImages: getGalleryImages(["safety-nets-balcony", "invisible-grill-balcony"], city.slug, city.name),
    relatedLinks: related,
    nearbyLinks: nearby,
    servicesInLocationLinks: servicesInLocation,
    morePageLinks: morePages,
    locationName: city.name,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: city.name, href: `/locations/${city.slug}` },
    ],
  };
  return enrichPageSeo(attachHubGalleries(base, city.slug, city.name), seoContextForCity(city));
}

export function buildAreaContent(area: Area): PageContent {
  const city = citiesBySlug[area.parentCitySlug];
  const { related, nearby, servicesInLocation, morePages } = areaPageLinks(area);
  const genericVars = { service: "our safety net and invisible grill installations", location: area.name };
  const whyImportant = renderTemplate(pickBySeed(whyImportantVariants, `area|${area.slug}|why`), genericVars);
  const benefitsIntro = renderTemplate(pickBySeed(benefitsIntroVariants, `area|${area.slug}|benefits`), genericVars);
  const installProcess = pickBySeed(installProcessVariants, `area|${area.slug}|install`);
  const commonProblemsIntro = renderTemplate(pickBySeed(commonProblemsIntroVariants, `area|${area.slug}|problems`), genericVars);

  const base: PageContent = {
    title: `${area.name} — Invisible Grills & Safety Nets | ${site.name}`,
    metaDescription: `${site.name} installs invisible grills, safety nets, and pigeon nets in ${area.name}${city ? `, ${city.name}` : ""}. Free site inspection and quote.`,
    h1: `Our Services in ${area.name}`,
    intro: `${area.localNote} ${site.name} provides balcony and terrace safety solutions to residents of ${area.name}.`,
    sections: [
      {
        heading: `About ${area.name}`,
        paragraphs: [
          area.localNote,
          city
            ? `${area.name} is part of ${city.name}, and our ${city.name} installation team regularly services homes and businesses in this locality.`
            : `Our regional installation team regularly services homes and businesses in ${area.name}.`,
        ],
      },
      { heading: `Why It Matters in ${area.name}`, paragraphs: [whyImportant, commonProblemsIntro] },
      { heading: "Services Available", items: services.map((s) => s.name) },
      { heading: `Why Choose ${site.name} in ${area.name}`, paragraphs: [benefitsIntro], items: [
        "Free, no-obligation on-site inspection before every quote",
        "In-house installation team — no outsourced subcontractors",
        "Materials selected for coastal Andhra Pradesh's humidity and salt-air exposure",
        "Transparent pricing with no hidden charges after installation",
      ] },
      { heading: "How Installation Works", items: installProcess },
    ],
    faqs: [
      { question: `Do you provide free site visits in ${area.name}?`, answer: `Yes, we offer a free on-site inspection in ${area.name} before quoting.` },
      {
        question: `Do you cover all buildings in ${area.name}?`,
        answer: `Yes — we install in apartments, independent houses, and commercial buildings across ${area.name}${city ? ` and the rest of ${city.name}` : ""}.`,
      },
      businessFaqs[0],
      businessFaqs[1] ?? businessFaqs[0],
    ],
    heroImage: getHeroImage(["safety-nets-balcony", "invisible-grill-balcony"], area.slug, `Safety net and invisible grill installation in ${area.name}`),
    galleryImages: getGalleryImages(["safety-nets-balcony", "invisible-grill-balcony"], area.slug, area.name),
    relatedLinks: related,
    nearbyLinks: nearby,
    servicesInLocationLinks: servicesInLocation,
    morePageLinks: morePages,
    locationName: area.name,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Areas", href: "/areas" },
      { label: area.name, href: `/areas/${area.slug}` },
    ],
  };
  return enrichPageSeo(attachHubGalleries(base, area.slug, area.name), seoContextForArea(area, city));
}

export function buildBlogContent(post: {
  slug: string;
  title: string;
  description: string;
  coverImageCategory: string;
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  sections: { heading: string; body: string[] }[];
}): PageContent {
  const relatedServices = post.relatedServiceSlugs
    .map((s) => servicesBySlug[s])
    .filter((s): s is Service => Boolean(s));
  const relatedCities = post.relatedCitySlugs
    .map((c) => citiesBySlug[c])
    .filter((c): c is City => Boolean(c));

  const related: LinkChip[] = [
    ...relatedServices.map((s) => ({ label: s.name, href: `/${s.slug}` })),
    { label: "Contact Us", href: "/contact" },
  ];
  const nearby: LinkChip[] = relatedCities.flatMap((c) =>
    relatedServices.slice(0, 2).map((s) => ({ label: `${s.name} in ${c.name}`, href: `/${s.slug}-in-${c.slug}` })),
  );

  const faqs: FaqItem[] = [
    {
      question: `Does ${site.name} install the solutions mentioned in this guide?`,
      answer: `Yes — ${relatedServices.map((s) => s.name).join(", ") || "our services"} are available with a free site inspection across our coverage area.`,
    },
    ...businessFaqs,
  ];

  const closingParagraph = relatedServices.length
    ? `If this guide relates to a project you're planning, ${site.name} offers a free, no-obligation site inspection across our coverage area — our team will assess your space in person and recommend ${relatedServices.map((s) => s.name.toLowerCase()).join(" or ")} based on your building type, budget, and exact requirement, rather than a generic online estimate.`
    : `If this guide relates to a project you're planning, ${site.name} offers a free, no-obligation site inspection across our coverage area — our team will assess your space in person and recommend the right solution based on your building type, budget, and exact requirement.`;

  return {
    title: `${post.title} | ${site.name}`,
    metaDescription: post.description,
    h1: post.title,
    intro: post.description,
    sections: [
      ...post.sections.map((s) => ({ heading: s.heading, paragraphs: s.body })),
      { heading: "Getting Professional Help", paragraphs: [closingParagraph] },
    ],
    faqs,
    heroImage: getHeroImage([post.coverImageCategory], post.slug, post.title),
    galleryImages: getGalleryImages([post.coverImageCategory], post.slug, post.title, 3),
    relatedLinks: related,
    nearbyLinks: nearby,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: post.title, href: `/blog/${post.slug}` },
    ],
  };
}

// ---------------------------------------------------------------------------
// Enumeration helpers (bounded by the curated dataset today; swap for a paged
// DB query when scaling the data layer to the full 400,000-row dataset).
// ---------------------------------------------------------------------------

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function getAllServiceCitySlugs(): string[] {
  const out: string[] = [];
  for (const s of services) for (const c of cities) out.push(`${s.slug}-in-${c.slug}`);
  return out;
}

export function getAllServiceAreaSlugs(): string[] {
  const out: string[] = [];
  for (const s of services) for (const a of areas) out.push(`${s.slug}-in-${a.slug}`);
  return out;
}

export function getAllServiceAreaCitySlugs(): string[] {
  const out: string[] = [];
  for (const s of services) {
    for (const a of areas) {
      out.push(`${s.slug}-in-${a.slug}-${a.parentCitySlug}`);
    }
  }
  return out;
}

export function getAllLocalIntentAreaSlugs(): string[] {
  const out: string[] = [];
  for (const s of services) {
    for (const modifier of localSeoModifiers) {
      for (const a of areas) {
        out.push(`${s.slug}-${modifier.slug}-in-${a.slug}`);
      }
    }
  }
  return out;
}

export function getAllLocalIntentCitySlugs(): string[] {
  const out: string[] = [];
  for (const s of services) {
    for (const modifier of localSeoModifiers) {
      for (const c of cities) {
        out.push(`${s.slug}-${modifier.slug}-in-${c.slug}`);
      }
    }
  }
  return out;
}

export function getAllHyperlocalIntentAreaSlugs(): string[] {
  const out: string[] = [];
  for (const s of services) {
    for (const modifier of localSeoModifiers) {
      for (const audience of hyperlocalAudiences) {
        for (const a of areas) {
          out.push(`${s.slug}-${modifier.slug}-for-${audience.slug}-in-${a.slug}`);
        }
      }
    }
  }
  return out;
}

/**
 * Only the hyperlocal slugs that are actually eligible to be indexed (promoted areas).
 * Used by the sitemap and stats so we never iterate the full ~1.2M theoretical set just
 * to discover the ~400k indexable ones.
 */
export function getIndexableHyperlocalIntentAreaSlugs(): string[] {
  const promoted = getPromotedHyperlocalAreas();
  const out: string[] = [];
  for (const s of services) {
    for (const modifier of localSeoModifiers) {
      for (const audience of hyperlocalAudiences) {
        for (const a of promoted) {
          out.push(`${s.slug}-${modifier.slug}-for-${audience.slug}-in-${a.slug}`);
        }
      }
    }
  }
  return out;
}

export function getAllIntentSlugs(): string[] {
  const out: string[] = [];
  for (const s of services) {
    const propertySlugs = s.propertyTypes.map(slugifyLabel);
    const extra = serviceExtraIntents[s.slug] ?? [];
    const all = Array.from(new Set([...propertySlugs, ...extra]));
    for (const intentSlug of all) {
      if (intentsBySlug[intentSlug]) out.push(`${s.slug}-for-${intentSlug}`);
    }
  }
  return out;
}

export function getAllPriceSlugs(): string[] {
  return Object.keys(priceSlugToService);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}

export function getPriorityFlatSlugs(): string[] {
  const priorityCitySlugs = new Set(priorityCities.slice(0, PRIORITY_LIMITS.topCities).map((c) => c.slug));
  const highDemandServices = services.filter((s) => s.demandTier === "high");

  const serviceCity: string[] = [];
  for (const s of services) {
    for (const c of cities) {
      if (priorityCitySlugs.has(c.slug)) serviceCity.push(`${s.slug}-in-${c.slug}`);
    }
  }

  const serviceArea: string[] = [];
  for (const s of highDemandServices) {
    for (const a of areas.filter((a) => a.tier === "priority")) {
      serviceArea.push(`${s.slug}-in-${a.slug}`);
    }
  }

  return Array.from(
    new Set([
      ...getAllServiceSlugs(),
      ...serviceCity.slice(0, PRIORITY_LIMITS.topServiceCityPages),
      ...serviceArea.slice(0, PRIORITY_LIMITS.topServiceAreaPages),
      ...getAllPriceSlugs(),
      ...getAllComparisonSlugs(),
    ]),
  );
}
