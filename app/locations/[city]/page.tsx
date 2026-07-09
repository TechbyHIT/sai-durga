import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import { cities, getCity } from "@/data/cities";
import { buildCityContent } from "@/lib/pageGenerator";
import { evaluateHubPage } from "@/lib/shouldIndexPage";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { CRAWL_PRIORITY } from "@/data/pageRules";
import { absoluteUrl } from "@/lib/site";

// Next.js route config must be a static literal, so REVALIDATE.priorityPage (86400s / 24h) is inlined here.
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

function load(citySlug: string) {
  const city = getCity(citySlug);
  if (!city) return null;
  const content = buildCityContent(city);
  const evaluated = evaluateHubPage(content, { pageType: "city", crawlPriority: CRAWL_PRIORITY.P1 });
  return { city, content, evaluated };
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const data = load(citySlug);
  if (!data) return {};
  return buildMetadata({
    title: data.content.title,
    description: data.content.metaDescription,
    path: `/locations/${citySlug}`,
    index: data.evaluated.decision.index,
    imagePath: data.content.heroImage.src,
    imageAlt: data.content.heroImage.alt,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const data = load(citySlug);
  if (!data) notFound();
  const { city, content } = data;

  return (
    <PageTemplate
      content={content}
      eyebrow={`${city.district} District`}
      finalCtaText={`Looking for a safety solution in ${city.name}? Get a free site inspection today.`}
      schema={[
        breadcrumbListSchema(content.breadcrumbs),
        faqPageSchema(content.faqs),
        serviceSchema({
          serviceName: `Balcony & Terrace Safety Solutions in ${city.name}`,
          description: content.metaDescription,
          areaServed: city.name,
          url: absoluteUrl(`/locations/${city.slug}`),
        }),
      ]}
    />
  );
}
