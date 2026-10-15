"use client";
import { useCallback, useRef, useState } from "react";
import {
  RotateCcw,
  ShoppingBag,
  Check,
  Bookmark,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Mannequin } from "./Mannequin";
import { useWardrobeStore } from "@/store/wardrobeStore";
import { useCartStore } from "@/store/cartStore";
import type { OutfitSlot, Product } from "@/types";

export function FittingRoom({
  onCategorySelect,
}: {
  onCategorySelect?: (slot: OutfitSlot | "all") => void;
}) {
  const anchors = useRef<Partial<Record<OutfitSlot, HTMLDivElement>>>({});
  const {
    outfit,
    activePreviewProduct,
    setActivePreviewProduct,
    resetOutfit,
    unequip,
    savedLooks,
    saveCurrentLook,
    loadSavedLook,
    deleteSavedLook,
  } = useWardrobeStore();
  const addItem = useCartStore((s) => s.addItem);

  const [addedNotice, setAddedNotice] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);

  const setAnchor = useCallback((slot: OutfitSlot, node: HTMLDivElement | null) => {
    if (node) anchors.current[slot] = node;
  }, []);

  const look = Object.values(outfit).filter(Boolean) as Product[];
  const count = look.length;
  const total = look.reduce((sum, p) => sum + p.price, 0);

  const addCompleteLook = () => {
    if (look.length === 0) return;
    look.forEach((p) => addItem(p));
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleSaveLook = () => {
    if (count === 0) return;
    saveCurrentLook();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2200);
  };

  return (
    <aside className="fitting-room" aria-label="Virtual Fitting Studio">
      {/* ── Studio Header ───────────────────────────────────── */}
      <div className="fit-head">
        <div>
          <span className="eyebrow">Virtual Styling Studio</span>
          <div className="fit-title">
            <span className="live-dot" />
            Live Preview
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {savedLooks.length > 0 && (
            <button
              type="button"
              className="saved-looks-trigger"
              onClick={() => setSavedDrawerOpen(true)}
              title="View saved looks"
            >
              <Bookmark size={11} strokeWidth={1.5} />
              <span>Saved ({savedLooks.length})</span>
            </button>
          )}
          <span className="fit-count">
            {count === 0 ? "Awaiting Selection" : `${String(count).padStart(2, "0")} ${count === 1 ? "PIECE" : "PIECES"}`}
          </span>
        </div>
      </div>

      {/* ── Cinematic Model Stage (Maximized Viewport) ──────── */}
      <div className="studio-shell">
        <div className="studio-glow" />
        <div className="model-stage">
          <Mannequin onAnchor={setAnchor} />
        </div>
      </div>

      {/* ── Compact Look Summary (Only expands when active) ── */}
      {count > 0 && (
        <div className="look-summary">
          <div className="look-header">
            <span className="eyebrow">
              Your Look · {count} {count === 1 ? "piece" : "pieces"} · ₹{total.toLocaleString("en-IN")}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                className="save-look-btn"
                onClick={handleSaveLook}
                title="Save this outfit configuration"
              >
                {savedNotice ? (
                  <>
                    <Check size={10} strokeWidth={2} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Bookmark size={10} strokeWidth={1.5} />
                    Save Look
                  </>
                )}
              </button>
              <button
                type="button"
                className="start-over"
                onClick={resetOutfit}
                title="Reset to empty studio"
              >
                <RotateCcw size={10} strokeWidth={1.5} />
                Start over
              </button>
            </div>
          </div>

          {/* Selected Garment Chips */}
          <div className="outfit-chips">
            {look.map((product) => {
              const isPreviewed = activePreviewProduct?.id === product.id;
              return (
                <div
                  key={product.id}
                  className={`chip ${isPreviewed ? "is-previewed" : ""}`}
                  title={`Click to preview ${product.name} on model`}
                >
                  <button
                    type="button"
                    className="chip-select-btn"
                    onClick={() => setActivePreviewProduct(product)}
                  >
                    <img src={product.cardImageUrl} alt={product.name} />
                    <span>{product.name}</span>
                  </button>
                  <button
                    type="button"
                    className="chip-remove-btn"
                    onClick={() => unequip(product.slot)}
                    title={`Remove ${product.name}`}
                    aria-label={`Remove ${product.name}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Complete Look Action */}
          <button
            type="button"
            className={`button add-look-btn ${addedNotice ? "added" : ""}`}
            onClick={addCompleteLook}
          >
            {addedNotice ? (
              <>
                <Check size={13} strokeWidth={2} />
                Complete look added to bag
              </>
            ) : (
              <>
                <ShoppingBag size={13} strokeWidth={1.5} />
                Add complete look · ₹{total.toLocaleString("en-IN")}
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Saved Looks Drawer ──────────────────────────────── */}
      {savedDrawerOpen && (
        <div className="saved-looks-modal" role="dialog" aria-modal="true">
          <div className="saved-looks-backdrop" onClick={() => setSavedDrawerOpen(false)} />
          <div className="saved-looks-panel">
            <div className="saved-looks-header">
              <div>
                <span className="eyebrow">Curated Wardrobe</span>
                <h3 className="serif">Saved Looks</h3>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setSavedDrawerOpen(false)}
                aria-label="Close saved looks"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="saved-looks-list">
              {savedLooks.length === 0 ? (
                <p className="empty-saved-hint">No saved looks yet. Use &ldquo;Save Look&rdquo; to store your outfit combinations.</p>
              ) : (
                savedLooks.map((item) => {
                  const items = Object.values(item.outfit).filter(Boolean) as Product[];
                  return (
                    <div key={item.id} className="saved-look-card">
                      <div className="saved-look-meta">
                        <div>
                          <strong>{item.name}</strong>
                          <span className="date">{item.date} · {items.length} pieces</span>
                        </div>
                        <span className="price">₹{item.totalPrice.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="saved-look-thumbs">
                        {items.map((prod) => (
                          <img
                            key={prod.id}
                            src={prod.cardImageUrl}
                            alt={prod.name}
                            title={prod.name}
                          />
                        ))}
                      </div>

                      <div className="saved-look-actions">
                        <button
                          type="button"
                          className="button primary restore-btn"
                          onClick={() => {
                            loadSavedLook(item.id);
                            setSavedDrawerOpen(false);
                          }}
                        >
                          <Sparkles size={11} strokeWidth={1.5} />
                          Preview in Studio
                        </button>
                        <button
                          type="button"
                          className="delete-look-btn"
                          onClick={() => deleteSavedLook(item.id)}
                          title="Delete saved look"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
