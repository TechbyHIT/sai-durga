export type IntentGroup = "property" | "problem" | "installLocation";

export interface Intent {
  slug: string;
  label: string;
  group: IntentGroup;
  /** Used inside sentences, e.g. "designed for {sentenceLabel}". */
  sentenceLabel: string;
  description: string;
}

/**
 * Master registry of "Service + Intent" modifiers (property type, problem, or install
 * location). Every combination page (e.g. /invisible-grills-for-apartments/) must map
 * to one of these AND be explicitly whitelisted for that service in
 * `serviceExtraIntents` / the service's own `propertyTypes` — this is what stops the
 * system from generating meaningless combinations like "Cloth Hangers for Pigeon
 * Protection".
 */
export const intents: Intent[] = [
  { slug: "apartments", label: "Apartments", group: "property", sentenceLabel: "apartment balconies and flats", description: "Multi-storey apartment units and gated communities." },
  { slug: "independent-houses", label: "Independent Houses", group: "property", sentenceLabel: "independent houses", description: "Standalone houses and duplexes." },
  { slug: "villas", label: "Villas", group: "property", sentenceLabel: "villas and gated villa communities", description: "Independent villa layouts and gated villa communities." },
  { slug: "high-rise-buildings", label: "High-Rise Buildings", group: "property", sentenceLabel: "high-rise buildings", description: "Multi-storey towers above 8 floors." },
  { slug: "commercial-buildings", label: "Commercial Buildings", group: "property", sentenceLabel: "commercial and office buildings", description: "Offices, showrooms, and commercial complexes." },
  { slug: "schools", label: "Schools", group: "property", sentenceLabel: "schools and educational campuses", description: "Schools, colleges, and educational institutions." },
  { slug: "balcony", label: "Balcony", group: "installLocation", sentenceLabel: "balconies", description: "Open balcony openings." },
  { slug: "windows", label: "Windows", group: "installLocation", sentenceLabel: "windows", description: "Window openings on any floor." },
  { slug: "terrace", label: "Terrace", group: "installLocation", sentenceLabel: "terraces and rooftops", description: "Open terrace and rooftop areas." },
  { slug: "duct-area", label: "Duct Area", group: "installLocation", sentenceLabel: "kitchen and utility duct areas", description: "Duct shafts between floors." },
  { slug: "staircase", label: "Staircase", group: "installLocation", sentenceLabel: "open staircases", description: "Open internal or external staircases." },
  { slug: "practice-grounds", label: "Practice Grounds", group: "installLocation", sentenceLabel: "practice grounds and academies", description: "Dedicated sports practice areas." },
  { slug: "child-safety", label: "Child Safety", group: "problem", sentenceLabel: "protecting young children from falls", description: "Preventing children from falling through openings." },
  { slug: "pet-safety", label: "Pet Safety", group: "problem", sentenceLabel: "keeping pets safe on balconies", description: "Preventing pets from falling or escaping." },
  { slug: "pigeon-control", label: "Pigeon Control", group: "problem", sentenceLabel: "stopping pigeons from nesting", description: "Preventing pigeon nesting and mess." },
  { slug: "fall-protection", label: "Fall Protection", group: "problem", sentenceLabel: "general fall protection", description: "General-purpose fall prevention." },
];

export const intentsBySlug: Record<string, Intent> = Object.fromEntries(intents.map((i) => [i.slug, i]));

/**
 * Additional intents (beyond a service's own `propertyTypes`) that are genuinely
 * meaningful for that service. Keep this list conservative — it is the safeguard
 * against doorway pages for nonsensical combinations.
 */
export const serviceExtraIntents: Record<string, string[]> = {
  "invisible-grills": ["balcony", "windows", "terrace", "child-safety", "pet-safety", "fall-protection"],
  "safety-nets": ["balcony", "terrace", "staircase", "child-safety", "pet-safety", "fall-protection"],
  "balcony-safety-nets": ["balcony", "child-safety", "pet-safety"],
  "pigeon-nets": ["balcony", "duct-area", "pigeon-control"],
  "bird-nets": ["duct-area", "pigeon-control"],
  "anti-bird-spikes": ["pigeon-control"],
  "children-safety-nets": ["balcony", "windows", "staircase", "child-safety"],
  "pet-safety-nets": ["balcony", "terrace", "pet-safety"],
  "terrace-safety-nets": ["terrace", "child-safety", "fall-protection"],
  "duct-area-nets": ["duct-area", "pigeon-control"],
  "cloth-hangers": ["balcony"],
  "sports-nets": ["practice-grounds", "terrace"],
  "cricket-nets": ["practice-grounds", "terrace"],
  "mosquito-nets": ["windows", "balcony", "pet-safety"],
  "staircase-safety-nets": ["staircase", "child-safety", "pet-safety", "fall-protection"],
};

/** Synonym banks used to add genuine lexical variety across templated sections (never keyword-stuffed). */
export const priceSynonyms = ["price", "cost", "rate", "charges"] as const;
export const qualifierSynonyms = ["professional", "reliable", "durable", "affordable"] as const;
export const ctaVerbs = ["Call", "WhatsApp", "Book a free site visit with", "Get a free quote from"] as const;

export function slugifyLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
