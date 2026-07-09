/** Single source of truth for business identity (NAP) and site-wide constants. */
export const site = {
  name: "Sai Durga Invisible Grills",
  legalName: "Sai Durga Invisible Grills",
  phone: "+91 8121202055",
  phoneHref: "tel:+918121202055",
  whatsapp: "+91 8121202055",
  whatsappHref: "https://wa.me/918121202055",
  email: "invisiblegrillssaidurga@gmail.com",
  emailHref: "mailto:invisiblegrillssaidurga@gmail.com",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saidurgainvisiblegrills.in",
  addressRegion: "Andhra Pradesh",
  addressCountry: "IN",
  primaryCitySlug: "visakhapatnam",
  founderNote: "Family-run invisible grill and safety net installer serving coastal Andhra Pradesh.",
  socials: {
    // Populate with real profile URLs when available.
  },
} as const;

export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${cleanPath}`;
}
