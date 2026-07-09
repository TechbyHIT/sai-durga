import Link from "next/link";
import { labelForSitemapEntry, pathForSitemapEntry } from "@/lib/htmlSitemap";
import type { SitemapUrlEntry } from "@/lib/sitemap";

export function SitemapLinkList({ entries, compact }: { entries: SitemapUrlEntry[]; compact?: boolean }) {
  if (!entries.length) return null;

  return (
    <ul
      className={
        compact
          ? "columns-1 gap-x-6 sm:columns-2 lg:columns-3 xl:columns-4"
          : "grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {entries.map((entry) => {
        const path = pathForSitemapEntry(entry);
        const label = labelForSitemapEntry(entry);
        return (
          <li key={entry.loc} className={compact ? "mb-1 break-inside-avoid" : undefined}>
            <Link
              href={path}
              prefetch={false}
              className={
                compact
                  ? "block py-1 text-sm text-silver-700 hover:text-gold-700"
                  : "block rounded-lg px-2 py-1.5 text-sm text-silver-700 hover:bg-gold-50/60 hover:text-gold-800"
              }
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
