import Link from "next/link";
import type { LinkChip } from "@/lib/internalLinks";

export function InternalLinks({ title, links }: { title: string; links: LinkChip[] }) {
  if (!links || links.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
      <div className="rounded-[2rem] border border-silver-100 bg-white/90 p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="gold-divider mb-2" />
            <h2 className="text-lg font-bold text-silver-900">{title}</h2>
          </div>
          <span className="hidden rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700 sm:inline">
            Explore More
          </span>
        </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-silver-200 bg-base-white px-4 py-2 text-sm font-semibold text-silver-700 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
          >
            {link.label}
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
