import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Schema } from "@/components/Schema";
import { SitemapBucketSection, SitemapJumpNav } from "@/components/SitemapSections";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getSitemapBucketSummaries, getTotalSitemapUrlCount } from "@/lib/sitemap";
import { fastSearchKeywords } from "@/data/fastSearchKeywords";

export const revalidate = 43200;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Site Map — All Pages | ${site.name}`,
    description: `Browse every page on ${site.name} — all services, cities, areas, popular searches, price guides, and local installation pages across Andhra Pradesh.`,
    path: "/sitemap",
    index: true,
  });
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Site Map", href: "/sitemap" },
];

export default function SitemapIndexPage() {
  const summaries = getSitemapBucketSummaries();
  const total = getTotalSitemapUrlCount();

  return (
    <>
      <Schema data={breadcrumbListSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">Site Map — All Pages</h1>
        <p className="mt-3 max-w-3xl text-silver-600">
          Every page on {site.name} in one place — services, cities, areas, price guides, comparisons, blog posts,
          and local installation pages across Andhra Pradesh.
        </p>
        <p className="mt-2 text-sm font-semibold text-gold-700">{total.toLocaleString("en-IN")} pages listed below</p>

        <div className="mt-8">
          <SitemapJumpNav summaries={summaries} />
        </div>

        <section className="mt-8 rounded-2xl border border-gold-100 bg-gold-50/40 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-silver-900">Popular Searches</h2>
          <p className="mt-1 text-sm text-silver-500">{fastSearchKeywords.length} keyword pages</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {fastSearchKeywords.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch={false}
                className="rounded-full border border-gold-200 bg-base-white px-3 py-1.5 text-xs font-medium text-silver-700 hover:border-gold-400 hover:bg-gold-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 space-y-6">
          {summaries.map(({ bucket, count }) => (
            <SitemapBucketSection key={bucket} bucket={bucket} count={count} />
          ))}
        </div>
      </section>
      <FinalCta text="Can't find what you need? Call or WhatsApp us — we'll help you find the right service page." />
    </>
  );
}
