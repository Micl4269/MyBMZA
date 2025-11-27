"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MStripe } from "@/components/ui/m-stripe";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

type AdminTab = "dashboard" | "products" | "orders" | "customers" | "settings";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    total: 4599,
    status: "pending",
    date: "2024-03-15",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    total: 2499,
    status: "shipped",
    date: "2024-03-14",
  },
  {
    id: "ORD-003",
    customer: "Mike Davis",
    email: "mike@example.com",
    total: 1999,
    status: "delivered",
    date: "2024-03-13",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Simple password protection (in production, use proper auth)
  const handleLogin = () => {
    if (password === "mybmza2024") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="bg-card border border-border rounded-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-1 mb-4">
              <span className="text-2xl font-bold">My</span>
              <span className="text-2xl font-bold text-m-blue">BM</span>
              <span className="text-2xl font-bold">ZA</span>
            </div>
            <MStripe size="sm" className="mb-4" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Enter password to access
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Demo password: mybmza2024
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalRevenue: 125000,
    totalOrders: 48,
    totalProducts: products.length,
    lowStock: products.filter((p) => p.stockQuantity < 10).length,
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
          <button
            onClick={() => setIsAuthenticated(false)}
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
                  <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last month
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
                  <p className="text-xs text-m-blue mt-2">This month</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Products</p>
                      <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Active listings
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Low Stock</p>
                      <p className="text-2xl font-bold">{stats.lowStock}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                  <p className="text-xs text-amber-500 mt-2">
                    Items below 10 units
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Order ID
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
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">
                            <p className="font-medium text-sm">
                              {order.customer}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.email}
                            </p>
                          </td>
                          <td className="p-4 font-medium">
                            {formatPrice(order.total)}
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                order.status === "delivered"
                                  ? "success"
                                  : order.status === "shipped"
                                  ? "m-blue"
                                  : "warning"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Products Table */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Product
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          SKU
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Category
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Price
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Stock
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border">
                          <td className="p-4">
                            <p className="font-medium text-sm line-clamp-1">
                              {product.name}
                            </p>
                          </td>
                          <td className="p-4 font-mono text-xs">
                            {product.sku}
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                          <td className="p-4 font-medium">
                            {formatPrice(product.price)}
                          </td>
                          <td className="p-4">
                            <span
                              className={`font-medium ${
                                product.stockQuantity < 10
                                  ? "text-amber-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {product.stockQuantity}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                                <Edit className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 hover:bg-secondary rounded transition-colors">
                                <Trash2 className="h-4 w-4 text-m-red" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Orders</h1>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Order management will be connected to Supabase database
                </p>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Customers</h1>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Customer management will be connected to Supabase database
                </p>
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
                    <Input label="Store Name" value="My BM ZA" />
                    <Input label="Contact Email" value="info@mybmza.co.za" />
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
                      <Badge variant="warning">Setup Required</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
