"use client";
import { useCallback, useRef } from "react";
import { RotateCcw, Shirt, Footprints, HatGlasses, BriefcaseBusiness, PanelsTopLeft } from "lucide-react";
import { Mannequin } from "./Mannequin";
import { useWardrobeStore } from "@/store/wardrobeStore";
import type { OutfitSlot, Product } from "@/types";

const slots: { id: OutfitSlot; label: string; icon: typeof Shirt }[] = [
  { id: "headwear", label: "Headwear", icon: HatGlasses },
  { id: "top", label: "Tops", icon: Shirt },
  { id: "outerwear", label: "Outerwear", icon: PanelsTopLeft },
  { id: "bottom", label: "Bottoms", icon: BriefcaseBusiness },
  { id: "footwear", label: "Footwear", icon: Footprints },
  { id: "accessories", label: "Accessories", icon: BriefcaseBusiness },
];

export function FittingRoom() {
  const anchors = useRef<Partial<Record<OutfitSlot, HTMLDivElement>>>({});
  const { outfit, activeSlot, setActiveSlot, resetOutfit, unequip } = useWardrobeStore();

  const setAnchor = useCallback((slot: OutfitSlot, node: HTMLDivElement | null) => {
    if (node) anchors.current[slot] = node;
  }, []);

  const look = Object.values(outfit).filter(Boolean) as Product[];
  const count = look.length;

  return (
    <aside className="fitting-room">
      <div className="fit-head">
        <div>
          <span className="eyebrow">Fitting room</span>
          <strong className="fit-title">Live fit</strong>
        </div>
        <span className="fit-count">{String(count).padStart(2, "0")} / 06</span>
      </div>

      <div className="studio-shell">
        <div className="studio-glow" />
        <div className="model-stage">
          <Mannequin onAnchor={setAnchor} />
        </div>
      </div>

      <div className="look-summary">
        <div className="look-header">
          <span className="eyebrow">Your look</span>
          <button type="button" className="start-over" onClick={resetOutfit}>
            <RotateCcw size={12} />
            Start over
          </button>
        </div>

        <div className="outfit-chips">
          {look.map((product) => (
            <button type="button" key={product.id} className="chip" onClick={() => unequip(product.slot)}>
              <img src={product.modelLayerUrl} alt="" />
              <span>{product.name}</span>
              <small aria-label={`Remove ${product.name}`}>×</small>
            </button>
          ))}
        </div>
      </div>

      <div className="slot-switcher" aria-label="Wardrobe categories">
        {slots.map(({ id, label, icon: Icon }) => (
          <button key={id} className={activeSlot === id ? "active" : ""} onClick={() => setActiveSlot(id)}>
            <Icon size={14} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

