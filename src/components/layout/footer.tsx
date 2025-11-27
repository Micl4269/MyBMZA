import Link from "next/link";
import { MStripe } from "@/components/ui/m-stripe";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <MStripe size="md" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold">My</span>
              <span className="text-2xl font-bold text-m-blue">BM</span>
              <span className="text-2xl font-bold">ZA</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Premium BMW aftermarket aesthetics. Curated plug-and-play
              solutions for the discerning BMW enthusiast.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/mybmza"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-m-blue transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/mybmza"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-m-blue transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/exterior"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Exterior
                </Link>
              </li>
              <li>
                <Link
                  href="/category/interior"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Interior
                </Link>
              </li>
              <li>
                <Link
                  href="/category/kits"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Curated Kits
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Gauteng, South Africa</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href="tel:+27000000000"
                  className="hover:text-white transition-colors"
                >
                  +27 00 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:info@mybmza.co.za"
                  className="hover:text-white transition-colors"
                >
                  info@mybmza.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods & bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Secure payments via</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-medium">
                  PayFast
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs font-medium">
                  Yoco
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            &copy; {new Date().getFullYear()} My BM ZA. All rights reserved. Not
            affiliated with BMW AG.
          </p>
        </div>
      </div>
    </footer>
  );
}
