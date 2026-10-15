"use client";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  onTryOn,
  onQuickView,
}: {
  products: Product[];
  onTryOn?: (p: Product, source?: HTMLImageElement | null) => void;
  onQuickView?: (p: Product) => void;
}) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onTryOn={onTryOn} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
