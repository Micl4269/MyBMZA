"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MStripe } from "@/components/ui/m-stripe";
import { formatPrice } from "@/lib/utils";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

interface Order {
  id: string;
  order_number: string;
  email: string;
  status: string;
  payment_status: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shipping_address: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    postalCode: string;
  };
  shipping_method: string;
  created_at: string;
}

interface SuccessPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = use(searchParams);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!params.order) {
        setError("No order number provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders?orderNumber=${params.order}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Order not found");
        } else {
          setOrder(data.order);
        }
      } catch {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [params.order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-m-blue" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-m-red mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "We couldn't find your order."}
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = order.payment_status === "paid";

  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isPaid ? "Thank You For Your Order!" : "Order Received!"}
          </h1>
          <p className="text-muted-foreground">
            {isPaid
              ? "Your payment was successful and your order is being processed."
              : "Your order has been received. Complete payment to confirm your order."}
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-xl font-bold">{order.order_number}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">
                {new Date(order.created_at).toLocaleDateString("en-ZA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg mb-6">
            <Package className="h-6 w-6 text-m-blue" />
            <div>
              <p className="font-medium">Order Status</p>
              <p className="text-sm text-muted-foreground capitalize">
                {order.status.replace("_", " ")} - Payment {order.payment_status}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold">Order Items</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 py-3 border-b border-border last:border-0">
                <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{item.name.replace(/&#\d+;/g, "")}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatPrice(item.total)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-m-blue">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-5 w-5 text-m-blue" />
            <h3 className="font-semibold">Shipping Address</h3>
          </div>
          <p className="text-muted-foreground">
            {order.shipping_address.firstName} {order.shipping_address.lastName}
            <br />
            {order.shipping_address.address1}
            {order.shipping_address.address2 && <>, {order.shipping_address.address2}</>}
            <br />
            {order.shipping_address.city}, {order.shipping_address.province.toUpperCase()}{" "}
            {order.shipping_address.postalCode}
          </p>
          <p className="text-sm text-muted-foreground mt-2 capitalize">
            Shipping Method: {order.shipping_method}
          </p>
        </div>

        {/* Confirmation Email */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-m-blue" />
            <div>
              <h3 className="font-semibold">Confirmation Email</h3>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to {order.email}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/supplier-products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href={`/orders/${order.order_number}`}>
            <Button size="lg">
              Track Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
