/**
 * Editable material cards shown on the homepage MaterialsSection.
 * Warranty ranges are placeholders — confirm the exact warranty per material at
 * the time of quotation. No fake guarantees are implied.
 */
export interface MaterialCard {
  name: string;
  description: string;
  benefits: string[];
  warranty: string;
}

export const materials: MaterialCard[] = [
  {
    name: "SS304 Invisible Grill Wire",
    description:
      "High-tensile stainless steel wire used for invisible grills where a clean, near-transparent finish and everyday durability matter.",
    benefits: ["Strong pull-load capacity", "Rust-resistant in normal humidity", "Slim, low-visibility profile"],
    warranty: "Warranty range on request",
  },
  {
    name: "HDPE Nets",
    description:
      "High-density polyethylene netting engineered for balcony, terrace, and duct safety with good weather resistance.",
    benefits: ["UV-treated for sun exposure", "Light and flexible", "Suitable for large openings"],
    warranty: "Warranty range on request",
  },
  {
    name: "Nylon Nets",
    description:
      "Braided nylon netting used where extra softness and knot strength are preferred for child and pet safety.",
    benefits: ["Soft on accidental contact", "Strong knotted structure", "Good for windows and balconies"],
    warranty: "Warranty range on request",
  },
  {
    name: "Garware Nets",
    description:
      "Branded netting known for consistent quality and durability, chosen for demanding safety and bird-protection jobs.",
    benefits: ["Consistent branded quality", "Durable under weather load", "Trusted for safety applications"],
    warranty: "Warranty range on request",
  },
  {
    name: "Tuff Nets",
    description:
      "Tough, high-strength netting selected for heavy-duty applications such as sports and large terrace areas.",
    benefits: ["High strength", "Abrasion resistant", "Ideal for sports and terraces"],
    warranty: "Warranty range on request",
  },
  {
    name: "Braided Nets",
    description:
      "Braided-construction netting offering a balance of strength and flexibility for everyday residential safety.",
    benefits: ["Balanced strength and flexibility", "Neat appearance", "Good residential fit"],
    warranty: "Warranty range on request",
  },
  {
    name: "Twisted Nets",
    description:
      "Twisted-cord netting used where a firmer, tighter weave is preferred for specific safety requirements.",
    benefits: ["Firm, tight weave", "Reliable structure", "Practical for varied openings"],
    warranty: "Warranty range on request",
  },
  {
    name: "Stainless Steel Bird Spikes",
    description:
      "Rust-resistant stainless steel spikes fixed on ledges and edges to stop birds from sitting and nesting.",
    benefits: ["Anti-rust stainless build", "Discreet on building edges", "Low maintenance"],
    warranty: "Warranty range on request",
  },
  {
    name: "Aluminium Cloth Hanger Systems",
    description:
      "Lightweight aluminium cloth-drying systems for ceilings and balconies that save space and resist corrosion.",
    benefits: ["Corrosion-resistant aluminium", "Space-saving design", "Smooth daily operation"],
    warranty: "Warranty range on request",
  },
];
