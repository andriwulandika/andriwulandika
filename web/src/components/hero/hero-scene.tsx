"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";

// Spike Fase 0: bukti pola hero 3D bisa jalan sebagai client component
// terpisah, di-lazy-load lewat next/dynamic supaya tidak membebani
// initial bundle halaman. Bentuk & animasi final digarap di Fase 1.
function DistortedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.4, 8]} />
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.35}
          speed={1.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <DistortedSphere />
      <Environment preset="city" />
    </Canvas>
  );
}
