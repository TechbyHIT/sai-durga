import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { getGalleryImages } from "@/lib/images";
import { site } from "@/lib/site";

export function MainServices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <div className="gold-divider mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Our Main Services</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
          Professional installation of invisible grills, safety nets, bird protection, cloth hangers, and
          sports nets — planned around your building, budget, and safety needs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const images = getGalleryImages(service.imageCategories, service.slug, `${service.name} by ${site.name}`, 4);
          return (
            <article key={service.slug} className="flex flex-col overflow-hidden rounded-3xl border border-silver-100 bg-white/95 shadow-card transition hover:-translate-y-0.5 hover:border-gold-200 hover:shadow-gold">
              <div className="grid grid-cols-2 gap-0.5 bg-silver-100">
                {images.map((img, i) => (
                  <div key={img.src} className="relative aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                      className="object-cover"
                    />
                    {i === 3 && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-xs font-semibold text-white">
                        {service.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-silver-900">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-600">{service.summary}</p>

                <ul className="mt-3 space-y-1.5">
                  {service.benefits.slice(0, 4).map((benefit) => (
                    <li key={benefit} className="flex gap-2 text-xs text-silver-600">
                      <span className="mt-0.5 text-gold-500" aria-hidden="true">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link href={`/${service.slug}`} className="rounded-full bg-silver-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gold-600">
                    View Details
                  </Link>
                  <a href={site.phoneHref} className="rounded-full border border-gold-300 px-4 py-2 text-xs font-semibold text-gold-700 hover:bg-gold-50">
                    Call
                  </a>
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white hover:opacity-90">
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
