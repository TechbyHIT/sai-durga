import Link from "next/link";
import { site } from "@/lib/site";

export function CTAButtons({ compact = false }: { compact?: boolean }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const size = compact ? "px-4 py-2 text-sm" : "px-6 py-3 text-base";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={site.phoneHref}
        className={`${base} ${size} bg-gold-500 text-white shadow-gold hover:bg-gold-600 focus-visible:outline-gold-500`}
        aria-label={`Call ${site.name}`}
      >
        Call Now
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${size} bg-silver-700 text-white hover:bg-silver-900 focus-visible:outline-silver-700`}
        aria-label={`WhatsApp ${site.name}`}
      >
        WhatsApp Now
      </a>
      <Link
        href="/contact"
        className={`${base} ${size} border-2 border-gold-400 text-gold-600 hover:bg-gold-50 focus-visible:outline-gold-400`}
      >
        Get Free Quote
      </Link>
    </div>
  );
}
