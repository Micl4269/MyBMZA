import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { VehicleSelector } from "@/components/vehicle/vehicle-selector";
import { MStripe } from "@/components/ui/m-stripe";
import { products } from "@/data/products";
import { ChevronRight, Filter } from "lucide-react";

export const metadata = {
  title: "All Products | My BM ZA",
  description:
    "Browse our complete collection of BMW aftermarket aesthetics. Spoilers, gearknobs, trim, door lights, and curated kits.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">All Products</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-m-blue/5 to-background py-12">
        <div className="container mx-auto px-4">
          <MStripe size="sm" className="w-20 mb-4" />
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">All Products</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover our complete range of premium BMW aftermarket aesthetics.
            From exterior styling to interior upgrades.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Vehicle Filter */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Vehicle
              </h3>
              <VehicleSelector compact showSaveButton={false} />
            </div>

            {/* Categories */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/products"
                    className="block px-3 py-2 rounded-lg bg-m-blue/10 text-m-blue font-medium text-sm"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/exterior"
                    className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors"
                  >
                    Exterior
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/interior"
                    className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors"
                  >
                    Interior
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/kits"
                    className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors"
                  >
                    Curated Kits
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
              <select className="px-3 py-2 border border-input rounded-lg text-sm bg-background focus:border-m-blue focus:outline-none">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
