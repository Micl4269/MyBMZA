import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, SupplierProduct } from "@/types";

// Unified cart item that can hold either product type
export interface CartItem {
  productId: string;
  productType: "curated" | "supplier";
  name: string;
  price: number;
  image?: string;
  quantity: number;
  // Original product data for reference
  product?: Product;
  supplierProduct?: SupplierProduct;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  addSupplierItem: (product: SupplierProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add curated product
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }

          const newItem: CartItem = {
            productId: product.id,
            productType: "curated",
            name: product.name,
            price: product.price,
            image: product.images[0]?.url,
            quantity,
            product,
          };

          return {
            items: [...state.items, newItem],
            isOpen: true,
          };
        });
      },

      // Add supplier product
      addSupplierItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }

          // Prefer hosted images over original
          const imageUrl = product.hosted_images?.[0] || product.images?.[0];

          const newItem: CartItem = {
            productId: product.id,
            productType: "supplier",
            name: product.name,
            price: product.price,
            image: imageUrl,
            quantity,
            supplierProduct: product,
          };

          return {
            items: [...state.items, newItem],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "mybmza-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
