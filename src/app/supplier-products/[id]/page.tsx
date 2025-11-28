"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MStripe } from "@/components/ui/m-stripe";
import { useCartStore } from "@/store/cart-store";
import { SupplierProduct } from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  X,
  Truck,
  Shield,
  Package,
  Car,
  Loader2,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function SupplierProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<SupplierProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addSupplierItem } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/supplier-products/${id}`);
        if (!res.ok) {
          setProduct(null);
          return;
        }
        const data = await res.json();
        setProduct(data.product);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-m-blue" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  // Get images - prefer hosted, fall back to original
  const images = product.hosted_images?.length
    ? product.hosted_images
    : product.images || [];

  const hasDiscount = product.regular_price && product.regular_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.regular_price!) * 100)
    : 0;

  const sourceLabel = product.source === "autostyle" ? "Autostyle" : "Carbon Sport";

  const handleAddToCart = () => {
    addSupplierItem(product, quantity);
  };

  // Clean HTML entities from name
  const cleanName = product.name.replace(/&#\d+;/g, "");

  // Parse compatibility models for display
  const compatibilityDisplay = product.compatibility_models?.length
    ? product.compatibility_models.join(", ")
    : product.compatibility_text || "Check product details for compatibility";

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href="/supplier-products"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium truncate max-w-[200px]">{cleanName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage]}
                  alt={cleanName}
                  fill
                  className="object-cover"
                  unoptimized={!images[selectedImage].includes("supabase")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package className="h-24 w-24" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge variant="error" size="md">
                    -{discountPercent}% OFF
                  </Badge>
                )}
                {!product.in_stock && (
                  <Badge variant="secondary" size="md">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Source badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" size="md" className="bg-background/80 backdrop-blur-sm">
                  {sourceLabel}
                </Badge>
              </div>

              {/* Image navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-m-blue"
                        : "border-transparent hover:border-m-blue/50"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${cleanName} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized={!image.includes("supabase")}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="m-blue" size="sm">
                  {sourceLabel}
                </Badge>
                {product.primary_category && (
                  <span className="text-sm text-muted-foreground">
                    {product.primary_category}
                  </span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">{cleanName}</h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-m-blue">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.regular_price!)}
                </span>
              )}
            </div>

            {/* Compatibility */}
            <div className="bg-secondary/50 rounded-xl p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Car className="h-5 w-5 text-m-blue" />
                BMW Compatibility
              </h3>
              <p className="text-sm text-muted-foreground">
                {compatibilityDisplay}
              </p>
            </div>

            {/* Description */}
            {(product.description || product.short_description) && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <div
                  className="text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: product.description || product.short_description || "",
                  }}
                />
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-input rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {!product.in_stock
                  ? "Out of Stock"
                  : `Add to Cart - ${formatPrice(product.price * quantity)}`}
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              {product.in_stock ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600">
                    In Stock
                    {product.stock_quantity ? ` (${product.stock_quantity} available)` : ""}
                  </span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">Out of Stock</span>
                </>
              )}
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-m-blue" />
                <span className="text-sm">Nationwide Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-m-blue" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-m-blue" />
                <span className="text-sm">Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16">
          <MStripe size="sm" className="mb-8" />

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((cat, index) => (
                  <Badge key={index} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back to products */}
        <div className="mt-8">
          <Link
            href="/supplier-products"
            className="inline-flex items-center gap-2 text-m-blue hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
