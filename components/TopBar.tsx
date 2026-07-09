import Link from "next/link";
import { site } from "@/lib/site";

/** Slim premium bar above the header. Desktop shows full NAP; mobile shows quick actions. */
export function TopBar() {
  return (
    <div className="bg-silver-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6">
        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <a href={site.phoneHref} className="font-semibold text-gold-100 hover:text-white">
            {site.phone}
          </a>
          <span className="text-silver-500">|</span>
          <a href={site.emailHref} className="text-silver-200 hover:text-white">
            {site.email}
          </a>
        </div>
        <p className="hidden text-silver-200 lg:block">Serving Visakhapatnam, Vijayawada, Kakinada, Rajahmundry, Eluru & nearby Andhra Pradesh</p>
        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full bg-gold-500/20 px-3 py-1 font-semibold text-gold-100">Free Site Inspection</span>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-3 py-1 font-semibold text-white hover:opacity-90">
            WhatsApp
          </a>
        </div>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between gap-2 md:hidden">
          <a href={site.phoneHref} className="flex-1 rounded-full bg-gold-500 px-3 py-1.5 text-center font-semibold text-white">
            Call
          </a>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full bg-[#25D366] px-3 py-1.5 text-center font-semibold text-white">
            WhatsApp
          </a>
          <Link href="/contact" className="flex-1 rounded-full border border-gold-300 px-3 py-1.5 text-center font-semibold text-gold-100">
            Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
