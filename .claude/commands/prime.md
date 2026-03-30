# Prime — ArchiteQt Tools Hub

Load project context for this session.

---

## Project

**ArchiteQt Tools Hub** — gratis lead generation tools voor architecten.
Deployed: `architeqt-tools.vercel.app` | Platform: `architeqt.tech`

Stack: **Next.js 16 + React 19 + TypeScript + Tailwind CSS v3**
Lang: Dutch-first. Privacy-first. Client-side-first.

---

## Three Tools

| Route | Tool | Core Logic |
|-------|------|------------|
| `/budget-calculator` | Budget Calculator | `lib/calculations/budget.ts` |
| `/project-planner` | Project Planner | `lib/calculations/timeline.ts` |
| `/pdf-to-excel` | PDF to Excel | `app/pdf-to-excel/components/TableDetector.tsx` |

Every tool follows: **Form → 300ms calculate → Results → SaveUpsellBanner → LeadCaptureForm → Export**

---

## Key Files

```
app/
  layout.tsx                          # Root layout, top banner, fonts
  page.tsx                            # Homepage: hero + tool grid + CTA
  budget-calculator/page.tsx          # Budget tool
  project-planner/page.tsx            # Planner tool
  pdf-to-excel/page.tsx               # PDF converter
  api/send-welcome/route.ts           # Resend email endpoint (only server route)

components/
  layout/ToolsNav.tsx                 # Header + mobile nav
  layout/ToolsFooter.tsx              # 4-column footer
  shared/SaveUpsellBanner.tsx         # "Save before closing" upsell
  shared/LeadCaptureForm.tsx          # Email capture → Supabase
  shared/ArchiteqtCTA.tsx             # Bottom CTA (default + compact variants)

lib/
  constants.ts                        # TOOLS array, BRAND URLs
  supabase.ts                         # Supabase client (null-safe)
  calculations/budget.ts              # Pure calculation functions
  calculations/timeline.ts            # Pure calculation functions
```

---

## Lead Flow

```
LeadCaptureForm → Supabase tool_leads {email, tool_used, opted_in, metadata}
               → /api/send-welcome (if opted_in) → Resend email
```

Signup upsell URL: `https://architeqt.tech/auth/signup?from=tools&tool={slug}`

---

## Design Tokens

- Primary: `#00A693` (`primary-turquoise`) — turquoise
- Secondary: `#f59e0b` (`secondary-gold`) — amber/gold
- Font: Inter (Google Fonts via `next/font`)
- Tailwind v3 — do NOT upgrade

---

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
```
All optional — tools work without them.

---

## Rules

- Dutch only in UI
- No analytics scripts (privacy positioning)
- Client-side calculations — no server roundtrips
- 300ms delay on calculate is intentional
- Graceful degradation on missing env vars

---

## Dev

```bash
npm run dev      # localhost:3000
npm run build
npm run lint
```

Check `CLAUDE.md` in the project root for full knowledge compression, preferences, capabilities, and lab notes.
