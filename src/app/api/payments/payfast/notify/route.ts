import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyPayFastPayment } from "@/lib/payments/payfast";
import { sendOrderConfirmationEmail } from "@/lib/email";

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

    // Get the full order with all details
    const { data: order } = await supabase
      .from("orders")
      .select("*")
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

      // Send order confirmation email
      try {
        const shippingAddress = order.shipping_address as {
          street: string;
          city: string;
          province: string;
          postalCode: string;
          firstName?: string;
          lastName?: string;
        };

        await sendOrderConfirmationEmail({
          orderNumber: order.order_number,
          customerName: shippingAddress.firstName || order.email.split("@")[0],
          customerEmail: order.email,
          items: order.items,
          subtotal: order.subtotal,
          shipping: order.shipping,
          total: order.total,
          shippingAddress: {
            street: shippingAddress.street,
            city: shippingAddress.city,
            province: shippingAddress.province,
            postalCode: shippingAddress.postalCode,
          },
          shippingMethod: order.shipping_method === "express" ? "Express" : "Standard",
          paymentMethod: "PayFast",
        });
        console.log(`Order confirmation email sent for ${orderNumber}`);
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
        // Don't fail the webhook because of email error
      }

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
