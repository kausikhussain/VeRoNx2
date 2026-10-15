import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Account() {
  return (
    <>
      <Header />
      <main className="account-page">
        <span className="eyebrow">Client Services · Atelier Profile</span>
        <h1 className="serif">A considered record.</h1>
        <p style={{ color: "var(--muted)", maxWidth: "540px", marginBottom: "30px" }}>
          Manage your personal wardrobe selections, curated fittings, and order history.
        </p>

        <div className="account-grid">
          <section>
            <h2>Orders</h2>
            <p>No past orders recorded yet. Your next wardrobe piece is waiting.</p>
            <Link href="/shop">
              Shop the collection <ArrowUpRight size={11} strokeWidth={1.5} />
            </Link>
          </section>
          <section>
            <h2>Saved Looks</h2>
            <p>Return to saved digital fitting room compositions anytime.</p>
            <Link href="/shop">
              Open fitting studio <ArrowUpRight size={11} strokeWidth={1.5} />
            </Link>
          </section>
          <section>
            <h2>Wishlist</h2>
            <p>Atelier pieces you’ve marked for consideration.</p>
            <Link href="/wishlist">
              View wishlist <ArrowUpRight size={11} strokeWidth={1.5} />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
