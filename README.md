# Saidurga Invisible Grills — Programmatic SEO Platform

A production-ready Next.js 15 (App Router) system for **Saidurga Invisible Grills**, built to
scale from a handful of pages up to hundreds of thousands of service × location page
combinations — **without ever indexing thin, duplicate, or doorway content.**

- Phone / WhatsApp: **+91 8121202055**
- Email: **invisiblegrillssaidurga@gmail.com**
- Services: Invisible Grills, Safety Nets, Balcony Safety Nets, Pigeon Nets, Bird Nets,
  Anti Bird Spikes, Children Safety Nets, Pet Safety Nets, Terrace Safety Nets,
  Duct Area Nets, Cloth Hangers, Sports Nets, Cricket Nets.

---

## 1. Core idea: generate wide, index narrow

The system is capable of *describing* up to hundreds of thousands of page combinations
(service × city, service × area, service × area × city, service × intent, price,
comparison, blog, etc.) from structured data. But **generating a URL and indexing a URL
are two separate decisions.**

1. **Every possible page** is resolved on demand from data (`lib/pageGenerator.ts`).
2. **Every resolved page** is scored 0–100 for content quality (`lib/contentQuality.ts`).
3. **Every scored page** is run through explicit business rules — search demand, combo
   validity, minimum FAQs/links/words — via `shouldIndexPage()` (`lib/shouldIndexPage.ts`).
4. **Only pages that pass all checks** get `robots: index,follow`, a self-referencing
   canonical, and a slot in the sitemap. Everything else is still rendered (so a visitor
   or a direct link never 404s) but served `noindex,follow` and left out of the sitemap.

Run `npm run pages:stats` at any time to see exactly how many of the currently
describable pages pass vs. fail, and why (see [§8](#8-auditing-the-system)).

---

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript |
| Styling | Tailwind CSS (custom 60/30/10 white/gold/silver palette) |
| Rendering | Server Components by default; `"use client"` only for interactive bits (accordion, forms, floating buttons) |
| Priority pages | Statically generated at build time (`generateStaticParams`) |
| Long-tail pages | Rendered on first request, then cached with ISR (`revalidate`) |
| Sitemaps | Dynamic sitemap index + batched sitemap files, generated at request time from the same data/rules the pages use |
| Schema | Reusable JSON-LD builders — Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Website, Article, ImageObject |

---

## 3. Project structure

```
app/
  layout.tsx                 Root layout: header, footer, floating CTAs, global schema
  page.tsx                   Homepage (P1, static)
  globals.css                Tailwind base styles + 60/30/10 palette
  robots.ts                  robots.txt (allow/disallow + sitemap index link)
  sitemap.xml/route.ts       Sitemap INDEX (lists every non-empty bucket)
  sitemaps/[file]/route.ts   Individual batched sitemap files (<50k URLs each)

  services/page.tsx          Services hub (index of all 13 services)
  locations/page.tsx         Locations hub (index of all cities)
  locations/[city]/page.tsx  City pages (static, P1)
  areas/page.tsx             Areas hub, grouped by city
  areas/[area]/page.tsx      Area pages (static for priority areas, on-demand otherwise)
  blog/page.tsx              Blog index
  blog/[slug]/page.tsx       Blog / guide posts
  contact/page.tsx           Contact page + lead form
  faq/page.tsx                Combined business + service FAQ hub
  [slug]/page.tsx            Catch-all resolver for:
                               service, service-city, service-area,
                               service-area-city, intent, price, comparison
  not-found.tsx              Custom 404

components/                  Header, Footer, Hero, CTAButtons, LeadForm, ServiceCard,
                              LocationCard, FAQAccordion, Breadcrumbs, Schema,
                              InternalLinks, Gallery, FloatingButtons, PageTemplate,
                              ContentSections (incl. ComparisonTable), TrustCards

data/                        services.ts, cities.ts, areas.ts, keywords.ts, seoScale.ts,
                              faqs.ts, contentBlocks.ts, comparisons.ts, blogTopics.ts,
                              pageRules.ts (thresholds, crawl priorities, sitemap buckets)

lib/                         slug.ts, seo.ts (generateMetadata builder), schema.ts,
                              contentQuality.ts (0–100 scorer), shouldIndexPage.ts
                              (the indexing gate), internalLinks.ts, pageGenerator.ts
                              (content assembly + slug resolution), images.ts, sitemap.ts

scripts/
  copy-images.mjs            Copies /images -> /public/images with SEO-friendly,
                              de-duplicated filenames + builds an image manifest
  page-stats.ts              Audits every describable page combination against the
                              indexing pipeline (npm run pages:stats)

public/images/               Optimized, renamed images actually served to the site
images/                      Your original source images (left untouched, not served directly)
```

---

## 4. Page types & routing

| Page type | Example URL | Route file | Build strategy |
|---|---|---|---|
| Homepage | `/` | `app/page.tsx` | Static |
| Main service | `/invisible-grills` | `app/[slug]/page.tsx` | Static (`generateStaticParams`) |
| City | `/locations/visakhapatnam` | `app/locations/[city]/page.tsx` | Static, all cities |
| Area | `/areas/gajuwaka` | `app/areas/[area]/page.tsx` | Static for priority areas, on-demand + ISR otherwise |
| Service + City | `/invisible-grills-in-visakhapatnam` | `app/[slug]/page.tsx` | Static for top combos, on-demand otherwise |
| Service + Area | `/invisible-grills-in-gajuwaka` | `app/[slug]/page.tsx` | On-demand + ISR, cached after first hit |
| Service + Area + City | `/invisible-grills-in-gajuwaka-visakhapatnam` | `app/[slug]/page.tsx` | Rendered so it never 404s, but **always noindex** and canonicalizes to the Service + Area page (see §5) |
| Price | `/invisible-grill-price` | `app/[slug]/page.tsx` | Static |
| Comparison | `/invisible-grills-vs-safety-nets` | `app/[slug]/page.tsx` | Static |
| Intent (for apartments, for pets, etc.) | `/invisible-grills-for-apartments` | `app/[slug]/page.tsx` | Static for priority intents |
| Blog / Guide | `/blog/how-to-stop-pigeons-in-balcony` | `app/blog/[slug]/page.tsx` | Static for priority posts |
| FAQ hub | `/faq` | `app/faq/page.tsx` | Static |
| Contact | `/contact` | `app/contact/page.tsx` | Static |

**Why a single `[slug]` catch-all instead of separate `[service]-in-[city]` folders?**
Next.js can't have two sibling dynamic segments try to match overlapping shapes
(`[service]-in-[city]` and `[service]-in-[area]` are structurally ambiguous at the
routing layer). Instead, `app/[slug]/page.tsx` parses the slug once
(`resolveFlatSlug` in `lib/pageGenerator.ts`) against the real service/city/area/intent
data and decides what kind of page it is. This also makes it trivial to add new combo
types later without restructuring routes.

---

## 5. Canonical & noindex logic

- **Every indexable page** gets a self-referencing `<link rel="canonical">` via
  `buildMetadata()` in `lib/seo.ts`.
- **Service + Area + City** pages are a real, crawlable URL (so internal links and direct
  visits work), but they are *by design* never the strongest version of that content —
  they're a superset of the Service + Area page. `shouldIndexPage()` always marks them
  `alwaysCanonicalizesElsewhere: true`, so they render with `noindex,follow` and a
  canonical URL pointing at `/service-in-area`.
- **Low-demand Service + City / Service + Area combinations** (e.g. a low-demand service
  paired with an "emerging" tier city/area — see `data/cities.ts` / `data/areas.ts` tier
  fields) fail the `hasSearchDemand` check and are also served `noindex,follow` with no
  sitemap entry, rather than being deleted — if that area grows in tier later, the page
  automatically starts qualifying without any code change.

---

## 6. Content quality scoring (`lib/contentQuality.ts`)

Every page is scored 0–100 across the dimensions in the original spec: unique intro,
service relevance, local relevance, nearby-areas coverage, price factors, installation
process, FAQ depth, internal link count, schema presence, image alt text, total word
count, customer-problem coverage, CTA presence, and duplicate-paragraph detection.

`QUALITY_INDEX_THRESHOLD = 75` (in `data/pageRules.ts`) is the minimum score to even be
*eligible* for indexing — but hitting 75 alone isn't sufficient. `shouldIndexPage()` also
independently enforces:

- `MIN_CONTENT_WORDS` (300+) — no thin pages
- `MIN_FAQ_ITEMS` (3+) — every page answers real questions
- `MIN_INTERNAL_LINKS` — every page is part of the link graph, never an orphan
- Real search-demand signal for the specific service/location pairing
- Meaningful combination (rejects nonsensical service-location pairings)
- Not a test/draft/filtered page

A page must pass **every** rule, not just the score, to be indexed.

---

## 7. Sitemap & robots strategy

- `app/sitemap.xml/route.ts` serves a **sitemap index** that lists only the buckets that
  currently have at least one indexable URL (empty buckets are omitted automatically).
- `app/sitemaps/[file]/route.ts` serves each **batch file** (`core.xml`, `services.xml`,
  `locations.xml`, `areas.xml`, `service-city.xml`, `service-area.xml`, `intent.xml`,
  `price.xml`, `comparison.xml`, `blog.xml`), each capped under 50,000 URLs
  (`lib/sitemap.ts` auto-splits into `-1.xml`, `-2.xml`, … if a bucket ever grows past
  that limit — this is what lets the system scale to 400k+ URLs without ever producing
  an oversized sitemap).
- Only pages where `shouldIndexPage()` returns `index: true` are ever written into a
  sitemap file — noindexed pages are silently excluded, never listed and then blocked.
- `app/robots.ts` disallows `/api/`, `/admin/`, `/search/`, `/test/`, `/draft/`, and
  tracking/sort/filter query params, and points crawlers at the sitemap index.

---

## 8. Auditing the system

```bash
npm run pages:stats
```

This walks every service, city, area, blog post, and flat-slug combination the site can
currently describe, runs each one through the exact same scoring + indexing pipeline the
live pages use, and prints a table like:

```
Page type              Total    Indexed   Noindexed   Avg score
-----------------------------------------------------------------
city                   24       24        0           100
area                   182      182       0           100
blog                   6        6         0           84
service                15       15        0           90
service-city           360      315       45          100
service-area           2730     2280      450         100
service-area-city      2730     0         2730        100
local-intent-area      147420   123120    24300       92
intent                 94       94        0           100
price                  15       15        0           92
comparison             9        9         0           84
local-intent-city      19440    0         19440       0
hyperlocal-intent-area 1179360  0         1179360     0

TOTAL: 1352385 possible pages -> 126060 indexed (1226325 noindex/canonicalized)
```

Use this after adding new cities/areas/services to confirm nothing regressed and to see
exactly why any page is being held back (top rejection reasons are printed per group).

---

## 9. Scaling to 400,000 pages

The architecture now describes more than 1.3 million possible URL combinations while
keeping each sitemap file under the 47,000 URL batch target. This is done with three layers:

1. **Core pages** — services, cities, areas, price guides, comparisons, blog guides, and
   standard service-location pages.
2. **Indexable local-intent area pages** — 54 curated local SEO modifiers from
   `data/seoScale.ts` combine with services and real areas, producing URLs such as
   `/invisible-grills-installation-in-gajuwaka`. These are eligible for sitemap inclusion
   only when the service/area pair passes the same demand and quality rules as all other
   pages.
3. **Deep hyperlocal audience pages** — modifier + audience + area URLs such as
   `/invisible-grills-installation-for-apartments-in-gajuwaka`. These count toward the
   400k possible-page architecture, render on demand for direct visits, but are
   `noindex` and canonicalized to the stronger local-intent area page until a real demand
   signal justifies promotion.

Growing further is still data-driven:

1. **Add data, not code.** Add more cities/areas to `data/cities.ts` / `data/areas.ts`
   (with a `tier` of `priority`, `standard`, or `emerging`), and the catch-all resolver,
   quality scorer, and indexing gate automatically pick them up — no new routes needed.
2. **Tiering controls both crawl budget and indexing.**
   - `tier: "priority"` cities/areas get `generateStaticParams` treatment (pre-built at
     deploy time) and are linked from primary navigation.
   - `tier: "standard"` pages render on-demand with ISR caching.
   - `tier: "emerging"` combinations are rendered on-demand but only indexed once they
     pair with a `high` demand-tier service (`hasSearchDemandFor` in
     `lib/shouldIndexPage.ts`) — this is the main lever that prevents 400k low-value
     pages from all going live at once.
3. **`dynamicParams = true`** on every dynamic route means slugs *not* in
   `generateStaticParams` still resolve correctly on first request (rendered, cached,
   then served from cache/CDN on subsequent hits) rather than 404ing.
4. **Sitemaps auto-batch.** `lib/sitemap.ts` splits any bucket over 47,000 URLs into
   numbered files (`service-city-1.xml`, `service-city-2.xml`, …) automatically — the
   sitemap index picks up new batch files without code changes while staying below
   Google's 50,000 URL hard limit.
5. **Re-run `npm run pages:stats`** after large data additions to confirm the indexed
   fraction still looks healthy (i.e. you're not suddenly indexing a wave of low-quality
   pages) before deploying.

In short: the ceiling is 400,000 *describable* URLs, but the number that actually get
`index,follow` and a sitemap entry is whatever passes the quality bar — which is the
entire point of the system.

---

## 10. Images

Source images live in `/images/<category>/...` (as already provided) and are copied —
never duplicated — into `/public/images/<kebab-case-category>/...` by
`scripts/copy-images.mjs`, which:

- Runs automatically before `dev` and `build` (`predev` / `prebuild` npm scripts).
- Skips a file if the destination already exists and matches (no duplicate copies).
- Renames files to descriptive, SEO-friendly, kebab-case names.
- Produces `lib/imageManifest.json`, which `lib/images.ts` uses to attach the right
  category image (with proper alt text) to each generated page type.

---

## 11. Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other useful commands:

```bash
npm run build       # production build (also runs image copy + typecheck + lint via Next)
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run pages:stats  # audit indexing decisions across every page combination
```

## 12. Editing content

- **Business info / phone / WhatsApp / email**: `data/services.ts` top-level constants
  and `lib/seo.ts` / `app/layout.tsx` (site-wide schema + footer).
- **Services**: `data/services.ts`.
- **Cities / Areas**: `data/cities.ts`, `data/areas.ts` — remember to set a `tier`.
- **FAQs**: `data/faqs.ts` (business-wide + per-service).
- **Blog posts**: `data/blogTopics.ts`.
- **Comparisons**: `data/comparisons.ts`.
- **Thresholds** (min words, min FAQs, quality bar, crawl priorities, sitemap bucket
  definitions): `data/pageRules.ts`.
