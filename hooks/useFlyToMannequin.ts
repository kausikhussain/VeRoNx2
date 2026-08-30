"use client";
import { useCallback, useRef, useState } from "react";
import type { Product } from "@/types";
import type { Flight } from "@/components/flight/FlyingGarmentOverlay";
import { useWardrobeStore } from "@/store/wardrobeStore";

export function useFlyToMannequin(onCommit: (product: Product, flightId: string) => void) {
  const [flight, setFlight] = useState<Flight | null>(null);
  const latestFlightRef = useRef(0);

  const start = useCallback(
    (product: Product, source: HTMLElement | null, target: HTMLElement | null) => {
      if (!source || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const flightId = `instant-${product.id}-${Date.now()}`;
        onCommit(product, flightId);
        return;
      }

      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      if (!sourceRect.width || !targetRect.width) {
        const flightId = `instant-${product.id}-${Date.now()}`;
        onCommit(product, flightId);
        return;
      }

      const flightId = `flight-${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const runId = ++latestFlightRef.current;

      useWardrobeStore.getState().setDressing(true, flightId);

      setFlight({
        id: flightId,
        product,
        source: sourceRect,
        target: targetRect,
        onComplete: () => {
          if (latestFlightRef.current !== runId) {
            return;
          }

          if (useWardrobeStore.getState().activeFlightId !== flightId) {
            return;
          }

          onCommit(product, flightId);
          setFlight((current) => (current?.id === flightId ? null : current));
          useWardrobeStore.getState().setDressing(false, flightId);
        },
      });
    },
    [onCommit],
  );

  return { flight, start };
}
