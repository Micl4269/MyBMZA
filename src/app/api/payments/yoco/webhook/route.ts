import { NextRequest, NextResponse } from "next/server";
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

    switch (event.type) {
      case "checkout.complete":
        const { metadata, amount } = event.payload;
        const orderId = metadata?.orderId;

        if (orderId) {
          // TODO: Update order status in Supabase
          // const { error } = await supabase
          //   .from('orders')
          //   .update({
          //     payment_status: 'paid',
          //     status: 'confirmed'
          //   })
          //   .eq('id', orderId);

          console.log(`Yoco payment complete for order ${orderId}: R${amount / 100}`);
        }
        break;

      case "checkout.failed":
        console.log("Yoco payment failed:", event.payload);
        break;

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
