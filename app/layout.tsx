import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteExploreLinksLazy } from "@/components/SiteExploreLinksLazy";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Schema } from "@/components/Schema";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} | Best Invisible Grills & Safety Nets Near Me in Andhra Pradesh`,
    template: `%s | ${site.name}`,
  },
  description:
    "Best invisible grills, safety nets, pigeon nets, and anti bird spikes near you in Visakhapatnam, Vijayawada, Kakinada, Rajahmundry, and Andhra Pradesh. Free site inspection. Call +91 8121202055.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_IN",
    url: site.baseUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Schema data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <SiteExploreLinksLazy />
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
