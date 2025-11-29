import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Generate order number
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MBZ-${dateStr}-${random}`;
}

// Create a new order
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      email,
      phone,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      shippingMethod,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!email || !items || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if customer exists, create if not
    let customerId: string | null = null;
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      // Try to create new customer, but don't fail order if customer creation fails
      // (order can still be processed with just email)
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          email,
          phone: phone || null,
          first_name: shippingAddress.firstName || null,
          last_name: shippingAddress.lastName || null,
          default_shipping_address: shippingAddress,
        })
        .select("id")
        .single();

      if (!customerError && newCustomer) {
        customerId = newCustomer.id;
      }
      // Note: If customer creation fails, order proceeds without customer_id
      // Email is still captured on the order itself for communication
    }

    // Create the order
    const orderNumber = generateOrderNumber();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        email,
        phone,
        status: "pending",
        payment_method: paymentMethod,
        payment_status: "pending",
        items,
        subtotal,
        shipping,
        total,
        shipping_address: shippingAddress,
        shipping_method: shippingMethod || "standard",
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Add initial status to history
    await supabase.from("order_status_history").insert({
      order_id: order.id,
      status: "pending",
      notes: "Order created",
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        total: order.total,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get orders (for authenticated users)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      // Get single order by order number
      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderNumber)
        .single();

      if (error || !order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      // Get status history
      const { data: history } = await supabase
        .from("order_status_history")
        .select("*")
        .eq("order_id", order.id)
        .order("created_at", { ascending: false });

      return NextResponse.json({ order, history: history || [] });
    }

    if (email) {
      // Get all orders for email
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (error) {
        return NextResponse.json(
          { error: "Failed to fetch orders" },
          { status: 500 }
        );
      }

      return NextResponse.json({ orders });
    }

    return NextResponse.json(
      { error: "Email or order number required" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
