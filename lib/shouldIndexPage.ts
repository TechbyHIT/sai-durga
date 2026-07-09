import type { ResolvedFlatPage, PageContent } from "./pageGenerator";
import { scoreContent, QualityResult } from "./contentQuality";
import { QUALITY_INDEX_THRESHOLD, MIN_CONTENT_WORDS, MIN_FAQ_ITEMS, MIN_INTERNAL_LINKS, CrawlPriority, CRAWL_PRIORITY } from "@/data/pageRules";

export interface PageQualityData {
  pageType: string;
  qualityScore: number;
  comboMeaningful: boolean;
  hasSearchDemand: boolean;
  isTestOrDraft: boolean;
  isFilteredOrSearchPage: boolean;
  alwaysCanonicalizesElsewhere: boolean;
  faqCount: number;
  internalLinkCount: number;
  totalWordCount: number;
}

export interface IndexDecision {
  index: boolean;
  reasons: string[];
}

/**
 * The single gate that decides whether a page is allowed into the sitemap and
 * served with `index,follow`. Every rule from the spec's "Indexing Rules" section
 * is checked explicitly and independently so the decision is auditable — a page
 * must pass *all* of them, not just hit a quality-score number.
 */
export function shouldIndexPage(data: PageQualityData): IndexDecision {
  const reasons: string[] = [];

  if (data.alwaysCanonicalizesElsewhere) {
    reasons.push("Page canonicalizes to a stronger, non-duplicate page");
  }
  if (data.isTestOrDraft) {
    reasons.push("Test or draft page");
  }
  if (data.isFilteredOrSearchPage) {
    reasons.push("Filtered/search-parameter page");
  }
  if (!data.comboMeaningful) {
    reasons.push("Service-location (or service-intent) combination is not meaningful");
  }
  if (!data.hasSearchDemand) {
    reasons.push("No sufficient real search demand signal for this combination");
  }
  if (data.totalWordCount < MIN_CONTENT_WORDS) {
    reasons.push(`Content too thin (${data.totalWordCount} words, need ${MIN_CONTENT_WORDS}+)`);
  }
  if (data.faqCount < MIN_FAQ_ITEMS) {
    reasons.push(`Not enough FAQ content (${data.faqCount}, need ${MIN_FAQ_ITEMS}+)`);
  }
  if (data.internalLinkCount < MIN_INTERNAL_LINKS) {
    reasons.push(`Not enough internal links (${data.internalLinkCount}, need ${MIN_INTERNAL_LINKS}+)`);
  }
  if (data.qualityScore < QUALITY_INDEX_THRESHOLD) {
    reasons.push(`Quality score ${data.qualityScore} is below the ${QUALITY_INDEX_THRESHOLD} indexing threshold`);
  }

  return { index: reasons.length === 0, reasons };
}

function comboMeaningfulFor(resolved: ResolvedFlatPage): boolean {
  switch (resolved.pageType) {
    case "service-area-city":
      // Always a *valid* combination, but intentionally never the canonical/indexed one.
      return true;
    default:
      return true; // The resolver itself already rejects anything not a real, curated combination.
  }
}

function hasSearchDemandFor(resolved: ResolvedFlatPage): boolean {
  const service = resolved.service;
  switch (resolved.pageType) {
    case "service-city": {
      const city = resolved.city!;
      // Reject only the weakest pairing: a low/medium-demand service in an emerging-tier city.
      return !(service!.demandTier !== "high" && city.tier === "emerging");
    }
    case "service-area": {
      const area = resolved.area!;
      return area.tier !== "emerging" || service!.demandTier === "high";
    }
    case "local-intent-area": {
      const area = resolved.area!;
      return area.tier !== "emerging" || service!.demandTier === "high";
    }
    case "local-intent-city":
      return false; // city keyword pages canonicalize to the stronger service+city page
    case "hyperlocal-intent-area": {
      // Promoted (top-ranked) areas expose audience-specific pages to the index; the rest
      // stay noindex and canonicalize up to the broader local-intent-area page.
      const area = resolved.area!;
      return resolved.canonicalSlug === resolved.slug && (area.tier !== "emerging" || service!.demandTier === "high");
    }
    case "service-area-city":
      return false; // never indexed directly — see alwaysCanonicalizesElsewhere below
    case "intent":
    case "price":
    case "comparison":
    case "service":
    default:
      return true;
  }
}

function crawlPriorityFor(resolved: ResolvedFlatPage): CrawlPriority {
  switch (resolved.pageType) {
    case "service":
      return CRAWL_PRIORITY.P1;
    case "service-city":
      return resolved.city?.tier === "priority" ? CRAWL_PRIORITY.P1 : CRAWL_PRIORITY.P2;
    case "price":
    case "comparison":
      return CRAWL_PRIORITY.P2;
    case "service-area":
      return resolved.area?.tier === "priority" ? CRAWL_PRIORITY.P2 : CRAWL_PRIORITY.P3;
    case "local-intent-area":
      return resolved.area?.tier === "priority" ? CRAWL_PRIORITY.P2 : CRAWL_PRIORITY.P3;
    case "hyperlocal-intent-area":
      return resolved.canonicalSlug === resolved.slug ? CRAWL_PRIORITY.P3 : CRAWL_PRIORITY.P4;
    case "local-intent-city":
      return CRAWL_PRIORITY.P4;
    case "intent":
      return CRAWL_PRIORITY.P2;
    case "service-area-city":
      return CRAWL_PRIORITY.P4;
    default:
      return CRAWL_PRIORITY.P3;
  }
}

export interface EvaluatedPage {
  quality: QualityResult;
  decision: IndexDecision;
  crawlPriority: CrawlPriority;
}

/**
 * Fast, metadata-only index decision for sitemap enumeration.
 *
 * For the programmatic flat-slug page types, indexing is fully determined by the
 * deterministic rules (self-canonical, meaningful combination, search-demand tier) —
 * the content-quality gates (word count, FAQ count, internal links, score) always pass
 * because every page is assembled from the same rich templates (verified by pages:stats).
 * Skipping the full content build + scoring here lets us emit sitemaps for 400k+ URLs
 * without building content for every one, which is what previously blew past build/ISR
 * timeouts. app/[slug]/page.tsx still runs the full evaluateFlatPage pipeline per request.
 */
export function isFlatPageIndexableByMetadata(resolved: ResolvedFlatPage): boolean {
  if (resolved.canonicalSlug !== resolved.slug) return false;
  if (!comboMeaningfulFor(resolved)) return false;
  if (!hasSearchDemandFor(resolved)) return false;
  return true;
}

/** Crawl priority derived purely from resolved metadata (no content build required). */
export function crawlPriorityForResolved(resolved: ResolvedFlatPage): CrawlPriority {
  return crawlPriorityFor(resolved);
}

/** Convenience wrapper used by app/[slug]/page.tsx to go from resolved+content straight to an index decision. */
export function evaluateFlatPage(resolved: ResolvedFlatPage, content: PageContent): EvaluatedPage {
  const hasLocalRelevance = Boolean(resolved.city || resolved.area);
  const hasPriceFactors = resolved.pageType !== "comparison";
  const hasInstallProcess = ["service", "service-city", "service-area", "service-area-city"].includes(resolved.pageType);

  const quality = scoreContent({
    content,
    hasLocalRelevance: resolved.pageType === "intent" || resolved.pageType === "price" || resolved.pageType === "comparison" ? true : hasLocalRelevance,
    hasPriceFactors,
    hasInstallProcess: hasInstallProcess || resolved.pageType === "intent",
    hasCta: true,
    hasSchema: true,
  });

  const decision = shouldIndexPage({
    pageType: resolved.pageType,
    qualityScore: quality.score,
    comboMeaningful: comboMeaningfulFor(resolved),
    hasSearchDemand: hasSearchDemandFor(resolved),
    isTestOrDraft: false,
    isFilteredOrSearchPage: false,
    alwaysCanonicalizesElsewhere: resolved.canonicalSlug !== resolved.slug,
    faqCount: quality.faqCount,
    internalLinkCount: quality.internalLinkCount,
    totalWordCount: quality.totalWordCount,
  });

  return { quality, decision, crawlPriority: crawlPriorityFor(resolved) };
}

/** Same evaluation pipeline for hub-style pages (city, area, blog) that aren't resolved via the flat-slug parser. */
export function evaluateHubPage(
  content: PageContent,
  opts: { pageType: string; crawlPriority: CrawlPriority; hasLocalRelevance?: boolean },
): EvaluatedPage {
  const quality = scoreContent({
    content,
    hasLocalRelevance: opts.hasLocalRelevance ?? true,
    hasPriceFactors: opts.pageType !== "blog",
    hasInstallProcess: opts.pageType !== "blog",
    hasCta: true,
    hasSchema: true,
  });

  const decision = shouldIndexPage({
    pageType: opts.pageType,
    qualityScore: quality.score,
    comboMeaningful: true,
    hasSearchDemand: true,
    isTestOrDraft: false,
    isFilteredOrSearchPage: false,
    alwaysCanonicalizesElsewhere: false,
    faqCount: quality.faqCount,
    internalLinkCount: quality.internalLinkCount,
    totalWordCount: quality.totalWordCount,
  });

  return { quality, decision, crawlPriority: opts.crawlPriority };
}
