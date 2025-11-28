export const dynamic = "force-dynamic";

import Link from "next/link";
import { VehicleSelector } from "@/components/vehicle/vehicle-selector";
import { Button } from "@/components/ui/button";
import { MStripe } from "@/components/ui/m-stripe";
import { SupplierProductCard } from "@/components/product/supplier-product-card";
import { createClient } from "@/lib/supabase/server";
import { SupplierProduct } from "@/types";
import {
  Truck,
  Shield,
  Wrench,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Exterior",
    description: "Spoilers, grilles, mirror caps & more",
    href: "/supplier-products?category=exterior",
  },
  {
    name: "Interior",
    description: "Gearknobs, trim, door lights & more",
    href: "/supplier-products?category=interior",
  },
  {
    name: "Performance",
    description: "Upgrades and accessories",
    href: "/supplier-products",
  },
];

const features = [
  {
    icon: Truck,
    title: "Nationwide Shipping",
    description: "Fast delivery across South Africa from our Gauteng warehouse",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product tested for perfect OEM fitment and durability",
  },
  {
    icon: Wrench,
    title: "Plug & Play",
    description: "Easy installation with no modifications required",
  },
];

async function getFeaturedProducts(): Promise<SupplierProduct[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("supplier_products")
      .select("*")
      .eq("in_stock", true)
      .not("hosted_images", "is", null)
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-m-blue/5 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>Gauteng Based | Nationwide Delivery</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Premium BMW{" "}
              <span className="text-m-blue">Aftermarket Aesthetics</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Curated plug-and-play solutions for the discerning BMW enthusiast.
              Transform your ride with quality parts that fit perfectly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/supplier-products">
                <Button size="lg">
                  Shop All Products
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Vehicle Selector */}
          <div className="max-w-4xl mx-auto">
            <VehicleSelector />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 py-6 px-4 md:px-8"
              >
                <div className="w-12 h-12 rounded-full bg-m-blue/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-m-blue" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link
              href="/supplier-products"
              className="text-sm text-m-blue hover:underline flex items-center gap-1"
            >
              View all products
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative rounded-xl overflow-hidden bg-secondary aspect-[4/3]"
              >
                {/* Placeholder gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-m-blue/20 to-m-blue/5 group-hover:from-m-blue/30 group-hover:to-m-blue/10 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <MStripe size="sm" className="w-16 mb-3" />
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="mt-3 text-sm text-m-blue font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Shop now
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-m-blue" />
              <h2 className="text-2xl font-bold">Featured Products</h2>
            </div>
            <Link
              href="/supplier-products"
              className="text-sm text-m-blue hover:underline flex items-center gap-1"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <SupplierProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Loading products...</p>
            </div>
          )}
        </div>
      </section>

      {/* Why My BM ZA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Why My BM ZA?</h2>
            <p className="text-muted-foreground">
              We're BMW enthusiasts based in Gauteng, curating the best
              aftermarket aesthetics for fellow enthusiasts across South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-m-blue/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-m-blue" />
              </div>
              <h3 className="font-semibold mb-2">Gauteng Based</h3>
              <p className="text-sm text-muted-foreground">
                Local stock means faster shipping and easier returns
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-m-blue/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-7 w-7 text-m-blue" />
              </div>
              <h3 className="font-semibold mb-2">Nationwide Shipping</h3>
              <p className="text-sm text-muted-foreground">
                We deliver to every corner of South Africa
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-m-blue/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-m-blue" />
              </div>
              <h3 className="font-semibold mb-2">Curated Quality</h3>
              <p className="text-sm text-muted-foreground">
                Every part tested for fitment and build quality
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-m-blue/10 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-7 w-7 text-m-blue" />
              </div>
              <h3 className="font-semibold mb-2">Plug & Play</h3>
              <p className="text-sm text-muted-foreground">
                Solutions designed for easy DIY installation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Transform Your BMW?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of BMW enthusiasts who trust My BM ZA for premium
            aftermarket aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/supplier-products">
              <Button
                size="lg"
                className="bg-m-blue hover:bg-m-blue-dark text-white"
              >
                Browse All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-foreground"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
