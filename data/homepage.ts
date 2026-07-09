/**
 * Editable homepage content: hero slides, trust stats, solution cards, project
 * types, brand strip, quick-link locations, and the long-form SEO copy.
 *
 * Keep the copy natural and readable — this file is intentionally NOT a keyword
 * dump. The programmatic service+location+modifier pages already target long-tail
 * search queries; the homepage stays clean and conversion-focused.
 */

export interface HeroSlide {
  headline: string;
  subheadline: string;
  seoText: string;
  href: string;
  imageCategories: string[];
  seed: string;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    headline: "Invisible Grills in Visakhapatnam",
    subheadline: "See-through balcony & window safety",
    seoText: "Transparent stainless steel invisible grills that protect your family without blocking the view, light, or air.",
    href: "/invisible-grills-in-visakhapatnam",
    imageCategories: ["invisible-grill-balcony", "invisible-grill-window"],
    seed: "slide-invisible-vizag",
    alt: "Invisible grill installation for a balcony in a Visakhapatnam apartment",
  },
  {
    headline: "Invisible Grills in Vijayawada",
    subheadline: "Balcony & window safety in NTR district",
    seoText:
      "Premium invisible grills for apartments, villas, and commercial buildings across Benz Circle, Patamata, Labbipet, and Vijayawada suburbs.",
    href: "/invisible-grills-in-vijayawada",
    imageCategories: ["invisible-grill-balcony", "invisible-grill-window"],
    seed: "slide-invisible-vja",
    alt: "Invisible grill installation for a balcony in a Vijayawada apartment",
  },
  {
    headline: "Balcony Safety Nets in Kakinada",
    subheadline: "Fall protection for kids, pets & objects",
    seoText: "Strong UV-treated balcony safety nets fitted neatly for apartments, high-rise flats, and family homes.",
    href: "/balcony-safety-nets-in-kakinada",
    imageCategories: ["safety-nets-balcony"],
    seed: "slide-balcony-kakinada",
    alt: "Balcony safety net installation in a Kakinada home",
  },
  {
    headline: "Pigeon Nets Installation in Rajahmundry",
    subheadline: "Stop pigeon mess & nesting",
    seoText: "Pigeon nets for balconies, ducts, and windows to keep your space clean, hygienic, and bird-free.",
    href: "/pigeon-nets-in-rajahmundry",
    imageCategories: ["safety-nets-balcony", "duct-area-nets"],
    seed: "slide-pigeon-rjy",
    alt: "Pigeon net installation for a Rajahmundry apartment balcony",
  },
  {
    headline: "Children Safety Nets in Vizianagaram",
    subheadline: "Safe balconies without closing them in",
    seoText: "Child safety nets for balconies, windows, and staircases that keep airflow and light while preventing falls.",
    href: "/children-safety-nets-in-vizianagaram",
    imageCategories: ["children-safety-nets"],
    seed: "slide-child-vzm",
    alt: "Children safety net for an apartment balcony in Vizianagaram",
  },
  {
    headline: "Bird Protection Nets in Srikakulam",
    subheadline: "Keep birds out of open areas",
    seoText: "Bird nets for balconies, ducts, sheds, and commercial spaces to stop entry, nesting, and droppings.",
    href: "/bird-nets-in-srikakulam",
    imageCategories: ["duct-area-nets", "safety-nets-balcony"],
    seed: "slide-bird-skl",
    alt: "Bird protection net installation in Srikakulam",
  },
  {
    headline: "Ceiling Cloth Hangers in Eluru",
    subheadline: "Save space, dry clothes easily",
    seoText: "Ceiling, pulley, and wall-mounted cloth hangers for balconies, utility areas, and compact homes.",
    href: "/cloth-hangers-in-eluru",
    imageCategories: ["cloth-hangers"],
    seed: "slide-cloth-eluru",
    alt: "Ceiling cloth hanger installation in an Eluru balcony",
  },
  {
    headline: "Sports Nets in Andhra Pradesh",
    subheadline: "Safe, controlled practice areas",
    seoText: "Sports nets for schools, coaching centres, grounds, and academies, planned to ground size and use.",
    href: "/sports-nets",
    imageCategories: ["cricket-nets"],
    seed: "slide-sports-ap",
    alt: "Sports net installation for a practice ground in Andhra Pradesh",
  },
  {
    headline: "Cricket Practice Nets",
    subheadline: "Built for schools, academies & grounds",
    seoText: "Cricket practice nets with strong netting and pole support for indoor and outdoor practice areas.",
    href: "/cricket-nets",
    imageCategories: ["cricket-nets"],
    seed: "slide-cricket",
    alt: "Cricket practice net installation in Andhra Pradesh",
  },
  {
    headline: "Anti Bird Spikes Installation",
    subheadline: "Stop birds sitting on ledges & edges",
    seoText: "Stainless steel bird spikes for parapet walls, window ledges, signboards, and AC unit areas.",
    href: "/anti-bird-spikes",
    imageCategories: ["spikes"],
    seed: "slide-spikes",
    alt: "Anti bird spikes installed on a building ledge",
  },
  {
    headline: "Terrace Safety Nets",
    subheadline: "Safety for open terrace areas",
    seoText: "Terrace safety nets for open edges, children play areas, and bird protection while keeping air and light.",
    href: "/terrace-safety-nets",
    imageCategories: ["safety-nets-balcony"],
    seed: "slide-terrace",
    alt: "Terrace safety net installation for an open terrace",
  },
];

export const heroTrustChips = ["Free Quote", "Fast Response", "Premium Materials", "Local Service", "Clean Installation"];

export interface StatCard {
  value: string;
  label: string;
}

/** Editable trust counters. Update values as the business grows. */
export const homeStats: StatCard[] = [
  { value: "5000+", label: "Happy Customers" },
  { value: "10+", label: "Years of Experience" },
  { value: "2–20 yrs", label: "Warranty Range" },
  { value: "100%", label: "Satisfaction Focus" },
  { value: "AP-Wide", label: "Service Coverage" },
];

export interface SolutionCard {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const solutions: SolutionCard[] = [
  { icon: "🕊️", title: "Pigeon Control Solutions", description: "Nets and spikes that stop pigeon mess, nesting, and droppings in balconies and ducts.", href: "/pigeon-nets" },
  { icon: "🛡️", title: "Balcony Safety", description: "Nets and invisible grills that make open balconies safe without closing them in.", href: "/balcony-safety-nets" },
  { icon: "🧒", title: "Child Safety", description: "Child safety nets for balconies, windows, and staircases in family homes.", href: "/children-safety-nets" },
  { icon: "✨", title: "Invisible Protection", description: "Near-transparent stainless steel grills that keep your view and add safety.", href: "/invisible-grills" },
  { icon: "🏏", title: "Sports Practice Nets", description: "Cricket and sports nets for schools, academies, and practice grounds.", href: "/sports-nets" },
  { icon: "👕", title: "Cloth Drying Solutions", description: "Ceiling, pulley, and balcony cloth hangers that save space at home.", href: "/cloth-hangers" },
  { icon: "📌", title: "Bird Spike Protection", description: "Stainless steel spikes for ledges, parapets, and edges where birds sit.", href: "/anti-bird-spikes" },
  { icon: "🐾", title: "Pet Safety Solutions", description: "Pet safety nets that keep cats and dogs safe on balconies and terraces.", href: "/pet-safety-nets" },
];

export interface ProjectType {
  label: string;
  caption: string;
  imageCategories: string[];
  seed: string;
}

export const projectTypes: ProjectType[] = [
  { label: "Apartments", caption: "Balcony & window safety for flats", imageCategories: ["safety-nets-balcony"], seed: "proj-apartments" },
  { label: "Villas", caption: "Custom fittings for open layouts", imageCategories: ["invisible-grill-balcony"], seed: "proj-villas" },
  { label: "Schools", caption: "Child-safe nets and sports nets", imageCategories: ["children-safety-nets"], seed: "proj-schools" },
  { label: "Sports Grounds", caption: "Cricket and practice net setups", imageCategories: ["cricket-nets"], seed: "proj-sports" },
  { label: "Commercial Buildings", caption: "Bird control and safety solutions", imageCategories: ["duct-area-nets"], seed: "proj-commercial" },
  { label: "High-Rise Buildings", caption: "Fall protection for high floors", imageCategories: ["invisible-grill-window"], seed: "proj-highrise" },
  { label: "Gated Communities", caption: "Society-wide safety installations", imageCategories: ["safety-nets-balcony"], seed: "proj-gated" },
];

export interface GalleryProject {
  service: string;
  location: string;
  caption: string;
  imageCategories: string[];
  seed: string;
  alt: string;
}

export const recentProjects: GalleryProject[] = [
  { service: "Invisible Grills", location: "Visakhapatnam", caption: "Balcony invisible grill with clear view", imageCategories: ["invisible-grill-balcony"], seed: "rp-ig-vizag", alt: "Invisible grill project for a balcony in Visakhapatnam" },
  { service: "Balcony Safety Net", location: "Kakinada", caption: "Apartment balcony fall protection", imageCategories: ["safety-nets-balcony"], seed: "rp-bn-kakinada", alt: "Balcony safety net project in Kakinada" },
  { service: "Pigeon Net", location: "Rajahmundry", caption: "Balcony pigeon net, clean finish", imageCategories: ["safety-nets-balcony", "duct-area-nets"], seed: "rp-pn-rjy", alt: "Pigeon net project for a Rajahmundry balcony" },
  { service: "Child Safety Net", location: "Vizianagaram", caption: "Balcony net for child safety", imageCategories: ["children-safety-nets"], seed: "rp-cn-vzm", alt: "Child safety net project in Vizianagaram" },
  { service: "Sports Net", location: "Srikakulam", caption: "Practice net for a sports area", imageCategories: ["cricket-nets"], seed: "rp-sp-skl", alt: "Sports net project in Srikakulam" },
  { service: "Cloth Hanger", location: "Eluru", caption: "Ceiling cloth hanger, space-saving", imageCategories: ["cloth-hangers"], seed: "rp-ch-eluru", alt: "Cloth hanger project in an Eluru balcony" },
];

/** Brand / material strip. Text-only placeholders until real logos are provided. */
export const brands: string[] = [
  "Garware",
  "Tufropes",
  "Kohinoor Ropes",
  "SS304 Steel",
  "Premium HDPE Nets",
  "Aluminium Hanger Systems",
];

/** City slugs (must exist in data/cities.ts) used for the quick-link chips grid. */
export const quickLinkCitySlugs = [
  "visakhapatnam",
  "vijayawada",
  "kakinada",
  "rajahmundry",
  "vizianagaram",
  "srikakulam",
  "eluru",
  "tadepalligudem",
  "anakapalle",
  "narsipatnam",
  "yelamanchili",
] as const;

/** Service slugs surfaced as quick links per city (all services for maximum internal linking). */
export const quickLinkServiceSlugs = [
  "invisible-grills",
  "safety-nets",
  "balcony-safety-nets",
  "pigeon-nets",
  "bird-nets",
  "anti-bird-spikes",
  "children-safety-nets",
  "pet-safety-nets",
  "terrace-safety-nets",
  "duct-area-nets",
  "cloth-hangers",
  "sports-nets",
  "cricket-nets",
  "mosquito-nets",
  "staircase-safety-nets",
] as const;

export interface HowItWorksStep {
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  { title: "Call or WhatsApp", description: "Contact us with your service requirement and location." },
  { title: "Free Site Inspection", description: "Our team checks the balcony, window, duct, terrace, or sports area." },
  { title: "Measurement & Material", description: "Exact measurements are taken and suitable materials are suggested." },
  { title: "Professional Installation", description: "Installation is completed with neat finishing and proper fixing support." },
  { title: "Warranty & After-Sales", description: "The work is checked for safety and strength, with after-sales support." },
];

export interface WhyChooseCard {
  title: string;
  description: string;
}

export const whyChooseCards: WhyChooseCard[] = [
  { title: "Experienced Technicians", description: "In-house team trained for neat, safe, and durable installations." },
  { title: "Premium Branded Materials", description: "Quality wire, nets, and fittings selected for coastal weather." },
  { title: "Free Site Inspection", description: "On-site measurement and honest guidance before any quote." },
  { title: "Fast Installation", description: "Clear scheduling based on site access and material readiness." },
  { title: "Warranty Support", description: "Warranty-backed work with clear after-sales help." },
  { title: "AP-Wide Coverage", description: "Service across major Andhra Pradesh cities and nearby areas." },
  { title: "Clean Finishing", description: "Tidy fixing that respects your building's appearance." },
  { title: "Call & WhatsApp Support", description: "Quick booking and follow-up on call or WhatsApp." },
];

export interface VideoTestimonial {
  title: string;
  location: string;
  href: string;
  imageCategories: string[];
  seed: string;
  alt: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  { title: "Pigeon Net Installation Review", location: "Visakhapatnam", href: "/pigeon-nets", imageCategories: ["safety-nets-balcony", "duct-area-nets"], seed: "vt-pigeon", alt: "Pigeon net installation review thumbnail" },
  { title: "Invisible Grill Customer Review", location: "Kakinada", href: "/invisible-grills", imageCategories: ["invisible-grill-balcony"], seed: "vt-invisible", alt: "Invisible grill customer review thumbnail" },
  { title: "Safety Net Installation Process", location: "Rajahmundry", href: "/safety-nets", imageCategories: ["safety-nets-balcony"], seed: "vt-safety", alt: "Safety net installation process thumbnail" },
];

export interface SeoContentBlock {
  heading: string;
  paragraphs: string[];
}

/**
 * Long-form homepage SEO content. Natural language, local intent, one H2 per block
 * (rendered under a single page H1). Not keyword-stuffed.
 */
export const homepageSeoContent: SeoContentBlock[] = [
  {
    heading: "Why Safety Nets and Invisible Grills Matter",
    paragraphs: [
      "Open balconies, windows, terraces, and duct areas are common safety risks in apartments and independent houses. Safety nets and invisible grills reduce the chance of accidental falls for children, elderly family members, and pets, while still keeping air, light, and the outside view.",
      "The right solution depends on your building type, opening size, and how you use the space. Our team helps you compare invisible grills, balcony safety nets, and other options during a free site inspection.",
    ],
  },
  {
    heading: "Pigeon Nets and Bird Protection Benefits",
    paragraphs: [
      "Pigeon droppings, feathers, and nesting create cleaning and hygiene problems in balconies, ducts, and AC outdoor unit areas. Pigeon nets and bird nets stop birds from entering these spaces without changing how you use them.",
      "For ledges and edges where birds only sit, stainless steel anti bird spikes are a practical alternative that keeps the area open while discouraging birds from perching.",
    ],
  },
  {
    heading: "Child Safety, Pet Safety, and Balcony Protection",
    paragraphs: [
      "Children safety nets and pet safety nets are designed for homes that want protection without closing off the balcony. Soft, strong netting is fitted around openings so families can keep windows and balconies usable and ventilated.",
      "Invisible grills are a good choice where a clean, near-transparent look matters, especially in high-rise apartments and premium homes.",
    ],
  },
  {
    heading: "Cloth Hangers and Sports Nets",
    paragraphs: [
      "Ceiling cloth hangers, pulley hangers, and wall-mounted hangers make clothes drying easier in balconies, utility areas, and compact homes. Each setup is planned around available space, ceiling height, and daily use.",
      "Sports nets and cricket practice nets create safe, controlled practice areas for schools, coaching centres, academies, and grounds, planned to ground size and net strength.",
    ],
  },
  {
    heading: "Materials and Installation Process",
    paragraphs: [
      "We use quality materials such as SS304 invisible grill wire, HDPE and nylon nets, branded netting, and stainless steel bird spikes, selected for coastal Andhra Pradesh humidity. Material choice is explained clearly before installation.",
      "Our process is simple: call or WhatsApp, free site inspection, measurement, material selection, professional installation, and a final safety check. Pricing depends on area size, material quality, height, access, and the number of openings, so a site measurement gives the most accurate quote.",
    ],
  },
  {
    heading: "Areas We Serve in Andhra Pradesh",
    paragraphs: [
      "We provide invisible grills, safety nets, pigeon nets, bird spikes, cloth hangers, and sports nets in Visakhapatnam, Vijayawada, Kakinada, Rajahmundry, Vizianagaram, Srikakulam, Eluru, Tadepalligudem, Anakapalli, Narsipatnam, Yelamanchili, and nearby Andhra Pradesh locations.",
      "In Visakhapatnam we cover areas such as Gajuwaka, Madhurawada, PM Palem, MVP Colony, Seethammadhara, and NAD Junction. In Vijayawada we cover Benz Circle, Patamata, Labbipet, Auto Nagar, and surrounding residential layouts. Coverage in Kakinada, Rajahmundry, Vizianagaram, Srikakulam, and Eluru includes the main residential and commercial localities, confirmed during your free site visit.",
    ],
  },
];
