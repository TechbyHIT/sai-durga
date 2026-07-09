import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { navCitySlugs } from "@/data/navMenu";
import { citiesBySlug } from "@/data/cities";
import { fastSearchKeywords } from "@/data/fastSearchKeywords";

const footerCities = navCitySlugs.map((slug) => citiesBySlug[slug]).filter(Boolean);

export function Footer() {
  return (
    <footer className="border-t border-silver-100 bg-silver-900 text-silver-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-2 text-sm text-silver-300">{site.founderNote}</p>
          <p className="mt-4 text-sm">
            <a href={site.phoneHref} className="hover:text-gold-300">
              {site.phone}
            </a>
          </p>
          <p className="text-sm">
            <a href={site.emailHref} className="hover:text-gold-300">
              {site.email}
            </a>
          </p>
          <Link
            href="/sitemap"
            className="mt-4 inline-block rounded-full bg-gold-500 px-4 py-2 text-xs font-semibold text-white hover:bg-gold-600"
          >
            All Pages — Site Map
          </Link>
        </div>

        <div>
          <p className="font-semibold text-white">All Services</p>
          <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-gold-300">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Locations</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${c.slug}`} className="hover:text-gold-300">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations" className="font-semibold text-gold-300 hover:text-gold-200">
                All Locations →
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="font-semibold text-white">Services by City</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {footerCities.slice(0, 6).map((city) => (
              <div key={city.slug}>
                <Link href={`/locations/${city.slug}`} className="text-sm font-semibold text-gold-200 hover:text-white">
                  {city.name}
                </Link>
                <ul className="mt-1.5 space-y-1 text-xs text-silver-400">
                  {services
                    .filter((s) => s.navPriority === 1)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}-in-${city.slug}`} className="hover:text-gold-300">
                          {s.shortName}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-silver-700">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-sm font-semibold text-white">Popular Searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {fastSearchKeywords.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch={false}
                className="rounded-full border border-silver-600 px-2.5 py-1 text-[11px] font-medium text-silver-300 hover:border-gold-400 hover:text-gold-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-silver-700">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-4 text-xs text-silver-400 sm:px-6">
          <Link href="/blog" className="hover:text-gold-300">
            Blog &amp; Guides
          </Link>
          <Link href="/faq" className="hover:text-gold-300">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-gold-300">
            Contact
          </Link>
          <Link href="/areas" className="hover:text-gold-300">
            All Areas
          </Link>
          <Link href="/services" className="hover:text-gold-300">
            All Services
          </Link>
          <Link href="/sitemap" className="font-semibold text-gold-300 hover:text-gold-200">
            Site Map — All Pages
          </Link>
        </div>
      </div>

      <div className="border-t border-silver-700 py-4 text-center text-xs text-silver-400">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
