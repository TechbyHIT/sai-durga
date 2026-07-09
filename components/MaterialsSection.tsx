import { materials } from "@/data/materials";

export function MaterialsSection() {
  return (
    <section className="soft-gold-panel py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="gold-divider mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Premium Materials We Use</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
            Quality wire, nets, and fittings chosen for coastal Andhra Pradesh weather. Warranty ranges are
            confirmed at the time of quotation.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <div key={material.name} className="flex flex-col rounded-2xl border border-silver-100 bg-white/95 p-5 shadow-card">
              <h3 className="text-base font-bold text-silver-900">{material.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-600">{material.description}</p>
              <ul className="mt-3 space-y-1.5">
                {material.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2 text-xs text-silver-600">
                    <span className="mt-0.5 text-gold-500" aria-hidden="true">◆</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-full bg-gold-50 px-3 py-1.5 text-center text-xs font-semibold text-gold-700">
                {material.warranty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
