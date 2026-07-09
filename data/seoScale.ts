export interface LocalSeoModifier {
  slug: string;
  label: string;
  searchPhrase: string;
  description: string;
}

export interface HyperlocalAudience {
  slug: string;
  label: string;
  sentenceLabel: string;
  description: string;
}

/**
 * These modifiers expand the sitemap with genuine local-intent pages such as
 * /invisible-grills-installation-in-gajuwaka. They are broad enough to apply
 * to every service, but still tied to real customer jobs: pricing, installer,
 * material, fitting, inspection, maintenance, and use-case language.
 */
export const localSeoModifiers: LocalSeoModifier[] = [
  { slug: "installation", label: "Installation", searchPhrase: "installation", description: "Professional installation support with measurement, material selection, and clean fitting." },
  { slug: "installers", label: "Installers", searchPhrase: "installers", description: "Local installer availability for site inspection and installation scheduling." },
  { slug: "service", label: "Service", searchPhrase: "service", description: "End-to-end service from inspection through installation and after-care guidance." },
  { slug: "services", label: "Services", searchPhrase: "services", description: "Complete service options for homes, apartments, villas, and commercial sites." },
  { slug: "company", label: "Company", searchPhrase: "company", description: "Choosing a reliable installation company for safe and neat work." },
  { slug: "contractor", label: "Contractor", searchPhrase: "contractor", description: "Contractor-led installation for residential and commercial building requirements." },
  { slug: "dealers", label: "Dealers", searchPhrase: "dealers", description: "Local product and installation support with practical site guidance." },
  { slug: "suppliers", label: "Suppliers", searchPhrase: "suppliers", description: "Material sourcing and installation support based on actual site conditions." },
  { slug: "repair", label: "Repair", searchPhrase: "repair", description: "Repair guidance for loose fittings, damaged sections, and weathered materials." },
  { slug: "maintenance", label: "Maintenance", searchPhrase: "maintenance", description: "Maintenance checks that help installations last longer in coastal weather." },
  { slug: "replacement", label: "Replacement", searchPhrase: "replacement", description: "Replacing old, damaged, rusted, or unsafe systems with cleaner modern solutions." },
  { slug: "fitting", label: "Fitting", searchPhrase: "fitting", description: "Custom fitting for balconies, windows, terraces, ducts, and irregular openings." },
  { slug: "fixing", label: "Fixing", searchPhrase: "fixing", description: "Secure fixing methods selected for wall type, height, and site access." },
  { slug: "setup", label: "Setup", searchPhrase: "setup", description: "A complete setup process covering inspection, measurement, fittings, and finish." },
  { slug: "material", label: "Material", searchPhrase: "material", description: "Material choices explained clearly before installation begins." },
  { slug: "accessories", label: "Accessories", searchPhrase: "accessories", description: "Hooks, ropes, clamps, wires, fasteners, and other accessories selected by use case." },
  { slug: "design", label: "Design", searchPhrase: "design", description: "Practical design choices that keep the space useful and visually clean." },
  { slug: "ideas", label: "Ideas", searchPhrase: "ideas", description: "Useful ideas for choosing the right safety or utility setup for each space." },
  { slug: "booking", label: "Booking", searchPhrase: "booking", description: "Simple booking flow for free inspection and quotation." },
  { slug: "quote", label: "Quote", searchPhrase: "quote", description: "Quote-focused pages explaining what details are needed for accurate pricing." },
  { slug: "estimate", label: "Estimate", searchPhrase: "estimate", description: "Estimate guidance before a final measurement-based quotation." },
  { slug: "price-list", label: "Price List", searchPhrase: "price list", description: "Price-list context without publishing fake fixed rates." },
  { slug: "cost-per-square-feet", label: "Cost Per Square Feet", searchPhrase: "cost per square feet", description: "Square-foot pricing factors explained with site-specific caveats." },
  { slug: "per-sq-ft-price", label: "Per Sq Ft Price", searchPhrase: "per sq ft price", description: "Per-square-foot price factors for material, access, and fitting difficulty." },
  { slug: "installation-cost", label: "Installation Cost", searchPhrase: "installation cost", description: "Installation-cost factors including height, access, material, and custom fitting." },
  { slug: "best", label: "Best", searchPhrase: "best", description: "Best-fit recommendations based on family safety, building type, and budget." },
  { slug: "top", label: "Top", searchPhrase: "top", description: "Top considerations before choosing an installer or material option." },
  { slug: "premium", label: "Premium", searchPhrase: "premium", description: "Premium material and finish options for long-term durability." },
  { slug: "affordable", label: "Affordable", searchPhrase: "affordable", description: "Affordable solutions that still respect safety and material quality." },
  { slug: "low-cost", label: "Low Cost", searchPhrase: "low cost", description: "Low-cost planning without compromising core installation safety." },
  { slug: "high-quality", label: "High Quality", searchPhrase: "high quality", description: "High-quality material and workmanship requirements for durable results." },
  { slug: "durable", label: "Durable", searchPhrase: "durable", description: "Durability considerations for rain, sun, humidity, and daily use." },
  { slug: "strong", label: "Strong", searchPhrase: "strong", description: "Strength and anchoring considerations for safety-critical installations." },
  { slug: "safe", label: "Safe", searchPhrase: "safe", description: "Safety-first installation guidance for families, children, pets, and high floors." },
  { slug: "custom", label: "Custom", searchPhrase: "custom", description: "Custom measurement and fitting for non-standard openings." },
  { slug: "customized", label: "Customized", searchPhrase: "customized", description: "Customized layouts based on the exact size and use of each space." },
  { slug: "residential", label: "Residential", searchPhrase: "residential", description: "Residential installations for apartments, villas, independent houses, and flats." },
  { slug: "commercial", label: "Commercial", searchPhrase: "commercial", description: "Commercial installation planning for offices, schools, societies, and buildings." },
  { slug: "home-installation", label: "Home Installation", searchPhrase: "home installation", description: "Home installation service with free site inspection and practical recommendations." },
  { slug: "apartment-installation", label: "Apartment Installation", searchPhrase: "apartment installation", description: "Apartment-focused installation for balconies, windows, shafts, and terraces." },
  { slug: "balcony-installation", label: "Balcony Installation", searchPhrase: "balcony installation", description: "Balcony installation guidance for safety, views, ventilation, and pigeon control." },
  { slug: "window-installation", label: "Window Installation", searchPhrase: "window installation", description: "Window installation guidance for safety, visibility, and airflow." },
  { slug: "terrace-installation", label: "Terrace Installation", searchPhrase: "terrace installation", description: "Terrace installation planning for open edges, weather, and access." },
  { slug: "high-rise-installation", label: "High-Rise Installation", searchPhrase: "high rise installation", description: "High-rise installation planning with extra attention to access and safety." },
  { slug: "anti-rust", label: "Anti Rust", searchPhrase: "anti rust", description: "Anti-rust material and fitting choices for humid and coastal conditions." },
  { slug: "stainless-steel", label: "Stainless Steel", searchPhrase: "stainless steel", description: "Stainless steel and anti-corrosion material guidance where relevant." },
  { slug: "nylon", label: "Nylon", searchPhrase: "nylon", description: "Nylon and netting material considerations for flexible safety solutions." },
  { slug: "hdpe", label: "HDPE", searchPhrase: "hdpe", description: "HDPE netting and rope material considerations for weather exposure." },
  { slug: "professional-installation", label: "Professional Installation", searchPhrase: "professional installation", description: "Professional installation standards for neat, safe, durable finishing." },
  { slug: "free-site-inspection", label: "Free Site Inspection", searchPhrase: "free site inspection", description: "Free site inspection pages for visitors ready to request a quote." },
  { slug: "same-day-inspection", label: "Same Day Inspection", searchPhrase: "same day inspection", description: "Fast inspection scheduling where team availability allows." },
  { slug: "near-me-service", label: "Near Me Service", searchPhrase: "near me service", description: "Near-me style pages tied to real local area pages rather than generic doorway URLs." },
  { slug: "local-installers", label: "Local Installers", searchPhrase: "local installers", description: "Local installer pages focused on coverage, response time, and site-specific advice." },
  { slug: "trusted-contractor", label: "Trusted Contractor", searchPhrase: "trusted contractor", description: "Trust-focused pages explaining workmanship, materials, and inspection process." },
];

export const localSeoModifiersBySlug: Record<string, LocalSeoModifier> = Object.fromEntries(
  localSeoModifiers.map((modifier) => [modifier.slug, modifier]),
);

export const hyperlocalAudiences: HyperlocalAudience[] = [
  { slug: "apartments", label: "Apartments", sentenceLabel: "apartment residents and gated communities", description: "Apartment customers comparing safety, budget, and installation access." },
  { slug: "balcony", label: "Balcony", sentenceLabel: "balcony spaces", description: "Balcony-focused pages for practical safety and utility needs." },
  { slug: "windows", label: "Windows", sentenceLabel: "window openings", description: "Window-focused pages where visibility, airflow, and safety matter together." },
  { slug: "kids-safety", label: "Kids Safety", sentenceLabel: "families with young children", description: "Family-safety pages for child fall prevention and safer daily use." },
  { slug: "pets", label: "Pets", sentenceLabel: "pet owners", description: "Pet-safety pages for cats, dogs, and other balcony-access pets." },
  { slug: "pigeon-protection", label: "Pigeon Protection", sentenceLabel: "pigeon-prone balconies and duct areas", description: "Pigeon-control pages for mess, nesting, and hygiene problems." },
  { slug: "high-rise-buildings", label: "High-Rise Buildings", sentenceLabel: "high-rise buildings", description: "High-floor pages where access, wind, and fall protection need extra care." },
  { slug: "villas", label: "Villas", sentenceLabel: "villas and independent houses", description: "Villa and independent-house pages for custom openings and terrace layouts." },
];

export const hyperlocalAudiencesBySlug: Record<string, HyperlocalAudience> = Object.fromEntries(
  hyperlocalAudiences.map((audience) => [audience.slug, audience]),
);
