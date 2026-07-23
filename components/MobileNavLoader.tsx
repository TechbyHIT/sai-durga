"use client";

import dynamic from "next/dynamic";
import { MobileNavPlaceholder } from "@/components/MobileNavPlaceholder";

const MobileNav = dynamic(() => import("@/components/MobileNav").then((m) => m.MobileNav), {
  ssr: false,
  loading: () => <MobileNavPlaceholder />,
});

export function MobileNavLoader() {
  return <MobileNav />;
}
