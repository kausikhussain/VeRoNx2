import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export default function Sale() {
  const saleItems = products.filter((p) => p.isSale);

  return (
    <>
      <Header />
      <main className="listing">
        <span className="eyebrow">Private Sale · Limited Release</span>
        <h1 className="serif">The considered edit.</h1>
        <p>Exceptional atelier pieces available for a brief moment in time.</p>
        <ProductGrid products={saleItems} />
      </main>
      <Footer />
    </>
  );
}
