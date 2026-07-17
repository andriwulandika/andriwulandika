# Andri Wulandika — Digital HQ

Next.js foundation for `andriwulandika.uk`, the Digital Headquarters rebuild.
This runs alongside the existing `site/` (current production `andriwulandika.uk`)
and `tools/` (`ai.andriwulandika.uk`) — both stay live until this is ready to
cut over. No DNS/deploy target has been switched yet.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn-style primitives
(hand-written — the shadcn CLI registry is blocked by this environment's egress
policy, see below) · Framer Motion · GSAP · Lenis · Three.js / React Three Fiber
(installed, not yet used) · Radix UI primitives.

## Getting started

```bash
npm install
npm run dev
```

## Notes for whoever picks this up next

- **shadcn/ui CLI is unreachable** from this build environment
  (`ui.shadcn.com` returns 403 via the egress proxy). Components under
  `src/components/ui/` were hand-written to match shadcn's `new-york` style —
  `components.json` is configured correctly, so `npx shadcn@latest add <x>`
  should work fine from an unrestricted machine/CI.
- **Design tokens** live in `src/app/globals.css` as OKLCH CSS variables
  (dark theme is default — set on `<html class="dark">` in `layout.tsx`).
  Palette (graphite base + warm gold accent) is a placeholder pending a real
  brand/design decision — swap the values in `:root` / `.dark` in one place.
- **Fonts**: Fraunces (display/headings) + Inter (body/UI), loaded via
  `next/font/google`.
- **Nav/IA** lives in `src/lib/site-config.ts`, matching the full site
  structure from the project brief. Only `/` is built; every other route in
  the nav will 404 until its page is implemented.

## Roadmap (not yet built)

1. Core pages: About, Services, Government Solutions, Portfolio, Case
   Studies, Pricing, Contact / Book Consultation.
2. CMS wiring (Sanity) for Blog, Resources, Templates, Case Studies.
3. Supabase + Prisma for leads, bookings, and the pricing calculator.
4. WebGL hero (Three.js / R3F) — needs art direction/asset decisions first.
5. Cloudflare/Vercel deploy pipeline + DNS cutover plan from `site/`.
