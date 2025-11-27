import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My BM ZA | Premium BMW Aftermarket Aesthetics",
  description:
    "South Africa's premier destination for BMW aftermarket aesthetics. Spoilers, gearknobs, door lights, interior & exterior trim. Curated plug-and-play solutions. Nationwide shipping from Gauteng.",
  keywords: [
    "BMW parts",
    "BMW accessories",
    "BMW aftermarket",
    "BMW South Africa",
    "BMW spoilers",
    "BMW gearknobs",
    "BMW interior",
    "BMW exterior",
    "M Performance",
    "carbon fiber BMW",
  ],
  authors: [{ name: "My BM ZA" }],
  openGraph: {
    title: "My BM ZA | Premium BMW Aftermarket Aesthetics",
    description:
      "South Africa's premier destination for BMW aftermarket aesthetics. Curated plug-and-play solutions.",
    url: "https://mybmza.co.za",
    siteName: "My BM ZA",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
