export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { SupplierProduct } from "@/types";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesBar } from "@/components/home/features-bar";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyUsSection } from "@/components/home/why-us-section";
import { CTASection } from "@/components/home/cta-section";

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
      <HeroSection />
      <FeaturesBar />
      <CategoriesSection />
      <FeaturedProducts products={featuredProducts} />
      <WhyUsSection />
      <CTASection />
    </div>
  );
}
