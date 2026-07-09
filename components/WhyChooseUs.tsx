import { whyChooseCards } from "@/data/homepage";
import { site } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <div className="gold-divider mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Why Choose {site.name}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
          Practical safety, neat installation, and customer-friendly service for homes and buildings across
          Andhra Pradesh.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-silver-100 bg-white/95 p-5 shadow-card transition hover:border-gold-200 hover:shadow-gold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-600" aria-hidden="true">
              ★
            </span>
            <h3 className="mt-3 text-sm font-bold text-silver-900">{card.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-silver-600">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
