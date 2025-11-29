import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";
import { VehicleSelectorWrapper } from "./vehicle-selector-wrapper";

// Server component for fast LCP - no client JS needed for initial render
export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-m-blue/5 via-m-blue/3 to-background py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements - CSS only, no JS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-m-blue/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-m-red/5 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Location badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>Gauteng Based | Nationwide Delivery</span>
          </div>

          {/* Main heading - LCP element, render immediately */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight">
            Premium BMW{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-m-blue to-m-blue-dark">
              Aftermarket Aesthetics
            </span>
          </h1>

          {/* M-stripe - CSS only */}
          <div className="max-w-48 mx-auto mb-6 h-1.5 w-full overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(90deg, #81C4FF 0%, #81C4FF 33.33%, #16588E 33.33%, #16588E 66.66%, #E7222E 66.66%, #E7222E 100%)",
              }}
            />
          </div>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Curated plug-and-play solutions for the discerning BMW enthusiast.
            Transform your ride with quality parts that fit perfectly.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/supplier-products">
              <Button size="lg" variant="primary" className="shadow-lg shadow-m-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Shop All Products
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Vehicle Selector - lazy loaded client component */}
        <div className="max-w-4xl mx-auto">
          <VehicleSelectorWrapper />
        </div>
      </div>
    </section>
  );
}
