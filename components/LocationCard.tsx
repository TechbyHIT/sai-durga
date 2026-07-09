import Link from "next/link";
import type { City } from "@/data/cities";

export function LocationCard({ city }: { city: City }) {
  return (
    <Link
      href={`/locations/${city.slug}`}
      className="group flex flex-col rounded-xl2 border border-silver-100 bg-base-white p-5 shadow-card transition-shadow hover:shadow-gold"
    >
      <h3 className="text-lg font-bold text-silver-900">{city.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-gold-600">{city.district} District</p>
      <p className="mt-3 flex-1 text-sm text-silver-600">{city.localNote}</p>
      <span className="mt-4 text-sm font-semibold text-gold-600 group-hover:underline">View Services in {city.name} →</span>
    </Link>
  );
}
