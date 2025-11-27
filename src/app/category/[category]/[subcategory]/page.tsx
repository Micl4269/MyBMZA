import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { VehicleSelector } from "@/components/vehicle/vehicle-selector";
import { MStripe } from "@/components/ui/m-stripe";
import { getProductsBySubcategory } from "@/data/products";
import { ChevronRight, Filter } from "lucide-react";

const subcategoryInfo: Record<
  string,
  { name: string; category: string; categoryName: string; description: string }
> = {
  // Exterior
  spoilers: {
    name: "Spoilers",
    category: "exterior",
    categoryName: "Exterior",
    description: "Add aggressive styling and improved aerodynamics with our premium spoiler collection.",
  },
  "mirror-caps": {
    name: "Mirror Caps",
    category: "exterior",
    categoryName: "Exterior",
    description: "Transform your mirrors with carbon fiber and gloss black mirror cap replacements.",
  },
  grilles: {
    name: "Grilles",
    category: "exterior",
    categoryName: "Exterior",
    description: "Upgrade your front end with stylish kidney grille replacements.",
  },
  badges: {
    name: "Badges & Emblems",
    category: "exterior",
    categoryName: "Exterior",
    description: "Premium BMW badges and M Performance emblems for a personalized touch.",
  },
  "exterior-trim": {
    name: "Exterior Trim",
    category: "exterior",
    categoryName: "Exterior",
    description: "Window surrounds, door handles, and other exterior trim pieces.",
  },
  // Interior
  gearknobs: {
    name: "Gearknobs",
    category: "interior",
    categoryName: "Interior",
    description: "Premium shift knobs for both automatic and manual transmissions.",
  },
  "boot-covers": {
    name: "Boot Covers",
    category: "interior",
    categoryName: "Interior",
    description: "Alcantara and leather shift boot covers with M-color stitching.",
  },
  "door-lights": {
    name: "Door Lights",
    category: "interior",
    categoryName: "Interior",
    description: "LED door projectors with BMW and M Performance logos.",
  },
  "interior-trim": {
    name: "Interior Trim",
    category: "interior",
    categoryName: "Interior",
    description: "Carbon fiber and piano black interior trim pieces.",
  },
  "steering-wheels": {
    name: "Steering Wheels",
    category: "interior",
    categoryName: "Interior",
    description: "Premium steering wheel upgrades and covers.",
  },
  // Kits
  "gearknob-kits": {
    name: "Gearknob Kits",
    category: "kits",
    categoryName: "Curated Kits",
    description: "Complete gearknob upgrade kits with matching boot covers and surrounds.",
  },
  "interior-kits": {
    name: "Interior Upgrade Kits",
    category: "kits",
    categoryName: "Curated Kits",
    description: "Comprehensive interior styling packages for a complete refresh.",
  },
  "exterior-kits": {
    name: "Exterior Styling Kits",
    category: "kits",
    categoryName: "Curated Kits",
    description: "Complete exterior packages including grilles, mirrors, and badges.",
  },
};

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateStaticParams() {
  return Object.entries(subcategoryInfo).map(([subcategory, info]) => ({
    category: info.category,
    subcategory,
  }));
}

export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { subcategory } = await params;
  const info = subcategoryInfo[subcategory];

  if (!info) return { title: "Category Not Found" };

  return {
    title: `${info.name} | ${info.categoryName} | My BM ZA`,
    description: info.description,
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const info = subcategoryInfo[subcategory];

  if (!info || info.category !== category) {
    notFound();
  }

  const products = getProductsBySubcategory(subcategory);

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
            <Link
              href={`/category/${category}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {info.categoryName}
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

            {/* Back to category */}
            <div className="bg-card border border-border rounded-xl p-4">
              <Link
                href={`/category/${category}`}
                className="text-sm text-m-blue hover:underline flex items-center gap-1"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to all {info.categoryName}
              </Link>
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
                  No products found in this subcategory.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
