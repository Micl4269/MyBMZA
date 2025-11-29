import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
} from "@/components/seo/json-ld";
import { CartDrawer, Toaster } from "@/components/providers/client-components";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mybmza.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My BM ZA | Premium BMW Aftermarket Aesthetics",
    template: "%s | My BM ZA",
  },
  description:
    "South Africa's premier destination for BMW aftermarket aesthetics. Spoilers, grilles, gearknobs, door lights, interior & exterior trim. Curated plug-and-play solutions. Nationwide shipping from Gauteng.",
  keywords: [
    "BMW parts South Africa",
    "BMW accessories",
    "BMW aftermarket parts",
    "BMW spoilers",
    "BMW gearknobs",
    "BMW interior trim",
    "BMW exterior parts",
    "M Performance parts",
    "carbon fiber BMW",
    "BMW grilles",
    "BMW mirror caps",
    "BMW door lights",
    "F30 parts",
    "G20 parts",
    "E90 parts",
  ],
  authors: [{ name: "My BM ZA" }],
  creator: "My BM ZA",
  publisher: "My BM ZA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "My BM ZA | Premium BMW Aftermarket Aesthetics",
    description:
      "South Africa's premier destination for BMW aftermarket aesthetics. Curated plug-and-play solutions with nationwide shipping.",
    url: siteUrl,
    siteName: "My BM ZA",
    locale: "en_ZA",
    type: "website",
    // Images are auto-generated from opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "My BM ZA | Premium BMW Aftermarket Aesthetics",
    description:
      "South Africa's premier destination for BMW aftermarket aesthetics. Curated plug-and-play solutions.",
    // Images are auto-generated from twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link
          rel="preconnect"
          href="https://rqfhbgiqzjhtwypkxcpt.supabase.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://rqfhbgiqzjhtwypkxcpt.supabase.co" />

        {/* Structured data */}
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
