"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { SupplierProduct } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Package, Check } from "lucide-react";

interface SupplierProductCardProps {
  product: SupplierProduct;
}

export function SupplierProductCard({ product }: SupplierProductCardProps) {
  const { addSupplierItem } = useCartStore();

  // Prefer hosted images, fall back to original
  const imageUrl = product.hosted_images?.[0] || product.images?.[0];
  const hasDiscount = product.regular_price && product.regular_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.regular_price!) * 100)
    : 0;

  const cleanName = product.name.replace(/&#\d+;/g, "");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addSupplierItem(product);
    toast.success("Added to cart", {
      description: cleanName.substring(0, 50) + (cleanName.length > 50 ? "..." : ""),
      icon: <Check className="h-4 w-4" />,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        href={`/supplier-products/${product.id}`}
        className="group bg-card border border-border rounded-xl overflow-hidden block hover:border-m-blue/50 hover:shadow-lg hover:shadow-m-blue/5 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square bg-secondary overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={cleanName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized={!imageUrl.includes("supabase")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Package className="h-12 w-12" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <Badge variant="error">-{discountPercent}%</Badge>
            )}
            {!product.in_stock && (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-m-blue transition-colors min-h-[2.5rem]">
            {cleanName}
          </h3>

          {product.primary_category && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {product.primary_category}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              <span className="font-bold text-lg">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.regular_price!)}
                </span>
              )}
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleAddToCart}
              variant={product.in_stock ? "primary" : "secondary"}
              size="sm"
              className="w-full mt-3"
              disabled={!product.in_stock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.in_stock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
