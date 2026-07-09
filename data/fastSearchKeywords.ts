/**
 * High-intent Google searches mapped to valid on-site URLs.
 * Used in mobile nav, homepage, and internal linking blocks.
 */
export interface FastSearchLink {
  label: string;
  href: string;
  category: "near-me" | "best" | "price" | "install" | "local";
}

export const fastSearchKeywords: FastSearchLink[] = [
  { label: "Safety nets near me", href: "/safety-nets", category: "near-me" },
  { label: "Best safety nets near me", href: "/safety-nets", category: "best" },
  { label: "Balcony safety nets near me", href: "/balcony-safety-nets", category: "near-me" },
  { label: "Invisible grills near me", href: "/invisible-grills", category: "near-me" },
  { label: "Best invisible grills near me", href: "/invisible-grills", category: "best" },
  { label: "Pigeon nets near me", href: "/pigeon-nets", category: "near-me" },
  { label: "Anti pigeon nets near me", href: "/pigeon-nets", category: "near-me" },
  { label: "Bird nets near me", href: "/bird-nets", category: "near-me" },
  { label: "Children safety nets near me", href: "/children-safety-nets", category: "near-me" },
  { label: "Pet safety nets near me", href: "/pet-safety-nets", category: "near-me" },
  { label: "Cloth hangers near me", href: "/cloth-hangers", category: "near-me" },
  { label: "Cricket nets near me", href: "/cricket-nets", category: "near-me" },
  { label: "Anti bird spikes near me", href: "/anti-bird-spikes", category: "near-me" },
  { label: "Terrace safety nets near me", href: "/terrace-safety-nets", category: "near-me" },
  { label: "Duct area nets near me", href: "/duct-area-nets", category: "near-me" },
  { label: "Safety nets Visakhapatnam", href: "/safety-nets-in-visakhapatnam", category: "local" },
  { label: "Safety nets Vijayawada", href: "/safety-nets-in-vijayawada", category: "local" },
  { label: "Invisible grills Visakhapatnam", href: "/invisible-grills-in-visakhapatnam", category: "local" },
  { label: "Invisible grills Vijayawada", href: "/invisible-grills-in-vijayawada", category: "local" },
  { label: "Pigeon nets Kakinada", href: "/pigeon-nets-in-kakinada", category: "local" },
  { label: "Balcony nets Rajahmundry", href: "/balcony-safety-nets-in-rajahmundry", category: "local" },
  { label: "Best safety nets Vizag", href: "/safety-nets-in-visakhapatnam", category: "best" },
  { label: "Best pigeon nets Vizag", href: "/pigeon-nets-in-visakhapatnam", category: "best" },
  { label: "Safety net installation near me", href: "/safety-nets-installation-in-visakhapatnam", category: "install" },
  { label: "Invisible grill installation near me", href: "/invisible-grills-installation-in-visakhapatnam", category: "install" },
  { label: "Pigeon net installation near me", href: "/pigeon-nets-installation-in-visakhapatnam", category: "install" },
  { label: "Free site inspection near me", href: "/safety-nets-free-site-inspection-in-visakhapatnam", category: "install" },
  { label: "Local safety net installers", href: "/safety-nets-local-installers-in-visakhapatnam", category: "install" },
  { label: "Safety nets price near me", href: "/safety-net-price", category: "price" },
  { label: "Invisible grills price", href: "/invisible-grill-price", category: "price" },
  { label: "Pigeon nets price", href: "/pigeon-net-price", category: "price" },
  { label: "Balcony safety net price", href: "/balcony-safety-net-price", category: "price" },
  { label: "Affordable safety nets near me", href: "/safety-nets-affordable-in-visakhapatnam", category: "price" },
  { label: "Premium invisible grills", href: "/invisible-grills-premium-in-visakhapatnam", category: "best" },
  { label: "High quality safety nets", href: "/safety-nets-high-quality-in-visakhapatnam", category: "best" },
  { label: "Apartment balcony safety nets", href: "/balcony-safety-nets-for-apartments", category: "local" },
  { label: "Balcony pigeon net installation", href: "/pigeon-nets-for-balcony", category: "install" },
  { label: "Window invisible grills", href: "/invisible-grills-for-windows", category: "local" },
  { label: "Child safety nets for balcony", href: "/children-safety-nets-for-balcony", category: "local" },
  { label: "Sports nets Andhra Pradesh", href: "/sports-nets", category: "local" },
  { label: "Cricket practice nets near me", href: "/cricket-nets-for-practice-grounds", category: "near-me" },
  { label: "Mosquito nets near me", href: "/mosquito-nets", category: "near-me" },
  { label: "Staircase safety nets", href: "/staircase-safety-nets", category: "local" },
  { label: "Bird spikes for pigeons", href: "/anti-bird-spikes-for-pigeon-control", category: "local" },
  { label: "Safety nets Eluru", href: "/safety-nets-in-eluru", category: "local" },
  { label: "Safety nets Srikakulam", href: "/safety-nets-in-srikakulam", category: "local" },
  { label: "Safety nets Vizianagaram", href: "/safety-nets-in-vizianagaram", category: "local" },
  { label: "Near me service safety nets", href: "/safety-nets-near-me-service-in-visakhapatnam", category: "near-me" },
  { label: "Trusted safety net contractor", href: "/safety-nets-trusted-contractor-in-visakhapatnam", category: "best" },
];

export const fastSearchByCategory = {
  "near-me": fastSearchKeywords.filter((k) => k.category === "near-me"),
  best: fastSearchKeywords.filter((k) => k.category === "best"),
  price: fastSearchKeywords.filter((k) => k.category === "price"),
  install: fastSearchKeywords.filter((k) => k.category === "install"),
  local: fastSearchKeywords.filter((k) => k.category === "local"),
};
