import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileNav } from "@/components/MobileNav";
import { site } from "@/lib/site";

/** Site header — server-rendered shell; mobile drawer is a small client island. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-100 bg-base-white shadow-sm">
      <div className="hidden bg-silver-900 text-xs text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="font-medium">
            Free site inspection for invisible grills, safety nets, pigeon nets, cloth hangers, and sports nets
          </p>
          <div className="flex items-center gap-4 text-gold-100">
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>
            <a href={site.whatsappHref} className="hover:text-white">
              WhatsApp Quote
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <BrandLogo />
        </Link>

        <DesktopNav />

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={site.whatsappHref}
            className="rounded-full border border-gold-300 px-4 py-2 text-sm font-semibold text-gold-700 hover:bg-gold-50"
          >
            WhatsApp
          </a>
          <a
            href={site.phoneHref}
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-white shadow-gold hover:bg-gold-600"
          >
            Call Now
          </a>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
