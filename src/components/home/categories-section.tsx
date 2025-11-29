import Link from "next/link";
import { MStripe } from "@/components/ui/m-stripe";
import { ChevronRight } from "lucide-react";
import { SpoilerIcon, SteeringWheelIcon, KeyCoverIcon } from "@/components/icons/car-parts";
import { ComponentType } from "react";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

interface Category {
  name: string;
  description: string;
  href: string;
  bgColor: string;
  Icon: ComponentType<IconProps>;
}

const categories: Category[] = [
  {
    name: "Exterior",
    description: "Spoilers, grilles, mirror caps & more",
    href: "/supplier-products?category=exterior",
    bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
    Icon: SpoilerIcon,
  },
  {
    name: "Interior",
    description: "Gearknobs, trim, door lights & more",
    href: "/supplier-products?category=interior",
    bgColor: "bg-gradient-to-br from-slate-700 to-slate-800",
    Icon: SteeringWheelIcon,
  },
  {
    name: "Accessories",
    description: "Key covers, badges & more",
    href: "/supplier-products",
    bgColor: "bg-gradient-to-br from-slate-900 to-black",
    Icon: KeyCoverIcon,
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
              className={`group block relative rounded-xl overflow-hidden ${category.bgColor} aspect-[4/3] hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Large background icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <category.Icon className="h-32 w-32 text-white" strokeWidth={1} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-m-blue/20 flex items-center justify-center">
                    <category.Icon className="h-5 w-5 text-m-blue" />
                  </div>
                  <MStripe size="sm" className="w-12" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">{category.name}</h3>
                <p className="text-sm text-gray-300">
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
