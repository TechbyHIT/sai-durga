import { homeStats } from "@/data/homepage";

export function StatsSection() {
  return (
    <section className="bg-silver-900 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-5">
        {homeStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur"
          >
            <p className="text-2xl font-extrabold text-gold-300 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-silver-200 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
