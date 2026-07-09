import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import {
  resolveFlatSlug,
  buildFlatPageContent,
  getPriorityFlatSlugs,
  ResolvedFlatPage,
  PageContent,
} from "@/lib/pageGenerator";
import { evaluateFlatPage } from "@/lib/shouldIndexPage";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { site, absoluteUrl } from "@/lib/site";

// Next.js route config must be a static literal, so REVALIDATE.longTailPage (259200s / 3 days) is inlined here.
export const revalidate = 259200;
export const dynamicParams = true;

export function generateStaticParams() {
  return getPriorityFlatSlugs().map((slug) => ({ slug }));
}

function load(slug: string): { resolved: ResolvedFlatPage; content: PageContent } | null {
  const resolved = resolveFlatSlug(slug);
  if (!resolved) return null;
  const content = buildFlatPageContent(resolved);
  return { resolved, content };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = load(slug);
  if (!data) return {};
  const { resolved, content } = data;
  const evaluated = evaluateFlatPage(resolved, content);
  const isCanonicalizedElsewhere = resolved.canonicalSlug !== resolved.slug;

  return buildMetadata({
    title: content.title,
    description: content.metaDescription,
    path: `/${slug}`,
    canonicalPath: isCanonicalizedElsewhere ? `/${resolved.canonicalSlug}` : undefined,
    index: evaluated.decision.index,
    imagePath: content.heroImage.src,
    imageAlt: content.heroImage.alt,
  });
}

function eyebrowFor(resolved: ResolvedFlatPage): string | undefined {
  switch (resolved.pageType) {
    case "service-city":
      return resolved.city?.name;
    case "service-area":
    case "service-area-city":
      return resolved.area?.name;
    case "intent":
      return "Tailored Solution";
    case "price":
      return "Pricing Guide";
    case "comparison":
      return "Comparison";
    default:
      return "Our Services";
  }
}

function finalCtaFor(resolved: ResolvedFlatPage, content: PageContent): string {
  const location =
    resolved.pageType === "service-area-city"
      ? `${resolved.area?.name}, ${resolved.city?.name}`
      : resolved.area?.name ?? resolved.city?.name ?? "your area";
  if (resolved.pageType === "price") return `Ready for an accurate ${resolved.service?.name} quote? Book a free site inspection today.`;
  if (resolved.pageType === "comparison") return "Still deciding? Talk to our team for a free, honest recommendation.";
  if (resolved.pageType === "intent") return `Ready to install ${resolved.service?.name}? Get a free quote today.`;
  return `Need ${resolved.service?.name} in ${location}? Call or WhatsApp ${site.name} today for a free quote and site inspection.`;
}

export default async function FlatSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = load(slug);
  if (!data) notFound();
  const { resolved, content } = data;

  const schemas: Record<string, unknown>[] = [breadcrumbListSchema(content.breadcrumbs), faqPageSchema(content.faqs)];

  if (resolved.service) {
    schemas.push(
      serviceSchema({
        serviceName: content.h1,
        description: content.metaDescription,
        areaServed: resolved.city?.name ?? resolved.area?.name ?? "Andhra Pradesh",
        url: absoluteUrl(`/${slug}`),
      }),
    );
  }

  const comparisonNames =
    resolved.pageType === "comparison"
      ? { a: resolved.service!.name, b: resolved.serviceB?.name ?? resolved.genericAlternativeB?.name ?? "Alternative" }
      : undefined;

  return (
    <PageTemplate
      content={content}
      eyebrow={eyebrowFor(resolved)}
      finalCtaText={finalCtaFor(resolved, content)}
      schema={schemas}
      leadFormServiceSlug={resolved.service?.slug}
      comparisonNames={comparisonNames}
    />
  );
}
