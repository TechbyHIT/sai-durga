import { services, Service } from "@/data/services";
import { City, citiesBySlug, priorityCities } from "@/data/cities";
import { Area, getAreasByCity, areasBySlug } from "@/data/areas";
import { Intent, intentsBySlug, serviceExtraIntents, slugifyLabel } from "@/data/keywords";
import { Comparison } from "@/data/comparisons";
import { localSeoModifiersBySlug } from "@/data/seoScale";
import { fastSearchKeywords } from "@/data/fastSearchKeywords";
import { navCitySlugs, navServiceGroups } from "@/data/navMenu";

export interface LinkChip {
  label: string;
  href: string;
}

const highValueLocalModifierSlugs = ["installation", "price-list", "local-installers", "free-site-inspection"] as const;

export function dedupeLinks(links: LinkChip[]): LinkChip[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function isValidIntentForService(service: Service, intentSlug: string): boolean {
  const propertySlugs = service.propertyTypes.map(slugifyLabel);
  if (propertySlugs.includes(intentSlug)) return true;
  return (serviceExtraIntents[service.slug] ?? []).includes(intentSlug);
}

function intentLinksForService(service: Service): LinkChip[] {
  const intentSlugs = Array.from(
    new Set([...service.propertyTypes.map(slugifyLabel), ...(serviceExtraIntents[service.slug] ?? [])]),
  );
  return intentSlugs
    .map((slug) => intentsBySlug[slug])
    .filter((intent): intent is Intent => Boolean(intent))
    .map((intent) => ({
      label: `${service.name} for ${intent.label}`,
      href: `/${service.slug}-for-${intent.slug}`,
    }));
}

function localModifierLinksInLocation(service: Service, locationName: string, locationSlug: string): LinkChip[] {
  return highValueLocalModifierSlugs
    .map((slug) => localSeoModifiersBySlug[slug])
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((modifier) => ({
      label: `${service.name} ${modifier.label} in ${locationName}`,
      href: `/${service.slug}-${modifier.slug}-in-${locationSlug}`,
    }));
}

function localIntentLinks(service: Service, area: Area): LinkChip[] {
  return localModifierLinksInLocation(service, area.name, area.slug);
}

/** Every service linked to a city (programmatic service+city pages). */
export function allServicesInCityLinks(city: City): LinkChip[] {
  return services.map((s) => ({
    label: `${s.name} in ${city.name}`,
    href: `/${s.slug}-in-${city.slug}`,
  }));
}

/** Every service linked to an area (programmatic service+area pages). */
export function allServicesInAreaLinks(area: Area): LinkChip[] {
  return services.map((s) => ({
    label: `${s.name} in ${area.name}`,
    href: `/${s.slug}-in-${area.slug}`,
  }));
}

/** Flat list of header mega-menu programmatic SEO pages. */
export function navProgrammaticLinks(): LinkChip[] {
  return dedupeLinks([
    ...navServiceGroups.flatMap((group) => group.links),
    ...fastSearchKeywords.map((k) => ({ label: k.label, href: k.href })),
  ]);
}

/** Extra intent, price, and modifier links for a city hub page. */
export function cityProgrammaticLinks(city: City): LinkChip[] {
  const flagship = services.filter((s) => s.navPriority === 1);
  const links: LinkChip[] = [
    ...navProgrammaticLinks(),
    ...services.map((s) => ({ label: `${s.shortName} Price Guide`, href: `/${slugifyShort(s)}-price` })),
    ...flagship.flatMap((s) => intentLinksForService(s)),
    ...flagship.flatMap((s) => localModifierLinksInLocation(s, city.name, city.slug)),
  ];
  const cityAreas = getAreasByCity(city.slug);
  for (const area of cityAreas.slice(0, 6)) {
    for (const s of flagship) {
      links.push({ label: `${s.name} in ${area.name}`, href: `/${s.slug}-in-${area.slug}` });
    }
  }
  return dedupeLinks(links);
}

/** Extra intent, price, and modifier links for an area hub page. */
export function areaProgrammaticLinks(area: Area, city?: City): LinkChip[] {
  const flagship = services.filter((s) => s.navPriority === 1);
  const links: LinkChip[] = [
    ...navProgrammaticLinks(),
    ...flagship.flatMap((s) => intentLinksForService(s)),
    ...flagship.flatMap((s) => localIntentLinks(s, area)),
  ];
  if (city) {
    links.push(
      ...flagship.flatMap((s) => localModifierLinksInLocation(s, city.name, city.slug)),
      ...allServicesInCityLinks(city),
    );
  }
  return dedupeLinks(links);
}

/** Site-wide explore links: all services × priority cities for the global footer block. */
export function siteWideServiceCityLinks(): { city: City; links: LinkChip[] }[] {
  return navCitySlugs
    .map((slug) => citiesBySlug[slug])
    .filter((c): c is City => Boolean(c))
    .map((city) => ({
      city,
      links: services.map((s) => ({
        label: `${s.shortName} in ${city.name}`,
        href: `/${s.slug}-in-${city.slug}`,
      })),
    }));
}

export function allServiceHubLinks(): LinkChip[] {
  return services.map((s) => ({ label: s.name, href: `/${s.slug}` }));
}

export function allCityHubLinks(): LinkChip[] {
  return priorityCities.map((c) => ({ label: c.name, href: `/locations/${c.slug}` }));
}

export function servicePageLinks(service: Service): { related: LinkChip[]; nearby: LinkChip[] } {
  const related: LinkChip[] = dedupeLinks([
    ...services
      .filter((s) => s.slug !== service.slug)
      .map((s) => ({ label: s.name, href: `/${s.slug}` })),
    ...intentLinksForService(service),
    { label: `${service.shortName} Price Guide`, href: `/${slugifyShort(service)}-price` },
    ...navProgrammaticLinks().filter((l) => l.href.includes(service.slug)).slice(0, 8),
    { label: "All Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ]);

  const nearby: LinkChip[] = dedupeLinks([
    ...priorityCities.map((city) => ({
      label: `${service.name} in ${city.name}`,
      href: `/${service.slug}-in-${city.slug}`,
    })),
    ...Object.values(areasBySlug)
      .filter((area) => area.tier === "priority")
      .flatMap((area) => [
        { label: `${service.name} in ${area.name}`, href: `/${service.slug}-in-${area.slug}` },
        ...localIntentLinks(service, area).slice(0, 2),
      ]),
    ...allCityHubLinks().slice(0, 6),
  ]);

  return { related, nearby };
}

export function serviceCityPageLinks(service: Service, city: City): { related: LinkChip[]; nearby: LinkChip[] } {
  const otherServicesInCity: LinkChip[] = services
    .filter((s) => s.slug !== service.slug)
    .map((s) => ({ label: `${s.name} in ${city.name}`, href: `/${s.slug}-in-${city.slug}` }));

  const related: LinkChip[] = dedupeLinks([
    { label: `${service.name} Overview`, href: `/${service.slug}` },
    { label: `${city.name} Locations Hub`, href: `/locations/${city.slug}` },
    { label: `${service.shortName} Price Guide`, href: `/${slugifyShort(service)}-price` },
    ...intentLinksForService(service),
    ...localModifierLinksInLocation(service, city.name, city.slug),
    ...otherServicesInCity,
    { label: "Contact Us", href: "/contact" },
  ]);

  const areasInCity = getAreasByCity(city.slug);
  const nearby: LinkChip[] = dedupeLinks([
    ...areasInCity.map((a) => ({ label: `${service.name} in ${a.name}`, href: `/${service.slug}-in-${a.slug}` })),
    ...areasInCity.flatMap((a) => localIntentLinks(service, a)),
    ...city.nearbyCitySlugs
      .map((slug) => citiesBySlug[slug])
      .filter((c): c is City => Boolean(c))
      .map((c) => ({ label: `${service.name} in ${c.name}`, href: `/${service.slug}-in-${c.slug}` })),
    ...priorityCities
      .filter((c) => c.slug !== city.slug)
      .slice(0, 6)
      .map((c) => ({ label: `${service.name} in ${c.name}`, href: `/${service.slug}-in-${c.slug}` })),
  ]);

  return { related, nearby };
}

export function serviceAreaPageLinks(service: Service, area: Area, city: City | undefined): { related: LinkChip[]; nearby: LinkChip[] } {
  const related: LinkChip[] = dedupeLinks([
    { label: `${service.name} Overview`, href: `/${service.slug}` },
    ...(city ? [{ label: `${service.name} in ${city.name}`, href: `/${service.slug}-in-${city.slug}` }] : []),
    ...(city ? [{ label: `${city.name} Locations Hub`, href: `/locations/${city.slug}` }] : []),
    { label: `${service.shortName} Price Guide`, href: `/${slugifyShort(service)}-price` },
    ...intentLinksForService(service),
    ...localIntentLinks(service, area),
    ...services
      .filter((s) => s.slug !== service.slug)
      .map((s) => ({ label: `${s.name} in ${area.name}`, href: `/${s.slug}-in-${area.slug}` })),
    { label: "Contact Us", href: "/contact" },
  ]);

  const siblingAreas = city ? getAreasByCity(city.slug).filter((a) => a.slug !== area.slug) : [];
  const nearby: LinkChip[] = dedupeLinks([
    ...siblingAreas.map((a) => ({
      label: `${service.name} in ${a.name}`,
      href: `/${service.slug}-in-${a.slug}`,
    })),
    ...(city ? allServicesInCityLinks(city).slice(0, 8) : []),
  ]);

  return { related, nearby };
}

export function intentPageLinks(service: Service, intent: Intent): { related: LinkChip[]; nearby: LinkChip[] } {
  const related: LinkChip[] = dedupeLinks([
    { label: `${service.name} Overview`, href: `/${service.slug}` },
    ...intentLinksForService(service).filter((l) => l.href !== `/${service.slug}-for-${intent.slug}`),
    { label: `${service.shortName} Price Guide`, href: `/${slugifyShort(service)}-price` },
    ...services
      .filter((s) => s.slug !== service.slug && isValidIntentForService(s, intent.slug))
      .slice(0, 4)
      .map((s) => ({ label: `${s.name} for ${intent.label}`, href: `/${s.slug}-for-${intent.slug}` })),
    { label: "Contact Us", href: "/contact" },
  ]);
  const nearby: LinkChip[] = priorityCities.map((city) => ({
    label: `${service.name} in ${city.name}`,
    href: `/${service.slug}-in-${city.slug}`,
  }));
  return { related, nearby };
}

export function pricePageLinks(service: Service): { related: LinkChip[]; nearby: LinkChip[] } {
  const related: LinkChip[] = dedupeLinks([
    { label: `${service.name} Overview`, href: `/${service.slug}` },
    ...intentLinksForService(service),
    ...service.comparableWith.map((s2) => ({ label: `Compare with ${services.find((s) => s.slug === s2)?.shortName ?? s2}`, href: `/${service.slug}-vs-${s2}` })),
    ...services
      .filter((s) => s.slug !== service.slug)
      .slice(0, 6)
      .map((s) => ({ label: `${s.shortName} Price Guide`, href: `/${slugifyShort(s)}-price` })),
    { label: "Contact Us", href: "/contact" },
  ]);
  const nearby: LinkChip[] = priorityCities.map((city) => ({
    label: `${service.name} in ${city.name}`,
    href: `/${service.slug}-in-${city.slug}`,
  }));
  return { related, nearby };
}

export function comparisonPageLinks(comparison: Comparison, serviceA: Service, serviceB?: Service): { related: LinkChip[]; nearby: LinkChip[] } {
  const related: LinkChip[] = dedupeLinks([
    { label: `${serviceA.name} Overview`, href: `/${serviceA.slug}` },
    ...(serviceB ? [{ label: `${serviceB.name} Overview`, href: `/${serviceB.slug}` }] : []),
    { label: `${serviceA.shortName} Price Guide`, href: `/${slugifyShort(serviceA)}-price` },
    ...(serviceB ? [{ label: `${serviceB.shortName} Price Guide`, href: `/${slugifyShort(serviceB)}-price` }] : []),
    ...services
      .filter((s) => s.comparableWith.length > 0)
      .slice(0, 4)
      .map((s) => ({ label: `Compare ${s.shortName} Options`, href: `/${s.slug}-vs-${s.comparableWith[0]}` })),
    { label: "Contact Us", href: "/contact" },
  ]);
  const nearby: LinkChip[] = dedupeLinks([
    ...priorityCities.map((city) => ({ label: `${serviceA.name} in ${city.name}`, href: `/${serviceA.slug}-in-${city.slug}` })),
    ...(serviceB ? priorityCities.slice(0, 6).map((city) => ({ label: `${serviceB.name} in ${city.name}`, href: `/${serviceB.slug}-in-${city.slug}` })) : []),
  ]);
  return { related, nearby };
}

export function cityPageLinks(city: City): {
  related: LinkChip[];
  nearby: LinkChip[];
  servicesInLocation: LinkChip[];
  morePages: LinkChip[];
} {
  const cityAreas = getAreasByCity(city.slug);
  const flagship = services.filter((s) => s.navPriority === 1);

  const related: LinkChip[] = dedupeLinks([
    ...allServicesInCityLinks(city),
    ...flagship.flatMap((s) => localModifierLinksInLocation(s, city.name, city.slug)),
    ...cityAreas.slice(0, 8).flatMap((a) =>
      flagship.map((s) => ({ label: `${s.name} in ${a.name}`, href: `/${s.slug}-in-${a.slug}` })),
    ),
    { label: "All Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ]);

  const nearby: LinkChip[] = dedupeLinks([
    ...cityAreas.map((a) => ({ label: a.name, href: `/areas/${a.slug}` })),
    ...city.nearbyCitySlugs
      .map((slug) => citiesBySlug[slug])
      .filter((c): c is City => Boolean(c))
      .map((c) => ({ label: c.name, href: `/locations/${c.slug}` })),
    ...priorityCities
      .filter((c) => c.slug !== city.slug)
      .map((c) => ({ label: `All Services in ${c.name}`, href: `/locations/${c.slug}` })),
  ]);

  return {
    related,
    nearby,
    servicesInLocation: allServicesInCityLinks(city),
    morePages: cityProgrammaticLinks(city),
  };
}

export function areaPageLinks(area: Area): {
  related: LinkChip[];
  nearby: LinkChip[];
  servicesInLocation: LinkChip[];
  morePages: LinkChip[];
} {
  const city = citiesBySlug[area.parentCitySlug];
  const flagship = services.filter((s) => s.navPriority === 1);

  const related: LinkChip[] = dedupeLinks([
    ...(city ? [{ label: `${city.name} Locations Hub`, href: `/locations/${city.slug}` }] : []),
    ...allServicesInAreaLinks(area),
    ...flagship.flatMap((s) => localIntentLinks(s, area)),
    ...(city ? flagship.flatMap((s) => localModifierLinksInLocation(s, city.name, city.slug)) : []),
    { label: "All Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ]);

  const nearby: LinkChip[] = city
    ? dedupeLinks([
        ...getAreasByCity(city.slug)
          .filter((a) => a.slug !== area.slug)
          .map((a) => ({ label: a.name, href: `/areas/${a.slug}` })),
        ...allServicesInCityLinks(city),
        { label: city.name, href: `/locations/${city.slug}` },
      ])
    : [];

  return {
    related,
    nearby,
    servicesInLocation: allServicesInAreaLinks(area),
    morePages: areaProgrammaticLinks(area, city),
  };
}

function slugifyShort(service: Service): string {
  return service.shortName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
