export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  coverImageCategory: string;
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-stop-pigeons-in-balcony",
    title: "How to Stop Pigeons From Nesting in Your Balcony",
    description:
      "A practical guide to permanently keeping pigeons off your balcony using physical barriers — what works, what doesn't, and how to choose between nets and spikes.",
    publishedAt: "2025-11-04",
    updatedAt: "2026-04-18",
    readingMinutes: 6,
    coverImageCategory: "safety-nets-balcony",
    relatedServiceSlugs: ["pigeon-nets", "anti-bird-spikes", "duct-area-nets"],
    relatedCitySlugs: ["visakhapatnam", "kakinada", "rajahmundry"],
    sections: [
      {
        heading: "Why pigeons keep coming back",
        body: [
          "Pigeons return to the same balcony repeatedly because it offers shelter, a flat ledge to nest on, and no natural predators. Once a pair nests successfully, they tend to return to the same spot year after year, which is why one-time cleaning or scaring methods rarely work for long.",
          "Sound deterrents, reflective tape, and fake owls give short-term results at best because pigeons quickly learn these are not real threats. A physical barrier is the only method that produces a lasting result.",
        ],
      },
      {
        heading: "Pigeon nets vs anti-bird spikes",
        body: [
          "Pigeon nets fully enclose an opening — ideal for balconies, sit-outs, and duct areas where you want to seal the space completely. Anti-bird spikes work best on narrow ledges and parapets where a net isn't practical, making the surface impossible to perch on without harming the bird.",
          "For most apartment balconies, a fine-mesh pigeon net is the more complete solution since it also stops feathers, nesting material, and droppings from entering the living space.",
        ],
      },
      {
        heading: "What to check before installation",
        body: [
          "Measure the full opening including any gaps near grills, AC units, or pipes — pigeons only need a small gap to get through. A good installer will inspect the entire balcony perimeter, not just the obvious opening, before quoting.",
        ],
      },
      {
        heading: "Maintaining a pigeon-free balcony",
        body: [
          "Once netting is installed, periodically check the edges for gaps that may open up from wind or wear, and clean the balcony promptly if any nesting material remains, since leftover material can attract new pairs.",
        ],
      },
    ],
  },
  {
    slug: "balcony-safety-for-kids",
    title: "Balcony Safety for Kids: A Parent's Practical Checklist",
    description:
      "What every parent should check on a balcony before letting toddlers and young children play near it — and which safety solutions genuinely hold up to climbing.",
    publishedAt: "2025-09-12",
    updatedAt: "2026-03-02",
    readingMinutes: 7,
    coverImageCategory: "children-safety-nets",
    relatedServiceSlugs: ["children-safety-nets", "safety-nets", "invisible-grills"],
    relatedCitySlugs: ["visakhapatnam", "eluru", "vizianagaram"],
    sections: [
      {
        heading: "Why standard railings are not enough",
        body: [
          "Most balcony railings are built to a general building-code height, not specifically to stop a determined toddler from climbing. Horizontal railing bars, in particular, act like a ladder for young children.",
          "If your railing has horizontal bars, gaps wider than about 4 inches, or any nearby furniture a child could use to climb, additional protection is strongly recommended regardless of floor height.",
        ],
      },
      {
        heading: "What to look for in a child-safety net",
        body: [
          "A good children's safety net should use reinforced border rope, high pull-strength mesh, and anchor points fixed into solid structure — not just into the railing itself, which can flex under repeated pulling.",
          "Ask your installer about the tensile rating of the netting and how the anchor points are secured; this is the difference between a decorative-looking net and one that actually resists a climbing child.",
        ],
      },
      {
        heading: "Balcony furniture and fall risk",
        body: [
          "Even with netting installed, avoid placing chairs, stools, or planters near the railing — children are resourceful, and removing the climbing aid is a simple additional layer of safety.",
        ],
      },
      {
        heading: "A simple pre-monsoon and pre-summer checklist",
        body: [
          "Twice a year, check netting tension, look for any small gaps that have opened up, and confirm anchor points are still firmly fixed — this quick check takes a few minutes and keeps the protection reliable year-round.",
        ],
      },
    ],
  },
  {
    slug: "invisible-grill-price-guide",
    title: "Invisible Grill Price Guide: What Actually Affects the Cost",
    description:
      "An honest breakdown of what drives invisible grill pricing per running foot — material grade, height, anchor points, and site access — so you know what to ask for in a quotation.",
    publishedAt: "2025-08-20",
    updatedAt: "2026-05-11",
    readingMinutes: 6,
    coverImageCategory: "invisible-grill-balcony",
    relatedServiceSlugs: ["invisible-grills", "safety-nets", "balcony-safety-nets"],
    relatedCitySlugs: ["visakhapatnam", "kakinada", "rajahmundry", "eluru"],
    sections: [
      {
        heading: "Why there is no single fixed price",
        body: [
          "Invisible grill pricing is typically quoted per running foot of wire, but the final cost depends on several site-specific factors — which is why we avoid publishing a fixed number and instead recommend a free site inspection for an accurate estimate.",
        ],
      },
      {
        heading: "Material grade: SS-304 vs SS-316",
        body: [
          "SS-304 wire is suitable for most inland locations, while SS-316 marine-grade wire is recommended for coastal cities like Visakhapatnam where salt-laden air accelerates corrosion. SS-316 costs more but avoids premature rusting near the coast.",
        ],
      },
      {
        heading: "Height, access, and anchor points",
        body: [
          "Installations on higher floors or with difficult access (narrow balconies, awkward pillars, nearby AC units) take longer and may need additional anchor points, which affects labour cost.",
          "Custom bends around grills, pillars, or fixed furniture also add to installation time compared to a straightforward flat opening.",
        ],
      },
      {
        heading: "How to get an accurate quotation",
        body: [
          "Share clear photos of each opening and rough measurements when you first contact us, and we will schedule a free site visit to confirm exact running footage, material recommendation, and a firm price before any work begins.",
        ],
      },
    ],
  },
  {
    slug: "terrace-safety-net-guide-for-apartments",
    title: "Terrace Safety Net Guide for Apartment Buildings",
    description:
      "How to plan a full-perimeter terrace safety net installation for an apartment or society terrace, including what society committees should ask contractors before approving work.",
    publishedAt: "2025-10-02",
    updatedAt: "2026-02-15",
    readingMinutes: 5,
    coverImageCategory: "safety-nets-balcony",
    relatedServiceSlugs: ["terrace-safety-nets", "duct-area-nets"],
    relatedCitySlugs: ["visakhapatnam", "vizianagaram"],
    sections: [
      {
        heading: "Why open terraces need dedicated planning",
        body: [
          "A society or apartment terrace is often used for functions, children's play, and drying — but the open perimeter rarely has fall protection beyond a low parapet. Planning netting for the full perimeter, not just isolated stretches, avoids leaving obvious gaps.",
        ],
      },
      {
        heading: "Questions a society committee should ask",
        body: [
          "Ask for the netting material grade (UV-stabilised HDPE is preferred for long-term rooftop exposure), how anchor points will be fixed without damaging waterproofing, and whether the quote covers the full terrace perimeter or only specific sections.",
        ],
      },
      {
        heading: "Coordinating with waterproofing and other terrace work",
        body: [
          "If your terrace has recent or planned waterproofing work, share this with your netting contractor so anchor points can be planned to avoid damaging the waterproofing layer.",
        ],
      },
    ],
  },
  {
    slug: "monsoon-maintenance-tips-for-balcony-safety-nets",
    title: "Monsoon Maintenance Tips for Balcony Safety Nets",
    description:
      "Simple checks to run on your balcony or terrace safety netting before and during the monsoon season to keep it performing at full strength.",
    publishedAt: "2025-06-10",
    updatedAt: "2026-05-28",
    readingMinutes: 4,
    coverImageCategory: "safety-nets-balcony",
    relatedServiceSlugs: ["safety-nets", "balcony-safety-nets", "terrace-safety-nets"],
    relatedCitySlugs: ["visakhapatnam", "kakinada", "eluru", "srikakulam"],
    sections: [
      {
        heading: "Before the monsoon starts",
        body: [
          "Inspect all anchor points for rust or loosening, check netting tension across the full span, and clear any debris that may have collected along the border rope.",
        ],
      },
      {
        heading: "During heavy rain and wind",
        body: [
          "Our UV-stabilised HDPE and nylon netting is designed to handle monsoon wind and rain without special measures, but avoid hanging unusually heavy items on the netting during storms.",
        ],
      },
      {
        heading: "After the season",
        body: [
          "Once the monsoon passes, do a final check for any small gaps that may have opened at the edges and get them re-tensioned promptly rather than waiting for the next season.",
        ],
      },
      {
        heading: "Why a post-monsoon inspection is worth booking",
        body: [
          "Salt-laden coastal air combined with monsoon moisture is a tougher test for hardware than dry-season use alone, which is why we recommend a proper physical inspection rather than just a visual check from indoors.",
          "A trained installer can spot early signs of anchor-point loosening or rope wear that aren't obvious from a distance, and a small re-tensioning visit now is far cheaper than a full net replacement later.",
        ],
      },
    ],
  },
  {
    slug: "choosing-right-mesh-size-for-pet-safety",
    title: "Choosing the Right Mesh Size for Pet Safety Nets",
    description:
      "Why standard safety net mesh spacing may not be enough for cats and small dogs, and how to choose the right mesh density for your pet.",
    publishedAt: "2025-07-22",
    updatedAt: "2026-01-30",
    readingMinutes: 4,
    coverImageCategory: "pet-safety-nets",
    relatedServiceSlugs: ["pet-safety-nets", "safety-nets"],
    relatedCitySlugs: ["visakhapatnam", "rajahmundry"],
    sections: [
      {
        heading: "Cats need a tighter mesh than you'd expect",
        body: [
          "Cats can squeeze through remarkably small gaps — a mesh spacing that comfortably stops a child from climbing through may still be too wide for a cat. Pet-specific netting uses a finer weave to close this gap.",
        ],
      },
      {
        heading: "Dogs and jumping or leaning behaviour",
        body: [
          "For dogs, the key factor is usually strength at the point of contact rather than mesh size alone — reinforced netting that resists tearing from scratching or leaning is important for larger, more active breeds.",
        ],
      },
      {
        heading: "Combining pet safety with child safety",
        body: [
          "If your household has both young children and pets, we typically recommend the tighter pet-safe mesh spacing throughout, since it satisfies both requirements at once.",
        ],
      },
      {
        heading: "What we check during the site visit",
        body: [
          "During the free inspection, we ask about the specific pets in the household — breed, size, and typical behaviour — since a small, determined cat and a large, calm dog can need noticeably different mesh specifications on the same balcony.",
          "We also check existing gaps around grills, drain openings, and gate edges, since a pet-safe net is only as effective as the weakest point in the overall boundary.",
        ],
      },
    ],
  },
];

export const blogPostsBySlug: Record<string, BlogPost> = Object.fromEntries(
  blogPosts.map((p) => [p.slug, p]),
);
