"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useWardrobeStore } from "@/store/wardrobeStore";

function HangerIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path d="M12 7a2.5 2.5 0 0 1 2.5-2.5c1.38 0 2.5 1.12 2.5 2.5 0 1.25-.8 2-2 2.5L12 11" />
      <path d="M2.5 17.5L12 11l9.5 6.5" />
      <line x1="2.5" y1="17.5" x2="21.5" y2="17.5" />
    </svg>
  );
}

export function QuickViewModal({
  product,
  onClose,
  onTryOn,
}: {
  product: Product | null;
  onClose: () => void;
  onTryOn?: (product: Product, source: HTMLImageElement | null) => void;
}) {
  const toggle = useWishlistStore((state) => state.toggleWishlist);
  const liked = product ? useWishlistStore.getState().isWishlisted(product.id) : false;
  const add = useCartStore((state) => state.addItem);
  const equipped = product ? useWardrobeStore.getState().isEquipped(product.id) : false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="quickview-overlay" role="dialog" aria-modal="true" onClick={onClose}>
        <motion.div
          className="quickview-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="quickview-close" onClick={onClose} aria-label="Close modal">
            <X size={18} strokeWidth={1.5} />
          </button>

          <div className="quickview-grid">
            <div className="quickview-image">
              <img id="quickview-img" src={product.cardImageUrl} alt={product.name} />
              {equipped && (
                <span className="equipped-badge">
                  <span className="equipped-dot" />
                  Currently Wearing
                </span>
              )}
            </div>

            <div className="quickview-content">
              <span className="eyebrow">{product.category} · Atelier Collection</span>
              <h2 className="serif quickview-title">{product.name}</h2>

              <div className="quickview-rating">
                <div className="stars">
                  <Star size={11} fill="currentColor" strokeWidth={0} />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span className="review-count">({product.reviewCount} client reviews)</span>
              </div>

              <div className="quickview-price">
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                {product.originalPrice && (
                  <del>₹{product.originalPrice.toLocaleString("en-IN")}</del>
                )}
              </div>

              <p className="quickview-description">{product.description}</p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="quickview-sizes">
                  <span className="eyebrow" style={{ fontSize: "8.5px", marginBottom: "6px" }}>Select Size</span>
                  <div className="sizes">
                    {product.sizes.map((s, i) => (
                      <button key={s} className={i === 0 ? "selected" : ""}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="quickview-actions">
                <button
                  className={`button primary try-on-btn ${equipped ? "equipped" : ""}`}
                  onClick={(e) => {
                    const img = document.getElementById("quickview-img") as HTMLImageElement;
                    onTryOn?.(product, img);
                    onClose();
                  }}
                  aria-label={`Try on ${product.name}`}
                >
                  <HangerIcon size={14} />
                  {equipped ? "Wearing on Model" : "Try On In Fitting Room"}
                </button>

                <button
                  className="button add-bag-btn"
                  onClick={() => {
                    add(product);
                    onClose();
                  }}
                  aria-label={`Add ${product.name} to bag`}
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Add to Bag
                </button>

                <button
                  className={`wishlist-btn ${liked ? "liked" : ""}`}
                  onClick={() => toggle(product.id)}
                  aria-label="Wishlist"
                >
                  <Heart size={16} strokeWidth={1.5} fill={liked ? "currentColor" : "none"} />
                </button>
              </div>

              {product.materials && (
                <div className="quickview-materials">
                  <span className="eyebrow" style={{ fontSize: "8.5px", marginBottom: "4px" }}>Materials &amp; Care</span>
                  <p>{product.materials.join(" · ")}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
