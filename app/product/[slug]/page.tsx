import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { bySlug, products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailActions } from "./ProductDetailActions";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const p = bySlug(resolvedParams.slug);
  if (!p) return notFound();

  return (
    <>
      <Header />
      <main className="pdp">
        <div className="pdp-image">
          <img src={p.cardImageUrl} alt={p.name} />
          {p.badge && <small className="product-badge">{p.badge}</small>}
        </div>

        <section className="pdp-details">
          <Link href="/shop" className="pdp-back-link">
            <ArrowLeft size={13} strokeWidth={1.5} />
            <span>Back to Collection</span>
          </Link>

          <span className="eyebrow">{p.category} · Atelier Collection</span>
          <h1 className="serif">{p.name}</h1>
          <h3 className="pdp-price">
            ₹{p.price.toLocaleString("en-IN")}
            {p.originalPrice && (
              <del style={{ marginLeft: "10px", color: "var(--muted-dim)", fontSize: "14px", fontWeight: 400 }}>
                ₹{p.originalPrice.toLocaleString("en-IN")}
              </del>
            )}
          </h3>
          <p className="pdp-description">{p.description}</p>

          <ProductDetailActions product={p} />

          {p.materials && (
            <div style={{ marginTop: "36px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
              <span className="eyebrow" style={{ marginBottom: "10px" }}>Craft &amp; Materials</span>
              <ul style={{ listStyle: "none", color: "var(--muted)", fontSize: "12px", lineHeight: "1.8" }}>
                {p.materials.map((m) => (
                  <li key={m} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "var(--luxury)" }}>—</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      <section className="rail">
        <div className="section-title">
          <div>
            <span className="eyebrow">Curated Pairing</span>
            <h2 className="serif">Complete the look</h2>
          </div>
          <Link href="/shop" className="text-link">
            Open Fitting Room <ArrowUpRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((x) => x.slot !== p.slot)
            .slice(0, 4)
            .map((x) => (
              <ProductCard product={x} key={x.id} />
            ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
