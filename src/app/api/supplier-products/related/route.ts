import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const limit = parseInt(searchParams.get("limit") || "4");
  const exclude = searchParams.get("exclude");
  const category = searchParams.get("category");
  const model = searchParams.get("model");

  // Build query for related products
  let query = supabase
    .from("supplier_products")
    .select("*")
    .eq("in_stock", true)
    .limit(limit);

  // Exclude current product
  if (exclude) {
    query = query.neq("id", exclude);
  }

  // Try to match by category keywords in name
  if (category) {
    // Extract key words from category for matching
    const keywords = category.toLowerCase().split(/[\s,&]+/).filter(w => w.length > 2);
    if (keywords.length > 0) {
      const orConditions = keywords.map(kw => `name.ilike.%${kw}%`).join(",");
      query = query.or(orConditions);
    }
  }

  // Or match by compatibility model
  if (model && !category) {
    query = query.or(
      `compatibility_models.cs.{${model.toUpperCase()}},name.ilike.%${model}%`
    );
  }

  // Order by newest first, then fall back to random if no matches
  query = query.order("scraped_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error("Related products error:", error);
    return NextResponse.json({ products: [] });
  }

  // If we didn't get enough products, fetch more random ones
  if (!data || data.length < limit) {
    const remaining = limit - (data?.length || 0);
    const existingIds = data?.map(p => p.id) || [];
    if (exclude) existingIds.push(exclude);

    const { data: moreProducts } = await supabase
      .from("supplier_products")
      .select("*")
      .eq("in_stock", true)
      .not("id", "in", `(${existingIds.join(",")})`)
      .order("scraped_at", { ascending: false })
      .limit(remaining);

    if (moreProducts) {
      return NextResponse.json({
        products: [...(data || []), ...moreProducts],
      });
    }
  }

  return NextResponse.json({ products: data || [] });
}
