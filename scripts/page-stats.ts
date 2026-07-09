/**
 * Programmatic SEO audit CLI.
 *
 * Walks every page combination the site is capable of generating (cities, areas,
 * blog posts, and every flat-slug page type), runs it through the exact same
 * `evaluateFlatPage` / `evaluateHubPage` pipeline the live routes use, and prints
 * a summary of how many pages would be indexed vs noindexed, broken down by
 * page type and crawl priority. Use this to sanity-check the effect of data
 * changes (new cities/areas/services) before deploying.
 *
 * Usage: npm run pages:stats
 */
import { cities } from "../data/cities";
import { areas } from "../data/areas";
import { blogPosts } from "../data/blogTopics";
import {
  buildCityContent,
  buildAreaContent,
  buildBlogContent,
  resolveFlatSlug,
  buildFlatPageContent,
  getAllServiceSlugs,
  getAllServiceCitySlugs,
  getAllServiceAreaSlugs,
  getAllServiceAreaCitySlugs,
  getAllLocalIntentAreaSlugs,
  getAllLocalIntentCitySlugs,
  getAllHyperlocalIntentAreaSlugs,
  getIndexableHyperlocalIntentAreaSlugs,
  getAllIntentSlugs,
  getAllPriceSlugs,
  getAllComparisonSlugs,
} from "../lib/pageGenerator";
import { evaluateHubPage, evaluateFlatPage } from "../lib/shouldIndexPage";
import { CRAWL_PRIORITY } from "../data/pageRules";

interface Row {
  group: string;
  total: number;
  indexed: number;
  noindexed: number;
  avgScore: number;
  sampleRejections: string[];
}

function summarizeRow(group: string, results: { index: boolean; score: number; reasons: string[] }[]): Row {
  const indexed = results.filter((r) => r.index).length;
  const avgScore = results.length ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : 0;
  const sampleRejections = Array.from(
    new Set(results.filter((r) => !r.index).flatMap((r) => r.reasons)),
  ).slice(0, 5);
  return { group, total: results.length, indexed, noindexed: results.length - indexed, avgScore, sampleRejections };
}

function summarizeKnownNoindexRow(group: string, total: number, reasons: string[]): Row {
  return { group, total, indexed: 0, noindexed: total, avgScore: 0, sampleRejections: reasons };
}

function printTable(rows: Row[]) {
  const header = ["Page type", "Total", "Indexed", "Noindexed", "Avg score"];
  const widths = [22, 8, 9, 11, 10];
  const line = (cols: string[]) => cols.map((c, i) => c.padEnd(widths[i])).join(" ");
  console.log(line(header));
  console.log("-".repeat(widths.reduce((a, b) => a + b + 1, 0)));
  for (const row of rows) {
    console.log(
      line([row.group, String(row.total), String(row.indexed), String(row.noindexed), String(row.avgScore)]),
    );
  }
  console.log("");

  for (const row of rows) {
    if (row.sampleRejections.length) {
      console.log(`  [${row.group}] top noindex reasons:`);
      row.sampleRejections.forEach((r) => console.log(`    - ${r}`));
    }
  }
}

function main() {
  const rows: Row[] = [];

  rows.push(
    summarizeRow(
      "city",
      cities.map((c) => {
        const content = buildCityContent(c);
        const e = evaluateHubPage(content, { pageType: "city", crawlPriority: CRAWL_PRIORITY.P1 });
        return { index: e.decision.index, score: e.quality.score, reasons: e.decision.reasons };
      }),
    ),
  );

  rows.push(
    summarizeRow(
      "area",
      areas.map((a) => {
        const content = buildAreaContent(a);
        const e = evaluateHubPage(content, { pageType: "area", crawlPriority: CRAWL_PRIORITY.P2 });
        return { index: e.decision.index, score: e.quality.score, reasons: e.decision.reasons };
      }),
    ),
  );

  rows.push(
    summarizeRow(
      "blog",
      blogPosts.map((p) => {
        const content = buildBlogContent(p);
        const e = evaluateHubPage(content, { pageType: "blog", crawlPriority: CRAWL_PRIORITY.P2 });
        return { index: e.decision.index, score: e.quality.score, reasons: e.decision.reasons };
      }),
    ),
  );

  const flatGroups: Record<string, string[]> = {
    service: getAllServiceSlugs(),
    "service-city": getAllServiceCitySlugs(),
    "service-area": getAllServiceAreaSlugs(),
    "service-area-city": getAllServiceAreaCitySlugs(),
    "local-intent-area": getAllLocalIntentAreaSlugs(),
    intent: getAllIntentSlugs(),
    price: getAllPriceSlugs(),
    comparison: getAllComparisonSlugs(),
  };

  for (const [group, slugs] of Object.entries(flatGroups)) {
    const results = slugs.map((slug) => {
      const resolved = resolveFlatSlug(slug);
      if (!resolved) return { index: false, score: 0, reasons: ["UNRESOLVED"] };
      const content = buildFlatPageContent(resolved);
      const e = evaluateFlatPage(resolved, content);
      return { index: e.decision.index, score: e.quality.score, reasons: e.decision.reasons };
    });
    rows.push(summarizeRow(group, results));
  }

  rows.push(
    summarizeKnownNoindexRow("local-intent-city", getAllLocalIntentCitySlugs().length, [
      "Page canonicalizes to the stronger service-city page",
      "No sufficient real search demand signal for this combination",
    ]),
  );

  // Hyperlocal: only the promoted (top-ranked) areas are evaluated through the real
  // pipeline; the remaining theoretical URLs stay noindex and are counted analytically
  // so we don't build content for the full ~1.2M set just to audit it.
  const hyperlocalTotal = getAllHyperlocalIntentAreaSlugs().length;
  const hyperlocalIndexable = getIndexableHyperlocalIntentAreaSlugs();
  const hyperlocalResults = hyperlocalIndexable.map((slug) => {
    const resolved = resolveFlatSlug(slug);
    if (!resolved) return { index: false, score: 0, reasons: ["UNRESOLVED"] };
    const content = buildFlatPageContent(resolved);
    const e = evaluateFlatPage(resolved, content);
    return { index: e.decision.index, score: e.quality.score, reasons: e.decision.reasons };
  });
  const hyperlocalIndexed = hyperlocalResults.filter((r) => r.index).length;
  const hyperlocalAvg = hyperlocalResults.length
    ? Math.round(hyperlocalResults.reduce((s, r) => s + r.score, 0) / hyperlocalResults.length)
    : 0;
  rows.push({
    group: "hyperlocal-intent-area",
    total: hyperlocalTotal,
    indexed: hyperlocalIndexed,
    noindexed: hyperlocalTotal - hyperlocalIndexed,
    avgScore: hyperlocalAvg,
    sampleRejections: ["Non-promoted areas canonicalize to the broader local-intent-area page"],
  });

  const totalPages = rows.reduce((s, r) => s + r.total, 0);
  const totalIndexed = rows.reduce((s, r) => s + r.indexed, 0);

  console.log(`\nProgrammatic SEO Page Audit`);
  console.log(`===========================\n`);
  printTable(rows);
  console.log(`TOTAL: ${totalPages} possible pages -> ${totalIndexed} indexed (${totalPages - totalIndexed} noindex/canonicalized)\n`);
}

main();
