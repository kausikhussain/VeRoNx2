import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export default function NewArrivals() {
  const newItems = products.filter((p) => p.isNew);

  return (
    <>
      <Header />
      <main className="listing">
        <span className="eyebrow">Just In · AW26</span>
        <h1 className="serif">New arrivals</h1>
        <p>Curated pieces for the season ahead, crafted with enduring proportions.</p>
        <ProductGrid products={newItems} />
      </main>
      <Footer />
    </>
  );
}
