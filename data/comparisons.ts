export interface GenericAlternative {
  key: string;
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
}

/** Non-service "alternatives" that customers commonly compare our services against. */
export const genericAlternatives: Record<string, GenericAlternative> = {
  "traditional-grills": {
    key: "traditional-grills",
    name: "Traditional Iron Grills",
    summary:
      "Traditional welded MS/iron grills bolted across balconies and windows — the older, heavier alternative to modern safety nets and invisible grills.",
    pros: ["Very high physical strength", "Familiar, widely available installation"],
    cons: [
      "Blocks light, air, and the view completely",
      "Prone to rust and paint peeling, especially in coastal air",
      "Heavy, permanent structural change to the facade",
      "Reduces resale appeal on modern apartments",
    ],
  },
};

export interface Comparison {
  id: string;
  slug: string;
  serviceASlug: string;
  /** Either another entry in data/services.ts, or a key from `genericAlternatives`. */
  serviceBSlug: string;
  isGenericB: boolean;
  bestForBalcony: "A" | "B" | "tie";
  bestForChildSafety: "A" | "B" | "tie";
  bestForPetSafety: "A" | "B" | "tie";
  bestForPigeonControl: "A" | "B" | "tie";
  costNote: string;
  maintenanceNote: string;
  appearanceNote: string;
  expertRecommendation: string;
}

export const comparisons: Comparison[] = [
  {
    id: "cmp-invisible-grills-vs-safety-nets",
    slug: "invisible-grills-vs-safety-nets",
    serviceASlug: "invisible-grills",
    serviceBSlug: "safety-nets",
    isGenericB: false,
    bestForBalcony: "tie",
    bestForChildSafety: "B",
    bestForPetSafety: "B",
    bestForPigeonControl: "tie",
    costNote:
      "Invisible grills are generally priced per running foot of wire, while safety nets are priced per square foot of area — for large open balconies, nets are often more economical.",
    maintenanceNote:
      "Both need periodic inspection; SS wires rarely need replacement, while nets may need re-tensioning or cleaning every couple of years in dusty areas.",
    appearanceNote:
      "Invisible grills are nearly see-through and preserve a glass-like view; safety nets are also low-visibility but slightly more noticeable up close.",
    expertRecommendation:
      "Choose invisible grills when preserving an unobstructed view matters most; choose safety nets when covering a large or irregularly shaped opening cost-effectively is the priority.",
  },
  {
    id: "cmp-invisible-grills-vs-balcony-safety-nets",
    slug: "invisible-grills-vs-balcony-safety-nets",
    serviceASlug: "invisible-grills",
    serviceBSlug: "balcony-safety-nets",
    isGenericB: false,
    bestForBalcony: "tie",
    bestForChildSafety: "B",
    bestForPetSafety: "B",
    bestForPigeonControl: "tie",
    costNote: "Balcony safety nets are typically the lower-cost option for standard-shaped balconies.",
    maintenanceNote: "Grills need almost no maintenance; balcony nets should be checked for tension yearly.",
    appearanceNote: "Both are low-visibility; grills give a marginally clearer view for photography or scenic balconies.",
    expertRecommendation:
      "For a premium, glass-like finish choose invisible grills. For maximum climbing resistance for toddlers and pets at a lower cost, choose balcony safety nets.",
  },
  {
    id: "cmp-safety-nets-vs-anti-bird-spikes",
    slug: "safety-nets-vs-anti-bird-spikes",
    serviceASlug: "safety-nets",
    serviceBSlug: "anti-bird-spikes",
    isGenericB: false,
    bestForBalcony: "A",
    bestForChildSafety: "A",
    bestForPetSafety: "A",
    bestForPigeonControl: "B",
    costNote: "Bird spikes are priced per running foot of ledge, generally cheaper for narrow ledges; nets are better value for large open areas.",
    maintenanceNote: "Spikes rarely need maintenance; nets should be inspected periodically for tension and tears.",
    appearanceNote: "Spikes are barely visible from a distance; nets are also low-visibility but cover a larger visible area.",
    expertRecommendation:
      "Safety nets are the right choice for fall protection; anti-bird spikes are the right choice specifically for stopping birds from perching on ledges and parapets.",
  },
  {
    id: "cmp-pigeon-nets-vs-anti-bird-spikes",
    slug: "pigeon-nets-vs-anti-bird-spikes",
    serviceASlug: "pigeon-nets",
    serviceBSlug: "anti-bird-spikes",
    isGenericB: false,
    bestForBalcony: "A",
    bestForChildSafety: "tie",
    bestForPetSafety: "tie",
    bestForPigeonControl: "A",
    costNote: "Spikes are usually cheaper for narrow ledges; pigeon nets are more effective (and cost-efficient) for fully enclosing larger balconies or ducts.",
    maintenanceNote: "Both are low-maintenance; nets should be checked yearly for small gaps pigeons could exploit.",
    appearanceNote: "Spikes are less visible on narrow ledges; nets are the better choice when the whole opening needs to be sealed.",
    expertRecommendation:
      "Use pigeon nets to fully close off balconies, sit-outs, and ducts. Use anti-bird spikes for exposed ledges, parapets, and signage where netting isn't practical.",
  },
  {
    id: "cmp-pigeon-nets-vs-bird-nets",
    slug: "pigeon-nets-vs-bird-nets",
    serviceASlug: "pigeon-nets",
    serviceBSlug: "bird-nets",
    isGenericB: false,
    bestForBalcony: "A",
    bestForChildSafety: "tie",
    bestForPetSafety: "tie",
    bestForPigeonControl: "A",
    costNote: "Pigeon nets use a finer mesh sized for pigeons; general bird nets can be more economical for large warehouse or facade areas.",
    maintenanceNote: "Both require similar low maintenance once correctly tensioned.",
    appearanceNote: "Both have a similar low-visibility finish; mesh size is the main practical difference.",
    expertRecommendation:
      "Choose pigeon nets for homes and balconies where pigeons specifically are the problem. Choose general bird nets for larger commercial or industrial bird-exclusion needs.",
  },
  {
    id: "cmp-children-safety-nets-vs-invisible-grills",
    slug: "children-safety-nets-vs-invisible-grills",
    serviceASlug: "children-safety-nets",
    serviceBSlug: "invisible-grills",
    isGenericB: false,
    bestForBalcony: "tie",
    bestForChildSafety: "A",
    bestForPetSafety: "tie",
    bestForPigeonControl: "tie",
    costNote: "Children's safety netting is generally priced similarly to standard safety nets, often lower than a full invisible grill installation.",
    maintenanceNote: "Both are low maintenance; netting should be checked yearly for wear from active climbing.",
    appearanceNote: "Invisible grills preserve a slightly clearer view; child safety nets are optimised for maximum climb resistance.",
    expertRecommendation:
      "If a determined toddler is the main concern, children's safety nets offer the highest resistance to climbing and pulling at a lower cost than invisible grills.",
  },
  {
    id: "cmp-pet-safety-nets-vs-invisible-grills",
    slug: "pet-safety-nets-vs-invisible-grills",
    serviceASlug: "pet-safety-nets",
    serviceBSlug: "invisible-grills",
    isGenericB: false,
    bestForBalcony: "tie",
    bestForChildSafety: "tie",
    bestForPetSafety: "A",
    bestForPigeonControl: "tie",
    costNote: "Pet safety nets are usually more economical than a full invisible grill installation for the same balcony.",
    maintenanceNote: "Pet netting should be checked for scratches or chew marks periodically; grills need almost none.",
    appearanceNote: "Invisible grills give a marginally clearer view; pet netting is tightly meshed to stop cats squeezing through.",
    expertRecommendation:
      "For homes with cats or small dogs, pet safety nets with tight mesh spacing are the more purpose-built and cost-effective choice.",
  },
  {
    id: "cmp-sports-nets-vs-cricket-nets",
    slug: "sports-nets-vs-cricket-nets",
    serviceASlug: "sports-nets",
    serviceBSlug: "cricket-nets",
    isGenericB: false,
    bestForBalcony: "tie",
    bestForChildSafety: "tie",
    bestForPetSafety: "tie",
    bestForPigeonControl: "tie",
    costNote: "General sports nets are priced by span and height; dedicated cricket nets add pole framework and full enclosure cost.",
    maintenanceNote: "Both are heavy-duty and low maintenance; cricket nets see more frequent high-impact use.",
    appearanceNote: "Cricket nets are typically taller and fully enclosed; general sports nets can be a single barrier panel.",
    expertRecommendation:
      "Choose dedicated cricket nets for regular batting practice; choose general sports nets for multi-purpose ball-containment needs.",
  },
  {
    id: "cmp-safety-nets-vs-traditional-grills",
    slug: "safety-nets-vs-traditional-grills",
    serviceASlug: "safety-nets",
    serviceBSlug: "traditional-grills",
    isGenericB: true,
    bestForBalcony: "A",
    bestForChildSafety: "A",
    bestForPetSafety: "A",
    bestForPigeonControl: "tie",
    costNote: "Safety nets are usually more affordable than fabricating and welding traditional iron grills, especially on high floors.",
    maintenanceNote: "Nets need occasional re-tensioning; iron grills need repainting and rust treatment every few years, especially near the coast.",
    appearanceNote: "Nets are far less visible than welded iron grills and do not alter the building facade.",
    expertRecommendation:
      "Modern safety nets outperform traditional iron grills on appearance, ventilation, and long-term maintenance for most residential balconies.",
  },
];

export const comparisonsBySlug: Record<string, Comparison> = Object.fromEntries(
  comparisons.map((c) => [c.slug, c]),
);
