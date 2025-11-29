import { ProductGridSkeleton } from "@/components/product/product-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function SupplierProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Filters skeleton */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-36 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>

      {/* Results count skeleton */}
      <Skeleton className="h-4 w-48 mb-4" />

      {/* Products grid skeleton */}
      <ProductGridSkeleton count={24} />
    </div>
  );
}
