import { Resend } from "resend";

// Initialize Resend lazily to avoid build-time errors when API key is not set
let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const FROM_EMAIL = process.env.EMAIL_FROM || "MyBMZA <orders@mybmza.co.za>";
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@mybmza.co.za";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  shippingMethod: string;
  paymentMethod: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Format price for emails
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(amount);
}

// Send order confirmation email
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const itemsList = data.items
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - ${formatPrice(item.total)}`
    )
    .join("\n");

  const { data: result, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Order Confirmed - ${data.orderNumber} | MyBMZA`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(90deg, #0066B1, #0077CC, #E30613); height: 4px; border-radius: 4px 4px 0 0;"></div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 24px; font-weight: bold;">My<span style="color: #0066B1;">BM</span>ZA</span>
      </div>

      <!-- Title -->
      <h1 style="color: #18181b; font-size: 24px; margin: 0 0 10px 0; text-align: center;">Order Confirmed!</h1>
      <p style="color: #71717a; text-align: center; margin: 0 0 30px 0;">Thank you for your order, ${data.customerName}!</p>

      <!-- Order Number -->
      <div style="background-color: #f4f4f5; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 30px;">
        <p style="margin: 0; color: #71717a; font-size: 14px;">Order Number</p>
        <p style="margin: 5px 0 0 0; color: #18181b; font-size: 20px; font-weight: bold;">${data.orderNumber}</p>
      </div>

      <!-- Order Items -->
      <h2 style="color: #18181b; font-size: 16px; margin: 0 0 15px 0;">Order Summary</h2>
      <div style="border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
        ${data.items
          .map(
            (item) => `
          <div style="padding: 15px; border-bottom: 1px solid #e4e4e7; display: flex; align-items: center;">
            <div style="flex: 1;">
              <p style="margin: 0; color: #18181b; font-weight: 500;">${item.name}</p>
              <p style="margin: 5px 0 0 0; color: #71717a; font-size: 14px;">Qty: ${item.quantity}</p>
            </div>
            <p style="margin: 0; color: #18181b; font-weight: 500;">${formatPrice(item.total)}</p>
          </div>
        `
          )
          .join("")}

        <!-- Totals -->
        <div style="padding: 15px; background-color: #fafafa;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #71717a;">Subtotal</span>
            <span style="color: #18181b;">${formatPrice(data.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #71717a;">Shipping (${data.shippingMethod})</span>
            <span style="color: #18181b;">${data.shipping === 0 ? "FREE" : formatPrice(data.shipping)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #e4e4e7;">
            <span style="color: #18181b; font-weight: bold;">Total</span>
            <span style="color: #0066B1; font-weight: bold; font-size: 18px;">${formatPrice(data.total)}</span>
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <h2 style="color: #18181b; font-size: 16px; margin: 0 0 15px 0;">Shipping Address</h2>
      <div style="background-color: #f4f4f5; border-radius: 8px; padding: 15px; margin-bottom: 30px;">
        <p style="margin: 0; color: #18181b;">${data.shippingAddress.street}</p>
        <p style="margin: 5px 0 0 0; color: #18181b;">${data.shippingAddress.city}, ${data.shippingAddress.province}</p>
        <p style="margin: 5px 0 0 0; color: #18181b;">${data.shippingAddress.postalCode}</p>
      </div>

      <!-- Track Order Button -->
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://mybmza.co.za"}/orders/${data.orderNumber}"
           style="display: inline-block; background-color: #0066B1; color: #ffffff; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 500;">
          Track Your Order
        </a>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e4e4e7;">
        <p style="color: #71717a; font-size: 14px; margin: 0 0 10px 0;">Questions about your order?</p>
        <a href="mailto:${SUPPORT_EMAIL}" style="color: #0066B1; text-decoration: none;">${SUPPORT_EMAIL}</a>
        <p style="color: #a1a1aa; font-size: 12px; margin: 20px 0 0 0;">© ${new Date().getFullYear()} MyBMZA. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
    text: `
Order Confirmed - ${data.orderNumber}

Thank you for your order, ${data.customerName}!

Order Number: ${data.orderNumber}

Order Summary:
${itemsList}

Subtotal: ${formatPrice(data.subtotal)}
Shipping (${data.shippingMethod}): ${data.shipping === 0 ? "FREE" : formatPrice(data.shipping)}
Total: ${formatPrice(data.total)}

Shipping Address:
${data.shippingAddress.street}
${data.shippingAddress.city}, ${data.shippingAddress.province}
${data.shippingAddress.postalCode}

Track your order: ${process.env.NEXT_PUBLIC_SITE_URL || "https://mybmza.co.za"}/orders/${data.orderNumber}

Questions? Contact us at ${SUPPORT_EMAIL}

© ${new Date().getFullYear()} MyBMZA. All rights reserved.
    `,
  });

  if (error) {
    console.error("Failed to send order confirmation email:", error);
    throw error;
  }

  return result;
}

// Send contact form email to support
export async function sendContactFormEmail(data: ContactFormData) {
  const { data: result, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: SUPPORT_EMAIL,
    replyTo: data.email,
    subject: `Contact Form: ${data.subject}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h1 style="color: #18181b; font-size: 20px; margin: 0 0 20px 0;">New Contact Form Submission</h1>

    <div style="margin-bottom: 15px;">
      <p style="margin: 0; color: #71717a; font-size: 14px;">Name</p>
      <p style="margin: 5px 0 0 0; color: #18181b;">${data.name}</p>
    </div>

    <div style="margin-bottom: 15px;">
      <p style="margin: 0; color: #71717a; font-size: 14px;">Email</p>
      <p style="margin: 5px 0 0 0; color: #18181b;"><a href="mailto:${data.email}" style="color: #0066B1;">${data.email}</a></p>
    </div>

    ${data.phone ? `
    <div style="margin-bottom: 15px;">
      <p style="margin: 0; color: #71717a; font-size: 14px;">Phone</p>
      <p style="margin: 5px 0 0 0; color: #18181b;">${data.phone}</p>
    </div>
    ` : ""}

    <div style="margin-bottom: 15px;">
      <p style="margin: 0; color: #71717a; font-size: 14px;">Subject</p>
      <p style="margin: 5px 0 0 0; color: #18181b;">${data.subject}</p>
    </div>

    <div style="margin-bottom: 15px;">
      <p style="margin: 0; color: #71717a; font-size: 14px;">Message</p>
      <div style="margin: 10px 0 0 0; padding: 15px; background-color: #f4f4f5; border-radius: 8px;">
        <p style="margin: 0; color: #18181b; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e4e4e7;">
      <a href="mailto:${data.email}?subject=Re: ${data.subject}"
         style="display: inline-block; background-color: #0066B1; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
        Reply to Customer
      </a>
    </div>
  </div>
</body>
</html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Subject: ${data.subject}

Message:
${data.message}
    `,
  });

  if (error) {
    console.error("Failed to send contact form email:", error);
    throw error;
  }

  return result;
}

// Send auto-reply to contact form submitter
export async function sendContactAutoReply(data: ContactFormData) {
  const { data: result, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `We received your message - MyBMZA`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(90deg, #0066B1, #0077CC, #E30613); height: 4px; border-radius: 4px 4px 0 0;"></div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 24px; font-weight: bold;">My<span style="color: #0066B1;">BM</span>ZA</span>
      </div>

      <h1 style="color: #18181b; font-size: 24px; margin: 0 0 15px 0;">Thanks for reaching out!</h1>

      <p style="color: #52525b; line-height: 1.6;">Hi ${data.name},</p>

      <p style="color: #52525b; line-height: 1.6;">We've received your message and will get back to you as soon as possible, typically within 24-48 hours during business days.</p>

      <div style="background-color: #f4f4f5; border-radius: 8px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #71717a; font-size: 14px;">Your message:</p>
        <p style="margin: 10px 0 0 0; color: #18181b; font-style: italic;">"${data.message.substring(0, 200)}${data.message.length > 200 ? "..." : ""}"</p>
      </div>

      <p style="color: #52525b; line-height: 1.6;">In the meantime, feel free to browse our latest products!</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://mybmza.co.za"}/supplier-products"
           style="display: inline-block; background-color: #0066B1; color: #ffffff; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 500;">
          Browse Products
        </a>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e4e4e7;">
        <p style="color: #a1a1aa; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} MyBMZA. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
    text: `
Thanks for reaching out!

Hi ${data.name},

We've received your message and will get back to you as soon as possible, typically within 24-48 hours during business days.

Your message:
"${data.message}"

In the meantime, feel free to browse our latest products at ${process.env.NEXT_PUBLIC_SITE_URL || "https://mybmza.co.za"}/supplier-products

© ${new Date().getFullYear()} MyBMZA. All rights reserved.
    `,
  });

  if (error) {
    console.error("Failed to send contact auto-reply:", error);
    // Don't throw - auto-reply is not critical
  }

  return result;
}

// Send order verification code
export async function sendOrderVerificationCode(
  email: string,
  orderNumber: string,
  code: string
) {
  const { data: result, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your verification code - ${code}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(90deg, #0066B1, #0077CC, #E30613); height: 4px; border-radius: 4px 4px 0 0;"></div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 24px; font-weight: bold;">My<span style="color: #0066B1;">BM</span>ZA</span>
      </div>

      <h1 style="color: #18181b; font-size: 24px; margin: 0 0 15px 0; text-align: center;">Verify Your Email</h1>

      <p style="color: #52525b; text-align: center; line-height: 1.6;">Enter this code to view order <strong>${orderNumber}</strong></p>

      <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0066B1;">${code}</span>
      </div>

      <p style="color: #71717a; text-align: center; font-size: 14px;">This code expires in 10 minutes.</p>

      <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e4e4e7; margin-top: 30px;">
        <p style="color: #71717a; font-size: 14px; margin: 0;">If you didn't request this code, you can safely ignore this email.</p>
        <p style="color: #a1a1aa; font-size: 12px; margin: 15px 0 0 0;">© ${new Date().getFullYear()} MyBMZA. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `,
    text: `
Verify Your Email

Enter this code to view order ${orderNumber}:

${code}

This code expires in 10 minutes.

If you didn't request this code, you can safely ignore this email.

© ${new Date().getFullYear()} MyBMZA. All rights reserved.
    `,
  });

  if (error) {
    console.error("Failed to send verification code:", error);
    throw error;
  }

  return result;
}
