"use client";

import dynamic from "next/dynamic";

// Spike Fase 0: dynamic import + ssr:false supaya Three.js/R3F/Drei
// (paket berat) tidak masuk initial JS bundle / server render sama sekali.
// Hanya di-fetch saat komponen ini benar-benar dipasang di layar.
const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="size-full animate-pulse rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
  ),
});

export default function HeroSceneLazy() {
  return (
    <div className="mx-auto h-64 w-64">
      <HeroScene />
    </div>
  );
}
