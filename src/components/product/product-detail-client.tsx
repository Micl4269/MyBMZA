"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MStripe } from "@/components/ui/m-stripe";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCartStore } from "@/store/cart-store";
import { SupplierProduct } from "@/types";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
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
} from "lucide-react";
import { RelatedProducts } from "@/components/product/related-products";

interface ProductDetailClientProps {
  product: SupplierProduct;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { addSupplierItem } = useCartStore();

  // Sync carousel with selected image
  const onCarouselSelect = useCallback(() => {
    if (!carouselApi) return;
    setSelectedImage(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on("select", onCarouselSelect);
    return () => {
      carouselApi.off("select", onCarouselSelect);
    };
  }, [carouselApi, onCarouselSelect]);

  // Scroll to thumbnail when clicked
  const scrollToImage = useCallback(
    (index: number) => {
      if (!carouselApi) return;
      carouselApi.scrollTo(index);
      setSelectedImage(index);
    },
    [carouselApi]
  );

  // Get images - prefer hosted, fall back to original
  const images = product.hosted_images?.length
    ? product.hosted_images
    : product.images || [];

  const hasDiscount = product.regular_price && product.regular_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.regular_price!) * 100)
    : 0;

  // Clean HTML entities from name
  const cleanName = product.name.replace(/&#\d+;/g, "");

  // Sanitize product description HTML
  const sanitizedDescription = useMemo(() => {
    const rawHtml = product.description || product.short_description || "";
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "ul", "ol", "li", "span", "div"],
      ALLOWED_ATTR: ["class"],
    });
  }, [product.description, product.short_description]);

  const handleAddToCart = () => {
    addSupplierItem(product, quantity);
    toast.success("Added to cart", {
      description: `${quantity}x ${cleanName.substring(0, 40)}${cleanName.length > 40 ? "..." : ""}`,
      icon: <Check className="h-4 w-4" />,
    });
  };

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
          {/* Images - Swipeable Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Main Image Carousel */}
            <div className="relative">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  loop: images.length > 1,
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {images.length > 0 ? (
                    images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
                          <Image
                            src={image}
                            alt={`${cleanName} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={!image.includes("supabase")}
                            priority={index === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Package className="h-24 w-24" />
                        </div>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
              </Carousel>

              {/* Badges - overlaid on carousel */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
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

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => carouselApi?.scrollPrev()}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => carouselApi?.scrollNext()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Dot indicators for mobile */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index
                          ? "bg-white w-4"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-m-blue ring-2 ring-m-blue/20"
                        : "border-transparent hover:border-m-blue/50"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${cleanName} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized={!image.includes("supabase")}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              {product.primary_category && (
                <p className="text-sm text-muted-foreground mb-2">
                  {product.primary_category}
                </p>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold">{cleanName}</h1>
            </div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="text-3xl font-bold text-m-blue">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.regular_price!)}
                </span>
              )}
            </motion.div>

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
            {sanitizedDescription && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <div
                  className="text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
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
          </motion.div>
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

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.primary_category}
          compatibilityModels={product.compatibility_models}
        />

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
