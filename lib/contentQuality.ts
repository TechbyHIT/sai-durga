import type { PageContent } from "./pageGenerator";
import { wordCount } from "./slug";
import { MIN_CONTENT_WORDS, MIN_FAQ_ITEMS, MIN_INTERNAL_LINKS } from "@/data/pageRules";

export interface QualityInput {
  content: PageContent;
  /** Does this page carry a genuine, specific local fact (not just a swapped city name)? */
  hasLocalRelevance: boolean;
  hasPriceFactors: boolean;
  hasInstallProcess: boolean;
  hasCta: boolean;
  hasSchema: boolean;
}

export interface QualityResult {
  score: number;
  breakdown: Record<string, number>;
  totalWordCount: number;
  faqCount: number;
  internalLinkCount: number;
}

function contentWordCount(content: PageContent): number {
  let text = content.intro;
  for (const section of content.sections) {
    text += ` ${section.heading}`;
    if (section.paragraphs) text += ` ${section.paragraphs.join(" ")}`;
    if (section.items) text += ` ${section.items.join(" ")}`;
  }
  for (const faq of content.faqs) {
    text += ` ${faq.question} ${faq.answer}`;
  }
  return wordCount(text);
}

/**
 * Scores a page from 0-100 across the factors called out in the spec: unique intro,
 * service relevance, local relevance, nearby areas, price factors, installation
 * process, FAQs, internal links, schema, image alt text, content length, and CTA.
 * Only pages scoring >= QUALITY_INDEX_THRESHOLD (see shouldIndexPage.ts) get indexed.
 */
export function scoreContent(input: QualityInput): QualityResult {
  const { content } = input;
  const totalWordCount = contentWordCount(content);
  const faqCount = content.faqs.length;
  const internalLinkCount = content.relatedLinks.length + content.nearbyLinks.length;
  const hasNearbyContext = content.nearbyLinks.length >= 2;

  const breakdown: Record<string, number> = {
    uniqueIntro: content.intro && wordCount(content.intro) >= 15 ? 8 : 0,
    serviceRelevance: content.sections.length >= 4 ? 8 : content.sections.length >= 2 ? 4 : 0,
    localRelevance: input.hasLocalRelevance ? 10 : 0,
    nearbyAreas: hasNearbyContext ? 8 : content.nearbyLinks.length === 1 ? 4 : 0,
    priceFactors: input.hasPriceFactors ? 8 : 0,
    installProcess: input.hasInstallProcess ? 8 : 0,
    faqs: Math.round(Math.min(1, faqCount / MIN_FAQ_ITEMS) * 12),
    internalLinks: Math.round(Math.min(1, internalLinkCount / MIN_INTERNAL_LINKS) * 10),
    schema: input.hasSchema ? 8 : 0,
    imageAlt: content.heroImage?.alt ? 2 : 0,
    contentLength: Math.round(Math.min(1, totalWordCount / MIN_CONTENT_WORDS) * 12),
    cta: input.hasCta ? 6 : 0,
  };

  const score = Object.values(breakdown).reduce((sum, v) => sum + v, 0);

  return { score, breakdown, totalWordCount, faqCount, internalLinkCount };
}
