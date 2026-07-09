import { site } from "@/lib/site";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Business-wide FAQs that apply to virtually every page (kept short so they don't dominate page content). */
export const businessFaqs: FaqItem[] = [
  {
    question: "Do you provide a free site inspection before quoting?",
    answer:
      `Yes. ${site.name} offers a free on-site inspection and measurement before sharing a firm quotation, so pricing is based on your actual space and requirement.`,
  },
  {
    question: "How can I book a free quote or site visit?",
    answer:
      `Call or WhatsApp us at ${site.phone}, or email ${site.email} with your location and requirement, and our team will schedule a visit.`,
  },
];

/** Service-specific FAQs, written around real installation and material questions. */
export const serviceFaqs: Record<string, FaqItem[]> = {
  "invisible-grills": [
    { question: "How much drilling is required for invisible grills?", answer: "Invisible grills need only small anchor points at the top and bottom of each wire run — far less drilling than a full welded iron grill, and the holes are easily patched if the wires are ever removed." },
    { question: "Will invisible grills rust over time?", answer: "We use SS-304 wire for standard locations and SS-316 marine-grade wire for coastal or high-humidity areas, both of which resist rust for years with no special maintenance." },
    { question: "Can invisible grills stop a determined child from climbing out?", answer: "The high-tensile wires are spaced and tensioned to resist pulling and climbing, and are load-tested — for very young children we often recommend pairing with a dedicated child-safety net for extra coverage." },
    { question: "How long does an invisible grill installation take?", answer: "Most home installations are completed within a single day, depending on the number of openings and total running feet of wire." },
  ],
  "safety-nets": [
    { question: "What is the mesh size used in your safety nets?", answer: "We select mesh/knot spacing based on the use case — tighter spacing for child and pet safety, standard spacing for general fall protection and object containment." },
    { question: "Are safety nets safe for young children to lean on?", answer: "Yes. The netting is soft on contact and rated for high pull-strength, so it safely absorbs the weight of a child leaning or pushing against it." },
    { question: "Can safety nets be removed and reinstalled easily?", answer: "Most of our net installations use a hook-and-rope system that allows the netting to be detached for cleaning or temporary removal and refitted without damage." },
    { question: "How long do safety nets typically last outdoors?", answer: "Our UV-stabilised HDPE/nylon netting is rated for several years of continuous outdoor exposure before any re-tensioning or replacement is needed." },
  ],
  "balcony-safety-nets": [
    { question: "Will a balcony safety net block my view?", answer: "The fine mesh is designed to be minimally visible from a normal viewing distance, so you keep most of your balcony view while gaining full fall protection." },
    { question: "Can balcony nets be fitted on L-shaped or curved balconies?", answer: "Yes, our installation team custom-fits the netting to any balcony shape, including corners, curves, and grill obstructions." },
    { question: "Do I need to remove balcony safety nets during heavy rain?", answer: "No, the netting and hardware are weatherproof and designed to stay installed through monsoon conditions." },
  ],
  "pigeon-nets": [
    { question: "Will pigeon nets harm the birds?", answer: "No. Pigeon nets are a purely physical barrier — pigeons are simply unable to land or nest in the protected area, with no chemicals or harm involved." },
    { question: "What mesh size stops pigeons specifically?", answer: "We use a fine-knot mesh sized specifically to block pigeons from squeezing through, while still allowing airflow." },
    { question: "Can pigeon nets be installed in duct areas?", answer: "Yes, duct shafts are one of the most common places pigeons nest, and we custom-fit netting to seal the duct opening completely." },
  ],
  "bird-nets": [
    { question: "Can bird nets cover a large warehouse or factory shed?", answer: "Yes, bird nets are commonly used for large open commercial and industrial spaces, with the netting grade selected based on the span and bird species involved." },
    { question: "How is bird netting anchored on large structures?", answer: "We use galvanised anchor points and support cabling suited to the structure, ensuring the netting stays taut across large spans." },
    { question: "Do bird nets work on crows and larger birds, not just pigeons?", answer: "Yes — we select mesh size and net grade based on the bird species involved, so the same netting approach works for crows, mynas, and other larger birds, not just pigeons." },
  ],
  "anti-bird-spikes": [
    { question: "Do anti-bird spikes hurt birds?", answer: "No. The spikes simply make the surface uncomfortable to land on — birds are deterred, not harmed." },
    { question: "Where are anti-bird spikes most effective?", answer: "They work best on narrow ledges, parapets, signboards, and AC unit tops where netting isn't practical." },
    { question: "How long do anti-bird spikes last outdoors?", answer: "Our polycarbonate and stainless steel spike strips are UV-resistant and built for several years of outdoor use." },
  ],
  "children-safety-nets": [
    { question: "At what age should I install a children's safety net?", answer: "We recommend installing safety netting as soon as a child begins pulling up to stand or climb, typically well before their first birthday." },
    { question: "Can a determined toddler pull the netting loose?", answer: "The netting uses reinforced border rope and high pull-strength material, engineered specifically to resist tugging and climbing by children." },
    { question: "Do you cover staircases as well as balconies?", answer: "Yes, children's safety netting is commonly extended to open staircases and loft openings in the same visit." },
  ],
  "pet-safety-nets": [
    { question: "Can cats squeeze through standard safety netting?", answer: "Standard mesh can be too wide for cats — we use a finer, pet-specific mesh spacing that keeps even small cats safely contained." },
    { question: "Is the netting resistant to scratching and chewing?", answer: "We use durable, tightly woven nylon/HDPE netting that holds up well to normal pet activity including scratching and occasional chewing." },
    { question: "Can the same netting keep both dogs and cats safely inside?", answer: "Yes, we size the mesh to the smallest pet in the household, so one installation safely contains cats, small dogs, and larger breeds together." },
  ],
  "terrace-safety-nets": [
    { question: "Can terrace nets cover the full perimeter of a rooftop?", answer: "Yes, we install netting around the entire open perimeter of the terrace, not just isolated sections, for complete protection." },
    { question: "Is terrace netting strong enough for a large family gathering?", answer: "The netting and anchor points are rated for continuous outdoor use and everyday activity, including functions and children's play." },
    { question: "Can terrace nets be temporarily opened for events or drying clothes?", answer: "Yes, most terrace net installations use a hook-and-rope system so sections can be untied and reopened when needed, then refastened afterward." },
  ],
  "duct-area-nets": [
    { question: "Why do pigeons prefer duct shafts?", answer: "Duct shafts offer pigeons a sheltered, quiet nesting spot away from human activity — sealing the opening with netting removes that opportunity entirely." },
    { question: "How many floors of a duct shaft can be covered?", answer: "We can seal a duct at a single floor or across its full height depending on where nesting or debris is occurring." },
    { question: "Does sealing a duct area affect ventilation or airflow?", answer: "No — the netting is a physical bird barrier only; it does not block the duct's airflow or ventilation function." },
  ],
  "cloth-hangers": [
    { question: "How much weight can a ceiling cloth hanger take?", answer: "Our anodized aluminium hanger rods and steel pulley systems are rated for standard household laundry loads across multiple rods." },
    { question: "Will the pulley mechanism get stiff over time?", answer: "The pulley and rope system is selected for smooth long-term operation, and we use rust-resistant hardware suited to humid balcony conditions." },
    { question: "Can a ceiling hanger be installed on any balcony or utility area?", answer: "Yes, we assess ceiling height and structure during the site visit and fit the hanger frame to suit balconies, utility areas, and covered terraces." },
  ],
  "sports-nets": [
    { question: "What net grade do you use for sports barriers?", answer: "We select high-tenacity HDPE netting weight based on ball type and impact speed, with heavier grades for cricket and lighter grades for general ball containment." },
    { question: "Can you install a pole framework as well as the netting?", answer: "Yes, we can supply and install a complete framework of galvanised iron support poles along with the netting for a fully enclosed setup." },
    { question: "Can sports nets be used to divide a shared terrace or ground?", answer: "Yes, sports netting is commonly used as a dividing barrier between practice areas or to protect nearby walls, vehicles, and windows from stray balls." },
  ],
  "cricket-nets": [
    { question: "Do you install full enclosure nets (sides + top)?", answer: "Yes, we offer both side-only netting and full enclosure setups with top netting, depending on the space and budget." },
    { question: "How many practice lanes can be set up on a terrace?", answer: "This depends on available length and width — our team will assess your terrace or ground during the free site visit and recommend the best layout." },
    { question: "What netting grade is used for fast-bowling practice?", answer: "We use heavier-gauge HDPE netting rated for high-impact ball speeds for fast-bowling practice nets, compared to lighter grades used for basic containment." },
  ],
  "mosquito-nets": [
    { question: "Do mosquito nets block airflow?", answer: "No. The fine mesh is selected to stop mosquitoes and small insects while still allowing normal air movement through windows, balcony doors, and utility openings." },
    { question: "Can mosquito nets be custom-fitted around existing grills?", answer: "Yes, we measure the exact opening and plan the fitting around grills, handles, frames, and any existing fixtures." },
    { question: "Are mosquito nets safe for homes with children and pets?", answer: "Yes. Mosquito nets reduce the need for chemical repellents and create a physical insect barrier suitable for family homes." },
  ],
  "staircase-safety-nets": [
    { question: "Can staircase safety nets cover duplex voids and loft openings?", answer: "Yes, we custom-fit staircase safety nets around open stairwells, duplex voids, loft edges, and railing gaps." },
    { question: "Will staircase netting make the home look closed or dark?", answer: "No. The netting is visually light and keeps the space open while closing dangerous fall gaps." },
    { question: "Can staircase nets be installed with balcony safety nets in the same visit?", answer: "Yes, many customers combine staircase, balcony, and window safety netting during one site inspection and installation schedule." },
  ],
};

/**
 * Homepage FAQ set. Rendered in the visible FAQ accordion AND used verbatim for the
 * FAQPage JSON-LD schema, so the structured data always matches the on-page content.
 */
export const homepageFaqs: FaqItem[] = [
  {
    question: "What services do you provide?",
    answer:
      "We provide invisible grills, balcony safety nets, pigeon nets, bird nets, anti bird spikes, children safety nets, pet safety nets, terrace safety nets, duct area nets, cloth hangers, sports nets, and cricket nets.",
  },
  {
    question: "Do you provide invisible grills in Visakhapatnam?",
    answer:
      "Yes, we provide invisible grill installation in Visakhapatnam and nearby areas including Gajuwaka, Madhurawada, PM Palem, Kommadi, Yendada, MVP Colony, Seethammadhara, NAD Junction, Pendurthi, and surrounding locations.",
  },
  {
    question: "Are invisible grills safe for children?",
    answer:
      "Invisible grills are commonly used for balcony and window safety in apartments and high-rise buildings. Proper material selection, spacing, fixing, and installation quality are important for safety.",
  },
  {
    question: "Do safety nets block air and light?",
    answer:
      "Safety nets provide protection while allowing air and light to pass through. The final appearance depends on net type, color, spacing, and installation area.",
  },
  {
    question: "Can pigeon nets be installed in rented apartments?",
    answer:
      "Yes, pigeon nets can usually be installed in rented apartments, but tenants should take permission from the owner or apartment association before installation.",
  },
  {
    question: "What is the price of pigeon net installation?",
    answer:
      "Pigeon net price depends on balcony size, duct area size, net quality, building height, fixing points, and installation difficulty. A site measurement gives the most accurate quote.",
  },
  {
    question: "Do you provide service near me?",
    answer:
      "We provide services across Visakhapatnam, Kakinada, Rajahmundry, Vizianagaram, Srikakulam, Eluru, Tadepalligudem, Anakapalli, Narsipatnam, Elamanchili, and nearby Andhra Pradesh areas.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Installation time depends on the service type, area size, material requirement, and access difficulty. Small balcony or window jobs may take less time, while large projects may need more planning.",
  },
  {
    question: "Do you install anti bird spikes?",
    answer:
      "Yes, we install anti bird spikes for ledges, parapet walls, window edges, shop boards, AC areas, and building projections where birds sit regularly.",
  },
  {
    question: "Do you install cricket nets and sports nets?",
    answer:
      "Yes, we install cricket practice nets and sports nets for schools, coaching centers, sports grounds, farms, indoor practice spaces, and outdoor grounds.",
  },
];

export function getServiceFaqs(serviceSlug: string): FaqItem[] {
  return serviceFaqs[serviceSlug] ?? [];
}

export function buildPriceFaqs(serviceName: string): FaqItem[] {
  return [
    {
      question: `What is the average ${serviceName.toLowerCase()} price per square/running foot?`,
      answer:
        "Exact pricing depends on material grade, area or running feet required, installation height, and site accessibility — we avoid quoting a fixed number online and instead provide an accurate estimate after a free site inspection.",
    },
    {
      question: "Does the price include installation?",
      answer: "Yes, our quotations include material, fittings, and professional installation by our own trained team.",
    },
    {
      question: "Do prices vary between apartments, villas, and commercial buildings?",
      answer: "Yes — access, height, and mounting surface differ by property type, which can affect labour time and hardware required.",
    },
    {
      question: "Is there a minimum order size?",
      answer: "We take up both small single-window jobs and large multi-floor projects — every site is quoted individually after inspection.",
    },
  ];
}

export function buildComparisonFaqs(nameA: string, nameB: string): FaqItem[] {
  return [
    {
      question: `Is ${nameA} or ${nameB} better for a family with young children?`,
      answer: `Both solutions offer strong fall protection; the right choice depends on your balcony shape, budget, and whether preserving the view is a priority — see the comparison above for a side-by-side view.`,
    },
    {
      question: `Can I combine ${nameA} and ${nameB} on the same property?`,
      answer: `Yes, many customers use one solution for balconies and the other for a different area (such as a terrace or duct) based on what each is best suited for.`,
    },
    {
      question: "Which option costs less?",
      answer:
        "Cost depends on the exact area, material grade, and site access — request a free quote for both options and we will help you compare for your specific space.",
    },
  ];
}
