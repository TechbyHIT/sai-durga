import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { areas } from "@/data/areas";
import { comparisons } from "@/data/comparisons";
import { blogPosts } from "@/data/blogTopics";
import {
  SITEMAP_MAX_URLS_PER_FILE,
  SitemapBucket,
  SITEMAP_BUCKETS,
  SEARCH_CONSOLE_SITEMAP_MAX_URLS,
  SEARCH_CONSOLE_GUARANTEED_BUCKETS,
  SEARCH_CONSOLE_SCALE_BUCKETS,
} from "@/data/pageRules";
import {
  resolveFlatSlug,
  getAllServiceCitySlugs,
  getAllServiceAreaSlugs,
  getAllServiceAreaCitySlugs,
  getAllLocalIntentAreaSlugs,
  getIndexableHyperlocalIntentAreaSlugs,
  getAllIntentSlugs,
} from "./pageGenerator";
import { isFlatPageIndexableByMetadata, crawlPriorityForResolved, evaluateHubPage } from "./shouldIndexPage";
import { buildCityContent, buildAreaContent } from "./pageGenerator";
import { absoluteUrl } from "./site";
import { CRAWL_PRIORITY } from "@/data/pageRules";

export interface SitemapUrlEntry {
  loc: string;
  lastModified: string;
  priority: number;
}

const now = () => new Date().toISOString();

function indexableFlatEntries(slugs: string[]): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];
  for (const slug of slugs) {
    const entry = flatEntryFromSlug(slug);
    if (entry) entries.push(entry);
  }
  return entries;
}

function flatEntryFromSlug(slug: string): SitemapUrlEntry | null {
  const resolved = resolveFlatSlug(slug);
  if (!resolved || !isFlatPageIndexableByMetadata(resolved)) return null;
  const crawlPriority = crawlPriorityForResolved(resolved);
  return {
    loc: absoluteUrl(`/${slug}`),
    lastModified: now(),
    priority: crawlPriority === CRAWL_PRIORITY.P1 ? 0.9 : crawlPriority === CRAWL_PRIORITY.P2 ? 0.7 : 0.5,
  };
}

function addUniqueEntries(
  target: SitemapUrlEntry[],
  seen: Set<string>,
  source: SitemapUrlEntry[],
  limit: number,
): number {
  let added = 0;
  for (const entry of source) {
    if (added >= limit) break;
    if (seen.has(entry.loc)) continue;
    seen.add(entry.loc);
    target.push(entry);
    added++;
  }
  return added;
}

function scaleBucketEntries(minPriority: number): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];
  for (const bucket of SEARCH_CONSOLE_SCALE_BUCKETS) {
    for (const entry of getBucketEntries(bucket)) {
      if (entry.priority >= minPriority) entries.push(entry);
    }
  }
  return entries.sort((a, b) => b.priority - a.priority);
}

function coreEntries(): SitemapUrlEntry[] {
  return [
    { loc: absoluteUrl("/"), lastModified: now(), priority: 1.0 },
    { loc: absoluteUrl("/services"), lastModified: now(), priority: 0.9 },
    { loc: absoluteUrl("/locations"), lastModified: now(), priority: 0.9 },
    { loc: absoluteUrl("/areas"), lastModified: now(), priority: 0.7 },
    { loc: absoluteUrl("/blog"), lastModified: now(), priority: 0.7 },
    { loc: absoluteUrl("/faq"), lastModified: now(), priority: 0.6 },
    { loc: absoluteUrl("/contact"), lastModified: now(), priority: 0.6 },
    { loc: absoluteUrl("/sitemap"), lastModified: now(), priority: 0.5 },
  ];
}

function serviceEntries(): SitemapUrlEntry[] {
  return indexableFlatEntries(services.map((s) => s.slug));
}

function locationEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];
  for (const city of cities) {
    const content = buildCityContent(city);
    const { decision } = evaluateHubPage(content, { pageType: "city", crawlPriority: CRAWL_PRIORITY.P1 });
    if (decision.index) entries.push({ loc: absoluteUrl(`/locations/${city.slug}`), lastModified: now(), priority: 0.8 });
  }
  return entries;
}

function areaEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];
  for (const area of areas) {
    const content = buildAreaContent(area);
    const { decision } = evaluateHubPage(content, { pageType: "area", crawlPriority: CRAWL_PRIORITY.P2 });
    if (decision.index) entries.push({ loc: absoluteUrl(`/areas/${area.slug}`), lastModified: now(), priority: 0.6 });
  }
  return entries;
}

function blogEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [{ loc: absoluteUrl("/blog"), lastModified: now(), priority: 0.6 }];
  for (const post of blogPosts) {
    entries.push({ loc: absoluteUrl(`/blog/${post.slug}`), lastModified: absoluteDate(post.updatedAt), priority: 0.6 });
  }
  return entries;
}

function absoluteDate(d: string): string {
  try {
    return new Date(d).toISOString();
  } catch {
    return now();
  }
}

const bucketBuilders: Record<SitemapBucket, () => SitemapUrlEntry[]> = {
  core: coreEntries,
  services: serviceEntries,
  locations: locationEntries,
  areas: areaEntries,
  "service-city": () => indexableFlatEntries(getAllServiceCitySlugs()),
  "service-area": () => indexableFlatEntries(getAllServiceAreaSlugs()),
  "service-area-city": () => indexableFlatEntries(getAllServiceAreaCitySlugs()), // always empty by design (see shouldIndexPage)
  "local-intent-area": () => indexableFlatEntries(getAllLocalIntentAreaSlugs()),
  "hyperlocal-intent-area": () => indexableFlatEntries(getIndexableHyperlocalIntentAreaSlugs()),
  intent: () => indexableFlatEntries(getAllIntentSlugs()),
  price: () => indexableFlatEntries(getPriceSlugsSafe()),
  comparison: () => indexableFlatEntries(comparisons.map((c) => c.slug)),
  blog: blogEntries,
};

function getPriceSlugsSafe(): string[] {
  // price slugs are derived from shortName, not the service slug — recompute here to avoid a circular import.
  return services.map((s) =>
    `${s.shortName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-price`,
  );
}

const entryCache = new Map<SitemapBucket, SitemapUrlEntry[]>();

function getBucketEntries(bucket: SitemapBucket): SitemapUrlEntry[] {
  if (!entryCache.has(bucket)) {
    entryCache.set(bucket, bucketBuilders[bucket]());
  }
  return entryCache.get(bucket)!;
}

export function getBucketBatchCount(bucket: SitemapBucket): number {
  const count = getBucketEntries(bucket).length;
  return Math.max(1, Math.ceil(count / SITEMAP_MAX_URLS_PER_FILE));
}

export function getBucketBatch(bucket: SitemapBucket, batch: number): SitemapUrlEntry[] {
  const entries = getBucketEntries(bucket);
  const start = (batch - 1) * SITEMAP_MAX_URLS_PER_FILE;
  return entries.slice(start, start + SITEMAP_MAX_URLS_PER_FILE);
}

export function buildUrlsetXml(entries: SitemapUrlEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(e.loc)}</loc>\n    <lastmod>${e.lastModified}</lastmod>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

let qualifiedSitemapCache: SitemapUrlEntry[] | null = null;

/** All qualified indexable URLs, highest priority first. */
export function getAllQualifiedSitemapEntries(): SitemapUrlEntry[] {
  if (qualifiedSitemapCache) return qualifiedSitemapCache;

  const seen = new Set<string>();
  const entries: SitemapUrlEntry[] = [];

  for (const bucket of SEARCH_CONSOLE_GUARANTEED_BUCKETS) {
    addUniqueEntries(entries, seen, getBucketEntries(bucket), Number.POSITIVE_INFINITY);
  }

  addUniqueEntries(entries, seen, scaleBucketEntries(0.7), Number.POSITIVE_INFINITY);
  addUniqueEntries(
    entries,
    seen,
    scaleBucketEntries(0.5).filter((entry) => entry.priority < 0.7),
    Number.POSITIVE_INFINITY,
  );

  qualifiedSitemapCache = entries.sort((a, b) => b.priority - a.priority);
  return qualifiedSitemapCache;
}

/** Qualified URLs for the single /sitemap.xml (capped at 47,000, best first). */
export function getSearchConsoleSitemapEntries(): SitemapUrlEntry[] {
  return getAllQualifiedSitemapEntries().slice(0, SEARCH_CONSOLE_SITEMAP_MAX_URLS);
}

export function buildSearchConsoleSitemapXml(): string {
  return buildUrlsetXml(getSearchConsoleSitemapEntries());
}

export function getSearchConsoleSitemapUrlCount(): number {
  return getSearchConsoleSitemapEntries().length;
}

export function buildSitemapIndexXml(): string {
  const files: string[] = [];
  for (const bucket of Object.keys(bucketBuilders) as SitemapBucket[]) {
    const entries = getBucketEntries(bucket);
    if (entries.length === 0) continue; // never reference an empty sitemap file
    const batches = getBucketBatchCount(bucket);
    for (let b = 1; b <= batches; b++) {
      const filename = batches > 1 ? `${bucket}-${b}.xml` : `${bucket}.xml`;
      files.push(`  <sitemap>\n    <loc>${escapeXml(absoluteUrl(`/sitemaps/${filename}`))}</loc>\n    <lastmod>${now()}</lastmod>\n  </sitemap>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.join("\n")}\n</sitemapindex>`;
}

/** Parses a requested file like "service-city-1.xml" into { bucket: "service-city", batch: 1 }. */
export function parseSitemapFilename(filename: string): { bucket: SitemapBucket; batch: number } | null {
  const withoutExt = filename.replace(/\.xml$/i, "");
  const knownBuckets = Object.keys(bucketBuilders) as SitemapBucket[];

  // Try exact bucket match first (single-file buckets, e.g. "services.xml").
  if (knownBuckets.includes(withoutExt as SitemapBucket)) {
    return { bucket: withoutExt as SitemapBucket, batch: 1 };
  }

  // Otherwise expect "<bucket>-<batchNumber>".
  const match = withoutExt.match(/^(.+)-(\d+)$/);
  if (match) {
    const [, bucketPart, batchPart] = match;
    if (knownBuckets.includes(bucketPart as SitemapBucket)) {
      return { bucket: bucketPart as SitemapBucket, batch: Number(batchPart) };
    }
  }

  return null;
}

function escapeXml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Human-readable HTML sitemap — links per page (not the 47k XML batch size). */
export const HTML_SITEMAP_PAGE_SIZE = 500;

/** Buckets with at most this many URLs render fully on /sitemap. */
export const HTML_SITEMAP_INLINE_LIMIT = 500;

/** Preview count for large buckets on the main /sitemap page. */
export const HTML_SITEMAP_PREVIEW_SIZE = 250;

export function getSitemapBucketEntries(bucket: SitemapBucket): SitemapUrlEntry[] {
  return getBucketEntries(bucket);
}

export interface SitemapBucketSummary {
  bucket: SitemapBucket;
  count: number;
  htmlPages: number;
}

export function getSitemapBucketSummaries(): SitemapBucketSummary[] {
  return SITEMAP_BUCKETS.map((bucket) => {
    const count = getBucketEntries(bucket).length;
    return {
      bucket,
      count,
      htmlPages: count === 0 ? 0 : Math.ceil(count / HTML_SITEMAP_PAGE_SIZE),
    };
  }).filter((s) => s.count > 0);
}

export function getTotalSitemapUrlCount(): number {
  return getSitemapBucketSummaries().reduce((sum, s) => sum + s.count, 0);
}

export interface HtmlSitemapPageResult {
  entries: SitemapUrlEntry[];
  total: number;
  totalPages: number;
  page: number;
  bucket: SitemapBucket;
}

export function getHtmlSitemapPage(
  bucket: SitemapBucket,
  page: number,
  pageSize = HTML_SITEMAP_PAGE_SIZE,
): HtmlSitemapPageResult {
  const all = getBucketEntries(bucket);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    bucket,
    entries: all.slice(start, start + pageSize),
    total,
    totalPages,
    page: safePage,
  };
}

export function isSitemapBucket(value: string): value is SitemapBucket {
  return (SITEMAP_BUCKETS as readonly string[]).includes(value);
}
