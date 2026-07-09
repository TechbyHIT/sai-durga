import Link from "next/link";
import { solutions } from "@/data/homepage";

export function SolutionsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <div className="gold-divider mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Solutions for Every Need</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
          Whatever your safety or utility need, there is a practical, well-fitted solution.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((solution) => (
          <Link
            key={solution.title}
            href={solution.href}
            className="group flex flex-col rounded-2xl border border-silver-100 bg-white/95 p-5 shadow-card transition hover:-translate-y-0.5 hover:border-gold-200 hover:shadow-gold"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-2xl" aria-hidden="true">
              {solution.icon}
            </span>
            <h3 className="mt-3 text-sm font-bold text-silver-900">{solution.title}</h3>
            <p className="mt-1 flex-1 text-xs leading-relaxed text-silver-600">{solution.description}</p>
            <span className="mt-3 text-xs font-semibold text-gold-600 group-hover:underline">Learn more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
