"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useVehicleStore } from "@/store/vehicle-store";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Check, X } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { selectedVehicle } = useVehicleStore();

  // Check fitment
  const checkFitment = (): "compatible" | "incompatible" | "unknown" => {
    if (product.isUniversal) return "compatible";
    if (!selectedVehicle) return "unknown";

    const fits = product.fitment.some((f) => {
      const seriesMatch = f.seriesId === selectedVehicle.seriesId;
      const generationMatch = f.generationId === selectedVehicle.generationId;
      const modelMatch =
        f.modelIds.length === 0 ||
        f.modelIds.includes(selectedVehicle.modelId);
      const yearMatch =
        (!f.yearStart || selectedVehicle.year >= f.yearStart) &&
        (!f.yearEnd || selectedVehicle.year <= f.yearEnd);

      return seriesMatch && generationMatch && modelMatch && yearMatch;
    });

    return fits ? "compatible" : "incompatible";
  };

  const fitment = checkFitment();
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="group product-card bg-card border border-border rounded-xl overflow-hidden">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-secondary">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge variant="error">-{discountPercent}%</Badge>
          )}
          {product.isUniversal && (
            <Badge variant="m-blue">Universal</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>

        {/* Fitment indicator */}
        {selectedVehicle && !product.isUniversal && (
          <div className="absolute top-3 right-3">
            {fitment === "compatible" ? (
              <div className="fitment-badge compatible px-2 py-1 rounded-full flex items-center gap-1">
                <Check className="h-3 w-3" />
                <span>Fits</span>
              </div>
            ) : fitment === "incompatible" ? (
              <div className="fitment-badge incompatible px-2 py-1 rounded-full flex items-center gap-1">
                <X className="h-3 w-3" />
                <span>No Fit</span>
              </div>
            ) : null}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-m-blue transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={() => addItem(product)}
          disabled={!product.inStock || fitment === "incompatible"}
          variant={fitment === "incompatible" ? "secondary" : "primary"}
          size="sm"
          className="w-full mt-3"
        >
          {!product.inStock
            ? "Out of Stock"
            : fitment === "incompatible"
            ? "Does Not Fit"
            : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
