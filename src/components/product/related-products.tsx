"use client";

import { useState, useEffect } from "react";
import { SupplierProduct } from "@/types";
import { SupplierProductCard } from "./supplier-product-card";
import { ProductCardSkeleton } from "./product-skeleton";

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
  compatibilityModels?: string[];
}

export function RelatedProducts({
  currentProductId,
  category,
  compatibilityModels,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<SupplierProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        // Build query params
        const params = new URLSearchParams();
        params.set("limit", "4");
        params.set("exclude", currentProductId);

        // Try to match by category first
        if (category) {
          params.set("category", category);
        }

        // Also try matching by compatibility model
        if (compatibilityModels && compatibilityModels.length > 0) {
          params.set("model", compatibilityModels[0]);
        }

        const res = await fetch(`/api/supplier-products/related?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [currentProductId, category, compatibilityModels]);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <SupplierProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
