import Link from "next/link";
import { fastSearchKeywords } from "@/data/fastSearchKeywords";

/** Popular search keyword chips — near me, best, price, install. */
export function FastSearchLinks({ limit }: { limit?: number }) {
  const links = limit ? fastSearchKeywords.slice(0, limit) : fastSearchKeywords;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-5">
        <div className="gold-divider mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Popular Searches</h2>
        <p className="mt-2 max-w-2xl text-sm text-silver-600">
          Common near-me, best, price, and installation searches — find the service you need in your area.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-silver-200 bg-base-white px-3 py-1.5 text-xs font-medium text-silver-700 transition-colors hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
