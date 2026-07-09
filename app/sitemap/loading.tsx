export default function SitemapLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6">
      <div className="h-10 w-72 rounded-lg bg-silver-100" />
      <div className="mt-4 h-4 w-full max-w-2xl rounded bg-silver-100" />
      <div className="mt-8 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-silver-100" />
        ))}
      </div>
    </div>
  );
}
