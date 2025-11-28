import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyPayFastPayment } from "@/lib/payments/payfast";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pfData: Record<string, string> = {};

    formData.forEach((value, key) => {
      pfData[key] = value.toString();
    });

    // Create parameter string for verification
    const pfParamString = new URLSearchParams(pfData).toString();

    // Verify the payment
    const isValid = await verifyPayFastPayment(pfData, pfParamString);

    if (!isValid) {
      console.error("PayFast payment verification failed");
      return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
    }

    const supabase = await createClient();
    const orderNumber = pfData.m_payment_id;
    const paymentStatus = pfData.payment_status;

    // Get the order
    const { data: order } = await supabase
      .from("orders")
      .select("id, status")
      .eq("order_number", orderNumber)
      .single();

    if (!order) {
      console.error(`Order not found: ${orderNumber}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update based on payment status
    if (paymentStatus === "COMPLETE") {
      // Payment successful
      await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          status: "confirmed",
          payment_id: pfData.pf_payment_id,
        })
        .eq("id", order.id);

      // Add to status history
      await supabase.from("order_status_history").insert({
        order_id: order.id,
        status: "confirmed",
        notes: `Payment received via PayFast (${pfData.pf_payment_id})`,
      });

      console.log(`Payment complete for order ${orderNumber}`);
    } else if (paymentStatus === "CANCELLED") {
      // Payment cancelled
      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
          status: "cancelled",
        })
        .eq("id", order.id);

      await supabase.from("order_status_history").insert({
        order_id: order.id,
        status: "cancelled",
        notes: "Payment cancelled by customer",
      });

      console.log(`Payment cancelled for order ${orderNumber}`);
    } else if (paymentStatus === "FAILED") {
      // Payment failed
      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
        })
        .eq("id", order.id);

      await supabase.from("order_status_history").insert({
        order_id: order.id,
        status: "pending",
        notes: `Payment failed: ${pfData.reason || "Unknown reason"}`,
      });

      console.log(`Payment failed for order ${orderNumber}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayFast notification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
