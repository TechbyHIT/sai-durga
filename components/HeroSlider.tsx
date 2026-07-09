"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/lib/site";
import { heroTrustChips } from "@/data/homepage";

export interface HeroSlideView {
  headline: string;
  subheadline: string;
  seoText: string;
  href: string;
  image: { src: string; alt: string };
}

export function HeroSlider({ slides }: { slides: HeroSlideView[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section
      className="relative overflow-hidden bg-silver-900"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[440px] w-full sm:h-[520px] lg:h-[600px]">
        {slides.map((slide, i) => (
          <div
            key={slide.headline}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

            <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6">
              <div className="max-w-2xl">
                <p className="mb-3 inline-block rounded-full bg-gold-500/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {slide.subheadline}
                </p>
                <h2 className="text-3xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  {slide.headline}
                </h2>
                <p className="mt-4 max-w-xl text-sm text-silver-100 sm:text-base">{slide.seoText}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={site.phoneHref} className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-gold hover:bg-gold-600">
                    Call Now
                  </a>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    WhatsApp Now
                  </a>
                  <Link href={slide.href} className="rounded-full border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                    Free Site Inspection
                  </Link>
                </div>

                <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
                  {heroTrustChips.map((chip) => (
                    <li key={chip} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.headline}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-gold-400" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
