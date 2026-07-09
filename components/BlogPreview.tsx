import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogTopics";
import { getHeroImage } from "@/lib/images";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

function formatDate(value: string): string {
  const d = new Date(value);
  return isNaN(d.getTime()) ? value : dateFmt.format(d);
}

export function BlogPreview() {
  const posts = blogPosts.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="gold-divider mb-3" />
          <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Guides &amp; Tips</h2>
        </div>
        <Link href="/blog" className="text-sm font-semibold text-gold-600 hover:underline">Read all guides →</Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const image = getHeroImage([post.coverImageCategory], post.slug, post.title);
          return (
            <article key={post.slug} className="flex flex-col overflow-hidden rounded-3xl border border-silver-100 bg-white/95 shadow-card transition hover:-translate-y-0.5 hover:shadow-gold">
              <div className="relative aspect-[16/9]">
                <Image src={image.src} alt={post.title} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{formatDate(post.updatedAt)}</p>
                <h3 className="mt-2 text-base font-bold text-silver-900">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-600">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-gold-600 hover:underline">
                  Read More →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
