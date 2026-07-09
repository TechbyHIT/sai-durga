const trustPoints = [
  { title: "Free Site Inspection", desc: "We measure and assess your space before quoting — no guesswork." },
  { title: "In-House Installation Team", desc: "Work is completed by our own trained technicians, not subcontractors." },
  { title: "Rust-Resistant Materials", desc: "SS-304/316, UV-stabilised HDPE and nylon suited to coastal Andhra Pradesh weather." },
  { title: "Transparent Quotation", desc: "Firm pricing after inspection — no hidden costs added later." },
  { title: "Local Area Coverage", desc: "Pages, quotes, and scheduling are mapped around real service areas, not generic city-name swaps." },
  { title: "Clean Finish", desc: "We plan cable/net tension, hook placement, and visible finish before starting work." },
];

export function TrustCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-600">Why Customers Choose Us</p>
        <h2 className="mt-2 text-2xl font-extrabold text-silver-900">Local installation, clear quote, safer finish</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map((point) => (
          <div key={point.title} className="rounded-3xl border border-silver-100 bg-base-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-gold-200 hover:shadow-gold">
            <p className="font-semibold text-silver-900">{point.title}</p>
            <p className="mt-2 text-sm text-silver-600">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
