import { redirect } from "next/navigation";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;

  // Redirect to supplier products with category and subcategory filters
  redirect(`/supplier-products?category=${category}&subcategory=${subcategory}`);
}
