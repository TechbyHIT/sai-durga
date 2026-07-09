import Image from "next/image";
import { projectTypes } from "@/data/homepage";
import { getHeroImage } from "@/lib/images";

export function ProjectsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8">
        <div className="gold-divider mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Trusted Across Property Types</h2>
        <p className="mt-2 max-w-2xl text-sm text-silver-600">
          From apartments and villas to schools, sports grounds, and gated communities — our team adapts each
          installation to the building and its use.
        </p>
      </div>

      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {projectTypes.map((project) => {
          const image = getHeroImage(project.imageCategories, project.seed, `${project.label} installation`);
          return (
            <article key={project.label} className="w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-silver-100 bg-white/95 shadow-card sm:w-auto">
              <div className="relative aspect-[4/3]">
                <Image src={image.src} alt={`${project.label} — ${project.caption}`} fill loading="lazy" sizes="(max-width: 640px) 70vw, 300px" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-silver-900">{project.label}</h3>
                <p className="mt-1 text-xs text-silver-600">{project.caption}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
