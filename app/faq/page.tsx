import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCta } from "@/components/FinalCta";
import { Schema } from "@/components/Schema";
import { services } from "@/data/services";
import { businessFaqs, serviceFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Frequently Asked Questions | ${site.name}`,
    description: `Answers to common questions about invisible grills, safety nets, pigeon nets, anti bird spikes, pricing, and installation from ${site.name}.`,
    path: "/faq",
    index: true,
  });
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq" },
];

export default function FaqPage() {
  const allFaqs = [...businessFaqs, ...services.flatMap((s) => serviceFaqs[s.slug] ?? [])];

  return (
    <>
      <Schema data={[breadcrumbListSchema(breadcrumbs), faqPageSchema(allFaqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-3 text-silver-600">
          Common questions about our services, materials, pricing, and installation process.
        </p>
      </section>
      {services.map((s) => {
        const faqs = serviceFaqs[s.slug];
        if (!faqs || faqs.length === 0) return null;
        return <FAQAccordion key={s.slug} faqs={faqs} title={`${s.name} FAQs`} />;
      })}
      <FAQAccordion faqs={businessFaqs} title="General Questions" />
      <FinalCta text="Still have a question? Call or WhatsApp us directly." />
    </>
  );
}
