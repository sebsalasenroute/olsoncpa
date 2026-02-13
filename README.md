# Olson & Company Website (Next.js + TypeScript)

Production-ready accounting website for **Olson & Company** focused on BC / Lower Mainland SEO, with an extensible interactive calculator framework and CRA-aligned tax rules architecture.

## Firm Details
- Business name: **Olson & Company**
- Address: **105-443 Sixth Street, New Westminster, BC V3L 3B1**
- Phone: **604.525.9295**

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- Recharts (calculator charting)
- JSON-LD schema output via page components (LocalBusiness, FAQPage, WebApplication, Service, BreadcrumbList)
- Dynamic `robots.txt` and `sitemap.xml`
- Vitest unit tests

## Routes
- `/` Home
- `/calculators` Calculator index
- `/calculators/[slug]` Individual calculators
- `/locations` Location index
- `/locations/[city]` City landing pages
- `/services` Services index
- `/services/[service]` Service detail pages
- `/blog` Blog index
- `/blog/[slug]` Blog post template pages
- `/contact` Contact page
- `/legal/privacy`
- `/legal/terms`
- `/disclaimer`

## Local Run
1. Install dependencies:
```bash
npm install
```
2. Run dev server:
```bash
npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000)

## Test
Run calculator and tax engine tests:
```bash
npm run test:run
```

## Deploy to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`
5. Output: `.next`
6. Deploy.

## Contact Form (Production)
The contact form posts to `/api/contact` and sends email through Resend.

Required environment variables:
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (must be a verified sender/domain in Resend)
- `CONTACT_TO_EMAIL` (inbox destination)

Security controls included:
- basic server-side validation
- honeypot field
- basic in-memory rate limiting per IP

## Calculator Framework Architecture
- Catalog and SEO/page content: `lib/calculators/catalog.ts`
- Runner loader map (code-splitting): `lib/calculators/engine.ts`
- Per-calculator math runners: `lib/calculators/modules/*.ts`
- Shared math helpers: `lib/calculators/math.ts`
- UI runtime (inputs/results/share/copy/chart): `components/calculators/CalculatorRuntime.tsx`
- Comparison matrix: `components/calculators/CalculatorComparisonTable.tsx`

Each calculator page includes:
- URL share via query parameters
- Reset
- Copy summary
- Validation
- Tooltips
- Results chart
- FAQ section + FAQPage JSON-LD
- WebApplication JSON-LD
- BreadcrumbList JSON-LD

## How to Add a Calculator
1. Add catalog entry in `lib/calculators/catalog.ts`:
- unique `slug`
- title/description/category
- fields
- FAQs/how-it-works
- related services and city links
- disclaimer(s)
2. Add runner module at `lib/calculators/modules/<slug>.ts` exporting:
```ts
export const run: CalculatorRunner = (inputs) => { ... }
```
3. Register loader in `lib/calculators/engine.ts`:
```ts
"<slug>": () => import("@/lib/calculators/modules/<slug>")
```
4. Add tests for core math if needed under `tests/`.

## How to Add a City Page
1. Add a new city object in `lib/cities.ts` with:
- `slug`, `name`, `image`
- unique `intro`, `localFocus`, `localChallenges`
- city FAQs
- `featuredCalculatorSlugs` (5-8)
2. Add a matching image file in `/public/images` following the existing naming pattern.
3. The route `/locations/[city]` and sitemap will include it automatically.

## Tax Rules Module (Single Source of Truth)
- Tax year rules live in:
  - `lib/tax/rules/2025.ts`
  - `lib/tax/rules/2026.ts`
- Loader/index:
  - `lib/tax/rules/index.ts`
- Engine:
  - `lib/tax/engine.ts`

### Update Tax-Year Data
1. Add or edit a year file in `lib/tax/rules/<year>.ts`.
2. Set:
- federal brackets
- BC brackets
- basic personal amounts
- metadata source and update date
3. Register the module in `lib/tax/rules/index.ts`.
4. Change `status` from `"placeholder"` to `"verified"` only after confirming official values.

If a year is missing or placeholder, calculators show warning banners and disclaimers.

## Assets
Required image convention is implemented under:
- `/public/images/logo-olson-company.svg`
- `/public/images/*.jpg` (hero, banners, city images)

Banner component wiring:
- Global top banner: `components/banners/TopBanner.tsx` in `app/layout.tsx`
- Service hero banner: `components/banners/ServiceHeroBanner.tsx` in `app/services/[service]/page.tsx`
- Calculator hero banner: `components/banners/CalculatorHeroBanner.tsx` in `app/calculators/[slug]/page.tsx`
- City hero banner: `components/banners/CityHeroBanner.tsx` in `app/locations/[city]/page.tsx`

## SEO Schema Helpers
- Shared schema builders: `lib/schema.ts`
- JSON-LD script component: `components/seo/JsonLd.tsx`
- Breadcrumb UI component: `components/shared/Breadcrumbs.tsx`

## Downloadable Package
A clean archive (excluding `.git`, `node_modules`, `.next`, and local env files) is generated at:
- `olson-company-site-package.zip`

You can upload this ZIP to GitHub manually, or unzip and push via git.
