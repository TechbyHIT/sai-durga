import type { ContentSection, ComparisonTableRow } from "@/lib/pageGenerator";

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      {sections.map((section) => (
        <section key={section.heading} className="seo-section-card">
          <div className="gold-divider mb-4" />
          <h2 className="text-xl font-bold text-silver-900 sm:text-2xl">{section.heading}</h2>
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-silver-600">{p}</p>
          ))}
          {section.items && section.items.length > 0 && (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-silver-50 px-3 py-2 text-silver-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500 shadow-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export function ComparisonTable({ rows, nameA, nameB }: { rows: ComparisonTableRow[]; nameA: string; nameB: string }) {
  return (
    <div className="mx-auto max-w-4xl overflow-x-auto px-4 sm:px-6">
      <table className="w-full min-w-[480px] table-fixed overflow-hidden rounded-xl2 border border-silver-100 text-left text-sm shadow-card">
        <thead className="bg-silver-50 text-silver-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Criteria</th>
            <th className="px-4 py-3 font-semibold">{nameA}</th>
            <th className="px-4 py-3 font-semibold">{nameB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-silver-100 bg-base-white">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-4 py-3 font-medium text-silver-800">{row.label}</td>
              <td className="px-4 py-3 text-silver-600">{row.a}</td>
              <td className="px-4 py-3 text-silver-600">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
