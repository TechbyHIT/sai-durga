import Image from "next/image";
import { recentProjects } from "@/data/homepage";
import { getHeroImage, getGalleryImages } from "@/lib/images";

const galleryPool: { category: string; label: string }[] = [
  { category: "invisible-grill-balcony", label: "Invisible Grills" },
  { category: "safety-nets-balcony", label: "Balcony Safety Nets" },
  { category: "children-safety-nets", label: "Children Safety Nets" },
  { category: "duct-area-nets", label: "Duct Area Nets" },
  { category: "spikes", label: "Anti Bird Spikes" },
  { category: "cloth-hangers", label: "Cloth Hangers" },
  { category: "pet-safety-nets", label: "Pet Safety Nets" },
  { category: "cricket-nets", label: "Sports & Cricket Nets" },
];

const galleryImages = galleryPool.flatMap(({ category, label }) =>
  getGalleryImages([category], `gallery-${category}`, `${label} installation`, 2).map((img) => ({ ...img, label })),
);

export function GallerySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8">
        <div className="gold-divider mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Recent Projects</h2>
        <p className="mt-2 max-w-2xl text-sm text-silver-600">A look at recent installations across Andhra Pradesh.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map((project) => {
          const image = getHeroImage(project.imageCategories, project.seed, project.alt);
          return (
            <figure key={project.seed} className="overflow-hidden rounded-2xl border border-silver-100 bg-white/95 shadow-card">
              <div className="relative aspect-[4/3]">
                <Image src={image.src} alt={project.alt} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white">{project.service}</span>
              </div>
              <figcaption className="p-4">
                <p className="text-sm font-bold text-silver-900">{project.service} — {project.location}</p>
                <p className="mt-1 text-xs text-silver-600">{project.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mb-6 mt-14">
        <div className="gold-divider mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Work Gallery</h2>
        <p className="mt-2 max-w-2xl text-sm text-silver-600">Photos from real installations across our service categories.</p>
      </div>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>figure]:mb-4">
        {galleryImages.map((img, i) => (
          <figure key={`${img.src}-${i}`} className="break-inside-avoid overflow-hidden rounded-2xl border border-silver-100 bg-white/95 shadow-card">
            <div className="relative">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={i % 3 === 0 ? 800 : 480}
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="px-3 py-2 text-xs font-medium text-silver-600">{img.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
