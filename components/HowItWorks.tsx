import { howItWorksSteps } from "@/data/homepage";

export function HowItWorks() {
  return (
    <section className="bg-white/70 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="gold-divider mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">How Our Installation Works</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
            A simple, transparent process from your first call to after-sales support.
          </p>
        </div>

        <ol className="relative grid gap-6 md:grid-cols-5">
          {howItWorksSteps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-silver-100 bg-white/95 p-5 text-center shadow-card">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-base font-bold text-white shadow-gold">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-bold text-silver-900">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-silver-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
