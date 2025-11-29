"use client";

import dynamic from "next/dynamic";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Theme provider wrapper
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// Lazy load non-critical client components
export const CartDrawer = dynamic(
  () => import("@/components/cart/cart-drawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);

export const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false }
);
