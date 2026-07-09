import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Schema } from "@/components/Schema";
import { SitemapLinkList } from "@/components/SitemapLinkList";
import { SitemapPagination } from "@/components/SitemapPagination";
import { SITEMAP_BUCKET_LABELS } from "@/lib/htmlSitemap";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getHtmlSitemapPage, getSitemapBucketSummaries, HTML_SITEMAP_PAGE_SIZE, isSitemapBucket } from "@/lib/sitemap";
import type { SitemapBucket } from "@/data/pageRules";
import { SITEMAP_BUCKETS } from "@/data/pageRules";

export const revalidate = 43200;

export function generateStaticParams() {
  return SITEMAP_BUCKETS.map((bucket) => ({ bucket }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ bucket: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { bucket: raw } = await params;
  if (!isSitemapBucket(raw)) {
    return buildMetadata({ title: "Site Map", description: "Site map", path: "/sitemap", index: false });
  }
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const label = SITEMAP_BUCKET_LABELS[raw];
  const suffix = page > 1 ? ` — Page ${page}` : "";
  return buildMetadata({
    title: `${label}${suffix} | Site Map`,
    description: `Browse all ${label.toLowerCase()} on ${site.name} — page ${page} of the full site map.`,
    path: page > 1 ? `/sitemap/${raw}?page=${page}` : `/sitemap/${raw}`,
    index: true,
  });
}

export default async function SitemapBucketPage({
  params,
  searchParams,
}: {
  params: Promise<{ bucket: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { bucket: raw } = await params;
  if (!isSitemapBucket(raw)) notFound();

  const bucket = raw as SitemapBucket;
  const { page: pageParam } = await searchParams;
  const requestedPage = Math.max(1, Number(pageParam) || 1);
  const result = getHtmlSitemapPage(bucket, requestedPage);
  const label = SITEMAP_BUCKET_LABELS[bucket];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Site Map", href: "/sitemap" },
    { label, href: `/sitemap/${bucket}` },
  ];

  if (result.page > 1) {
    breadcrumbs.push({ label: `Page ${result.page}`, href: `/sitemap/${bucket}?page=${result.page}` });
  }

  const summaries = getSitemapBucketSummaries().filter((s) => s.bucket !== "core");

  return (
    <>
      <Schema data={breadcrumbListSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/sitemap" className="text-sm font-semibold text-gold-600 hover:underline">
              ← All categories
            </Link>
            <h1 className="mt-2 text-3xl font-extrabold text-silver-900 sm:text-4xl">{label}</h1>
            <p className="mt-2 text-sm text-silver-600">
              {result.total.toLocaleString("en-IN")} pages · showing{" "}
              {(result.page - 1) * HTML_SITEMAP_PAGE_SIZE + 1}–
              {(result.page - 1) * HTML_SITEMAP_PAGE_SIZE + result.entries.length} of{" "}
              {result.total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-silver-100 bg-base-white p-5 shadow-card sm:p-6">
          <SitemapLinkList entries={result.entries} compact={result.total > 100} />
          <SitemapPagination basePath={`/sitemap/${bucket}`} page={result.page} totalPages={result.totalPages} />
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Other categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {summaries.map(({ bucket: b, count }) => (
              <Link
                key={b}
                href={`/sitemap/${b}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  b === bucket
                    ? "border-gold-400 bg-gold-50 text-gold-800"
                    : "border-silver-200 text-silver-600 hover:border-gold-300 hover:bg-gold-50"
                }`}
              >
                {SITEMAP_BUCKET_LABELS[b]} ({count.toLocaleString("en-IN")})
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCta text="Need help finding a page? Call or WhatsApp us for a free quote and site inspection." />
    </>
  );
}
