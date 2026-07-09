import Link from "next/link";
import { homepageSeoContent } from "@/data/homepage";
import { site } from "@/lib/site";

const internalAnchors: { label: string; href: string }[] = [
  { label: "Invisible Grills in Visakhapatnam", href: "/invisible-grills-in-visakhapatnam" },
  { label: "Balcony Safety Nets in Kakinada", href: "/balcony-safety-nets-in-kakinada" },
  { label: "Pigeon Nets in Rajahmundry", href: "/pigeon-nets-in-rajahmundry" },
  { label: "Children Safety Nets in Vizianagaram", href: "/children-safety-nets-in-vizianagaram" },
  { label: "Bird Nets in Srikakulam", href: "/bird-nets-in-srikakulam" },
  { label: "Cloth Hangers in Eluru", href: "/cloth-hangers-in-eluru" },
  { label: "Invisible Grill Price Guide", href: "/invisible-grill-price" },
  { label: "Anti Bird Spikes Installation", href: "/anti-bird-spikes" },
];

export function HomepageSEOContent() {
  return (
    <section className="bg-white/70 py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="gold-divider mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">
          Safety Nets, Invisible Grills &amp; Pigeon Net Installation in Andhra Pradesh
        </h2>

        <div className="mt-6 space-y-8">
          {homepageSeoContent.map((block) => (
            <div key={block.heading}>
              <h3 className="text-lg font-bold text-silver-900">{block.heading}</h3>
              {block.paragraphs.map((p, i) => (
                <p key={i} className="mt-2 text-sm leading-relaxed text-silver-600">{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gold-100 bg-gold-50/60 p-5">
          <p className="text-sm font-semibold text-silver-900">Explore popular services and locations</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {internalAnchors.map((anchor) => (
              <Link key={anchor.href} href={anchor.href} className="rounded-full border border-gold-200 bg-base-white px-3 py-1.5 text-xs font-medium text-gold-700 hover:bg-gold-100">
                {anchor.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-silver-900 p-6 text-center">
          <p className="text-lg font-bold text-white">
            Need invisible grills, safety nets, pigeon nets, or cloth hangers in Andhra Pradesh?
          </p>
          <p className="mt-2 text-sm text-silver-200">
            Contact {site.name} today for a free quote and professional installation.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={site.phoneHref} className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-gold hover:bg-gold-600">Call {site.phone}</a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">WhatsApp Now</a>
          </div>
        </div>
      </div>
    </section>
  );
}
