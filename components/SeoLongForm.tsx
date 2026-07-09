import type { ContentSection } from "@/lib/pageGenerator";

/** Below-fold wrapper — plain div; avoids content-visibility scroll jank. */
export function BelowFold({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className.trim()}>{children}</div>;
}

/** SEO long-form prose block rendered from programmatic sections. */
export function SeoLongForm({ sections }: { sections: ContentSection[] }) {
  if (!sections.length) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6" aria-label="Local service information">
      <div className="space-y-8">
        {sections.map((block) => (
          <article key={block.heading} className="rounded-[2rem] border border-silver-100 bg-white/90 p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-extrabold text-silver-900 sm:text-2xl">{block.heading}</h2>
            {block.paragraphs?.map((p) => (
              <p key={p.slice(0, 48)} className="mt-3 leading-relaxed text-silver-700">
                {p}
              </p>
            ))}
            {block.items && block.items.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {block.items.map((item) => (
                  <li key={item.slice(0, 40)} className="flex gap-2 text-sm text-silver-600">
                    <span className="mt-1 text-gold-500" aria-hidden>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
