import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// BMW chassis codes - comprehensive list
const BMW_CHASSIS_CODES = [
  // 1 Series
  "E81", "E82", "E87", "E88", "F20", "F21", "F40", "F44",
  // 2 Series
  "F22", "F23", "F45", "F46", "G42", "G44",
  // 3 Series
  "E21", "E30", "E36", "E46", "E90", "E91", "E92", "E93", "F30", "F31", "F34", "F35", "G20", "G21", "G28",
  // 4 Series
  "F32", "F33", "F36", "G22", "G23", "G26",
  // 5 Series
  "E12", "E28", "E34", "E39", "E60", "E61", "F07", "F10", "F11", "G30", "G31", "G38",
  // 6 Series
  "E24", "E63", "E64", "F06", "F12", "F13", "G32",
  // 7 Series
  "E23", "E32", "E38", "E65", "E66", "F01", "F02", "G11", "G12",
  // 8 Series
  "E31", "G14", "G15", "G16",
  // X Series
  "E53", "E70", "E71", "E72", "E83", "E84", "F15", "F16", "F25", "F26", "F39", "F48", "G01", "G02", "G05", "G06", "G07",
  // Z Series
  "E36/7", "E36/8", "E52", "E85", "E86", "E89", "G29",
  // M Cars
  "F80", "F82", "F83", "F87", "G80", "G82", "G87",
];

// Model names/codes to also look for
const BMW_MODEL_PATTERNS = [
  // Series patterns
  "1 series", "2 series", "3 series", "4 series", "5 series", "6 series", "7 series", "8 series",
  "1-series", "2-series", "3-series", "4-series", "5-series", "6-series", "7-series", "8-series",
  // X models
  "x1", "x2", "x3", "x4", "x5", "x6", "x7",
  // Z models
  "z3", "z4", "z8",
  // M models
  "m2", "m3", "m4", "m5", "m6", "m8",
  // Specific models
  "318i", "320i", "323i", "325i", "328i", "330i", "335i", "340i",
  "116i", "118i", "120i", "125i", "130i", "135i", "140i",
  "520i", "523i", "525i", "528i", "530i", "535i", "540i", "545i", "550i",
  "420i", "428i", "430i", "435i", "440i",
  "m135i", "m140i", "m235i", "m240i", "m340i", "m440i", "m550i",
];

function extractChassisCodesFromName(name: string): string[] {
  const foundCodes: Set<string> = new Set();
  const upperName = name.toUpperCase();
  const lowerName = name.toLowerCase();

  // Look for chassis codes (E30, F30, G20, etc.)
  for (const code of BMW_CHASSIS_CODES) {
    const upperCode = code.toUpperCase();
    // Match exact code with word boundaries
    const regex = new RegExp(`\\b${upperCode.replace("/", "\\/")}\\b`, "i");
    if (regex.test(name)) {
      foundCodes.add(upperCode);
    }
  }

  // Also check for patterns like "E90/91/92/93" or "E90/E91/E92"
  const slashPattern = /\b([EFG]\d{1,2})(?:\/(?:[EFG]?\d{1,2}))+\b/gi;
  const slashMatches = name.matchAll(slashPattern);
  for (const match of slashMatches) {
    const fullMatch = match[0].toUpperCase();
    // Split by / and expand
    const parts = fullMatch.split("/");
    const prefix = parts[0].match(/^[EFG]/)?.[0] || "";
    for (const part of parts) {
      const cleanPart = part.trim();
      if (/^[EFG]\d{1,2}$/.test(cleanPart)) {
        foundCodes.add(cleanPart);
      } else if (/^\d{1,2}$/.test(cleanPart) && prefix) {
        foundCodes.add(prefix + cleanPart);
      }
    }
  }

  // Look for model patterns
  for (const pattern of BMW_MODEL_PATTERNS) {
    if (lowerName.includes(pattern)) {
      // Map model patterns to common chassis codes if needed
      foundCodes.add(pattern.toUpperCase().replace("-", " "));
    }
  }

  return Array.from(foundCodes);
}

export async function POST(request: Request) {
  try {
    const { authorization } = Object.fromEntries(request.headers);

    // Simple auth check - in production, use proper authentication
    const adminKey = process.env.ADMIN_API_KEY;
    if (adminKey && authorization !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // Fetch all products
    const { data: products, error } = await supabase
      .from("supplier_products")
      .select("id, name, compatibility_models");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let updated = 0;
    let skipped = 0;
    const updates: { id: string; name: string; models: string[] }[] = [];

    for (const product of products || []) {
      const extractedCodes = extractChassisCodesFromName(product.name);

      if (extractedCodes.length > 0) {
        // Merge with existing codes, excluding placeholder "R"
        const existingCodes = (product.compatibility_models || []).filter(
          (c: string) => c !== "R" && c.length > 1
        );
        const mergedCodes = Array.from(new Set([...existingCodes, ...extractedCodes]));

        // Only update if there are new codes
        const hasNewCodes = extractedCodes.some(code => !existingCodes.includes(code));

        if (hasNewCodes || existingCodes.length === 0) {
          updates.push({
            id: product.id,
            name: product.name,
            models: mergedCodes,
          });
        } else {
          skipped++;
        }
      } else {
        skipped++;
      }
    }

    // Batch update products
    for (const update of updates) {
      const { error: updateError } = await supabase
        .from("supplier_products")
        .update({ compatibility_models: update.models })
        .eq("id", update.id);

      if (!updateError) {
        updated++;
      }
    }

    return NextResponse.json({
      success: true,
      total: products?.length || 0,
      updated,
      skipped,
      sampleUpdates: updates.slice(0, 10).map(u => ({
        name: u.name,
        extractedModels: u.models,
      })),
    });
  } catch (error) {
    console.error("Parse fitment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to preview without updating
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    // Fetch sample products
    const { data: products, error } = await supabase
      .from("supplier_products")
      .select("id, name, compatibility_models")
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const previews = (products || []).map(product => ({
      name: product.name,
      currentModels: product.compatibility_models,
      extractedModels: extractChassisCodesFromName(product.name),
    }));

    return NextResponse.json({
      total: products?.length || 0,
      previews,
    });
  } catch (error) {
    console.error("Parse fitment preview error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
