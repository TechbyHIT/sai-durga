import type { DemandTier } from "./cities";

export interface Area {
  id: string;
  slug: string;
  name: string;
  parentCitySlug: string;
  tier: DemandTier;
  localNote: string;
}

/**
 * Curated from the business's real service-area list. Only a subset of the full
 * service footprint is modelled here with real local detail; the same schema can
 * be extended to the remaining locations (Narsipatnam mandals, Konaseema villages,
 * Parvathipuram Manyam mandals, etc.) as genuine demand data becomes available —
 * see lib/pageGenerator.ts for how new areas automatically flow through the
 * quality-scoring and indexing pipeline without any code changes.
 */
export const areas: Area[] = [
  // ---------------- Visakhapatnam (priority) ----------------
  { id: "area-gajuwaka", slug: "gajuwaka", name: "Gajuwaka", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A dense industrial-residential hub near the steel plant, with a large mix of independent houses and mid-rise apartments." },
  { id: "area-madhurawada", slug: "madhurawada", name: "Madhurawada", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "Visakhapatnam's IT corridor, dominated by new high-rise apartment gated communities." },
  { id: "area-pm-palem", slug: "pm-palem", name: "PM Palem", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A fast-growing residential layout next to Madhurawada with many new apartment towers." },
  { id: "area-kommadi", slug: "kommadi", name: "Kommadi", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "An expanding apartment belt bordering Madhurawada on the Vizag IT corridor." },
  { id: "area-yendada", slug: "yendada", name: "Yendada", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A hillside residential locality with a growing number of gated apartment communities." },
  { id: "area-mvp-colony", slug: "mvp-colony", name: "MVP Colony", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "An established, upscale residential colony with independent houses and mid-rise apartments." },
  { id: "area-seethammadhara", slug: "seethammadhara", name: "Seethammadhara", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A central residential locality close to the beach road with many older apartment blocks." },
  { id: "area-dwaraka-nagar", slug: "dwaraka-nagar", name: "Dwaraka Nagar", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "Visakhapatnam's commercial and administrative centre, with dense mixed residential-commercial buildings." },
  { id: "area-siripuram", slug: "siripuram", name: "Siripuram", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A premium commercial and residential locality close to the Beach Road." },
  { id: "area-asilmetta", slug: "asilmetta", name: "Asilmetta", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A busy central junction area with a mix of apartments and commercial buildings." },
  { id: "area-gopalapatnam", slug: "gopalapatnam", name: "Gopalapatnam", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A densely populated locality on the NH16 corridor with many independent houses." },
  { id: "area-nad-junction", slug: "nad-junction", name: "NAD Junction", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A key junction locality connecting the port area to the rest of the city." },
  { id: "area-pendurthi", slug: "pendurthi", name: "Pendurthi", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A growing residential and industrial suburb on the northern edge of Visakhapatnam." },
  { id: "area-bheemunipatnam", slug: "bheemunipatnam", name: "Bheemunipatnam", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A coastal town within greater Visakhapatnam known for beach-facing homes and villas." },
  { id: "area-rushikonda", slug: "rushikonda", name: "Rushikonda", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A beach-facing locality with villas and premium apartment developments." },
  { id: "area-sagar-nagar", slug: "sagar-nagar", name: "Sagar Nagar", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A residential layout close to Rushikonda with a mix of independent houses and apartments." },
  { id: "area-lawsons-bay-colony", slug: "lawsons-bay-colony", name: "Lawsons Bay Colony", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "An upscale beachside colony known for independent houses and villas." },
  { id: "area-akkayyapalem", slug: "akkayyapalem", name: "Akkayyapalem", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A busy central residential-commercial locality." },
  { id: "area-maddilapalem", slug: "maddilapalem", name: "Maddilapalem", parentCitySlug: "visakhapatnam", tier: "priority", localNote: "A central junction locality with dense apartment construction." },
  { id: "area-malkapuram", slug: "malkapuram", name: "Malkapuram", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "An industrial-residential locality close to the port area." },
  { id: "area-kancharapalem", slug: "kancharapalem", name: "Kancharapalem", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "An older, densely built residential locality with mostly independent houses." },
  { id: "area-simhachalam", slug: "simhachalam", name: "Simhachalam", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A temple-town locality with a mix of independent houses and small apartment blocks." },
  { id: "area-sujatha-nagar", slug: "sujatha-nagar", name: "Sujatha Nagar", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A residential locality near Gopalapatnam with a growing number of apartments." },
  { id: "area-vepagunta", slug: "vepagunta", name: "Vepagunta", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A developing residential locality on the northern industrial corridor." },
  { id: "area-anandapuram", slug: "anandapuram", name: "Anandapuram", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A mandal on the outer edge of the city seeing new layout development." },
  { id: "area-sabbavaram", slug: "sabbavaram", name: "Sabbavaram", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "An outer mandal with independent houses and emerging residential layouts." },
  { id: "area-duvvada", slug: "duvvada", name: "Duvvada", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "An industrial-adjacent locality near the railway station." },
  { id: "area-steel-plant-township", slug: "steel-plant-township", name: "Steel Plant Township", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A planned township for steel plant employees with low-rise quarters and independent houses." },
  { id: "area-auto-nagar", slug: "auto-nagar", name: "Auto Nagar", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A mixed industrial-residential locality in south Visakhapatnam." },
  { id: "area-old-gajuwaka", slug: "old-gajuwaka", name: "Old Gajuwaka", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "The older residential core of Gajuwaka with narrow lanes and independent houses." },
  { id: "area-one-town", slug: "one-town", name: "One Town", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A historic, densely packed commercial-residential locality near the port." },
  { id: "area-allipuram", slug: "allipuram", name: "Allipuram", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "An old-town locality with closely spaced independent houses." },
  { id: "area-waltair-uplands", slug: "waltair-uplands", name: "Waltair Uplands", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A hillside heritage locality close to RK Beach with bungalows and low-rise apartments." },
  { id: "area-cbm-compound", slug: "cbm-compound", name: "CBM Compound", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A commercial-residential locality near the harbour." },
  { id: "area-jagadamba-junction", slug: "jagadamba-junction", name: "Jagadamba Junction", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A major commercial junction with mixed-use buildings above shops." },
  { id: "area-narava", slug: "narava", name: "Narava", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "An outer residential locality between Pendurthi and Bheemunipatnam." },
  { id: "area-marikavalasa", slug: "marikavalasa", name: "Marikavalasa", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "An emerging layout near the Madhurawada IT corridor." },
  { id: "area-endada", slug: "endada", name: "Endada", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A developing residential pocket close to Madhurawada." },
  { id: "area-sontyam", slug: "sontyam", name: "Sontyam", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A quieter outer locality with mostly independent houses." },

  // ---------------- Kakinada ----------------
  { id: "area-suryaraopeta", slug: "suryaraopeta", name: "Suryaraopeta", parentCitySlug: "kakinada", tier: "priority", localNote: "A central commercial-residential locality in Kakinada city." },
  { id: "area-jagannaickpur", slug: "jagannaickpur", name: "Jagannaickpur", parentCitySlug: "kakinada", tier: "priority", localNote: "A well-established residential locality with independent houses and apartments." },
  { id: "area-gandhi-nagar-kakinada", slug: "gandhi-nagar-kakinada", name: "Gandhi Nagar", parentCitySlug: "kakinada", tier: "priority", localNote: "A central Kakinada residential locality close to the main market." },
  { id: "area-bhanugudi-junction", slug: "bhanugudi-junction", name: "Bhanugudi Junction", parentCitySlug: "kakinada", tier: "priority", localNote: "A key commercial junction with mixed-use buildings." },
  { id: "area-sarpavaram", slug: "sarpavaram", name: "Sarpavaram", parentCitySlug: "kakinada", tier: "standard", localNote: "A residential locality on the outskirts of Kakinada city." },
  { id: "area-madhavapatnam", slug: "madhavapatnam", name: "Madhavapatnam", parentCitySlug: "kakinada", tier: "standard", localNote: "A residential locality close to Kakinada's port area." },
  { id: "area-vakalapudi", slug: "vakalapudi", name: "Vakalapudi", parentCitySlug: "kakinada", tier: "standard", localNote: "A coastal locality near the Kakinada SEZ with new residential layouts." },
  { id: "area-santhi-nagar-kakinada", slug: "santhi-nagar-kakinada", name: "Santhi Nagar", parentCitySlug: "kakinada", tier: "standard", localNote: "A quiet residential locality in Kakinada city." },

  // ---------------- Rajahmundry ----------------
  { id: "area-danavaipeta", slug: "danavaipeta", name: "Danavaipeta", parentCitySlug: "rajahmundry", tier: "priority", localNote: "A prime residential-commercial locality in central Rajahmundry." },
  { id: "area-syamala-nagar", slug: "syamala-nagar", name: "Syamala Nagar", parentCitySlug: "rajahmundry", tier: "priority", localNote: "An established residential colony with independent houses and apartments." },
  { id: "area-t-nagar-rajahmundry", slug: "t-nagar-rajahmundry", name: "T Nagar", parentCitySlug: "rajahmundry", tier: "priority", localNote: "A dense residential-commercial locality in Rajahmundry city." },
  { id: "area-rajanagaram", slug: "rajanagaram", name: "Rajanagaram", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A fast-growing residential suburb on the outskirts of Rajahmundry." },
  { id: "area-korukonda", slug: "korukonda", name: "Korukonda", parentCitySlug: "rajahmundry", tier: "standard", localNote: "An outer locality known for its educational institutions." },
  { id: "area-dowleswaram", slug: "dowleswaram", name: "Dowleswaram", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A riverside locality near the Godavari barrage." },
  { id: "area-bommuru", slug: "bommuru", name: "Bommuru", parentCitySlug: "rajahmundry", tier: "standard", localNote: "An industrial-residential locality on the Godavari riverbank." },

  // ---------------- Eluru ----------------
  { id: "area-powerpet", slug: "powerpet", name: "Powerpet", parentCitySlug: "eluru", tier: "priority", localNote: "A central commercial-residential locality in Eluru city." },
  { id: "area-ashok-nagar-eluru", slug: "ashok-nagar-eluru", name: "Ashok Nagar", parentCitySlug: "eluru", tier: "priority", localNote: "An established residential colony with independent houses and apartments." },
  { id: "area-sanivarapupeta", slug: "sanivarapupeta", name: "Sanivarapupeta", parentCitySlug: "eluru", tier: "standard", localNote: "A residential locality in central Eluru." },
  { id: "area-tangellamudi", slug: "tangellamudi", name: "Tangellamudi", parentCitySlug: "eluru", tier: "standard", localNote: "A growing residential layout on the outskirts of Eluru." },

  // ---------------- Vizianagaram ----------------
  { id: "area-cantonment-vizianagaram", slug: "cantonment-vizianagaram", name: "Cantonment", parentCitySlug: "vizianagaram", tier: "priority", localNote: "A well-planned residential locality close to the town centre." },
  { id: "area-phool-bagh", slug: "phool-bagh", name: "Phool Bagh", parentCitySlug: "vizianagaram", tier: "priority", localNote: "A central residential colony in Vizianagaram town." },
  { id: "area-three-lanterns-junction", slug: "three-lanterns-junction", name: "Three Lanterns Junction", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A busy commercial junction with mixed-use buildings." },
  { id: "area-mg-road-vizianagaram", slug: "mg-road-vizianagaram", name: "MG Road", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A main commercial road with residential floors above shops." },
  { id: "area-kothavalasa", slug: "kothavalasa", name: "Kothavalasa", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A railway junction town on the outskirts of Vizianagaram." },

  // ---------------- Srikakulam ----------------
  { id: "area-arasavalli", slug: "arasavalli", name: "Arasavalli", parentCitySlug: "srikakulam", tier: "priority", localNote: "A temple-town locality on the edge of Srikakulam town." },
  { id: "area-balaga", slug: "balaga", name: "Balaga", parentCitySlug: "srikakulam", tier: "priority", localNote: "A residential locality in central Srikakulam." },
  { id: "area-etcherla", slug: "etcherla", name: "Etcherla", parentCitySlug: "srikakulam", tier: "standard", localNote: "A growing mandal town adjoining Srikakulam." },
  { id: "area-ponduru", slug: "ponduru", name: "Ponduru", parentCitySlug: "srikakulam", tier: "standard", localNote: "A handloom-weaving town near Srikakulam." },

  // ---------------- Additional real coverage areas from the service footprint ----------------
  { id: "area-tagrapuvalasa", slug: "tagarapuvalasa", name: "Tagarapuvalasa", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A coastal residential corridor between Visakhapatnam and Bheemili with villas, apartments, and independent homes." },
  { id: "area-venkojipalem", slug: "venkojipalem", name: "Venkojipalem", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A central residential pocket close to Seethammadhara and MVP with many mid-rise apartment blocks." },
  { id: "area-muralinagar", slug: "muralinagar", name: "Muralinagar", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A well-connected residential locality with independent houses and apartment communities." },
  { id: "area-madhavadhara", slug: "madhavadhara", name: "Madhavadhara", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A hillside residential locality where balcony and window safety installations are common." },
  { id: "area-lalitha-nagar", slug: "lalitha-nagar", name: "Lalitha Nagar", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A central mixed-use locality with apartments, clinics, offices, and independent homes." },
  { id: "area-maharanipeta", slug: "maharanipeta", name: "Maharanipeta", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A premium central locality with hospitals, apartments, and commercial buildings." },
  { id: "area-ram-nagar-vizag", slug: "ram-nagar-vizag", name: "Ram Nagar", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A dense central residential and commercial area near the city core." },
  { id: "area-pandurangapuram", slug: "pandurangapuram", name: "Pandurangapuram", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A beach-adjacent residential locality with premium apartments and villas." },
  { id: "area-isukathota", slug: "isukathota", name: "Isukathota", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A busy junction locality with apartments and student housing." },
  { id: "area-kurmannapalem", slug: "kurmannapalem", name: "Kurmannapalem", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A south Vizag residential-industrial belt with many flats and worker housing colonies." },
  { id: "area-sheela-nagar", slug: "sheela-nagar", name: "Sheela Nagar", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A residential area near the airport and Gajuwaka corridor." },
  { id: "area-aganampudi", slug: "aganampudi", name: "Aganampudi", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "An industrial-adjacent locality with growing residential layouts and independent houses." },
  { id: "area-mindi", slug: "mindi", name: "Mindi", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A compact south Vizag locality close to industrial and port-side activity." },
  { id: "area-pedagantyada", slug: "pedagantyada", name: "Pedagantyada", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A south Vizag mandal with industrial surroundings and expanding residential pockets." },
  { id: "area-sriharipuram", slug: "sriharipuram", name: "Sriharipuram", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "An older port-side residential locality with closely built homes." },
  { id: "area-chinamushidiwada", slug: "chinamushidiwada", name: "Chinamushidiwada", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A developing residential pocket near Pendurthi and Sujatha Nagar." },
  { id: "area-adavivaram", slug: "adavivaram", name: "Adavivaram", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A temple-adjacent hillside residential locality near Simhachalam." },
  { id: "area-kapuluppada", slug: "kapuluppada", name: "Kapuluppada", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "An outer coastal locality with new layouts and villa-style homes." },
  { id: "area-thimmapuram", slug: "thimmapuram", name: "Thimmapuram", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A quiet coastal stretch between Rushikonda and Bheemili." },
  { id: "area-gambhiram", slug: "gambhiram", name: "Gambhiram", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A growing outer locality with institutions, layouts, and independent housing." },
  { id: "area-dabagardens", slug: "dabagardens", name: "Dabagardens", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A central commercial-residential locality with mixed-use buildings." },
  { id: "area-resapuvanipalem", slug: "resapuvanipalem", name: "Resapuvanipalem", parentCitySlug: "visakhapatnam", tier: "standard", localNote: "A compact central locality close to Maddilapalem and Dwaraka Nagar." },
  { id: "area-lankelapalem", slug: "lankelapalem", name: "Lankelapalem", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "A highway-side residential and industrial locality beyond Gajuwaka." },
  { id: "area-pisinikada", slug: "pisinikada", name: "Pisinikada", parentCitySlug: "visakhapatnam", tier: "emerging", localNote: "An outer locality on the Visakhapatnam-Anakapalle corridor with expanding housing." },

  { id: "area-ramanayyapeta", slug: "ramanayyapeta", name: "Ramanayyapeta", parentCitySlug: "kakinada", tier: "standard", localNote: "A residential locality close to Kakinada city with independent homes and small apartments." },
  { id: "area-turangi", slug: "turangi", name: "Turangi", parentCitySlug: "kakinada", tier: "standard", localNote: "A coastal-side locality with independent houses and growing residential demand." },
  { id: "area-sambamurthy-nagar", slug: "sambamurthy-nagar", name: "Sambamurthy Nagar", parentCitySlug: "kakinada", tier: "standard", localNote: "A central Kakinada residential locality with apartment and independent-house demand." },
  { id: "area-indrapalem", slug: "indrapalem", name: "Indrapalem", parentCitySlug: "kakinada", tier: "standard", localNote: "A well-known residential locality in Kakinada with compact homes and apartments." },
  { id: "area-valasapakala", slug: "valasapakala", name: "Valasapakala", parentCitySlug: "kakinada", tier: "emerging", localNote: "An expanding Kakinada outskirts locality with new homes and layouts." },
  { id: "area-apsp-area", slug: "apsp-area", name: "APSP Area", parentCitySlug: "kakinada", tier: "standard", localNote: "A residential zone around the APSP area with independent houses and apartments." },
  { id: "area-boat-club-area", slug: "boat-club-area", name: "Boat Club Area", parentCitySlug: "kakinada", tier: "standard", localNote: "A known Kakinada locality with mixed residential and recreational surroundings." },
  { id: "area-beach-road-kakinada", slug: "beach-road-kakinada", name: "Beach Road", parentCitySlug: "kakinada", tier: "standard", localNote: "A coastal road locality where rust-resistant fittings and weather-ready materials matter." },
  { id: "area-cinema-road", slug: "cinema-road", name: "Cinema Road", parentCitySlug: "kakinada", tier: "standard", localNote: "A busy commercial-residential corridor with mixed-use buildings." },
  { id: "area-balaji-cheruvu", slug: "balaji-cheruvu", name: "Balaji Cheruvu", parentCitySlug: "kakinada", tier: "standard", localNote: "A central Kakinada landmark area with apartments and residential streets." },
  { id: "area-nfcl-township", slug: "nfcl-township", name: "NFCL Township", parentCitySlug: "kakinada", tier: "emerging", localNote: "A township-style residential pocket near Kakinada's industrial belt." },
  { id: "area-pithapuram", slug: "pithapuram", name: "Pithapuram", parentCitySlug: "kakinada", tier: "standard", localNote: "A major temple town near Kakinada with independent houses and new residential demand." },
  { id: "area-peddapuram", slug: "peddapuram", name: "Peddapuram", parentCitySlug: "kakinada", tier: "standard", localNote: "A historic town near Kakinada with independent houses and commercial buildings." },
  { id: "area-uppada", slug: "uppada", name: "Uppada", parentCitySlug: "kakinada", tier: "emerging", localNote: "A coastal locality where salt-air corrosion resistance is important for exterior fittings." },
  { id: "area-yanam", slug: "yanam", name: "Yanam", parentCitySlug: "kakinada", tier: "standard", localNote: "A nearby coastal town with residential and commercial service demand." },

  { id: "area-diwancheruvu", slug: "diwancheruvu", name: "Diwancheruvu", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A fast-growing Rajahmundry outskirts locality with new apartments and layouts." },
  { id: "area-katheru", slug: "katheru", name: "Katheru", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A residential locality on the edge of Rajahmundry with independent houses and flats." },
  { id: "area-morampudi", slug: "morampudi", name: "Morampudi", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A busy junction area with apartment and commercial building demand." },
  { id: "area-lalacheruvu", slug: "lalacheruvu", name: "Lalacheruvu", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A residential pocket with growing apartment construction." },
  { id: "area-vemagiri", slug: "vemagiri", name: "Vemagiri", parentCitySlug: "rajahmundry", tier: "emerging", localNote: "An outer locality with residential layouts along the Rajahmundry corridor." },
  { id: "area-konthamuru", slug: "konthamuru", name: "Konthamuru", parentCitySlug: "rajahmundry", tier: "emerging", localNote: "A developing locality with independent houses and small apartment blocks." },
  { id: "area-aryapuram", slug: "aryapuram", name: "Aryapuram", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A central residential area in Rajahmundry with established homes and apartments." },
  { id: "area-innespeta", slug: "innespeta", name: "Innespeta", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A dense old-town locality with closely built independent houses." },
  { id: "area-tilak-road", slug: "tilak-road", name: "Tilak Road", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A commercial-residential road with mixed-use buildings." },
  { id: "area-av-appa-rao-road", slug: "av-appa-rao-road", name: "AV Appa Rao Road", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A key road locality with apartments, shops, and service demand." },
  { id: "area-devi-chowk", slug: "devi-chowk", name: "Devi Chowk", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A known central junction with residential and commercial buildings." },
  { id: "area-godavari-bund", slug: "godavari-bund", name: "Godavari Bund", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A riverside locality where humidity and weather exposure influence material choices." },
  { id: "area-vl-puram", slug: "vl-puram", name: "VL Puram", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A residential locality with apartment communities and independent homes." },

  { id: "area-ramachandra-rao-pet", slug: "ramachandra-rao-pet", name: "Ramachandra Rao Pet", parentCitySlug: "eluru", tier: "standard", localNote: "A central Eluru residential locality with independent homes and apartments." },
  { id: "area-satrampadu", slug: "satrampadu", name: "Satrampadu", parentCitySlug: "eluru", tier: "standard", localNote: "A growing residential pocket around Eluru with new housing layouts." },
  { id: "area-vatluru", slug: "vatluru", name: "Vatluru", parentCitySlug: "eluru", tier: "emerging", localNote: "An outer locality with independent homes and developing residential demand." },
  { id: "area-ponangi", slug: "ponangi", name: "Ponangi", parentCitySlug: "eluru", tier: "emerging", localNote: "A suburban locality with independent houses and service requests from nearby layouts." },
  { id: "area-gavaravaram", slug: "gavaravaram", name: "Gavaravaram", parentCitySlug: "eluru", tier: "emerging", localNote: "A developing residential locality near Eluru with independent homes." },
  { id: "area-pedapadu", slug: "pedapadu", name: "Pedapadu", parentCitySlug: "eluru", tier: "emerging", localNote: "A mandal locality near Eluru with independent housing and small commercial buildings." },
  { id: "area-denduluru", slug: "denduluru", name: "Denduluru", parentCitySlug: "eluru", tier: "emerging", localNote: "A nearby mandal town with houses, small apartments, and highway access." },
  { id: "area-pedavegi", slug: "pedavegi", name: "Pedavegi", parentCitySlug: "eluru", tier: "emerging", localNote: "A developing locality with independent houses and rural-urban service demand." },

  { id: "area-dasannapeta", slug: "dasannapeta", name: "Dasannapeta", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A residential locality in Vizianagaram with independent houses and apartment buildings." },
  { id: "area-ayodya-road", slug: "ayodya-road", name: "Ayodya Road", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A known local road area with residential and mixed-use buildings." },
  { id: "area-rtc-complex-area", slug: "rtc-complex-area", name: "RTC Complex Area", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A busy transport and commercial zone with residential floors above shops." },
  { id: "area-fort-area", slug: "fort-area", name: "Fort Area", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A historic town-centre area with dense mixed-use buildings." },
  { id: "area-sai-nagar-vizianagaram", slug: "sai-nagar-vizianagaram", name: "Sai Nagar", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A residential colony with independent homes and apartment blocks." },
  { id: "area-balaji-junction", slug: "balaji-junction", name: "Balaji Junction", parentCitySlug: "vizianagaram", tier: "standard", localNote: "A key junction locality with commercial and residential demand." },
  { id: "area-nellimarla", slug: "nellimarla", name: "Nellimarla", parentCitySlug: "vizianagaram", tier: "emerging", localNote: "A nearby town with industrial and residential service demand." },
  { id: "area-cheepurupalli", slug: "cheepurupalli", name: "Cheepurupalli", parentCitySlug: "vizianagaram", tier: "emerging", localNote: "A mandal town near Vizianagaram with independent homes and commercial streets." },
  { id: "area-garividi", slug: "garividi", name: "Garividi", parentCitySlug: "vizianagaram", tier: "emerging", localNote: "An industrial-adjacent town with residential colonies and independent houses." },

  { id: "area-day-night-junction", slug: "day-night-junction", name: "Day & Night Junction", parentCitySlug: "srikakulam", tier: "standard", localNote: "A busy Srikakulam junction with commercial and residential buildings." },
  { id: "area-new-colony-srikakulam", slug: "new-colony-srikakulam", name: "New Colony", parentCitySlug: "srikakulam", tier: "standard", localNote: "A residential colony in Srikakulam with compact homes and apartment blocks." },
  { id: "area-peddapadu-srikakulam", slug: "peddapadu-srikakulam", name: "Peddapadu", parentCitySlug: "srikakulam", tier: "emerging", localNote: "A developing locality near Srikakulam with independent housing demand." },
  { id: "area-singupuram", slug: "singupuram", name: "Singupuram", parentCitySlug: "srikakulam", tier: "emerging", localNote: "A nearby locality with independent homes and service requests around Srikakulam." },
  { id: "area-amadalavalasa", slug: "amadalavalasa", name: "Amadalavalasa", parentCitySlug: "srikakulam", tier: "standard", localNote: "A railway-connected town near Srikakulam with independent homes and apartment growth." },
  { id: "area-narasannapeta", slug: "narasannapeta", name: "Narasannapeta", parentCitySlug: "srikakulam", tier: "emerging", localNote: "A mandal town with local residential and commercial service demand." },
  { id: "area-palasa", slug: "palasa", name: "Palasa", parentCitySlug: "srikakulam", tier: "standard", localNote: "A major town in Srikakulam district with mixed residential and commercial buildings." },
  { id: "area-kasibugga", slug: "kasibugga", name: "Kasibugga", parentCitySlug: "srikakulam", tier: "standard", localNote: "A twin-town commercial locality adjoining Palasa with strong residential demand." },
  { id: "area-ichchapuram", slug: "ichchapuram", name: "Ichchapuram", parentCitySlug: "srikakulam", tier: "emerging", localNote: "A border town with independent homes and commercial buildings." },
  { id: "area-ranasthalam", slug: "ranasthalam", name: "Ranasthalam", parentCitySlug: "srikakulam", tier: "emerging", localNote: "A highway-side locality with industrial and residential growth." },

  { id: "area-kasimkota", slug: "kasimkota", name: "Kasimkota", parentCitySlug: "anakapalle", tier: "standard", localNote: "A residential-industrial locality near Anakapalle with independent houses and highway access." },
  { id: "area-munagapaka", slug: "munagapaka", name: "Munagapaka", parentCitySlug: "anakapalle", tier: "emerging", localNote: "A mandal locality with growing residential layouts around Anakapalle." },
  { id: "area-atchutapuram", slug: "atchutapuram", name: "Atchutapuram", parentCitySlug: "anakapalle", tier: "standard", localNote: "An industrial SEZ corridor with worker housing, independent homes, and township demand." },
  { id: "area-rambilli", slug: "rambilli", name: "Rambilli", parentCitySlug: "anakapalle", tier: "emerging", localNote: "A coastal-industrial mandal with new housing pockets and commercial service demand." },
  { id: "area-chodavaram", slug: "chodavaram", name: "Chodavaram", parentCitySlug: "anakapalle", tier: "standard", localNote: "A well-known town near Anakapalle with independent houses and local commercial buildings." },
  { id: "area-madugula", slug: "madugula", name: "Madugula", parentCitySlug: "anakapalle", tier: "emerging", localNote: "A foothill town with independent houses and rural-urban service demand." },

  { id: "area-golugonda", slug: "golugonda", name: "Golugonda", parentCitySlug: "narsipatnam", tier: "emerging", localNote: "A mandal locality near Narsipatnam with independent homes and small commercial buildings." },
  { id: "area-rolugunta", slug: "rolugunta", name: "Rolugunta", parentCitySlug: "narsipatnam", tier: "emerging", localNote: "A rural-urban mandal around Narsipatnam with growing home-safety service demand." },
  { id: "area-makavarapalem", slug: "makavarapalem", name: "Makavarapalem", parentCitySlug: "narsipatnam", tier: "emerging", localNote: "A nearby mandal with independent houses, farm homes, and small shops." },
  { id: "area-kotauratla", slug: "kotauratla", name: "Kotauratla", parentCitySlug: "narsipatnam", tier: "emerging", localNote: "A developing locality near Narsipatnam with independent residential properties." },
  { id: "area-payakaraopeta", slug: "payakaraopeta", name: "Payakaraopeta", parentCitySlug: "tuni", tier: "standard", localNote: "A highway town near Tuni with residential and commercial service demand." },
  { id: "area-annavaram", slug: "annavaram", name: "Annavaram", parentCitySlug: "tuni", tier: "standard", localNote: "A temple town near Tuni with lodges, homes, and commercial buildings." },
  { id: "area-yelamanchili-town", slug: "yelamanchili-town", name: "Yelamanchili Town", parentCitySlug: "yelamanchili", tier: "standard", localNote: "The town core of Yelamanchili with independent houses and commercial buildings." },
  { id: "area-bayyavaram", slug: "bayyavaram", name: "Bayyavaram", parentCitySlug: "yelamanchili", tier: "emerging", localNote: "A nearby locality with independent houses and developing residential layouts." },

  { id: "area-ramachandrapuram", slug: "ramachandrapuram", name: "Ramachandrapuram", parentCitySlug: "amalapuram", tier: "standard", localNote: "A key Konaseema town with independent houses, apartments, and commercial buildings." },
  { id: "area-mandapeta", slug: "mandapeta", name: "Mandapeta", parentCitySlug: "amalapuram", tier: "standard", localNote: "A major town in the Godavari delta with residential and commercial service demand." },
  { id: "area-razole", slug: "razole", name: "Razole", parentCitySlug: "amalapuram", tier: "standard", localNote: "A Konaseema locality with independent homes and humid delta weather exposure." },
  { id: "area-ravulapalem", slug: "ravulapalem", name: "Ravulapalem", parentCitySlug: "amalapuram", tier: "standard", localNote: "A transport and trading town in the Godavari delta with mixed-use buildings." },
  { id: "area-mummidivaram", slug: "mummidivaram", name: "Mummidivaram", parentCitySlug: "amalapuram", tier: "emerging", localNote: "A Konaseema mandal town with independent homes and local commercial streets." },
  { id: "area-biccavolu", slug: "biccavolu", name: "Biccavolu", parentCitySlug: "samalkot", tier: "emerging", localNote: "A residential and temple-town locality near Samalkot." },
  { id: "area-anaparthi", slug: "anaparthi", name: "Anaparthi", parentCitySlug: "samalkot", tier: "standard", localNote: "A busy town between Kakinada and Rajahmundry with houses and commercial buildings." },
  { id: "area-kadiyam", slug: "kadiyam", name: "Kadiyam", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A nursery belt near Rajahmundry with villas, independent homes, and humid weather exposure." },

  { id: "area-palakollu-town", slug: "palakollu-town", name: "Palakollu Town", parentCitySlug: "palakollu", tier: "standard", localNote: "The town core of Palakollu with houses, apartments, and commercial buildings." },
  { id: "area-narasapuram", slug: "narasapuram", name: "Narasapuram", parentCitySlug: "palakollu", tier: "standard", localNote: "A coastal town where exterior fittings need extra corrosion resistance." },
  { id: "area-tanuku-town", slug: "tanuku-town", name: "Tanuku Town", parentCitySlug: "tanuku", tier: "standard", localNote: "A major West Godavari town with apartments, independent homes, and commercial streets." },
  { id: "area-kovvur", slug: "kovvur", name: "Kovvur", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A Godavari-side town near Rajahmundry with riverside humidity and residential demand." },
  { id: "area-nidadavole", slug: "nidadavole", name: "Nidadavole", parentCitySlug: "rajahmundry", tier: "standard", localNote: "A railway-connected town with independent houses and small apartment buildings." },
  { id: "area-hanuman-junction", slug: "hanuman-junction", name: "Hanuman Junction", parentCitySlug: "nuzvid", tier: "standard", localNote: "A busy road junction town with commercial and residential service demand." },
  { id: "area-agiripalli", slug: "agiripalli", name: "Agiripalli", parentCitySlug: "nuzvid", tier: "emerging", localNote: "A developing locality near Nuzvid with independent houses and layouts." },
  { id: "area-bapulapadu", slug: "bapulapadu", name: "Bapulapadu", parentCitySlug: "nuzvid", tier: "emerging", localNote: "A mandal locality with rural-urban housing and service demand." },

  { id: "area-tekkali-town", slug: "tekkali-town", name: "Tekkali Town", parentCitySlug: "tekkali", tier: "standard", localNote: "The town core of Tekkali with independent houses and commercial buildings." },
  { id: "area-sompeta", slug: "sompeta", name: "Sompeta", parentCitySlug: "tekkali", tier: "emerging", localNote: "A northern Andhra town with independent homes and coastal-influenced weather." },
  { id: "area-kaviti", slug: "kaviti", name: "Kaviti", parentCitySlug: "tekkali", tier: "emerging", localNote: "A coastal mandal locality with residential homes and humid conditions." },
  { id: "area-bobbili-town", slug: "bobbili-town", name: "Bobbili Town", parentCitySlug: "bobbili", tier: "standard", localNote: "The town core of Bobbili with independent homes and local commercial buildings." },
  { id: "area-salur", slug: "salur", name: "Salur", parentCitySlug: "bobbili", tier: "emerging", localNote: "A hill-adjacent town with independent homes and growing service demand." },
  { id: "area-parvathipuram", slug: "parvathipuram", name: "Parvathipuram", parentCitySlug: "bobbili", tier: "emerging", localNote: "A district-headquarters town with mixed residential and commercial properties." },
];

export const areasBySlug: Record<string, Area> = Object.fromEntries(areas.map((a) => [a.slug, a]));

export function getArea(slug: string): Area | undefined {
  return areasBySlug[slug];
}

export function getAreasByCity(citySlug: string): Area[] {
  return areas.filter((a) => a.parentCitySlug === citySlug);
}

export const priorityAreas = areas.filter((a) => a.tier === "priority");
