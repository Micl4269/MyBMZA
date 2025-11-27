import { NextRequest, NextResponse } from "next/server";
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

    // Check payment status
    if (pfData.payment_status === "COMPLETE") {
      const orderId = pfData.m_payment_id;
      const amount = parseFloat(pfData.amount_gross);

      // TODO: Update order status in Supabase
      // const { error } = await supabase
      //   .from('orders')
      //   .update({
      //     payment_status: 'paid',
      //     status: 'confirmed'
      //   })
      //   .eq('id', orderId);

      console.log(`Payment complete for order ${orderId}: R${amount}`);
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
