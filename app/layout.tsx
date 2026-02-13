import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBanner } from "@/components/banners/TopBanner";
import { MobileQuickActions } from "@/components/shared/MobileQuickActions";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Olson & Company | New Westminster Accounting Firm",
    template: "%s | Olson & Company"
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0369a1"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className="bg-slate-100 text-slate-900">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TopBanner text="Tax season reminder: estimate early, file confidently. Ask Olson & Company for a planning review." />
        <Header />
        <main id="main-content" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <MobileQuickActions />
        <Footer />
      </body>
    </html>
  );
}
