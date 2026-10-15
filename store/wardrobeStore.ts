"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultOutfit } from "@/data/products";
import type { Outfit, OutfitSlot, Product } from "@/types";

export type SavedLook = {
  id: string;
  name: string;
  date: string;
  outfit: Outfit;
  totalPrice: number;
};

type WardrobeState = {
  outfit: Outfit;
  activePreviewProduct: Product | null;
  activeSlot: OutfitSlot;
  isDressing: boolean;
  activeFlightId: string | null;
  savedLooks: SavedLook[];
  equipItem: (p: Product) => void;
  unequip: (s: OutfitSlot) => void;
  resetOutfit: () => void;
  isEquipped: (id: string) => boolean;
  setActiveSlot: (s: OutfitSlot) => void;
  setActivePreviewProduct: (p: Product | null) => void;
  setDressing: (v: boolean, id?: string | null) => void;
  saveCurrentLook: (customName?: string) => string;
  loadSavedLook: (id: string) => void;
  deleteSavedLook: (id: string) => void;
};

export const useWardrobeStore = create<WardrobeState>()(
  persist(
    (set, get) => ({
      outfit: defaultOutfit,
      activePreviewProduct: null,
      activeSlot: "outerwear",
      isDressing: false,
      activeFlightId: null,
      savedLooks: [],

      equipItem: (product) =>
        set((state) => ({
          outfit: { ...state.outfit, [product.slot]: product },
          activePreviewProduct: product,
          activeSlot: product.slot,
        })),

      unequip: (slot) =>
        set((state) => {
          const updatedOutfit = { ...state.outfit, [slot]: null };
          let nextPreview = state.activePreviewProduct;
          if (state.activePreviewProduct?.slot === slot) {
            // Find another equipped piece to preview
            const remaining = Object.values(updatedOutfit).filter(Boolean) as Product[];
            nextPreview = remaining.length > 0 ? remaining[remaining.length - 1] : null;
          }
          return {
            outfit: updatedOutfit,
            activePreviewProduct: nextPreview,
          };
        }),

      resetOutfit: () =>
        set({
          outfit: {
            outerwear: null,
            top: null,
            bottom: null,
            footwear: null,
            headwear: null,
            accessories: null,
          },
          activePreviewProduct: null,
          activeSlot: "outerwear",
          isDressing: false,
          activeFlightId: null,
        }),

      isEquipped: (id) =>
        Object.values(get().outfit).some((product) => product?.id === id),

      setActiveSlot: (activeSlot) => set({ activeSlot }),

      setActivePreviewProduct: (product) => set({ activePreviewProduct: product }),

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

      saveCurrentLook: (customName) => {
        const state = get();
        const activeItems = Object.values(state.outfit).filter(Boolean) as Product[];
        const total = activeItems.reduce((acc, p) => acc + p.price, 0);
        const id = `look-${Date.now()}`;
        const name =
          customName?.trim() ||
          `VeRoN Curated Look #${state.savedLooks.length + 1} (${activeItems.length} pcs)`;

        const newLook: SavedLook = {
          id,
          name,
          date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          outfit: { ...state.outfit },
          totalPrice: total,
        };

        set((s) => ({ savedLooks: [newLook, ...s.savedLooks] }));
        return id;
      },

      loadSavedLook: (id) => {
        const target = get().savedLooks.find((l) => l.id === id);
        if (target) {
          const items = Object.values(target.outfit).filter(Boolean) as Product[];
          set({
            outfit: { ...target.outfit },
            activePreviewProduct: items[0] || null,
            isDressing: true,
          });
          setTimeout(() => set({ isDressing: false }), 300);
        }
      },

      deleteSavedLook: (id) => {
        set((s) => ({ savedLooks: s.savedLooks.filter((l) => l.id !== id) }));
      },
    }),
    {
      name: "veron-wardrobe-v1",
      partialize: (state) => ({ savedLooks: state.savedLooks }),
    }
  )
);
