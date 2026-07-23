/**
 * Central tuning knobs for the whole programmatic SEO system. Changing a number here
 * changes behaviour across quality scoring, indexing, static generation, and sitemap
 * generation — there is intentionally no duplication of these values elsewhere.
 */

/** Pages scoring below this are noindexed (never included in sitemaps). */
export const QUALITY_INDEX_THRESHOLD = 75;

/** Absolute floor — pages below this score are not even rendered on demand, they 404. */
export const QUALITY_RENDER_FLOOR = 40;

/** Google's own limit is 50,000 URLs/file; 47k keeps a buffer while matching the target sitemap size. */
export const SITEMAP_MAX_URLS_PER_FILE = 47000;

/** ISR revalidation windows, in seconds. */
export const REVALIDATE = {
  priorityPage: 60 * 60 * 24, // 24h — priority pages change rarely but should stay fresh
  longTailPage: 60 * 60 * 24 * 3, // 3 days — long-tail pages revalidate less aggressively
  hubPage: 60 * 60 * 12, // 12h — index/hub pages (services, locations, blog)
};

/** How many of each combination type get generateStaticParams (built at deploy time). */
export const PRIORITY_LIMITS = {
  topCities: 10,
  topServiceCityPages: 100,
  topServiceAreaPages: 500,
  topAreaPages: 40,
  topBlogPages: 20,
};

/** Minimum visible word count for a page to be considered "substantial" (anti-thin-content check). */
export const MIN_CONTENT_WORDS = 300;

/** Minimum number of FAQ items required for a combination page to qualify for indexing. */
export const MIN_FAQ_ITEMS = 3;

/** Minimum number of internal links required for a combination page to qualify for indexing. */
export const MIN_INTERNAL_LINKS = 4;

/**
 * How many top-ranked areas (ordered priority → standard → emerging) are allowed to
 * promote their audience-specific hyperlocal pages (e.g.
 * /invisible-grills-installation-for-apartments-in-gajuwaka) into the index instead of
 * canonicalizing them to the broader local-intent-area page.
 *
 * Each promoted area contributes services × modifiers × audiences indexable URLs, so this
 * single knob is the main lever for total indexed scale. At the current dataset
 * (15 services × 54 modifiers × 8 audiences = 6,480 URLs/area) a value of 43 lifts the
 * indexed total to roughly 400k pages. Raise it to index more areas, lower it to pull back.
 */
export const HYPERLOCAL_INDEXED_AREA_COUNT = 43;

export const CRAWL_PRIORITY = {
  P1: "P1", // homepage, main services, top cities, top service+city
  P2: "P2", // area pages, price pages, comparisons, blog guides
  P3: "P3", // long-tail service+area with real demand
  P4: "P4", // low-demand, kept noindex until improved
} as const;

export type CrawlPriority = (typeof CRAWL_PRIORITY)[keyof typeof CRAWL_PRIORITY];

/** Sitemap batch registry — each key becomes /sitemaps/<key>-N.xml */
export const SITEMAP_BUCKETS = [
  "core",
  "services",
  "locations",
  "areas",
  "service-city",
  "service-area",
  "service-area-city",
  "local-intent-area",
  "hyperlocal-intent-area",
  "intent",
  "price",
  "comparison",
  "blog",
] as const;

export type SitemapBucket = (typeof SITEMAP_BUCKETS)[number];

/**
 * Max URLs in the single /sitemap.xml for Google Search Console.
 * Google allows 50,000 per file; 47,000 keeps a safe buffer.
 */
export const SEARCH_CONSOLE_SITEMAP_MAX_URLS = SITEMAP_MAX_URLS_PER_FILE;

/** Always included first — hubs and core commercial pages. */
export const SEARCH_CONSOLE_GUARANTEED_BUCKETS = [
  "core",
  "services",
  "locations",
  "areas",
  "service-city",
  "service-area",
  "intent",
  "price",
  "comparison",
  "blog",
] as const satisfies readonly SitemapBucket[];

/** Filled after guaranteed buckets until SEARCH_CONSOLE_SITEMAP_MAX_URLS is reached. */
export const SEARCH_CONSOLE_SCALE_BUCKETS = [
  "local-intent-area",
  "hyperlocal-intent-area",
] as const satisfies readonly SitemapBucket[];
