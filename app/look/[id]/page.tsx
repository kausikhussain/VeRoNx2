import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function LookPage() {
  return (
    <>
      <Header />
      <main className="look-page">
        <span className="eyebrow">VeRoN / AW26 EDITORIAL</span>
        <h1 className="serif">Notes on<br />soft structure.</h1>
        <p>
          Autumn / Winter 2026 explores calibrated volume, deep tonal contrast, and a wardrobe built to become more personal with time. Every silhouette is cut with quiet confidence.
        </p>
        <Link href="/shop" className="button primary">
          Explore the collection <ArrowUpRight size={13} strokeWidth={1.5} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
