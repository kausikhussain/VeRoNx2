"use client";
import { useMemo, useCallback, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, RotateCcw } from "lucide-react";
import { FittingRoom } from "@/components/fitting-room/FittingRoom";
import { ProductGrid } from "@/components/products/ProductGrid";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products, bySlug } from "@/data/products";
import { useWardrobeStore } from "@/store/wardrobeStore";
import type { Product } from "@/types";

const categories = [
  { key: "all", label: "All Pieces" },
  { key: "outerwear", label: "Outerwear" },
  { key: "top", label: "Tops" },
  { key: "bottom", label: "Bottoms" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const equip = useWardrobeStore((s) => s.equipItem);

  // Sync with URL parameters
  useEffect(() => {
    const tryOnSlug = searchParams.get("tryOn");
    if (tryOnSlug) {
      const targetProduct = bySlug(tryOnSlug);
      if (targetProduct) {
        equip(targetProduct);
      }
    }

    const catParam = searchParams.get("category");
    if (catParam && categories.some((c) => c.key === catParam)) {
      setFilter(catParam);
    }
  }, [searchParams, equip]);

  // Immediate, seamless product selection
  const tryOn = useCallback(
    (p: Product) => {
      equip(p);
    },
    [equip]
  );

  const shown = useMemo(
    () =>
      products
        .filter((p) => filter === "all" || p.slot === filter)
        .sort((a, b) =>
          sort === "price-asc"
            ? a.price - b.price
            : sort === "price-desc"
            ? b.price - a.price
            : sort === "new"
            ? Number(b.isNew) - Number(a.isNew)
            : 0
        ),
    [filter, sort]
  );

  return (
    <>
      <Header />
      <main className="shop-shell">
        <FittingRoom onCategorySelect={(slot) => setFilter(slot === "all" ? "all" : slot)} />

        <section className="discovery" id="catalog-section">
          {/* ── Editorial Section Title ────────────────────── */}
          <div className="shop-title">
            <div>
              <span className="eyebrow">VeRoN Atelier · Autumn / Winter 2026</span>
              <h1 className="serif">Essentials Catalog</h1>
              <p>
                {shown.length} {shown.length === 1 ? "piece" : "pieces"} available · Select any piece to preview the verified outfit
              </p>
            </div>
            <div className="filter-summary-badge">
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              <span>Catalog Navigation</span>
            </div>
          </div>

          {/* ── Category Filters & Controls ───────────────── */}
          <div className="filters-bar">
            <div className="category-pills" role="tablist" aria-label="Product categories">
              {categories.map(({ key, label }) => {
                const count = key === "all" ? products.length : products.filter((p) => p.slot === key).length;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={filter === key}
                    className={`filter-pill ${filter === key ? "selected" : ""}`}
                    onClick={() => setFilter(key)}
                  >
                    <span>{label}</span>
                    <span className="pill-count">({count})</span>
                  </button>
                );
              })}

              {filter !== "all" && (
                <button
                  type="button"
                  className="filter-reset-btn"
                  onClick={() => setFilter("all")}
                  title="Show all pieces"
                >
                  <RotateCcw size={10} strokeWidth={1.5} />
                  Show All
                </button>
              )}
            </div>

            <div className="sort-control">
              <label htmlFor="sort-select" className="sort-label">Sort:</label>
              <div className="select-wrapper">
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort collection"
                >
                  <option value="featured">Featured</option>
                  <option value="new">New arrivals</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
                <ChevronDown size={11} className="select-arrow" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* ── Product Grid ──────────────────────────────── */}
          <ProductGrid
            products={shown}
            onTryOn={(p) => tryOn(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </section>

        {/* ── Quick View Modal ────────────────────────────── */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onTryOn={(p) => tryOn(p)}
        />
      </main>
      <Footer />
    </>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="studio-loading" />}>
      <ShopContent />
    </Suspense>
  );
}
