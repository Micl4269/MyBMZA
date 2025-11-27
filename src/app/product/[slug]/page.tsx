"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MStripe, MStripeBadge } from "@/components/ui/m-stripe";
import { ProductCard } from "@/components/product/product-card";
import { useCartStore } from "@/store/cart-store";
import { useVehicleStore } from "@/store/vehicle-store";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import {
  getSeriesById,
  getGenerationById,
} from "@/data/bmw-vehicles";
import { formatPrice } from "@/lib/utils";
import {
  ChevronRight,
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

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();
  const { selectedVehicle } = useVehicleStore();

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

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

  // Get fitment string for display
  const getFitmentString = () => {
    if (product.isUniversal) return "Universal - Fits All BMW Models";

    return product.fitment
      .map((f) => {
        const series = getSeriesById(f.seriesId);
        const genData = getGenerationById(f.generationId);
        if (!series || !genData) return null;

        const years =
          f.yearStart || f.yearEnd
            ? ` (${f.yearStart || "..."}-${f.yearEnd || "Present"})`
            : ` (${genData.generation.yearStart}-${genData.generation.yearEnd || "Present"})`;

        return `${series.name} ${genData.generation.code}${years}`;
      })
      .filter(Boolean)
      .join(", ");
  };

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const categoryNames: Record<string, string> = {
    exterior: "Exterior",
    interior: "Interior",
    kits: "Curated Kits",
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href={`/category/${product.category}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {categoryNames[product.category]}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover"
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
                {product.isUniversal && (
                  <Badge variant="m-blue" size="md">
                    Universal Fit
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-m-blue"
                        : "border-transparent hover:border-m-blue/50"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
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
                <MStripeBadge />
                <span className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-m-blue">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Fitment Check */}
            <div className="bg-secondary/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Car className="h-5 w-5 text-m-blue" />
                  Vehicle Fitment
                </h3>
                {selectedVehicle && !product.isUniversal && (
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      fitment === "compatible"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {fitment === "compatible" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Fits Your Vehicle
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4" />
                        Does Not Fit
                      </>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {getFitmentString()}
              </p>
              {!selectedVehicle && !product.isUniversal && (
                <Link
                  href="/garage"
                  className="text-sm text-m-blue hover:underline mt-2 inline-block"
                >
                  Select your vehicle to check fitment
                </Link>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

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
                disabled={!product.inStock || fitment === "incompatible"}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {!product.inStock
                  ? "Out of Stock"
                  : fitment === "incompatible"
                  ? "Does Not Fit Your Vehicle"
                  : `Add to Cart - ${formatPrice(product.price * quantity)}`}
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600">
                    In Stock ({product.stockQuantity} available)
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

        {/* Product Details Tabs */}
        <div className="mt-16">
          <MStripe size="sm" className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-border last:border-0"
                    >
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Features */}
            {product.features.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-m-blue flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included Items */}
            {product.includedItems && product.includedItems.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {product.includedItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Package className="h-5 w-5 text-m-blue flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
