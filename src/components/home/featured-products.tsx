import Link from "next/link";
import { SupplierProductCard } from "@/components/product/supplier-product-card";
import { SupplierProduct } from "@/types";
import { ChevronRight, Sparkles } from "lucide-react";

interface FeaturedProductsProps {
  products: SupplierProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
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

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
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
  );
}
