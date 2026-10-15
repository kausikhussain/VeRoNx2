"use client";
import { motion } from "framer-motion";
import { FlightPortal } from "./FlightPortal";
import type { Product } from "@/types";

export type Flight = {
  id: string;
  product: Product;
  source: DOMRect;
  target: DOMRect;
  onComplete: () => void;
};

export function FlyingGarmentOverlay({ flight }: { flight: Flight }) {
  const { source, target, product, onComplete } = flight;
  const sx = source.left;
  const sy = source.top;
  const ex = target.left;
  const ey = target.top;
  const mx = (sx + ex) / 2;
  const my = Math.min(sy, ey) - Math.max(80, Math.abs(ex - sx) * 0.14);

  return (
    <FlightPortal>
      <div style={{ position: "fixed", inset: 0, zIndex: 99999, pointerEvents: "none" }}>
        {/* ── Impact Glow on Mannequin ──────────────────────── */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.75, 0], scale: [0.3, 1.2, 1.7] }}
          transition={{ duration: 0.45, ease: "easeOut", times: [0, 0.4, 1] }}
          style={{
            position: "absolute",
            left: ex + target.width / 2,
            top: ey + target.height / 2,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,214,146,0.9) 0%, rgba(255,107,53,0.65) 45%, rgba(255,107,53,0) 100%)",
            boxShadow: "0 0 24px rgba(255, 107, 53, 0.7)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* ── Flying Transparent Garment Proxy ──────────────── */}
        <motion.img
          src={product.cardImageUrl || product.modelLayerUrl}
          alt=""
          aria-hidden
          initial={{
            left: sx,
            top: sy,
            width: source.width,
            height: source.height,
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          animate={{
            left: [sx, mx, ex],
            top: [sy, my, ey],
            width: [source.width, (source.width + target.width) / 2, target.width],
            height: [source.height, (source.height + target.height) / 2, target.height],
            scale: [1, 0.90, 0.76, 1],
            rotate: [0, -12, 6, 0],
            opacity: [1, 1, 1, 0.95],
          }}
          transition={{
            duration: 0.6,
            times: [0, 0.35, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={onComplete}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            pointerEvents: "none",
            filter: "drop-shadow(0 20px 18px rgba(0,0,0,0.5))",
            zIndex: 99999,
          }}
        />
      </div>
    </FlightPortal>
  );
}
