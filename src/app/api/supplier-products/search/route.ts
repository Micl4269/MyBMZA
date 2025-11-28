import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const model = searchParams.get("model");
  const q = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "50");

  if (!model && !q) {
    return NextResponse.json(
      { error: "Provide either 'model' (BMW chassis code) or 'q' (search term)" },
      { status: 400 }
    );
  }

  let query = supabase
    .from("supplier_products")
    .select("*")
    .eq("in_stock", true);

  if (model) {
    // Search by BMW model code (E30, F30, G20, etc.)
    query = query.or(`compatibility_models.cs.{${model.toUpperCase()}},name.ilike.%${model}%`);
  }

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  query = query.order("price", { ascending: true }).limit(limit);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    products: data,
    count: data?.length || 0,
  });
}
