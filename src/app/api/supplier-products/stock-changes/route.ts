import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const days = parseInt(searchParams.get("days") || "7");
  const type = searchParams.get("type"); // stock_change | price_change
  const limit = parseInt(searchParams.get("limit") || "100");

  // Use the view for recent changes
  let query = supabase.from("recent_stock_changes").select("*");

  if (type) {
    query = query.eq("change_type", type);
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    // Fallback to direct query if view doesn't exist
    let fallbackQuery = supabase
      .from("supplier_stock_changes")
      .select(`
        *,
        supplier_products!inner (
          name,
          source,
          source_url
        )
      `)
      .gte("changed_at", new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (type) {
      fallbackQuery = fallbackQuery.eq("change_type", type);
    }

    fallbackQuery = fallbackQuery.order("changed_at", { ascending: false }).limit(limit);

    const fallbackResult = await fallbackQuery;

    if (fallbackResult.error) {
      return NextResponse.json({ error: fallbackResult.error.message }, { status: 500 });
    }

    return NextResponse.json({
      changes: fallbackResult.data,
      count: fallbackResult.data?.length || 0,
    });
  }

  return NextResponse.json({
    changes: data,
    count: data?.length || 0,
  });
}
