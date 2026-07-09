import Image from "next/image";
import { site } from "@/lib/site";

/** Sai Durga Invisible Grills brand logo — used in header and mobile menu. */
export function BrandLogo({ size = "default" }: { size?: "default" | "compact" }) {
  const compact = size === "compact";

  return (
    <Image
      src="/brand/logo.png"
      alt={`${site.name} — Safe Living, Stylish View, Strong Protection`}
      width={compact ? 220 : 320}
      height={compact ? 56 : 72}
      priority
      sizes={compact ? "220px" : "(max-width: 640px) 240px, 320px"}
      className={
        compact
          ? "h-11 w-auto max-w-[220px] object-contain object-left sm:h-12"
          : "h-14 w-auto max-w-[260px] object-contain object-left sm:h-16 sm:max-w-[320px]"
      }
    />
  );
}
