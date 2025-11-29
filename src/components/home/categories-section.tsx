import Link from "next/link";
import { MStripe } from "@/components/ui/m-stripe";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Exterior",
    description: "Spoilers, grilles, mirror caps & more",
    href: "/supplier-products?category=exterior",
    gradient: "from-m-blue/20 to-m-blue/5",
  },
  {
    name: "Interior",
    description: "Gearknobs, trim, door lights & more",
    href: "/supplier-products?category=interior",
    gradient: "from-m-blue-dark/20 to-m-blue-dark/5",
  },
  {
    name: "Performance",
    description: "Upgrades and accessories",
    href: "/supplier-products",
    gradient: "from-m-red/15 to-m-red/5",
  },
];

export function CategoriesSection() {
  return (
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
              className="group block relative rounded-xl overflow-hidden bg-secondary aspect-[4/3]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:scale-105 transition-transform duration-300`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <MStripe size="sm" className="w-16 mb-3" />
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <span className="mt-3 text-sm text-m-blue font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop now
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
