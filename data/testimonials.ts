/**
 * Sample testimonial placeholders — replace with real, verified customer reviews.
 * These are intentionally generic and are NOT used to generate aggregateRating or
 * review schema (no fake ratings are ever published as structured data).
 */
export interface Testimonial {
  name: string;
  area: string;
  service: string;
  rating: number;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Customer (name on request)",
    area: "Visakhapatnam",
    service: "Invisible Grills",
    rating: 5,
    review:
      "The team measured our balcony properly and the invisible grill finish is neat. It keeps the view open and feels secure for the kids.",
  },
  {
    name: "Customer (name on request)",
    area: "Kakinada",
    service: "Balcony Safety Nets",
    rating: 5,
    review:
      "Quick site visit and clean installation of balcony safety nets. Good guidance on the net type before booking.",
  },
  {
    name: "Customer (name on request)",
    area: "Rajahmundry",
    service: "Pigeon Nets",
    rating: 5,
    review:
      "Pigeon net installation solved our balcony mess problem. The fitting is tidy and does not spoil the look.",
  },
  {
    name: "Customer (name on request)",
    area: "Vizianagaram",
    service: "Children Safety Nets",
    rating: 5,
    review:
      "We wanted safety for our child without closing the balcony. The children safety net was a practical solution and well fitted.",
  },
  {
    name: "Customer (name on request)",
    area: "Srikakulam",
    service: "Anti Bird Spikes",
    rating: 5,
    review:
      "Bird spikes were installed on the parapet and ledges. Birds stopped sitting there and the area stays clean now.",
  },
  {
    name: "Customer (name on request)",
    area: "Eluru",
    service: "Cloth Hangers",
    rating: 5,
    review:
      "The ceiling cloth hanger works smoothly and saved balcony space. Simple booking and neat installation.",
  },
];
