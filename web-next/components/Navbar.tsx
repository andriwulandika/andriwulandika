"use client";

import { useState } from "react";

const links = [
  { idx: "01.", label: "Layanan", href: "#layanan" },
  { idx: "02.", label: "Portofolio", href: "#karya" },
  { idx: "03.", label: "Paket", href: "#paket" },
  { idx: "04.", label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-5 inset-x-0 max-w-5xl mx-auto z-50 px-4">
      <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20">
        <a href="/" className="flex items-center gap-2 font-mono uppercase text-sm tracking-wider text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Andri Wulandika
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase hover:text-white transition-colors"
              >
                <span className="text-blue-500">{link.idx}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20ingin%20konsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 rounded-full text-[11px] font-mono tracking-wider uppercase bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
          >
            Konsultasi
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-full border border-white/10"
          >
            <span
              className={`block w-4 h-px bg-white transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-px bg-white transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden mt-3 rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl p-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-mono tracking-widest text-zinc-300 uppercase hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span className="text-blue-500">{link.idx}</span> {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/62811660568?text=Halo%20Andri%2C%20saya%20ingin%20konsultasi."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center px-4 py-3 rounded-full text-[11px] font-mono tracking-wider uppercase bg-white text-black font-semibold"
              >
                Konsultasi
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
