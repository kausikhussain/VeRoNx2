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
  const my = Math.min(sy, ey) - Math.max(70, Math.abs(ex - sx) * 0.12);

  return (
    <FlightPortal>
      <div style={{ position: "fixed", inset: 0, zIndex: 99999, pointerEvents: "none" }}>
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.3, 1.8] }}
          transition={{ duration: 0.45, ease: "easeOut", times: [0, 0.45, 1] }}
          style={{
            position: "absolute",
            left: ex + target.width / 2,
            top: ey + target.height / 2,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,214,146,0.96) 0%, rgba(255,107,53,0.82) 42%, rgba(255,107,53,0) 100%)",
            boxShadow: "0 0 26px rgba(255, 107, 53, 0.8)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <motion.img
          src={product.modelLayerUrl}
          alt=""
          aria-hidden
          initial={{ left: sx, top: sy, width: source.width, height: source.height, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            left: [sx, mx, ex],
            top: [sy, my, ey],
            width: [source.width, (source.width + target.width) / 2, target.width],
            height: [source.height, (source.height + target.height) / 2, target.height],
            scale: [1, 0.9, 0.76, 1],
            rotate: [0, -14, 6, 0],
            opacity: [1, 1, 1, 0.94],
          }}
          transition={{ duration: 0.7, times: [0, 0.35, 0.7, 1], ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onComplete}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            pointerEvents: "none",
            filter: "drop-shadow(0 16px 14px rgba(0,0,0,.36))",
            zIndex: 99999,
          }}
        />
      </div>
    </FlightPortal>
  );
}
