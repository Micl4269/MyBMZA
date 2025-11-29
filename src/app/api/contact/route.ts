import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail, sendContactAutoReply } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email to support
    await sendContactFormEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send auto-reply to customer (don't await - non-critical)
    sendContactAutoReply({
      name,
      email,
      phone,
      subject,
      message,
    }).catch((error) => {
      console.error("Failed to send auto-reply:", error);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
