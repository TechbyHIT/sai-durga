import Image from "next/image";
import type { PageImage } from "@/lib/images";
import { CTAButtons } from "./CTAButtons";

export function Hero({
  eyebrow,
  title,
  description,
  image,
  priority = false,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  image: PageImage;
  priority?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-base-off via-white to-base-white">
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-gold-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-silver-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16">
        <div>
          {eyebrow && (
            <p className="mb-3 inline-block rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-silver-900 sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-silver-600 sm:text-lg">{description}</p>
          <div className="mt-5 grid max-w-xl grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            {["Free Inspection", "Clean Fitting", "Coastal Materials"].map((item) => (
              <span key={item} className="rounded-2xl border border-gold-100 bg-white/80 px-3 py-2 text-center font-semibold text-silver-700 shadow-card">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <CTAButtons />
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-gold-100 shadow-gold">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-3 text-sm font-semibold text-silver-800 shadow-card backdrop-blur">
            Call or WhatsApp for a free quote and site inspection.
          </div>
        </div>
      </div>
    </section>
  );
}
