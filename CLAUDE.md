# CLAUDE.md — ArchiteQt Tools Hub

## Knowledge Compression

**What this is:** Free lead generation tool hub for Dutch architects. Three client-side tools, zero-friction usage, upsell to `architeqt.tech` platform. Deployed at `architeqt-tools.vercel.app`.

**Stack:** Next.js 16.1.6 + React 19 + TypeScript + Tailwind CSS 3.4.16. No test suite. No global state (hooks only).

**Three tools:**
| Route | Tool | Description |
|-------|------|-------------|
| `/budget-calculator` | Budget Calculator | Area × base price × quality × region multipliers. 9 project types, 8 NL regions. |
| `/project-planner` | Project Planner | 4-phase timeline (Design → Permit → Procurement → Execution). Gantt chart, risk analysis, seasonal factors. |
| `/pdf-to-excel` | PDF to Excel | PDF.js client-side parsing, editable preview, CSV/XLSX export. Max 10 pages, max 10MB. |

**Data flow per tool:** `Form → calculate() → 300ms delay (UX) → Results → SaveUpsellBanner → LeadCaptureForm → Export`

**Lead capture:** `LeadCaptureForm.tsx` → Supabase table `tool_leads` `{email, tool_used, opted_in, metadata}` → optional Resend welcome email via `/api/send-welcome`.

**Upsell:** `SaveUpsellBanner.tsx` shows "results disappear on close" + signup CTA. Signup URL: `https://architeqt.tech/auth/signup?from=tools&tool={slug}`. All external links tracked via query params.

**Calculations are pure functions** in `lib/calculations/budget.ts` and `lib/calculations/timeline.ts`. Everything client-side, zero server calls for calculations.

**Environment variables:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
```
All optional — tools function fully without them, lead capture silently fails gracefully.

**Colors:** Primary `#00A693` (turquoise), Secondary `#f59e0b` (gold/amber). Custom Tailwind tokens: `primary-turquoise` / `secondary-gold`. Header gradient: `from-teal-600 to-teal-700`.

**Language:** 100% Dutch. `lang="nl"`. Currency via `Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })`. No i18n library — hardcoded strings.

**PDF.js** loaded dynamically via `next/dynamic` (code splitting). Worker from Cloudflare CDN.

**No analytics scripts.** No GA, no Mixpanel, no hotjar. Only Supabase for lead capture.

---

## Preferences

- **Dutch-first content.** All user-facing text, labels, error messages, and email templates must be in Dutch.
- **Client-side always.** Calculations and file processing never touch the server. Privacy is a feature — the PDF converter explicitly markets "100% lokale verwerking".
- **Graceful degradation.** If Supabase or Resend is unavailable, tools still work. Show success to user even if email send fails.
- **Minimal friction before value.** Tools work immediately, no signup required. Lead capture happens *after* results are shown.
- **300ms artificial delay** on calculate actions is intentional — feels more "computed" to users, don't remove it.
- **No analytics scripts** — privacy-first positioning is part of the brand. Don't add GA or similar without explicit request.
- **Tailwind v3** — project was explicitly downgraded from v4 to v3 to fix styling. Do not upgrade.
- **No test files exist.** Don't add test infrastructure unless explicitly requested.
- **Emoji for tool icons** (💰 📅 📄) — intentional design choice, not placeholder.

---

## Capabilities

**To add a new tool:**
1. Create `app/{tool-slug}/page.tsx` + `app/{tool-slug}/components/`
2. Add calculation logic in `lib/calculations/{tool}.ts`
3. Register in `lib/constants.ts` TOOLS array
4. Follow the standard flow: Form → Results → `SaveUpsellBanner` → `LeadCaptureForm` → Export

**To add a new project type or region (Budget Calculator):**
- Edit `lib/calculations/budget.ts` — add to `BASE_PRICES` and `REGION_MULTIPLIERS` objects

**To change upsell/CTA copy:**
- `components/shared/SaveUpsellBanner.tsx`
- `components/shared/ArchiteqtCTA.tsx`
- `components/layout/ToolsNav.tsx` (top banner)

**To update signup/platform URLs:**
- `lib/constants.ts` — `BRAND` object

**Export formats:** PDF via browser print dialog (styled HTML), CSV via Blob download. `ConvertExport.tsx` and `BudgetExport.tsx` show the pattern.

**Lead capture table schema (Supabase):**
```sql
tool_leads (
  id          uuid primary key,
  email       text,
  tool_used   text,   -- 'budget-calculator' | 'project-planner' | 'pdf-to-excel'
  opted_in    boolean,
  metadata    jsonb,  -- { timestamp, source: 'tools-hub' }
  created_at  timestamptz
)
```

**Dev commands:**
```bash
cd ~/projects/architeqt-tools
npm run dev      # localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

---

## Lab Notes

- **PDF to Excel is lossy** — PDF.js groups text items by Y-coordinate; complex multi-column or rotated PDFs fail silently. The UI warns about complex PDFs.
- **TableDetector** uses a `<=3` column count heuristic to skip "non-table" rows; this can miss narrow tables or falsely skip rows.
- **PDF export** uses browser `window.print()` with a styled popup — not a real PDF library. Formatting depends on browser print settings.
- **Multiple tables** in PDF-to-Excel: detected and shown in tabs, but only the first table is exported. The UI shows a warning about this.
- **Seasonal multipliers** only affect the Execution phase, not total project duration.
- **Area factor formula:** `Math.max(1, Math.log10(area / 50))` — projects under 50m² get factor 1.0, larger projects scale logarithmically.
- **Supabase client** is instantiated lazily (`null` if env vars missing) to prevent crashes in dev without credentials.
- **Resend API route** `/api/send-welcome` is a server route — the only one. It validates input and catches errors silently.
- **`next/dynamic`** is only used for `TableDetector` — PDF.js bundle is large (~3MB), separating it keeps the initial bundle lean.
- **Homepage hero** has two different styles at different breakpoints (white on mobile, gradient on desktop) due to a responsive fix in commit `abd6384`.
- No `vercel.json` — deployment uses Next.js defaults on Vercel.
