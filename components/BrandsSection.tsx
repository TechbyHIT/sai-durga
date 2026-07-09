import { brands } from "@/data/homepage";

export function BrandsSection() {
  return (
    <section className="border-y border-silver-100 bg-white/70 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
          Materials &amp; Brands We Work With
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {brands.map((brand) => (
            <span
              key={brand}
              className="rounded-xl border border-silver-200 bg-base-white px-5 py-3 text-sm font-semibold text-silver-700 shadow-card"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
