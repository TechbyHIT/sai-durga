import { site } from "@/lib/site";



export function SeoSupportContent({ title, location }: { title: string; location?: string }) {

  const nearMeLabel = location ? `${title} near me in ${location}` : `${title} near me`;



  return (

    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

      <div className="soft-gold-panel rounded-[2rem] p-6 shadow-card sm:p-8">

        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-600">Local Installation Near You</p>

        <h2 className="mt-2 text-2xl font-extrabold text-silver-900">Planning {title}? Start with a proper site check.</h2>

        <p className="mt-3 leading-relaxed text-silver-700">

          Every balcony, window, terrace, duct, staircase, and utility area has different measurements, wall conditions,

          height access, and usage needs. {site.name} uses a free inspection-first process so the final recommendation is

          based on your real space, not a copied price or generic package.

          {location ? ` We are a local team serving ${location} — search "${nearMeLabel}" and book a free visit.` : ""}

        </p>

        <div className="mt-4 flex flex-wrap gap-2">

          {[

            location ? `Best safety nets near me in ${location}` : "Best safety nets near me",

            location ? `Invisible grills near me in ${location}` : "Invisible grills near me",

            location ? `Pigeon nets near me in ${location}` : "Pigeon nets near me",

            "Free site inspection near me",

            "Local installers Andhra Pradesh",

          ].map((chip) => (

            <span

              key={chip}

              className="rounded-full border border-gold-200 bg-white/90 px-3 py-1 text-xs font-semibold text-gold-800"

            >

              {chip}

            </span>

          ))}

        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          {[

            {

              title: "Measure First",

              text: "We check opening size, anchor points, height, access, and building type before quoting.",

            },

            {

              title: "Choose Material",

              text: "Material is selected for the exact use case: child safety, pets, pigeon control, drying, or sports use.",

            },

            {

              title: "Install Cleanly",

              text: "The team plans neat fitting, safe tensioning, and simple after-care guidance for long-term use.",

            },

          ].map((item) => (

            <div key={item.title} className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-card">

              <p className="font-bold text-silver-900">{item.title}</p>

              <p className="mt-2 text-sm leading-relaxed text-silver-600">{item.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

