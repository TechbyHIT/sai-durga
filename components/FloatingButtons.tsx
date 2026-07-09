import { site } from "@/lib/site";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 gpu-scroll">
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg md:transition-transform md:hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.04 3C9.37 3 3.96 8.41 3.96 15.08c0 2.36.68 4.55 1.86 6.42L3 29l7.68-2.4a12.03 12.03 0 0 0 5.36 1.26h.01c6.67 0 12.08-5.41 12.08-12.08S22.72 3 16.05 3zm0 22.02h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.55 1.42 1.45-4.43-.24-.38a9.94 9.94 0 0 1-1.52-5.33c0-5.5 4.48-9.98 9.98-9.98 2.67 0 5.17 1.04 7.06 2.93a9.9 9.9 0 0 1 2.92 7.05c0 5.51-4.48 9.94-9.62 9.94zm5.46-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.09 3.2 5.07 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </a>
      <a
        href={site.phoneHref}
        aria-label="Call now"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg md:transition-transform md:hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02z" />
        </svg>
      </a>
      <a
        href={site.emailHref}
        aria-label="Email us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-silver-700 text-white shadow-lg md:transition-transform md:hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth={2} aria-hidden="true">
          <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
          <path d="m3.5 6.5 8.5 6 8.5-6" />
        </svg>
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with HIT AI assistant"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-bold text-white shadow-lg md:transition-transform md:hover:scale-105"
      >
        HIT
      </a>
    </div>
  );
}
