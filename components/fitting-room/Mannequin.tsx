"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useWardrobeStore } from "@/store/wardrobeStore";
import type { OutfitSlot, Product } from "@/types";

const layers: OutfitSlot[] = ["bottom", "top", "outerwear", "accessories", "headwear", "footwear"];

export function Mannequin({ onAnchor }: { onAnchor: (slot: OutfitSlot, node: HTMLDivElement | null) => void }) {
  const outfit = useWardrobeStore((state) => state.outfit);
  const dressing = useWardrobeStore((state) => state.isDressing);
  const activeFlightId = useWardrobeStore((state) => state.activeFlightId);
  const setDressing = useWardrobeStore((state) => state.setDressing);

  return (
    <motion.div
      className="mannequin"
      animate={dressing ? { scale: [1, 1.025, 1] } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={() => {
        if (dressing) {
          setDressing(false, activeFlightId);
        }
      }}
    >
      <svg className="base-model" viewBox="0 0 1024 1536" aria-label="Permanent base model" role="img">
        <defs>
          <linearGradient id="skin" x1="0" x2="1">
            <stop stopColor="#c79172" />
            <stop offset="1" stopColor="#e7b296" />
          </linearGradient>
        </defs>
        <ellipse cx="512" cy="1400" rx="290" ry="58" fill="#050609" opacity=".55" />
        <circle cx="512" cy="185" r="103" fill="url(#skin)" />
        <path d="M420 185q88-135 183-7l-8 70H430z" fill="#15161a" />
        <path d="M418 315q94-70 188 0l93 92-72 125H397l-72-125z" fill="url(#skin)" />
        <path d="M407 492h210l60 264-82 94H429l-82-94z" fill="#b9b1a7" />
        <path d="M427 740h82l-39 510H328zM515 740h83l84 510H540z" fill="#706c69" />
        <path d="M306 1210h180v82H240q-4-50 66-82zm235 0h180v82H475q-4-50 66-82z" fill="#202024" />
      </svg>
      {layers.map((slot, index) => (
        <div key={slot} data-anchor={slot} ref={(node) => onAnchor(slot, node)} className={`anchor a-${slot}`}>
          <AnimatePresence mode="wait">
            {outfit[slot] && <MannequinLayer key={outfit[slot]!.id} product={outfit[slot]!} z={index + 2} />}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

function MannequinLayer({ product, z }: { product: Product; z: number }) {
  return (
    <motion.img
      src={product.modelLayerUrl}
      alt={product.name}
      className="garment-layer"
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
    />
  );
}
