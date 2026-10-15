"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowUpRight, Check, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useWardrobeStore } from "@/store/wardrobeStore";
import type { Product } from "@/types";

export function ProductDetailActions({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const equipItem = useWardrobeStore((s) => s.equipItem);
  const isEquipped = useWardrobeStore((s) => s.isEquipped(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const liked = useWishlistStore((s) => s.isWishlisted(product.id));

  const handleAddToBag = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleTryOn = () => {
    equipItem(product);
    router.push(`/shop?tryOn=${product.slug}`);
  };

  return (
    <div className="pdp-interactive">
      {/* ── Size Selector ─────────────────────────────────── */}
      <div style={{ margin: "24px 0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span className="eyebrow" style={{ fontSize: "9px" }}>Select Size</span>
          <span style={{ fontSize: "10px", color: "var(--luxury)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Size Guide</span>
        </div>
        <div className="sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={selectedSize === size ? "selected" : ""}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ── Primary Action Buttons ─────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
        <button
          type="button"
          className={`button primary pdp-add-btn ${added ? "added" : ""}`}
          onClick={handleAddToBag}
          style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          {added ? (
            <>
              <Check size={14} strokeWidth={2} />
              Added to Shopping Bag
            </>
          ) : (
            <>
              <ShoppingBag size={14} strokeWidth={1.5} />
              Add to Bag · ₹{product.price.toLocaleString("en-IN")}
            </>
          )}
        </button>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="button secondary pdp-try-btn"
            onClick={handleTryOn}
            style={{ flex: 1, height: "42px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          >
            <span>{isEquipped ? "Currently Wearing in Studio" : "Try on in Fitting Room"}</span>
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            className={`button secondary pdp-wishlist-btn ${liked ? "liked" : ""}`}
            onClick={() => toggleWishlist(product.id)}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            style={{ width: "42px", height: "42px", display: "grid", placeItems: "center", color: liked ? "var(--accent)" : "var(--muted)" }}
          >
            <Heart size={15} strokeWidth={1.5} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
