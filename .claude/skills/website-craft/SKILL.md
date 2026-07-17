---
name: website-craft
description: Use whenever designing, building, or reviewing any client-facing page for ADK (Andri Wulandika) or an ADK client — new pages, hero sections, landing pages, redesigns, or a design review pass on existing work. Also use when the user asks to make a page "less AI-generated," "lebih premium," "tidak terlihat template," or asks for a critique of a page's visual/copy quality. Not for backend, data, or copy-only tasks with no visual surface (use seo-copywriter for pure article writing instead).
---

# Website Craft — anti-generic-AI checklist

Goal: every page ships with a specific point of view, not the median output of
"build me a premium SaaS landing page." Run this checklist before calling any
UI work done — on ADK's own site (`site/`, `hq/`) and on client projects.

## The tells that make a page read as AI-generated

Treat every one of these as a defect to justify keeping, not a default to reach for:

1. **Purple-to-blue (or gold-on-graphite) gradient hero with a centered headline,
   two pill buttons, and a vague "transformasi digital" claim.** This is the
   single most common AI-slop signature. If the hero could be reskinned for any
   other consulting business by swapping the logo, it has failed.
2. **Every button is `rounded-full`, every card has the same border-radius and
   the same subtle-border-on-dark-card treatment.** Uniform geometry across
   every component is a tell. Vary it deliberately — pick 1-2 places to break
   the pattern (a sharp-cornered stat block, an oversized pull-quote, a full-
   bleed image) so the page has a hierarchy of attention, not a hierarchy of box.
3. **A 3-or-6-card feature/service grid where every card has the same icon-box
   + title + one-sentence description shape**, and the icons are generic
   (lightning bolt = fast, shield = secure, gear = automation). If you can't
   name which client/project justified each card's specific wording, it's filler.
4. **Every interactive element gets an `ArrowUpRight` hover-shift icon.** Fine
   once as a signature move; deployed on every single link it stops meaning
   anything. Reserve motion accents for the 2-3 places that matter most (primary
   CTA, hero, one section transition) rather than blanketing the page.
5. **Cliché copy**: "solusi terbaik untuk kebutuhan Anda," "harga terjangkau
   dengan kualitas terbaik," "kami hadir untuk membantu bisnis Anda berkembang,"
   "transformasi digital yang terukur." These sentences are true of literally
   every vendor and persuade no one. Replace every generic claim with a specific
   number, a named example, or a concrete mechanism (not "cepat" — "loading di
   bawah 1 detik karena statis, bukan WordPress").
6. **Perfectly symmetric, perfectly centered everything.** Real editorial design
   has tension — asymmetric grids, a headline that breaks past its column, an
   image bleeding off-canvas. Centered-text-centered-button-centered-card on
   every section is the default a model reaches for under time pressure; treat
   it as unfinished, not clean.
7. **Trust signals that are asserted, not shown.** "Dipercaya oleh banyak
   klien" with no client names, no number, no logo — cut it or replace with
   something falsifiable ("20+ OPD di Jawa Timur," a named case study link).
8. **Stock-photo energy even in illustration form** — generic 3D blob shapes,
   isometric people-at-laptops, abstract particle networks with no relationship
   to what the business actually does. If the visual could illustrate a
   fintech, a SaaS tool, and a consulting firm interchangeably, it's decoration,
   not communication.

## What to do instead

- **Start from the client's actual specifics, not a template.** Before writing
  a single component, list 3 things that are true of *this* client and no
  other: a real number (years in business, clients served, response time), a
  real differentiator, a real constraint (government formatting rules, a
  specific regional market). Design the hero around one of those, not around
  "we build great websites."
- **Pick a point of view on typography and commit.** ADK's `hq/` foundation
  pairs Fraunces (display serif) with Inter (body) — reuse that pairing for
  brand consistency across ADK properties, but for client work outside the
  ADK brand, choose a pairing that fits *their* industry (a government client
  reads differently from a café).
- **Let content density vary.** Not every section needs the same padding,
  the same max-width, the same card count. A page with only symmetric 3-column
  grids from top to bottom is the fastest way to look machine-generated.
- **Cut before you add.** If a section could be deleted without losing
  information the client needs, delete it. AI-generated pages tend to be
  padded with sections that restate the same value prop three different ways
  (hero → "why choose us" → "our advantages" → testimonials that don't exist
  yet). One strong section beats three redundant ones.
- **Motion with a reason.** Reference the project brief's own words: "animasi
  yang elegan dan memiliki tujuan, bukan sekadar ramai." Every animation should
  answer "what is this teaching the user about hierarchy or state," not just
  "does this look alive."
- **Read the copy out loud in Bahasa Indonesia.** If it sounds like it was
  translated from a generic English SaaS template, rewrite it in how Andri
  would actually explain the service on a sales call — this is the same voice
  already established in `site/index.html` (direct, transparent about price,
  WhatsApp-CTA-driven, specific about turnaround times).

## Before marking any page done, self-review against this list

State explicitly (to yourself, in the response, or in a PR description) which
of the 8 tells above were present in the first draft and what was changed to
kill them. If the honest answer is "none were present," say what makes the
page specific to this client instead of generic-premium — a page that passes
by accident isn't verified.
