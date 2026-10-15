"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  const subtotal = items.reduce((n, i) => n + i.product.price * i.quantity, 0);
  const count = items.reduce((n, i) => n + i.quantity, 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">Your Selection</span>
                <h3 className="serif drawer-title">Shopping Bag ({count})</h3>
              </div>
              <button className="drawer-close" onClick={onClose} aria-label="Close bag">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {items.length > 0 ? (
              <>
                <div className="drawer-items">
                  {items.map(({ product, quantity }) => (
                    <div className="drawer-item" key={product.id}>
                      <img src={product.cardImageUrl} alt={product.name} />
                      <div className="drawer-item-info">
                        <h4>{product.name}</h4>
                        <p className="drawer-item-cat">{product.category}</p>
                        <div className="drawer-item-bottom">
                          <div className="drawer-qty">
                            <button onClick={() => decreaseQuantity(product.id)} aria-label="Decrease">−</button>
                            <span>{quantity}</span>
                            <button onClick={() => increaseQuantity(product.id)} aria-label="Increase">+</button>
                          </div>
                          <strong>₹{(product.price * quantity).toLocaleString("en-IN")}</strong>
                        </div>
                      </div>
                      <button
                        className="drawer-remove"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        title="Remove"
                      >
                        <X size={13} strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="drawer-footer">
                  <div className="drawer-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span className="complimentary">Complimentary</span>
                    </div>
                    <hr />
                    <div className="summary-row total-row">
                      <span>Total</span>
                      <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  <Link className="button primary drawer-checkout-btn" href="/checkout" onClick={onClose}>
                    Proceed to Checkout <ArrowUpRight size={13} strokeWidth={1.5} />
                  </Link>
                  <Link className="drawer-view-bag" href="/cart" onClick={onClose}>
                    View Detailed Bag
                  </Link>
                </div>
              </>
            ) : (
              <div className="drawer-empty">
                <ShoppingBag size={36} strokeWidth={1} />
                <p>Your shopping bag is currently empty.</p>
                <Link className="button primary" href="/shop" onClick={onClose}>
                  Explore Collection <ArrowUpRight size={13} strokeWidth={1.5} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
