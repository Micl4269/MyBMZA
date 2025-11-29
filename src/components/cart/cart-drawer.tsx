"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, CartItem } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { MStripe } from "@/components/ui/m-stripe";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

function CartItemRow({
  item,
  onClose,
}: {
  item: CartItem;
  onClose: () => void;
}) {
  const { updateQuantity, removeItem } = useCartStore();

  const productLink =
    item.productType === "supplier"
      ? `/supplier-products/${item.productId}`
      : `/product/${item.product?.slug}`;

  const sku = item.product?.sku;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-3 bg-secondary/30 rounded-lg"
    >
      {/* Product image */}
      <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            unoptimized={!item.image.includes("supabase")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={productLink}
          className="font-medium text-sm hover:text-m-blue transition-colors line-clamp-2"
          onClick={onClose}
        >
          {item.name.replace(/&#\d+;/g, "")}
        </Link>
        {sku && (
          <p className="text-sm text-muted-foreground mt-0.5">{sku}</p>
        )}
        {item.productType === "supplier" && (
          <p className="text-xs text-muted-foreground mt-0.5">
            Supplier Product
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Quantity controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="p-1.5 hover:bg-secondary rounded transition-colors touch-manipulation"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="p-1.5 hover:bg-secondary rounded transition-colors touch-manipulation"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <span className="font-semibold text-sm">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => removeItem(item.productId)}
        className="p-1.5 text-muted-foreground hover:text-m-red transition-colors self-start touch-manipulation"
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.li>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="p-4 pb-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-m-blue" />
            <SheetTitle className="text-lg">Your Cart</SheetTitle>
            <SheetDescription className="text-sm">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </SheetDescription>
          </div>
        </SheetHeader>

        <MStripe size="sm" className="mt-4" />

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add some premium BMW parts to get started
              </p>
              <Button onClick={closeCart} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemRow
                    key={item.productId}
                    item={item}
                    onClose={closeCart}
                  />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <SheetFooter className="border-t border-border p-4 mt-0">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <motion.span
                  key={subtotal}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="font-semibold text-lg"
                >
                  {formatPrice(subtotal)}
                </motion.span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping calculated at checkout
              </p>

              <div className="space-y-2">
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button className="w-full bg-m-blue-dark hover:bg-m-blue-deeper" size="lg">
                    Checkout
                  </Button>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
