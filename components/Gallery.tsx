import Image from "next/image";
import type { PageImage } from "@/lib/images";

export function Gallery({
  images,
  title = "Gallery",
  subtitle,
}: {
  images: PageImage[];
  title?: string;
  subtitle?: string;
}) {
  if (!images || images.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <h2 className="text-xl font-bold text-silver-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-silver-600">{subtitle}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-silver-100 bg-silver-50"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading={i < 2 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover md:hover:scale-[1.02] md:transition-transform md:duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
