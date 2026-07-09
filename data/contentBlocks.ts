/**
 * Reusable phrase-variant banks used to assemble unique-enough copy across thousands
 * of combinatorial pages. Each array holds several genuinely different phrasings of
 * the same idea; lib/pageGenerator.ts deterministically picks one per page (seeded by
 * the page's own slug) so the same page always renders the same content, but
 * different pages rarely line up on the same wording for every section at once.
 *
 * Placeholders resolved by lib/pageGenerator.ts: {service}, {pluralService}, {location},
 * {shortService}, {district}.
 */

export const introVariants: string[] = [
  "Get professional {service} in {location} for apartments, villas, balconies, windows, commercial buildings, schools, and high-rise buildings. {brand} provides safe, clean, and practical installation based on your space, building type, and requirement.",
  "Looking for reliable {service} in {location}? {brand} installs {pluralService} for homes and businesses across {location}, matching the material and layout to your building type and budget.",
  "{brand} is a trusted local installer of {service} in {location}, serving apartments, independent houses, villas, and commercial spaces with site-inspected, custom-fitted solutions.",
  "If you're comparing options for {service} in {location}, our team inspects your space first and recommends the right material and layout — no generic, one-size-fits-all quotes.",
];

export const whyImportantVariants: string[] = [
  "{location} has a growing mix of apartments, independent houses, and commercial buildings, which means fall-risk balconies, open terraces, and unwanted pigeon nesting are common concerns for residents.",
  "As construction in {location} continues to grow, more households are looking for a safe, long-lasting way to protect balconies and open areas without blocking light or ventilation.",
  "In {location}, families increasingly want a solution that keeps children, pets, and belongings safe on balconies and terraces without the heavy, view-blocking look of old-style iron grills.",
];

export const benefitsIntroVariants: string[] = [
  "Choosing the right {service} setup in {location} comes down to a few practical benefits our customers consistently value:",
  "Here is why homeowners and businesses across {location} choose our {service} installation:",
  "Our {service} customers in {location} typically highlight these advantages:",
];

export const installProcessVariants: string[][] = [
  [
    "Free on-site inspection and measurement of the space",
    "Material and layout recommendation based on the opening size and building type",
    "Firm quotation shared after the site visit — no hidden costs",
    "Professional installation by our trained in-house team",
    "Final quality check and handover with usage guidance",
  ],
  [
    "Initial call to understand your requirement and location",
    "Scheduled free site visit for accurate measurement",
    "Detailed quotation covering material, fittings, and labour",
    "Installation completed by our own technicians, not subcontractors",
    "Post-installation walkthrough so you know how to maintain it",
  ],
];

export const priceFactorsIntroVariants: string[] = [
  "The exact {service} price for your space in {location} depends on a few factors we assess during the free site visit:",
  "{service} pricing in {location} is not one-size-fits-all — here's what typically affects the final quotation:",
];

export const finalCtaVariants: string[] = [
  "Need {service} in {location}? Call or WhatsApp {brand} today for a free quote and site inspection.",
  "Ready to get {service} installed in {location}? Reach out to {brand} for a free site visit and no-obligation quote.",
  "Protect your space with professional {service} in {location} — call or WhatsApp {brand} to book a free inspection.",
];

export const nearbyAreasIntroVariants: string[] = [
  "We also install {service} in these nearby areas around {location}:",
  "Our {location} team regularly serves these neighbouring localities as well:",
];

export const localAreaIntroVariants: string[] = [
  "{areaName} is one of the localities we actively serve in {city} — {areaNote}",
  "In {areaName}, {city}, our team regularly installs {service} for local residents. {areaNote}",
];

export const commonProblemsIntroVariants: string[] = [
  "Customers in {location} typically reach out to us for one of these reasons:",
  "The most common problems we solve for {service} customers in {location} include:",
];
