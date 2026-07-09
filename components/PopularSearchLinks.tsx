import Link from "next/link";
import { servicesBySlug } from "@/data/services";
import { citiesBySlug } from "@/data/cities";
import { quickLinkCitySlugs, quickLinkServiceSlugs } from "@/data/homepage";

/**
 * SEO-friendly service + location quick links. Kept to a curated set per city so the
 * homepage surfaces real internal links without dumping thousands of URLs.
 */
export function PopularSearchLinks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-6">
        <div className="gold-divider mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Popular Searches by Location</h2>
        <p className="mt-2 max-w-2xl text-sm text-silver-600">
          Quick links to our most requested services across Andhra Pradesh. Choose your city to see local
          installation options.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {quickLinkCitySlugs.map((citySlug) => {
          const city = citiesBySlug[citySlug];
          if (!city) return null;
          return (
            <div key={citySlug} className="rounded-2xl border border-silver-100 bg-white/90 p-5 shadow-card">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-silver-900">{city.name}</h3>
                <Link href={`/locations/${city.slug}`} className="text-xs font-semibold text-gold-600 hover:underline">
                  View {city.name} →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLinkServiceSlugs.map((serviceSlug) => {
                  const service = servicesBySlug[serviceSlug];
                  if (!service) return null;
                  return (
                    <Link
                      key={serviceSlug}
                      href={`/${service.slug}-in-${city.slug}`}
                      className="rounded-full border border-silver-200 bg-base-white px-3 py-1.5 text-xs font-medium text-silver-700 transition hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
                    >
                      {service.shortName} in {city.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
