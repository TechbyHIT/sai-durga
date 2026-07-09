import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/data/services";
import { getHeroImage } from "@/lib/images";

export function ServiceCard({ service }: { service: Service }) {
  const image = getHeroImage(service.imageCategories, service.slug, `${service.name} installation`);
  return (
    <Link
      href={`/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-silver-100 bg-base-white shadow-card transition-shadow hover:shadow-gold"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-silver-900">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm text-silver-600">{service.tagline}</p>
        <span className="mt-4 text-sm font-semibold text-gold-600 group-hover:underline">Explore {service.name} →</span>
      </div>
    </Link>
  );
}
