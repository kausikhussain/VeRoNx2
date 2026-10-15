"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { ArrowUpRight, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  const subtotal = items.reduce((n, i) => n + i.product.price * i.quantity, 0);

  return (
    <>
      <Header />
      <main className="commerce">
        <span className="eyebrow">Your Selection</span>
        <h1 className="serif">Shopping bag</h1>

        {items.length ? (
          <div className="bag">
            <section>
              {items.map(({ product, quantity }) => (
                <article className="bag-item" key={product.id}>
                  <img src={product.cardImageUrl} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.colors[0]} · {product.sizes[2] || "One size"}</p>
                    <button onClick={() => removeItem(product.id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                  <div className="qty">
                    <button onClick={() => decreaseQuantity(product.id)} aria-label="Decrease quantity">−</button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)} aria-label="Increase quantity">+</button>
                  </div>
                  <strong>₹{(product.price * quantity).toLocaleString("en-IN")}</strong>
                </article>
              ))}
            </section>

            <aside className="order">
              <span className="eyebrow" style={{ marginBottom: "12px" }}>Order Summary</span>
              <p>
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </p>
              <p>
                <span>Delivery</span>
                <span>Complimentary</span>
              </p>
              <hr />
              <h3>
                <span>Total</span>
                <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
              </h3>
              <Link className="button primary" href="/checkout">
                Proceed to checkout <ArrowUpRight size={13} strokeWidth={1.5} />
              </Link>
            </aside>
          </div>
        ) : (
          <div className="empty">
            <p>Your bag is currently empty.</p>
            <Link className="button primary" href="/shop">
              Explore the collection <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
