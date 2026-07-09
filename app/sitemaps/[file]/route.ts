import { notFound } from "next/navigation";
import { buildUrlsetXml, getBucketBatch, parseSitemapFilename } from "@/lib/sitemap";
import { SITEMAP_BUCKETS } from "@/data/pageRules";

export const revalidate = 3600;

export function generateStaticParams() {
  return SITEMAP_BUCKETS.map((bucket) => ({ file: `${bucket}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const parsed = parseSitemapFilename(file);
  if (!parsed) notFound();

  const entries = getBucketBatch(parsed.bucket, parsed.batch);
  const xml = buildUrlsetXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
