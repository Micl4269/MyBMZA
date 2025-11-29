import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendOrderVerificationCode } from "@/lib/email";

// Generate a 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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
      .select("id, email, order_number")
      .eq("order_number", orderNumber)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Generate verification code with 10 minute expiry
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store verification code in the order record
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        verification_code: code,
        verification_expires: expiresAt,
      })
      .eq("id", order.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to generate verification code" },
        { status: 500 }
      );
    }

    // Send verification email
    try {
      await sendOrderVerificationCode(order.email, orderNumber, code);
    } catch {
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
  } catch {
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

    const supabase = await createClient();

    // Get order with verification code
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

    // Check if verification code exists
    if (!order.verification_code || !order.verification_expires) {
      return NextResponse.json(
        { error: "Verification code expired or not found. Please request a new code." },
        { status: 400 }
      );
    }

    // Check if code has expired
    if (new Date(order.verification_expires) < new Date()) {
      // Clear expired code
      await supabase
        .from("orders")
        .update({ verification_code: null, verification_expires: null })
        .eq("id", order.id);

      return NextResponse.json(
        { error: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    // Check if code matches
    if (order.verification_code !== code) {
      return NextResponse.json(
        { error: "Invalid verification code. Please check and try again." },
        { status: 400 }
      );
    }

    // Code is valid - clear it (one-time use)
    await supabase
      .from("orders")
      .update({ verification_code: null, verification_expires: null })
      .eq("id", order.id);

    // Fetch status history
    const { data: statusHistory } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    // Remove verification fields from response
    const { verification_code: _vc, verification_expires: _ve, ...orderData } = order;

    return NextResponse.json({
      success: true,
      verified: true,
      order: {
        ...orderData,
        status_history: statusHistory || [],
      },
    });
  } catch {
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
