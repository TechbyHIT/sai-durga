import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import { blogPosts, blogPostsBySlug } from "@/data/blogTopics";
import { buildBlogContent } from "@/lib/pageGenerator";
import { evaluateHubPage } from "@/lib/shouldIndexPage";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema, articleSchema } from "@/lib/schema";
import { CRAWL_PRIORITY, PRIORITY_LIMITS } from "@/data/pageRules";
import { absoluteUrl } from "@/lib/site";

// Next.js route config must be a static literal, so REVALIDATE.priorityPage (86400s / 24h) is inlined here.
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return blogPosts.slice(0, PRIORITY_LIMITS.topBlogPages).map((p) => ({ slug: p.slug }));
}

function load(slug: string) {
  const post = blogPostsBySlug[slug];
  if (!post) return null;
  const content = buildBlogContent(post);
  const evaluated = evaluateHubPage(content, { pageType: "blog", crawlPriority: CRAWL_PRIORITY.P2 });
  return { post, content, evaluated };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = load(slug);
  if (!data) return {};
  return buildMetadata({
    title: data.content.title,
    description: data.content.metaDescription,
    path: `/blog/${slug}`,
    index: data.evaluated.decision.index,
    imagePath: data.content.heroImage.src,
    imageAlt: data.content.heroImage.alt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = load(slug);
  if (!data) notFound();
  const { post, content } = data;

  return (
    <PageTemplate
      content={content}
      eyebrow={`${post.readingMinutes} min read`}
      finalCtaText="Ready to protect your space? Get a free site inspection and quote today."
      schema={[
        breadcrumbListSchema(content.breadcrumbs),
        faqPageSchema(content.faqs),
        articleSchema({
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          url: absoluteUrl(`/blog/${post.slug}`),
          imageUrl: content.heroImage.src,
        }),
      ]}
      leadFormServiceSlug={post.relatedServiceSlugs[0]}
    />
  );
}
