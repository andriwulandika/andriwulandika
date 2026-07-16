"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Spike Fase 0 menemukan chunk Three.js/R3F/Drei ~253KB gzip — cukup besar
// untuk memengaruhi Time to Interactive kalau dimuat langsung saat mount.
// Mitigasi: tunda pemuatan sampai browser idle (requestIdleCallback),
// supaya konten kritis (teks, CTA) render & interaktif duluan.
const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
});

export default function HeroSceneLazy() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 })
      : window.setTimeout(() => setShouldLoad(true), 300);

    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  return (
    <div className="mx-auto h-64 w-64" aria-hidden="true">
      {shouldLoad ? (
        <HeroScene />
      ) : (
        <div className="size-full animate-pulse rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
      )}
    </div>
  );
}
