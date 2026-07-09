import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import { areas, getArea } from "@/data/areas";
import { citiesBySlug } from "@/data/cities";
import { buildAreaContent } from "@/lib/pageGenerator";
import { evaluateHubPage } from "@/lib/shouldIndexPage";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { CRAWL_PRIORITY, PRIORITY_LIMITS } from "@/data/pageRules";
import { absoluteUrl } from "@/lib/site";

// Next.js route config must be a static literal, so REVALIDATE.priorityPage (86400s / 24h) is inlined here.
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return areas
    .filter((a) => a.tier === "priority")
    .slice(0, PRIORITY_LIMITS.topAreaPages)
    .map((a) => ({ area: a.slug }));
}

function load(areaSlug: string) {
  const area = getArea(areaSlug);
  if (!area) return null;
  const content = buildAreaContent(area);
  const priority = area.tier === "priority" ? CRAWL_PRIORITY.P2 : CRAWL_PRIORITY.P3;
  const evaluated = evaluateHubPage(content, { pageType: "area", crawlPriority: priority });
  return { area, content, evaluated };
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const data = load(areaSlug);
  if (!data) return {};
  return buildMetadata({
    title: data.content.title,
    description: data.content.metaDescription,
    path: `/areas/${areaSlug}`,
    index: data.evaluated.decision.index,
    imagePath: data.content.heroImage.src,
    imageAlt: data.content.heroImage.alt,
  });
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const data = load(areaSlug);
  if (!data) notFound();
  const { area, content } = data;
  const city = citiesBySlug[area.parentCitySlug];

  return (
    <PageTemplate
      content={content}
      eyebrow={city ? `${city.name} Area` : undefined}
      finalCtaText={`Looking for a safety solution in ${area.name}? Get a free site inspection today.`}
      schema={[
        breadcrumbListSchema(content.breadcrumbs),
        faqPageSchema(content.faqs),
        serviceSchema({
          serviceName: `Balcony & Terrace Safety Solutions in ${area.name}`,
          description: content.metaDescription,
          areaServed: area.name,
          url: absoluteUrl(`/areas/${area.slug}`),
        }),
      ]}
    />
  );
}
