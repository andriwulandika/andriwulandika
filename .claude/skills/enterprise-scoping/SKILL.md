---
name: enterprise-scoping
description: Use when scoping a larger/complex engagement — ERP, CRM, GIS, government monitoring dashboards, web applications, or AI automation projects — before pricing or building begins. Triggers on "bantu scoping proyek...," "susun kebutuhan teknis untuk...," "KAK/TOR untuk...," or when a client brief is too vague to price or build from directly. Feeds into proposal-rab-drafter once scope is defined; hand off to normal implementation work once requirements are confirmed.
---

# Enterprise / Government Solutions Scoping Assistant

These projects (ERP, CRM, GIS, monitoring dashboards, government web
applications, AI automation) fail most often from unscoped assumptions, not
from technical difficulty. This skill's job is to force clarity before
pricing or architecture decisions — output a structured requirements
document, not code or a quote.

## Discovery questions by project type

**ERP / CRM**
- Which business processes/modules are actually in scope (inventory, HR,
  finance, sales pipeline, procurement)? Vague "buatkan ERP" requests almost
  always mean 2-3 specific modules, not a full suite — pin down which.
- Existing systems to integrate with or migrate from? Data migration is
  usually the most underestimated cost in these projects.
- User roles and approval workflows — who can see/edit/approve what.
- Expected user count and concurrent usage (affects hosting/infra choice).

**GIS**
- What data sources exist already (shapefiles, existing government
  geoportal, manual survey data)? Never assume clean data exists.
- Coordinate system / projection requirements — government GIS work in
  Indonesia often has specific standards (check if the client's instansi
  mandates one).
- What map layers and interactions are actually needed — static reference
  map vs. editable/updatable spatial database vs. public-facing interactive
  portal are very different scopes.

**Government monitoring dashboard**
- Which indicators/KPIs, and what's the source of truth for each (manual
  entry vs. pulled from another system)? This determines most of the build
  complexity.
- Reporting cadence and regulatory format requirements — check whether this
  connects to formats ADK already knows (SAKIP/Renja/Renstra/LKjIP structures
  covered in the existing `tools/` AI platform) so the dashboard's data model
  can align with documents already being produced.
- Who are the dashboard's actual viewers — internal OPD staff, leadership,
  or public transparency portal? Changes access control and design entirely.

**AI automation / chatbot**
- What specific workflow is being automated — be skeptical of "buatkan
  chatbot AI" with no defined task; push for the actual repetitive process
  being replaced (customer FAQ deflection, internal document drafting,
  lead qualification, etc.).
- Data/knowledge sources the AI needs access to, and how they'll stay
  current — a chatbot with stale knowledge creates more support burden than
  it saves.
- Cost model awareness — flag that ongoing LLM API usage has a per-request
  cost that scales with volume; this needs to be priced into any retainer,
  not treated as a one-time build fee.

## Output format

A structured document (feeds directly into `proposal-rab-drafter`):

1. **Ringkasan Kebutuhan** — plain-language restatement of the problem.
2. **Lingkup (In Scope)** — itemized, specific.
3. **Di Luar Lingkup (Out of Scope)** — explicit exclusions, prevents scope
   creep disputes later.
4. **Asumsi & Ketergantungan** — data availability, client-provided assets,
   third-party access needed (this is where most delivery risk lives).
5. **Fase Pengerjaan** — break large scopes into phases with independent
   value, not one big-bang delivery — easier to price, easier to de-risk.
6. **Risiko** — call out anything uncertain (data quality unknown, regulatory
   format not yet confirmed, integration access not yet granted) rather than
   quietly assuming it will work out.

## Guardrails

- Do not price anything from this skill directly — hand off a defined scope
  to `proposal-rab-drafter` for pricing once requirements are clear.
- Do not assume government regulatory/procurement requirements — ask, or
  flag explicitly as unconfirmed, rather than presenting an assumption as fact.
- If a request is small enough to just be a standard website/dashboard
  package already on `site/index.html`, say so rather than over-engineering
  a scoping document for something that doesn't need one.
