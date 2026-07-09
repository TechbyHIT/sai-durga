import type { PageContent } from "@/lib/pageGenerator";
import { Breadcrumbs } from "./Breadcrumbs";
import { Hero } from "./Hero";
import { ContentSections, ComparisonTable } from "./ContentSections";
import { TrustCards } from "./TrustCards";
import { BelowFold } from "./SeoLongForm";
import { SeoLongForm } from "./SeoLongForm";
import { PageLinkSections } from "./LocationServicesGrid";
import { Gallery } from "./Gallery";
import { FAQAccordion } from "./FAQAccordion";
import { LeadForm } from "./LeadForm";
import { FastSearchLinks } from "./FastSearchLinks";
import { FinalCta } from "./FinalCta";
import { Schema } from "./Schema";
import { SeoSupportContent } from "./SeoSupportContent";

export function PageTemplate({
  content,
  eyebrow,
  finalCtaText,
  schema,
  leadFormServiceSlug,
  comparisonNames,
}: {
  content: PageContent;
  eyebrow?: string;
  finalCtaText: string;
  schema: Record<string, unknown> | Record<string, unknown>[];
  leadFormServiceSlug?: string;
  comparisonNames?: { a: string; b: string };
}) {
  return (
    <>
      <Schema data={schema} />
      <Breadcrumbs items={content.breadcrumbs} />
      <Hero eyebrow={eyebrow} title={content.h1} description={content.intro} image={content.heroImage} priority />
      <ContentSections sections={content.sections} />
      {content.comparisonTable && comparisonNames && (
        <div className="py-4">
          <ComparisonTable rows={content.comparisonTable} nameA={comparisonNames.a} nameB={comparisonNames.b} />
        </div>
      )}
      <TrustCards />
      <Gallery
        images={content.galleryImages}
        title="Installation Photos"
        subtitle="Real project photos from our installation team across Andhra Pradesh."
      />
      {content.installImages && content.installImages.length > 0 && (
        <Gallery
          images={content.installImages}
          title="More Project Images"
          subtitle="Balcony, window, duct, terrace, and sports net installations."
        />
      )}
      <SeoSupportContent title={content.h1} location={content.locationName} />
      <BelowFold>
        {content.seoSections && content.seoSections.length > 0 && <SeoLongForm sections={content.seoSections} />}
        <FastSearchLinks limit={24} />
        <PageLinkSections
          locationName={content.locationName}
          servicesInLocationLinks={content.servicesInLocationLinks}
          relatedLinks={content.relatedLinks}
          nearbyLinks={content.nearbyLinks}
          morePageLinks={content.morePageLinks}
        />
        <FAQAccordion faqs={content.faqs} />
        <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
          <LeadForm defaultService={leadFormServiceSlug} />
        </div>
      </BelowFold>
      <FinalCta text={finalCtaText} />
    </>
  );
}
