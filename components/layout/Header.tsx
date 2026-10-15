"use client";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <Link href="/" className="wordmark">
          VeRoN
        </Link>

        <nav aria-label="Main navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/new-arrivals">New Arrivals</Link>
          <Link href="/look/aw26">Collections</Link>
          <Link href="/sale">Sale</Link>
        </nav>

        <div className="head-actions">
          <button onClick={() => setSearchOpen(true)} aria-label="Search collection" title="Search">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <span className="currency">INR</span>
          <Link href="/wishlist" aria-label={`Wishlist (${wishlistCount})`} title="Wishlist">
            <Heart size={17} strokeWidth={1.5} />
            {wishlistCount > 0 && <b className="wish-badge">{wishlistCount}</b>}
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label={`Shopping bag (${cartCount})`} title="Cart">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
          <Link className="account" href="/account" aria-label="Account" title="Account">
            <UserRound size={17} strokeWidth={1.5} />
          </Link>
          <button className="menu" onClick={() => setMenuOpen(true)} aria-label="Open mobile menu">
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ── Cart Drawer ─────────────────────────────────────── */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── Mobile Menu ─────────────────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={22} strokeWidth={1.5} />
          </button>
          <Link onClick={() => setMenuOpen(false)} href="/shop">Shop Collection</Link>
          <Link onClick={() => setMenuOpen(false)} href="/new-arrivals">New Arrivals</Link>
          <Link onClick={() => setMenuOpen(false)} href="/look/aw26">Collections</Link>
          <Link onClick={() => setMenuOpen(false)} href="/sale">Private Sale</Link>
          <Link onClick={() => setMenuOpen(false)} href="/wishlist">Wishlist ({wishlistCount})</Link>
          <Link onClick={() => setMenuOpen(false)} href="/account">Atelier Profile</Link>
        </div>
      )}

      {/* ── Search Overlay ──────────────────────────────────── */}
      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true">
          <button onClick={() => setSearchOpen(false)} aria-label="Close search">
            <X size={22} strokeWidth={1.5} />
          </button>
          <p className="eyebrow">Search the Collection</p>
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trench coats, knitwear, trousers…"
          />
          <span>Press Esc to return</span>
        </div>
      )}
    </>
  );
}
