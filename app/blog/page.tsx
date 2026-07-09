import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Schema } from "@/components/Schema";
import { blogPosts } from "@/data/blogTopics";
import { getHeroImage } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const revalidate = 43200;

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Blog & Guides | ${site.name}`,
    description: `Practical guides on balcony safety, pigeon control, pricing, and installation from ${site.name}.`,
    path: "/blog",
    index: true,
  });
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function BlogIndexPage() {
  return (
    <>
      <Schema data={breadcrumbListSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-silver-900 sm:text-4xl">Blog &amp; Guides</h1>
        <p className="mt-3 max-w-2xl text-silver-600">
          Practical, no-fluff guides on balcony safety, pigeon control, pricing, and installation — written from real
          site experience across coastal Andhra Pradesh.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const image = getHeroImage([post.coverImageCategory], post.slug, post.title);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl2 border border-silver-100 bg-base-white shadow-card transition-shadow hover:shadow-gold"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={image.src} alt={image.alt} fill loading="lazy" sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{post.readingMinutes} min read</p>
                  <h2 className="mt-1 text-lg font-bold text-silver-900">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-silver-600">{post.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <FinalCta text="Have a question our guides don't cover? Call or WhatsApp our team directly." />
    </>
  );
}
