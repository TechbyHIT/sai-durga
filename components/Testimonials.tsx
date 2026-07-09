import { testimonials } from "@/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="soft-gold-panel py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="gold-divider mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">What Customers Say</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
            Sample feedback from recent installations. We publish real reviews only — names are shared with
            customer permission.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col rounded-2xl border border-silver-100 bg-white/95 p-5 shadow-card">
              <Stars rating={t.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-silver-700">“{t.review}”</blockquote>
              <figcaption className="mt-4 border-t border-silver-100 pt-3 text-xs">
                <span className="font-semibold text-silver-900">{t.name}</span>
                <span className="block text-silver-500">{t.service} · {t.area}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
