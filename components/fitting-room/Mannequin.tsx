"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Layers } from "lucide-react";
import { useWardrobeStore } from "@/store/wardrobeStore";
import type { OutfitSlot, Product } from "@/types";

export function Mannequin({
  onAnchor,
}: {
  onAnchor?: (slot: OutfitSlot, node: HTMLDivElement | null) => void;
}) {
  const outfit = useWardrobeStore((state) => state.outfit);
  const activePreviewProduct = useWardrobeStore((state) => state.activePreviewProduct);
  const setActivePreviewProduct = useWardrobeStore((state) => state.setActivePreviewProduct);
  const resetOutfit = useWardrobeStore((state) => state.resetOutfit);

  // List of all currently equipped products in the look
  const equippedProducts = Object.values(outfit).filter(Boolean) as Product[];
  const hasSelection = equippedProducts.length > 0;

  // Resolve target product from selection
  const targetProduct = activePreviewProduct || (hasSelection ? equippedProducts[equippedProducts.length - 1] : null);

  // Double-buffering state for seamless zero-flicker transitions
  const [currentProduct, setCurrentProduct] = useState<Product | null>(targetProduct);
  const [incomingProduct, setIncomingProduct] = useState<Product | null>(null);

  // Race condition tracker: ensures rapid clicks safely supersede earlier ones
  const requestIdRef = useRef(0);

  useEffect(() => {
    // Empty state (no item selected or after reset)
    if (!targetProduct) {
      requestIdRef.current++;
      setCurrentProduct(null);
      setIncomingProduct(null);
      return;
    }

    // Already settled on this product: no-op to avoid unnecessary re-animation
    if (currentProduct?.id === targetProduct.id && !incomingProduct) {
      return;
    }

    const reqId = ++requestIdRef.current;
    const targetUrl = targetProduct.outfitImageUrl;

    // Preload & decode image in background
    const img = new Image();
    img.src = targetUrl;

    const onReady = () => {
      // If a newer selection occurred while decoding, safely drop this stale request
      if (requestIdRef.current !== reqId) return;

      if (!currentProduct) {
        // From empty state to first product: immediate display
        setCurrentProduct(targetProduct);
      } else {
        // Double-buffer crossfade: current stays visible beneath, incoming fades in on top
        setIncomingProduct(targetProduct);
      }
    };

    if (typeof img.decode === "function") {
      img.decode().then(onReady).catch(onReady);
    } else {
      (img as HTMLImageElement).onload = onReady;
      (img as HTMLImageElement).onerror = onReady;
    }
  }, [targetProduct, currentProduct, incomingProduct]);

  // When incoming crossfade finishes, promote incoming to current and clear buffer
  const handleCrossfadeComplete = () => {
    if (incomingProduct) {
      setCurrentProduct(incomingProduct);
      setIncomingProduct(null);
    }
  };

  const activeDisplay = incomingProduct || currentProduct;

  return (
    <div className="studio-stage-inner">
      {/* ── Studio Architectural Markers & Frame ──────────── */}
      <div className="studio-crosshairs" aria-hidden="true">
        <span className="ch ch-tl">+</span>
        <span className="ch ch-tr">+</span>
        <span className="ch ch-bl">+</span>
        <span className="ch ch-br">+</span>
      </div>

      <AnimatePresence mode="wait">
        {!activeDisplay ? (
          /* ── Neutral Intentional Empty State ("Build your look") ── */
          <motion.div
            key="empty-state"
            className="studio-empty-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="empty-silhouette-wrap">
              <svg
                className="empty-silhouette-icon"
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 20 C46 20 42 24 46 28 C49 31 52 32 50 38 L18 56 C14 58 14 62 18 64 L82 64 C86 62 86 58 82 56 L50 38"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />
                <circle cx="50" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
                <path
                  d="M30 64 L34 105 C35 108 37 110 40 110 L60 110 C63 110 65 108 66 105 L70 64"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.2"
                />
              </svg>
              <div className="empty-glow-spot" />
            </div>

            <div className="empty-copy">
              <span className="eyebrow">Virtual Fitting Studio</span>
              <h2 className="serif">Build your look</h2>
              <p>Select any piece from Essentials to see the matching model outfit live.</p>
              <div className="empty-status-pill">
                <span className="status-live-dot" />
                <span>Awaiting selection</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Photorealistic Mapped Model Preview Stage ───────── */
          <div key="active-stage" className="studio-model-container">
            {/* Top Floating Studio HUD */}
            <div className="studio-hud-top">
              <div className="hud-badge">
                <CheckCircle2 size={11} className="hud-icon" strokeWidth={2} />
                <span>Verified Look · {activeDisplay.category}</span>
              </div>
              <button
                type="button"
                className="hud-reset-btn"
                onClick={resetOutfit}
                title="Reset outfit"
                aria-label="Reset current outfit"
              >
                <RotateCcw size={11} strokeWidth={1.5} />
                <span>Reset</span>
              </button>
            </div>

            {/* Seamless Double-Buffered Model Frame */}
            <div className="studio-model-frame">
              {/* Base Layer: Currently settled product (stays 100% visible during decode) */}
              {currentProduct && (
                <img
                  key={`base-${currentProduct.id}`}
                  src={currentProduct.outfitImageUrl}
                  alt={`${currentProduct.name} Outfit`}
                  className="studio-model-img base-layer"
                  draggable={false}
                  loading="eager"
                  decoding="async"
                />
              )}

              {/* Incoming Layer: Fades in on top smoothly once fully decoded */}
              {incomingProduct && (
                <motion.img
                  key={`incoming-${incomingProduct.id}`}
                  src={incomingProduct.outfitImageUrl}
                  alt={`${incomingProduct.name} Outfit`}
                  className="studio-model-img incoming-layer"
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.988 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  onAnimationComplete={handleCrossfadeComplete}
                />
              )}

              <div className="studio-model-shadow" />
            </div>

            {/* Bottom Floating Studio HUD */}
            <div className="studio-hud-bottom">
              {equippedProducts.length > 1 ? (
                <div className="multi-piece-bar">
                  <div className="multi-piece-label">
                    <Layers size={10} strokeWidth={1.5} />
                    <span>Styling Reference:</span>
                  </div>
                  <div className="multi-piece-chips">
                    {equippedProducts.map((p) => {
                      const isActive = p.id === activeDisplay.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className={`piece-tab ${isActive ? "active" : ""}`}
                          onClick={() => setActivePreviewProduct(p)}
                          title={`Preview ${p.name}`}
                        >
                          <span className="piece-dot" />
                          <span>{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="single-piece-hud">
                  <div className="hud-product-info">
                    <span className="hud-eyebrow">Featuring</span>
                    <strong className="hud-title">{activeDisplay.name}</strong>
                    <span className="hud-color">
                      {activeDisplay.color} · ₹{activeDisplay.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Anchor targets */}
      {(["bottom", "top", "outerwear", "footwear"] as OutfitSlot[]).map((slot) => (
        <div
          key={slot}
          data-anchor={slot}
          ref={(node) => onAnchor?.(slot, node)}
          className={`anchor-target a-${slot}`}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />
      ))}
    </div>
  );
}
