import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="hero">
          <div className="campaign-art">
            <img
              src="/images/hero-campaign.jpg"
              alt="VeRoN Autumn/Winter 2026 Campaign"
            />
          </div>
          <div className="hero-copy">
            <span className="eyebrow">Autumn / Winter 2026</span>
            <h1 className="serif">
              Dress
              <br />
              the moment.
            </h1>
            <p>
              Build your look. Try every layer before you buy.
            </p>
            <div>
              <Link className="button primary" href="/shop">
                Enter fitting room <ArrowUpRight size={14} strokeWidth={1.5} />
              </Link>
              <Link className="button" href="/shop">
                Explore collection
              </Link>
            </div>
          </div>
        </section>

        {/* ── Intro ───────────────────────────────────────── */}
        <section className="intro">
          <span className="eyebrow">A more considered wardrobe</span>
          <h2 className="serif">
            Every piece begins with a point of view. Every look becomes entirely your own.
          </h2>
        </section>

        {/* ── Feature Fit ─────────────────────────────────── */}
        <section className="feature-fit">
          <div>
            <span className="eyebrow">The VeRoN fitting studio</span>
            <h2 className="serif">
              Try it on
              <br />
              before you buy it.
            </h2>
            <p>
              Select real garments from the Essentials catalog. Watch the verified outfit
              reveal seamlessly on the model in live high definition.
            </p>
            <Link className="text-link" href="/shop">
              Build your look <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="fit-preview">
            <div className="fit-preview-overlay">
              <span>
                VeRoN
                <i>FIT / 01</i>
              </span>
            </div>
            <img
              src="/images/editorial-autumn.jpg"
              alt="VeRoN Fitting Room Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.6)" }}
            />
          </div>
        </section>

        {/* ── New Arrivals ────────────────────────────────── */}
        <section className="rail">
          <div className="section-title">
            <div>
              <span className="eyebrow">New arrivals</span>
              <h2 className="serif">Selected for now.</h2>
            </div>
            <Link href="/new-arrivals" className="text-link">
              View all <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── Editorial ───────────────────────────────────── */}
        <section className="editorial">
          <div className="editorial-art">
            <img
              src="/images/editorial-autumn.jpg"
              alt="The Autumn Edit"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.65)" }}
            />
          </div>
          <div>
            <span className="eyebrow">The collection</span>
            <h2 className="serif">
              An exercise in
              <br />
              quiet confidence.
            </h2>
            <Link className="button" href="/look/aw26">
              Explore AW26
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
