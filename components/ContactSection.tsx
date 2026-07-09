import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/site";

const contactRows: { label: string; value: string; href?: string }[] = [
  { label: "Phone", value: site.phone, href: site.phoneHref },
  { label: "WhatsApp", value: site.whatsapp, href: site.whatsappHref },
  { label: "Email", value: site.email, href: site.emailHref },
  { label: "Address", value: "Andhra Pradesh (address on request)" },
  { label: "Working Hours", value: "Mon–Sun, 9:00 AM – 8:00 PM" },
];

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <div className="gold-divider mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-silver-900 sm:text-3xl">Get a Free Site Inspection</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-silver-600">
          Share your requirement and location — we&rsquo;ll respond on WhatsApp with a free site-visit slot and quote.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <LeadForm title="Book Your Free Inspection" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl2 border border-silver-100 bg-white/95 p-6 shadow-card">
            <h3 className="text-lg font-bold text-silver-900">Contact Details</h3>
            <dl className="mt-4 space-y-3">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 border-b border-silver-100 pb-3 last:border-0 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-silver-500">{row.label}</dt>
                  <dd className="text-right text-sm font-medium text-silver-900">
                    {row.href ? (
                      <a href={row.href} className="hover:text-gold-600" target={row.label === "WhatsApp" ? "_blank" : undefined} rel={row.label === "WhatsApp" ? "noopener noreferrer" : undefined}>
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-xl2 border border-silver-100 bg-silver-50 shadow-card">
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-silver-100 to-gold-50 text-center">
              <div className="px-6">
                <p className="text-sm font-semibold text-silver-700">Google Maps</p>
                <p className="mt-1 text-xs text-silver-500">Map embed placeholder — add your business location map here.</p>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded-full bg-gold-500 px-5 py-2 text-xs font-semibold text-white shadow-gold hover:bg-gold-600">
                  Ask for directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
