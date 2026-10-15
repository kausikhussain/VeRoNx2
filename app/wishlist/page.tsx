"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import { useWishlistStore } from "@/store/wishlistStore";

export default function Wishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Header />
      <main className="listing">
        <span className="eyebrow">Saved for Later</span>
        <h1 className="serif">Wishlist</h1>
        <p>{saved.length} {saved.length === 1 ? "item" : "items"} saved.</p>

        {saved.length ? (
          <ProductGrid products={saved} />
        ) : (
          <div className="empty">
            <p>Your wishlist is currently empty.</p>
            <Link className="button primary" href="/shop">
              Discover the collection <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
