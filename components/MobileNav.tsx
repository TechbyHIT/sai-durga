"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { navCitySlugs } from "@/data/navMenu";
import { site } from "@/lib/site";

const navCities = navCitySlugs
  .map((slug) => cities.find((c) => c.slug === slug))
  .filter((c): c is (typeof cities)[number] => Boolean(c));

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-silver-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Mobile drawer menu — client-only overlay, mounted after first open to avoid hydration issues. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setShowServices(false);
    setShowLocations(false);
  }, []);

  const openMenu = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  return (
    <>
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-200 bg-gold-50 text-silver-900 xl:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : openMenu())}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {mounted && (
        <div
          className={`fixed inset-0 z-50 xl:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!open}
        >
          <button
            type="button"
            aria-label="Close menu backdrop"
            className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
          />

          <nav
            className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-base-white shadow-2xl transition-transform duration-200 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Mobile menu"
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between gap-3 border-b border-silver-100 px-4 py-4">
              <Link href="/" onClick={closeMenu} className="flex min-w-0 items-center">
                <BrandLogo size="compact" />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-silver-200 text-silver-600"
                onClick={closeMenu}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <ul className="flex-1 divide-y divide-silver-100 overflow-y-auto px-4 text-[15px]">
              <li>
                <Link href="/" onClick={closeMenu} className="block py-3.5 font-semibold text-silver-900">
                  Home
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3.5 text-left font-semibold text-silver-900"
                  aria-expanded={showServices}
                  onClick={() => setShowServices((v) => !v)}
                >
                  Services
                  <Chevron open={showServices} />
                </button>
                {showServices && (
                  <ul className="pb-3 pl-1">
                    <li>
                      <Link href="/services" onClick={closeMenu} className="block py-2 text-sm font-medium text-gold-700">
                        View all services
                      </Link>
                    </li>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`} onClick={closeMenu} className="block py-2 text-sm text-silver-600">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3.5 text-left font-semibold text-silver-900"
                  aria-expanded={showLocations}
                  onClick={() => setShowLocations((v) => !v)}
                >
                  Locations
                  <Chevron open={showLocations} />
                </button>
                {showLocations && (
                  <ul className="pb-3 pl-1">
                    <li>
                      <Link href="/locations" onClick={closeMenu} className="block py-2 text-sm font-medium text-gold-700">
                        All cities
                      </Link>
                    </li>
                    {navCities.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/locations/${c.slug}`} onClick={closeMenu} className="block py-2 text-sm text-silver-600">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-2">
                      <Link href="/areas" onClick={closeMenu} className="block py-2 text-sm font-medium text-gold-700">
                        All areas
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/blog" onClick={closeMenu} className="block py-3.5 font-semibold text-silver-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" onClick={closeMenu} className="block py-3.5 font-semibold text-silver-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu} className="block py-3.5 font-semibold text-silver-900">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-3 border-t border-silver-100 px-4 py-4">
              <a
                href={site.phoneHref}
                className="rounded-xl bg-gold-500 py-3 text-center text-sm font-semibold text-white"
              >
                Call Now
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#25D366] py-3 text-center text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
