import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Schema } from "@/components/Schema";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { getAreasByCity } from "@/data/areas";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const revalidate = 43200;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `All Areas We Cover | ${site.name}`,
    description: `Browse every locality and neighbourhood served by ${site.name} across coastal Andhra Pradesh.`,
    path: "/areas",
    index: true,
  });
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Areas", href: "/areas" },
];

export default function AreasIndexPage() {
  return (
    <>
      <Schema data={breadcrumbListSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">All Areas We Cover</h1>
        <p className="mt-3 max-w-2xl text-silver-600">
          A full directory of localities served by {site.name}, grouped by city.
        </p>
        <div className="mt-8 space-y-8">
          {cities.map((city) => {
            const areasInCity = getAreasByCity(city.slug);
            if (areasInCity.length === 0) return null;
            return (
              <div key={city.slug}>
                <h2 className="text-xl font-bold text-silver-900">
                  <Link href={`/locations/${city.slug}`} className="hover:text-gold-600">{city.name}</Link>
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {areasInCity.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/areas/${a.slug}`}
                      className="rounded-full border border-silver-200 bg-base-white px-4 py-2 text-sm text-silver-700 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 border-t border-silver-100 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gold-600">Services in {city.name}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {services.slice(0, 8).map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}-in-${city.slug}`}
                        className="rounded-full border border-silver-200 px-2.5 py-1 text-[11px] font-medium text-silver-600 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
                      >
                        {s.shortName}
                      </Link>
                    ))}
                    <Link
                      href={`/locations/${city.slug}`}
                      className="rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-gold-600"
                    >
                      All Services →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <FinalCta text="Don't see your area listed? We're expanding — call or WhatsApp us to check coverage." />
    </>
  );
}
