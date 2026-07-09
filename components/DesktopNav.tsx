import Link from "next/link";
import { cities } from "@/data/cities";
import { priorityAreas } from "@/data/areas";
import { navCitySlugs, navServiceGroups } from "@/data/navMenu";

const navCities = navCitySlugs
  .map((slug) => cities.find((c) => c.slug === slug))
  .filter((c): c is (typeof cities)[number] => Boolean(c));

const navAreas = priorityAreas.slice(0, 6);

/** Desktop navigation with CSS hover mega-menus — server-rendered, no client JS. */
export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-5 text-sm font-semibold text-silver-700 xl:flex">
      <Link href="/" className="rounded-full px-3 py-2 hover:bg-gold-50 hover:text-gold-700">
        Home
      </Link>
      <div className="group static">
        <button type="button" className="flex items-center gap-1 rounded-full px-3 py-2 hover:bg-gold-50 hover:text-gold-700">
          Services
        </button>
        <div className="invisible absolute left-0 right-0 top-full z-50 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
          <div className="border-b border-gold-100 bg-base-white shadow-card">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
                {navServiceGroups.map((group) => (
                  <div key={group.title}>
                    <Link
                      href={group.hubHref}
                      className="block border-b border-silver-200 pb-2 text-sm font-bold text-silver-900 hover:text-gold-700"
                    >
                      {group.title}
                    </Link>
                    <ul className="mt-2 space-y-1">
                      {group.links.slice(1).map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="block py-0.5 text-xs font-medium text-silver-500 hover:text-gold-700"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href="/services"
                className="mt-6 inline-block rounded-full bg-silver-900 px-5 py-2 text-xs font-semibold text-white hover:bg-gold-600"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative">
        <button type="button" className="flex items-center gap-1 rounded-full px-3 py-2 hover:bg-gold-50 hover:text-gold-700">
          Locations
        </button>
        <div className="invisible absolute left-0 top-full w-[640px] rounded-3xl border border-gold-100 bg-base-white p-4 opacity-0 shadow-card transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Top Cities</p>
              {navCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/locations/${c.slug}`}
                  className="block rounded-xl px-3 py-2 hover:bg-gold-50 hover:text-gold-700"
                >
                  {c.name}
                </Link>
              ))}
              <Link
                href="/locations"
                className="mt-2 block rounded-xl bg-silver-900 px-3 py-2 text-center text-white hover:bg-gold-600"
              >
                All Locations
              </Link>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Popular Areas</p>
              {navAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="block rounded-xl px-3 py-2 hover:bg-gold-50 hover:text-gold-700"
                >
                  {a.name}
                </Link>
              ))}
              <Link href="/areas" className="mt-2 block rounded-xl bg-gold-500 px-3 py-2 text-center text-white hover:bg-gold-600">
                All Areas
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link href="/blog" className="rounded-full px-3 py-2 hover:bg-gold-50 hover:text-gold-700">
        Blog
      </Link>
      <Link href="/faq" className="rounded-full px-3 py-2 hover:bg-gold-50 hover:text-gold-700">
        FAQ
      </Link>
      <Link href="/contact" className="rounded-full px-3 py-2 hover:bg-gold-50 hover:text-gold-700">
        Contact
      </Link>
    </nav>
  );
}
