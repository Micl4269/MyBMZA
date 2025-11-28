import { createClient } from "@/lib/supabase/server";
import { SupplierProductCard } from "@/components/product/supplier-product-card";

interface SearchParams {
  page?: string;
  q?: string;
  source?: string;
  model?: string;
  inStock?: string;
}

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

  // Build query
  let query = supabase
    .from("supplier_products")
    .select("*", { count: "exact" });

  // Filters
  if (params.inStock === "true") {
    query = query.eq("in_stock", true);
  }

  if (params.source) {
    query = query.eq("source", params.source);
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

  // Get stats
  const { data: stats } = await supabase
    .from("supplier_products")
    .select("source, in_stock")
    .then(({ data }) => {
      if (!data) return { data: null };
      const total = data.length;
      const inStock = data.filter((p) => p.in_stock).length;
      const autostyle = data.filter((p) => p.source === "autostyle").length;
      const carbonSport = data.filter((p) => p.source === "carbon-sport").length;
      return { data: { total, inStock, autostyle, carbonSport } };
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supplier Products</h1>
        <p className="text-muted-foreground">
          Browse {stats?.total.toLocaleString() || 0} products from our suppliers.{" "}
          {stats?.inStock.toLocaleString() || 0} in stock.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <form className="flex gap-2 flex-wrap" action="/supplier-products">
          <input
            type="text"
            name="q"
            placeholder="Search products..."
            defaultValue={params.q}
            className="px-3 py-2 border rounded-lg bg-background"
          />
          <select
            name="source"
            defaultValue={params.source || ""}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="">All Sources</option>
            <option value="autostyle">Autostyle</option>
            <option value="carbon-sport">Carbon Sport</option>
          </select>
          <input
            type="text"
            name="model"
            placeholder="BMW Model (e.g., F30, E46)"
            defaultValue={params.model}
            className="px-3 py-2 border rounded-lg bg-background"
          />
          <label className="flex items-center gap-2 px-3 py-2">
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
            className="px-4 py-2 bg-m-blue text-white rounded-lg hover:bg-m-blue/90"
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
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <a
              href={`/supplier-products?page=${page - 1}&q=${params.q || ""}&source=${params.source || ""}&model=${params.model || ""}&inStock=${params.inStock || ""}`}
              className="px-4 py-2 border rounded-lg hover:bg-secondary"
            >
              Previous
            </a>
          )}
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <a
              href={`/supplier-products?page=${page + 1}&q=${params.q || ""}&source=${params.source || ""}&model=${params.model || ""}&inStock=${params.inStock || ""}`}
              className="px-4 py-2 border rounded-lg hover:bg-secondary"
            >
              Next
            </a>
          )}
        </div>
      )}
    </div>
  );
}
