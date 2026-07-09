/**
 * Header mega-menu: service groups and programmatic SEO links.
 * Each href must resolve via resolveFlatSlug() or hub routes (/services, /locations).
 */

export interface NavMenuLink {
  label: string;
  href: string;
}

export interface NavServiceGroup {
  title: string;
  hubHref: string;
  links: NavMenuLink[];
}

export const navServiceGroups: NavServiceGroup[] = [
  {
    title: "Invisible Grills",
    hubHref: "/invisible-grills",
    links: [
      { label: "Invisible Grills", href: "/invisible-grills" },
      { label: "Balcony Invisible Grills", href: "/invisible-grills-for-balcony" },
      { label: "Window Invisible Grills", href: "/invisible-grills-for-windows" },
      { label: "Invisible Grills for Apartments", href: "/invisible-grills-for-apartments" },
      { label: "Invisible Grills for Villas", href: "/invisible-grills-for-villas" },
      { label: "Invisible Grills for Child Safety", href: "/invisible-grills-for-child-safety" },
      { label: "Invisible Grills for Pets", href: "/invisible-grills-for-pet-safety" },
    ],
  },
  {
    title: "Safety Nets",
    hubHref: "/safety-nets",
    links: [
      { label: "Safety Nets", href: "/safety-nets" },
      { label: "Balcony Safety Nets", href: "/balcony-safety-nets" },
      { label: "Kids Safety Nets", href: "/children-safety-nets" },
      { label: "Child Safety Nets", href: "/children-safety-nets" },
      { label: "Pet Safety Nets", href: "/pet-safety-nets" },
      { label: "Cat Safety Nets", href: "/pet-safety-nets" },
      { label: "Dog Safety Nets", href: "/pet-safety-nets" },
    ],
  },
  {
    title: "Balcony Nets",
    hubHref: "/balcony-safety-nets",
    links: [
      { label: "Balcony Nets", href: "/balcony-safety-nets" },
      { label: "Balcony Protection Nets", href: "/balcony-safety-nets" },
      { label: "Balcony Children Safety Nets", href: "/children-safety-nets-for-balcony" },
      { label: "Balcony Pet Safety Nets", href: "/pet-safety-nets-for-balcony" },
      { label: "Balcony Cat Nets", href: "/pet-safety-nets" },
      { label: "Apartment Balcony Nets", href: "/balcony-safety-nets-for-apartments" },
      { label: "High Rise Balcony Nets", href: "/balcony-safety-nets-for-high-rise-buildings" },
    ],
  },
  {
    title: "Bird Nets",
    hubHref: "/bird-nets",
    links: [
      { label: "Bird Nets", href: "/bird-nets" },
      { label: "Anti Bird Nets", href: "/bird-nets" },
      { label: "Bird Protection Nets", href: "/bird-nets" },
      { label: "Balcony Bird Nets", href: "/pigeon-nets-for-balcony" },
      { label: "Window Bird Nets", href: "/bird-nets" },
      { label: "Duct Area Bird Nets", href: "/bird-nets-for-duct-area" },
    ],
  },
  {
    title: "Pigeon Nets",
    hubHref: "/pigeon-nets",
    links: [
      { label: "Pigeon Nets", href: "/pigeon-nets" },
      { label: "Anti Pigeon Nets", href: "/pigeon-nets" },
      { label: "Pigeon Safety Nets", href: "/pigeon-nets" },
      { label: "Balcony Pigeon Nets", href: "/pigeon-nets-for-balcony" },
      { label: "Window Pigeon Nets", href: "/pigeon-nets" },
      { label: "Duct Area Pigeon Nets", href: "/pigeon-nets-for-duct-area" },
    ],
  },
  {
    title: "Sports Nets",
    hubHref: "/sports-nets",
    links: [
      { label: "Sports Nets", href: "/sports-nets" },
      { label: "Cricket Nets", href: "/cricket-nets" },
      { label: "Cricket Practice Nets", href: "/cricket-nets-for-practice-grounds" },
      { label: "Football Nets", href: "/sports-nets" },
      { label: "Football Goal Nets", href: "/sports-nets" },
      { label: "Golf Nets", href: "/sports-nets" },
      { label: "Volleyball Nets", href: "/sports-nets" },
    ],
  },
  {
    title: "Cloth Hangers",
    hubHref: "/cloth-hangers",
    links: [
      { label: "Cloth Hangers", href: "/cloth-hangers" },
      { label: "Ceiling Cloth Hangers", href: "/cloth-hangers" },
      { label: "Balcony Cloth Hangers", href: "/cloth-hangers-for-balcony" },
      { label: "Wall Mounted Cloth Hangers", href: "/cloth-hangers" },
      { label: "Pulley Cloth Hangers", href: "/cloth-hangers" },
      { label: "Stainless Steel Cloth Hangers", href: "/cloth-hangers" },
      { label: "Clothes Drying Hangers", href: "/cloth-hangers" },
    ],
  },
  {
    title: "Bird Spikes",
    hubHref: "/anti-bird-spikes",
    links: [
      { label: "Bird Spikes", href: "/anti-bird-spikes" },
      { label: "Pigeon Spikes", href: "/anti-bird-spikes" },
      { label: "Anti Bird Spikes", href: "/anti-bird-spikes" },
      { label: "Anti Pigeon Spikes", href: "/anti-bird-spikes" },
      { label: "Bird Control Spikes", href: "/anti-bird-spikes-for-pigeon-control" },
      { label: "Pigeon Control Spikes", href: "/anti-bird-spikes-for-pigeon-control" },
      { label: "Stainless Steel Bird Spikes", href: "/anti-bird-spikes" },
    ],
  },
  {
    title: "Terrace Safety Nets",
    hubHref: "/terrace-safety-nets",
    links: [
      { label: "Terrace Safety Nets", href: "/terrace-safety-nets" },
      { label: "Terrace Nets Near Me", href: "/terrace-safety-nets" },
      { label: "Open Terrace Protection", href: "/terrace-safety-nets-for-terrace" },
      { label: "Terrace Fall Protection", href: "/terrace-safety-nets-for-fall-protection" },
    ],
  },
  {
    title: "Duct Area Nets",
    hubHref: "/duct-area-nets",
    links: [
      { label: "Duct Area Nets", href: "/duct-area-nets" },
      { label: "Duct Pigeon Nets", href: "/pigeon-nets-for-duct-area" },
      { label: "Kitchen Duct Nets", href: "/duct-area-nets-for-duct-area" },
      { label: "Bird Nets for Ducts", href: "/bird-nets-for-duct-area" },
    ],
  },
  {
    title: "Mosquito Nets",
    hubHref: "/mosquito-nets",
    links: [
      { label: "Mosquito Nets", href: "/mosquito-nets" },
      { label: "Window Mosquito Nets", href: "/mosquito-nets-for-windows" },
      { label: "Balcony Mosquito Nets", href: "/mosquito-nets-for-balcony" },
    ],
  },
  {
    title: "Staircase Safety Nets",
    hubHref: "/staircase-safety-nets",
    links: [
      { label: "Staircase Safety Nets", href: "/staircase-safety-nets" },
      { label: "Staircase Child Safety", href: "/staircase-safety-nets-for-child-safety" },
      { label: "Open Staircase Nets", href: "/staircase-safety-nets-for-staircase" },
    ],
  },
];

/** Cities shown in the header Locations dropdown (includes Vijayawada). */
export const navCitySlugs = [
  "visakhapatnam",
  "vijayawada",
  "kakinada",
  "rajahmundry",
  "vizianagaram",
  "srikakulam",
  "eluru",
  "tadepalligudem",
  "anakapalli",
  "narsipatnam",
  "yelamanchili",
] as const;

export const heroIntroContent = {
  h1: "Invisible Grills, Safety Nets & Pigeon Nets in Andhra Pradesh",
  paragraphs: [
    "Protect your balcony, windows, terrace, duct areas, and open spaces with professional invisible grills, safety nets, pigeon nets, bird protection nets, anti bird spikes, cloth hangers, and sports nets from Sai Durga Invisible Grills.",
    "We provide clean, safe, and professional installation for homes, apartments, villas, schools, hospitals, commercial buildings, sports areas, and high-rise buildings across Visakhapatnam, Vijayawada, Kakinada, Rajahmundry, Vizianagaram, Srikakulam, Eluru, Tadepalligudem, Anakapalli, Narsipatnam, Elamanchili, and nearby Andhra Pradesh locations.",
    "Call now or WhatsApp us for a free quote and site inspection.",
  ],
};
