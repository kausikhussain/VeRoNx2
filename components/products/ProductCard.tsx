"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import type { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useWardrobeStore } from "@/store/wardrobeStore";

function HangerIcon({ size = 12 }: { size?: number }) {
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

export function ProductCard({
  product,
  onTryOn,
  onQuickView,
}: {
  product: Product;
  onTryOn?: (product: Product, source?: HTMLImageElement | null) => void;
  onQuickView?: (product: Product) => void;
}) {
  const toggle = useWishlistStore((state) => state.toggleWishlist);
  const liked = useWishlistStore((state) => state.isWishlisted(product.id));
  const add = useCartStore((state) => state.addItem);
  const equipped = useWardrobeStore((state) => state.isEquipped(product.id));
  const isCurrentlyPreviewed = useWardrobeStore(
    (state) => state.activePreviewProduct?.id === product.id
  );

  const handleCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const imgEl = e.currentTarget.querySelector("img");
    onTryOn?.(product, imgEl);
  };

  return (
    <article className={`product-card ${equipped ? "is-equipped" : ""} ${isCurrentlyPreviewed ? "is-active-preview" : ""}`}>
      <div className="product-photo">
        <button
          type="button"
          className="photo-btn"
          onClick={handleCardClick}
          aria-label={`Try on ${product.name} in fitting studio`}
          title={`Click to try on ${product.name} in studio`}
        >
          <img
            data-product-image
            src={product.cardImageUrl}
            alt={product.name}
            loading="lazy"
          />
        </button>

        {equipped ? (
          <span className="equipped-badge">
            <span className="equipped-dot" />
            {isCurrentlyPreviewed ? "On Stage" : "Equipped"}
          </span>
        ) : product.badge ? (
          <small className="product-badge">{product.badge}</small>
        ) : null}

        <div className="top-card-actions">
          {onQuickView && (
            <button
              type="button"
              className="quickview-btn"
              onClick={() => onQuickView(product)}
              aria-label={`Quick view ${product.name}`}
              title="Quick view"
            >
              <Eye size={13} strokeWidth={1.5} />
            </button>
          )}
          <button
            type="button"
            className={liked ? "heart liked" : "heart"}
            onClick={() => toggle(product.id)}
            aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart size={14} strokeWidth={1.5} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className={`try-on ${equipped ? "equipped" : ""}`}
            onClick={(event) => {
              const img = event.currentTarget.closest("article")?.querySelector("img");
              onTryOn?.(product, img || null);
            }}
            aria-label={`Try on ${product.name}`}
          >
            <HangerIcon size={12} />
            {equipped ? (isCurrentlyPreviewed ? "On Stage" : "Wearing") : "Try On"}
          </button>
          <button
            type="button"
            className="add-bag-icon-btn"
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to bag`}
            title="Add to bag"
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>
          <span className="product-category">{product.category} · {product.color}</span>
          <span className="product-rating">
            <Star size={9.5} fill="currentColor" strokeWidth={0} /> {product.rating.toFixed(1)}
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
