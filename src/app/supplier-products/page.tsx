import { createClient } from "@/lib/supabase/server";
import { SupplierProductCard } from "@/components/product/supplier-product-card";
import { MobileFilterDrawer } from "@/components/product/mobile-filter-drawer";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { SpoilerIcon, SteeringWheelIcon, KeyCoverIcon } from "@/components/icons/car-parts";

interface SearchParams {
  page?: string;
  q?: string;
  model?: string;
  inStock?: string;
  category?: string;
  subcategory?: string;
}

// Map nav subcategories to search keywords for filtering
const subcategoryKeywords: Record<string, string[]> = {
  // Exterior
  spoilers: ["spoiler", "wing", "bootwing", "trunk spoiler", "boot lip"],
  "mirror-caps": ["mirror cap", "mirror cover", "side mirror"],
  grilles: ["grille", "grill", "kidney", "front grill"],
  badges: ["badge", "emblem", "logo", "roundel"],
  "exterior-trim": ["exterior trim", "molding", "garnish", "carbon trim"],
  // Interior
  gearknobs: ["gearknob", "gear knob", "shift knob", "shifter", "gear stick"],
  "boot-covers": ["boot cover", "trunk cover", "cargo cover", "boot mat"],
  "door-lights": ["door light", "puddle light", "courtesy light", "projector", "welcome light"],
  "interior-trim": ["interior trim", "dash trim", "panel trim", "carbon interior"],
  "steering-wheels": ["steering wheel", "steering"],
  // Kits
  "gearknob-kits": ["gearknob kit", "shift kit", "gear kit"],
  "interior-kits": ["interior kit", "upgrade kit", "interior package"],
  "exterior-kits": ["exterior kit", "body kit", "aero kit", "m performance kit"],
};

// Map main categories to broader search terms
const categoryKeywords: Record<string, string[]> = {
  exterior: ["spoiler", "grille", "grill", "mirror", "badge", "emblem", "trim", "diffuser", "lip", "wing", "bonnet", "hood", "fender", "bumper", "side skirt", "splitter", "carbon fiber", "exterior"],
  interior: ["gearknob", "gear knob", "shift", "steering", "door light", "interior trim", "boot cover", "floor mat", "seat", "console", "dial", "gauge", "interior", "cabin"],
  kits: ["kit", "package", "set", "combo"],
};

// Human-readable names for categories
const categoryNames: Record<string, string> = {
  exterior: "Exterior",
  interior: "Interior",
  kits: "Curated Kits",
  spoilers: "Spoilers",
  "mirror-caps": "Mirror Caps",
  grilles: "Grilles",
  badges: "Badges & Emblems",
  "exterior-trim": "Exterior Trim",
  gearknobs: "Gearknobs",
  "boot-covers": "Boot Covers",
  "door-lights": "Door Lights",
  "interior-trim": "Interior Trim",
  "steering-wheels": "Steering Wheels",
  "gearknob-kits": "Gearknob Kits",
  "interior-kits": "Interior Upgrade Kits",
  "exterior-kits": "Exterior Styling Kits",
};

// Category structure for sidebar navigation
const categoryStructure = [
  {
    id: "exterior",
    name: "Exterior",
    Icon: SpoilerIcon,
    icon: "exterior" as const,
    subcategories: [
      { id: "spoilers", name: "Spoilers" },
      { id: "mirror-caps", name: "Mirror Caps" },
      { id: "grilles", name: "Grilles" },
      { id: "badges", name: "Badges & Emblems" },
      { id: "exterior-trim", name: "Exterior Trim" },
    ],
  },
  {
    id: "interior",
    name: "Interior",
    Icon: SteeringWheelIcon,
    icon: "interior" as const,
    subcategories: [
      { id: "gearknobs", name: "Gearknobs" },
      { id: "steering-wheels", name: "Steering Wheels" },
      { id: "door-lights", name: "Door Lights" },
      { id: "boot-covers", name: "Boot Covers" },
      { id: "interior-trim", name: "Interior Trim" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    Icon: KeyCoverIcon,
    icon: "accessories" as const,
    subcategories: [
      { id: "gearknob-kits", name: "Gearknob Kits" },
      { id: "interior-kits", name: "Interior Kits" },
      { id: "exterior-kits", name: "Exterior Kits" },
    ],
  },
];

export default async function SupplierProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const page = parseInt(params.page || "1");
  const limit = 24;
  const offset = (page - 1) * limit;

  // Determine search keywords based on category/subcategory
  let searchKeywords: string[] = [];
  if (params.subcategory && subcategoryKeywords[params.subcategory]) {
    searchKeywords = subcategoryKeywords[params.subcategory];
  } else if (params.category && categoryKeywords[params.category]) {
    searchKeywords = categoryKeywords[params.category];
  }

  // Build query
  let query = supabase
    .from("supplier_products")
    .select("*", { count: "exact" });

  // Category/subcategory filter using keyword search
  if (searchKeywords.length > 0) {
    // Build OR conditions for each keyword
    const orConditions = searchKeywords
      .map(keyword => `name.ilike.%${keyword}%`)
      .join(",");
    query = query.or(orConditions);
  }

  // Other filters
  if (params.inStock === "true") {
    query = query.eq("in_stock", true);
  }

  if (params.model) {
    query = query.or(
      `compatibility_models.cs.{${params.model.toUpperCase()}},name.ilike.%${params.model}%`
    );
  }

  if (params.q) {
    query = query.ilike("name", `%${params.q}%`);
  }

  // Pagination and ordering
  query = query
    .range(offset, offset + limit - 1)
    .order("in_stock", { ascending: false })
    .order("scraped_at", { ascending: false });

  const { data: products, count } = await query;

  const totalPages = Math.ceil((count || 0) / limit);

  // Get stats (only when no filters)
  const showStats = !params.category && !params.subcategory && !params.q;
  let stats = null;
  if (showStats) {
    const { data: statsData } = await supabase
      .from("supplier_products")
      .select("in_stock")
      .then(({ data }) => {
        if (!data) return { data: null };
        const total = data.length;
        const inStock = data.filter((p) => p.in_stock).length;
        return { data: { total, inStock } };
      });
    stats = statsData;
  }

  // Build page title
  const pageTitle = params.subcategory
    ? categoryNames[params.subcategory] || params.subcategory
    : params.category
    ? categoryNames[params.category] || params.category
    : "All Products";

  // Build pagination URL params
  const buildPaginationUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();
    urlParams.set("page", newPage.toString());
    if (params.q) urlParams.set("q", params.q);
    if (params.model) urlParams.set("model", params.model);
    if (params.inStock) urlParams.set("inStock", params.inStock);
    if (params.category) urlParams.set("category", params.category);
    if (params.subcategory) urlParams.set("subcategory", params.subcategory);
    return `/supplier-products?${urlParams.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      {(params.category || params.subcategory) && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/supplier-products" className="hover:text-foreground">
            All Products
          </Link>
          {params.category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/supplier-products?category=${params.category}`}
                className={params.subcategory ? "hover:text-foreground" : "text-foreground font-medium"}
              >
                {categoryNames[params.category] || params.category}
              </Link>
            </>
          )}
          {params.subcategory && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">
                {categoryNames[params.subcategory] || params.subcategory}
              </span>
            </>
          )}
        </nav>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-muted-foreground">
          {showStats && stats
            ? `Browse ${stats.total.toLocaleString()} premium BMW parts. ${stats.inStock.toLocaleString()} in stock.`
            : `${count?.toLocaleString() || 0} products found`}
        </p>
      </div>

      {/* Mobile Filter Button */}
      <div className="mb-4">
        <MobileFilterDrawer
          params={params}
          categoryStructure={categoryStructure.map(c => ({
            id: c.id,
            name: c.name,
            icon: c.icon,
            subcategories: c.subcategories,
          }))}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Category Filters (Desktop only) */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search & Filters */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-4">Filters</h3>
              <form className="space-y-4" action="/supplier-products">
                {/* Preserve category/subcategory in form */}
                {params.category && (
                  <input type="hidden" name="category" value={params.category} />
                )}
                {params.subcategory && (
                  <input type="hidden" name="subcategory" value={params.subcategory} />
                )}
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Search</label>
                  <input
                    type="text"
                    name="q"
                    placeholder="Search products..."
                    defaultValue={params.q}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">BMW Model</label>
                  <input
                    type="text"
                    name="model"
                    placeholder="e.g., F30, E46"
                    defaultValue={params.model}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="inStock"
                    value="true"
                    defaultChecked={params.inStock === "true"}
                    className="rounded"
                  />
                  In Stock Only
                </label>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-m-blue text-white rounded-lg hover:bg-m-blue-dark text-sm font-medium"
                >
                  Apply Filters
                </button>
              </form>
            </div>

            {/* Category Navigation */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-4">Categories</h3>
              <nav className="space-y-1">
                <Link
                  href="/supplier-products"
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    !params.category && !params.subcategory
                      ? "bg-m-blue/10 text-m-blue font-medium"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  All Products
                </Link>

                {categoryStructure.map((category) => {
                  const isActive = params.category === category.id;
                  const hasActiveSubcategory = category.subcategories.some(
                    (sub) => params.subcategory === sub.id
                  );
                  const isExpanded = isActive || hasActiveSubcategory;

                  return (
                    <div key={category.id}>
                      <Link
                        href={`/supplier-products?category=${category.id}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive && !params.subcategory
                            ? "bg-m-blue/10 text-m-blue font-medium"
                            : "hover:bg-secondary text-foreground"
                        }`}
                      >
                        <category.Icon className="h-4 w-4" />
                        <span className="flex-1">{category.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/supplier-products?category=${category.id}&subcategory=${sub.id}`}
                              className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                params.subcategory === sub.id
                                  ? "bg-m-blue/10 text-m-blue font-medium"
                                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {products?.length || 0} of {count?.toLocaleString() || 0} products
          </p>

          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((product) => (
              <SupplierProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty state */}
          {(!products || products.length === 0) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
              {(params.category || params.subcategory) && (
                <Link
                  href="/supplier-products"
                  className="inline-block mt-4 text-m-blue hover:underline"
                >
                  View all products
                </Link>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {page > 1 && (
                <Link
                  href={buildPaginationUrl(page - 1)}
                  className="px-4 py-2 border rounded-lg hover:bg-secondary"
                >
                  Previous
                </Link>
              )}
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={buildPaginationUrl(page + 1)}
                  className="px-4 py-2 border rounded-lg hover:bg-secondary"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
