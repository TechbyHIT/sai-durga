import Link from "next/link";
import { CTAButtons } from "@/components/CTAButtons";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-gold-500">404</p>
      <h1 className="text-2xl font-bold text-silver-900">Page Not Found</h1>
      <p className="text-silver-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Try browsing our services or
        locations, or get in touch directly.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/services" className="rounded-full border-2 border-gold-400 px-6 py-3 font-semibold text-gold-600 hover:bg-gold-50">
          Browse Services
        </Link>
        <Link href="/locations" className="rounded-full border-2 border-gold-400 px-6 py-3 font-semibold text-gold-600 hover:bg-gold-50">
          Browse Locations
        </Link>
      </div>
      <CTAButtons />
    </section>
  );
}
