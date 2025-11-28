"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import {
  User as UserIcon,
  Package,
  LogOut,
  Loader2,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
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
  status: string;
  payment_status: string;
  items: OrderItem[];
  total: number;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  pending: { icon: <Clock className="h-4 w-4" />, color: "warning", label: "Pending" },
  confirmed: { icon: <CheckCircle className="h-4 w-4" />, color: "m-blue", label: "Confirmed" },
  processing: { icon: <Package className="h-4 w-4" />, color: "m-blue", label: "Processing" },
  shipped: { icon: <Truck className="h-4 w-4" />, color: "m-blue", label: "Shipped" },
  delivered: { icon: <CheckCircle className="h-4 w-4" />, color: "success", label: "Delivered" },
  cancelled: { icon: <XCircle className="h-4 w-4" />, color: "error", label: "Cancelled" },
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/account");
        return;
      }

      setUser(user);
      setLoading(false);

      // Fetch user's orders
      fetchOrders(user.email!);
    }

    getUser();
  }, [router, supabase.auth]);

  async function fetchOrders(email: string) {
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok && data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-m-blue" />
      </div>
    );
  }

  const firstName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "User";
  const lastName = user?.user_metadata?.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-m-blue/10 rounded-full flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-m-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Orders Section */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-m-blue" />
              <h2 className="font-semibold text-lg">Order History</h2>
            </div>
          </div>

          {ordersLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-m-blue mx-auto" />
              <p className="text-muted-foreground mt-2">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                Start shopping to see your orders here
              </p>
              <Link href="/supplier-products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {orders.map((order) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                const firstItem = order.items[0];
                const additionalItems = order.items.length - 1;

                return (
                  <Link
                    key={order.id}
                    href={`/orders/${order.order_number}`}
                    className="block p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Order Image */}
                      <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        {firstItem?.image ? (
                          <Image
                            src={firstItem.image}
                            alt={firstItem.name}
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

                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">#{order.order_number}</span>
                          <Badge variant={status.color as "warning" | "success" | "error" | "m-blue"}>
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {firstItem?.name.replace(/&#\d+;/g, "")}
                          {additionalItems > 0 && ` +${additionalItems} more`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString("en-ZA", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* Total & Arrow */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto mt-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Link href="/supplier-products">
            <div className="bg-card border border-border rounded-xl p-4 hover:border-m-blue/50 transition-colors">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-m-blue" />
                <div>
                  <h3 className="font-medium">Continue Shopping</h3>
                  <p className="text-sm text-muted-foreground">Browse our products</p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/contact">
            <div className="bg-card border border-border rounded-xl p-4 hover:border-m-blue/50 transition-colors">
              <div className="flex items-center gap-3">
                <UserIcon className="h-5 w-5 text-m-blue" />
                <div>
                  <h3 className="font-medium">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">Contact support</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
