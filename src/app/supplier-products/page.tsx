import { createClient } from "@/lib/supabase/server";
import { SupplierProductCard } from "@/components/product/supplier-product-card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-muted-foreground">
          {showStats && stats
            ? `Browse ${stats.total.toLocaleString()} premium BMW parts. ${stats.inStock.toLocaleString()} in stock.`
            : `${count?.toLocaleString() || 0} products found`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <form className="flex gap-2 flex-wrap" action="/supplier-products">
          {/* Preserve category/subcategory in form */}
          {params.category && (
            <input type="hidden" name="category" value={params.category} />
          )}
          {params.subcategory && (
            <input type="hidden" name="subcategory" value={params.subcategory} />
          )}
          <input
            type="text"
            name="q"
            placeholder="Search products..."
            defaultValue={params.q}
            className="px-3 py-2 border rounded-lg bg-background text-foreground"
          />
          <input
            type="text"
            name="model"
            placeholder="BMW Model (e.g., F30, E46)"
            defaultValue={params.model}
            className="px-3 py-2 border rounded-lg bg-background text-foreground"
          />
          <label className="flex items-center gap-2 px-3 py-2 text-foreground">
            <input
              type="checkbox"
              name="inStock"
              value="true"
              defaultChecked={params.inStock === "true"}
            />
            In Stock Only
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-m-blue text-white rounded-lg hover:bg-m-blue-dark"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {products?.length || 0} of {count?.toLocaleString() || 0} products
      </p>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
    </div>
  );
}
