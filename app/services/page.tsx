import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { FinalCta } from "@/components/FinalCta";
import { Schema } from "@/components/Schema";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const revalidate = 43200;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `All Services | ${site.name}`,
    description: `Browse every service offered by ${site.name}: invisible grills, safety nets, pigeon nets, anti bird spikes, cloth hangers, cricket nets, and more.`,
    path: "/services",
    index: true,
  });
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Schema data={breadcrumbListSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">Our Services</h1>
        <p className="mt-3 max-w-2xl text-silver-600">
          {site.name} installs and maintains safety and protection solutions for balconies, terraces, windows, and
          open areas across coastal Andhra Pradesh — every installation starts with a free site inspection.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
      <FinalCta text="Not sure which service fits your space? Talk to our team for a free recommendation." />
    </>
  );
}
