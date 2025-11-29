"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MStripe } from "@/components/ui/m-stripe";
import { formatPrice } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Search,
  Eye,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  Loader2,
  RefreshCw,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

type AdminTab = "dashboard" | "orders" | "customers" | "settings";

interface Order {
  id: string;
  order_number: string;
  email: string;
  phone?: string;
  status: string;
  payment_status: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  shipping_address: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    province: string;
  };
  created_at: string;
}

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
}

const ADMIN_EMAILS = ["admin@mybmza.co.za", "mic@mybmza.co.za"]; // Add your admin emails here

const statusConfig: Record<string, { icon: React.ReactNode; variant: "warning" | "m-blue" | "success" | "error" }> = {
  pending: { icon: <Clock className="h-3 w-3" />, variant: "warning" },
  confirmed: { icon: <CheckCircle className="h-3 w-3" />, variant: "m-blue" },
  processing: { icon: <Package className="h-3 w-3" />, variant: "m-blue" },
  shipped: { icon: <Truck className="h-3 w-3" />, variant: "m-blue" },
  delivered: { icon: <CheckCircle className="h-3 w-3" />, variant: "success" },
  cancelled: { icon: <XCircle className="h-3 w-3" />, variant: "error" },
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/admin");
        return;
      }

      // Check if user is admin
      if (!ADMIN_EMAILS.includes(user.email || "")) {
        router.push("/");
        return;
      }

      setUser(user);
      setLoading(false);
      fetchOrders();
      fetchCustomers();
    }

    checkAuth();
  }, [router, supabase.auth]);

  async function fetchOrders() {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  }

  async function fetchCustomers() {
    setCustomersLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setCustomersLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;

      // Add to status history
      await supabase.from("order_status_history").insert({
        order_id: orderId,
        status: newStatus,
        notes: `Status updated to ${newStatus} by admin`,
      });

      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to update order:", error);
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

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (c) =>
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalRevenue: orders.filter(o => o.payment_status === "paid").reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    totalCustomers: customers.length,
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold">My</span>
            <span className="text-xl font-bold text-m-blue">BM</span>
            <span className="text-xl font-bold">ZA</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-m-blue text-white"
                      : "hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</p>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <MStripe size="sm" />

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        {formatPrice(stats.totalRevenue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-emerald-500" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    From paid orders
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-m-blue/10 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-m-blue" />
                    </div>
                  </div>
                  <p className="text-xs text-m-blue mt-2">All time</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                  <p className="text-xs text-amber-500 mt-2">
                    Needs attention
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Customers</p>
                      <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Registered
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold">Recent Orders</h2>
                  <button
                    onClick={fetchOrders}
                    className="p-2 hover:bg-secondary rounded-lg"
                  >
                    <RefreshCw className={`h-4 w-4 ${ordersLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>
                {ordersLoading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-m-blue mx-auto" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No orders yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Order
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Customer
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Total
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Payment
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 10).map((order) => {
                          const config = statusConfig[order.status] || statusConfig.pending;
                          return (
                            <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                              <td className="p-4 font-mono text-sm">{order.order_number}</td>
                              <td className="p-4">
                                <p className="font-medium text-sm">
                                  {order.shipping_address.firstName} {order.shipping_address.lastName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {order.email}
                                </p>
                              </td>
                              <td className="p-4 font-medium">
                                {formatPrice(order.total)}
                              </td>
                              <td className="p-4">
                                <Badge variant={config.variant}>
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Badge variant={order.payment_status === "paid" ? "success" : "warning"}>
                                  {order.payment_status}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString("en-ZA")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Orders</h1>
                <button
                  onClick={fetchOrders}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <RefreshCw className={`h-4 w-4 ${ordersLoading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order # or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Orders Table */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {ordersLoading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-m-blue mx-auto" />
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No orders found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Order
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Customer
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Items
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Total
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Payment
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Date
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => {
                          const config = statusConfig[order.status] || statusConfig.pending;
                          return (
                            <tr key={order.id} className="border-b border-border">
                              <td className="p-4">
                                <p className="font-mono text-sm">{order.order_number}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-medium text-sm">
                                  {order.shipping_address.firstName} {order.shipping_address.lastName}
                                </p>
                                <p className="text-xs text-muted-foreground">{order.email}</p>
                                <p className="text-xs text-muted-foreground">
                                  {order.shipping_address.city}, {order.shipping_address.province}
                                </p>
                              </td>
                              <td className="p-4 text-sm">{order.items.length} items</td>
                              <td className="p-4 font-medium">
                                {formatPrice(order.total)}
                              </td>
                              <td className="p-4">
                                <Badge variant={config.variant}>
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Badge variant={order.payment_status === "paid" ? "success" : "warning"}>
                                  {order.payment_status}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString("en-ZA")}
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="p-1.5 hover:bg-secondary rounded transition-colors"
                                >
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Customers</h1>
                <button
                  onClick={fetchCustomers}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <RefreshCw className={`h-4 w-4 ${customersLoading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Customers Table */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {customersLoading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-m-blue mx-auto" />
                  </div>
                ) : filteredCustomers.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No customers found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Name
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Email
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Phone
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                            Joined
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map((customer) => (
                          <tr key={customer.id} className="border-b border-border">
                            <td className="p-4 font-medium">
                              {customer.first_name} {customer.last_name}
                            </td>
                            <td className="p-4 text-sm">{customer.email}</td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {customer.phone || "-"}
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(customer.created_at).toLocaleDateString("en-ZA")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Settings</h1>
              <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Store Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure your store settings
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Store Name</label>
                      <Input value="My Beemer" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Contact Email</label>
                      <Input value="info@mybeemer.co.za" disabled />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-2">Payment Gateways</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">PayFast</p>
                        <p className="text-sm text-muted-foreground">
                          Credit/Debit Cards, EFT
                        </p>
                      </div>
                      <Badge variant="success">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Yoco</p>
                        <p className="text-sm text-muted-foreground">
                          Credit/Debit Cards
                        </p>
                      </div>
                      <Badge variant="success">Connected</Badge>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-2">Database</h3>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Supabase</p>
                        <p className="text-sm text-muted-foreground">
                          PostgreSQL Database
                        </p>
                      </div>
                      <Badge variant="success">Connected</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-background z-50 shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Order {selectedOrder.order_number}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status */}
                <div className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusConfig[selectedOrder.status]?.variant || "warning"}>
                      {selectedOrder.status}
                    </Badge>
                    <Badge variant={selectedOrder.payment_status === "paid" ? "success" : "warning"}>
                      {selectedOrder.payment_status}
                    </Badge>
                  </div>
                </div>

                {/* Update Status */}
                <div>
                  <p className="text-sm font-medium mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedOrder.status === status ? "primary" : "outline"}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Customer */}
                <div>
                  <p className="text-sm font-medium mb-2">Customer</p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="font-medium">
                      {selectedOrder.shipping_address.firstName} {selectedOrder.shipping_address.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                    {selectedOrder.phone && (
                      <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <p className="text-sm font-medium mb-2">Shipping Address</p>
                  <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                    <p>{selectedOrder.shipping_address.address1}</p>
                    <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.province}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p className="text-sm font-medium mb-2">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm bg-secondary/50 rounded-lg p-3">
                        <div>
                          <p className="font-medium line-clamp-1">{item.name.replace(/&#\d+;/g, "")}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.total)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{selectedOrder.shipping === 0 ? "Free" : formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-m-blue">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
