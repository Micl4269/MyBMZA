import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Toaster } from "@/components/ui/sonner";
import {
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
} from "@/components/seo/json-ld";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My BM ZA - Premium BMW Aftermarket Aesthetics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My BM ZA | Premium BMW Aftermarket Aesthetics",
    description:
      "South Africa's premier destination for BMW aftermarket aesthetics. Curated plug-and-play solutions.",
    images: ["/og-image.png"],
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
