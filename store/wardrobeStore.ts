"use client";
import { create } from "zustand"; import { defaultOutfit } from "@/data/products"; import type { Outfit, OutfitSlot, Product } from "@/types";

type WardrobeState = {
  outfit: Outfit;
  activeSlot: OutfitSlot;
  isDressing: boolean;
  activeFlightId: string | null;
  equipItem: (p: Product) => void;
  unequip: (s: OutfitSlot) => void;
  resetOutfit: () => void;
  isEquipped: (id: string) => boolean;
  setActiveSlot: (s: OutfitSlot) => void;
  setDressing: (v: boolean, id?: string | null) => void;
};

export const useWardrobeStore = create<WardrobeState>((set, get) => ({
  outfit: defaultOutfit,
  activeSlot: "outerwear",
  isDressing: false,
  activeFlightId: null,
  equipItem: (product) =>
    set((state) => ({
      outfit: { ...state.outfit, [product.slot]: product },
      activeSlot: product.slot,
    })),
  unequip: (slot) =>
    set((state) => ({
      outfit: { ...state.outfit, [slot]: null },
    })),
  resetOutfit: () =>
    set({
      outfit: defaultOutfit,
      activeSlot: "outerwear",
      isDressing: false,
      activeFlightId: null,
    }),
  isEquipped: (id) => Object.values(get().outfit).some((product) => product?.id === id),
  setActiveSlot: (activeSlot) => set({ activeSlot }),
  setDressing: (isDressing, id = null) =>
    set((state) => {
      if (isDressing) {
        return {
          isDressing: true,
          activeFlightId: id ?? state.activeFlightId,
        };
      }

      if (id && state.activeFlightId && state.activeFlightId !== id) {
        return state;
      }

      return {
        isDressing: false,
        activeFlightId: null,
      };
    }),
}));
