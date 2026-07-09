import Link from "next/link";
import type { LinkChip } from "@/lib/internalLinks";

export function Breadcrumbs({ items }: { items: LinkChip[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-4 text-sm text-silver-500 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="font-medium text-silver-700" aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gold-600">{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
