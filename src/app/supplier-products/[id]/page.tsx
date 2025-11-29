import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductDetailClient } from "@/components/product/product-detail-client";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/json-ld";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("supplier_products")
    .select("name, short_description, description, price, hosted_images, images")
    .eq("id", id)
    .single();

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const cleanName = product.name.replace(/&#\d+;/g, "");
  const description = product.short_description || product.description || `${cleanName} - Premium BMW aftermarket part available at My Beemer`;
  const cleanDescription = description.replace(/<[^>]*>/g, "").substring(0, 160);
  const images = product.hosted_images?.length ? product.hosted_images : product.images || [];

  return {
    title: cleanName,
    description: cleanDescription,
    openGraph: {
      title: `${cleanName} | My Beemer`,
      description: cleanDescription,
      images: images[0] ? [{ url: images[0], alt: cleanName }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanName} | My Beemer`,
      description: cleanDescription,
      images: images[0] ? [images[0]] : [],
    },
  };
}

export default async function SupplierProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("supplier_products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const cleanName = product.name.replace(/&#\d+;/g, "");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mybeemer.co.za";
  const productUrl = `${siteUrl}/supplier-products/${product.id}`;
  const images = product.hosted_images?.length ? product.hosted_images : product.images || [];

  return (
    <>
      {/* SEO Structured Data */}
      <ProductSchema
        name={cleanName}
        description={product.short_description || product.description || `${cleanName} - Premium BMW aftermarket part`}
        image={images[0]}
        price={product.price}
        availability={product.in_stock}
        sku={product.source_id}
        url={productUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Products", url: `${siteUrl}/supplier-products` },
          { name: cleanName, url: productUrl },
        ]}
      />

      {/* Client Component for Interactivity */}
      <ProductDetailClient product={product} />
    </>
  );
}
