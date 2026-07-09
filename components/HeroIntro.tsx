import Link from "next/link";
import { heroIntroContent, navServiceGroups } from "@/data/navMenu";
import { site } from "@/lib/site";

/** Rich SEO intro and service category grid directly below the hero slider. */
export function HeroIntro() {
  return (
    <section className="border-b border-gold-100 bg-gradient-to-b from-base-white to-gold-50/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-extrabold leading-tight text-silver-900 sm:text-3xl lg:text-4xl">
            {heroIntroContent.h1}
          </h1>
          {heroIntroContent.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-relaxed text-silver-600 sm:text-base">
              {paragraph}
            </p>
          ))}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white shadow-gold hover:bg-gold-600"
            >
              Call for Free Quote
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              WhatsApp Now
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-gold-300 px-5 py-2.5 text-sm font-semibold text-gold-700 hover:bg-gold-50"
            >
              Free Site Inspection
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-600">
            All Our Services
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {navServiceGroups.map((group) => (
              <div key={group.title}>
                <Link
                  href={group.hubHref}
                  className="block border-b border-silver-200 pb-2 text-sm font-bold text-silver-900 hover:text-gold-700"
                >
                  {group.title}
                </Link>
                <ul className="mt-2 space-y-1">
                  {group.links.slice(1, 5).map((link) => (
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
        </div>
      </div>
    </section>
  );
}
