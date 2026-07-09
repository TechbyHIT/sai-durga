import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { CTAButtons } from "@/components/CTAButtons";
import { Schema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { priorityCities } from "@/data/cities";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Contact Us | ${site.name}`,
    description: `Get in touch with ${site.name} for a free site inspection and quote. Call, WhatsApp, or email us — we serve cities across coastal Andhra Pradesh.`,
    path: "/contact",
    index: true,
  });
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <Schema data={[breadcrumbListSchema(breadcrumbs), localBusinessSchema()]} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">Contact {site.name}</h1>
        <p className="mt-3 max-w-2xl text-silver-600">
          Reach out for a free site inspection and quote. We serve {priorityCities.map((c) => c.name).join(", ")}, and
          surrounding areas across coastal Andhra Pradesh.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-xl2 border border-silver-100 bg-base-white p-5 shadow-card">
              <p className="font-semibold text-silver-900">Phone</p>
              <a href={site.phoneHref} className="text-gold-600 hover:underline">{site.phone}</a>
            </div>
            <div className="rounded-xl2 border border-silver-100 bg-base-white p-5 shadow-card">
              <p className="font-semibold text-silver-900">WhatsApp</p>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">{site.whatsapp}</a>
            </div>
            <div className="rounded-xl2 border border-silver-100 bg-base-white p-5 shadow-card">
              <p className="font-semibold text-silver-900">Email</p>
              <a href={site.emailHref} className="text-gold-600 hover:underline">{site.email}</a>
            </div>
            <CTAButtons />
          </div>
          <LeadForm title="Request a Free Site Inspection" />
        </div>
      </section>
    </>
  );
}
