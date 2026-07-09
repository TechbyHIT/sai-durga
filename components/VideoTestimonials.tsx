import Image from "next/image";
import Link from "next/link";
import { videoTestimonials } from "@/data/homepage";
import { getHeroImage } from "@/lib/images";

/**
 * Video review placeholders. No autoplay and no embedded video until real footage
 * is provided — each card links to the related service page.
 */
export function VideoTestimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <div className="gold-divider mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Installation Videos</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
          Short walkthroughs of our installation work. Video reviews are added as customers share them.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videoTestimonials.map((video) => {
          const image = getHeroImage(video.imageCategories, video.seed, video.alt);
          return (
            <Link key={video.title} href={video.href} className="group overflow-hidden rounded-2xl border border-silver-100 bg-white/95 shadow-card">
              <div className="relative aspect-[16/9]">
                <Image src={image.src} alt={video.alt} fill loading="lazy" sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/50">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl text-gold-600 shadow-lg" aria-hidden="true">▶</span>
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-silver-900">{video.title}</h3>
                <p className="mt-1 text-xs text-silver-500">{video.location}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
