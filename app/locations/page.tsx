import type { Metadata } from "next";

import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";

import { LocationCard } from "@/components/LocationCard";

import { FinalCta } from "@/components/FinalCta";

import { Schema } from "@/components/Schema";

import { cities } from "@/data/cities";

import { services } from "@/data/services";

import { navCitySlugs } from "@/data/navMenu";

import { buildMetadata } from "@/lib/seo";

import { breadcrumbListSchema } from "@/lib/schema";

import { site } from "@/lib/site";



export const revalidate = 43200;



export function generateMetadata(): Metadata {

  return buildMetadata({

    title: `Locations We Serve | ${site.name}`,

    description: `${site.name} installs invisible grills, safety nets, and bird protection across Visakhapatnam, Vijayawada, Kakinada, Rajahmundry, Eluru, Vizianagaram, Srikakulam and more.`,

    path: "/locations",

    index: true,

  });

}



const breadcrumbs = [

  { label: "Home", href: "/" },

  { label: "Locations", href: "/locations" },

];



const featuredCities = navCitySlugs

  .map((slug) => cities.find((c) => c.slug === slug))

  .filter(Boolean);



export default function LocationsIndexPage() {

  return (

    <>

      <Schema data={breadcrumbListSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">Locations We Serve</h1>

        <p className="mt-3 max-w-2xl text-silver-600">

          {site.name} serves cities and towns across coastal Andhra Pradesh. Choose your city to see local services,

          coverage areas, and a free site-inspection option.

        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {cities.map((c) => (

            <LocationCard key={c.slug} city={c} />

          ))}

        </div>

      </section>



      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">

        <div className="mb-6">

          <div className="gold-divider mb-3" />

          <h2 className="text-2xl font-bold text-silver-900">All Services by Location</h2>

          <p className="mt-2 text-sm text-silver-600">
            Every service we offer in each city — local installation, pricing, and free site inspection.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {featuredCities.map((city) => (

            <div key={city!.slug} className="rounded-2xl border border-silver-100 bg-white/90 p-5 shadow-card">

              <div className="mb-3 flex items-center justify-between">

                <h3 className="text-base font-bold text-silver-900">{city!.name}</h3>

                <Link href={`/locations/${city!.slug}`} className="text-xs font-semibold text-gold-600 hover:underline">

                  View {city!.name} →

                </Link>

              </div>

              <div className="flex flex-wrap gap-1.5">

                {services.map((s) => (

                  <Link

                    key={s.slug}

                    href={`/${s.slug}-in-${city!.slug}`}

                    className="rounded-full border border-silver-200 px-2.5 py-1 text-[11px] font-medium text-silver-600 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"

                  >

                    {s.shortName}

                  </Link>

                ))}

              </div>

            </div>

          ))}

        </div>

      </section>



      <FinalCta text="Don't see your city listed? We're expanding — call or WhatsApp us to check coverage." />

    </>

  );

}

