import crypto from "crypto";

interface PayFastPaymentData {
  orderId: string;
  amount: number;
  itemName: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface PayFastParams {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
  signature?: string;
}

const PAYFAST_URL =
  process.env.PAYFAST_SANDBOX === "true"
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";

export function generatePayFastSignature(data: Record<string, string>, passPhrase?: string): string {
  // Create parameter string
  let pfOutput = "";
  for (const key in data) {
    if (data.hasOwnProperty(key) && key !== "signature") {
      pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`;
    }
  }

  // Remove last ampersand
  pfOutput = pfOutput.slice(0, -1);

  // Add passphrase if provided
  if (passPhrase) {
    pfOutput += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(pfOutput).digest("hex");
}

export function createPayFastPayment(data: PayFastPaymentData): { url: string; params: PayFastParams } {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const params: PayFastParams = {
    merchant_id: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "",
    merchant_key: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "",
    return_url: `${siteUrl}/checkout/success?order=${data.orderId}`,
    cancel_url: `${siteUrl}/checkout?cancelled=true`,
    notify_url: `${siteUrl}/api/payments/payfast/notify`,
    name_first: data.firstName,
    name_last: data.lastName,
    email_address: data.email,
    m_payment_id: data.orderId,
    amount: data.amount.toFixed(2),
    item_name: data.itemName,
  };

  // Generate signature
  const signature = generatePayFastSignature(
    params as unknown as Record<string, string>,
    process.env.PAYFAST_PASSPHRASE
  );
  params.signature = signature;

  return {
    url: PAYFAST_URL,
    params,
  };
}

export async function verifyPayFastPayment(
  pfData: Record<string, string>,
  pfParamString: string
): Promise<boolean> {
  // Verify signature
  const signature = generatePayFastSignature(pfData, process.env.PAYFAST_PASSPHRASE);
  if (signature !== pfData.signature) {
    console.error("PayFast signature mismatch");
    return false;
  }

  // Verify with PayFast server
  const verifyUrl =
    process.env.PAYFAST_SANDBOX === "true"
      ? "https://sandbox.payfast.co.za/eng/query/validate"
      : "https://www.payfast.co.za/eng/query/validate";

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: pfParamString,
    });

    const result = await response.text();
    return result === "VALID";
  } catch (error) {
    console.error("PayFast verification error:", error);
    return false;
  }
}
