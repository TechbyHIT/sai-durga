import Image from "next/image";
import { site } from "@/lib/site";

/** Sai Durga Invisible Grills brand logo — used in header and mobile menu. */
export function BrandLogo({ size = "default" }: { size?: "default" | "compact" }) {
  const compact = size === "compact";

  return (
    <Image
      src="/brand/logo.png"
      alt={`${site.name} — Safe Living, Stylish View, Strong Protection`}
      width={compact ? 340 : 440}
      height={compact ? 80 : 100}
      priority
      sizes={compact ? "340px" : "(max-width: 639px) 400px, 440px"}
      className={
        compact
          ? "h-16 w-auto max-w-[340px] object-contain object-left sm:h-16"
          : "h-[5.25rem] w-auto max-w-[min(82vw,400px)] object-contain object-left sm:h-20 sm:max-w-[400px] lg:h-24 lg:max-w-[440px]"
      }
    />
  );
}
