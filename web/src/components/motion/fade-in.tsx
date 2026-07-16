"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // Penting: selalu render `motion.div` yang sama di server & klien.
  // Jangan bercabang ke elemen berbeda berdasarkan useReducedMotion()
  // (nilainya beda antara SSR & klien) — itu menyebabkan hydration
  // mismatch dan Framer Motion gagal "mengambil alih" node tsb,
  // sehingga whileInView tidak pernah jalan (macet di opacity:0).
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView={shouldReduceMotion ? undefined : "visible"}
      animate={shouldReduceMotion ? "visible" : undefined}
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
