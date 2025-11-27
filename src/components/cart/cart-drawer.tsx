"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { MStripe } from "@/components/ui/m-stripe";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-m-blue" />
            <h2 className="font-semibold text-lg">Your Cart</h2>
            <span className="text-sm text-muted-foreground">
              ({items.length} items)
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <MStripe size="sm" />

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
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
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-4 p-3 bg-secondary/30 rounded-lg"
                >
                  {/* Product image */}
                  <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
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
                      href={`/product/${item.product.slug}`}
                      className="font-medium text-sm hover:text-m-blue transition-colors line-clamp-2"
                      onClick={closeCart}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {item.product.sku}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-muted-foreground hover:text-m-red transition-colors self-start"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-lg">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout
            </p>

            <div className="space-y-2">
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full" size="lg">
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
        )}
      </div>
    </Fragment>
  );
}
