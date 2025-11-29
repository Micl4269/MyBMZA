import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { createPayFastPayment } from "@/lib/payments/payfast";
import { createYocoCheckout } from "@/lib/payments/yoco";

// Generate order number
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MBZ-${dateStr}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      email,
      phone,
      firstName,
      lastName,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      shippingMethod,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!email || !items || items.length === 0 || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate stock availability for supplier products
    const supplierProductIds = items
      .filter((item: { productType: string }) => item.productType === "supplier")
      .map((item: { productId: string }) => item.productId);

    if (supplierProductIds.length > 0) {
      const { data: stockData, error: stockError } = await supabase
        .from("supplier_products")
        .select("id, name, in_stock")
        .in("id", supplierProductIds);

      if (stockError) {
        console.error("Error checking stock:", stockError);
        return NextResponse.json(
          { error: "Failed to verify product availability" },
          { status: 500 }
        );
      }

      // Find out-of-stock items
      const outOfStockItems = stockData?.filter((product) => !product.in_stock) || [];

      if (outOfStockItems.length > 0) {
        const outOfStockNames = outOfStockItems
          .map((item) => item.name?.replace(/&#\d+;/g, "") || "Unknown product")
          .join(", ");

        return NextResponse.json(
          {
            error: "Some items are out of stock",
            outOfStockItems: outOfStockItems.map((item) => ({
              id: item.id,
              name: item.name?.replace(/&#\d+;/g, "") || "Unknown product",
            })),
            message: `The following items are no longer available: ${outOfStockNames}. Please remove them from your cart and try again.`,
          },
          { status: 400 }
        );
      }
    }

    // Check if customer exists, create if not
    let customerId = null;
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update customer info
      await supabase
        .from("customers")
        .update({
          phone,
          first_name: firstName,
          last_name: lastName,
          default_shipping_address: shippingAddress,
        })
        .eq("id", customerId);
    } else {
      const { data: newCustomer } = await supabase
        .from("customers")
        .insert({
          email,
          phone,
          first_name: firstName,
          last_name: lastName,
          default_shipping_address: shippingAddress,
        })
        .select("id")
        .single();

      if (newCustomer) {
        customerId = newCustomer.id;
      }
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

    if (orderError || !order) {
      console.error("Error creating order:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Add initial status to history
    await supabase.from("order_status_history").insert({
      order_id: order.id,
      status: "pending",
      notes: "Order created, awaiting payment",
    });

    // Generate payment URL based on method
    let paymentUrl = "";
    let paymentData = {};

    if (paymentMethod === "payfast") {
      const itemNames = items.map((item: { name: string }) => item.name).join(", ");
      const truncatedItemName = itemNames.length > 100
        ? itemNames.substring(0, 97) + "..."
        : itemNames;

      const payfastPayment = createPayFastPayment({
        orderId: order.order_number,
        amount: total,
        itemName: truncatedItemName,
        email,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
      });

      paymentUrl = payfastPayment.url;
      paymentData = payfastPayment.params;
    } else if (paymentMethod === "yoco") {
      try {
        const yocoCheckout = await createYocoCheckout({
          orderId: order.order_number,
          amount: Math.round(total * 100), // Yoco expects cents
          description: `Order ${order.order_number}`,
          metadata: {
            orderNumber: order.order_number,
            email,
          },
        });

        paymentUrl = yocoCheckout.redirectUrl;

        // Store Yoco checkout ID
        await supabase
          .from("orders")
          .update({ payment_id: yocoCheckout.id })
          .eq("id", order.id);
      } catch (yocoError) {
        console.error("Yoco checkout error:", yocoError);
        return NextResponse.json(
          { error: "Failed to create payment session" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        total: order.total,
      },
      payment: {
        method: paymentMethod,
        url: paymentUrl,
        data: paymentData,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
