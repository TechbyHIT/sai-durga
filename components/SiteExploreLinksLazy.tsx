"use client";

import dynamic from "next/dynamic";

const SiteExploreLinks = dynamic(
  () => import("./SiteExploreLinks").then((m) => m.SiteExploreLinks),
  { ssr: false, loading: () => <div className="h-px" aria-hidden /> },
);

/** Deferred explore block — keeps first paint fast on every page. */
export function SiteExploreLinksLazy() {
  return <SiteExploreLinks />;
}
