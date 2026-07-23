/** Static mobile menu slot — prevents layout shift while client nav loads. */
export function MobileNavPlaceholder() {
  return (
    <div
      className="mobile-nav-toggle flex shrink-0 items-center justify-center rounded-2xl border border-gold-200 bg-gold-50 text-silver-900 xl:hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </div>
  );
}
