import type { Metadata } from "next";
import { HeroSlider, type HeroSlideView } from "@/components/HeroSlider";
import { HeroIntro } from "@/components/HeroIntro";
import { StatsSection } from "@/components/StatsSection";
import { PopularSearchLinks } from "@/components/PopularSearchLinks";
import { MainServices } from "@/components/MainServices";
import { MaterialsSection } from "@/components/MaterialsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GallerySection } from "@/components/GallerySection";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { SolutionsSection } from "@/components/SolutionsSection";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { BrandsSection } from "@/components/BrandsSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HomepageSEOContent } from "@/components/HomepageSEOContent";
import { BlogPreview } from "@/components/BlogPreview";
import { ContactSection } from "@/components/ContactSection";
import { FastSearchLinks } from "@/components/FastSearchLinks";
import { Schema } from "@/components/Schema";
import { heroSlides } from "@/data/homepage";
import { homepageFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { getHeroImage } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 43200; // 12h

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Invisible Grills, Safety Nets & Pigeon Nets in Andhra Pradesh | ${site.name}`,
    description:
      "Get invisible grills, balcony safety nets, pigeon nets, bird spikes, cloth hangers, sports nets, and cricket nets in Visakhapatnam, Vijayawada, Kakinada, Rajahmundry, Vizianagaram, Srikakulam, Eluru, and nearby Andhra Pradesh areas. Best local installers near you — free site inspection. Call for a quote.",
    path: "/",
    index: true,
  });
}

const flagshipServices = services.filter((s) => s.navPriority === 1).slice(0, 6);

export default function HomePage() {
  const slides: HeroSlideView[] = heroSlides.map((slide) => ({
    headline: slide.headline,
    subheadline: slide.subheadline,
    seoText: slide.seoText,
    href: slide.href,
    image: getHeroImage(slide.imageCategories, slide.seed, slide.alt),
  }));

  return (
    <>
      <Schema
        data={[
          breadcrumbListSchema([{ label: "Home", href: "/" }]),
          faqPageSchema(homepageFaqs),
          ...flagshipServices.map((s) =>
            serviceSchema({
              serviceName: s.name,
              description: s.summary,
              url: absoluteUrl(`/${s.slug}`),
            }),
          ),
        ]}
      />

      <HeroSlider slides={slides} />
      <HeroIntro />
      <StatsSection />
      <SolutionsSection />
      <MainServices />
      <PopularSearchLinks />
      <FastSearchLinks />
      <MaterialsSection />
      <ProjectsSection />
      <HowItWorks />
      <WhyChooseUs />
      <GallerySection />
      <Testimonials />
      <VideoTestimonials />
      <BrandsSection />
      <FAQAccordion faqs={homepageFaqs} />
      <HomepageSEOContent />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
