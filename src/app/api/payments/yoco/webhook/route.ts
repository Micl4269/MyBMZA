import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendOrderConfirmationEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("yoco-signature");

    // Verify webhook signature
    if (signature && process.env.YOCO_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.YOCO_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Yoco webhook signature mismatch");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    const supabase = await createClient();

    switch (event.type) {
      case "checkout.complete": {
        const { metadata, id: checkoutId } = event.payload;
        const orderNumber = metadata?.orderNumber;

        if (orderNumber) {
          // Get the full order with all details
          const { data: order } = await supabase
            .from("orders")
            .select("*")
            .eq("order_number", orderNumber)
            .single();

          if (order) {
            // Update order status
            await supabase
              .from("orders")
              .update({
                payment_status: "paid",
                status: "confirmed",
                payment_id: checkoutId,
              })
              .eq("id", order.id);

            // Add to status history
            await supabase.from("order_status_history").insert({
              order_id: order.id,
              status: "confirmed",
              notes: `Payment received via Yoco (${checkoutId})`,
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
                paymentMethod: "Yoco",
              });
              console.log(`Order confirmation email sent for ${orderNumber}`);
            } catch (emailError) {
              console.error("Failed to send order confirmation email:", emailError);
              // Don't fail the webhook because of email error
            }

            console.log(`Yoco payment complete for order ${orderNumber}`);
          }
        }
        break;
      }

      case "checkout.failed": {
        const { metadata, id: checkoutId } = event.payload;
        const orderNumber = metadata?.orderNumber;

        if (orderNumber) {
          const { data: order } = await supabase
            .from("orders")
            .select("id")
            .eq("order_number", orderNumber)
            .single();

          if (order) {
            await supabase
              .from("orders")
              .update({
                payment_status: "failed",
              })
              .eq("id", order.id);

            await supabase.from("order_status_history").insert({
              order_id: order.id,
              status: "pending",
              notes: `Payment failed via Yoco (${checkoutId})`,
            });

            console.log(`Yoco payment failed for order ${orderNumber}`);
          }
        }
        break;
      }

      default:
        console.log("Unhandled Yoco event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Yoco webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
