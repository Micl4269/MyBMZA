"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { MStripe } from "@/components/ui/m-stripe";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useVehicleStore } from "@/store/vehicle-store";
import {
  getSeriesById,
  getGenerationById,
  getModelById,
} from "@/data/bmw-vehicles";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Car,
  Search,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

const categories = [
  {
    name: "Exterior",
    href: "/category/exterior",
    subcategories: [
      { name: "Spoilers", href: "/category/exterior/spoilers" },
      { name: "Mirror Caps", href: "/category/exterior/mirror-caps" },
      { name: "Grilles", href: "/category/exterior/grilles" },
      { name: "Badges & Emblems", href: "/category/exterior/badges" },
      { name: "Exterior Trim", href: "/category/exterior/exterior-trim" },
    ],
  },
  {
    name: "Interior",
    href: "/category/interior",
    subcategories: [
      { name: "Gearknobs", href: "/category/interior/gearknobs" },
      { name: "Boot Covers", href: "/category/interior/boot-covers" },
      { name: "Door Lights", href: "/category/interior/door-lights" },
      { name: "Interior Trim", href: "/category/interior/interior-trim" },
      { name: "Steering Wheels", href: "/category/interior/steering-wheels" },
    ],
  },
  {
    name: "Curated Kits",
    href: "/category/kits",
    subcategories: [
      { name: "Gearknob Kits", href: "/category/kits/gearknob-kits" },
      { name: "Interior Upgrade Kits", href: "/category/kits/interior-kits" },
      { name: "Exterior Styling Kits", href: "/category/kits/exterior-kits" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { items, openCart } = useCartStore();
  const { selectedVehicle } = useVehicleStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [mobileSearchOpen]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/supplier-products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileSearchOpen(false);
    }
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Format selected vehicle display
  const getVehicleDisplay = () => {
    if (!selectedVehicle) return null;

    const series = getSeriesById(selectedVehicle.seriesId);
    const genData = getGenerationById(selectedVehicle.generationId);
    const modelData = getModelById(selectedVehicle.modelId);

    if (!series || !genData || !modelData) return null;

    return `${selectedVehicle.year} ${modelData.model.name} (${genData.generation.code})`;
  };

  const vehicleDisplay = getVehicleDisplay();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MStripe size="sm" />

      {/* Top bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="hidden md:flex items-center gap-4 text-muted-foreground">
              <span>Gauteng Based</span>
              <span className="text-border">|</span>
              <span>Nationwide Shipping</span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {theme === "dark" ? "Light" : "Dark"}
                  </span>
                </button>
              )}
              <Link
                href="/account"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">My</span>
                <span className="text-2xl font-bold text-m-blue">Beemer</span>
              </div>
            </Link>

            {/* Vehicle selector button */}
            <Link
              href="/garage"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <Car className="h-4 w-4 text-m-blue" />
              {vehicleDisplay ? (
                <span className="text-sm font-medium">{vehicleDisplay}</span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Select your BMW
                </span>
              )}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Link>

            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:border-m-blue focus:outline-none focus:ring-2 focus:ring-m-blue/20"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden p-2 hover:bg-secondary rounded-lg"
                onClick={() => {
                  setMobileSearchOpen(!mobileSearchOpen);
                  setMobileMenuOpen(false);
                }}
                aria-label="Toggle search"
              >
                {mobileSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={openCart}
                className="relative p-2 hover:bg-secondary rounded-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-m-red rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setMobileSearchOpen(false);
                }}
                className="md:hidden p-2 hover:bg-secondary rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block border-b border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                href="/supplier-products"
                className="block px-4 py-3 text-sm font-medium text-m-blue hover:text-m-blue/80 transition-colors"
              >
                Shop All
              </Link>
            </li>
            {categories.map((category) => (
              <li
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium hover:text-m-blue transition-colors"
                >
                  {category.name}
                  <ChevronDown className="h-3 w-3" />
                </Link>

                {/* Dropdown */}
                {activeCategory === category.name && (
                  <div className="absolute top-full left-0 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-sm hover:bg-secondary hover:text-m-blue transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/about"
                className="block px-4 py-3 text-sm font-medium hover:text-m-blue transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block px-4 py-3 text-sm font-medium hover:text-m-blue transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="lg:hidden border-b border-border bg-background">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={mobileSearchRef}
                type="search"
                placeholder="Search BMW parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-12 rounded-lg border border-input bg-background text-sm focus:border-m-blue focus:outline-none focus:ring-2 focus:ring-m-blue/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-m-blue text-white text-sm rounded-md hover:bg-m-blue/90 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            {/* Vehicle selector - Mobile */}
            <Link
              href="/garage"
              className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-secondary/50"
            >
              <Car className="h-4 w-4 text-m-blue" />
              {vehicleDisplay ? (
                <span className="text-sm font-medium">{vehicleDisplay}</span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Select your BMW
                </span>
              )}
            </Link>

            <nav className="space-y-1">
              <Link
                href="/supplier-products"
                className="block px-3 py-2 text-sm font-medium text-m-blue hover:bg-secondary rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All Products
              </Link>
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={category.href}
                    className="block px-3 py-2 text-sm font-medium hover:bg-secondary rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="ml-4 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium hover:bg-secondary rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-medium hover:bg-secondary rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
