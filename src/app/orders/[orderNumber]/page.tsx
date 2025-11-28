"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
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
  phone?: string;
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
  updated_at: string;
}

interface StatusHistory {
  id: string;
  status: string;
  notes?: string;
  created_at: string;
}

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const statusColors: Record<string, string> = {
  pending: "warning",
  confirmed: "m-blue",
  processing: "m-blue",
  shipped: "m-blue",
  delivered: "success",
  cancelled: "error",
};

interface OrderPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default function OrderPage({ params }: OrderPageProps) {
  const { orderNumber } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders?orderNumber=${orderNumber}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Order not found");
        } else {
          setOrder(data.order);
          setHistory(data.history || []);
        }
      } catch {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderNumber]);

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

  const isCancelled = order.status === "cancelled";
  const currentStepIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Link>

        {/* Header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Order #{order.order_number}</h1>
              <p className="text-muted-foreground">
                Placed on{" "}
                {new Date(order.created_at).toLocaleDateString("en-ZA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={statusColors[order.status] as "warning" | "success" | "error" | "m-blue"}>
                {order.status.replace("_", " ").charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              <Badge variant={order.payment_status === "paid" ? "success" : "warning"}>
                {order.payment_status === "paid" ? "Paid" : "Unpaid"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        {!isCancelled && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h2 className="font-semibold mb-6">Order Status</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-secondary">
                <div
                  className="h-full bg-m-blue transition-all duration-500"
                  style={{
                    width: `${Math.max(0, (currentStepIndex / (statusSteps.length - 1)) * 100)}%`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isComplete = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                          isComplete
                            ? "bg-m-blue text-white"
                            : "bg-secondary text-muted-foreground"
                        } ${isCurrent ? "ring-4 ring-m-blue/20" : ""}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-xs mt-2 text-center ${
                          isComplete ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Cancelled Notice */}
        {isCancelled && (
          <div className="bg-m-red/10 border border-m-red/20 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-m-red" />
              <div>
                <h3 className="font-semibold text-m-red">Order Cancelled</h3>
                <p className="text-sm text-muted-foreground">
                  This order has been cancelled. If you have questions, please contact support.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Order Items</h2>
              </div>
              <div className="divide-y divide-border">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4">
                    <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-2">
                        {item.name.replace(/&#\d+;/g, "")}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Qty: {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.total)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border p-4 space-y-2 bg-secondary/30">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-m-blue" />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {order.shipping_address.firstName} {order.shipping_address.lastName}
                <br />
                {order.shipping_address.address1}
                {order.shipping_address.address2 && (
                  <>
                    <br />
                    {order.shipping_address.address2}
                  </>
                )}
                <br />
                {order.shipping_address.city}, {order.shipping_address.province.toUpperCase()}{" "}
                {order.shipping_address.postalCode}
              </p>
              <p className="text-xs text-muted-foreground mt-2 capitalize">
                {order.shipping_method} shipping
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{order.email}</span>
                </div>
                {order.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{order.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status History */}
            {history.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Status History</h3>
                <div className="space-y-3">
                  {history.map((entry) => (
                    <div key={entry.id} className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="capitalize font-medium">
                          {entry.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.created_at).toLocaleDateString("en-ZA", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-muted-foreground mt-0.5">{entry.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Need Help */}
            <div className="bg-secondary/50 border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Questions about your order? We're here to help.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
