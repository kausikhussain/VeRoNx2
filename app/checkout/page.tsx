"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { Lock, ArrowUpRight } from "lucide-react";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const n = items.reduce((a, i) => a + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <>
      <Header />
      <main className="checkout">
        <div>
          <span className="eyebrow">Secure Atelier Checkout</span>
          <h1 className="serif">A few final details.</h1>
          <Form title="Contact Information" fields={["Email address", "Phone number"]} />
          <Form title="Delivery Address" fields={["First name", "Last name", "Address", "Apartment / Suite", "City", "State / Province", "Postal code", "Country"]} />
          <Form title="Payment Details" fields={["Card number", "Name on card", "MM / YY", "CVC"]} />
        </div>

        <aside className="order">
          <span className="eyebrow" style={{ marginBottom: "12px" }}>Order Review</span>
          <p>
            <span>Selection</span>
            <strong>{n} item{n === 1 ? "" : "s"}</strong>
          </p>
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

          <button className="button primary" style={{ width: "100%", marginTop: "16px" }}>
            <Lock size={12} strokeWidth={1.8} />
            Place Order · ₹{subtotal.toLocaleString("en-IN")}
          </button>
          <p style={{ fontSize: "10px", color: "var(--muted-dim)", marginTop: "12px", textAlign: "center" }}>
            Encrypted with 256-bit SSL security.
          </p>
        </aside>
      </main>
      <Footer />
    </>
  );
}

function Form({ title, fields }: { title: string; fields: string[] }) {
  return (
    <section className="form">
      <h2>{title}</h2>
      {fields.map((x) => (
        <input key={x} placeholder={x} />
      ))}
    </section>
  );
}
