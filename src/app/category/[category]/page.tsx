import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { VehicleSelector } from "@/components/vehicle/vehicle-selector";
import { MStripe } from "@/components/ui/m-stripe";
import { getProductsByCategory } from "@/data/products";
import { ChevronRight, Filter } from "lucide-react";

const categoryInfo: Record<
  string,
  {
    name: string;
    description: string;
    subcategories: { slug: string; name: string }[];
  }
> = {
  exterior: {
    name: "Exterior",
    description:
      "Transform your BMW's appearance with premium exterior styling parts. From aggressive spoilers to sleek mirror caps.",
    subcategories: [
      { slug: "spoilers", name: "Spoilers" },
      { slug: "mirror-caps", name: "Mirror Caps" },
      { slug: "grilles", name: "Grilles" },
      { slug: "badges", name: "Badges & Emblems" },
      { slug: "exterior-trim", name: "Exterior Trim" },
    ],
  },
  interior: {
    name: "Interior",
    description:
      "Upgrade your BMW's cabin with luxurious interior enhancements. Premium gearknobs, trim pieces, and ambient lighting.",
    subcategories: [
      { slug: "gearknobs", name: "Gearknobs" },
      { slug: "boot-covers", name: "Boot Covers" },
      { slug: "door-lights", name: "Door Lights" },
      { slug: "interior-trim", name: "Interior Trim" },
      { slug: "steering-wheels", name: "Steering Wheels" },
    ],
  },
  kits: {
    name: "Curated Kits",
    description:
      "Complete plug-and-play solutions combining perfectly matched components. Save time and money with our curated bundles.",
    subcategories: [
      { slug: "gearknob-kits", name: "Gearknob Kits" },
      { slug: "interior-kits", name: "Interior Upgrade Kits" },
      { slug: "exterior-kits", name: "Exterior Styling Kits" },
    ],
  },
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(categoryInfo).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = categoryInfo[category];

  if (!info) return { title: "Category Not Found" };

  return {
    title: `${info.name} | My BM ZA`,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = categoryInfo[category];

  if (!info) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{info.name}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-m-blue/5 to-background py-12">
        <div className="container mx-auto px-4">
          <MStripe size="sm" className="w-20 mb-4" />
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">{info.name}</h1>
          <p className="text-muted-foreground max-w-2xl">{info.description}</p>
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

            {/* Subcategories */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Subcategories</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/category/${category}`}
                    className="block px-3 py-2 rounded-lg bg-m-blue/10 text-m-blue font-medium text-sm"
                  >
                    All {info.name}
                  </Link>
                </li>
                {info.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/category/${category}/${sub.slug}`}
                      className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
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

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary/30 rounded-xl">
                <p className="text-muted-foreground">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
