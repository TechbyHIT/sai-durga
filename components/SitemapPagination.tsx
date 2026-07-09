import Link from "next/link";

export function SitemapPagination({
  basePath,
  page,
  totalPages,
  query,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  query?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const params = new URLSearchParams(query);
    if (p > 1) params.set("page", String(p));
    else params.delete("page");
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav aria-label="Sitemap pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          className="rounded-full border border-silver-200 px-4 py-2 text-sm font-semibold text-silver-700 hover:border-gold-300 hover:bg-gold-50"
        >
          ← Previous
        </Link>
      )}
      {start > 1 && (
        <>
          <Link href={hrefFor(1)} className="rounded-full px-3 py-2 text-sm font-medium text-silver-600 hover:text-gold-700">
            1
          </Link>
          {start > 2 && <span className="px-1 text-silver-400">…</span>}
        </>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === page ? "page" : undefined}
          className={`rounded-full px-3 py-2 text-sm font-semibold ${
            p === page
              ? "bg-gold-500 text-white shadow-gold"
              : "text-silver-600 hover:bg-gold-50 hover:text-gold-700"
          }`}
        >
          {p}
        </Link>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-silver-400">…</span>}
          <Link
            href={hrefFor(totalPages)}
            className="rounded-full px-3 py-2 text-sm font-medium text-silver-600 hover:text-gold-700"
          >
            {totalPages}
          </Link>
        </>
      )}
      {page < totalPages && (
        <Link
          href={hrefFor(page + 1)}
          className="rounded-full border border-silver-200 px-4 py-2 text-sm font-semibold text-silver-700 hover:border-gold-300 hover:bg-gold-50"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
