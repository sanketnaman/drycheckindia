# DryCheck India (https://drycheck.in) 🇮🇳

> **"Aaj sookha hai ya nahi, ek nazar mein."**

A fast, mobile-first, and production-ready Next.js application that tells visitors instantly whether today (and tomorrow) is a dry day across Indian states and union territories, with real-time Indian Standard Time (Asia/Kolkata) calculations, authentic gazette-backed data, and a culturally grounded tone.

---

## 🚀 Key Features

- **Strict Asia/Kolkata (IST) Timezone:** All "today" and "tomorrow" queries evaluate dynamically in `Asia/Kolkata (UTC+5:30)` with hourly ISR (`revalidate = 3600`) ensuring proper midnight rollover regardless of where the server is hosted.
- **Mobile-First UX (Above-the-Fold at 360x640):** The primary question (*"Is today a dry day?"*), big answer (*"Yes"*, *"No"*, or *"Maybe"* >= 96px), and secondary line (>= 20px) are engineered to be 100% visible on a 360x640 mobile screen without scrolling. Top date and menu buttons feature accessible min-44px tap targets.
- **Instant Searchable State Input:** Typing substrings on mobile (e.g., `"bih"` immediately yields Bihar) enables fast navigation without wading through long dropdowns.
- **Authentic Sourced Data (No Invented Facts):**
  - All 36 Indian states and union territories covered with individual slugs matching `/india/[state-slug]`.
  - Gazette-backed sources for confirmed entries; pending/unverified entries clearly display as **"Maybe"** or **"Status not verified"**.
  - Total statutory prohibition states (Bihar, Gujarat, Nagaland, Mizoram, Lakshadweep) correctly identified 365 days a year.
- **Date Routes (`/dry-days/[date]`):** Deep-linking for specific dates (e.g., `/dry-days/26-january-2026`) listing all states observing restrictions on that date.
- **In-Depth Guides Section (`/guides`):** State-specific editorial guides with gazette citations, excise rules, timings, and FAQs.
- **Advanced SEO & Rich Snippets:**
  - Canonical URL `https://drycheck.in` on every page with unique titles, meta descriptions, OpenGraph, and Twitter Cards.
  - Schema.org structured data: `WebSite` on home, `FAQPage` on state pages, `BreadcrumbList` on state and date routes.
  - Dynamic `/sitemap.ts` and crawler directives in `/robots.ts`.
- **Compliant Ad Placeholders:** `<AdSlot id="..." />` component dormant by default and safely toggled via `NEXT_PUBLIC_ADS_ENABLED="true"`. Zero alcohol affiliate or promotional links.

---

## 📊 Data Sources & Architecture

DryCheck India uses a hybrid data architecture combining live database management with static reference metadata:

### 1. Supabase PostgreSQL (Live Runtime Source of Truth)
- **Dynamic Dry-Day Records:** Live public entries are fetched at request time from the `dry_days` table in Supabase via `lib/public-drydays.ts`.
- **Publication & Verification Gate:** The public read layer queries only rows with `is_published = true` and `verification_status IN ('confirmed', 'reported')`. Unpublished drafts never reach visitors.
- **Fail-Safe Integrity:** When Supabase is unconfigured or a network fetch fails, pages render an explicit data-unavailable state rather than falling back to stale bundled records or inventing answers.
- **Admin Management:** Authenticated administrators manage entries, verification statuses, source URLs, and public notices through the protected `/admin` portal.

### 2. Bundled JSON Metadata
- **`data/dry-days.json`:** Contains canonical reference data for all 36 Indian states and union territories (`slug`, `name`, `region`, `prohibition` flag, `lastVerified` audit date, and `nearby` state connections).
- **`data/guides.json`:** Editorial guides with in-depth legal analyses, gazette citations, historical order breakdowns, and state FAQs.

---

## 🔐 Environment Variables

| Variable | Description | Scope |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production site URL (`https://drycheck.in`) | Public / Client |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://<project-ref>.supabase.co`) | Public / Client |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable/anon key | Public / Client |
| `NEXT_PUBLIC_ADS_ENABLED` | Optional flag (`"true"` / `"false"`) to toggle ad slot placeholders | Public / Client |

> **Note on Admin Authentication:**  
> Admin routes (`/admin/*`) require `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. In addition, authorized admin accounts must have an entry in the Supabase `admin_users` table with their `user_id`. Unauthenticated users are redirected to `/admin/login`, and non-admin authenticated users receive a forbidden response.

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js 20+
- npm or pnpm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sanketnaman/drycheckindia.git
   cd drycheck-india
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   ```bash
   cp .env.example .env.local
   ```
   Configure `NEXT_PUBLIC_SITE_URL="https://drycheck.in"`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

5. Test production build & lint:
   ```bash
   npm run lint
   npm test
   npm run build
   ```

---

## 🚢 Deployment (Cloudflare Workers via OpenNext)

The project is configured for Cloudflare Workers using `@opennextjs/cloudflare` and `wrangler.jsonc`.

- Build command: `npm run build`
- OpenNext preview: `npm run preview`
- Manual deploy: `npm run deploy`

### Cloudflare Redirect Rules (Recommended)
To handle HTTP to HTTPS and non-www domain canonicalization at Cloudflare edge:
1. **Always Use HTTPS:** Enabled under SSL/TLS edge certificates.
2. **Redirect www to root:** Create a Single Redirect Rule in the Cloudflare dashboard:
   - When incoming request matches hostname `www.drycheck.in`
   - Redirect to `https://drycheck.in` with status code 301 (Permanent Redirect), preserving path and query string.

---

## ⚖️ Legal & Regulatory Disclaimer

Information is compiled from official government notifications, state gazettes, and election commission orders and may change. DryCheck India does not sell, market, or promote alcohol.
