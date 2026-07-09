import Link from "next/link";
import { SitemapLinkList } from "@/components/SitemapLinkList";
import { SITEMAP_BUCKET_LABELS } from "@/lib/htmlSitemap";
import type { SitemapBucket } from "@/data/pageRules";
import {
  getSitemapBucketEntries,
  HTML_SITEMAP_INLINE_LIMIT,
  HTML_SITEMAP_PREVIEW_SIZE,
  type SitemapBucketSummary,
} from "@/lib/sitemap";

export function SitemapBucketSection({ bucket, count }: { bucket: SitemapBucket; count: number }) {
  const entries = getSitemapBucketEntries(bucket);
  const label = SITEMAP_BUCKET_LABELS[bucket];
  const showAll = count <= HTML_SITEMAP_INLINE_LIMIT;
  const visible = showAll ? entries : entries.slice(0, HTML_SITEMAP_PREVIEW_SIZE);

  return (
    <section id={bucket} className="scroll-mt-24 rounded-2xl border border-silver-100 bg-base-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-silver-900">{label}</h2>
          <p className="mt-1 text-sm text-silver-500">{count.toLocaleString("en-IN")} pages</p>
        </div>
        {!showAll && (
          <Link
            href={`/sitemap/${bucket}`}
            prefetch={false}
            className="text-sm font-semibold text-gold-600 hover:underline"
          >
            Browse all {count.toLocaleString("en-IN")} →
          </Link>
        )}
      </div>
      <SitemapLinkList entries={visible} compact={count > 100} />
      {!showAll && count > HTML_SITEMAP_PREVIEW_SIZE && (
        <p className="mt-4 text-center text-sm text-silver-500">
          Showing {HTML_SITEMAP_PREVIEW_SIZE.toLocaleString("en-IN")} of {count.toLocaleString("en-IN")} —{" "}
          <Link href={`/sitemap/${bucket}`} prefetch={false} className="font-semibold text-gold-600 hover:underline">
            view all pages
          </Link>
        </p>
      )}
    </section>
  );
}

export function SitemapJumpNav({ summaries }: { summaries: SitemapBucketSummary[] }) {
  return (
    <nav aria-label="Sitemap categories" className="sticky top-[4.5rem] z-30 -mx-4 border-b border-gold-100 bg-base-white/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:rounded-2xl sm:border sm:shadow-sm">
      <div className="flex flex-wrap gap-2">
        {summaries.map(({ bucket, count }) => (
          <a
            key={bucket}
            href={`#${bucket}`}
            className="rounded-full border border-silver-200 px-3 py-1 text-xs font-semibold text-silver-600 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
          >
            {SITEMAP_BUCKET_LABELS[bucket]} ({count.toLocaleString("en-IN")})
          </a>
        ))}
      </div>
    </nav>
  );
}
