import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  // Query params
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const inStock = searchParams.get("inStock") === "true";
  const source = searchParams.get("source"); // autostyle | carbon-sport
  const model = searchParams.get("model"); // BMW model code: F30, E46, etc.
  const category = searchParams.get("category");
  const search = searchParams.get("q");

  const offset = (page - 1) * limit;

  // Build query
  let query = supabase.from("supplier_products").select("*", { count: "exact" });

  if (inStock) {
    query = query.eq("in_stock", true);
  }

  if (source) {
    query = query.eq("source", source);
  }

  if (model) {
    query = query.contains("compatibility_models", [model.toUpperCase()]);
  }

  if (category) {
    query = query.eq("primary_category", category);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  // Pagination
  query = query.range(offset, offset + limit - 1).order("scraped_at", { ascending: false });

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    products: data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}
