import Link from "next/link";
import { allServiceHubLinks, navProgrammaticLinks, siteWideServiceCityLinks } from "@/lib/internalLinks";

/** Global internal-link block on every page — services, cities, and programmatic SEO pages. */
export function SiteExploreLinks() {
  const serviceCityGroups = siteWideServiceCityLinks();
  const serviceHubs = allServiceHubLinks();
  const programmatic = navProgrammaticLinks();

  return (
    <section className="border-t border-silver-100 bg-silver-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="gold-divider mb-3" />
          <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Explore All Services & Locations</h2>
          <p className="mt-2 text-sm text-silver-600">
            Browse every service and city we cover across Andhra Pradesh.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gold-600">All Services</h3>
          <div className="flex flex-wrap gap-2">
            {serviceHubs.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-silver-200 bg-base-white px-4 py-2 text-sm font-semibold text-silver-700 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-full bg-silver-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600"
            >
              View All Services
            </Link>
          </div>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCityGroups.map(({ city, links }) => (
            <div key={city.slug} className="rounded-2xl border border-silver-100 bg-base-white p-5 shadow-card">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-silver-900">{city.name}</h3>
                <Link href={`/locations/${city.slug}`} className="text-xs font-semibold text-gold-600 hover:underline">
                  View {city.name} →
                </Link>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-silver-200 px-2.5 py-1 text-[11px] font-medium text-silver-600 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gold-600">
            More Services & Options
          </h3>
          <div className="flex flex-wrap gap-2">
            {programmatic.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="rounded-full border border-silver-200 bg-base-white px-3 py-1.5 text-xs font-medium text-silver-600 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
