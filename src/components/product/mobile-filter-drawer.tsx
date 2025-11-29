"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, X, ChevronDown } from "lucide-react";
import { SpoilerIcon, SteeringWheelIcon, KeyCoverIcon } from "@/components/icons/car-parts";

interface FilterParams {
  category?: string;
  subcategory?: string;
  q?: string;
  model?: string;
  inStock?: string;
}

interface MobileFilterDrawerProps {
  params: FilterParams;
  categoryStructure: Array<{
    id: string;
    name: string;
    icon: "exterior" | "interior" | "accessories";
    subcategories: Array<{ id: string; name: string }>;
  }>;
}

const iconMap = {
  exterior: SpoilerIcon,
  interior: SteeringWheelIcon,
  accessories: KeyCoverIcon,
};

export function MobileFilterDrawer({ params, categoryStructure }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile filter button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium"
      >
        <Filter className="h-4 w-4" />
        Filters & Categories
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-secondary rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="space-y-6">
            <form className="space-y-4" action="/supplier-products">
              {params.category && (
                <input type="hidden" name="category" value={params.category} />
              )}
              {params.subcategory && (
                <input type="hidden" name="subcategory" value={params.subcategory} />
              )}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Search</label>
                <input
                  type="text"
                  name="q"
                  placeholder="Search products..."
                  defaultValue={params.q}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">BMW Model</label>
                <input
                  type="text"
                  name="model"
                  placeholder="e.g., F30, E46"
                  defaultValue={params.model}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="inStock"
                  value="true"
                  defaultChecked={params.inStock === "true"}
                  className="rounded"
                />
                In Stock Only
              </label>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-m-blue text-white rounded-lg hover:bg-m-blue-dark text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Apply Filters
              </button>
            </form>

            {/* Category Navigation */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <nav className="space-y-1">
                <Link
                  href="/supplier-products"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    !params.category && !params.subcategory
                      ? "bg-m-blue/10 text-m-blue font-medium"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  All Products
                </Link>

                {categoryStructure.map((category) => {
                  const Icon = iconMap[category.icon];
                  const isActive = params.category === category.id;
                  const hasActiveSubcategory = category.subcategories.some(
                    (sub) => params.subcategory === sub.id
                  );
                  const isExpanded = isActive || hasActiveSubcategory;

                  return (
                    <div key={category.id}>
                      <Link
                        href={`/supplier-products?category=${category.id}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive && !params.subcategory
                            ? "bg-m-blue/10 text-m-blue font-medium"
                            : "hover:bg-secondary text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{category.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/supplier-products?category=${category.id}&subcategory=${sub.id}`}
                              onClick={() => setIsOpen(false)}
                              className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                params.subcategory === sub.id
                                  ? "bg-m-blue/10 text-m-blue font-medium"
                                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
