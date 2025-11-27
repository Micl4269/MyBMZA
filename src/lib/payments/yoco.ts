interface YocoPaymentData {
  orderId: string;
  amount: number; // in cents
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
}

interface YocoCheckoutSession {
  id: string;
  redirectUrl: string;
}

const YOCO_API_URL = "https://payments.yoco.com/api";

export async function createYocoCheckout(
  data: YocoPaymentData
): Promise<YocoCheckoutSession> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetch(`${YOCO_API_URL}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
    },
    body: JSON.stringify({
      amount: data.amount, // Yoco expects amount in cents
      currency: data.currency || "ZAR",
      successUrl: `${siteUrl}/checkout/success?order=${data.orderId}`,
      cancelUrl: `${siteUrl}/checkout?cancelled=true`,
      failureUrl: `${siteUrl}/checkout?failed=true`,
      metadata: {
        orderId: data.orderId,
        ...data.metadata,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create Yoco checkout");
  }

  return response.json();
}

export async function verifyYocoPayment(checkoutId: string): Promise<{
  status: "complete" | "pending" | "failed";
  amount: number;
  metadata: Record<string, string>;
}> {
  const response = await fetch(`${YOCO_API_URL}/checkouts/${checkoutId}`, {
    headers: {
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to verify Yoco payment");
  }

  const checkout = await response.json();

  return {
    status: checkout.status,
    amount: checkout.amount,
    metadata: checkout.metadata,
  };
}

// Yoco inline checkout configuration for client-side
export function getYocoInlineConfig(publicKey: string) {
  return {
    publicKey,
    currency: "ZAR",
    locale: "en",
  };
}
