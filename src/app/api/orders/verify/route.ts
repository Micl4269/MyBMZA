import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendOrderVerificationCode } from "@/lib/email";

// Generate a 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store verification codes temporarily (in production, use Redis or database)
// This is a simple in-memory store - codes expire after 10 minutes
const verificationCodes: Map<string, { code: string; email: string; expires: number }> = new Map();

// Clean up expired codes periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of verificationCodes.entries()) {
    if (value.expires < now) {
      verificationCodes.delete(key);
    }
  }
}, 60000); // Clean every minute

// POST: Send verification code
export async function POST(request: NextRequest) {
  try {
    const { orderNumber } = await request.json();

    if (!orderNumber) {
      return NextResponse.json(
        { error: "Order number is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get order email
    const { data: order, error } = await supabase
      .from("orders")
      .select("email, order_number")
      .eq("order_number", orderNumber)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Generate and store verification code
    const code = generateVerificationCode();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    verificationCodes.set(orderNumber, {
      code,
      email: order.email,
      expires,
    });

    // Send verification email
    try {
      await sendOrderVerificationCode(order.email, orderNumber, code);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    // Return masked email for UI
    const maskedEmail = maskEmail(order.email);

    return NextResponse.json({
      success: true,
      maskedEmail,
      message: `Verification code sent to ${maskedEmail}`,
    });
  } catch (error) {
    console.error("Verification send error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Verify code and return order
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");
    const code = searchParams.get("code");

    if (!orderNumber || !code) {
      return NextResponse.json(
        { error: "Order number and verification code are required" },
        { status: 400 }
      );
    }

    // Check verification code
    const storedData = verificationCodes.get(orderNumber);

    if (!storedData) {
      return NextResponse.json(
        { error: "Verification code expired or not found. Please request a new code." },
        { status: 400 }
      );
    }

    if (storedData.expires < Date.now()) {
      verificationCodes.delete(orderNumber);
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (storedData.code !== code) {
      return NextResponse.json(
        { error: "Invalid verification code. Please check and try again." },
        { status: 400 }
      );
    }

    // Code is valid - delete it (one-time use)
    verificationCodes.delete(orderNumber);

    // Fetch full order details
    const supabase = await createClient();
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

    // Fetch status history
    const { data: statusHistory } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    return NextResponse.json({
      success: true,
      verified: true,
      order: {
        ...order,
        status_history: statusHistory || [],
      },
    });
  } catch (error) {
    console.error("Verification check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper to mask email
function maskEmail(email: string): string {
  const [username, domain] = email.split("@");
  const maskedUsername =
    username.length > 2
      ? username[0] + "*".repeat(username.length - 2) + username[username.length - 1]
      : username;
  return `${maskedUsername}@${domain}`;
}
