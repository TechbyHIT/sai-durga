import Link from "next/link";
import { InternalLinks } from "./InternalLinks";
import type { LinkChip } from "@/lib/internalLinks";

/** Full service list for a city or area — used on location hub pages. */
export function LocationServicesGrid({
  locationName,
  links,
}: {
  locationName: string;
  links: LinkChip[];
}) {
  if (!links.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
      <div className="rounded-[2rem] border border-gold-100 bg-gradient-to-br from-gold-50/50 to-base-white p-5 shadow-card sm:p-6">
        <div className="mb-4">
          <div className="gold-divider mb-2" />
          <h2 className="text-lg font-bold text-silver-900 sm:text-xl">All Services in {locationName}</h2>
          <p className="mt-1 text-sm text-silver-600">
            Every service we install in {locationName} — click for local pricing, installation details, and free site
            inspection.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-silver-100 bg-base-white px-4 py-2.5 text-sm font-semibold text-silver-700 transition hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Renders optional extra link sections from page content. */
export function PageLinkSections({
  locationName,
  servicesInLocationLinks,
  relatedLinks,
  nearbyLinks,
  morePageLinks,
}: {
  locationName?: string;
  servicesInLocationLinks?: LinkChip[];
  relatedLinks: LinkChip[];
  nearbyLinks: LinkChip[];
  morePageLinks?: LinkChip[];
}) {
  return (
    <>
      {servicesInLocationLinks && servicesInLocationLinks.length > 0 && locationName && (
        <LocationServicesGrid locationName={locationName} links={servicesInLocationLinks} />
      )}
      <InternalLinks title="Related Pages" links={relatedLinks} />
      <InternalLinks title="Nearby & Related Locations" links={nearbyLinks} />
      {morePageLinks && morePageLinks.length > 0 && (
        <InternalLinks title="More Services & Options" links={morePageLinks} />
      )}
    </>
  );
}
