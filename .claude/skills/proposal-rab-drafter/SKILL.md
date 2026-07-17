---
name: proposal-rab-drafter
description: Use when drafting a client proposal, penawaran harga, or RAB (Rencana Anggaran Biaya) for a prospective ADK project — website, dashboard, ERP/CRM/GIS, AI automation, or consulting engagement. Triggers on "buatkan proposal untuk...," "susun RAB...," "penawaran harga untuk klien...," or when a WhatsApp conversation / brief needs to be turned into a formal quote. Not for the AI Tools platform's own document generators (Renja/Renstra/KAK-TOR templates already exist in tools/) — use this for ADK's own sales proposals to its clients.
---

# Proposal & RAB Drafter

You are drafting a document Andri will send directly to a prospect. It must
be accurate to what ADK actually offers and priced consistently with
`site/index.html`'s published packages — never invent scope or pricing that
contradicts the live site without flagging it as a deliberate custom quote.

## First, establish the client type — the format differs substantially

- **UMKM / individual / small business**: keep it short, WhatsApp-friendly,
  conversational but professional. Can often be a well-formatted message or
  a one-page PDF, not a formal cover-letter document. Reference the existing
  package tiers (Landing Page Rp750rb, Website Profil Rp2jt, add-ons) rather
  than pricing from scratch unless the request is genuinely custom.
- **Instansi / OPD / BUMN / larger organization**: needs a formal structure —
  these often go into an internal approval/procurement process. Use the
  structure below in full, with a proper header (nomor surat placeholder,
  tanggal, perihal) since Andri will likely paste this into letterhead.
- **Custom/enterprise scope (ERP, CRM, GIS, dashboards, AI automation)**:
  pull in `enterprise-scoping` skill's discovery questions first if the scope
  isn't already well-defined — don't price something whose requirements are
  still vague.

## Standard proposal structure (formal / instansi version)

1. **Perihal & Ringkasan** — one paragraph: what's being proposed and why,
   in the client's own language/problem, not ADK's feature list.
2. **Latar Belakang / Kebutuhan** — restate the client's stated problem to
   show it was understood, not a copy-paste template.
3. **Lingkup Pekerjaan (Scope of Work)** — itemized, specific. Distinguish
   clearly between what's included and what's explicitly out of scope (this
   is the #1 source of client disputes later — be generous with "tidak
   termasuk" clarity).
4. **Timeline** — phase-by-phase with durations, matching realistic estimates
   from ADK's existing process (site's published turnaround: Landing Page
   3-5 hari, Website Profil 7-14 hari, Instansi/OPD 14-21 hari — larger
   custom scopes need their own estimate, don't reuse these blindly).
5. **RAB (Rencana Anggaran Biaya)** — table format: `No | Item Pekerjaan |
   Deskripsi | Volume/Satuan | Harga Satuan | Subtotal`, with a clear total
   and note on payment terms (e.g., DP/pelunasan split, matching how ADK
   already operates if known).
6. **Syarat & Ketentuan** — revision rounds included, what triggers
   additional cost, validity period of the quote (e.g., "berlaku 14 hari").
7. **Tentang ADK** — brief, factual credibility section. Use only real,
   verifiable claims (existing portfolio, the AI Tools platform for OPD
   clients if relevant to a government prospect, actual years/experience) —
   never fabricated client counts or testimonials.
8. **Kontak & Langkah Selanjutnya** — clear single next action (biasanya
   WhatsApp atau jadwal konsultasi).

## Pricing discipline

- Cross-check every price line against `site/index.html`'s published tiers
  and add-ons before quoting a "custom" number for something that already has
  a standard package — consistency across proposals matters for trust and for
  not underselling a package Andri already offers at a set price.
- For genuinely custom/enterprise work with no existing price reference,
  build the estimate up from itemized effort rather than guessing a round
  number, and explicitly tell Andri it's an estimate that should be sanity
  checked before sending — don't present a fabricated-feeling number as final.
- Never promise specific SEO rankings, uptime guarantees beyond what
  Cloudflare Pages/Workers actually provide, or regulatory compliance claims
  for government projects without those being verified — the site's own FAQ
  is explicit that no one can guarantee Google rankings; proposals must stay
  consistent with that honesty.

## Output

Produce the proposal in Bahasa Indonesia, ready to copy into a document or
WhatsApp message as appropriate to the client type. If key inputs are
missing (client name, specific scope, budget ceiling), ask before drafting a
full formal proposal — a generic proposal with placeholders undermines the
"we understood your specific need" framing that wins these deals.
