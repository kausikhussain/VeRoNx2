"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export function ProductCard({ product, onTryOn }: { product: Product; onTryOn?: (product: Product, source: HTMLImageElement) => void }) {
  const toggle = useWishlistStore((state) => state.toggleWishlist);
  const liked = useWishlistStore((state) => state.isWishlisted(product.id));
  const add = useCartStore((state) => state.addItem);

  return (
    <article className="product-card">
      <div className="product-photo">
        <Link href={`/product/${product.slug}`}>
          <img data-product-image src={product.cardImageUrl} alt={product.name} />
        </Link>

        {product.badge && <small className="product-badge">{product.badge}</small>}

        <button className={liked ? "heart liked" : "heart"} onClick={() => toggle(product.id)} aria-label={`Add ${product.name} to wishlist`}>
          <Heart size={17} />
        </button>

        <div className="card-actions">
          <button
            className="try-on"
            onClick={(event) => onTryOn?.(product, event.currentTarget.closest("article")?.querySelector("img") as HTMLImageElement)}
            aria-label={`Try on ${product.name}`}
          >
            Try on
          </button>
          <button onClick={() => add(product)} aria-label={`Add ${product.name} to bag`}>
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>
          <span className="product-category">{product.category}</span>
          <span className="product-rating">
            <Star size={11} fill="currentColor" /> {product.rating.toFixed(1)}
          </span>
        </p>
        <strong>
          ₹{product.price.toLocaleString("en-IN")}
          {product.originalPrice && <del>₹{product.originalPrice.toLocaleString("en-IN")}</del>}
        </strong>
      </div>
    </article>
  );
}

