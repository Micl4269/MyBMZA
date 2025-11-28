import { redirect } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Old curated product routes redirect to supplier products
  // The slug was used for curated products, redirect to main shop
  redirect("/supplier-products");
}
